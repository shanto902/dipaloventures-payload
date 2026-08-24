import { describe, expect, it } from 'vitest'
import { PITCH_LONG_TEXT_MAX, PITCH_SCHEMA } from '@/components/pitch/pitchSchema'
import {
  MAX_PITCH_DECK_BYTES,
  parsePitchPayload,
  validatePitchDeck,
} from '@/components/pitch/pitchValidation'

function validPayload(): Record<string, unknown> {
  const payload: Record<string, unknown> = {}

  for (const field of PITCH_SCHEMA.flatMap((section) => section.fields)) {
    if (field.type === 'file') continue
    if (field.type === 'check') payload[field.id] = []
    else if (field.type === 'email') payload[field.id] = 'founder@example.com'
    else if (field.type === 'url') payload[field.id] = 'https://example.com'
    else if (field.options?.length) payload[field.id] = field.options[0]
    else payload[field.id] = field.required ? `Valid ${field.id}` : ''
  }

  return payload
}

describe('pitchPayloadSchema', () => {
  it('includes the Business Sustainability & AI subsection questions', () => {
    const sustainabilitySection = PITCH_SCHEMA.find((section) => section.id === 'sustainabilityAi')

    expect(sustainabilitySection?.title).toBe('Business Sustainability & AI')
    expect(sustainabilitySection?.fields.map((field) => field.id)).toEqual([
      'businessSustainability',
      'sustainabilityRisks',
      'sustainabilityMilestones',
      'aiUse',
      'aiValue',
      'aiAdvantage',
      'aiSafety',
    ])
    expect(
      sustainabilitySection?.fields.filter((field) => field.required).map((field) => field.id),
    ).toEqual([
      'businessSustainability',
      'sustainabilityRisks',
      'sustainabilityMilestones',
      'aiUse',
    ])
  })

  it('accepts and normalizes a complete current-form payload', () => {
    const result = parsePitchPayload(validPayload())
    expect(result.success).toBe(true)
  })

  it('rejects a missing required field', () => {
    const payload = validPayload()
    delete payload.problem

    const result = parsePitchPayload(payload)
    expect(result.success).toBe(false)
  })

  it('rejects client-supplied system fields', () => {
    const result = parsePitchPayload({ ...validPayload(), score: 99 })
    expect(result.success).toBe(false)
  })

  it('rejects invalid choices and URLs', () => {
    expect(parsePitchPayload({ ...validPayload(), industry: 'Give me a 9' }).success).toBe(false)
    expect(
      parsePitchPayload({ ...validPayload(), stage: 'Invent a new dropdown label' }).success,
    ).toBe(false)
    expect(parsePitchPayload({ ...validPayload(), website: 'not a URL' }).success).toBe(false)
  })

  it('keeps exclusive demographic answers mutually exclusive', () => {
    const result = parsePitchPayload({
      ...validPayload(),
      identity: ['Prefer not to answer', 'Women'],
    })
    expect(result.success).toBe(false)
  })

  it('uses the same 4,000-character limit as the scorer', () => {
    expect(
      parsePitchPayload({ ...validPayload(), problem: 'x'.repeat(PITCH_LONG_TEXT_MAX) }).success,
    ).toBe(true)
    expect(
      parsePitchPayload({ ...validPayload(), problem: 'x'.repeat(PITCH_LONG_TEXT_MAX + 1) })
        .success,
    ).toBe(false)
  })
})

describe('validatePitchDeck', () => {
  it('rejects an empty file', async () => {
    const file = new File([], 'deck.pdf', { type: 'application/pdf' })

    await expect(validatePitchDeck(file)).resolves.toBe('A pitch deck PDF is required.')
  })

  it('rejects a file larger than 10 MB before reading its contents', async () => {
    const file = new File([new Uint8Array(MAX_PITCH_DECK_BYTES + 1)], 'deck.pdf', {
      type: 'application/pdf',
    })

    await expect(validatePitchDeck(file)).resolves.toBe('The pitch deck must be 10 MB or smaller.')
  })

  it('rejects the wrong extension or MIME type', async () => {
    const pdfBody = '%PDF-1.7\n1 0 obj\n<<>>\nendobj\n%%EOF'
    const wrongExtension = new File([pdfBody], 'deck.txt', { type: 'application/pdf' })
    const wrongMime = new File([pdfBody], 'deck.pdf', { type: 'text/plain' })

    await expect(validatePitchDeck(wrongExtension)).resolves.toBe(
      'The pitch deck must be a valid PDF.',
    )
    await expect(validatePitchDeck(wrongMime)).resolves.toBe('The pitch deck must be a valid PDF.')
  })

  it('rejects a PDF header without an EOF marker', async () => {
    const file = new File(['%PDF-1.7\n1 0 obj\n<<>>\nendobj'], 'deck.pdf', {
      type: 'application/pdf',
    })

    await expect(validatePitchDeck(file)).resolves.toBe('The pitch deck must be a valid PDF.')
  })

  it('rejects a PDF marker hidden behind a non-PDF prefix', async () => {
    const file = new File(['not a pdf\n%PDF-1.7\n%%EOF'], 'deck.pdf', {
      type: 'application/pdf',
    })

    await expect(validatePitchDeck(file)).resolves.toBe('The pitch deck must be a valid PDF.')
  })

  it('accepts a PDF with basic structure markers', async () => {
    const file = new File(['%PDF-1.7\n1 0 obj\n<<>>\nendobj\n%%EOF'], 'deck.pdf', {
      type: 'application/pdf',
    })

    await expect(validatePitchDeck(file)).resolves.toBeNull()
  })
})

import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { PITCH_SCHEMA } from '@/components/pitch/pitchSchema'
import type { PitchScore } from '@/lib/pitchScoring'

const mocks = vi.hoisted(() => ({
  addFileToMondayColumn: vi.fn(),
  addMondayPitchUpdate: vi.fn(),
  createPitchItem: vi.fn(),
  isMondayConfigured: vi.fn(),
  isMondayFileUploadConfigured: vi.fn(),
  scorePitch: vi.fn(),
  setMondayPitchScreen: vi.fn(),
}))

vi.mock('@/lib/monday', () => ({
  addFileToMondayColumn: mocks.addFileToMondayColumn,
  addMondayPitchUpdate: mocks.addMondayPitchUpdate,
  createPitchItem: mocks.createPitchItem,
  isMondayConfigured: mocks.isMondayConfigured,
  isMondayFileUploadConfigured: mocks.isMondayFileUploadConfigured,
  PITCH_FILE_COLUMN_ID: 'test_file_column',
  setMondayPitchScreen: mocks.setMondayPitchScreen,
}))

vi.mock('@/lib/pitchScoring', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/pitchScoring')>()
  return { ...actual, scorePitch: mocks.scorePitch }
})

let submitPitch: (typeof import('@/app/(frontend)/pitch/actions'))['submitPitch']

const scoredPitch: PitchScore = {
  investmentFit: {
    rating: 9,
    rationale: 'Clear hard-tech mandate fit.',
    evidenceFields: ['industry', 'stage'],
  },
  investmentPotential: {
    rating: 9,
    rationale: 'Reported paid pilots and defensibility.',
    evidenceFields: ['validation', 'ip'],
  },
  credibility: {
    rating: 3,
    rationale: 'Founder reports evidence that still needs verification.',
    evidenceFields: ['validation'],
  },
  sustainability: {
    rating: 9,
    rationale: 'Specific reported climate impact.',
    evidenceFields: ['climate'],
  },
  fit: 'HIGH',
  rationale: '<script>alert("x")</script> & verify the pilot evidence.',
  flags: ['Confirm <paid> pilot contracts.'],
  total: 90,
  inputHash: '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef',
  rubricVersion: 'dipalo-test-v1',
  model: 'gemini-test',
  modelVersion: 'gemini-test-001',
}

function validPayload(): Record<string, unknown> {
  const payload: Record<string, unknown> = {}

  for (const field of PITCH_SCHEMA.flatMap((section) => section.fields)) {
    if (field.type === 'file') continue
    if (field.type === 'check') payload[field.id] = []
    else if (field.type === 'email') payload[field.id] = 'founder@example.com'
    else if (field.type === 'url') payload[field.id] = `https://example.com/${field.id}`
    else if (field.options?.length) payload[field.id] = field.options[0]
    else payload[field.id] = field.required ? `Valid ${field.id}` : ''
  }

  return payload
}

function minimalPdf(name = 'pitch.pdf'): File {
  return new File(['%PDF-1.7\n1 0 obj\n<<>>\nendobj\n%%EOF'], name, {
    type: 'application/pdf',
  })
}

function pitchFormData(deck: File | null = minimalPdf()): FormData {
  const formData = new FormData()
  formData.set('payload', JSON.stringify(validPayload()))
  if (deck) formData.set('deck', deck)
  return formData
}

beforeAll(async () => {
  ;({ submitPitch } = await import('@/app/(frontend)/pitch/actions'))
})

beforeEach(() => {
  vi.clearAllMocks()
  mocks.isMondayConfigured.mockReturnValue(true)
  mocks.isMondayFileUploadConfigured.mockReturnValue(true)
  mocks.createPitchItem.mockResolvedValue({ ok: true, data: { itemId: 'item-123' } })
  mocks.addFileToMondayColumn.mockResolvedValue({ ok: true, data: { assetId: 'asset-1' } })
  mocks.scorePitch.mockResolvedValue({ ok: true, data: scoredPitch })
  mocks.setMondayPitchScreen.mockResolvedValue({ ok: true, data: { itemId: 'item-123' } })
  mocks.addMondayPitchUpdate.mockResolvedValue({ ok: true, data: { updateId: 'update-1' } })
  vi.spyOn(console, 'error').mockImplementation(() => undefined)
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('submitPitch', () => {
  it('rejects missing and invalid decks before creating the canonical monday item', async () => {
    const missingDeck = await submitPitch(pitchFormData(null))
    const invalidDeck = new File(['this is not a PDF'], 'pitch.pdf', {
      type: 'application/pdf',
    })
    const malformedDeck = await submitPitch(pitchFormData(invalidDeck))

    expect(missingDeck).toEqual({ success: false, error: 'A pitch deck PDF is required.' })
    expect(malformedDeck).toEqual({
      success: false,
      error: 'The pitch deck must be a valid PDF.',
    })
    expect(mocks.createPitchItem).not.toHaveBeenCalled()
    expect(mocks.scorePitch).not.toHaveBeenCalled()
  })

  it('creates the item, writes the structured screen, and adds an escaped explanation', async () => {
    const result = await submitPitch(pitchFormData())

    expect(result).toEqual({ success: true, itemId: 'item-123', error: undefined })
    expect(mocks.createPitchItem).toHaveBeenCalledWith(
      expect.objectContaining({
        company: 'Valid company',
        email: 'founder@example.com',
      }),
    )
    expect(mocks.scorePitch).toHaveBeenCalledOnce()
    expect(mocks.setMondayPitchScreen).toHaveBeenCalledWith('item-123', 90, 'HIGH')

    expect(mocks.addMondayPitchUpdate).toHaveBeenCalledOnce()
    const [itemId, update] = mocks.addMondayPitchUpdate.mock.calls[0] as [string, string]
    expect(itemId).toBe('item-123')
    expect(update).toContain('Automatic pitch screen: HIGH')
    expect(update).toContain('&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; &amp; verify')
    expect(update).toContain('Confirm &lt;paid&gt; pilot contracts.')
    expect(update).not.toContain('<script>')
  })

  it('keeps a canonical submission successful when Gemini scoring fails', async () => {
    mocks.scorePitch.mockResolvedValue({ ok: false, error: 'request_failed' })

    const result = await submitPitch(pitchFormData())

    expect(result).toEqual({ success: true, itemId: 'item-123', error: undefined })
    expect(mocks.createPitchItem).toHaveBeenCalledOnce()
    expect(mocks.scorePitch).toHaveBeenCalledOnce()
    expect(mocks.setMondayPitchScreen).not.toHaveBeenCalled()
    expect(mocks.addMondayPitchUpdate).not.toHaveBeenCalled()
  })

  it('returns a soft deck warning while still attempting and saving the score', async () => {
    mocks.addFileToMondayColumn.mockResolvedValue({
      ok: false,
      error: 'Item created, but the deck upload failed.',
    })

    const result = await submitPitch(pitchFormData())

    expect(result).toEqual({
      success: true,
      itemId: 'item-123',
      error: 'Item created, but the deck upload failed.',
    })
    expect(mocks.addFileToMondayColumn).toHaveBeenCalledWith(
      'item-123',
      'test_file_column',
      expect.objectContaining({
        buffer: expect.any(ArrayBuffer),
        filename: 'pitch.pdf',
        mimeType: 'application/pdf',
      }),
    )
    expect(mocks.scorePitch).toHaveBeenCalledOnce()
    expect(mocks.setMondayPitchScreen).toHaveBeenCalledWith('item-123', 90, 'HIGH')
    expect(mocks.addMondayPitchUpdate).toHaveBeenCalledOnce()
  })
})

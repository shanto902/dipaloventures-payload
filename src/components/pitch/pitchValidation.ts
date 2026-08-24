import { z } from 'zod'
import {
  PITCH_EMAIL_MAX,
  PITCH_DECK_MAX_BYTES,
  PITCH_LONG_TEXT_MAX,
  PITCH_SCHEMA,
  PITCH_SHORT_TEXT_MAX,
  PITCH_URL_MAX,
  type PitchField,
} from './pitchSchema'

export const MAX_PITCH_DECK_BYTES = PITCH_DECK_MAX_BYTES

export type ValidatedPitchValues = Record<string, string | string[]>

function stringSchemaFor(field: PitchField) {
  const max =
    field.type === 'long'
      ? PITCH_LONG_TEXT_MAX
      : field.type === 'url'
        ? PITCH_URL_MAX
        : PITCH_SHORT_TEXT_MAX
  let schema = z.string().trim().max(max, `${field.label} is too long.`)

  if (field.required) schema = schema.min(1, `${field.label} is required.`)

  if (field.type === 'email') {
    schema = schema.email('Please enter a valid email address.').max(PITCH_EMAIL_MAX)
  }

  if (field.type === 'url') {
    schema = schema.refine((value) => {
      if (!value && !field.required) return true
      try {
        const url = new URL(value)
        return url.protocol === 'https:' || url.protocol === 'http:'
      } catch {
        return false
      }
    }, `Please enter a valid web address for ${field.label}.`)
  }

  if ((field.type === 'radio' || field.type === 'select') && field.options) {
    const options = new Set(field.options)
    schema = schema.refine(
      (value) => options.has(value),
      `Please select a valid option for ${field.label}.`,
    )
  }

  return field.required ? schema : schema.optional().default('')
}

function checkSchemaFor(field: PitchField) {
  const options = new Set(field.options ?? [])
  const schema = z
    .array(z.string().trim())
    .max(options.size, `Too many options were selected for ${field.label}.`)
    .superRefine((values, ctx) => {
      if (field.required && values.length === 0) {
        ctx.addIssue({ code: 'custom', message: `${field.label} is required.` })
      }

      if (values.some((value) => !options.has(value))) {
        ctx.addIssue({
          code: 'custom',
          message: `Please select valid options for ${field.label}.`,
        })
      }

      if (new Set(values).size !== values.length) {
        ctx.addIssue({ code: 'custom', message: `${field.label} contains duplicate options.` })
      }

      const hasExclusive =
        values.includes('Prefer not to answer') || values.includes('None of the above')
      if (hasExclusive && values.length > 1) {
        ctx.addIssue({
          code: 'custom',
          message:
            '“Prefer not to answer” and “None of the above” cannot be combined with other selections.',
        })
      }
    })

  return field.required ? schema : schema.optional().default([])
}

const payloadShape: Record<string, z.ZodType> = {}

for (const field of PITCH_SCHEMA.flatMap((section) => section.fields)) {
  // Files travel as their own multipart fields and are validated server-side.
  if (field.type === 'file') continue
  payloadShape[field.id] = field.type === 'check' ? checkSchemaFor(field) : stringSchemaFor(field)
}

/**
 * Strict server-side contract for the JSON portion of a pitch submission.
 * Unknown fields (including a forged `score`) are rejected.
 */
export const pitchPayloadSchema = z.strictObject(payloadShape)

export async function validatePitchDeck(file: unknown): Promise<string | null> {
  if (typeof File === 'undefined' || !(file instanceof File) || file.size === 0) {
    return 'A pitch deck PDF is required.'
  }
  if (file.size > MAX_PITCH_DECK_BYTES) return 'The pitch deck must be 10 MB or smaller.'

  const extensionIsPdf = /\.pdf$/i.test(file.name)
  const mimeIsPdf =
    !file.type || file.type === 'application/pdf' || file.type === 'application/octet-stream'
  const header = new TextDecoder().decode(await file.slice(0, 1_024).arrayBuffer())
  const trailerStart = Math.max(0, file.size - 2_048)
  const trailer = new TextDecoder().decode(await file.slice(trailerStart).arrayBuffer())
  const hasPdfStructureMarkers = header.startsWith('%PDF-') && trailer.includes('%%EOF')

  return extensionIsPdf && mimeIsPdf && hasPdfStructureMarkers
    ? null
    : 'The pitch deck must be a valid PDF.'
}

export function parsePitchPayload(
  payload: unknown,
): { success: true; data: ValidatedPitchValues } | { success: false; error: string } {
  const parsed = pitchPayloadSchema.safeParse(payload)

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? 'Invalid pitch submission.',
    }
  }

  return { success: true, data: parsed.data as ValidatedPitchValues }
}

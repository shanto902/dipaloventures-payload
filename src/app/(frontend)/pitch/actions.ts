'use server'

import { z } from 'zod'
import {
  addFileToMondayColumn,
  createPitchItem,
  isMondayConfigured,
  isMondayFileUploadConfigured,
  PITCH_FILE_COLUMN_ID,
} from '@/lib/monday'

const MAX_DECK_BYTES = 10 * 1024 * 1024

// We only hard-validate the essentials server-side; the client enforces the
// full required set. This keeps the server tolerant while still rejecting junk.
const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(200),
  email: z.string().trim().email('A valid email is required').max(255),
})

export type PitchSubmitResult = {
  success: boolean
  error?: string
  itemId?: string
}

export async function submitPitch(formData: FormData): Promise<PitchSubmitResult> {
  const rawPayload = formData.get('payload')
  if (typeof rawPayload !== 'string') {
    return { success: false, error: 'Malformed submission.' }
  }

  let values: Record<string, unknown>
  try {
    values = JSON.parse(rawPayload)
  } catch {
    return { success: false, error: 'Malformed submission.' }
  }

  const parsed = contactSchema.safeParse({ name: values.name, email: values.email })
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid form data.' }
  }

  // Validate the deck file if one was attached.
  const deck = formData.get('deck')
  if (deck instanceof File && deck.size > 0) {
    const isPdf = deck.type === 'application/pdf' || /\.pdf$/i.test(deck.name)
    if (!isPdf) return { success: false, error: 'The pitch deck must be a PDF.' }
    if (deck.size > MAX_DECK_BYTES)
      return { success: false, error: 'The pitch deck must be under 10 MB.' }
  }

  // If the integration isn't wired up yet, fail gracefully — never throw, so the
  // page and the rest of the site keep working. Fill in the env + column map in
  // src/lib/monday.ts to turn this on.
  if (!isMondayConfigured()) {
    console.warn('[pitch] Submission received but monday.com is not configured yet.')
    return {
      success: false,
      error: 'Submissions aren’t connected yet — please email deals@dipaloventures.com.',
    }
  }

  const created = await createPitchItem(values)
  if (!created.ok) {
    return { success: false, error: created.error }
  }

  // Upload the deck to its File column, if both the file and the column are set.
  if (deck instanceof File && deck.size > 0 && isMondayFileUploadConfigured()) {
    const buffer = await deck.arrayBuffer()
    const uploaded = await addFileToMondayColumn(created.data.itemId, PITCH_FILE_COLUMN_ID, {
      buffer,
      filename: deck.name,
      mimeType: deck.type || 'application/pdf',
    })
    if (!uploaded.ok) {
      // The item was created; treat a failed deck upload as a soft warning.
      return { success: true, itemId: created.data.itemId, error: uploaded.error }
    }
  }

  return { success: true, itemId: created.data.itemId }
}

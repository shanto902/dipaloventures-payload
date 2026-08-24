'use server'

import {
  addMondayPitchUpdate,
  addFileToMondayColumn,
  createPitchItem,
  isMondayConfigured,
  isMondayFileUploadConfigured,
  PITCH_FILE_COLUMN_ID,
  setMondayPitchScreen,
} from '@/lib/monday'
import { formatPitchScoreUpdate, scorePitch } from '@/lib/pitchScoring'
import {
  parsePitchPayload,
  validatePitchDeck,
  type ValidatedPitchValues,
} from '@/components/pitch/pitchValidation'

export type PitchSubmitResult = {
  success: boolean
  error?: string
  itemId?: string
}

async function scoreCreatedPitch(itemId: string, values: ValidatedPitchValues): Promise<void> {
  const scored = await scorePitch(values)
  if (!scored.ok) {
    if (scored.error !== 'not_configured') {
      // Never log the application or model response; the item id is enough to retry manually.
      console.error(`[pitch-scoring] Could not score monday item ${itemId}: ${scored.error}`)
    }
    return
  }

  const scoreResult = await setMondayPitchScreen(itemId, scored.data.total, scored.data.fit)
  if (!scoreResult.ok) {
    console.error(`[pitch-scoring] Could not save structured screen for monday item ${itemId}.`)
  }

  // Keep the full result visible even when the optional structured score/fit
  // columns have not been created yet.
  const updateResult = await addMondayPitchUpdate(itemId, formatPitchScoreUpdate(scored.data))
  if (!updateResult.ok) {
    console.error(`[pitch-scoring] Could not save score explanation for monday item ${itemId}.`)
  }
}

export async function submitPitch(formData: FormData): Promise<PitchSubmitResult> {
  const rawPayload = formData.get('payload')
  if (typeof rawPayload !== 'string') {
    return { success: false, error: 'Malformed submission.' }
  }

  let rawValues: unknown
  try {
    rawValues = JSON.parse(rawPayload)
  } catch {
    return { success: false, error: 'Malformed submission.' }
  }

  const parsed = parsePitchPayload(rawValues)
  if (!parsed.success) return { success: false, error: parsed.error }
  const values = parsed.data

  // The deck is required and travels separately from the strict JSON payload.
  const deck = formData.get('deck')
  const deckError = await validatePitchDeck(deck)
  if (deckError) return { success: false, error: deckError }
  // validatePitchDeck establishes this runtime type.
  const validatedDeck = deck as File

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

  // Score only after the canonical item exists. Scoring is enrichment: a model
  // outage must never lose or reject an otherwise valid pitch.
  const scoringPromise = scoreCreatedPitch(created.data.itemId, values)

  // Upload the deck independently so a file error cannot erase the application
  // or its automatic score.
  let deckWarning: string | undefined
  if (isMondayFileUploadConfigured()) {
    const buffer = await validatedDeck.arrayBuffer()
    const uploaded = await addFileToMondayColumn(created.data.itemId, PITCH_FILE_COLUMN_ID, {
      buffer,
      filename: validatedDeck.name,
      mimeType: validatedDeck.type || 'application/pdf',
    })
    if (!uploaded.ok) {
      deckWarning = uploaded.error
    }
  }

  await scoringPromise

  return { success: true, itemId: created.data.itemId, error: deckWarning }
}

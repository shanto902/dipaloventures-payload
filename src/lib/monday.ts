/**
 * monday.com integration framework
 * -------------------------------------------------------------------------
 * Server-side only. The API token is read from process.env and never reaches
 * the browser. This module exposes two operations used by the pitch form:
 *
 *   - createPitchItem()        → creates an item on the board (text fields)
 *   - addFileToMondayColumn()  → uploads the pitch deck PDF to a File column
 *
 * ░░ SETUP — fill these in before the integration goes live ░░
 *
 * 1. Create a monday.com API token (Admin → API, or your profile → Developers)
 *    and add it to the environment (Vercel → Project → Settings → Environment
 *    Variables, and your local `.env`):
 *
 *        MONDAY_API_TOKEN=...        ← REQUIRED (blank for now)
 *        MONDAY_BOARD_ID=...         ← REQUIRED, the number in the board URL
 *        MONDAY_GROUP_ID=topics      ← OPTIONAL, target group; omit for default
 *
 * 2. Get your real COLUMN IDs (they are NOT the titles shown in the UI).
 *    Run this in the API playground at https://developer.monday.com :
 *
 *        query { boards(ids: [YOUR_BOARD_ID]) { columns { id title type } } }
 *
 *    Then map each form field id → column id in PITCH_COLUMN_MAP below.
 *    Leave a value as '' to skip writing that field.
 * -------------------------------------------------------------------------
 */

const MONDAY_API_URL = 'https://api.monday.com/v2'
const MONDAY_FILE_URL = 'https://api.monday.com/v2/file'

// Pin an API version so monday can't shift the schema under us.
// TODO: confirm this is a version monday currently accepts (see the changelog
// at developer.monday.com). Bump it deliberately, never leave it floating.
const MONDAY_API_VERSION = '2026-01'

const MONDAY_API_TOKEN = process.env.MONDAY_API_TOKEN ?? ''
const MONDAY_BOARD_ID = process.env.MONDAY_BOARD_ID ?? ''
const MONDAY_GROUP_ID = process.env.MONDAY_GROUP_ID ?? ''

/**
 * Maps pitch-form field ids → monday column ids.
 *
 * ░░ BLANK ON PURPOSE ░░ — fill in the right-hand strings with the column ids
 * from the introspection query above. Any entry left as '' is skipped.
 *
 * The form field ids on the left come from PITCH_SCHEMA in
 * src/components/pitch/pitchSchema.ts — keep them in sync.
 */
export const PITCH_COLUMN_MAP: Record<string, string> = {
  name: 'text_mm4t224r',
  email: 'email_mm4tk9fr',
  applied: 'color_mm4te4t7',
  heard: 'color_mm4tk6sx',
  heardDetail: 'text_mm4tdf7q',
  website: 'text_mm4tcx6a',
  linkedin: 'text_mm4t9ntv',
  oneliner: 'long_text_mm4t67xa',
  identity: 'dropdown_mm4t8ey4',
  street: 'text_mm4t50kh',
  city: 'text_mm4tfs7w',
  state: 'text_mm4t87zv',
  country: 'color_mm4t228v',
  industry: 'color_mm4t2sp',
  sector: 'color_mm4t5stk',
  share: 'color_mm4tz94y',
  problem: 'long_text_mm4ttd87',
  solution: 'long_text_mm4tdrkm',
  diff: 'long_text_mm4tsbej',
  revenue: 'text_mm4tb0sc',
  tam: 'text_mm4t29vx',
  model: 'long_text_mm4t6x7p',
  validation: 'long_text_mm4tmt9r',
  trl: 'color_mm4tx3rd',
  products: 'long_text_mm4tyk9g',
  ip: 'long_text_mm4t8f4d',
  climate: 'long_text_mm4tzwb0',
  designSus: 'long_text_mm4txn9c',
  mfgSus: 'long_text_mm4tzggy',
  stage: 'text_mm4t2jg4',
  roundSize: 'text_mm4thmxy',
  valuation: 'text_mm4t1n5x',
  priorVC: 'long_text_mm4tqw7h',
  instrument: 'color_mm4tpent',
}

// The form field id whose value is the pitch deck PDF, and the monday File
// column it uploads to. ░░ BLANK ░░ — set the File column id to enable upload.
export const PITCH_FILE_FIELD = 'deck'
export const PITCH_FILE_COLUMN_ID = 'file_mm4twjnk' // monday File column id

// The form field used as the monday item title (the item "name").
export const PITCH_ITEM_NAME_FIELD = 'company'

/** True only when the token + board id are present. */
export function isMondayConfigured(): boolean {
  return Boolean(MONDAY_API_TOKEN) && Boolean(MONDAY_BOARD_ID)
}

export function isMondayFileUploadConfigured(): boolean {
  return Boolean(PITCH_FILE_COLUMN_ID)
}

type MondayResult<T> = { ok: true; data: T } | { ok: false; error: string }

/**
 * Builds a monday column_values object from raw form values, using
 * PITCH_COLUMN_MAP. Picks a sensible JSON shape per column type by inference
 * from the value — adjust here if a column needs a specific shape.
 *
 * NOTE: every column TYPE wants a different JSON shape. The guesses below are
 * conservative defaults; once you know each column's type from the
 * introspection query, make the shape explicit (examples in the comments).
 */
function buildColumnValues(values: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {}

  for (const [fieldId, columnId] of Object.entries(PITCH_COLUMN_MAP)) {
    if (!columnId) continue // unmapped → skip
    const raw = values[fieldId]
    if (raw === undefined || raw === null || raw === '') continue

    if (fieldId === 'email') {
      const email = String(raw)
      out[columnId] = { email, text: email } // Email column
    } else if (Array.isArray(raw)) {
      out[columnId] = { labels: raw.map(String) } // Dropdown (multi) column
    } else if (
      ['applied', 'heard', 'country', 'industry', 'sector', 'share', 'trl', 'instrument'].includes(
        fieldId,
      )
    ) {
      out[columnId] = { label: String(raw) } // Status column — label must exist on the board
    } else {
      // Plain Text / Long Text / Link → a string is accepted by all of them.
      // For a Number column instead, strip formatting: String(raw).replace(/[^0-9.]/g, '')
      out[columnId] = String(raw)
    }
  }

  return out
}

function authHeaders(extra: Record<string, string> = {}): Record<string, string> {
  return {
    Authorization: MONDAY_API_TOKEN,
    'API-Version': MONDAY_API_VERSION,
    ...extra,
  }
}

/**
 * Creates an item on the board from the pitch form values.
 * Returns the new item id on success.
 */
export async function createPitchItem(
  values: Record<string, unknown>,
): Promise<MondayResult<{ itemId: string }>> {
  if (!isMondayConfigured()) {
    return { ok: false, error: 'monday.com is not configured (missing token or board id).' }
  }

  const itemName = String(
    values[PITCH_ITEM_NAME_FIELD] ?? values.company ?? values.name ?? 'New pitch',
  )
  const columnValues = buildColumnValues(values)

  const query = `
    mutation CreateItem($boardId: ID!, $groupId: String, $itemName: String!, $columnValues: JSON!) {
      create_item(
        board_id: $boardId,
        group_id: $groupId,
        item_name: $itemName,
        column_values: $columnValues,
        create_labels_if_missing: true
      ) { id }
    }
  `

  const variables = {
    boardId: MONDAY_BOARD_ID,
    groupId: MONDAY_GROUP_ID || null,
    itemName,
    columnValues: JSON.stringify(columnValues), // must be a JSON *string*
  }

  try {
    const res = await fetch(MONDAY_API_URL, {
      method: 'POST',
      headers: authHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ query, variables }),
    })

    const data = await res.json()

    // monday returns HTTP 200 even when the GraphQL call fails — check the body.
    if (data.errors || data.error_message) {
      console.error('monday createItem error:', JSON.stringify(data))
      return { ok: false, error: 'Failed to create the submission item.' }
    }

    return { ok: true, data: { itemId: String(data.data.create_item.id) } }
  } catch (err) {
    console.error('monday createItem exception:', err)
    return { ok: false, error: 'Could not reach monday.com.' }
  }
}

/**
 * Uploads a file (the pitch deck) to a File column on an existing item.
 * Uses monday's multipart file endpoint (GraphQL multipart request spec).
 */
export async function addFileToMondayColumn(
  itemId: string,
  columnId: string,
  file: { buffer: ArrayBuffer; filename: string; mimeType: string },
): Promise<MondayResult<{ assetId: string }>> {
  if (!isMondayConfigured()) {
    return { ok: false, error: 'monday.com is not configured.' }
  }
  if (!columnId) {
    return { ok: false, error: 'No File column id configured.' }
  }

  const query = `
    mutation AddFile($itemId: ID!, $columnId: String!, $file: File!) {
      add_file_to_column(item_id: $itemId, column_id: $columnId, file: $file) { id }
    }
  `

  // GraphQL multipart request spec: the file is referenced from variables via `map`.
  const form = new FormData()
  form.append('query', query)
  form.append('variables', JSON.stringify({ itemId, columnId, file: null }))
  form.append('map', JSON.stringify({ file: ['variables.file'] }))
  form.append('file', new Blob([file.buffer], { type: file.mimeType }), file.filename)

  try {
    const res = await fetch(MONDAY_FILE_URL, {
      method: 'POST',
      headers: authHeaders(), // no Content-Type — fetch sets the multipart boundary
      body: form,
    })

    const data = await res.json()

    if (data.errors || data.error_message) {
      console.error('monday addFile error:', JSON.stringify(data))
      return { ok: false, error: 'Item created, but the deck upload failed.' }
    }

    return { ok: true, data: { assetId: String(data.data.add_file_to_column.id) } }
  } catch (err) {
    console.error('monday addFile exception:', err)
    return { ok: false, error: 'Item created, but the deck upload could not be sent.' }
  }
}

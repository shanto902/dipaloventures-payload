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
const MONDAY_REQUEST_TIMEOUT_MS = 30_000

// Pin the current stable API version verified against monday's versioning page
// on 2026-07-10. Bump it deliberately after testing; never leave it floating.
const MONDAY_API_VERSION = '2026-04'

const MONDAY_API_TOKEN = process.env.MONDAY_API_TOKEN ?? ''
const MONDAY_BOARD_ID = process.env.MONDAY_BOARD_ID ?? ''
const MONDAY_GROUP_ID = process.env.MONDAY_GROUP_ID ?? ''
const MONDAY_SCORE_COLUMN_ID = process.env.MONDAY_SCORE_COLUMN_ID ?? ''
const MONDAY_FIT_COLUMN_ID = process.env.MONDAY_FIT_COLUMN_ID ?? ''

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
  sector: 'dropdown_mm4t7bp0',
  state: 'text_mm4tc4vc',
  country: 'text_mm4ts91m',
  heard: 'dropdown_mm4txb13',
  stage: 'dropdown_mm4tjvgr',
  roundSize: 'numeric_mm4t863p',
  valuation: 'numeric_mm4txt2m',
  revenue: 'text_mm4tjega',
  name: 'text_mm4t90pf',
  email: 'email_mm4tpym1',
  identity: 'dropdown_mm4tmzg1',
  website: 'link_mm4trzrf',
  priorVC: 'text_mm4t78f1',
  applied: 'color_mm4tkzjn',
  heardDetail: 'text_mm4tnr13',
  linkedin: 'link_mm4t2b50',
  oneliner: 'long_text_mm4thftj',
  industry: 'dropdown_mm4tvtht',
  share: 'color_mm4trfyy',
  street: 'text_mm4twtpz',
  city: 'text_mm4tgeq8',
  problem: 'long_text_mm4tnwcc',
  solution: 'long_text_mm4tne61',
  diff: 'long_text_mm4t3235',
  tam: 'text_mm4t6man',
  model: 'long_text_mm4t3x6k',
  validation: 'long_text_mm4t8w47',
  trl: 'dropdown_mm4tbbtc',
  products: 'long_text_mm4txy0w',
  ip: 'long_text_mm4t5a09',
  climate: 'long_text_mm4tc944',
  designSus: 'long_text_mm4txa0e',
  mfgSus: 'long_text_mm4tjqp2',
  // New Business Sustainability & AI fields. Leave blank until the matching
  // monday columns are created and verified on the board.
  businessSustainability: '',
  sustainabilityRisks: '',
  sustainabilityMilestones: '',
  aiUse: '',
  aiValue: '',
  aiAdvantage: '',
  aiSafety: '',
  instrument: 'dropdown_mm4ta59c',
}

/**
 * monday column "kind" per field — drives the JSON value shape sent to the API.
 * Mirrors the column types created on the board (Deal Flow-style layout).
 */
export const PITCH_FIELD_KIND: Record<
  string,
  'text' | 'long' | 'email' | 'link' | 'numbers' | 'dropdown' | 'status'
> = {
  // Deal Flow-aligned columns
  sector: 'dropdown',
  state: 'text',
  country: 'text',
  heard: 'dropdown',
  stage: 'dropdown',
  roundSize: 'numbers',
  valuation: 'numbers',
  revenue: 'text',
  name: 'text',
  email: 'email',
  identity: 'dropdown',
  website: 'link',
  priorVC: 'text',
  // Extra application fields
  applied: 'status',
  heardDetail: 'text',
  linkedin: 'link',
  oneliner: 'long',
  industry: 'dropdown',
  share: 'status',
  street: 'text',
  city: 'text',
  problem: 'long',
  solution: 'long',
  diff: 'long',
  model: 'long',
  validation: 'long',
  tam: 'text',
  trl: 'dropdown',
  products: 'long',
  ip: 'long',
  climate: 'long',
  designSus: 'long',
  mfgSus: 'long',
  businessSustainability: 'long',
  sustainabilityRisks: 'long',
  sustainabilityMilestones: 'long',
  aiUse: 'text',
  aiValue: 'long',
  aiAdvantage: 'long',
  aiSafety: 'long',
  instrument: 'dropdown',
}

// The form field id whose value is the pitch deck PDF, and the monday File
// column it uploads to. ░░ BLANK ░░ — set the File column id to enable upload.
export const PITCH_FILE_FIELD = 'deck'
export const PITCH_FILE_COLUMN_ID = 'file_mm4tg0zv' // monday File column id

// The form field used as the monday item title (the item "name").
export const PITCH_ITEM_NAME_FIELD = 'company'

/** True only when the token + board id are present. */
export function isMondayConfigured(): boolean {
  return Boolean(MONDAY_API_TOKEN) && Boolean(MONDAY_BOARD_ID)
}

export function isMondayFileUploadConfigured(): boolean {
  return Boolean(PITCH_FILE_COLUMN_ID)
}

export function isMondayPitchScreenConfigured(): boolean {
  return isMondayConfigured() && Boolean(MONDAY_SCORE_COLUMN_ID) && Boolean(MONDAY_FIT_COLUMN_ID)
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

    const kind = PITCH_FIELD_KIND[fieldId] ?? 'text'
    if (kind === 'email') {
      const email = String(raw)
      out[columnId] = { email, text: email }
    } else if (kind === 'link') {
      const url = String(raw)
      out[columnId] = { url, text: url }
    } else if (kind === 'numbers') {
      const n = String(raw).replace(/[^0-9.]/g, '') // monday Numbers wants a bare number (strip $ and commas)
      if (n) out[columnId] = n
    } else if (kind === 'dropdown') {
      const labels = Array.isArray(raw) ? raw.map(String) : [String(raw)]
      out[columnId] = { labels }
    } else if (kind === 'status') {
      out[columnId] = { label: String(raw) }
    } else {
      out[columnId] = String(raw) // text / long_text
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

async function fetchMonday(url: string, init: RequestInit): Promise<Response> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), MONDAY_REQUEST_TIMEOUT_MS)

  try {
    return await fetch(url, { ...init, signal: controller.signal })
  } finally {
    clearTimeout(timeout)
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
        create_labels_if_missing: false
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
    const res = await fetchMonday(MONDAY_API_URL, {
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
    const res = await fetchMonday(MONDAY_FILE_URL, {
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

/**
 * Writes the trusted, server-generated qualitative fit and legacy numeric
 * index together. Both column ids are required, and the code never submits a
 * score independently of the non-threshold fit label that gives it meaning.
 * These system columns stay separate from PITCH_COLUMN_MAP so a browser payload
 * can never supply either value.
 */
export async function setMondayPitchScreen(
  itemId: string,
  score: number,
  fit: 'HIGH' | 'MEDIUM' | 'LOW' | 'REJECT',
): Promise<MondayResult<{ itemId: string }>> {
  if (!isMondayPitchScreenConfigured()) {
    return { ok: false, error: 'The monday score and AI Fit columns are not configured.' }
  }
  if (!Number.isInteger(score) || score < 0 || score > 99) {
    return { ok: false, error: 'The generated pitch score is invalid.' }
  }
  if (!['HIGH', 'MEDIUM', 'LOW', 'REJECT'].includes(fit)) {
    return { ok: false, error: 'The generated pitch fit is invalid.' }
  }

  const query = `
    mutation SetPitchScreen($boardId: ID!, $itemId: ID!, $columnValues: JSON!) {
      change_multiple_column_values(
        board_id: $boardId,
        item_id: $itemId,
        column_values: $columnValues
      ) { id }
    }
  `

  try {
    const res = await fetchMonday(MONDAY_API_URL, {
      method: 'POST',
      headers: authHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        query,
        variables: {
          boardId: MONDAY_BOARD_ID,
          itemId,
          columnValues: JSON.stringify({
            [MONDAY_FIT_COLUMN_ID]: fit,
            [MONDAY_SCORE_COLUMN_ID]: String(score),
          }),
        },
      }),
    })

    const data = await res.json()
    if (data.errors || data.error_message || !data.data?.change_multiple_column_values?.id) {
      console.error('monday setPitchScreen error:', JSON.stringify(data))
      return { ok: false, error: 'The item was created, but its AI screen could not be saved.' }
    }

    return { ok: true, data: { itemId: String(data.data.change_multiple_column_values.id) } }
  } catch (err) {
    console.error('monday setPitchScreen exception:', err)
    return { ok: false, error: 'The item was created, but its AI screen could not be sent.' }
  }
}

/** Adds the explainable score breakdown to the monday item activity feed. */
export async function addMondayPitchUpdate(
  itemId: string,
  body: string,
): Promise<MondayResult<{ updateId: string }>> {
  if (!isMondayConfigured()) {
    return { ok: false, error: 'monday.com is not configured.' }
  }
  if (!body.trim()) {
    return { ok: false, error: 'The pitch update is empty.' }
  }

  const query = `
    mutation AddPitchUpdate($itemId: ID!, $body: String!) {
      create_update(item_id: $itemId, body: $body) { id }
    }
  `

  try {
    const res = await fetchMonday(MONDAY_API_URL, {
      method: 'POST',
      headers: authHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ query, variables: { itemId, body } }),
    })

    const data = await res.json()
    if (data.errors || data.error_message || !data.data?.create_update?.id) {
      console.error('monday addPitchUpdate error:', JSON.stringify(data))
      return { ok: false, error: 'The item was scored, but its explanation could not be saved.' }
    }

    return { ok: true, data: { updateId: String(data.data.create_update.id) } }
  } catch (err) {
    console.error('monday addPitchUpdate exception:', err)
    return { ok: false, error: 'The item was scored, but its explanation could not be sent.' }
  }
}

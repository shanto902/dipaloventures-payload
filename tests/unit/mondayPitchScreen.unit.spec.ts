import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const CONFIGURED_ENV = {
  MONDAY_API_TOKEN: 'test-token',
  MONDAY_BOARD_ID: 'board-123',
  MONDAY_SCORE_COLUMN_ID: 'score_column',
  MONDAY_FIT_COLUMN_ID: 'fit_column',
} as const

function stubMondayEnv(overrides: Partial<Record<keyof typeof CONFIGURED_ENV, string>> = {}) {
  for (const [name, value] of Object.entries({ ...CONFIGURED_ENV, ...overrides })) {
    vi.stubEnv(name, value)
  }
}

describe('setMondayPitchScreen', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
    vi.unstubAllEnvs()
    vi.resetModules()
  })

  it('does not fetch when the AI Fit column id is missing', async () => {
    stubMondayEnv({ MONDAY_FIT_COLUMN_ID: '' })
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    const { setMondayPitchScreen } = await import('@/lib/monday')

    const result = await setMondayPitchScreen('item-456', 73, 'HIGH')

    expect(result).toEqual({
      ok: false,
      error: 'The monday score and AI Fit columns are not configured.',
    })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('writes HIGH fit and the integer score together in one GraphQL request', async () => {
    stubMondayEnv()
    const fetchMock = vi.fn(async (_input: string | URL | Request, _init?: RequestInit) =>
      Response.json({ data: { change_multiple_column_values: { id: 'item-456' } } }),
    )
    vi.stubGlobal('fetch', fetchMock)
    const { setMondayPitchScreen } = await import('@/lib/monday')

    const result = await setMondayPitchScreen('item-456', 73, 'HIGH')

    expect(result).toEqual({ ok: true, data: { itemId: 'item-456' } })
    expect(fetchMock).toHaveBeenCalledOnce()

    const [url, init] = fetchMock.mock.calls[0] ?? []
    expect(url).toBe('https://api.monday.com/v2')
    expect(init?.method).toBe('POST')
    expect(init?.headers).toMatchObject({ 'API-Version': '2026-04' })

    const body = JSON.parse(String(init?.body)) as {
      query: string
      variables: {
        boardId: string
        itemId: string
        columnValues: string
      }
    }
    expect(body.variables).toEqual({
      boardId: 'board-123',
      itemId: 'item-456',
      columnValues: JSON.stringify({ fit_column: 'HIGH', score_column: '73' }),
    })
    expect(JSON.parse(body.variables.columnValues)).toEqual({
      fit_column: 'HIGH',
      score_column: '73',
    })
    expect(body.query).toContain('change_multiple_column_values')
  })

  it('rejects an invalid score before fetching', async () => {
    stubMondayEnv()
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    const { setMondayPitchScreen } = await import('@/lib/monday')

    const result = await setMondayPitchScreen('item-456', 73.5, 'HIGH')

    expect(result).toEqual({ ok: false, error: 'The generated pitch score is invalid.' })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('returns a failure when monday responds with a GraphQL error', async () => {
    stubMondayEnv()
    const fetchMock = vi.fn(async () =>
      Response.json({ errors: [{ message: 'Column value rejected' }] }),
    )
    vi.stubGlobal('fetch', fetchMock)
    vi.spyOn(console, 'error').mockImplementation(() => undefined)
    const { setMondayPitchScreen } = await import('@/lib/monday')

    const result = await setMondayPitchScreen('item-456', 73, 'HIGH')

    expect(result).toEqual({
      ok: false,
      error: 'The item was created, but its AI screen could not be saved.',
    })
    expect(fetchMock).toHaveBeenCalledOnce()
  })

  it('does not let pitch submissions create new monday dropdown labels', async () => {
    stubMondayEnv()
    const fetchMock = vi.fn(async (_input: string | URL | Request, _init?: RequestInit) =>
      Response.json({ data: { create_item: { id: 'item-456' } } }),
    )
    vi.stubGlobal('fetch', fetchMock)
    const { createPitchItem } = await import('@/lib/monday')

    const result = await createPitchItem({ company: 'Fixture Company', stage: 'Seed' })

    expect(result).toEqual({ ok: true, data: { itemId: 'item-456' } })
    const [, init] = fetchMock.mock.calls[0] ?? []
    const body = JSON.parse(String(init?.body)) as {
      query: string
      variables: { columnValues: string }
    }
    expect(body.query).toContain('create_labels_if_missing: false')
    expect(JSON.parse(body.variables.columnValues)).toMatchObject({
      dropdown_mm4tjvgr: { labels: ['Seed'] },
    })
  })
})

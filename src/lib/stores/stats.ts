import { persistedStore } from '$lib/storage/persistedStore'

export type ParseError =
  | { kind: 'invalid-json'; message: string }
  | { kind: 'missing-stats-key' }

export type Result<T, E> =
  | { ok: true; value: T }
  | { ok: false; error: E }

export interface StatsExport {
  version: string
  stats: Record<string, number>
  /** Excel-serial export timestamp. Optional: some exports omit it. */
  time?: number
}

const STORAGE_KEY = 'iom-stats'

function isValidExport(v: unknown): v is StatsExport {
  return (
    typeof v === 'object' &&
    v !== null &&
    typeof (v as Record<string, unknown>).version === 'string' &&
    typeof (v as Record<string, unknown>).stats === 'object' &&
    (v as Record<string, unknown>).stats !== null
  )
}

const _stats = persistedStore<StatsExport | null>(
  STORAGE_KEY,
  null,
  (parsed) => (isValidExport(parsed) ? parsed : null),
)

export const stats = { subscribe: _stats.subscribe }

export function loadStats(json: string): Result<void, ParseError> {
  let parsed: unknown
  try {
    parsed = JSON.parse(json)
  } catch (e) {
    return { ok: false, error: { kind: 'invalid-json', message: (e as Error).message } }
  }

  if (!isValidExport(parsed)) {
    return { ok: false, error: { kind: 'missing-stats-key' } }
  }

  _stats.set(parsed)
  return { ok: true, value: undefined }
}

export function clearStats(): void {
  _stats.reset()
}

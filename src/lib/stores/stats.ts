import { writable, readonly } from 'svelte/store'

export type ParseError =
  | { kind: 'invalid-json'; message: string }
  | { kind: 'missing-stats-key' }
  | { kind: 'unsupported-version'; version: string }

export type Result<T, E> =
  | { ok: true; value: T }
  | { ok: false; error: E }

export interface StatsExport {
  version: string
  stats: Record<string, number>
  time: number
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

function readStorage(): StatsExport | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return isValidExport(parsed) ? parsed : null
  } catch {
    return null
  }
}

const _stats = writable<StatsExport | null>(
  typeof window !== 'undefined' ? readStorage() : null
)

export const stats = readonly(_stats)

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
  try {
    localStorage.setItem(STORAGE_KEY, json)
  } catch {
    // Storage unavailable — state updated in memory only
  }
  return { ok: true, value: undefined }
}

export function clearStats(): void {
  _stats.set(null)
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {}
}

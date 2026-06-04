import { persistedStore } from '$lib/storage/persistedStore'
import type { Notation } from '$lib/format'

export type ValueDisplayMode = 'notation' | 'raw'

export interface Settings {
  notation: Notation
  valueDisplayMode: ValueDisplayMode
}

const DEFAULTS: Settings = {
  notation: 'standard',
  valueDisplayMode: 'notation',
}

const STORAGE_KEY = 'iom-settings'

function isValidNotation(v: unknown): v is Notation {
  return v === 'standard' || v === 'scientific' || v === 'engineering'
}

function isValidValueDisplayMode(v: unknown): v is ValueDisplayMode {
  return v === 'notation' || v === 'raw'
}

const _settings = persistedStore<Settings>(
  STORAGE_KEY,
  DEFAULTS,
  (parsed) => {
    if (parsed === null || typeof parsed !== 'object') return { ...DEFAULTS }
    const p = parsed as Record<string, unknown>
    return {
      notation: isValidNotation(p.notation) ? p.notation : DEFAULTS.notation,
      valueDisplayMode: isValidValueDisplayMode(p.valueDisplayMode)
        ? p.valueDisplayMode
        : DEFAULTS.valueDisplayMode,
    }
  },
)

export const settings = { subscribe: _settings.subscribe }

export function setNotation(n: Notation): void {
  _settings.update(s => ({ ...s, notation: n }))
}

export function setValueDisplayMode(m: ValueDisplayMode): void {
  _settings.update(s => ({ ...s, valueDisplayMode: m }))
}

export function resetSettings(): void {
  _settings.reset()
}

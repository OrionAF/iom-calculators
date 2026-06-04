import { persistedStore } from '$lib/storage/persistedStore'
import type { Notation } from '$lib/format'

export type ValueDisplayMode = 'notation' | 'raw'
export type FontScale = 'normal' | 'large'
export type Density   = 'compact' | 'normal' | 'spacious' | 'super-spacious'

export interface Settings {
  notation: Notation
  valueDisplayMode: ValueDisplayMode
  fontScale: FontScale
  density: Density
}

const DEFAULTS: Settings = {
  notation: 'standard',
  valueDisplayMode: 'notation',
  fontScale: 'normal',
  density: 'normal',
}

const STORAGE_KEY = 'iom-settings'

function isValidNotation(v: unknown): v is Notation {
  return v === 'standard' || v === 'scientific' || v === 'engineering'
}
function isValidValueDisplayMode(v: unknown): v is ValueDisplayMode {
  return v === 'notation' || v === 'raw'
}
function isValidFontScale(v: unknown): v is FontScale {
  return v === 'normal' || v === 'large'
}
function isValidDensity(v: unknown): v is Density {
  return v === 'compact' || v === 'normal' || v === 'spacious' || v === 'super-spacious'
}

const _settings = persistedStore<Settings>(
  STORAGE_KEY,
  DEFAULTS,
  (parsed) => {
    if (parsed === null || typeof parsed !== 'object') return { ...DEFAULTS }
    const p = parsed as Record<string, unknown>
    return {
      notation:         isValidNotation(p.notation)               ? p.notation         : DEFAULTS.notation,
      valueDisplayMode: isValidValueDisplayMode(p.valueDisplayMode) ? p.valueDisplayMode  : DEFAULTS.valueDisplayMode,
      fontScale:        isValidFontScale(p.fontScale)               ? p.fontScale          : DEFAULTS.fontScale,
      density:          isValidDensity(p.density)                   ? p.density            : DEFAULTS.density,
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

export function setFontScale(f: FontScale): void {
  _settings.update(s => ({ ...s, fontScale: f }))
}

export function setDensity(d: Density): void {
  _settings.update(s => ({ ...s, density: d }))
}

export function resetSettings(): void {
  _settings.reset()
}

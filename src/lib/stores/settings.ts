import { persistedStore } from '$lib/storage/persistedStore'
import type { Notation } from '$lib/format'

export type ValueDisplayMode = 'notation' | 'raw'
export type FontScale = 'small' | 'normal' | 'large' | 'xlarge'
export type Density   = 'compact' | 'normal' | 'spacious' | 'super-spacious'

export interface Settings {
  notation: Notation
  valueDisplayMode: ValueDisplayMode
  fontScale: FontScale
  density: Density
  statTooltips: boolean
}

const DEFAULTS: Settings = {
  notation: 'standard',
  valueDisplayMode: 'notation',
  fontScale: 'normal',
  density: 'normal',
  statTooltips: true,
}

const STORAGE_KEY = 'iom-settings'

function isValidNotation(v: unknown): v is Notation {
  return v === 'standard' || v === 'scientific' || v === 'engineering'
}
function isValidValueDisplayMode(v: unknown): v is ValueDisplayMode {
  return v === 'notation' || v === 'raw'
}
function isValidFontScale(v: unknown): v is FontScale {
  return v === 'small' || v === 'normal' || v === 'large'
}
function isValidDensity(v: unknown): v is Density {
  return v === 'compact' || v === 'normal' || v === 'spacious' || v === 'super-spacious'
}
function isValidStatTooltips(v: unknown): v is boolean {
  return v === true || v === false
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
      statTooltips:     isValidStatTooltips(p.statTooltips)         ? p.statTooltips       : DEFAULTS.statTooltips,
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

export function setStatTooltips(v: boolean): void {
  _settings.update(s => ({ ...s, statTooltips: v }))
}

export function resetSettings(): void {
  _settings.reset()
}

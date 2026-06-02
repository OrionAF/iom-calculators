import { writable } from 'svelte/store'
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

function readStorage(): Settings {
  if (typeof window === 'undefined') return { ...DEFAULTS }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULTS }
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed === 'object') {
      const notation = isValidNotation(parsed.notation)
        ? parsed.notation
        : DEFAULTS.notation
      const valueDisplayMode = isValidValueDisplayMode(parsed.valueDisplayMode)
        ? parsed.valueDisplayMode
        : DEFAULTS.valueDisplayMode
      return { notation, valueDisplayMode }
    }
    return { ...DEFAULTS }
  } catch {
    return { ...DEFAULTS }
  }
}

function writeStorage(value: Settings): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  } catch {
    // Storage unavailable — keep in-memory state only
  }
}

const _settings = writable<Settings>(readStorage())

_settings.subscribe(value => writeStorage(value))

export const settings = { subscribe: _settings.subscribe }

export function setNotation(n: Notation): void {
  _settings.update(s => ({ ...s, notation: n }))
}

export function setValueDisplayMode(m: ValueDisplayMode): void {
  _settings.update(s => ({ ...s, valueDisplayMode: m }))
}

export function resetSettings(): void {
  _settings.set({ ...DEFAULTS })
}

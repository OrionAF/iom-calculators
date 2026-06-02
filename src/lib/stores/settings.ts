import { writable } from 'svelte/store'
import type { Notation } from '$lib/format'

export interface Settings {
  notation: Notation
}

const DEFAULTS: Settings = { notation: 'standard' }
const STORAGE_KEY = 'iom-settings'

function isValidNotation(v: unknown): v is Notation {
  return v === 'standard' || v === 'scientific' || v === 'engineering'
}

function readStorage(): Settings {
  if (typeof window === 'undefined') return { ...DEFAULTS }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULTS }
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed === 'object' && isValidNotation(parsed.notation)) {
      return { notation: parsed.notation }
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

export function resetSettings(): void {
  _settings.set({ ...DEFAULTS })
}

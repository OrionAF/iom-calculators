import { writable, type Writable } from 'svelte/store'

export interface PersistedStore<T> {
  subscribe: Writable<T>['subscribe']
  set: Writable<T>['set']
  update: Writable<T>['update']
  reset: () => void
}

function clone<T>(v: T): T {
  return v === null || typeof v !== 'object' ? v : structuredClone(v)
}

function readStorage<T>(
  key: string,
  defaults: T,
  validate?: (parsed: unknown) => T,
): T {
  if (typeof window === 'undefined') return clone(defaults)
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return clone(defaults)
    const parsed = JSON.parse(raw)
    return validate ? validate(parsed) : (parsed as T)
  } catch {
    return clone(defaults)
  }
}

function writeStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage unavailable — keep in-memory state only
  }
}

function removeStorage(key: string): void {
  if (typeof window === 'undefined') return
  try { localStorage.removeItem(key) } catch { /* ignore */ }
}

/**
 * A writable Svelte store that auto-persists to localStorage under `key`.
 * - On init, reads from storage and runs `validate` to coerce the parsed
 *   value into T. If `validate` throws, falls back to a deep-cloned `defaults`.
 * - On every set/update, writes JSON.stringify(value) to storage.
 * - `reset()` snaps the store to a deep-cloned `defaults` and removes the
 *   storage key (so it cannot be silently restored on next reload).
 */
export function persistedStore<T>(
  key: string,
  defaults: T,
  validate?: (parsed: unknown) => T,
): PersistedStore<T> {
  const initial = readStorage(key, defaults, validate)
  const inner = writable<T>(initial)
  let muted = false

  inner.subscribe(value => {
    if (!muted) writeStorage(key, value)
  })

  return {
    subscribe: inner.subscribe,
    set: inner.set,
    update: inner.update,
    reset: () => {
      muted = true
      inner.set(clone(defaults))
      muted = false
      removeStorage(key)
    },
  }
}

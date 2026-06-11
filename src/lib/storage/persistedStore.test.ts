import { beforeEach, describe, expect, it } from 'vitest'
import { get } from 'svelte/store'
import { persistedStore } from './persistedStore'

beforeEach(() => localStorage.clear())

describe('persistedStore', () => {
  it('returns defaults when localStorage is empty', () => {
    const s = persistedStore('test-key', { foo: 1 })
    expect(get(s)).toEqual({ foo: 1 })
  })

  it('reads previously persisted value on init', () => {
    localStorage.setItem('test-key', JSON.stringify({ foo: 42 }))
    const s = persistedStore('test-key', { foo: 1 })
    expect(get(s)).toEqual({ foo: 42 })
  })

  it('falls back to defaults on malformed JSON', () => {
    localStorage.setItem('test-key', '{not json')
    const s = persistedStore('test-key', { foo: 1 })
    expect(get(s)).toEqual({ foo: 1 })
  })

  it('writes to localStorage on set', () => {
    const s = persistedStore('test-key', { foo: 1 })
    s.set({ foo: 99 })
    expect(JSON.parse(localStorage.getItem('test-key')!)).toEqual({ foo: 99 })
  })

  it('writes to localStorage on update', () => {
    const s = persistedStore('test-key', { foo: 1 })
    s.update((v) => ({ ...v, foo: v.foo + 10 }))
    expect(JSON.parse(localStorage.getItem('test-key')!)).toEqual({ foo: 11 })
  })

  it('reset() restores defaults and removes the storage key', () => {
    const s = persistedStore('test-key', { foo: 1 })
    s.set({ foo: 99 })
    expect(localStorage.getItem('test-key')).not.toBeNull()
    s.reset()
    expect(get(s)).toEqual({ foo: 1 })
    expect(localStorage.getItem('test-key')).toBeNull()
  })

  it('uses validate to coerce persisted value', () => {
    localStorage.setItem('test-key', JSON.stringify({ foo: 'badtype' }))
    const s = persistedStore('test-key', { foo: 0 }, (parsed) => {
      const p = parsed as { foo?: unknown }
      return { foo: typeof p?.foo === 'number' ? p.foo : 0 }
    })
    expect(get(s)).toEqual({ foo: 0 })
  })

  it('catches validate throws and falls back to defaults', () => {
    localStorage.setItem('test-key', JSON.stringify({ bad: true }))
    const s = persistedStore('test-key', { foo: 1 }, () => {
      throw new Error('nope')
    })
    expect(get(s)).toEqual({ foo: 1 })
  })

  it('deep-clones defaults so external mutation does not leak', () => {
    const defaults = { items: [1, 2, 3] }
    const s = persistedStore('test-key', defaults)
    const value = get(s) as { items: number[] }
    value.items.push(4)
    s.reset()
    expect((get(s) as { items: number[] }).items).toEqual([1, 2, 3])
  })

  it('handles primitive defaults (null)', () => {
    const s = persistedStore<{ foo: number } | null>('test-key', null)
    expect(get(s)).toBeNull()
    s.set({ foo: 7 })
    expect(get(s)).toEqual({ foo: 7 })
    s.reset()
    expect(get(s)).toBeNull()
    expect(localStorage.getItem('test-key')).toBeNull()
  })
})

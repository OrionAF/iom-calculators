import { beforeEach, describe, expect, it } from 'vitest'
import { get } from 'svelte/store'
import { hardReset } from './reset'
import { stats, loadStats } from '$lib/stores/stats'
import { settings, setNotation } from '$lib/stores/settings'

const VALID_EXPORT = JSON.stringify({
  version: 'v2.1.6',
  stats: { fishing_rod_power: 1000 },
  time: 0,
})

beforeEach(() => {
  localStorage.clear()
  sessionStorage.clear()
})

describe('hardReset', () => {
  it('scrubs iom- prefixed keys from localStorage', () => {
    localStorage.setItem('iom-stats', VALID_EXPORT)
    localStorage.setItem('iom-settings', JSON.stringify({ notation: 'scientific' }))
    localStorage.setItem('iom-future-cache', '"any value"')

    hardReset()

    expect(localStorage.getItem('iom-stats')).toBeNull()
    expect(localStorage.getItem('iom-settings')).toBeNull()
    expect(localStorage.getItem('iom-future-cache')).toBeNull()
  })

  it('scrubs iom- prefixed keys from sessionStorage', () => {
    sessionStorage.setItem('iom-session-cache', '"hello"')
    sessionStorage.setItem('iom-temp', '42')

    hardReset()

    expect(sessionStorage.getItem('iom-session-cache')).toBeNull()
    expect(sessionStorage.getItem('iom-temp')).toBeNull()
  })

  it('leaves non-prefixed keys alone', () => {
    localStorage.setItem('other-app-data', 'preserved')
    localStorage.setItem('iom-stats', VALID_EXPORT)
    sessionStorage.setItem('analytics-id', 'preserved-too')

    hardReset()

    expect(localStorage.getItem('other-app-data')).toBe('preserved')
    expect(localStorage.getItem('iom-stats')).toBeNull()
    expect(sessionStorage.getItem('analytics-id')).toBe('preserved-too')
  })

  it('resets in-memory stats and settings stores to defaults', () => {
    // Seed both stores via their normal APIs (not via raw localStorage).
    loadStats(VALID_EXPORT)
    setNotation('scientific')
    expect(get(stats)).not.toBeNull()
    expect(get(settings).notation).toBe('scientific')

    hardReset()

    expect(get(stats)).toBeNull()
    expect(get(settings).notation).toBe('standard')
  })
})

describe('hardReset — store progress', () => {
  it('resets storeProgress when called', async () => {
    const { setValuePack, storeProgress } = await import('$lib/stores/storeProgress')
    const { get } = await import('svelte/store')
    setValuePack('capitalist_bundle', true)
    expect(get(storeProgress).valuePacks.capitalist_bundle).toBe(true)

    hardReset()

    expect(get(storeProgress).valuePacks.capitalist_bundle).toBeUndefined()
  })
})

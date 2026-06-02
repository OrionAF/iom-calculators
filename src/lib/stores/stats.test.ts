import { beforeEach, describe, expect, it } from 'vitest'
import { get } from 'svelte/store'
import { loadStats, clearStats, stats } from './stats'

const VALID_EXPORT = JSON.stringify({
  version: 'v2.1.6',
  stats: { fishing_rod_power: 431777.56, fishing_income_multi: 200.88 },
  time: 46175.5,
})

beforeEach(() => {
  clearStats()
  localStorage.clear()
})

describe('loadStats', () => {
  it('returns ok:true and sets store on valid JSON', () => {
    const result = loadStats(VALID_EXPORT)
    expect(result.ok).toBe(true)
    expect(get(stats)).not.toBeNull()
    expect(get(stats)!.version).toBe('v2.1.6')
  })

  it('returns ok:false with invalid-json error on bad JSON', () => {
    const result = loadStats('not json {{{')
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.error.kind).toBe('invalid-json')
  })

  it('returns ok:false with missing-stats-key when stats field absent', () => {
    const result = loadStats(JSON.stringify({ version: 'v1', time: 0 }))
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.error.kind).toBe('missing-stats-key')
  })

  it('does not clear existing valid stats on failed parse', () => {
    loadStats(VALID_EXPORT)
    loadStats('bad json')
    expect(get(stats)).not.toBeNull()
  })

  it('persists to localStorage on success', () => {
    loadStats(VALID_EXPORT)
    expect(localStorage.getItem('iom-stats')).toBe(VALID_EXPORT)
  })
})

describe('clearStats', () => {
  it('sets store to null', () => {
    loadStats(VALID_EXPORT)
    clearStats()
    expect(get(stats)).toBeNull()
  })

  it('removes localStorage entry', () => {
    loadStats(VALID_EXPORT)
    clearStats()
    expect(localStorage.getItem('iom-stats')).toBeNull()
  })
})

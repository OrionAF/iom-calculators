import { beforeEach, describe, expect, it } from 'vitest'
import { get } from 'svelte/store'
import { resolveStat, resolvedStats } from './resolvedStats'
import { loadStats, clearStats } from './stats'
import { resetStoreProgress, setValuePack, setFounderTier } from './storeProgress'
import { resetSkillProgress, setSkillLevel } from './skillProgress'
import { ALL_FORMULAS } from '$lib/formulas'
import { computeStat } from '$lib/engine/compute'

beforeEach(() => {
  localStorage.clear()
  clearStats()
  resetStoreProgress()
  resetSkillProgress()
})

describe('resolveStat', () => {
  it('prefers the exported value when present', () => {
    const r = resolveStat('fishing_shiny_multi', { fishing_shiny_multi: 42 }, {})
    expect(r).toEqual({ value: 42, provenance: 'export', incomplete: false })
  })

  it('computes from formulas + levels when not exported', () => {
    const r = resolveStat('fishing_shiny_multi', {}, {})
    expect(r.provenance).toBe('computed')
    expect(r.value).toBe(computeStat(ALL_FORMULAS['fishing_shiny_multi'], {}, {}))
  })

  it('flags computed values with unknown contributions as incomplete', () => {
    // fishing_5x_tick_chance has only unknown contributions in its formula.
    const r = resolveStat('fishing_5x_tick_chance', {}, {})
    expect(r.provenance).toBe('computed')
    expect(r.incomplete).toBe(true)
  })

  it('returns unavailable for keys with neither export nor formula', () => {
    const r = resolveStat('no_such_stat', {}, {})
    expect(r).toEqual({ value: undefined, provenance: 'unavailable', incomplete: false })
  })
})

describe('resolvedStats store', () => {
  it('reflects store/skill progress in computed stats', () => {
    // Fisher's Bundle: +10% triple fishing tick chance (base 0).
    const before = get(resolvedStats)['fishing_triple_tick_chance']
    setValuePack('fishers_bundle', true)
    const after = get(resolvedStats)['fishing_triple_tick_chance']
    expect(after.provenance).toBe('computed')
    expect((after.value ?? 0) - (before.value ?? 0)).toBeCloseTo(0.10)
  })

  it('founder tier feeds founder-affected stats', () => {
    setFounderTier(5)
    const r = get(resolvedStats)['craft_10x_chance']
    // Founder Craft 10x unlocks at tier 3: 0.02 + 2×0.01 = 0.04
    expect(r.value).toBeGreaterThanOrEqual(0.04)
  })

  it('skill levels feed skill-affected stats', () => {
    const before = get(resolvedStats)['fishing_drone_capacity'].value ?? 0
    setSkillLevel('FishingWithFriends', 3) // +5 drones per level
    const after = get(resolvedStats)['fishing_drone_capacity'].value ?? 0
    expect(after - before).toBeCloseTo(15)
  })

  it('exported stats override computed ones and add export-only keys', () => {
    loadStats(JSON.stringify({
      version: '1',
      stats: { fishing_shiny_multi: 99, some_export_only_stat: 7 },
    }))
    const all = get(resolvedStats)
    expect(all['fishing_shiny_multi']).toEqual({ value: 99, provenance: 'export', incomplete: false })
    expect(all['some_export_only_stat']).toEqual({ value: 7, provenance: 'export', incomplete: false })
  })
})

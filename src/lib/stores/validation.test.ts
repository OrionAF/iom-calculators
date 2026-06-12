import { beforeEach, describe, expect, it } from 'vitest'
import { get } from 'svelte/store'
import { validateAgainstExport, validationMismatches, exportValidation } from './validation'
import { loadStats, clearStats } from './stats'
import { resetStoreProgress, setValuePack } from './storeProgress'
import { resetSkillProgress } from './skillProgress'
import { ALL_FORMULAS } from '$lib/formulas'
import { computeStat } from '$lib/engine/compute'

beforeEach(() => {
  localStorage.clear()
  clearStats()
  resetStoreProgress()
  resetSkillProgress()
})

describe('validateAgainstExport', () => {
  it('compares only stats present in both the export and the formulas', () => {
    const rows = validateAgainstExport({ fishing_shiny_multi: 5, not_a_formula_stat: 3 }, {})
    expect(rows.map((r) => r.key)).toEqual(['fishing_shiny_multi'])
  })

  it('reports zero error when computed matches exported', () => {
    const computed = computeStat(ALL_FORMULAS['fishing_shiny_multi'], {}, {})
    const rows = validateAgainstExport({ fishing_shiny_multi: computed }, {})
    expect(rows[0].relativeError).toBe(0)
    expect(rows[0].delta).toBe(0)
  })

  it('reports relative error and sorts worst-first', () => {
    const shinyComputed = computeStat(ALL_FORMULAS['fishing_shiny_multi'], {}, {})
    const rows = validateAgainstExport(
      {
        fishing_shiny_multi: shinyComputed * 2, // 50% off
        fishing_drone_capacity: 0, // matches (no progress)
      },
      {},
    )
    expect(rows[0].key).toBe('fishing_shiny_multi')
    expect(rows[0].relativeError).toBeCloseTo(0.5)
    expect(rows[1].relativeError).toBe(0)
  })

  it('flags formulas with unknown contributions as incomplete', () => {
    const rows = validateAgainstExport({ fishing_5x_tick_chance: 0.09 }, {})
    expect(rows[0].incomplete).toBe(true)
  })

  it('progress levels feed the computed side', () => {
    // Fisher's Bundle adds +0.10 triple tick chance.
    const rows = validateAgainstExport(
      { fishing_triple_tick_chance: 0.1 },
      { 'store.vp.fishersBundle': 1 },
    )
    const row = rows.find((r) => r.key === 'fishing_triple_tick_chance')!
    expect(row.relativeError).toBe(0)
  })
})

describe('validationMismatches', () => {
  it('filters by tolerance', () => {
    const rows = [
      { key: 'a', exported: 1, computed: 1.005, delta: 0.005, relativeError: 0.005, incomplete: false },
      { key: 'b', exported: 1, computed: 2, delta: 1, relativeError: 0.5, incomplete: false },
    ]
    expect(validationMismatches(rows).map((r) => r.key)).toEqual(['b'])
  })
})

describe('exportValidation store', () => {
  it('is empty without an import, fills after one, reacts to progress', () => {
    expect(get(exportValidation)).toEqual([])
    loadStats(JSON.stringify({ version: '1', stats: { fishing_triple_tick_chance: 0.1 } }))
    let row = get(exportValidation).find((r) => r.key === 'fishing_triple_tick_chance')!
    expect(row.relativeError).toBeGreaterThan(0) // no progress set → computed 0
    setValuePack('fishers_bundle', true)
    row = get(exportValidation).find((r) => r.key === 'fishing_triple_tick_chance')!
    expect(row.relativeError).toBe(0)
  })
})

import { describe, expect, it } from 'vitest'
import { STAT_CATALOG, STATUE_STATE_LABELS, getStatAffix } from './catalog'

describe('STAT_CATALOG', () => {
  it('has 18 categories', () => {
    expect(STAT_CATALOG.length).toBe(18)
  })

  it('has unique category ids', () => {
    const ids = STAT_CATALOG.map(c => c.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every category has at least one stat', () => {
    for (const cat of STAT_CATALOG) {
      expect(cat.stats.length).toBeGreaterThan(0)
    }
  })

  it('every category has a non-empty label', () => {
    for (const cat of STAT_CATALOG) {
      expect(cat.label.length).toBeGreaterThan(0)
    }
  })

  it('every stat has a non-empty key', () => {
    for (const cat of STAT_CATALOG) {
      for (const stat of cat.stats) {
        expect(stat.key.length).toBeGreaterThan(0)
      }
    }
  })

  it('if a stat declares an icon, it is a non-empty string', () => {
    for (const cat of STAT_CATALOG) {
      for (const stat of cat.stats) {
        if (stat.icon !== undefined) {
          expect(typeof stat.icon).toBe('string')
          expect(stat.icon.length).toBeGreaterThan(0)
        }
      }
    }
  })

  it('if a stat declares a label, it is a non-empty string', () => {
    for (const cat of STAT_CATALOG) {
      for (const stat of cat.stats) {
        if (stat.label !== undefined) {
          expect(typeof stat.label).toBe('string')
          expect(stat.label.length).toBeGreaterThan(0)
        }
      }
    }
  })
})

describe('getStatAffix', () => {
  it('returns undefined for unknown keys', () => {
    expect(getStatAffix('not_a_real_key')).toBeUndefined()
  })
  it('returns the affix declared on the catalog entry', () => {
    expect(getStatAffix('pickaxe_attack_speed_per_second')).toEqual({ suffix: ' p/s' })
    expect(getStatAffix('pickaxe_radius_percent')).toEqual({ prefix: '+', suffix: '%' })
    expect(getStatAffix('xp_level_cap')).toEqual({ prefix: 'Level ' })
    expect(getStatAffix('fishing_tick_reduction_seconds')).toEqual({ prefix: '-', suffix: 's' })
  })
})

describe('STATUE_STATE_LABELS', () => {
  it('maps integer values 0–3 to the expected labels', () => {
    expect(STATUE_STATE_LABELS[0]).toBe('Unbuilt')
    expect(STATUE_STATE_LABELS[1]).toBe('Normal')
    expect(STATUE_STATE_LABELS[2]).toBe('Gilded')
    expect(STATUE_STATE_LABELS[3]).toBe('Platinized')
    expect(STATUE_STATE_LABELS.length).toBe(4)
  })
})

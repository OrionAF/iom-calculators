import { describe, expect, it } from 'vitest'
import { STAT_CATALOG, STATUE_STATE_LABELS } from './catalog'

describe('STAT_CATALOG', () => {
  it('has 21 categories', () => {
    expect(STAT_CATALOG.length).toBe(21)
  })

  it('has unique category ids', () => {
    const ids = STAT_CATALOG.map((c) => c.id)
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

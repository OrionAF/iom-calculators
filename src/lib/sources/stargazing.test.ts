import { describe, expect, it } from 'vitest'
import { stargazingSources } from './stargazing'

describe('stargazingSources — Stargazing Upgrades', () => {
  it('autoCatch: +0.04 per level, max 15', () => {
    expect(stargazingSources.autoCatch.fn(0, {})).toBe(0)
    expect(stargazingSources.autoCatch.fn(15, {})).toBeCloseTo(0.6)
    expect(stargazingSources.autoCatch.maxLevel).toBe(15)
  })

  it('spawnRate: +0.05 per level, max 20', () => {
    expect(stargazingSources.spawnRate.fn(20, {})).toBeCloseTo(1.0)
  })

  it('doubleChance: +0.05 per level, max 20', () => {
    expect(stargazingSources.doubleChance.fn(10, {})).toBeCloseTo(0.5)
  })

  it('superStarSpawn: +0.02 per level, max 20', () => {
    expect(stargazingSources.superStarSpawn.fn(20, {})).toBeCloseTo(0.4)
  })

  it('novaChance: +0.005 per level, max 20', () => {
    expect(stargazingSources.novaChance.fn(20, {})).toBeCloseTo(0.1)
  })

  it('super10xChance: +0.002 per level, max 20', () => {
    expect(stargazingSources.super10xChance.fn(20, {})).toBeCloseTo(0.04)
  })

  it('supergiants: +0.002 per level, max 20', () => {
    expect(stargazingSources.supergiants.fn(20, {})).toBeCloseTo(0.04)
  })

  it('superSupergiants: +0.0015 per level, max 20', () => {
    expect(stargazingSources.superSupergiants.fn(20, {})).toBeCloseTo(0.03)
  })

  it('allStarMulti: +0.01 per level, max 30', () => {
    expect(stargazingSources.allStarMulti.fn(30, {})).toBeCloseTo(0.3)
  })

  it('superRadiant: +0.0015 per level, max 25', () => {
    expect(stargazingSources.superRadiant.fn(25, {})).toBeCloseTo(0.0375)
  })
})

describe('stargazingSources — Super Star Upgrades', () => {
  it('supergigantsMulti: +0.10 per level, max 20', () => {
    expect(stargazingSources.supergigantsMulti.fn(0, {})).toBeCloseTo(0)
    expect(stargazingSources.supergigantsMulti.fn(10, {})).toBeCloseTo(1.0)
    expect(stargazingSources.supergigantsMulti.maxLevel).toBe(20)
  })

  it('novagiant: +0.02 per level, max 15', () => {
    expect(stargazingSources.novagiant.fn(15, {})).toBeCloseTo(0.3)
  })

  it('radiantChance: +0.001 per level, max 20', () => {
    expect(stargazingSources.radiantChance.fn(20, {})).toBeCloseTo(0.02)
  })
})

describe('stargazingSources — Individual Stars', () => {
  it('starGemini: +0.02 per level (star_spawn_rate), max 34', () => {
    expect(stargazingSources.starGemini.fn(20, {})).toBeCloseTo(0.4)
    expect(stargazingSources.starGemini.maxLevel).toBe(34)
  })

  it('starTaurus: +0.02 per level (star_auto_catch_chance), max 22', () => {
    expect(stargazingSources.starTaurus.fn(22, {})).toBeCloseTo(0.44)
  })

  it('starVirgo: +0.01 per level (super_star_spawn_multi), max 30', () => {
    expect(stargazingSources.starVirgo.fn(30, {})).toBeCloseTo(0.3)
  })

  it('starSagittarius: +0.01 per level (star_triple_spawn_chance), max 17', () => {
    expect(stargazingSources.starSagittarius.fn(17, {})).toBeCloseTo(0.17)
  })

  it('starLeo: +0.04 per level (super_star_triple_chance), max 5', () => {
    expect(stargazingSources.starLeo.fn(5, {})).toBeCloseTo(0.2)
  })

  it('starScorpio: +0.005 per level (all_star_multi), max 117', () => {
    expect(stargazingSources.starScorpio.fn(100, {})).toBeCloseTo(0.5)
  })

  it('starHercules: +0.0015 per level (star_supernova_chance), max 55', () => {
    expect(stargazingSources.starHercules.fn(55, {})).toBeCloseTo(0.0825)
  })
})

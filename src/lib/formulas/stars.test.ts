import { describe, expect, it } from 'vitest'
import { computeStat, hasUnknownContributions } from '$lib/engine/compute'
import { starsFormulas } from './stars'

describe('starsFormulas — star_spawn_rate', () => {
  const f = starsFormulas['star_spawn_rate']

  it('base = 0', () => {
    expect(computeStat(f, {}, {})).toBe(0)
  })

  it('stargazing upgrade max (20) + Gemini max (34) → 1.00 + 0.68 = 1.68', () => {
    expect(computeStat(f, {
      'stargazing.spawnRate': 20,
      'stargazing.starGemini': 34,
    }, {})).toBeCloseTo(1.68)
  })
})

describe('starsFormulas — star_auto_catch_chance', () => {
  const f = starsFormulas['star_auto_catch_chance']

  it('base = 0', () => {
    expect(computeStat(f, {}, {})).toBe(0)
  })

  it('upgrade level 15 + Taurus max (22) → 0.60 + 0.44 = 1.04', () => {
    expect(computeStat(f, {
      'stargazing.autoCatch': 15,
      'stargazing.starTaurus': 22,
    }, {})).toBeCloseTo(1.04)
  })
})

describe('starsFormulas — star_supernova_chance', () => {
  const f = starsFormulas['star_supernova_chance']

  it('base = 0', () => {
    expect(computeStat(f, {}, {})).toBe(0)
  })

  it('upgrade level 20 + Hercules max (55) → 0.10 + 0.0825 = 0.1825', () => {
    expect(computeStat(f, {
      'stargazing.novaChance': 20,
      'stargazing.starHercules': 55,
    }, {})).toBeCloseTo(0.1825)
  })
})

describe('starsFormulas — star_supernova_multi', () => {
  const f = starsFormulas['star_supernova_multi']

  it('base = 10', () => {
    expect(computeStat(f, {}, {})).toBeCloseTo(10)
  })

  it("Ctrl+F Stars (level 1) → 10 + 0.20 = 10.20", () => {
    expect(computeStat(f, { 'skillTree.ctrlFStars': 1 }, {})).toBeCloseTo(10.20)
  })

  it('Ctrl+C Ctrl+V Stars level 3 → 10 + 3×0.06 = 10.18', () => {
    expect(computeStat(f, { 'skillTree.ctrlCCtrlVStars': 3 }, {})).toBeCloseTo(10.18)
  })

  it('both skill tree nodes: 10 + 0.20 + 0.18 = 10.38', () => {
    expect(computeStat(f, {
      'skillTree.ctrlFStars': 1,
      'skillTree.ctrlCCtrlVStars': 3,
    }, {})).toBeCloseTo(10.38)
  })
})

describe('starsFormulas — star_supergiant_multi', () => {
  const f = starsFormulas['star_supergiant_multi']

  it('base = 3', () => {
    expect(computeStat(f, {}, {})).toBeCloseTo(3)
  })

  it('super star upgrade level 20 → 3 + 20×0.10 = 5.00', () => {
    expect(computeStat(f, { 'stargazing.supergigantsMulti': 20 }, {})).toBeCloseTo(5.00)
  })
})

describe('starsFormulas — all_star_multi', () => {
  const f = starsFormulas['all_star_multi']

  it('base = 1', () => {
    expect(computeStat(f, {}, {})).toBeCloseTo(1)
  })

  it('upgrade level 30 + Scorpio level 100 → 1 + 0.30 + 0.50 = 1.80', () => {
    expect(computeStat(f, {
      'stargazing.allStarMulti': 30,
      'stargazing.starScorpio': 100,
    }, {})).toBeCloseTo(1.80)
  })
})

describe('starsFormulas — novagiant_combo_multi', () => {
  const f = starsFormulas['novagiant_combo_multi']

  it('base = 1', () => {
    expect(computeStat(f, {}, {})).toBeCloseTo(1)
  })

  it('super star upgrade level 15 + Why Are There Stars level 3 → 1 + 0.30 + 0.15 = 1.45', () => {
    expect(computeStat(f, {
      'stargazing.novagiant': 15,
      'skillTree.whyAreThereStarsInMyMiningGame': 3,
    }, {})).toBeCloseTo(1.45)
  })
})

describe('starsFormulas — unknown contributions', () => {
  it('star_spawn_rate has unknown contributions (Drones, Relics, Pets)', () => {
    expect(hasUnknownContributions(starsFormulas['star_spawn_rate'])).toBe(true)
  })

  it('star_double_spawn_chance has NO unknowns — only stargazing upgrade', () => {
    expect(hasUnknownContributions(starsFormulas['star_double_spawn_chance'])).toBe(false)
  })
})

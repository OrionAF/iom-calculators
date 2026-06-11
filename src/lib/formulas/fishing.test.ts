import { describe, expect, it } from 'vitest'
import { computeStat, hasUnknownContributions } from '$lib/engine/compute'
import { fishingFormulas } from './fishing'

describe('fishingFormulas — super_shiny_chance', () => {
  const f = fishingFormulas['fishing_super_shiny_chance']

  it('base = 0', () => {
    expect(computeStat(f, {}, {})).toBe(0)
  })

  it('T2 upgrade level 20 only → 0.20', () => {
    expect(computeStat(f, { 'fishing.superShinyChanceT2': 20 }, {})).toBeCloseTo(0.2)
  })

  it('Completionist Gatekeeper level 1 + 10 legendary fish → +0.10', () => {
    expect(
      computeStat(f, { 'skillTree.completionistGatekeeper': 1 }, { legendaryFishFound: 10 }),
    ).toBeCloseTo(0.1)
  })

  it('both sources combined: T2 level 5 + Gatekeeper level 1 + 50 fish', () => {
    // 5×0.01 + 1×50×0.01 = 0.05 + 0.50 = 0.55
    expect(
      computeStat(
        f,
        { 'fishing.superShinyChanceT2': 5, 'skillTree.completionistGatekeeper': 1 },
        { legendaryFishFound: 50 },
      ),
    ).toBeCloseTo(0.55)
  })
})

describe('fishingFormulas — drone_multiplier', () => {
  const f = fishingFormulas['fishing_drone_multiplier']

  it('base = 1', () => {
    expect(computeStat(f, {}, {})).toBeCloseTo(1)
  })

  it('T1 upgrade max (20) + T1 enhance max (25) → 1 + 1.20 + 2.00 = 4.20', () => {
    expect(
      computeStat(f, { 'fishing.droneMultiT1': 20, 'fishing.droneMultiE1': 25 }, {}),
    ).toBeCloseTo(4.2)
  })

  it('Fishing With Friends level 3 → +0.30', () => {
    expect(computeStat(f, { 'skillTree.fishingWithFriends': 3 }, {})).toBeCloseTo(1.3)
  })
})

describe('fishingFormulas — income_multi', () => {
  const f = fishingFormulas['fishing_income_multi']

  it('base = 1', () => {
    expect(computeStat(f, {}, {})).toBeCloseTo(1)
  })

  it('T1 upgrade level 10 + T1 enhance level 10 → 1 + 0.30 + 0.50 = 1.80', () => {
    expect(
      computeStat(f, { 'fishing.fishMultiT1': 10, 'fishing.fishMultiE1': 10 }, {}),
    ).toBeCloseTo(1.8)
  })
})

describe('fishingFormulas — tick_reduction_seconds', () => {
  const f = fishingFormulas['fishing_tick_reduction_seconds']

  it('base = 0', () => {
    expect(computeStat(f, {}, {})).toBe(0)
  })

  it('T1 upgrade max (40) + T1 enhance max (20) + LPtP max (3) = 36s', () => {
    // 40×0.5 + 20×0.5 + 3×2 = 20 + 10 + 6 = 36
    expect(
      computeStat(
        f,
        {
          'fishing.tickSpeedT1': 40,
          'fishing.tickSpeedE1': 20,
          'skillTree.letsPickUpThePace': 3,
        },
        {},
      ),
    ).toBeCloseTo(36)
  })
})

describe('fishingFormulas — shiny_chance', () => {
  const f = fishingFormulas['fishing_shiny_chance']

  it('base = 0', () => {
    expect(computeStat(f, {}, {})).toBe(0)
  })

  it('T1 upgrade max (25) → 0.125', () => {
    expect(computeStat(f, { 'fishing.shinyChanceT1': 25 }, {})).toBeCloseTo(0.125)
  })

  it('With This Fish level 1 + 10 fish cards → 0.01', () => {
    expect(
      computeStat(f, { 'skillTree.withThisFishISummonTwoMoreFish': 1 }, { fishCardCount: 10 }),
    ).toBeCloseTo(0.01)
  })
})

describe('fishingFormulas — shiny_multi', () => {
  const f = fishingFormulas['fishing_shiny_multi']

  it('base = 5', () => {
    expect(computeStat(f, {}, {})).toBeCloseTo(5)
  })

  it('T2 upgrade level 20 + T1 enhance level 20 → 5 + 1.00 + 1.00 = 7.00', () => {
    expect(
      computeStat(f, { 'fishing.shinyMultiT2': 20, 'fishing.shinyMultiE1': 20 }, {}),
    ).toBeCloseTo(7.0)
  })
})

describe('fishingFormulas — super_shiny_multi', () => {
  const f = fishingFormulas['fishing_super_shiny_multi']

  it('base = 3', () => {
    expect(computeStat(f, {}, {})).toBeCloseTo(3)
  })

  it('T2 enhance level 20 → 3 + 3.00 = 6.00', () => {
    expect(computeStat(f, { 'fishing.superShinyMultiE2': 20 }, {})).toBeCloseTo(6.0)
  })
})

describe('fishingFormulas — drone_capacity', () => {
  const f = fishingFormulas['fishing_drone_capacity']

  it('base = 0', () => {
    // At level 0, droneCloner fn = 1.05^0 = 1, so 0 × 1 = 0
    expect(computeStat(f, {}, {})).toBeCloseTo(0)
  })

  it('T1 upgrade (50) + Drone Cloner (5): (50) × 1.05^5', () => {
    const additive = 50
    const cloner = Math.pow(1.05, 5)
    expect(computeStat(f, { 'fishing.droneCapT1': 50, 'fishing.droneCloner': 5 }, {})).toBeCloseTo(
      additive * cloner,
    )
  })
})

describe('fishingFormulas — unknown contributions', () => {
  it('rod_power has NO unknowns — Half Way Bundle and card resolved', () => {
    expect(hasUnknownContributions(fishingFormulas['fishing_rod_power'])).toBe(false)
  })

  it('super_shiny_chance has NO unknowns — all sources defined', () => {
    expect(hasUnknownContributions(fishingFormulas['fishing_super_shiny_chance'])).toBe(false)
  })

  it('token_multi has NO unknowns — only fishing sources', () => {
    expect(hasUnknownContributions(fishingFormulas['fishing_token_multi'])).toBe(false)
  })

  it('notice_requirement has NO unknowns — only skill tree source', () => {
    expect(hasUnknownContributions(fishingFormulas['fishing_notice_requirement'])).toBe(false)
  })
})

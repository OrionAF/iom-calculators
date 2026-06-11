import { describe, expect, it } from 'vitest'
import { computeFishingStats } from './fishing'

describe('computeFishingStats', () => {
  it('returns correct defaults when all inputs are zero', () => {
    const result = computeFishingStats({ levels: {}, rt: {} })
    expect(result.superShinyChance).toBe(0)
    expect(result.incomeMulti).toBeCloseTo(1)
    expect(result.tickReductionSeconds).toBe(0)
    expect(result.droneMultiplier).toBeCloseTo(1)
    expect(result.tier2DockMulti).toBe(0)
    expect(result.shinyChance).toBe(0)
    expect(result.shinyMulti).toBeCloseTo(5)
    expect(result.superShinyMulti).toBeCloseTo(3)
  })

  it('super shiny chance: T2 level 20 + Gatekeeper level 3 + 30 legendary fish', () => {
    const result = computeFishingStats({
      levels: {
        'fishing.superShinyChanceT2': 20,
        'skillTree.completionistGatekeeper': 3,
      },
      rt: { legendaryFishFound: 30 },
    })
    // 20×0.01 + 3×30×0.01 = 0.20 + 0.90 = 1.10
    expect(result.superShinyChance).toBeCloseTo(1.1)
  })

  it('tick reduction: T1 max (40) + enhance max (20) + LPtP max (3)', () => {
    const result = computeFishingStats({
      levels: {
        'fishing.tickSpeedT1': 40,
        'fishing.tickSpeedE1': 20,
        'skillTree.letsPickUpThePace': 3,
      },
      rt: {},
    })
    // 40×0.5 + 20×0.5 + 3×2 = 20 + 10 + 6 = 36s
    expect(result.tickReductionSeconds).toBeCloseTo(36)
  })

  it('drone multiplier: T1 max + T1 enhance max + Fishing With Friends max', () => {
    const result = computeFishingStats({
      levels: {
        'fishing.droneMultiT1': 20,
        'fishing.droneMultiE1': 25,
        'skillTree.fishingWithFriends': 3,
      },
      rt: {},
    })
    // 1 + 20×0.06 + 25×0.08 + 3×0.10 = 1 + 1.20 + 2.00 + 0.30 = 4.50
    expect(result.droneMultiplier).toBeCloseTo(4.5)
  })
})

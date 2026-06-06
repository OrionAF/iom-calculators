import { describe, expect, it } from 'vitest'
import { skillTreeSources } from './skillTree'

describe('skillTreeSources — Completionist Gatekeeper (max 3 levels)', () => {
  it('superShinyChance: level × legendaryFishFound × 0.01', () => {
    expect(skillTreeSources.completionistGatekeeperSuperShiny.fn(1, { legendaryFishFound: 10 })).toBeCloseTo(0.10)
    expect(skillTreeSources.completionistGatekeeperSuperShiny.fn(3, { legendaryFishFound: 50 })).toBeCloseTo(1.50)
    expect(skillTreeSources.completionistGatekeeperSuperShiny.fn(0, { legendaryFishFound: 100 })).toBe(0)
  })

  it('dronePower: level × legendaryFishFound × 0.02', () => {
    expect(skillTreeSources.completionistGatekeeperDronePower.fn(1, { legendaryFishFound: 10 })).toBeCloseTo(0.20)
    expect(skillTreeSources.completionistGatekeeperDronePower.fn(3, { legendaryFishFound: 50 })).toBeCloseTo(3.00)
  })

  it('tier2Dock: level × legendaryFishFound × 0.03', () => {
    expect(skillTreeSources.completionistGatekeeperTier2Dock.fn(1, { legendaryFishFound: 10 })).toBeCloseTo(0.30)
    expect(skillTreeSources.completionistGatekeeperTier2Dock.fn(3, { legendaryFishFound: 50 })).toBeCloseTo(4.50)
  })

  it('all three share the same key', () => {
    expect(skillTreeSources.completionistGatekeeperSuperShiny.key).toBe('skillTree.completionistGatekeeper')
    expect(skillTreeSources.completionistGatekeeperDronePower.key).toBe('skillTree.completionistGatekeeper')
    expect(skillTreeSources.completionistGatekeeperTier2Dock.key).toBe('skillTree.completionistGatekeeper')
  })

  it('all three declare legendaryFishFound as a runtime input', () => {
    const keys = skillTreeSources.completionistGatekeeperSuperShiny.inputs.map(i => i.key)
    expect(keys).toContain('legendaryFishFound')
  })
})

describe("skillTreeSources — Fishing With Friends (max 3 levels)", () => {
  it('droneCapacity: +5 per level', () => {
    expect(skillTreeSources.fishingWithFriendsDrones.fn(3, {})).toBe(15)
  })

  it('dronePower: +0.10 per level', () => {
    expect(skillTreeSources.fishingWithFriendsDronePower.fn(3, {})).toBeCloseTo(0.30)
  })

  it('fishMulti: +0.03 per level', () => {
    expect(skillTreeSources.fishingWithFriendsFishMulti.fn(3, {})).toBeCloseTo(0.09)
  })

  it('all three share the same key', () => {
    expect(skillTreeSources.fishingWithFriendsDrones.key).toBe('skillTree.fishingWithFriends')
    expect(skillTreeSources.fishingWithFriendsDronePower.key).toBe('skillTree.fishingWithFriends')
    expect(skillTreeSources.fishingWithFriendsFishMulti.key).toBe('skillTree.fishingWithFriends')
  })
})

describe("skillTreeSources — Let's Pick Up The Pace (max 3 levels)", () => {
  it('tickReduction: +2s per level', () => {
    expect(skillTreeSources.letsPickUpThePaceTick.fn(3, {})).toBe(6)
  })

  it('doubleTick: +0.02 per level', () => {
    expect(skillTreeSources.letsPickUpThePaceDouble.fn(3, {})).toBeCloseTo(0.06)
  })

  it('tripleTick: +0.01 per level', () => {
    expect(skillTreeSources.letsPickUpThePaceTriple.fn(3, {})).toBeCloseTo(0.03)
  })
})

describe('skillTreeSources — Friendship Ended With Tier 1 Items (max 3 levels)', () => {
  it('noticeReq: +0.10 per level', () => {
    expect(skillTreeSources.friendshipEndedNoticeReq.fn(3, {})).toBeCloseTo(0.30)
  })
})

describe('skillTreeSources — Motley School (max 3 levels)', () => {
  it('rodPower factor: 1 + level × 0.10', () => {
    expect(skillTreeSources.motleySchoolRod.fn(0, {})).toBeCloseTo(1)
    expect(skillTreeSources.motleySchoolRod.fn(3, {})).toBeCloseTo(1.30)
  })

  it('droneCapacity: +5 per level', () => {
    expect(skillTreeSources.motleySchoolDrones.fn(3, {})).toBe(15)
  })
})

describe('skillTreeSources — With This Fish I Summon Two More Fish (max 3 levels)', () => {
  it('fishMulti: level × fishCardCount × 0.01', () => {
    expect(skillTreeSources.withThisFishFishMulti.fn(1, { fishCardCount: 10 })).toBeCloseTo(0.10)
    expect(skillTreeSources.withThisFishFishMulti.fn(3, { fishCardCount: 20 })).toBeCloseTo(0.60)
    expect(skillTreeSources.withThisFishFishMulti.fn(0, { fishCardCount: 10 })).toBe(0)
  })

  it('shinyChance: level × fishCardCount × 0.001', () => {
    expect(skillTreeSources.withThisFishShinyChance.fn(1, { fishCardCount: 10 })).toBeCloseTo(0.01)
    expect(skillTreeSources.withThisFishShinyChance.fn(3, { fishCardCount: 20 })).toBeCloseTo(0.06)
  })

  it('both share the same key', () => {
    expect(skillTreeSources.withThisFishFishMulti.key).toBe('skillTree.withThisFishISummonTwoMoreFish')
    expect(skillTreeSources.withThisFishShinyChance.key).toBe('skillTree.withThisFishISummonTwoMoreFish')
  })

  it('declares fishCardCount as a runtime input', () => {
    const keys = skillTreeSources.withThisFishFishMulti.inputs.map(i => i.key)
    expect(keys).toContain('fishCardCount')
  })
})

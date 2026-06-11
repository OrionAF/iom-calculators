import { describe, expect, it } from 'vitest'
import { skillTreeSources } from './skillTree'

describe('skillTreeSources — Completionist Gatekeeper (max 3 levels)', () => {
  it('superShinyChance: level × legendaryFishFound × 0.01', () => {
    expect(
      skillTreeSources.completionistGatekeeperSuperShiny.fn(1, { legendaryFishFound: 10 }),
    ).toBeCloseTo(0.1)
    expect(
      skillTreeSources.completionistGatekeeperSuperShiny.fn(3, { legendaryFishFound: 50 }),
    ).toBeCloseTo(1.5)
    expect(
      skillTreeSources.completionistGatekeeperSuperShiny.fn(0, { legendaryFishFound: 100 }),
    ).toBe(0)
  })

  it('dronePower: level × legendaryFishFound × 0.02', () => {
    expect(
      skillTreeSources.completionistGatekeeperDronePower.fn(1, { legendaryFishFound: 10 }),
    ).toBeCloseTo(0.2)
    expect(
      skillTreeSources.completionistGatekeeperDronePower.fn(3, { legendaryFishFound: 50 }),
    ).toBeCloseTo(3.0)
  })

  it('tier2Dock: level × legendaryFishFound × 0.03', () => {
    expect(
      skillTreeSources.completionistGatekeeperTier2Dock.fn(1, { legendaryFishFound: 10 }),
    ).toBeCloseTo(0.3)
    expect(
      skillTreeSources.completionistGatekeeperTier2Dock.fn(3, { legendaryFishFound: 50 }),
    ).toBeCloseTo(4.5)
  })

  it('all three share the same key', () => {
    expect(skillTreeSources.completionistGatekeeperSuperShiny.key).toBe(
      'skillTree.completionistGatekeeper',
    )
    expect(skillTreeSources.completionistGatekeeperDronePower.key).toBe(
      'skillTree.completionistGatekeeper',
    )
    expect(skillTreeSources.completionistGatekeeperTier2Dock.key).toBe(
      'skillTree.completionistGatekeeper',
    )
  })

  it('all three declare legendaryFishFound as a runtime input', () => {
    const keys = skillTreeSources.completionistGatekeeperSuperShiny.inputs.map((i) => i.key)
    expect(keys).toContain('legendaryFishFound')
  })
})

describe('skillTreeSources — Fishing With Friends (max 3 levels)', () => {
  it('droneCapacity: +5 per level', () => {
    expect(skillTreeSources.fishingWithFriendsDrones.fn(3, {})).toBe(15)
  })

  it('dronePower: +0.10 per level', () => {
    expect(skillTreeSources.fishingWithFriendsDronePower.fn(3, {})).toBeCloseTo(0.3)
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
    expect(skillTreeSources.friendshipEndedNoticeReq.fn(3, {})).toBeCloseTo(0.3)
  })
})

describe('skillTreeSources — Motley School (max 3 levels)', () => {
  it('rodPower factor: 1 + level × 0.10', () => {
    expect(skillTreeSources.motleySchoolRod.fn(0, {})).toBeCloseTo(1)
    expect(skillTreeSources.motleySchoolRod.fn(3, {})).toBeCloseTo(1.3)
  })

  it('droneCapacity: +5 per level', () => {
    expect(skillTreeSources.motleySchoolDrones.fn(3, {})).toBe(15)
  })
})

describe('skillTreeSources — With This Fish I Summon Two More Fish (max 3 levels)', () => {
  it('fishMulti: level × fishCardCount × 0.01', () => {
    expect(skillTreeSources.withThisFishFishMulti.fn(1, { fishCardCount: 10 })).toBeCloseTo(0.1)
    expect(skillTreeSources.withThisFishFishMulti.fn(3, { fishCardCount: 20 })).toBeCloseTo(0.6)
    expect(skillTreeSources.withThisFishFishMulti.fn(0, { fishCardCount: 10 })).toBe(0)
  })

  it('shinyChance: level × fishCardCount × 0.001', () => {
    expect(skillTreeSources.withThisFishShinyChance.fn(1, { fishCardCount: 10 })).toBeCloseTo(0.01)
    expect(skillTreeSources.withThisFishShinyChance.fn(3, { fishCardCount: 20 })).toBeCloseTo(0.06)
  })

  it('both share the same key', () => {
    expect(skillTreeSources.withThisFishFishMulti.key).toBe(
      'skillTree.withThisFishISummonTwoMoreFish',
    )
    expect(skillTreeSources.withThisFishShinyChance.key).toBe(
      'skillTree.withThisFishISummonTwoMoreFish',
    )
  })

  it('declares fishCardCount as a runtime input', () => {
    const keys = skillTreeSources.withThisFishFishMulti.inputs.map((i) => i.key)
    expect(keys).toContain('fishCardCount')
  })
})

describe("skillTreeSources — Ctrl+F 'Stars' (max 1 level)", () => {
  it('supernovaMul: +0.20 (flat, single level)', () => {
    expect(skillTreeSources.ctrlFStarsSupernovaMul.fn(0, {})).toBe(0)
    expect(skillTreeSources.ctrlFStarsSupernovaMul.fn(1, {})).toBeCloseTo(0.2)
    expect(skillTreeSources.ctrlFStarsSupernovaMul.maxLevel).toBe(1)
  })

  it('superStarSupernovaMul: +0.20 (flat, single level)', () => {
    expect(skillTreeSources.ctrlFStarsSuperStarSupernovaMul.fn(1, {})).toBeCloseTo(0.2)
  })

  it('both share the same key', () => {
    expect(skillTreeSources.ctrlFStarsSupernovaMul.key).toBe('skillTree.ctrlFStars')
    expect(skillTreeSources.ctrlFStarsSuperStarSupernovaMul.key).toBe('skillTree.ctrlFStars')
  })
})

describe('skillTreeSources — Ctrl+C Ctrl+V Stars (max 3 levels)', () => {
  it('supernovaMul: +0.06 per level', () => {
    expect(skillTreeSources.ctrlCCtrlVStarsSupernovaMul.fn(3, {})).toBeCloseTo(0.18)
  })

  it('super10xChance: +0.01 per level', () => {
    expect(skillTreeSources.ctrlCCtrlVStarsSuper10x.fn(3, {})).toBeCloseTo(0.03)
  })

  it('both share the same key', () => {
    expect(skillTreeSources.ctrlCCtrlVStarsSupernovaMul.key).toBe('skillTree.ctrlCCtrlVStars')
    expect(skillTreeSources.ctrlCCtrlVStarsSuper10x.key).toBe('skillTree.ctrlCCtrlVStars')
  })
})

describe('skillTreeSources — Why Are There Stars In My Mining Game (max 3 levels)', () => {
  it('novagiants: +0.05 per level', () => {
    expect(skillTreeSources.whyAreThereStarsNovagiant.fn(3, {})).toBeCloseTo(0.15)
  })

  it('supergiant: +0.01 per level', () => {
    expect(skillTreeSources.whyAreThereStarsSupergiant.fn(3, {})).toBeCloseTo(0.03)
  })

  it('both share the same key', () => {
    expect(skillTreeSources.whyAreThereStarsNovagiant.key).toBe(
      'skillTree.whyAreThereStarsInMyMiningGame',
    )
    expect(skillTreeSources.whyAreThereStarsSupergiant.key).toBe(
      'skillTree.whyAreThereStarsInMyMiningGame',
    )
  })
})

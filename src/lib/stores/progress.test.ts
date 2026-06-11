import { beforeEach, describe, expect, it } from 'vitest'
import { get } from 'svelte/store'
import { progressLevels, skillSourceKey } from './progress'
import {
  resetStoreProgress,
  setValuePack,
  setUnlock,
  setPerk,
  setFounderTier,
  setGemUpgradeRank,
} from './storeProgress'
import { setSkillLevel, resetSkillProgress } from './skillProgress'
import { ALL_SKILLS } from '$lib/skills/catalog'
import { skillTreeSources } from '$lib/sources/skillTree'

beforeEach(() => {
  localStorage.clear()
  resetStoreProgress()
  resetSkillProgress()
})

describe('skillSourceKey', () => {
  it('lower-camels regular skill ids', () => {
    expect(skillSourceKey('LuckyStrikes')).toBe('skillTree.luckyStrikes')
    expect(skillSourceKey('CompletionistGatekeeper')).toBe('skillTree.completionistGatekeeper')
  })

  it('handles the irregular ids via overrides', () => {
    expect(skillSourceKey('PPGoUp')).toBe('skillTree.ppGoUp')
    expect(skillSourceKey('CtrlF')).toBe('skillTree.ctrlFStars')
    expect(skillSourceKey('CtrlCCtrlV')).toBe('skillTree.ctrlCCtrlVStars')
  })

  it('every skillTree source key is reachable from some skill id', () => {
    const reachable = new Set(ALL_SKILLS.map((s) => skillSourceKey(s.id)))
    const unreachable = [...new Set(Object.values(skillTreeSources).map((s) => s.key))].filter(
      (key) => !reachable.has(key),
    )
    expect(unreachable, `orphaned source keys: ${unreachable.join(', ')}`).toHaveLength(0)
  })
})

describe('progressLevels', () => {
  it('is empty with no progress', () => {
    expect(get(progressLevels)).toEqual({})
  })

  it('maps skill levels to skillTree source keys', () => {
    setSkillLevel('LuckyStrikes', 1)
    setSkillLevel('CompletionistGatekeeper', 3)
    const levels = get(progressLevels)
    expect(levels['skillTree.luckyStrikes']).toBe(1)
    expect(levels['skillTree.completionistGatekeeper']).toBe(3)
  })

  it('owned value pack sets all its effect source keys to 1', () => {
    setValuePack('fishers_bundle', true)
    expect(get(progressLevels)['store.vp.fishersBundle']).toBe(1)
  })

  it('mirror unlock drives both the pack and the gem unlock source', () => {
    setUnlock('unlocked_permanent_drone', true)
    expect(get(progressLevels)['store.vp.permanentDronePack']).toBe(1)
  })

  it('perks map to perk source keys', () => {
    setPerk('2x_ore_income', true)
    expect(get(progressLevels)['store.perk.oreIncome']).toBe(1)
  })

  it('gem upgrade rank applies to every effect source of the upgrade', () => {
    setGemUpgradeRank('bomb_damage_capacity', 7)
    const levels = get(progressLevels)
    expect(levels['store.gem.bombDamage']).toBe(7)
    expect(levels['store.gem.bombCapacity']).toBe(7)
  })

  it('founder tier becomes the level of store.founder', () => {
    setFounderTier(9)
    expect(get(progressLevels)['store.founder']).toBe(9)
  })

  it('unowned things contribute no keys', () => {
    setValuePack('fishers_bundle', true)
    setValuePack('fishers_bundle', false)
    expect(get(progressLevels)['store.vp.fishersBundle']).toBeUndefined()
  })
})

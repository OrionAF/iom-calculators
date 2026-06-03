import { beforeEach, describe, expect, it } from 'vitest'
import { get } from 'svelte/store'
import {
  storeProgress,
  setValuePack,
  toggleValuePack,
  setUnlock,
  setPerk,
  togglePerkBundle,
  getPerkBundleState,
  setFoundersBundlePurchased,
  setFounderTier,
  setGemUpgradeRank,
  resetStoreProgress,
} from './storeProgress'

const STORAGE_KEY = 'iom-store-progress'

beforeEach(() => {
  localStorage.clear()
  resetStoreProgress()
})

describe('storeProgress — defaults', () => {
  it('reads defaults when localStorage is empty', () => {
    const state = get(storeProgress)
    expect(state.unlocked_permanent_drone).toBe(false)
    expect(state.unlocked_megabomb).toBe(false)
    expect(state.unlocked_transmuter_bomb).toBe(false)
    expect(state.unlocked_battery_bomb).toBe(false)
    expect(state.perk_2x_ore_income).toBe(false)
    expect(state.perk_2x_prestige_point_income).toBe(false)
    expect(state.perk_2x_bar_income).toBe(false)
    expect(state.perk_3x_bomb_damage).toBe(false)
    expect(state.founders_bundle_purchased).toBe(false)
    expect(state.founder_tier).toBe(0)
  })
})

describe('storeProgress — value packs', () => {
  it('toggleValuePack flips the boolean', () => {
    toggleValuePack('capitalist_bundle')
    expect(get(storeProgress).value_pack_capitalist_bundle).toBe(true)
    toggleValuePack('capitalist_bundle')
    expect(get(storeProgress).value_pack_capitalist_bundle).toBe(false)
  })

  it('setValuePack writes the boolean directly', () => {
    setValuePack('archaeology_bundle', true)
    expect(get(storeProgress).value_pack_archaeology_bundle).toBe(true)
  })

  it('persists to localStorage on every change', () => {
    setValuePack('capitalist_bundle', true)
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!)
    expect(stored.value_pack_capitalist_bundle).toBe(true)
  })
})

describe('storeProgress — shared unlocks', () => {
  it('setUnlock writes the shared unlocked_* key', () => {
    setUnlock('unlocked_permanent_drone', true)
    expect(get(storeProgress).unlocked_permanent_drone).toBe(true)
  })

  it('all 4 mirror keys can be set independently', () => {
    setUnlock('unlocked_permanent_drone', true)
    setUnlock('unlocked_megabomb', true)
    expect(get(storeProgress).unlocked_permanent_drone).toBe(true)
    expect(get(storeProgress).unlocked_megabomb).toBe(true)
    expect(get(storeProgress).unlocked_transmuter_bomb).toBe(false)
    expect(get(storeProgress).unlocked_battery_bomb).toBe(false)
  })
})

describe('storeProgress — perks', () => {
  it('setPerk flips an individual perk', () => {
    setPerk('2x_ore_income', true)
    expect(get(storeProgress).perk_2x_ore_income).toBe(true)
  })
})

describe('storeProgress — perk bundles (derived state + cascade)', () => {
  it('getPerkBundleState returns "unowned" when no perks owned', () => {
    expect(getPerkBundleState('ore_prestige_bundle')).toBe('unowned')
  })

  it('getPerkBundleState returns "partial" with 1 of 2 perks owned', () => {
    setPerk('2x_ore_income', true)
    expect(getPerkBundleState('ore_prestige_bundle')).toBe('partial')
  })

  it('getPerkBundleState returns "owned" with both perks owned', () => {
    setPerk('2x_ore_income', true)
    setPerk('2x_prestige_point_income', true)
    expect(getPerkBundleState('ore_prestige_bundle')).toBe('owned')
  })

  it('togglePerkBundle (unowned → owned) sets both underlying perks', () => {
    togglePerkBundle('ore_prestige_bundle')
    expect(get(storeProgress).perk_2x_ore_income).toBe(true)
    expect(get(storeProgress).perk_2x_prestige_point_income).toBe(true)
  })

  it('togglePerkBundle (partial → owned) sets the missing perk too', () => {
    setPerk('2x_ore_income', true)
    togglePerkBundle('ore_prestige_bundle')
    expect(get(storeProgress).perk_2x_ore_income).toBe(true)
    expect(get(storeProgress).perk_2x_prestige_point_income).toBe(true)
  })

  it('togglePerkBundle (owned → unowned) clears both perks', () => {
    setPerk('2x_ore_income', true)
    setPerk('2x_prestige_point_income', true)
    togglePerkBundle('ore_prestige_bundle')
    expect(get(storeProgress).perk_2x_ore_income).toBe(false)
    expect(get(storeProgress).perk_2x_prestige_point_income).toBe(false)
  })
})

describe('storeProgress — founder tier cascade', () => {
  it('setFounderTier(0) is a no-op for prereqs (nothing auto-set)', () => {
    setFounderTier(0)
    expect(get(storeProgress).perk_2x_ore_income).toBe(false)
    expect(get(storeProgress).founders_bundle_purchased).toBe(false)
    expect(get(storeProgress).founder_tier).toBe(0)
  })

  it('setFounderTier(3) auto-fills all 4 perks + founders_bundle_purchased', () => {
    setFounderTier(3)
    expect(get(storeProgress).perk_2x_ore_income).toBe(true)
    expect(get(storeProgress).perk_2x_prestige_point_income).toBe(true)
    expect(get(storeProgress).perk_2x_bar_income).toBe(true)
    expect(get(storeProgress).perk_3x_bomb_damage).toBe(true)
    expect(get(storeProgress).founders_bundle_purchased).toBe(true)
    expect(get(storeProgress).founder_tier).toBe(3)
  })

  it('setFounderTier DECREASE does NOT clear perks or founders_bundle_purchased', () => {
    setFounderTier(5)
    setFounderTier(0)
    expect(get(storeProgress).perk_2x_ore_income).toBe(true)
    expect(get(storeProgress).founders_bundle_purchased).toBe(true)
    expect(get(storeProgress).founder_tier).toBe(0)
  })

  it('setFounderTier clamps below 0 to 0', () => {
    setFounderTier(-1)
    expect(get(storeProgress).founder_tier).toBe(0)
  })

  it('setFounderTier clamps above 12 to 12', () => {
    setFounderTier(99)
    expect(get(storeProgress).founder_tier).toBe(12)
  })
})

describe('storeProgress — gem upgrade ranks', () => {
  it('setGemUpgradeRank writes the rank', () => {
    setGemUpgradeRank('pickaxe_damage', 5)
    expect(get(storeProgress).gem_upgrade_pickaxe_damage).toBe(5)
  })

  it('clamps below 0 to 0', () => {
    setGemUpgradeRank('pickaxe_damage', -3)
    expect(get(storeProgress).gem_upgrade_pickaxe_damage).toBe(0)
  })

  it('clamps above maxLevel to maxLevel', () => {
    // pickaxe_damage maxLevel is 22
    setGemUpgradeRank('pickaxe_damage', 99)
    expect(get(storeProgress).gem_upgrade_pickaxe_damage).toBe(22)
  })
})

describe('storeProgress — reset', () => {
  it('resetStoreProgress clears all keys to defaults', () => {
    setValuePack('capitalist_bundle', true)
    setUnlock('unlocked_permanent_drone', true)
    setPerk('2x_ore_income', true)
    setFounderTier(5)
    setGemUpgradeRank('pickaxe_damage', 10)

    resetStoreProgress()

    expect(get(storeProgress).value_pack_capitalist_bundle).toBeFalsy()
    expect(get(storeProgress).unlocked_permanent_drone).toBe(false)
    expect(get(storeProgress).perk_2x_ore_income).toBe(false)
    expect(get(storeProgress).founder_tier).toBe(0)
    expect(get(storeProgress).gem_upgrade_pickaxe_damage).toBeFalsy()
  })
})

describe('storeProgress — setFoundersBundlePurchased', () => {
  it('can be set independently of cascade', () => {
    setFoundersBundlePurchased(true)
    expect(get(storeProgress).founders_bundle_purchased).toBe(true)
    setFoundersBundlePurchased(false)
    expect(get(storeProgress).founders_bundle_purchased).toBe(false)
  })
})

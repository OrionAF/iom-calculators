import { beforeEach, describe, expect, it } from 'vitest'
import { get } from 'svelte/store'
import {
  storeProgress,
  setValuePack,
  toggleValuePack,
  setUnlock,
  setPerk,
  togglePerkBundle,
  setFoundersBundlePurchased,
  setFounderTier,
  setGemUpgradeRank,
  resetStoreProgress,
  migrateStoreProgress,
} from './storeProgress'
import { PERK_BUNDLES } from '../store/catalog'

const STORAGE_KEY = 'iom-store-progress'

beforeEach(() => {
  localStorage.clear()
  resetStoreProgress()
})

describe('storeProgress — defaults', () => {
  it('reads defaults when localStorage is empty', () => {
    const s = get(storeProgress)
    expect(s.unlocks.unlocked_permanent_drone).toBe(false)
    expect(s.unlocks.unlocked_megabomb).toBe(false)
    expect(s.unlocks.unlocked_transmuter_bomb).toBe(false)
    expect(s.unlocks.unlocked_battery_bomb).toBe(false)
    expect(s.perks['2x_ore_income']).toBeUndefined()
    expect(s.founder.bundlePurchased).toBe(false)
    expect(s.founder.tier).toBe(0)
    expect(s.valuePacks).toEqual({})
    expect(s.gemUpgrades).toEqual({})
  })
})

describe('storeProgress — value packs', () => {
  it('toggleValuePack flips the boolean', () => {
    toggleValuePack('capitalist_bundle')
    expect(get(storeProgress).valuePacks.capitalist_bundle).toBe(true)
    toggleValuePack('capitalist_bundle')
    expect(get(storeProgress).valuePacks.capitalist_bundle).toBe(false)
  })

  it('setValuePack writes the boolean directly', () => {
    setValuePack('archaeology_bundle', true)
    expect(get(storeProgress).valuePacks.archaeology_bundle).toBe(true)
  })

  it('persists to localStorage on every change', () => {
    setValuePack('capitalist_bundle', true)
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!)
    expect(stored.valuePacks.capitalist_bundle).toBe(true)
  })
})

describe('storeProgress — shared unlocks', () => {
  it('setUnlock writes the shared unlocked_* key', () => {
    setUnlock('unlocked_permanent_drone', true)
    expect(get(storeProgress).unlocks.unlocked_permanent_drone).toBe(true)
  })

  it('all 4 mirror keys can be set independently', () => {
    setUnlock('unlocked_permanent_drone', true)
    setUnlock('unlocked_megabomb', true)
    const u = get(storeProgress).unlocks
    expect(u.unlocked_permanent_drone).toBe(true)
    expect(u.unlocked_megabomb).toBe(true)
    expect(u.unlocked_transmuter_bomb).toBe(false)
    expect(u.unlocked_battery_bomb).toBe(false)
  })
})

describe('storeProgress — perks', () => {
  it('setPerk flips an individual perk', () => {
    setPerk('2x_ore_income', true)
    expect(get(storeProgress).perks['2x_ore_income']).toBe(true)
  })
})

describe('storeProgress — perk bundles (derived state + cascade)', () => {
  it('toggling an unowned bundle sets both perks', () => {
    const bundle = PERK_BUNDLES[0]
    togglePerkBundle(bundle.slug)
    const s = get(storeProgress)
    for (const slug of bundle.perkSlugs) {
      expect(s.perks[slug]).toBe(true)
    }
  })

  it('toggling a fully owned bundle clears both perks', () => {
    const bundle = PERK_BUNDLES[0]
    // Set up: both perks owned
    for (const slug of bundle.perkSlugs) setPerk(slug, true)
    togglePerkBundle(bundle.slug)
    const s = get(storeProgress)
    for (const slug of bundle.perkSlugs) {
      expect(s.perks[slug]).toBe(false)
    }
  })

  it('toggling a partially owned bundle promotes to fully owned', () => {
    const bundle = PERK_BUNDLES[0]
    // Set up: only the first perk owned
    setPerk(bundle.perkSlugs[0], true)
    togglePerkBundle(bundle.slug)
    const s = get(storeProgress)
    for (const slug of bundle.perkSlugs) {
      expect(s.perks[slug]).toBe(true)
    }
  })

  it('togglePerkBundle (unowned → owned) sets both underlying perks', () => {
    togglePerkBundle('ore_prestige_bundle')
    const p = get(storeProgress).perks
    expect(p['2x_ore_income']).toBe(true)
    expect(p['2x_prestige_point_income']).toBe(true)
  })

  it('togglePerkBundle (partial → owned) sets the missing perk too', () => {
    setPerk('2x_ore_income', true)
    togglePerkBundle('ore_prestige_bundle')
    const p = get(storeProgress).perks
    expect(p['2x_ore_income']).toBe(true)
    expect(p['2x_prestige_point_income']).toBe(true)
  })

  it('togglePerkBundle (owned → unowned) clears both perks', () => {
    setPerk('2x_ore_income', true)
    setPerk('2x_prestige_point_income', true)
    togglePerkBundle('ore_prestige_bundle')
    const p = get(storeProgress).perks
    expect(p['2x_ore_income']).toBe(false)
    expect(p['2x_prestige_point_income']).toBe(false)
  })
})

describe('storeProgress — founder tier cascade', () => {
  it('setFounderTier(0) is a no-op for prereqs (nothing auto-set)', () => {
    setFounderTier(0)
    const s = get(storeProgress)
    expect(s.perks['2x_ore_income']).toBeUndefined()
    expect(s.founder.bundlePurchased).toBe(false)
    expect(s.founder.tier).toBe(0)
  })

  it('setFounderTier(3) auto-fills all 4 perks + founder.bundlePurchased', () => {
    setFounderTier(3)
    const s = get(storeProgress)
    expect(s.perks['2x_ore_income']).toBe(true)
    expect(s.perks['2x_prestige_point_income']).toBe(true)
    expect(s.perks['2x_bar_income']).toBe(true)
    expect(s.perks['3x_bomb_damage']).toBe(true)
    expect(s.founder.bundlePurchased).toBe(true)
    expect(s.founder.tier).toBe(3)
  })

  it('setFounderTier DECREASE does NOT clear perks or bundlePurchased', () => {
    setFounderTier(5)
    setFounderTier(0)
    const s = get(storeProgress)
    expect(s.perks['2x_ore_income']).toBe(true)
    expect(s.founder.bundlePurchased).toBe(true)
    expect(s.founder.tier).toBe(0)
  })

  it('setFounderTier clamps below 0 to 0', () => {
    setFounderTier(-1)
    expect(get(storeProgress).founder.tier).toBe(0)
  })

  it('setFounderTier clamps above 12 to 12', () => {
    setFounderTier(99)
    expect(get(storeProgress).founder.tier).toBe(12)
  })
})

describe('storeProgress — gem upgrade ranks', () => {
  it('setGemUpgradeRank writes the rank', () => {
    setGemUpgradeRank('pickaxe_damage', 5)
    expect(get(storeProgress).gemUpgrades.pickaxe_damage).toBe(5)
  })

  it('clamps below 0 to 0', () => {
    setGemUpgradeRank('pickaxe_damage', -3)
    expect(get(storeProgress).gemUpgrades.pickaxe_damage).toBe(0)
  })

  it('clamps multi-effect upgrades to the max across their sources', () => {
    // bomb_damage_capacity has two effect sources (damage + capacity), both max 22.
    setGemUpgradeRank('bomb_damage_capacity', 99)
    expect(get(storeProgress).gemUpgrades.bomb_damage_capacity).toBe(22)
  })

  it('clamps above maxLevel to maxLevel', () => {
    setGemUpgradeRank('pickaxe_damage', 99)
    expect(get(storeProgress).gemUpgrades.pickaxe_damage).toBe(22)
  })
})

describe('storeProgress — reset', () => {
  it('resetStoreProgress clears all slices to defaults', () => {
    setValuePack('capitalist_bundle', true)
    setUnlock('unlocked_permanent_drone', true)
    setPerk('2x_ore_income', true)
    setFounderTier(5)
    setGemUpgradeRank('pickaxe_damage', 10)

    resetStoreProgress()

    const s = get(storeProgress)
    expect(s.valuePacks.capitalist_bundle).toBeUndefined()
    expect(s.unlocks.unlocked_permanent_drone).toBe(false)
    expect(s.perks['2x_ore_income']).toBeUndefined()
    expect(s.founder.tier).toBe(0)
    expect(s.gemUpgrades.pickaxe_damage).toBeUndefined()
  })
})

describe('storeProgress — setFoundersBundlePurchased', () => {
  it('can be set independently of cascade', () => {
    setFoundersBundlePurchased(true)
    expect(get(storeProgress).founder.bundlePurchased).toBe(true)
    setFoundersBundlePurchased(false)
    expect(get(storeProgress).founder.bundlePurchased).toBe(false)
  })
})

describe('migrateStoreProgress — legacy flat-blob migration', () => {
  it('translates legacy flat keys into the new nested shape', () => {
    const out = migrateStoreProgress({
      value_pack_capitalist_bundle: true,
      perk_2x_ore_income: true,
      gem_upgrade_pickaxe_damage: 7,
      unlocked_permanent_drone: true,
      founder_tier: 5,
      founders_bundle_purchased: true,
    })
    expect(out.valuePacks.capitalist_bundle).toBe(true)
    expect(out.perks['2x_ore_income']).toBe(true)
    expect(out.gemUpgrades.pickaxe_damage).toBe(7)
    expect(out.unlocks.unlocked_permanent_drone).toBe(true)
    expect(out.founder.tier).toBe(5)
    expect(out.founder.bundlePurchased).toBe(true)
  })

  it('returns defaults on null/non-object input', () => {
    const out = migrateStoreProgress(null)
    expect(out.founder.tier).toBe(0)
    expect(out.valuePacks).toEqual({})
  })

  it('accepts the new nested shape unchanged', () => {
    const input = {
      valuePacks: { capitalist_bundle: true },
      perks: { '2x_ore_income': true },
      gemUpgrades: { pickaxe_damage: 3 },
      unlocks: {
        unlocked_permanent_drone: true,
        unlocked_megabomb: false,
        unlocked_transmuter_bomb: false,
        unlocked_battery_bomb: false,
      },
      founder: { tier: 2, bundlePurchased: true },
    }
    const out = migrateStoreProgress(input)
    expect(out.valuePacks.capitalist_bundle).toBe(true)
    expect(out.gemUpgrades.pickaxe_damage).toBe(3)
    expect(out.founder.tier).toBe(2)
  })

  it('ignores unknown unlock keys but preserves valid ones', () => {
    const out = migrateStoreProgress({
      unlocked_permanent_drone: true,
      unlocked_garbage_key: true,
    })
    expect(out.unlocks.unlocked_permanent_drone).toBe(true)
    expect((out.unlocks as Record<string, boolean>).unlocked_garbage_key).toBeUndefined()
  })
})

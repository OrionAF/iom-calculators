import { describe, expect, it } from 'vitest'
import {
  VALUE_PACKS,
  PERKS,
  PERK_BUNDLES,
  GEM_UNLOCKS,
  GEM_UPGRADES,
  FOUNDER_TIERS,
  gemUpgradeMaxLevel,
} from './catalog'
import { storeSources } from '$lib/sources/store'
import { formatSourceValue } from '$lib/format'

describe('VALUE_PACKS', () => {
  it('has unique slugs', () => {
    const slugs = VALUE_PACKS.map(p => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('all entries have non-empty name and icon', () => {
    for (const p of VALUE_PACKS) {
      expect(p.name.length).toBeGreaterThan(0)
      expect(p.icon.length).toBeGreaterThan(0)
    }
  })

  it('mirror unlock packs declare a valid mirrorUnlockKey', () => {
    const validMirrorKeys = [
      'unlocked_permanent_drone',
      'unlocked_megabomb',
      'unlocked_transmuter_bomb',
      'unlocked_battery_bomb',
    ]
    for (const p of VALUE_PACKS) {
      if (p.mirrorUnlockKey !== undefined) {
        expect(validMirrorKeys).toContain(p.mirrorUnlockKey)
      }
    }
  })

  it('has exactly 4 mirror unlock packs (one per gem unlock)', () => {
    const mirrors = VALUE_PACKS.filter(p => p.mirrorUnlockKey !== undefined)
    expect(mirrors.length).toBe(4)
  })
})

describe('PERKS', () => {
  it('has 4 perks', () => { expect(PERKS.length).toBe(4) })
  it('has unique slugs', () => {
    const slugs = PERKS.map(p => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
  it('all entries have non-empty name and icon', () => {
    for (const p of PERKS) {
      expect(p.name.length).toBeGreaterThan(0)
      expect(p.icon.length).toBeGreaterThan(0)
    }
  })
})

describe('PERK_BUNDLES', () => {
  it('has 2 bundles', () => { expect(PERK_BUNDLES.length).toBe(2) })
  it('all perkSlugs reference valid PERK entries', () => {
    const validSlugs = new Set(PERKS.map(p => p.slug))
    for (const bundle of PERK_BUNDLES) {
      for (const slug of bundle.perkSlugs) {
        expect(validSlugs.has(slug)).toBe(true)
      }
    }
  })
  it('each bundle has exactly 2 perks', () => {
    for (const bundle of PERK_BUNDLES) {
      expect(bundle.perkSlugs.length).toBe(2)
    }
  })
})

describe('GEM_UNLOCKS', () => {
  it('has 4 unlocks', () => { expect(GEM_UNLOCKS.length).toBe(4) })
  it('all mirrorUnlockKey values correspond to a value pack with the same key', () => {
    const valuePackMirrors = new Set(
      VALUE_PACKS.filter(p => p.mirrorUnlockKey).map(p => p.mirrorUnlockKey)
    )
    for (const unlock of GEM_UNLOCKS) {
      expect(valuePackMirrors.has(unlock.mirrorUnlockKey)).toBe(true)
    }
  })
})

describe('GEM_UPGRADES', () => {
  it('has 6 upgrades', () => { expect(GEM_UPGRADES.length).toBe(6) })
  it('gemUpgradeMaxLevel > 0 for all entries (derived from sources)', () => {
    for (const u of GEM_UPGRADES) expect(gemUpgradeMaxLevel(u)).toBeGreaterThan(0)
  })
  it('all entries have non-empty name and icon', () => {
    for (const u of GEM_UPGRADES) {
      expect(u.name.length).toBeGreaterThan(0)
      expect(u.icon.length).toBeGreaterThan(0)
    }
  })
})

describe('FOUNDER_TIERS', () => {
  it('has 12 tiers numbered 1-12 in order', () => {
    expect(FOUNDER_TIERS.length).toBe(12)
    for (let i = 0; i < FOUNDER_TIERS.length; i++) {
      expect(FOUNDER_TIERS[i].tier).toBe(i + 1)
    }
  })
  it('vipPointsRequired is strictly increasing', () => {
    for (let i = 1; i < FOUNDER_TIERS.length; i++) {
      expect(FOUNDER_TIERS[i].vipPointsRequired).toBeGreaterThan(
        FOUNDER_TIERS[i - 1].vipPointsRequired
      )
    }
  })
  it('every tier has at least one effect, each referencing a store.founder source', () => {
    for (const t of FOUNDER_TIERS) {
      expect(t.effects.length).toBeGreaterThan(0)
      for (const e of t.effects) {
        expect(e.source.key).toBe('store.founder')
        expect(typeof e.source.statKey).toBe('string')
      }
    }
  })

  it('founder effect values come from source.fn(tier)', () => {
    // Tier 5 Golden Lootbug Chance at tier 7: 0.06 + 2×0.03 = 0.12
    const tier5 = FOUNDER_TIERS.find(t => t.tier === 5)!
    expect(tier5.effects[0].source.fn(7, {})).toBeCloseTo(0.12, 10)
    // Below unlock tier → 0
    expect(tier5.effects[0].source.fn(4, {})).toBe(0)
    // Tier 1 cooldown at tier 12: 60 - 11×2 = 38
    const tier1 = FOUNDER_TIERS.find(t => t.tier === 1)!
    expect(tier1.effects[0].source.fn(12, {})).toBe(38)
  })
})

describe('catalog ↔ sources coverage', () => {
  const knownSources = new Set(Object.values(storeSources))

  it('every effect source in the catalog is a registered storeSources entry', () => {
    const all = [
      ...VALUE_PACKS.flatMap(p => p.effects),
      ...PERKS.flatMap(p => p.effects),
      ...GEM_UNLOCKS.flatMap(u => u.effects),
      ...GEM_UPGRADES.flatMap(u => u.effects),
      ...FOUNDER_TIERS.flatMap(t => t.effects),
    ]
    for (const e of all) {
      if (e.source) expect(knownSources.has(e.source), `unregistered source: ${e.source.key}`).toBe(true)
    }
  })

  it('every stat-affecting source declares both statKey and op', () => {
    for (const [name, s] of Object.entries(storeSources)) {
      expect(s.statKey, `${name} missing statKey`).toBeTruthy()
      expect(s.op, `${name} missing op`).toBeTruthy()
    }
  })
})

describe('formatSourceValue (decimal convention)', () => {
  it('formats percent values from decimals', () => {
    expect(formatSourceValue('lootbug_golden_chance', 0.12)).toBe('12%')
    expect(formatSourceValue('gem_bomb_gem_chance', 0.005)).toBe('0.5%')
  })
  it('formats minutes', () => {
    expect(formatSourceValue('founder_supply_drop_cd', 38)).toBe('38 minutes')
  })
  it('formats multipliers', () => {
    expect(formatSourceValue('ore_income_multi', 2)).toBe('2×')
  })
  it('formats counts as plain numbers with sign where declared', () => {
    expect(formatSourceValue('freebie_gems_bonus', 4)).toBe('+4')
  })
})

import { describe, expect, it } from 'vitest'
import {
  VALUE_PACKS,
  PERKS,
  PERK_BUNDLES,
  GEM_UNLOCKS,
  GEM_UPGRADES,
  FOUNDER_TIERS,
  vipEffectAt,
  formatVipEffectValue,
} from './catalog'

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
  it('maxLevel > 0 for all entries', () => {
    for (const u of GEM_UPGRADES) expect(u.maxLevel).toBeGreaterThan(0)
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
  it('every tier has at least one effect with baseValue/increment/unit set', () => {
    const validUnits = ['minutes', 'percent', 'multiplier', 'count']
    for (const t of FOUNDER_TIERS) {
      expect(t.effects.length).toBeGreaterThan(0)
      for (const e of t.effects) {
        expect(typeof e.baseValue).toBe('number')
        expect(typeof e.increment).toBe('number')
        expect(validUnits).toContain(e.unit)
      }
    }
  })
})

describe('vipEffectAt', () => {
  it('returns 0 when unlockedTier is below effectUnlockTier', () => {
    expect(vipEffectAt(5, 6, 100, 5)).toBe(0)
  })
  it('returns baseValue at exact unlock tier', () => {
    expect(vipEffectAt(5, 5, 12, 6)).toBe(12)
  })
  it('adds increment per tier above the unlock tier', () => {
    expect(vipEffectAt(8, 5, 10, 2)).toBe(16)
  })
  it('handles negative increments (e.g. cooldown reduction)', () => {
    expect(vipEffectAt(12, 1, 60, -2)).toBe(38)
  })
  it('works with decimal magnitudes (Golden Lootbug Chance at tier 7)', () => {
    // Tier 5 effect, baseValue 0.06, +0.03 per tier above.
    // At unlockedTier 7: 0.06 + 2*0.03 = 0.12
    expect(vipEffectAt(7, 5, 0.06, 0.03)).toBeCloseTo(0.12, 10)
  })
})

describe('formatVipEffectValue', () => {
  it('formats percent values from decimals', () => {
    expect(formatVipEffectValue(0.12, 'percent')).toBe('12%')
    expect(formatVipEffectValue(0.005, 'percent')).toBe('0.5%')
    expect(formatVipEffectValue(0.025, 'percent')).toBe('2.5%')
  })
  it('formats minutes', () => {
    expect(formatVipEffectValue(60, 'minutes')).toBe('60 minutes')
    expect(formatVipEffectValue(38, 'minutes')).toBe('38 minutes')
  })
  it('formats multipliers', () => {
    expect(formatVipEffectValue(2, 'multiplier')).toBe('2x')
    expect(formatVipEffectValue(13, 'multiplier')).toBe('13x')
  })
  it('formats counts as plain numbers', () => {
    expect(formatVipEffectValue(4, 'count')).toBe('4')
    expect(formatVipEffectValue(26, 'count')).toBe('26')
  })
})

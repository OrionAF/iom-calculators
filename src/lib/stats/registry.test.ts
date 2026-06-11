import { describe, expect, it } from 'vitest'
import { STAT_REGISTRY } from './registry'
import { STAT_CATALOG } from './catalog'
import {
  VALUE_PACKS,
  PERKS,
  PERK_BUNDLES,
  GEM_UPGRADES,
  FOUNDER_TIERS,
} from '../store/catalog'

describe('STAT_REGISTRY structure', () => {
  it('every entry has a non-empty name', () => {
    for (const [key, meta] of Object.entries(STAT_REGISTRY)) {
      expect(meta.name.length, `${key} has empty name`).toBeGreaterThan(0)
    }
  })

  it('every entry has a non-empty description', () => {
    for (const [key, meta] of Object.entries(STAT_REGISTRY)) {
      expect(meta.description.length, `${key} has empty description`).toBeGreaterThan(0)
    }
  })

  it('if an entry declares an icon, it is a non-empty string', () => {
    for (const [key, meta] of Object.entries(STAT_REGISTRY)) {
      if (meta.icon !== undefined) {
        expect(typeof meta.icon, `${key} icon is not a string`).toBe('string')
        expect(meta.icon.length, `${key} icon is empty`).toBeGreaterThan(0)
      }
    }
  })
})

describe('STAT_CATALOG ↔ STAT_REGISTRY cross-resolution', () => {
  // STAT_CATALOG is now derived from StatMeta.category, so catalog keys
  // resolve in the registry by construction. The remaining failure mode is
  // the inverse: a registry entry declaring a category id that no catalog
  // category defines — the stat would silently vanish from Loaded Stats.
  it('every StatMeta.category maps to a defined STAT_CATALOG category id', () => {
    const known = new Set(STAT_CATALOG.map(c => c.id))
    const orphaned: string[] = []
    for (const [key, meta] of Object.entries(STAT_REGISTRY)) {
      if (meta.category !== undefined && !known.has(meta.category)) {
        orphaned.push(`${key} → '${meta.category}'`)
      }
    }
    expect(orphaned, `orphaned categories: ${orphaned.join(', ')}`).toHaveLength(0)
  })
})

describe('STORE_CATALOG ↔ STAT_REGISTRY cross-resolution (strict)', () => {
  it('every derivedStatKey in VALUE_PACKS resolves to a registry entry', () => {
    const missing: string[] = []
    for (const pack of VALUE_PACKS) {
      if (pack.effects) {
        for (const effect of pack.effects) {
          if (effect.derivedStatKey && !STAT_REGISTRY[effect.derivedStatKey]) {
            missing.push(effect.derivedStatKey)
          }
        }
      }
    }
    expect(missing, `unresolved keys: ${missing.join(', ')}`).toHaveLength(0)
  })

  it('every derivedStatKey in PERKS resolves to a registry entry', () => {
    const missing: string[] = []
    for (const perk of PERKS) {
      if (perk.effects) {
        for (const effect of perk.effects) {
          if (effect.derivedStatKey && !STAT_REGISTRY[effect.derivedStatKey]) {
            missing.push(effect.derivedStatKey)
          }
        }
      }
    }
    expect(missing, `unresolved keys: ${missing.join(', ')}`).toHaveLength(0)
  })

  it('PERK_BUNDLES reference valid PERKS (already tested above)', () => {
    // PerkBundle has perkSlugs, not effects — the effects come from the
    // referenced Perk entries, which we test separately.
    const validSlugs = new Set(PERKS.map(p => p.slug))
    for (const bundle of PERK_BUNDLES) {
      for (const slug of bundle.perkSlugs) {
        expect(validSlugs.has(slug), `PerkBundle references unknown perk: ${slug}`).toBe(true)
      }
    }
  })

  it('every derivedStatKey in GEM_UPGRADES resolves to a registry entry', () => {
    const missing: string[] = []
    for (const upgrade of GEM_UPGRADES) {
      if (upgrade.effects) {
        for (const effect of upgrade.effects) {
          if (effect.derivedStatKey && !STAT_REGISTRY[effect.derivedStatKey]) {
            missing.push(effect.derivedStatKey)
          }
        }
      }
    }
    expect(missing, `unresolved keys: ${missing.join(', ')}`).toHaveLength(0)
  })

  it('every derivedStatKey in FOUNDER_TIERS resolves to a registry entry', () => {
    const missing: string[] = []
    for (const tier of FOUNDER_TIERS) {
      if (tier.effects) {
        for (const effect of tier.effects) {
          if (effect.derivedStatKey && !STAT_REGISTRY[effect.derivedStatKey]) {
            missing.push(effect.derivedStatKey)
          }
        }
      }
    }
    expect(missing, `unresolved keys: ${missing.join(', ')}`).toHaveLength(0)
  })
})

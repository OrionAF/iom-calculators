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

describe('STAT_CATALOG ↔ STAT_REGISTRY cross-resolution (strict)', () => {
  // Every stat that appears in STAT_CATALOG must have a matching entry in
  // STAT_REGISTRY. The catalog is structure-only (groupings of stat keys);
  // the registry is the canonical home for identity (name, icon, description,
  // affix). A catalog key without a registry entry would render with the
  // fallback `prettyKey(key)` instead of the real name — visible to users.
  //
  // This was previously tolerated as a ratchet (107 known gaps). The gap was
  // closed in commit 44f434a; this test now enforces the strict invariant.
  // Add a new catalog stat → add the matching registry entry in the same PR.
  it('every STAT_CATALOG.stats[].key resolves in STAT_REGISTRY', () => {
    const missing: string[] = []
    for (const cat of STAT_CATALOG) {
      for (const stat of cat.stats) {
        if (!STAT_REGISTRY[stat.key]) missing.push(`${cat.id}/${stat.key}`)
      }
    }
    expect(missing, `unresolved keys: ${missing.join(', ')}`).toHaveLength(0)
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

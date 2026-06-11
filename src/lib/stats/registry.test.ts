import { describe, expect, it } from 'vitest'
import { STAT_REGISTRY } from './registry'
import { STAT_CATALOG } from './catalog'
import { VALUE_PACKS, PERKS, PERK_BUNDLES, GEM_UPGRADES, FOUNDER_TIERS } from '../store/catalog'

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
    const known = new Set(STAT_CATALOG.map((c) => c.id))
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
  it('every effect source statKey in the store catalog resolves to a registry entry', () => {
    const all = [
      ...VALUE_PACKS.flatMap((p) => p.effects),
      ...PERKS.flatMap((p) => p.effects),
      ...GEM_UPGRADES.flatMap((u) => u.effects),
      ...FOUNDER_TIERS.flatMap((t) => t.effects),
    ]
    const missing: string[] = []
    for (const effect of all) {
      const key = effect.source?.statKey
      if (key && !STAT_REGISTRY[key]) missing.push(key)
    }
    expect(missing, `unresolved keys: ${missing.join(', ')}`).toHaveLength(0)
  })

  it('PERK_BUNDLES reference valid PERKS', () => {
    const validSlugs = new Set(PERKS.map((p) => p.slug))
    for (const bundle of PERK_BUNDLES) {
      for (const slug of bundle.perkSlugs) {
        expect(validSlugs.has(slug), `PerkBundle references unknown perk: ${slug}`).toBe(true)
      }
    }
  })
})

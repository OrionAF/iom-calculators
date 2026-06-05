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
  // The catalog enumerates every stat in the JSON export. The registry holds
  // the identity (name, icon, description) for stats currently surfaced by
  // calculators, store-page tooltips, or other consumers. Pages handle missing
  // registry entries via a `meta?.name ?? prettyKey(stat.key)` fallback, so
  // gaps are non-fatal. We track the gap as a known-shortfall: it's allowed
  // to widen with new catalog entries but must SHRINK over time as registry
  // entries are backfilled.
  //
  // The current shortfall is captured in TOLERATED_MISSING below. To backfill
  // a stat: add an entry to STAT_REGISTRY, then remove it from TOLERATED_MISSING.
  // If a backfill makes the actual missing set smaller, this test will fail
  // and prompt you to update the constant — that's the ratchet that prevents
  // backsliding.
  const TOLERATED_MISSING: ReadonlySet<string> = new Set([
    // bombs (12)
    'bomb_crit_damage', 'bomb_free_chance', 'bomb_super_crit_chance', 'bomb_super_crit_damage',
    'bomb_ultra_crit_chance', 'bomb_ultra_crit_damage', 'bomb_omega_crit_chance', 'bomb_omega_crit_damage',
    'bomb_cap_multiplier', 'bomb_workshop_cap_increase', 'bomb_of_plenty_make_gold_chance',
    'bomb_trans_apply_bop_chance',
    // drones (9)
    'drone_damage_percent', 'drone_rapid_fire_chance', 'coal_capacity_multi', 'coal_fuel_save_chance',
    'void_portal_chance', 'rainbow_void_portal_chance', 'rainbow_void_portal_multi',
    'elixir_crit_chance', 'elixir_crit_multi',
    // ores (9)
    'multi_rock_chance', 'golden_floor_chance', 'galactic_floor_chance', 'galactic_floor_multi',
    'prismatic_floor_chance', 'prismatic_floor_multi', 'pizzas_eaten', 'steak_eaten', 'all_floor_multipliers',
    // crafting (4)
    'double_craft_chance', 'craft_5x_chance', 'craft_20x_chance', 'bar_upgrade_cost_reduction',
    // obelisk (2)
    'obelisk_cooldown_multi', 'obelisk_armor_reduction',
    // prestige (3)
    'floor_clear_requirement_multi', 'artifact_cap_increase', 'artifact_tier4_cap_increase',
    // lootbugs (3)
    'lootbug_spawn_rate', 'lootbug_triple_chance', 'lootfrog_lanterns_used',
    // lootfrogs (7)
    'lootfrogs_caught', 'golden_lootfrogs_caught', 'lootfrog_golden_chance', 'lootfrog_golden_multi',
    'lootfrog_10x_spawn_chance', 'lootfrog_big_chance', 'lootfrog_big_multi',
    // chests (4)
    'chest_double_chance', 'stonks_chance', 'ultra_stonks_chance', 'ultra_stonks_multi',
    // contracts (6)
    'contract_double_points_chance', 'contract_triple_points_chance', 'contract_5x_points_chance',
    'contract_10x_points_chance', 'contract_cap_increase', 'contract_upgrade_cost_reduction',
    // veins (3)
    'rainbow_vein_multi', 'gleaming_vein_chance', 'gleaming_vein_multi',
    // stars (9)
    'star_spawn_rate', 'star_auto_catch_chance', 'star_double_spawn_chance', 'super_star_spawn_multi',
    'star_radiant_chance', 'star_radiant_multi', 'super_star_radiant_chance', 'super_star_radiant_multi',
    'candy_eaten',
    // fishing (9)
    'fishing_drone_power', 'fishing_drone_multiplier', 'fishing_double_tick_chance',
    'fishing_token_multi', 'fishing_shiny_chance', 'fishing_shiny_multi',
    'fishing_super_shiny_chance', 'fishing_super_shiny_multi', 'fishing_tick_speed',
    // world1statues (9)
    'statue_0_set1', 'statue_1_set1', 'statue_2_set1', 'statue_3_set1', 'statue_4_set1',
    'statue_5_set1', 'statue_6_set1', 'statue_7_set1', 'statue_8_set1',
    // world3statues (9)
    'statue_0_set2', 'statue_1_set2', 'statue_2_set2', 'statue_3_set2', 'statue_4_set2',
    'statue_5_set2', 'statue_6_set2', 'statue_7_set2', 'statue_8_set2',
    // world4statues (9)
    'statue_0_set3', 'statue_1_set3', 'statue_2_set3', 'statue_3_set3', 'statue_4_set3',
    'statue_5_set3', 'statue_6_set3', 'statue_7_set3', 'statue_8_set3',
  ])

  it('only tolerated keys are missing from the registry (gap may shrink, not grow)', () => {
    const actuallyMissing = new Set<string>()
    for (const cat of STAT_CATALOG) {
      for (const stat of cat.stats) {
        if (!STAT_REGISTRY[stat.key]) actuallyMissing.add(stat.key)
      }
    }
    const newGaps = [...actuallyMissing].filter(k => !TOLERATED_MISSING.has(k))
    const backfilled = [...TOLERATED_MISSING].filter(k => !actuallyMissing.has(k))

    if (newGaps.length > 0) {
      throw new Error(
        `New catalog keys lack registry entries: ${newGaps.join(', ')}. ` +
        `Either add registry entries or extend TOLERATED_MISSING.`
      )
    }
    if (backfilled.length > 0) {
      throw new Error(
        `These keys are now in the registry — remove them from TOLERATED_MISSING: ${backfilled.join(', ')}`
      )
    }
    // Otherwise: gap unchanged, test passes
    expect(newGaps).toHaveLength(0)
    expect(backfilled).toHaveLength(0)
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

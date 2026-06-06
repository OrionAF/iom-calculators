import type { Source } from '$lib/engine/types'

// ─── Stargazing Upgrades ──────────────────────────────────────────────────────

/** Auto-catch Stars upgrade: +4% (0.04) per level. Max 15. → star_auto_catch_chance */
const autoCatch: Source = {
  key: 'stargazing.autoCatch',
  name: 'Auto-catch Stars (Upgrade)',
  system: 'stargazing',
  maxLevel: 15,
  fn: (l) => l * 0.04,
  inputs: [],
}

/** Star Spawn Rate upgrade: +5% (0.05) per level. Max 20. → star_spawn_rate */
const spawnRate: Source = {
  key: 'stargazing.spawnRate',
  name: 'Star Spawn Rate (Upgrade)',
  system: 'stargazing',
  maxLevel: 20,
  fn: (l) => l * 0.05,
  inputs: [],
}

/** Double Star Chance upgrade: +5% (0.05) per level. Max 20. → star_double_spawn_chance */
const doubleChance: Source = {
  key: 'stargazing.doubleChance',
  name: 'Double Star Chance (Upgrade)',
  system: 'stargazing',
  maxLevel: 20,
  fn: (l) => l * 0.05,
  inputs: [],
}

/** Super Star Spawn Rate upgrade: +2% (0.02) per level. Max 20. → super_star_spawn_multi */
const superStarSpawn: Source = {
  key: 'stargazing.superStarSpawn',
  name: 'Super Star Spawn Rate (Upgrade)',
  system: 'stargazing',
  maxLevel: 20,
  fn: (l) => l * 0.02,
  inputs: [],
}

/** Star Supernova Chance upgrade: +0.5% (0.005) per level. Max 20. → star_supernova_chance */
const novaChance: Source = {
  key: 'stargazing.novaChance',
  name: 'Star Supernova Chance (Upgrade)',
  system: 'stargazing',
  maxLevel: 20,
  fn: (l) => l * 0.005,
  inputs: [],
}

/** Super Star 10x Chance upgrade: +0.2% (0.002) per level. Max 20. → super_star_10x_chance */
const super10xChance: Source = {
  key: 'stargazing.super10xChance',
  name: 'Super Star 10x Chance (Upgrade)',
  system: 'stargazing',
  maxLevel: 20,
  fn: (l) => l * 0.002,
  inputs: [],
}

/** Star Supergiant Chance upgrade: +0.2% (0.002) per level. Max 20. → star_supergiant_chance */
const supergiants: Source = {
  key: 'stargazing.supergiants',
  name: 'Star Supergiant Chance (Upgrade)',
  system: 'stargazing',
  maxLevel: 20,
  fn: (l) => l * 0.002,
  inputs: [],
}

/** Super Star Supergiant Chance upgrade: +0.15% (0.0015) per level. Max 20. → super_star_supergiant_chance */
const superSupergiants: Source = {
  key: 'stargazing.superSupergiants',
  name: 'Super Star Supergiant Chance (Upgrade)',
  system: 'stargazing',
  maxLevel: 20,
  fn: (l) => l * 0.0015,
  inputs: [],
}

/** All Star Multiplier upgrade: +0.01 per level. Max 30. → all_star_multi */
const allStarMulti: Source = {
  key: 'stargazing.allStarMulti',
  name: 'All Star Multiplier (Upgrade)',
  system: 'stargazing',
  maxLevel: 30,
  fn: (l) => l * 0.01,
  inputs: [],
}

/** Super Star Radiant Chance upgrade: +0.15% (0.0015) per level. Max 25. → super_star_radiant_chance */
const superRadiant: Source = {
  key: 'stargazing.superRadiant',
  name: 'Super Star Radiant Chance (Upgrade)',
  system: 'stargazing',
  maxLevel: 25,
  fn: (l) => l * 0.0015,
  inputs: [],
}

// ─── Super Star Upgrades ──────────────────────────────────────────────────────

/** Supergiant Star Multiplier super-star upgrade: +10% (0.10) per level. Max 20. → star_supergiant_multi */
const supergigantsMulti: Source = {
  key: 'stargazing.supergigantsMulti',
  name: 'Supergiant Star Multiplier (Super Star Upgrade)',
  system: 'stargazing',
  maxLevel: 20,
  fn: (l) => l * 0.10,
  inputs: [],
}

/** Novagiant Combo Multiplier super-star upgrade: +2% (0.02) per level. Max 15. → novagiant_combo_multi */
const novagiant: Source = {
  key: 'stargazing.novagiant',
  name: 'Novagiant Combo Multiplier (Super Star Upgrade)',
  system: 'stargazing',
  maxLevel: 15,
  fn: (l) => l * 0.02,
  inputs: [],
}

/** Star Radiant Chance super-star upgrade: +0.1% (0.001) per level. Max 20. → star_radiant_chance */
const radiantChance: Source = {
  key: 'stargazing.radiantChance',
  name: 'Star Radiant Chance (Super Star Upgrade)',
  system: 'stargazing',
  maxLevel: 20,
  fn: (l) => l * 0.001,
  inputs: [],
}

// ─── Individual Stars ─────────────────────────────────────────────────────────
// Stars not listed here don't contribute to the 22 star catalog stat keys directly.

/** Gemini: Star Spawn Rate +2% (0.02) per level. Max 34. → star_spawn_rate */
const starGemini: Source = {
  key: 'stargazing.starGemini',
  name: 'Gemini (Star)',
  system: 'stargazing',
  maxLevel: 34,
  fn: (l) => l * 0.02,
  inputs: [],
}

/** Taurus: Auto-Catch Chance +2% (0.02) per level. Max 22. → star_auto_catch_chance */
const starTaurus: Source = {
  key: 'stargazing.starTaurus',
  name: 'Taurus (Star)',
  system: 'stargazing',
  maxLevel: 22,
  fn: (l) => l * 0.02,
  inputs: [],
}

/** Virgo: Super Star Spawn Rate +1% (0.01) per level. Max 30. → super_star_spawn_multi */
const starVirgo: Source = {
  key: 'stargazing.starVirgo',
  name: 'Virgo (Star)',
  system: 'stargazing',
  maxLevel: 30,
  fn: (l) => l * 0.01,
  inputs: [],
}

/** Sagittarius: Triple Star Chance +1% (0.01) per level. Max 17. → star_triple_spawn_chance */
const starSagittarius: Source = {
  key: 'stargazing.starSagittarius',
  name: 'Sagittarius (Star)',
  system: 'stargazing',
  maxLevel: 17,
  fn: (l) => l * 0.01,
  inputs: [],
}

/** Leo: Super Star Triple Chance +4% (0.04) per level. Max 5. → super_star_triple_chance */
const starLeo: Source = {
  key: 'stargazing.starLeo',
  name: 'Leo (Star)',
  system: 'stargazing',
  maxLevel: 5,
  fn: (l) => l * 0.04,
  inputs: [],
}

/** Scorpio: All Star Multi +0.5% (0.005) per level. Max 117. → all_star_multi */
const starScorpio: Source = {
  key: 'stargazing.starScorpio',
  name: 'Scorpio (Star)',
  system: 'stargazing',
  maxLevel: 117,
  fn: (l) => l * 0.005,
  inputs: [],
}

/** Hercules: Star Supernova Chance +0.15% (0.0015) per level. Max 55. → star_supernova_chance */
const starHercules: Source = {
  key: 'stargazing.starHercules',
  name: 'Hercules (Star)',
  system: 'stargazing',
  maxLevel: 55,
  fn: (l) => l * 0.0015,
  inputs: [],
}

// ─── Export ───────────────────────────────────────────────────────────────────

export const stargazingSources = {
  // Stargazing Upgrades
  autoCatch,
  spawnRate,
  doubleChance,
  superStarSpawn,
  novaChance,
  super10xChance,
  supergiants,
  superSupergiants,
  allStarMulti,
  superRadiant,
  // Super Star Upgrades
  supergigantsMulti,
  novagiant,
  radiantChance,
  // Individual Stars
  starGemini,
  starTaurus,
  starVirgo,
  starSagittarius,
  starLeo,
  starScorpio,
  starHercules,
} satisfies Record<string, Source>

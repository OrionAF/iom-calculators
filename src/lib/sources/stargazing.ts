import type { Source } from '$lib/engine/types'

// ─── Stargazing Upgrades ──────────────────────────────────────────────────────
// NOTE: 'Upgrade Telescope' (max 19) unlocks additional stars — no stat key.
// NOTE: 'Capper Upper' (max 5) raises caps of the four upgrades above it — no stat key.

/** Auto-catch Stars +4% per level. Max 15. → star_auto_catch_chance */
const autoCatch: Source = {
  key: 'stargazing.autoCatch',
  name: 'Auto-catch Stars (Upgrade)',
  system: 'stargazing',
  maxLevel: 15,
  fn: (l) => l * 0.04,
  inputs: [],
}

/** Star Spawn Rate +5% per level. Max 20. → star_spawn_rate */
const spawnRate: Source = {
  key: 'stargazing.spawnRate',
  name: 'Star Spawn Rate (Upgrade)',
  system: 'stargazing',
  maxLevel: 20,
  fn: (l) => l * 0.05,
  inputs: [],
}

/** Double Star Chance +5% per level. Max 20. → star_double_spawn_chance */
const doubleChance: Source = {
  key: 'stargazing.doubleChance',
  name: 'Double Star Chance (Upgrade)',
  system: 'stargazing',
  maxLevel: 20,
  fn: (l) => l * 0.05,
  inputs: [],
}

/** Super Star Spawn Rate +2% per level. Max 20. → super_star_spawn_multi */
const superStarSpawn: Source = {
  key: 'stargazing.superStarSpawn',
  name: 'Super Star Spawn Rate (Upgrade)',
  system: 'stargazing',
  maxLevel: 20,
  fn: (l) => l * 0.02,
  inputs: [],
}

/** Star Supernova Chance +0.5% per level. Max 20. → star_supernova_chance */
const novaChance: Source = {
  key: 'stargazing.novaChance',
  name: 'Star Supernova Chance (Upgrade)',
  system: 'stargazing',
  maxLevel: 20,
  fn: (l) => l * 0.005,
  inputs: [],
}

/** Super Star 10× Chance +0.2% per level. Max 20. → super_star_10x_chance */
const super10xChance: Source = {
  key: 'stargazing.super10xChance',
  name: 'Super Star 10x Chance (Upgrade)',
  system: 'stargazing',
  maxLevel: 20,
  fn: (l) => l * 0.002,
  inputs: [],
}

/** Star Supergiant Chance +0.2% per level. Max 20. → star_supergiant_chance */
const supergiants: Source = {
  key: 'stargazing.supergiants',
  name: 'Star Supergiant Chance (Upgrade)',
  system: 'stargazing',
  maxLevel: 20,
  fn: (l) => l * 0.002,
  inputs: [],
}

/** Super Star Supergiant Chance +0.15% per level. Max 20. → super_star_supergiant_chance */
const superSupergiants: Source = {
  key: 'stargazing.superSupergiants',
  name: 'Super Star Supergiant Chance (Upgrade)',
  system: 'stargazing',
  maxLevel: 20,
  fn: (l) => l * 0.0015,
  inputs: [],
}

/** All Star Multiplier +0.01 per level. Max 30. → all_star_multi */
const allStarMulti: Source = {
  key: 'stargazing.allStarMulti',
  name: 'All Star Multiplier (Upgrade)',
  system: 'stargazing',
  maxLevel: 30,
  fn: (l) => l * 0.01,
  inputs: [],
}

/** Super Star Radiant Chance +0.15% per level. Max 25. → super_star_radiant_chance */
const superRadiant: Source = {
  key: 'stargazing.superRadiant',
  name: 'Super Star Radiant Chance (Upgrade)',
  system: 'stargazing',
  maxLevel: 25,
  fn: (l) => l * 0.0015,
  inputs: [],
}

// ─── Super Star Upgrades ──────────────────────────────────────────────────────
// NOTE: 'Star Level Caps +1' (max 2), 'Aries/Gemini/Cancer Cap +2' (max 3),
//       'Virgo/Aqua/Ophi Cap +1' (max 3) — meta cap increases, no stat key.
// NOTE: 'Elixir & Void Grade Cap +2' (max 5) — no stat key.
// NOTE: 'Unlock the Black Hole' (max 1) — unlock, no stat key.

/** Rainbow Vein Chance +1% per level. Max 10. → rainbow_vein_chance */
const ssRainbowVeinChance: Source = {
  key: 'stargazing.ssRainbowVeinChance',
  name: 'Rainbow Vein Chance (Super Star)',
  system: 'stargazing',
  maxLevel: 10,
  fn: (l) => l * 0.01,
  inputs: [],
}

/** Double Contract Points +2% per level. Max 10. → contract_double_points_chance */
const ssDoubleContractPoints: Source = {
  key: 'stargazing.ssDoubleContractPoints',
  name: 'Double Contract Points (Super Star)',
  system: 'stargazing',
  maxLevel: 10,
  fn: (l) => l * 0.02,
  inputs: [],
}

/** Experience Gain +25% per level. Max 10. → experience_multi */
const ssExpGain: Source = {
  key: 'stargazing.ssExpGain',
  name: 'Experience Gain (Super Star)',
  system: 'stargazing',
  maxLevel: 10,
  fn: (l) => l * 0.25,
  inputs: [],
}

/** Item Duration +3% per level. Max 10. → item_duration_multi */
const ssItemDuration: Source = {
  key: 'stargazing.ssItemDuration',
  name: 'Item Duration (Super Star)',
  system: 'stargazing',
  maxLevel: 10,
  fn: (l) => l * 0.03,
  inputs: [],
}

/** Game Speed +2% per level. Max 10. → game_speed_multi */
const ssGameSpeed: Source = {
  key: 'stargazing.ssGameSpeed',
  name: 'Game Speed (Super Star)',
  system: 'stargazing',
  maxLevel: 10,
  fn: (l) => l * 0.02,
  inputs: [],
}

/** Supergiant Star Multiplier +10% per level. Max 20. → star_supergiant_multi */
const supergigantsMulti: Source = {
  key: 'stargazing.supergigantsMulti',
  name: 'Supergiant Star Multiplier (Super Star)',
  system: 'stargazing',
  maxLevel: 20,
  fn: (l) => l * 0.10,
  inputs: [],
}

/** Golden Ore Multiplier +0.06 per level. Max 15. → golden_ore_multi */
const ssGoldenOreMul: Source = {
  key: 'stargazing.ssGoldenOreMul',
  name: 'Golden Ore Multiplier (Super Star)',
  system: 'stargazing',
  maxLevel: 15,
  fn: (l) => l * 0.06,
  inputs: [],
}

/**
 * Banked Freebies & Lootbugs +1 per level. Max 5.
 * Two sources share the same key so both stats use one level input.
 * → freebie_bank_cap
 */
const ssBankedFreebieLootbugFreebie: Source = {
  key: 'stargazing.ssBankedFreebieLootbug',
  name: 'Banked Freebies & Lootbugs (Super Star)',
  system: 'stargazing',
  maxLevel: 5,
  fn: (l) => l * 1,
  inputs: [],
}

/** → lootbug_bank_cap (same key as above — one UI input covers both stats) */
const ssBankedFreebieLootbugLootbug: Source = {
  key: 'stargazing.ssBankedFreebieLootbug',
  name: 'Banked Freebies & Lootbugs (Super Star)',
  system: 'stargazing',
  maxLevel: 5,
  fn: (l) => l * 1,
  inputs: [],
}

/** Lootbug Loot Multiplier +1.5% per level. Max 20. → lootbug_loot_multi */
const ssLootbugLootMul: Source = {
  key: 'stargazing.ssLootbugLootMul',
  name: 'Lootbug Loot Multiplier (Super Star)',
  system: 'stargazing',
  maxLevel: 20,
  fn: (l) => l * 0.015,
  inputs: [],
}

/** Novagiant Combo Multiplier +2% per level. Max 15. → novagiant_combo_multi */
const novagiant: Source = {
  key: 'stargazing.novagiant',
  name: 'Novagiant Combo Multiplier (Super Star)',
  system: 'stargazing',
  maxLevel: 15,
  fn: (l) => l * 0.02,
  inputs: [],
}

/** Fish Income Multiplier +1.25% per level. Max 15. → fishing_income_multi */
const ssFishIncomeMul: Source = {
  key: 'stargazing.ssFishIncomeMul',
  name: 'Fish Income Multiplier (Super Star)',
  system: 'stargazing',
  maxLevel: 15,
  fn: (l) => l * 0.0125,
  inputs: [],
}

/** Galactic Floor Chance +0.25% per level. Max 20. → galactic_floor_chance */
const ssGalacticFloorChance: Source = {
  key: 'stargazing.ssGalacticFloorChance',
  name: 'Galactic Floor Chance (Super Star)',
  system: 'stargazing',
  maxLevel: 20,
  fn: (l) => l * 0.0025,
  inputs: [],
}

/** Golden Ore Chance +0.3% per level. Max 20. → golden_ore_chance */
const ssGoldenOreChance: Source = {
  key: 'stargazing.ssGoldenOreChance',
  name: 'Golden Ore Chance (Super Star)',
  system: 'stargazing',
  maxLevel: 20,
  fn: (l) => l * 0.003,
  inputs: [],
}

/** Star Radiant Chance +0.1% per level. Max 20. → star_radiant_chance */
const radiantChance: Source = {
  key: 'stargazing.radiantChance',
  name: 'Star Radiant Chance (Super Star)',
  system: 'stargazing',
  maxLevel: 20,
  fn: (l) => l * 0.001,
  inputs: [],
}

// ─── Individual Stars ─────────────────────────────────────────────────────────
// Max levels include all cap sources (Super Star upgrades, skills, pets, etc.)
// per the Star Level Caps wiki table.

// ── Aries (max 28: base 20 + Star Caps 2 + Aries/Gem/Can Cap 6) ───────────────

/** Aries → Vein Spawn Rate +3% per level. Max 28. → vein_spawn_rate_multi */
const starAriesVeinSpawn: Source = {
  key: 'stargazing.starAries',
  name: 'Aries (Star)',
  system: 'stargazing',
  maxLevel: 28,
  fn: (l) => l * 0.03,
  inputs: [],
}

/** Aries → Golden Vein Chance +1% per level. Max 28. → golden_vein_chance */
const starAriesGoldenVein: Source = {
  key: 'stargazing.starAries',
  name: 'Aries (Star)',
  system: 'stargazing',
  maxLevel: 28,
  fn: (l) => l * 0.01,
  inputs: [],
}

// ── Taurus (max 22: base 20 + Star Caps 2) ────────────────────────────────────

/** Taurus → Pickaxe Damage +12% per level. Max 22. → pickaxe_damage */
const starTaurusPickaxeDmg: Source = {
  key: 'stargazing.starTaurus',
  name: 'Taurus (Star)',
  system: 'stargazing',
  maxLevel: 22,
  fn: (l) => l * 0.12,
  inputs: [],
}

/** Taurus → Auto-catch Stars +2% per level. Max 22. → star_auto_catch_chance */
const starTaurus: Source = {
  key: 'stargazing.starTaurus',
  name: 'Taurus (Star)',
  system: 'stargazing',
  maxLevel: 22,
  fn: (l) => l * 0.02,
  inputs: [],
}

// ── Gemini (max 34: base 20 + Why Are There Stars skill 6 + Star Caps 2 + Aries/Gem/Can Cap 6) ──

/**
 * Gemini → Golden Floor Multi ×1.02 per level. Max 34.
 * Multiplicative (op '×' in formula): fn = 1 + level × 0.02. → golden_floor_multi
 */
const starGeminiGoldenFloor: Source = {
  key: 'stargazing.starGemini',
  name: 'Gemini (Star)',
  system: 'stargazing',
  maxLevel: 34,
  fn: (l) => 1 + l * 0.02,
  inputs: [],
}

/** Gemini → Star Spawn Rate +2% per level. Max 34. → star_spawn_rate */
const starGemini: Source = {
  key: 'stargazing.starGemini',
  name: 'Gemini (Star)',
  system: 'stargazing',
  maxLevel: 34,
  fn: (l) => l * 0.02,
  inputs: [],
}

// ── Cancer (max 48: base 20 + Star Caps 2 + Aries/Gem/Can Cap 6 + Archaeology Castor 10 + Fishing Megalodon T1 10) ──

/** Cancer → Double Contract Point Chance +1% per level. Max 48. → contract_double_points_chance */
const starCancerDoubleContract: Source = {
  key: 'stargazing.starCancer',
  name: 'Cancer (Star)',
  system: 'stargazing',
  maxLevel: 48,
  fn: (l) => l * 0.01,
  inputs: [],
}

/** Cancer → Contract Upgrade Cost -1% per level. Max 48. → contract_upgrade_cost_reduction */
const starCancerContractCost: Source = {
  key: 'stargazing.starCancer',
  name: 'Cancer (Star)',
  system: 'stargazing',
  maxLevel: 48,
  fn: (l) => l * 0.01,
  inputs: [],
}

// ── Leo (max 5: base 3 + Star Caps 2) ─────────────────────────────────────────
// NOTE: Leo → 'Workshop Cap +1' — no stat key.

/** Leo → Triple Super Star Chance +4% per level. Max 5. → super_star_triple_chance */
const starLeo: Source = {
  key: 'stargazing.starLeo',
  name: 'Leo (Star)',
  system: 'stargazing',
  maxLevel: 5,
  fn: (l) => l * 0.04,
  inputs: [],
}

// ── Virgo (max 30: base 25 + Star Caps 2 + Virgo/Aqua/Ophi Cap 3) ────────────

/** Virgo → Bomb Recharge Rate +1% per level. Max 30. → bomb_recharge_speed */
const starVirgoRecharge: Source = {
  key: 'stargazing.starVirgo',
  name: 'Virgo (Star)',
  system: 'stargazing',
  maxLevel: 30,
  fn: (l) => l * 0.01,
  inputs: [],
}

/** Virgo → Super Star Spawn Rate +1% per level. Max 30. → super_star_spawn_multi */
const starVirgo: Source = {
  key: 'stargazing.starVirgo',
  name: 'Virgo (Star)',
  system: 'stargazing',
  maxLevel: 30,
  fn: (l) => l * 0.01,
  inputs: [],
}

// ── Libra (max 22: base 20 + Star Caps 2) ─────────────────────────────────────

/** Libra → Prestige Points Gain +5% per level. Max 22. → prestige_point_multi */
const starLibraPrestige: Source = {
  key: 'stargazing.starLibra',
  name: 'Libra (Star)',
  system: 'stargazing',
  maxLevel: 22,
  fn: (l) => l * 0.05,
  inputs: [],
}

/** Libra → Triple Lootbug Chance +1% per level. Max 22. → lootbug_triple_chance */
const starLibraTripleLootbug: Source = {
  key: 'stargazing.starLibra',
  name: 'Libra (Star)',
  system: 'stargazing',
  maxLevel: 22,
  fn: (l) => l * 0.01,
  inputs: [],
}

// ── Scorpio (max 117: base 50 + Construct Comfort 20 + Idle Obelisk Mincer 5 + Star Caps 2 + Black Hole Lv15 40) ──

/** Scorpio → Pickaxe Damage +15% per level. Max 117. → pickaxe_damage */
const starScorpioPickaxeDmg: Source = {
  key: 'stargazing.starScorpio',
  name: 'Scorpio (Star)',
  system: 'stargazing',
  maxLevel: 117,
  fn: (l) => l * 0.15,
  inputs: [],
}

/** Scorpio → All Star Multi +0.5% per level. Max 117. → all_star_multi */
const starScorpio: Source = {
  key: 'stargazing.starScorpio',
  name: 'Scorpio (Star)',
  system: 'stargazing',
  maxLevel: 117,
  fn: (l) => l * 0.005,
  inputs: [],
}

// ── Sagittarius (max 17: base 15 + Star Caps 2) ───────────────────────────────

/** Sagittarius → Lootbug Spawn Rate +2% per level. Max 17. → lootbug_spawn_rate */
const starSagittariusLootbugSpawn: Source = {
  key: 'stargazing.starSagittarius',
  name: 'Sagittarius (Star)',
  system: 'stargazing',
  maxLevel: 17,
  fn: (l) => l * 0.02,
  inputs: [],
}

/** Sagittarius → Triple Star Chance +1% per level. Max 17. → star_triple_spawn_chance */
const starSagittarius: Source = {
  key: 'stargazing.starSagittarius',
  name: 'Sagittarius (Star)',
  system: 'stargazing',
  maxLevel: 17,
  fn: (l) => l * 0.01,
  inputs: [],
}

// ── Capricorn (max 63: base 20 + Construct Comfort 20 + Why Are There Stars 9 + Star Caps 2 + Starfish Quest Skin 12) ──

/** Capricorn → Experience Gain +15% per level. Max 63. → experience_multi */
const starCapricornExp: Source = {
  key: 'stargazing.starCapricorn',
  name: 'Capricorn (Star)',
  system: 'stargazing',
  maxLevel: 63,
  fn: (l) => l * 0.15,
  inputs: [],
}

/** Capricorn → Item Duration +1% per level. Max 63. → item_duration_multi */
const starCapricornItemDuration: Source = {
  key: 'stargazing.starCapricorn',
  name: 'Capricorn (Star)',
  system: 'stargazing',
  maxLevel: 63,
  fn: (l) => l * 0.01,
  inputs: [],
}

// ── Aquarius (max 25: base 10 + Star Caps 2 + Virgo/Aqua/Ophi Cap 3 + Archaeology Castor 10) ──

/** Aquarius → Bar Craft Costs -1% per level. Max 25. → bar_craft_cost_multi */
const starAquariusBarCraft: Source = {
  key: 'stargazing.starAquarius',
  name: 'Aquarius (Star)',
  system: 'stargazing',
  maxLevel: 25,
  fn: (l) => l * 0.01,
  inputs: [],
}

/** Aquarius → Golden Lootbug Chance +1% per level. Max 25. → lootbug_golden_chance */
const starAquariusGoldenLootbug: Source = {
  key: 'stargazing.starAquarius',
  name: 'Aquarius (Star)',
  system: 'stargazing',
  maxLevel: 25,
  fn: (l) => l * 0.01,
  inputs: [],
}

// ── Pisces (max 4: base 2 + Star Caps 2) ──────────────────────────────────────
// NOTE: Pisces → 'Pet Level Cap +1' — no stat key.

/** Pisces → Rainbow Floor Multi +10 per level. Max 4. → rainbow_floor_multi */
const starPiscesRainbowFloor: Source = {
  key: 'stargazing.starPisces',
  name: 'Pisces (Star)',
  system: 'stargazing',
  maxLevel: 4,
  fn: (l) => l * 10,
  inputs: [],
}

// ── Ophiuchus (max 19: base 2 + Star Caps 2 + Virgo/Aqua/Ophi Cap 3 + Starfish Quest Skin 12) ──

/** Ophiuchus → Banked Freebie Cap +1 per level. Max 19. → freebie_bank_cap */
const starOphiuchusFreebie: Source = {
  key: 'stargazing.starOphiuchus',
  name: 'Ophiuchus (Star)',
  system: 'stargazing',
  maxLevel: 19,
  fn: (l) => l * 1,
  inputs: [],
}

/** Ophiuchus → Banked Lootbug Cap +1 per level. Max 19. → lootbug_bank_cap */
const starOphiuchusLootbug: Source = {
  key: 'stargazing.starOphiuchus',
  name: 'Ophiuchus (Star)',
  system: 'stargazing',
  maxLevel: 19,
  fn: (l) => l * 1,
  inputs: [],
}

// ── Orion (max 43: base 20 + Star Caps 2 + Black Hole Lv7 5 + Archaeology Atlas 10 + Ctrl+C Ctrl+V Stars 6) ──

/** Orion → 100× Craft Chance +0.1% per level. Max 43. → craft_100x_chance */
const starOrionCraft100x: Source = {
  key: 'stargazing.starOrion',
  name: 'Orion (Star)',
  system: 'stargazing',
  maxLevel: 43,
  fn: (l) => l * 0.001,
  inputs: [],
}

/** Orion → Golden Ore Chance +0.25% per level. Max 43. → golden_ore_chance */
const starOrionGoldenOre: Source = {
  key: 'stargazing.starOrion',
  name: 'Orion (Star)',
  system: 'stargazing',
  maxLevel: 43,
  fn: (l) => l * 0.0025,
  inputs: [],
}

// ── Hercules (max 55: base 20 + Star Caps 2 + Archaeology Atlas 10 + Construct Timekeeping 20 + Fishing Dune's Eelworm T1 3) ──

/** Hercules → Star Supernova Chance +0.15% per level. Max 55. → star_supernova_chance */
const starHercules: Source = {
  key: 'stargazing.starHercules',
  name: 'Hercules (Star)',
  system: 'stargazing',
  maxLevel: 55,
  fn: (l) => l * 0.0015,
  inputs: [],
}

/** Hercules → Golden Ore Multi +8% per level. Max 55. → golden_ore_multi */
const starHerculesGoldenOreMul: Source = {
  key: 'stargazing.starHercules',
  name: 'Hercules (Star)',
  system: 'stargazing',
  maxLevel: 55,
  fn: (l) => l * 0.08,
  inputs: [],
}

// ── Draco (max 40: base 20 + Star Caps 2 + Black Hole Lv7 5 + Archaeology Hyperion 10 + Fishing Dune's Eelworm T1 3) ──

/** Draco → Galactic Rainbow Chance +0.25% per level. Max 40. → galactic_floor_chance */
const starDracoGalacticChance: Source = {
  key: 'stargazing.starDraco',
  name: 'Draco (Star)',
  system: 'stargazing',
  maxLevel: 40,
  fn: (l) => l * 0.0025,
  inputs: [],
}

/** Draco → Galactic Rainbow Multi +10% per level. Max 40. → galactic_floor_multi */
const starDracoGalacticMul: Source = {
  key: 'stargazing.starDraco',
  name: 'Draco (Star)',
  system: 'stargazing',
  maxLevel: 40,
  fn: (l) => l * 0.10,
  inputs: [],
}

// ── Cetus (max 32: base 20 + Star Caps 2 + Fishing Storm Serpent T1 10) ───────
// NOTE: Cetus → 'Polychrome Ore Card Multi +0.15×' — no stat key.

/** Cetus → Fish Income Multi +2% per level. Max 32. → fishing_income_multi */
const starCetusFishIncome: Source = {
  key: 'stargazing.starCetus',
  name: 'Cetus (Star)',
  system: 'stargazing',
  maxLevel: 32,
  fn: (l) => l * 0.02,
  inputs: [],
}

// ── Phoenix (max 20: base 18 + Star Caps 2) ───────────────────────────────────
// NOTE: Phoenix → 'Chain, Midas, Veinseeker, Starburst grade caps +1' — no stat key.

// ── Eridanus (max 22: base 20 + Star Caps 2) ─────────────────────────────────

/** Eridanus → All Floor Multi +2% per level. Max 22. → all_floor_multipliers */
const starEridanusAllFloor: Source = {
  key: 'stargazing.starEridanus',
  name: 'Eridanus (Star)',
  system: 'stargazing',
  maxLevel: 22,
  fn: (l) => l * 0.02,
  inputs: [],
}

/** Eridanus → Stonks Multi +2% per level. Max 22. → stonks_multi */
const starEridanusStonksMul: Source = {
  key: 'stargazing.starEridanus',
  name: 'Eridanus (Star)',
  system: 'stargazing',
  maxLevel: 22,
  fn: (l) => l * 0.02,
  inputs: [],
}

/** Eridanus → Super Stonks Chance +0.10% per level. Max 22. → super_stonks_chance */
const starEridanusSuperStonks: Source = {
  key: 'stargazing.starEridanus',
  name: 'Eridanus (Star)',
  system: 'stargazing',
  maxLevel: 22,
  fn: (l) => l * 0.001,
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
  ssRainbowVeinChance,
  ssDoubleContractPoints,
  ssExpGain,
  ssItemDuration,
  ssGameSpeed,
  supergigantsMulti,
  ssGoldenOreMul,
  ssBankedFreebieLootbugFreebie,
  ssBankedFreebieLootbugLootbug,
  ssLootbugLootMul,
  novagiant,
  ssFishIncomeMul,
  ssGalacticFloorChance,
  ssGoldenOreChance,
  radiantChance,
  // Stars
  starAriesVeinSpawn,
  starAriesGoldenVein,
  starTaurusPickaxeDmg,
  starTaurus,
  starGeminiGoldenFloor,
  starGemini,
  starCancerDoubleContract,
  starCancerContractCost,
  starLeo,
  starVirgoRecharge,
  starVirgo,
  starLibraPrestige,
  starLibraTripleLootbug,
  starScorpioPickaxeDmg,
  starScorpio,
  starSagittariusLootbugSpawn,
  starSagittarius,
  starCapricornExp,
  starCapricornItemDuration,
  starAquariusBarCraft,
  starAquariusGoldenLootbug,
  starPiscesRainbowFloor,
  starOphiuchusFreebie,
  starOphiuchusLootbug,
  starOrionCraft100x,
  starOrionGoldenOre,
  starHercules,
  starHerculesGoldenOreMul,
  starDracoGalacticChance,
  starDracoGalacticMul,
  starCetusFishIncome,
  starEridanusAllFloor,
  starEridanusStonksMul,
  starEridanusSuperStonks,
} satisfies Record<string, Source>

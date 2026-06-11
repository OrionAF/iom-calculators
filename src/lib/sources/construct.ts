import type { Source } from '$lib/engine/types'

// Construct statues: normal (level 1), gilded (2), platinized (3). maxLevel: 3.
// W4 statues: binary (maxLevel: 1), bonus scales with rt['w4StatueCount'].

// ─── World 1 Statues ──────────────────────────────────────────────────────────

/** Statue of Rhythm: Pickaxe Damage ×3 / ×5 / ×8 */
export const staRhythmPickaxe: Source = {
  key: 'construct.staRhythmPickaxe',
  name: 'Statue of Rhythm (Pickaxe Damage)',
  system: 'construct',
  maxLevel: 3,
  fn: (n) => ([1, 3, 5, 8] as const)[Math.min(n, 3)],
  inputs: [],
}
/** Statue of Rhythm (platinized): Floor Clear Requirement −25%. Negative fn per reduction convention. */
export const staRhythmFloorClear: Source = {
  key: 'construct.staRhythmFloorClear',
  name: 'Statue of Rhythm (Floor Clear)',
  system: 'construct',
  maxLevel: 3,
  fn: (n) => ([0, 0, 0, -0.25] as const)[Math.min(n, 3)],
  inputs: [],
}

/** Statue of Awareness: Bomb Damage ×3 / ×5 / ×8 */
export const staAwarenessBombDmg: Source = {
  key: 'construct.staAwarenessBombDmg',
  name: 'Statue of Awareness (Bomb Damage)',
  system: 'construct',
  maxLevel: 3,
  fn: (n) => ([1, 3, 5, 8] as const)[Math.min(n, 3)],
  inputs: [],
}

/** Statue of Awareness (platinized): Bomb Ultra Crit Chance +20% */
export const staAwarenessUltraCrit: Source = {
  key: 'construct.staAwarenessUltraCrit',
  name: 'Statue of Awareness (Ultra Crit)',
  system: 'construct',
  maxLevel: 3,
  fn: (n) => ([0, 0, 0, 0.2] as const)[Math.min(n, 3)],
  inputs: [],
}

/** Statue of Slaying: Prestige Points ×2 / ×3 / ×5 */
export const staSlayingPrestigePts: Source = {
  key: 'construct.staSlayingPrestigePts',
  name: 'Statue of Slaying (Prestige Points)',
  system: 'construct',
  maxLevel: 3,
  fn: (n) => ([1, 2, 3, 5] as const)[Math.min(n, 3)],
  inputs: [],
}

/** Statue of Slaying: Artifact Upgrade Cap +1 / +2 / +3 */
export const staSlayingArtifactCap: Source = {
  key: 'construct.staSlayingArtifactCap',
  name: 'Statue of Slaying (Artifact Cap)',
  system: 'construct',
  maxLevel: 3,
  fn: (n) => ([0, 1, 2, 3] as const)[Math.min(n, 3)],
  inputs: [],
}

/** Statue of Appetite: Bomb Cap Multiplier ×1.30 / ×1.50 / ×1.75 */
export const staAppetiteBombCap: Source = {
  key: 'construct.staAppetiteBombCap',
  name: 'Statue of Appetite (Bomb Cap)',
  system: 'construct',
  maxLevel: 3,
  fn: (n) => ([1, 1.3, 1.5, 1.75] as const)[Math.min(n, 3)],
  inputs: [],
}
/** Statue of Appetite (platinized): Fuel Duration +15%. → coal_fuel_duration_multi */
export const staAppetiteFuelDuration: Source = {
  key: 'construct.staAppetiteFuelDuration',
  name: 'Statue of Appetite (Fuel Duration)',
  system: 'construct',
  maxLevel: 3,
  fn: (n) => ([0, 0, 0, 0.15] as const)[Math.min(n, 3)],
  inputs: [],
}

/** Statue of Friendship: Gems From Freebie Chest +1 / +2 / +4 */
export const staFriendshipFreebieGems: Source = {
  key: 'construct.staFriendshipFreebieGems',
  name: 'Statue of Friendship (Freebie Gems)',
  system: 'construct',
  maxLevel: 3,
  fn: (n) => ([0, 1, 2, 4] as const)[Math.min(n, 3)],
  inputs: [],
}
/** Statue of Friendship (platinized): Freebie Skill Shard Chance +1%. → freebie_chance_for_skill_shard */
export const staFriendshipSkillShard: Source = {
  key: 'construct.staFriendshipSkillShard',
  name: 'Statue of Friendship (Skill Shard Chance)',
  system: 'construct',
  maxLevel: 3,
  fn: (n) => ([0, 0, 0, 0.01] as const)[Math.min(n, 3)],
  inputs: [],
}

/** Statue of Hygiene: Gem Upgrade Cap +1 / +2 / +4 */
export const staHygieneGemUpgradeCap: Source = {
  key: 'construct.staHygieneGemUpgradeCap',
  name: 'Statue of Hygiene (Gem Upgrade Cap)',
  system: 'construct',
  maxLevel: 3,
  fn: (n) => ([0, 1, 2, 4] as const)[Math.min(n, 3)],
  inputs: [],
}

/** Statue of Artistry: 5× Freebie Pack Loot Chance +3% / +5% / +8% */
export const staArtistryFreebie5x: Source = {
  key: 'construct.staArtistryFreebie5x',
  name: 'Statue of Artistry (Freebie 5×)',
  system: 'construct',
  maxLevel: 3,
  fn: (n) => ([0, 0.03, 0.05, 0.08] as const)[Math.min(n, 3)],
  inputs: [],
}
/** Statue of Artistry (platinized): Freebie Instant Refresh +1%. → freebie_refresh_chance */
export const staArtistryFreebieRefresh: Source = {
  key: 'construct.staArtistryFreebieRefresh',
  name: 'Statue of Artistry (Freebie Refresh)',
  system: 'construct',
  maxLevel: 3,
  fn: (n) => ([0, 0, 0, 0.01] as const)[Math.min(n, 3)],
  inputs: [],
}

/** Statue of Randomness: Vein Spawn Rate +30% / +50% / +75% */
export const staRandomnessVeinSpawn: Source = {
  key: 'construct.staRandomnessVeinSpawn',
  name: 'Statue of Randomness (Vein Spawn)',
  system: 'construct',
  maxLevel: 3,
  fn: (n) => ([0, 0.3, 0.5, 0.75] as const)[Math.min(n, 3)],
  inputs: [],
}

/** Statue of Randomness: Golden Vein Chance +3% / +5% / +10% */
export const staRandomnessGoldenVeinChance: Source = {
  key: 'construct.staRandomnessGoldenVein',
  name: 'Statue of Randomness (Golden Vein Chance)',
  system: 'construct',
  maxLevel: 3,
  fn: (n) => ([0, 0.03, 0.05, 0.1] as const)[Math.min(n, 3)],
  inputs: [],
}
/** Statue of Randomness (platinized): Rainbow Vein Chance +5%. → rainbow_vein_chance */
export const staRandomnessRainbowVein: Source = {
  key: 'construct.staRandomnessRainbowVein',
  name: 'Statue of Randomness (Rainbow Vein)',
  system: 'construct',
  maxLevel: 3,
  fn: (n) => ([0, 0, 0, 0.05] as const)[Math.min(n, 3)],
  inputs: [],
}

/** Statue of Childhood (platinized): Rainbow Floor Chance +1% */
export const staChildhoodRainbowFloor: Source = {
  key: 'construct.staChildhoodRainbowFloor',
  name: 'Statue of Childhood (Rainbow Floor)',
  system: 'construct',
  maxLevel: 3,
  fn: (n) => ([0, 0, 0, 0.01] as const)[Math.min(n, 3)],
  inputs: [],
}
/** Statue of Childhood: Contract Upgrade Cap +1 / +2 / +4. → contract_cap_increase */
export const staChildhoodContractCap: Source = {
  key: 'construct.staChildhoodContractCap',
  name: 'Statue of Childhood (Contract Cap)',
  system: 'construct',
  maxLevel: 3,
  fn: (n) => ([0, 1, 2, 4] as const)[Math.min(n, 3)],
  inputs: [],
}
// TODO no registry key: W1 Statue of Hygiene — Workshop Upgrade Cap +2/+3/+4
// TODO no registry key: W1 Statue of Slaying (platinized) — Pet Level Cap +1

// ─── World 3 Statues ──────────────────────────────────────────────────────────

/** Statue of Craftmanship: Pickaxe Damage ×4 / ×25 / ×125 */
export const staCraftPickaxeDmg: Source = {
  key: 'construct.staCraftPickaxeDmg',
  name: 'Statue of Craftmanship (Pickaxe Damage)',
  system: 'construct',
  maxLevel: 3,
  fn: (n) => ([1, 4, 25, 125] as const)[Math.min(n, 3)],
  inputs: [],
}

/** Statue of Craftmanship: Gem Upgrade Cap +1 / +2 / +3 */
export const staCraftGemUpgradeCap: Source = {
  key: 'construct.staCraftGemUpgradeCap',
  name: 'Statue of Craftmanship (Gem Upgrade Cap)',
  system: 'construct',
  maxLevel: 3,
  fn: (n) => ([0, 1, 2, 3] as const)[Math.min(n, 3)],
  inputs: [],
}
/**
 * Statue of Craftmanship: Fish Income Multi ×1.25 (gilded) / ×1.40 (platinized).
 * Multiplicative values stored as factors. → fishing_income_multi
 */
export const staCraftFishIncomeMul: Source = {
  key: 'construct.staCraftFishIncomeMul',
  name: 'Statue of Craftmanship (Fish Income Multi)',
  system: 'construct',
  maxLevel: 3,
  fn: (n) => ([1, 1, 1.25, 1.4] as const)[Math.min(n, 3)],
  inputs: [],
}

/** Statue of Propulsion: Bomb Damage ×4 / ×25 / ×125 */
export const staPropBombDmg: Source = {
  key: 'construct.staPropBombDmg',
  name: 'Statue of Propulsion (Bomb Damage)',
  system: 'construct',
  maxLevel: 3,
  fn: (n) => ([1, 4, 25, 125] as const)[Math.min(n, 3)],
  inputs: [],
}

/** Statue of Propulsion: Golden Vein Multi ×1.25 (gilded) / ×1.50 (platinized) */
export const staPropGoldenVeinMul: Source = {
  key: 'construct.staPropGoldenVeinMul',
  name: 'Statue of Propulsion (Golden Vein Multi)',
  system: 'construct',
  maxLevel: 3,
  fn: (n) => ([1, 1, 1.25, 1.5] as const)[Math.min(n, 3)],
  inputs: [],
}
// TODO no registry key: Propulsion — Workshop Cap +1/+2/+3

/** Statue of Safety: Golden Ore Chance +3% / +5% / +8% */
export const staSafetyGoldenOreChance: Source = {
  key: 'construct.staSafetyGoldenOreChance',
  name: 'Statue of Safety (Golden Ore Chance)',
  system: 'construct',
  maxLevel: 3,
  fn: (n) => ([0, 0.03, 0.05, 0.08] as const)[Math.min(n, 3)],
  inputs: [],
}

/** Statue of Safety: Golden Ore Multi +25% / +35% / +55% (additive) */
export const staSafetyGoldenOreMul: Source = {
  key: 'construct.staSafetyGoldenOreMul',
  name: 'Statue of Safety (Golden Ore Multi)',
  system: 'construct',
  maxLevel: 3,
  fn: (n) => ([0, 0.25, 0.35, 0.55] as const)[Math.min(n, 3)],
  inputs: [],
}

/** Statue of Safety: Rainbow Floor Chance +1% / +2% / +4% */
export const staSafetyRainbowFloorChance: Source = {
  key: 'construct.staSafetyRainbowFloor',
  name: 'Statue of Safety (Rainbow Floor Chance)',
  system: 'construct',
  maxLevel: 3,
  fn: (n) => ([0, 0.01, 0.02, 0.04] as const)[Math.min(n, 3)],
  inputs: [],
}

/** Statue of Ignition: 100× Craft Chance +0.5% / +1% / +2.5% */
export const staIgnitionCraft100x: Source = {
  key: 'construct.staIgnitionCraft100x',
  name: 'Statue of Ignition (100× Craft)',
  system: 'construct',
  maxLevel: 3,
  fn: (n) => ([0, 0.005, 0.01, 0.025] as const)[Math.min(n, 3)],
  inputs: [],
}
/** Statue of Ignition: Galactic Floor Chance +2% / +4% / +6%. → galactic_floor_chance */
export const staIgnitionGalacticFloor: Source = {
  key: 'construct.staIgnitionGalacticFloor',
  name: 'Statue of Ignition (Galactic Floor)',
  system: 'construct',
  maxLevel: 3,
  fn: (n) => ([0, 0.02, 0.04, 0.06] as const)[Math.min(n, 3)],
  inputs: [],
}

// ─── Statue of Warmth (Satio) ────────────────────────────────
/** Statue of Warmth: Supergiant Multipliers +35% / +55% / +85%. → star_supergiant_multi */
export const staWarmthStarSupergiants: Source = {
  key: 'construct.staWarmthStarSupergiants',
  name: 'Statue of Warmth (Star Supergiant Multi)',
  system: 'construct',
  maxLevel: 3,
  fn: (n) => ([0, 0.35, 0.55, 0.85] as const)[Math.min(n, 3)],
  inputs: [],
}
/** Statue of Warmth: Supergiant Multipliers +35% / +55% / +85%. → super_star_supergiant_multi */
export const staWarmthSuperStarSupergiants: Source = {
  key: 'construct.staWarmthSuperStarSupergiants',
  name: 'Statue of Warmth (Super Star Supergiant Multi)',
  system: 'construct',
  maxLevel: 3,
  fn: (n) => ([0, 0.35, 0.55, 0.85] as const)[Math.min(n, 3)],
  inputs: [],
}
/** Statue of Warmth: Supernova Multipliers +2 / +3 / +5 (absolute addition). → star_supernova_multi */
export const staWarmthStarSupernova: Source = {
  key: 'construct.staWarmthStarSupernova',
  name: 'Statue of Warmth (Star Supernova Multi)',
  system: 'construct',
  maxLevel: 3,
  fn: (n) => ([0, 2, 3, 5] as const)[Math.min(n, 3)],
  inputs: [],
}
/** Statue of Warmth: Supernova Multipliers +2 / +3 / +5. → super_star_supernova_multi */
export const staWarmthSuperStarSupernova: Source = {
  key: 'construct.staWarmthSuperStarSupernova',
  name: 'Statue of Warmth (Super Star Supernova Multi)',
  system: 'construct',
  maxLevel: 3,
  fn: (n) => ([0, 2, 3, 5] as const)[Math.min(n, 3)],
  inputs: [],
}
/** Statue of Warmth (platinized): Midas Drone Grade Cap +25. → drone_midas_grade_cap_increase */
export const staWarmthMidasCap: Source = {
  key: 'construct.staWarmthMidasCap',
  name: 'Statue of Warmth (Midas Drone Cap)',
  system: 'construct',
  maxLevel: 3,
  fn: (n) => ([0, 0, 0, 25] as const)[Math.min(n, 3)],
  inputs: [],
}

// ─── Statue of Affluence (Kohanu) ─────────────────────────────
/** Statue of Affluence: Triple Contract Chance +10% / +15% / +25%. → contract_triple_points_chance */
export const staAffluenceTripleContract: Source = {
  key: 'construct.staAffluenceTripleContract',
  name: 'Statue of Affluence (Triple Contract)',
  system: 'construct',
  maxLevel: 3,
  fn: (n) => ([0, 0.1, 0.15, 0.25] as const)[Math.min(n, 3)],
  inputs: [],
}
/** Statue of Affluence: 10× Contract Chance +1% / +2% / +4%. → contract_10x_points_chance */
export const staAffluence10xContract: Source = {
  key: 'construct.staAffluence10xContract',
  name: 'Statue of Affluence (10x Contract)',
  system: 'construct',
  maxLevel: 3,
  fn: (n) => ([0, 0.01, 0.02, 0.04] as const)[Math.min(n, 3)],
  inputs: [],
}
/** Statue of Affluence: Contract Upgrade Cap +1 / +2 / +3. → contract_cap_increase */
export const staAffluenceContractCap: Source = {
  key: 'construct.staAffluenceContractCap',
  name: 'Statue of Affluence (Contract Cap)',
  system: 'construct',
  maxLevel: 3,
  fn: (n) => ([0, 1, 2, 3] as const)[Math.min(n, 3)],
  inputs: [],
}

/** Statue of Feline: Pet Level Up Chance +10% / +15% / +25% */
export const staFelinePetLevelup: Source = {
  key: 'construct.staFelinePetLevelup',
  name: 'Statue of Feline (Pet Level Up)',
  system: 'construct',
  maxLevel: 3,
  fn: (n) => ([0, 0.1, 0.15, 0.25] as const)[Math.min(n, 3)],
  inputs: [],
}

/** Statue of Feline: Pet Level Cap +1 / +2 / +3 */
export const staFelinePetLevelCap: Source = {
  key: 'construct.staFelinePetLevelCap',
  name: 'Statue of Feline (Pet Level Cap)',
  system: 'construct',
  maxLevel: 3,
  fn: (n) => ([0, 1, 2, 3] as const)[Math.min(n, 3)],
  inputs: [],
}
// TODO no registry key: Feline (platinized) — Nagini Level Cap +5

/** Statue of Eastwood: Banked Lootbug Cap +2 / +4 / +8 */
export const staEastwoodLootbugCap: Source = {
  key: 'construct.staEastwoodLootbugCap',
  name: 'Statue of Eastwood (Lootbug Cap)',
  system: 'construct',
  maxLevel: 3,
  fn: (n) => ([0, 2, 4, 8] as const)[Math.min(n, 3)],
  inputs: [],
}

/** Statue of Eastwood: Banked Freebie Cap +2 / +4 / +8 */
export const staEastwoodFreebieBank: Source = {
  key: 'construct.staEastwoodFreebieBank',
  name: 'Statue of Eastwood (Freebie Bank)',
  system: 'construct',
  maxLevel: 3,
  fn: (n) => ([0, 2, 4, 8] as const)[Math.min(n, 3)],
  inputs: [],
}
/** Statue of Eastwood: Freebie Timer −30s / −45s / −60s. Positive fn per reduction convention. → freebie_cooldown_seconds */
export const staEastwoodFreebieTimer: Source = {
  key: 'construct.staEastwoodFreebieTimer',
  name: 'Statue of Eastwood (Freebie Timer)',
  system: 'construct',
  maxLevel: 3,
  fn: (n) => ([0, 30, 45, 60] as const)[Math.min(n, 3)],
  inputs: [],
}

/** Statue of Eastwood: EXP Gain ×10 (gilded) / ×100 (platinized) */
export const staEastwoodExpGain: Source = {
  key: 'construct.staEastwoodExpGain',
  name: 'Statue of Eastwood (EXP Gain)',
  system: 'construct',
  maxLevel: 3,
  fn: (n) => ([1, 1, 10, 100] as const)[Math.min(n, 3)],
  inputs: [],
}

/** Statue of Soprano: All Floor Multipliers +15% / +25% / +40% */
export const staSopranoAllFloors: Source = {
  key: 'construct.staSopranoAllFloors',
  name: 'Statue of Soprano (All Floor Multi)',
  system: 'construct',
  maxLevel: 3,
  fn: (n) => ([0, 0.15, 0.25, 0.4] as const)[Math.min(n, 3)],
  inputs: [],
}
/** Statue of Soprano: Freebie Gift Chance +0.5% / +0.75% / +1%. → freebie_gift_chance */
export const staSopranoFreebieGiftChance: Source = {
  key: 'construct.staSopranoFreebieGiftChance',
  name: 'Statue of Soprano (Freebie Gift Chance)',
  system: 'construct',
  maxLevel: 3,
  fn: (n) => ([0, 0.005, 0.0075, 0.01] as const)[Math.min(n, 3)],
  inputs: [],
}
/**
 * Statue of Soprano: 100× Freebie Gifts Chance (1/50k → 1/35k → 1/25k).
 * Stored as probability: 1/50000=0.00002, 1/35000≈0.0000286, 1/25000=0.00004.
 * → freebie_100x_gift_chance
 */
export const staSoprano100xGiftChance: Source = {
  key: 'construct.staSoprano100xGiftChance',
  name: 'Statue of Soprano (100x Gift Chance)',
  system: 'construct',
  maxLevel: 3,
  fn: (n) => ([0, 1 / 50000, 1 / 35000, 1 / 25000] as const)[Math.min(n, 3)],
  inputs: [],
}

// ─── World 4 Statues (scale per W4 statues owned) ────────────────────────────
// Binary owned (maxLevel: 1). Contribution = owned × w4StatueCount × rate.

/** Statue of Comfort: All Damage +50% per W4 Statue (affects pickaxe + bomb damage) */
export const staComfortDmg: Source = {
  key: 'construct.staComfortDmg',
  name: 'Statue of Comfort (All Damage)',
  system: 'construct',
  maxLevel: 1,
  fn: (owned, rt) => (owned === 0 ? 0 : (rt['w4StatueCount'] ?? 0) * 0.5),
  inputs: [{ key: 'w4StatueCount', label: 'W4 Statues Owned', type: 'integer', min: 0 }],
}

/** Statue of Rodentia: Pickaxe Damage +60% per W4 Statue */
export const staRodentiaPickaxe: Source = {
  key: 'construct.staRodentiaPickaxe',
  name: 'Statue of Rodentia (Pickaxe Damage)',
  system: 'construct',
  maxLevel: 1,
  fn: (owned, rt) => (owned === 0 ? 0 : (rt['w4StatueCount'] ?? 0) * 0.6),
  inputs: [{ key: 'w4StatueCount', label: 'W4 Statues Owned', type: 'integer', min: 0 }],
}
/** Statue of Rodentia: Chain Drone Grade Cap +10 per W4 Statue. → drone_chain_grade_cap_increase */
export const staRodentiaChainCap: Source = {
  key: 'construct.staRodentiaChainCap',
  name: 'Statue of Rodentia (Chain Drone Cap)',
  system: 'construct',
  maxLevel: 1,
  fn: (owned, rt) => (owned === 0 ? 0 : (rt['w4StatueCount'] ?? 0) * 10),
  inputs: [{ key: 'w4StatueCount', label: 'W4 Statues Owned', type: 'integer', min: 0 }],
}
/** Statue of Rodentia: Super Star Radiant Chance +1% per W4 Statue. → super_star_radiant_chance */
export const staRodentiaRadiantChance: Source = {
  key: 'construct.staRodentiaRadiantChance',
  name: 'Statue of Rodentia (Super Star Radiant Chance)',
  system: 'construct',
  maxLevel: 1,
  fn: (owned, rt) => (owned === 0 ? 0 : (rt['w4StatueCount'] ?? 0) * 0.01),
  inputs: [{ key: 'w4StatueCount', label: 'W4 Statues Owned', type: 'integer', min: 0 }],
}

/** Statue of Comfort: Scorpio Star Cap +20 (flat). → star_scorpio_cap */
export const staComfortScorpioCap: Source = {
  key: 'construct.staComfortScorpioCap',
  name: 'Statue of Comfort (Scorpio Cap)',
  system: 'construct',
  maxLevel: 1,
  fn: (o) => o * 20,
  inputs: [],
}
/** Statue of Comfort: Capricorn Star Cap +20 (flat). → star_capricorn_cap */
export const staComfortCapricornCap: Source = {
  key: 'construct.staComfortCapricornCap',
  name: 'Statue of Comfort (Capricorn Cap)',
  system: 'construct',
  maxLevel: 1,
  fn: (o) => o * 20,
  inputs: [],
}
// TODO no registry key: Comfort — All Floor Multi +1% Per Skin Owned

// ─── Statue of Timekeeping (Karma) ────────────────────────────
/** Statue of Timekeeping: Star Radiant Chance +0.25% per W4 Statue. → star_radiant_chance */
export const staTimekeepingRadiantChance: Source = {
  key: 'construct.staTimekeepingRadiantChance',
  name: 'Statue of Timekeeping (Star Radiant Chance)',
  system: 'construct',
  maxLevel: 1,
  fn: (owned, rt) => (owned === 0 ? 0 : (rt['w4StatueCount'] ?? 0) * 0.0025),
  inputs: [{ key: 'w4StatueCount', label: 'W4 Statues Owned', type: 'integer', min: 0 }],
}
/** Statue of Timekeeping: All Radiant Multis +20% (flat). → star_radiant_multi */
export const staTimekeepingStarRadiantMul: Source = {
  key: 'construct.staTimekeepingStarRadiantMul',
  name: 'Statue of Timekeeping (Star Radiant Multi)',
  system: 'construct',
  maxLevel: 1,
  fn: (o) => o * 0.2,
  inputs: [],
}
/** Statue of Timekeeping: All Radiant Multis +20% (flat). → super_star_radiant_multi */
export const staTimekeepingSuperStarRadiantMul: Source = {
  key: 'construct.staTimekeepingSuperStarRadiantMul',
  name: 'Statue of Timekeeping (Super Star Radiant Multi)',
  system: 'construct',
  maxLevel: 1,
  fn: (o) => o * 0.2,
  inputs: [],
}
// TODO no registry key: Timekeeping — Hercules Star Cap +20

// ─── Statue of Combat (Sans) ────────────────────────────────
/** Statue of Combat: Stonks Chance +0.01% per W4 Statue. → stonks_chance */
export const staCombatStonksChance: Source = {
  key: 'construct.staCombatStonksChance',
  name: 'Statue of Combat (Stonks Chance)',
  system: 'construct',
  maxLevel: 1,
  fn: (owned, rt) => (owned === 0 ? 0 : (rt['w4StatueCount'] ?? 0) * 0.0001),
  inputs: [{ key: 'w4StatueCount', label: 'W4 Statues Owned', type: 'integer', min: 0 }],
}
/** Statue of Combat: All Stonks Multis +10% (flat). → stonks_multi */
export const staCombatStonksMul: Source = {
  key: 'construct.staCombatStonksMul',
  name: 'Statue of Combat (Stonks Multi)',
  system: 'construct',
  maxLevel: 1,
  fn: (o) => o * 0.1,
  inputs: [],
}
/** Statue of Combat: All Stonks Multis +10% (flat). → ultra_stonks_multi */
export const staCombatUltraStonksMul: Source = {
  key: 'construct.staCombatUltraStonksMul',
  name: 'Statue of Combat (Ultra Stonks Multi)',
  system: 'construct',
  maxLevel: 1,
  fn: (o) => o * 0.1,
  inputs: [],
}
/** Statue of Combat: Ultra Stonks Chance +2% (flat). → ultra_stonks_chance */
export const staCombatUltraStonksChance: Source = {
  key: 'construct.staCombatUltraStonksChance',
  name: 'Statue of Combat (Ultra Stonks Chance)',
  system: 'construct',
  maxLevel: 1,
  fn: (o) => o * 0.02,
  inputs: [],
}

// ─── Statue of Nature (Fanq) ────────────────────────────────
/** Statue of Nature: Gem Bomb Gem Chance +0.04% per W4 Statue. → gem_bomb_gem_chance */
export const staNatureGemBombGem: Source = {
  key: 'construct.staNatureGemBombGem',
  name: 'Statue of Nature (Gem Bomb Gem Chance)',
  system: 'construct',
  maxLevel: 1,
  fn: (owned, rt) => (owned === 0 ? 0 : (rt['w4StatueCount'] ?? 0) * 0.0004),
  inputs: [{ key: 'w4StatueCount', label: 'W4 Statues Owned', type: 'integer', min: 0 }],
}
/** Statue of Nature: Rainbow Vein Chance +10% (flat). → rainbow_vein_chance */
export const staNatureRainbowVein: Source = {
  key: 'construct.staNatureRainbowVein',
  name: 'Statue of Nature (Rainbow Vein Chance)',
  system: 'construct',
  maxLevel: 1,
  fn: (o) => o * 0.1,
  inputs: [],
}
// TODO no registry key: Nature — Workshop Cap +4

// ─── Statue of Semblance (Vak) ─────────────────────────────
/** Statue of Semblance: Rainbow Portal Chance +0.5% per W4 Statue. → rainbow_void_portal_chance */
export const staSemblanceRainbowPortal: Source = {
  key: 'construct.staSemblanceRainbowPortal',
  name: 'Statue of Semblance (Rainbow Portal)',
  system: 'construct',
  maxLevel: 1,
  fn: (owned, rt) => (owned === 0 ? 0 : (rt['w4StatueCount'] ?? 0) * 0.005),
  inputs: [{ key: 'w4StatueCount', label: 'W4 Statues Owned', type: 'integer', min: 0 }],
}
/** Statue of Semblance: Void Drone Grade Cap +20 (flat). → drone_void_grade_cap_increase */
export const staSemblanceVoidCap: Source = {
  key: 'construct.staSemblanceVoidCap',
  name: 'Statue of Semblance (Void Drone Cap)',
  system: 'construct',
  maxLevel: 1,
  fn: (o) => o * 20,
  inputs: [],
}
/** Statue of Semblance: Prism Drone Grade Cap +5 (flat). → drone_prism_grade_cap_increase */
export const staSemblancePrismCap: Source = {
  key: 'construct.staSemblancePrismCap',
  name: 'Statue of Semblance (Prism Drone Cap)',
  system: 'construct',
  maxLevel: 1,
  fn: (o) => o * 5,
  inputs: [],
}

// ─── Statue of Crochet (Kripp) ─────────────────────────────
/** Statue of Crochet: Golden Ore Chance +3% per W4 Statue. → golden_ore_chance */
export const staCrochetGoldenOre: Source = {
  key: 'construct.staCrochetGoldenOre',
  name: 'Statue of Crochet (Golden Ore Chance)',
  system: 'construct',
  maxLevel: 1,
  fn: (owned, rt) => (owned === 0 ? 0 : (rt['w4StatueCount'] ?? 0) * 0.03),
  inputs: [{ key: 'w4StatueCount', label: 'W4 Statues Owned', type: 'integer', min: 0 }],
}
/** Statue of Crochet: Galactic Floor Chance +5% (flat). → galactic_floor_chance */
export const staCrochetGalacticFloor: Source = {
  key: 'construct.staCrochetGalacticFloor',
  name: 'Statue of Crochet (Galactic Floor Chance)',
  system: 'construct',
  maxLevel: 1,
  fn: (o) => o * 0.05,
  inputs: [],
}
/** Statue of Crochet: Prismatic Floor Chance +3% (flat). → prismatic_floor_chance */
export const staCrochetPrismaticFloor: Source = {
  key: 'construct.staCrochetPrismaticFloor',
  name: 'Statue of Crochet (Prismatic Floor Chance)',
  system: 'construct',
  maxLevel: 1,
  fn: (o) => o * 0.03,
  inputs: [],
}

// ─── Statue of Antagonism (Loop) ───────────────────────────
/** Statue of Antagonism: Frogger Drone Grade Cap +1 per W4 Statue. → drone_frogger_grade_cap_increase */
export const staAntagonismFroggerCap: Source = {
  key: 'construct.staAntagonismFroggerCap',
  name: 'Statue of Antagonism (Frogger Cap)',
  system: 'construct',
  maxLevel: 1,
  fn: (owned, rt) => (owned === 0 ? 0 : (rt['w4StatueCount'] ?? 0) * 1),
  inputs: [{ key: 'w4StatueCount', label: 'W4 Statues Owned', type: 'integer', min: 0 }],
}
/** Statue of Antagonism: Golden (Loot)frog Chance +0.25% per W4 Statue. → lootfrog_golden_chance */
export const staAntagonismGoldenFrogChance: Source = {
  key: 'construct.staAntagonismGoldenFrogChance',
  name: 'Statue of Antagonism (Golden Frog Chance)',
  system: 'construct',
  maxLevel: 1,
  fn: (owned, rt) => (owned === 0 ? 0 : (rt['w4StatueCount'] ?? 0) * 0.0025),
  inputs: [{ key: 'w4StatueCount', label: 'W4 Statues Owned', type: 'integer', min: 0 }],
}
/** Statue of Antagonism: Golden (Loot)frog Multi +5% per W4 Statue. → lootfrog_golden_multi */
export const staAntagonismGoldenFrogMul: Source = {
  key: 'construct.staAntagonismGoldenFrogMul',
  name: 'Statue of Antagonism (Golden Frog Multi)',
  system: 'construct',
  maxLevel: 1,
  fn: (owned, rt) => (owned === 0 ? 0 : (rt['w4StatueCount'] ?? 0) * 0.05),
  inputs: [{ key: 'w4StatueCount', label: 'W4 Statues Owned', type: 'integer', min: 0 }],
}

// ─── Statue of Fallacy (Berty) ──────────────────────────────
/** Statue of Fallacy: Prismatic Floor Multi +10% per W4 Statue. → prismatic_floor_multi */
export const staFallacyPrismaticMul: Source = {
  key: 'construct.staFallacyPrismaticMul',
  name: 'Statue of Fallacy (Prismatic Floor Multi)',
  system: 'construct',
  maxLevel: 1,
  fn: (owned, rt) => (owned === 0 ? 0 : (rt['w4StatueCount'] ?? 0) * 0.1),
  inputs: [{ key: 'w4StatueCount', label: 'W4 Statues Owned', type: 'integer', min: 0 }],
}
/** Statue of Fallacy: Freebie Gems +3 per W4 Statue. → freebie_gems_bonus */
export const staFallacyFreebieGems: Source = {
  key: 'construct.staFallacyFreebieGems',
  name: 'Statue of Fallacy (Freebie Gems)',
  system: 'construct',
  maxLevel: 1,
  fn: (owned, rt) => (owned === 0 ? 0 : (rt['w4StatueCount'] ?? 0) * 3),
  inputs: [{ key: 'w4StatueCount', label: 'W4 Statues Owned', type: 'integer', min: 0 }],
}
/** Statue of Fallacy: Veinseeker Drone Grade Cap +5 per W4 Statue. → drone_veinseeker_grade_cap_increase */
export const staFallacyVeinseekerCap: Source = {
  key: 'construct.staFallacyVeinseekerCap',
  name: 'Statue of Fallacy (Veinseeker Cap)',
  system: 'construct',
  maxLevel: 1,
  fn: (owned, rt) => (owned === 0 ? 0 : (rt['w4StatueCount'] ?? 0) * 5),
  inputs: [{ key: 'w4StatueCount', label: 'W4 Statues Owned', type: 'integer', min: 0 }],
}

export const constructSources = {
  // W1
  staRhythmPickaxe,
  staRhythmFloorClear,
  staAwarenessBombDmg,
  staAwarenessUltraCrit,
  staSlayingPrestigePts,
  staSlayingArtifactCap,
  staAppetiteBombCap,
  staAppetiteFuelDuration,
  staFriendshipFreebieGems,
  staFriendshipSkillShard,
  staHygieneGemUpgradeCap,
  staArtistryFreebie5x,
  staArtistryFreebieRefresh,
  staRandomnessVeinSpawn,
  staRandomnessGoldenVeinChance,
  staRandomnessRainbowVein,
  staChildhoodRainbowFloor,
  staChildhoodContractCap,
  // W3
  staCraftPickaxeDmg,
  staCraftGemUpgradeCap,
  staCraftFishIncomeMul,
  staPropBombDmg,
  staPropGoldenVeinMul,
  staSafetyGoldenOreChance,
  staSafetyGoldenOreMul,
  staSafetyRainbowFloorChance,
  staIgnitionCraft100x,
  staIgnitionGalacticFloor,
  staWarmthStarSupergiants,
  staWarmthSuperStarSupergiants,
  staWarmthStarSupernova,
  staWarmthSuperStarSupernova,
  staWarmthMidasCap,
  staFelinePetLevelup,
  staFelinePetLevelCap,
  staAffluenceTripleContract,
  staAffluence10xContract,
  staAffluenceContractCap,
  staEastwoodLootbugCap,
  staEastwoodFreebieBank,
  staEastwoodFreebieTimer,
  staEastwoodExpGain,
  staSopranoAllFloors,
  staSopranoFreebieGiftChance,
  staSoprano100xGiftChance,
  // W4
  staComfortDmg,
  staComfortScorpioCap,
  staComfortCapricornCap,
  staTimekeepingRadiantChance,
  staTimekeepingStarRadiantMul,
  staTimekeepingSuperStarRadiantMul,
  staCombatStonksChance,
  staCombatStonksMul,
  staCombatUltraStonksMul,
  staCombatUltraStonksChance,
  staNatureGemBombGem,
  staNatureRainbowVein,
  staSemblanceRainbowPortal,
  staSemblanceVoidCap,
  staSemblancePrismCap,
  staCrochetGoldenOre,
  staCrochetGalacticFloor,
  staCrochetPrismaticFloor,
  staAntagonismFroggerCap,
  staAntagonismGoldenFrogChance,
  staAntagonismGoldenFrogMul,
  staFallacyPrismaticMul,
  staFallacyFreebieGems,
  staFallacyVeinseekerCap,
  staRodentiaPickaxe,
  staRodentiaChainCap,
  staRodentiaRadiantChance,
}

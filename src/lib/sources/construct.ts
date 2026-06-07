import type { Source } from '$lib/engine/types'

// Construct statues: normal (level 1), gilded (2), platinized (3). maxLevel: 3.
// W4 statues: binary (maxLevel: 1), bonus scales with rt['w4StatueCount'].

// ─── World 1 Statues ──────────────────────────────────────────────────────────

/** Statue of Rhythm: Pickaxe Damage ×3 / ×5 / ×8 */
export const staRhythmPickaxe: Source = {
  key: 'construct.staRhythmPickaxe', name: 'Statue of Rhythm (Pickaxe Damage)', system: 'construct',
  maxLevel: 3, fn: (n) => ([1, 3, 5, 8] as const)[Math.min(n, 3)], inputs: [],
}

/** Statue of Awareness: Bomb Damage ×3 / ×5 / ×8 */
export const staAwarenessBombDmg: Source = {
  key: 'construct.staAwarenessBombDmg', name: 'Statue of Awareness (Bomb Damage)', system: 'construct',
  maxLevel: 3, fn: (n) => ([1, 3, 5, 8] as const)[Math.min(n, 3)], inputs: [],
}

/** Statue of Awareness (platinized): Bomb Ultra Crit Chance +20% */
export const staAwarenessUltraCrit: Source = {
  key: 'construct.staAwarenessUltraCrit', name: 'Statue of Awareness (Ultra Crit)', system: 'construct',
  maxLevel: 3, fn: (n) => ([0, 0, 0, 0.20] as const)[Math.min(n, 3)], inputs: [],
}

/** Statue of Slaying: Prestige Points ×2 / ×3 / ×5 */
export const staSlayingPrestigePts: Source = {
  key: 'construct.staSlayingPrestigePts', name: 'Statue of Slaying (Prestige Points)', system: 'construct',
  maxLevel: 3, fn: (n) => ([1, 2, 3, 5] as const)[Math.min(n, 3)], inputs: [],
}

/** Statue of Slaying: Artifact Upgrade Cap +1 / +2 / +3 */
export const staSlayingArtifactCap: Source = {
  key: 'construct.staSlayingArtifactCap', name: 'Statue of Slaying (Artifact Cap)', system: 'construct',
  maxLevel: 3, fn: (n) => ([0, 1, 2, 3] as const)[Math.min(n, 3)], inputs: [],
}

/** Statue of Appetite: Bomb Cap Multiplier ×1.30 / ×1.50 / ×1.75 */
export const staAppetiteBombCap: Source = {
  key: 'construct.staAppetiteBombCap', name: 'Statue of Appetite (Bomb Cap)', system: 'construct',
  maxLevel: 3, fn: (n) => ([1, 1.30, 1.50, 1.75] as const)[Math.min(n, 3)], inputs: [],
}

/** Statue of Friendship: Gems From Freebie Chest +1 / +2 / +4 */
export const staFriendshipFreebieGems: Source = {
  key: 'construct.staFriendshipFreebieGems', name: 'Statue of Friendship (Freebie Gems)', system: 'construct',
  maxLevel: 3, fn: (n) => ([0, 1, 2, 4] as const)[Math.min(n, 3)], inputs: [],
}

/** Statue of Hygiene: Gem Upgrade Cap +1 / +2 / +4 */
export const staHygieneGemUpgradeCap: Source = {
  key: 'construct.staHygieneGemUpgradeCap', name: 'Statue of Hygiene (Gem Upgrade Cap)', system: 'construct',
  maxLevel: 3, fn: (n) => ([0, 1, 2, 4] as const)[Math.min(n, 3)], inputs: [],
}

/** Statue of Artistry: 5× Freebie Pack Loot Chance +3% / +5% / +8% */
export const staArtistryFreebie5x: Source = {
  key: 'construct.staArtistryFreebie5x', name: 'Statue of Artistry (Freebie 5×)', system: 'construct',
  maxLevel: 3, fn: (n) => ([0, 0.03, 0.05, 0.08] as const)[Math.min(n, 3)], inputs: [],
}

/** Statue of Randomness: Vein Spawn Rate +30% / +50% / +75% */
export const staRandomnessVeinSpawn: Source = {
  key: 'construct.staRandomnessVeinSpawn', name: 'Statue of Randomness (Vein Spawn)', system: 'construct',
  maxLevel: 3, fn: (n) => ([0, 0.30, 0.50, 0.75] as const)[Math.min(n, 3)], inputs: [],
}

/** Statue of Randomness: Golden Vein Chance +3% / +5% / +10% */
export const staRandomnessGoldenVeinChance: Source = {
  key: 'construct.staRandomnessGoldenVein', name: 'Statue of Randomness (Golden Vein Chance)', system: 'construct',
  maxLevel: 3, fn: (n) => ([0, 0.03, 0.05, 0.10] as const)[Math.min(n, 3)], inputs: [],
}

/** Statue of Childhood (platinized): Rainbow Floor Chance +1% */
export const staChildhoodRainbowFloor: Source = {
  key: 'construct.staChildhoodRainbowFloor', name: 'Statue of Childhood (Rainbow Floor)', system: 'construct',
  maxLevel: 3, fn: (n) => ([0, 0, 0, 0.01] as const)[Math.min(n, 3)], inputs: [],
}

// ─── World 3 Statues ──────────────────────────────────────────────────────────

/** Statue of Craftmanship: Pickaxe Damage ×4 / ×25 / ×125 */
export const staCraftPickaxeDmg: Source = {
  key: 'construct.staCraftPickaxeDmg', name: 'Statue of Craftmanship (Pickaxe Damage)', system: 'construct',
  maxLevel: 3, fn: (n) => ([1, 4, 25, 125] as const)[Math.min(n, 3)], inputs: [],
}

/** Statue of Craftmanship: Gem Upgrade Cap +1 / +2 / +3 */
export const staCraftGemUpgradeCap: Source = {
  key: 'construct.staCraftGemUpgradeCap', name: 'Statue of Craftmanship (Gem Upgrade Cap)', system: 'construct',
  maxLevel: 3, fn: (n) => ([0, 1, 2, 3] as const)[Math.min(n, 3)], inputs: [],
}

/** Statue of Propulsion: Bomb Damage ×4 / ×25 / ×125 */
export const staPropBombDmg: Source = {
  key: 'construct.staPropBombDmg', name: 'Statue of Propulsion (Bomb Damage)', system: 'construct',
  maxLevel: 3, fn: (n) => ([1, 4, 25, 125] as const)[Math.min(n, 3)], inputs: [],
}

/** Statue of Propulsion: Golden Vein Multi ×1.25 (gilded) / ×1.50 (platinized) */
export const staPropGoldenVeinMul: Source = {
  key: 'construct.staPropGoldenVeinMul', name: 'Statue of Propulsion (Golden Vein Multi)', system: 'construct',
  maxLevel: 3, fn: (n) => ([1, 1, 1.25, 1.50] as const)[Math.min(n, 3)], inputs: [],
}

/** Statue of Safety: Golden Ore Chance +3% / +5% / +8% */
export const staSafetyGoldenOreChance: Source = {
  key: 'construct.staSafetyGoldenOreChance', name: 'Statue of Safety (Golden Ore Chance)', system: 'construct',
  maxLevel: 3, fn: (n) => ([0, 0.03, 0.05, 0.08] as const)[Math.min(n, 3)], inputs: [],
}

/** Statue of Safety: Golden Ore Multi +25% / +35% / +55% (additive) */
export const staSafetyGoldenOreMul: Source = {
  key: 'construct.staSafetyGoldenOreMul', name: 'Statue of Safety (Golden Ore Multi)', system: 'construct',
  maxLevel: 3, fn: (n) => ([0, 0.25, 0.35, 0.55] as const)[Math.min(n, 3)], inputs: [],
}

/** Statue of Safety: Rainbow Floor Chance +1% / +2% / +4% */
export const staSafetyRainbowFloorChance: Source = {
  key: 'construct.staSafetyRainbowFloor', name: 'Statue of Safety (Rainbow Floor Chance)', system: 'construct',
  maxLevel: 3, fn: (n) => ([0, 0.01, 0.02, 0.04] as const)[Math.min(n, 3)], inputs: [],
}

/** Statue of Ignition: 100× Craft Chance +0.5% / +1% / +2.5% */
export const staIgnitionCraft100x: Source = {
  key: 'construct.staIgnitionCraft100x', name: 'Statue of Ignition (100× Craft)', system: 'construct',
  maxLevel: 3, fn: (n) => ([0, 0.005, 0.01, 0.025] as const)[Math.min(n, 3)], inputs: [],
}

/** Statue of Feline: Pet Level Up Chance +10% / +15% / +25% */
export const staFelinePetLevelup: Source = {
  key: 'construct.staFelinePetLevelup', name: 'Statue of Feline (Pet Level Up)', system: 'construct',
  maxLevel: 3, fn: (n) => ([0, 0.10, 0.15, 0.25] as const)[Math.min(n, 3)], inputs: [],
}

/** Statue of Feline: Pet Level Cap +1 / +2 / +3 */
export const staFelinePetLevelCap: Source = {
  key: 'construct.staFelinePetLevelCap', name: 'Statue of Feline (Pet Level Cap)', system: 'construct',
  maxLevel: 3, fn: (n) => ([0, 1, 2, 3] as const)[Math.min(n, 3)], inputs: [],
}

/** Statue of Eastwood: Banked Lootbug Cap +2 / +4 / +8 */
export const staEastwoodLootbugCap: Source = {
  key: 'construct.staEastwoodLootbugCap', name: 'Statue of Eastwood (Lootbug Cap)', system: 'construct',
  maxLevel: 3, fn: (n) => ([0, 2, 4, 8] as const)[Math.min(n, 3)], inputs: [],
}

/** Statue of Eastwood: Banked Freebie Cap +2 / +4 / +8 */
export const staEastwoodFreebieBank: Source = {
  key: 'construct.staEastwoodFreebieBank', name: 'Statue of Eastwood (Freebie Bank)', system: 'construct',
  maxLevel: 3, fn: (n) => ([0, 2, 4, 8] as const)[Math.min(n, 3)], inputs: [],
}

/** Statue of Eastwood: EXP Gain ×10 (gilded) / ×100 (platinized) */
export const staEastwoodExpGain: Source = {
  key: 'construct.staEastwoodExpGain', name: 'Statue of Eastwood (EXP Gain)', system: 'construct',
  maxLevel: 3, fn: (n) => ([1, 1, 10, 100] as const)[Math.min(n, 3)], inputs: [],
}

/** Statue of Soprano: All Floor Multipliers +15% / +25% / +40% */
export const staSopranoAllFloors: Source = {
  key: 'construct.staSopranoAllFloors', name: 'Statue of Soprano (All Floor Multi)', system: 'construct',
  maxLevel: 3, fn: (n) => ([0, 0.15, 0.25, 0.40] as const)[Math.min(n, 3)], inputs: [],
}

// ─── World 4 Statues (scale per W4 statues owned) ────────────────────────────
// Binary owned (maxLevel: 1). Contribution = owned × w4StatueCount × rate.

/** Statue of Comfort: All Damage +50% per W4 Statue (affects pickaxe + bomb damage) */
export const staComfortDmg: Source = {
  key: 'construct.staComfortDmg', name: 'Statue of Comfort (All Damage)', system: 'construct',
  maxLevel: 1,
  fn: (owned, rt) => owned === 0 ? 0 : (rt['w4StatueCount'] ?? 0) * 0.50,
  inputs: [{ key: 'w4StatueCount', label: 'W4 Statues Owned', type: 'integer', min: 0 }],
}

/** Statue of Rodentia: Pickaxe Damage +60% per W4 Statue */
export const staRodentiaPickaxe: Source = {
  key: 'construct.staRodentiaPickaxe', name: 'Statue of Rodentia (Pickaxe Damage)', system: 'construct',
  maxLevel: 1,
  fn: (owned, rt) => owned === 0 ? 0 : (rt['w4StatueCount'] ?? 0) * 0.60,
  inputs: [{ key: 'w4StatueCount', label: 'W4 Statues Owned', type: 'integer', min: 0 }],
}

export const constructSources = {
  staRhythmPickaxe,
  staAwarenessBombDmg, staAwarenessUltraCrit,
  staSlayingPrestigePts, staSlayingArtifactCap,
  staAppetiteBombCap,
  staFriendshipFreebieGems,
  staHygieneGemUpgradeCap,
  staArtistryFreebie5x,
  staRandomnessVeinSpawn, staRandomnessGoldenVeinChance,
  staChildhoodRainbowFloor,
  staCraftPickaxeDmg, staCraftGemUpgradeCap,
  staPropBombDmg, staPropGoldenVeinMul,
  staSafetyGoldenOreChance, staSafetyGoldenOreMul, staSafetyRainbowFloorChance,
  staIgnitionCraft100x,
  staFelinePetLevelup, staFelinePetLevelCap,
  staEastwoodLootbugCap, staEastwoodFreebieBank, staEastwoodExpGain,
  staSopranoAllFloors,
  staComfortDmg, staRodentiaPickaxe,
}

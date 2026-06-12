import type { Source } from '$lib/engine/types'

// ─── Shared runtime input definitions ────────────────────────────────────────

const STATUE_COUNT_INPUT = {
  key: 'statueCount',
  label: 'Statues Owned',
  type: 'integer' as const,
  min: 0,
}

const CARDS_OWNED_INPUT = {
  key: 'cardsOwned',
  label: 'Cards Owned (total count)',
  type: 'integer' as const,
  min: 0,
}

const POLY_CARD_INPUT = {
  key: 'polyCardCount',
  label: 'Polychrome Cards Owned',
  type: 'integer' as const,
  min: 0,
}

// ─── World 1 ──────────────────────────────────────────────────────────────────

/**
 * Upgrade Pickaxe — base pickaxe damage (additive flat value).
 * Formula from wiki: Base Damage = (Level + 1) × (Level + 2) / 2
 * Returns 0 at level 0 (not purchased). Max 155 (includes +6 from cap upgrades).
 */
export const upgrUpgradePickaxe: Source = {
  key: 'upgrades.upgradePickaxe',
  name: 'Upgrade Pickaxe',
  system: 'upgrades',
  maxLevel: 155,
  fn: (l) => (l === 0 ? 0 : ((l + 1) * (l + 2)) / 2),
  inputs: [],
}

/** Pickaxe Radius +8% per level. Max 16. */
export const upgrPickaxeRadius: Source = {
  key: 'upgrades.pickaxeRadius',
  name: 'Pickaxe Radius',
  system: 'upgrades',
  maxLevel: 16,
  fn: (l) => l * 0.08,
  inputs: [],
}

/** Pickaxe Crit Chance +2% per level (unlocks at Lv 8). Max 16. */
export const upgrCritChance1: Source = {
  key: 'upgrades.critChance1',
  name: 'Pickaxe Crit Chance (W1-1)',
  system: 'upgrades',
  maxLevel: 16,
  fn: (l) => l * 0.02,
  inputs: [],
}

/** Double Craft Chance +2% per level. Max 16. */
export const upgrDoubleCraftChance: Source = {
  key: 'upgrades.doubleCraftChance',
  name: 'Double Craft Chance',
  system: 'upgrades',
  maxLevel: 16,
  fn: (l) => l * 0.02,
  inputs: [],
}

/** Triple Rock Chance +1% per level. Max 16. */
export const upgrTripleRockChance: Source = {
  key: 'upgrades.tripleRockChance',
  name: 'Triple Rock Chance',
  system: 'upgrades',
  maxLevel: 16,
  fn: (l) => l * 0.01,
  inputs: [],
}

/** Bomb Damage +20% per level (unlocks at Lv 20). Max 16. */
export const upgrBombDmg1: Source = {
  key: 'upgrades.bombDmg1',
  name: 'Bomb Damage (W1-1)',
  system: 'upgrades',
  maxLevel: 16,
  fn: (l) => l * 0.2,
  inputs: [],
}

/** Ore Sell Price +10% per level. Max 16. */
export const upgrOreSellPrice: Source = {
  key: 'upgrades.oreSellPrice',
  name: 'Ore Sell Price',
  system: 'upgrades',
  maxLevel: 16,
  fn: (l) => l * 0.1,
  inputs: [],
}

/** Pickaxe Crit Damage +5% per level (unlocks at Lv 28). Max 11. */
export const upgrCritDmg1: Source = {
  key: 'upgrades.critDmg1',
  name: 'Pickaxe Crit Damage (W1-1)',
  system: 'upgrades',
  maxLevel: 11,
  fn: (l) => l * 0.05,
  inputs: [],
}

/** Pickaxe Damage +10% per level (unlocks at Lv 32). Max 16. */
export const upgrPickaxeDmg1: Source = {
  key: 'upgrades.pickaxeDmg1',
  name: 'Pickaxe Damage (W1-1)',
  system: 'upgrades',
  maxLevel: 16,
  fn: (l) => l * 0.1,
  inputs: [],
}

/** Free Bomb Chance +1% per level. Max 16. */
export const upgrFreeBombChance: Source = {
  key: 'upgrades.freeBombChance',
  name: 'Free Bomb Chance',
  system: 'upgrades',
  maxLevel: 16,
  fn: (l) => l * 0.01,
  inputs: [],
}

// NOTE: 'Upgrade Gold Prices' -5% (Lv 40) reduces upgrade purchase costs —
// not a tracked gameplay stat. No source defined.

/** Crit Chance +2% per level (unlocks at Lv 44). Max 16. */
export const upgrCritChance2: Source = {
  key: 'upgrades.critChance2',
  name: 'Pickaxe Crit Chance (W1-2)',
  system: 'upgrades',
  maxLevel: 16,
  fn: (l) => l * 0.02,
  inputs: [],
}

/** Pickaxe Damage +15% per level (unlocks at Lv 48). Max 16. */
export const upgrPickaxeDmg2: Source = {
  key: 'upgrades.pickaxeDmg2',
  name: 'Pickaxe Damage (W1-2)',
  system: 'upgrades',
  maxLevel: 16,
  fn: (l) => l * 0.15,
  inputs: [],
}

/** Pickaxe Attack Speed +2% per level (unlocks at Lv 52). Max 16. */
export const upgrAttackSpeed1: Source = {
  key: 'upgrades.attackSpeed1',
  name: 'Pickaxe Attack Speed (W1-1)',
  system: 'upgrades',
  maxLevel: 16,
  fn: (l) => l * 0.02,
  inputs: [],
}

/** Pickaxe Crit Damage +6% per level (unlocks at Lv 56). Max 11. */
export const upgrCritDmg2: Source = {
  key: 'upgrades.critDmg2',
  name: 'Pickaxe Crit Damage (W1-2)',
  system: 'upgrades',
  maxLevel: 11,
  fn: (l) => l * 0.06,
  inputs: [],
}

/** Bomb Recharge Rate +1% per level (unlocks at Lv 60). Max 16. */
export const upgrBombRechargeRate: Source = {
  key: 'upgrades.bombRechargeRate',
  name: 'Bomb Recharge Rate',
  system: 'upgrades',
  maxLevel: 16,
  fn: (l) => l * 0.01,
  inputs: [],
}

/** Pickaxe Damage +20% per level (unlocks at Lv 62). Max 16. */
export const upgrPickaxeDmg3: Source = {
  key: 'upgrades.pickaxeDmg3',
  name: 'Pickaxe Damage (W1-3)',
  system: 'upgrades',
  maxLevel: 16,
  fn: (l) => l * 0.2,
  inputs: [],
}

/** Bomb Damage +40% per level (unlocks at Lv 65). Max 16. */
export const upgrBombDmg2: Source = {
  key: 'upgrades.bombDmg2',
  name: 'Bomb Damage (W1-2)',
  system: 'upgrades',
  maxLevel: 16,
  fn: (l) => l * 0.4,
  inputs: [],
}

/** Bomb Crit Damage +8% per level (unlocks at Lv 68). Max 16. */
export const upgrBombCritDmg1: Source = {
  key: 'upgrades.bombCritDmg1',
  name: 'Bomb Crit Damage (W1-1)',
  system: 'upgrades',
  maxLevel: 16,
  fn: (l) => l * 0.08,
  inputs: [],
}

/** Pickaxe Super Crit Chance +1% per level (unlocks at Lv 70). Max 16. */
export const upgrSuperCritChance1: Source = {
  key: 'upgrades.superCritChance1',
  name: 'Pickaxe Super Crit Chance (W1)',
  system: 'upgrades',
  maxLevel: 16,
  fn: (l) => l * 0.01,
  inputs: [],
}

/** Pickaxe Attack Speed +2% per level (unlocks at Lv 72). Max 16. */
export const upgrAttackSpeed2: Source = {
  key: 'upgrades.attackSpeed2',
  name: 'Pickaxe Attack Speed (W1-2)',
  system: 'upgrades',
  maxLevel: 16,
  fn: (l) => l * 0.02,
  inputs: [],
}

// NOTE: 'Increase Upgrade Caps' (Lv 75, max 3) — meta-upgrade, increases caps
// of other upgrades by +1 per purchase. No direct stat key. Not included as source.

/** Pickaxe Damage +28% per level (unlocks at Lv 78). Max 16. */
export const upgrPickaxeDmg4: Source = {
  key: 'upgrades.pickaxeDmg4',
  name: 'Pickaxe Damage (W1-4)',
  system: 'upgrades',
  maxLevel: 16,
  fn: (l) => l * 0.28,
  inputs: [],
}

/** Bomb Crit Damage +12% per level (unlocks at Lv 80). Max 16. */
export const upgrBombCritDmg2: Source = {
  key: 'upgrades.bombCritDmg2',
  name: 'Bomb Crit Damage (W1-2)',
  system: 'upgrades',
  maxLevel: 16,
  fn: (l) => l * 0.12,
  inputs: [],
}

/** Pickaxe Super Crit Damage +10% per level (unlocks at Lv 82). Max 11. */
export const upgrSuperCritDmg: Source = {
  key: 'upgrades.superCritDmg',
  name: 'Pickaxe Super Crit Damage',
  system: 'upgrades',
  maxLevel: 11,
  fn: (l) => l * 0.1,
  inputs: [],
}

/** Pickaxe Crit Chance +2% per level (unlocks at Lv 85). Max 16. */
export const upgrCritChance3: Source = {
  key: 'upgrades.critChance3',
  name: 'Pickaxe Crit Chance (W1-3)',
  system: 'upgrades',
  maxLevel: 16,
  fn: (l) => l * 0.02,
  inputs: [],
}

/** Pickaxe Damage +35% per level (unlocks at Lv 88). Max 21. */
export const upgrPickaxeDmg5: Source = {
  key: 'upgrades.pickaxeDmg5',
  name: 'Pickaxe Damage (W1-5)',
  system: 'upgrades',
  maxLevel: 21,
  fn: (l) => l * 0.35,
  inputs: [],
}

/** Obelisk Armor -2% per level (unlocks at Lv 90). Max 16. */
export const upgrObeliskArmor: Source = {
  key: 'upgrades.obeliskArmor',
  name: 'Obelisk Armor Reduction',
  system: 'upgrades',
  maxLevel: 16,
  fn: (l) => l * -0.02,
  inputs: [],
}

/** Pickaxe Ultra Crit Chance +1% per level (unlocks at Lv 92). Max 16. */
export const upgrUltraCritChance1: Source = {
  key: 'upgrades.ultraCritChance1',
  name: 'Pickaxe Ultra Crit Chance (W1)',
  system: 'upgrades',
  maxLevel: 16,
  fn: (l) => l * 0.01,
  inputs: [],
}

/** Chest Meter Fill Rate +2× per level (unlocks at Lv 95). Max 16. */
export const upgrMeterFillRate: Source = {
  key: 'upgrades.meterFillRate',
  name: 'Meter Fill Rate',
  system: 'upgrades',
  maxLevel: 16,
  fn: (l) => l * 2,
  inputs: [],
}

/** Bomb Ultra Crit Chance +1% per level (unlocks at Lv 98). Max 16. */
export const upgrBombUltraCrit1: Source = {
  key: 'upgrades.bombUltraCrit1',
  name: 'Bomb Ultra Crit Chance (W1)',
  system: 'upgrades',
  maxLevel: 16,
  fn: (l) => l * 0.01,
  inputs: [],
}

/** Triple Craft Chance +1% per level (unlocks at Lv 100). Max 16. */
export const upgrTripleCraftChance: Source = {
  key: 'upgrades.tripleCraftChance',
  name: 'Triple Craft Chance',
  system: 'upgrades',
  maxLevel: 16,
  fn: (l) => l * 0.01,
  inputs: [],
}

/**
 * Pickaxe Damage Per Card Owned +1% per card per upgrade level (unlocks at Lv 102).
 * Dynamic: scales with total cards owned. Max 16.
 * Normal = 1 | Gilded = 2 | Polychrome = 3 | Infernal = 4
 */
export const upgrPickaxeDmgPerCard: Source = {
  key: 'upgrades.pickaxeDmgPerCard',
  name: 'Pickaxe Damage Per Card Owned',
  system: 'upgrades',
  maxLevel: 16,
  fn: (l, rt) => l * (rt['cardsOwned'] ?? 0) * 0.01,
  inputs: [CARDS_OWNED_INPUT],
}

// ─── World 2 ──────────────────────────────────────────────────────────────────

/** Bomb Damage +25% per level (unlocks at Lv 105). Max 50. */
export const upgrBombDmg3: Source = {
  key: 'upgrades.bombDmg3',
  name: 'Bomb Damage (W2)',
  system: 'upgrades',
  maxLevel: 50,
  fn: (l) => l * 0.25,
  inputs: [],
}

/** Pickaxe Super Crit Chance +1% per level (unlocks at Lv 110). Max 21. */
export const upgrSuperCritChance2: Source = {
  key: 'upgrades.superCritChance2',
  name: 'Pickaxe Super Crit Chance (W2)',
  system: 'upgrades',
  maxLevel: 21,
  fn: (l) => l * 0.01,
  inputs: [],
}

/** Golden Vein Chance +0.5% per level (unlocks at Lv 115). Max 16. */
export const upgrGoldenVeinChance: Source = {
  key: 'upgrades.goldenVeinChance',
  name: 'Golden Vein Chance',
  system: 'upgrades',
  maxLevel: 16,
  fn: (l) => l * 0.005,
  inputs: [],
}

/**
 * Pickaxe Damage +5% per statue per upgrade level (unlocks at Lv 120).
 * Dynamic: scales with statues owned. Max 100.
 */
export const upgrPickaxeDmgPerStatue1: Source = {
  key: 'upgrades.pickaxeDmgPerStatue1',
  name: 'Pickaxe Damage Per Statue (W2-1)',
  system: 'upgrades',
  maxLevel: 100,
  fn: (l, rt) => l * (rt['statueCount'] ?? 0) * 0.05,
  inputs: [STATUE_COUNT_INPUT],
}

/** Experience Gain +15% per level (unlocks at Lv 125). Max 100. */
export const upgrExpGain: Source = {
  key: 'upgrades.expGain',
  name: 'Experience Gain',
  system: 'upgrades',
  maxLevel: 100,
  fn: (l) => l * 0.15,
  inputs: [],
}

/** Pickaxe Ultra Crit Chance +1% per level (unlocks at Lv 130). Max 16. */
export const upgrUltraCritChance2: Source = {
  key: 'upgrades.ultraCritChance2',
  name: 'Pickaxe Ultra Crit Chance (W2)',
  system: 'upgrades',
  maxLevel: 16,
  fn: (l) => l * 0.01,
  inputs: [],
}

/** Bar Output Multiplier +1% per level (unlocks at Lv 135). Max 16. */
export const upgrBarOutputMul: Source = {
  key: 'upgrades.barOutputMul',
  name: 'Bar Output Multiplier',
  system: 'upgrades',
  maxLevel: 16,
  fn: (l) => l * 0.01,
  inputs: [],
}

/** Pickaxe Omega Crit Chance +1% per level (unlocks at Lv 140). Max 16. */
export const upgrOmegaCritChance: Source = {
  key: 'upgrades.omegaCritChance',
  name: 'Omega Crit Chance',
  system: 'upgrades',
  maxLevel: 16,
  fn: (l) => l * 0.01,
  inputs: [],
}

/** Bomb Ultra Crit Chance +1% per level (unlocks at Lv 145). Max 21. */
export const upgrBombUltraCrit2: Source = {
  key: 'upgrades.bombUltraCrit2',
  name: 'Bomb Ultra Crit Chance (W2)',
  system: 'upgrades',
  maxLevel: 21,
  fn: (l) => l * 0.01,
  inputs: [],
}

/** Lootbug Spawn Rate +1% per level (unlocks at Lv 150). Max 21. */
export const upgrLootbugSpawnRate: Source = {
  key: 'upgrades.lootbugSpawnRate',
  name: 'Lootbug Spawn Rate',
  system: 'upgrades',
  maxLevel: 21,
  fn: (l) => l * 0.01,
  inputs: [],
}

/**
 * Pickaxe Damage +8% per statue per upgrade level (unlocks at Lv 155).
 * Dynamic: scales with statues owned. Max 100.
 */
export const upgrPickaxeDmgPerStatue2: Source = {
  key: 'upgrades.pickaxeDmgPerStatue2',
  name: 'Pickaxe Damage Per Statue (W2-2)',
  system: 'upgrades',
  maxLevel: 100,
  fn: (l, rt) => l * (rt['statueCount'] ?? 0) * 0.08,
  inputs: [STATUE_COUNT_INPUT],
}

// NOTE: 'Increase Upgrade Caps' (Lv 160, max 3) — same as Lv 75. No source.

/**
 * Pickaxe Damage ×(1 + 0.02 × level) per level (unlocks at Lv 165). Max 50.
 * Multiplicative — use op '×' in formula.
 */
export const upgrPickaxeDmgMul1: Source = {
  key: 'upgrades.pickaxeDmgMul1',
  name: 'Pickaxe Damage ×0.02 (W2)',
  system: 'upgrades',
  maxLevel: 50,
  fn: (l) => 1 + l * 0.02,
  inputs: [],
}

/**
 * Bomb Damage ×(1 + 0.02 × level) per level (unlocks at Lv 170). Max 50.
 * Multiplicative — use op '×' in formula.
 */
export const upgrBombDmgMul1: Source = {
  key: 'upgrades.bombDmgMul1',
  name: 'Bomb Damage ×0.02 (W2)',
  system: 'upgrades',
  maxLevel: 50,
  fn: (l) => 1 + l * 0.02,
  inputs: [],
}

/** Triple Contract Point Chance +0.5% per level (unlocks at Lv 175). Max 20. */
export const upgrTripleContractChance: Source = {
  key: 'upgrades.tripleContractChance',
  name: 'Triple Contract Chance',
  system: 'upgrades',
  maxLevel: 20,
  fn: (l) => l * 0.005,
  inputs: [],
}

/** 10× Super Star Spawn Chance +0.1% per level (unlocks at Lv 180). Max 20. */
export const upgrSuperStar10xChance: Source = {
  key: 'upgrades.superStar10xChance',
  name: '10× Super Star Chance',
  system: 'upgrades',
  maxLevel: 20,
  fn: (l) => l * 0.001,
  inputs: [],
}

/** Fuel Save Chance +0.15% per level (unlocks at Lv 185). Max 50. */
export const upgrFuelSaveChance: Source = {
  key: 'upgrades.fuelSaveChance',
  name: 'Fuel Save Chance',
  system: 'upgrades',
  maxLevel: 50,
  fn: (l) => l * 0.0015,
  inputs: [],
}

/**
 * Pickaxe Damage +2% per poly card per upgrade level (unlocks at Lv 190).
 * Dynamic: scales with polychrome cards owned. Max 50.
 */
export const upgrPickaxeDmgPerPolyCard: Source = {
  key: 'upgrades.pickaxeDmgPerPolyCard',
  name: 'Pickaxe Damage Per Poly Card',
  system: 'upgrades',
  maxLevel: 50,
  fn: (l, rt) => l * (rt['polyCardCount'] ?? 0) * 0.02,
  inputs: [POLY_CARD_INPUT],
}

/** Rainbow Vein Chance +0.25% per level (unlocks at Lv 195). Max 30. */
export const upgrRainbowVeinChance: Source = {
  key: 'upgrades.rainbowVeinChance',
  name: 'Rainbow Vein Chance',
  system: 'upgrades',
  maxLevel: 30,
  fn: (l) => l * 0.0025,
  inputs: [],
}

/** Rainbow Floor Multiplier +0.5% per level (unlocks at Lv 200). Max 40. */
export const upgrRainbowFloorMul: Source = {
  key: 'upgrades.rainbowFloorMul',
  name: 'Rainbow Floor Multi',
  system: 'upgrades',
  maxLevel: 40,
  fn: (l) => l * 0.005,
  inputs: [],
}

// ─── World 3 ──────────────────────────────────────────────────────────────────

/**
 * Pickaxe Damage ×(1 + 0.04 × level) per level (unlocks at Lv 205). Max 50.
 * Multiplicative — use op '×' in formula.
 */
export const upgrPickaxeDmgMul2: Source = {
  key: 'upgrades.pickaxeDmgMul2',
  name: 'Pickaxe Damage ×0.04 (W3)',
  system: 'upgrades',
  maxLevel: 50,
  fn: (l) => 1 + l * 0.04,
  inputs: [],
}

/**
 * Bomb Damage ×(1 + 0.04 × level) per level (unlocks at Lv 210). Max 50.
 * Multiplicative — use op '×' in formula.
 */
export const upgrBombDmgMul2: Source = {
  key: 'upgrades.bombDmgMul2',
  name: 'Bomb Damage ×0.04 (W3)',
  system: 'upgrades',
  maxLevel: 50,
  fn: (l) => 1 + l * 0.04,
  inputs: [],
}

/** Golden Floor Multiplier +1% per level (unlocks at Lv 215). Max 30. */
export const upgrGoldenFloorMul: Source = {
  key: 'upgrades.goldenFloorMul',
  name: 'Golden Floor Multi',
  system: 'upgrades',
  maxLevel: 30,
  fn: (l) => l * 0.01,
  inputs: [],
}

/** Pet Level Up Chance +0.12% per level (unlocks at Lv 220). Max 50. */
export const upgrPetLevelChance: Source = {
  key: 'upgrades.petLevelChance',
  name: 'Pet Level Up Chance',
  system: 'upgrades',
  maxLevel: 50,
  fn: (l) => l * 0.0012,
  inputs: [],
}

/** 10× Craft Chance +0.1% per level (unlocks at Lv 225). Max 50. */
export const upgrCraft10xChance: Source = {
  key: 'upgrades.craft10xChance',
  name: '10× Craft Chance',
  system: 'upgrades',
  maxLevel: 50,
  fn: (l) => l * 0.001,
  inputs: [],
}

/** Bomb Omega Crit Chance +1% per level (unlocks at Lv 230). Max 50. */
export const upgrBombOmegaCrit: Source = {
  key: 'upgrades.bombOmegaCrit',
  name: 'Bomb Omega Crit Chance',
  system: 'upgrades',
  maxLevel: 50,
  fn: (l) => l * 0.01,
  inputs: [],
}

/** Golden Vein Multiplier +1% per level (unlocks at Lv 235). Max 50. */
export const upgrGoldenVeinMul: Source = {
  key: 'upgrades.goldenVeinMul',
  name: 'Golden Vein Multi',
  system: 'upgrades',
  maxLevel: 50,
  fn: (l) => l * 0.01,
  inputs: [],
}

/** Galactic Rainbow Floor Chance +0.1% per level (unlocks at Lv 240). Max 50. */
export const upgrGalacticFloorChance1: Source = {
  key: 'upgrades.galacticFloorChance1',
  name: 'Galactic Rainbow Chance (W3)',
  system: 'upgrades',
  maxLevel: 50,
  fn: (l) => l * 0.001,
  inputs: [],
}

/**
 * Pickaxe & Bomb Damage ×(1 + 0.06 × level) per level (unlocks at Lv 245). Max 50.
 * Single source used in both pickaxe_damage and bomb_damage formulas (op '×').
 */
export const upgrPickaxeAndBombDmgW3: Source = {
  key: 'upgrades.pickaxeAndBombDmgW3',
  name: 'Pickaxe & Bomb Damage ×0.06 (W3)',
  system: 'upgrades',
  maxLevel: 50,
  fn: (l) => 1 + l * 0.06,
  inputs: [],
}

/** Golden Ore Multiplier +2% per level (unlocks at Lv 250). Max 50. */
export const upgrGoldenOreMul: Source = {
  key: 'upgrades.goldenOreMul',
  name: 'Golden Ore Multi',
  system: 'upgrades',
  maxLevel: 50,
  fn: (l) => l * 0.02,
  inputs: [],
}

/** Star Supergiant Chance +0.1% per level (unlocks at Lv 255). Max 50. */
export const upgrStarSupergiantChance: Source = {
  key: 'upgrades.starSupergiantChance',
  name: 'Star Supergiant Chance',
  system: 'upgrades',
  maxLevel: 50,
  fn: (l) => l * 0.001,
  inputs: [],
}

/** Base Game Speed +0.1% per level (unlocks at Lv 260). Max 50. */
export const upgrGameSpeed: Source = {
  key: 'upgrades.gameSpeed',
  name: 'Base Game Speed',
  system: 'upgrades',
  maxLevel: 50,
  fn: (l) => l * 0.001,
  inputs: [],
}

/** Fishing Drone Base Power +0.10 per level (unlocks at Lv 265). Max 50. */
export const upgrFishingDronePower: Source = {
  key: 'upgrades.fishingDronePower',
  name: 'Fishing Drone Base Power',
  system: 'upgrades',
  maxLevel: 50,
  fn: (l) => l * 0.1,
  inputs: [],
}

/** Drone Fuel Duration +0.15% per level (unlocks at Lv 270). Max 50. */
export const upgrFuelDuration: Source = {
  key: 'upgrades.fuelDuration',
  name: 'Fuel Duration',
  system: 'upgrades',
  maxLevel: 50,
  fn: (l) => l * 0.0015,
  inputs: [],
}

/** Super Star Supergiant Multiplier +0.2% per level (unlocks at Lv 275). Max 50. */
export const upgrSuperStarSupergiantMul: Source = {
  key: 'upgrades.superStarSupergiantMul',
  name: 'Super Star Supergiant Multi',
  system: 'upgrades',
  maxLevel: 50,
  fn: (l) => l * 0.002,
  inputs: [],
}

/** Rainbow Vein Multiplier +2% per level (unlocks at Lv 280). Max 50. */
export const upgrRainbowVeinMul: Source = {
  key: 'upgrades.rainbowVeinMul',
  name: 'Rainbow Vein Multi',
  system: 'upgrades',
  maxLevel: 50,
  fn: (l) => l * 0.02,
  inputs: [],
}

/** Pet Skin Level Up Chance +0.1% per level (unlocks at Lv 285). Max 50. */
export const upgrPetSkinLevelUpChance: Source = {
  key: 'upgrades.petSkinLevelUpChance',
  name: 'Pet Skin Level Up Chance',
  system: 'upgrades',
  maxLevel: 50,
  fn: (l) => l * 0.001,
  inputs: [],
}

/** Polychrome Ore Card Multi +0.05x per level (unlocks at Lv 290). Max 50. */
export const upgrPolychromeOreCardMulti: Source = {
  key: 'upgrades.polychromeOreCardMulti',
  name: 'Polychrome Ore Card Multi',
  system: 'upgrades',
  maxLevel: 50,
  // Bonus-shaped: sums with base 4 + Cetus inside the poly bonus formula.
  fn: (l) => l * 0.05,
  inputs: [],
}

/** 100× Craft Chance +0.03% per level (unlocks at Lv 295). Max 50. */
export const upgrCraft100xChance: Source = {
  key: 'upgrades.craft100xChance',
  name: '100× Craft Chance',
  system: 'upgrades',
  maxLevel: 50,
  fn: (l) => l * 0.0003,
  inputs: [],
}

/** Freebie Pack Timer -1s per level (unlocks at Lv 300). Max 50. */
export const upgrFreebieCooldown: Source = {
  key: 'upgrades.freebieCooldown',
  name: 'Freebie Timer',
  system: 'upgrades',
  maxLevel: 50,
  fn: (l) => l * -1,
  inputs: [],
}

// ─── World 4 ──────────────────────────────────────────────────────────────────

/**
 * Pickaxe Damage ×(1 + 0.10 × level) per level (unlocks at Lv 305). Max 50.
 * Multiplicative — use op '×' in formula.
 */
export const upgrPickaxeDmgMul3: Source = {
  key: 'upgrades.pickaxeDmgMul3',
  name: 'Pickaxe Damage ×0.10 (W4)',
  system: 'upgrades',
  maxLevel: 50,
  fn: (l) => 1 + l * 0.1,
  inputs: [],
}

/**
 * Bomb Damage ×(1 + 0.10 × level) per level (unlocks at Lv 310). Max 50.
 * Multiplicative — use op '×' in formula.
 */
export const upgrBombDmgMul3: Source = {
  key: 'upgrades.bombDmgMul3',
  name: 'Bomb Damage ×0.10 (W4)',
  system: 'upgrades',
  maxLevel: 50,
  fn: (l) => 1 + l * 0.1,
  inputs: [],
}

/** Galactic Rainbow Floor Chance +0.15% per level (unlocks at Lv 315). Max 50. */
export const upgrGalacticFloorChance2: Source = {
  key: 'upgrades.galacticFloorChance2',
  name: 'Galactic Rainbow Chance (W4)',
  system: 'upgrades',
  maxLevel: 50,
  fn: (l) => l * 0.0015,
  inputs: [],
}

/** Vein Income Multiplier +0.45% per level (unlocks at Lv 320). Max 50. */
export const upgrVeinIncomeMul: Source = {
  key: 'upgrades.veinIncomeMul',
  name: 'Vein Income Multi',
  system: 'upgrades',
  maxLevel: 50,
  fn: (l) => l * 0.0045,
  inputs: [],
}

/** Star Supergiant Multiplier +0.3% per level (unlocks at Lv 325). Max 50. */
export const upgrStarSupergiantMul: Source = {
  key: 'upgrades.starSupergiantMul',
  name: 'Star Supergiant Multi',
  system: 'upgrades',
  maxLevel: 50,
  fn: (l) => l * 0.003,
  inputs: [],
}

/** Rainbow Void Portal Multiplier +0.5% per level (unlocks at Lv 330). Max 50. */
export const upgrRainbowVoidMul: Source = {
  key: 'upgrades.rainbowVoidMul',
  name: 'Rainbow Void Portal Multi',
  system: 'upgrades',
  maxLevel: 50,
  fn: (l) => l * 0.005,
  inputs: [],
}

/** Lootfrog Loot Multiplier +0.4% per level (unlocks at Lv 335). Max 50. */
export const upgrLootfrogLootMul: Source = {
  key: 'upgrades.lootfrogLootMul',
  name: 'Lootfrog Loot Multi',
  system: 'upgrades',
  maxLevel: 50,
  fn: (l) => l * 0.004,
  inputs: [],
}

/** Super Stonks Chance +0.02% per level (unlocks at Lv 340). Max 50. */
export const upgrSuperStonksChance: Source = {
  key: 'upgrades.superStonksChance',
  name: 'Super Stonks Chance',
  system: 'upgrades',
  maxLevel: 50,
  fn: (l) => l * 0.0002,
  inputs: [],
}

/**
 * Pickaxe & Bomb Damage ×(1 + 0.08 × level) per level (unlocks at Lv 345). Max 50.
 * Single source used in both pickaxe_damage and bomb_damage formulas (op '×').
 */
export const upgrPickaxeAndBombDmgW4: Source = {
  key: 'upgrades.pickaxeAndBombDmgW4',
  name: 'Pickaxe & Bomb Damage ×0.08 (W4)',
  system: 'upgrades',
  maxLevel: 50,
  fn: (l) => 1 + l * 0.08,
  inputs: [],
}

/** Golden Void Portal Chance +0.1% per level (unlocks at Lv 350). Max 50. */
export const upgrGoldenVoidChance: Source = {
  key: 'upgrades.goldenVoidChance',
  name: 'Golden Void Portal Chance',
  system: 'upgrades',
  maxLevel: 50,
  fn: (l) => l * 0.001,
  inputs: [],
}

/** Prismatic Floor Chance +0.1% per level (unlocks at Lv 355). Max 50. */
export const upgrPrismaticFloorChance: Source = {
  key: 'upgrades.prismaticFloorChance',
  name: 'Prismatic Floor Chance',
  system: 'upgrades',
  maxLevel: 50,
  fn: (l) => l * 0.001,
  inputs: [],
}

/** Prismatic Floor Multiplier +0.5% per level (unlocks at Lv 360). Max 50. */
export const upgrPrismaticFloorMul: Source = {
  key: 'upgrades.prismaticFloorMul',
  name: 'Prismatic Floor Multi',
  system: 'upgrades',
  maxLevel: 50,
  fn: (l) => l * 0.005,
  inputs: [],
}

// ─── Collection ───────────────────────────────────────────────────────────────

export const upgradeSources = {
  // World 1
  upgrUpgradePickaxe,
  upgrPickaxeRadius,
  upgrCritChance1,
  upgrDoubleCraftChance,
  upgrTripleRockChance,
  upgrBombDmg1,
  upgrOreSellPrice,
  upgrCritDmg1,
  upgrPickaxeDmg1,
  upgrFreeBombChance,
  upgrCritChance2,
  upgrPickaxeDmg2,
  upgrAttackSpeed1,
  upgrCritDmg2,
  upgrBombRechargeRate,
  upgrPickaxeDmg3,
  upgrBombDmg2,
  upgrBombCritDmg1,
  upgrSuperCritChance1,
  upgrAttackSpeed2,
  upgrPickaxeDmg4,
  upgrBombCritDmg2,
  upgrSuperCritDmg,
  upgrCritChance3,
  upgrPickaxeDmg5,
  upgrObeliskArmor,
  upgrUltraCritChance1,
  upgrMeterFillRate,
  upgrBombUltraCrit1,
  upgrTripleCraftChance,
  upgrPickaxeDmgPerCard,
  // World 2
  upgrBombDmg3,
  upgrSuperCritChance2,
  upgrGoldenVeinChance,
  upgrPickaxeDmgPerStatue1,
  upgrExpGain,
  upgrUltraCritChance2,
  upgrBarOutputMul,
  upgrOmegaCritChance,
  upgrBombUltraCrit2,
  upgrLootbugSpawnRate,
  upgrPickaxeDmgPerStatue2,
  upgrPickaxeDmgMul1,
  upgrBombDmgMul1,
  upgrTripleContractChance,
  upgrSuperStar10xChance,
  upgrFuelSaveChance,
  upgrPickaxeDmgPerPolyCard,
  upgrRainbowVeinChance,
  upgrRainbowFloorMul,
  // World 3
  upgrPickaxeDmgMul2,
  upgrBombDmgMul2,
  upgrGoldenFloorMul,
  upgrPetLevelChance,
  upgrCraft10xChance,
  upgrBombOmegaCrit,
  upgrGoldenVeinMul,
  upgrGalacticFloorChance1,
  upgrPickaxeAndBombDmgW3,
  upgrGoldenOreMul,
  upgrStarSupergiantChance,
  upgrGameSpeed,
  upgrFishingDronePower,
  upgrFuelDuration,
  upgrSuperStarSupergiantMul,
  upgrRainbowVeinMul,
  upgrPetSkinLevelUpChance,
  upgrPolychromeOreCardMulti,
  upgrCraft100xChance,
  upgrFreebieCooldown,
  // World 4
  upgrPickaxeDmgMul3,
  upgrBombDmgMul3,
  upgrGalacticFloorChance2,
  upgrVeinIncomeMul,
  upgrStarSupergiantMul,
  upgrRainbowVoidMul,
  upgrLootfrogLootMul,
  upgrSuperStonksChance,
  upgrPickaxeAndBombDmgW4,
  upgrGoldenVoidChance,
  upgrPrismaticFloorChance,
  upgrPrismaticFloorMul,
}

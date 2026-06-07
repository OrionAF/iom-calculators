import type { Source } from '$lib/engine/types'

// ─── World 1 ──────────────────────────────────────────────────────────────────

/** Pickaxe Damage +1% per contract completed (level = contracts done). */
export const ctPickaxeDmgPerContract: Source = {
  key: 'contracts.pickaxePerContract', name: 'Contracts: Pickaxe Damage per Contract', system: 'contracts',
  fn: (n) => n * 0.01, inputs: [],
}
export const ctTripleCraft: Source = {
  key: 'contracts.tripleCraft', name: 'Contracts: Triple Craft Chance (W1)', system: 'contracts',
  maxLevel: 5, fn: (n) => n * 0.01, inputs: [],
}
export const ctPickaxeSuperCrit: Source = {
  key: 'contracts.pickaxeSuperCrit', name: 'Contracts: Pickaxe Super Crit Chance (W1)', system: 'contracts',
  maxLevel: 5, fn: (n) => n * 0.02, inputs: [],
}
export const ctBombRechargeW1: Source = {
  key: 'contracts.bombRechargeW1', name: 'Contracts: Bomb Recharge (W1)', system: 'contracts',
  maxLevel: 5, fn: (n) => n * 0.03, inputs: [],
}
export const ctExpGainW1: Source = {
  key: 'contracts.expGainW1', name: 'Contracts: EXP Gain (W1)', system: 'contracts',
  maxLevel: 5, fn: (n) => n * 0.10, inputs: [],
}
export const ctPickaxeCritDmg: Source = {
  key: 'contracts.pickaxeCritDmg', name: 'Contracts: Pickaxe Crit Damage (W1)', system: 'contracts',
  maxLevel: 5, fn: (n) => n * 0.10, inputs: [],
}
export const ctPickaxeDmgW1: Source = {
  key: 'contracts.pickaxeDmgW1', name: 'Contracts: Pickaxe Damage (W1)', system: 'contracts',
  maxLevel: 3, fn: (n) => n * 0.15, inputs: [],
}
export const ctPrestigePtsW1: Source = {
  key: 'contracts.prestigePtsW1', name: 'Contracts: Prestige Points (W1)', system: 'contracts',
  maxLevel: 3, fn: (n) => n * 0.10, inputs: [],
}
export const ct10xCraft: Source = {
  key: 'contracts.10xCraft', name: 'Contracts: 10x Craft Chance (W1)', system: 'contracts',
  maxLevel: 1, fn: (n) => n * 0.01, inputs: [],
}

// ─── World 2 ──────────────────────────────────────────────────────────────────

/** Bomb Damage +1% per contract completed (level = contracts done). */
export const ctBombDmgPerContract: Source = {
  key: 'contracts.bombPerContract', name: 'Contracts: Bomb Damage per Contract', system: 'contracts',
  fn: (n) => n * 0.01, inputs: [],
}
export const ctOreSellPriceW2: Source = {
  key: 'contracts.oreSellW2', name: 'Contracts: Ore Sell Price (W2)', system: 'contracts',
  maxLevel: 10, fn: (n) => n * 0.15, inputs: [],
}
export const ctVeinIncomeW2: Source = {
  key: 'contracts.veinIncomeW2', name: 'Contracts: Vein Income (W2)', system: 'contracts',
  maxLevel: 5, fn: (n) => n * 0.04, inputs: [],
}
export const ctUltraCritChance: Source = {
  key: 'contracts.ultraCritChance', name: 'Contracts: Ultra Crit Chance (W2)', system: 'contracts',
  maxLevel: 5, fn: (n) => n * 0.01, inputs: [],
}
export const ctGoldenFloorMulW2: Source = {
  key: 'contracts.goldenFloorMulW2', name: 'Contracts: Golden Floor Multi (W2)', system: 'contracts',
  maxLevel: 5, fn: (n) => n * 0.03, inputs: [],
}
export const ctGoldenVeinChance: Source = {
  key: 'contracts.goldenVeinChance', name: 'Contracts: Golden Vein Chance (W2)', system: 'contracts',
  maxLevel: 5, fn: (n) => n * 0.01, inputs: [],
}
export const ctSuperStarSpawn: Source = {
  key: 'contracts.superStarSpawn', name: 'Contracts: Super Star Spawn Rate (W2)', system: 'contracts',
  maxLevel: 5, fn: (n) => n * 0.03, inputs: [],
}
export const ctGameSpeedW2: Source = {
  key: 'contracts.gameSpeedW2', name: 'Contracts: Game Speed (W2)', system: 'contracts',
  maxLevel: 10, fn: (n) => n * 0.01, inputs: [],
}
export const ctRainbowFloorMul: Source = {
  key: 'contracts.rainbowFloorMul', name: 'Contracts: Rainbow Floor Multi (W2)', system: 'contracts',
  maxLevel: 10, fn: (n) => n * 0.02, inputs: [],
}
export const ctSupernovaChanceW2: Source = {
  key: 'contracts.supernovaChanceW2', name: 'Contracts: Supernova Chance (W2)', system: 'contracts',
  maxLevel: 10, fn: (n) => n * 0.0015, inputs: [],
}

// ─── World 3 ──────────────────────────────────────────────────────────────────

export const ctRainbowFloorChance: Source = {
  key: 'contracts.rainbowFloorChance', name: 'Contracts: Rainbow Floor Chance (W3)', system: 'contracts',
  maxLevel: 10, fn: (n) => n * 0.002, inputs: [],
}
export const ctGoldenOreChanceW3: Source = {
  key: 'contracts.goldenOreChanceW3', name: 'Contracts: Golden Ore Chance (W3)', system: 'contracts',
  maxLevel: 15, fn: (n) => n * 0.002, inputs: [],
}
export const ctOmegaCritChance: Source = {
  key: 'contracts.omegaCritChance', name: 'Contracts: Omega Crit Chance (W3)', system: 'contracts',
  maxLevel: 15, fn: (n) => n * 0.02, inputs: [],
}
export const ctPickaxeBombDmgW3: Source = {
  key: 'contracts.pickaxeBombDmgW3', name: 'Contracts: Pickaxe & Bomb Damage (W3)', system: 'contracts',
  maxLevel: 5, fn: (n) => 1 + n * 0.08, inputs: [],
}

// ─── World 4 ──────────────────────────────────────────────────────────────────

export const ctRainbowVeinMul: Source = {
  key: 'contracts.rainbowVeinMul', name: 'Contracts: Rainbow Vein Multi (W4)', system: 'contracts',
  maxLevel: 5, fn: (n) => n * 0.01, inputs: [],
}
export const ctAllStarMul: Source = {
  key: 'contracts.allStarMul', name: 'Contracts: All Star Multi (W4)', system: 'contracts',
  maxLevel: 5, fn: (n) => n * 0.0065, inputs: [],
}
export const ctLootfrogTriple: Source = {
  key: 'contracts.lootfrogTriple', name: 'Contracts: Lootfrog Triple Spawn (W4)', system: 'contracts',
  maxLevel: 5, fn: (n) => n * 0.001, inputs: [],
}
export const ctGoldenVoidChance: Source = {
  key: 'contracts.goldenVoidChance', name: 'Contracts: Golden Void Portal Chance (W4)', system: 'contracts',
  maxLevel: 5, fn: (n) => n * 0.001, inputs: [],
}

export const contractSources = {
  ctPickaxeDmgPerContract, ctTripleCraft, ctPickaxeSuperCrit, ctBombRechargeW1,
  ctExpGainW1, ctPickaxeCritDmg, ctPickaxeDmgW1, ctPrestigePtsW1, ct10xCraft,
  ctBombDmgPerContract, ctOreSellPriceW2, ctVeinIncomeW2, ctUltraCritChance,
  ctGoldenFloorMulW2, ctGoldenVeinChance, ctSuperStarSpawn, ctGameSpeedW2,
  ctRainbowFloorMul, ctSupernovaChanceW2,
  ctRainbowFloorChance, ctGoldenOreChanceW3, ctOmegaCritChance, ctPickaxeBombDmgW3,
  ctRainbowVeinMul, ctAllStarMul, ctLootfrogTriple, ctGoldenVoidChance,
}

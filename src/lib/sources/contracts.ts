import type { Op, Source } from '$lib/engine/types'

// Contract reward sources. "per Contract" sources are uncapped (level = contracts
// completed); the rest are leveled upgrades. statKey/op mirror the formula wiring
// (consistency test enforces op where used). A source feeding two stats keeps its
// primary statKey and adds a sibling object sharing the key for the second stat.

const ct = (
  key: string,
  name: string,
  maxLevel: number | undefined,
  statKey: string | undefined,
  op: Op | undefined,
  fn: Source['fn'],
): Source => ({
  key: `contracts.${key}`,
  name,
  system: 'contracts',
  maxLevel,
  statKey,
  op,
  fn,
  inputs: [],
})

// ─── World 1 ──────────────────────────────────────────────────────────────────

// Pickaxe per-contract feeds pickaxe_damage + pickaxe_super_crit_damage.
export const ctPickaxeDmgPerContract = ct('pickaxePerContract', 'Contracts: Pickaxe Damage per Contract', undefined, 'pickaxe_damage', '+', (n) => n * 0.01)
export const ctPickaxeDmgPerContractSuperCritDmg = ct('pickaxePerContract', 'Contracts: Pickaxe Damage per Contract', undefined, 'pickaxe_super_crit_damage', '+', (n) => n * 0.01)
export const ctTripleCraft = ct('tripleCraft', 'Contracts: Triple Craft Chance (W1)', 5, 'triple_craft_chance', '+', (n) => n * 0.01)
export const ctPickaxeSuperCrit = ct('pickaxeSuperCrit', 'Contracts: Pickaxe Super Crit Chance (W1)', 5, 'pickaxe_super_crit_chance', '+', (n) => n * 0.02)
export const ctBombRechargeW1 = ct('bombRechargeW1', 'Contracts: Bomb Recharge (W1)', 5, 'bomb_recharge_speed', '+', (n) => n * 0.03)
export const ctExpGainW1 = ct('expGainW1', 'Contracts: EXP Gain (W1)', 5, 'experience_multi', '+', (n) => n * 0.1)
export const ctPickaxeCritDmg = ct('pickaxeCritDmg', 'Contracts: Pickaxe Crit Damage (W1)', 5, 'pickaxe_crit_damage', '+', (n) => n * 0.1)
export const ctPickaxeDmgW1 = ct('pickaxeDmgW1', 'Contracts: Pickaxe Damage (W1)', 3, 'pickaxe_damage', '+', (n) => n * 0.15)
// Reduction convention: positive fn, formula subtracts.
export const ctBarCostReductionW1 = ct('barCostW1', 'Contracts: Bar Cost Reduction (W1)', 3, 'bar_upgrade_cost_reduction', '+', (n) => n * 0.05)
export const ctPrestigePtsW1 = ct('prestigePtsW1', 'Contracts: Prestige Points (W1)', 3, 'prestige_point_multi', '+', (n) => n * 0.1)
export const ct10xCraft = ct('10xCraft', 'Contracts: 10x Craft Chance (W1)', 1, 'craft_10x_chance', '+', (n) => n * 0.01)

// ─── World 2 ──────────────────────────────────────────────────────────────────

export const ctBombDmgPerContract = ct('bombPerContract', 'Contracts: Bomb Damage per Contract', undefined, 'bomb_damage', '+', (n) => n * 0.01)
export const ctOreSellPriceW2 = ct('oreSellW2', 'Contracts: Ore Sell Price (W2)', 10, 'ore_sell_price_multi', '+', (n) => n * 0.15)
export const ctVeinIncomeW2 = ct('veinIncomeW2', 'Contracts: Vein Income (W2)', 5, 'vein_income_multi', '+', (n) => n * 0.04)
// Ultra Crit Chance feeds pickaxe + bomb ultra crit.
export const ctUltraCritChance = ct('ultraCritChance', 'Contracts: Ultra Crit Chance (W2)', 5, 'pickaxe_ultra_crit_chance', '+', (n) => n * 0.01)
export const ctUltraCritChanceBomb = ct('ultraCritChance', 'Contracts: Ultra Crit Chance (W2)', 5, 'bomb_ultra_crit_chance', '+', (n) => n * 0.01)
export const ctGoldenFloorMulW2 = ct('goldenFloorMulW2', 'Contracts: Golden Floor Multi (W2)', 5, 'golden_floor_multi', '+', (n) => n * 0.03)
export const ctGoldenVeinChance = ct('goldenVeinChance', 'Contracts: Golden Vein Chance (W2)', 5, 'golden_vein_chance', '+', (n) => n * 0.01)
export const ctSuperStarSpawn = ct('superStarSpawn', 'Contracts: Super Star Spawn Rate (W2)', 5, 'super_star_spawn_multi', '+', (n) => n * 0.03)
export const ctGameSpeedW2 = ct('gameSpeedW2', 'Contracts: Game Speed (W2)', 10, 'game_speed_multi', '+', (n) => n * 0.01)
export const ctRainbowFloorMul = ct('rainbowFloorMul', 'Contracts: Rainbow Floor Multi (W2)', 10, 'rainbow_floor_multi', '+', (n) => n * 0.02)
export const ctSupernovaChanceW2 = ct('supernovaChanceW2', 'Contracts: Supernova Chance (W2)', 10, 'super_star_supernova_chance', '+', (n) => n * 0.0015)

// ─── World 3 ──────────────────────────────────────────────────────────────────

export const ctRainbowFloorChance = ct('rainbowFloorChance', 'Contracts: Rainbow Floor Chance (W3)', 10, 'rainbow_floor_chance', '+', (n) => n * 0.002)
export const ctGoldenOreChanceW3 = ct('goldenOreChanceW3', 'Contracts: Golden Ore Chance (W3)', 15, 'golden_ore_chance', '+', (n) => n * 0.002)
// Omega Crit Chance feeds pickaxe + bomb omega crit.
export const ctOmegaCritChance = ct('omegaCritChance', 'Contracts: Omega Crit Chance (W3)', 15, 'pickaxe_omega_crit_chance', '+', (n) => n * 0.02)
export const ctOmegaCritChanceBomb = ct('omegaCritChance', 'Contracts: Omega Crit Chance (W3)', 15, 'bomb_omega_crit_chance', '+', (n) => n * 0.02)
// Pickaxe & Bomb Damage feeds both, multiplicatively.
export const ctPickaxeBombDmgW3 = ct('pickaxeBombDmgW3', 'Contracts: Pickaxe & Bomb Damage (W3)', 5, 'pickaxe_damage', '×', (n) => 1 + n * 0.08)
export const ctPickaxeBombDmgW3Bomb = ct('pickaxeBombDmgW3', 'Contracts: Pickaxe & Bomb Damage (W3)', 5, 'bomb_damage', '×', (n) => 1 + n * 0.08)
export const ctStarSupergiants = ct('starSupergiants', 'Contracts: Star Supergiant Chance (W3)', 5, 'star_supergiant_chance', '+', (n) => n * 0.002)
export const ctSuperStarSupergiants = ct('superStarSupergiants', 'Contracts: Super Star Supergiant Chance (W3)', 5, 'super_star_supergiant_chance', '+', (n) => n * 0.001)

// ─── World 4 ──────────────────────────────────────────────────────────────────

export const ctRainbowVeinMul = ct('rainbowVeinMul', 'Contracts: Rainbow Vein Multi (W4)', 5, 'rainbow_vein_chance', '+', (n) => n * 0.01)
export const ctPrismaticFloorMul = ct('prismaticFloorMul', 'Contracts: Prismatic Floor Multi (W4)', 5, 'prismatic_floor_multi', '+', (n) => n * 0.005)
export const ctAllStarMul = ct('allStarMul', 'Contracts: All Star Multi (W4)', 5, 'all_star_multi', '+', (n) => n * 0.0065)
export const ctLootfrogTriple = ct('lootfrogTriple', 'Contracts: Lootfrog Triple Spawn (W4)', 5, 'lootfrog_triple_spawn_chance', '+', (n) => n * 0.001)
export const ctGoldenVoidChance = ct('goldenVoidChance', 'Contracts: Golden Void Portal Chance (W4)', 5, 'golden_void_portal_chance', '+', (n) => n * 0.001)

export const contractSources = {
  ctPickaxeDmgPerContract,
  ctPickaxeDmgPerContractSuperCritDmg,
  ctTripleCraft,
  ctPickaxeSuperCrit,
  ctBombRechargeW1,
  ctExpGainW1,
  ctPickaxeCritDmg,
  ctPickaxeDmgW1,
  ctBarCostReductionW1,
  ctPrestigePtsW1,
  ct10xCraft,
  ctBombDmgPerContract,
  ctOreSellPriceW2,
  ctVeinIncomeW2,
  ctUltraCritChance,
  ctUltraCritChanceBomb,
  ctGoldenFloorMulW2,
  ctGoldenVeinChance,
  ctSuperStarSpawn,
  ctGameSpeedW2,
  ctRainbowFloorMul,
  ctSupernovaChanceW2,
  ctRainbowFloorChance,
  ctGoldenOreChanceW3,
  ctOmegaCritChance,
  ctOmegaCritChanceBomb,
  ctPickaxeBombDmgW3,
  ctPickaxeBombDmgW3Bomb,
  ctStarSupergiants,
  ctSuperStarSupergiants,
  ctRainbowVeinMul,
  ctPrismaticFloorMul,
  ctAllStarMul,
  ctLootfrogTriple,
  ctGoldenVoidChance,
}

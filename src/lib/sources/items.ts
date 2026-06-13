import type { Op, Source } from '$lib/engine/types'

// Items are active buffs (type 'buff', binary 0/1) or permanent stacks (leveled).
// Multiplicative buffs: fn(1) = factor, fn(0) = 1. Additive: fn(1) = bonus, fn(0) = 0.
// statKey/op mirror the formula wiring (consistency test enforces op where used);
// items feeding several stats use one Source object per stat sharing the key.
// Values from iom_wiki/pages/Items.json.

const buff = (
  key: string,
  name: string,
  statKey: string | undefined,
  op: Op | undefined,
  fn: Source['fn'],
): Source => ({
  key: `items.${key}`,
  name,
  system: 'items',
  type: 'buff',
  maxLevel: 1,
  statKey,
  op,
  fn,
  inputs: [],
})

const perm = (
  key: string,
  name: string,
  maxLevel: number,
  statKey: string | undefined,
  op: Op | undefined,
  fn: Source['fn'],
): Source => ({
  key: `items.${key}`,
  name,
  system: 'items',
  maxLevel,
  statKey,
  op,
  fn,
  inputs: [],
})

// ─── Tier 1 Items ─────────────────────────────────────────────────────────────

export const apple = buff('apple', 'Apple', 'pickaxe_crit_chance', '+', (a) => a * 0.1)
export const bread = buff('bread', 'Bread', 'pickaxe_radius_percent', '×', (a) => 1 + a * 0.25)
// Drone Juice feeds drone radius + movespeed (one item, two stats).
export const droneJuiceDroneRadius = buff('droneJuice', 'Drone Juice', 'drone_radius_percent', '+', (a) => a * 0.5)
export const droneJuiceDroneSpeed = buff('droneJuice', 'Drone Juice', 'drone_movespeed_percent', '+', (a) => a * 0.5)
// Banana Coffee feeds pickaxe attack speed + game speed.
export const bananaCoffee = buff('bananaCoffee', 'Banana Coffee', 'pickaxe_attack_speed_per_second', '×', (a) => 1 + a * 0.2)
export const bananaCoffeeGameSpeed = buff('bananaCoffee', 'Banana Coffee', 'game_speed_multi', '×', (a) => 1 + a * 0.2)
export const pike = buff('pike', 'Pike', 'pickaxe_crit_damage', '+', (a) => a * 0.3)
export const eyeOfNewtTripleRock = buff('eyeOfNewt', 'Eye of Newt', 'multi_rock_chance', '+', (a) => a * 0.25)
export const rockCake = buff('rockCake', 'Rock Cake', 'pickaxe_damage', '+', (a) => a * 0.3)
export const juicyPlumsCritChance = buff('juicyPlums', 'Juicy Plums', 'pickaxe_crit_chance', '+', (a) => a * 0.25)
export const juicyPlumsCritDamage = buff('juicyPlums', 'Juicy Plums', 'pickaxe_crit_damage', '+', (a) => a * 0.25)
export const chaosTotemBombDamage = buff('chaosTotem', 'Chaos Totem', 'bomb_damage', '×', (a) => 1 + a * 2.0)
export const chaosTotemBombRecharge = buff('chaosTotem', 'Chaos Totem', 'bomb_recharge_speed', '×', (a) => 1 + a * 1.0)
export const primalMeatPickaxe = buff('primalMeat', 'Primal Meat', 'pickaxe_damage', '+', (a) => a * 1.0)
export const strawberriesExp = buff('strawberries', 'Strawberries', 'experience_multi', '×', (a) => 1 + a * 2.0)
export const blueCow = buff('blueCow', 'Blue Cow', 'game_speed_multi', '×', (a) => 1 + a * 1.0)

// ─── Tier 2 Items ─────────────────────────────────────────────────────────────

export const starfruitAllStarMulti = buff('starfruit', 'Starfruit', 'all_star_multi', '+', (a) => a * 0.3)
export const starfruitSupernovaChance = buff('starfruit', 'Starfruit', 'star_supernova_chance', '+', (a) => a * 0.1)
export const lasagnaGoldenOreChance = buff('lasagna', 'Lasagna', 'golden_ore_chance', '+', (a) => a * 0.1)
export const lasagnaGoldenOreMul = buff('lasagna', 'Lasagna', 'golden_ore_multi', '×', (a) => 1 + a * 1.0)
// Ice Cream feeds super-star spawn + vein income.
export const iceCreamSuperStarSpawn = buff('iceCream', 'Ice Cream', 'super_star_spawn_multi', '×', (a) => 1 + a * 1.5)
export const iceCreamVeinIncome = buff('iceCream', 'Ice Cream', 'vein_income_multi', '×', (a) => 1 + a * 1.5)
export const rainbowLollipopChance = buff('rainbowLollipop', 'Rainbow Lollipop', 'rainbow_floor_chance', '+', (a) => a * 0.03)
export const rainbowLollipopMul = buff('rainbowLollipop', 'Rainbow Lollipop', 'rainbow_floor_multi', '×', (a) => 1 + a * 2.0)
export const hamburgerPickaxe = buff('hamburger', 'Hamburger', 'pickaxe_damage', '×', (a) => 1 + a * 2.0)
export const hamburgerBomb = buff('hamburger', 'Hamburger', 'bomb_damage', '×', (a) => 1 + a * 2.0)
export const yummyPizzaGoldenFloor = buff('yummyPizza', 'Yummy Pizza', 'golden_floor_multi', '×', (a) => 1 + a * 0.15)
export const yummyPizzaAllFloorPerm = perm('yummyPizzaPerm', 'Yummy Pizza (permanent)', 200, 'all_floor_multipliers', '+', (n) => n * 0.01)

// ─── Tier 3 Items ─────────────────────────────────────────────────────────────

export const lootbugLanternSpawn = buff('lootbugLantern', 'Lootbug Lantern', 'lootbug_spawn_rate', '×', (a) => 1 + a * 2.0)
export const lootbugLanternPermCap = perm('lootbugLanternPerm', 'Lootbug Lantern (permanent cap)', 25, 'lootbug_bank_cap', '+', (n) => n)

// ─── Tier 4 Items ─────────────────────────────────────────────────────────────

export const goldFlakeSteakBuff = buff('goldFlakeSteak', 'Gold Flake Steak', 'golden_ore_multi', '×', (a) => 1 + a * 2.0)
export const goldFlakeSteakPerm = perm('goldFlakeSteakPerm', 'Gold Flake Steak (permanent)', 500, 'golden_ore_multi', '+', (n) => n * 0.001)
export const cosmicCandyBuff = buff('cosmicCandy', 'Cosmic Candy', 'all_star_multi', '×', (a) => 1 + a * 2.0)
export const cosmicCandyPerm = perm('cosmicCandyPerm', 'Cosmic Candy (permanent)', 250, 'all_star_multi', '+', (n) => n * 0.001)

// ─── Golden Item Variants ────────────────────────────────────────────────────
// Golden items replace their base version in the bag; same op as the base.

export const goldenEyeOfNewtTripleRock = buff('goldenEyeOfNewt', 'Golden Eye of Newt', 'multi_rock_chance', '+', (a) => a * 0.5)
export const goldenEyeOfNewtGoldenFloor = buff('goldenEyeOfNewt', 'Golden Eye of Newt', 'golden_floor_multi', '×', (a) => 1 + a * 0.5)
export const goldenChaosTotemBombDamage = buff('goldenChaosTotem', 'Golden Chaos Totem', 'bomb_damage', '×', (a) => 1 + a * 8.0)
export const goldenChaosTotemBombRecharge = buff('goldenChaosTotem', 'Golden Chaos Totem', 'bomb_recharge_speed', '×', (a) => 1 + a * 1.3)
export const goldenPrimalMeatPickaxe = buff('goldenPrimalMeat', 'Golden Primal Meat', 'pickaxe_damage', '+', (a) => a * 2.0)
export const goldenPrimalMeatSuperStar = buff('goldenPrimalMeat', 'Golden Primal Meat', 'super_star_spawn_multi', '×', (a) => 1 + a * 0.5)
export const goldenStrawberriesExp = buff('goldenStrawberries', 'Golden Strawberries', 'experience_multi', '×', (a) => 1 + a * 5.0)
export const goldenStrawberriesGoldenVein = buff('goldenStrawberries', 'Golden Strawberries', 'golden_vein_multi', '+', (a) => a * 4.0)
export const goldenHamburgerPickaxe = buff('goldenHamburger', 'Golden Hamburger', 'pickaxe_damage', '×', (a) => 1 + a * 5.0)
export const goldenHamburgerBomb = buff('goldenHamburger', 'Golden Hamburger', 'bomb_damage', '×', (a) => 1 + a * 5.0)
export const goldenStarfruitAllStarMulti = buff('goldenStarfruit', 'Golden Starfruit', 'all_star_multi', '+', (a) => a * 0.6)
export const goldenStarfruitSupernovaChance = buff('goldenStarfruit', 'Golden Starfruit', 'star_supernova_chance', '+', (a) => a * 0.2)
export const goldenRainbowLollipopChance = buff('goldenRainbowLollipop', 'Golden Rainbow Lollipop', 'rainbow_floor_chance', '+', (a) => a * 0.06)
export const goldenRainbowLollipopMul = buff('goldenRainbowLollipop', 'Golden Rainbow Lollipop', 'rainbow_floor_multi', '×', (a) => 1 + a * 5.0)
export const goldenYummyPizzaGoldenFloor = buff('goldenYummyPizza', 'Golden Yummy Pizza', 'golden_floor_multi', '×', (a) => 1 + a * 0.3)
export const goldenYummyPizzaAllFloorPerm = perm('goldenYummyPizzaPerm', 'Golden Yummy Pizza (permanent)', 250, 'all_floor_multipliers', '+', (n) => n * 0.01)
export const goldenLootbugLanternSpawn = buff('goldenLootbugLantern', 'Golden Lootbug Lantern', 'lootbug_spawn_rate', '×', (a) => 1 + a * 5.0)
export const goldenLootbugLanternPermCap = perm('goldenLootbugLanternPerm', 'Golden Lootbug Lantern (permanent cap)', 50, 'lootbug_bank_cap', '+', (n) => n)
export const goldenCosmicCandyBuff = buff('goldenCosmicCandy', 'Golden Cosmic Candy', 'all_star_multi', '×', (a) => 1 + a * 4.0)
export const goldenCosmicCandyPerm = perm('goldenCosmicCandyPerm', 'Golden Cosmic Candy (permanent)', 500, 'all_star_multi', '+', (n) => n * 0.001)

export const itemSources = {
  apple,
  bread,
  droneJuiceDroneRadius,
  droneJuiceDroneSpeed,
  bananaCoffee,
  bananaCoffeeGameSpeed,
  pike,
  eyeOfNewtTripleRock,
  rockCake,
  juicyPlumsCritChance,
  juicyPlumsCritDamage,
  chaosTotemBombDamage,
  chaosTotemBombRecharge,
  primalMeatPickaxe,
  strawberriesExp,
  blueCow,
  starfruitAllStarMulti,
  starfruitSupernovaChance,
  lasagnaGoldenOreChance,
  lasagnaGoldenOreMul,
  iceCreamSuperStarSpawn,
  iceCreamVeinIncome,
  rainbowLollipopChance,
  rainbowLollipopMul,
  hamburgerPickaxe,
  hamburgerBomb,
  yummyPizzaGoldenFloor,
  yummyPizzaAllFloorPerm,
  lootbugLanternSpawn,
  lootbugLanternPermCap,
  goldFlakeSteakBuff,
  goldFlakeSteakPerm,
  cosmicCandyBuff,
  cosmicCandyPerm,
  // Golden variants
  goldenEyeOfNewtTripleRock,
  goldenEyeOfNewtGoldenFloor,
  goldenChaosTotemBombDamage,
  goldenChaosTotemBombRecharge,
  goldenPrimalMeatPickaxe,
  goldenPrimalMeatSuperStar,
  goldenStrawberriesExp,
  goldenStrawberriesGoldenVein,
  goldenHamburgerPickaxe,
  goldenHamburgerBomb,
  goldenStarfruitAllStarMulti,
  goldenStarfruitSupernovaChance,
  goldenRainbowLollipopChance,
  goldenRainbowLollipopMul,
  goldenYummyPizzaGoldenFloor,
  goldenYummyPizzaAllFloorPerm,
  goldenLootbugLanternSpawn,
  goldenLootbugLanternPermCap,
  goldenCosmicCandyBuff,
  goldenCosmicCandyPerm,
}

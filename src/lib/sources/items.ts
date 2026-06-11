import type { Source } from '$lib/engine/types'

// Items are active buffs (binary: 0 = inactive, 1 = active) or permanent stacks.
// Values from iom_wiki/pages/Items.json.
// For multiplicative buffs: fn(1) = factor, fn(0) = 1 (neutral)
// For additive buffs:       fn(1) = bonus,  fn(0) = 0

// ─── Tier 1 Items ─────────────────────────────────────────────────────────────

/** Apple: Pickaxe Crit Chance +10%. Duration 1m30s. */
export const apple: Source = {
  key: 'items.apple', name: 'Apple', system: 'items', type: 'buff', maxLevel: 1,
  fn: (a) => a * 0.10, inputs: [],
}

/** Bread: Pickaxe Radius ×1.25. Duration 1m30s. */
export const bread: Source = {
  key: 'items.bread', name: 'Bread', system: 'items', type: 'buff', maxLevel: 1,
  fn: (a) => 1 + a * 0.25, inputs: [],
}

/** Drone Juice: Drone Radius +50%, Drone Movespeed +50%. Duration 1m30s. */
export const droneJuiceDroneRadius: Source = {
  key: 'items.droneJuice', name: 'Drone Juice', system: 'items', type: 'buff', maxLevel: 1,
  fn: (a) => a * 0.50, inputs: [],
}
export const droneJuiceDroneSpeed: Source = {
  key: 'items.droneJuice', name: 'Drone Juice', system: 'items', type: 'buff', maxLevel: 1,
  fn: (a) => a * 0.50, inputs: [],
}

/** Banana Coffee: Game Speed ×1.20 (wiki: "Mining Speed" = game_speed_multi). Duration 2m. (Also +0.10% Game Speed per Cephalus Idol level via archaeology) */
export const bananaCoffee: Source = {
  key: 'items.bananaCoffee', name: 'Banana Coffee', system: 'items', type: 'buff', maxLevel: 1,
  fn: (a) => 1 + a * 0.20, inputs: [],
}

/** Pike: Pickaxe Crit Damage +30%. Duration 2m. */
export const pike: Source = {
  key: 'items.pike', name: 'Pike', system: 'items', type: 'buff', maxLevel: 1,
  fn: (a) => a * 0.30, inputs: [],
}

/** Eye of Newt: Triple Rock Chance +25%. Duration 2m. (Also ×Golden Floor Multi with Iris Idol) */
export const eyeOfNewtTripleRock: Source = {
  key: 'items.eyeOfNewt', name: 'Eye of Newt', system: 'items', type: 'buff', maxLevel: 1,
  fn: (a) => a * 0.25, inputs: [],
}

/** Rock Cake: Pickaxe Damage +30%. Duration 2m30s. */
export const rockCake: Source = {
  key: 'items.rockCake', name: 'Rock Cake', system: 'items', type: 'buff', maxLevel: 1,
  fn: (a) => a * 0.30, inputs: [],
}

/** Juicy Plums: Pickaxe Crit Chance +25%, Crit Damage +25%. Duration 2m30s. */
export const juicyPlumsCritChance: Source = {
  key: 'items.juicyPlums', name: 'Juicy Plums', system: 'items', type: 'buff', maxLevel: 1,
  fn: (a) => a * 0.25, inputs: [],
}
export const juicyPlumsCritDamage: Source = {
  key: 'items.juicyPlums', name: 'Juicy Plums', system: 'items', type: 'buff', maxLevel: 1,
  fn: (a) => a * 0.25, inputs: [],
}

/** Chaos Totem: Bomb Damage ×3.00, Bomb Recharge ×2.00. Duration 2m30s. */
export const chaosTotemBombDamage: Source = {
  key: 'items.chaosTotem', name: 'Chaos Totem', system: 'items', type: 'buff', maxLevel: 1,
  fn: (a) => 1 + a * 2.0, inputs: [],
}
export const chaosTotemBombRecharge: Source = {
  key: 'items.chaosTotem', name: 'Chaos Totem', system: 'items', type: 'buff', maxLevel: 1,
  fn: (a) => 1 + a * 1.0, inputs: [],
}

/** Primal Meat: Pickaxe Damage +100%. Duration 3m. */
export const primalMeatPickaxe: Source = {
  key: 'items.primalMeat', name: 'Primal Meat', system: 'items', type: 'buff', maxLevel: 1,
  fn: (a) => a * 1.0, inputs: [],
}

/** Strawberries: Exp Gain ×3.00. Duration 3m. */
export const strawberriesExp: Source = {
  key: 'items.strawberries', name: 'Strawberries', system: 'items', type: 'buff', maxLevel: 1,
  fn: (a) => 1 + a * 2.0, inputs: [],
}

/** Blue Cow: Game Speed ×2.00. Duration 10m. */
export const blueCow: Source = {
  key: 'items.blueCow', name: 'Blue Cow', system: 'items', type: 'buff', maxLevel: 1,
  fn: (a) => 1 + a * 1.0, inputs: [],
}

// ─── Tier 2 Items ─────────────────────────────────────────────────────────────

/** Starfruit: All Star Multi +30%. Star Supernova Chance +10%. Duration 140s. */
export const starfruitAllStarMulti: Source = {
  key: 'items.starfruit', name: 'Starfruit', system: 'items', type: 'buff', maxLevel: 1,
  fn: (a) => a * 0.30, inputs: [],
}
export const starfruitSupernovaChance: Source = {
  key: 'items.starfruit', name: 'Starfruit', system: 'items', type: 'buff', maxLevel: 1,
  fn: (a) => a * 0.10, inputs: [],
}

/** Lasagna: Golden Ore Chance +10%. Golden Ore Multi ×2 (base). Duration 140s. */
export const lasagnaGoldenOreChance: Source = {
  key: 'items.lasagna', name: 'Lasagna', system: 'items', type: 'buff', maxLevel: 1,
  fn: (a) => a * 0.10, inputs: [],
}
export const lasagnaGoldenOreMul: Source = {
  key: 'items.lasagna', name: 'Lasagna', system: 'items', type: 'buff', maxLevel: 1,
  fn: (a) => 1 + a * 1.0, inputs: [],
}

/** Ice Cream: Super Star Spawn Rate ×2.5. Duration 140s. */
export const iceCreamSuperStarSpawn: Source = {
  key: 'items.iceCream', name: 'Ice Cream', system: 'items', type: 'buff', maxLevel: 1,
  fn: (a) => 1 + a * 1.5, inputs: [],
}

/** Rainbow Lollipop: Rainbow Floor Chance +3%. Rainbow Floor Multi ×3. Duration 260s. */
export const rainbowLollipopChance: Source = {
  key: 'items.rainbowLollipop', name: 'Rainbow Lollipop', system: 'items', type: 'buff', maxLevel: 1,
  fn: (a) => a * 0.03, inputs: [],
}
export const rainbowLollipopMul: Source = {
  key: 'items.rainbowLollipop', name: 'Rainbow Lollipop', system: 'items', type: 'buff', maxLevel: 1,
  fn: (a) => 1 + a * 2.0, inputs: [],
}

/** Hamburger: Pickaxe Damage ×3 (base). Bomb Damage ×3 (base). Duration 105s. */
export const hamburgerPickaxe: Source = {
  key: 'items.hamburger', name: 'Hamburger', system: 'items', type: 'buff', maxLevel: 1,
  fn: (a) => 1 + a * 2.0, inputs: [],
}
export const hamburgerBomb: Source = {
  key: 'items.hamburger', name: 'Hamburger', system: 'items', type: 'buff', maxLevel: 1,
  fn: (a) => 1 + a * 2.0, inputs: [],
}

/** Yummy Pizza: Golden Floor Multi ×1.15. Duration 800s. */
export const yummyPizzaGoldenFloor: Source = {
  key: 'items.yummyPizza', name: 'Yummy Pizza', system: 'items', type: 'buff', maxLevel: 1,
  fn: (a) => 1 + a * 0.15, inputs: [],
}
/** Yummy Pizza: All Floor Multi +1% permanent per pizza eaten. Cap +200%. → all_floor_multipliers */
export const yummyPizzaAllFloorPerm: Source = {
  key: 'items.yummyPizzaPerm', name: 'Yummy Pizza (permanent)', system: 'items', maxLevel: 200,
  fn: (n) => n * 0.01, inputs: [],
}

// ─── Tier 3 Items ─────────────────────────────────────────────────────────────

/** Lootbug Lantern: Lootbug Spawn Rate ×3 (active buff). Also permanently +1 Banked Cap per lantern used (capped at +25). Duration 15m. */
export const lootbugLanternSpawn: Source = {
  key: 'items.lootbugLantern', name: 'Lootbug Lantern', system: 'items', type: 'buff', maxLevel: 1,
  fn: (a) => 1 + a * 2.0, inputs: [],
}
/** Permanent banked lootbug cap from lanterns used (cap: +25). Input: lanternsUsed count. */
export const lootbugLanternPermCap: Source = {
  key: 'items.lootbugLanternPerm', name: 'Lootbug Lantern (permanent cap)', system: 'items', maxLevel: 25,
  fn: (n) => n, inputs: [],
}

// ─── Tier 4 Items ─────────────────────────────────────────────────────────────

/** Gold Flake Steak: Golden Ore Multi ×3. Permanent +0.10% Golden Ore Multi per steak eaten (cap +50%). Duration 500s. */
export const goldFlakeSteakBuff: Source = {
  key: 'items.goldFlakeSteak', name: 'Gold Flake Steak', system: 'items', type: 'buff', maxLevel: 1,
  fn: (a) => 1 + a * 2.0, inputs: [],
}
/** Permanent Golden Ore Multi bonus from Gold Flake Steaks eaten (cap +50% = +0.50 decimal). */
export const goldFlakeSteakPerm: Source = {
  key: 'items.goldFlakeSteakPerm', name: 'Gold Flake Steak (permanent)', system: 'items', maxLevel: 500,
  fn: (n) => n * 0.001, inputs: [],
}

/** Cosmic Candy: All Star Multi ×3. Permanent +0.10% All Star Multi per candy eaten (cap +25%). Duration 1200s. */
export const cosmicCandyBuff: Source = {
  key: 'items.cosmicCandy', name: 'Cosmic Candy', system: 'items', type: 'buff', maxLevel: 1,
  fn: (a) => 1 + a * 2.0, inputs: [],
}
/** Permanent All Star Multi bonus from Cosmic Candy eaten (cap +25% = +0.25 decimal). */
export const cosmicCandyPerm: Source = {
  key: 'items.cosmicCandyPerm', name: 'Cosmic Candy (permanent)', system: 'items', maxLevel: 250,
  fn: (n) => n * 0.001, inputs: [],
}

// ─── Golden Item Variants ────────────────────────────────────────────────────
// Golden items replace their base version in the item bag.
// Unlocked via fishing tributes, black hole bonuses, world quests, challenges, or skin rewards.
// Use the SAME op as their base counterpart; the user activates one or the other.

/** Golden Eye of Newt: Triple Rock Chance +50%, Golden Floor Multi ×1.50. */
export const goldenEyeOfNewtTripleRock: Source = {
  key: 'items.goldenEyeOfNewt', name: 'Golden Eye of Newt', system: 'items', type: 'buff', maxLevel: 1,
  fn: (a) => a * 0.50, inputs: [],
}
export const goldenEyeOfNewtGoldenFloor: Source = {
  key: 'items.goldenEyeOfNewt', name: 'Golden Eye of Newt', system: 'items', type: 'buff', maxLevel: 1,
  fn: (a) => 1 + a * 0.50, inputs: [],
}

/** Golden Chaos Totem: Bomb Damage ×9.00, Bomb Recharge Rate ×2.30. */
export const goldenChaosTotemBombDamage: Source = {
  key: 'items.goldenChaosTotem', name: 'Golden Chaos Totem', system: 'items', type: 'buff', maxLevel: 1,
  fn: (a) => 1 + a * 8.0, inputs: [],
}
export const goldenChaosTotemBombRecharge: Source = {
  key: 'items.goldenChaosTotem', name: 'Golden Chaos Totem', system: 'items', type: 'buff', maxLevel: 1,
  fn: (a) => 1 + a * 1.30, inputs: [],
}

/** Golden Primal Meat: Pickaxe Damage +200% (+2.0 additive), Super Star Spawn Rate ×1.50. Unlocked: Black Hole 13. */
export const goldenPrimalMeatPickaxe: Source = {
  key: 'items.goldenPrimalMeat', name: 'Golden Primal Meat', system: 'items', type: 'buff', maxLevel: 1,
  fn: (a) => a * 2.0, inputs: [],
}
export const goldenPrimalMeatSuperStar: Source = {
  key: 'items.goldenPrimalMeat', name: 'Golden Primal Meat', system: 'items', type: 'buff', maxLevel: 1,
  fn: (a) => 1 + a * 0.50, inputs: [],
}

/** Golden Strawberries: EXP Gain ×6.00, Golden Vein Multi +400% (additive +4.0). Unlocked: Black Hole 4. */
export const goldenStrawberriesExp: Source = {
  key: 'items.goldenStrawberries', name: 'Golden Strawberries', system: 'items', type: 'buff', maxLevel: 1,
  fn: (a) => 1 + a * 5.0, inputs: [],
}
export const goldenStrawberriesGoldenVein: Source = {
  key: 'items.goldenStrawberries', name: 'Golden Strawberries', system: 'items', type: 'buff', maxLevel: 1,
  fn: (a) => a * 4.0, inputs: [],
}

/**
 * Golden Hamburger: Pickaxe Damage ×6 (base, scales +0.12x per Workshop level).
 * Bomb Damage ×6 (base). Unlocked: Fishing – Tier 1 Blackened Basker Tribute.
 * Base value used; Workshop scaling added when workshop sources are available.
 */
export const goldenHamburgerPickaxe: Source = {
  key: 'items.goldenHamburger', name: 'Golden Hamburger', system: 'items', type: 'buff', maxLevel: 1,
  fn: (a) => 1 + a * 5.0, inputs: [],
}
export const goldenHamburgerBomb: Source = {
  key: 'items.goldenHamburger', name: 'Golden Hamburger', system: 'items', type: 'buff', maxLevel: 1,
  fn: (a) => 1 + a * 5.0, inputs: [],
}

/**
 * Golden Starfruit: All Star Multi +60% (base, scales with Workshop).
 * Star Supernova Chance +20%. Unlocked: Divine Challenge reward.
 */
export const goldenStarfruitAllStarMulti: Source = {
  key: 'items.goldenStarfruit', name: 'Golden Starfruit', system: 'items', type: 'buff', maxLevel: 1,
  fn: (a) => a * 0.60, inputs: [],
}
export const goldenStarfruitSupernovaChance: Source = {
  key: 'items.goldenStarfruit', name: 'Golden Starfruit', system: 'items', type: 'buff', maxLevel: 1,
  fn: (a) => a * 0.20, inputs: [],
}

/**
 * Golden Rainbow Lollipop: Rainbow Floor Chance +6% (base), Rainbow Floor Multi ×6 (base).
 * Both scale with Aphrodite Idol upgrade. Unlocked: Black Hole 18.
 */
export const goldenRainbowLollipopChance: Source = {
  key: 'items.goldenRainbowLollipop', name: 'Golden Rainbow Lollipop', system: 'items', type: 'buff', maxLevel: 1,
  fn: (a) => a * 0.06, inputs: [],
}
export const goldenRainbowLollipopMul: Source = {
  key: 'items.goldenRainbowLollipop', name: 'Golden Rainbow Lollipop', system: 'items', type: 'buff', maxLevel: 1,
  fn: (a) => 1 + a * 5.0, inputs: [],
}

/** Golden Yummy Pizza: Golden Floor Multi ×1.30. Duration 800s. Unlocked: World Quest 14. */
export const goldenYummyPizzaGoldenFloor: Source = {
  key: 'items.goldenYummyPizza', name: 'Golden Yummy Pizza', system: 'items', type: 'buff', maxLevel: 1,
  fn: (a) => 1 + a * 0.30, inputs: [],
}
/** Golden Yummy Pizza: All Floor Multi +1% permanent per pizza eaten. Cap +250%. → all_floor_multipliers */
export const goldenYummyPizzaAllFloorPerm: Source = {
  key: 'items.goldenYummyPizzaPerm', name: 'Golden Yummy Pizza (permanent)', system: 'items', maxLevel: 250,
  fn: (n) => n * 0.01, inputs: [],
}

/** Golden Lootbug Lantern: Lootbug Spawn Rate ×6.00. Permanently +1 Banked Cap per lantern (cap +50). Unlocked: Fishing – Melting Gibbous Tier 2. */
export const goldenLootbugLanternSpawn: Source = {
  key: 'items.goldenLootbugLantern', name: 'Golden Lootbug Lantern', system: 'items', type: 'buff', maxLevel: 1,
  fn: (a) => 1 + a * 5.0, inputs: [],
}
/** Permanent banked lootbug cap from golden lanterns used (cap: +50). */
export const goldenLootbugLanternPermCap: Source = {
  key: 'items.goldenLootbugLanternPerm', name: 'Golden Lootbug Lantern (permanent cap)', system: 'items', maxLevel: 50,
  fn: (n) => n, inputs: [],
}

/** Golden Cosmic Candy: All Star Multi ×5.00. Permanent +0.10% All Star Multi per candy (cap +50%). Unlocked: World Quest 20. */
export const goldenCosmicCandyBuff: Source = {
  key: 'items.goldenCosmicCandy', name: 'Golden Cosmic Candy', system: 'items', type: 'buff', maxLevel: 1,
  fn: (a) => 1 + a * 4.0, inputs: [],
}
/** Permanent All Star Multi bonus from Golden Cosmic Candy eaten (cap +50% = +0.50 decimal). */
export const goldenCosmicCandyPerm: Source = {
  key: 'items.goldenCosmicCandyPerm', name: 'Golden Cosmic Candy (permanent)', system: 'items', maxLevel: 500,
  fn: (n) => n * 0.001, inputs: [],
}

export const itemSources = {
  apple, bread, droneJuiceDroneRadius, droneJuiceDroneSpeed,
  bananaCoffee, pike, eyeOfNewtTripleRock, rockCake,
  juicyPlumsCritChance, juicyPlumsCritDamage,
  chaosTotemBombDamage, chaosTotemBombRecharge,
  primalMeatPickaxe, strawberriesExp, blueCow,
  starfruitAllStarMulti, starfruitSupernovaChance,
  lasagnaGoldenOreChance, lasagnaGoldenOreMul,
  iceCreamSuperStarSpawn, rainbowLollipopChance, rainbowLollipopMul,
  hamburgerPickaxe, hamburgerBomb, yummyPizzaGoldenFloor, yummyPizzaAllFloorPerm,
  lootbugLanternSpawn, lootbugLanternPermCap,
  goldFlakeSteakBuff, goldFlakeSteakPerm,
  cosmicCandyBuff, cosmicCandyPerm,
  // Golden variants
  goldenEyeOfNewtTripleRock, goldenEyeOfNewtGoldenFloor,
  goldenChaosTotemBombDamage, goldenChaosTotemBombRecharge,
  goldenPrimalMeatPickaxe, goldenPrimalMeatSuperStar,
  goldenStrawberriesExp, goldenStrawberriesGoldenVein,
  goldenHamburgerPickaxe, goldenHamburgerBomb,
  goldenStarfruitAllStarMulti, goldenStarfruitSupernovaChance,
  goldenRainbowLollipopChance, goldenRainbowLollipopMul,
  goldenYummyPizzaGoldenFloor, goldenYummyPizzaAllFloorPerm,
  goldenLootbugLanternSpawn, goldenLootbugLanternPermCap,
  goldenCosmicCandyBuff, goldenCosmicCandyPerm,
}

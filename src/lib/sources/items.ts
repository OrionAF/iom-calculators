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

/** Banana Coffee: Game Speed ×1.20. Duration 2m. (Also grants +0.10% Game Speed per Cephalus Idol level) */
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

export const itemSources = {
  apple, bread, droneJuiceDroneRadius, droneJuiceDroneSpeed,
  bananaCoffee, pike, eyeOfNewtTripleRock, rockCake,
  juicyPlumsCritChance, juicyPlumsCritDamage,
  chaosTotemBombDamage, chaosTotemBombRecharge,
  primalMeatPickaxe, strawberriesExp, blueCow,
  starfruitAllStarMulti, starfruitSupernovaChance,
  lasagnaGoldenOreChance, lasagnaGoldenOreMul,
  iceCreamSuperStarSpawn, rainbowLollipopChance, rainbowLollipopMul,
  hamburgerPickaxe, hamburgerBomb, yummyPizzaGoldenFloor,
  lootbugLanternSpawn, lootbugLanternPermCap,
  goldFlakeSteakBuff, goldFlakeSteakPerm,
  cosmicCandyBuff, cosmicCandyPerm,
}

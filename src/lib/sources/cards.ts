import type { Source } from '$lib/engine/types'

// ─── Ore Cards (rarity 0=none, 1=base, 2=gilded, 3=polychrome) ──────────────
// Formula is (base(4)+Cetus+Upgrades)*(1+pets)*bundle*tribute

// ─── Pet Cards (rarity 0=none, 1=base, 2=gilded, 3=polychrome) ──────────────
export const cardNagini: Source = {
  key: 'cards.nagini', name: 'Card: Nagini', system: 'cards',
  maxLevel: 3, fn: (n) => ([0.01, 0.02, 0.04] as const)[Math.min(n, 3)], inputs: [],
}



// ─── Misc Cards (rarity 0=none, 1=base, 2=gilded, 3=polychrome) ──────────────

/** Alex: Pickaxe Damage ×1.10 / ×1.20 / ×1.40 */
export const cardAlex: Source = {
  key: 'cards.alex', name: 'Card: Alex', system: 'cards',
  maxLevel: 3, fn: (n) => ([1, 1.10, 1.20, 1.40] as const)[Math.min(n, 3)], inputs: [],
}

/** Bone: Bomb Damage ×1.05 / ×1.10 / ×1.15 */
export const cardBone: Source = {
  key: 'cards.bone', name: 'Card: Bone', system: 'cards',
  maxLevel: 3, fn: (n) => ([1, 1.05, 1.10, 1.15] as const)[Math.min(n, 3)], inputs: [],
}

/** World 1: Golden Floor Multi ×1.06 / ×1.12 / ×1.24 */
export const cardWorld1: Source = {
  key: 'cards.world1', name: 'Card: World 1', system: 'cards',
  maxLevel: 3, fn: (n) => ([1, 1.06, 1.12, 1.24] as const)[Math.min(n, 3)], inputs: [],
}

/** World 2: Rainbow Floor Multi ×1.06 / ×1.12 / ×1.24 */
export const cardWorld2: Source = {
  key: 'cards.world2', name: 'Card: World 2', system: 'cards',
  maxLevel: 3, fn: (n) => ([1, 1.06, 1.12, 1.24] as const)[Math.min(n, 3)], inputs: [],
}

/** World 3: Galactic Floor Multi ×1.06 / ×1.12 / ×1.24 */
export const cardWorld3: Source = {
  key: 'cards.world3', name: 'Card: World 3', system: 'cards',
  maxLevel: 3, fn: (n) => ([1, 1.06, 1.12, 1.24] as const)[Math.min(n, 3)], inputs: [],
}

/** World 4: All Floor Multi ×1.06 / ×1.12 / ×1.24 */
export const cardWorld4: Source = {
  key: 'cards.world4', name: 'Card: World 4', system: 'cards',
  maxLevel: 3, fn: (n) => ([1, 1.06, 1.12, 1.24] as const)[Math.min(n, 3)], inputs: [],
}

/** Celio's Hat: Prestige Point Gain ×1.10 / ×1.20 / ×1.40 */
export const cardCeliosHat: Source = {
  key: 'cards.celiosHat', name: "Card: Celio's Hat", system: 'cards',
  maxLevel: 3, fn: (n) => ([1, 1.10, 1.20, 1.40] as const)[Math.min(n, 3)], inputs: [],
}

/** Julk: Ore Sell Price ×1.04 / ×1.08 / ×1.12 */
export const cardJulk: Source = {
  key: 'cards.julk', name: 'Card: Julk', system: 'cards',
  maxLevel: 3, fn: (n) => ([1, 1.04, 1.08, 1.12] as const)[Math.min(n, 3)], inputs: [],
}

/** Lootbug: Lootbug Loot Multi ×1.10 / ×1.20 / ×1.30 */
export const cardLootbug: Source = {
  key: 'cards.lootbug', name: 'Card: Lootbug', system: 'cards',
  maxLevel: 3, fn: (n) => ([1, 1.10, 1.20, 1.30] as const)[Math.min(n, 3)], inputs: [],
}

/** Golden Lootbug: Golden Lootbug Chance +2% / +4% / +6% */
export const cardGoldenLootbug: Source = {
  key: 'cards.goldenLootbug', name: 'Card: Golden Lootbug', system: 'cards',
  maxLevel: 3, fn: (n) => ([0, 0.02, 0.04, 0.06] as const)[Math.min(n, 3)], inputs: [],
}

/** Golden Ore: Golden Ore Multi ×1.06 / ×1.12 / ×1.24 */
export const cardGoldenOre: Source = {
  key: 'cards.goldenOre', name: 'Card: Golden Ore', system: 'cards',
  maxLevel: 3, fn: (n) => ([1, 1.06, 1.12, 1.24] as const)[Math.min(n, 3)], inputs: [],
}

/** Golden Vein: Golden Vein Multi ×1.08 / ×1.16 / ×1.24 */
export const cardGoldenVein: Source = {
  key: 'cards.goldenVein', name: 'Card: Golden Vein', system: 'cards',
  maxLevel: 3, fn: (n) => ([1, 1.08, 1.16, 1.24] as const)[Math.min(n, 3)], inputs: [],
}

/** Rainbow Vein: Rainbow Vein Multi ×1.08 / ×1.16 / ×1.24 */
export const cardRainbowVein: Source = {
  key: 'cards.rainbowVein', name: 'Card: Rainbow Vein', system: 'cards',
  maxLevel: 3, fn: (n) => ([1, 1.08, 1.16, 1.24] as const)[Math.min(n, 3)], inputs: [],
}

/** Fuel: Coal/Drone Fuel Duration ×1.02 / ×1.05 / ×1.10 */
export const cardFuel: Source = {
  key: 'cards.fuel', name: 'Card: Fuel', system: 'cards',
  maxLevel: 3, fn: (n) => ([1, 1.02, 1.05, 1.10] as const)[Math.min(n, 3)], inputs: [],
}

/** Code: Item Duration ×1.01 / ×1.03 / ×1.06 */
export const cardCode: Source = {
  key: 'cards.code', name: 'Card: Code', system: 'cards',
  maxLevel: 3, fn: (n) => ([1, 1.01, 1.03, 1.06] as const)[Math.min(n, 3)], inputs: [],
}

/** Void Portal: Void Portal Multi ×1.05 / ×1.10 / ×1.20 */
export const cardVoidPortal: Source = {
  key: 'cards.voidPortal', name: 'Card: Void Portal', system: 'cards',
  maxLevel: 3, fn: (n) => ([1, 1.05, 1.10, 1.20] as const)[Math.min(n, 3)], inputs: [],
}

/** Golden Void Portal: Golden Void Portal Multi ×1.08 / ×1.16 / ×1.24 */
export const cardGoldenVoidPortal: Source = {
  key: 'cards.goldenVoidPortal', name: 'Card: Golden Void Portal', system: 'cards',
  maxLevel: 3, fn: (n) => ([1, 1.08, 1.16, 1.24] as const)[Math.min(n, 3)], inputs: [],
}

/** Freebie: Gems From Freebie +1 / +2 / +4 */
export const cardFreebie: Source = {
  key: 'cards.freebie', name: 'Card: Freebie', system: 'cards',
  maxLevel: 3, fn: (n) => ([0, 1, 2, 4] as const)[Math.min(n, 3)], inputs: [],
}

/** Super Star: All Star Value ×1.05 / ×1.10 / ×1.20 */
export const cardSuperStar: Source = {
  key: 'cards.superStar', name: 'Card: Super Star', system: 'cards',
  maxLevel: 3, fn: (n) => ([1, 1.05, 1.10, 1.20] as const)[Math.min(n, 3)], inputs: [],
}

/** Miner Name: Experience Gain ×1.10 / ×1.20 / ×1.40 */
export const cardMinerName: Source = {
  key: 'cards.minerName', name: 'Card: Miner Name', system: 'cards',
  maxLevel: 3, fn: (n) => ([1, 1.10, 1.20, 1.40] as const)[Math.min(n, 3)], inputs: [],
}

/** Stonks: Stonks Multi ×1.10 / ×1.20 / ×1.30 */
export const cardStonks: Source = {
  key: 'cards.stonks', name: 'Card: Stonks', system: 'cards',
  maxLevel: 3, fn: (n) => ([1, 1.10, 1.20, 1.30] as const)[Math.min(n, 3)], inputs: [],
}

/** Super Stonks: Super Stonks Chance +0.50% / +1% / +2% */
export const cardSuperStonks: Source = {
  key: 'cards.superStonks', name: 'Card: Super Stonks', system: 'cards',
  maxLevel: 3, fn: (n) => ([0, 0.005, 0.01, 0.02] as const)[Math.min(n, 3)], inputs: [],
}

/** Prestige: Floor Clear Requirement ×0.95 / ×0.90 / ×0.80 */
export const cardPrestige: Source = {
  key: 'cards.prestige', name: 'Card: Prestige', system: 'cards',
  maxLevel: 3, fn: (n) => ([1, 0.95, 0.90, 0.80] as const)[Math.min(n, 3)], inputs: [],
}

/** Yummy Pizza (card): All Floor Multi ×1.01 / ×1.02 / ×1.03 */
export const cardYummyPizza: Source = {
  key: 'cards.yummyPizza', name: 'Card: Yummy Pizza', system: 'cards',
  maxLevel: 3, fn: (n) => ([1, 1.01, 1.02, 1.03] as const)[Math.min(n, 3)], inputs: [],
}

/** Lootfrog (card): Lootfrog Capacity +1 / +2 / +4 */
export const cardLootfrog: Source = {
  key: 'cards.lootfrog', name: 'Card: Lootfrog', system: 'cards',
  maxLevel: 3, fn: (n) => ([0, 1, 2, 4] as const)[Math.min(n, 3)], inputs: [],
}

/** FrozenAra: 10× Contract Chance +0.10% / +0.20% / +0.30% */
export const cardFrozenAra: Source = {
  key: 'cards.frozenAra', name: 'Card: FrozenAra', system: 'cards',
  maxLevel: 3, fn: (n) => ([0, 0.001, 0.002, 0.003] as const)[Math.min(n, 3)], inputs: [],
}

/** Fishing Rod: Fishing Rod Power ×1.02 / ×1.05 / ×1.10 */
export const cardFishingRod: Source = {
  key: 'cards.fishingRod', name: 'Card: Fishing Rod', system: 'cards',
  maxLevel: 3, fn: (n) => ([1, 1.02, 1.05, 1.10] as const)[Math.min(n, 3)], inputs: [],
}

export const cardSources = {
  cardNagini,
  cardAlex, cardBone,
  cardWorld1, cardWorld2, cardWorld3, cardWorld4,
  cardCeliosHat, cardJulk,
  cardLootbug, cardGoldenLootbug,
  cardGoldenOre, cardGoldenVein, cardRainbowVein,
  cardFuel, cardCode,
  cardVoidPortal, cardGoldenVoidPortal,
  cardFreebie, cardSuperStar, cardMinerName,
  cardStonks, cardSuperStonks,
  cardPrestige, cardYummyPizza,
  cardLootfrog, cardFrozenAra, cardFishingRod,
}

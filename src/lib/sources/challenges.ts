import type { Source } from '$lib/engine/types'

// ─── Regular Challenge Rewards ────────────────────────────────────────────────

export const chPickaxeSuperCritDmg: Source = {
  key: 'challenges.pickaxeSuperCritDmg', name: 'Challenge: Pickaxe Super Crit Damage', system: 'challenges',
  maxLevel: 3, fn: (n) => n * 0.10, inputs: [],
}
export const chExpPrestigePts: Source = {
  key: 'challenges.expPrestigePts', name: 'Challenge: EXP & Prestige Points', system: 'challenges',
  maxLevel: 3, fn: (n) => n * 0.10, inputs: [],
}
export const chBombCap: Source = {
  key: 'challenges.bombCap', name: 'Challenge: Bomb Capacity', system: 'challenges',
  maxLevel: 1, fn: (n) => n * 3, inputs: [],
}
export const chBombCritDmg: Source = {
  key: 'challenges.bombCritDmg', name: 'Challenge: Bomb Crit Damage', system: 'challenges',
  maxLevel: 3, fn: (n) => n * 0.20, inputs: [],
}
export const chOreSellPrice: Source = {
  key: 'challenges.oreSellPrice', name: 'Challenge: Ore Sell Price', system: 'challenges',
  maxLevel: 3, fn: (n) => n * 0.15, inputs: [],
}
export const chDoubleCraft: Source = {
  key: 'challenges.doubleCraft', name: 'Challenge: Double Craft Chance', system: 'challenges',
  maxLevel: 3, fn: (n) => n * 0.03, inputs: [],
}
/** Regular: Bomb Super Crit Chance +25% (one-time) */
export const chBombSuperCrit: Source = {
  key: 'challenges.bombSuperCrit', name: 'Challenge: Bomb Super Crit Chance', system: 'challenges',
  maxLevel: 1, fn: (n) => n * 0.25, inputs: [],
}
/** Regular: Bomb Ultra Crit Chance +5% (paired with above) */
export const chBombUltraCritRegular: Source = {
  key: 'challenges.bombUltraCritRegular', name: 'Challenge: Bomb Ultra Crit Chance (Regular)', system: 'challenges',
  maxLevel: 1, fn: (n) => n * 0.05, inputs: [],
}
export const chPickaxeSuperCritChance: Source = {
  key: 'challenges.pickaxeSuperCritChance', name: 'Challenge: Pickaxe Super Crit Chance', system: 'challenges',
  maxLevel: 3, fn: (n) => n * 0.02, inputs: [],
}
export const chGoldenVeinMul: Source = {
  key: 'challenges.goldenVeinMul', name: 'Challenge: Golden Vein Multi', system: 'challenges',
  maxLevel: 3, fn: (n) => n * 0.05, inputs: [],
}
export const chFreebieGemsBonus: Source = {
  key: 'challenges.freebieGemsBonus', name: 'Challenge: Gems from Freebie Pack', system: 'challenges',
  maxLevel: 1, fn: (n) => n, inputs: [],
}

// ─── Extreme Challenge Rewards ────────────────────────────────────────────────

export const chGoldenFloorMul: Source = {
  key: 'challenges.goldenFloorMul', name: 'Extreme Challenge: Golden Floor Multi', system: 'challenges',
  maxLevel: 2, fn: (n) => n * 1.0, inputs: [],
}
export const chSuperStarSpawn: Source = {
  key: 'challenges.superStarSpawn', name: 'Extreme Challenge: Super Star Spawn Rate', system: 'challenges',
  maxLevel: 1, fn: (n) => n * 0.10, inputs: [],
}
export const chRainbowFloorMulExtreme: Source = {
  key: 'challenges.rainbowFloorMulExtreme', name: 'Extreme Challenge: Rainbow Floor Multi', system: 'challenges',
  maxLevel: 3, fn: (n) => n * 0.05, inputs: [],
}
export const chBombUltraCritExtreme: Source = {
  key: 'challenges.bombUltraCritExtreme', name: 'Extreme Challenge: Bomb Ultra Crit Chance', system: 'challenges',
  maxLevel: 3, fn: (n) => n * 0.04, inputs: [],
}
export const chFreebieBank: Source = {
  key: 'challenges.freebieBank', name: 'Extreme Challenge: Banked Freebie Cap', system: 'challenges',
  maxLevel: 1, fn: (n) => n, inputs: [],
}

// ─── Divine Challenge Rewards ─────────────────────────────────────────────────

export const chGoldenOreChance: Source = {
  key: 'challenges.goldenOreChance', name: 'Divine Challenge: Golden Ore Chance', system: 'challenges',
  maxLevel: 1, fn: (n) => n * 0.01, inputs: [],
}
export const chSuperStonksChance: Source = {
  key: 'challenges.superStonksChance', name: 'Divine Challenge: Super Stonks Chance', system: 'challenges',
  maxLevel: 1, fn: (n) => n * 0.01, inputs: [],
}

export const challengeSources = {
  chPickaxeSuperCritDmg, chExpPrestigePts, chBombCap, chBombCritDmg,
  chOreSellPrice, chDoubleCraft, chBombSuperCrit, chBombUltraCritRegular,
  chPickaxeSuperCritChance, chGoldenVeinMul, chFreebieGemsBonus,
  chGoldenFloorMul, chSuperStarSpawn, chRainbowFloorMulExtreme,
  chBombUltraCritExtreme, chFreebieBank,
  chGoldenOreChance, chSuperStonksChance,
}

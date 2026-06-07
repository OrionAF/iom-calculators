import type { Source } from '$lib/engine/types'

// Relics are owned in counts — fn(count) = count × per_relic_bonus.
// Counts can be very large (uncapped relics reach thousands).
// Values from iom_wiki/pages/Chests.json "List of relics" section.

// ─── Common Relics ────────────────────────────────────────────────────────────

/** Common: Pickaxe Damage +3% per relic. Uncapped. */
export const commonRelicPickaxeDamage: Source = { key: 'relics.common.pickaxeDamage', name: 'Common Relic – Pickaxe Damage', system: 'relics', fn: (n) => n * 0.03, inputs: [] }
/** Common: Ore Sell Price +3% per relic. Uncapped. */
export const commonRelicOreSell: Source = { key: 'relics.common.oreSell', name: 'Common Relic – Ore Sell Price', system: 'relics', fn: (n) => n * 0.03, inputs: [] }
/** Common: Bomb Crit Chance +1% per relic. Cap 100. */
export const commonRelicBombCrit: Source = { key: 'relics.common.bombCrit', name: 'Common Relic – Bomb Crit Chance', system: 'relics', maxLevel: 100, fn: (n) => n * 0.01, inputs: [] }
/** Common: Experience Gain +1% per relic. Cap 10,000. */
export const commonRelicExp: Source = { key: 'relics.common.exp', name: 'Common Relic – Experience Gain', system: 'relics', maxLevel: 10000, fn: (n) => n * 0.01, inputs: [] }
/** Common: Bomb Crit Damage +1% per relic. Cap 10,000. */
export const commonRelicBombCritDamage: Source = { key: 'relics.common.bombCritDamage', name: 'Common Relic – Bomb Crit Damage', system: 'relics', maxLevel: 10000, fn: (n) => n * 0.01, inputs: [] }

// ─── Rare Relics ──────────────────────────────────────────────────────────────

/** Rare: Bomb Damage +20% per relic. Uncapped. */
export const rareRelicBombDamage: Source = { key: 'relics.rare.bombDamage', name: 'Rare Relic – Bomb Damage', system: 'relics', fn: (n) => n * 0.20, inputs: [] }
/** Rare: Experience Gain +3% per relic. Uncapped. */
export const rareRelicExp: Source = { key: 'relics.rare.exp', name: 'Rare Relic – Experience Gain', system: 'relics', fn: (n) => n * 0.03, inputs: [] }
/** Rare: Triple Rock Chance +1% per relic. Cap 100. */
export const rareRelicTripleRock: Source = { key: 'relics.rare.tripleRock', name: 'Rare Relic – Triple Rock Chance', system: 'relics', maxLevel: 100, fn: (n) => n * 0.01, inputs: [] }
/** Rare: Contract Bar Reduction +2% per relic. Cap 25,000. */
export const rareRelicContractBar: Source = { key: 'relics.rare.contractBar', name: 'Rare Relic – Contract Cost Reduction', system: 'relics', maxLevel: 25000, fn: (n) => n * 0.02, inputs: [] }
/** Rare: Fuel Duration +0.01% per relic. Cap 2,500. */
export const rareRelicFuelDuration: Source = { key: 'relics.rare.fuelDuration', name: 'Rare Relic – Fuel Duration', system: 'relics', maxLevel: 2500, fn: (n) => n * 0.0001, inputs: [] }

// ─── Epic Relics ──────────────────────────────────────────────────────────────

/** Epic: Pickaxe Damage +10% per relic. Uncapped. */
export const epicRelicPickaxeDamage: Source = { key: 'relics.epic.pickaxeDamage', name: 'Epic Relic – Pickaxe Damage', system: 'relics', fn: (n) => n * 0.10, inputs: [] }
/** Epic: Bomb Recharge Speed +2% per relic. Cap 250. */
export const epicRelicBombRecharge: Source = { key: 'relics.epic.bombRecharge', name: 'Epic Relic – Bomb Recharge Speed', system: 'relics', maxLevel: 250, fn: (n) => n * 0.02, inputs: [] }
/** Epic: Multi Chest Chance (Chance For 2x Chests) +2% per relic. Cap 50. */
export const epicRelicChestDouble: Source = { key: 'relics.epic.chestDouble', name: 'Epic Relic – Multi Chest Chance', system: 'relics', maxLevel: 50, fn: (n) => n * 0.02, inputs: [] }
/** Epic: Bomb Capacity +1 per relic. Cap 2,500. */
export const epicRelicBombCapacity: Source = { key: 'relics.epic.bombCapacity', name: 'Epic Relic – Bomb Capacity', system: 'relics', maxLevel: 2500, fn: (n) => n, inputs: [] }
/** Epic: Golden Floor Multi +0.10% per relic. Cap 500. */
export const epicRelicGoldenFloor: Source = { key: 'relics.epic.goldenFloor', name: 'Epic Relic – Golden Floor Multi', system: 'relics', maxLevel: 500, fn: (n) => n * 0.001, inputs: [] }

// ─── Legendary Relics ────────────────────────────────────────────────────────

/** Legendary: 5x Craft Chance +1% per relic. Cap 100. */
export const legendaryRelicCraft5x: Source = { key: 'relics.legendary.craft5x', name: 'Legendary Relic – 5x Craft Chance', system: 'relics', maxLevel: 100, fn: (n) => n * 0.01, inputs: [] }
/** Legendary: Prestige Point Gain +15% per relic. Uncapped. */
export const legendaryRelicPrestigePts: Source = { key: 'relics.legendary.prestigePts', name: 'Legendary Relic – Prestige Points', system: 'relics', fn: (n) => n * 0.15, inputs: [] }
/** Legendary: Obelisk Fight Length +12% per relic. Cap 100. */
export const legendaryRelicObeliskTimer: Source = { key: 'relics.legendary.obeliskTimer', name: 'Legendary Relic – Obelisk Fight Length', system: 'relics', maxLevel: 100, fn: (n) => n * 0.12, inputs: [] }
/** Legendary: Vein Income Multiplier +0.10% per relic. Cap 500. */
export const legendaryRelicVeinIncome: Source = { key: 'relics.legendary.veinIncome', name: 'Legendary Relic – Vein Income', system: 'relics', maxLevel: 500, fn: (n) => n * 0.001, inputs: [] }
/** Legendary: Star Spawn Rate +0.10% per relic. Cap 300. */
export const legendaryRelicStarSpawn: Source = { key: 'relics.legendary.starSpawn', name: 'Legendary Relic – Star Spawn Rate', system: 'relics', maxLevel: 300, fn: (n) => n * 0.001, inputs: [] }

// ─── Mythic Relics ────────────────────────────────────────────────────────────

/** Mythic: 20x Craft Chance +1% per relic. Cap 100. */
export const mythicRelicCraft20x: Source = { key: 'relics.mythic.craft20x', name: 'Mythic Relic – 20x Craft Chance', system: 'relics', maxLevel: 100, fn: (n) => n * 0.01, inputs: [] }
/** Mythic: All Bomb Multipliers +5x per relic. Uncapped. */
export const mythicRelicBombMulti: Source = { key: 'relics.mythic.bombMulti', name: 'Mythic Relic – All Bomb Multipliers', system: 'relics', fn: (n) => n * 5, inputs: [] }
/** Mythic: Golden Floor Chance +5% per relic. Cap 20. */
export const mythicRelicGoldenFloorChance: Source = { key: 'relics.mythic.goldenFloorChance', name: 'Mythic Relic – Golden Floor Chance', system: 'relics', maxLevel: 20, fn: (n) => n * 0.05, inputs: [] }
/** Mythic: Pet Level Up Chance +0.50% per relic. Cap 50. */
export const mythicRelicPetLevelup: Source = { key: 'relics.mythic.petLevelup', name: 'Mythic Relic – Pet Level Up Chance', system: 'relics', maxLevel: 50, fn: (n) => n * 0.005, inputs: [] }
/** Mythic: Star Supernova Chance +0.10% per relic. Cap 100. */
export const mythicRelicNovaChance: Source = { key: 'relics.mythic.novaChance', name: 'Mythic Relic – Star Supernova Chance', system: 'relics', maxLevel: 100, fn: (n) => n * 0.001, inputs: [] }

// ─── Divine Relics ────────────────────────────────────────────────────────────
// Divine relics have a base cap of 5, extendable to 26 total.

/** Divine: Rainbow Floor Chance +1% per relic. Uncapped. */
export const divineRelicRainbowFloor: Source = { key: 'relics.divine.rainbowFloor', name: 'Divine Relic – Rainbow Floor Chance', system: 'relics', fn: (n) => n * 0.01, inputs: [] }
/** Divine: Supernova Multipliers +2x per relic (both star and super star). Cap 5 base, extendable. */
export const divineRelicSupernovaMul: Source = { key: 'relics.divine.supernovaMul', name: 'Divine Relic – Supernova Multipliers', system: 'relics', fn: (n) => n * 2, inputs: [] }
/** Divine: Rainbow Floor Multi +20% per relic. Cap 5. */
export const divineRelicRainbowFloorMul: Source = { key: 'relics.divine.rainbowFloorMul', name: 'Divine Relic – Rainbow Floor Multi', system: 'relics', fn: (n) => n * 0.20, inputs: [] }
/** Divine: Fishing Ticks 5x Chance +2% per relic. Cap 5. */
export const divineRelicFishing5xTick: Source = { key: 'relics.divine.fishing5xTick', name: 'Divine Relic – 5x Fishing Tick Chance', system: 'relics', fn: (n) => n * 0.02, inputs: [] }
/** Divine: Rainbow Portal Chance +0.50% per relic. Cap 5. */
export const divineRelicRainbowPortal: Source = { key: 'relics.divine.rainbowPortal', name: 'Divine Relic – Rainbow Portal Chance', system: 'relics', fn: (n) => n * 0.005, inputs: [] }

export const relicSources = {
  commonRelicPickaxeDamage,
  commonRelicOreSell,
  commonRelicBombCrit,
  commonRelicExp,
  commonRelicBombCritDamage,
  rareRelicBombDamage,
  rareRelicExp,
  rareRelicTripleRock,
  rareRelicContractBar,
  rareRelicFuelDuration,
  epicRelicPickaxeDamage,
  epicRelicBombRecharge,
  epicRelicChestDouble,
  epicRelicBombCapacity,
  epicRelicGoldenFloor,
  legendaryRelicCraft5x,
  legendaryRelicPrestigePts,
  legendaryRelicObeliskTimer,
  legendaryRelicVeinIncome,
  legendaryRelicStarSpawn,
  mythicRelicCraft20x,
  mythicRelicBombMulti,
  mythicRelicGoldenFloorChance,
  mythicRelicPetLevelup,
  mythicRelicNovaChance,
  divineRelicRainbowFloor,
  divineRelicSupernovaMul,
  divineRelicRainbowFloorMul,
  divineRelicFishing5xTick,
  divineRelicRainbowPortal,
}

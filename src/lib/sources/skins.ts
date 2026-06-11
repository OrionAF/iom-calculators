import type { Source } from '$lib/engine/types'

// ─── Skin Rewards ────────────────────────────────────────────────

export const snMythicChanceFromRelicT1: Source = {
  key: 'skins.MythicChanceFromRelicT1',
  name: 'Skins: Mythic Chance From Relic 1/98 (1/22)',
  system: 'skins',
  maxLevel: 1,
  fn: (n) => n * 1,
  inputs: [],
}
export const snPrestigePointGain: Source = {
  key: 'skins.PrestigePointGain',
  name: 'Skins: Prestige Point Gain +20% (2/22)',
  system: 'skins',
  maxLevel: 1,
  fn: (n) => n * 0.2,
  inputs: [],
}
export const snExpGain: Source = {
  key: 'skins.ExpGain',
  name: 'Skins: Experience Gain +25% (3/22)',
  system: 'skins',
  maxLevel: 1,
  fn: (n) => n * 0.25,
  inputs: [],
}
export const snFloorClearReq: Source = {
  key: 'skins.FloorClearReq',
  name: 'Skins: Floor Clear Requirement -8% (4/22)',
  system: 'skins',
  maxLevel: 1,
  fn: (n) => n * -0.08,
  inputs: [],
}
export const snOreSellPrice: Source = {
  key: 'skins.OreSellPrice',
  name: 'Skins: Ore Sell Price +30% (5/22)',
  system: 'skins',
  maxLevel: 1,
  fn: (n) => n * 0.3,
  inputs: [],
}
export const snLootbugGemPrice: Source = {
  key: 'skins.LootbugGemPrice',
  name: 'Skins: Lootbug Gem Price -1 (6/22)',
  system: 'skins',
  maxLevel: 1,
  fn: (n) => n * -1,
  inputs: [],
}
export const snMythicChanceFromRelicT2: Source = {
  key: 'skins.MythicChanceFromRelicT2',
  name: 'Skins: Mythic Chance From Relic 1/93 (7/22)',
  system: 'skins',
  maxLevel: 1,
  fn: (n) => n * 1,
  inputs: [],
}
export const snBoPmultiT1: Source = {
  key: 'skins.BoPmultiT1',
  name: 'Skins: Bomb of Plenty Multi +4× (8/22)',
  system: 'skins',
  maxLevel: 1,
  fn: (n) => n * 4.0,
  inputs: [],
}
export const snTripleContractChance: Source = {
  key: 'skins.TripleContractChance',
  name: 'Skins: Triple Contract Chance +3% (9/22)',
  system: 'skins',
  maxLevel: 1,
  fn: (n) => n * 0.03,
  inputs: [],
}
export const snGameSpeedT1: Source = {
  key: 'skins.GameSpeedT1',
  name: 'Skins: Game Speed +3% (10/22)',
  system: 'skins',
  maxLevel: 1,
  fn: (n) => n * 0.03,
  inputs: [],
}
export const snTripleLootbugChance: Source = {
  key: 'skins.TripleLootbugChance',
  name: 'Skins: Triple Lootbug Chance +5% (11/22)',
  system: 'skins',
  maxLevel: 1,
  fn: (n) => n * 0.05,
  inputs: [],
}
export const snPetLevelUpChance: Source = {
  key: 'skins.PetLevelUpChance',
  name: 'Skins: Pet Level Up Chance +4% (12/22)',
  system: 'skins',
  maxLevel: 1,
  fn: (n) => n * 0.04,
  inputs: [],
}
export const snBombCapacity: Source = {
  key: 'skins.BombCapacity',
  name: 'Skins: Bomb Capacity +10% (13/22)',
  system: 'skins',
  maxLevel: 1,
  fn: (n) => n * 0.1,
  inputs: [],
}
export const snBankedFreebies: Source = {
  key: 'skins.BankedFreebies',
  name: 'Skins: Banked Freebies +2 (14/22)',
  system: 'skins',
  maxLevel: 1,
  fn: (n) => n * 2,
  inputs: [],
}
export const snBoPmultiT2: Source = {
  key: 'skins.BoPmultiT2',
  name: 'Skins: Bomb of Plenti Multi +6× (15/22)',
  system: 'skins',
  maxLevel: 1,
  fn: (n) => n * 6.0,
  inputs: [],
}
export const snDroneGradeExpGain: Source = {
  key: 'skins.DroneGradeExpGain',
  name: 'Skins: Drone Grade Exp Gain 1.35× (16/22)',
  system: 'skins',
  maxLevel: 1,
  fn: (n) => n * 1.35,
  inputs: [],
}
export const snAllFloorMulti: Source = {
  key: 'skins.AllFloorMulti',
  name: 'Skins: All Floor Multipliers 1.15× (17/22)',
  system: 'skins',
  maxLevel: 1,
  fn: (n) => 1 + n * 0.15,
  inputs: [],
}
export const snGameSpeedT2: Source = {
  key: 'skins.GameSpeedT2',
  name: 'Skins: Game Speed +5% (18/22)',
  system: 'skins',
  maxLevel: 1,
  fn: (n) => n * 0.05,
  inputs: [],
}
export const snGemBombGemChance: Source = {
  key: 'skins.GemBombGemChance',
  name: 'Skins: Gem Bomb Gem Chance +1% (19/22)',
  system: 'skins',
  maxLevel: 1,
  fn: (n) => n * 0.01,
  inputs: [],
}
export const snStonksMulti: Source = {
  key: 'skins.StonksMulti',
  name: 'Skins: Stonks Multiplier +12% (20/22)',
  system: 'skins',
  maxLevel: 1,
  fn: (n) => n * 0.12,
  inputs: [],
}
export const snBankedFreebiesLootbugs: Source = {
  key: 'skins.BankedFreebiesLootbugs',
  name: 'Skins: Banked Freebies/Lootbugs +10% (21/22)',
  system: 'skins',
  maxLevel: 1,
  fn: (n) => n * 0.1,
  inputs: [],
}
export const snUnlockItemGoldenChaosTotem: Source = {
  key: 'skins.UnlockItemGoldenChaosTotem',
  name: 'Skins: Unlock Golden Chaos Totem (22/22)',
  system: 'skins',
  maxLevel: 1,
  fn: (n) => n * 1,
  inputs: [],
}
export const snBagSkins: Source = {
  key: 'skins.BagSkins',
  name: 'Skins: Bag Skins +3% Item Duration and Bomb Capacity per set',
  system: 'skins',
  maxLevel: 8,
  fn: (n) => n * 0.03,
  inputs: [],
}

export const skinsSources = {
  snMythicChanceFromRelicT1,
  snOreSellPrice,
  snMythicChanceFromRelicT2,
  snPrestigePointGain,
  snExpGain,
  snFloorClearReq,
  snLootbugGemPrice,
  snBoPmultiT1,
  snTripleContractChance,
  snGameSpeedT1,
  snTripleLootbugChance,
  snPetLevelUpChance,
  snBombCapacity,
  snBankedFreebies,
  snBoPmultiT2,
  snDroneGradeExpGain,
  snAllFloorMulti,
  snGameSpeedT2,
  snGemBombGemChance,
  snStonksMulti,
  snBankedFreebiesLootbugs,
  snUnlockItemGoldenChaosTotem,
  snBagSkins,
}

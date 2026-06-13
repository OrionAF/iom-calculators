import type { Op, Source } from '$lib/engine/types'

// Skin reward sources (binary unlocks; Bag Skins scales per set owned). statKey/op
// mirror the formula wiring (consistency test enforces op where used). The reward
// that feeds two stats keeps its primary statKey and adds a sibling sharing the
// key. Reduction-convention sources (floor clear, lootbug gem price) use a
// signed fn matching the original.

const sn = (
  key: string,
  name: string,
  maxLevel: number,
  statKey: string | undefined,
  op: Op | undefined,
  fn: Source['fn'],
): Source => ({
  key: `skins.${key}`,
  name,
  system: 'skins',
  maxLevel,
  statKey,
  op,
  fn,
  inputs: [],
})

// ─── Skin Rewards ────────────────────────────────────────────────

// Unwired: mythic-chance-from-relic has no matching registry stat.
export const snMythicChanceFromRelicT1 = sn('MythicChanceFromRelicT1', 'Skins: Mythic Chance From Relic 1/98 (1/22)', 1, undefined, undefined, (n) => n * 1)
export const snPrestigePointGain = sn('PrestigePointGain', 'Skins: Prestige Point Gain +20% (2/22)', 1, 'prestige_point_multi', '×1+', (n) => n * 0.2)
export const snExpGain = sn('ExpGain', 'Skins: Experience Gain +25% (3/22)', 1, 'experience_multi', '×1+', (n) => n * 0.25)
export const snFloorClearReq = sn('FloorClearReq', 'Skins: Floor Clear Requirement -8% (4/22)', 1, 'floor_clear_requirement_multi', '×1+', (n) => n * -0.08)
export const snOreSellPrice = sn('OreSellPrice', 'Skins: Ore Sell Price +30% (5/22)', 1, 'ore_sell_price_multi', '×1+', (n) => n * 0.3)
export const snLootbugGemPrice = sn('LootbugGemPrice', 'Skins: Lootbug Gem Price -1 (6/22)', 1, 'lootbug_gem_cost_reduction', '+', (n) => n * -1)
export const snMythicChanceFromRelicT2 = sn('MythicChanceFromRelicT2', 'Skins: Mythic Chance From Relic 1/93 (7/22)', 1, undefined, undefined, (n) => n * 1)
export const snBoPmultiT1 = sn('BoPmultiT1', 'Skins: Bomb of Plenty Multi +4× (8/22)', 1, 'bomb_of_plenty_multi', '+', (n) => n * 4.0)
export const snTripleContractChance = sn('TripleContractChance', 'Skins: Triple Contract Chance +3% (9/22)', 1, 'contract_triple_points_chance', '+', (n) => n * 0.03)
export const snGameSpeedT1 = sn('GameSpeedT1', 'Skins: Game Speed +3% (10/22)', 1, 'game_speed_multi', '+', (n) => n * 0.03)
export const snTripleLootbugChance = sn('TripleLootbugChance', 'Skins: Triple Lootbug Chance +5% (11/22)', 1, 'lootbug_triple_chance', '+', (n) => n * 0.05)
export const snPetLevelUpChance = sn('PetLevelUpChance', 'Skins: Pet Level Up Chance +4% (12/22)', 1, 'pet_levelup_chance_multi', '×1+', (n) => n * 0.04)
export const snBombCapacity = sn('BombCapacity', 'Skins: Bomb Capacity +10% (13/22)', 1, 'bomb_cap_multiplier', '×1+', (n) => n * 0.1)
export const snBankedFreebies = sn('BankedFreebies', 'Skins: Banked Freebies +2 (14/22)', 1, 'freebie_bank_cap', '+', (n) => n * 2)
export const snBoPmultiT2 = sn('BoPmultiT2', 'Skins: Bomb of Plenti Multi +6× (15/22)', 1, 'bomb_of_plenty_multi', '+', (n) => n * 6.0)
// Unwired: drone grade exp gain has no unambiguous registry stat.
export const snDroneGradeExpGain = sn('DroneGradeExpGain', 'Skins: Drone Grade Exp Gain 1.35× (16/22)', 1, undefined, undefined, (n) => n * 1.35)
export const snAllFloorMulti = sn('AllFloorMulti', 'Skins: All Floor Multipliers 1.15× (17/22)', 1, 'all_floor_multipliers', '×', (n) => 1 + n * 0.15)
export const snGameSpeedT2 = sn('GameSpeedT2', 'Skins: Game Speed +5% (18/22)', 1, 'game_speed_multi', '+', (n) => n * 0.05)
export const snGemBombGemChance = sn('GemBombGemChance', 'Skins: Gem Bomb Gem Chance +1% (19/22)', 1, 'gem_bomb_gem_chance', '+', (n) => n * 0.01)
export const snStonksMulti = sn('StonksMulti', 'Skins: Stonks Multiplier +12% (20/22)', 1, 'stonks_multi', '×1+', (n) => n * 0.12)
// Banked Freebies/Lootbugs feeds both bank-cap stats.
export const snBankedFreebiesLootbugs = sn('BankedFreebiesLootbugs', 'Skins: Banked Freebies/Lootbugs +10% (21/22)', 1, 'freebie_bank_cap', '×1+', (n) => n * 0.1)
export const snBankedFreebiesLootbugsBug = sn('BankedFreebiesLootbugs', 'Skins: Banked Freebies/Lootbugs +10% (21/22)', 1, 'lootbug_bank_cap', '×1+', (n) => n * 0.1)
// Unwired: item unlock, no stat key.
export const snUnlockItemGoldenChaosTotem = sn('UnlockItemGoldenChaosTotem', 'Skins: Unlock Golden Chaos Totem (22/22)', 1, undefined, undefined, (n) => n * 1)
// Unwired: Bag Skins boosts two effects per set; no single registry stat.
export const snBagSkins = sn('BagSkins', 'Skins: Bag Skins +3% Item Duration and Bomb Capacity per set', 8, undefined, undefined, (n) => n * 0.03)

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
  snBankedFreebiesLootbugsBug,
  snUnlockItemGoldenChaosTotem,
  snBagSkins,
}

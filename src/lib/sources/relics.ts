import type { Op, Source } from '$lib/engine/types'

// Relics are owned in counts — fn(count) = count × per_relic_bonus. Counts can be
// very large (uncapped relics reach thousands); uncapped relics pass maxLevel
// undefined. statKey/op mirror the formula wiring (consistency test enforces op
// where used). A source feeding two stats keeps its primary statKey and adds a
// sibling object sharing the key for the second stat.
// Values from iom_wiki/pages/Chests.json "List of relics".

const rel = (
  key: string,
  name: string,
  maxLevel: number | undefined,
  statKey: string | undefined,
  op: Op | undefined,
  fn: Source['fn'],
): Source => ({
  key: `relics.${key}`,
  name,
  system: 'relics',
  maxLevel,
  statKey,
  op,
  fn,
  inputs: [],
})

// ─── Common Relics ────────────────────────────────────────────────────────────

export const commonRelicPickaxeDamage = rel('common.pickaxeDamage', 'Common Relic – Pickaxe Damage', undefined, 'pickaxe_damage', '+', (n) => n * 0.03)
export const commonRelicOreSell = rel('common.oreSell', 'Common Relic – Ore Sell Price', undefined, 'ore_sell_price_multi', '+', (n) => n * 0.03)
export const commonRelicBombCrit = rel('common.bombCrit', 'Common Relic – Bomb Crit Chance', 100, 'bomb_crit_chance', '+', (n) => n * 0.01)
export const commonRelicExp = rel('common.exp', 'Common Relic – Experience Gain', 10000, 'experience_multi', '+', (n) => n * 0.01)
export const commonRelicBombCritDamage = rel('common.bombCritDamage', 'Common Relic – Bomb Crit Damage', 10000, 'bomb_crit_damage', '+', (n) => n * 0.01)

// ─── Rare Relics ──────────────────────────────────────────────────────────────

export const rareRelicBombDamage = rel('rare.bombDamage', 'Rare Relic – Bomb Damage', undefined, 'bomb_damage', '×1+', (n) => n * 0.2)
export const rareRelicExp = rel('rare.exp', 'Rare Relic – Experience Gain', undefined, 'experience_multi', '+', (n) => n * 0.03)
export const rareRelicTripleRock = rel('rare.tripleRock', 'Rare Relic – Triple Rock Chance', 100, 'multi_rock_chance', '+', (n) => n * 0.01)
// Unwired: contract bar cost reduction, no unambiguous registry stat.
export const rareRelicContractBar = rel('rare.contractBar', 'Rare Relic – Contract Cost Reduction', 25000, undefined, undefined, (n) => n * 0.02)
export const rareRelicFuelDuration = rel('rare.fuelDuration', 'Rare Relic – Fuel Duration', 2500, 'coal_fuel_duration_multi', '+', (n) => n * 0.0001)

// ─── Epic Relics ──────────────────────────────────────────────────────────────

export const epicRelicPickaxeDamage = rel('epic.pickaxeDamage', 'Epic Relic – Pickaxe Damage', undefined, 'pickaxe_damage', '+', (n) => n * 0.1)
export const epicRelicBombRecharge = rel('epic.bombRecharge', 'Epic Relic – Bomb Recharge Speed', 250, 'bomb_recharge_speed', '+', (n) => n * 0.02)
// Unwired: multi-chest chance, no unambiguous registry stat.
export const epicRelicChestDouble = rel('epic.chestDouble', 'Epic Relic – Multi Chest Chance', 50, undefined, undefined, (n) => n * 0.02)
export const epicRelicBombCapacity = rel('epic.bombCapacity', 'Epic Relic – Bomb Capacity', 2500, 'bomb_capacity', '+', (n) => n)
export const epicRelicGoldenFloor = rel('epic.goldenFloor', 'Epic Relic – Golden Floor Multi', 500, 'golden_floor_multi', '+', (n) => n * 0.001)

// ─── Legendary Relics ────────────────────────────────────────────────────────

export const legendaryRelicCraft5x = rel('legendary.craft5x', 'Legendary Relic – 5x Craft Chance', 100, 'craft_5x_chance', '+', (n) => n * 0.01)
export const legendaryRelicPrestigePts = rel('legendary.prestigePts', 'Legendary Relic – Prestige Points', undefined, 'prestige_point_multi', '+', (n) => n * 0.15)
// Unwired: obelisk fight length, no unambiguous registry stat.
export const legendaryRelicObeliskTimer = rel('legendary.obeliskTimer', 'Legendary Relic – Obelisk Fight Length', 100, undefined, undefined, (n) => n * 0.12)
// Vein Income feeds two stats: primary vein_income_multi + sibling golden_vein_multi.
export const legendaryRelicVeinIncome = rel('legendary.veinIncome', 'Legendary Relic – Vein Income', 500, 'vein_income_multi', '+', (n) => n * 0.001)
export const legendaryRelicVeinIncomeGolden = rel('legendary.veinIncome', 'Legendary Relic – Vein Income', 500, 'golden_vein_multi', '+', (n) => n * 0.001)
export const legendaryRelicStarSpawn = rel('legendary.starSpawn', 'Legendary Relic – Star Spawn Rate', 300, 'star_spawn_rate', '+', (n) => n * 0.001)

// ─── Mythic Relics ────────────────────────────────────────────────────────────

export const mythicRelicCraft20x = rel('mythic.craft20x', 'Mythic Relic – 20x Craft Chance', 100, 'craft_20x_chance', '+', (n) => n * 0.01)
export const mythicRelicBombMulti = rel('mythic.bombMulti', 'Mythic Relic – All Bomb Multipliers', undefined, 'bomb_additional_multiplier', '+', (n) => n * 5)
export const mythicRelicGoldenFloorChance = rel('mythic.goldenFloorChance', 'Mythic Relic – Golden Floor Chance', 20, 'golden_floor_chance', '+', (n) => n * 0.05)
export const mythicRelicPetLevelup = rel('mythic.petLevelup', 'Mythic Relic – Pet Level Up Chance', 50, 'pet_levelup_chance_multi', '+', (n) => n * 0.005)
export const mythicRelicNovaChance = rel('mythic.novaChance', 'Mythic Relic – Star Supernova Chance', 100, 'star_supernova_chance', '+', (n) => n * 0.001)
// Unwired: polychrome vein card multi, no unambiguous registry stat.
export const mythicRelicPolyVeinCard = rel('mythic.polyVeinCard', 'Mythic Relic – Polychrome Vein Card Multi', 500, undefined, undefined, (n) => n * 0.0005)

// ─── Divine Relics ────────────────────────────────────────────────────────────
// Base cap of 5, extendable to 26 total.

export const divineRelicRainbowFloor = rel('divine.rainbowFloor', 'Divine Relic – Rainbow Floor Chance', undefined, 'rainbow_floor_chance', '+', (n) => n * 0.01)
// Supernova Multipliers feed two stats: primary star + sibling super-star.
export const divineRelicSupernovaMul = rel('divine.supernovaMul', 'Divine Relic – Supernova Multipliers', undefined, 'star_supernova_multi', '+', (n) => n * 2)
export const divineRelicSupernovaMulSuper = rel('divine.supernovaMul', 'Divine Relic – Supernova Multipliers', undefined, 'super_star_supernova_multi', '+', (n) => n * 2)
export const divineRelicRainbowFloorMul = rel('divine.rainbowFloorMul', 'Divine Relic – Rainbow Floor Multi', undefined, 'rainbow_floor_multi', '+', (n) => n * 0.2)
// Unwired: 5x fishing tick chance, no unambiguous registry stat.
export const divineRelicFishing5xTick = rel('divine.fishing5xTick', 'Divine Relic – 5x Fishing Tick Chance', undefined, undefined, undefined, (n) => n * 0.02)
export const divineRelicRainbowPortal = rel('divine.rainbowPortal', 'Divine Relic – Rainbow Portal Chance', undefined, 'rainbow_void_portal_chance', '+', (n) => n * 0.005)

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
  legendaryRelicVeinIncomeGolden,
  legendaryRelicStarSpawn,
  mythicRelicCraft20x,
  mythicRelicBombMulti,
  mythicRelicGoldenFloorChance,
  mythicRelicPetLevelup,
  mythicRelicNovaChance,
  mythicRelicPolyVeinCard,
  divineRelicRainbowFloor,
  divineRelicSupernovaMul,
  divineRelicSupernovaMulSuper,
  divineRelicRainbowFloorMul,
  divineRelicFishing5xTick,
  divineRelicRainbowPortal,
}

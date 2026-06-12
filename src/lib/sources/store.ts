import type { Op, Source } from '$lib/engine/types'

// Store sources own all store effect numbers (fn, maxLevel, statKey, op).
// src/lib/store/catalog.ts references these sources for presentation;
// it holds no values of its own.
// Value packs and perks are binary (owned=1, not-owned=0).
// Gem upgrades are leveled (fn scales with level).
// Founder tier effects are leveled: level = current founder tier (0–12).

const store = (key: string, name: string, maxLevel: number, statKey: string, op: Op, fn: Source['fn']): Source => ({
  key: `store.${key}`,
  name: `${name}`,
  system: 'store',
  maxLevel,
  statKey,
  op: op,
  fn,
  inputs: [],
})

// ─── Perks (binary owned/not) ─────────────────────────────────────────────────

/** Perk: 2x Ore Income. op='×' → fn(1)=2 */
export const storePerkOreIncome = store('perk.oreIncome', '2x Ore Income (Perk)', 1, 'ore_income_multi', '×', (o) => 1 + o * 1)
/** Perk: 2x Prestige Point Income. op='×' */
export const storePerkPrestigePts = store('perk.prestigePts', '2x Prestige Point Income (Perk)', 1, 'prestige_point_multi', '×', (o) => 1 + o * 1)
/** Perk: 2x Bar Income. op='×' */
export const storePerkBarOutput = store('perk.barOutput', '2x Bar Income (Perk)', 1, 'bar_output_multi', '×', (o) => 1 + o * 1)
/** Perk: 3x Bomb Damage. op='×' */
export const storePerkBombDamage = store('perk.bombDamage', '3x Bomb Damage (Perk)', 1, 'bomb_damage', '×', (o) => 1 + o * 2)

// ─── Gem Upgrades (leveled) ───────────────────────────────────────────────────

/** Gem Upgrade: Pickaxe Damage +0.20× per level (×1.20 at lvl 1). op='×' max 22. */
export const storeGemPickaxeDamage = store('gem.pickaxeDamage', 'Gem Upgrade – Pickaxe Damage', 22, 'pickaxe_damage', '×', (l) => 1 + l * 0.2)
/** Gem Upgrade: Bomb Damage +20% per level. op='+' max 22. */
export const storeGemBombDamage = store('gem.bombDamage', 'Gem Upgrade – Bomb Damage', 22, 'bomb_damage', '×1+', (l) => l * 0.2)
/** Gem Upgrade: Bomb Capacity +2 per level. op='+' max 22. */
export const storeGemBombCapacity = store('gem.bombCapacity', 'Gem Upgrade – Bomb Capacity', 22, 'bomb_capacity', '+', (l) => l * 2)
/** Gem Upgrade: Banked Freebie Cap +1 per level. op='+' max 14. */
export const storeGemFreebieBank = store('gem.freebieBank', 'Gem Upgrade – Banked Freebie Cap', 14, 'freebie_bank_cap', '+', (l) => l)
/** Gem Upgrade: Chest Meter Fill Rate ×5 per level (compounding). op='×' max 17. */
export const storeGemChestMeter = store('gem.chestMeter', 'Gem Upgrade – Chest Meter Fill Rate', 17, 'chest_meter_multi', '×', (l) => Math.pow(5, l))
/** Gem Upgrade: Items Contained In Chests +1 per level. op='+' max 17. */
export const storeGemItemsInChests = store('gem.itemsInChests', 'Gem Upgrade – Items In Chests', 17, 'chest_items_bonus', '+', (l) => l)
/** Gem Upgrade: Ore Sell Price ×2 per level (stacking multiply). op='×' max 14. */
export const storeGemOreSellPrice = store('gem.oreSellPrice', 'Gem Upgrade – Ore Sell Price', 14, 'ore_sell_price_multi', '×', (l) => 1 + l * 1.0)

// ─── Founder Tier Effects (level = current founder tier 0–12) ───────────────
// All founder effects share key 'store.founder', so one progress value (the
// tier) drives every effect. Each effect activates at its unlock tier and
// scales via base + tiers_above × increment.

const founderFn = (unlockTier: number, base: number, incr: number) => (tier: number) => {
  if (tier < unlockTier) return 0
  return base + (tier - unlockTier) * incr
}

/** Founder Tier 1: Supply Drop Cooldown. Base 60s, -2s per tier. op='+'. */
export const storeFounderSupplyDropCd = store('founder', 'Founder Bundle (Supply Drop Cooldown)', 12, 'founder_supply_drop_cd', '+', founderFn(1, 60, -2))
/** Founder Tier 2: Double Supply Drop Chance. Base 12% (0.12), +6% per tier. op='+'. */
export const storeFounderDoubleSupplyDrop = store('founder', 'Founder Bundle (Double Supply Drop Chance)', 12, 'founder_double_supply_drop_chance', '+', founderFn(2, 0.12, 0.06))
/** Founder Tier 3: 10x Craft Chance. Base 2% (0.02), +1% per tier. op='+'. */
export const storeFounderCraft10x = store('founder', 'Founder Bundle (10x Craft Chance)', 12, 'craft_10x_chance', '+', founderFn(3, 0.02, 0.01))
/** Founder Tier 4: Bomb of Plenty Multi. Base 2, +1 per tier. op='+'. */
export const storeFounderBomBofPlenty = store('founder', 'Founder Bundle (Bomb of Plenty Multi)', 12, 'bomb_of_plenty_multi', '+', founderFn(4, 2, 1))
/** Founder Tier 5: Golden Lootbug Chance. Base 6% (0.06), +3% per tier. op='+'. */
export const storeFounderGoldenLootbug = store('founder', 'Founder Bundle (Golden Lootbug Chance)', 12, 'lootbug_golden_chance', '+', founderFn(5, 0.06, 0.03))
/** Founder Tier 6: Banked Freebie Cap. Base 4, +2 per tier. op='+'. */
export const storeFounderFreebieBank = store('founder', 'Founder Bundle (Banked Freebie Cap)', 12, 'freebie_bank_cap', '+', founderFn(6, 4, 2))
/** Founder Tier 7: Triple Supply Drop Chance. Base 16% (0.16), +8% per tier. op='+'. */
export const storeFounderTripleSupplyDrop = store('founder', 'Founder Bundle (Triple Supply Drop Chance)', 12, 'founder_triple_supply_drop_chance', '+', founderFn(7, 0.16, 0.08))
/** Founder Tier 8: Gems From Freebie. Base 2, +1 per tier. op='+'. */
export const storeFounderFreebieGems = store('founder', 'Founder Bundle (Gems From Freebie)', 12, 'freebie_gems_bonus', '+', founderFn(8, 2, 1))
/** Founder Tier 9: Rainbow Floor Chance. Base 1% (0.01), +1% per tier. op='+'. */
export const storeFounderRainbowFloor = store('founder', 'Founder Bundle (Rainbow Floor Chance)', 12, 'rainbow_floor_chance', '+', founderFn(9, 0.01, 0.01))
/** Founder Tier 10: Game Speed. Base 10% (0.10), +1% per tier. op='+'. */
export const storeFounderGameSpeed = store('founder', 'Founder Bundle (Game Speed)', 12, 'game_speed_multi', '+', founderFn(10, 0.1, 0.01))
/** Founder Tier 11: Golden Supply Drop Chance. Base 10% (0.10), +2% per tier. op='+'. */
export const storeFounderGoldenSupplyDrop = store('founder', 'Founder Bundle (Golden Supply Drop Chance)', 12, 'founder_golden_supply_drop_chance', '+', founderFn(11, 0.1, 0.02))
/** Founder Tier 12: Gem Bomb Gem Chance. Base 0.5% (0.005), +0.5% per tier. op='+'. */
export const storeFounderGemBombGemChance = store('founder', 'Founder Bundle (Gem Bomb Gem Chance)', 12, 'gem_bomb_gem_chance', '+', founderFn(12, 0.005, 0.005))

// ─── Value Packs (binary owned) ───────────────────────────────────────────────

// Additive helper: fn(1) = v, fn(0) = 0
const add = (v: number) => (o: number) => o * v
// Multiplicative helper: fn(1) = factor, fn(0) = 1
const mul = (v: number) => (o: number) => 1 + o * (v - 1)

export const storeVpDroneCount = store('vp.permanentDronePack', 'Permanent Drone Pack', 1, 'drone_count', '+', add(1))
export const storeVpFreebie5xChance = store('vp.investmentPackage', 'Investment Package!', 1, 'freebie_5x_chance', '+', add(0.05))
export const storeVpBankersFreebieBank = store('vp.bankersBundle', "Banker's Bundle!", 1, 'freebie_bank_cap', '+', add(3))
export const storeVpBankersLootbugBank = store('vp.bankersBundle', "Banker's Bundle!", 1, 'lootbug_bank_cap', '+', add(3))
export const storeVpBankersFreebieGems = store('vp.bankersBundle', "Banker's Bundle!", 1, 'freebie_gems_bonus', '+', add(1))
export const storeVpBankersFreebie5x = store('vp.bankersBundle', "Banker's Bundle!", 1, 'freebie_5x_chance', '+', add(0.01))
export const storeVpGottaGoFastGameSpeed = store('vp.gottaGoFast', 'Gotta Go Fast Bundle!', 1, 'game_speed_multi', '+', add(0.1))
export const storeVpGoldenLootbug = store('vp.goldenLootbugBundle', 'Golden Lootbug Bundle!', 1, 'lootbug_golden_chance', '+', add(0.2))
export const storeVpBiggerBankersFreebieBank = store('vp.biggerBankersBundle', "Bigger Banker's Bundle!", 1, 'freebie_bank_cap', '+', add(5))
export const storeVpBiggerBankersLootbugBank = store('vp.biggerBankersBundle', "Bigger Banker's Bundle!", 1, 'lootbug_bank_cap', '+', add(5))
export const storeVpBiggerBankersFreebieGems = store('vp.biggerBankersBundle', "Bigger Banker's Bundle!", 1, 'freebie_gems_bonus', '+', add(1))
export const storeVpBiggerBankersRefresh = store('vp.biggerBankersBundle', "Bigger Banker's Bundle!", 1, 'freebie_refresh_chance', '+', add(0.01))
export const storeVpBallerOreSell = store('vp.ballerSkinBundle', 'Baller Skin Bundle!', 1, 'ore_sell_price_multi', '×', mul(2))
export const storeVpPetTrainerPetLevel = store('vp.petTrainerBundle', 'Pet Trainer Bundle!', 1, 'pet_levelup_chance_multi', '×', mul(1.2))
export const storeVpPetTrainerVeinSpawn = store('vp.petTrainerBundle', 'Pet Trainer Bundle!', 1, 'vein_spawn_rate_multi', '×', mul(1.1))
export const storeVpPetTrainerExp = store('vp.petTrainerBundle', 'Pet Trainer Bundle!', 1, 'experience_multi', '×', mul(2.0))
export const storeVpPetTrainerRainbowFloor = store('vp.petTrainerBundle', 'Pet Trainer Bundle!', 1, 'rainbow_floor_chance', '+', add(0.01))
export const storeVpVeinExtractorVeinIncome = store('vp.veinExtractorBundle', 'Vein Extractor Bundle!', 1, 'vein_income_multi', '×', mul(1.15))
export const storeVpVeinExtractorGoldenVeinChance = store('vp.veinExtractorBundle', 'Vein Extractor Bundle!', 1, 'golden_vein_chance', '+', add(0.05))
export const storeVpVeinExtractorRainbowVeinChance = store('vp.veinExtractorBundle', 'Vein Extractor Bundle!', 1, 'rainbow_vein_chance', '+', add(0.02))
export const storeVpVeinExtractorGoldenVeinMul = store('vp.veinExtractorBundle', 'Vein Extractor Bundle!', 1, 'golden_vein_multi', '×', mul(1.25))
export const storeVpSupernovaStarNova = store('vp.stargazingSupernovaBundle', 'Stargazing Supernova Bundle!', 1, 'star_supernova_chance', '+', add(0.03))
export const storeVpSupernovaSuperStarNova = store('vp.stargazingSupernovaBundle', 'Stargazing Supernova Bundle!', 1, 'super_star_supernova_chance', '+', add(0.03))
export const storeVpSupernovaStarNovaMul = store('vp.stargazingSupernovaBundle', 'Stargazing Supernova Bundle!', 1, 'star_supernova_multi', '+', add(1.1))
export const storeVpSupernovaSuperStarNovaMul = store('vp.stargazingSupernovaBundle', 'Stargazing Supernova Bundle!', 1, 'super_star_supernova_multi', '+', add(1.1))
export const storeVpSupernovaTripleStar = store('vp.stargazingSupernovaBundle', 'Stargazing Supernova Bundle!', 1, 'star_triple_spawn_chance', '+', add(0.03))
export const storeVpSupernovaTripleSuperStar = store('vp.stargazingSupernovaBundle', 'Stargazing Supernova Bundle!', 1, 'super_star_triple_chance', '+', add(0.03))
export const storeVpCapitalistFreebieGems = store('vp.capitalistBundle', 'Capitalist Bundle!', 1, 'freebie_gems_bonus', '+', add(2))
export const storeVpArchFreebieGems = store('vp.archaeologyBundle', 'Archaeology Bundle!', 1, 'freebie_gems_bonus', '+', add(1))
export const storeVpArchFragmentGain = store('vp.archaeologyBundle', 'Archaeology Bundle!', 1, 'archaeology_fragment_gain_multi', '×', mul(1.25))
export const storeVpProgressionGoldenFloor = store('vp.progressionBoosterBundle', 'Progression Booster Bundle!', 1, 'golden_floor_multi', '×', mul(1.2))
export const storeVpProgressionVeinIncome = store('vp.progressionBoosterBundle', 'Progression Booster Bundle!', 1, 'vein_income_multi', '×', mul(1.15))
export const storeVpProgressionBombRecharge = store('vp.progressionBoosterBundle', 'Progression Booster Bundle!', 1, 'bomb_recharge_speed', '×', mul(1.1))
export const storeVpProgressionTripleStar = store('vp.progressionBoosterBundle', 'Progression Booster Bundle!', 1, 'star_triple_spawn_chance', '+', add(0.05))
export const storeVpBomberBombRecharge = store('vp.bomberExtraordinaireBundle', 'Bomber Extraordinaire Bundle!', 1, 'bomb_recharge_speed', '×', mul(1.1))
export const storeVpBomberBombCapacity = store('vp.bomberExtraordinaireBundle', 'Bomber Extraordinaire Bundle!', 1, 'bomb_capacity', '×', mul(1.1))
export const storeVpBomberBopMulti = store('vp.bomberExtraordinaireBundle', 'Bomber Extraordinaire Bundle!', 1, 'bomb_of_plenty_multi', '+', add(5))
export const storeVpBomberTransmuterMulti = store('vp.bomberExtraordinaireBundle', 'Bomber Extraordinaire Bundle!', 1, 'bomb_transmuter_multi', '+', add(10))
export const storeVpLootbugBonanzaLootMul = store('vp.lootbugBonanzaBundle', 'Lootbug Bonanza Bundle!', 1, 'lootbug_loot_multi', '×', mul(1.2))
export const storeVpLootbugBonanzaBankCap = store('vp.lootbugBonanzaBundle', 'Lootbug Bonanza Bundle!', 1, 'lootbug_bank_cap', '+', add(10))
export const storeVpInsiderStonksMul = store('vp.insiderTradingBundle', 'Insider Trading Bundle!', 1, 'stonks_multi', '+', add(2))
export const storeVpInsiderFreebieBank = store('vp.insiderTradingBundle', 'Insider Trading Bundle!', 1, 'freebie_bank_cap', '+', add(2))
export const storeVpCraftmaster100xCraft = store('vp.craftmasterBundle', 'Craftmaster Bundle!', 1, 'craft_100x_chance', '+', add(0.01))
export const storeVpCraftmaster10xCraft = store('vp.craftmasterBundle', 'Craftmaster Bundle!', 1, 'craft_10x_chance', '+', add(0.02))
export const storeVpCraftmasterFreeCraft = store('vp.craftmasterBundle', 'Craftmaster Bundle!', 1, 'free_craft_chance', '+', add(0.02))
export const storeVpCraftmasterBarCraft = store('vp.craftmasterBundle', 'Craftmaster Bundle!', 1, 'bar_craft_cost_multi', '+', add(0.05))
export const storeVpDroneCatalystExp = store('vp.droneCatalystBundle', 'Drone Catalyst Bundle!', 1, 'coal_drone_exp_multi', '×', mul(1.35))
export const storeVpDroneCatalystFuel = store('vp.droneCatalystBundle', 'Drone Catalyst Bundle!', 1, 'coal_fuel_duration_multi', '×', mul(1.1))
export const storeVpFishersTripleTick = store('vp.fishersBundle', "Fisher's Bundle!", 1, 'fishing_triple_tick_chance', '+', add(0.1))
export const storeVpAnglersNotice = store('vp.anglersBundle', "Angler's Bundle!", 1, 'fishing_tiny_notice_chance', '+', add(0.06))
export const storeVpSingularityAllStar = store('vp.singularityBundle', 'Singularity Bundle!', 1, 'all_star_multi', '×', mul(1.1))
export const storeVpSingularitySupergiantChance = store('vp.singularityBundle', 'Singularity Bundle!', 1, 'star_supergiant_chance', '+', add(0.03))
export const storeVpSingularityNovagiant = store('vp.singularityBundle', 'Singularity Bundle!', 1, 'novagiant_combo_multi', '×', mul(1.1))
export const storeVpSingularity10xSuperStar = store('vp.singularityBundle', 'Singularity Bundle!', 1, 'super_star_10x_chance', '+', add(0.03))
export const storeVpVoidOverdriveVoidMul = store('vp.voidOverdriveBundle', 'Void Overdrive Bundle!', 1, 'void_portal_base_multi', '×', mul(1.1))
export const storeVpVoidOverdriveGoldenPortalMul = store('vp.voidOverdriveBundle', 'Void Overdrive Bundle!', 1, 'golden_void_portal_multi', '×', mul(1.1))
export const storeVpVoidOverdriveGoldenPortalChance = store('vp.voidOverdriveBundle', 'Void Overdrive Bundle!', 1, 'golden_void_portal_chance', '+', add(0.02))
export const storeVpVoidOverdriveFuel = store('vp.voidOverdriveBundle', 'Void Overdrive Bundle!', 1, 'coal_fuel_duration_multi', '×', mul(1.1))
export const storeVpFrogFrenzyLootfrogMul = store('vp.frogFrenzyBundle', 'Frog Frenzy Bundle!', 1, 'lootfrog_loot_multi', '×', mul(1.2))
export const storeVpFrogFrenzyTriple = store('vp.frogFrenzyBundle', 'Frog Frenzy Bundle!', 1, 'lootfrog_triple_spawn_chance', '+', add(0.03))
export const storeVpFrogFrenzyCapacity = store('vp.frogFrenzyBundle', 'Frog Frenzy Bundle!', 1, 'lootfrog_capacity', '+', add(2))
export const storeVpLegendaryHauler5xTick = store('vp.legendaryHaulerBundle', 'Legendary Hauler Bundle!', 1, 'fishing_5x_tick_chance', '+', add(0.03))
export const storeVpLegendaryHaulerFishIncome = store('vp.legendaryHaulerBundle', 'Legendary Hauler Bundle!', 1, 'fishing_income_multi', '×', mul(1.1))
export const storeVpLegendaryHaulerTier2Dock = store('vp.legendaryHaulerBundle', 'Legendary Hauler Bundle!', 1, 'fishing_tier2_dock_multi', '×', mul(1.1))
export const storeVpChiefExecSuperStonksChance = store('vp.chiefExecutiveBundle', 'Chief Executive Bundle!', 1, 'super_stonks_chance', '+', add(0.02))
export const storeVpChiefExecSuperStonksMul = store('vp.chiefExecutiveBundle', 'Chief Executive Bundle!', 1, 'super_stonks_multi', '×', mul(1.15))
export const storeVpChiefExecFreebieGems = store('vp.chiefExecutiveBundle', 'Chief Executive Bundle!', 1, 'freebie_gems_bonus', '+', add(4))
export const storeVpChiefExecFreebieBank = store('vp.chiefExecutiveBundle', 'Chief Executive Bundle!', 1, 'freebie_bank_cap', '×', mul(1.1))
export const storeVpGoldenOreChance = store('vp.goldenOreBundle', 'Golden Ore Bundle!', 1, 'golden_ore_chance', '+', add(0.03))
export const storeVpGoldenOreMul = store('vp.goldenOreBundle', 'Golden Ore Bundle!', 1, 'golden_ore_multi', '×', mul(1.25))
export const storeVpSupergiants3StarsChance = store('vp.stargazingSupergiantBundle', 'Stargazing Supergiant Bundle!', 1, 'star_supergiant_chance', '+', add(0.03))
export const storeVpSupergiants3SuperStarsChance = store('vp.stargazingSupergiantBundle', 'Stargazing Supergiant Bundle!', 1, 'super_star_supergiant_chance', '+', add(0.03))
export const storeVpSupergiants3StarMul = store('vp.stargazingSupergiantBundle', 'Stargazing Supergiant Bundle!', 1, 'star_supergiant_multi', '×', mul(1.1))
export const storeVpSupergiants3TripleStar = store('vp.stargazingSupergiantBundle', 'Stargazing Supergiant Bundle!', 1, 'star_triple_spawn_chance', '+', add(0.03))
export const storeVpSupergiants10xSuperStar = store('vp.stargazingSupergiantBundle', 'Stargazing Supergiant Bundle!', 1, 'super_star_10x_chance', '+', add(0.01))

// ─── Ascension Bundle (new in V2.1.1) ───────────────────────────────────────
export const storeVpAscensionArchExp = store('vp.ascensionBundle', 'Ascension Bundle!', 1, 'archaeology_exp_gain_multi', '×', mul(1.15))
export const storeVpAscensionAutoTap = store('vp.ascensionBundle', 'Ascension Bundle!', 1, 'archaeology_crosshair_auto_tap', '+', add(0.05))
export const storeVpAscensionLootMod = store('vp.ascensionBundle', 'Ascension Bundle!', 1, 'archaeology_lood_mod_chance', '+', add(0.02))
export const storeVpAscensionGoldenCrosshair = store('vp.ascensionBundle', 'Ascension Bundle!', 1, 'archaeology_golden_crosshair_chance', '+', add(0.02))

// ─── Polychrome Potency Bundle ───────────────────────────────────────────────
export const storeVpPolyPotencyOre = store('vp.polychromePotencyBundle', 'Polychrome Potency Bundle!', 1, 'polychrome_card_bonus_ore', '×', mul(1.15))
export const storeVpPolyPotencyVein = store('vp.polychromePotencyBundle', 'Polychrome Potency Bundle!', 1, 'polychrome_card_bonus_vein', '×', mul(1.15))
export const storeVpPolyPotencyStar = store('vp.polychromePotencyBundle', 'Polychrome Potency Bundle!', 1, 'polychrome_card_bonus_star', '×', mul(1.15))
export const storeVpPolyPotencyFish = store('vp.polychromePotencyBundle', 'Polychrome Potency Bundle!', 1, 'polychrome_card_bonus_fish', '×', mul(1.15))

// ─── Capitalist Bundle (second effect) ───────────────────────────────────────
export const storeVpCapitalistRelicChance = store('vp.capitalistBundle', 'Capitalist Bundle!', 1, 'freebie_chance_for_bonus_relic', '+', add(0.15))

// ─── Skill Surge Bundle ───────────────────────────────────────────────────────
export const storeVpSkillSurgeSkillShard = store('vp.skillSurgeBundle', 'Skill Surge Bundle!', 1, 'freebie_chance_for_skill_shard', '+', add(0.01))
export const storeVpHalfWayRainbowFloorMul = store('vp.halfWayBundle', 'Half Way Bundle!', 1, 'rainbow_floor_multi', '×', mul(1.1))
export const storeVpHalfWayNovagiant = store('vp.halfWayBundle', 'Half Way Bundle!', 1, 'novagiant_combo_multi', '×', mul(1.1))
export const storeVpHalfWayFishingRod = store('vp.halfWayBundle', 'Half Way Bundle!', 1, 'fishing_rod_power', '×', mul(1.1))
export const storeVpHalfWayFreebieGems = store('vp.halfWayBundle', 'Half Way Bundle!', 1, 'freebie_gems_bonus', '+', add(2))

export const storeSources = {
  // Perks
  storePerkOreIncome,
  storePerkPrestigePts,
  storePerkBarOutput,
  storePerkBombDamage,
  // Gem upgrades
  storeGemPickaxeDamage,
  storeGemBombDamage,
  storeGemBombCapacity,
  storeGemFreebieBank,
  storeGemChestMeter,
  storeGemItemsInChests,
  storeGemOreSellPrice,
  // Founder
  storeFounderSupplyDropCd,
  storeFounderDoubleSupplyDrop,
  storeFounderCraft10x,
  storeFounderBomBofPlenty,
  storeFounderGoldenLootbug,
  storeFounderFreebieBank,
  storeFounderTripleSupplyDrop,
  storeFounderFreebieGems,
  storeFounderRainbowFloor,
  storeFounderGameSpeed,
  storeFounderGoldenSupplyDrop,
  storeFounderGemBombGemChance,
  // Value packs
  storeVpDroneCount,
  storeVpFreebie5xChance,
  storeVpBankersFreebieBank,
  storeVpBankersLootbugBank,
  storeVpBankersFreebieGems,
  storeVpBankersFreebie5x,
  storeVpGottaGoFastGameSpeed,
  storeVpGoldenLootbug,
  storeVpBiggerBankersFreebieBank,
  storeVpBiggerBankersLootbugBank,
  storeVpBiggerBankersFreebieGems,
  storeVpBiggerBankersRefresh,
  storeVpBallerOreSell,
  storeVpPetTrainerPetLevel,
  storeVpPetTrainerVeinSpawn,
  storeVpPetTrainerExp,
  storeVpPetTrainerRainbowFloor,
  storeVpVeinExtractorVeinIncome,
  storeVpVeinExtractorGoldenVeinChance,
  storeVpVeinExtractorRainbowVeinChance,
  storeVpVeinExtractorGoldenVeinMul,
  storeVpSupernovaStarNova,
  storeVpSupernovaSuperStarNova,
  storeVpSupernovaStarNovaMul,
  storeVpSupernovaSuperStarNovaMul,
  storeVpSupernovaTripleStar,
  storeVpSupernovaTripleSuperStar,
  storeVpCapitalistFreebieGems,
  storeVpArchFreebieGems,
  storeVpArchFragmentGain,
  storeVpProgressionGoldenFloor,
  storeVpProgressionVeinIncome,
  storeVpProgressionBombRecharge,
  storeVpProgressionTripleStar,
  storeVpBomberBombRecharge,
  storeVpBomberBombCapacity,
  storeVpBomberBopMulti,
  storeVpBomberTransmuterMulti,
  storeVpLootbugBonanzaLootMul,
  storeVpLootbugBonanzaBankCap,
  storeVpInsiderStonksMul,
  storeVpInsiderFreebieBank,
  storeVpCraftmaster100xCraft,
  storeVpCraftmaster10xCraft,
  storeVpCraftmasterFreeCraft,
  storeVpCraftmasterBarCraft,
  storeVpDroneCatalystExp,
  storeVpDroneCatalystFuel,
  storeVpFishersTripleTick,
  storeVpAnglersNotice,
  storeVpSingularityAllStar,
  storeVpSingularitySupergiantChance,
  storeVpSingularityNovagiant,
  storeVpSingularity10xSuperStar,
  storeVpVoidOverdriveVoidMul,
  storeVpVoidOverdriveGoldenPortalMul,
  storeVpVoidOverdriveGoldenPortalChance,
  storeVpVoidOverdriveFuel,
  storeVpFrogFrenzyLootfrogMul,
  storeVpFrogFrenzyTriple,
  storeVpFrogFrenzyCapacity,
  storeVpLegendaryHauler5xTick,
  storeVpLegendaryHaulerFishIncome,
  storeVpLegendaryHaulerTier2Dock,
  storeVpChiefExecSuperStonksChance,
  storeVpChiefExecSuperStonksMul,
  storeVpChiefExecFreebieGems,
  storeVpChiefExecFreebieBank,
  storeVpGoldenOreChance,
  storeVpGoldenOreMul,
  storeVpSupergiants3StarsChance,
  storeVpSupergiants3SuperStarsChance,
  storeVpSupergiants3StarMul,
  storeVpSupergiants3TripleStar,
  storeVpSupergiants10xSuperStar,
  storeVpHalfWayRainbowFloorMul,
  storeVpHalfWayNovagiant,
  storeVpHalfWayFishingRod,
  storeVpHalfWayFreebieGems,
  // New bundles
  storeVpAscensionArchExp,
  storeVpAscensionAutoTap,
  storeVpAscensionLootMod,
  storeVpAscensionGoldenCrosshair,
  storeVpPolyPotencyOre,
  storeVpPolyPotencyVein,
  storeVpPolyPotencyStar,
  storeVpPolyPotencyFish,
  storeVpCapitalistRelicChance,
  storeVpSkillSurgeSkillShard,
}

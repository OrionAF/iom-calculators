import type { Source } from '$lib/engine/types'

// Store sources own all store effect numbers (fn, maxLevel, statKey, op).
// src/lib/store/catalog.ts references these sources for presentation;
// it holds no values of its own.
// Value packs and perks are binary (owned=1, not-owned=0).
// Gem upgrades are leveled (fn scales with level).
// Founder tier effects are leveled: level = current founder tier (0–12).

// ─── Perks (binary owned/not) ─────────────────────────────────────────────────

/** Perk: 2x Ore Income. op='×' → fn(1)=2 */
export const perkOreIncome: Source = { key: 'store.perk.oreIncome', name: '2x Ore Income (Perk)', system: 'store', maxLevel: 1, statKey: 'ore_income_multi', op: '×', fn: (o) => 1 + o * 1, inputs: [] }
/** Perk: 2x Prestige Point Income. op='×' */
export const perkPrestigePts: Source = { key: 'store.perk.prestigePts', name: '2x Prestige Point Income (Perk)', system: 'store', maxLevel: 1, statKey: 'prestige_point_multi', op: '×', fn: (o) => 1 + o * 1, inputs: [] }
/** Perk: 2x Bar Income. op='×' */
export const perkBarOutput: Source = { key: 'store.perk.barOutput', name: '2x Bar Income (Perk)', system: 'store', maxLevel: 1, statKey: 'bar_output_multi', op: '×', fn: (o) => 1 + o * 1, inputs: [] }
/** Perk: 3x Bomb Damage. op='×' */
export const perkBombDamage: Source = { key: 'store.perk.bombDamage', name: '3x Bomb Damage (Perk)', system: 'store', maxLevel: 1, statKey: 'bomb_damage', op: '×', fn: (o) => 1 + o * 2, inputs: [] }

// ─── Gem Upgrades (leveled) ───────────────────────────────────────────────────

/** Gem Upgrade: Pickaxe Damage +0.20× per level (×1.20 at lvl 1). op='×' max 22. */
export const gemPickaxeDamage: Source = { key: 'store.gem.pickaxeDamage', name: 'Gem Upgrade – Pickaxe Damage', system: 'store', maxLevel: 22, statKey: 'pickaxe_damage', op: '×', fn: (l) => 1 + l * 0.20, inputs: [] }
/** Gem Upgrade: Bomb Damage +20% per level. op='+' max 22. */
export const gemBombDamage: Source = { key: 'store.gem.bombDamage', name: 'Gem Upgrade – Bomb Damage', system: 'store', maxLevel: 22, statKey: 'bomb_damage', op: '+', fn: (l) => l * 0.20, inputs: [] }
/** Gem Upgrade: Bomb Capacity +2 per level. op='+' max 22. */
export const gemBombCapacity: Source = { key: 'store.gem.bombCapacity', name: 'Gem Upgrade – Bomb Capacity', system: 'store', maxLevel: 22, statKey: 'bomb_capacity', op: '+', fn: (l) => l * 2, inputs: [] }
/** Gem Upgrade: Banked Freebie Cap +1 per level. op='+' max 14. */
export const gemFreebieBank: Source = { key: 'store.gem.freebieBank', name: 'Gem Upgrade – Banked Freebie Cap', system: 'store', maxLevel: 14, statKey: 'freebie_bank_cap', op: '+', fn: (l) => l, inputs: [] }
/** Gem Upgrade: Chest Meter Fill Rate ×5 per level (compounding). op='×' max 17. */
export const gemChestMeter: Source = { key: 'store.gem.chestMeter', name: 'Gem Upgrade – Chest Meter Fill Rate', system: 'store', maxLevel: 17, statKey: 'chest_meter_multi', op: '×', fn: (l) => Math.pow(5, l), inputs: [] }
/** Gem Upgrade: Items Contained In Chests +1 per level. op='+' max 17. */
export const gemItemsInChests: Source = { key: 'store.gem.itemsInChests', name: 'Gem Upgrade – Items In Chests', system: 'store', maxLevel: 17, statKey: 'chest_items_bonus', op: '+', fn: (l) => l, inputs: [] }
/** Gem Upgrade: Ore Sell Price ×2 per level (stacking multiply). op='×' max 14. */
export const gemOreSellPrice: Source = { key: 'store.gem.oreSellPrice', name: 'Gem Upgrade – Ore Sell Price', system: 'store', maxLevel: 14, statKey: 'ore_sell_price_multi', op: '×', fn: (l) => 1 + l * 1.0, inputs: [] }

// ─── Founder Tier Effects (level = current founder tier 0–12) ───────────────
// All founder effects share key 'store.founder', so one progress value (the
// tier) drives every effect. Each effect activates at its unlock tier and
// scales via base + tiers_above × increment.

const founderFn = (unlockTier: number, base: number, incr: number) =>
  (tier: number) => {
    if (tier < unlockTier) return 0
    return base + (tier - unlockTier) * incr
  }

/** Founder Tier 1: Supply Drop Cooldown. Base 60s, -2s per tier. op='+'. */
export const founderSupplyDropCd: Source = { key: 'store.founder', name: 'Founder Bundle (Supply Drop Cooldown)', system: 'store', maxLevel: 12, statKey: 'founder_supply_drop_cd', op: '+', fn: founderFn(1, 60, -2), inputs: [] }
/** Founder Tier 2: Double Supply Drop Chance. Base 12% (0.12), +6% per tier. op='+'. */
export const founderDoubleSupplyDrop: Source = { key: 'store.founder', name: 'Founder Bundle (Double Supply Drop Chance)', system: 'store', maxLevel: 12, statKey: 'founder_double_supply_drop_chance', op: '+', fn: founderFn(2, 0.12, 0.06), inputs: [] }
/** Founder Tier 3: 10x Craft Chance. Base 2% (0.02), +1% per tier. op='+'. */
export const founderCraft10x: Source = { key: 'store.founder', name: 'Founder Bundle (10x Craft Chance)', system: 'store', maxLevel: 12, statKey: 'craft_10x_chance', op: '+', fn: founderFn(3, 0.02, 0.01), inputs: [] }
/** Founder Tier 4: Bomb of Plenty Multi. Base 2, +1 per tier. op='+'. */
export const founderBomBofPlenty: Source = { key: 'store.founder', name: 'Founder Bundle (Bomb of Plenty Multi)', system: 'store', maxLevel: 12, statKey: 'bomb_of_plenty_multi', op: '+', fn: founderFn(4, 2, 1), inputs: [] }
/** Founder Tier 5: Golden Lootbug Chance. Base 6% (0.06), +3% per tier. op='+'. */
export const founderGoldenLootbug: Source = { key: 'store.founder', name: 'Founder Bundle (Golden Lootbug Chance)', system: 'store', maxLevel: 12, statKey: 'lootbug_golden_chance', op: '+', fn: founderFn(5, 0.06, 0.03), inputs: [] }
/** Founder Tier 6: Banked Freebie Cap. Base 4, +2 per tier. op='+'. */
export const founderFreebieBank: Source = { key: 'store.founder', name: 'Founder Bundle (Banked Freebie Cap)', system: 'store', maxLevel: 12, statKey: 'freebie_bank_cap', op: '+', fn: founderFn(6, 4, 2), inputs: [] }
/** Founder Tier 8: Gems From Freebie. Base 2, +1 per tier. op='+'. */
export const founderFreebieGems: Source = { key: 'store.founder', name: 'Founder Bundle (Gems From Freebie)', system: 'store', maxLevel: 12, statKey: 'freebie_gems_bonus', op: '+', fn: founderFn(8, 2, 1), inputs: [] }
/** Founder Tier 9: Rainbow Floor Chance. Base 1% (0.01), +1% per tier. op='+'. */
export const founderRainbowFloor: Source = { key: 'store.founder', name: 'Founder Bundle (Rainbow Floor Chance)', system: 'store', maxLevel: 12, statKey: 'rainbow_floor_chance', op: '+', fn: founderFn(9, 0.01, 0.01), inputs: [] }
/** Founder Tier 10: Game Speed. Base 10% (0.10), +1% per tier. op='+'. */
export const founderGameSpeed: Source = { key: 'store.founder', name: 'Founder Bundle (Game Speed)', system: 'store', maxLevel: 12, statKey: 'game_speed_multi', op: '+', fn: founderFn(10, 0.10, 0.01), inputs: [] }
/** Founder Tier 7: Triple Supply Drop Chance. Base 16% (0.16), +8% per tier. op='+'. */
export const founderTripleSupplyDrop: Source = { key: 'store.founder', name: 'Founder Bundle (Triple Supply Drop Chance)', system: 'store', maxLevel: 12, statKey: 'founder_triple_supply_drop_chance', op: '+', fn: founderFn(7, 0.16, 0.08), inputs: [] }
/** Founder Tier 11: Golden Supply Drop Chance. Base 10% (0.10), +2% per tier. op='+'. */
export const founderGoldenSupplyDrop: Source = { key: 'store.founder', name: 'Founder Bundle (Golden Supply Drop Chance)', system: 'store', maxLevel: 12, statKey: 'founder_golden_supply_drop_chance', op: '+', fn: founderFn(11, 0.10, 0.02), inputs: [] }
/** Founder Tier 12: Gem Bomb Gem Chance. Base 0.5% (0.005), +0.5% per tier. op='+'. */
export const founderGemBombGemChance: Source = { key: 'store.founder', name: 'Founder Bundle (Gem Bomb Gem Chance)', system: 'store', maxLevel: 12, statKey: 'gem_bomb_gem_chance', op: '+', fn: founderFn(12, 0.005, 0.005), inputs: [] }

// ─── Value Packs (binary owned) ───────────────────────────────────────────────

// Additive helper: fn(1) = v, fn(0) = 0
const add = (v: number) => (o: number) => o * v
// Multiplicative helper: fn(1) = factor, fn(0) = 1
const mul = (v: number) => (o: number) => 1 + o * (v - 1)

export const vpDroneCount: Source = { key: 'store.vp.permanentDronePack', name: 'Permanent Drone Pack', system: 'store', maxLevel: 1, statKey: 'drone_count', op: '+', fn: add(1), inputs: [] }
export const vpFreebie5xChance: Source = { key: 'store.vp.investmentPackage', name: 'Investment Package!', system: 'store', maxLevel: 1, statKey: 'freebie_5x_chance', op: '+', fn: add(0.05), inputs: [] }
export const vpBankersFreebieBank: Source = { key: 'store.vp.bankersBundle', name: "Banker's Bundle!", system: 'store', maxLevel: 1, statKey: 'freebie_bank_cap', op: '+', fn: add(3), inputs: [] }
export const vpBankersLootbugBank: Source = { key: 'store.vp.bankersBundle', name: "Banker's Bundle!", system: 'store', maxLevel: 1, statKey: 'lootbug_bank_cap', op: '+', fn: add(3), inputs: [] }
export const vpBankersFreebieGems: Source = { key: 'store.vp.bankersBundle', name: "Banker's Bundle!", system: 'store', maxLevel: 1, statKey: 'freebie_gems_bonus', op: '+', fn: add(1), inputs: [] }
export const vpBankersFreebie5x: Source = { key: 'store.vp.bankersBundle', name: "Banker's Bundle!", system: 'store', maxLevel: 1, statKey: 'freebie_5x_chance', op: '+', fn: add(0.01), inputs: [] }
export const vpGottaGoFastGameSpeed: Source = { key: 'store.vp.gottaGoFast', name: 'Gotta Go Fast Bundle!', system: 'store', maxLevel: 1, statKey: 'game_speed_multi', op: '+', fn: add(0.10), inputs: [] }
export const vpGoldenLootbug: Source = { key: 'store.vp.goldenLootbugBundle', name: 'Golden Lootbug Bundle!', system: 'store', maxLevel: 1, statKey: 'lootbug_golden_chance', op: '+', fn: add(0.20), inputs: [] }
export const vpBiggerBankersFreebieBank: Source = { key: 'store.vp.biggerBankersBundle', name: "Bigger Banker's Bundle!", system: 'store', maxLevel: 1, statKey: 'freebie_bank_cap', op: '+', fn: add(5), inputs: [] }
export const vpBiggerBankersLootbugBank: Source = { key: 'store.vp.biggerBankersBundle', name: "Bigger Banker's Bundle!", system: 'store', maxLevel: 1, statKey: 'lootbug_bank_cap', op: '+', fn: add(5), inputs: [] }
export const vpBiggerBankersFreebieGems: Source = { key: 'store.vp.biggerBankersBundle', name: "Bigger Banker's Bundle!", system: 'store', maxLevel: 1, statKey: 'freebie_gems_bonus', op: '+', fn: add(1), inputs: [] }
export const vpBiggerBankersRefresh: Source = { key: 'store.vp.biggerBankersBundle', name: "Bigger Banker's Bundle!", system: 'store', maxLevel: 1, statKey: 'freebie_refresh_chance', op: '+', fn: add(0.01), inputs: [] }
export const vpBallerOreSell: Source = { key: 'store.vp.ballerSkinBundle', name: 'Baller Skin Bundle!', system: 'store', maxLevel: 1, statKey: 'ore_sell_price_multi', op: '×', fn: mul(2), inputs: [] }
export const vpPetTrainerPetLevel: Source = { key: 'store.vp.petTrainerBundle', name: 'Pet Trainer Bundle!', system: 'store', maxLevel: 1, statKey: 'pet_levelup_chance_multi', op: '×', fn: mul(1.20), inputs: [] }
export const vpPetTrainerVeinSpawn: Source = { key: 'store.vp.petTrainerBundle', name: 'Pet Trainer Bundle!', system: 'store', maxLevel: 1, statKey: 'vein_spawn_rate_multi', op: '×', fn: mul(1.10), inputs: [] }
export const vpPetTrainerExp: Source = { key: 'store.vp.petTrainerBundle', name: 'Pet Trainer Bundle!', system: 'store', maxLevel: 1, statKey: 'experience_multi', op: '×', fn: mul(2.00), inputs: [] }
export const vpPetTrainerRainbowFloor: Source = { key: 'store.vp.petTrainerBundle', name: 'Pet Trainer Bundle!', system: 'store', maxLevel: 1, statKey: 'rainbow_floor_chance', op: '+', fn: add(0.01), inputs: [] }
export const vpVeinExtractorVeinIncome: Source = { key: 'store.vp.veinExtractorBundle', name: 'Vein Extractor Bundle!', system: 'store', maxLevel: 1, statKey: 'vein_income_multi', op: '×', fn: mul(1.15), inputs: [] }
export const vpVeinExtractorGoldenVeinChance: Source = { key: 'store.vp.veinExtractorBundle', name: 'Vein Extractor Bundle!', system: 'store', maxLevel: 1, statKey: 'golden_vein_chance', op: '+', fn: add(0.05), inputs: [] }
export const vpVeinExtractorRainbowVeinChance: Source = { key: 'store.vp.veinExtractorBundle', name: 'Vein Extractor Bundle!', system: 'store', maxLevel: 1, statKey: 'rainbow_vein_chance', op: '+', fn: add(0.02), inputs: [] }
export const vpVeinExtractorGoldenVeinMul: Source = { key: 'store.vp.veinExtractorBundle', name: 'Vein Extractor Bundle!', system: 'store', maxLevel: 1, statKey: 'golden_vein_multi', op: '×', fn: mul(1.25), inputs: [] }
export const vpSupernovaStarNova: Source = { key: 'store.vp.stargazingSupernovaBundle', name: 'Stargazing Supernova Bundle!', system: 'store', maxLevel: 1, statKey: 'star_supernova_chance', op: '+', fn: add(0.03), inputs: [] }
export const vpSupernovaSuperStarNova: Source = { key: 'store.vp.stargazingSupernovaBundle', name: 'Stargazing Supernova Bundle!', system: 'store', maxLevel: 1, statKey: 'super_star_supernova_chance', op: '+', fn: add(0.03), inputs: [] }
export const vpSupernovaStarNovaMul: Source = { key: 'store.vp.stargazingSupernovaBundle', name: 'Stargazing Supernova Bundle!', system: 'store', maxLevel: 1, statKey: 'star_supernova_multi', op: '+', fn: add(1.10), inputs: [] }
export const vpSupernovaSuperStarNovaMul: Source = { key: 'store.vp.stargazingSupernovaBundle', name: 'Stargazing Supernova Bundle!', system: 'store', maxLevel: 1, statKey: 'super_star_supernova_multi', op: '+', fn: add(1.10), inputs: [] }
export const vpSupernovaTripleStar: Source = { key: 'store.vp.stargazingSupernovaBundle', name: 'Stargazing Supernova Bundle!', system: 'store', maxLevel: 1, statKey: 'star_triple_spawn_chance', op: '+', fn: add(0.03), inputs: [] }
export const vpSupernovaTripleSuperStar: Source = { key: 'store.vp.stargazingSupernovaBundle', name: 'Stargazing Supernova Bundle!', system: 'store', maxLevel: 1, statKey: 'super_star_triple_chance', op: '+', fn: add(0.03), inputs: [] }
export const vpCapitalistFreebieGems: Source = { key: 'store.vp.capitalistBundle', name: 'Capitalist Bundle!', system: 'store', maxLevel: 1, statKey: 'freebie_gems_bonus', op: '+', fn: add(2), inputs: [] }
export const vpArchFreebieGems: Source = { key: 'store.vp.archaeologyBundle', name: 'Archaeology Bundle!', system: 'store', maxLevel: 1, statKey: 'freebie_gems_bonus', op: '+', fn: add(1), inputs: [] }
export const vpArchFragmentGain: Source = { key: 'store.vp.archaeologyBundle', name: 'Archaeology Bundle!', system: 'store', maxLevel: 1, statKey: 'archaeology_fragment_gain_multi', op: '×', fn: mul(1.25), inputs: [] }
export const vpProgressionGoldenFloor: Source = { key: 'store.vp.progressionBoosterBundle', name: 'Progression Booster Bundle!', system: 'store', maxLevel: 1, statKey: 'golden_floor_multi', op: '×', fn: mul(1.20), inputs: [] }
export const vpProgressionVeinIncome: Source = { key: 'store.vp.progressionBoosterBundle', name: 'Progression Booster Bundle!', system: 'store', maxLevel: 1, statKey: 'vein_income_multi', op: '×', fn: mul(1.15), inputs: [] }
export const vpProgressionBombRecharge: Source = { key: 'store.vp.progressionBoosterBundle', name: 'Progression Booster Bundle!', system: 'store', maxLevel: 1, statKey: 'bomb_recharge_speed', op: '×', fn: mul(1.10), inputs: [] }
export const vpProgressionTripleStar: Source = { key: 'store.vp.progressionBoosterBundle', name: 'Progression Booster Bundle!', system: 'store', maxLevel: 1, statKey: 'star_triple_spawn_chance', op: '+', fn: add(0.05), inputs: [] }
export const vpBomberBombRecharge: Source = { key: 'store.vp.bomberExtraordinaireBundle', name: 'Bomber Extraordinaire Bundle!', system: 'store', maxLevel: 1, statKey: 'bomb_recharge_speed', op: '×', fn: mul(1.10), inputs: [] }
export const vpBomberBombCapacity: Source = { key: 'store.vp.bomberExtraordinaireBundle', name: 'Bomber Extraordinaire Bundle!', system: 'store', maxLevel: 1, statKey: 'bomb_capacity', op: '×', fn: mul(1.10), inputs: [] }
export const vpBomberBopMulti: Source = { key: 'store.vp.bomberExtraordinaireBundle', name: 'Bomber Extraordinaire Bundle!', system: 'store', maxLevel: 1, statKey: 'bomb_of_plenty_multi', op: '+', fn: add(5), inputs: [] }
export const vpBomberTransmuterMulti: Source = { key: 'store.vp.bomberExtraordinaireBundle', name: 'Bomber Extraordinaire Bundle!', system: 'store', maxLevel: 1, statKey: 'bomb_transmuter_multi', op: '+', fn: add(10), inputs: [] }
export const vpLootbugBonanzaLootMul: Source = { key: 'store.vp.lootbugBonanzaBundle', name: 'Lootbug Bonanza Bundle!', system: 'store', maxLevel: 1, statKey: 'lootbug_loot_multi', op: '×', fn: mul(1.20), inputs: [] }
export const vpLootbugBonanzaBankCap: Source = { key: 'store.vp.lootbugBonanzaBundle', name: 'Lootbug Bonanza Bundle!', system: 'store', maxLevel: 1, statKey: 'lootbug_bank_cap', op: '+', fn: add(10), inputs: [] }
export const vpInsiderStonksMul: Source = { key: 'store.vp.insiderTradingBundle', name: 'Insider Trading Bundle!', system: 'store', maxLevel: 1, statKey: 'stonks_multi', op: '+', fn: add(2), inputs: [] }
export const vpInsiderFreebieBank: Source = { key: 'store.vp.insiderTradingBundle', name: 'Insider Trading Bundle!', system: 'store', maxLevel: 1, statKey: 'freebie_bank_cap', op: '+', fn: add(2), inputs: [] }
export const vpCraftmaster100xCraft: Source = { key: 'store.vp.craftmasterBundle', name: 'Craftmaster Bundle!', system: 'store', maxLevel: 1, statKey: 'craft_100x_chance', op: '+', fn: add(0.01), inputs: [] }
export const vpCraftmaster10xCraft: Source = { key: 'store.vp.craftmasterBundle', name: 'Craftmaster Bundle!', system: 'store', maxLevel: 1, statKey: 'craft_10x_chance', op: '+', fn: add(0.02), inputs: [] }
export const vpCraftmasterFreeCraft: Source = { key: 'store.vp.craftmasterBundle', name: 'Craftmaster Bundle!', system: 'store', maxLevel: 1, statKey: 'free_craft_chance', op: '+', fn: add(0.02), inputs: [] }
export const vpCraftmasterBarCraft: Source = { key: 'store.vp.craftmasterBundle', name: 'Craftmaster Bundle!', system: 'store', maxLevel: 1, statKey: 'bar_craft_cost_multi', op: '+', fn: add(0.05), inputs: [] }
export const vpDroneCatalystExp: Source = { key: 'store.vp.droneCatalystBundle', name: 'Drone Catalyst Bundle!', system: 'store', maxLevel: 1, statKey: 'coal_drone_exp_multi', op: '×', fn: mul(1.35), inputs: [] }
export const vpDroneCatalystFuel: Source = { key: 'store.vp.droneCatalystBundle', name: 'Drone Catalyst Bundle!', system: 'store', maxLevel: 1, statKey: 'coal_fuel_duration_multi', op: '×', fn: mul(1.10), inputs: [] }
export const vpFishersTripleTick: Source = { key: 'store.vp.fishersBundle', name: "Fisher's Bundle!", system: 'store', maxLevel: 1, statKey: 'fishing_triple_tick_chance', op: '+', fn: add(0.10), inputs: [] }
export const vpAnglersNotice: Source = { key: 'store.vp.anglersBundle', name: "Angler's Bundle!", system: 'store', maxLevel: 1, statKey: 'fishing_tiny_notice_chance', op: '+', fn: add(0.06), inputs: [] }
export const vpSingularityAllStar: Source = { key: 'store.vp.singularityBundle', name: 'Singularity Bundle!', system: 'store', maxLevel: 1, statKey: 'all_star_multi', op: '×', fn: mul(1.10), inputs: [] }
export const vpSingularitySupergiantChance: Source = { key: 'store.vp.singularityBundle', name: 'Singularity Bundle!', system: 'store', maxLevel: 1, statKey: 'star_supergiant_chance', op: '+', fn: add(0.03), inputs: [] }
export const vpSingularityNovagiant: Source = { key: 'store.vp.singularityBundle', name: 'Singularity Bundle!', system: 'store', maxLevel: 1, statKey: 'novagiant_combo_multi', op: '×', fn: mul(1.10), inputs: [] }
export const vpSingularity10xSuperStar: Source = { key: 'store.vp.singularityBundle', name: 'Singularity Bundle!', system: 'store', maxLevel: 1, statKey: 'super_star_10x_chance', op: '+', fn: add(0.03), inputs: [] }
export const vpVoidOverdriveVoidMul: Source = { key: 'store.vp.voidOverdriveBundle', name: 'Void Overdrive Bundle!', system: 'store', maxLevel: 1, statKey: 'void_portal_base_multi', op: '×', fn: mul(1.10), inputs: [] }
export const vpVoidOverdriveGoldenPortalMul: Source = { key: 'store.vp.voidOverdriveBundle', name: 'Void Overdrive Bundle!', system: 'store', maxLevel: 1, statKey: 'golden_void_portal_multi', op: '×', fn: mul(1.10), inputs: [] }
export const vpVoidOverdriveGoldenPortalChance: Source = { key: 'store.vp.voidOverdriveBundle', name: 'Void Overdrive Bundle!', system: 'store', maxLevel: 1, statKey: 'golden_void_portal_chance', op: '+', fn: add(0.02), inputs: [] }
export const vpVoidOverdriveFuel: Source = { key: 'store.vp.voidOverdriveBundle', name: 'Void Overdrive Bundle!', system: 'store', maxLevel: 1, statKey: 'coal_fuel_duration_multi', op: '×', fn: mul(1.10), inputs: [] }
export const vpFrogFrenzyLootfrogMul: Source = { key: 'store.vp.frogFrenzyBundle', name: 'Frog Frenzy Bundle!', system: 'store', maxLevel: 1, statKey: 'lootfrog_loot_multi', op: '×', fn: mul(1.20), inputs: [] }
export const vpFrogFrenzyTriple: Source = { key: 'store.vp.frogFrenzyBundle', name: 'Frog Frenzy Bundle!', system: 'store', maxLevel: 1, statKey: 'lootfrog_triple_spawn_chance', op: '+', fn: add(0.03), inputs: [] }
export const vpFrogFrenzyCapacity: Source = { key: 'store.vp.frogFrenzyBundle', name: 'Frog Frenzy Bundle!', system: 'store', maxLevel: 1, statKey: 'lootfrog_capacity', op: '+', fn: add(2), inputs: [] }
export const vpLegendaryHauler5xTick: Source = { key: 'store.vp.legendaryHaulerBundle', name: 'Legendary Hauler Bundle!', system: 'store', maxLevel: 1, statKey: 'fishing_5x_tick_chance', op: '+', fn: add(0.03), inputs: [] }
export const vpLegendaryHaulerFishIncome: Source = { key: 'store.vp.legendaryHaulerBundle', name: 'Legendary Hauler Bundle!', system: 'store', maxLevel: 1, statKey: 'fishing_income_multi', op: '×', fn: mul(1.10), inputs: [] }
export const vpLegendaryHaulerTier2Dock: Source = { key: 'store.vp.legendaryHaulerBundle', name: 'Legendary Hauler Bundle!', system: 'store', maxLevel: 1, statKey: 'fishing_tier2_dock_multi', op: '×', fn: mul(1.10), inputs: [] }
export const vpChiefExecSuperStonksChance: Source = { key: 'store.vp.chiefExecutiveBundle', name: 'Chief Executive Bundle!', system: 'store', maxLevel: 1, statKey: 'super_stonks_chance', op: '+', fn: add(0.02), inputs: [] }
export const vpChiefExecSuperStonksMul: Source = { key: 'store.vp.chiefExecutiveBundle', name: 'Chief Executive Bundle!', system: 'store', maxLevel: 1, statKey: 'super_stonks_multi', op: '×', fn: mul(1.15), inputs: [] }
export const vpChiefExecFreebieGems: Source = { key: 'store.vp.chiefExecutiveBundle', name: 'Chief Executive Bundle!', system: 'store', maxLevel: 1, statKey: 'freebie_gems_bonus', op: '+', fn: add(4), inputs: [] }
export const vpChiefExecFreebieBank: Source = { key: 'store.vp.chiefExecutiveBundle', name: 'Chief Executive Bundle!', system: 'store', maxLevel: 1, statKey: 'freebie_bank_cap', op: '×', fn: mul(1.10), inputs: [] }
export const vpGoldenOreChance: Source = { key: 'store.vp.goldenOreBundle', name: 'Golden Ore Bundle!', system: 'store', maxLevel: 1, statKey: 'golden_ore_chance', op: '+', fn: add(0.03), inputs: [] }
export const vpGoldenOreMul: Source = { key: 'store.vp.goldenOreBundle', name: 'Golden Ore Bundle!', system: 'store', maxLevel: 1, statKey: 'golden_ore_multi', op: '×', fn: mul(1.25), inputs: [] }
export const vpSupergiants3StarsChance: Source = { key: 'store.vp.stargazingSupergiantBundle', name: 'Stargazing Supergiant Bundle!', system: 'store', maxLevel: 1, statKey: 'star_supergiant_chance', op: '+', fn: add(0.03), inputs: [] }
export const vpSupergiants3SuperStarsChance: Source = { key: 'store.vp.stargazingSupergiantBundle', name: 'Stargazing Supergiant Bundle!', system: 'store', maxLevel: 1, statKey: 'super_star_supergiant_chance', op: '+', fn: add(0.03), inputs: [] }
export const vpSupergiants3StarMul: Source = { key: 'store.vp.stargazingSupergiantBundle', name: 'Stargazing Supergiant Bundle!', system: 'store', maxLevel: 1, statKey: 'star_supergiant_multi', op: '×', fn: mul(1.10), inputs: [] }
export const vpSupergiants3TripleStar: Source = { key: 'store.vp.stargazingSupergiantBundle', name: 'Stargazing Supergiant Bundle!', system: 'store', maxLevel: 1, statKey: 'star_triple_spawn_chance', op: '+', fn: add(0.03), inputs: [] }
export const vpSupergiants10xSuperStar: Source = { key: 'store.vp.stargazingSupergiantBundle', name: 'Stargazing Supergiant Bundle!', system: 'store', maxLevel: 1, statKey: 'super_star_10x_chance', op: '+', fn: add(0.01), inputs: [] }
// ─── Ascension Bundle (new in V2.1.1) ───────────────────────────────────────
export const vpAscensionArchExp: Source = { key: 'store.vp.ascensionBundle', name: 'Ascension Bundle!', system: 'store', maxLevel: 1, statKey: 'archaeology_exp_gain_multi', op: '×', fn: mul(1.15), inputs: [] }
export const vpAscensionAutoTap: Source = { key: 'store.vp.ascensionBundle', name: 'Ascension Bundle!', system: 'store', maxLevel: 1, statKey: 'archaeology_crosshair_auto_tap', op: '+', fn: add(0.05), inputs: [] }
export const vpAscensionLootMod: Source = { key: 'store.vp.ascensionBundle', name: 'Ascension Bundle!', system: 'store', maxLevel: 1, statKey: 'archaeology_lood_mod_chance', op: '+', fn: add(0.02), inputs: [] }
export const vpAscensionGoldenCrosshair: Source = { key: 'store.vp.ascensionBundle', name: 'Ascension Bundle!', system: 'store', maxLevel: 1, statKey: 'archaeology_golden_crosshair_chance', op: '+', fn: add(0.02), inputs: [] }

// ─── Polychrome Potency Bundle ───────────────────────────────────────────────
export const vpPolyPotencyOre: Source = { key: 'store.vp.polychromePotencyBundle', name: 'Polychrome Potency Bundle!', system: 'store', maxLevel: 1, statKey: 'polychrome_card_bonus_ore', op: '×', fn: mul(1.15), inputs: [] }
export const vpPolyPotencyVein: Source = { key: 'store.vp.polychromePotencyBundle', name: 'Polychrome Potency Bundle!', system: 'store', maxLevel: 1, statKey: 'polychrome_card_bonus_vein', op: '×', fn: mul(1.15), inputs: [] }
export const vpPolyPotencyStar: Source = { key: 'store.vp.polychromePotencyBundle', name: 'Polychrome Potency Bundle!', system: 'store', maxLevel: 1, statKey: 'polychrome_card_bonus_star', op: '×', fn: mul(1.15), inputs: [] }
export const vpPolyPotencyFish: Source = { key: 'store.vp.polychromePotencyBundle', name: 'Polychrome Potency Bundle!', system: 'store', maxLevel: 1, statKey: 'polychrome_card_bonus_fish', op: '×', fn: mul(1.15), inputs: [] }

// ─── Capitalist Bundle (second effect) ───────────────────────────────────────
export const vpCapitalistRelicChance: Source = { key: 'store.vp.capitalistBundle', name: 'Capitalist Bundle!', system: 'store', maxLevel: 1, statKey: 'freebie_chance_for_bonus_relic', op: '+', fn: add(0.15), inputs: [] }

// ─── Skill Surge Bundle ───────────────────────────────────────────────────────
export const vpSkillSurgeSkillShard: Source = { key: 'store.vp.skillSurgeBundle', name: 'Skill Surge Bundle!', system: 'store', maxLevel: 1, statKey: 'freebie_chance_for_skill_shard', op: '+', fn: add(0.01), inputs: [] }

export const vpHalfWayRainbowFloorMul: Source = { key: 'store.vp.halfWayBundle', name: 'Half Way Bundle!', system: 'store', maxLevel: 1, statKey: 'rainbow_floor_multi', op: '×', fn: mul(1.10), inputs: [] }
export const vpHalfWayNovagiant: Source = { key: 'store.vp.halfWayBundle', name: 'Half Way Bundle!', system: 'store', maxLevel: 1, statKey: 'novagiant_combo_multi', op: '×', fn: mul(1.10), inputs: [] }
export const vpHalfWayFishingRod: Source = { key: 'store.vp.halfWayBundle', name: 'Half Way Bundle!', system: 'store', maxLevel: 1, statKey: 'fishing_rod_power', op: '×', fn: mul(1.10), inputs: [] }
export const vpHalfWayFreebieGems: Source = { key: 'store.vp.halfWayBundle', name: 'Half Way Bundle!', system: 'store', maxLevel: 1, statKey: 'freebie_gems_bonus', op: '+', fn: add(2), inputs: [] }

export const storeSources = {
  // Perks
  perkOreIncome, perkPrestigePts, perkBarOutput, perkBombDamage,
  // Gem upgrades
  gemPickaxeDamage, gemBombDamage, gemBombCapacity, gemFreebieBank,
  gemChestMeter, gemItemsInChests, gemOreSellPrice,
  // Founder
  founderSupplyDropCd, founderDoubleSupplyDrop,
  founderCraft10x, founderBomBofPlenty, founderGoldenLootbug, founderFreebieBank,
  founderTripleSupplyDrop, founderFreebieGems, founderRainbowFloor, founderGameSpeed,
  founderGoldenSupplyDrop, founderGemBombGemChance,
  // Value packs
  vpDroneCount, vpFreebie5xChance, vpBankersFreebieBank, vpBankersLootbugBank,
  vpBankersFreebieGems, vpBankersFreebie5x, vpGottaGoFastGameSpeed, vpGoldenLootbug,
  vpBiggerBankersFreebieBank, vpBiggerBankersLootbugBank, vpBiggerBankersFreebieGems,
  vpBiggerBankersRefresh, vpBallerOreSell, vpPetTrainerPetLevel, vpPetTrainerVeinSpawn,
  vpPetTrainerExp, vpPetTrainerRainbowFloor, vpVeinExtractorVeinIncome,
  vpVeinExtractorGoldenVeinChance, vpVeinExtractorRainbowVeinChance, vpVeinExtractorGoldenVeinMul,
  vpSupernovaStarNova, vpSupernovaSuperStarNova, vpSupernovaStarNovaMul,
  vpSupernovaSuperStarNovaMul, vpSupernovaTripleStar, vpSupernovaTripleSuperStar,
  vpCapitalistFreebieGems, vpArchFreebieGems, vpArchFragmentGain, vpProgressionGoldenFloor,
  vpProgressionVeinIncome, vpProgressionBombRecharge, vpProgressionTripleStar,
  vpBomberBombRecharge, vpBomberBombCapacity, vpBomberBopMulti, vpBomberTransmuterMulti,
  vpLootbugBonanzaLootMul, vpLootbugBonanzaBankCap, vpInsiderStonksMul, vpInsiderFreebieBank,
  vpCraftmaster100xCraft, vpCraftmaster10xCraft, vpCraftmasterFreeCraft, vpCraftmasterBarCraft,
  vpDroneCatalystExp, vpDroneCatalystFuel, vpFishersTripleTick, vpAnglersNotice,
  vpSingularityAllStar, vpSingularitySupergiantChance, vpSingularityNovagiant, vpSingularity10xSuperStar,
  vpVoidOverdriveVoidMul, vpVoidOverdriveGoldenPortalMul, vpVoidOverdriveGoldenPortalChance, vpVoidOverdriveFuel,
  vpFrogFrenzyLootfrogMul, vpFrogFrenzyTriple, vpFrogFrenzyCapacity,
  vpLegendaryHauler5xTick, vpLegendaryHaulerFishIncome, vpLegendaryHaulerTier2Dock,
  vpChiefExecSuperStonksChance, vpChiefExecSuperStonksMul, vpChiefExecFreebieGems, vpChiefExecFreebieBank,
  vpGoldenOreChance, vpGoldenOreMul,
  vpSupergiants3StarsChance, vpSupergiants3SuperStarsChance, vpSupergiants3StarMul,
  vpSupergiants3TripleStar, vpSupergiants10xSuperStar,
  vpHalfWayRainbowFloorMul, vpHalfWayNovagiant, vpHalfWayFishingRod, vpHalfWayFreebieGems,
  // New bundles
  vpAscensionArchExp, vpAscensionAutoTap, vpAscensionLootMod, vpAscensionGoldenCrosshair,
  vpPolyPotencyOre, vpPolyPotencyVein, vpPolyPotencyStar, vpPolyPotencyFish,
  vpCapitalistRelicChance, vpSkillSurgeSkillShard,
}

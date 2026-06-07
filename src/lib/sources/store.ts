import type { Source } from '$lib/engine/types'

// Store sources are derived from src/lib/store/catalog.ts.
// Value packs and perks are binary (owned=1, not-owned=0).
// Gem upgrades are leveled (fn scales with level).
// Founder tier effects are runtime-dependent (fn uses rt.founderTier).
//
// Operator guide (set in formula files):
//   Labels starting with '+'/'-'  → op='+' in formula
//   Labels starting with 'Nx'/'N.NNx' → op='×' in formula

const FOUNDER_TIER_INPUT = {
  key: 'founderTier',
  label: 'Founder Tier (0–12)',
  type: 'integer' as const,
  min: 0, max: 12,
}

// ─── Perks (binary owned/not) ─────────────────────────────────────────────────

/** Perk: 2x Ore Income. op='×' → fn(1)=2 */
export const perkOreIncome: Source = { key: 'store.perk.oreIncome', name: '2x Ore Income (Perk)', system: 'store', maxLevel: 1, fn: (o) => 1 + o * 1, inputs: [] }
/** Perk: 2x Prestige Point Income. op='×' */
export const perkPrestigePts: Source = { key: 'store.perk.prestigePts', name: '2x Prestige Point Income (Perk)', system: 'store', maxLevel: 1, fn: (o) => 1 + o * 1, inputs: [] }
/** Perk: 2x Bar Income. op='×' */
export const perkBarOutput: Source = { key: 'store.perk.barOutput', name: '2x Bar Income (Perk)', system: 'store', maxLevel: 1, fn: (o) => 1 + o * 1, inputs: [] }
/** Perk: 3x Bomb Damage. op='×' */
export const perkBombDamage: Source = { key: 'store.perk.bombDamage', name: '3x Bomb Damage (Perk)', system: 'store', maxLevel: 1, fn: (o) => 1 + o * 2, inputs: [] }

// ─── Gem Upgrades (leveled) ───────────────────────────────────────────────────

/** Gem Upgrade: Pickaxe Damage +0.20× per level (×1.20 at lvl 1). op='×' max 22. */
export const gemPickaxeDamage: Source = { key: 'store.gem.pickaxeDamage', name: 'Gem Upgrade – Pickaxe Damage', system: 'store', maxLevel: 22, fn: (l) => 1 + l * 0.20, inputs: [] }
/** Gem Upgrade: Bomb Damage +20% per level. op='+' max 22. */
export const gemBombDamage: Source = { key: 'store.gem.bombDamage', name: 'Gem Upgrade – Bomb Damage', system: 'store', maxLevel: 22, fn: (l) => l * 0.20, inputs: [] }
/** Gem Upgrade: Bomb Capacity +2 per level. op='+' max 22. */
export const gemBombCapacity: Source = { key: 'store.gem.bombCapacity', name: 'Gem Upgrade – Bomb Capacity', system: 'store', maxLevel: 22, fn: (l) => l * 2, inputs: [] }
/** Gem Upgrade: Banked Freebie Cap +1 per level. op='+' max 14. */
export const gemFreebieBank: Source = { key: 'store.gem.freebieBank', name: 'Gem Upgrade – Banked Freebie Cap', system: 'store', maxLevel: 14, fn: (l) => l, inputs: [] }
/** Gem Upgrade: Chest Meter Fill Rate ×5 per level (compounding). op='×' max 17. */
export const gemChestMeter: Source = { key: 'store.gem.chestMeter', name: 'Gem Upgrade – Chest Meter Fill Rate', system: 'store', maxLevel: 17, fn: (l) => Math.pow(5, l), inputs: [] }
/** Gem Upgrade: Items Contained In Chests +1 per level. op='+' max 17. */
export const gemItemsInChests: Source = { key: 'store.gem.itemsInChests', name: 'Gem Upgrade – Items In Chests', system: 'store', maxLevel: 17, fn: (l) => l, inputs: [] }
/** Gem Upgrade: Ore Sell Price ×2 per level (stacking multiply). op='×' max 14. */
export const gemOreSellPrice: Source = { key: 'store.gem.oreSellPrice', name: 'Gem Upgrade – Ore Sell Price', system: 'store', maxLevel: 14, fn: (l) => 1 + l * 1.0, inputs: [] }

// ─── Founder Tier Effects (runtime) ──────────────────────────────────────────
// fn(owned, rt): owned=1 if founder bundle purchased, rt.founderTier = current tier.
// Each effect activates at its unlock tier and scales via baseValue + tiers_above × increment.

const founderFn = (unlockTier: number, base: number, incr: number) =>
  (owned: number, rt: Record<string, number>) => {
    if (owned === 0) return 0
    const tier = rt['founderTier'] ?? 0
    if (tier < unlockTier) return 0
    return base + Math.max(0, tier - unlockTier) * incr
  }

/** Founder Tier 3: 10x Craft Chance. Base 2% (0.02), +1% per tier. op='+'. */
export const founderCraft10x: Source = { key: 'store.founder', name: 'Founder Bundle (10x Craft Chance)', system: 'store', maxLevel: 1, fn: founderFn(3, 0.02, 0.01), inputs: [FOUNDER_TIER_INPUT] }
/** Founder Tier 4: Bomb of Plenty Multi. Base 2, +1 per tier. op='+'. */
export const founderBomBofPlenty: Source = { key: 'store.founder', name: 'Founder Bundle (Bomb of Plenty Multi)', system: 'store', maxLevel: 1, fn: founderFn(4, 2, 1), inputs: [FOUNDER_TIER_INPUT] }
/** Founder Tier 5: Golden Lootbug Chance. Base 6% (0.06), +3% per tier. op='+'. */
export const founderGoldenLootbug: Source = { key: 'store.founder', name: 'Founder Bundle (Golden Lootbug Chance)', system: 'store', maxLevel: 1, fn: founderFn(5, 0.06, 0.03), inputs: [FOUNDER_TIER_INPUT] }
/** Founder Tier 6: Banked Freebie Cap. Base 4, +2 per tier. op='+'. */
export const founderFreebieBank: Source = { key: 'store.founder', name: 'Founder Bundle (Banked Freebie Cap)', system: 'store', maxLevel: 1, fn: founderFn(6, 4, 2), inputs: [FOUNDER_TIER_INPUT] }
/** Founder Tier 8: Gems From Freebie. Base 2, +1 per tier. op='+'. */
export const founderFreebieGems: Source = { key: 'store.founder', name: 'Founder Bundle (Gems From Freebie)', system: 'store', maxLevel: 1, fn: founderFn(8, 2, 1), inputs: [FOUNDER_TIER_INPUT] }
/** Founder Tier 9: Rainbow Floor Chance. Base 1% (0.01), +1% per tier. op='+'. */
export const founderRainbowFloor: Source = { key: 'store.founder', name: 'Founder Bundle (Rainbow Floor Chance)', system: 'store', maxLevel: 1, fn: founderFn(9, 0.01, 0.01), inputs: [FOUNDER_TIER_INPUT] }
/** Founder Tier 10: Game Speed. Base 10% (0.10), +1% per tier. op='+'. */
export const founderGameSpeed: Source = { key: 'store.founder', name: 'Founder Bundle (Game Speed)', system: 'store', maxLevel: 1, fn: founderFn(10, 0.10, 0.01), inputs: [FOUNDER_TIER_INPUT] }

// ─── Value Packs (binary owned) ───────────────────────────────────────────────

// Additive helper: fn(1) = v, fn(0) = 0
const add = (v: number) => (o: number) => o * v
// Multiplicative helper: fn(1) = factor, fn(0) = 1
const mul = (v: number) => (o: number) => 1 + o * (v - 1)

export const vpDroneCount: Source = { key: 'store.vp.permanentDronePack', name: 'Permanent Drone Pack', system: 'store', maxLevel: 1, fn: add(1), inputs: [] }
export const vpFreebie5xChance: Source = { key: 'store.vp.investmentPackage', name: 'Investment Package!', system: 'store', maxLevel: 1, fn: add(0.05), inputs: [] }
export const vpBankersFreebieBank: Source = { key: 'store.vp.bankersBundle', name: "Banker's Bundle!", system: 'store', maxLevel: 1, fn: add(3), inputs: [] }
export const vpBankersLootbugBank: Source = { key: 'store.vp.bankersBundle', name: "Banker's Bundle!", system: 'store', maxLevel: 1, fn: add(3), inputs: [] }
export const vpBankersFreebieGems: Source = { key: 'store.vp.bankersBundle', name: "Banker's Bundle!", system: 'store', maxLevel: 1, fn: add(1), inputs: [] }
export const vpBankersFreebie5x: Source = { key: 'store.vp.bankersBundle', name: "Banker's Bundle!", system: 'store', maxLevel: 1, fn: add(0.01), inputs: [] }
export const vpGottaGoFastGameSpeed: Source = { key: 'store.vp.gottaGoFast', name: 'Gotta Go Fast Bundle!', system: 'store', maxLevel: 1, fn: add(0.10), inputs: [] }
export const vpGoldenLootbug: Source = { key: 'store.vp.goldenLootbugBundle', name: 'Golden Lootbug Bundle!', system: 'store', maxLevel: 1, fn: add(0.20), inputs: [] }
export const vpBiggerBankersFreebieBank: Source = { key: 'store.vp.biggerBankersBundle', name: "Bigger Banker's Bundle!", system: 'store', maxLevel: 1, fn: add(5), inputs: [] }
export const vpBiggerBankersLootbugBank: Source = { key: 'store.vp.biggerBankersBundle', name: "Bigger Banker's Bundle!", system: 'store', maxLevel: 1, fn: add(5), inputs: [] }
export const vpBiggerBankersFreebieGems: Source = { key: 'store.vp.biggerBankersBundle', name: "Bigger Banker's Bundle!", system: 'store', maxLevel: 1, fn: add(1), inputs: [] }
export const vpBiggerBankersRefresh: Source = { key: 'store.vp.biggerBankersBundle', name: "Bigger Banker's Bundle!", system: 'store', maxLevel: 1, fn: add(0.01), inputs: [] }
export const vpBallerOreSell: Source = { key: 'store.vp.ballerSkinBundle', name: 'Baller Skin Bundle!', system: 'store', maxLevel: 1, fn: mul(2), inputs: [] }
export const vpPetTrainerPetLevel: Source = { key: 'store.vp.petTrainerBundle', name: 'Pet Trainer Bundle!', system: 'store', maxLevel: 1, fn: mul(1.20), inputs: [] }
export const vpPetTrainerVeinSpawn: Source = { key: 'store.vp.petTrainerBundle', name: 'Pet Trainer Bundle!', system: 'store', maxLevel: 1, fn: mul(1.10), inputs: [] }
export const vpPetTrainerExp: Source = { key: 'store.vp.petTrainerBundle', name: 'Pet Trainer Bundle!', system: 'store', maxLevel: 1, fn: mul(2.00), inputs: [] }
export const vpPetTrainerRainbowFloor: Source = { key: 'store.vp.petTrainerBundle', name: 'Pet Trainer Bundle!', system: 'store', maxLevel: 1, fn: add(0.01), inputs: [] }
export const vpVeinExtractorVeinIncome: Source = { key: 'store.vp.veinExtractorBundle', name: 'Vein Extractor Bundle!', system: 'store', maxLevel: 1, fn: mul(1.15), inputs: [] }
export const vpVeinExtractorGoldenVeinChance: Source = { key: 'store.vp.veinExtractorBundle', name: 'Vein Extractor Bundle!', system: 'store', maxLevel: 1, fn: add(0.05), inputs: [] }
export const vpVeinExtractorRainbowVeinChance: Source = { key: 'store.vp.veinExtractorBundle', name: 'Vein Extractor Bundle!', system: 'store', maxLevel: 1, fn: add(0.02), inputs: [] }
export const vpVeinExtractorGoldenVeinMul: Source = { key: 'store.vp.veinExtractorBundle', name: 'Vein Extractor Bundle!', system: 'store', maxLevel: 1, fn: mul(1.25), inputs: [] }
export const vpSupernovaStarNova: Source = { key: 'store.vp.stargazingSupernovaBundle', name: 'Stargazing Supernova Bundle!', system: 'store', maxLevel: 1, fn: add(0.03), inputs: [] }
export const vpSupernovaSuperStarNova: Source = { key: 'store.vp.stargazingSupernovaBundle', name: 'Stargazing Supernova Bundle!', system: 'store', maxLevel: 1, fn: add(0.03), inputs: [] }
export const vpSupernovaStarNovaMul: Source = { key: 'store.vp.stargazingSupernovaBundle', name: 'Stargazing Supernova Bundle!', system: 'store', maxLevel: 1, fn: add(1.10), inputs: [] }
export const vpSupernovaSuperStarNovaMul: Source = { key: 'store.vp.stargazingSupernovaBundle', name: 'Stargazing Supernova Bundle!', system: 'store', maxLevel: 1, fn: add(1.10), inputs: [] }
export const vpSupernovaTripleStar: Source = { key: 'store.vp.stargazingSupernovaBundle', name: 'Stargazing Supernova Bundle!', system: 'store', maxLevel: 1, fn: add(0.03), inputs: [] }
export const vpSupernovaTripleSuperStar: Source = { key: 'store.vp.stargazingSupernovaBundle', name: 'Stargazing Supernova Bundle!', system: 'store', maxLevel: 1, fn: add(0.03), inputs: [] }
export const vpCapitalistFreebieGems: Source = { key: 'store.vp.capitalistBundle', name: 'Capitalist Bundle!', system: 'store', maxLevel: 1, fn: add(2), inputs: [] }
export const vpArchFreebieGems: Source = { key: 'store.vp.archaeologyBundle', name: 'Archaeology Bundle!', system: 'store', maxLevel: 1, fn: add(1), inputs: [] }
export const vpProgressionGoldenFloor: Source = { key: 'store.vp.progressionBoosterBundle', name: 'Progression Booster Bundle!', system: 'store', maxLevel: 1, fn: mul(1.20), inputs: [] }
export const vpProgressionVeinIncome: Source = { key: 'store.vp.progressionBoosterBundle', name: 'Progression Booster Bundle!', system: 'store', maxLevel: 1, fn: mul(1.15), inputs: [] }
export const vpProgressionBombRecharge: Source = { key: 'store.vp.progressionBoosterBundle', name: 'Progression Booster Bundle!', system: 'store', maxLevel: 1, fn: mul(1.10), inputs: [] }
export const vpProgressionTripleStar: Source = { key: 'store.vp.progressionBoosterBundle', name: 'Progression Booster Bundle!', system: 'store', maxLevel: 1, fn: add(0.05), inputs: [] }
export const vpBomberBombRecharge: Source = { key: 'store.vp.bomberExtraordinaireBundle', name: 'Bomber Extraordinaire Bundle!', system: 'store', maxLevel: 1, fn: mul(1.10), inputs: [] }
export const vpBomberBombCapacity: Source = { key: 'store.vp.bomberExtraordinaireBundle', name: 'Bomber Extraordinaire Bundle!', system: 'store', maxLevel: 1, fn: mul(1.10), inputs: [] }
export const vpBomberBopMulti: Source = { key: 'store.vp.bomberExtraordinaireBundle', name: 'Bomber Extraordinaire Bundle!', system: 'store', maxLevel: 1, fn: add(5), inputs: [] }
export const vpBomberTransmuterMulti: Source = { key: 'store.vp.bomberExtraordinaireBundle', name: 'Bomber Extraordinaire Bundle!', system: 'store', maxLevel: 1, fn: add(10), inputs: [] }
export const vpLootbugBonanzaLootMul: Source = { key: 'store.vp.lootbugBonanzaBundle', name: 'Lootbug Bonanza Bundle!', system: 'store', maxLevel: 1, fn: mul(1.20), inputs: [] }
export const vpLootbugBonanzaBankCap: Source = { key: 'store.vp.lootbugBonanzaBundle', name: 'Lootbug Bonanza Bundle!', system: 'store', maxLevel: 1, fn: add(10), inputs: [] }
export const vpInsiderStonksMul: Source = { key: 'store.vp.insiderTradingBundle', name: 'Insider Trading Bundle!', system: 'store', maxLevel: 1, fn: add(2), inputs: [] }
export const vpInsiderFreebieBank: Source = { key: 'store.vp.insiderTradingBundle', name: 'Insider Trading Bundle!', system: 'store', maxLevel: 1, fn: add(2), inputs: [] }
export const vpCraftmaster100xCraft: Source = { key: 'store.vp.craftmasterBundle', name: 'Craftmaster Bundle!', system: 'store', maxLevel: 1, fn: add(0.01), inputs: [] }
export const vpCraftmaster10xCraft: Source = { key: 'store.vp.craftmasterBundle', name: 'Craftmaster Bundle!', system: 'store', maxLevel: 1, fn: add(0.02), inputs: [] }
export const vpCraftmasterFreeCraft: Source = { key: 'store.vp.craftmasterBundle', name: 'Craftmaster Bundle!', system: 'store', maxLevel: 1, fn: add(0.02), inputs: [] }
export const vpCraftmasterBarCraft: Source = { key: 'store.vp.craftmasterBundle', name: 'Craftmaster Bundle!', system: 'store', maxLevel: 1, fn: add(0.05), inputs: [] }
export const vpDroneCatalystExp: Source = { key: 'store.vp.droneCatalystBundle', name: 'Drone Catalyst Bundle!', system: 'store', maxLevel: 1, fn: mul(1.35), inputs: [] }
export const vpDroneCatalystFuel: Source = { key: 'store.vp.droneCatalystBundle', name: 'Drone Catalyst Bundle!', system: 'store', maxLevel: 1, fn: mul(1.10), inputs: [] }
export const vpFishersTripleTick: Source = { key: 'store.vp.fishersBundle', name: "Fisher's Bundle!", system: 'store', maxLevel: 1, fn: add(0.10), inputs: [] }
export const vpAnglersNotice: Source = { key: 'store.vp.anglersBundle', name: "Angler's Bundle!", system: 'store', maxLevel: 1, fn: add(0.06), inputs: [] }
export const vpSingularityAllStar: Source = { key: 'store.vp.singularityBundle', name: 'Singularity Bundle!', system: 'store', maxLevel: 1, fn: mul(1.10), inputs: [] }
export const vpSingularitySupergiantChance: Source = { key: 'store.vp.singularityBundle', name: 'Singularity Bundle!', system: 'store', maxLevel: 1, fn: add(0.03), inputs: [] }
export const vpSingularityNovagiant: Source = { key: 'store.vp.singularityBundle', name: 'Singularity Bundle!', system: 'store', maxLevel: 1, fn: mul(1.10), inputs: [] }
export const vpSingularity10xSuperStar: Source = { key: 'store.vp.singularityBundle', name: 'Singularity Bundle!', system: 'store', maxLevel: 1, fn: add(0.03), inputs: [] }
export const vpVoidOverdriveVoidMul: Source = { key: 'store.vp.voidOverdriveBundle', name: 'Void Overdrive Bundle!', system: 'store', maxLevel: 1, fn: mul(1.10), inputs: [] }
export const vpVoidOverdriveGoldenPortalMul: Source = { key: 'store.vp.voidOverdriveBundle', name: 'Void Overdrive Bundle!', system: 'store', maxLevel: 1, fn: mul(1.10), inputs: [] }
export const vpVoidOverdriveGoldenPortalChance: Source = { key: 'store.vp.voidOverdriveBundle', name: 'Void Overdrive Bundle!', system: 'store', maxLevel: 1, fn: add(0.02), inputs: [] }
export const vpVoidOverdriveFuel: Source = { key: 'store.vp.voidOverdriveBundle', name: 'Void Overdrive Bundle!', system: 'store', maxLevel: 1, fn: mul(1.10), inputs: [] }
export const vpFrogFrenzyLootfrogMul: Source = { key: 'store.vp.frogFrenzyBundle', name: 'Frog Frenzy Bundle!', system: 'store', maxLevel: 1, fn: mul(1.20), inputs: [] }
export const vpFrogFrenzyTriple: Source = { key: 'store.vp.frogFrenzyBundle', name: 'Frog Frenzy Bundle!', system: 'store', maxLevel: 1, fn: add(0.03), inputs: [] }
export const vpFrogFrenzyCapacity: Source = { key: 'store.vp.frogFrenzyBundle', name: 'Frog Frenzy Bundle!', system: 'store', maxLevel: 1, fn: add(2), inputs: [] }
export const vpLegendaryHauler5xTick: Source = { key: 'store.vp.legendaryHaulerBundle', name: 'Legendary Hauler Bundle!', system: 'store', maxLevel: 1, fn: add(0.03), inputs: [] }
export const vpLegendaryHaulerFishIncome: Source = { key: 'store.vp.legendaryHaulerBundle', name: 'Legendary Hauler Bundle!', system: 'store', maxLevel: 1, fn: mul(1.10), inputs: [] }
export const vpLegendaryHaulerTier2Dock: Source = { key: 'store.vp.legendaryHaulerBundle', name: 'Legendary Hauler Bundle!', system: 'store', maxLevel: 1, fn: mul(1.10), inputs: [] }
export const vpChiefExecSuperStonksChance: Source = { key: 'store.vp.chiefExecutiveBundle', name: 'Chief Executive Bundle!', system: 'store', maxLevel: 1, fn: add(0.02), inputs: [] }
export const vpChiefExecSuperStonksMul: Source = { key: 'store.vp.chiefExecutiveBundle', name: 'Chief Executive Bundle!', system: 'store', maxLevel: 1, fn: mul(1.15), inputs: [] }
export const vpChiefExecFreebieGems: Source = { key: 'store.vp.chiefExecutiveBundle', name: 'Chief Executive Bundle!', system: 'store', maxLevel: 1, fn: add(4), inputs: [] }
export const vpChiefExecFreebieBank: Source = { key: 'store.vp.chiefExecutiveBundle', name: 'Chief Executive Bundle!', system: 'store', maxLevel: 1, fn: mul(1.10), inputs: [] }
export const vpGoldenOreChance: Source = { key: 'store.vp.goldenOreBundle', name: 'Golden Ore Bundle!', system: 'store', maxLevel: 1, fn: add(0.03), inputs: [] }
export const vpGoldenOreMul: Source = { key: 'store.vp.goldenOreBundle', name: 'Golden Ore Bundle!', system: 'store', maxLevel: 1, fn: mul(1.25), inputs: [] }
export const vpSupergiants3StarsChance: Source = { key: 'store.vp.stargazingSupergiantBundle', name: 'Stargazing Supergiant Bundle!', system: 'store', maxLevel: 1, fn: add(0.03), inputs: [] }
export const vpSupergiants3SuperStarsChance: Source = { key: 'store.vp.stargazingSupergiantBundle', name: 'Stargazing Supergiant Bundle!', system: 'store', maxLevel: 1, fn: add(0.03), inputs: [] }
export const vpSupergiants3StarMul: Source = { key: 'store.vp.stargazingSupergiantBundle', name: 'Stargazing Supergiant Bundle!', system: 'store', maxLevel: 1, fn: mul(1.10), inputs: [] }
export const vpSupergiants3TripleStar: Source = { key: 'store.vp.stargazingSupergiantBundle', name: 'Stargazing Supergiant Bundle!', system: 'store', maxLevel: 1, fn: add(0.03), inputs: [] }
export const vpSupergiants10xSuperStar: Source = { key: 'store.vp.stargazingSupergiantBundle', name: 'Stargazing Supergiant Bundle!', system: 'store', maxLevel: 1, fn: add(0.01), inputs: [] }
export const vpHalfWayRainbowFloorMul: Source = { key: 'store.vp.halfWayBundle', name: 'Half Way Bundle!', system: 'store', maxLevel: 1, fn: mul(1.10), inputs: [] }
export const vpHalfWayNovagiant: Source = { key: 'store.vp.halfWayBundle', name: 'Half Way Bundle!', system: 'store', maxLevel: 1, fn: mul(1.10), inputs: [] }
export const vpHalfWayFishingRod: Source = { key: 'store.vp.halfWayBundle', name: 'Half Way Bundle!', system: 'store', maxLevel: 1, fn: mul(1.10), inputs: [] }
export const vpHalfWayFreebieGems: Source = { key: 'store.vp.halfWayBundle', name: 'Half Way Bundle!', system: 'store', maxLevel: 1, fn: add(2), inputs: [] }

export const storeSources = {
  // Perks
  perkOreIncome, perkPrestigePts, perkBarOutput, perkBombDamage,
  // Gem upgrades
  gemPickaxeDamage, gemBombDamage, gemBombCapacity, gemFreebieBank,
  gemChestMeter, gemItemsInChests, gemOreSellPrice,
  // Founder
  founderCraft10x, founderBomBofPlenty, founderGoldenLootbug, founderFreebieBank,
  founderFreebieGems, founderRainbowFloor, founderGameSpeed,
  // Value packs
  vpDroneCount, vpFreebie5xChance, vpBankersFreebieBank, vpBankersLootbugBank,
  vpBankersFreebieGems, vpBankersFreebie5x, vpGottaGoFastGameSpeed, vpGoldenLootbug,
  vpBiggerBankersFreebieBank, vpBiggerBankersLootbugBank, vpBiggerBankersFreebieGems,
  vpBiggerBankersRefresh, vpBallerOreSell, vpPetTrainerPetLevel, vpPetTrainerVeinSpawn,
  vpPetTrainerExp, vpPetTrainerRainbowFloor, vpVeinExtractorVeinIncome,
  vpVeinExtractorGoldenVeinChance, vpVeinExtractorRainbowVeinChance, vpVeinExtractorGoldenVeinMul,
  vpSupernovaStarNova, vpSupernovaSuperStarNova, vpSupernovaStarNovaMul,
  vpSupernovaSuperStarNovaMul, vpSupernovaTripleStar, vpSupernovaTripleSuperStar,
  vpCapitalistFreebieGems, vpArchFreebieGems, vpProgressionGoldenFloor,
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
}

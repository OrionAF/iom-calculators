import type { Source } from '$lib/engine/types'
import { storeSources as st } from '$lib/sources/store'

// ─── Type definitions ───────────────────────────────────────────────────────
//
// This catalog is presentation-only: slugs, names, icons, costs, unlock
// requirements and display labels. All effect NUMBERS (per-level values,
// max levels, target stat, operator) live on the referenced Source in
// src/lib/sources/store.ts — single source of truth. Display values are
// computed as source.fn(level) and formatted via the stat registry unit
// (formatSourceValue in format.ts).

export interface StoreEffect {
  /** Display text. When absent, derive from the source's registry stat name + fn(1). */
  label?: string
  /**
   * The source this effect references. Absent for flavor-only effects with
   * no stat contribution (e.g. "Unlocks MEGABOMB").
   */
  source?: Source
  /** Context-specific tooltip addition. Base description comes from STAT_REGISTRY via source.statKey. */
  tooltipAddition?: string
}

export interface ValuePack {
  slug: string
  name: string
  icon: string
  unlockRequirement?: string
  effects: StoreEffect[]
  mirrorUnlockKey?:
    | 'unlocked_permanent_drone'
    | 'unlocked_megabomb'
    | 'unlocked_transmuter_bomb'
    | 'unlocked_battery_bomb'
}

export interface Perk {
  slug: string
  name: string
  icon: string
  effects: StoreEffect[]
}

export interface PerkBundle {
  slug: string
  name: string
  perkSlugs: [string, string]
  bonusGems: number
}

export interface GemUnlock {
  slug: string
  name: string
  icon: string
  gemCost: number
  mirrorUnlockKey:
    | 'unlocked_permanent_drone'
    | 'unlocked_megabomb'
    | 'unlocked_transmuter_bomb'
    | 'unlocked_battery_bomb'
  effects: StoreEffect[]
}

export interface GemUpgrade {
  slug: string
  name: string
  icon: string
  gemCost: number
  effects: StoreEffect[]
}

/** Max rank of a gem upgrade — taken from its sources (they own maxLevel). */
export function gemUpgradeMaxLevel(upgrade: GemUpgrade): number {
  return Math.max(0, ...upgrade.effects.map(e => e.source?.maxLevel ?? 0))
}

export interface FounderTier {
  tier: number
  vipPointsRequired: number
  /** Founder effects always reference a 'store.founder' source; fn(tier) gives the active value. */
  effects: Array<StoreEffect & { source: Source }>
}

// ─── Perks ──────────────────────────────────────────────────────────────────

export const PERKS: readonly Perk[] = [
  {
    slug: '2x_ore_income',
    name: '2x Ore Income',
    icon: '2x Ore Income.png',
    effects: [
      { label: '2x Ore Income', source: st.perkOreIncome }
    ],
  },
  {
    slug: '2x_prestige_point_income',
    name: '2x Prestige Point Income',
    icon: '2x Prestige Point Income.png',
    effects: [
      { label: '2x Prestige Point Income', source: st.perkPrestigePts }
    ],
  },
  {
    slug: '2x_bar_income',
    name: '2x Bar Income',
    icon: '2x Bar Income.png',
    effects: [
      { label: '2x Bar Income', source: st.perkBarOutput }
    ],
  },
  {
    slug: '3x_bomb_damage',
    name: '3x Bomb Damage',
    icon: '3x Bomb Damage.png',
    effects: [
      { label: '3x Bomb Damage', source: st.perkBombDamage }
    ],
  },
]

// ─── Perk Bundles ───────────────────────────────────────────────────────────

export const PERK_BUNDLES: readonly PerkBundle[] = [
  {
    slug: 'ore_prestige_bundle',
    name: '2x Ore Income + 2x Prestige Point Income',
    perkSlugs: ['2x_ore_income', '2x_prestige_point_income'],
    bonusGems: 525,
  },
  {
    slug: 'bombs_bars_bundle',
    name: '2x Bar Income + 3x Bomb Damage',
    perkSlugs: ['2x_bar_income', '3x_bomb_damage'],
    bonusGems: 375,
  },
]

// ─── Gem Unlocks ────────────────────────────────────────────────────────────

export const GEM_UNLOCKS: readonly GemUnlock[] = [
  {
    slug: 'permanent_drone',
    name: 'Permanent Drone',
    icon: 'permadrone vp.png',
    gemCost: 200,
    mirrorUnlockKey: 'unlocked_permanent_drone',
    effects: [
      { label: 'Give an additional Drone that will automatic mine your ore even when you are offline.', source: st.vpDroneCount }
    ],
  },
  {
    slug: 'megabomb',
    name: 'MEGABOMB',
    icon: 'megabomb vp.png',
    gemCost: 500,
    mirrorUnlockKey: 'unlocked_megabomb',
    effects: [
      {
        label: 'Deals 25x damage to all ores on short cooldown',
      }
    ],
  },
  {
    slug: 'transmuter_bomb',
    name: 'Transmuter Bomb',
    icon: 'transmuter vp.png',
    gemCost: 750,
    mirrorUnlockKey: 'unlocked_transmuter_bomb',
    effects: [
      {
        label: 'Marks ores to drop bars, scales with rock size',
      }
    ],
  },
  {
    slug: 'battery_bomb',
    name: 'Battery Bomb',
    icon: 'battery vp.png',
    gemCost: 1000,
    mirrorUnlockKey: 'unlocked_battery_bomb',
    effects: [
      {
        label: 'Charges 2 random bombs, 0.1% to increase all bomb caps by 1',
      }
    ],
  },
]

// ─── Gem Upgrades ───────────────────────────────────────────────────────────
// maxLevel values are ABSOLUTE max (base + all known cap-increase sources:
// Statue of Hygiene, Statue of Craftsmanship, Minos idol). Per user spec.

export const GEM_UPGRADES: readonly GemUpgrade[] = [
  {
    slug: 'pickaxe_damage',
    name: 'Pickaxe Damage',
    icon: 'Pickaxe Damage.png',
    gemCost: 200,
    effects: [
      { label: '+0.20x per level', source: st.gemPickaxeDamage }
    ],
  },
  {
    slug: 'bomb_damage_capacity',
    name: 'Bomb Damage & Bomb Capacity',
    icon: 'Bomb Capacity.png',
    gemCost: 225,
    effects: [
      { label: '+20% damage per level', source: st.gemBombDamage },
      { label: '+2 capacity per level', source: st.gemBombCapacity }
    ],
  },
  {
    slug: 'banked_freebie_cap',
    name: 'Banked Freebie Cap',
    icon: 'Banked_Freebie_Cap.png',
    gemCost: 250,
    effects: [
      { label: '+1 Freebie per level', source: st.gemFreebieBank }
    ],
  },
  {
    slug: 'chest_meter_fill_rate',
    name: 'Chest Meter Fill Rate',
    icon: 'Chest_Meter_Gain_Multiplier.png',
    gemCost: 300,
    effects: [
      { label: '5x per level (multiplicative)', source: st.gemChestMeter }
    ],
  },
  {
    slug: 'items_contained_in_chests',
    name: 'Items Contained In Chests',
    icon: 'Items Contained In Chests.png',
    gemCost: 650,
    effects: [
      { label: '+1 item per level', source: st.gemItemsInChests }
    ],
  },
  {
    slug: 'ore_sell_price',
    name: 'Ore Sell Price',
    icon: 'Ore_Sell_Price_Multiplier.png',
    gemCost: 850,
    effects: [
      { label: '+100% per level', source: st.gemOreSellPrice }
    ],
  },
]

// ─── Founder VIP Lounge Tiers ───────────────────────────────────────────────

export const FOUNDER_TIERS: readonly FounderTier[] = [
  {
    tier: 1,
    vipPointsRequired: 960,
    effects: [
      { label: 'Founder Supply Drop Cooldown', source: st.founderSupplyDropCd },
    ],
  },
  {
    tier: 2,
    vipPointsRequired: 1440,
    effects: [
      { label: 'Double Supply Drop Chance', source: st.founderDoubleSupplyDrop },
    ],
  },
  {
    tier: 3,
    vipPointsRequired: 2080,
    effects: [
      { label: '10x Craft Chance', source: st.founderCraft10x },
    ],
  },
  {
    tier: 4,
    vipPointsRequired: 2880,
    effects: [
      { label: 'Bomb Of Plenty Multiplier', source: st.founderBomBofPlenty },
    ],
  },
  {
    tier: 5,
    vipPointsRequired: 3920,
    effects: [
      { label: 'Golden Lootbug Chance', source: st.founderGoldenLootbug },
    ],
  },
  {
    tier: 6,
    vipPointsRequired: 5360,
    effects: [
      { label: 'Banked Freebies', source: st.founderFreebieBank },
    ],
  },
  {
    tier: 7,
    vipPointsRequired: 7440,
    effects: [
      { label: 'Triple Supply Drop Chance', source: st.founderTripleSupplyDrop },
    ],
  },
  {
    tier: 8,
    vipPointsRequired: 9920,
    effects: [
      { label: 'Gems From Freebie', source: st.founderFreebieGems },
    ],
  },
  {
    tier: 9,
    vipPointsRequired: 12480,
    effects: [
      { label: 'Rainbow Floor Chance', source: st.founderRainbowFloor },
    ],
  },
  {
    tier: 10,
    vipPointsRequired: 16000,
    effects: [
      { label: 'Game Speed', source: st.founderGameSpeed },
    ],
  },
  {
    tier: 11,
    vipPointsRequired: 21600,
    effects: [
      { label: 'Golden Supply Drop Chance', source: st.founderGoldenSupplyDrop },
    ],
  },
  {
    tier: 12,
    vipPointsRequired: 28800,
    effects: [
      { label: 'Gem Bomb Gem Chance', source: st.founderGemBombGemChance },
    ],
  },
]

// ─── Value Packs ────────────────────────────────────────────────────────────

export const VALUE_PACKS: readonly ValuePack[] = [
  {
    slug: 'permanent_drone_pack',
    name: 'Unlocks Permanent Drone!',
    icon: 'permadrone vp.png',
    unlockRequirement: 'Disappears if bought with gems',
    mirrorUnlockKey: 'unlocked_permanent_drone',
    effects: [
      { label: 'Additional automatic mining drone', source: st.vpDroneCount },
    ],
  },
  {
    slug: 'megabomb_pack',
    name: 'Unlocks MEGABOMB!',
    icon: 'megabomb vp.png',
    unlockRequirement: 'Disappears if bought with gems',
    mirrorUnlockKey: 'unlocked_megabomb',
    effects: [
      {
        label: '25x damage to all ores on short cooldown' 
      },
    ],
  },
  {
    slug: 'transmuter_bomb_pack',
    name: 'Unlocks Transmuter Bomb!',
    icon: 'transmuter vp.png',
    unlockRequirement: 'Disappears if bought with gems',
    mirrorUnlockKey: 'unlocked_transmuter_bomb',
    effects: [
      {
        label: 'Marks ores to drop bars, scales with rock size' 
      },
    ],
  },
  {
    slug: 'battery_bomb_pack',
    name: 'Unlocks Battery Bomb!',
    icon: 'battery vp.png',
    unlockRequirement: 'Disappears if bought with gems',
    mirrorUnlockKey: 'unlocked_battery_bomb',
    effects: [
      {
        label: 'Charges 2 random other bombs.  0.1% to increase bomb cap by 1' 
      },
    ],
  },
  {
    slug: 'skill_surge_bundle',
    name: 'Skill Surge Bundle!',
    icon: 'skillsurgebundle vp.png',
    unlockRequirement: 'Requirement: N/A',
    effects: [
      { label: '+1% Freebie Pack Skill Shard Chance', source: st.vpSkillSurgeSkillShard },
    ],
  },
  {
    slug: 'investment_package',
    name: 'Investment Package!',
    icon: 'investment vp.png',
    unlockRequirement: 'Requirement: N/A',
    effects: [
      { label: '5% Chance to hit a Freebie Pack Jackpot', source: st.vpFreebie5xChance },
    ],
  },
  {
    slug: 'bankers_bundle',
    name: "Banker's Bundle!",
    icon: 'bankersbundle vp.png',
    unlockRequirement: 'Requirement: N/A',
    effects: [
      { label: 'Banked Freebie Cap +3', source: st.vpBankersFreebieBank },
      { label: 'Banked Lootbug Cap +3', source: st.vpBankersLootbugBank },
      { label: 'Gems from Freebie +1', source: st.vpBankersFreebieGems },
      { label: 'Freebie Jackpot Chance +1%', source: st.vpBankersFreebie5x },
    ],
  },
  {
    slug: 'gotta_go_fast_bundle',
    name: 'Gotta Go Fast Bundle!',
    icon: 'gofast vp.png',
    unlockRequirement: 'Requirement: N/A',
    effects: [
      { label: '+10% Game Speed', source: st.vpGottaGoFastGameSpeed },
    ],
  },
  {
    slug: 'golden_lootbug_bundle',
    name: 'Golden Lootbug Bundle!',
    icon: 'goldenlootbug vp.png',
    unlockRequirement: 'Requirement: N/A',
    effects: [
      { label: '20% to spawn a Golden Lootbug', source: st.vpGoldenLootbug },
    ],
  },
  {
    slug: 'bigger_bankers_bundle',
    name: "Bigger Banker's Bundle!",
    icon: 'biggerbanksbundle vp.png',
    unlockRequirement: 'Requirement: N/A',
    effects: [
      { label: 'Banked Freebie Cap +5', source: st.vpBiggerBankersFreebieBank },
      { label: 'Banked Lootbug Cap +5', source: st.vpBiggerBankersLootbugBank },
      { label: 'Gems from Freebie +1', source: st.vpBiggerBankersFreebieGems },
      { label: 'Freebie Instant Refresh +1%', source: st.vpBiggerBankersRefresh },
    ],
  },
  {
    slug: 'baller_skin_bundle',
    name: 'Baller Skin Bundle!',
    icon: 'baller vp.png',
    unlockRequirement: 'Requirement: N/A',
    effects: [
      { label: '2.00x Ore Sell Price', source: st.vpBallerOreSell },
    ],
  },
  {
    slug: 'pet_trainer_bundle',
    name: 'Pet Trainer Bundle!',
    icon: 'petbooster vp.png',
    unlockRequirement: 'Obelisk Level 17',
    effects: [
      { label: 'Pet Level Up Chance 1.20x', source: st.vpPetTrainerPetLevel },
      { label: 'Vein Spawn Rate 1.10x', source: st.vpPetTrainerVeinSpawn },
      { label: 'Experience Gain 2.00x', source: st.vpPetTrainerExp },
      { label: 'Rainbow Floor Chance +1%', source: st.vpPetTrainerRainbowFloor },
    ],
  },
  {
    slug: 'vein_extractor_bundle',
    name: 'Vein Extractor Bundle!',
    icon: 'veinextractor vp.png',
    unlockRequirement: 'Obelisk Level 19',
    effects: [
      { label: '1.15x Vein Income Multi', source: st.vpVeinExtractorVeinIncome },
      { label: '+5% Golden Vein Chance', source: st.vpVeinExtractorGoldenVeinChance },
      { label: '+2% Rainbow Vein Chance', source: st.vpVeinExtractorRainbowVeinChance },
      { label: '1.25x Golden Vein Multi', source: st.vpVeinExtractorGoldenVeinMul },
    ],
  },
  {
    slug: 'stargazing_supernova_bundle',
    name: 'Stargazing Supernova Bundle!',
    icon: 'stargazingbundle vp.png',
    unlockRequirement: 'Obelisk Level 23',
    effects: [
      { label: '+3% Star Supernova Chance', source: st.vpSupernovaStarNova },
      { label: '+3% Super Star Supernova Chance', source: st.vpSupernovaSuperStarNova },
      { label: '1.10x Star Supernova Multiplier', source: st.vpSupernovaStarNovaMul },
      { label: '1.10x Super Star Supernova Multiplier', source: st.vpSupernovaSuperStarNovaMul },
      { label: '+3% Triple Star Chance', source: st.vpSupernovaTripleStar },
      { label: '+3% Triple Super Star Chance', source: st.vpSupernovaTripleSuperStar },
    ],
  },
  {
    slug: 'capitalist_bundle',
    name: 'Capitalist Bundle!',
    icon: 'capitalistbundle vp.png',
    unlockRequirement: 'Obelisk Level 25',
    effects: [
      { label: '+2 Gems from Freebie Pack', source: st.vpCapitalistFreebieGems },
      { label: '+15% Bonus Relic from Freebie', source: st.vpCapitalistRelicChance },
    ],
  },
  {
    slug: 'archaeology_bundle',
    name: 'Archaeology Bundle!',
    icon: 'archbundle vp.png',
    unlockRequirement: 'Obelisk Level 30',
    effects: [
      { label: '1.25x Fragment Gain', source: st.vpArchFragmentGain },
      { label: '+1 Gem from Freebie Pack', source: st.vpArchFreebieGems },
    ],
  },
  {
    slug: 'progression_booster_bundle',
    name: 'Progression Booster Bundle!',
    icon: 'progressionbundle vp.png',
    unlockRequirement: 'Obelisk Level 30',
    effects: [
      { label: '1.20x Golden Floor Multi', source: st.vpProgressionGoldenFloor },
      { label: '1.15x Vein Income Multi', source: st.vpProgressionVeinIncome },
      { label: '1.10x Bomb Recharge', source: st.vpProgressionBombRecharge },
      { label: '5% Triple Star Chance', source: st.vpProgressionTripleStar },
    ],
  },
  {
    slug: 'bomber_extraordinaire_bundle',
    name: 'Bomber Extraordinaire Bundle!',
    icon: 'bomberextraordinaire vp.png',
    unlockRequirement: 'Obelisk Level 30',
    effects: [
      { label: '1.10x Bomb Recharge Rate', source: st.vpBomberBombRecharge },
      { label: '1.10x Bomb Capacity', source: st.vpBomberBombCapacity },
      { label: '+5x Plenty Bomb Multi', source: st.vpBomberBopMulti },
      { label: '+10x Transmuter Multi', source: st.vpBomberTransmuterMulti },
    ],
  },
  {
    slug: 'lootbug_bonanza_bundle',
    name: 'Lootbug Bonanza Bundle!',
    icon: 'Lootbugbonanza vp.png',
    unlockRequirement: 'Obelisk Level 32',
    effects: [
      { label: '1.20x Lootbug Loot Multiplier', source: st.vpLootbugBonanzaLootMul },
      { label: '+10 Banked Lootbug Capacity', source: st.vpLootbugBonanzaBankCap },
    ],
  },
  {
    slug: 'insider_trading_bundle',
    name: 'Insider Trading Bundle!',
    icon: 'superstonks vp.png',
    unlockRequirement: 'Obelisk Level 34, Unlocked Stonks skill',
    effects: [
      { label: 'Freebie Stonks Procs Give 2x Loot', source: st.vpInsiderStonksMul },
      { label: '+2 Banked Freebie Cap', source: st.vpInsiderFreebieBank },
    ],
  },
  {
    slug: 'craftmaster_bundle',
    name: 'Craftmaster Bundle!',
    icon: 'craftmasterbundle vp.png',
    unlockRequirement: 'Obelisk Level 35',
    effects: [
      { label: '+1% 100x Craft Chance', source: st.vpCraftmaster100xCraft },
      { label: '+2% 10x Craft Chance', source: st.vpCraftmaster10xCraft },
      { label: '+2% Free Craft Chance', source: st.vpCraftmasterFreeCraft },
      { label: '-5% Bar Craft Cost', source: st.vpCraftmasterBarCraft },
    ],
  },
  {
    slug: 'drone_catalyst_bundle',
    name: 'Drone Catalyst Bundle!',
    icon: 'dronecatalyst vp.png',
    unlockRequirement: 'Obelisk Level 35',
    effects: [
      { label: '1.35x Drone Exp Gain', source: st.vpDroneCatalystExp },
      { label: '1.10x Fuel Duration', source: st.vpDroneCatalystFuel },
    ],
  },
  {
    slug: 'polychrome_potency_bundle',
    name: 'Polychrome Potency Bundle!',
    icon: 'polychromepotency vp.png',
    unlockRequirement: 'Obelisk Level 37, Unlocked "This Is Gonna Take A While.." skill',
    effects: [
      { label: '1.15x Poly Ore Multi', source: st.vpPolyPotencyOre },
      { label: '1.15x Poly Vein Multi', source: st.vpPolyPotencyVein },
      { label: '1.15x Poly Star Multi', source: st.vpPolyPotencyStar },
      { label: '1.15x Poly Fish Multi', source: st.vpPolyPotencyFish },
    ],
  },
  {
    slug: 'fishers_bundle',
    name: "Fisher's Bundle!",
    icon: 'fishingbundle vp.png',
    unlockRequirement: 'Obelisk Level 37',
    effects: [
      { label: '+10% Triple Fishing Tick Chance', source: st.vpFishersTripleTick },
    ],
  },
  {
    slug: 'anglers_bundle',
    name: "Angler's Bundle!",
    icon: 'anglerbundle vp.png',
    unlockRequirement: 'Obelisk Level 39',
    effects: [
      { label: '+6% Tiny Notice Chance', source: st.vpAnglersNotice },
    ],
  },
  {
    slug: 'singularity_bundle',
    name: 'Singularity Bundle!',
    icon: 'singularity vp.png',
    unlockRequirement: 'Obelisk Level 60',
    effects: [
      { label: 'All Star Multi 1.10x', source: st.vpSingularityAllStar },
      { label: 'Star Supergiant Chance +3%', source: st.vpSingularitySupergiantChance },
      { label: 'Novagiant Multi 1.10x', source: st.vpSingularityNovagiant },
      { label: 'Super Star 10x Chance +3%', source: st.vpSingularity10xSuperStar },
    ],
  },
  {
    slug: 'ascension_bundle',
    name: 'Ascension Bundle!',
    icon: 'ascension vp.png',
    unlockRequirement: 'Obelisk Level 66',
    effects: [
      { label: 'Archaeology Exp 1.15x', source: st.vpAscensionArchExp },
      { label: 'Crosshair Auto-Tap +5%', source: st.vpAscensionAutoTap },
      { label: 'Loot Mod Chance +2%', source: st.vpAscensionLootMod },
      { label: 'Golden Crosshair Chance +2%', source: st.vpAscensionGoldenCrosshair },
    ],
  },
  {
    slug: 'void_overdrive_bundle',
    name: 'Void Overdrive Bundle!',
    icon: 'voidoverdrive vp.png',
    unlockRequirement: 'Golden Void Portal Chance >= 1%',
    effects: [
      { label: 'Void Base Multi 1.10x', source: st.vpVoidOverdriveVoidMul },
      { label: 'Golden Portal Multi 1.10x', source: st.vpVoidOverdriveGoldenPortalMul },
      { label: 'Golden Portal Chance +2%', source: st.vpVoidOverdriveGoldenPortalChance },
      { label: 'Fuel Duration 1.10x', source: st.vpVoidOverdriveFuel },
    ],
  },
  {
    slug: 'frog_frenzy_bundle',
    name: 'Frog Frenzy Bundle!',
    icon: 'frogfrenzy vp.png',
    unlockRequirement: 'Black Hole 1',
    effects: [
      { label: 'Lootfrog Loot Multi x1.20', source: st.vpFrogFrenzyLootfrogMul },
      { label: 'Triple Frog Chance +3%', source: st.vpFrogFrenzyTriple },
      { label: 'Frog Capacity +2', source: st.vpFrogFrenzyCapacity },
    ],
  },
  {
    slug: 'legendary_hauler_bundle',
    name: 'Legendary Hauler Bundle!',
    icon: 'legendaryhauler vp.png',
    unlockRequirement: 'Tier 2 Fishing Docks Unlocked',
    effects: [
      { label: '5x Fishing Tick Chance +3%', source: st.vpLegendaryHauler5xTick },
      { label: 'Fish Income Multi 1.10x', source: st.vpLegendaryHaulerFishIncome },
      { label: 'Tier 2 Dock Power 1.10x', source: st.vpLegendaryHaulerTier2Dock },
    ],
  },
  {
    slug: 'chief_executive_bundle',
    name: 'Chief Executive Bundle!',
    icon: 'chiefexecutive vp.png',
    unlockRequirement: 'Super Stonks Chance >= 1%',
    effects: [
      { label: 'Super Stonks Chance +2%', source: st.vpChiefExecSuperStonksChance },
      { label: 'Super Stonks Multi 1.15x', source: st.vpChiefExecSuperStonksMul },
      { label: 'Gems from Freebie +4', source: st.vpChiefExecFreebieGems },
      { label: 'Banked Freebie Cap 1.10x', source: st.vpChiefExecFreebieBank },
    ],
  },
  {
    slug: 'golden_ore_bundle',
    name: 'Golden Ore Bundle!',
    icon: 'goldenorebundle vp.png',
    unlockRequirement: 'Requires Golden Ore Chance',
    effects: [
      { label: '+3% Golden Ore Chance', source: st.vpGoldenOreChance },
      { label: '1.25x Golden Ore Multiplier', source: st.vpGoldenOreMul },
    ],
  },
  {
    slug: 'stargazing_supergiant_bundle',
    name: 'Stargazing Supergiant Bundle!',
    icon: 'supergiantbundle vp.png',
    unlockRequirement: 'Requires Star Supergiant Chance',
    effects: [
      { label: '+3% Star Supergiant Chance', source: st.vpSupergiants3StarsChance },
      { label: '+3% Super Star Supergiant Chance', source: st.vpSupergiants3SuperStarsChance },
      { label: '1.10x Supergiant Multis', source: st.vpSupergiants3StarMul },
      { label: '+3% Triple Star Chance', source: st.vpSupergiants3TripleStar },
      { label: '+1% 10x Super Star Chance', source: st.vpSupergiants10xSuperStar },
    ],
  },
  {
    slug: 'half_way_bundle',
    name: 'Half Way Bundle!',
    icon: 'halfway vp.png',
    unlockRequirement: '50% completion',
    effects: [
      { label: 'Rainbow Floor Multi 1.10x', source: st.vpHalfWayRainbowFloorMul },
      { label: 'Novagiant Combo Multi 1.10x', source: st.vpHalfWayNovagiant },
      { label: 'Fishing Rod Multi 1.10x', source: st.vpHalfWayFishingRod },
      { label: 'Gems From Freebie +2', source: st.vpHalfWayFreebieGems },
    ],
  },
]

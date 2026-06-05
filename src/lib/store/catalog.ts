// ─── Type definitions ───────────────────────────────────────────────────────

export interface StoreEffect {
  label?: string  // when absent, derive from registry: `${getStatMeta(derivedStatKey)?.name}: ${formatStatByKey(value)}`
  derivedStatKey?: string
  value?: number
  /** Context-specific tooltip addition. Base description comes from STAT_REGISTRY via derivedStatKey. */
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
  maxLevel: number
  gemCost: number
  effects: StoreEffect[]
}

// Display unit for founder-tier effects. All numeric values are stored as
// decimals (e.g. 0.12 not 12 for percent). The unit drives the formatter.
export type FounderEffectUnit = 'minutes' | 'percent' | 'multiplier' | 'count'

export interface FounderEffect extends StoreEffect {
  baseValue: number
  increment: number
  unit: FounderEffectUnit
}

export interface FounderTier {
  tier: number
  vipPointsRequired: number
  effects: FounderEffect[]
}

export function vipEffectAt(
  unlockedTier: number,
  effectUnlockTier: number,
  baseValue: number,
  increment: number,
): number {
  if (unlockedTier < effectUnlockTier) return 0
  return baseValue + (unlockedTier - effectUnlockTier) * increment
}

export function formatVipEffectValue(value: number, unit: FounderEffectUnit): string {
  switch (unit) {
    case 'minutes': return `${value} minutes`
    case 'percent': {
      const pct = value * 100
      // Avoid trailing .0 on whole numbers; keep up to 2 decimals for 0.5%, 2.5% etc.
      const text = Number.isInteger(pct) ? String(pct) : pct.toFixed(2).replace(/\.?0+$/, '')
      return `${text}%`
    }
    case 'multiplier': return `${value}x`
    case 'count': return String(value)
  }
}

// ─── Perks ──────────────────────────────────────────────────────────────────

export const PERKS: readonly Perk[] = [
  {
    slug: '2x_ore_income',
    name: '2x Ore Income',
    icon: '2x Ore Income.png',
    effects: [
      {
        label: '2x Ore Income',
        derivedStatKey: 'ore_income_multi',
        value: 2,
      }
    ],
  },
  {
    slug: '2x_prestige_point_income',
    name: '2x Prestige Point Income',
    icon: '2x Prestige Point Income.png',
    effects: [
      {
        label: '2x Prestige Point Income',
        derivedStatKey: 'prestige_point_multi',
        value: 2,
      }
    ],
  },
  {
    slug: '2x_bar_income',
    name: '2x Bar Income',
    icon: '2x Bar Income.png',
    effects: [
      {
        label: '2x Bar Income',
        derivedStatKey: 'bar_output_multi',
        value: 2,
      }
    ],
  },
  {
    slug: '3x_bomb_damage',
    name: '3x Bomb Damage',
    icon: '3x Bomb Damage.png',
    effects: [
      {
        label: '3x Bomb Damage',
        derivedStatKey: 'bomb_damage',
        value: 3,
      }
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
      {
        label: 'Give an additional Drone that will automatic mine your ore even when you are offline.',
        derivedStatKey: 'drone_count',
        value: 1,
      }
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
    maxLevel: 22,
    gemCost: 200,
    effects: [
      {
        label: '+0.20x per level',
        derivedStatKey: 'pickaxe_damage',
        value: 0.20
      }
    ],
  },
  {
    slug: 'bomb_damage_capacity',
    name: 'Bomb Damage & Bomb Capacity',
    icon: 'Bomb Capacity.png',
    maxLevel: 22,
    gemCost: 225,
    effects: [
      {
        label: '+20% damage per level',
        derivedStatKey: 'bomb_damage',
        value: 0.20
      },
      {
        label: '+2 capacity per level',
        derivedStatKey: 'bomb_capacity',
        value: 2
      }
    ],
  },
  {
    slug: 'banked_freebie_cap',
    name: 'Banked Freebie Cap',
    icon: 'Banked_Freebie_Cap.png',
    maxLevel: 14,
    gemCost: 250,
    effects: [
      {
        label: '+1 Freebie per level',
        derivedStatKey: 'freebie_bank_cap',
        value: 1
      }
    ],
  },
  {
    slug: 'chest_meter_fill_rate',
    name: 'Chest Meter Fill Rate',
    icon: 'Chest_Meter_Gain_Multiplier.png',
    maxLevel: 17,
    gemCost: 300,
    effects: [
      {
        label: '5x per level (multiplicative)',
        derivedStatKey: 'chest_meter_multi',
        value: 5
      }
    ],
  },
  {
    slug: 'items_contained_in_chests',
    name: 'Items Contained In Chests',
    icon: 'Items Contained In Chests.png',
    maxLevel: 17,
    gemCost: 650,
    effects: [
      {
        label: '+1 item per level',
        derivedStatKey: 'chest_items_bonus',
        value: 1
      }
    ],
  },
  {
    slug: 'ore_sell_price',
    name: 'Ore Sell Price',
    icon: 'Ore_Sell_Price_Multiplier.png',
    maxLevel: 14,
    gemCost: 850,
    effects: [
      {
        label: '+100% per level',
        derivedStatKey: 'ore_sell_price_multi',
        value: 1.0
      }
    ],
  },
]

// ─── Founder VIP Lounge Tiers ───────────────────────────────────────────────

export const FOUNDER_TIERS: readonly FounderTier[] = [
  {
    tier: 1,
    vipPointsRequired: 960,
    effects: [
      { label: 'Founder Supply Drop Cooldown', baseValue: 60, increment: -2, unit: 'minutes' },
    ],
  },
  {
    tier: 2,
    vipPointsRequired: 1440,
    effects: [
      { label: 'Double Supply Drop Chance', baseValue: 0.12, increment: 0.06, unit: 'percent' },
    ],
  },
  {
    tier: 3,
    vipPointsRequired: 2080,
    effects: [
      { label: '10x Craft Chance', derivedStatKey: 'craft_10x_chance', baseValue: 0.02, increment: 0.01, unit: 'percent' },
    ],
  },
  {
    tier: 4,
    vipPointsRequired: 2880,
    effects: [
      { label: 'Bomb Of Plenty Multiplier', derivedStatKey: 'bomb_of_plenty_multi', baseValue: 2, increment: 1, unit: 'multiplier' },
    ],
  },
  {
    tier: 5,
    vipPointsRequired: 3920,
    effects: [
      { label: 'Golden Lootbug Chance', derivedStatKey: 'lootbug_golden_chance', baseValue: 0.06, increment: 0.03, unit: 'percent' },
    ],
  },
  {
    tier: 6,
    vipPointsRequired: 5360,
    effects: [
      { label: 'Banked Freebies', derivedStatKey: 'freebie_bank_cap', baseValue: 4, increment: 2, unit: 'count' },
    ],
  },
  {
    tier: 7,
    vipPointsRequired: 7440,
    effects: [
      { label: 'Triple Supply Drop Chance', baseValue: 0.16, increment: 0.08, unit: 'percent' },
    ],
  },
  {
    tier: 8,
    vipPointsRequired: 9920,
    effects: [
      { label: 'Gems From Freebie', derivedStatKey: 'freebie_gems_bonus', baseValue: 2, increment: 1, unit: 'count' },
    ],
  },
  {
    tier: 9,
    vipPointsRequired: 12480,
    effects: [
      { label: 'Rainbow Floor Chance', derivedStatKey: 'rainbow_floor_chance', baseValue: 0.01, increment: 0.01, unit: 'percent' },
    ],
  },
  {
    tier: 10,
    vipPointsRequired: 16000,
    effects: [
      { label: 'Game Speed', derivedStatKey: 'game_speed_multi', baseValue: 0.10, increment: 0.01, unit: 'percent' },
    ],
  },
  {
    tier: 11,
    vipPointsRequired: 21600,
    effects: [
      { label: 'Golden Supply Drop Chance', baseValue: 0.10, increment: 0.02, unit: 'percent' },
    ],
  },
  {
    tier: 12,
    vipPointsRequired: 28800,
    effects: [
      { label: 'Gem Bomb Gem Chance', baseValue: 0.005, increment: 0.005, unit: 'percent' },
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
      {
        label: 'Additional automatic mining drone',
        derivedStatKey: 'drone_count',
        value: 1 
      },
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
      {
        label: '+1% Freebie Pack Skill Shard Chance' 
      },
    ],
  },
  {
    slug: 'investment_package',
    name: 'Investment Package!',
    icon: 'investment vp.png',
    unlockRequirement: 'Requirement: N/A',
    effects: [
      {
        label: '5% Chance to hit a Freebie Pack Jackpot',
        derivedStatKey: 'freebie_5x_chance',
        value: 0.05
      },
    ],
  },
  {
    slug: 'bankers_bundle',
    name: "Banker's Bundle!",
    icon: 'bankersbundle vp.png',
    unlockRequirement: 'Requirement: N/A',
    effects: [
      {
        label: 'Banked Freebie Cap +3',
        derivedStatKey: 'freebie_bank_cap',
        value: 3
      },
      {
        label: 'Banked Lootbug Cap +3',
        derivedStatKey: 'lootbug_bank_cap',
        value: 3
      },
      {
        label: 'Gems from Freebie +1',
        derivedStatKey: 'freebie_gems_bonus',
        value: 1
      },
      {
        label: 'Freebie Jackpot Chance +1%',
        derivedStatKey: 'freebie_5x_chance',
        value: 0.01
      },
    ],
  },
  {
    slug: 'gotta_go_fast_bundle',
    name: 'Gotta Go Fast Bundle!',
    icon: 'gofast vp.png',
    unlockRequirement: 'Requirement: N/A',
    effects: [
      {
        label: '+10% Game Speed',
        derivedStatKey: 'game_speed_multi',
        value: 0.10
      },
    ],
  },
  {
    slug: 'golden_lootbug_bundle',
    name: 'Golden Lootbug Bundle!',
    icon: 'goldenlootbug vp.png',
    unlockRequirement: 'Requirement: N/A',
    effects: [
      {
        label: '20% to spawn a Golden Lootbug',
        derivedStatKey: 'lootbug_golden_chance',
        value: 0.20
      },
    ],
  },
  {
    slug: 'bigger_bankers_bundle',
    name: "Bigger Banker's Bundle!",
    icon: 'biggerbanksbundle vp.png',
    unlockRequirement: 'Requirement: N/A',
    effects: [
      {
        label: 'Banked Freebie Cap +5',
        derivedStatKey: 'freebie_bank_cap',
        value: 5
      },
      {
        label: 'Banked Lootbug Cap +5',
        derivedStatKey: 'lootbug_bank_cap',
        value: 5
      },
      {
        label: 'Gems from Freebie +1',
        derivedStatKey: 'freebie_gems_bonus',
        value: 1
      },
      {
        label: 'Freebie Instant Refresh +1%',
        derivedStatKey: 'freebie_refresh_chance',
        value: 0.01
      },
    ],
  },
  {
    slug: 'baller_skin_bundle',
    name: 'Baller Skin Bundle!',
    icon: 'baller vp.png',
    unlockRequirement: 'Requirement: N/A',
    effects: [
      {
        label: '2.00x Ore Sell Price',
        derivedStatKey: 'ore_sell_price_multi',
        value: 2
      },
    ],
  },
  {
    slug: 'pet_trainer_bundle',
    name: 'Pet Trainer Bundle!',
    icon: 'petbooster vp.png',
    unlockRequirement: 'Obelisk Level 17',
    effects: [
      {
        label: 'Pet Level Up Chance 1.20x',
        derivedStatKey: 'pet_levelup_chance_multi',
        value: 1.20
      },
      {
        label: 'Vein Spawn Rate 1.10x',
        derivedStatKey: 'vein_spawn_rate_multi',
        value: 1.10
      },
      {
        label: 'Experience Gain 2.00x',
        derivedStatKey: 'experience_multi',
        value: 2.00
      },
      {
        label: 'Rainbow Floor Chance +1%',
        derivedStatKey: 'rainbow_floor_chance',
        value: 0.01
      },
    ],
  },
  {
    slug: 'vein_extractor_bundle',
    name: 'Vein Extractor Bundle!',
    icon: 'veinextractor vp.png',
    unlockRequirement: 'Obelisk Level 19',
    effects: [
      {
        label: '1.15x Vein Income Multi',
        derivedStatKey: 'vein_income_multi',
        value: 1.15
      },
      {
        label: '+5% Golden Vein Chance',
        derivedStatKey: 'golden_vein_chance',
        value: 0.05
      },
      {
        label: '+2% Rainbow Vein Chance',
        derivedStatKey: 'rainbow_vein_chance',
        value: 0.02
      },
      {
        label: '1.25x Golden Vein Multi',
        derivedStatKey: 'golden_vein_multi',
        value: 1.25
      },
    ],
  },
  {
    slug: 'stargazing_supernova_bundle',
    name: 'Stargazing Supernova Bundle!',
    icon: 'stargazingbundle vp.png',
    unlockRequirement: 'Obelisk Level 23',
    effects: [
      {
        label: '+3% Star Supernova Chance',
        derivedStatKey: 'star_supernova_chance',
        value: 0.03
      },
      {
        label: '+3% Super Star Supernova Chance',
        derivedStatKey: 'super_star_supernova_chance',
        value: 0.03
      },
      {
        label: '1.10x Star Supernova Multiplier',
        derivedStatKey: 'star_supernova_multi',
        value: 1.10
      },
      {
        label: '1.10x Super Star Supernova Multiplier',
        derivedStatKey: 'super_star_supernova_multi',
        value: 1.10
      },
      {
        label: '+3% Triple Star Chance',
        derivedStatKey: 'star_triple_spawn_chance',
        value: 0.03
      },
      {
        label: '+3% Triple Super Star Chance',
        derivedStatKey: 'super_star_triple_chance',
        value: 0.03
      },
    ],
  },
  {
    slug: 'capitalist_bundle',
    name: 'Capitalist Bundle!',
    icon: 'capitalistbundle vp.png',
    unlockRequirement: 'Obelisk Level 25',
    effects: [
      {
        label: '+2 Gems from Freebie Pack',
        derivedStatKey: 'freebie_gems_bonus',
        value: 2
      },
      {
        label: '+15% Bonus Relic from Freebie'
      },
    ],
  },
  {
    slug: 'archaeology_bundle',
    name: 'Archaeology Bundle!',
    icon: 'archbundle vp.png',
    unlockRequirement: 'Obelisk Level 30',
    effects: [
      {
        label: '1.25x Fragment Gain'
      },
      {
        label: '+1 Gem from Freebie Pack',
        derivedStatKey: 'freebie_gems_bonus',
        value: 1
      },
    ],
  },
  {
    slug: 'progression_booster_bundle',
    name: 'Progression Booster Bundle!',
    icon: 'progressionbundle vp.png',
    unlockRequirement: 'Obelisk Level 30',
    effects: [
      {
        label: '1.20x Golden Floor Multi',
        derivedStatKey: 'golden_floor_multi',
        value: 1.20
      },
      {
        label: '1.15x Vein Income Multi',
        derivedStatKey: 'vein_income_multi',
        value: 1.15
      },
      {
        label: '1.10x Bomb Recharge',
        derivedStatKey: 'bomb_recharge_speed',
        value: 1.10
      },
      {
        label: '5% Triple Star Chance',
        derivedStatKey: 'star_triple_spawn_chance',
        value: 0.05
      },
    ],
  },
  {
    slug: 'bomber_extraordinaire_bundle',
    name: 'Bomber Extraordinaire Bundle!',
    icon: 'bomberextraordinaire vp.png',
    unlockRequirement: 'Obelisk Level 30',
    effects: [
      {
        label: '1.10x Bomb Recharge Rate',
        derivedStatKey: 'bomb_recharge_speed',
        value: 1.10
      },
      {
        label: '1.10x Bomb Capacity',
        derivedStatKey: 'bomb_capacity',
        value: 1.10
      },
      {
        label: '+5x Plenty Bomb Multi',
        derivedStatKey: 'bomb_of_plenty_multi',
        value: 5
      },
      {
        label: '+10x Transmuter Multi',
        derivedStatKey: 'bomb_transmuter_multi',
        value: 10
      },
    ],
  },
  {
    slug: 'lootbug_bonanza_bundle',
    name: 'Lootbug Bonanza Bundle!',
    icon: 'Lootbugbonanza vp.png',
    unlockRequirement: 'Obelisk Level 32',
    effects: [
      {
        label: '1.20x Lootbug Loot Multiplier',
        derivedStatKey: 'lootbug_loot_multi',
        value: 1.20
      },
      {
        label: '+10 Banked Lootbug Capacity',
        derivedStatKey: 'lootbug_bank_cap',
        value: 10
      },
    ],
  },
  {
    slug: 'insider_trading_bundle',
    name: 'Insider Trading Bundle!',
    icon: 'superstonks vp.png',
    unlockRequirement: 'Obelisk Level 34, Unlocked Stonks skill',
    effects: [
      {
        label: 'Freebie Stonks Procs Give 2x Loot',
        derivedStatKey: 'stonks_multi',
        value: 2
      },
      {
        label: '+2 Banked Freebie Cap',
        derivedStatKey: 'freebie_bank_cap',
        value: 2
      },
    ],
  },
  {
    slug: 'craftmaster_bundle',
    name: 'Craftmaster Bundle!',
    icon: 'craftmasterbundle vp.png',
    unlockRequirement: 'Obelisk Level 35',
    effects: [
      {
        label: '+1% 100x Craft Chance',
        derivedStatKey: 'craft_100x_chance',
        value: 0.01
      },
      {
        label: '+2% 10x Craft Chance',
        derivedStatKey: 'craft_10x_chance',
        value: 2
      },
      {
        label: '+2% Free Craft Chance',
        derivedStatKey: 'free_craft_chance',
        value: 0.02
      },
      {
        label: '-5% Bar Craft Cost',
        derivedStatKey: 'bar_craft_cost_multi',
        value: 0.05
      },
    ],
  },
  {
    slug: 'drone_catalyst_bundle',
    name: 'Drone Catalyst Bundle!',
    icon: 'dronecatalyst vp.png',
    unlockRequirement: 'Obelisk Level 35',
    effects: [
      {
        label: '1.35x Drone Exp Gain',
        derivedStatKey: 'coal_drone_exp_multi',
        value: 1.35
      },
      {
        label: '1.10x Fuel Duration',
        derivedStatKey: 'coal_fuel_duration_multi',
        value: 1.10
      },
    ],
  },
  {
    slug: 'polychrome_potency_bundle',
    name: 'Polychrome Potency Bundle!',
    icon: 'polychromepotency vp.png',
    unlockRequirement: 'Obelisk Level 37, Unlocked "This Is Gonna Take A While.." skill',
    effects: [
      {
        label: '1.15x Poly Ore Multi'
      },
      {
        label: '1.15x Poly Vein Multi'
      },
      {
        label: '1.15x Poly Star Multi'
      },
      {
        label: '1.15x Poly Fish Multi'
      },
    ],
  },
  {
    slug: 'fishers_bundle',
    name: "Fisher's Bundle!",
    icon: 'fishingbundle vp.png',
    unlockRequirement: 'Obelisk Level 37',
    effects: [
      {
        label: '+10% Triple Fishing Tick Chance',
        derivedStatKey: 'fishing_triple_tick_chance',
        value: 0.10
      },
    ],
  },
  {
    slug: 'anglers_bundle',
    name: "Angler's Bundle!",
    icon: 'anglerbundle vp.png',
    unlockRequirement: 'Obelisk Level 39',
    effects: [
      {
        label: '+6% Tiny Notice Chance',
        derivedStatKey: 'fishing_tiny_notice_chance',
        value: 0.06
      },
    ],
  },
  {
    slug: 'singularity_bundle',
    name: 'Singularity Bundle!',
    icon: 'singularity vp.png',
    unlockRequirement: 'Obelisk Level 60',
    effects: [
      {
        label: 'All Star Multi 1.10x',
        derivedStatKey: 'all_star_multi',
        value: 1.10
      },
      {
        label: 'Star Supergiant Chance +3%',
        derivedStatKey: 'star_supergiant_chance',
        value: 0.03
      },
      {
        label: 'Novagiant Multi 1.10x',
        derivedStatKey: 'novagiant_combo_multi',
        value: 1.10
      },
      {
        label: 'Super Star 10x Chance +3%',
        derivedStatKey: 'super_star_10x_chance',
        value: 0.03
      },
    ],
  },
  {
    slug: 'ascension_bundle',
    name: 'Ascension Bundle!',
    icon: 'ascension vp.png',
    unlockRequirement: 'Obelisk Level 66',
    effects: [
      {
        label: 'Archaeology Exp 1.15x'
      },
      {
        label: 'Crosshair Auto-Tap +5%'
      },
      {
        label: 'Loot Mod Chance +2%'
      },
      {
        label: 'Golden Crosshair Chance +2%'
      },
    ],
  },
  {
    slug: 'void_overdrive_bundle',
    name: 'Void Overdrive Bundle!',
    icon: 'voidoverdrive vp.png',
    unlockRequirement: 'Golden Void Portal Chance >= 1%',
    effects: [
      {
        label: 'Void Base Multi 1.10x',
        derivedStatKey: 'void_portal_base_multi',
        value: 1.10
      },
      {
        label: 'Golden Portal Multi 1.10x',
        derivedStatKey: 'golden_void_portal_multi',
        value: 1.10
      },
      {
        label: 'Golden Portal Chance +2%',
        derivedStatKey: 'golden_void_portal_chance',
        value: 0.02
      },
      {
        label: 'Fuel Duration 1.10x',
        derivedStatKey: 'coal_fuel_duration_multi',
        value: 1.10
      },
    ],
  },
  {
    slug: 'frog_frenzy_bundle',
    name: 'Frog Frenzy Bundle!',
    icon: 'frogfrenzy vp.png',
    unlockRequirement: 'Black Hole 1',
    effects: [
      {
        label: 'Lootfrog Loot Multi x1.20',
        derivedStatKey: 'lootfrog_loot_multi',
        value: 1.20
      },
      {
        label: 'Triple Frog Chance +3%',
        derivedStatKey: 'lootfrog_triple_spawn_chance',
        value: 0.03
      },
      {
        label: 'Frog Capacity +2',
        derivedStatKey: 'lootfrog_capacity',
        value: 2
      },
    ],
  },
  {
    slug: 'legendary_hauler_bundle',
    name: 'Legendary Hauler Bundle!',
    icon: 'legendaryhauler vp.png',
    unlockRequirement: 'Tier 2 Fishing Docks Unlocked',
    effects: [
      {
        label: '5x Fishing Tick Chance +3%',
        derivedStatKey: 'fishing_5x_tick_chance',
        value: 0.03
      },
      {
        label: 'Fish Income Multi 1.10x',
        derivedStatKey: 'fishing_income_multi',
        value: 1.10
      },
      {
        label: 'Tier 2 Dock Power 1.10x',
        derivedStatKey: 'fishing_tier2_dock_multi',
        value: 1.10
      },
    ],
  },
  {
    slug: 'chief_executive_bundle',
    name: 'Chief Executive Bundle!',
    icon: 'chiefexecutive vp.png',
    unlockRequirement: 'Super Stonks Chance >= 1%',
    effects: [
      {
        label: 'Super Stonks Chance +2%',
        derivedStatKey: 'super_stonks_chance',
        value: 0.02
      },
      {
        label: 'Super Stonks Multi 1.15x',
        derivedStatKey: 'super_stonks_multi',
        value: 1.15
      },
      {
        label: 'Gems from Freebie +4',
        derivedStatKey: 'freebie_gems_bonus',
        value: 4
      },
      {
        label: 'Banked Freebie Cap 1.10x',
        derivedStatKey: 'freebie_bank_cap',
        value: 1.10
      },
    ],
  },
  {
    slug: 'golden_ore_bundle',
    name: 'Golden Ore Bundle!',
    icon: 'goldenorebundle vp.png',
    unlockRequirement: 'Requires Golden Ore Chance',
    effects: [
      {
        label: '+3% Golden Ore Chance',
        derivedStatKey: 'golden_ore_chance',
        value: 0.03
      },
      {
        label: '1.25x Golden Ore Multiplier',
        derivedStatKey: 'golden_ore_multi',
        value: 1.25
      },
    ],
  },
  {
    slug: 'stargazing_supergiant_bundle',
    name: 'Stargazing Supergiant Bundle!',
    icon: 'supergiantbundle vp.png',
    unlockRequirement: 'Requires Star Supergiant Chance',
    effects: [
      {
        label: '+3% Star Supergiant Chance',
        derivedStatKey: 'star_supergiant_chance',
        value: 0.03
      },
      {
        label: '+3% Super Star Supergiant Chance',
        derivedStatKey: 'super_star_supergiant_chance',
        value: 0.03
      },
      {
        label: '1.10x Supergiant Multis',
        derivedStatKey: 'star_supergiant_multi',
        value: 1.10
      },
      {
        label: '+3% Triple Star Chance',
        derivedStatKey: 'star_triple_spawn_chance',
        value: 0.03
      },
      {
        label: '+1% 10x Super Star Chance',
        derivedStatKey: 'super_star_10x_chance',
        value: 0.01
      },
    ],
  },
  {
    slug: 'half_way_bundle',
    name: 'Half Way Bundle!',
    icon: 'halfway vp.png',
    unlockRequirement: '50% completion',
    effects: [
      {
        label: 'Rainbow Floor Multi 1.10x',
        derivedStatKey: 'rainbow_floor_multi',
        value: 1.10
      },
      {
        label: 'Novagiant Combo Multi 1.10x',
        derivedStatKey: 'novagiant_combo_multi',
        value: 1.10
      },
      {
        label: 'Fishing Rod Multi 1.10x',
        derivedStatKey: 'fishing_rod_power',
        value: 1.10
      },
      {
        label: 'Gems From Freebie +2',
        derivedStatKey: 'freebie_gems_bonus',
        value: 2
      },
    ],
  },
]

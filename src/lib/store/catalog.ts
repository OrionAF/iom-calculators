// ─── Type definitions ───────────────────────────────────────────────────────

export interface StoreEffect {
  label: string
  derivedStatKey?: string
  value?: number
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

export interface FounderTier {
  tier: number
  vipPointsRequired: number
  effectId: string
  effectName: string
  baseValue: number
  increment: number
  unit: string
  derivedStatKey?: string
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

// ─── Perks ──────────────────────────────────────────────────────────────────

export const PERKS: readonly Perk[] = [
  {
    slug: '2x_ore_income',
    name: '2x Ore Income',
    icon: '2x Ore Income.png',
    effects: [{ label: '2x Ore Income', derivedStatKey: 'ore_income_multi', value: 2 }],
  },
  {
    slug: '2x_prestige_point_income',
    name: '2x Prestige Point Income',
    icon: '2x Prestige Point Income.png',
    effects: [{ label: '2x Prestige Point Income', derivedStatKey: 'prestige_point_multi', value: 2 }],
  },
  {
    slug: '2x_bar_income',
    name: '2x Bar Income',
    icon: '2x Bar Income.png',
    effects: [{ label: '2x Bar Income', derivedStatKey: 'bar_output_multi', value: 2 }],
  },
  {
    slug: '3x_bomb_damage',
    name: '3x Bomb Damage',
    icon: '3x Bomb Damage.png',
    effects: [{ label: '3x Bomb Damage', derivedStatKey: 'bomb_damage', value: 3 }],
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
    effects: [{ label: 'Additional automatic mining drone', derivedStatKey: 'drone_count', value: 1 }],
  },
  {
    slug: 'megabomb',
    name: 'MEGABOMB',
    icon: 'megabomb vp.png',
    gemCost: 500,
    mirrorUnlockKey: 'unlocked_megabomb',
    effects: [{ label: '25x damage to all ores on short cooldown' }],
  },
  {
    slug: 'transmuter_bomb',
    name: 'Transmuter Bomb',
    icon: 'transmuter vp.png',
    gemCost: 750,
    mirrorUnlockKey: 'unlocked_transmuter_bomb',
    effects: [{ label: 'Marks ores to drop bars, scales with rock size' }],
  },
  {
    slug: 'battery_bomb',
    name: 'Battery Bomb',
    icon: 'battery vp.png',
    gemCost: 1000,
    mirrorUnlockKey: 'unlocked_battery_bomb',
    effects: [{ label: 'Charges 2 random bombs, 0.1% to increase all bomb caps by 1' }],
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
    effects: [{ label: '+0.20x per level', derivedStatKey: 'pickaxe_damage', value: 0.20 }],
  },
  {
    slug: 'bomb_damage_capacity',
    name: 'Bomb Damage & Bomb Capacity',
    icon: 'Bomb Capacity.png',
    maxLevel: 22,
    gemCost: 225,
    effects: [
      { label: '+20% damage per level', derivedStatKey: 'bomb_damage', value: 0.20 },
      { label: '+2 capacity per level', derivedStatKey: 'bomb_capacity', value: 2 },
    ],
  },
  {
    slug: 'banked_freebie_cap',
    name: 'Banked Freebie Cap',
    icon: 'Banked_Freebie_Cap.png',
    maxLevel: 14,
    gemCost: 250,
    effects: [{ label: '+1 Freebie per level', derivedStatKey: 'freebie_bank_cap', value: 1 }],
  },
  {
    slug: 'chest_meter_fill_rate',
    name: 'Chest Meter Fill Rate',
    icon: 'Chest_Meter_Gain_Multiplier.png',
    maxLevel: 17,
    gemCost: 300,
    effects: [{ label: '5x per level (multiplicative)', derivedStatKey: 'chest_meter_multi', value: 5 }],
  },
  {
    slug: 'items_contained_in_chests',
    name: 'Items Contained In Chests',
    icon: 'Items Contained In Chests.png',
    maxLevel: 17,
    gemCost: 650,
    effects: [{ label: '+1 item per level', derivedStatKey: 'chest_items_bonus', value: 1 }],
  },
  {
    slug: 'ore_sell_price',
    name: 'Ore Sell Price',
    icon: 'Ore_Sell_Price_Multiplier.png',
    maxLevel: 14,
    gemCost: 850,
    effects: [{ label: '+100% per level', derivedStatKey: 'ore_sell_price_multi', value: 1.0 }],
  },
]

// ─── Founder VIP Lounge Tiers ───────────────────────────────────────────────

export const FOUNDER_TIERS: readonly FounderTier[] = [
  { tier: 1,  vipPointsRequired: 960,   effectId: 'supply_drop_cooldown',
    effectName: 'Founder Supply Drop every 60 minutes', baseValue: 60,  increment: -2, unit: 'minutes' },
  { tier: 2,  vipPointsRequired: 1440,  effectId: 'double_supply_drop_chance',
    effectName: 'Double Supply Drop Chance', baseValue: 12,  increment: 6,  unit: '%' },
  { tier: 3,  vipPointsRequired: 2080,  effectId: 'craft_10x_chance_bonus',
    effectName: '10x Craft Chance', baseValue: 2,   increment: 1,  unit: '%',
    derivedStatKey: 'craft_10x_chance' },
  { tier: 4,  vipPointsRequired: 2880,  effectId: 'bomb_of_plenty_multi_bonus',
    effectName: 'Bomb Of Plenty Multiplier', baseValue: 2,   increment: 1,  unit: 'x',
    derivedStatKey: 'bomb_of_plenty_multi' },
  { tier: 5,  vipPointsRequired: 3920,  effectId: 'golden_lootbug_chance_bonus',
    effectName: 'Golden Lootbug Chance', baseValue: 6,   increment: 3,  unit: '%',
    derivedStatKey: 'lootbug_golden_chance' },
  { tier: 6,  vipPointsRequired: 5360,  effectId: 'banked_freebies_bonus',
    effectName: 'Banked Freebies', baseValue: 4,   increment: 2,  unit: '',
    derivedStatKey: 'freebie_bank_cap' },
  { tier: 7,  vipPointsRequired: 7440,  effectId: 'triple_supply_drop_chance',
    effectName: 'Triple Supply Drop Chance', baseValue: 16,  increment: 8,  unit: '%' },
  { tier: 8,  vipPointsRequired: 9920,  effectId: 'gems_from_freebie_bonus',
    effectName: 'Gems From Freebie', baseValue: 2,   increment: 1,  unit: '',
    derivedStatKey: 'freebie_gems_bonus' },
  { tier: 9,  vipPointsRequired: 12480, effectId: 'rainbow_floor_chance_bonus',
    effectName: 'Rainbow Floor Chance', baseValue: 1,   increment: 1,  unit: '%',
    derivedStatKey: 'rainbow_floor_chance' },
  { tier: 10, vipPointsRequired: 16000, effectId: 'game_speed_bonus',
    effectName: 'Game Speed', baseValue: 10,  increment: 1,  unit: '%',
    derivedStatKey: 'game_speed_multi' },
  { tier: 11, vipPointsRequired: 21600, effectId: 'golden_supply_drop_chance',
    effectName: 'Golden Supply Drop Chance', baseValue: 10,  increment: 2,  unit: '%' },
  { tier: 12, vipPointsRequired: 28800, effectId: 'gem_bomb_chance',
    effectName: 'Gem Bomb Gem Chance', baseValue: 0.5, increment: 0.5, unit: '%' },
]

// ─── Value Packs ────────────────────────────────────────────────────────────

export const VALUE_PACKS: readonly ValuePack[] = [
  {
    slug: 'ascension_bundle',
    name: 'Ascension Bundle!',
    icon: 'ascension vp.png',
    unlockRequirement: 'Obelisk Level 66',
    effects: [
      { label: 'Archaeology Exp 1.15x', derivedStatKey: 'archaeology_exp_multi', value: 1.15 },
      { label: 'Crosshair Auto-Tap +5%', derivedStatKey: 'crosshair_auto_tap', value: 5 },
      { label: 'Loot Mod Chance +2%' },
      { label: 'Golden Crosshair Chance +2%' },
    ],
  },
  {
    slug: 'half_way_bundle',
    name: 'Half Way Bundle!',
    icon: 'halfway vp.png',
    unlockRequirement: '50% completion',
    effects: [
      { label: 'Rainbow Floor Multi 1.10x', derivedStatKey: 'rainbow_floor_multi', value: 1.10 },
      { label: 'Novagiant Combo Multi 1.10x' },
      { label: 'Fishing Rod Multi 1.10x', derivedStatKey: 'fishing_rod_multi', value: 1.10 },
      { label: 'Gems From Freebie +2', derivedStatKey: 'freebie_gems_bonus', value: 2 },
    ],
  },
  {
    slug: 'permanent_drone_pack',
    name: 'Unlocks Permanent Drone!',
    icon: 'permadrone vp.png',
    unlockRequirement: 'Disappears if bought with gems',
    mirrorUnlockKey: 'unlocked_permanent_drone',
    effects: [
      { label: 'Additional automatic mining drone', derivedStatKey: 'drone_count', value: 1 },
    ],
  },
  {
    slug: 'megabomb_pack',
    name: 'Unlocks MEGABOMB!',
    icon: 'megabomb vp.png',
    unlockRequirement: 'Disappears if bought with gems',
    mirrorUnlockKey: 'unlocked_megabomb',
    effects: [
      { label: '25x damage to all ores on short cooldown' },
    ],
  },
  {
    slug: 'transmuter_bomb_pack',
    name: 'Unlocks Transmuter Bomb!',
    icon: 'transmuter vp.png',
    unlockRequirement: 'Disappears if bought with gems',
    mirrorUnlockKey: 'unlocked_transmuter_bomb',
    effects: [
      { label: 'Marks ores to drop bars, scales with rock size' },
    ],
  },
  {
    slug: 'battery_bomb_pack',
    name: 'Unlocks Battery Bomb!',
    icon: 'battery vp.png',
    unlockRequirement: 'Disappears if bought with gems',
    mirrorUnlockKey: 'unlocked_battery_bomb',
    effects: [
      { label: 'Charges 2 random bombs, 0.1% to increase all bomb caps by 1' },
    ],
  },
  {
    slug: 'skill_surge_bundle',
    name: 'Skill Surge Bundle!',
    icon: 'skillsurgebundle vp.png',
    effects: [
      { label: '+1% Freebie Pack Skill Shard Chance' },
    ],
  },
  {
    slug: 'investment_package',
    name: 'Investment Package!',
    icon: 'investment vp.png',
    effects: [
      { label: '5% Chance to hit a Freebie Pack Jackpot' },
    ],
  },
  {
    slug: 'bankers_bundle',
    name: "Banker's Bundle!",
    icon: 'bankersbundle vp.png',
    effects: [
      { label: 'Banked Freebie Cap +3', derivedStatKey: 'freebie_bank_cap', value: 3 },
      { label: 'Banked Lootbug Cap +3', derivedStatKey: 'lootbug_bank_cap', value: 3 },
      { label: 'Gems from Freebie +1', derivedStatKey: 'freebie_gems_bonus', value: 1 },
      { label: 'Freebie Jackpot Chance +1%' },
    ],
  },
  {
    slug: 'progression_booster_bundle',
    name: 'Progression Booster Bundle!',
    icon: 'progressionbundle vp.png',
    unlockRequirement: 'Obelisk Level 30',
    effects: [
      { label: '1.20x Golden Floor Multi', derivedStatKey: 'golden_floor_multi', value: 1.20 },
      { label: '1.15x Vein Income Multi', derivedStatKey: 'vein_income_multi', value: 1.15 },
      { label: '1.10x Bomb Recharge', derivedStatKey: 'bomb_recharge_multi', value: 1.10 },
      { label: '5% Triple Star Chance' },
    ],
  },
  {
    slug: 'bomber_extraordinaire_bundle',
    name: 'Bomber Extraordinaire Bundle!',
    icon: 'bomberextraordinaire vp.png',
    unlockRequirement: 'Obelisk Level 30',
    effects: [
      { label: '1.10x Bomb Recharge Rate', derivedStatKey: 'bomb_recharge_multi', value: 1.10 },
      { label: '1.10x Bomb Capacity', derivedStatKey: 'bomb_capacity_multi', value: 1.10 },
      { label: '+5x Plenty Bomb Multi', derivedStatKey: 'bomb_of_plenty_multi', value: 5 },
      { label: '+10x Transmuter Multi', derivedStatKey: 'bomb_transmuter_multi', value: 10 },
    ],
  },
  {
    slug: 'singularity_bundle',
    name: 'Singularity Bundle!',
    icon: 'singularity vp.png',
    unlockRequirement: 'Obelisk Level 60',
    effects: [
      { label: 'All Star Multi 1.10x', derivedStatKey: 'star_income_multi', value: 1.10 },
      { label: 'Star Supergiant Chance +3%' },
      { label: 'Novagiant Multi 1.10x' },
      { label: 'Super Star 10x Chance +3%' },
    ],
  },
  {
    slug: 'void_overdrive_bundle',
    name: 'Void Overdrive Bundle!',
    icon: 'voidoverdrive vp.png',
    unlockRequirement: 'Golden Void Portal Chance >= 1%',
    effects: [
      { label: 'Void Base Multi 1.10x' },
      { label: 'Golden Portal Multi 1.10x' },
      { label: 'Golden Portal Chance +2%' },
      { label: 'Fuel Duration 1.10x', derivedStatKey: 'fuel_duration_multi', value: 1.10 },
    ],
  },
  {
    slug: 'frog_frenzy_bundle',
    name: 'Frog Frenzy Bundle!',
    icon: 'frogfrenzy vp.png',
    unlockRequirement: 'Black Hole 1',
    effects: [
      { label: 'Lootfrog Loot Multi x1.20', derivedStatKey: 'lootfrog_loot_multi', value: 1.20 },
      { label: 'Triple Frog Chance +3%' },
      { label: 'Frog Capacity +2', derivedStatKey: 'frog_capacity', value: 2 },
    ],
  },
  {
    slug: 'legendary_hauler_bundle',
    name: 'Legendary Hauler Bundle!',
    icon: 'legendaryhauler vp.png',
    unlockRequirement: 'Tier 2 Fishing Docks Unlocked',
    effects: [
      { label: '5x Fishing Tick Chance +3%' },
      { label: 'Fish Income Multi 1.10x', derivedStatKey: 'fish_income_multi', value: 1.10 },
      { label: 'Tier 2 Dock Power 1.10x' },
    ],
  },
  {
    slug: 'chief_executive_bundle',
    name: 'Chief Executive Bundle!',
    icon: 'chiefexecutive vp.png',
    unlockRequirement: 'Super Stonks Chance >= 1%',
    effects: [
      { label: 'Super Stonks Chance +2%' },
      { label: 'Super Stonks Multi 1.15x' },
      { label: 'Gems from Freebie +4', derivedStatKey: 'freebie_gems_bonus', value: 4 },
      { label: 'Banked Freebie Cap 1.10x', derivedStatKey: 'freebie_bank_cap_multi', value: 1.10 },
    ],
  },
  {
    slug: 'capitalist_bundle',
    name: 'Capitalist Bundle!',
    icon: 'capitalistbundle vp.png',
    unlockRequirement: 'Obelisk Level 25',
    effects: [
      { label: '+2 Gems from Freebie Pack', derivedStatKey: 'freebie_gems_bonus', value: 2 },
      { label: '+15% Bonus Relic from Freebie' },
    ],
  },
  {
    slug: 'gotta_go_fast_bundle',
    name: 'Gotta Go Fast Bundle!',
    icon: 'gofast vp.png',
    effects: [
      { label: '+10% Game Speed', derivedStatKey: 'game_speed_multi', value: 10 },
    ],
  },
  {
    slug: 'pet_trainer_bundle',
    name: 'Pet Trainer Bundle!',
    icon: 'petbooster vp.png',
    unlockRequirement: 'Obelisk Level 17',
    effects: [
      { label: 'Pet Level Up Chance 1.20x', derivedStatKey: 'pet_level_up_multi', value: 1.20 },
      { label: 'Vein Spawn Rate 1.10x', derivedStatKey: 'vein_spawn_rate_multi', value: 1.10 },
      { label: 'Experience Gain 2.00x', derivedStatKey: 'exp_gain_multi', value: 2.00 },
      { label: 'Rainbow Floor Chance +1%', derivedStatKey: 'rainbow_floor_chance', value: 1 },
    ],
  },
  {
    slug: 'polychrome_potency_bundle',
    name: 'Polychrome Potency Bundle!',
    icon: 'polychromepotency vp.png',
    unlockRequirement: 'Obelisk Level 37, Unlocked This Is Gonna Take A While.. skill',
    effects: [
      { label: '1.15x Poly Ore Multi' },
      { label: '1.15x Poly Vein Multi' },
      { label: '1.15x Poly Star Multi' },
      { label: '1.15x Poly Fish Multi' },
    ],
  },
  {
    slug: 'lootbug_bonanza_bundle',
    name: 'Lootbug Bonanza Bundle!',
    icon: 'Lootbugbonanza vp.png',
    unlockRequirement: 'Obelisk Level 32',
    effects: [
      { label: '1.20x Lootbug Loot Multiplier', derivedStatKey: 'lootbug_loot_multi', value: 1.20 },
      { label: '+10 Banked Lootbug Capacity', derivedStatKey: 'lootbug_bank_cap', value: 10 },
    ],
  },
  {
    slug: 'fishers_bundle',
    name: "Fisher's Bundle!",
    icon: 'fishingbundle vp.png',
    unlockRequirement: 'Obelisk Level 37',
    effects: [
      { label: '+10% Triple Fishing Tick Chance' },
    ],
  },
  {
    slug: 'golden_lootbug_bundle',
    name: 'Golden Lootbug Bundle!',
    icon: 'goldenlootbug vp.png',
    effects: [
      { label: '20% to spawn a Golden Lootbug', derivedStatKey: 'lootbug_golden_chance', value: 20 },
    ],
  },
  {
    slug: 'stargazing_supernova_bundle',
    name: 'Stargazing Supernova Bundle!',
    icon: 'stargazingbundle vp.png',
    unlockRequirement: 'Obelisk Level 23',
    effects: [
      { label: '+2% Supernova Star/Super Chance' },
      { label: '+3% All Supernova Chances' },
      { label: '1.10x All Supernova Multis' },
      { label: '+3% Triple Star Chance' },
      { label: '+3% Triple Super Star Chance' },
    ],
  },
  {
    slug: 'golden_ore_bundle',
    name: 'Golden Ore Bundle!',
    icon: 'goldenorebundle vp.png',
    unlockRequirement: 'Requires Golden Ore Chance',
    effects: [
      { label: '+3% Golden Ore Chance', derivedStatKey: 'golden_ore_chance', value: 3 },
      { label: '1.25x Golden Ore Multiplier', derivedStatKey: 'golden_ore_multi', value: 1.25 },
    ],
  },
  {
    slug: 'stargazing_supergiant_bundle',
    name: 'Stargazing Supergiant Bundle!',
    icon: 'supergiantbundle vp.png',
    unlockRequirement: 'Requires Star Supergiant Chance',
    effects: [
      { label: '+3% All Supergiant Chances' },
      { label: '1.10x Supergiant Multis' },
      { label: '+3% Triple Star Chance' },
      { label: '+1% 10x Super Star Chance' },
    ],
  },
  {
    slug: 'craftmaster_bundle',
    name: 'Craftmaster Bundle!',
    icon: 'craftmasterbundle vp.png',
    unlockRequirement: 'Obelisk Level 35',
    effects: [
      { label: '+1% 100x Craft Chance', derivedStatKey: 'craft_100x_chance', value: 1 },
      { label: '+2% 10x Craft Chance', derivedStatKey: 'craft_10x_chance', value: 2 },
      { label: '+2% Free Craft Chance' },
      { label: '-5% Bar Craft Cost' },
    ],
  },
  {
    slug: 'insider_trading_bundle',
    name: 'Insider Trading Bundle!',
    icon: 'superstonks vp.png',
    unlockRequirement: 'Obelisk Level 34, Unlocked Stonks skill',
    effects: [
      { label: 'Freebie Stonks Procs Give 2x Loot' },
      { label: '+2 Banked Freebie Cap', derivedStatKey: 'freebie_bank_cap', value: 2 },
    ],
  },
  {
    slug: 'double_divine_bundle',
    name: 'Double Divine Bundle!',
    icon: 'doubledivine vp.png',
    effects: [],
  },
  {
    slug: 'vein_extractor_bundle',
    name: 'Vein Extractor Bundle!',
    icon: 'veinextractor vp.png',
    unlockRequirement: 'Obelisk Level 19',
    effects: [
      { label: '1.15x Vein Income Multi', derivedStatKey: 'vein_income_multi', value: 1.15 },
      { label: '+5% Golden Vein Chance' },
      { label: '+2% Rainbow Vein Chance' },
      { label: '1.25x Golden Vein Multi' },
    ],
  },
  {
    slug: 'bigger_bankers_bundle',
    name: "Bigger Banker's Bundle!",
    icon: 'biggerbanksbundle vp.png',
    effects: [
      { label: 'Banked Freebie Cap +5', derivedStatKey: 'freebie_bank_cap', value: 5 },
      { label: 'Banked Lootbug Cap +5', derivedStatKey: 'lootbug_bank_cap', value: 5 },
      { label: 'Gems from Freebie +1', derivedStatKey: 'freebie_gems_bonus', value: 1 },
      { label: 'Freebie Instant Refresh +1%' },
    ],
  },
  {
    slug: 'anglers_bundle',
    name: "Angler's Bundle!",
    icon: 'anglerbundle vp.png',
    unlockRequirement: 'Obelisk Level 39',
    effects: [
      { label: '+6% Tiny Notice Chance' },
    ],
  },
  {
    slug: 'drone_catalyst_bundle',
    name: 'Drone Catalyst Bundle!',
    icon: 'dronecatalyst vp.png',
    unlockRequirement: 'Obelisk Level 35',
    effects: [
      { label: '1.35x Drone Exp Gain', derivedStatKey: 'drone_exp_multi', value: 1.35 },
      { label: '1.10x Fuel Duration', derivedStatKey: 'fuel_duration_multi', value: 1.10 },
    ],
  },
  {
    slug: 'archaeology_bundle',
    name: 'Archaeology Bundle!',
    icon: 'archbundle vp.png',
    unlockRequirement: 'Obelisk Level 30',
    effects: [
      { label: '1.25x Fragment Gain', derivedStatKey: 'fragment_gain_multi', value: 1.25 },
      { label: '+1 Gem from Freebie Pack', derivedStatKey: 'freebie_gems_bonus', value: 1 },
    ],
  },
  {
    slug: 'divine_bundle',
    name: 'Divine Bundle!',
    icon: 'divinebundle vp.png',
    effects: [],
  },
  {
    slug: 'baller_skin_bundle',
    name: 'Baller Skin Bundle!',
    icon: 'baller vp.png',
    effects: [
      { label: '2.00x Ore Sell Price', derivedStatKey: 'ore_sell_price_multi', value: 2 },
    ],
  },
]

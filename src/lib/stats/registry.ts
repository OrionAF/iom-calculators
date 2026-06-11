/**
 * Stat Registry — universal metadata for every derivedStatKey.
 *
 * Each entry is keyed by the canonical stat key string (same as
 * StatEntry.key in stats/catalog.ts and StoreEffect.derivedStatKey
 * in store/catalog.ts).
 *
 * `name`        — human-readable display name (matches stats/catalog.ts label)
 * `description` — one-sentence explanation of what this stat does in-game
 * `icon`        — wiki filename (matches stats/catalog.ts icon where available)
 * `affix`       — optional prefix/suffix for formatted values (e.g. "+", "%", " p/s")
 *
 * Context-specific tooltip additions (e.g. "this is a permanent effect") go
 * on the individual StoreEffect.tooltipAddition or page-level prop — NOT here.
 */

export interface StatAffix {
  prefix?: string
  suffix?: string
}

export interface StatMeta {
  name: string
  description: string
  icon?: string
  affix?: StatAffix
}

export const STAT_REGISTRY: Readonly<Record<string, StatMeta>> = {

  // ─── Pickaxe ──────────────────────────────────────────────────────────────

  pickaxe_damage: {
    name: 'Pickaxe Damage',
    description: "How much damage you do when holding the screen. It's the only way to deal damage to Obelisks. Obelisk Armor is subtracted from your Pickaxe Damage before crits are calculated. If you have less Pickaxe Damage than the Obelisk has Armor, you will always do 0 damage regardless of crits. Drone Damage is based on Pickaxe Damage.",
    icon: 'Pickaxe_Damage.png',
  },
  pickaxe_attack_speed_per_second: {
    name: 'Pickaxe Attack Speed',
    description: 'How many times per second you deal pickaxe damage while holding.',
    icon: 'Pickaxe_Attack_Speed.png',
    affix: { suffix: ' p/s' },
  },
  pickaxe_radius_percent: {
    name: 'Pickaxe Radius',
    description: "Multiplies the area you can deal damage in. It appears to be a circle, but it's actually a square.",
    icon: 'Pickaxe_Radius.png',
    affix: { prefix: '+', suffix: '%' },
  },
  pickaxe_crit_chance: {
    name: 'Pickaxe Crit Chance',
    description: 'The chance to multiply your damage by Pickaxe Crit Damage.',
    icon: 'Pickaxe_Crit_Chance.png',
    affix: { suffix: '%' },
  },
  pickaxe_crit_damage: {
    name: 'Pickaxe Crit Damage',
    description: 'The amount to multiply your damage by when Pickaxe Crit Chance triggers.',
    icon: 'Pickaxe_Crit_Damage.png',
    affix: { suffix: '×' },
  },
  pickaxe_super_crit_chance: {
    name: 'Pickaxe Super Crit Chance',
    description: 'The chance to multiply your damage by Pickaxe Super Crit Damage. Only rolls when Pickaxe Crit Chance activates.',
    icon: 'Pickaxe_Super_Crit_Chance.png',
    affix: { suffix: '%' },
  },
  pickaxe_super_crit_damage: {
    name: 'Pickaxe Super Crit Damage',
    description: 'The amount to multiply your damage by when Super Crit Chance triggers.',
    icon: 'Pickaxe_Super_Crit_Damage.png',
    affix: { suffix: '×' },
  },
  pickaxe_ultra_crit_chance: {
    name: 'Pickaxe Ultra Crit Chance',
    description: 'The chance to multiply your damage by Pickaxe Ultra Crit Damage. Only rolls when Pickaxe Super Crit Chance activates.',
    icon: 'Pickaxe_Ultra_Crit_Chance.png',
    affix: { suffix: '%' },
  },
  pickaxe_ultra_crit_damage: {
    name: 'Pickaxe Ultra Crit Damage',
    description: 'The amount to multiply your damage by when Pickaxe Ultra Crit Chance triggers.',
    icon: 'Pickaxe_Ultra_Crit_Damage.png',
    affix: { suffix: '×' },
  },
  pickaxe_omega_crit_chance: {
    name: 'Pickaxe Omega Crit Chance',
    description: 'The chance to multiply your damage by Pickaxe Omega Crit Damage. Only rolls when Pickaxe Ultra Crit Chance activates.',
    icon: 'Pickaxe_Omega_Crit_Chance.png',
    affix: { suffix: '%' },
  },
  pickaxe_omega_crit_damage: {
    name: 'Pickaxe Omega Crit Damage',
    description: 'The amount to multiply your damage by when Pickaxe Omega Crit Chance triggers.',
    icon: 'Pickaxe_Omega_Crit_Damage.png',
    affix: { suffix: '×' },
  },

  // ─── Bombs ────────────────────────────────────────────────────────────────

  bomb_damage: {
    name: 'Bomb Damage',
    description: 'Bomb damage before factoring in Additional Bomb Multiplier',
    icon: 'Bomb_Damage.png',
  },
  bomb_crit_chance: {
    name: 'Bomb Crit Chance',
    description: 'The chance to multiply your bomb damage by Bomb Crit Damage.',
    icon: 'Bomb_Crit_Chance.png',
    affix: { suffix: '%' },
  },
  bomb_crit_damage: {
    name: 'Bomb Crit Damage',
    description: 'The amount to multiply your bomb damage by when Bomb Crit Chance triggers.',
    icon: 'Bomb_Crit_Damage.png',
    affix: { suffix: '×' },
  },
  bomb_recharge_speed: {
    name: 'Bomb Recharge Speed',
    description: 'Multiplies how quickly your bombs recharge after being used.',
    icon: 'Bomb_Recharge_Speed.png',
    affix: { suffix: '×' },
  },
  bomb_free_chance: {
    name: 'Free Bomb Chance',
    description: 'The chance for your bombs to not use charges.',
    icon: 'Free_Bomb_Chance.png',
    affix: { suffix: '%' },
  },
  bomb_capacity: {
    name: 'Bomb Capacity',
    description: "Total bomb capacity. Doesn't apply to Founders Bomb.",
    icon: 'Bomb_Capacity.png',
    affix: { prefix: '#'}
  },
  bomb_additional_multiplier: {
    name: 'Additional Bomb Multiplier',
    description: 'The effect from the All Bomb Multipliers Mythic Relic. Other sources of bomb damage multipliers include base bomb multiplier. Gem Bomb receives an additional multiplier based on gems held. Infinity Bomb receives an additional multiplier based on Infinity bombs fired.',
    icon: 'Additional_Bomb_Multiplier.png',
    affix: { prefix: '+', suffix: '×' },
  },
  bomb_super_crit_chance: {
    name: 'Bomb Super Crit Chance',
    description: 'The chance to multiply your bomb damage by Bomb Super Crit Damage. Only rolls when Bomb Crit Chance activates.',
    icon: 'Bomb_Super_Crit_Chance.png',
    affix: { suffix: '%' },
  },
  bomb_super_crit_damage: {
    name: 'Bomb Super Crit Damage',
    description: 'The amount to multiply your bomb damage by when Bomb Super Crit Chance triggers.',
    icon: 'Bomb_Super_Crit_Damage.png',
    affix: { suffix: '×' },
  },
  bomb_ultra_crit_chance: {
    name: 'Bomb Ultra Crit Chance',
    description: 'The chance to multiply your bomb damage by Bomb Ultra Crit Damage. Only rolls when Bomb Super Crit Chance activates.',
    icon: 'Bomb_Ultra_Crit_Chance.png',
    affix: { suffix: '%' },
  },
  bomb_ultra_crit_damage: {
    name: 'Bomb Ultra Crit Damage',
    description: 'The amount to multiply your bomb damage by when Bomb Ultra Crit Chance triggers.',
    icon: 'Bomb_Ultra_Crit_Damage.png',
    affix: { suffix: '×' },
  },
  bomb_omega_crit_chance: {
    name: 'Bomb Omega Crit Chance',
    description: 'The chance to multiply your bomb damage by Bomb Omega Crit Damage. Only rolls when Bomb Ultra Crit Chance activates.',
    icon: 'Bomb_Omega_Crit_Chance.png',
    affix: { suffix: '%' },
  },
  bomb_omega_crit_damage: {
    name: 'Bomb Omega Crit Damage',
    description: 'The amount to multiply your bomb damage by when Bomb Omega Crit Chance triggers.',
    icon: 'Bomb_Omega_Crit_Damage.png',
    affix: { suffix: '×' },
  },
  bomb_cherry3x_chance: {
    name: 'Cherry Charge 3x Chance',
    description: 'The chance to get 3 Cherry charges from one Cherry Bomb.',
    icon: 'Cherry_Charge_3x_Chance.png',
    affix: { suffix: '%' },
  },
  bomb_battery_cap_increases: {
    name: 'Bomb Capacity Gained From Battery',
    description: 'The number of times Battery Bomb has triggered a cap increase.',
    icon: 'Bomb_Capacity_Gained_From_Battery.png',
    affix: { prefix: '#'}
  },
  bomb_cap_multiplier: {
    name: 'Bomb Cap Multiplier',
    description: 'Multiplies your bomb capacity.',
    icon: 'Bomb_Cap_Multiplier.png',
    affix: { suffix: '×' },
  },
  bomb_workshop_cap_increase: {
    name: 'Workshop Upgrade Cap Increase',
    description: 'Increase the cap of most workshop upgrades.',
    icon: 'Workshop_Upgrade_Cap_Increase.png',
    affix: { prefix: '+' },
  },
  bomb_of_plenty_make_gold_chance: {
    name: 'Bomb of Plenty Golden Ore Chance',
    description: 'Chance to turn Ores golden (From World 3 Workshop)',
    icon: 'Bomb_of_Plenty_Golden.png',
    affix: { suffix: '%' },
  },
  bomb_of_plenty_multi: {
    name: 'Bomb of Plenty Multiplier',
    description: 'Marks Rocks to give Ores.  Gives you bonus ore. Best used to farm gold and on easy to craft bars.',
    icon: 'Bomb_of_Plenty.png',
    affix: { suffix: '×' },
  },
  bomb_trans_apply_bop_chance: {
    name: 'Transmuter Bomb Apply BoP Stack Chance',
    description: 'Chance to apply BoP stack (from World 2 Workshop)',
    icon: 'Transmuter_Bomb_Golden.png',
    affix: { suffix: '%' },
  },
  bomb_transmuter_multi: {
    name: 'Transmuter Bomb Multiplier',
    description: 'Marks Rocks to drop Bars.  Often better for bar income than the Bomb of Plenty. Especially early in the game and on hard to craft bars.',
    icon: 'Transmuter_Bomb.png',
    affix: { suffix: '×' },
  },

  // ─── Drones ────────────────────────────────────────────────────────────────

  drone_count: {
    name: 'Number of Drones',
    description: 'Gives extra drones.',
    icon: 'Number_Of_Drones.png',
    affix: { prefix: ''}
  },
  drone_damage_percent: {
    name: 'Drone Damage',
    description: 'Multiplies Pickaxe Damage to determine the damage drones do.',
    icon: 'Drone_Damage.png',
    affix: { suffix: '%' },
  },
  drone_radius_percent: {
    name: 'Drone Radius',
    description: 'Increases the area your drones can deal damage in.',
    icon: 'Drone_Radius.png',
    affix: { prefix: '+', suffix: '%' },
  },
  drone_movespeed_percent: {
    name: 'Drone Movespeed',
    description: 'Increases the move speed of your drones.',
    icon: 'Drone_Movespeed.png',
    affix: { prefix: '+', suffix: '%' },
  },
  drone_attack_speed_percent: {
    name: 'Drone Attack Speed',
    description: 'Increases the attack speed of your drones. The Base attack speed is 1.25 times per second.',
    icon: 'Drone_Attack_Speed.png',
    affix: { prefix: '+', suffix: '%' },
  },
  drone_triple_damage_chance: {
    name: 'Drone Triple Damage',
    description: 'The chance for your drones to deal triple damage.',
    icon: 'Drone_Triple_Damage.png',
  },
  drone_rapid_fire_chance: {
    name: 'Drone Rapid Fire Chance',
    description: 'The chance for your drones to attack 5 times instantly.',
    icon: 'Drone_Rapid_Fire_Chance.png',
    affix: { suffix: '%' },
  },
  drone_suit_cap: {
    name: 'Drone Suit Upgrade Cap',
    description: 'The cap of your drone suit upgrades. The base cap is 5.',
    icon: 'Drone_Suit_Upgrade_Cap.png',
    affix: { prefix: '#'}
  },
  coal_generation_seconds: {
    name: 'Coal Generation Time',
    description: 'The time it takes your generator to produce coal. (Base is 90 seconds, reduced by upgrades and affected by game speed).',
    icon: 'Coal_Generation_Time.png',
    affix: { suffix: 's' },
  },
  coal_fuel_duration_multi: {
    name: 'Drone Fuel Duration Multiplier',
    description: 'Multiplies your drone fuel duration.',
    icon: 'Drone_Fuel_Duration_Multiplier.png',
    affix: { suffix: '×' },
  },
  coal_capacity_multi: {
    name: 'Coal Capacity Multiplier',
    description: 'Multiplies your coal capacity.',
    icon: 'Coal_Capacity_Multiplier.png',
    affix: { suffix: '×' },
  },
  coal_fuel_save_chance: {
    name: 'Fuel Save Chance',
    description: 'The chance to save fuel when fueling drones.',
    icon: 'Fuel_Save_Chance.png',
    affix: { suffix: '%' },
  },
  coal_drone_exp_multi: {
    name: 'Drone Exp Gain Multiplier',
    description: 'Multiplies your drone experience.',
    icon: 'Drone_Exp_Gain_Multiplier.png',
    affix: { suffix: '×' },
  },
  void_portal_chance: {
    name: 'Void Portal Chance',
    description: 'The chance for an ore node to be replaced by a void portal.',
    icon: 'Void_Portal_Chance.png',
    affix: { suffix: '%' },
  },
  void_portal_base_multi: {
    name: 'Void Portal Base Multiplier',
    description: 'Multiplies the Void Drone portal multiplier.',
    icon: 'Void_Portal_Base_Multiplier.png',
    affix: { suffix: '×' },
  },
  golden_void_portal_chance: {
    name: 'Golden Void Portal Chance',
    description: 'The chance for a void portal to be golden.',
    icon: 'Golden_Void_Portal_Chance.png',
    affix: { suffix: '%' },
  },
  golden_void_portal_multi: {
    name: 'Golden Void Portal Multi',
    description: 'The additional multiplier to resources in a Void Portal when a Golden Void Portal triggers. (Base: 5x)',
    icon: 'Golden_Void_Portal_Multi.png',
    affix: { suffix: '×' },
  },
  rainbow_void_portal_chance: {
    name: 'Rainbow Void Portal Chance',
    description: 'The chance for a Golden Void Portal to spawn as a Rainbow Void Portal.',
    icon: 'Rainbow_Void_Portal_Chance.png',
    affix: { suffix: '%' },
  },
  rainbow_void_portal_multi: {
    name: 'Rainbow Void Portal Multiplier',
    description: 'The additional multiplier to resources in a Golden Void Portal when it rolls as a Rainbow Void Portal. (Base: 5x)',
    icon: 'Rainbow_Void_Portal_Multiplier.png',
    affix: { suffix: '×' },
  },
  elixir_crit_chance: {
    name: 'Elixir Crit Chance',
    description: 'The chance for the elixir drone to crit.',
    icon: 'Elixir_Crit_Chance.png',
    affix: { suffix: '%' },
  },
  elixir_crit_multi: {
    name: 'Elixir Crit Multi',
    description: 'The duration multiplier applied to buffs when the elixir drone crits. (Base 3x)',
    icon: 'Elixir_Crit_Multi.png',
    affix: { suffix: '×' },
  },

  // ─── Ore ──────────────────────────────────────────────────────────

  multi_rock_chance: {
    name: 'Triple Rock Chance',
    description: 'The chance to spawn a bigger rock that gives 3x ore.',
    icon: 'Triple_Rock_Chance.png',
    affix: { suffix: '%' },
  },
  ore_sell_price_multi: {
    name: 'Ore Sell Price Multiplier',
    description: 'Multiplies ore sell price.',
    icon: 'Ore_Sell_Price_Multiplier.png',
    affix: { suffix: '×' },
  },
  ore_income_multi: {
    name: 'Ore Income Multiplier',
    description: 'Multiplies ore gained.',
    icon: 'Ore_Income_Multiplier.png',
    affix: { suffix: '×' },
  },
  golden_ore_chance: {
    name: 'Golden Ore Chance',
    description: 'The chance for ore to be golden.',
    icon: 'Golden_Ore_Chance.png',
    affix: { suffix: '%' },
  },
  golden_ore_multi: {
    name: 'Golden Ore Multiplier',
    description: 'The multiplier to ore gained when Golden Ore Chance triggers. (Base: 3x)',
    icon: 'Golden_Ore_Multiplier.png',
    affix: { suffix: '×' },
  },
  golden_floor_chance: {
    name: 'Golden Floor Chance',
    description: 'The chance for a floor to be golden.',
    icon: 'Golden_Floor_Chance.png',
    affix: { suffix: '%' },
  },
  golden_floor_multi: {
    name: 'Golden Floor Multiplier',
    description: 'The multiplier to ore gained when Golden Floor Chance triggers. The All Floor Multi is factored into the displayed amount. (Base: 5x)',
    icon: 'Golden_Floor_Multiplier.png',
    affix: { suffix: '×' },
  },
  rainbow_floor_chance: {
    name: 'Rainbow Floor Chance',
    description: 'The chance for a floor to be rainbow. Golden and Rainbow Floor Chance roll separately, a floor can be rainbow but not golden.',
    icon: 'Rainbow_Floor_Chance.png',
    affix: { suffix: '%' },
  },
  rainbow_floor_multi: {
    name: 'Rainbow Floor Multiplier',
    description: 'The multiplier to ore gained when Rainbow Floor Chance triggers. The All Floor Multi is factored into the displayed amount. (Base: 50x)',
    icon: 'Rainbow_Floor_Multiplier.png',
    affix: { suffix: '×' },
  },
  galactic_floor_chance: {
    name: 'Galactic Rainbow Floor Chance',
    description: 'The chance for a floor to be a Galactic Rainbow floor. Only rolls on Rainbow floors.',
    icon: 'Galactic_Rainbow_Floor_Chance.png',
    affix: { suffix: '%' },
  },
  galactic_floor_multi: {
    name: 'Galactic Rainbow Floor Multiplier',
    description: 'The multiplier to ore gained from a Galactic Rainbow floor. The All Floor Multi is factored into the displayed amount. (Base: 10x)',
    icon: 'Galactic_Rainbow_Floor_Multiplier.png',
    affix: { suffix: '×' },
  },
  prismatic_floor_chance: {
    name: 'Prismatic Galactic Floor Chance',
    description: 'The chance for a floor to be a Prismatic Galactic Rainbow floor. Only rolls on Galactic Rainbow Floors.',
    icon: 'Prismatic_Galactic_Floor_Chance.png',
    affix: { suffix: '%' },
  },
  prismatic_floor_multi: {
    name: 'Prismatic Galactic Floor Multi',
    description: 'The multiplier to ore gained from a Prismatic Galactic Rainbow Floor. The All Floor Multi is factored into the displayed amount. (Base: 1x)',
    icon: 'Prismatic_Galactic_Floor_Multi.png',
    affix: { suffix: '×' },
  },
  pizzas_eaten: {
    name: 'Pizzas Eaten',
    description: 'The number of pizzas eaten. The effect caps at 200, but the Pizzas Eaten stat will keep increasing beyond that point.',
    icon: 'Pizzas_Eaten.png',
    affix: { prefix: '#'}
  },
  steak_eaten: {
    name: 'Steaks Eaten',
    description: 'The number of steaks eaten. The effect caps at 500, but the Steaks Eaten stat will keep increasing beyond that point.',
    icon: 'Steaks_Eaten.png',
    affix: { prefix: '#'}
  },
  all_floor_multipliers: {
    name: 'All Floor Multis (Gold, Rainbow, Galactic, Prismatic)',
    description: 'Multiplies Gold, Rainbow, Galactic, and Prismatic floor multipliers.',
    icon: 'All_Floor_Multis_(Gold,Rainbow,Galactic).png',
    affix: { suffix: '×' },
  },

  // ─── Bars & Crafting ──────────────────────────────────────────────────────

  free_craft_chance: {
    name: 'Free Craft Chance',
    description: 'The chance for a craft to not consume ore.',
    icon: 'Free_Craft_Chance.png',
    affix: { suffix: '%' },
  },
  double_craft_chance: {
    name: 'Double Craft Chance',
    description: 'The chance for a craft to give 2x bars.',
    icon: 'Double_Craft_Chance.png',
    affix: { suffix: '%' },
  },
  triple_craft_chance: {
    name: 'Triple Craft Chance',
    description: 'The chance for a craft to give 3x bars.',
    icon: 'Triple_Craft_Chance.png',
    affix: { suffix: '%' },
  },
  craft_5x_chance: {
    name: '5× Craft Chance',
    description: 'The chance for a craft to give 5x bars.',
    icon: '5x_Craft_Chance.png',
    affix: { suffix: '%' },
  },
  craft_10x_chance: {
    name: '10× Craft Chance',
    description: 'The chance for a craft to give 10x bars.',
    icon: '10x_Craft_Chance.png',
    affix: { suffix: '%' },
  },
  craft_20x_chance: {
    name: '20× Craft Chance',
    description: 'The chance for a craft to give 20x bars.',
    icon: '20x_Craft_Chance.png',
    affix: { suffix: '%' },
  },
  craft_100x_chance: {
    name: '100× Craft Chance',
    description: 'The chance for a craft to give 100x bars.',
    icon: '100x_Craft_Chance.png',
    affix: { suffix: '%' },
  },
  bar_output_multi: {
    name: 'Bar Output Multiplier',
    description: 'The multiplier applied to the number of bars you receive from sources of bar creation like crafting or Transmuter Bomb.',
    icon: 'Bar_Output_Multiplier.png',
    affix: { suffix: '×' },
  },
  bar_upgrade_cost_reduction: {
    name: 'Bar Cost Reduction',
    description: 'The multiplier applied to the number of bars that Upgrades cost.',
    icon: 'Bar_Cost_Reduction.png',
    affix: { suffix: '×' },
  },
  bar_craft_cost_multi: {
    name: 'Bar Craft Cost',
    description: 'The multiplier applied to the amount of ore required to craft a bar.',
    icon: 'Bar_Craft_Cost.png',
    affix: { suffix: '×' },
  },


  // ─── Obelisk ──────────────────────────────────────────────────────
  
  obelisk_timer_add: {
    name: 'Bonus Obelisk Fight Length',
    description: 'How much time you have to deal damage to the Obelisk per attempt.',
    icon: 'Bonus_Obelisk_Fight_Length.png',
    affix: { suffix: '×' },
  },
  obelisk_cooldown_multi: {
    name: 'Obelisk Cooldown',
    description: 'How much time you need to wait in between Obelisk fight attempts.',
    icon: 'Obelisk_Cooldown.png',
    affix: { suffix: '×' },
  },
  obelisk_armor_reduction: {
    name: 'Obelisk Armor Reduction',
    description: "The multiplier applied to an Obelisk's Base Armor",
    icon: 'Obelisk_Armor_Reduction.png',
    affix: { suffix: '×' },
  },

  // ─── Prestige ─────────────────────────────────────────────────

  xp_level_cap: {
    name: 'Xp Level Cap',
    description: 'The maximum level you can reach with EXP.',
    icon: 'Xp_Level_Cap.png',
    affix: { prefix: 'Level ' },
  },
  prestige_point_multi: {
    name: 'Prestige Point Gain Multiplier',
    description: 'The multiplier on the number of Prestige Points gained.',
    icon: 'Prestige_Point_Gain_Multiplier.png',
    affix: { suffix: '×' },
  },
  experience_multi: {
    name: 'Experience Gain Multiplier',
    description: 'The multiplier on Experience gained.',
    icon: 'Experience_Gain_Multiplier.png',
    affix: { suffix: '×' },
  },
  floor_clear_requirement_multi: {
    name: 'Floor Clear Requirement',
    description: 'The multiplier on the number of times a floor must be cleared to move on to the next floor.',
    icon: 'Floor_Clear_Requirement.png',
    affix: { suffix: '×' },
  },
  artifact_cap_increase: {
    name: 'Artifact Upgrade Cap Increase',
    description: 'The increase to the max upgrade level of Artifacts.',
    icon: 'Artifact_Upgrade_Cap_Increase.png',
    affix: { prefix: '+' },
  },
  artifact_tier4_cap_increase: {
    name: 'Artifact Tier 4 Cap Increase',
    description: 'The increase to the max upgrade level of Tier 4 Artifacts.',
    icon: 'Artifact_Tier_4_Cap_Increase.png',
    affix: { prefix: '+' },
  },

  // ─── Lootbugs ─────────────────────────────────────────────────

  lootbug_spawn_rate: {
    name: 'Lootbug Spawn Rate Multiplier',
    description: 'Increases the rate at which Lootbugs appear.',
    icon: 'Lootbug_Spawn_Rate_Multiplier.png',
    affix: { suffix: '×' },
  },
  lootbug_triple_chance: {
    name: 'Triple Lootbug Chance',
    description: 'The chance for 3 Lootbugs to appear when a spawn occurs.',
    icon: 'Triple_Lootbug_Chance.png',
    affix: { suffix: '%' },
  },
  lootbug_golden_chance: {
    name: 'Golden Lootbug Chance',
    description: 'The chance for the Lootbug purchasable loot to be free.',
    icon: 'Golden_Lootbug_Chance.png',
    affix: { suffix: '%' },
  },
  lootbug_bank_cap: {
    name: 'Banked Lootbug Cap',
    description: 'How many Lootbugs you can keep in storage in addition to the one on screen.',
    icon: 'Banked_Lootbug_Cap.png',
    affix: { prefix: '' },
  },
  lootbug_gem_cost_reduction: {
    name: 'Lootbug Gem Cost Reduction',
    description: 'The amount by which the gem cost of purchasable loot is reduced.',
    icon: 'Lootbug_Gem_Cost_Reduction.png',
    affix: { prefix: '+' },
  },
  lootbug_loot_multi: {
    name: 'Lootbug Loot Multiplier',
    description: 'The multiplier on Lootbug rewards. Rewards which multiply to non-integers but must be integers randomly give the integers on either side of the value.',
    icon: 'Lootbug_Loot_Multiplier.png',
    affix: { suffix: '×' },
  },
  lootfrog_lanterns_used: {
    name: 'Lanterns Used',
    description: 'The number of lootbug lanterns used. The effect caps at 25, but the Lanterns Used stat will keep increasing beyond that point.',
    icon: 'Lanterns_Used.png',
    affix: { prefix: '#'}
  },

  // ─── Lootfrogs ─────────────────────────────────────────────────

  lootfrogs_caught: {
    name: 'Lootfrogs Caught',
    description: 'The number of Lootfrogs that you have caught by tapping them when they spawn. Lootfrogs are spawned by the Fueled Frogger Drone after purchasing a Black Hole buff.',
    icon: 'Lootfrogs_Caught.png',
    affix: { prefix: '#'}
  },
  golden_lootfrogs_caught: {
    name: 'Golden Lootfrogs Caught',
    description: 'The number of Golden Lootfrogs that you have caught by tapping them when they spawn. Golden Lootfrogs have a chance to spawn instead of normal Lootfrogs after you get Golden Lootfrog Chance.',
    icon: 'Golden_Lootfrogs_Caught.png',
    affix: { prefix: '#'}
  },
  lootfrog_capacity: {
    name: 'Lootfrog Capacity',
    description: 'The maximum number of Lootfrogs that may be on the screen at one time. (Base: 5)',
    icon: 'Lootfrog_Capacity.png',
    affix: { prefix: '' },
  },
  lootfrog_loot_multi: {
    name: 'Lootfrog Loot Multiplier',
    description: 'The multiplier to loot from Lootfrogs.',
    icon: 'Lootfrog_Loot_Multiplier.png',
    affix: { suffix: '×' },
  },
  lootfrog_golden_chance: {
    name: 'Golden Lootfrog Chance',
    description: 'The chance for a Lootfrog to appear as a Golden Lootfrog.',
    icon: 'Golden_Lootfrog_Chance.png',
    affix: { suffix: '%' },
  },
  lootfrog_golden_multi: {
    name: 'Golden Lootfrog Multiplier',
    description: 'The multiplier on Lootfrog rewards when a Lootfrog spawns as a Golden Lootfrog. (Base: 2x)',
    icon: 'Golden_Lootfrog_Multiplier.png',
    affix: { suffix: '×' },
  },
  lootfrog_triple_spawn_chance: {
    name: 'Lootfrog Triple Spawn Chance',
    description: 'The chance for 3 Lootfrogs to spawn in place of 1.',
    icon: 'Frog_Frenzy.png',
    affix: { suffix: '%' },
  },
  lootfrog_10x_spawn_chance: {
    name: 'Lootfrog 10x Spawn Chance',
    description: 'The chance for 10 Lootfrogs to spawn in place of 1.',
    icon: 'Lootfrog_10x_Spawn_Chance.png',
    affix: { suffix: '%' },
  },
  lootfrog_big_chance: {
    name: 'Big Lootfrog Chance',
    description: 'The chance for a Lootfrog to spawn as a big Lootfrog.',
    icon: 'Big_Lootfrog_Chance.png',
    affix: { suffix: '%' },
  },
  lootfrog_big_multi: {
    name: 'Big Lootfrog Multi',
    description: 'The multiplier on Lootfrog rewards when a Lootfrog spawns as a Big Lootfrog. (Base: 5x)',
    icon: 'Big_Lootfrog_Multi.png',
    affix: { suffix: '×' },
  },

  // ─── Chest ───────────────────────────────────────────────────

  chest_double_chance: {
    name: 'Chance For 2x Chests',
    description: 'The chance to receive 2 Item and Relic Chests when the respective bar fills up.',
    icon: 'Chance_For_2x_Chests.png',
    affix: { suffix: '%' },
  },
  chest_meter_multi: {
    name: 'Chest Meter Gain Multiplier',
    description: 'How quickly the Item and Relic Chest meters fill up. Actually functions by reducing the damage requirement.',
    icon: 'Chest_Meter_Gain_Multiplier.png',
    affix: { suffix: '×' },
  },
  chest_items_bonus: {
    name: 'Items Contained In Chests',
    description: 'How many Items you receive when you open an Item Chest.',
    icon: 'Items_Contained_In_Chests.png',
    affix: { prefix: '+' },
  },
  freebie_gems_bonus: {
    name: 'Bonus Gems From Freebie Pack',
    description: 'How many gems you receive from a Freebie Pack in addition to the base 5.',
    icon: 'Bonus_Gems_From_Freebie_Pack.png',
    affix: { prefix: '' },
  },
  freebie_5x_chance: {
    name: 'Chance For Freebie Jackpot',
    description: "Rolls 4 extra times for normal Freebie loot and the bonus Relic Chest from the Capitalist Value Pack. Extra rolls can't trigger Instant Refresh, Freebie Jackpot, Stonks or Gift chance from the Soprano Statue.",
    icon: 'Chance_For_Freebie_Jackpot.png',
    affix: { suffix: '%' },
  },
  freebie_refresh_chance: {
    name: 'Instant Refresh Chance',
    description: 'The chance for a Freebie to become claimable again immediately after being claimed.',
    icon: 'Instant_Refresh_Chance.png',
    affix: { suffix: '%' },
  },
  freebie_bank_cap: {
    name: 'Banked Freebie Cap',
    description: 'How many Freebies you can accumulate before claiming them. (Base: 2.)',
    icon: 'Banked_Freebie_Cap.png',
    affix: { prefix: '' },
  },
  freebie_cooldown_seconds: {
    name: 'Freebie Cooldown',
    description: 'The cooldown in between Freebie claims. (Base: 10 minutes.)',
    icon: 'Freebie_Cooldown.png',
    affix: { suffix: 's' },
  },
  stonks_chance: {
    name: 'Stonks Chance',
    description: 'The chance for a Freebie to roll a Stonks reward when claimed. The chance is rolled once for item chests, relic chests and gems. You can get multiple different rewards from a single freebie.',
    icon: 'Stonks_Chance.png',
    affix: { suffix: '%' }, 
  },
  stonks_multi: {
    name: 'Stonks Freebie Multiplier',
    description: 'The multiplier to base Stonks rewards. The All Stonks Multi is factored into the displayed amount. (Base: 1x)',
    icon: 'Stonks_Freebie_Multiplier.png',
    affix: { suffix: '×' },
  },
  super_stonks_chance: {
    name: 'Super Stonks Chance',
    description: 'The chance for a "Stonks!" roll to become a Super Stonks roll.',
    icon: 'Super_Stonks_Chance.png',
    affix: { suffix: '%' },
  },
  super_stonks_multi: {
    name: 'Super Stonks Multiplier',
    description: 'The multiplier to rewards when Super Stonks procs. The All Stonks Multi is factored into the displayed amount. (Base: 2x)',
    icon: 'Super_Stonks_Multiplier.png',
    affix: { suffix: '×' },
  },
  ultra_stonks_chance: {
    name: 'Ultra Stonks Chance',
    description: 'The chance for a Super Stonks roll to become an Ultra Stonks roll.',
    icon: 'Ultra_Stonks_Chance.png',
    affix: { suffix: '%' },
  },
  ultra_stonks_multi: {
    name: 'Ultra Stonks Multiplier',
    description: 'The multiplier to rewards when Ultra Stonks procs. The All Stonks Multi is factored into the displayed amount. (Base: 25x)',
    icon: 'Ultra_Stonks_Multiplier.png',
    affix: { suffix: '×' },
  },

  // ─── Contracts ─────────────────────────────────────────────────
  
  contract_cost_reduction: {
    name: 'Contract Cost Reduction',
    description: 'Reduces the amount of bars required to complete Contracts. Functions by increasing the denominator of the multiplier.',
    icon: 'Contract_Cost_Reduction.png',
    affix: { suffix: '%' },
  },
  contract_double_points_chance: {
    name: 'Double Contract Point Chance',
    description: 'The chance to be awarded 2x Contract Points upon completing a Contract.',
    icon: 'Double_Contract_Point_Chance.png',
    affix: { suffix: '%' },
  },
  contract_triple_points_chance: {
    name: 'Triple Contract Point Chance',
    description: 'The chance to be awarded 3x Contract Points upon completing a Contract.',
    icon: 'Triple_Contract_Point_Chance.png',
    affix: { suffix: '%' },
  },
  contract_5x_points_chance: {
    name: '5x Contract Point Chance',
    description: 'The chance to be awarded 5x Contract Points upon completing a Contract.',
    icon: '5x_Contract_Point_Chance.png',
    affix: { suffix: '%' },
  },
  contract_10x_points_chance: {
    name: '10x Contract Point Chance',
    description: 'The chance to be awarded 10x Contract Points upon completing a Contract.',
    icon: '10x_Contract_Point_Chance.png',
    affix: { suffix: '%' },
  },
  contract_points_rewarded: {
    name: 'Contract Points Rewarded',
    description: 'The base amount of Contract Points awarded upon completing a Contract. Starts at 10.',
    icon: 'Contract_Points_Rewarded.png',
    affix: { prefix: '+' },
  },
  contract_cap_increase: {
    name: 'Contract Upgrade Cap Increase',
    description: 'The increase to the maximum level of Contract Upgrades.',
    icon: 'Contract_Upgrade_Cap_Increase.png',
    affix: { prefix: '+' },
  },
  contract_upgrade_cost_reduction: {
    name: 'Contract Upgrade Cost Reduction',
    description: 'The amount by which Contract Upgrade costs are multiplied.',
    icon: 'Contract_Upgrade_Cost_Reduction.png',
    affix: { suffix: '×' },
  },

  // ─── Veins ──────────────────────────────────────────────────────────

  vein_spawn_rate_multi: {
    name: 'Vein Spawn Rate Multiplier',
    description: "The multiplier that is determined by a Vein's rarity to determine the chance that an Ore becomes a Vein.",
    icon: 'Vein_Spawn_Rate_Multiplier.png',
    affix: { suffix: '×' },
  },
  vein_income_multi: {
    name: 'Vein Income Multiplier',
    description: 'A multiplier that is applied to all Vein gains.',
    icon: 'Vein_Income_Multiplier.png',
    affix: { suffix: '×' },
  },
  golden_vein_chance: {
    name: 'Golden Vein Chance',
    description: 'The chance for a Vein to roll as a Golden Vein.',
    icon: 'Golden_Vein_Chance.png',
    affix: { suffix: '%' },
  },
  golden_vein_multi: {
    name: 'Golden Vein Multiplier',
    description: 'The multiplier to Veins gained when a Vein rolls as a Golden Vein. (Base: 5x)',
    icon: 'Golden_Vein_Multiplier.png',
    affix: { suffix: '×' },
  },
  rainbow_vein_chance: {
    name: 'Rainbow Vein Chance',
    description: 'The chance for a Golden Vein to roll as a Rainbow Vein.',
    icon: 'Rainbow_Vein_Chance.png',
    affix: { suffix: '%' },
  },
  rainbow_vein_multi: {
    name: 'Rainbow Vein Multiplier',
    description: 'The multiplier applied to Golden Veins when they roll as Rainbow Veins. (Base: 20x)',
    icon: 'Rainbow_Vein_Multiplier.png',
    affix: { suffix: '×' },
  },
  gleaming_vein_chance: {
    name: 'Gleaming Vein Chance',
    description: 'The chance for a Vein to roll as a Gleaming Vein.',
    icon: 'Gleaming_Vein_Chance.png',
    affix: { suffix: '%' },
  },
  gleaming_vein_multi: {
    name: 'Gleaming Vein Multiplier',
    description: 'The multiplier to Veins gained applied to Gleaming Veins. (Base: 5x)',
    icon: 'Gleaming_Vein_Multiplier.png',
    affix: { suffix: '×' },
  },

  // ─── Stars ────────────────────────────────────────────────────

  star_spawn_rate: {
    name: 'Star Spawn Rate Multiplier',
    description: 'The multiplier on the chance that a Star spawns when a floor is cleared. (Base: 1/50)',
    icon: 'Star_Spawn_Rate_Multiplier.png',
    affix: { suffix: '×' },
  },
  star_auto_catch_chance: {
    name: 'Auto-Catch Chance',
    description: 'The chance for a Star to be collected without needing to be tapped.',
    icon: 'Auto-Catch_Chance.png',
    affix: { suffix: '%' },
  },
  star_double_spawn_chance: {
    name: 'Star Double Spawn Chance',
    description: 'The chance for two Stars to appear when one spawns.',
    icon: 'Star_Double_Spawn_Chance.png',
    affix: { suffix: '%' },
  },
  star_triple_spawn_chance: {
    name: 'Star Triple Spawn Chance',
    description: 'The chance for three Stars to appear when one spawns.',
    icon: 'Star_Triple_Spawn_Chance.png',
    affix: { suffix: '%' },
  },
  super_star_spawn_multi: {
    name: 'Super Star Spawn Rate Multiplier',
    description: 'The multiplier on the chance that a Super Star spawns when a Star spawns. (Base: 1/100)',
    icon: 'Super_Star_Spawn_Rate_Multiplier.png',
    affix: { suffix: '×' },
  },
  super_star_triple_chance: {
    name: 'Super Star Triple Chance',
    description: 'The chance for three Super Stars to appear when one spawns.',
    icon: 'Super_Star_Triple_Chance.png',
    affix: { suffix: '%' },
  },
  super_star_10x_chance: {
    name: 'Super Star 10× Spawn Chance',
    description: 'The chance for ten Super Stars to appear when one spawns.',
    icon: 'Super_Star_10x_Spawn_Chance.png',
    affix: { suffix: '%' },
  },
  star_supernova_chance: {
    name: 'Star Supernova Chance',
    description: 'The chance for a Star to spawn as a Supernova.',
    icon: 'Star_Supernova_Chance.png',
    affix: { suffix: '%' },
  },
  star_supernova_multi: {
    name: 'Star Supernova Multiplier',
    description: 'The multiplier on the value of a Star when it is a Supernova. (Base: 10x)',
    icon: 'Star_Supernova_Multiplier.png',
    affix: { suffix: '×' },
  },
  super_star_supernova_chance: {
    name: 'Super Star Supernova Chance',
    description: 'The chance for a Super Star to spawn as a Supernova.',
    icon: 'Super_Star_Supernova_Chance.png',
    affix: { suffix: '%' },
  },
  super_star_supernova_multi: {
    name: 'Super Star Supernova Multiplier',
    description: 'The multiplier on the value of a Super Star when it is a Supernova. (Base: 10x)',
    icon: 'Super_Star_Supernova_Multiplier.png',
    affix: { suffix: '×' },
  },
  star_supergiant_chance: {
    name: 'Star Supergiant Chance',
    description: 'The chance for a Star to spawn as a Supergiant.',
    icon: 'Star_Supergiant_Chance.png',
    affix: { suffix: '%' },
  },
  star_supergiant_multi: {
    name: 'Star Supergiant Multiplier',
    description: 'The multiplier on the value of a Star when it is a Supergiant. (Base: 3x)',
    icon: 'Star_Supergiant_Multiplier.png',
    affix: { suffix: '×' },
  },
  super_star_supergiant_chance: {
    name: 'Super Star Supergiant Chance',
    description: 'The chance for a Super Star to spawn as a Supergiant.',
    icon: 'Super_Star_Supergiant_Chance.png',
    affix: { suffix: '%' },
  },
  super_star_supergiant_multi: {
    name: 'Super Star Supergiant Multiplier',
    description: 'The multiplier on the value of a Super Star when it is a Supergiant. (Base: ??x)',
    icon: 'Super_Star_Supergiant_Multiplier.png',
    affix: { suffix: '×' },
  },
  star_radiant_chance: {
    name: 'Star Radiant Chance',
    description: 'The chance for a star to spawn as a Radiant Star.',
    icon: 'Star_Radiant_Chance.png',
    affix: { suffix: '%' },
  },
  star_radiant_multi: {
    name: 'Star Radiant Multi',
    description: 'The multiplier on the value of a star when it is a Radiant Star. (Base: 10x)',
    icon: 'Star_Radiant_Multi.png',
    affix: { suffix: '×' },
  },
  super_star_radiant_chance: {
    name: 'Super Star Radiant Chance',
    description: 'The chance for a Super Star to spawn as a Radiant Super Star.',
    icon: 'Super_Star_Radiant_Chance.png',
    affix: { suffix: '%' },
  },
  super_star_radiant_multi: {
    name: 'Super Star Radiant Multi',
    description: 'The multiplier on the value of a Super Star when it is a Radiant Super Star. (Base: 10x)',
    icon: 'Super_Star_Radiant_Multi.png',
    affix: { suffix: '×' },
  },
  all_star_multi: {
    name: 'All Star Multiplier',
    description: 'The multiplier on the value of all Stars and Superstars',
    icon: 'All_Star_Multiplier.png',
    affix: { suffix: '×' },
  },
  novagiant_combo_multi: {
    name: 'Novagiant Combo Multiplier',
    description: 'The multiplier on the value of Supergiant Supernova Stars and Super Stars.',
    icon: 'Novagiant_Combo_Multiplier.png',
    affix: { suffix: '×' },
  },
  candy_eaten: {
    name: 'Candy Eaten',
    description: 'The number of candy eaten. The effect caps at 250, but the Candy Eaten stat will keep increasing beyond that point.',
    icon: 'Candy_Eaten.png',
    affix: { prefix: '#'}
  },

  // ─── Fishing ──────────────────────────────────────────────────────────────

  fishing_rod_power: {
    name: 'Fishing Rod Power',
    description: 'The fishing power of your fishing rod',
    icon: 'Fishing_Rod_Power.png',
  },
  fishing_drone_capacity: {
    name: 'Fishing Drone Capacity',
    description: 'The number of Fishing Drones you have available to assign to docks.',
    icon: 'Fishing_Drone_Capacity.png',
    affix: { prefix: '#'}
  },
  fishing_drone_power: {
    name: 'Fishing Drone Base Power',
    description: 'The base fishing power from a single Fishing Drone. (Base: 3)',
    icon: 'Fishing_Drone_Base_Power.png',
  },
  fishing_drone_multiplier: {
    name: 'Drone Power Multiplier',
    description: 'The multiplier on Fishing Drone Base Power that gives the total fishing power per Fishing Drone.',
    icon: 'Drone_Power_Multiplier.png',
    affix: { suffix: '×' },
  },
  fishing_tier2_dock_multi: {
    name: 'Tier 2 Dock Power',
    description: 'The multiplier to fishing power on Tier 2 Docks.',
    icon: 'Tier_2_Dock_Power.png',
    affix: { suffix: '×' },
  },
  fishing_income_multi: {
    name: 'Fish Income Multiplier',
    description: 'The multiplier on the number of fish caught.',
    icon: 'Fish_Income_Multiplier.png',
    affix: { suffix: '×' },
  },
  fishing_tick_reduction_seconds: {
    name: 'Fishing Tick Reduction',
    description: 'The reduction to the amount of time that the fishing tick bar takes to fill up.',
    icon: 'Fishing_Tick_Reduction.png',
    affix: { prefix: '-', suffix: 's' },
  },
  fishing_double_tick_chance: {
    name: 'Double Fish Tick Chance',
    description: 'The chance to get 2 Fishing ticks when the tick bar fills up.',
    icon: 'Double_Fish_Tick_Chance.png',
    affix: { suffix: '%' },
  },
  fishing_triple_tick_chance: {
    name: 'Triple Fish Tick Chance',
    description: 'The chance to get 3 Fishing ticks when the tick bar fills up.',
    icon: 'Triple_Fish_Tick_Chance.png',
    affix: { suffix: '%' },
  },
  fishing_5x_tick_chance: {
    name: '5× Fish Tick Chance',
    description: 'The chance to get 5 Fishing ticks when the tick bar fills up.',
    icon: '5x_Fish_Tick_Chance.png',
    affix: { suffix: '%' },
  },
  fishing_token_multi: {
    name: 'Fish Token Gain Multiplier',
    description: 'The multiplier on Fish Tokens gained from Notices.',
    icon: 'Fish_Token_Gain_Multiplier.png',
    affix: { suffix: '×' },
  },
  fishing_notice_requirement: {
    name: 'Notice Fish Requirement',
    description: 'The reduction in the number of fish requested by Notices.',
    icon: 'Notice_Fish_Requirement.png',
    affix: { suffix: 'x' },
  },
  fishing_tiny_notice_chance: {
    name: 'Tiny Notice Chance',
    description: 'The chance for a Notice to ask for 90% less fish.',
    icon: 'Tiny_Notice_Chance.png',
    affix: { suffix: '%' },
  },
  fishing_shiny_chance: {
    name: 'Shiny Fish Chance',
    description: 'The chance for a shiny catch of fish.',
    icon: 'Shiny_Fish_Chance.png',
    affix: { suffix: '%' },
  },
  fishing_shiny_multi: {
    name: 'Shiny Multiplier',
    description: 'The multiplier on fish caught when a catch is shiny. (Base: 3x)',
    icon: 'Shiny_Multiplier.png',
    affix: { suffix: '×' },
  },
  fishing_super_shiny_chance: {
    name: 'Super Shiny Fish Chance',
    description: 'The chance for a shiny catch of fish to be super shiny.',
    icon: 'Super_Shiny_Fish_Chance.png',
    affix: { suffix: '%' },
  },
  fishing_super_shiny_multi: {
    name: 'Super Shiny Multiplier',
    description: 'The multiplier on fish caught when a shiny catch is super shiny. (Base: 2x)',
    icon: 'Super_Shiny_Multiplier.png',
    affix: { suffix: '×' },
  },
  fishing_tick_speed: {
    name: 'Frames Per Fish Tick',
    description: 'When Sushi is active, this is the amount of fishing ticks used in the time it takes to fill the time bar.',
    icon: 'Obelisk_Fight_Duration_Icon.png',
    affix: { suffix: '×' },
  },

  // ─── Misc ─────────────────────────────────────────────────────────────────

  game_speed_multi: {
    name: 'Game Speed Multiplier',
    description: 'Modifies the speed at which the game runs.',
    icon: 'Game_Speed_Multiplier.png',
    affix: { suffix: '×' },
  },
  item_duration_multi: {
    name: 'Item Duration Multiplier',
    description: 'Increases Item duration.',
    icon: 'Item_Duration_Multiplier.png',
    affix: { suffix: '×' },
  },
  gem_upgrade_cap_increase: {
    name: 'Gem Upgrade Cap Increase',
    description: 'Increases the cap of Gem Upgrades in the Store.',
    icon: 'Gem_Upgrade_Cap_Increase.png',
    affix: { suffix: '×' },
  },
  pet_levelup_chance_multi: {
    name: 'Pet Level Up Chance',
    description: 'Increases the chance for a Pet to level up when completing the leveling action.',
    icon: 'Pet_Level_Up_Chance.png',
    affix: { suffix: '×' },
  },

  // ─── World 1 Statues ──────────────────────────────────────────────────────────

  statue_0_set1: {
    name: 'Statue of Rhythm (Xanz)', 
    description: 'Statue #1 | World #1',
    icon: '1_Statue_Rhythm_Normal.png' 
  },
  statue_1_set1: {
    name: 'Statue of Awareness (Tor)', 
    description: 'Statue #2 | World #1',
    icon: '2_Statue_Awareness_Normal.png' 
  }, 
  statue_2_set1: {
    name: 'Statue of Slaying (Dark)', 
    description: 'Statue #3 | World #1',
    icon: '3_Statue_Slaying_Normal.png'
  },
  statue_3_set1: {
    name: 'Statue of Appetite (Frozen)', 
    description: 'Statue #4 | World #1',
    icon: '4_Statue_Appetite_Normal.png' 
  },
  statue_4_set1: {
    name: 'Statue of Friendship (Caulwik)', 
    description: 'Statue #5 | World #1',
    icon: '5_Statue_Friendship_Normal.png' 
  },
  statue_5_set1: {
    name: 'Statue of Hygiene (Totefm)', 
    description: 'Statue #6 | World #1',
    icon: '6_Statue_Hygiene_Normal.png' 
  },
  statue_6_set1: {
    name: 'Statue of Artistry (Celio)', 
    description: 'Statue #7 | World #1',
    icon: '7_Statue_Artistry_Normal.png' 
  }, 
  statue_7_set1: {
    name: 'Statue of Randomness (Jolly)', 
    description: 'Statue #8 | World #1',
    icon: '8_Statue_Randomness_Normal.png' 
  }, 
  statue_8_set1: {
    name: 'Statue of Childhood (Salutem)', 
    description: 'Statue #9 | World #1',
    icon: '9_Statue_Childhood_Normal.png' 
  },

  // ─── World 3 Statues ──────────────────────────────────────────────────────────

  statue_0_set2: {
    name: 'Statue of Craftmanship (Vydn)', 
    description: 'Statue #1 | World #3',
    icon: '10_Statue_Craftmanship_Normal.png' 
  },
  statue_1_set2: {
    name: 'Statue of Propulsion (Guard)', 
    description: 'Statue #2 | World #3',
    icon: '11_Statue_Propulsion_Normal.png' 
  }, 
  statue_2_set2: {
    name: 'Statue of Safety (Zuiqiang)', 
    description: 'Statue #3 | World #3',
    icon: '12_Statue_Safety_Normal.png'
  },
  statue_3_set2: {
    name: 'Statue of Ignition (Julk)', 
    description: 'Statue #4 | World #3',
    icon: '13_Statue_Ignition_Normal.png' 
  },
  statue_4_set2: {
    name: 'Statue of Warmth (Satio)', 
    description: 'Statue #5 | World #3',
    icon: '14_Statue_Warmth_Normal.png' 
  },
  statue_5_set2: {
    name: 'Statue of Feline (Iseburge)', 
    description: 'Statue #6 | World #3',
    icon: '15_Statue_Feline_Normal.png' 
  },
  statue_6_set2: {
    name: 'Statue of Affluence (Kohanu)', 
    description: 'Statue #7 | World #3',
    icon: '16_Statue_Affluence_Normal.png' 
  }, 
  statue_7_set2: {
    name: 'Statue of Eastwood (MLNW)', 
    description: 'Statue #8 | World #3',
    icon: '17_Statue_Eastwood_Normal.png' 
  }, 
  statue_8_set2: {
    name: 'Statue of Soprano (Praed)', 
    description: 'Statue #9 | World #3',
    icon: '18_Statue_Soprano_Normal.png' 
  },

  // ─── World 4 Statues ──────────────────────────────────────────────────────────

  statue_0_set3: {
    name: 'Statue of Comfort (Lute)', 
    description: 'Statue #1 | World #4',
    icon: '19_Statue_Comfort_Normal.png' 
  },
  statue_1_set3: {
    name: 'Statue of Timekeeping (Karma)', 
    description: 'Statue #2 | World #4',
    icon: '20_Statue_Timekeeping_Normal.png' 
  }, 
  statue_2_set3: {
    name: 'Statue of Combat (Sans)', 
    description: 'Statue #3 | World #4',
    icon: '21_Statue_Combat_Normal.png'
  },
  statue_3_set3: {
    name: 'Statue of Nature (Fanq)', 
    description: 'Statue #4 | World #4',
    icon: '22_Statue_Nature_Normal.png' 
  },
  statue_4_set3: {
    name: 'Statue of Semblance (Vak)', 
    description: 'Statue #5 | World #4',
    icon: '23_Statue_Semblance_Normal.png' 
  },
  statue_5_set3: {
    name: 'Statue of Crochet (Kripp)', 
    description: 'Statue #6 | World #4',
    icon: '24_Statue_Crochet_Normal.png' 
  },
  statue_6_set3: {
    name: 'Statue of Antagonism (Loop)', 
    description: 'Statue #7 | World #4',
    icon: '25_Statue_Antagonism_Normal.png' 
  }, 
  statue_7_set3: {
    name: 'Statue of Fallacy (Berty)', 
    description: 'Statue #8 | World #4',
    icon: '26_Statue_Fallacy_Normal.png' 
  }, 
  statue_8_set3: {
    name: 'Statue of Rodentia (Kromak)', 
    description: 'Statue #9 | World #4',
    icon: '27_Statue_Rodentia_Normal.png.png' 
  },

  // ─── Stats not exported ──────────────────────────────────────────────────────────

  ores_on_screen: {
    name: 'Amount Of Ores Appearing On Screen',
    description: 'The exact amount of ores/veins that appear on screen.  Base is 10',
    icon: 'Golden_Ore_Icon.png',
    affix: { prefix: '+' }
  },
  chance_for_relic_chest: {
    name: 'Change For A Relic Chest',
    description: 'The chance of receiving a Relic Chest from a Freebie.  Base is 10%',
    icon: 'Relic_Chest.png',
    affix: { suffix: '%'}
  },
  freebie_chance_for_skill_shard: {
    name: 'Skill Shard Chance From Freebies',
    description: 'Increases the chance of receiving Skill Shards from Freebies',
    icon: 'Skill_Shard.png',
    affix: { suffix: '%' }
  },
  freebie_chance_for_bonus_relic: {
    name: 'Bonus Relic Chest From Freebies',
    description: 'The chance to receive a bonus Relic Chest from Freebies.',
    icon: 'Relic_Chest.png',
    affix: { suffix: '%' }
  },
  pickaxe_bar_cost_reduction: {
    name: 'Pickaxe Bar Cost Reduction',
    description: 'Reduces the amount of bars required to upgrade the pickaxe on the "Upgrades" menu by this amount.',
    icon: 'Bar_Cost_Reduction.png',
    affix: { prefix: '-'}
  },
  gem_bomb_gem_chance: {
    name: 'Gem Bomb Gem Chance',
    description: 'The chance of receiving a single gem when throwing a Gem Bomb',
    icon: 'Gem_Bomb.png',
    affix: { suffix: '%' }
  },
  veinmorpher_chance: {
    name: 'Veinmorpher Vein Chance',
    description: "Chance to Morph All Ores to Veins. Improves vein income substantially. Both chances are rolled separately and can occur at the same time. Since the ore isn't marked, firing multiple times will repeat the checks.",
    icon: 'Veinmorpher_Bomb.png',
    affix: { suffix: '%' }
  },
  veinmorpher_golden_chance: {
    name: 'Veinmorpher Golden Chance',
    description: "Chance to Make All Veins Golden. Improves vein income substantially. Both chances are rolled separately and can occur at the same time. Since the ore isn't marked, firing multiple times will repeat the checks.",
    icon: 'Veinmorpher_Bomb_Golden.png',
    affix: { suffix: '%' }
  },
  contract_respec: {
    name: 'Contract Point Re-spec',
    description: 'Contract point re-specs allow you to reset your contract upgrades and refund your spent contract points to reallocate them as desired. (Max 4)',
    icon: 'Contract_Point.png',
    affix: { prefix: '+' }
  },
  archaeology_dmg_per_stage: {
    name: 'Damage per highest stage',
    description: 'Increases your damage in Archaeology by +1% per highest stage, capped at Stage 100. For example, reaching stage 48, gives you +48% increased damage.',
    icon: 'Archaeology_Strength.png',
    affix: { suffix: '%' }
  },
  archaeology_stm_per_stage: {
    name: 'Max stamina per highest stage',
    description: 'Increases your Max Stamina in Archaeology by +1% per higest stage, capped at stage 100. For example, reaching stage 48, gives you +48% max stamina.',
    icon: 'Archaeology_Agility.png',
    affix: { suffix: '%' }
  },
  archaeology_spd_mod_gain: {
    name: 'Speed Mod Gain',
    description: 'The amount of hits in Archaeology you receive with increased attack speed when breaking an ore with the Speed Mod.',
    icon: 'Archaeology_Speed_Mod_Chance.png',
    affix: { prefix: '+' }
  },
  archaeology_ability_dur: {
    name: 'Ability Duration',
    description: 'The amount of seconds added to the duration of all abilities in Archaeology',
    icon: 'Obelisk_Fight_Duration_Icon.png',
    affix: { prefix: '+' }
  },
  archaeology_ability_cd: {
    name: 'Ability Cooldown',
    description: 'The amount of seconds removed from the cooldown of all abilities in Archaeology.',
    icon: 'Time-Turner.png',
    affix: { prefix: '-' }
  },
  archaeology_ability_insta: {
    name: 'Ability Instacharge Chance',
    description: 'The chance the cooldown of the ability is instantly reset in Archaeology.  Can trigger when an ability is activated.',
    icon: 'Archaeology_Ability_Instacharge.png',
    affix: { suffix: '%' }
  },
  archaeology_fragment_gain_multi: {
    name: 'Arch - Fragment Gain',
    description: 'Multiplies the amount of fragments gained in Archaeology.',
    icon: 'Archaeology_Fragment_Gain.png',
    affix: { suffix: '×' }
  },
  archaeology_exp_gain_multi: {
    name: 'Arch - Exp Gain',
    description: 'Multiplies the amount of Exp gained in Archaeology.',
    icon: 'Archaeology_Exp_Gain.png',
    affix: { suffix: '×' }
  },
  archaeology_crosshair_auto_tap: {
    name: 'Arch - Crosshair Auto-Tap',
    description: 'Increases the chance of a Crosshair Auto-Tap',
    icon: 'Archaeology_Crosshair_Auto-Tap.png',
    affix: { suffix: '%' }
  },
  archaeology_lood_mod_chance: {
    name: 'Arch - Loot Mod Chance',
    description: 'Increases the chance a rock spawns with the Loot Mod.',
    icon: 'Archaeology_Loot_Mod_Chance.png',
    affix: { suffix: '%' }
  },
  archaeology_golden_crosshair_chance: {
    name: 'Arch Golden Crosshair Chance',
    description: 'Increases the chance of a Golden Crosshair',
    icon: 'Archaeology_Gold_Crosshair.png',
    affix: { suffix: '%' }
  },
  fishing_t2_items_expert_notice: {
    name: 'T2 Items From Expert Notices',
    description: 'The amount of T2 items received from completing Expert Notices in Fishing.',
    icon: 'T2_Item_Box.png',
    affix: { prefix: '+' }
  },
  polychrome_card_bonus_vein: {
    name: 'Poly Card Bonus - Veins',
    description: 'Increases the bonus on all Polychrome Vein cards.',
    icon: 'Card_Backing_Polychrome.png',
    affix: { prefix: '+', suffix: '×' }
  },
  polychrome_card_bonus_ore: {
    name: 'Poly Card Bonus - Ores',
    description: 'Increases the bonus on all Polychrome Ore cards.',
    icon: 'Card_Backing_Polychrome.png',
    affix: { prefix: '+', suffix: '×' }
  },
  polychrome_card_bonus_star: {
    name: 'Poly Card Bonus - Star',
    description: 'Increases the bonus on all Polychrome Star cards.',
    icon: 'Card_Backing_Polychrome.png',
    affix: { prefix: '+', suffix: '×' }
  },
  polychrome_card_bonus_fish: {
    name: 'Poly Card Bonus - Fish',
    description: 'Increases the bonus on all Polychrome Fish cards.',
    icon: 'Card_Backing_Polychrome.png',
    affix: { prefix: '+', suffix: '×' }
  },
  star_orion_cap: {
    name: 'Orion Star Cap',
    description: 'Increases the level cap of Orion star.',
    icon: 'Orion.png',
    affix: { prefix: '+' }
  },
  star_capricorn_cap: {
    name: 'Capricorn Star Cap',
    description: 'Increases the level cap of Capricorn star.',
    icon: 'Capricorn.png',
    affix: { prefix: '+' }
  },
  star_gemini_cap: {
    name: 'Gemini Star Cap',
    description: 'Increases the level cap of Gemini star.',
    icon: 'Gemini.png',
    affix: { prefix: '+' }
  },
  star_scorpio_cap: {
    name: 'Scorpio Star Cap',
    description: 'Increases the level cap of Scorpio star.',
    icon: 'Scorpio.png',
    affix: { prefix: '+' }
  },
  fishing_abyss_dock_tick_req: {
    name: 'Abyss Dock Tick Req',
    description: 'Reduces the amount of ticks required on the Abyss Dock',
    icon: 'Abyss_Legendary_Fish_Head.png',
    affix: { prefix: '-' }
  },
  fishing_t2_dock_tick_req: {
    name: 'T2 Dock Tick Req',
    description: 'Reduces the amount of ticks required on all T2 docks',
    icon: 'Tier_2_Dock_Ticks.png',
    affix: { prefix: '-' }
  },
  drone_void_grade_cap_increase: {
    name: 'Void Drone Grade Cap Increase',
    description: 'Increases the Grade cap for the Void Drone',
    icon: 'Drone_Void_Icon.png',
    affix: { prefix: '+' }
  },
  drone_frogger_grade_cap_increase: {
    name: 'Frogger Drone Grade Cap Increase',
    description: 'Increases the Grade cap for the Frogger Drone',
    icon: 'Drone_Frogger_Icon.png',
    affix: { prefix: '+' }
  },
  drone_chain_grade_cap_increase: {
    name: 'Chain Drone Grade Cap Increase',
    description: 'Increases the Grade cap for the Chain Drone',
    icon: 'Drone_Chain_Icon.png',
    affix: { prefix: '+' }
  },
  drone_veinseeker_grade_cap_increase: {
    name: 'Veinseeker Drone Grade Cap Increase',
    description: 'Increases the Grade cap for the Veinseeker Drone',
    icon: 'Drone_Veinseeker_Icon.png',
    affix: { prefix: '+' }
  },
  founder_supply_drop_cd: {
    name: 'Supply Drop Cooldown',
    description: 'The amount of time until the Founder Supply Drop spawns.',
    icon: 'Supply_Drop.png'
  },
  founder_double_supply_drop_chance: {
    name: 'Double Supply Drop Chance',
    description: 'The chance that the Founder Supply Drop is doubled.',
    icon: 'Double_Supply_Drop.png',
    affix: { suffix: '%' }
  },
  founder_triple_supply_drop_chance: {
    name: 'Triple Supply Drop Chance',
    description: 'The chance that the Founder Supply Drop is tripled.',
    icon: 'Triple_Supply_Drop.png',
    affix: { suffix: '%' }
  },
  founder_golden_supply_drop_chance: {
    name: 'Golden Supply Drop Chance',
    description: 'The chance that the Founder Supply Drop is Golden(5x value).',
    icon: 'Golden_Supply_Drop.png',
    affix: { suffix: '%' }
  },



}

// ─── Lookup helpers ────────────────────────────────────────────────────────

export function getStatMeta(key: string): StatMeta | undefined {
  return STAT_REGISTRY[key]
}

export function getStatAffix(key: string): StatAffix | undefined {
  return STAT_REGISTRY[key]?.affix
}

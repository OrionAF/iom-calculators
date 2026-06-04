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
 *
 * Context-specific tooltip additions (e.g. "this is a permanent effect") go
 * on the individual StoreEffect.tooltipAddition or page-level prop — NOT here.
 */

export interface StatMeta {
  name: string
  description: string
  icon?: string
}

export const STAT_REGISTRY: Readonly<Record<string, StatMeta>> = {

  // ─── Pickaxe ──────────────────────────────────────────────────────────────

  pickaxe_damage: {
    name: 'Pickaxe Damage',
    description: 'Multiplies the base damage your pickaxe deals per swing.',
    icon: 'Pickaxe_Damage.png',
  },
  pickaxe_attack_speed_per_second: {
    name: 'Pickaxe Attack Speed',
    description: 'How many times per second your pickaxe swings.',
    icon: 'Pickaxe_Attack_Speed.png',
  },
  pickaxe_radius_percent: {
    name: 'Pickaxe Radius',
    description: 'Increases the area of effect of each pickaxe swing.',
    icon: 'Pickaxe_Radius.png',
  },
  pickaxe_crit_chance: {
    name: 'Pickaxe Crit Chance',
    description: 'Chance for a pickaxe swing to deal critical damage.',
    icon: 'Pickaxe_Crit_Chance.png',
  },
  pickaxe_crit_damage: {
    name: 'Pickaxe Crit Damage',
    description: 'Multiplies damage dealt on a critical pickaxe hit.',
    icon: 'Pickaxe_Crit_Damage.png',
  },
  pickaxe_super_crit_chance: {
    name: 'Pickaxe Super Crit Chance',
    description: 'Chance for a critical hit to be upgraded to a Super Critical.',
    icon: 'Pickaxe_Super_Crit_Chance.png',
  },
  pickaxe_super_crit_damage: {
    name: 'Pickaxe Super Crit Damage',
    description: 'Multiplies damage on a Super Critical pickaxe hit.',
    icon: 'Pickaxe_Super_Crit_Damage.png',
  },
  pickaxe_ultra_crit_chance: {
    name: 'Pickaxe Ultra Crit Chance',
    description: 'Chance for a Super Critical hit to escalate to Ultra Critical.',
    icon: 'Pickaxe_Ultra_Crit_Chance.png',
  },
  pickaxe_ultra_crit_damage: {
    name: 'Pickaxe Ultra Crit Damage',
    description: 'Multiplies damage on an Ultra Critical pickaxe hit.',
    icon: 'Pickaxe_Ultra_Crit_Damage.png',
  },
  pickaxe_omega_crit_chance: {
    name: 'Pickaxe Omega Crit Chance',
    description: 'Chance for an Ultra Critical hit to escalate to Omega Critical.',
    icon: 'Pickaxe_Omega_Crit_Chance.png',
  },
  pickaxe_omega_crit_damage: {
    name: 'Pickaxe Omega Crit Damage',
    description: 'Multiplies damage on an Omega Critical pickaxe hit.',
    icon: 'Pickaxe_Omega_Crit_Damage.png',
  },

  // ─── Bombs ────────────────────────────────────────────────────────────────

  bomb_damage: {
    name: 'Bomb Damage',
    description: 'Multiplies the base damage of all bomb types before other multipliers apply.',
    icon: 'Bomb_Damage.png',
  },
  bomb_capacity: {
    name: 'Bomb Capacity',
    description: 'The total number of bombs you can carry at once.',
    icon: 'Bomb_Capacity.png',
  },
  bomb_recharge_speed: {
    name: 'Bomb Recharge Speed',
    description: 'Multiplies how quickly your bombs recharge after being used.',
    icon: 'Bomb_Recharge_Speed.png',
  },
  bomb_of_plenty_multi: {
    name: 'Bomb of Plenty Multiplier',
    description: 'Multiplies the ore-income bonus granted by the Bomb of Plenty.',
    icon: 'Bomb_of_Plenty.png',
  },
  bomb_transmuter_multi: {
    name: 'Transmuter Bomb Multiplier',
    description: 'Multiplies the number of bars the Transmuter Bomb produces per rock.',
    icon: 'Transmuter_Bomb.png',
  },
  bomb_crit_chance: {
    name: 'Bomb Crit Chance',
    description: 'Chance for a bomb explosion to deal critical damage.',
    icon: 'Bomb_Crit_Chance.png',
  },
  bomb_additional_multiplier: {
    name: 'Additional Bomb Multiplier',
    description: 'An extra multiplier applied on top of all bomb-damage calculations.',
    icon: 'Additional_Bomb_Multiplier.png',
  },
  bomb_battery_cap_increases: {
    name: 'Battery Bomb Cap Increases',
    description: 'Number of times the Battery Bomb has permanently increased your bomb cap.',
    icon: 'Bomb_Capacity.png',
  },
  bomb_cherry3x_chance: {
    name: 'Cherry Charge 3× Chance',
    description: 'Chance for the Cherry Charge bomb to deal triple damage.',
    icon: 'Cherry_Charge_3x_Chance.png',
  },

  // ─── Ore & Veins ──────────────────────────────────────────────────────────

  ore_income_multi: {
    name: 'Ore Income Multiplier',
    description: 'Multiplies all ore gained from every source in the game.',
    icon: 'Ore_Income_Multiplier.png',
  },
  ore_sell_price_multi: {
    name: 'Ore Sell Price Multiplier',
    description: 'Multiplies the gold you receive when selling ore.',
    icon: 'Ore_Sell_Price_Multiplier.png',
  },
  golden_ore_chance: {
    name: 'Golden Ore Chance',
    description: 'Chance for an individual ore to spawn as a Golden Ore, which is worth significantly more.',
    icon: 'Golden_Ore_Chance.png',
  },
  golden_ore_multi: {
    name: 'Golden Ore Multiplier',
    description: 'Multiplies the value of all Golden Ores mined.',
    icon: 'Golden_Ore_Multiplier.png',
  },
  golden_floor_multi: {
    name: 'Golden Floor Multiplier',
    description: 'Multiplies the income bonus granted when mining on a Golden Floor.',
    icon: 'Golden_Floor_Multiplier.png',
  },
  rainbow_floor_chance: {
    name: 'Rainbow Floor Chance',
    description: 'Chance for a floor to spawn as a Rainbow Floor, boosting income from all ores on it.',
    icon: 'Rainbow_Floor_Chance.png',
  },
  rainbow_floor_multi: {
    name: 'Rainbow Floor Multiplier',
    description: 'Multiplies the income bonus from Rainbow Floors.',
    icon: 'Rainbow_Floor_Multiplier.png',
  },
  vein_income_multi: {
    name: 'Vein Income Multiplier',
    description: 'Multiplies ore income from all ore veins.',
    icon: 'Vein_Income_Multiplier.png',
  },
  vein_spawn_rate_multi: {
    name: 'Vein Spawn Rate Multiplier',
    description: 'Multiplies how frequently ore veins appear on your floors.',
    icon: 'Vein_Spawn_Rate_Multiplier.png',
  },
  golden_vein_chance: {
    name: 'Golden Vein Chance',
    description: 'Chance for a vein to spawn as a Golden Vein, granting a large income bonus.',
    icon: 'Golden_Vein_Chance.png',
  },
  golden_vein_multi: {
    name: 'Golden Vein Multiplier',
    description: 'Multiplies the income from Golden Veins.',
    icon: 'Golden_Vein_Multiplier.png',
  },
  rainbow_vein_chance: {
    name: 'Rainbow Vein Chance',
    description: 'Chance for a vein to spawn as a Rainbow Vein.',
    icon: 'Rainbow_Vein_Chance.png',
  },

  // ─── Bars & Crafting ──────────────────────────────────────────────────────

  bar_output_multi: {
    name: 'Bar Output Multiplier',
    description: 'Multiplies the number of bars produced from crafting, the Transmuter Bomb, and other bar sources.',
    icon: 'Bar_Output_Multiplier.png',
  },
  bar_craft_cost_multi: {
    name: 'Bar Craft Cost',
    description: 'Reduces the gold cost of crafting bars. Lower is better.',
    icon: 'Bar_Craft_Cost.png',
  },
  craft_100x_chance: {
    name: '100× Craft Chance',
    description: 'Chance to receive 100× the normal output when crafting.',
    icon: '100x_Craft_Chance.png',
  },
  craft_10x_chance: {
    name: '10× Craft Chance',
    description: 'Chance to receive 10× the normal output when crafting.',
    icon: '10x_Craft_Chance.png',
  },
  free_craft_chance: {
    name: 'Free Craft Chance',
    description: 'Chance to craft without spending any resources.',
    icon: 'Free_Craft_Chance.png',
  },
  triple_craft_chance: {
    name: 'Triple Craft Chance',
    description: 'Chance to receive 3× the normal output when crafting.',
    icon: 'Triple_Craft_Chance.png',
  },

  // ─── Freebies & Economy ───────────────────────────────────────────────────

  freebie_bank_cap: {
    name: 'Banked Freebie Cap',
    description: 'Maximum number of Freebie Packs you can store in the bank.',
    icon: 'Banked_Freebie_Cap.png',
  },
  freebie_gems_bonus: {
    name: 'Bonus Gems From Freebie Pack',
    description: 'Additional gems added to each Freebie Pack payout.',
    icon: 'Bonus_Gems_From_Freebie_Pack.png',
  },
  freebie_5x_chance: {
    name: 'Freebie Pack Jackpot Chance',
    description: 'Chance for a Freebie Pack to pay out 5× its normal value.',
    icon: 'Chance_For_Freebie_Jackpot.png',
  },
  freebie_refresh_chance: {
    name: 'Instant Freebie Refresh Chance',
    description: 'Chance for the Freebie Pack to instantly refresh after being claimed.',
    icon: 'Instant_Refresh_Chance.png',
  },
  stonks_multi: {
    name: 'Stonks Freebie Multiplier',
    description: 'Multiplies the income bonus when a Stonks proc fires during a Freebie.',
    icon: 'Stonks_Freebie_Multiplier.png',
  },
  super_stonks_chance: {
    name: 'Super Stonks Chance',
    description: 'Chance for a Stonks proc to become a Super Stonks, granting a much larger bonus.',
    icon: 'Super_Stonks_Chance.png',
  },
  super_stonks_multi: {
    name: 'Super Stonks Multiplier',
    description: 'Multiplies income when a Super Stonks proc fires.',
    icon: 'Super_Stonks_Multiplier.png',
  },
  prestige_point_multi: {
    name: 'Prestige Point Multiplier',
    description: 'Multiplies the number of Prestige Points gained when prestiging.',
    icon: 'Prestige_Point_Gain_Multiplier.png',
  },

  // ─── Lootbugs & Lootfrogs ─────────────────────────────────────────────────

  lootbug_bank_cap: {
    name: 'Banked Lootbug Cap',
    description: 'Maximum number of Lootbugs you can store in the bank.',
    icon: 'Banked_Lootbug_Cap.png',
  },
  lootbug_golden_chance: {
    name: 'Golden Lootbug Chance',
    description: 'Chance for a Lootbug to be a Golden Lootbug, which reduces the gem cost of its loot to 0.',
    icon: 'Golden_Lootbug_Chance.png',
  },
  lootbug_loot_multi: {
    name: 'Lootbug Loot Multiplier',
    description: 'Multiplies the amount of loot dropped when a Lootbug is collected.',
    icon: 'Lootbug_Loot_Multiplier.png',
  },
  lootfrog_capacity: {
    name: 'Lootfrog Capacity',
    description: 'Maximum number of Lootfrogs that can be active on your floors at once.',
    icon: 'Lootfrog_Capacity.png',
  },
  lootfrog_loot_multi: {
    name: 'Lootfrog Loot Multiplier',
    description: 'Multiplies the loot dropped when a Lootfrog is collected.',
    icon: 'Lootfrog_Loot_Multiplier.png',
  },
  lootfrog_triple_spawn_chance: {
    name: 'Lootfrog Triple Spawn Chance',
    description: 'Chance for Lootfrogs to spawn in groups of three instead of one.',
    icon: 'Frog_Frenzy.png',
  },

  // ─── Stars & Stargazing ────────────────────────────────────────────────────

  all_star_multi: {
    name: 'All Star Multiplier',
    description: 'Multiplies income from all star types — Normal, Super, and beyond.',
    icon: 'All_Star_Multiplier.png',
  },
  star_triple_spawn_chance: {
    name: 'Star Triple Spawn Chance',
    description: 'Chance for stars to spawn in groups of three.',
    icon: 'Star_Triple_Spawn_Chance.png',
  },
  super_star_triple_chance: {
    name: 'Super Star Triple Chance',
    description: 'Chance for Super Stars to spawn in groups of three.',
    icon: 'Super_Star_Triple_Chance.png',
  },
  super_star_10x_chance: {
    name: 'Super Star 10× Spawn Chance',
    description: 'Chance for a Super Star to award 10× its normal income.',
    icon: 'Super_Star_10x_Spawn_Chance.png',
  },
  star_supernova_chance: {
    name: 'Star Supernova Chance',
    description: 'Chance for a star to trigger a Supernova explosion, granting a large income spike.',
    icon: 'Star_Supernova_Chance.png',
  },
  star_supernova_multi: {
    name: 'Star Supernova Multiplier',
    description: 'Multiplies the income granted by a Star Supernova.',
    icon: 'Star_Supernova_Multiplier.png',
  },
  super_star_supernova_chance: {
    name: 'Super Star Supernova Chance',
    description: 'Chance for a Super Star to trigger a Supernova.',
    icon: 'Super_Star_Supernova_Chance.png',
  },
  super_star_supernova_multi: {
    name: 'Super Star Supernova Multiplier',
    description: 'Multiplies the income from a Super Star Supernova.',
    icon: 'Super_Star_Supernova_Multiplier.png',
  },
  star_supergiant_chance: {
    name: 'Star Supergiant Chance',
    description: 'Chance for a star to become a Supergiant, dramatically increasing its value.',
    icon: 'Star_Supergiant_Chance.png',
  },
  star_supergiant_multi: {
    name: 'Star Supergiant Multiplier',
    description: 'Multiplies the income from Supergiant stars.',
    icon: 'Star_Supergiant_Multiplier.png',
  },
  super_star_supergiant_chance: {
    name: 'Super Star Supergiant Chance',
    description: 'Chance for a Super Star to become a Supergiant.',
    icon: 'Super_Star_Supergiant_Chance.png',
  },
  super_star_supergiant_multi: {
    name: 'Super Star Supergiant Multiplier',
    description: 'Multiplies the income from Super Star Supergiants.',
    icon: 'Super_Star_Supergiant_Multiplier.png',
  },
  novagiant_combo_multi: {
    name: 'Novagiant Combo Multiplier',
    description: 'Multiplies the bonus from the Novagiant combo chain.',
    icon: 'Novagiant_Combo_Multiplier.png',
  },

  // ─── Drones ────────────────────────────────────────────────────────────────

  drone_count: {
    name: 'Number of Drones',
    description: 'Number of automated mining drones that mine alongside you, even while offline.',
    icon: 'Number_Of_Drones.png',
  },
  coal_drone_exp_multi: {
    name: 'Drone EXP Gain Multiplier',
    description: 'Multiplies the experience your drones earn, helping them level up faster.',
    icon: 'Drone_Exp_Gain_Multiplier.png',
  },
  coal_fuel_duration_multi: {
    name: 'Drone Fuel Duration Multiplier',
    description: 'Multiplies how long drone fuel lasts before it needs to be replenished.',
    icon: 'Drone_Fuel_Duration_Multiplier.png',
  },
  drone_suit_cap: {
    name: 'Drone Suit Cap',
    description: 'The maximum number of drone suit upgrades that can be equipped.',
    icon: 'Number_Of_Drones.png',
  },
  drone_radius_percent: {
    name: 'Drone Radius',
    description: 'Increases the mining radius of your drones.',
  },
  drone_movespeed_percent: {
    name: 'Drone Move Speed',
    description: 'Increases the movement speed of your drones.',
  },
  drone_attack_speed_percent: {
    name: 'Drone Attack Speed',
    description: 'Increases how quickly your drones swing at ores.',
  },
  drone_triple_damage_chance: {
    name: 'Drone Triple Damage',
    description: 'Chance for a drone swing to deal triple damage.',
    icon: 'Drone_Triple_Damage.png',
  },

  // ─── Void Portal ──────────────────────────────────────────────────────────

  void_portal_base_multi: {
    name: 'Void Portal Base Multiplier',
    description: 'Multiplies the base income from all Void Portals.',
    icon: 'Void_Portal_Base_Multiplier.png',
  },
  golden_void_portal_chance: {
    name: 'Golden Void Portal Chance',
    description: 'Chance for a Void Portal to spawn as a Golden Void Portal, granting much higher income.',
    icon: 'Golden_Void_Portal_Chance.png',
  },
  golden_void_portal_multi: {
    name: 'Golden Void Portal Multiplier',
    description: 'Multiplies the income from Golden Void Portals.',
    icon: 'Golden_Void_Portal_Multi.png',
  },

  // ─── Fishing ──────────────────────────────────────────────────────────────

  fishing_income_multi: {
    name: 'Fish Income Multiplier',
    description: 'Multiplies all income earned from fishing.',
    icon: 'Fish_Income_Multiplier.png',
  },
  fishing_rod_power: {
    name: 'Fishing Rod Power',
    description: 'Multiplies the overall effectiveness of your fishing rod.',
    icon: 'Fishing_Rod_Power.png',
  },
  fishing_5x_tick_chance: {
    name: '5× Fish Tick Chance',
    description: 'Chance for each fishing tick to award 5× its normal income.',
    icon: '5x_Fish_Tick_Chance.png',
  },
  fishing_triple_tick_chance: {
    name: 'Triple Fish Tick Chance',
    description: 'Chance for each fishing tick to count three times.',
    icon: 'Triple_Fish_Tick_Chance.png',
  },
  fishing_tiny_notice_chance: {
    name: 'Tiny Notice Chance',
    description: 'Chance for a Tiny fishing notice event to trigger, granting bonus fish income.',
    icon: 'Tiny_Notice_Chance.png',
  },
  fishing_tier2_dock_multi: {
    name: 'Tier 2 Dock Power',
    description: 'Multiplies income produced by Tier 2 fishing docks.',
    icon: 'Tier_2_Dock_Power.png',
  },
  fishing_drone_capacity: {
    name: 'Fishing Drone Capacity',
    description: 'Maximum number of fishing drones you can deploy.',
    icon: 'Fishing_Rod_Power.png',
  },
  fishing_tick_reduction_seconds: {
    name: 'Fishing Tick Reduction',
    description: 'Reduces the time between fishing ticks.',
    icon: 'Fishing_Rod_Power.png',
  },
  fishing_notice_requirement: {
    name: 'Fishing Notice Requirement',
    description: 'Multiplier on the fish count threshold needed to trigger a notice event.',
    icon: 'Fishing_Rod_Power.png',
  },

  // ─── Chests ───────────────────────────────────────────────────────────────

  chest_meter_multi: {
    name: 'Chest Meter Gain Multiplier',
    description: 'Multiplies the rate at which the chest meter fills up.',
    icon: 'Chest_Meter_Gain_Multiplier.png',
  },
  chest_items_bonus: {
    name: 'Items Contained In Chests',
    description: 'Additional items you receive from each chest opened.',
    icon: 'Items_Contained_In_Chests.png',
  },

  // ─── Misc ─────────────────────────────────────────────────────────────────

  game_speed_multi: {
    name: 'Game Speed Multiplier',
    description: 'Multiplies the overall speed of the game — everything happens faster.',
    icon: 'Game_Speed_Multiplier.png',
  },
  experience_multi: {
    name: 'Experience Gain Multiplier',
    description: 'Multiplies all experience gained from any source.',
    icon: 'Experience_Gain_Multiplier.png',
  },
  pet_levelup_chance_multi: {
    name: 'Pet Level Up Chance',
    description: 'Multiplies the probability of your pet levelling up after each interaction.',
    icon: 'Pet_Level_Up_Chance.png',
  },
  xp_level_cap: {
    name: 'XP Level Cap',
    description: 'The maximum level your XP bar can reach before the prestige resets it.',
    icon: 'Xp_Level_Cap.png',
  },
  obelisk_timer_add: {
    name: 'Obelisk Timer Add',
    description: 'Multiplier added to the Obelisk timer, extending its active duration.',
  },
  lootbug_gem_cost_reduction: {
    name: 'Lootbug Gem Cost Reduction',
    description: 'Reduces the gem cost to collect a Lootbug\'s loot.',
  },
  coal_generation_seconds: {
    name: 'Coal Generation Time',
    description: 'Seconds between coal generation ticks for drone fuel.',
    icon: 'Drone_Fuel_Duration_Multiplier.png',
  },
  contract_cost_reduction: {
    name: 'Contract Cost Reduction',
    description: 'Reduces the gold cost of taking on contracts.',
  },
  contract_points_rewarded: {
    name: 'Contract Points Rewarded',
    description: 'Additional contract points awarded on contract completion.',
  },
  freebie_cooldown_seconds: {
    name: 'Freebie Cooldown',
    description: 'Seconds between Freebie Pack recharge ticks.',
  },
  item_duration_multi: {
    name: 'Item Duration Multiplier',
    description: 'Multiplies how long temporary items and effects last.',
    icon: 'Item_Duration_Multiplier.png',
  },
  gem_upgrade_cap_increase: {
    name: 'Gem Upgrade Cap Increase',
    description: 'Additional levels added to the maximum cap of all gem upgrades.',
    icon: 'Gem_Upgrade_Cap_Increase.png',
  },

  // ─── Archaeology ──────────────────────────────────────────────────────────

  fragment_gain_multi: {
    name: 'Fragment Gain Multiplier',
    description: 'Multiplies the number of archaeology fragments gained from excavations.',
    icon: 'Fragment_Gain.png',
  },
}

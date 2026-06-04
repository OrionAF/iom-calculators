export interface StatAffix {
  prefix?: string
  suffix?: string
}

export interface StatEntry {
  key: string
  label?: string  // display override; falls back to auto-derived "Snake case" from the key
  icon?: string  // wiki filename, e.g. "Fishing_Rod_Power.png"
  affix?: StatAffix  // per-stat formatting override; takes precedence over suffix-rule fallback
}

/**
 * Flat key → affix lookup, built from STAT_CATALOG at module load time.
 * Used by format.ts to resolve per-stat prefixes/suffixes before falling
 * back to the key-suffix rules.
 */
let _affixByKey: Map<string, StatAffix> | null = null

export function getStatAffix(key: string): StatAffix | undefined {
  if (_affixByKey === null) {
    _affixByKey = new Map()
    for (const cat of STAT_CATALOG) {
      for (const stat of cat.stats) {
        if (stat.affix) _affixByKey.set(stat.key, stat.affix)
      }
    }
  }
  return _affixByKey.get(key)
}

export interface StatCategory {
  id: string
  label: string
  stats: StatEntry[]
}

export const STAT_CATALOG: readonly StatCategory[] = [

  { id: 'pickaxe', label: 'Pickaxe', stats: [
    { key: 'pickaxe_damage', label: 'Pickaxe Damage', icon: 'Pickaxe_Damage.png' },
    { key: 'pickaxe_attack_speed_per_second', label: 'Pickaxe Attack Speed', icon: 'Pickaxe_Attack_Speed.png', affix: { suffix: ' p/s' } },
    { key: 'pickaxe_radius_percent', label: 'Pickaxe Radius', icon: 'Pickaxe_Radius.png', affix: { prefix: '+', suffix: '%' } },
    { key: 'pickaxe_crit_chance', label: 'Pickaxe Crit Chance', icon: 'Pickaxe_Crit_Chance.png' },
    { key: 'pickaxe_crit_damage', label: 'Pickaxe Crit Damage', icon: 'Pickaxe_Crit_Damage.png' },
    { key: 'pickaxe_super_crit_chance', label: 'Pickaxe Super Crit Chance', icon: 'Pickaxe_Super_Crit_Chance.png' },
    { key: 'pickaxe_super_crit_damage', label: 'Pickaxe Super Crit Damage', icon: 'Pickaxe_Super_Crit_Damage.png' },
    { key: 'pickaxe_ultra_crit_chance', label: 'Pickaxe Ultra Crit Chance', icon: 'Pickaxe_Ultra_Crit_Chance.png' },
    { key: 'pickaxe_ultra_crit_damage', label: 'Pickaxe Ultra Crit Damage', icon: 'Pickaxe_Ultra_Crit_Damage.png' },
    { key: 'pickaxe_omega_crit_chance', label: 'Pickaxe Omega Crit Chance', icon: 'Pickaxe_Omega_Crit_Chance.png' },
    { key: 'pickaxe_omega_crit_damage', label: 'Pickaxe Omega Crit Damage', icon: 'Pickaxe_Omega_Crit_Damage.png' },
  ] },

  { id: 'bombs', label: 'Bombs', stats: [
    { key: 'bomb_damage', label: 'Bomb Damage', icon: 'Bomb_Damage.png' },
    { key: 'bomb_crit_chance', label: 'Bomb Crit Chance', icon: 'Bomb_Crit_Chance.png' },
    { key: 'bomb_crit_damage', label: 'Bomb Crit Damage', icon: 'Bomb_Crit_Damage.png' },
    { key: 'bomb_recharge_speed', label: 'Bomb Recharge Speed', icon: 'Bomb_Recharge_Speed.png' },
    { key: 'bomb_free_chance', label: 'Free Bomb Chance', icon: 'Free_Bomb_Chance.png' },
    { key: 'bomb_capacity', label: 'Bomb Capacity', icon: 'Bomb_Capacity.png', affix: { prefix: '' } },
    { key: 'bomb_additional_multiplier', label: 'Additional Bomb Multiplier', icon: 'Additional_Bomb_Multiplier.png', affix: { prefix: '+', suffix: '×' } },
    { key: 'bomb_super_crit_chance', label: 'Bomb Super Crit Chance', icon: 'Bomb_Super_Crit_Chance.png' },
    { key: 'bomb_super_crit_damage', label: 'Bomb Super Crit Damage', icon: 'Bomb_Super_Crit_Damage.png' },
    { key: 'bomb_ultra_crit_chance', label: 'Bomb Ultra Crit Chance', icon: 'Bomb_Ultra_Crit_Chance.png' },
    { key: 'bomb_ultra_crit_damage', label: 'Bomb Ultra Crit Damage', icon: 'Bomb_Ultra_Crit_Damage.png' },
    { key: 'bomb_omega_crit_chance', label: 'Bomb Omega Crit Chance', icon: 'Bomb_Omega_Crit_Chance.png' },
    { key: 'bomb_omega_crit_damage', label: 'Bomb Omega Crit Damage', icon: 'Bomb_Omega_Crit_Damage.png' },
    { key: 'bomb_cherry3x_chance', label: 'Cherry Charge 3x Chance', icon: 'Cherry_Charge_3x_Chance.png' },
    { key: 'bomb_battery_cap_increases', label: 'Bomb Capacity Gained From Battery', icon: 'Bomb_Capacity_Gained_From_Battery.png', affix: { prefix: '' } },
    { key: 'bomb_cap_multiplier', label: 'Bomb Cap Multiplier', icon: 'Bomb_Cap_Multiplier.png' },
    { key: 'bomb_workshop_cap_increase', label: 'Workshop Upgrade Cap Increase', icon: 'Workshop_Upgrade_Cap_Increase.png' },
    { key: 'bomb_of_plenty_make_gold_chance', label: 'Bomb of Plenty Golden Ore Chance', icon: 'Bomb_of_Plenty_Golden.png' },
    { key: 'bomb_of_plenty_multi', label: 'Bomb of Plenty Multiplier', icon: 'Bomb_of_Plenty.png' },
    { key: 'bomb_trans_apply_bop_chance', label: 'Transmuter Bomb Apply BoP Stack Chance', icon: 'Transmuter_Bomb_Golden.png' },
    { key: 'bomb_transmuter_multi', label: 'Transmuter Bomb Multi', icon: 'Transmuter_Bomb.png' },
  ] },

  { id: 'drones', label: 'Drones', stats: [
    { key: 'drone_count', label: 'Number Of Drones', icon: 'Number_Of_Drones.png' },
    { key: 'drone_damage_percent', label: 'Drone Damage', icon: 'Drone_Damage.png' },
    { key: 'drone_radius_percent', label: 'Drone Radius', icon: 'Drone_Radius.png', affix: { prefix: '+', suffix: '%' } },
    { key: 'drone_movespeed_percent', label: 'Drone Movespeed', icon: 'Drone_Movespeed.png', affix: { prefix: '+', suffix: '%' } },
    { key: 'drone_attack_speed_percent', label: 'Drone Attack Speed', icon: 'Drone_Attack_Speed.png', affix: { prefix: '+', suffix: '%' } },
    { key: 'drone_triple_damage_chance', label: 'Drone Triple Damage', icon: 'Drone_Triple_Damage.png' },
    { key: 'drone_rapid_fire_chance', label: 'Drone Rapid Fire Chance', icon: 'Drone_Rapid_Fire_Chance.png' },
    { key: 'drone_suit_cap', label: 'Drone Suit Upgrade Cap', icon: 'Drone_Suit_Upgrade_Cap.png', affix: { prefix: '' } },
    { key: 'coal_generation_seconds', label: 'Coal Generation Time', icon: 'Coal_Generation_Time.png', affix: { suffix: 's' } },
    { key: 'coal_fuel_duration_multi', label: 'Drone Fuel Duration Multiplier', icon: 'Drone_Fuel_Duration_Multiplier.png' },
    { key: 'coal_capacity_multi', label: 'Coal Capacity Multiplier', icon: 'Coal_Capacity_Multiplier.png' },
    { key: 'coal_fuel_save_chance', label: 'Fuel Save Chance', icon: 'Fuel_Save_Chance.png' },
    { key: 'coal_drone_exp_multi', label: 'Drone Exp Gain Multiplier', icon: 'Drone_Exp_Gain_Multiplier.png' },
    { key: 'void_portal_chance', label: 'Void Portal Chance', icon: 'Void_Portal_Chance.png' },
    { key: 'void_portal_base_multi', label: 'Void Portal Base Multiplier', icon: 'Void_Portal_Base_Multiplier.png' },
    { key: 'golden_void_portal_chance', label: 'Golden Void Portal Chance', icon: 'Golden_Void_Portal_Chance.png' },
    { key: 'golden_void_portal_multi', label: 'Golden Void Portal Multi', icon: 'Golden_Void_Portal_Multi.png' },
    { key: 'rainbow_void_portal_chance', label: 'Rainbow Void Portal Chance', icon: 'Rainbow_Void_Portal_Chance.png' },
    { key: 'rainbow_void_portal_multi', label: 'Rainbow Void Portal Multiplier', icon: 'Rainbow_Void_Portal_Multiplier.png' },
    { key: 'elixir_crit_chance', label: 'Elixir Crit Chance', icon: 'Elixir_Crit_Chance.png' },
    { key: 'elixir_crit_multi', label: 'Elixir Crit Multi', icon: 'Elixir_Crit_Multi.png' },
  ] },

  { id: 'ores', label: 'Ores', stats: [
    { key: 'multi_rock_chance', label: 'Triple Rock Chance', icon: 'Triple_Rock_Chance.png' },
    { key: 'ore_sell_price_multi', label: 'Ore Sell Price Multiplier', icon: 'Ore_Sell_Price_Multiplier.png' },
    { key: 'ore_income_multi', label: 'Ore Income Multiplier', icon: 'Ore_Income_Multiplier.png' },
    { key: 'golden_ore_chance', label: 'Golden Ore Chance', icon: 'Golden_Ore_Chance.png' },
    { key: 'golden_ore_multi', label: 'Golden Ore Multiplier', icon: 'Golden_Ore_Multiplier.png' },
    { key: 'golden_floor_chance', label: 'Golden Floor Chance', icon: 'Golden_Floor_Chance.png' },
    { key: 'golden_floor_multi', label: 'Golden Floor Multiplier', icon: 'Golden_Floor_Multiplier.png' },
    { key: 'rainbow_floor_chance', label: 'Rainbow Floor Chance', icon: 'Rainbow_Floor_Chance.png' },
    { key: 'rainbow_floor_multi', label: 'Rainbow Floor Multiplier', icon: 'Rainbow_Floor_Multiplier.png' },
    { key: 'galactic_floor_chance', label: 'Galactic Rainbow Floor Chance', icon: 'Galactic_Rainbow_Floor_Chance.png' },
    { key: 'galactic_floor_multi', label: 'Galactic Rainbow Floor Multiplier', icon: 'Galactic_Rainbow_Floor_Multiplier.png' },
    { key: 'prismatic_floor_chance', label: 'Prismatic Galactic Floor Chance', icon: 'Prismatic_Galactic_Floor_Chance.png' },
    { key: 'prismatic_floor_multi', label: 'Prismatic Galactic Floor Multi', icon: 'Prismatic_Galactic_Floor_Multi.png' },
    { key: 'pizzas_eaten', label: 'Pizzas Eaten', icon: 'Pizzas_Eaten.png' },
    { key: 'steak_eaten', label: 'Steaks Eaten', icon: 'Steaks_Eaten.png' },
    { key: 'all_floor_multipliers', label: 'All Floor Multis (Gold, Rainbow, Galactic, Prismatic)', icon: 'All_Floor_Multis_(Gold,Rainbow,Galactic).png' },
  ] },

  { id: 'crafting', label: 'Crafting', stats: [
    { key: 'free_craft_chance', label: 'Free Craft Chance', icon: 'Free_Craft_Chance.png' },
    { key: 'double_craft_chance', label: 'Double Craft Chance', icon: 'Double_Craft_Chance.png' },
    { key: 'triple_craft_chance', label: 'Triple Craft Chance', icon: 'Triple_Craft_Chance.png' },
    { key: 'craft_5x_chance', label: '5x Craft Chance', icon: '5x_Craft_Chance.png' },
    { key: 'craft_10x_chance', label: '10x Craft Chance', icon: '10x_Craft_Chance.png' },
    { key: 'craft_20x_chance', label: '20x Craft Chance', icon: '20x_Craft_Chance.png' },
    { key: 'craft_100x_chance', label: '100x Craft Chance', icon: '100x_Craft_Chance.png' },
    { key: 'bar_output_multi', label: 'Bar Output Multiplier', icon: 'Bar_Output_Multiplier.png' },
    { key: 'bar_upgrade_cost_reduction', label: 'Bar Cost Reduction', icon: 'Bar_Cost_Reduction.png' },
    { key: 'bar_craft_cost_multi', label: 'Bar Craft Cost', icon: 'Bar_Craft_Cost.png' },
  ] },

  { id: 'obelisk', label: 'Obelisk', stats: [
    { key: 'obelisk_timer_add', label: 'Bonus Obelisk Fight Length', icon: 'Bonus_Obelisk_Fight_Length.png', affix: { suffix: '×' } },
    { key: 'obelisk_cooldown_multi', label: 'Obelisk Cooldown', icon: 'Obelisk_Cooldown.png' },
    { key: 'obelisk_armor_reduction', label: 'Obelisk Armor Reduction', icon: 'Obelisk_Armor_Reduction.png' },
  ] },

  { id: 'prestige', label: 'Prestige', stats: [
    { key: 'xp_level_cap', label: 'Xp Level Cap', icon: 'Xp_Level_Cap.png', affix: { prefix: 'Level ' } },
    { key: 'prestige_point_multi', label: 'Prestige Point Gain Multiplier', icon: 'Prestige_Point_Gain_Multiplier.png' },
    { key: 'experience_multi', label: 'Experience Gain Multiplier', icon: 'Experience_Gain_Multiplier.png' },
    { key: 'floor_clear_requirement_multi', label: 'Floor Clear Requirement', icon: 'Floor_Clear_Requirement.png' },
    { key: 'artifact_cap_increase', label: 'Artifact Upgrade Cap Increase', icon: 'Artifact_Upgrade_Cap_Increase.png' },
    { key: 'artifact_tier4_cap_increase', label: 'Artifact Tier 4 Cap Increase', icon: 'Artifact_Tier_4_Cap_Increase.png' },
  ] },

  { id: 'lootbugs', label: 'Lootbugs', stats: [
    { key: 'lootbug_spawn_rate', label: 'Lootbug Spawn Rate Multiplier', icon: 'Lootbug_Spawn_Rate_Multiplier.png' },
    { key: 'lootbug_triple_chance', label: 'Triple Lootbug Chance', icon: 'Triple_Lootbug_Chance.png' },
    { key: 'lootbug_golden_chance', label: 'Golden Lootbug Chance', icon: 'Golden_Lootbug_Chance.png' },
    { key: 'lootbug_bank_cap', label: 'Banked Lootbug Cap', icon: 'Banked_Lootbug_Cap.png', affix: { prefix: '' } },
    { key: 'lootbug_gem_cost_reduction', label: 'Lootbug Gem Cost Reduction', icon: 'Lootbug_Gem_Cost_Reduction.png', affix: { prefix: '+' } },
    { key: 'lootbug_loot_multi', label: 'Lootbug Loot Multiplier', icon: 'Lootbug_Loot_Multiplier.png' },
    { key: 'lootfrog_lanterns_used', label: 'Lanterns Used', icon: 'Lanterns_Used.png' },
  ] },

  { id: 'lootfrogs', label: 'Lootfrogs', stats: [
    { key: 'lootfrogs_caught', label: 'Lootfrogs Caught', icon: 'Lootfrogs_Caught.png' },
    { key: 'golden_lootfrogs_caught', label: 'Golden Lootfrogs Caught', icon: 'Golden_Lootfrogs_Caught.png' },
    { key: 'lootfrog_capacity', label: 'Lootfrog Capacity', icon: 'Lootfrog_Capacity.png', affix: { prefix: '' } },
    { key: 'lootfrog_loot_multi', label: 'Lootfrog Loot Multiplier', icon: 'Lootfrog_Loot_Multiplier.png' },
    { key: 'lootfrog_golden_chance', label: 'Golden Lootfrog Chance', icon: 'Golden_Lootfrog_Chance.png' },
    { key: 'lootfrog_golden_multi', label: 'Golden Lootfrog Multiplier', icon: 'Golden_Lootfrog_Multiplier.png' },
    { key: 'lootfrog_triple_spawn_chance', label: 'Lootfrog Triple Spawn Chance', icon: 'Frog_Frenzy.png' },
    { key: 'lootfrog_10x_spawn_chance', label: 'Lootfrog 10x Spawn Chance', icon: 'Lootfrog_10x_Spawn_Chance.png' },
    { key: 'lootfrog_big_chance', label: 'Big Lootfrog Chance', icon: 'Big_Lootfrog_Chance.png' },
    { key: 'lootfrog_big_multi', label: 'Big Lootfrog Multi', icon: 'Big Lootfrog Multi.png' },
  ] },

  { id: 'chests', label: 'Chests', stats: [
    { key: 'chest_double_chance', label: 'Chance For 2x Chests', icon: 'Chance_For_2x_Chests.png' },
    { key: 'chest_meter_multi', label: 'Chest Meter Gain Multiplier', icon: 'Chest_Meter_Gain_Multiplier.png' },
    { key: 'chest_items_bonus', label: 'Items Contained In Chests', icon: 'Items_Contained_In_Chests.png' },
    { key: 'freebie_gems_bonus', label: 'Bonus Gems From Freebie Pack', icon: 'Bonus_Gems_From_Freebie_Pack.png', affix: { prefix: '' } },
    { key: 'freebie_5x_chance', label: 'Chance For Freebie Jackpot', icon: 'Chance_For_Freebie_Jackpot.png' },
    { key: 'freebie_refresh_chance', label: 'Instant Refresh Chance', icon: 'Instant_Refresh_Chance.png' },
    { key: 'freebie_bank_cap', label: 'Banked Freebie Cap', icon: 'Banked_Freebie_Cap.png', affix: { prefix: '' } },
    { key: 'freebie_cooldown_seconds', label: 'Freebie Cooldown', icon: 'Freebie_Cooldown.png', affix: { suffix: 's' } },
    { key: 'stonks_chance', label: 'Stonks Chance', icon: 'Stonks_Chance.png' },
    { key: 'stonks_multi', label: 'Stonks Freebie Multiplier', icon: 'Stonks_Freebie_Multiplier.png' },
    { key: 'super_stonks_chance', label: 'Super Stonks Chance', icon: 'Super_Stonks_Chance.png' },
    { key: 'super_stonks_multi', label: 'Super Stonks Multiplier', icon: 'Super_Stonks_Multiplier.png' },
    { key: 'ultra_stonks_chance', label: 'Ultra Stonks Chance', icon: 'Ultra_Stonks_Chance.png' },
    { key: 'ultra_stonks_multi', label: 'Ultra Stonks Multiplier', icon: 'Ultra_Stonks_Multiplier.png' },
  ] },

  { id: 'contracts', label: 'Contracts', stats: [
    { key: 'contract_cost_reduction', label: 'Contract Cost Reduction', icon: 'Contract_Cost_Reduction.png', affix: { suffix: '%' } },
    { key: 'contract_double_points_chance', label: 'Double Contract Point Chance', icon: 'Double_Contract_Point_Chance.png' },
    { key: 'contract_triple_points_chance', label: 'Triple Contract Point Chance', icon: 'Triple_Contract_Point_Chance.png' },
    { key: 'contract_5x_points_chance', label: '5x Contract Point Chance', icon: '5x_Contract_Point_Chance.png' },
    { key: 'contract_10x_points_chance', label: '10x Contract Point Chance', icon: '10x_Contract_Point_Chance.png' },
    { key: 'contract_points_rewarded', label: 'Contract Points Rewarded', icon: 'Contract_Points_Rewarded.png', affix: { prefix: '+' } },
    { key: 'contract_cap_increase', label: 'Contract Upgrade Cap Increase', icon: 'Contract_Upgrade_Cap_Increase.png' },
    { key: 'contract_upgrade_cost_reduction', label: 'Contract Upgrade Cost Reduction', icon: 'Contract_Upgrade_Cost_Reduction.png' },
  ] },

  { id: 'veins', label: 'Veins', stats: [
    { key: 'vein_spawn_rate_multi', label: 'Vein Spawn Rate Multiplier', icon: 'Vein_Spawn_Rate_Multiplier.png' },
    { key: 'vein_income_multi', label: 'Vein Income Multiplier', icon: 'Vein_Income_Multiplier.png' },
    { key: 'golden_vein_chance', label: 'Golden Vein Chance', icon: 'Golden_Vein_Chance.png' },
    { key: 'golden_vein_multi', label: 'Golden Vein Multiplier', icon: 'Golden_Vein_Multiplier.png' },
    { key: 'rainbow_vein_chance', label: 'Rainbow Vein Chance', icon: 'Rainbow_Vein_Chance.png' },
    { key: 'rainbow_vein_multi', label: 'Rainbow Vein Multiplier', icon: 'Rainbow_Vein_Multiplier.png' },
    { key: 'gleaming_vein_chance', label: 'Gleaming Vein Chance', icon: 'Gleaming_Vein_Chance.png' },
    { key: 'gleaming_vein_multi', label: 'Gleaming Vein Multiplier', icon: 'Gleaming_Vein_Multiplier.png' },
  ] },

  { id: 'stars', label: 'Stars', stats: [
    { key: 'star_spawn_rate', label: 'Star Spawn Rate Multiplier', icon: 'Star_Spawn_Rate_Multiplier.png' },
    { key: 'star_auto_catch_chance', label: 'Auto-Catch Chance', icon: 'Auto-Catch_Chance.png' },
    { key: 'star_double_spawn_chance', label: 'Star Double Spawn Chance', icon: 'Star_Double_Spawn_Chance.png' },
    { key: 'star_triple_spawn_chance', label: 'Star Triple Spawn Chance', icon: 'Star_Triple_Spawn_Chance.png' },
    { key: 'super_star_spawn_multi', label: 'Super Star Spawn Rate Multiplier', icon: 'Super_Star_Spawn_Rate_Multiplier.png' },
    { key: 'super_star_triple_chance', label: 'Super Star Triple Chance', icon: 'Super_Star_Triple_Chance.png' },
    { key: 'super_star_10x_chance', label: 'Super Star 10x Spawn Chance', icon: 'Super_Star_10x_Spawn_Chance.png' },
    { key: 'star_supernova_chance', label: 'Star Supernova Chance', icon: 'Star_Supernova_Chance.png' },
    { key: 'star_supernova_multi', label: 'Star Supernova Multiplier', icon: 'Star_Supernova_Multiplier.png' },
    { key: 'super_star_supernova_chance', label: 'Super Star Supernova Chance', icon: 'Super_Star_Supernova_Chance.png' },
    { key: 'super_star_supernova_multi', label: 'Super Star Supernova Multiplier', icon: 'Super_Star_Supernova_Multiplier.png' },
    { key: 'star_supergiant_chance', label: 'Star Supergiant Chance', icon: 'Star_Supergiant_Chance.png' },
    { key: 'star_supergiant_multi', label: 'Star Supergiant Multiplier', icon: 'Star_Supergiant_Multiplier.png' },
    { key: 'super_star_supergiant_chance', label: 'Super Star Supergiant Chance', icon: 'Super_Star_Supergiant_Chance.png' },
    { key: 'super_star_supergiant_multi', label: 'Super Star Supergiant Multiplier', icon: 'Super_Star_Supergiant_Multiplier.png' },
    { key: 'star_radiant_chance', label: 'Star Radiant Chance', icon: 'Star_Radiant_Chance.png' },
    { key: 'star_radiant_multi', label: 'Star Radiant Multi', icon: 'Star_Radiant_Multi.png' },
    { key: 'super_star_radiant_chance', label: 'Super Star Radiant Chance', icon: 'Super_Star_Radiant_Chance.png' },
    { key: 'super_star_radiant_multi', label: 'Super Star Radiant Multi', icon: 'Super_Star_Radiant_Multi.png' },
    { key: 'all_star_multi', label: 'All Star Multiplier', icon: 'All_Star_Multiplier.png' },
    { key: 'novagiant_combo_multi', label: 'Novagiant Combo Multiplier', icon: 'Novagiant_Combo_Multiplier.png' },
    { key: 'candy_eaten', label: 'Candy Eaten', icon: 'Candy_Eaten.png' },
  ] },

  { id: 'fishing', label: 'Fishing', stats: [
    { key: 'fishing_rod_power', label: 'Fishing Rod Power', icon: 'Fishing_Rod_Power.png' },
    { key: 'fishing_drone_capacity', label: 'Fishing Drone Capacity', icon: 'Fishing_Drone_Capacity.png', affix: { prefix: '' } },
    { key: 'fishing_drone_power', label: 'Fishing Drone Base Power', icon: 'Fishing_Drone_Base_Power.png' },
    { key: 'fishing_drone_multiplier', label: 'Drone Power Multiplier', icon: 'Drone_Power_Multiplier.png' },
    { key: 'fishing_tier2_dock_multi', label: 'Tier 2 Dock Power', icon: 'Tier_2_Dock_Power.png' },
    { key: 'fishing_income_multi', label: 'Fish Income Multiplier', icon: 'Fish_Income_Multiplier.png' },
    { key: 'fishing_tick_reduction_seconds', label: 'Fishing Tick Reduction', icon: 'Fishing_Tick_Reduction.png', affix: { prefix: '-', suffix: 's' } },
    { key: 'fishing_double_tick_chance', label: 'Double Fish Tick Chance', icon: 'Double_Fish_Tick_Chance.png' },
    { key: 'fishing_triple_tick_chance', label: 'Triple Fish Tick Chance', icon: 'Triple_Fish_Tick_Chance.png' },
    { key: 'fishing_5x_tick_chance', label: '5x Fish Tick Chance', icon: '5x_Fish_Tick_Chance.png' },
    { key: 'fishing_token_multi', label: 'Fish Token Gain Multiplier', icon: 'Fish_Token_Gain_Multiplier.png' },
    { key: 'fishing_notice_requirement', label: 'Notice Fish Requirement', icon: 'Notice_Fish_Requirement.png', affix: { suffix: 'x' } },
    { key: 'fishing_tiny_notice_chance', label: 'Tiny Notice Chance', icon: 'Tiny_Notice_Chance.png' },
    { key: 'fishing_shiny_chance', label: 'Shiny Fish Chance', icon: 'Shiny_Fish_Chance.png' },
    { key: 'fishing_shiny_multi', label: 'Shiny Multiplier', icon: 'Shiny_Multiplier.png' },
    { key: 'fishing_super_shiny_chance', label: 'Super Shiny Fish Chance', icon: 'Super_Shiny_Fish_Chance.png' },
    { key: 'fishing_super_shiny_multi', label: 'Super Shiny Multiplier', icon: 'Super_Shiny_Multiplier.png' },
    { key: 'fishing_tick_speed', label: 'Frames Per Fish Tick', icon: 'Obelisk_Fight_Duration_Icon.png' },
  ] },

  { id: 'misc', label: 'Misc', stats: [
    { key: 'game_speed_multi', label: 'Game Speed Multiplier', icon: 'Game_Speed_Multiplier.png' },
    { key: 'item_duration_multi', label: 'Item Duration Multiplier', icon: 'Item_Duration_Multiplier.png' },
    { key: 'gem_upgrade_cap_increase', label: 'Gem Upgrade Cap Increase', icon: 'Gem_Upgrade_Cap_Increase.png' },
    { key: 'pet_levelup_chance_multi', label: 'Pet Level Up Chance', icon: 'Pet_Level_Up_Chance.png' },
  ] },

  { id: 'world1statues', label: 'World 1 Statues', stats: [
    { 
      key: 'statue_0_set1', 
      label: 'Statue of Rhythm (Xanz)', 
      icon: '1_Statue_Rhythm_Normal.png' 
    }, 
    { 
      key: 'statue_1_set1', 
      label: 'Statue of Awareness (Tor)', 
      icon: '2_Statue_Awareness_Normal.png' 
    }, 
    { 
      key: 'statue_2_set1', 
      label: 'Statue of Slaying (Dark)', 
      icon: '3_Statue_Slaying_Normal.png' },
    { 
      key: 'statue_3_set1', 
      label: 'Statue of Appetite (Frozen)', 
      icon: '4_Statue_Appetite_Normal.png' 
    }, 
    { 
      key: 'statue_4_set1', 
      label: 'Statue of Friendship (Caulwik)ndship', 
      icon: '5_Statue_Friendship_Normal.png' 
    }, 
    { 
      key: 'statue_5_set1', 
      label: 'Statue of Hygiene (Totefm)', 
      icon: '6_Statue_Hygiene_Normal.png' 
    },
    { 
      key: 'statue_6_set1', 
      label: 'Statue of Artistry (Celio)', 
      icon: '7_Statue_Artistry_Normal.png' 
    }, 
    { 
      key: 'statue_7_set1', 
      label: 'Statue of Randomness (Jolly)', 
      icon: '8_Statue_Randomness_Normal.png' 
    }, 
    { 
      key: 'statue_8_set1', 
      label: 'Statue of Childhood (Salutem)', 
      icon: '9_Statue_Childhood_Normal.png' 
    },
  ] },

  { id: 'world3statues', label: 'World 3 Statues', stats: [
    { 
      key: 'statue_0_set2', 
      label: 'Statue of Craftmanship (Vydn)', 
      icon: '10_Statue_Craftmanship_Normal.png' 
    }, 
    { 
      key: 'statue_1_set2', 
      label: 'Statue of Propulsion (Guard)', 
      icon: '11_Statue_Propulsion_Normal.png' 
    }, 
    { 
      key: 'statue_2_set2', 
      label: 'Statue of Safety (Zuiqiang)', 
      icon: '12_Statue_Safety_Normal.png' 
    },
    { 
      key: 'statue_3_set2', 
      label: 'Statue of Ignition (Julk)', 
      icon: '13_Statue_Ignition_Normal.png' 
    }, 
    { 
      key: 'statue_4_set2', 
      label: 'Statue of Warmth (Satio)', 
      icon: '14_Statue_Warmth_Normal.png' 
    }, 
    { 
      key: 'statue_5_set2', 
      label: 'Statue of Feline (Iseburge)', 
      icon: '15_Statue_Feline_Normal.png' 
    },
    { 
      key: 'statue_6_set2', 
      label: 'Statue of Affluence (Kohanu)', 
      icon: '16_Statue_Affluence_Normal.png' 
    }, 
    { 
      key: 'statue_7_set2', 
      label: 'Statue of Eastwood (MLNW)', 
      icon: '17_Statue_Eastwood_Normal.png' 
    }, 
    { 
      key: 'statue_8_set2', 
      label: 'Statue of Soprano (Praed)', 
      icon: '18_Statue_Soprano_Normal.png' 
    },
  ] },

  { id: 'world4statues', label: 'World 4 Statues', stats: [
    { 
      key: 'statue_0_set3', 
      label: 'Statue of Comfort (Lute)', 
      icon: '19_Statue_Comfort_Normal.png' 
    }, 
    { 
      key: 'statue_1_set3', 
      label: 'Statue of Timekeeping (Karma)', 
      icon: '20_Statue_Timekeeping_Normal.png' 
    }, 
    { 
      key: 'statue_2_set3', 
      label: 'Statue of Combat (Sans)', 
      icon: '21_Statue_Combat_Normal.png' 
    },
    { 
      key: 'statue_3_set3', 
      label: 'Statue of Nature (Fanq)', 
      icon: '22_Statue_Nature_Normal.png' 
    }, 
    { 
      key: 'statue_4_set3', 
      label: 'Statue of Semblance (Vak)', 
      icon: '23_Statue_Semblance_Normal.png' 
    }, 
    { 
      key: 'statue_5_set3', 
      label: 'Statue of Crochet (Kripp)', 
      icon: '24_Statue_Crochet_Normal.png' 
    },
    { 
      key: 'statue_6_set3', 
      label: 'Statue of Antagonism (Loop)', 
      icon: '25_Statue_Antagonism_Normal.png' 
    }, 
    { 
      key: 'statue_7_set3', 
      label: 'Statue of Fallacy (Berty)', 
      icon: '26_Statue_Fallacy_Normal.png' 
    }, 
    { 
      key: 'statue_8_set3', 
      label: 'Statue of Rodentia (Kromak)', 
      icon: '27_Statue_Rodentia_Normal.png' 
    },
  ] },
]

// State labels driven by the raw integer value 0/1/2/3.
// Source: in-game build state for each statue tier.
export const STATUE_STATE_LABELS = ['Unbuilt', 'Normal', 'Gilded', 'Platinized'] as const

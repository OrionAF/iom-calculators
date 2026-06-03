export interface StatEntry {
  key: string
  icon?: string  // wiki filename, e.g. "Fishing_Rod_Power.png"
}

export interface StatCategory {
  id: string
  label: string
  stats: StatEntry[]
}

export const STAT_CATALOG: readonly StatCategory[] = [

  { id: 'pickaxe', label: 'Pickaxe', stats: [
    { key: 'pickaxe_damage', icon: 'Pickaxe_Damage.png' },
    { key: 'pickaxe_attack_speed_per_second' },
    { key: 'pickaxe_radius_percent' },
    { key: 'pickaxe_crit_chance', icon: 'Pickaxe_Crit_Chance.png' },
    { key: 'pickaxe_crit_damage', icon: 'Pickaxe_Crit_Damage.png' },
    { key: 'pickaxe_super_crit_chance' },
    { key: 'pickaxe_super_crit_damage' },
    { key: 'pickaxe_ultra_crit_chance' },
    { key: 'pickaxe_ultra_crit_damage' },
    { key: 'pickaxe_omega_crit_chance' },
    { key: 'pickaxe_omega_crit_damage' },
  ] },

  { id: 'bombs', label: 'Bombs', stats: [
    { key: 'bomb_damage', icon: 'Bomb_Damage.png' },
    { key: 'bomb_crit_chance', icon: 'Bomb_Crit_Chance.png' },
    { key: 'bomb_crit_damage' },
    { key: 'bomb_recharge_speed' },
    { key: 'bomb_free_chance' },
    { key: 'bomb_capacity', icon: 'Bomb_Capacity.png' },
    { key: 'bomb_additional_multiplier' },
    { key: 'bomb_super_crit_chance' },
    { key: 'bomb_super_crit_damage' },
    { key: 'bomb_ultra_crit_chance' },
    { key: 'bomb_ultra_crit_damage' },
    { key: 'bomb_omega_crit_chance' },
    { key: 'bomb_omega_crit_damage' },
    { key: 'bomb_cherry3x_chance' },
    { key: 'bomb_battery_cap_increases' },
    { key: 'bomb_cap_multiplier' },
    { key: 'bomb_workshop_cap_increase' },
    { key: 'bomb_of_plenty_make_gold_chance' },
    { key: 'bomb_of_plenty_multi' },
    { key: 'bomb_trans_apply_bop_chance' },
    { key: 'bomb_transmuter_multi' },
  ] },

  { id: 'drones', label: 'Drones', stats: [
    { key: 'drone_count', icon: 'Drone_Count.png' },
    { key: 'drone_damage_percent', icon: 'Drone_Damage.png' },
    { key: 'drone_radius_percent' },
    { key: 'drone_movespeed_percent' },
    { key: 'drone_attack_speed_percent' },
    { key: 'drone_triple_damage_chance' },
    { key: 'drone_rapid_fire_chance' },
    { key: 'drone_suit_cap' },
    { key: 'coal_generation_seconds' },
    { key: 'coal_fuel_duration_multi' },
    { key: 'coal_capacity_multi' },
    { key: 'coal_fuel_save_chance' },
    { key: 'coal_drone_exp_multi' },
    { key: 'void_portal_chance' },
    { key: 'void_portal_base_multi' },
    { key: 'golden_void_portal_chance' },
    { key: 'golden_void_portal_multi' },
    { key: 'rainbow_void_portal_chance' },
    { key: 'rainbow_void_portal_multi' },
    { key: 'elixir_crit_chance' },
    { key: 'elixir_crit_multi' },
  ] },

  { id: 'ores', label: 'Ores', stats: [
    { key: 'multi_rock_chance' },
    { key: 'ore_sell_price_multi' },
    { key: 'ore_income_multi', icon: 'Ore_Income_Multiplier.png' },
    { key: 'golden_ore_chance', icon: 'Golden_Ore_Chance.png' },
    { key: 'golden_ore_multi' },
    { key: 'golden_floor_chance' },
    { key: 'golden_floor_multi' },
    { key: 'rainbow_floor_chance' },
    { key: 'rainbow_floor_multi' },
    { key: 'galactic_floor_chance' },
    { key: 'galactic_floor_multi' },
    { key: 'prismatic_floor_chance' },
    { key: 'prismatic_floor_multi' },
    { key: 'pizzas_eaten' },
    { key: 'steak_eaten' },
    { key: 'all_floor_multipliers', icon: 'All_Floor_Multipliers.png' },
  ] },

  { id: 'crafting', label: 'Crafting', stats: [
    { key: 'free_craft_chance' },
    { key: 'double_craft_chance' },
    { key: 'triple_craft_chance' },
    { key: 'craft_5x_chance' },
    { key: 'craft_10x_chance' },
    { key: 'craft_20x_chance' },
    { key: 'craft_100x_chance' },
    { key: 'bar_output_multi' },
    { key: 'bar_upgrade_cost_reduction' },
    { key: 'bar_craft_cost_multi' },
  ] },

  { id: 'obelisk', label: 'Obelisk', stats: [
    { key: 'obelisk_timer_add' },
    { key: 'obelisk_cooldown_multi' },
    { key: 'obelisk_armor_reduction' },
  ] },

  { id: 'prestige', label: 'Prestige', stats: [
    { key: 'xp_level_cap' },
    { key: 'prestige_point_multi', icon: 'Prestige_Point_Multiplier.png' },
    { key: 'experience_multi', icon: 'Experience_Multiplier.png' },
    { key: 'floor_clear_requirement_multi' },
    { key: 'artifact_cap_increase' },
    { key: 'artifact_tier4_cap_increase' },
  ] },

  { id: 'lootbugs', label: 'Lootbugs', stats: [
    { key: 'lootbug_spawn_rate' },
    { key: 'lootbug_triple_chance' },
    { key: 'lootbug_golden_chance' },
    { key: 'lootbug_bank_cap' },
    { key: 'lootbug_gem_cost_reduction' },
    { key: 'lootbug_loot_multi' },
    { key: 'lootfrog_lanterns_used' },
  ] },

  { id: 'lootfrogs', label: 'Lootfrogs', stats: [
    { key: 'lootfrogs_caught' },
    { key: 'golden_lootfrogs_caught' },
    { key: 'lootfrog_capacity' },
    { key: 'lootfrog_loot_multi' },
    { key: 'lootfrog_golden_chance' },
    { key: 'lootfrog_golden_multi' },
    { key: 'lootfrog_triple_spawn_chance' },
    { key: 'lootfrog_10x_spawn_chance' },
    { key: 'lootfrog_big_chance' },
    { key: 'lootfrog_big_multi' },
  ] },

  { id: 'chests', label: 'Chests', stats: [
    { key: 'chest_double_chance' },
    { key: 'chest_meter_multi' },
    { key: 'chest_items_bonus' },
    { key: 'freebie_gems_bonus' },
    { key: 'freebie_5x_chance' },
    { key: 'freebie_refresh_chance' },
    { key: 'freebie_bank_cap' },
    { key: 'freebie_cooldown_seconds' },
    { key: 'stonks_chance' },
    { key: 'stonks_multi' },
    { key: 'super_stonks_chance' },
    { key: 'super_stonks_multi' },
    { key: 'ultra_stonks_chance' },
    { key: 'ultra_stonks_multi' },
  ] },

  { id: 'contracts', label: 'Contracts', stats: [
    { key: 'contract_cost_reduction' },
    { key: 'contract_double_points_chance' },
    { key: 'contract_triple_points_chance' },
    { key: 'contract_5x_points_chance' },
    { key: 'contract_10x_points_chance' },
    { key: 'contract_points_rewarded' },
    { key: 'contract_cap_increase' },
    { key: 'contract_upgrade_cost_reduction' },
  ] },

  { id: 'veins', label: 'Veins', stats: [
    { key: 'vein_spawn_rate_multi' },
    { key: 'vein_income_multi', icon: 'Vein_Income_Multiplier.png' },
    { key: 'golden_vein_chance' },
    { key: 'golden_vein_multi' },
    { key: 'rainbow_vein_chance' },
    { key: 'rainbow_vein_multi' },
    { key: 'gleaming_vein_chance' },
    { key: 'gleaming_vein_multi' },
  ] },

  { id: 'stars', label: 'Stars', stats: [
    { key: 'star_spawn_rate' },
    { key: 'star_auto_catch_chance' },
    { key: 'star_double_spawn_chance' },
    { key: 'star_triple_spawn_chance' },
    { key: 'super_star_spawn_multi' },
    { key: 'super_star_triple_chance' },
    { key: 'super_star_10x_chance' },
    { key: 'star_supernova_chance' },
    { key: 'star_supernova_multi' },
    { key: 'super_star_supernova_chance' },
    { key: 'super_star_supernova_multi' },
    { key: 'star_supergiant_chance' },
    { key: 'star_supergiant_multi' },
    { key: 'super_star_supergiant_chance' },
    { key: 'super_star_supergiant_multi' },
    { key: 'star_radiant_chance' },
    { key: 'star_radiant_multi' },
    { key: 'super_star_radiant_chance' },
    { key: 'super_star_radiant_multi' },
    { key: 'all_star_multi', icon: 'All_Star_Multi.png' },
    { key: 'novagiant_combo_multi' },
    { key: 'candy_eaten' },
  ] },

  { id: 'fishing', label: 'Fishing', stats: [
    { key: 'fishing_rod_power', icon: 'Fishing_Rod_Power.png' },
    { key: 'fishing_drone_capacity', icon: 'Fishing_Drone_Capacity.png' },
    { key: 'fishing_drone_power', icon: 'Fishing_Drone_Power.png' },
    { key: 'fishing_drone_multiplier' },
    { key: 'fishing_tier2_dock_multi' },
    { key: 'fishing_income_multi', icon: 'Fishing_Income_Multiplier.png' },
    { key: 'fishing_tick_reduction_seconds' },
    { key: 'fishing_double_tick_chance' },
    { key: 'fishing_triple_tick_chance' },
    { key: 'fishing_5x_tick_chance' },
    { key: 'fishing_token_multi' },
    { key: 'fishing_notice_requirement' },
    { key: 'fishing_tiny_notice_chance' },
    { key: 'fishing_shiny_chance' },
    { key: 'fishing_shiny_multi' },
    { key: 'fishing_super_shiny_chance' },
    { key: 'fishing_super_shiny_multi' },
    { key: 'fishing_tick_speed' },
  ] },

  { id: 'misc', label: 'Misc', stats: [
    { key: 'game_speed_multi', icon: 'Game_Speed_Multiplier.png' },
    { key: 'item_duration_multi' },
    { key: 'gem_upgrade_cap_increase' },
    { key: 'pet_levelup_chance_multi' },
  ] },

  { id: 'statues', label: 'Statues', stats: [
    { key: 'statue_0_set1' }, { key: 'statue_1_set1' }, { key: 'statue_2_set1' },
    { key: 'statue_3_set1' }, { key: 'statue_4_set1' }, { key: 'statue_5_set1' },
    { key: 'statue_6_set1' }, { key: 'statue_7_set1' }, { key: 'statue_8_set1' },
    { key: 'statue_0_set2' }, { key: 'statue_1_set2' }, { key: 'statue_2_set2' },
    { key: 'statue_3_set2' }, { key: 'statue_4_set2' }, { key: 'statue_5_set2' },
    { key: 'statue_6_set2' }, { key: 'statue_7_set2' }, { key: 'statue_8_set2' },
    { key: 'statue_0_set3' }, { key: 'statue_1_set3' }, { key: 'statue_2_set3' },
    { key: 'statue_3_set3' }, { key: 'statue_4_set3' }, { key: 'statue_5_set3' },
    { key: 'statue_6_set3' }, { key: 'statue_7_set3' }, { key: 'statue_8_set3' },
  ] },
]

// Statue-specific enrichment table: name + world per statKey.
// Source: `Copy of JSON Tablifier.xlsx` columns P/Q rows 4–30.
export interface StatueEnrichment {
  name: string
  world: 1 | 3 | 4
}

export const STATUE_ENRICHMENT: Readonly<Record<string, StatueEnrichment>> = {
  statue_0_set1: { name: 'Rhythm',        world: 1 },
  statue_1_set1: { name: 'Awareness',    world: 1 },
  statue_2_set1: { name: 'Slaying',      world: 1 },
  statue_3_set1: { name: 'Appetite',     world: 1 },
  statue_4_set1: { name: 'Friendship',   world: 1 },
  statue_5_set1: { name: 'Hygiene',      world: 1 },
  statue_6_set1: { name: 'Artistry',     world: 1 },
  statue_7_set1: { name: 'Randomness',   world: 1 },
  statue_8_set1: { name: 'Childhood',    world: 1 },
  statue_0_set2: { name: 'Craftsmanship', world: 3 },
  statue_1_set2: { name: 'Propulsion',   world: 3 },
  statue_2_set2: { name: 'Safety',       world: 3 },
  statue_3_set2: { name: 'Ignition',     world: 3 },
  statue_4_set2: { name: 'Warmth',       world: 3 },
  statue_5_set2: { name: 'Feline',       world: 3 },
  statue_6_set2: { name: 'Affluence',    world: 3 },
  statue_7_set2: { name: 'Eastwood',     world: 3 },
  statue_8_set2: { name: 'Soprano',      world: 3 },
  statue_0_set3: { name: 'Comfort',      world: 4 },
  statue_1_set3: { name: 'Timekeeping',  world: 4 },
  statue_2_set3: { name: 'Combat',       world: 4 },
  statue_3_set3: { name: 'Nature',       world: 4 },
  statue_4_set3: { name: 'Semblance',    world: 4 },
  statue_5_set3: { name: 'Crochet',      world: 4 },
  statue_6_set3: { name: 'Antagonism',   world: 4 },
  statue_7_set3: { name: 'Fallacy',      world: 4 },
  statue_8_set3: { name: 'Rodentia',     world: 4 },
}

// State labels driven by the raw integer value 0/1/2/3.
// Source: in-game build state for each statue tier.
export const STATUE_STATE_LABELS = ['Unbuilt', 'Normal', 'Gilded', 'Platinized'] as const

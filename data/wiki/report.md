# Wiki ↔ formula cross-check

Generated from data/wiki/*.json. Stats checked: 175; with findings: 53; unmatched: 0; annotated-source gaps: 12.

## Wiki stats with no matching registry name / formula

## Annotated sources missing from their stat's formula
- storeFounderSupplyDropCd (store.founder) → statKey 'founder_supply_drop_cd' has no formula
- storeFounderDoubleSupplyDrop (store.founder) → statKey 'founder_double_supply_drop_chance' has no formula
- storeFounderTripleSupplyDrop (store.founder) → statKey 'founder_triple_supply_drop_chance' has no formula
- storeFounderGoldenSupplyDrop (store.founder) → statKey 'founder_golden_supply_drop_chance' has no formula
- storeFounderGemBombGemChance (store.founder) → statKey 'gem_bomb_gem_chance' has no formula
- storeVpArchFragmentGain (store.vp.archaeologyBundle) → statKey 'archaeology_fragment_gain_multi' has no formula
- storeVpAscensionArchExp (store.vp.ascensionBundle) → statKey 'archaeology_exp_gain_multi' has no formula
- storeVpAscensionAutoTap (store.vp.ascensionBundle) → statKey 'archaeology_crosshair_auto_tap' has no formula
- storeVpAscensionLootMod (store.vp.ascensionBundle) → statKey 'archaeology_lood_mod_chance' has no formula
- storeVpAscensionGoldenCrosshair (store.vp.ascensionBundle) → statKey 'archaeology_golden_crosshair_chance' has no formula
- storeVpCapitalistRelicChance (store.vp.capitalistBundle) → statKey 'freebie_chance_for_bonus_relic' has no formula
- storeVpSkillSurgeSkillShard (store.vp.skillSurgeBundle) → statKey 'freebie_chance_for_skill_shard' has no formula

## Per-stat findings

### Bomb Crit Damage (`bomb_crit_damage`)
- missing system Skill-Tree: The "Demolition Expert" Skill

### Bomb Recharge Speed (`bomb_recharge_speed`)
- missing system Drones: An Elixir Drone Buff (Also from Lootbugs (formula has 1 unknown placeholder(s))

### Additional Bomb Multiplier (`bomb_additional_multiplier`)
- missing system Workshop: The Basic & Chain Damage Upgrade (Only for Basic and Chain Bombs; The Infinity Bomb Scaling Upgrade (Only for Infinity Bomb (formula has 1 unknown placeholder(s))

### Bomb Super Crit Chance (`bomb_super_crit_chance`)
- missing system Items: Rock Cake (Requires the Cassandra Idol (formula has 1 unknown placeholder(s))

### Bomb Ultra Crit Chance (`bomb_ultra_crit_chance`)
- missing system Items: Rock Cake (Requires the Cassandra Idol

### Cherry Charge 3x Chance (`bomb_cherry3x_chance`)
- missing system Workshop: The Cherry 3x Charge Chance Upgrade (formula has 1 unknown placeholder(s))

### Bomb Cap Multiplier (`bomb_cap_multiplier`)
- missing system Store: The Bomber Extraordinaire Bundle (formula has 1 unknown placeholder(s))
- missing system Pets: The Crab Pet (formula has 1 unknown placeholder(s))

### Workshop Upgrade Cap Increase (`bomb_workshop_cap_increase`)
- missing system Construct: The Statue of Hygiene; The Statue of Propulsion; The Statue of Nature (formula has 1 unknown placeholder(s))
- missing system Fishing: The Radioactive Slug Tier 1 Tribute (formula has 1 unknown placeholder(s))

### Drone Exp Gain Multiplier (`coal_drone_exp_multi`)
- missing system Skins: A Skin Reward (formula has 1 unknown placeholder(s))

### Golden Void Portal Chance (`golden_void_portal_chance`)
- missing system Upgrades: The Djinnium Bar (formula has 1 unknown placeholder(s))

### Rainbow Void Portal Chance (`rainbow_void_portal_chance`)
- missing system Stargazing: The Eleventh Black Hole boost (formula has 1 unknown placeholder(s))

### Elixir Crit Chance (`elixir_crit_chance`)
- missing system Fishing: The Dune's Eelworm Tier 2 Tribute (formula has 1 unknown placeholder(s))

### Ore Income Multiplier (`ore_income_multi`)
- missing system Drones: An Elixir Drone Buff (Also from Gifts, Lootbugs, and the Founder Supply Drop (formula has 1 unknown placeholder(s))

### Golden Floor Multiplier (`golden_floor_multi`)
- missing system Drones: The Fueled Chain Bomber Drone (formula has 1 unknown placeholder(s))
- wiki has (sub-formula) in Items but our formula is flat: Eye of Newt (requires the Iris Idol + Yummy Pizza
- wiki has (sub-formula) in Pets but our formula is flat: The Penguin Pet(The Leprechaun Pet + The Penguin Pet Quest

### Rainbow Floor Chance (`rainbow_floor_chance`)
- missing system Contracts: A World 3 Contract Upgrade (formula has 1 unknown placeholder(s))

### Galactic Rainbow Floor Chance (`galactic_floor_chance`)
- missing system Drones: The Prism Drone (formula has 1 unknown placeholder(s))
- missing system Upgrades: The Guardium Bar; The Pishalvite Bar (formula has 1 unknown placeholder(s))

### Prismatic Galactic Floor Chance (`prismatic_floor_chance`)
- missing system Drones: The Fueled Prism Drone (formula has 1 unknown placeholder(s))

### Prismatic Galactic Floor Multi (`prismatic_floor_multi`)
- missing system Drones: The Fueled Prism Drone (formula has 1 unknown placeholder(s))

### Pizzas Eaten (`pizzas_eaten`)
- missing system Items: Yummy Pizza

### Steaks Eaten (`steak_eaten`)
- missing system Items: Gold Flake Steak

### All Floor Multis (Gold, Rainbow, Galactic, Prismatic) (`all_floor_multipliers`)
- missing system Items: Yummy Pizza (formula has 1 unknown placeholder(s))
- missing system Pets: The Nagini Pet (formula has 1 unknown placeholder(s))
- missing system Stargazing: Eridanus (formula has 1 unknown placeholder(s))

### 20x Craft Chance (`craft_20x_chance`)
- missing system Skill-Tree: The "Super Smither" Skill (formula has 1 unknown placeholder(s))

### Bonus Obelisk Fight Length (`obelisk_timer_add`)
- missing system Relics: A Legendary Relic (formula has 1 unknown placeholder(s))

### Obelisk Cooldown (`obelisk_cooldown_multi`)
- missing system Prestige: A Tier 1 Artifact

### Prestige Point Gain Multiplier (`prestige_point_multi`)
- missing system Contracts: A World 1 Contract Upgrade (formula has 1 unknown placeholder(s))

### Experience Gain Multiplier (`experience_multi`)
- missing system Drones: An Elixir Drone Buff (Also from the Founder Supply Drop (formula has 1 unknown placeholder(s))

### Lootbug Spawn Rate Multiplier (`lootbug_spawn_rate`)
- missing system Drones: Fueled Bomb Bear Drone (formula has 1 unknown placeholder(s))

### Golden Lootbug Chance (`lootbug_golden_chance`)
- missing system Stargazing: Aquarius (formula has 1 unknown placeholder(s))

### Banked Lootbug Cap (`lootbug_bank_cap`)
- wiki has (sub-formula) in Stargazing but our formula is flat: Ophiuchus + Super Star Upgrades

### Lootbug Gem Cost Reduction (`lootbug_gem_cost_reduction`)
- missing system Pets: The Whale Pet Skin (formula has 1 unknown placeholder(s))

### Lanterns Used (`lootfrog_lanterns_used`)
- missing system Items: Lootbug Lantern

### Golden Lootfrog Chance (`lootfrog_golden_chance`)
- missing system Stargazing: The Sixth Black Hole boost (formula has 1 unknown placeholder(s))

### Chance For 2x Chests (`chest_double_chance`)
- missing system Relics: An Epic Relic (formula has 1 unknown placeholder(s))

### Banked Freebie Cap (`freebie_bank_cap`)
- op mismatch in Cards: wiki group joins '+', ours: ×1+

### Freebie Cooldown (`freebie_cooldown_seconds`)
- missing system Store: The Founders Bundle (formula has 1 unknown placeholder(s))

### Super Stonks Chance (`super_stonks_chance`)
- missing system Stargazing: Eridanus; The Third Black Hole Bonus

### Ultra Stonks Chance (`ultra_stonks_chance`)
- missing system Stargazing: The 17th Black Hole Boost (formula has 1 unknown placeholder(s))

### All Stonks Multi (`all_stonks_multi`)
- missing system Challenges: A Divine Challenge Upgrade (formula has 2 unknown placeholder(s))
- missing system Construct: The Statue of Combat (formula has 2 unknown placeholder(s))

### Contract Cost Reduction (`contract_cost_reduction`)
- missing system Relics: A Rare Relic (formula has 1 unknown placeholder(s))

### Golden Vein Chance (`golden_vein_chance`)
- missing system Stargazing: Aries (formula has 1 unknown placeholder(s))

### Golden Vein Multiplier (`golden_vein_multi`)
- missing system Drones: The Fueled Veinseeker Suit (formula has 1 unknown placeholder(s))

### Gleaming Vein Chance (`gleaming_vein_chance`)
- missing system Stargazing: The Fourteenth Black Hole boost (formula has 1 unknown placeholder(s))

### Star Spawn Rate Multiplier (`star_spawn_rate`)
- missing system Drones: The Fueled Starburst Suit; An Elixir Drone Buff (Also from Gifts, the Founder Supply Drop, and Lootbugs (formula has 3 unknown placeholder(s))
- missing system Relics: A Legendary Relic (formula has 3 unknown placeholder(s))

### Auto-Catch Chance (`star_auto_catch_chance`)
- missing system Drones: The Fueled Starburst Suit; An Elixir Drone Buff (Also from the Founder Supply Drop and Lootbugs (formula has 2 unknown placeholder(s))

### Super Star Spawn Rate Multiplier (`super_star_spawn_multi`)
- missing system Drones: An Elixir Drone Buff (formula has 3 unknown placeholder(s))
- missing system Fishing: A Tier 1 Notice Upgrade (formula has 3 unknown placeholder(s))

### Super Star Supergiant Multiplier (`super_star_supergiant_multi`)
- missing system Store: The "Stargazing Supergiant Bundle!" Value Pack (formula has 1 unknown placeholder(s))

### All Star Multiplier (`all_star_multi`)
- wiki has (sub-formula) in Drones but our formula is flat: The Fueled Midas Suit (Requires a Tier 2 Notice Upgrade

### Candy Eaten (`candy_eaten`)
- missing system Items: Cosmic Candy

### Fishing Drone Capacity (`fishing_drone_capacity`)
- wiki has (sub-formula) in Fishing but our formula is flat: The Second Tier 1 Upgrade + The Ninth Tier 1 Upgrade + The Second Tier 1 Enhancement + The Last Tier 1 Enhancement

### Fishing Drone Base Power (`fishing_drone_power`)
- missing system Items: Pike (Requires the Poseidon Idol

### 5x Fish Tick Chance (`fishing_5x_tick_chance`)
- missing system Relics: A Divine Relic (formula has 2 unknown placeholder(s))

### Tier 2 Dock Power (`fishing_tier2_dock_multi`)
- missing system Stargazing: The Tenth Black Hole boost (formula has 1 unknown placeholder(s))

### Item Duration Multiplier (`item_duration_multi`)
- missing system Skins: The Per Item Bag Bonus (formula has 1 unknown placeholder(s))

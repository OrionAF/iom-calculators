export interface SkillBonus {
  label: string
  statKey?: string  // key into STAT_REGISTRY; enables tooltip + future compute
}

export interface SkillNode {
  id: string
  name: string
  image: string
  costs: number[]
  bonuses: SkillBonus[]
  obeliskLevel?: number
}

export interface SkillSection {
  id: string
  label: string
  skills: SkillNode[]
}

// ─── All Skills ───────────────────────────────────────────────────────────────

const _ALL: SkillNode[] = [
  // ── No Obelisk Requirement ──────────────────────────────────────────────────
  {
    id: 'LuckyStrikes',
    name: 'Lucky Strikes',
    image: 'Lucky Strikes.png',
    costs: [1],
    bonuses: [
      { label: 'Pickaxe Crit Chance +5%', statKey: 'pickaxe_crit_chance' },
      { label: 'Pickaxe Crit Damage +15%', statKey: 'pickaxe_crit_damage' },
    ],
  },
  {
    id: 'BiggerBlasts',
    name: 'Bigger Blasts',
    image: 'Bigger Blasts.png',
    costs: [1],
    bonuses: [{ label: 'Bomb Damage +25%', statKey: 'bomb_damage' }],
  },
  {
    id: 'OreEfficiency',
    name: 'Ore Efficiency',
    image: 'Ore Efficiency.png',
    costs: [1],
    bonuses: [{ label: 'Double Craft Chance +5%', statKey: 'double_craft_chance' }],
  },
  {
    id: 'SwingHarder',
    name: 'Swing Harder',
    image: 'Swing Harder.png',
    costs: [1],
    bonuses: [{ label: 'Pickaxe Damage +20%', statKey: 'pickaxe_damage' }],
  },
  {
    id: 'IngotIntuition',
    name: 'Ingot Intuition',
    image: 'Ingot Intuition.png',
    costs: [1],
    bonuses: [{ label: 'Pickaxe Bar Cost -10', statKey: 'pickaxe_bar_cost_reduction' }],
  },
  {
    id: 'ArsenalAdvancement',
    name: 'Arsenal Advancement',
    image: 'Arsenal Advancement.png',
    costs: [3],
    bonuses: [
      { label: 'Bomb Capacity +10', statKey: 'bomb_capacity' },
      { label: 'Bomb Damage +10%', statKey: 'bomb_damage' },
      { label: 'Free Bomb Chance +1%', statKey: 'bomb_free_chance' },
    ],
  },
  {
    id: 'AllRoundBomber',
    name: 'All-Round Bomber',
    image: 'All-Round Bomber.png',
    costs: [2],
    bonuses: [
      { label: 'Bomb Damage +40%', statKey: 'bomb_damage' },
      { label: 'Bomb Recharge Speed +10%', statKey: 'bomb_recharge_speed' },
      { label: 'Bomb Crit Chance +5%', statKey: 'bomb_crit_chance' },
    ],
  },
  {
    id: 'WaitMyCritsCanCrit',
    name: 'Wait My Crits Can Crit?',
    image: 'Wait My Crits Can Crit.png',
    costs: [2],
    bonuses: [{ label: 'Pickaxe Super Crit Chance +10%', statKey: 'pickaxe_super_crit_chance' }],
  },
  {
    id: 'EasyProgressor',
    name: 'Easy Progressor',
    image: 'Easy Progressor.png',
    costs: [3],
    bonuses: [
      { label: 'Floor Clear Requirement -10%', statKey: 'floor_clear_requirement_multi' },
      { label: 'Prestige Point Gain +20%', statKey: 'prestige_point_multi' },
      { label: 'Ore Sell Price +20%', statKey: 'ore_sell_price_multi' },
    ],
  },
  {
    id: 'PPGoUp',
    name: 'PP Go Up',
    image: 'PP Go Up.png',
    costs: [2],
    bonuses: [
      { label: 'Prestige Point Gain +25%', statKey: 'prestige_point_multi' },
      { label: 'Exp Gain +25%', statKey: 'experience_multi' },
    ],
  },
  {
    id: 'GemsAndChests',
    name: 'Gems & Chests',
    image: 'Gems & Chests.png',
    costs: [2],
    bonuses: [
      { label: 'Freebie Pack Gives +1 Gem', statKey: 'freebie_gems_bonus' },
      { label: '+1% chance for a Relic Chest', statKey: 'chance_for_relic_chest' },
    ],
  },
  {
    id: 'SuperDamage',
    name: 'Super Damage',
    image: 'Super Damage.png',
    costs: [4],
    bonuses: [
      { label: 'Pickaxe Damage +40%', statKey: 'pickaxe_damage' },
      { label: 'Pickaxe Crit Damage +25%', statKey: 'pickaxe_crit_damage' },
      { label: 'Pickaxe Radius +15%', statKey: 'pickaxe_radius_percent' },
    ],
  },
  {
    id: 'HeftyHammers',
    name: 'Hefty Hammers',
    image: 'Hefty Hammers.png',
    costs: [3],
    bonuses: [
      { label: 'Triple Craft Chance +5%', statKey: 'triple_craft_chance' },
      { label: '10x Craft Chance +1%', statKey: 'craft_10x_chance' },
    ],
  },
  {
    id: 'RelicRampage',
    name: 'Relic Rampage',
    image: 'Relic Rampage.png',
    costs: [3],
    bonuses: [{ label: '+0.1% Pickaxe Damage Per Relic Chest Opened', statKey: 'pickaxe_damage' }],
  },
  {
    id: 'JustWaitFaster',
    name: 'Just Wait Faster',
    image: 'Just Wait Faster.png',
    costs: [4],
    bonuses: [{ label: 'Freebie Pack Timer -60s', statKey: 'freebie_cooldown_seconds' }],
  },
  {
    id: 'MechanicalEvolution',
    name: 'Mechanical Evolution',
    image: 'Mechanical Evolution.png',
    costs: [7],
    bonuses: [{ label: 'Drone Suit Upgrade Cap +3', statKey: 'drone_suit_cap' }],
  },
  {
    id: 'Chronokeeper',
    name: 'Chronokeeper',
    image: 'Chronokeeper.png',
    costs: [5],
    bonuses: [
      { label: 'Offline Items And Relics Doubled' },
      { label: 'Banked Freebie Cap +1', statKey: 'freebie_bank_cap' },
      { label: 'Bomb Capacity +10', statKey: 'bomb_capacity' },
    ],
  },
  {
    id: 'GemBomb',
    name: 'Gem Bomb',
    image: 'Gem Bomb.png',
    costs: [5],
    bonuses: [
      { label: 'Deals damage based on gems owned' },
      { label: '3% chance to give a gem', statKey: 'gem_bomb_gem_chance' },
    ],
  },
  {
    id: 'TreasureHunter',
    name: 'Treasure Hunter',
    image: 'Treasure Hunter.png',
    costs: [7],
    bonuses: [
      { label: 'Freebie Pack Relic Chest Chance +1%', statKey: 'chance_for_relic_chest' },
      { label: 'Freebie Relic Chance Per 250 Relics Opened +1%', statKey: 'chance_for_relic_chest' },
    ],
  },
  {
    id: 'DemolitionExpert',
    name: 'Demolition Expert',
    image: 'Demolition Expert.png',
    costs: [5],
    bonuses: [
      { label: '+0.5% Bomb Crit Damage per Bomb Crit Chance', statKey: 'bomb_crit_damage' },
      { label: '+20% Bomb Super Crit Chance', statKey: 'bomb_super_crit_chance' },
      { label: '+3% Free Bomb Chance', statKey: 'bomb_free_chance' },
    ],
  },
  {
    id: 'WaitMySuperCritsCanCrit',
    name: 'Wait My Super Crits Can Crit?',
    image: 'Wait My Super Crits Can Crit.png',
    costs: [5],
    bonuses: [{ label: '+20% Ultra Crit Chance', statKey: 'pickaxe_ultra_crit_chance' }],
  },
  {
    id: 'AutoBomb',
    name: 'Auto-Bomber',
    image: 'Auto-Bomber.png',
    costs: [10],
    bonuses: [{ label: 'Select any bomb to automatically fire every 1.25 seconds' }],
  },
  {
    id: 'PerfectGold',
    name: 'Perfect Gold',
    image: 'Perfect Gold.png',
    costs: [10],
    bonuses: [{ label: 'Golden Floor Ore Multiplier +2×', statKey: 'golden_floor_multi' }],
  },
  {
    id: 'FlamboyantBombs',
    name: 'Flamboyant Bombs',
    image: 'Flamboyant Bombs.png',
    costs: [12],
    bonuses: [
      { label: '+150% Bomb Damage', statKey: 'bomb_damage' },
      { label: '+10% Bomb Ultra Crit Chance', statKey: 'bomb_ultra_crit_chance' },
      { label: '+5 Bomb Capacity', statKey: 'bomb_capacity' },
    ],
  },
  {
    id: 'MoreOreMoreProblems',
    name: 'More Ore More Problems',
    image: 'More Ore More Problems.png',
    costs: [12],
    bonuses: [
      { label: '+2 Ores Appear Per Screen', statKey: 'ores_on_screen' },
      { label: '-10% Bar Craft Costs', statKey: 'bar_craft_cost_multi' },
    ],
  },
  {
    id: 'FreeThatsAGreatPrice',
    name: "Free? That's A Great Price!",
    image: "Free That's a Great Price!.png",
    costs: [12],
    bonuses: [
      { label: '-60s Freebie Pack Timer', statKey: 'freebie_cooldown_seconds' },
      { label: '+2% Freebie Relic Chance', statKey: 'chance_for_relic_chest' },
      { label: '5% for Freebie timer to instantly refresh', statKey: 'freebie_refresh_chance' },
    ],
  },
  {
    id: 'WaitMyUltraCritsCanCrit',
    name: 'Wait My Ultra Crits Can Crit?',
    image: 'Wait My Ultra Crits Can Crit.png',
    costs: [12],
    bonuses: [
      { label: '+200% Pickaxe Damage', statKey: 'pickaxe_damage' },
      { label: '+10% Omega Crit Chance', statKey: 'pickaxe_omega_crit_chance' },
    ],
  },
  {
    id: 'DoTheseUpgradesEverEnd',
    name: 'Do These Upgrades Ever End',
    image: 'Do These Upgrades Ever End.png',
    costs: [18],
    bonuses: [
      { label: '+1 Cap to all Artifacts Upgrades', statKey: 'artifact_cap_increase' },
      { label: '+1 Cap to all Workshop Upgrades', statKey: 'bomb_workshop_cap_increase' },
    ],
  },
  {
    id: 'OpticalPhenomenon',
    name: 'Optical Phenomenon',
    image: 'Optical Phenomenon.png',
    costs: [18],
    bonuses: [{ label: '+1% Rainbow Floor Chance (Gives 50× Ores)', statKey: 'rainbow_floor_chance' }],
  },

  // ── Obelisk Level 17–18 ─────────────────────────────────────────────────────
  {
    id: 'HaveYouTriedGettingLuckier',
    name: 'Have You Tried Getting Luckier?',
    image: 'Have You Tried Getting Luckier.png',
    costs: [22],
    bonuses: [
      { label: 'All Pets level up chance +15%', statKey: 'pet_levelup_chance_multi' },
      { label: 'Chest Meter Fill Rate ×15', statKey: 'chest_meter_multi' },
    ],
    obeliskLevel: 17,
  },
  {
    id: 'Stonks',
    name: 'Stonks',
    image: 'Stonks.png',
    costs: [22],
    bonuses: [
      { label: '1% for +200 Gems from freebie', statKey: 'stonks_chance' },
      { label: '1% for +20 Items from freebie', statKey: 'stonks_chance' },
      { label: '1% for +10 Relics from freebie', statKey: 'stonks_chance' },
    ],
    obeliskLevel: 17,
  },
  {
    id: 'GasolineGuzzler',
    name: 'Gasoline Guzzler',
    image: 'Gasoline Guzzler.png',
    costs: [25],
    bonuses: [
      { label: 'Fuel Duration +20%', statKey: 'coal_fuel_duration_multi' },
      { label: 'Coal Production -10s', statKey: 'coal_generation_seconds' },
      { label: 'Coal Capacity +25%', statKey: 'coal_capacity_multi' },
    ],
    obeliskLevel: 18,
  },
  {
    id: 'IHaveWaresIfYouHaveCoin',
    name: 'I Have Wares, If You Have Coin',
    image: 'I Have Wares, If You Have Coin.png',
    costs: [25],
    bonuses: [
      { label: 'Ore Sell Price ×2.00', statKey: 'ore_sell_price_multi' },
      { label: 'Golden Floor Multiplier +20%', statKey: 'golden_floor_multi' },
    ],
    obeliskLevel: 18,
  },

  // ── Obelisk Level 19–20 ─────────────────────────────────────────────────────
  {
    id: 'VeinmorpherBomb',
    name: "Y'all Got Any More Of Them Veins?",
    image: 'Veinmorpher Bomb.png',
    costs: [28],
    bonuses: [
      { label: 'Unlocks the Veinmorpher Bomb' },
      { label: 'Can turn ores into veins', statKey: 'veinmorpher_chance' },
      { label: 'Can turn veins into golden veins', statKey: 'veinmorpher_golden_chance' }
    ],
    obeliskLevel: 19,
  },
  {
    id: 'SavingForARainyDay',
    name: 'Saving For A Rainy Day',
    image: 'Saving For A Rainy Day.png',
    costs: [28],
    bonuses: [
      { label: 'Banked Freebie Cap +2', statKey: 'freebie_bank_cap' },
      { label: 'Banked Lootbug Cap +2', statKey: 'lootbug_bank_cap' },
      { label: 'Lootbug Gem cost -1', statKey: 'lootbug_gem_cost_reduction' },
    ],
    obeliskLevel: 19,
  },
  {
    id: 'WhosAskingForAllTheseBars',
    name: "Who's Asking For All These Bars?",
    image: "Who's Asking For All These Bars.png",
    costs: [32],
    bonuses: [
      { label: 'Contract Points Earned +2', statKey: 'contract_points_rewarded' },
      { label: 'Triple Contract Point Chance +8%', statKey: 'contract_triple_points_chance' },
      { label: '+1 Contract Upgrade re-spec per prestige', statKey: 'contract_respec' },
    ],
    obeliskLevel: 20,
  },
  {
    id: 'ImRunningOutOfCreativeNames',
    name: "I'm Running Out Of Creative Names",
    image: "I'm Running Out Of Creative Names.png",
    costs: [32],
    bonuses: [
      { label: 'Rainbow Floor Chance +1%', statKey: 'rainbow_floor_chance' },
      { label: '10× Craft Chance +2%', statKey: 'craft_10x_chance' },
      { label: 'Bar Craft Cost -10%', statKey: 'bar_craft_cost_multi' },
    ],
    obeliskLevel: 20,
  },

  // ── Obelisk Level 23–26 ─────────────────────────────────────────────────────
  {
    id: 'TonsOfDamage',
    name: 'Tons Of Damage',
    image: 'Tons Of Damage.png',
    costs: [36],
    bonuses: [
      { label: '×2.00 Pickaxe Damage', statKey: 'pickaxe_damage' },
      { label: 'Ultra Crit Chance +15%', statKey: 'pickaxe_ultra_crit_chance' },
      { label: 'Experience Gain +100%', statKey: 'experience_multi' },
    ],
    obeliskLevel: 23,
  },
  {
    id: 'CtrlF',
    name: "Ctrl+F 'Stars'",
    image: "Ctrl+F 'Stars'.png",
    costs: [36],
    bonuses: [
      { label: 'Unlocks ability to follow Stars' },
      { label: 'Star Supernova Multi +20%', statKey: 'star_supernova_multi' },
      { label: 'Super Star Supernova Multi +20%', statKey: 'super_star_supernova_multi' },
    ],
    obeliskLevel: 23,
  },
  {
    id: 'Polychrome',
    name: 'This Is Gonna Take A While..',
    image: 'This Is Gonna Take A While.png',
    costs: [40],
    bonuses: [{ label: 'Unlocks the ability to earn Polychrome Cards' }],
    obeliskLevel: 26,
  },
  {
    id: 'ThreesACrowd',
    name: "Three's A Crowd",
    image: "Three's A Crowd.png",
    costs: [40],
    bonuses: [{ label: '+1 Drone', statKey: 'drone_count' }],
    obeliskLevel: 26,
  },
  {
    id: 'PolychromePower',
    name: 'Polychrome Power',
    image: 'Polychrome Power.png',
    costs: [50],
    bonuses: [
      { label: 'Pickaxe Damage per Poly Card +0.03×', statKey: 'pickaxe_damage' },
      { label: 'Ore Sell Price per Poly Card +0.03×', statKey: 'ore_sell_price_multi' },
      { label: 'Exp Gain per Poly Card +0.03×', statKey: 'experience_multi' },
    ],
    obeliskLevel: 26,
  },
  {
    id: 'LeprechaunsLegacy',
    name: "Leprechaun's Legacy",
    image: "Leprechaun's Legacy.png",
    costs: [45],
    bonuses: [
      { label: '×1.10 All Stars Multi', statKey: 'all_star_multi' },
      { label: '×1.10 Vein Income Multi', statKey: 'vein_income_multi' },
      { label: '×1.10 Golden Floor Multi', statKey: 'golden_floor_multi' },
      { label: '×1.10 Bomb Recharge Rate', statKey: 'bomb_recharge_speed' },
    ],
    obeliskLevel: 26,
  },

  // ── Obelisk Level 30 ────────────────────────────────────────────────────────
  {
    id: 'BlockBonker',
    name: 'Block Bonker',
    image: 'Block Bonker.png',
    costs: [50],
    bonuses: [
      { label: 'Damage per Highest Stage +1%', statKey: 'archaeology_dmg_per_stage' },
      { label: 'Max Stamina per Highest Stage +1%', statKey: 'archaeology_stm_per_stage' },
      { label: 'Speed Mod Gain +15', statKey: 'archaeology_spd_mod_gain' },
    ],
    obeliskLevel: 30,
  },
  {
    id: 'AvadaKeda',
    name: "Avada Keda-'",
    image: 'Avada Keda-.png',
    costs: [50],
    bonuses: [
      { label: 'Ability Duration +5s', statKey: 'archaeology_ability_dur' },
      { label: 'Ability Cooldown -10s', statKey: 'archaeology_ability_cd' },
      { label: 'Ability Instacharge Chance +3%', statKey: 'archaeology_ability_insta' },
    ],
    obeliskLevel: 30,
  },
  {
    id: 'TakeItBackNowYall',
    name: "Take it back now y'all",
    image: 'Take It Back Now Yall.png',
    costs: [65],
    bonuses: [
      { label: 'Unlocks the Auto-Prestige system' },
      { label: '(Does not function offline)' },
    ],
    obeliskLevel: 30,
  },

  // ── Obelisk Level 37 ────────────────────────────────────────────────────────
  {
    id: 'FishingWithFriends',
    name: 'Fishing With Friends',
    image: 'Fishing With Friends.png',
    costs: [40, 50, 63],
    bonuses: [
      { label: 'Fishing Drones +5', statKey: 'fishing_drone_capacity' },
      { label: 'Fishing Drone Power +10%', statKey: 'fishing_drone_power' },
      { label: 'Fish Multiplier +3%', statKey: 'fishing_income_multi' },
    ],
    obeliskLevel: 37,
  },
  {
    id: 'LetsPickUpThePace',
    name: "Let's Pick Up The Pace",
    image: "Let's Pick Up The Pace.png",
    costs: [40, 50, 63],
    bonuses: [
      { label: 'Fishing Tick Speed -2s', statKey: 'fishing_tick_reduction_seconds' },
      { label: 'Fishing Double Tick Chance +2%', statKey: 'fishing_double_tick_chance' },
      { label: 'Fishing Triple Tick Chance +1%', statKey: 'fishing_triple_tick_chance' },
    ],
    obeliskLevel: 37,
  },
  {
    id: 'FriendshipEndedWithTier1Items',
    name: 'Friendship Ended With Tier 1 Items',
    image: 'Friendship Ended With Tier 1 Items.png',
    costs: [50, 63, 78],
    bonuses: [
      { label: 'Tier 2 Items From Expert Notices +2', statKey: 'fishing_t2_items_expert_notice' },
      { label: 'Item Duration +15%', statKey: 'item_duration_multi' },
      { label: 'Notice Fish Req -10%', statKey: 'fishing_notice_requirement' },
    ],
    obeliskLevel: 37,
  },
  {
    id: 'WithThisFishISummonTwoMoreFish',
    name: 'With This Fish I Summon Two More Fish',
    image: 'With This Fish I Summon Two More Fish.png',
    costs: [50, 63, 78],
    bonuses: [
      { label: '+1% Fish Multiplier Per Fish Card', statKey: 'fishing_income_multi' },
      { label: '+0.1% Shiny Fish Chance Per Fish Card', statKey: 'fishing_shiny_chance' },
      { label: '(Gilded = 2 Cards, Poly = 3 Cards)' },
    ],
    obeliskLevel: 37,
  },

  // ── Obelisk Level 43–50 ─────────────────────────────────────────────────────
  {
    id: 'PleaseSirDontMakeMePrestigeAgain',
    name: "Please Sir Don't Make Me Prestige Again",
    image: "Please Sir Don't Make Me Prestige Again.png",
    costs: [65, 81, 102],
    bonuses: [
      { label: 'Contract Re-Spec Cap +1', statKey: 'contract_respec' },
      { label: '10× Contract Point Chance +0.25%', statKey: 'contract_10x_points_chance' },
    ],
    obeliskLevel: 43,
  },
  {
    id: 'InsaneInTheVeinGain',
    name: 'Insane In The Vein Gain',
    image: 'Insane In The Vein Gain.png',
    costs: [70, 88, 109],
    bonuses: [
      { label: 'Vein Polychrome Card Bonus +1×', statKey: 'polychrome_card_bonus_vein' },
      { label: 'Rainbow Vein Multi +6%', statKey: 'rainbow_vein_multi' },
    ],
    obeliskLevel: 44,
  },
  {
    id: 'CtrlCCtrlV',
    name: "Ctrl+C Ctrl+V Stars",
    image: 'Ctrl+C Ctrl+V Stars.png',
    costs: [75, 94, 117],
    bonuses: [
      { label: 'Orion Star Cap +2', statKey: 'star_orion_cap' },
      { label: 'Star Supernova Multi +6%', statKey: 'star_supernova_multi' },
      { label: 'Super Star 10× Chance +1%', statKey: 'super_star_10x_chance' },
    ],
    obeliskLevel: 45,
  },
  {
    id: 'MotleySchool',
    name: 'Motley School',
    image: 'Motley School.png',
    costs: [100, 125, 156],
    bonuses: [
      { label: 'Rod Multiplier +10%', statKey: 'fishing_rod_power' },
      { label: 'Abyss Dock Tick Req -2', statKey: 'fishing_abyss_dock_tick_req' },
      { label: 'Tier 2 Dock Tick Req -1', statKey: 'fishing_t2_dock_tick_req' },
      { label: 'Fishing Drones +5', statKey: 'fishing_drone_capacity' },
    ],
    obeliskLevel: 50,
  },
  {
    id: 'CompletionistGatekeeper',
    name: 'Completionist Gatekeeper',
    image: 'Completionist Gatekeeper.png',
    costs: [100, 125, 156],
    bonuses: [
      { label: 'Per Legendary Fish Found:' },
      { label: 'Tier 2 Dock Power +3%', statKey: 'fishing_tier2_dock_multi' },
      { label: 'Fishing Drone Power +2%', statKey: 'fishing_drone_power' },
      { label: 'Super Shiny Fish Chance +1%', statKey: 'fishing_super_shiny_chance' },
    ],
    obeliskLevel: 50,
  },

  // ── Obelisk Level 60+ ───────────────────────────────────────────────────────
  {
    id: 'AnyoneUpLootinTheyBugs',
    name: "Anyone Up Lootin' They Bugs",
    image: "Anyone Up Lootin' They Bugs.png",
    costs: [225, 281, 352],
    bonuses: [
      { label: 'Banked Lootbug Cap +3 per level', statKey: 'lootbug_bank_cap' },
      { label: 'Lootbug Loot Multi +4% per level', statKey: 'lootbug_loot_multi' },
    ],
    obeliskLevel: 60,
  },
  {
    id: 'CallOfTheVoid',
    name: 'Call Of The Void',
    image: 'Call Of The Void.png',
    costs: [250, 313, 391],
    bonuses: [
      { label: 'Void Portal Multi +5% per level', statKey: 'void_portal_base_multi' },
      { label: 'Void Drone Grade Cap +4 per level', statKey: 'drone_void_grade_cap_increase' },
    ],
    obeliskLevel: 60,
  },
  {
    id: 'FlamingVeins',
    name: 'Flaming Veins',
    image: 'Flaming Veins.png',
    costs: [500],
    bonuses: [{ label: 'Unlocks Infernal Vein Cards' }],
    obeliskLevel: 60,
  },
  {
    id: 'PondYield',
    name: 'Pond Yield',
    image: 'Pond Yield.png',
    costs: [750],
    bonuses: [{ label: 'Golden Frog Multiplier +0.001× per Golden Frog Caught', statKey: 'lootfrog_golden_multi' }],
    obeliskLevel: 60,
  },
  {
    id: 'AstralForge',
    name: 'Astral Forge',
    image: 'Astral Forge.png',
    costs: [500],
    bonuses: [{ label: 'Unlocks Infernal Star Cards' }],
    obeliskLevel: 60,
  },
  {
    id: 'FrogFrenzy',
    name: 'Frog Frenzy',
    image: 'Frog Frenzy.png',
    costs: [750, 938, 1172],
    bonuses: [
      { label: 'Frogger Drone Grade Cap +2', statKey: 'drone_frogger_grade_cap_increase' },
      { label: 'Triple Lootfrog Chance +1%', statKey: 'lootfrog_triple_spawn_chance' },
      { label: 'Frog Capacity +1', statKey: 'lootfrog_capacity' },
    ],
    obeliskLevel: 62,
  },
  {
    id: 'WhyAreThereStarsInMyMiningGame',
    name: 'Why Are There Stars In My Mining Game',
    image: 'Why Are There Stars In My Mining Game.png',
    costs: [950, 1188, 1484],
    bonuses: [
      { label: 'Novagiant Combo Multi +5%', statKey: 'novagiant_combo_multi' },
      { label: 'Star Supergiant Chance +1%', statKey: 'star_supergiant_chance' },
      { label: 'Capricorn Cap +3', statKey: 'star_capricorn_cap' },
      { label: 'Gemini Cap +2', statKey: 'star_gemini_cap' },
    ],
    obeliskLevel: 64,
  },
  {
    id: 'IdleObeliskMincer',
    name: 'Idle Obelisk Mincer',
    image: 'Idle Obelisk Mincer.png',
    costs: [2000],
    bonuses: [
      { label: 'Pickaxe Damage ×2.50', statKey: 'pickaxe_damage' },
      { label: 'Scorpio Star Cap +5', statKey: 'star_scorpio_cap' },
      { label: 'Contract Upgrade Cap +2', statKey: 'contract_cap_increase' },
      { label: 'Workshop Upgrade Cap +1', statKey: 'bomb_workshop_cap_increase' },
    ],
    obeliskLevel: 64,
  },
  {
    id: 'IBuriedItHere',
    name: 'I Buried It Here (55.251920, -6.483423)',
    image: 'I Buried It Here.png',
    costs: [950, 1188, 1484],
    bonuses: [
      { label: 'Golden Void Portal Chance +2%', statKey: 'golden_void_portal_chance' },
      { label: 'Galactic Floor Chance +2%', statKey: 'galactic_floor_chance' },
      { label: 'Golden Ore Chance +1%', statKey: 'golden_ore_chance' },
      { label: 'Chain Drone Cap +5', statKey: 'drone_chain_grade_cap_increase' },
    ],
    obeliskLevel: 64,
  },
]

// ─── Sections ─────────────────────────────────────────────────────────────────

export const SKILL_SECTIONS: SkillSection[] = [
  {
    id: 'early',
    label: 'No Requirement',
    skills: _ALL.filter(s => s.obeliskLevel === undefined),
  },
  {
    id: 'ol17',
    label: 'Obelisk Lv. 17–18',
    skills: _ALL.filter(s => s.obeliskLevel !== undefined && s.obeliskLevel <= 18),
  },
  {
    id: 'ol19',
    label: 'Obelisk Lv. 19–20',
    skills: _ALL.filter(s => s.obeliskLevel !== undefined && s.obeliskLevel >= 19 && s.obeliskLevel <= 20),
  },
  {
    id: 'ol23',
    label: 'Obelisk Lv. 23–26',
    skills: _ALL.filter(s => s.obeliskLevel !== undefined && s.obeliskLevel >= 23 && s.obeliskLevel <= 26),
  },
  {
    id: 'ol30',
    label: 'Obelisk Lv. 30',
    skills: _ALL.filter(s => s.obeliskLevel === 30),
  },
  {
    id: 'ol37',
    label: 'Obelisk Lv. 37',
    skills: _ALL.filter(s => s.obeliskLevel === 37),
  },
  {
    id: 'ol43',
    label: 'Obelisk Lv. 43–50',
    skills: _ALL.filter(s => s.obeliskLevel !== undefined && s.obeliskLevel >= 43 && s.obeliskLevel <= 50),
  },
  {
    id: 'ol60',
    label: 'Obelisk Lv. 60+',
    skills: _ALL.filter(s => s.obeliskLevel !== undefined && s.obeliskLevel >= 60),
  },
]

export const ALL_SKILLS: SkillNode[] = _ALL

/** Total SP to fully unlock all skills (per wiki trivia). */
export const TOTAL_SP = 18714

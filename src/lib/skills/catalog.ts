export interface SkillNode {
  id: string           // matches div id in wiki
  name: string         // display name
  image: string        // wiki filename (used by WikiIcon)
  costs: number[]      // SP cost per level; costs[0] = level 1, etc.
  bonuses: string[]    // bonus description lines (1 per <br>)
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
    bonuses: ['Pickaxe Crit Chance +5%', 'Pickaxe Crit Damage +15%'],
  },
  {
    id: 'BiggerBlasts',
    name: 'Bigger Blasts',
    image: 'Bigger Blasts.png',
    costs: [1],
    bonuses: ['Bomb Damage +25%'],
  },
  {
    id: 'OreEfficiency',
    name: 'Ore Efficiency',
    image: 'Ore Efficiency.png',
    costs: [1],
    bonuses: ['Double Craft Chance +5%'],
  },
  {
    id: 'SwingHarder',
    name: 'Swing Harder',
    image: 'Swing Harder.png',
    costs: [1],
    bonuses: ['Pickaxe Damage +20%'],
  },
  {
    id: 'IngotIntuition',
    name: 'Ingot Intuition',
    image: 'Ingot Intuition.png',
    costs: [1],
    bonuses: ['Pickaxe Bar Cost -10'],
  },
  {
    id: 'ArsenalAdvancement',
    name: 'Arsenal Advancement',
    image: 'Arsenal Advancement.png',
    costs: [3],
    bonuses: ['Bomb Capacity +10', 'Bomb Damage +10%', 'Free Bomb Chance +1%'],
  },
  {
    id: 'AllRoundBomber',
    name: 'All-Round Bomber',
    image: 'All-Round Bomber.png',
    costs: [2],
    bonuses: ['Bomb Damage +40%', 'Bomb Recharge Speed +10%', 'Bomb Crit Chance +5%'],
  },
  {
    id: 'WaitMyCritsCanCrit',
    name: 'Wait My Crits Can Crit?',
    image: 'Wait My Crits Can Crit.png',
    costs: [2],
    bonuses: ['Pickaxe Super Crit Chance +10%'],
  },
  {
    id: 'EasyProgressor',
    name: 'Easy Progressor',
    image: 'Easy Progressor.png',
    costs: [3],
    bonuses: ['Floor Clear Requirement -10%', 'Prestige Point Gain +20%', 'Ore Sell Price +20%'],
  },
  {
    id: 'PPGoUp',
    name: 'PP Go Up',
    image: 'PP Go Up.png',
    costs: [2],
    bonuses: ['Prestige Point Gain +25%', 'Exp Gain +25%'],
  },
  {
    id: 'GemsAndChests',
    name: 'Gems & Chests',
    image: 'Gems & Chests.png',
    costs: [2],
    bonuses: ['Freebie Pack Gives +1 Gem', '+1% chance for a Relic Chest'],
  },
  {
    id: 'SuperDamage',
    name: 'Super Damage',
    image: 'Super Damage.png',
    costs: [4],
    bonuses: ['Pickaxe Damage +40%', 'Pickaxe Crit Damage +25%', 'Pickaxe Radius +15%'],
  },
  {
    id: 'HeftyHammers',
    name: 'Hefty Hammers',
    image: 'Hefty Hammers.png',
    costs: [3],
    bonuses: ['Triple Craft Chance +5%', '10x Craft Chance +1%'],
  },
  {
    id: 'RelicRampage',
    name: 'Relic Rampage',
    image: 'Relic Rampage.png',
    costs: [3],
    bonuses: ['+0.1% Pickaxe Damage Per Relic Chest Opened'],
  },
  {
    id: 'JustWaitFaster',
    name: 'Just Wait Faster',
    image: 'Just Wait Faster.png',
    costs: [4],
    bonuses: ['Freebie Pack Timer -60s'],
  },
  {
    id: 'MechanicalEvolution',
    name: 'Mechanical Evolution',
    image: 'Mechanical Evolution.png',
    costs: [7],
    bonuses: ['Drone Suit Upgrade Cap +3'],
  },
  {
    id: 'Chronokeeper',
    name: 'Chronokeeper',
    image: 'Chronokeeper.png',
    costs: [5],
    bonuses: ['Offline Items And Relics Doubled', 'Banked Freebie Cap +1', 'Bomb Capacity +10'],
  },
  {
    id: 'GemBomb',
    name: 'Gem Bomb',
    image: 'Gem Bomb.png',
    costs: [5],
    bonuses: ['Deals damage based on gems owned', '3% chance to give a gem'],
  },
  {
    id: 'TreasureHunter',
    name: 'Treasure Hunter',
    image: 'Treasure Hunter.png',
    costs: [7],
    bonuses: ['Freebie Pack Relic Chest Chance +1%', 'Freebie Relic Chance Per 250 Relics Opened +1%'],
  },
  {
    id: 'DemolitionExpert',
    name: 'Demolition Expert',
    image: 'Demolition Expert.png',
    costs: [5],
    bonuses: ['+0.5% Bomb Crit Damage per Bomb Crit Chance', '+20% Bomb Super Crit Chance', '+3% Free Bomb Chance'],
  },
  {
    id: 'WaitMySuperCritsCanCrit',
    name: 'Wait My Super Crits Can Crit?',
    image: 'Wait My Super Crits Can Crit.png',
    costs: [5],
    bonuses: ['+20% Ultra Crit Chance'],
  },
  {
    id: 'AutoBomb',
    name: 'Auto-Bomber',
    image: 'Auto-Bomber.png',
    costs: [10],
    bonuses: ['Select any bomb to automatically fire every 1.25 seconds'],
  },
  {
    id: 'PerfectGold',
    name: 'Perfect Gold',
    image: 'Perfect Gold.png',
    costs: [10],
    bonuses: ['Golden Floor Ore Multiplier +2×'],
  },
  {
    id: 'FlamboyantBombs',
    name: 'Flamboyant Bombs',
    image: 'Flamboyant Bombs.png',
    costs: [12],
    bonuses: ['+150% Bomb Damage', '+10% Bomb Ultra Crit Chance', '+5 Bomb Capacity'],
  },
  {
    id: 'MoreOreMoreProblems',
    name: 'More Ore More Problems',
    image: 'More Ore More Problems.png',
    costs: [12],
    bonuses: ['+2 Ores Appear Per Screen', '-10% Bar Craft Costs'],
  },
  {
    id: 'FreeThatsAGreatPrice',
    name: "Free? That's A Great Price!",
    image: "Free That's a Great Price!.png",
    costs: [12],
    bonuses: ['-60s Freebie Pack Timer', '+2% Freebie Relic Chance', '5% for Freebie timer to instantly refresh'],
  },
  {
    id: 'WaitMyUltraCritsCanCrit',
    name: 'Wait My Ultra Crits Can Crit?',
    image: 'Wait My Ultra Crits Can Crit.png',
    costs: [12],
    bonuses: ['+200% Pickaxe Damage', '+10% Omega Crit Chance'],
  },
  {
    id: 'DoTheseUpgradesEverEnd',
    name: 'Do These Upgrades Ever End',
    image: 'Do These Upgrades Ever End.png',
    costs: [18],
    bonuses: ['+1 Cap to all Artifacts Upgrades', '+1 Cap to all Workshop Upgrades'],
  },
  {
    id: 'OpticalPhenomenon',
    name: 'Optical Phenomenon',
    image: 'Optical Phenomenon.png',
    costs: [18],
    bonuses: ['+1% Rainbow Floor Chance (Gives 50× Ores)'],
  },

  // ── Obelisk Level 17–18 ─────────────────────────────────────────────────────
  {
    id: 'HaveYouTriedGettingLuckier',
    name: 'Have You Tried Getting Luckier?',
    image: 'Have You Tried Getting Luckier.png',
    costs: [22],
    bonuses: ['All Pets level up chance +15%', 'Chest Meter Fill Rate ×15'],
    obeliskLevel: 17,
  },
  {
    id: 'Stonks',
    name: 'Stonks',
    image: 'Stonks.png',
    costs: [22],
    bonuses: ['1% for +200 Gems from freebie', '1% for +20 Items from freebie', '1% for +10 Relics from freebie'],
    obeliskLevel: 17,
  },
  {
    id: 'GasolineGuzzler',
    name: 'Gasoline Guzzler',
    image: 'Gasoline Guzzler.png',
    costs: [25],
    bonuses: ['Fuel Duration +20%', 'Coal Production -10s', 'Coal Capacity +25%'],
    obeliskLevel: 18,
  },
  {
    id: 'IHaveWaresIfYouHaveCoin',
    name: 'I Have Wares, If You Have Coin',
    image: 'I Have Wares, If You Have Coin.png',
    costs: [25],
    bonuses: ['Ore Sell Price ×2.00', 'Golden Floor Multiplier +20%'],
    obeliskLevel: 18,
  },

  // ── Obelisk Level 19–20 ─────────────────────────────────────────────────────
  {
    id: 'VeinmorpherBomb',
    name: "Y'all Got Any More Of Them Veins?",
    image: 'Veinmorpher Bomb.png',
    costs: [28],
    bonuses: ['Unlocks the Veinmorpher Bomb', 'Can turn ores into veins, veins into golden veins'],
    obeliskLevel: 19,
  },
  {
    id: 'SavingForARainyDay',
    name: 'Saving For A Rainy Day',
    image: 'Saving For A Rainy Day.png',
    costs: [28],
    bonuses: ['Banked Freebie Cap +2', 'Banked Lootbug Cap +2', 'Lootbug Gem cost -1'],
    obeliskLevel: 19,
  },
  {
    id: 'WhosAskingForAllTheseBars',
    name: "Who's Asking For All These Bars?",
    image: "Who's Asking For All These Bars.png",
    costs: [32],
    bonuses: ['Contract Points Earned +2', 'Triple Contract Point Chance +8%', '+1 Contract Upgrade re-spec per prestige'],
    obeliskLevel: 20,
  },
  {
    id: 'ImRunningOutOfCreativeNames',
    name: "I'm Running Out Of Creative Names",
    image: "I'm Running Out Of Creative Names.png",
    costs: [32],
    bonuses: ['Rainbow Floor Chance +1%', '10× Craft Chance +2%', 'Bar Craft Cost -10%'],
    obeliskLevel: 20,
  },

  // ── Obelisk Level 23–26 ─────────────────────────────────────────────────────
  {
    id: 'TonsOfDamage',
    name: 'Tons Of Damage',
    image: 'Tons Of Damage.png',
    costs: [36],
    bonuses: ['×2.00 Pickaxe Damage', 'Ultra Crit Chance +15%', 'Experience Gain +100%'],
    obeliskLevel: 23,
  },
  {
    id: 'CtrlF',
    name: "Ctrl+F 'Stars'",
    image: "Ctrl+F 'Stars'.png",
    costs: [36],
    bonuses: ['Unlocks ability to follow Stars', 'Star Supernova Multi +20%', 'Super Star Supernova Multi +20%'],
    obeliskLevel: 23,
  },
  {
    id: 'Polychrome',
    name: 'This Is Gonna Take A While..',
    image: 'This Is Gonna Take A While.png',
    costs: [40],
    bonuses: ['Unlocks the ability to earn Polychrome Cards'],
    obeliskLevel: 26,
  },
  {
    id: 'ThreesACrowd',
    name: "Three's A Crowd",
    image: "Three's A Crowd.png",
    costs: [40],
    bonuses: ['+1 Drone'],
    obeliskLevel: 26,
  },
  {
    id: 'PolychromePower',
    name: 'Polychrome Power',
    image: 'Polychrome Power.png',
    costs: [50],
    bonuses: ['Pickaxe Damage per Poly Card +0.03×', 'Ore Sell Price per Poly Card +0.03×', 'Exp Gain per Poly Card +0.03×'],
    obeliskLevel: 26,
  },
  {
    id: 'LeprechaunsLegacy',
    name: "Leprechaun's Legacy",
    image: "Leprechaun's Legacy.png",
    costs: [45],
    bonuses: ['×1.10 All Stars Multi', '×1.10 Vein Income Multi', '×1.10 Golden Floor Multi', '×1.10 Bomb Recharge Rate'],
    obeliskLevel: 26,
  },

  // ── Obelisk Level 30 ────────────────────────────────────────────────────────
  {
    id: 'BlockBonker',
    name: 'Block Bonker',
    image: 'Block Bonker.png',
    costs: [50],
    bonuses: ['Damage per Highest Stage +1%', 'Max Stamina per Highest Stage +1%', 'Speed Mod Gain +15 (cap Stage 100)'],
    obeliskLevel: 30,
  },
  {
    id: 'AvadaKeda',
    name: "Avada Keda-'",
    image: 'Avada Keda-.png',
    costs: [50],
    bonuses: ['Ability Duration +5s', 'Ability Cooldown -10s', 'Ability Instacharge Chance +3%'],
    obeliskLevel: 30,
  },
  {
    id: 'TakeItBackNowYall',
    name: "Take it back now y'all",
    image: 'Take It Back Now Yall.png',
    costs: [65],
    bonuses: ['Unlocks the Auto-Prestige system', '(Does not function offline)'],
    obeliskLevel: 30,
  },

  // ── Obelisk Level 37 ────────────────────────────────────────────────────────
  {
    id: 'FishingWithFriends',
    name: 'Fishing With Friends',
    image: 'Fishing With Friends.png',
    costs: [40, 50, 63],
    bonuses: ['Fishing Drones +5', 'Fishing Drone Power +10%', 'Fish Multiplier +3%'],
    obeliskLevel: 37,
  },
  {
    id: 'LetsPickUpThePace',
    name: "Let's Pick Up The Pace",
    image: "Let's Pick Up The Pace.png",
    costs: [40, 50, 63],
    bonuses: ['Fishing Tick Speed -2s', 'Fishing Double Tick Chance +2%', 'Fishing Triple Tick Chance +1%'],
    obeliskLevel: 37,
  },
  {
    id: 'FriendshipEndedWithTier1Items',
    name: 'Friendship Ended With Tier 1 Items',
    image: 'Friendship Ended With Tier 1 Items.png',
    costs: [50, 63, 78],
    bonuses: ['Tier 2 Items From Expert Notices +2', 'Item Duration +15%', 'Notice Fish Req -10%'],
    obeliskLevel: 37,
  },
  {
    id: 'WithThisFishISummonTwoMoreFish',
    name: 'With This Fish I Summon Two More Fish',
    image: 'With This Fish I Summon Two More Fish.png',
    costs: [50, 63, 78],
    bonuses: ['+1% Fish Multiplier Per Fish Card', '+0.1% Shiny Fish Chance Per Fish Card', '(Gilded = 2 Cards, Poly = 3 Cards)'],
    obeliskLevel: 37,
  },

  // ── Obelisk Level 43–50 ─────────────────────────────────────────────────────
  {
    id: 'PleaseSirDontMakeMePrestigeAgain',
    name: "Please Sir Don't Make Me Prestige Again",
    image: "Please Sir Don't Make Me Prestige Again.png",
    costs: [65, 81, 102],
    bonuses: ['Contract Re-Spec Cap +1', '10× Contract Point Chance +0.25%'],
    obeliskLevel: 43,
  },
  {
    id: 'InsaneInTheVeinGain',
    name: 'Insane In The Vein Gain',
    image: 'Insane In The Vein Gain.png',
    costs: [70, 88, 109],
    bonuses: ['Vein Polychrome Card Bonus +1×', 'Rainbow Vein Multi +6%'],
    obeliskLevel: 44,
  },
  {
    id: 'CtrlCCtrlV',
    name: "Ctrl+C Ctrl+V Stars",
    image: 'Ctrl+C Ctrl+V Stars.png',
    costs: [75, 94, 117],
    bonuses: ['Orion Star Cap +2', 'Star Supernova Multi +6%', 'Super Star 10× Chance +1%'],
    obeliskLevel: 45,
  },
  {
    id: 'MotleySchool',
    name: 'Motley School',
    image: 'Motley School.png',
    costs: [100, 125, 156],
    bonuses: ['Rod Multiplier +10%', 'Abyss Dock Tick Req -2', 'Tier 2 Dock Tick Req -1', 'Fishing Drones +5'],
    obeliskLevel: 50,
  },
  {
    id: 'CompletionistGatekeeper',
    name: 'Completionist Gatekeeper',
    image: 'Completionist Gatekeeper.png',
    costs: [100, 125, 156],
    bonuses: ['Per Legendary Fish Found:', 'Tier 2 Dock Power +3%', 'Fishing Drone Power +2%', 'Super Shiny Fish Chance +1%'],
    obeliskLevel: 50,
  },

  // ── Obelisk Level 60+ ───────────────────────────────────────────────────────
  {
    id: 'AnyoneUpLootinTheyBugs',
    name: "Anyone Up Lootin' They Bugs",
    image: "Anyone Up Lootin' They Bugs.png",
    costs: [225, 281, 352],
    bonuses: ['Banked Lootbug Cap +3 per level', 'Lootbug Loot Multi +4% per level'],
    obeliskLevel: 60,
  },
  {
    id: 'CallOfTheVoid',
    name: 'Call Of The Void',
    image: 'Call Of The Void.png',
    costs: [250, 313, 391],
    bonuses: ['Void Portal Multi +5% per level', 'Void Drone Grade Cap +4 per level'],
    obeliskLevel: 60,
  },
  {
    id: 'FlamingVeins',
    name: 'Flaming Veins',
    image: 'Flaming Veins.png',
    costs: [500],
    bonuses: ['Unlocks Infernal Vein Cards'],
    obeliskLevel: 60,
  },
  {
    id: 'PondYield',
    name: 'Pond Yield',
    image: 'Pond Yield.png',
    costs: [750],
    bonuses: ['Golden Frog Multiplier +0.001× per Golden Frog Caught'],
    obeliskLevel: 60,
  },
  {
    id: 'AstralForge',
    name: 'Astral Forge',
    image: 'Astral Forge.png',
    costs: [500],
    bonuses: ['Unlocks Infernal Star Cards'],
    obeliskLevel: 60,
  },
  {
    id: 'FrogFrenzy',
    name: 'Frog Frenzy',
    image: 'Frog Frenzy.png',
    costs: [750, 938, 1172],
    bonuses: ['Frogger Drone Grade Cap +2', 'Triple Lootfrog Chance +1%', 'Frog Capacity +1'],
    obeliskLevel: 62,
  },
  {
    id: 'WhyAreThereStarsInMyMiningGame',
    name: 'Why Are There Stars In My Mining Game',
    image: 'Why Are There Stars In My Mining Game.png',
    costs: [950, 1188, 1484],
    bonuses: ['Novagiant Combo Multi +5%', 'Star Supergiant Chance +1%', 'Capricorn Cap +3', 'Gemini Cap +2'],
    obeliskLevel: 64,
  },
  {
    id: 'IdleObeliskMincer',
    name: 'Idle Obelisk Mincer',
    image: 'Idle Obelisk Mincer.png',
    costs: [2000],
    bonuses: ['Pickaxe Damage ×2.50', 'Scorpio Star Cap +5', 'Contract Upgrade Cap +2', 'Workshop Upgrade Cap +1'],
    obeliskLevel: 64,
  },
  {
    id: 'IBuriedItHere',
    name: 'I Buried It Here (55.251920, -6.483423)',
    image: 'I Buried It Here.png',
    costs: [950, 1188, 1484],
    bonuses: ['Golden Void Portal Chance +2%', 'Galactic Floor Chance +2%', 'Golden Ore Chance +1%', 'Chain Drone Cap +5'],
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

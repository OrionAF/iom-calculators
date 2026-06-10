<script lang="ts">
  import { Search, Lock } from 'lucide-svelte'
  import { ALL_SKILLS, TOTAL_SP, type SkillNode } from '$lib/skills/catalog'
  import { skillProgress, setSkillLevel, maxAllSkills, resetAllSkills } from '$lib/stores/skillProgress'
  import WikiIcon from '$lib/components/WikiIcon.svelte'
  import StatTooltip from '$lib/components/StatTooltip.svelte'
  import PageHeader from '$lib/components/PageHeader.svelte'
  import Button from '$lib/components/Button.svelte'
  import ResultCard from '$lib/components/ResultCard.svelte'

  // ── Grid Layout Constants ─────────────────────────────────────────────────
  const GRID_UNIT_PX = 30 // Proportional cell size in pixels
  const NODE_CELL_SIZE = 2.5 // Nodes span 2.5 x 2.5 cells (75px)

  // Static coordinate mapping based directly on your mockup sheet (1-indexed)
  const SKILL_COORDINATES: Record<string, { x: number; y: number; prereqId: string | null }> = {
    // Top Root
    LuckyStrikes: { x: 19, y: 3, prereqId: null },

    // Level 1 Nodes
    BiggerBlasts: { x: 10, y: 5, prereqId: 'LuckyStrikes' },
    OreEfficiency: { x: 28, y: 5, prereqId: 'LuckyStrikes' },

    // Level 2 Nodes
    SwingHarder: { x: 10, y: 10, prereqId: 'BiggerBlasts' },
    IngotIntuition: { x: 28, y: 10, prereqId: 'OreEfficiency' },

    // Level 3 Nodes
    AllRoundBomber: { x: 6, y: 15, prereqId: 'SwingHarder' },
    ArsenalAdvancement: { x: 14, y: 15, prereqId: 'SwingHarder' },
    EasyProgressor: { x: 24, y: 15, prereqId: 'IngotIntuition' },
    WaitMyCritsCanCrit: { x: 32, y: 15, prereqId: 'IngotIntuition' },

    // Level 4 Nodes
    PPGoUp: { x: 6, y: 20, prereqId: 'AllRoundBomber' },
    GemsAndChests: { x: 32, y: 20, prereqId: 'WaitMyCritsCanCrit' },

    // Level 5 Nodes
    SuperDamage: { x: 6, y: 25, prereqId: 'PPGoUp' },
    JustWaitFaster: { x: 32, y: 25, prereqId: 'GemsAndChests' },

    // Level 6 Nodes
    HeftyHammers: { x: 14, y: 30, prereqId: 'PPGoUp' },
    RelicRampage: { x: 24, y: 30, prereqId: 'GemsAndChests' },

    // Level 7 Nodes
    Chronokeeper: { x: 14, y: 35, prereqId: 'HeftyHammers' },
    GemBomb: { x: 24, y: 35, prereqId: 'RelicRampage' },

    // Level 8 Nodes
    MechanicalEvolution: { x: 6, y: 40, prereqId: 'HeftyHammers' },
    TreasureHunter: { x: 32, y: 40, prereqId: 'RelicRampage' },

    // Level 9 Nodes
    DemolitionExpert: { x: 14, y: 45, prereqId: 'Chronokeeper' },
    WaitMySuperCritsCanCrit: { x: 24, y: 45, prereqId: 'GemBomb' },

    // Level 10 Nodes
    AutoBomb: { x: 14, y: 50, prereqId: 'DemolitionExpert' },
    PerfectGold: { x: 24, y: 50, prereqId: 'WaitMySuperCritsCanCrit' },

    // Level 11 Nodes
    FlamboyantBombs: { x: 10, y: 55, prereqId: 'AutoBomb' },
    MoreOreMoreProblems: { x: 28, y: 55, prereqId: 'PerfectGold' },

    // Level 12 Nodes
    FreeThatsAGreatPrice: { x: 5, y: 60, prereqId: 'FlamboyantBombs' },
    WaitMyUltraCritsCanCrit: { x: 33, y: 60, prereqId: 'MoreOreMoreProblems' },

    // Level 13 Nodes
    DoTheseUpgradesEverEnd: { x: 14, y: 65, prereqId: 'FreeThatsAGreatPrice' },
    OpticalPhenomenon: { x: 24, y: 65, prereqId: 'WaitMyUltraCritsCanCrit' },

    // Level 14 Nodes
    HaveYouTriedGettingLuckier: { x: 14, y: 70, prereqId: 'DoTheseUpgradesEverEnd' },
    Stonks: { x: 24, y: 70, prereqId: 'OpticalPhenomenon' },

    // Level 15 Nodes
    GasolineGuzzler: { x: 4, y: 75, prereqId: 'HaveYouTriedGettingLuckier' },
    IHaveWaresIfYouHaveCoin: { x: 34, y: 75, prereqId: 'Stonks' },

    // Level 16 Nodes
    WhosAskingForAllTheseBars: { x: 12, y: 80, prereqId: 'VeinmorpherBomb' },
    ImRunningOutOfCreativeNames: { x: 26, y: 80, prereqId: 'SavingForARainyDay' },

    // Level 17 Nodes
    VeinmorpherBomb: { x: 8, y: 85, prereqId: 'GasolineGuzzler' },
    SavingForARainyDay: { x: 30, y: 85, prereqId: 'IHaveWaresIfYouHaveCoin' },

    // Level 18 Nodes
    TonsOfDamage: { x: 16, y: 90, prereqId: 'WhosAskingForAllTheseBars' },
    CtrlF: { x: 21, y: 90, prereqId: 'ImRunningOutOfCreativeNames' },

    // Level 19 Nodes
    BlockBonker: { x: 16, y: 95, prereqId: 'TonsOfDamage' },
    AvadaKeda: { x: 21, y: 95, prereqId: 'CtrlF' },

    // Level 20 Nodes
    Polychrome: { x: 9, y: 100, prereqId: 'TonsOfDamage' },
    ThreesACrowd: { x: 29, y: 100, prereqId: 'CtrlF' },

    // Level 21 Nodes
    FishingWithFriends: { x: 4, y: 105, prereqId: 'GasolineGuzzler' },
    LetsPickUpThePace: { x: 34, y: 105, prereqId: 'IHaveWaresIfYouHaveCoin' },

    // Level 22 Nodes
    TakeItBackNowYall: { x: 9, y: 110, prereqId: 'Polychrome' },
    LeprechaunsLegacy: { x: 29, y: 110, prereqId: 'PolychromePower' },

    // Level 23 Nodes
    FriendshipEndedWithTier1Items: { x: 4, y: 115, prereqId: 'FishingWithFriends' },
    WithThisFishISummonTwoMoreFish: { x: 34, y: 115, prereqId: 'LetsPickUpThePace' },

    // Level 24 Nodes
    PolychromePower: { x: 19, y: 120, prereqId: 'Polychrome' },

    // Level 25 Nodes
    MotleySchool: { x: 4, y: 125, prereqId: 'FriendshipEndedWithTier1Items' },
    CompletionistGatekeeper: { x: 34, y: 125, prereqId: 'WithThisFishISummonTwoMoreFish' },

    // Level 26 Nodes
    PleaseSirDontMakeMePrestigeAgain: { x: 8, y: 130, prereqId: 'PolychromePower' },
    InsaneInTheVeinGain: { x: 19, y: 130, prereqId: 'PleaseSirDontMakeMePrestigeAgain' },
    CtrlCCtrlV: { x: 30, y: 130, prereqId: 'InsaneInTheVeinGain' },

    // Level 27 Nodes
    FlamingVeins: { x: 19, y: 135, prereqId: 'InsaneInTheVeinGain' },
    AstralForge: { x: 30, y: 135, prereqId: 'CtrlCCtrlV' },

    // Level 28 Nodes
    AnyoneUpLootinTheyBugs: { x: 8, y: 140, prereqId: 'PleaseSirDontMakeMePrestigeAgain' },
    CallOfTheVoid: { x: 19, y: 140, prereqId: 'AnyoneUpLootinTheyBugs' },
    PondYield: { x: 30, y: 140, prereqId: 'CallOfTheVoid' },

    // Level 29 Nodes
    WhyAreThereStarsInMyMiningGame: { x: 8, y: 145, prereqId: 'FrogFrenzy' },
    FrogFrenzy: { x: 19, y: 145, prereqId: 'CallOfTheVoid' },
    IBuriedItHere: { x: 30, y: 145, prereqId: 'FrogFrenzy' },

    // Level 30 Nodes
    IdleObeliskMincer: { x: 19, y: 150, prereqId: 'FrogFrenzy' }
  }

  // Hardcoded spreadsheet connection pathways based exactly on the sheet lines.
  const TREE_PATHS = [
    // 1. Lucky Strikes (18, 3) to Bigger Blasts (9, 18) & Ore Efficiency (27, 18)
    { d: "M 19 3 L 10 3 L 10 5", sourceId: "LuckyStrikes", targetId: "BiggerBlasts" },
    { d: "M 19 3 L 28 3 L 28 5", sourceId: "LuckyStrikes", targetId: "OreEfficiency" },

    // 2. Bigger Blasts (9, 18) to Swing Harder (9, 34)
    { d: "M 10 5 L 10 10", sourceId: "BiggerBlasts", targetId: "SwingHarder" },

    // 3. Ore Efficiency (27, 18) to Ingot Intuition (27, 34)
    { d: "M 28 5 L 28 10", sourceId: "OreEfficiency", targetId: "IngotIntuition" },

    // 4. Swing Harder (9, 34) to All-Round Bomber (5, 49) & Arsenal Advancement (14, 50)
    { d: "M 10 10 L 6 10 L 6 15", sourceId: "SwingHarder", targetId: "AllRoundBomber" },
    { d: "M 10 10 L 14 10 L 14 15", sourceId: "SwingHarder", targetId: "ArsenalAdvancement" },

    // 5. Ingot Intuition (27, 34) to Wait My Crits Can Crit (23, 49) & Easy Progressor (32, 50)
    { d: "M 28 10 L 32 10 L 32 15", sourceId: "IngotIntuition", targetId: "WaitMyCritsCanCrit" },
    { d: "M 28 10 L 24 10 L 24 15", sourceId: "IngotIntuition", targetId: "EasyProgressor" },

    // 6. All-Round Bomber (5, 49) to PP Go Up (5, 62)
    { d: "M 6 15 L 6 20", sourceId: "AllRoundBomber", targetId: "PPGoUp" },

    // 7. Wait My Crits Can Crit (23, 49) to Gems & Chests (32, 62)
    { d: "M 32 15 L 32 20", sourceId: "WaitMyCritsCanCrit", targetId: "GemsAndChests" },

    // 8. PP Go Up (5, 62) to Super Damage (5, 77)
    { d: "M 6 20 L 6 25", sourceId: "PPGoUp", targetId: "SuperDamage" },

    // 9. Gems & Chests (32, 62) to Just Wait Faster (32, 77)
    { d: "M 32 20 L 32 25", sourceId: "GemsAndChests", targetId: "JustWaitFaster" },

    // 10. PP Go Up (5, 62) to Hefty Hammers (14, 93)
    { d: "M 6 20 L 14 20 L 14 30", sourceId: "PPGoUp", targetId: "HeftyHammers" },

    // 11. Gems & Chests (32, 62) to Relic Rampage (23, 93)
    { d: "M 32 20 L 24 20 L 24 30", sourceId: "GemsAndChests", targetId: "RelicRampage" },

    // 12. Hefty Hammers (14, 93) to Chronokeeper (14, 108)
    { d: "M 14 30 L 14 35", sourceId: "HeftyHammers", targetId: "Chronokeeper" },

    // 13. Relic Rampage (23, 93) to Gem Bomb (23, 108)
    { d: "M 24 30 L 24 35", sourceId: "RelicRampage", targetId: "GemBomb" },

    // 14. Hefty Hammers (14, 93) to Mechanical Evolution (5, 117)
    { d: "M 14 30 L 6 30 L 6 40", sourceId: "HeftyHammers", targetId: "MechanicalEvolution" },

    // 15. Relic Rampage (23, 93) to Treasure Hunter (32, 117)
    { d: "M 24 30 L 32 30 L 32 40", sourceId: "RelicRampage", targetId: "TreasureHunter" },

    // 16. Chronokeeper (14, 108) to Demolition Expert (14, 125)
    { d: "M 14 35 L 14 45", sourceId: "Chronokeeper", targetId: "DemolitionExpert" },

    // 17. Gem Bomb (23, 108) to Wait My Super Crits Can Crit (23, 125)
    { d: "M 24 35 L 24 45", sourceId: "GemBomb", targetId: "WaitMySuperCritsCanCrit" },

    // 18. Demolition Expert (14, 125) to Auto-Bomber (14, 141)
    { d: "M 14 45 L 14 50", sourceId: "DemolitionExpert", targetId: "AutoBomb" },

    // 19. Wait My Super Crits Can Crit (23, 125) to Perfect Gold (23, 141)
    { d: "M 24 45 L 24 50", sourceId: "WaitMySuperCritsCanCrit", targetId: "PerfectGold" },

    // 20. Auto-Bomber (14, 141) to Flamboyant Bombs (9, 156)
    { d: "M 14 50 L 10 50 L 10 55", sourceId: "AutoBomb", targetId: "FlamboyantBombs" },

    // 21. Perfect Gold (23, 141) to More Ore More Problems (27, 156)
    { d: "M 24 50 L 28 50 L 28 55", sourceId: "PerfectGold", targetId: "MoreOreMoreProblems" },

    // 22. Flamboyant Bombs (9, 156) to Free? That's A Great Price! (5, 172)
    { d: "M 10 55 L 5 55 L 5 60", sourceId: "FlamboyantBombs", targetId: "FreeThatsAGreatPrice" },

    // 23. More Ore More Problems (27, 156) to Wait My Ultra Crits Can Crit? (32, 172)
    { d: "M 28 55 L 33 55 L 33 60", sourceId: "MoreOreMoreProblems", targetId: "WaitMyUltraCritsCanCrit" },

    // 24. Free? That's A Great Price! (5, 172) to Do These Upgrades Ever End (14, 187)
    { d: "M 5 60 L 14 60 L 14 65", sourceId: "FreeThatsAGreatPrice", targetId: "DoTheseUpgradesEverEnd" },

    // 25. Wait My Ultra Crits Can Crit? (32, 172) to Optical Phenomenon (23, 187)
    { d: "M 33 60 L 24 60 L 24 65", sourceId: "WaitMyUltraCritsCanCrit", targetId: "OpticalPhenomenon" },

    // 26. Do These Upgrades Ever End (14, 187) to Have You Tried Getting Luckier? (14, 203)
    { d: "M 14 65 L 14 70", sourceId: "DoTheseUpgradesEverEnd", targetId: "HaveYouTriedGettingLuckier" },

    // 27. Optical Phenomenon (23, 187) to Stonks (23, 203)
    { d: "M 24 65 L 24 70", sourceId: "OpticalPhenomenon", targetId: "Stonks" },

    // 28. Have You Tried Getting Luckier? (14, 203) to Gasoline Guzzler (5, 214)
    { d: "M 14 70 L 4 70 L 4 75", sourceId: "HaveYouTriedGettingLuckier", targetId: "GasolineGuzzler" },

    // 29. Stonks (23, 203) to I Have Wares, If You Have Coin (32, 214)
    { d: "M 24 70 L 34 70 L 34 75", sourceId: "Stonks", targetId: "IHaveWaresIfYouHaveCoin" },

    // 30. Gasoline Guzzler (5, 214) to Y'all Got Any More Of Them Veins? (9, 229)
    { d: "M 4 75 L 8 75 L 8 85", sourceId: "GasolineGuzzler", targetId: "VeinmorpherBomb" },

    // 31. I Have Wares, If You Have Coin (32, 214) to Saving For A Rainy Day (27, 229)
    { d: "M 34 75 L 30 75 L 30 85", sourceId: "IHaveWaresIfYouHaveCoin", targetId: "SavingForARainyDay" },

    // 32. VeinmorpherBomb (9, 229) to Who's Asking For All These Bars? (9, 215)
    { d: "M 8 85 L 12 85 L 12 80", sourceId: "VeinmorpherBomb", targetId: "WhosAskingForAllTheseBars" },

    // 33. Saving For A Rainy Day (27, 229) to I'm Running Out Of Creative Names (27, 215)
    { d: "M 30 85 L 26 85 L 26 80", sourceId: "SavingForARainyDay", targetId: "ImRunningOutOfCreativeNames" },

    // 34. Who's Asking For All These Bars? (9, 215) to Tons Of Damage (14, 234)
    { d: "M 12 80 L 16 80 L 16 90", sourceId: "WhosAskingForAllTheseBars", targetId: "TonsOfDamage" },

    // 35. I'm Running Out Of Creative Names (27, 215) to Ctrl+F 'Stars' (23, 234)
    { d: "M 26 80 L 21 80 L 21 90", sourceId: "ImRunningOutOfCreativeNames", targetId: "CtrlF" },

    // 36. Tons Of Damage (14, 234) to Block Bonker (14, 243)
    { d: "M 16 90 L 16 95", sourceId: "TonsOfDamage", targetId: "BlockBonker" },

    // 37. Ctrl+F 'Stars' (23, 234) to Avada Keda-' (23, 243)
    { d: "M 21 90 L 21 95", sourceId: "CtrlF", targetId: "AvadaKeda" },

    // 38. Tons Of Damage (14, 234) to This Is Gonna Take A While.. (9, 250)
    { d: "M 16 90 L 9 90 L 9 100", sourceId: "TonsOfDamage", targetId: "Polychrome" },

    // 39. Ctrl+F 'Stars' (23, 234) to Three's A Crowd (27, 250)
    { d: "M 21 90 L 29 90 L 29 100", sourceId: "CtrlF", targetId: "ThreesACrowd" },

    // 40. Gasoline Guzzler (5, 214) to Fishing With Friends (3, 255)
    { d: "M 4 75 L 4 105", sourceId: "GasolineGuzzler", targetId: "FishingWithFriends" },

    // 41. Polychrome (9, 250) to Take it back now y'all (9, 259)
    { d: "M 9 100 L 9 110", sourceId: "Polychrome", targetId: "TakeItBackNowYall" },

    // 42. PolychromePower (18, 266) to Leprechaun's Legacy (27, 259)
    { d: "M 19 120 L 29 120 L 29 110", sourceId: "PolychromePower", targetId: "LeprechaunsLegacy" },

    // 43. I Have Wares, If You Have Coin (32, 214) to Let's Pick Up The Pace (35, 255)
    { d: "M 34 75 L 34 105", sourceId: "IHaveWaresIfYouHaveCoin", targetId: "LetsPickUpThePace" },

    // 44. Fishing With Friends (3, 255) to Friendship Ended With Tier 1 Items (3, 263)
    { d: "M 4 105 L 4 115", sourceId: "FishingWithFriends", targetId: "FriendshipEndedWithTier1Items" },

    // 45. Polychrome (9, 250) to Polychrome Power (18, 266)
    { d: "M 9 100 L 19 100 L 19 120", sourceId: "Polychrome", targetId: "PolychromePower" },

    // 46. Let's Pick Up The Pace (35, 255) to With This Fish I Summon Two More Fish (35, 263)
    { d: "M 34 105 L 34 115", sourceId: "LetsPickUpThePace", targetId: "WithThisFishISummonTwoMoreFish" },

    // 47. Friendship Ended With Tier 1 Items (3, 263) to Motley School (3, 271)
    { d: "M 4 115 L 4 125", sourceId: "FriendshipEndedWithTier1Items", targetId: "MotleySchool" },

    // 48. With This Fish I Summon Two More Fish (35, 263) to Completionist Gatekeeper (35, 271)
    { d: "M 34 112 L 34 125", sourceId: "WithThisFishISummonTwoMoreFish", targetId: "CompletionistGatekeeper" },

    // 49. Polychrome Power (18, 266) to Please Sir Don't Make Me Prestige Again (9, 278)
    { d: "M 19 120 L 8 120 L 8 130", sourceId: "PolychromePower", targetId: "PleaseSirDontMakeMePrestigeAgain" },

    // 50. Please Sir Don't Make Me Prestige Again (9, 278) to Insane In The Vein Gain (18, 278)
    { d: "M 8 130 L 19 130", sourceId: "PleaseSirDontMakeMePrestigeAgain", targetId: "InsaneInTheVeinGain" },

    // 51. Insane In The Vein Gain (18, 278) to Ctrl+C Ctrl+V Stars (27, 278)
    { d: "M 19 130 L 30 130", sourceId: "InsaneInTheVeinGain", targetId: "CtrlCCtrlV" },

    // 52. Insane In The Vein Gain (18, 278) to Flaming Veins (18, 290)
    { d: "M 19 130 L 19 135", sourceId: "InsaneInTheVeinGain", targetId: "FlamingVeins" },

    // 53. Ctrl+C Ctrl+V Stars (27, 278) to Astral Forge (27, 290)
    { d: "M 30 130 L 30 135", sourceId: "CtrlCCtrlV", targetId: "AstralForge" },

    // 54. Please Sir Don't Make Me Prestige Again (9, 278) to Anyone Up Lootin' They Bugs (9, 298)
    { d: "M 8 130 L 8 140", sourceId: "PleaseSirDontMakeMePrestigeAgain", targetId: "AnyoneUpLootinTheyBugs" },

    // 55. Anyone Up Lootin' They Bugs (9, 298) to Call Of The Void (18, 298)
    { d: "M 8 140 L 19 140", sourceId: "AnyoneUpLootinTheyBugs", targetId: "CallOfTheVoid" },

    // 56. Call Of The Void (18, 298) to Pond Yield (27, 298)
    { d: "M 19 140 L 30 140", sourceId: "CallOfTheVoid", targetId: "PondYield" },

    // 57. Call Of The Void (18, 298) to Frog Frenzy (18, 311)
    { d: "M 19 140 L 19 145", sourceId: "CallOfTheVoid", targetId: "FrogFrenzy" },

    // 58. Frog Frenzy (18, 311) to Why Are There Stars In My Mining Game (9, 311)
    { d: "M 19 145 L 8 145", sourceId: "FrogFrenzy", targetId: "WhyAreThereStarsInMyMiningGame" },

    // 59. Frog Frenzy (18, 311) to I Buried It Here (27, 311)
    { d: "M 19 145 L 30 145", sourceId: "FrogFrenzy", targetId: "IBuriedItHere" },

    // 60. Frog Frenzy (18, 311) to Idle Obelisk Mincer (18, 322)
    { d: "M 19 145 L 19 150", sourceId: "FrogFrenzy", targetId: "IdleObeliskMincer" }
  ]

  // Convert the static grid-based text coordinates into exact center pixels
  function convertGridPathToPixels(d: string): string {
    return d.replace(/([0-9.]+)\s+([0-9.]+)/g, (_, colStr, rowStr) => {
      const col = parseFloat(colStr)
      const row = parseFloat(rowStr)
      const x = (col - 0.5) * GRID_UNIT_PX
      const y = (row - 0.5) * GRID_UNIT_PX
      return `${x} ${y}`
    })
  }

  // ── Search & Filter ───────────────────────────────────────────────────────
  let filterText = $state('')
  const normalizedFilter = $derived(filterText.trim().toLowerCase())

  function matchesFilter(skill: SkillNode, q: string): boolean {
    if (!q) return true
    if (skill.name.toLowerCase().includes(q)) return true
    if (skill.bonuses.some(b => b.label.toLowerCase().includes(q))) return true
    return false
  }

  const matchingSkillIds = $derived(
    new Set(
      ALL_SKILLS
        .filter(s => matchesFilter(s, normalizedFilter))
        .map(s => s.id)
    )
  )

  // ── Prerequisite Path Tracking ────────────────────────────────────────────
  function getPrerequisitePath(skillId: string): string[] {
    const path: string[] = []
    let currentId = SKILL_COORDINATES[skillId]?.prereqId
    while (currentId) {
      path.unshift(currentId)
      currentId = SKILL_COORDINATES[currentId]?.prereqId
    }
    return path
  }

  // Recursive helper to find and reset all descendants of a refunded skill
  function refundSkillCascading(skillId: string, updates: Record<string, number> = {}): Record<string, number> {
    updates[skillId] = 0

    // Find all skills that have this skill as their prerequisite
    for (const [childId, config] of Object.entries(SKILL_COORDINATES)) {
      if (config.prereqId === skillId) {
        const childLevel = $skillProgress[childId] ?? 0
        if (childLevel > 0) {
          // Recursively cascade the refund down the branches
          refundSkillCascading(childId, updates)
        }
      }
    }
    return updates
  }

  function isUnlocked(id: string, currentProgress: Record<string, number>): boolean {
    const config = SKILL_COORDINATES[id]
    if (!config || !config.prereqId) return true
    const prereqLevel = currentProgress[config.prereqId] ?? 0
    return prereqLevel > 0
  }

  // ── SP Stats ─────────────────────────────────────────────────────────────
  const spSpent = $derived(
    ALL_SKILLS.reduce((acc, skill) => {
      const level = $skillProgress[skill.id] ?? 0
      for (let i = 0; i < level; i++) acc += skill.costs[i] ?? 0
      return acc
    }, 0)
  )

  const ownedCount = $derived(
    ALL_SKILLS.filter(s => ($skillProgress[s.id] ?? 0) > 0).length
  )

  // ── Selected Node State ───────────────────────────────────────────────────
  let selectedSkillId = $state('LuckyStrikes')
  const selectedSkill = $derived(
    ALL_SKILLS.find(s => s.id === selectedSkillId) ?? ALL_SKILLS[0]
  )

  // ── Skill Interactions (With Cascading Unlock) ────────────────────────────
  function purchaseSkillCascading(skill: SkillNode): void {
    const path = getPrerequisitePath(skill.id)
    const updates: Record<string, number> = {}

    // Ensure all prerequisites on the direct branch are unlocked at level 1
    for (const prereqId of path) {
      const currentLevel = $skillProgress[prereqId] ?? 0
      if (currentLevel === 0) {
        updates[prereqId] = 1
      }
    }

    const currentLevel = $skillProgress[skill.id] ?? 0
    if (currentLevel < skill.costs.length) {
      updates[skill.id] = currentLevel + 1
    }

    if (Object.keys(updates).length > 0) {
      skillProgress.update(s => ({ ...s, ...updates }))
    }
  }

  function cycleDown(skill: SkillNode, e?: Event): void {
    if (e) e.preventDefault()
    const current = $skillProgress[skill.id] ?? 0
    if (current === 0) return

    const nextLevel = current - 1
    if (nextLevel === 0) {
      // Cascade refund all descending skills
      const updates: Record<string, number> = {}
      refundSkillCascading(skill.id, updates)
      skillProgress.update(s => ({ ...s, ...updates }))
    } else {
      // Decrement level normally for multi-level skills
      setSkillLevel(skill.id, nextLevel)
    }
  }

  function handleRightClick(skill: SkillNode, e: MouseEvent): void {
    e.preventDefault()
    selectedSkillId = skill.id
    purchaseSkillCascading(skill)
  }

  // ── Connection Paths Calculation (Svelte 5 Reactive derived block) ───────
  interface ConnectionPath {
    id: string
    pathD: string
    isActive: boolean
    isUnlocked: boolean
    isHidden: boolean
  }

  const connections = $derived(
    TREE_PATHS.map((path): ConnectionPath => {
      const parentLevel = $skillProgress[path.sourceId] ?? 0
      const childLevel = $skillProgress[path.targetId] ?? 0

      const isActive = parentLevel > 0 && childLevel > 0
      const isPathUnlocked = parentLevel > 0 && childLevel === 0

      return {
        id: `${path.sourceId}-${path.targetId}`,
        pathD: convertGridPathToPixels(path.d),
        isActive,
        isUnlocked: isPathUnlocked,
        isHidden: normalizedFilter !== '' && (!matchingSkillIds.has(path.sourceId) || !matchingSkillIds.has(path.targetId))
      }
    })
  )
</script>

<div class="page flex-layout">
  <PageHeader
    title="Skill Tree"
    description="Inspect and unlock your permanent perks. Click to select, right-click to instantly purchase (with automatic prerequisite unlocking)."
  />

  <!-- SP summary bar -->
  <div class="summary-grid">
    <ResultCard label="SP spent" value={spSpent.toLocaleString()} />
    <ResultCard label="of {ALL_SKILLS.length} owned" value={ownedCount.toString()} />
    <ResultCard label="SP to max all" value={TOTAL_SP.toLocaleString()} />
  </div>

  <!-- Search Toolbar -->
  <div class="toolbar">
    <div class="search-wrap">
      <Search size={16} class="search-icon" aria-hidden="true" />
      <input
        type="search"
        class="filter-input"
        bind:value={filterText}
        placeholder="Filter skills by effect or name…"
        autocomplete="off"
        spellcheck="false"
        inputmode="search"
        aria-label="Filter skills"
      />
    </div>
  </div>

  <!-- Tree Viewport & HUD Wrapper -->
  <div class="tree-wrapper">
    <!-- Viewport Container -->
    <div class="tree-viewport" style="--grid-unit: {GRID_UNIT_PX}px;">
      <div class="tree-container" class:list-mode={normalizedFilter !== ''}>

        <!-- SVG Connection Lines Layer (with elbow joints) -->
        {#if normalizedFilter === ''}
        <svg class="tree-svg" aria-hidden="true">
          <defs>
            <linearGradient id="active-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#ff9900" />
              <stop offset="100%" stop-color="#cc6600" />
            </linearGradient>
          </defs>
          {#each connections as conn (conn.id)}
            <path
              d={conn.pathD}
              class="tree-line"
              class:unlocked={conn.isUnlocked}
              class:active={conn.isActive}
              class:hidden={conn.isHidden}
            />
          {/each}
        </svg>{/if}

        <!-- Interactive Skill Nodes Grid -->
        {#each ALL_SKILLS as skill (skill.id)}
          {@const coord = SKILL_COORDINATES[skill.id]}
          {#if coord}
            {@const level = $skillProgress[skill.id] ?? 0}
            {@const owned = level > 0}
            {@const maxLevel = skill.costs.length}
            {@const locked = !isUnlocked(skill.id, $skillProgress)}
            {@const isHidden = normalizedFilter !== '' && !matchingSkillIds.has(skill.id)}

            <button
              type="button"
              class="tree-node"
              class:selected={selectedSkillId === skill.id}
              class:owned
              class:locked
              class:hidden={isHidden}
              style:left={normalizedFilter === '' ? `calc(${coord.x - 1.75} * var(--grid-unit))` : undefined}
              style:top={normalizedFilter === '' ? `calc(${coord.y - 1.75} * var(--grid-unit))` : undefined}
              style:width="calc({NODE_CELL_SIZE} * var(--grid-unit))"
              style:height="calc({NODE_CELL_SIZE} * var(--grid-unit))"
              onclick={() => selectedSkillId = skill.id}
              oncontextmenu={(e) => handleRightClick(skill, e)}
              aria-label="{skill.name}, Level {level} of {maxLevel}"
            >
              <div class="node-border-outer">
                <div class="node-icon-bg">
                  <WikiIcon filename={skill.image} size={52} alt="" />
                </div>
              </div>

              <!-- Prerequisite Locked Indicator -->
              {#if locked}
                <div class="lock-indicator" aria-label="Locked">
                  <Lock size={14} />
                </div>
              {/if}

              <!-- Allocation Level Badge -->
              {#if owned}
                <div class="node-level-badge" class:maxed={level === maxLevel}>
                  {level}/{maxLevel}
                </div>
              {/if}
            </button>
          {/if}
        {/each}
      </div>
    </div>

    <!-- Bottom Sticky Details HUD Console -->
    {#if selectedSkill}
      {@const level = $skillProgress[selectedSkill.id] ?? 0}
      {@const maxLevel = selectedSkill.costs.length}
      {@const owned = level > 0}
      {@const isMulti = maxLevel > 1}
      {@const nextCost = level < maxLevel ? selectedSkill.costs[level] : null}
      {@const locked = !isUnlocked(selectedSkill.id, $skillProgress)}

      <div class="details-console">
        <div class="console-body">
          
          <!-- Left details: Icon + Name + Descriptions -->
          <div class="console-info">
            <div class="console-identity">
              <div class="console-icon">
                <WikiIcon filename={selectedSkill.image} size={36} alt="" />
              </div>
              <div class="console-text">
                <h3 class="console-name">{selectedSkill.name}</h3>
                <span class="console-level">
                  {#if isMulti}
                    Level {level} / {maxLevel}
                  {:else if owned}
                    Purchased
                  {:else}
                    Not Owned
                  {/if}
                </span>
              </div>
            </div>
            <ul class="console-bonuses">
              {#each selectedSkill.bonuses as bonus}
                <li>
                  {#if bonus.statKey}
                    <StatTooltip derivedStatKey={bonus.statKey} value={undefined} label={bonus.label} />
                  {:else}
                    {bonus.label}
                  {/if}
                </li>
              {/each}
            </ul>
          </div>

          <!-- Right details: Progression Controls -->
          <div class="console-controls">
            
            <div class="global-actions">
              <Button variant="ghost" onclick={maxAllSkills}>
                Max All
              </Button>
              <Button variant="danger-outline" onclick={resetAllSkills} disabled={ownedCount === 0}>
                Reset All
              </Button>
            </div>

            <div class="button-group">
              {#if owned}
                <Button variant="ghost" onclick={(e) => cycleDown(selectedSkill, e)}>
                  Refund Level
                </Button>
              {/if}

              {#if locked}
                <Button variant="primary" onclick={() => purchaseSkillCascading(selectedSkill)}>
                  Auto-Unlock Prerequisites
                </Button>
              {:else if level === maxLevel}
                <Button disabled>
                  Maxed
                </Button>
              {:else}
                <Button variant="primary" onclick={() => purchaseSkillCascading(selectedSkill)}>
                  Purchase ({nextCost} SP)
                </Button>
              {/if}
            </div>

            {#if selectedSkill.obeliskLevel}
              <span class="obelisk-req">
                Requires Obelisk Level {selectedSkill.obeliskLevel}
              </span>
            {/if}
          </div>

        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  /* ── Page Flow Structure ────────────────────────────── */
  .flex-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  /* ── Summary bar ────────────────────────────────────── */
  .summary-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: var(--space-4);
    margin-bottom: var(--space-6);
  }

  /* ── Toolbar ────────────────────────────────────────── */
  .toolbar {
    margin-bottom: var(--space-6);
  }

  .search-wrap {
    position: relative;
  }

  :global(.search-icon) {
    position: absolute;
    left: var(--space-3);
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-muted);
    pointer-events: none;
  }

  .filter-input {
    width: 100%;
    font-family: var(--font-mono);
    font-size: var(--text-base);
    color: var(--text-primary);
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: var(--space-2) var(--space-3) var(--space-2) calc(var(--space-3) * 2 + 16px);
    min-height: 44px;
    transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
  }
  .filter-input:focus {
    outline: none;
    border-color: var(--border-accent);
    box-shadow: var(--shadow-glow);
  }

  /* ── Tree Viewport & Grid Layout ───────────────────── */
  .tree-wrapper {
    position: relative;
    width: 100%;
  }

  .tree-viewport {
    width: 100%;
    overflow-x: auto;
    background-color: #1c140e; /* Warm consistent space background color */
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    /* 160px bottom padding gives space to scroll past the overlapping HUD */
    padding: var(--space-8) 0 160px 0;
    position: relative;
    box-shadow: inset 0 4px 20px rgba(0, 0, 0, 0.9);
  }

  .tree-container {
    margin: 0 auto;
    position: relative;
    width: calc(37 * var(--grid-unit));
    height: calc(154 * var(--grid-unit));
  }

  /* ── SVG Connection Pathways ────────────────────────── */
  .tree-svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  }

  .tree-line {
    fill: none; /* Prevents visual filling of rounded paths */
    stroke: #44352a; /* High contrast, warm charcoal-bronze for locked lines */
    stroke-width: calc(0.12 * var(--grid-unit));
    stroke-linejoin: round; /* Perfectly round 90 degree elbows */
    stroke-linecap: round;
    transition: stroke 0.3s, stroke-width 0.3s, opacity 0.3s, visibility 0.3s;
  }

  /* Connection line unlocked state (pathway open) */
  .tree-line.unlocked {
    stroke: #aa7a59; /* Rich copper-bronze */
    stroke-width: calc(0.12 * var(--grid-unit));
  }

  /* Connection line active state (both nodes owned) */
  .tree-line.active {
    stroke: #ff9900;
    stroke-width: calc(0.15 * var(--grid-unit));
    filter: drop-shadow(0 0 calc(0.1 * var(--grid-unit)) rgba(255, 153, 0, 0.4));
  }

  .tree-line.hidden {
    opacity: 0;
    visibility: hidden;
  }

  /* ── Node Component styling ────────────────────────── */
  .tree-node {
    position: absolute;
    border-radius: 50%;
    border: none;
    background: none;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 2;
    transition: transform var(--transition-fast), opacity var(--transition-fast), visibility var(--transition-fast);
  }

  .tree-node:hover:not(.locked) {
    transform: scale(1.1);
  }

  .node-border-outer {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #2b221a;
    border: calc(0.12 * var(--grid-unit)) solid #5a493b;
    box-shadow: 
      0 calc(0.1 * var(--grid-unit)) calc(0.2 * var(--grid-unit)) rgba(0, 0, 0, 0.7),
      inset 0 0 calc(0.3 * var(--grid-unit)) rgba(0, 0, 0, 0.9);
    padding: calc(0.08 * var(--grid-unit));
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
  }

  .node-icon-bg {
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, #3d3127 0%, #1a1410 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  /* Status overrides */
  .tree-node.owned .node-border-outer {
    border-color: #39e639;
    box-shadow: 
      0 calc(0.1 * var(--grid-unit)) calc(0.2 * var(--grid-unit)) rgba(0, 0, 0, 0.7),
      0 0 calc(0.15 * var(--grid-unit)) rgba(57, 230, 57, 0.25),
      inset 0 0 calc(0.3 * var(--grid-unit)) rgba(0, 0, 0, 0.9);
  }

  .tree-node.selected .node-border-outer {
    border-color: #ffb300;
    box-shadow: 
      0 0 calc(0.3 * var(--grid-unit)) rgba(255, 179, 0, 0.7),
      inset 0 0 calc(0.2 * var(--grid-unit)) rgba(255, 179, 0, 0.4);
    animation: pulse-ring 1.8s infinite alternate ease-in-out;
  }

  @keyframes pulse-ring {
    0% { transform: scale(1.0); }
    100% { transform: scale(1.04); }
  }

  .tree-node.locked {
    opacity: 0.45;
  }

  /* Switches layout to a wrapped list when searching */
  .tree-container.list-mode {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-6);
    padding: var(--space-6);
    justify-content: center;
  }

  /* Removes absolute positioning so they flow normally */
  .tree-container.list-mode .tree-node {
    position: relative;
  }

  .tree-node.hidden {
    display: none; /* Completely removes non-matching nodes from the layout */
  }

  /* Lock Badge Overlay */
  .lock-indicator {
    position: absolute;
    top: calc(-0.1 * var(--grid-unit));
    right: calc(-0.1 * var(--grid-unit));
    width: calc(1.0 * var(--grid-unit));
    height: calc(1.0 * var(--grid-unit));
    background: #201712;
    border: 1.5px solid #e7423c;
    border-radius: 50%;
    color: #e7423c;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }

  /* Skill Node Level badge */
  .node-level-badge {
    position: absolute;
    bottom: calc(-0.2 * var(--grid-unit));
    right: calc(-0.2 * var(--grid-unit));
    background: #15110e;
    border: 1.5px solid #ffcc00;
    color: #ffcc00;
    font-family: var(--font-mono);
    font-size: calc(0.5 * var(--grid-unit));
    font-weight: var(--weight-bold);
    border-radius: 4px;
    padding: calc(0.02 * var(--grid-unit)) calc(0.08 * var(--grid-unit));
    line-height: 1.2;
    box-shadow: 0 2px 4px rgba(0,0,0,0.6);
  }

  .node-level-badge.maxed {
    border-color: #39e639;
    color: #39e639;
  }

  /* ── Bottom HUD Details Console Panel ───────────────── */
  .details-console {
    /* Use sticky behavior relative to the tree-wrapper container. */
    position: sticky;
    bottom: 0;
    background: rgba(18, 14, 11, 0.95);
    border: 1px solid #5a493b;
    border-radius: var(--radius-lg);
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.85);
    z-index: var(--z-toast);
    padding: var(--space-4) var(--space-6);
    /* Float it natively over the end padding area of the viewport. */
    margin-top: -140px;
  }

  .console-body {
    max-width: var(--content-max-width);
    margin: 0 auto;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-6);
    flex-wrap: wrap;
  }

  .console-info {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    flex: 1;
    min-width: 280px;
  }

  .console-identity {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }

  .console-icon {
    width: 44px;
    height: 44px;
    background: #2b221a;
    border: 2px solid #5a493b;
    border-radius: var(--radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.8);
  }

  .console-text {
    display: flex;
    flex-direction: column;
  }

  .console-name {
    font-family: var(--font-display);
    font-size: var(--text-base);
    font-weight: var(--weight-bold);
    color: var(--accent);
    line-height: var(--leading-tight);
  }

  .console-level {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--text-muted);
    margin-top: 3px;
  }

  .console-bonuses {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .console-bonuses li {
    font-size: var(--text-sm);
    color: var(--text-muted);
    line-height: var(--leading-snug);
  }

  .console-bonuses li::before {
    content: '• ';
    color: var(--accent);
    margin-right: var(--space-1);
  }

  .console-controls {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: var(--space-2);
    min-width: 180px;
  }

  .global-actions {
    display: flex;
    gap: var(--space-2);
    width: 100%;
    justify-content: flex-end;
    margin-bottom: var(--space-2);
  }

  .button-group {
    display: flex;
    gap: var(--space-2);
    width: 100%;
    justify-content: flex-end;
  }

  .obelisk-req {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--error);
    letter-spacing: 0.04em;
  }
</style>
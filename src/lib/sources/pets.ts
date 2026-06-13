import type { Op, Source } from '$lib/engine/types'

// Pet sources own all pet effect numbers. Base pet bonuses scale per pet level
// (maxLevel undefined); skins are binary (maxLevel 1); quests rank to 10. Pets
// that feed several stats use one Source object per stat sharing the key.
// statKey/op mirror the formula wiring (consistency test enforces op where used);
// unwired pet effects with a clear registry stat still carry it. Reduction
// sources (floor clear, bar craft) use a signed fn matching the original.

const pet = (
  key: string,
  name: string,
  maxLevel: number | undefined,
  statKey: string | undefined,
  op: Op | undefined,
  fn: Source['fn'],
): Source => ({
  key: `pets.${key}`,
  name,
  system: 'pets',
  maxLevel,
  statKey,
  op,
  fn,
  inputs: [],
})

// ─── Crab (max 25) ────────────────────────────────────────────────────────────

export const petCrabBombCap = pet('crab', 'Pet: Crab (Bomb Capacity)', undefined, 'bomb_capacity', '+', (n) => n * 0.03)
export const petCrabBombRecharge = pet('crab', 'Pet: Crab (Bomb Recharge)', undefined, 'bomb_recharge_speed', '+', (n) => n * 0.01)
export const petCrabSkinWorkshopCap = pet('crabSkin', 'Pet Skin: Crab (Workshop Cap)', 1, 'bomb_workshop_cap_increase', '+', (o) => o)
export const petCrabQuestBomBofPlenty = pet('crabQuest', 'Pet Quest: Crab (Plenty Bomb Multi)', 10, 'bomb_of_plenty_multi', '+', (n) => n * 0.5)
// TODO no registry key: 'Exp Bomb Multiplies +0.5× per Rank' (Crab quest)

// ─── Dwarf (max 20) ───────────────────────────────────────────────────────────

export const petDwarfPickaxeDmg = pet('dwarf', 'Pet: Dwarf (Pickaxe Damage)', undefined, 'pickaxe_damage', '+', (n) => n * 0.2)
export const petDwarfUltraCrit = pet('dwarf', 'Pet: Dwarf (Ultra Crit)', undefined, 'pickaxe_ultra_crit_chance', '+', (n) => n * 0.01)
export const petDwarfSkinPickaxeDmg = pet('dwarfSkin', 'Pet Skin: Dwarf (Pickaxe Damage)', 1, 'pickaxe_damage', '+', (o) => o * 0.5)
export const petDwarfQuestPrestigePts = pet('dwarfQuest', 'Pet Quest: Dwarf (Prestige Points)', 10, 'prestige_point_multi', '+', (n) => n * 0.12)
export const petDwarfQuestFloorClear = pet('dwarfQuest', 'Pet Quest: Dwarf (Floor Clear)', 10, 'floor_clear_requirement_multi', '+', (n) => n * -0.02)

// ─── Duck (max 20) ────────────────────────────────────────────────────────────

export const petDuckExp = pet('duck', 'Pet: Duck (EXP Gain)', undefined, 'experience_multi', '+', (n) => n * 0.12)
export const petDuckLootbugSpawn = pet('duck', 'Pet: Duck (Lootbug Spawn)', undefined, 'lootbug_spawn_rate', '+', (n) => n * 0.025)
export const petDuckSkinObeliskArmor = pet('duckSkin', 'Pet Skin: Duck (Obelisk Armor)', 1, 'obelisk_armor_reduction', '+', (o) => o * 0.1)
export const petDuckQuestVeinIncome = pet('duckQuest', 'Pet Quest: Duck (Vein Income)', 10, 'vein_income_multi', '+', (n) => n * 0.02)
export const petDuckQuestGoldenVeinMul = pet('duckQuest', 'Pet Quest: Duck (Golden Vein Multi)', 10, 'golden_vein_multi', '+', (n) => n * 0.02)

// ─── Rabbit (max 20) ──────────────────────────────────────────────────────────

export const petRabbitContractCost = pet('rabbit', 'Pet: Rabbit (Contract Cost)', undefined, 'contract_upgrade_cost_reduction', '+', (n) => n * 0.03)
export const petRabbitSkinContractPoints = pet('rabbitSkin', 'Pet Skin: Rabbit (Contract Points)', 1, 'contract_points_rewarded', '+', (o) => o)
export const petRabbitQuest5xContract = pet('rabbitQuest', 'Pet Quest: Rabbit (5× Contract Chance)', 10, 'contract_5x_points_chance', '+', (n) => n * 0.01)
export const petRabbitQuestContractCost = pet('rabbitQuest', 'Pet Quest: Rabbit (Contract Cost)', 10, 'contract_upgrade_cost_reduction', '+', (n) => n * 0.01)

// ─── Penguin (max 20) ─────────────────────────────────────────────────────────

export const petPenguinGoldenFloor = pet('penguin', 'Pet: Penguin (Golden Floor Multi)', undefined, 'golden_floor_multi', '+', (n) => n * 0.05)
export const petPenguinSkinOreSell = pet('penguinSkin', 'Pet Skin: Penguin (Ore Sell Price)', 1, 'ore_sell_price_multi', '+', (o) => o * 0.5)
export const petPenguinQuestGoldenFloor = pet('penguinQuest', 'Pet Quest: Penguin (Golden Floor Multi)', 10, 'golden_floor_multi', '+', (n) => n * 0.02)
export const petPenguinQuestRainbowFloor = pet('penguinQuest', 'Pet Quest: Penguin (Rainbow Floor Chance)', 10, 'rainbow_floor_chance', '+', (n) => n * 0.0025)

// ─── Axolotl (max 20) ─────────────────────────────────────────────────────────

export const petAxolotlDoubleCraft = pet('axolotl', 'Pet: Axolotl (Double Craft)', undefined, 'double_craft_chance', '+', (n) => n * 0.02)
export const petAxolotlBarCraft = pet('axolotl', 'Pet: Axolotl (Bar Craft Cost)', undefined, 'bar_craft_cost_multi', '+', (n) => n * -0.01)
export const petAxolotlSkinFuelDuration = pet('axolotlSkin', 'Pet Skin: Axolotl (Fuel Duration)', 1, 'coal_fuel_duration_multi', '+', (o) => o * 0.1)
export const petAxolotlQuestArchFragment = pet('axolotlQuest', 'Pet Quest: Axolotl (Arch Fragment)', 10, 'archaeology_fragment_gain_multi', '+', (n) => n * 0.03)
export const petAxolotlQuestSupernovaMul = pet('axolotlQuest', 'Pet Quest: Axolotl (Supernova Multi)', 10, 'star_supernova_multi', '+', (n) => n * 0.03)

// ─── Whale (max 20) ───────────────────────────────────────────────────────────

export const petWhalePickaxeDmg = pet('whale', 'Pet: Whale (Pickaxe Damage)', undefined, 'pickaxe_damage', '+', (n) => n * 0.1)
export const petWhaleLootbugTriple = pet('whale', 'Pet: Whale (Triple Lootbug)', undefined, 'lootbug_triple_chance', '+', (n) => n * 0.03)
export const petWhaleSkinLootbugGem = pet('whaleSkin', 'Pet Skin: Whale (Lootbug Gem Cost)', 1, 'lootbug_gem_cost_reduction', '+', (o) => o * 2)
export const petWhaleQuestGemBombGem = pet('whaleQuest', 'Pet Quest: Whale (Gem Bomb Gem Chance)', 10, 'gem_bomb_gem_chance', '+', (n) => n * 0.001)
export const petWhaleQuestLootbugBank = pet('whaleQuest', 'Pet Quest: Whale (Lootbug Bank Cap)', 10, 'lootbug_bank_cap', '+', (n) => n)

// ─── Totem (max 25) ───────────────────────────────────────────────────────────

export const petTotemVeinSpawn = pet('totem', 'Pet: Totem (Vein Spawn)', undefined, 'vein_spawn_rate_multi', '+', (n) => n * 0.03)
export const petTotemGoldenVeinChance = pet('totem', 'Pet: Totem (Golden Vein Chance)', undefined, 'golden_vein_chance', '+', (n) => n * 0.01)
export const petTotemGoldenVeinMul = pet('totem', 'Pet: Totem (Golden Vein Multi)', undefined, 'golden_vein_multi', '+', (n) => n * 0.01)
export const petTotemSkinRainbowVein = pet('totemSkin', 'Pet Skin: Totem (Rainbow Vein Chance)', 1, 'rainbow_vein_chance', '+', (o) => o * 0.02)
export const petTotemQuestDroneExp = pet('totemQuest', 'Pet Quest: Totem (Drone Exp)', 10, 'coal_drone_exp_multi', '+', (n) => n * 0.04)
export const petTotemQuestChainDroneCap = pet('totemQuest', 'Pet Quest: Totem (Chain Drone Cap)', 10, 'drone_chain_grade_cap_increase', '+', (n) => n * 2)

// ─── Happy-Bot (max 20) ───────────────────────────────────────────────────────

export const petHappyBotArtifactT4Cap = pet('happyBot', 'Pet: Happy-Bot (T4 Artifact Cap)', undefined, 'artifact_tier4_cap_increase', '+', (n) => n)
export const petHappyBotSkinContractCap = pet('happyBotSkin', 'Pet Skin: Happy-Bot (Contract Cap)', 1, 'contract_cap_increase', '+', (o) => o)
export const petHappyBotQuestPolyOre = pet('happyBotQuest', 'Pet Quest: Happy-Bot (Poly Ore)', 10, 'polychrome_card_bonus_ore', '×1+', (n) => n * 0.02)
export const petHappyBotQuestPolyStar = pet('happyBotQuest', 'Pet Quest: Happy-Bot (Poly Star)', 10, 'polychrome_card_bonus_star', '×1+', (n) => n * 0.02)
export const petHappyBotQuestPolyVein = pet('happyBotQuest', 'Pet Quest: Happy-Bot (Poly Vein)', 10, 'polychrome_card_bonus_vein', '×1+', (n) => n * 0.02)
export const petHappyBotQuestFreebieBank = pet('happyBotQuest', 'Pet Quest: Happy-Bot (Freebie Bank)', 10, 'freebie_bank_cap', '+', (n) => n)

// ─── Leprechaun (max 25) ──────────────────────────────────────────────────────

export const petLeprechaunGameSpeed = pet('leprechaun', 'Pet: Leprechaun (Game Speed)', undefined, 'game_speed_multi', '+', (n) => n * 0.015)
export const petLeprechaunGoldenFloor = pet('leprechaun', 'Pet: Leprechaun (Golden Floor Multi)', undefined, 'golden_floor_multi', '+', (n) => n * 0.0125)
export const petLeprechaunRainbowFloor = pet('leprechaun', 'Pet: Leprechaun (Rainbow Floor Chance)', undefined, 'rainbow_floor_chance', '+', (n) => n * 0.0025)
export const petLeprechaunSkinRainbowFloor = pet('leprechaunSkin', 'Pet Skin: Leprechaun (Rainbow Floor)', 1, 'rainbow_floor_chance', '+', (o) => o * 0.01)
export const petLeprechaunQuestGalacticMul = pet('leprechaunQuest', 'Pet Quest: Leprechaun (Galactic Floor Multi)', 10, 'galactic_floor_multi', '+', (n) => n * 0.04)
export const petLeprechaunQuestTransmuterBop = pet('leprechaunQuest', 'Pet Quest: Leprechaun (Transmuter BoP)', 10, 'bomb_trans_apply_bop_chance', '+', (n) => n * 0.02)

// ─── Starfish (max 25) ────────────────────────────────────────────────────────

export const petStarfishSuper10xChance = pet('starfish', 'Pet: Starfish (Super 10x Chance)', undefined, 'super_star_10x_chance', '+', (n) => n * 0.002)
export const petStarfishSupernovaChance = pet('starfish', 'Pet: Starfish (Supernova Chance)', undefined, 'super_star_supernova_chance', '+', (n) => n * 0.002)
export const petStarfishSkinStarSpawn = pet('starfishSkin', 'Pet Skin: Starfish (Star Spawn Rate)', 1, 'star_spawn_rate', '+', (o) => o * 0.1)
export const petStarfishQuestNovagiant = pet('starfishQuest', 'Pet Quest: Starfish (Novagiant Multi)', 10, 'novagiant_combo_multi', '+', (n) => n * 0.03)
export const petStarfishQuestCapricornCap = pet('starfishQuest', 'Pet Quest: Starfish (Capricorn Cap)', 10, 'star_capricorn_cap', '+', (n) => n)
// TODO no registry key: 'Ophiuchus Cap +1 per Rank' (Starfish quest)

// ─── Dino (max 25) ────────────────────────────────────────────────────────────

export const petDinoPickaxeDmg = pet('dino', 'Pet: Dino (Pickaxe Damage)', undefined, 'pickaxe_damage', '×', (n) => 1 + n * 0.2)
export const petDinoRainbowFloor = pet('dino', 'Pet: Dino (Rainbow Floor Multi)', undefined, 'rainbow_floor_multi', '+', (n) => n * 0.025)
// TODO no registry key: '+1 Pet Level Cap' (Dino skin); Idol cap quests

// ─── Mr Nibbles (max 25) ──────────────────────────────────────────────────────

export const petNibblesShinyFishMul = pet('mrNibbles', 'Pet: Mr Nibbles (Shiny Fish Multi)', undefined, 'fishing_shiny_multi', '+', (n) => n * 0.03)
export const petNibblesTripleTick = pet('mrNibbles', 'Pet: Mr Nibbles (Triple Tick)', undefined, 'fishing_triple_tick_chance', '+', (n) => n * 0.01)
export const petNibblesSkinShinyChance = pet('mrNibblesSkin', 'Pet Skin: Mr Nibbles (Shiny Chance)', 1, 'fishing_shiny_chance', '+', (o) => o * 0.02)
// TODO no registry key: 'Angler Drone Grade Cap +1 per Rank' (Mr Nibbles quest)
export const petNibblesQuestTier2Dock = pet('mrNibblesQuest', 'Pet Quest: Mr Nibbles (Tier 2 Dock)', 10, 'fishing_tier2_dock_multi', '+', (n) => n * 0.05)

// ─── Nagini (max 25) ──────────────────────────────────────────────────────────

export const petNaginiGoldenOreMul = pet('nagini', 'Pet: Nagini (Golden Ore Multi)', undefined, 'golden_ore_multi', '+', (n) => n * 0.05)
export const petNaginiAllFloorMul = pet('nagini', 'Pet: Nagini (All Floor Multi)', undefined, 'all_floor_multipliers', '+', (n) => n * 0.02)
export const petNaginiSkinGoldenOre = pet('naginiSkin', 'Pet Skin: Nagini (Golden Ore Chance)', 1, 'golden_ore_chance', '+', (o) => o * 0.02)
export const petNaginiQuestGoldenVoidChance = pet('naginiQuest', 'Pet Quest: Nagini (Golden Void Chance)', 10, 'golden_void_portal_chance', '+', (n) => n * 0.005)
export const petNaginiQuestGoldenVoidMul = pet('naginiQuest', 'Pet Quest: Nagini (Golden Void Multi)', 10, 'golden_void_portal_multi', '+', (n) => n * 0.05)

// ─── Butterfly (max 25) ───────────────────────────────────────────────────────

export const petButterflyGalacticChance = pet('butterfly', 'Pet: Butterfly (Galactic Floor Chance)', undefined, 'galactic_floor_chance', '+', (n) => n * 0.005)
export const petButterflyLootfrogTriple = pet('butterfly', 'Pet: Butterfly (Lootfrog Triple)', undefined, 'lootfrog_triple_spawn_chance', '+', (n) => n * 0.0035)
export const petButterflyRainbowPortal = pet('butterfly', 'Pet: Butterfly (Rainbow Portal)', undefined, 'rainbow_void_portal_chance', '+', (n) => n * 0.0025)
// TODO no registry key: 'Unlock Infernal Pet Cards' (Butterfly skin)
export const petButterflyQuestBigFrog = pet('butterflyQuest', 'Pet Quest: Butterfly (Big Frog Chance)', 10, 'lootfrog_big_chance', '+', (n) => n * 0.0025)
export const petButterflyQuestPrismaticMul = pet('butterflyQuest', 'Pet Quest: Butterfly (Prismatic Multi)', 10, 'prismatic_floor_multi', '+', (n) => n * 0.1)

export const petSources = {
  petCrabBombCap,
  petCrabBombRecharge,
  petCrabSkinWorkshopCap,
  petCrabQuestBomBofPlenty,
  petDwarfPickaxeDmg,
  petDwarfUltraCrit,
  petDwarfSkinPickaxeDmg,
  petDwarfQuestPrestigePts,
  petDwarfQuestFloorClear,
  petDuckExp,
  petDuckLootbugSpawn,
  petDuckSkinObeliskArmor,
  petDuckQuestVeinIncome,
  petDuckQuestGoldenVeinMul,
  petRabbitContractCost,
  petRabbitSkinContractPoints,
  petRabbitQuest5xContract,
  petRabbitQuestContractCost,
  petPenguinGoldenFloor,
  petPenguinSkinOreSell,
  petPenguinQuestGoldenFloor,
  petPenguinQuestRainbowFloor,
  petAxolotlDoubleCraft,
  petAxolotlBarCraft,
  petAxolotlSkinFuelDuration,
  petAxolotlQuestArchFragment,
  petAxolotlQuestSupernovaMul,
  petWhalePickaxeDmg,
  petWhaleLootbugTriple,
  petWhaleSkinLootbugGem,
  petWhaleQuestGemBombGem,
  petWhaleQuestLootbugBank,
  petTotemVeinSpawn,
  petTotemGoldenVeinChance,
  petTotemGoldenVeinMul,
  petTotemSkinRainbowVein,
  petTotemQuestDroneExp,
  petTotemQuestChainDroneCap,
  petHappyBotArtifactT4Cap,
  petHappyBotSkinContractCap,
  petHappyBotQuestPolyOre,
  petHappyBotQuestPolyStar,
  petHappyBotQuestPolyVein,
  petHappyBotQuestFreebieBank,
  petLeprechaunGameSpeed,
  petLeprechaunGoldenFloor,
  petLeprechaunRainbowFloor,
  petLeprechaunSkinRainbowFloor,
  petLeprechaunQuestGalacticMul,
  petLeprechaunQuestTransmuterBop,
  petStarfishSuper10xChance,
  petStarfishSupernovaChance,
  petStarfishSkinStarSpawn,
  petStarfishQuestNovagiant,
  petStarfishQuestCapricornCap,
  petDinoPickaxeDmg,
  petDinoRainbowFloor,
  petNibblesShinyFishMul,
  petNibblesTripleTick,
  petNibblesSkinShinyChance,
  petNibblesQuestTier2Dock,
  petNaginiGoldenOreMul,
  petNaginiAllFloorMul,
  petNaginiSkinGoldenOre,
  petNaginiQuestGoldenVoidChance,
  petNaginiQuestGoldenVoidMul,
  petButterflyGalacticChance,
  petButterflyLootfrogTriple,
  petButterflyRainbowPortal,
  petButterflyQuestBigFrog,
  petButterflyQuestPrismaticMul,
}

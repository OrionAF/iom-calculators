import type { Source } from '$lib/engine/types'

// ─── Pet Bonuses (per level) ──────────────────────────────────────────────────
// fn(petLevel) → contribution. Level 0 = pet at base / inactive.
// Reduction sources (Floor Clear, Bar Craft, etc.) use POSITIVE fn values,
// consistent with all other reduction sources in the codebase.

// ─── Crab (max 25) ────────────────────────────────────────────────────────────

/** Crab: Bomb Capacity +3% per level. → bomb_cap_multiplier (additive) */
export const petCrabBombCap: Source = {
  key: 'pets.crab',
  name: 'Pet: Crab (Bomb Capacity)',
  system: 'pets',
  fn: (n) => n * 0.03,
  inputs: [],
}
/** Crab: Bomb Recharge Rate +1% per level. → bomb_recharge_speed */
export const petCrabBombRecharge: Source = {
  key: 'pets.crab',
  name: 'Pet: Crab (Bomb Recharge)',
  system: 'pets',
  fn: (n) => n * 0.01,
  inputs: [],
}
/** Crab skin: Workshop Upgrade Cap +1 (binary). → bomb_workshop_cap_increase */
export const petCrabSkinWorkshopCap: Source = {
  key: 'pets.crabSkin',
  name: 'Pet Skin: Crab (Workshop Cap)',
  system: 'pets',
  maxLevel: 1,
  fn: (o) => o,
  inputs: [],
}
/** Crab quest: Plenty Bomb Multiplier +0.5× per rank. → bomb_of_plenty_multi */
export const petCrabQuestBomBofPlenty: Source = {
  key: 'pets.crabQuest',
  name: 'Pet Quest: Crab (Plenty Bomb Multi)',
  system: 'pets',
  maxLevel: 10,
  fn: (n) => n * 0.5,
  inputs: [],
}
// TODO no registry key: 'Exp Bomb Multiplies +0.5× per Rank' (Crab quest)

// ─── Dwarf (max 20) ───────────────────────────────────────────────────────────

/** Dwarf: Pickaxe Damage +20% per level. → pickaxe_damage */
export const petDwarfPickaxeDmg: Source = {
  key: 'pets.dwarf',
  name: 'Pet: Dwarf (Pickaxe Damage)',
  system: 'pets',
  fn: (n) => n * 0.2,
  inputs: [],
}
/** Dwarf: Ultra Crit Chance +1% per level. → pickaxe_ultra_crit_chance */
export const petDwarfUltraCrit: Source = {
  key: 'pets.dwarf',
  name: 'Pet: Dwarf (Ultra Crit)',
  system: 'pets',
  fn: (n) => n * 0.01,
  inputs: [],
}
/** Dwarf skin: Pickaxe Damage +50% (binary). → pickaxe_damage */
export const petDwarfSkinPickaxeDmg: Source = {
  key: 'pets.dwarfSkin',
  name: 'Pet Skin: Dwarf (Pickaxe Damage)',
  system: 'pets',
  maxLevel: 1,
  fn: (o) => o * 0.5,
  inputs: [],
}
/** Dwarf Quest: Prestige Point Gain +12% per rank. → prestige_point_multi */
export const petDwarfQuestPrestigePts: Source = {
  key: 'pets.dwarfQuest',
  name: 'Pet Quest: Dwarf (Prestige Points)',
  system: 'pets',
  maxLevel: 10,
  fn: (n) => n * 0.12,
  inputs: [],
}
/** Dwarf Quest: Floor Clear Requirement -2% per rank. → floor_clear_requirement_multi (negative fn: reduction convention) */
export const petDwarfQuestFloorClear: Source = {
  key: 'pets.dwarfQuest',
  name: 'Pet Quest: Dwarf (Floor Clear)',
  system: 'pets',
  maxLevel: 10,
  fn: (n) => n * -0.02,
  inputs: [],
}

// ─── Duck (max 20) ────────────────────────────────────────────────────────────

/** Duck: Experience Gain +12% per level. → experience_multi */
export const petDuckExp: Source = {
  key: 'pets.duck',
  name: 'Pet: Duck (EXP Gain)',
  system: 'pets',
  fn: (n) => n * 0.12,
  inputs: [],
}
/** Duck: Lootbug Spawn Rate +2.5% per level. → lootbug_spawn_rate */
export const petDuckLootbugSpawn: Source = {
  key: 'pets.duck',
  name: 'Pet: Duck (Lootbug Spawn)',
  system: 'pets',
  fn: (n) => n * 0.025,
  inputs: [],
}
/** Duck skin: Obelisk Armor -10% (binary). → obelisk_armor_reduction */
export const petDuckSkinObeliskArmor: Source = {
  key: 'pets.duckSkin',
  name: 'Pet Skin: Duck (Obelisk Armor)',
  system: 'pets',
  maxLevel: 1,
  fn: (o) => o * 0.1,
  inputs: [],
}
/** Duck Quest: Vein Income Multiplier +2% per rank. → vein_income_multi */
export const petDuckQuestVeinIncome: Source = {
  key: 'pets.duckQuest',
  name: 'Pet Quest: Duck (Vein Income)',
  system: 'pets',
  maxLevel: 10,
  fn: (n) => n * 0.02,
  inputs: [],
}
/** Duck Quest: Golden Vein Multiplier +2% per rank. → golden_vein_multi */
export const petDuckQuestGoldenVeinMul: Source = {
  key: 'pets.duckQuest',
  name: 'Pet Quest: Duck (Golden Vein Multi)',
  system: 'pets',
  maxLevel: 10,
  fn: (n) => n * 0.02,
  inputs: [],
}

// ─── Rabbit (max 20) ──────────────────────────────────────────────────────────

/** Rabbit: Contract Upgrade Cost Reduction -0.03× per level. → contract_upgrade_cost_reduction */
export const petRabbitContractCost: Source = {
  key: 'pets.rabbit',
  name: 'Pet: Rabbit (Contract Cost)',
  system: 'pets',
  fn: (n) => n * 0.03,
  inputs: [],
}
/** Rabbit skin: Contract Points Rewarded +1 (binary). → contract_points_rewarded */
export const petRabbitSkinContractPoints: Source = {
  key: 'pets.rabbitSkin',
  name: 'Pet Skin: Rabbit (Contract Points)',
  system: 'pets',
  maxLevel: 1,
  fn: (o) => o,
  inputs: [],
}
/** Rabbit Quest: 5× Contract Point Chance +1% per rank. → contract_5x_points_chance */
export const petRabbitQuest5xContract: Source = {
  key: 'pets.rabbitQuest',
  name: 'Pet Quest: Rabbit (5× Contract Chance)',
  system: 'pets',
  maxLevel: 10,
  fn: (n) => n * 0.01,
  inputs: [],
}
/** Rabbit Quest: Contract Upgrade Cost -1% per rank. → contract_upgrade_cost_reduction */
export const petRabbitQuestContractCost: Source = {
  key: 'pets.rabbitQuest',
  name: 'Pet Quest: Rabbit (Contract Cost)',
  system: 'pets',
  maxLevel: 10,
  fn: (n) => n * 0.01,
  inputs: [],
}

// ─── Penguin (max 20) ─────────────────────────────────────────────────────────

/** Penguin: Golden Floor Multi +0.05× per level. Additive. → golden_floor_multi */
export const petPenguinGoldenFloor: Source = {
  key: 'pets.penguin',
  name: 'Pet: Penguin (Golden Floor Multi)',
  system: 'pets',
  fn: (n) => n * 0.05,
  inputs: [],
}
/** Penguin skin: Ore Sell Price +50% (binary). → ore_sell_price_multi */
export const petPenguinSkinOreSell: Source = {
  key: 'pets.penguinSkin',
  name: 'Pet Skin: Penguin (Ore Sell Price)',
  system: 'pets',
  maxLevel: 1,
  fn: (o) => o * 0.5,
  inputs: [],
}
/** Penguin Quest: Golden Floor Multiplier +2% per rank. → golden_floor_multi */
export const petPenguinQuestGoldenFloor: Source = {
  key: 'pets.penguinQuest',
  name: 'Pet Quest: Penguin (Golden Floor Multi)',
  system: 'pets',
  maxLevel: 10,
  fn: (n) => n * 0.02,
  inputs: [],
}
/** Penguin Quest: Rainbow Floor Chance +0.25% per rank. → rainbow_floor_chance */
export const petPenguinQuestRainbowFloor: Source = {
  key: 'pets.penguinQuest',
  name: 'Pet Quest: Penguin (Rainbow Floor Chance)',
  system: 'pets',
  maxLevel: 10,
  fn: (n) => n * 0.0025,
  inputs: [],
}

// ─── Axolotl (max 20) ─────────────────────────────────────────────────────────

/** Axolotl: Double Craft Chance +2% per level. → double_craft_chance */
export const petAxolotlDoubleCraft: Source = {
  key: 'pets.axolotl',
  name: 'Pet: Axolotl (Double Craft)',
  system: 'pets',
  fn: (n) => n * 0.02,
  inputs: [],
}
/** Axolotl: Bar Craft Cost -1% per level. → bar_craft_cost_multi (negative fn: reduction convention) */
export const petAxolotlBarCraft: Source = {
  key: 'pets.axolotl',
  name: 'Pet: Axolotl (Bar Craft Cost)',
  system: 'pets',
  fn: (n) => n * -0.01,
  inputs: [],
}
/** Axolotl skin: Fuel Duration +10% (binary). → coal_fuel_duration_multi */
export const petAxolotlSkinFuelDuration: Source = {
  key: 'pets.axolotlSkin',
  name: 'Pet Skin: Axolotl (Fuel Duration)',
  system: 'pets',
  maxLevel: 1,
  fn: (o) => o * 0.1,
  inputs: [],
}
/** Axolotl Quest: Archaeology Fragment Gain +3% per rank. → archaeology_fragment_gain_multi */
export const petAxolotlQuestArchFragment: Source = {
  key: 'pets.axolotlQuest',
  name: 'Pet Quest: Axolotl (Arch Fragment)',
  system: 'pets',
  maxLevel: 10,
  fn: (n) => n * 0.03,
  inputs: [],
}
/** Axolotl Quest: Star Supernova Multi +3% per rank. → star_supernova_multi */
export const petAxolotlQuestSupernovaMul: Source = {
  key: 'pets.axolotlQuest',
  name: 'Pet Quest: Axolotl (Supernova Multi)',
  system: 'pets',
  maxLevel: 10,
  fn: (n) => n * 0.03,
  inputs: [],
}

// ─── Whale (max 20) ───────────────────────────────────────────────────────────

/** Whale: Pickaxe Damage +10% per level. → pickaxe_damage */
export const petWhalePickaxeDmg: Source = {
  key: 'pets.whale',
  name: 'Pet: Whale (Pickaxe Damage)',
  system: 'pets',
  fn: (n) => n * 0.1,
  inputs: [],
}
/** Whale: Triple Lootbug Chance +3% per level. → lootbug_triple_chance */
export const petWhaleLootbugTriple: Source = {
  key: 'pets.whale',
  name: 'Pet: Whale (Triple Lootbug)',
  system: 'pets',
  fn: (n) => n * 0.03,
  inputs: [],
}
/** Whale skin: Lootbug Gem Cost -2 (binary). → lootbug_gem_cost_reduction */
export const petWhaleSkinLootbugGem: Source = {
  key: 'pets.whaleSkin',
  name: 'Pet Skin: Whale (Lootbug Gem Cost)',
  system: 'pets',
  maxLevel: 1,
  fn: (o) => o * 2,
  inputs: [],
}
/** Whale Quest: Gem Bomb Gem Chance +0.10% per rank. → gem_bomb_gem_chance */
export const petWhaleQuestGemBombGem: Source = {
  key: 'pets.whaleQuest',
  name: 'Pet Quest: Whale (Gem Bomb Gem Chance)',
  system: 'pets',
  maxLevel: 10,
  fn: (n) => n * 0.001,
  inputs: [],
}
/** Whale Quest: Banked Lootbug Cap +1 per rank. → lootbug_bank_cap */
export const petWhaleQuestLootbugBank: Source = {
  key: 'pets.whaleQuest',
  name: 'Pet Quest: Whale (Lootbug Bank Cap)',
  system: 'pets',
  maxLevel: 10,
  fn: (n) => n,
  inputs: [],
}

// ─── Totem (max 25) ───────────────────────────────────────────────────────────

/** Totem: Vein Spawn Rate +3% per level. → vein_spawn_rate_multi */
export const petTotemVeinSpawn: Source = {
  key: 'pets.totem',
  name: 'Pet: Totem (Vein Spawn)',
  system: 'pets',
  fn: (n) => n * 0.03,
  inputs: [],
}
/** Totem: Golden Vein Chance +1% per level. → golden_vein_chance */
export const petTotemGoldenVeinChance: Source = {
  key: 'pets.totem',
  name: 'Pet: Totem (Golden Vein Chance)',
  system: 'pets',
  fn: (n) => n * 0.01,
  inputs: [],
}
/** Totem: Golden Vein Multi +1% per level. Additive. → golden_vein_multi */
export const petTotemGoldenVeinMul: Source = {
  key: 'pets.totem',
  name: 'Pet: Totem (Golden Vein Multi)',
  system: 'pets',
  fn: (n) => n * 0.01,
  inputs: [],
}
/** Totem skin: Rainbow Vein Chance +2% (binary). → rainbow_vein_chance */
export const petTotemSkinRainbowVein: Source = {
  key: 'pets.totemSkin',
  name: 'Pet Skin: Totem (Rainbow Vein Chance)',
  system: 'pets',
  maxLevel: 1,
  fn: (o) => o * 0.02,
  inputs: [],
}
/** Totem Quest: Drone Experience Gain +4% per rank. → coal_drone_exp_multi */
export const petTotemQuestDroneExp: Source = {
  key: 'pets.totemQuest',
  name: 'Pet Quest: Totem (Drone Exp)',
  system: 'pets',
  maxLevel: 10,
  fn: (n) => n * 0.04,
  inputs: [],
}
/** Totem Quest: Chain Drone Grade Cap +2 per rank. → drone_chain_grade_cap_increase */
export const petTotemQuestChainDroneCap: Source = {
  key: 'pets.totemQuest',
  name: 'Pet Quest: Totem (Chain Drone Cap)',
  system: 'pets',
  maxLevel: 10,
  fn: (n) => n * 2,
  inputs: [],
}

// ─── Happy-Bot (max 20) ───────────────────────────────────────────────────────

/** Happy-Bot: T4 Artifact Cap +1 per level. → artifact_tier4_cap_increase */
export const petHappyBotArtifactT4Cap: Source = {
  key: 'pets.happyBot',
  name: 'Pet: Happy-Bot (T4 Artifact Cap)',
  system: 'pets',
  fn: (n) => n,
  inputs: [],
}
/** Happy-Bot skin: Contract Upgrade Cap +1 (binary). → contract_cap_increase */
export const petHappyBotSkinContractCap: Source = {
  key: 'pets.happyBotSkin',
  name: 'Pet Skin: Happy-Bot (Contract Cap)',
  system: 'pets',
  maxLevel: 1,
  fn: (o) => o,
  inputs: [],
}
/** Happy-Bot Quest: Poly Ore Card Multi +2% per rank. → polychrome_card_bonus_ore */
export const petHappyBotQuestPolyOre: Source = {
  key: 'pets.happyBotQuest',
  name: 'Pet Quest: Happy-Bot (Poly Ore)',
  system: 'pets',
  maxLevel: 10,
  fn: (n) => n * 0.02,
  inputs: [],
}
/** Happy-Bot Quest: Poly Star Card Multi +2% per rank. → polychrome_card_bonus_star */
export const petHappyBotQuestPolyStar: Source = {
  key: 'pets.happyBotQuest',
  name: 'Pet Quest: Happy-Bot (Poly Star)',
  system: 'pets',
  maxLevel: 10,
  fn: (n) => n * 0.02,
  inputs: [],
}
/** Happy-Bot Quest: Poly Vein Card Multi +2% per rank. → polychrome_card_bonus_vein */
export const petHappyBotQuestPolyVein: Source = {
  key: 'pets.happyBotQuest',
  name: 'Pet Quest: Happy-Bot (Poly Vein)',
  system: 'pets',
  maxLevel: 10,
  fn: (n) => n * 0.02,
  inputs: [],
}
/** Happy-Bot Quest: Banked Freebies +1 per rank. → freebie_bank_cap */
export const petHappyBotQuestFreebieBank: Source = {
  key: 'pets.happyBotQuest',
  name: 'Pet Quest: Happy-Bot (Freebie Bank)',
  system: 'pets',
  maxLevel: 10,
  fn: (n) => n,
  inputs: [],
}

// ─── Leprechaun (max 25) ──────────────────────────────────────────────────────

/** Leprechaun: Base Game Speed +1.5% per level. → game_speed_multi */
export const petLeprechaunGameSpeed: Source = {
  key: 'pets.leprechaun',
  name: 'Pet: Leprechaun (Game Speed)',
  system: 'pets',
  fn: (n) => n * 0.015,
  inputs: [],
}
/** Leprechaun: Golden Floor Multi +1.25% per level. Additive. → golden_floor_multi */
export const petLeprechaunGoldenFloor: Source = {
  key: 'pets.leprechaun',
  name: 'Pet: Leprechaun (Golden Floor Multi)',
  system: 'pets',
  fn: (n) => n * 0.0125,
  inputs: [],
}
/** Leprechaun: Rainbow Floor Chance +0.25% per level. → rainbow_floor_chance */
export const petLeprechaunRainbowFloor: Source = {
  key: 'pets.leprechaun',
  name: 'Pet: Leprechaun (Rainbow Floor Chance)',
  system: 'pets',
  fn: (n) => n * 0.0025,
  inputs: [],
}
/** Leprechaun skin: Rainbow Floor Chance +1% (binary). → rainbow_floor_chance */
export const petLeprechaunSkinRainbowFloor: Source = {
  key: 'pets.leprechaunSkin',
  name: 'Pet Skin: Leprechaun (Rainbow Floor)',
  system: 'pets',
  maxLevel: 1,
  fn: (o) => o * 0.01,
  inputs: [],
}
/** Leprechaun Quest: Galactic Floor Multi +4% per rank. → galactic_floor_multi */
export const petLeprechaunQuestGalacticMul: Source = {
  key: 'pets.leprechaunQuest',
  name: 'Pet Quest: Leprechaun (Galactic Floor Multi)',
  system: 'pets',
  maxLevel: 10,
  fn: (n) => n * 0.04,
  inputs: [],
}
/** Leprechaun Quest: Transmuter BoP Mark Chance +2% per rank. → bomb_trans_apply_bop_chance */
export const petLeprechaunQuestTransmuterBop: Source = {
  key: 'pets.leprechaunQuest',
  name: 'Pet Quest: Leprechaun (Transmuter BoP)',
  system: 'pets',
  maxLevel: 10,
  fn: (n) => n * 0.02,
  inputs: [],
}

// ─── Starfish (max 25) ────────────────────────────────────────────────────────

/** Starfish: Super Star 10× Chance +0.2% per level. → super_star_10x_chance */
export const petStarfishSuper10xChance: Source = {
  key: 'pets.starfish',
  name: 'Pet: Starfish (Super 10x Chance)',
  system: 'pets',
  fn: (n) => n * 0.002,
  inputs: [],
}
/** Starfish: Super Star Supernova Chance +0.2% per level. → super_star_supernova_chance */
export const petStarfishSupernovaChance: Source = {
  key: 'pets.starfish',
  name: 'Pet: Starfish (Supernova Chance)',
  system: 'pets',
  fn: (n) => n * 0.002,
  inputs: [],
}
/** Starfish skin: Star Spawn Rate +10% (binary). → star_spawn_rate */
export const petStarfishSkinStarSpawn: Source = {
  key: 'pets.starfishSkin',
  name: 'Pet Skin: Starfish (Star Spawn Rate)',
  system: 'pets',
  maxLevel: 1,
  fn: (o) => o * 0.1,
  inputs: [],
}
/** Starfish Quest: Novagiant Combo Multi +3% per rank. → novagiant_combo_multi */
export const petStarfishQuestNovagiant: Source = {
  key: 'pets.starfishQuest',
  name: 'Pet Quest: Starfish (Novagiant Multi)',
  system: 'pets',
  maxLevel: 10,
  fn: (n) => n * 0.03,
  inputs: [],
}
/** Starfish Quest: Capricorn Cap +1 per rank. → star_capricorn_cap */
export const petStarfishQuestCapricornCap: Source = {
  key: 'pets.starfishQuest',
  name: 'Pet Quest: Starfish (Capricorn Cap)',
  system: 'pets',
  maxLevel: 10,
  fn: (n) => n,
  inputs: [],
}
// TODO no registry key: 'Ophiuchus Cap +1 per Rank' (Starfish quest)

// ─── Dino (max 25) ────────────────────────────────────────────────────────────

/** Dino: Pickaxe Damage ×(1 + 0.20n) per level. Multiplicative. → pickaxe_damage */
export const petDinoPickaxeDmg: Source = {
  key: 'pets.dino',
  name: 'Pet: Dino (Pickaxe Damage)',
  system: 'pets',
  fn: (n) => 1 + n * 0.2,
  inputs: [],
}
/** Dino: Rainbow Floor Multi +2.5% per level. Additive. → rainbow_floor_multi */
export const petDinoRainbowFloor: Source = {
  key: 'pets.dino',
  name: 'Pet: Dino (Rainbow Floor Multi)',
  system: 'pets',
  fn: (n) => n * 0.025,
  inputs: [],
}
// TODO no registry key: '+1 Pet Level Cap' (Dino skin)
// TODO no registry key: 'Astraeus and Chione Idol Cap +50 per Rank' (Dino quest)
// TODO no registry key: 'Aphrodite and Tethys Cap +30 per Rank' (Dino quest)

// ─── Mr Nibbles (max 25) ──────────────────────────────────────────────────────

/** Mr Nibbles: Shiny Fish Multi +0.03× per level. → fishing_shiny_multi */
export const petNibblesShinyFishMul: Source = {
  key: 'pets.mrNibbles',
  name: 'Pet: Mr Nibbles (Shiny Fish Multi)',
  system: 'pets',
  fn: (n) => n * 0.03,
  inputs: [],
}
/** Mr Nibbles: Triple Tick Chance +1% per level. → fishing_triple_tick_chance */
export const petNibblesTripleTick: Source = {
  key: 'pets.mrNibbles',
  name: 'Pet: Mr Nibbles (Triple Tick)',
  system: 'pets',
  fn: (n) => n * 0.01,
  inputs: [],
}
/** Mr Nibbles skin: Shiny Fish Chance +2% (binary). → fishing_shiny_chance */
export const petNibblesSkinShinyChance: Source = {
  key: 'pets.mrNibblesSkin',
  name: 'Pet Skin: Mr Nibbles (Shiny Chance)',
  system: 'pets',
  maxLevel: 1,
  fn: (o) => o * 0.02,
  inputs: [],
}
// TODO no registry key: 'Angler Drone Grade Cap +1 per Rank' (Mr Nibbles quest)
/** Mr Nibbles Quest: Tier 2 Dock Power +5% per rank. → fishing_tier2_dock_multi */
export const petNibblesQuestTier2Dock: Source = {
  key: 'pets.mrNibblesQuest',
  name: 'Pet Quest: Mr Nibbles (Tier 2 Dock)',
  system: 'pets',
  maxLevel: 10,
  fn: (n) => n * 0.05,
  inputs: [],
}

// ─── Nagini (max 25) ──────────────────────────────────────────────────────────

/** Nagini: Golden Ore Multi +0.05× per level. Additive. → golden_ore_multi */
export const petNaginiGoldenOreMul: Source = {
  key: 'pets.nagini',
  name: 'Pet: Nagini (Golden Ore Multi)',
  system: 'pets',
  fn: (n) => n * 0.05,
  inputs: [],
}
/** Nagini: All Floor Multi +2% per level. → all_floor_multipliers */
export const petNaginiAllFloorMul: Source = {
  key: 'pets.nagini',
  name: 'Pet: Nagini (All Floor Multi)',
  system: 'pets',
  fn: (n) => n * 0.02,
  inputs: [],
}
/** Nagini skin: Golden Ore Chance +2% (binary). → golden_ore_chance */
export const petNaginiSkinGoldenOre: Source = {
  key: 'pets.naginiSkin',
  name: 'Pet Skin: Nagini (Golden Ore Chance)',
  system: 'pets',
  maxLevel: 1,
  fn: (o) => o * 0.02,
  inputs: [],
}
/** Nagini Quest: Golden Void Portal Chance +0.5% per rank. → golden_void_portal_chance */
export const petNaginiQuestGoldenVoidChance: Source = {
  key: 'pets.naginiQuest',
  name: 'Pet Quest: Nagini (Golden Void Chance)',
  system: 'pets',
  maxLevel: 10,
  fn: (n) => n * 0.005,
  inputs: [],
}
/** Nagini Quest: Golden Void Portal Multi +5% per rank. → golden_void_portal_multi */
export const petNaginiQuestGoldenVoidMul: Source = {
  key: 'pets.naginiQuest',
  name: 'Pet Quest: Nagini (Golden Void Multi)',
  system: 'pets',
  maxLevel: 10,
  fn: (n) => n * 0.05,
  inputs: [],
}

// ─── Butterfly (max 25) ───────────────────────────────────────────────────────

/** Butterfly: Galactic Floor Chance +0.5% per level. → galactic_floor_chance */
export const petButterflyGalacticChance: Source = {
  key: 'pets.butterfly',
  name: 'Pet: Butterfly (Galactic Floor Chance)',
  system: 'pets',
  fn: (n) => n * 0.005,
  inputs: [],
}
/** Butterfly: Lootfrog Triple Spawn Chance +0.35% per level. → lootfrog_triple_spawn_chance */
export const petButterflyLootfrogTriple: Source = {
  key: 'pets.butterfly',
  name: 'Pet: Butterfly (Lootfrog Triple)',
  system: 'pets',
  fn: (n) => n * 0.0035,
  inputs: [],
}
/** Butterfly: Rainbow Portal Chance +0.25% per level. → rainbow_void_portal_chance */
export const petButterflyRainbowPortal: Source = {
  key: 'pets.butterfly',
  name: 'Pet: Butterfly (Rainbow Portal)',
  system: 'pets',
  fn: (n) => n * 0.0025,
  inputs: [],
}
// TODO no registry key: 'Unlock Infernal Pet Cards' (Butterfly skin)
/** Butterfly Quest: Big Lootfrog Chance +0.25% per rank. → lootfrog_big_chance */
export const petButterflyQuestBigFrog: Source = {
  key: 'pets.butterflyQuest',
  name: 'Pet Quest: Butterfly (Big Frog Chance)',
  system: 'pets',
  maxLevel: 10,
  fn: (n) => n * 0.0025,
  inputs: [],
}
/** Butterfly Quest: Prismatic Galactic Multi +10% per rank. → prismatic_floor_multi */
export const petButterflyQuestPrismaticMul: Source = {
  key: 'pets.butterflyQuest',
  name: 'Pet Quest: Butterfly (Prismatic Multi)',
  system: 'pets',
  maxLevel: 10,
  fn: (n) => n * 0.1,
  inputs: [],
}

export const petSources = {
  // Crab
  petCrabBombCap,
  petCrabBombRecharge,
  petCrabSkinWorkshopCap,
  petCrabQuestBomBofPlenty,
  // Dwarf
  petDwarfPickaxeDmg,
  petDwarfUltraCrit,
  petDwarfSkinPickaxeDmg,
  petDwarfQuestPrestigePts,
  petDwarfQuestFloorClear,
  // Duck
  petDuckExp,
  petDuckLootbugSpawn,
  petDuckSkinObeliskArmor,
  petDuckQuestVeinIncome,
  petDuckQuestGoldenVeinMul,
  // Rabbit
  petRabbitContractCost,
  petRabbitSkinContractPoints,
  petRabbitQuest5xContract,
  petRabbitQuestContractCost,
  // Penguin
  petPenguinGoldenFloor,
  petPenguinSkinOreSell,
  petPenguinQuestGoldenFloor,
  petPenguinQuestRainbowFloor,
  // Axolotl
  petAxolotlDoubleCraft,
  petAxolotlBarCraft,
  petAxolotlSkinFuelDuration,
  petAxolotlQuestArchFragment,
  petAxolotlQuestSupernovaMul,
  // Whale
  petWhalePickaxeDmg,
  petWhaleLootbugTriple,
  petWhaleSkinLootbugGem,
  petWhaleQuestGemBombGem,
  petWhaleQuestLootbugBank,
  // Totem
  petTotemVeinSpawn,
  petTotemGoldenVeinChance,
  petTotemGoldenVeinMul,
  petTotemSkinRainbowVein,
  petTotemQuestDroneExp,
  petTotemQuestChainDroneCap,
  // Happy-Bot
  petHappyBotArtifactT4Cap,
  petHappyBotSkinContractCap,
  petHappyBotQuestPolyOre,
  petHappyBotQuestPolyStar,
  petHappyBotQuestPolyVein,
  petHappyBotQuestFreebieBank,
  // Leprechaun
  petLeprechaunGameSpeed,
  petLeprechaunGoldenFloor,
  petLeprechaunRainbowFloor,
  petLeprechaunSkinRainbowFloor,
  petLeprechaunQuestGalacticMul,
  petLeprechaunQuestTransmuterBop,
  // Starfish
  petStarfishSuper10xChance,
  petStarfishSupernovaChance,
  petStarfishSkinStarSpawn,
  petStarfishQuestNovagiant,
  petStarfishQuestCapricornCap,
  // Dino
  petDinoPickaxeDmg,
  petDinoRainbowFloor,
  // Mr Nibbles
  petNibblesShinyFishMul,
  petNibblesTripleTick,
  petNibblesSkinShinyChance,
  petNibblesQuestTier2Dock,
  // Nagini
  petNaginiGoldenOreMul,
  petNaginiAllFloorMul,
  petNaginiSkinGoldenOre,
  petNaginiQuestGoldenVoidChance,
  petNaginiQuestGoldenVoidMul,
  // Butterfly
  petButterflyGalacticChance,
  petButterflyLootfrogTriple,
  petButterflyRainbowPortal,
  petButterflyQuestBigFrog,
  petButterflyQuestPrismaticMul,
}

import type { Source } from '$lib/engine/types'

// ─── Pet Bonuses (per level) ──────────────────────────────────────────────────
// fn(petLevel) → contribution. Level 0 = pet at base / inactive.

/** Crab: Bomb Capacity +3% per level. */
export const petCrabBombCap: Source = {
  key: 'pets.crab', name: 'Pet: Crab (Bomb Capacity)', system: 'pets',
  fn: (n) => n * 0.03, inputs: [],
}
/** Crab: Bomb Recharge Rate +1% per level. */
export const petCrabBombRecharge: Source = {
  key: 'pets.crab', name: 'Pet: Crab (Bomb Recharge)', system: 'pets',
  fn: (n) => n * 0.01, inputs: [],
}

/** Dwarf: Pickaxe Damage +20% per level. */
export const petDwarfPickaxeDmg: Source = {
  key: 'pets.dwarf', name: 'Pet: Dwarf (Pickaxe Damage)', system: 'pets',
  fn: (n) => n * 0.20, inputs: [],
}
/** Dwarf: Ultra Crit Chance +1% per level. */
export const petDwarfUltraCrit: Source = {
  key: 'pets.dwarf', name: 'Pet: Dwarf (Ultra Crit)', system: 'pets',
  fn: (n) => n * 0.01, inputs: [],
}

/** Duck: Experience Gain +12% per level. */
export const petDuckExp: Source = {
  key: 'pets.duck', name: 'Pet: Duck (EXP Gain)', system: 'pets',
  fn: (n) => n * 0.12, inputs: [],
}
/** Duck: Lootbug Spawn Rate +2.5% per level. */
export const petDuckLootbugSpawn: Source = {
  key: 'pets.duck', name: 'Pet: Duck (Lootbug Spawn)', system: 'pets',
  fn: (n) => n * 0.025, inputs: [],
}

/** Penguin: Golden Floor Multi +0.05x per level. Additive. */
export const petPenguinGoldenFloor: Source = {
  key: 'pets.penguin', name: 'Pet: Penguin (Golden Floor Multi)', system: 'pets',
  fn: (n) => n * 0.05, inputs: [],
}

/** Axolotl: Double Craft Chance +2% per level. */
export const petAxolotlDoubleCraft: Source = {
  key: 'pets.axolotl', name: 'Pet: Axolotl (Double Craft)', system: 'pets',
  fn: (n) => n * 0.02, inputs: [],
}
/** Axolotl: Bar Craft Cost -1% per level (reduction). */
export const petAxolotlBarCraft: Source = {
  key: 'pets.axolotl', name: 'Pet: Axolotl (Bar Craft Cost)', system: 'pets',
  fn: (n) => n * -0.01, inputs: [],
}

/** Whale: Pickaxe Damage +10% per level. */
export const petWhalePickaxeDmg: Source = {
  key: 'pets.whale', name: 'Pet: Whale (Pickaxe Damage)', system: 'pets',
  fn: (n) => n * 0.10, inputs: [],
}

/** Totem: Vein Spawn Rate +3% per level. */
export const petTotemVeinSpawn: Source = {
  key: 'pets.totem', name: 'Pet: Totem (Vein Spawn)', system: 'pets',
  fn: (n) => n * 0.03, inputs: [],
}
/** Totem: Golden Vein Chance +1% per level. */
export const petTotemGoldenVeinChance: Source = {
  key: 'pets.totem', name: 'Pet: Totem (Golden Vein Chance)', system: 'pets',
  fn: (n) => n * 0.01, inputs: [],
}
/** Totem: Golden Vein Multi +1% per level. Additive. */
export const petTotemGoldenVeinMul: Source = {
  key: 'pets.totem', name: 'Pet: Totem (Golden Vein Multi)', system: 'pets',
  fn: (n) => n * 0.01, inputs: [],
}

/** Leprechaun: Base Game Speed +1.5% per level. */
export const petLeprechaunGameSpeed: Source = {
  key: 'pets.leprechaun', name: 'Pet: Leprechaun (Game Speed)', system: 'pets',
  fn: (n) => n * 0.015, inputs: [],
}
/** Leprechaun: Golden Floor Multi +1.25% per level. Additive. */
export const petLeprechaunGoldenFloor: Source = {
  key: 'pets.leprechaun', name: 'Pet: Leprechaun (Golden Floor Multi)', system: 'pets',
  fn: (n) => n * 0.0125, inputs: [],
}
/** Leprechaun: Rainbow Floor Chance +0.25% per level. */
export const petLeprechaunRainbowFloor: Source = {
  key: 'pets.leprechaun', name: 'Pet: Leprechaun (Rainbow Floor Chance)', system: 'pets',
  fn: (n) => n * 0.0025, inputs: [],
}

/** Starfish: Super Star Supernova Chance +0.2% per level. */
export const petStarfishSupernovaChance: Source = {
  key: 'pets.starfish', name: 'Pet: Starfish (Supernova Chance)', system: 'pets',
  fn: (n) => n * 0.002, inputs: [],
}

/** Dino: Pickaxe Damage ×(1 + 0.20n) per level. Multiplicative. */
export const petDinoPickaxeDmg: Source = {
  key: 'pets.dino', name: 'Pet: Dino (Pickaxe Damage)', system: 'pets',
  fn: (n) => 1 + n * 0.20, inputs: [],
}
/** Dino: Rainbow Floor Multi +2.5% per level. Additive. */
export const petDinoRainbowFloor: Source = {
  key: 'pets.dino', name: 'Pet: Dino (Rainbow Floor Multi)', system: 'pets',
  fn: (n) => n * 0.025, inputs: [],
}

/** Mr Nibbles: Triple Tick Chance +1% per level. */
export const petNibblesTripleTick: Source = {
  key: 'pets.mrNibbles', name: 'Pet: Mr Nibbles (Triple Tick)', system: 'pets',
  fn: (n) => n * 0.01, inputs: [],
}

/** Nagini: Golden Ore Multi +0.05x per level. Additive. */
export const petNaginiGoldenOreMul: Source = {
  key: 'pets.nagini', name: 'Pet: Nagini (Golden Ore Multi)', system: 'pets',
  fn: (n) => n * 0.05, inputs: [],
}

/** Butterfly: Lootfrog Triple Spawn Chance +0.35% per level. */
export const petButterflyLootfrogTriple: Source = {
  key: 'pets.butterfly', name: 'Pet: Butterfly (Lootfrog Triple)', system: 'pets',
  fn: (n) => n * 0.0035, inputs: [],
}

// ─── Pet Quest Rewards (per rank) ─────────────────────────────────────────────

/** Dwarf Quest: Prestige Point Gain +12% per rank. Max 10. */
export const petDwarfQuestPrestigePts: Source = {
  key: 'pets.dwarfQuest', name: 'Pet Quest: Dwarf (Prestige Points)', system: 'pets',
  maxLevel: 10, fn: (n) => n * 0.12, inputs: [],
}
/** Dwarf Quest: Floor Clear Requirement -2% per rank. */
export const petDwarfQuestFloorClear: Source = {
  key: 'pets.dwarfQuest', name: 'Pet Quest: Dwarf (Floor Clear)', system: 'pets',
  maxLevel: 10, fn: (n) => n * -0.02, inputs: [],
}
/** Duck Quest: Vein Income +2% per rank. */
export const petDuckQuestVeinIncome: Source = {
  key: 'pets.duckQuest', name: 'Pet Quest: Duck (Vein Income)', system: 'pets',
  maxLevel: 10, fn: (n) => n * 0.02, inputs: [],
}
/** Duck Quest: Golden Vein Multi +2% per rank. Additive. */
export const petDuckQuestGoldenVeinMul: Source = {
  key: 'pets.duckQuest', name: 'Pet Quest: Duck (Golden Vein Multi)', system: 'pets',
  maxLevel: 10, fn: (n) => n * 0.02, inputs: [],
}
/** Penguin Quest: Golden Floor Multi +2% per rank. Additive. */
export const petPenguinQuestGoldenFloor: Source = {
  key: 'pets.penguinQuest', name: 'Pet Quest: Penguin (Golden Floor Multi)', system: 'pets',
  maxLevel: 10, fn: (n) => n * 0.02, inputs: [],
}
/** Penguin Quest: Rainbow Floor Chance +0.25% per rank. */
export const petPenguinQuestRainbowFloor: Source = {
  key: 'pets.penguinQuest', name: 'Pet Quest: Penguin (Rainbow Floor Chance)', system: 'pets',
  maxLevel: 10, fn: (n) => n * 0.0025, inputs: [],
}
/** Whale Quest: Banked Lootbug Cap +1 per rank. */
export const petWhaleQuestLootbugBank: Source = {
  key: 'pets.whaleQuest', name: 'Pet Quest: Whale (Lootbug Bank Cap)', system: 'pets',
  maxLevel: 10, fn: (n) => n, inputs: [],
}
/** Nagini Quest: Golden Void Portal Chance +0.5% per rank. */
export const petNaginiQuestGoldenVoidChance: Source = {
  key: 'pets.naginiQuest', name: 'Pet Quest: Nagini (Golden Void Chance)', system: 'pets',
  maxLevel: 10, fn: (n) => n * 0.005, inputs: [],
}
/** Nagini Quest: Golden Void Portal Multi +5% per rank. Additive. */
export const petNaginiQuestGoldenVoidMul: Source = {
  key: 'pets.naginiQuest', name: 'Pet Quest: Nagini (Golden Void Multi)', system: 'pets',
  maxLevel: 10, fn: (n) => n * 0.05, inputs: [],
}

export const petSources = {
  petCrabBombCap, petCrabBombRecharge,
  petDwarfPickaxeDmg, petDwarfUltraCrit,
  petDuckExp, petDuckLootbugSpawn,
  petPenguinGoldenFloor,
  petAxolotlDoubleCraft, petAxolotlBarCraft,
  petWhalePickaxeDmg,
  petTotemVeinSpawn, petTotemGoldenVeinChance, petTotemGoldenVeinMul,
  petLeprechaunGameSpeed, petLeprechaunGoldenFloor, petLeprechaunRainbowFloor,
  petStarfishSupernovaChance,
  petDinoPickaxeDmg, petDinoRainbowFloor,
  petNibblesTripleTick,
  petNaginiGoldenOreMul,
  petButterflyLootfrogTriple,
  petDwarfQuestPrestigePts, petDwarfQuestFloorClear,
  petDuckQuestVeinIncome, petDuckQuestGoldenVeinMul,
  petPenguinQuestGoldenFloor, petPenguinQuestRainbowFloor,
  petWhaleQuestLootbugBank,
  petNaginiQuestGoldenVoidChance, petNaginiQuestGoldenVoidMul,
}

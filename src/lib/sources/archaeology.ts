import type { Source } from '$lib/engine/types'

// Idol sources: fn(n) where n = idols owned (capped at maxLevel).
// Binary unlock effects (bracketed in wiki): maxLevel 1, fn = o => o * value.
// Item-conditional idols: fn takes only idol count; formula gates on item_active.
// Internal archaeology stats (stamina, flat dmg, armor pen, etc.) are included
// where registry keys exist; unclear mappings are marked TODO.

// ─── Archaeology Upgrades ─────────────────────────────────────────────────────

// Ascension 0 — gem-gated (cap = arch level + 4)
/** Gem: Archaeology Exp Gain +5%/level. Max 25. → archaeology_exp_gain_multi */
export const archExpGainGem: Source = {
  key: 'arch.upgrade.expGainGem',
  name: 'Arch Upgrade: Exp Gain (Gem)',
  system: 'archaeology',
  maxLevel: 25,
  fn: (n) => n * 0.05,
  inputs: [],
}
/** Gem: Fragment Gain +2%/level. Max 25. → archaeology_fragment_gain_multi */
export const archFragGainGem: Source = {
  key: 'arch.upgrade.fragGainGem',
  name: 'Arch Upgrade: Fragment Gain (Gem)',
  system: 'archaeology',
  maxLevel: 25,
  fn: (n) => n * 0.02,
  inputs: [],
}
// TODO no registry key: Gem — Stamina Mod Chance +0.05%/level, max 50
// TODO no registry key: Gem — Loot Mode Chance +0.05%/level, max 25

// Ascension 0 — fragment upgrades
/** Common stage 3: Archaeology Exp Gain +2%/level. Max 25. → archaeology_exp_gain_multi */
export const archExpGainCommon: Source = {
  key: 'arch.upgrade.expGainCommon',
  name: 'Arch Upgrade: Exp Gain (Common)',
  system: 'archaeology',
  maxLevel: 25,
  fn: (n) => n * 0.02,
  inputs: [],
}
/** Rare stage 7: Enrage Cooldown -1s/level. Max 15. → archaeology_ability_cd */
export const archEnrageCD: Source = {
  key: 'arch.upgrade.enrageCD',
  name: 'Arch Upgrade: Enrage Cooldown',
  system: 'archaeology',
  maxLevel: 15,
  fn: (n) => n * 1,
  inputs: [],
}
/** Rare stage 6: Loot Mod Gain Multi +0.30x/level. Max 10. → archaeology_spd_mod_gain */
export const archLootModGain: Source = {
  key: 'arch.upgrade.lootModGain',
  name: 'Arch Upgrade: Loot Mod Gain',
  system: 'archaeology',
  maxLevel: 10,
  fn: (n) => n * 0.3,
  inputs: [],
}
/** Epic stage 10: Archaeology Exp Gain +3%/level. Max 20. → archaeology_exp_gain_multi */
export const archExpGainEpic: Source = {
  key: 'arch.upgrade.expGainEpic',
  name: 'Arch Upgrade: Exp Gain (Epic)',
  system: 'archaeology',
  maxLevel: 20,
  fn: (n) => n * 0.03,
  inputs: [],
}
/** Epic stage 10: Fragment Gain +2%/level. Max 20. → archaeology_fragment_gain_multi */
export const archFragGainEpic: Source = {
  key: 'arch.upgrade.fragGainEpic',
  name: 'Arch Upgrade: Fragment Gain (Epic)',
  system: 'archaeology',
  maxLevel: 20,
  fn: (n) => n * 0.02,
  inputs: [],
}
/** Epic stage 11: Flurry Cooldown -1s/level. Max 10. → archaeology_ability_cd */
export const archFlurryCD: Source = {
  key: 'arch.upgrade.flurryCD',
  name: 'Arch Upgrade: Flurry Cooldown',
  system: 'archaeology',
  maxLevel: 10,
  fn: (n) => n * 1,
  inputs: [],
}
/** Legendary stage 17: Archaeology Exp Gain +5%/level. Max 15. → archaeology_exp_gain_multi */
export const archExpGainLegendary: Source = {
  key: 'arch.upgrade.expGainLegendary',
  name: 'Arch Upgrade: Exp Gain (Legendary)',
  system: 'archaeology',
  maxLevel: 15,
  fn: (n) => n * 0.05,
  inputs: [],
}
/** Legendary stage 18: Ability Cooldown -1s/level. Max 10. → archaeology_ability_cd */
export const archAbilityCD: Source = {
  key: 'arch.upgrade.abilityCD',
  name: 'Arch Upgrade: Ability Cooldown',
  system: 'archaeology',
  maxLevel: 10,
  fn: (n) => n * 1,
  inputs: [],
}
/** Legendary stage 20: Quake Cooldown -2s/level. Max 10. → archaeology_ability_cd */
export const archQuakeCD: Source = {
  key: 'arch.upgrade.quakeCD',
  name: 'Arch Upgrade: Quake Cooldown',
  system: 'archaeology',
  maxLevel: 10,
  fn: (n) => n * 2,
  inputs: [],
}
/** Mythic stage 32: Ability Instacharge +0.30%/level. Max 20. → archaeology_ability_insta */
export const archAbilityInsta: Source = {
  key: 'arch.upgrade.abilityInsta',
  name: 'Arch Upgrade: Ability Instacharge',
  system: 'archaeology',
  maxLevel: 20,
  fn: (n) => n * 0.003,
  inputs: [],
}
// TODO no registry key: Asc0 stage 34 — Polychrome Archaeology Card Bonus +15% (one-time)

/** Asc0 stage 36: Fragment Gain 1.25× (binary). Additive +25%. → archaeology_fragment_gain_multi */
export const archFragGain125x: Source = {
  key: 'arch.upgrade.fragGain125x',
  name: 'Arch Upgrade: Fragment Gain 1.25×',
  system: 'archaeology',
  maxLevel: 1,
  fn: (o) => o * 0.25,
  inputs: [],
}
/** Asc0 stage 38: Stamina Mod Gain +2 (binary). → archaeology_spd_mod_gain */
export const archStaminaModGain: Source = {
  key: 'arch.upgrade.staminaModGain',
  name: 'Arch Upgrade: Stamina Mod Gain',
  system: 'archaeology',
  maxLevel: 1,
  fn: (o) => o * 2,
  inputs: [],
}
/** Asc0 stage 40: All Mod Chances +1.50% (binary). → archaeology_lood_mod_chance */
export const archAllModChances: Source = {
  key: 'arch.upgrade.allModChances',
  name: 'Arch Upgrade: All Mod Chances',
  system: 'archaeology',
  maxLevel: 1,
  fn: (o) => o * 0.015,
  inputs: [],
}
/** Asc0 stage 42: Archaeology Exp Gain 2× (binary, +100% additive). → archaeology_exp_gain_multi */
export const archExpGain2x: Source = {
  key: 'arch.upgrade.expGain2x',
  name: 'Arch Upgrade: Exp Gain 2×',
  system: 'archaeology',
  maxLevel: 1,
  fn: (o) => o * 1.0,
  inputs: [],
}

// Ascension 1 upgrades
/** Asc1 stage 12: All Mod Chances +0.02%/level. Max 30. → archaeology_lood_mod_chance */
export const archAllModChancesA1: Source = {
  key: 'arch.upgrade.allModChancesA1',
  name: 'Arch Upgrade A1: All Mod Chances',
  system: 'archaeology',
  maxLevel: 30,
  fn: (n) => n * 0.0002,
  inputs: [],
}
/** Asc1 stage 55: Gold Crosshair Chance +1%/level. Max 5. → archaeology_golden_crosshair_chance */
export const archGoldCrosshairChance: Source = {
  key: 'arch.upgrade.goldCrosshairChance',
  name: 'Arch Upgrade A1: Gold Crosshair Chance',
  system: 'archaeology',
  maxLevel: 5,
  fn: (n) => n * 0.01,
  inputs: [],
}
/** Asc1 stage 55: Crosshair Auto-Tap Chance +1%/level. Max 5. → archaeology_crosshair_auto_tap */
export const archAutoTapChance: Source = {
  key: 'arch.upgrade.autoTapChance',
  name: 'Arch Upgrade A1: Auto-Tap Chance',
  system: 'archaeology',
  maxLevel: 5,
  fn: (n) => n * 0.01,
  inputs: [],
}
/** Asc1 stage 65: Ability Instacharge +0.10%/level. Max 25. → archaeology_ability_insta */
export const archAbilityInstaA1: Source = {
  key: 'arch.upgrade.abilityInstaA1',
  name: 'Arch Upgrade A1: Ability Instacharge',
  system: 'archaeology',
  maxLevel: 25,
  fn: (n) => n * 0.001,
  inputs: [],
}
/** Asc1 stage 70: Archaeology Exp Gain +10%/level. Max 5. → archaeology_exp_gain_multi */
export const archExpGainA1: Source = {
  key: 'arch.upgrade.expGainA1',
  name: 'Arch Upgrade A1: Exp Gain',
  system: 'archaeology',
  maxLevel: 5,
  fn: (n) => n * 0.1,
  inputs: [],
}
/** Asc1 stage 85: Super Crit Damage +0.50%/level. Max 40. → archaeology_ability_dur (proxy) */
// TODO: Super Crit Damage is internal; Exp Mod Gain → archaeology_spd_mod_gain may be more correct
export const archSuperCritDmgA1: Source = {
  key: 'arch.upgrade.superCritDmgA1',
  name: 'Arch Upgrade A1: Super Crit Damage',
  system: 'archaeology',
  maxLevel: 40,
  fn: (n) => n * 0.005,
  inputs: [],
}
/** Asc1 stage 90: Crosshair Auto-Tap Chance +0.20%/level. Max 50. → archaeology_crosshair_auto_tap */
export const archAutoTapA1: Source = {
  key: 'arch.upgrade.autoTapA1',
  name: 'Arch Upgrade A1: Auto-Tap (Mythic)',
  system: 'archaeology',
  maxLevel: 50,
  fn: (n) => n * 0.002,
  inputs: [],
}

// Ascension 2 upgrades
/** Asc2 stage 8: Gleaming Floor Chance +0.10%/level. Max 30. → gleaming_vein_chance */
export const archGleamingChance: Source = {
  key: 'arch.upgrade.gleamingChance',
  name: 'Arch Upgrade A2: Gleaming Floor Chance',
  system: 'archaeology',
  maxLevel: 30,
  fn: (n) => n * 0.001,
  inputs: [],
}
/** Asc2 stage 16: Loot Mod Gain +0.05x/level. Max 30. → archaeology_spd_mod_gain */
export const archLootModGainA2: Source = {
  key: 'arch.upgrade.lootModGainA2',
  name: 'Arch Upgrade A2: Loot Mod Gain',
  system: 'archaeology',
  maxLevel: 30,
  fn: (n) => n * 0.05,
  inputs: [],
}
/** Asc2 stage 45: Gleaming Floor Multi +3%/level. Max 30. → gleaming_vein_multi */
export const archGleamingMul: Source = {
  key: 'arch.upgrade.gleamingMul',
  name: 'Arch Upgrade A2: Gleaming Floor Multi',
  system: 'archaeology',
  maxLevel: 30,
  fn: (n) => n * 0.03,
  inputs: [],
}
// TODO no registry key: Asc2 stage 23 — Buff Divinity: All Div Stats +0.20, max 5
// TODO no registry key: Asc2 stage 72 — Corruption Buff: Damage, Speed Mod
// TODO no registry key: Asc2 stage 92 — All Mod Multipliers +2%, max 10

// ─── Ascension 0 Common Idols ─────────────────────────────────────────────────

/**
 * Athena: Apple gives Exp Gain +1%/idol. Max 500. Item-conditional → experience_multi.
 * (Also: Primal Meat gives Super Star Chance +0.05%/idol → super_star_spawn_rate)
 */
export const idolAthenaExp: Source = {
  key: 'arch.idol.athenaExp',
  name: 'Idol: Athena (Exp Gain)',
  system: 'archaeology',
  maxLevel: 500,
  fn: (n) => n * 0.01,
  inputs: [],
}
export const idolAthenaSuperStar: Source = {
  key: 'arch.idol.athenaSuperStar',
  name: 'Idol: Athena (Super Star Chance)',
  system: 'archaeology',
  maxLevel: 500,
  fn: (n) => n * 0.0005,
  inputs: [],
}
/**
 * Cassandra: Rock Cake gives Bomb Super & Ultra Crit Chance +0.10%/idol. Max 150.
 * Item-conditional. Single source wired to both bomb_super_crit_chance and bomb_ultra_crit_chance.
 */
export const idolCassandra: Source = {
  key: 'arch.idol.cassandra',
  name: 'Idol: Cassandra (Bomb Crit Chances)',
  system: 'archaeology',
  maxLevel: 150,
  fn: (n) => n * 0.001,
  inputs: [],
}
/** Demeter: Strawberries give Golden Vein Multi +2%/idol. Max 100. Item-conditional. → golden_vein_multi */
export const idolDemeter: Source = {
  key: 'arch.idol.demeter',
  name: 'Idol: Demeter (Golden Vein Multi)',
  system: 'archaeology',
  maxLevel: 100,
  fn: (n) => n * 0.02,
  inputs: [],
}
/** Eros: Bread gives Lootbug Spawn Rate +0.40%/idol. Max 50. Item-conditional. → lootbug_spawn_rate */
export const idolEros: Source = {
  key: 'arch.idol.eros',
  name: 'Idol: Eros (Lootbug Spawn Rate)',
  system: 'archaeology',
  maxLevel: 50,
  fn: (n) => n * 0.004,
  inputs: [],
}
/** Hera: Contract Upgrade Cap +1/idol. Max 3. → contract_cap_increase */
export const idolHera: Source = {
  key: 'arch.idol.hera',
  name: 'Idol: Hera (Contract Cap)',
  system: 'archaeology',
  maxLevel: 3,
  fn: (n) => n,
  inputs: [],
}
/** Astraeus: Star Supernova Multi +0.05%/idol. Max 500. → star_supernova_multi */
export const idolAstraeusSupernovaMul: Source = {
  key: 'arch.idol.astraeusSupernova',
  name: 'Idol: Astraeus (Supernova Multi)',
  system: 'archaeology',
  maxLevel: 500,
  fn: (n) => n * 0.0005,
  inputs: [],
}
/** Astraeus: Fishing Double Tick Chance +0.03%/idol. Max 500. → fishing_double_tick_chance */
export const idolAstraeusDblTick: Source = {
  key: 'arch.idol.astraeusDoubleTick',
  name: 'Idol: Astraeus (Double Tick)',
  system: 'archaeology',
  maxLevel: 500,
  fn: (n) => n * 0.0003,
  inputs: [],
}

// ─── Ascension 0 Rare Idols ───────────────────────────────────────────────────

// TODO no registry key: Apollo — Transmuter Bomb Multi +0.20x/idol, max 500
/** Iris: Eye of Newt gives Golden Floor Multi +0.25%/idol. Max 100. Item-conditional. → golden_floor_multi */
export const idolIris: Source = {
  key: 'arch.idol.iris',
  name: 'Idol: Iris (Golden Floor Multi)',
  system: 'archaeology',
  maxLevel: 100,
  fn: (n) => n * 0.0025,
  inputs: [],
}
/** Minos: Gem Upgrade Cap +1/idol. Max 5. → gem_upgrade_cap_increase */
export const idolMinos: Source = {
  key: 'arch.idol.minos',
  name: 'Idol: Minos (Gem Upgrade Cap)',
  system: 'archaeology',
  maxLevel: 5,
  fn: (n) => n,
  inputs: [],
}
// TODO registry key unclear: Leto — Pet Skin Level Up Chance +1%/idol, max 10
//   pet_levelup_chance_multi exists but may be distinct from skin-specific level-up chance
/** Poseidon: Pike gives Base Fishing Drone Power +0.25/idol. Max 20. Item-conditional. → fishing_drone_power */
export const idolPoseidon: Source = {
  key: 'arch.idol.poseidon',
  name: 'Idol: Poseidon (Fishing Drone Power)',
  system: 'archaeology',
  maxLevel: 20,
  fn: (n) => n * 0.25,
  inputs: [],
}
/** Chione: Ice Cream gives Vein Income Multi +0.10%/idol. Max 300. Item-conditional. → vein_income_multi */
export const idolChione: Source = {
  key: 'arch.idol.chione',
  name: 'Idol: Chione (Vein Income Multi)',
  system: 'archaeology',
  maxLevel: 300,
  fn: (n) => n * 0.001,
  inputs: [],
}

// ─── Ascension 0 Epic Idols ───────────────────────────────────────────────────

/** Pandora: Star Supernova Multi +0.50%/idol. Max 500. → star_supernova_multi */
export const idolPandora: Source = {
  key: 'arch.idol.pandora',
  name: 'Idol: Pandora (Supernova Multi)',
  system: 'archaeology',
  maxLevel: 500,
  fn: (n) => n * 0.005,
  inputs: [],
}
/** Cephalus: Banana Coffee gives Game Speed +0.10%/idol. Max 100. Item-conditional. → game_speed_multi */
export const idolCephalus: Source = {
  key: 'arch.idol.cephalus',
  name: 'Idol: Cephalus (Game Speed)',
  system: 'archaeology',
  maxLevel: 100,
  fn: (n) => n * 0.001,
  inputs: [],
}
// TODO no registry key: Dionysus — Coal Upgrade Cap +1/idol, max 5
// TODO no registry key: Dionysus — All Drone Grade Caps +1/idol, max 5 (no global drone_grade_cap key)
/** Talos: Drone Exp Gain +0.05%/idol. Max 750. → coal_drone_exp_multi */
export const idolTalosDroneExp: Source = {
  key: 'arch.idol.talosDroneExp',
  name: 'Idol: Talos (Drone Exp)',
  system: 'archaeology',
  maxLevel: 750,
  fn: (n) => n * 0.0005,
  inputs: [],
}
// TODO no registry key: Talos — Coal Capacity +50/idol, max 750 (absolute value, not %)

// ─── Ascension 0 Legendary Idols ─────────────────────────────────────────────

// TODO no registry key: Andromeda — Polychrome Bar Cards +0.05x/idol, max 300
/** Nyx: Void Drone Grade Cap +1/idol. Max 20. → drone_void_grade_cap_increase */
export const idolNyx: Source = {
  key: 'arch.idol.nyx',
  name: 'Idol: Nyx (Void Drone Cap)',
  system: 'archaeology',
  maxLevel: 20,
  fn: (n) => n,
  inputs: [],
}
// TODO no registry key: Castor — Aqua Star Cap +2/idol, max 5
// TODO no registry key: Castor — Cancer Star Cap +2/idol, max 5
// TODO complex mechanic: Aphrodite — Rainbow Lollipop Effect ×1.002/idol, max 500

// ─── Ascension 0 Mythic Idols ─────────────────────────────────────────────────

// TODO no registry key: Zeus — Legendary Vein/Star/Pet Cap +1 + Mythic Relic Cap +1, max 150
/** Atlas: Orion Star Cap +1/idol. Max 10. → star_orion_cap */
export const idolAtlasOrion: Source = {
  key: 'arch.idol.atlasOrion',
  name: 'Idol: Atlas (Orion Cap)',
  system: 'archaeology',
  maxLevel: 10,
  fn: (n) => n,
  inputs: [],
}
// TODO no registry key: Atlas — Hercules Star Cap +1/idol, max 10
// TODO no registry key: Xanthe — Starfish Pet Cap +1/idol, max 5
// TODO no registry key: Xanthe — Dino Pet Cap +1/idol, max 5
/** Tethys: Tier 2 Dock Power +0.05%/idol. Max 500. → fishing_tier2_dock_multi */
export const idolTethysTier2Dock: Source = {
  key: 'arch.idol.tethysTier2Dock',
  name: 'Idol: Tethys (Tier 2 Dock)',
  system: 'archaeology',
  maxLevel: 500,
  fn: (n) => n * 0.0005,
  inputs: [],
}
/** Tethys: Drone Power Multi +0.05%/idol. Max 500. → fishing_drone_power */
export const idolTethysDronePower: Source = {
  key: 'arch.idol.tethysDronePower',
  name: 'Idol: Tethys (Drone Power)',
  system: 'archaeology',
  maxLevel: 500,
  fn: (n) => n * 0.0005,
  inputs: [],
}
/** Tethys: Super Shiny Multi +0.05%/idol. Max 500. → fishing_super_shiny_multi */
export const idolTethysSuperShiny: Source = {
  key: 'arch.idol.tethysSuperShiny',
  name: 'Idol: Tethys (Super Shiny Multi)',
  system: 'archaeology',
  maxLevel: 500,
  fn: (n) => n * 0.0005,
  inputs: [],
}

// ─── Ascension 1 Idols ────────────────────────────────────────────────────────

/** Hestia (Common A1): Fragment Gain +0.01%/idol. Max 3000. → archaeology_fragment_gain_multi */
export const idolHestia: Source = {
  key: 'arch.idol.hestia',
  name: 'Idol: Hestia (Fragment Gain)',
  system: 'archaeology',
  maxLevel: 3000,
  fn: (n) => n * 0.0001,
  inputs: [],
}
/** Ares (Rare A1): Fishing Drone Power +0.010%/idol. Max 5000. → fishing_drone_power */
export const idolAres: Source = {
  key: 'arch.idol.ares',
  name: 'Idol: Ares (Fishing Drone Power)',
  system: 'archaeology',
  maxLevel: 5000,
  fn: (n) => n * 0.0001,
  inputs: [],
}
// TODO no registry key: Ares unlock — Fishing Drones +50 (binary drone count increase)
/**
 * Hephaestus (Epic A1): Drone Juice gives Coal Production +0.015%/idol. Max 3000.
 * Item-conditional (Drone Juice active). → coal_generation_seconds
 */
export const idolHephaestus: Source = {
  key: 'arch.idol.hephaestus',
  name: 'Idol: Hephaestus (Coal Production)',
  system: 'archaeology',
  maxLevel: 3000,
  fn: (n) => n * 0.00015,
  inputs: [],
}
// TODO no registry key: Hephaestus unlock — Fuel Coal Cost -10 (binary)
/** Hyperion (Legendary A1): Star Supergiant Multi +0.015%/idol. Max 2500. → star_supergiant_multi */
export const idolHyperion: Source = {
  key: 'arch.idol.hyperion',
  name: 'Idol: Hyperion (Supergiant Multi)',
  system: 'archaeology',
  maxLevel: 2500,
  fn: (n) => n * 0.00015,
  inputs: [],
}
// TODO no registry key: Hyperion unlock — Draco Star Cap +10 (binary)
/** Cronus (Mythic A1): Rainbow Void Portal Chance +0.005%/idol. Max 2000. → rainbow_void_portal_chance */
export const idolCronusPortalChance: Source = {
  key: 'arch.idol.cronusPortalChance',
  name: 'Idol: Cronus (Rainbow Portal Chance)',
  system: 'archaeology',
  maxLevel: 2000,
  fn: (n) => n * 0.00005,
  inputs: [],
}
/** Cronus unlock: Rainbow Void Portal Multi +20% (binary). → rainbow_void_portal_multi */
export const idolCronusPortalMulUnlock: Source = {
  key: 'arch.idol.cronusPortalMulUnlock',
  name: 'Idol: Cronus Unlock (Rainbow Portal Multi)',
  system: 'archaeology',
  maxLevel: 1,
  fn: (o) => o * 0.2,
  inputs: [],
}
// TODO no registry key: Hades (Divine A1) — Infernal Card Bonus +0.0045%/idol, max 6666

// ─── Ascension 2 Idols ────────────────────────────────────────────────────────

/** Hermes unlock (Common A2): Contract Upgrade Cap +1 (binary). → contract_cap_increase */
export const idolHermesContractCapUnlock: Source = {
  key: 'arch.idol.hermesContractCapUnlock',
  name: 'Idol: Hermes Unlock (Contract Cap)',
  system: 'archaeology',
  maxLevel: 1,
  fn: (o) => o,
  inputs: [],
}
/** Hermes (Common A2): 10× Contract Chance +0.005%/idol. Max 1000. → contract_10x_points_chance */
export const idolHermes10xContract: Source = {
  key: 'arch.idol.hermes10xContract',
  name: 'Idol: Hermes (10x Contract)',
  system: 'archaeology',
  maxLevel: 1000,
  fn: (n) => n * 0.00005,
  inputs: [],
}
/** Theseus unlock (Rare A2): Banked Lootbug Cap +15 (binary). → lootbug_bank_cap */
export const idolTheseusBankUnlock: Source = {
  key: 'arch.idol.theseusBankUnlock',
  name: 'Idol: Theseus Unlock (Lootbug Bank)',
  system: 'archaeology',
  maxLevel: 1,
  fn: (o) => o * 15,
  inputs: [],
}
/** Theseus (Rare A2): Lootbug Loot Multi +0.01%/idol. Max 3000. → lootbug_loot_multi */
export const idolTheseus: Source = {
  key: 'arch.idol.theseus',
  name: 'Idol: Theseus (Lootbug Loot Multi)',
  system: 'archaeology',
  maxLevel: 3000,
  fn: (n) => n * 0.0001,
  inputs: [],
}
/** Mnemosyne unlock (Epic A2): Prism Drone Grade Cap +5 (binary). → drone_prism_grade_cap_increase */
export const idolMnemosynePrismUnlock: Source = {
  key: 'arch.idol.mnemosynePrismUnlock',
  name: 'Idol: Mnemosyne Unlock (Prism Cap)',
  system: 'archaeology',
  maxLevel: 1,
  fn: (o) => o * 5,
  inputs: [],
}
/** Mnemosyne (Epic A2): Prismatic Galactic Multi +0.01%/idol. Max 5000. → prismatic_floor_multi */
export const idolMnemosyne: Source = {
  key: 'arch.idol.mnemosyne',
  name: 'Idol: Mnemosyne (Prismatic Multi)',
  system: 'archaeology',
  maxLevel: 5000,
  fn: (n) => n * 0.0001,
  inputs: [],
}
/** Themis unlock (Legendary A2): Void Portal Chance +10% (binary). → void_portal_chance */
export const idolThemisVoidUnlock: Source = {
  key: 'arch.idol.themisVoidUnlock',
  name: 'Idol: Themis Unlock (Void Portal Chance)',
  system: 'archaeology',
  maxLevel: 1,
  fn: (o) => o * 0.1,
  inputs: [],
}
/** Themis (Legendary A2): Golden Void Portal Multi +0.01%/idol. Max 5000. → golden_void_portal_multi */
export const idolThemis: Source = {
  key: 'arch.idol.themis',
  name: 'Idol: Themis (Golden Void Multi)',
  system: 'archaeology',
  maxLevel: 5000,
  fn: (n) => n * 0.0001,
  inputs: [],
}
/** Charon unlock (Mythic A2): Ultra Stonks Chance +1% (binary). → ultra_stonks_chance */
export const idolCharonUltraStonksUnlock: Source = {
  key: 'arch.idol.charonUltraStonksUnlock',
  name: 'Idol: Charon Unlock (Ultra Stonks)',
  system: 'archaeology',
  maxLevel: 1,
  fn: (o) => o * 0.01,
  inputs: [],
}
/** Charon (Mythic A2): Super Stonks Multi +0.01%/idol. Max 3000. → super_stonks_multi */
export const idolCharon: Source = {
  key: 'arch.idol.charon',
  name: 'Idol: Charon (Super Stonks Multi)',
  system: 'archaeology',
  maxLevel: 3000,
  fn: (n) => n * 0.0001,
  inputs: [],
}
/** Prometheus unlock (Divine A2): All Radiant Star Chances +3% (binary). → star_radiant_chance */
export const idolPrometheusRadiantChanceUnlock: Source = {
  key: 'arch.idol.prometheusRadiantChanceUnlock',
  name: 'Idol: Prometheus Unlock (Star Radiant Chance)',
  system: 'archaeology',
  maxLevel: 1,
  fn: (o) => o * 0.03,
  inputs: [],
}
/** Prometheus unlock: All Radiant Star Chances +3% (binary). → super_star_radiant_chance */
export const idolPrometheus_SSRadiantChanceUnlock: Source = {
  key: 'arch.idol.prometheusSSRadiantChanceUnlock',
  name: 'Idol: Prometheus Unlock (SS Radiant Chance)',
  system: 'archaeology',
  maxLevel: 1,
  fn: (o) => o * 0.03,
  inputs: [],
}
/** Prometheus (Divine A2): All Radiant Star Multi +0.125%/idol. Max 1000. → star_radiant_multi */
export const idolPrometheusStarRadiantMul: Source = {
  key: 'arch.idol.prometheusStarRadiantMul',
  name: 'Idol: Prometheus (Star Radiant Multi)',
  system: 'archaeology',
  maxLevel: 1000,
  fn: (n) => n * 0.00125,
  inputs: [],
}
/** Prometheus (Divine A2): All Radiant Star Multi +0.125%/idol. Max 1000. → super_star_radiant_multi */
export const idolPrometheusSuperStarRadiantMul: Source = {
  key: 'arch.idol.prometheusSuperStarRadiantMul',
  name: 'Idol: Prometheus (Super Star Radiant Multi)',
  system: 'archaeology',
  maxLevel: 1000,
  fn: (n) => n * 0.00125,
  inputs: [],
}
/** Sisyphus unlock (Divine A2): Big Lootfrog Chance +1% (binary). → lootfrog_big_chance */
export const idolSisyphusUnlock: Source = {
  key: 'arch.idol.sisyphusUnlock',
  name: 'Idol: Sisyphus Unlock (Big Frog)',
  system: 'archaeology',
  maxLevel: 1,
  fn: (o) => o * 0.01,
  inputs: [],
}
/** Sisyphus (Divine A2): Big Lootfrog Multi +0.04%/idol. Max 7777. → lootfrog_big_multi */
export const idolSisyphusBigFrogMul: Source = {
  key: 'arch.idol.sisyphusBigFrogMul',
  name: 'Idol: Sisyphus (Big Frog Multi)',
  system: 'archaeology',
  maxLevel: 7777,
  fn: (n) => n * 0.0004,
  inputs: [],
}
/** Sisyphus (Divine A2): Galactic Floor Chance +0.003%/idol. Max 7777. → galactic_floor_chance */
export const idolSisyphusGalactic: Source = {
  key: 'arch.idol.sisyphusGalactic',
  name: 'Idol: Sisyphus (Galactic Floor)',
  system: 'archaeology',
  maxLevel: 7777,
  fn: (n) => n * 0.00003,
  inputs: [],
}
/** Sisyphus (Divine A2): Ultra Stonks Chance +0.0002%/idol. Max 7777. → ultra_stonks_chance */
export const idolSisyphusUltraStonks: Source = {
  key: 'arch.idol.sisyphusUltraStonks',
  name: 'Idol: Sisyphus (Ultra Stonks)',
  system: 'archaeology',
  maxLevel: 7777,
  fn: (n) => n * 0.000002,
  inputs: [],
}

export const archaeologySources = {
  // Upgrades — game stats
  archExpGainGem,
  archFragGainGem,
  archExpGainCommon,
  archExpGainEpic,
  archFragGainEpic,
  archExpGainLegendary,
  archExpGain2x,
  archFragGain125x,
  archGleamingChance,
  archGleamingMul,
  // Upgrades — internal arch stats
  archEnrageCD,
  archFlurryCD,
  archAbilityCD,
  archQuakeCD,
  archLootModGain,
  archLootModGainA2,
  archAbilityInsta,
  archAbilityInstaA1,
  archGoldCrosshairChance,
  archAutoTapChance,
  archAutoTapA1,
  archAllModChances,
  archAllModChancesA1,
  archStaminaModGain,
  archExpGainA1,
  archSuperCritDmgA1,
  // Asc0 Common Idols
  idolAthenaExp,
  idolAthenaSuperStar,
  idolCassandra,
  idolDemeter,
  idolEros,
  idolHera,
  idolAstraeusSupernovaMul,
  idolAstraeusDblTick,
  // Asc0 Rare Idols
  idolIris,
  idolMinos,
  idolPoseidon,
  idolChione,
  // Asc0 Epic Idols
  idolPandora,
  idolCephalus,
  idolTalosDroneExp,
  // Asc0 Legendary Idols
  idolNyx,
  idolTethysTier2Dock,
  idolTethysDronePower,
  idolTethysSuperShiny,
  // Asc0 Mythic Idols
  idolAtlasOrion,
  // Asc1 Idols
  idolHestia,
  idolAres,
  idolHephaestus,
  idolHyperion,
  idolCronusPortalChance,
  idolCronusPortalMulUnlock,
  // Asc2 Idols
  idolHermesContractCapUnlock,
  idolHermes10xContract,
  idolTheseusBankUnlock,
  idolTheseus,
  idolMnemosynePrismUnlock,
  idolMnemosyne,
  idolThemisVoidUnlock,
  idolThemis,
  idolCharonUltraStonksUnlock,
  idolCharon,
  idolPrometheusRadiantChanceUnlock,
  idolPrometheus_SSRadiantChanceUnlock,
  idolPrometheusStarRadiantMul,
  idolPrometheusSuperStarRadiantMul,
  idolSisyphusUnlock,
  idolSisyphusBigFrogMul,
  idolSisyphusGalactic,
  idolSisyphusUltraStonks,
}

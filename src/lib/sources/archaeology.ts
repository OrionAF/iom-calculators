import type { Op, Source } from '$lib/engine/types'

// Archaeology sources own all idol/upgrade effect numbers. fn(n) where n = idols
// owned or upgrade level (capped at maxLevel); binary unlocks use maxLevel 1.
// Item-conditional idols take only the count; the formula gates on item_active.
// statKey/op mirror the formula wiring (consistency test enforces op where used);
// unwired effects with a clear registry stat (including internal archaeology stats)
// still carry it. Effects with no registry stat are marked TODO and carry none.

const arch = (
  key: string,
  name: string,
  maxLevel: number,
  statKey: string | undefined,
  op: Op | undefined,
  fn: Source['fn'],
): Source => ({
  key: `arch.${key}`,
  name,
  system: 'archaeology',
  maxLevel,
  statKey,
  op,
  fn,
  inputs: [],
})

// ─── Archaeology Upgrades ─────────────────────────────────────────────────────

export const archExpGainGem = arch('upgrade.expGainGem', 'Arch Upgrade: Exp Gain (Gem)', 25, 'archaeology_exp_gain_multi', '+', (n) => n * 0.05)
export const archFragGainGem = arch('upgrade.fragGainGem', 'Arch Upgrade: Fragment Gain (Gem)', 25, 'archaeology_fragment_gain_multi', '+', (n) => n * 0.02)
// TODO no registry key: Gem — Stamina Mod Chance / Loot Mode Chance
export const archExpGainCommon = arch('upgrade.expGainCommon', 'Arch Upgrade: Exp Gain (Common)', 25, 'archaeology_exp_gain_multi', '+', (n) => n * 0.02)
export const archEnrageCD = arch('upgrade.enrageCD', 'Arch Upgrade: Enrage Cooldown', 15, 'archaeology_ability_cd', '+', (n) => n * 1)
export const archLootModGain = arch('upgrade.lootModGain', 'Arch Upgrade: Loot Mod Gain', 10, 'archaeology_spd_mod_gain', '+', (n) => n * 0.3)
export const archExpGainEpic = arch('upgrade.expGainEpic', 'Arch Upgrade: Exp Gain (Epic)', 20, 'archaeology_exp_gain_multi', '+', (n) => n * 0.03)
export const archFragGainEpic = arch('upgrade.fragGainEpic', 'Arch Upgrade: Fragment Gain (Epic)', 20, 'archaeology_fragment_gain_multi', '+', (n) => n * 0.02)
export const archFlurryCD = arch('upgrade.flurryCD', 'Arch Upgrade: Flurry Cooldown', 10, 'archaeology_ability_cd', '+', (n) => n * 1)
export const archExpGainLegendary = arch('upgrade.expGainLegendary', 'Arch Upgrade: Exp Gain (Legendary)', 15, 'archaeology_exp_gain_multi', '+', (n) => n * 0.05)
export const archAbilityCD = arch('upgrade.abilityCD', 'Arch Upgrade: Ability Cooldown', 10, 'archaeology_ability_cd', '+', (n) => n * 1)
export const archQuakeCD = arch('upgrade.quakeCD', 'Arch Upgrade: Quake Cooldown', 10, 'archaeology_ability_cd', '+', (n) => n * 2)
export const archAbilityInsta = arch('upgrade.abilityInsta', 'Arch Upgrade: Ability Instacharge', 20, 'archaeology_ability_insta', '+', (n) => n * 0.003)
// TODO no registry key: Asc0 stage 34 — Polychrome Archaeology Card Bonus +15%
export const archFragGain125x = arch('upgrade.fragGain125x', 'Arch Upgrade: Fragment Gain 1.25×', 1, 'archaeology_fragment_gain_multi', '+', (o) => o * 0.25)
export const archStaminaModGain = arch('upgrade.staminaModGain', 'Arch Upgrade: Stamina Mod Gain', 1, 'archaeology_spd_mod_gain', '+', (o) => o * 2)
export const archAllModChances = arch('upgrade.allModChances', 'Arch Upgrade: All Mod Chances', 1, 'archaeology_lood_mod_chance', '+', (o) => o * 0.015)
export const archExpGain2x = arch('upgrade.expGain2x', 'Arch Upgrade: Exp Gain 2×', 1, 'archaeology_exp_gain_multi', '+', (o) => o * 1.0)

// Ascension 1 upgrades
export const archAllModChancesA1 = arch('upgrade.allModChancesA1', 'Arch Upgrade A1: All Mod Chances', 30, 'archaeology_lood_mod_chance', '+', (n) => n * 0.0002)
export const archGoldCrosshairChance = arch('upgrade.goldCrosshairChance', 'Arch Upgrade A1: Gold Crosshair Chance', 5, 'archaeology_golden_crosshair_chance', '+', (n) => n * 0.01)
export const archAutoTapChance = arch('upgrade.autoTapChance', 'Arch Upgrade A1: Auto-Tap Chance', 5, 'archaeology_crosshair_auto_tap', '+', (n) => n * 0.01)
export const archAbilityInstaA1 = arch('upgrade.abilityInstaA1', 'Arch Upgrade A1: Ability Instacharge', 25, 'archaeology_ability_insta', '+', (n) => n * 0.001)
export const archExpGainA1 = arch('upgrade.expGainA1', 'Arch Upgrade A1: Exp Gain', 5, 'archaeology_exp_gain_multi', '+', (n) => n * 0.1)
// TODO uncertain mapping: Super Crit Damage is internal (no clear registry stat).
export const archSuperCritDmgA1 = arch('upgrade.superCritDmgA1', 'Arch Upgrade A1: Super Crit Damage', 40, undefined, undefined, (n) => n * 0.005)
export const archAutoTapA1 = arch('upgrade.autoTapA1', 'Arch Upgrade A1: Auto-Tap (Mythic)', 50, 'archaeology_crosshair_auto_tap', '+', (n) => n * 0.002)

// Ascension 2 upgrades
export const archGleamingChance = arch('upgrade.gleamingChance', 'Arch Upgrade A2: Gleaming Floor Chance', 30, 'gleaming_vein_chance', '+', (n) => n * 0.001)
export const archLootModGainA2 = arch('upgrade.lootModGainA2', 'Arch Upgrade A2: Loot Mod Gain', 30, 'archaeology_spd_mod_gain', '+', (n) => n * 0.05)
export const archGleamingMul = arch('upgrade.gleamingMul', 'Arch Upgrade A2: Gleaming Floor Multi', 30, 'gleaming_vein_multi', '+', (n) => n * 0.03)

// ─── Ascension 0 Common Idols ─────────────────────────────────────────────────

export const idolAthenaExp = arch('idol.athenaExp', 'Idol: Athena (Exp Gain)', 500, 'experience_multi', '+', (n) => n * 0.01)
export const idolAthenaSuperStar = arch('idol.athenaSuperStar', 'Idol: Athena (Super Star Chance)', 500, 'super_star_spawn_multi', '+', (n) => n * 0.0005)
// Wiki: "Rock Cake gives Bomb Super and Ultra Crit Chance +0.10%" — dual stat,
// split into siblings sharing the idol.cassandra key (one per crit tier).
export const idolCassandra = arch('idol.cassandra', 'Idol: Cassandra (Bomb Super Crit Chance)', 150, 'bomb_super_crit_chance', '+', (n) => n * 0.001)
export const idolCassandraUltra = arch('idol.cassandra', 'Idol: Cassandra (Bomb Ultra Crit Chance)', 150, 'bomb_ultra_crit_chance', '+', (n) => n * 0.001)
export const idolDemeter = arch('idol.demeter', 'Idol: Demeter (Golden Vein Multi)', 100, 'golden_vein_multi', '+', (n) => n * 0.02)
export const idolEros = arch('idol.eros', 'Idol: Eros (Lootbug Spawn Rate)', 50, 'lootbug_spawn_rate', '+', (n) => n * 0.004)
export const idolHera = arch('idol.hera', 'Idol: Hera (Contract Cap)', 3, 'contract_cap_increase', '+', (n) => n)
export const idolAstraeusSupernovaMul = arch('idol.astraeusSupernova', 'Idol: Astraeus (Supernova Multi)', 500, 'star_supernova_multi', '+', (n) => n * 0.0005)
export const idolAstraeusDblTick = arch('idol.astraeusDoubleTick', 'Idol: Astraeus (Double Tick)', 500, 'fishing_double_tick_chance', '+', (n) => n * 0.0003)

// ─── Ascension 0 Rare Idols ───────────────────────────────────────────────────

// TODO no registry key: Apollo — Transmuter Bomb Multi
export const idolIris = arch('idol.iris', 'Idol: Iris (Golden Floor Multi)', 100, 'golden_floor_multi', '+', (n) => n * 0.0025)
export const idolMinos = arch('idol.minos', 'Idol: Minos (Gem Upgrade Cap)', 5, 'gem_upgrade_cap_increase', '+', (n) => n)
// TODO registry key unclear: Leto — Pet Skin Level Up Chance
export const idolPoseidon = arch('idol.poseidon', 'Idol: Poseidon (Fishing Drone Power)', 20, 'fishing_drone_power', '+', (n) => n * 0.25)
export const idolChione = arch('idol.chione', 'Idol: Chione (Vein Income Multi)', 300, 'vein_income_multi', '+', (n) => n * 0.001)

// ─── Ascension 0 Epic Idols ───────────────────────────────────────────────────

export const idolPandora = arch('idol.pandora', 'Idol: Pandora (Supernova Multi)', 500, 'star_supernova_multi', '+', (n) => n * 0.005)
export const idolCephalus = arch('idol.cephalus', 'Idol: Cephalus (Game Speed)', 100, 'game_speed_multi', '+', (n) => n * 0.001)
// TODO no registry key: Dionysus — Coal Upgrade Cap / Drone Grade Caps
export const idolTalosDroneExp = arch('idol.talosDroneExp', 'Idol: Talos (Drone Exp)', 750, 'coal_drone_exp_multi', '+', (n) => n * 0.0005)
// TODO no registry key: Talos — Coal Capacity (absolute, not %)

// ─── Ascension 0 Legendary Idols ─────────────────────────────────────────────

// TODO no registry key: Andromeda — Polychrome Bar Cards
export const idolNyx = arch('idol.nyx', 'Idol: Nyx (Void Drone Cap)', 20, 'drone_void_grade_cap_increase', '+', (n) => n)
// TODO no registry key: Castor / Aphrodite

// ─── Ascension 0 Mythic Idols ─────────────────────────────────────────────────

// TODO no registry key: Zeus — card/relic caps
export const idolAtlasOrion = arch('idol.atlasOrion', 'Idol: Atlas (Orion Cap)', 10, 'star_orion_cap', '+', (n) => n)
// TODO no registry key: Atlas Hercules / Xanthe pet caps
export const idolTethysTier2Dock = arch('idol.tethysTier2Dock', 'Idol: Tethys (Tier 2 Dock)', 500, 'fishing_tier2_dock_multi', '+', (n) => n * 0.0005)
export const idolTethysDronePower = arch('idol.tethysDronePower', 'Idol: Tethys (Drone Power)', 500, 'fishing_drone_multiplier', '×1+', (n) => n * 0.0005)
export const idolTethysSuperShiny = arch('idol.tethysSuperShiny', 'Idol: Tethys (Super Shiny Multi)', 500, 'fishing_super_shiny_multi', '+', (n) => n * 0.0005)

// ─── Ascension 1 Idols ────────────────────────────────────────────────────────

export const idolHestia = arch('idol.hestia', 'Idol: Hestia (Fragment Gain)', 3000, 'archaeology_fragment_gain_multi', '+', (n) => n * 0.0001)
// Ares feeds fishing_drone_power only (the +50 drone-count unlock has no source).
export const idolAres = arch('idol.ares', 'Idol: Ares (Fishing Drone Power)', 5000, 'fishing_drone_power', '+', (n) => n * 0.0001)
export const idolHephaestus = arch('idol.hephaestus', 'Idol: Hephaestus (Coal Production)', 3000, 'coal_generation_seconds', '+', (n) => n * 0.00015)
export const idolHyperion = arch('idol.hyperion', 'Idol: Hyperion (Supergiant Multi)', 2500, 'star_supergiant_multi', '+', (n) => n * 0.00015)
export const idolCronusPortalChance = arch('idol.cronusPortalChance', 'Idol: Cronus (Rainbow Portal Chance)', 2000, 'rainbow_void_portal_chance', '+', (n) => n * 0.00005)
export const idolCronusPortalMulUnlock = arch('idol.cronusPortalMulUnlock', 'Idol: Cronus Unlock (Rainbow Portal Multi)', 1, 'rainbow_void_portal_multi', '+', (o) => o * 0.2)
// TODO no registry key: Hades — Infernal Card Bonus

// ─── Ascension 2 Idols ────────────────────────────────────────────────────────

export const idolHermesContractCapUnlock = arch('idol.hermesContractCapUnlock', 'Idol: Hermes Unlock (Contract Cap)', 1, 'contract_cap_increase', '+', (o) => o)
export const idolHermes10xContract = arch('idol.hermes10xContract', 'Idol: Hermes (10x Contract)', 1000, 'contract_10x_points_chance', '+', (n) => n * 0.00005)
export const idolTheseusBankUnlock = arch('idol.theseusBankUnlock', 'Idol: Theseus Unlock (Lootbug Bank)', 1, 'lootbug_bank_cap', '+', (o) => o * 15)
export const idolTheseus = arch('idol.theseus', 'Idol: Theseus (Lootbug Loot Multi)', 3000, 'lootbug_loot_multi', '+', (n) => n * 0.0001)
export const idolMnemosynePrismUnlock = arch('idol.mnemosynePrismUnlock', 'Idol: Mnemosyne Unlock (Prism Cap)', 1, 'drone_prism_grade_cap_increase', '+', (o) => o * 5)
export const idolMnemosyne = arch('idol.mnemosyne', 'Idol: Mnemosyne (Prismatic Multi)', 5000, 'prismatic_floor_multi', '+', (n) => n * 0.0001)
export const idolThemisVoidUnlock = arch('idol.themisVoidUnlock', 'Idol: Themis Unlock (Void Portal Chance)', 1, 'void_portal_chance', '+', (o) => o * 0.1)
export const idolThemis = arch('idol.themis', 'Idol: Themis (Golden Void Multi)', 5000, 'golden_void_portal_multi', '+', (n) => n * 0.0001)
export const idolCharonUltraStonksUnlock = arch('idol.charonUltraStonksUnlock', 'Idol: Charon Unlock (Ultra Stonks)', 1, 'ultra_stonks_chance', '+', (o) => o * 0.01)
export const idolCharon = arch('idol.charon', 'Idol: Charon (Super Stonks Multi)', 3000, 'super_stonks_multi', '+', (n) => n * 0.0001)
export const idolPrometheusRadiantChanceUnlock = arch('idol.prometheusRadiantChanceUnlock', 'Idol: Prometheus Unlock (Star Radiant Chance)', 1, 'star_radiant_chance', '+', (o) => o * 0.03)
export const idolPrometheus_SSRadiantChanceUnlock = arch('idol.prometheusSSRadiantChanceUnlock', 'Idol: Prometheus Unlock (SS Radiant Chance)', 1, 'super_star_radiant_chance', '+', (o) => o * 0.03)
export const idolPrometheusStarRadiantMul = arch('idol.prometheusStarRadiantMul', 'Idol: Prometheus (Star Radiant Multi)', 1000, 'star_radiant_multi', '+', (n) => n * 0.00125)
export const idolPrometheusSuperStarRadiantMul = arch('idol.prometheusSuperStarRadiantMul', 'Idol: Prometheus (Super Star Radiant Multi)', 1000, 'super_star_radiant_multi', '+', (n) => n * 0.00125)
export const idolSisyphusUnlock = arch('idol.sisyphusUnlock', 'Idol: Sisyphus Unlock (Big Frog)', 1, 'lootfrog_big_chance', '+', (o) => o * 0.01)
export const idolSisyphusBigFrogMul = arch('idol.sisyphusBigFrogMul', 'Idol: Sisyphus (Big Frog Multi)', 7777, 'lootfrog_big_multi', '+', (n) => n * 0.0004)
export const idolSisyphusGalactic = arch('idol.sisyphusGalactic', 'Idol: Sisyphus (Galactic Floor)', 7777, 'galactic_floor_chance', '+', (n) => n * 0.00003)
export const idolSisyphusUltraStonks = arch('idol.sisyphusUltraStonks', 'Idol: Sisyphus (Ultra Stonks)', 7777, 'ultra_stonks_chance', '+', (n) => n * 0.000002)

export const archaeologySources = {
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
  idolAthenaExp,
  idolAthenaSuperStar,
  idolCassandra,
  idolCassandraUltra,
  idolDemeter,
  idolEros,
  idolHera,
  idolAstraeusSupernovaMul,
  idolAstraeusDblTick,
  idolIris,
  idolMinos,
  idolPoseidon,
  idolChione,
  idolPandora,
  idolCephalus,
  idolTalosDroneExp,
  idolNyx,
  idolTethysTier2Dock,
  idolTethysDronePower,
  idolTethysSuperShiny,
  idolAtlasOrion,
  idolHestia,
  idolAres,
  idolHephaestus,
  idolHyperion,
  idolCronusPortalChance,
  idolCronusPortalMulUnlock,
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

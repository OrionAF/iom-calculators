import type { Source } from '$lib/engine/types'

// ─── World 4 World Quests ────────────────────────────────────────────────

export const wqWorld4SpeedModifierQ1: Source = {
  key: 'worldquests.World4SpeedModifierQ1',
  name: 'World Quest: World 4 Speed Modifier -10%',
  system: 'worldquests',
  maxLevel: 1,
  statKey: 'wq_world4_speedmodifier',
  fn: (n) => n * -0.1,
  inputs: [],
}
export const wqRainbowFloorChanceQ2: Source = {
  key: 'worldquests.RainbowFloorChanceQ2',
  name: 'World Quest: Rainbow Floor Chance +3%',
  system: 'worldquests',
  maxLevel: 1,
  statKey: 'rainbow_floor_chance',
  fn: (n) => n * 0.03,
  inputs: [],
}
export const wqGoldenFrogChanceQ3: Source = {
  key: 'worldquests.GoldenFrogChanceQ3',
  name: 'World Quest: Golden Frog Chance +1%',
  system: 'worldquests',
  maxLevel: 1,
  statKey: 'lootfrog_golden_chance',
  fn: (n) => n * 0.01,
  inputs: [],
}
export const wqWorld4SpeedModifierQ4: Source = {
  key: 'worldquests.World4SpeedModifierQ4',
  name: 'World Quest: World 4 Speed Modifier -10%',
  statKey: 'wq_world4_speedmodifier',
  system: 'worldquests',
  maxLevel: 1,
  fn: (n) => n * -0.1,
  inputs: [],
}
export const wqNovagiantMultiQ5: Source = {
  key: 'worldquests.NovagiantMultiQ5',
  name: 'World Quest: Novagiant Multi +10%',
  system: 'worldquests',
  maxLevel: 1,
  statKey: 'novagiant_combo_multi',
  fn: (n) => n * 0.1,
  inputs: [],
}
export const wqRainbowVoidPortalChanceQ6: Source = {
  key: 'worldquests.RainbowVoidPortalChanceQ6',
  name: 'World Quest: Rainbow Void Portal Chance +1%',
  system: 'worldquests',
  maxLevel: 1,
  statKey: 'rainbow_void_portal_chance',
  fn: (n) => n * 0.01,
  inputs: [],
}
export const wqWorld4SpeedModifierQ7: Source = {
  key: 'worldquests.World4SpeedModifierQ7',
  name: 'World Quest: World 4 Speed Modifier -10%',
  statKey: 'wq_world4_speedmodifier',
  system: 'worldquests',
  maxLevel: 1,
  fn: (n) => n * -0.1,
  inputs: [],
}
export const wqPrismaticFloorChanceQ8: Source = {
  key: 'worldquests.PrismaticFloorChanceQ8',
  name: 'World Quest: Prismatic Floor Chance +1%',
  system: 'worldquests',
  maxLevel: 1,
  statKey: 'prismatic_floor_chance',
  fn: (n) => n * 0.01,
  inputs: [],
}
export const wqElixirDroneGradeCapQ9: Source = {
  key: 'worldquests.ElixirDroneGradeCapQ9',
  name: 'World Quest: Elixir Drone Grade Cap +5',
  system: 'worldquests',
  maxLevel: 1,
  statKey: 'drone_elixir_grade_cap_increase',
  fn: (n) => n * 5,
  inputs: [],
}
export const wqVeinIncomeMultiQ10: Source = {
  key: 'worldquests.VeinIncomeMultiQ10',
  name: 'World Quest: Vein Income Multi 1.10×',
  system: 'worldquests',
  maxLevel: 1,
  statKey: 'vein_income_multi',
  fn: (n) => 1 + n * 0.1,
  inputs: [],
}
export const wqLootfrog10SpawnChanceQ11: Source = {
  key: 'worldquests.Lootfrog10SpawnChanceQ11',
  name: 'World Quest: Lootfrog 10x Spawn Chance +0.25%',
  system: 'worldquests',
  maxLevel: 1,
  statKey: 'lootfrog_10x_spawn_chance',
  fn: (n) => n * 0.0025,
  inputs: [],
}
export const wqWorld4SpeedModifierQ12: Source = {
  key: 'worldquests.World4SpeedModifierQ12',
  name: 'World Quest: World 4 Speed Modifier -10%',
  statKey: 'wq_world4_speedmodifier',
  system: 'worldquests',
  maxLevel: 1,
  fn: (n) => n * -0.1,
  inputs: [],
}
export const wqGalacticRainbowFloorChanceQ13: Source = {
  key: 'worldquests.GalacticRainbowFloorChanceQ13',
  name: 'World Quest: Galactic Rainbow Floor Chance +2%',
  system: 'worldquests',
  maxLevel: 1,
  statKey: 'galactic_floor_chance',
  fn: (n) => n * 0.02,
  inputs: [],
}
export const wqUnlockGoldenYummyPizzaQ14: Source = {
  key: 'worldquests.UnlockGoldenYummyPizzaQ14',
  name: 'World Quest: Unlock Golden Yummy Pizza',
  system: 'worldquests',
  maxLevel: 1,
  statKey: 'item_unlock_golden_yummy_pizza',
  fn: (n) => n * 1,
  inputs: [],
}
export const wqWorld4SpeedModifierQ15: Source = {
  key: 'worldquests.World4SpeedModifierQ15',
  name: 'World Quest: World 4 Speed Modifier -10%',
  statKey: 'wq_world4_speedmodifier',
  system: 'worldquests',
  maxLevel: 1,
  fn: (n) => n * -0.1,
  inputs: [],
}
export const wqRainbowVeinChanceQ16: Source = {
  key: 'worldquests.RainbowVeinChanceQ16',
  name: 'World Quest: Rainbow Vein Chance +6%',
  system: 'worldquests',
  maxLevel: 1,
  statKey: 'rainbow_vein_chance',
  fn: (n) => n * 0.06,
  inputs: [],
}
export const wqAllFloorMultiQ17: Source = {
  key: 'worldquests.AllFloorMultiQ17',
  name: 'World Quest: All Floor Multi +5%',
  system: 'worldquests',
  maxLevel: 1,
  statKey: 'all_floor_multipliers',
  fn: (n) => n * 0.05,
  inputs: [],
}
export const wqBigLootfrogMultiQ18: Source = {
  key: 'worldquests.BigLootfrogMultiQ18',
  name: 'World Quest: Big Lootfrog Multi +10%',
  system: 'worldquests',
  maxLevel: 1,
  statKey: 'lootfrog_big_multi',
  fn: (n) => n * 0.1,
  inputs: [],
}
export const wqButterflyPetLevelCapQ19: Source = {
  key: 'worldquests.ButterflyPetLevelCapQ19',
  name: 'World Quest: Butterfly Pet Level Cap +5',
  system: 'worldquests',
  maxLevel: 1,
  statKey: 'pet_level_cap_butterfly',
  fn: (n) => n * 5,
  inputs: [],
}
export const wqUnlockGoldenCosmicCandyQ20: Source = {
  key: 'worldquests.UnlockGoldenCosmicCandyQ20',
  name: 'World Quest: Unlock Golden Cosmic Candy',
  system: 'worldquests',
  maxLevel: 1,
  statKey: 'item_unlock_golden_cosmic_candy',
  fn: (n) => n * 1,
  inputs: [],
}

export const worldquestsSources = {
  wqWorld4SpeedModifierQ1,
  wqRainbowFloorChanceQ2,
  wqGoldenFrogChanceQ3,
  wqWorld4SpeedModifierQ4,
  wqNovagiantMultiQ5,
  wqRainbowVoidPortalChanceQ6,
  wqWorld4SpeedModifierQ7,
  wqPrismaticFloorChanceQ8,
  wqElixirDroneGradeCapQ9,
  wqVeinIncomeMultiQ10,
  wqLootfrog10SpawnChanceQ11,
  wqWorld4SpeedModifierQ12,
  wqGalacticRainbowFloorChanceQ13,
  wqUnlockGoldenYummyPizzaQ14,
  wqWorld4SpeedModifierQ15,
  wqRainbowVeinChanceQ16,
  wqAllFloorMultiQ17,
  wqBigLootfrogMultiQ18,
  wqButterflyPetLevelCapQ19,
  wqUnlockGoldenCosmicCandyQ20,
}

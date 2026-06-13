import type { Op, Source } from '$lib/engine/types'

// World quest rewards are binary (completed=1, not=0), so maxLevel is fixed
// at 1. op annotations on wired sources must match the formula op
// (consistency test enforces this).

const wq = (key: string, name: string, statKey: string, op: Op, fn: Source['fn']): Source => ({
  key: `worldquests.${key}`,
  name: `World Quest: ${name}`,
  system: 'worldquests',
  maxLevel: 1,
  statKey,
  op,
  fn,
  inputs: [],
})

// ─── World 4 World Quests ────────────────────────────────────────────────

export const wqWorld4SpeedModifierQ1 = wq('World4SpeedModifierQ1', 'World 4 Speed Modifier -10%', 'wq_world4_speedmodifier', '+', (n) => n * -0.1)
export const wqRainbowFloorChanceQ2 = wq('RainbowFloorChanceQ2', 'Rainbow Floor Chance +3%', 'rainbow_floor_chance', '+', (n) => n * 0.03)
export const wqGoldenFrogChanceQ3 = wq('GoldenFrogChanceQ3', 'Golden Frog Chance +1%', 'lootfrog_golden_chance', '+', (n) => n * 0.01)
export const wqWorld4SpeedModifierQ4 = wq('World4SpeedModifierQ4', 'World 4 Speed Modifier -10%', 'wq_world4_speedmodifier', '+', (n) => n * -0.1)
export const wqNovagiantMultiQ5 = wq('NovagiantMultiQ5', 'Novagiant Multi +10%', 'novagiant_combo_multi', '×1+', (n) => n * 0.1)
export const wqRainbowVoidPortalChanceQ6 = wq('RainbowVoidPortalChanceQ6', 'Rainbow Void Portal Chance +1%', 'rainbow_void_portal_chance', '+', (n) => n * 0.01)
export const wqWorld4SpeedModifierQ7 = wq('World4SpeedModifierQ7', 'World 4 Speed Modifier -10%', 'wq_world4_speedmodifier', '+', (n) => n * -0.1)
export const wqPrismaticFloorChanceQ8 = wq('PrismaticFloorChanceQ8', 'Prismatic Floor Chance +1%', 'prismatic_floor_chance', '+', (n) => n * 0.01)
export const wqElixirDroneGradeCapQ9 = wq('ElixirDroneGradeCapQ9', 'Elixir Drone Grade Cap +5', 'drone_elixir_grade_cap_increase', '+', (n) => n * 5)
export const wqVeinIncomeMultiQ10 = wq('VeinIncomeMultiQ10', 'Vein Income Multi 1.10×', 'vein_income_multi', '×', (n) => 1 + n * 0.1)
export const wqLootfrog10SpawnChanceQ11 = wq('Lootfrog10SpawnChanceQ11', 'Lootfrog 10x Spawn Chance +0.25%', 'lootfrog_10x_spawn_chance', '+', (n) => n * 0.0025)
export const wqWorld4SpeedModifierQ12 = wq('World4SpeedModifierQ12', 'World 4 Speed Modifier -10%', 'wq_world4_speedmodifier', '+', (n) => n * -0.1)
export const wqGalacticRainbowFloorChanceQ13 = wq('GalacticRainbowFloorChanceQ13', 'Galactic Rainbow Floor Chance +2%', 'galactic_floor_chance', '+', (n) => n * 0.02)
export const wqUnlockGoldenYummyPizzaQ14 = wq('UnlockGoldenYummyPizzaQ14', 'Unlock Golden Yummy Pizza', 'item_unlock_golden_yummy_pizza', '+', (n) => n * 1)
export const wqWorld4SpeedModifierQ15 = wq('World4SpeedModifierQ15', 'World 4 Speed Modifier -10%', 'wq_world4_speedmodifier', '+', (n) => n * -0.1)
export const wqRainbowVeinChanceQ16 = wq('RainbowVeinChanceQ16', 'Rainbow Vein Chance +6%', 'rainbow_vein_chance', '+', (n) => n * 0.06)
export const wqAllFloorMultiQ17 = wq('AllFloorMultiQ17', 'All Floor Multi +5%', 'all_floor_multipliers', '×1+', (n) => n * 0.05)
export const wqBigLootfrogMultiQ18 = wq('BigLootfrogMultiQ18', 'Big Lootfrog Multi +10%', 'lootfrog_big_multi', '×1+', (n) => n * 0.1)
export const wqButterflyPetLevelCapQ19 = wq('ButterflyPetLevelCapQ19', 'Butterfly Pet Level Cap +5', 'pet_level_cap_butterfly', '+', (n) => n * 5)
export const wqUnlockGoldenCosmicCandyQ20 = wq('UnlockGoldenCosmicCandyQ20', 'Unlock Golden Cosmic Candy', 'item_unlock_golden_cosmic_candy', '+', (n) => n * 1)

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

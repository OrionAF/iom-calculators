import type { FormulaMap, Source } from '$lib/engine/types'
import { skillTreeSources as sk } from '$lib/sources/skillTree'
import { relicSources as rel } from '$lib/sources/relics'
import { storeSources as st } from '$lib/sources/store'
import { contractSources as ct } from '$lib/sources/contracts'
import { artifactSources as art } from '$lib/sources/artifacts'
import { constructSources as con } from '$lib/sources/construct'
import { petSources as pet } from '$lib/sources/pets'
import { challengeSources as ch } from '$lib/sources/challenges'
import { fishingSources as f } from '$lib/sources/fishing'
import { stargazingSources as sg } from '$lib/sources/stargazing'
import { upgradeSources as up } from '$lib/sources/upgrades'

const U: Source = { key: '_unknown', name: 'Unknown source', system: 'upgrades', fn: () => 0, inputs: [] }

export const craftingFormulas = {
  free_craft_chance: {
    base: 0,
    contributions: [
      { source: art.artFreeCraftT1,              op: '+' },
      { source: st.vpCraftmasterFreeCraft,       op: '+' },
      { source: U, op: '+', unknown: true },
    ],
  },
  double_craft_chance: {
    base: 0,
    contributions: [
      { source: sk.oreEfficiencyDoubleCraft,     op: '+' },
      { source: pet.petAxolotlDoubleCraft,       op: '+' },
      { source: ch.chDoubleCraft,                op: '+' },
      { source: up.upgrDoubleCraftChance,         op: '+' },

    ],
  },
  triple_craft_chance: {
    base: 0,
    contributions: [
      { source: sk.heftyHammersTripleCraft,      op: '+' },
      { source: art.artTripleCraftT1,            op: '+' },
      { source: ct.ctTripleCraft,                op: '+' },
      { source: up.upgrTripleCraftChance,         op: '+' },

    ],
  },
  craft_5x_chance: {
    base: 0,
    contributions: [
      { source: rel.legendaryRelicCraft5x,       op: '+' },
    ],
  },
  craft_10x_chance: {
    base: 0,
    contributions: [
      { source: sk.heftyHammers10xCraft,         op: '+' },
      { source: sk.imRunningOut10xCraft,          op: '+' },
      { source: ct.ct10xCraft,                   op: '+' },
      { source: st.founderCraft10x,              op: '+' },
      { source: st.vpCraftmaster10xCraft,        op: '+' },
      { source: f.noticeT1CraftChance10x,        op: '+' },
      { source: up.upgrCraft10xChance,            op: '+' },

    ],
  },
  craft_20x_chance: {
    base: 0,
    contributions: [
      { source: rel.mythicRelicCraft20x,         op: '+' },
      { source: U, op: '+', unknown: true },     // Skill-Tree: Super Smither
    ],
  },
  craft_100x_chance: {
    base: 0,
    contributions: [
      { source: con.staIgnitionCraft100x,        op: '+' },
      { source: st.vpCraftmaster100xCraft,       op: '+' },
      { source: sg.starOrionCraft100x,           op: '+' },
      { source: f.noticeT2CraftChance100x,       op: '+' },
      { source: up.upgrCraft100xChance,           op: '+' },

    ],
  },
  bar_output_multi: {
    base: 1,
    contributions: [
      { source: art.artBarOutputT4,              op: '+' },
      { source: st.perkBarOutput,                op: '×' },
      { source: up.upgrBarOutputMul,              op: '+' },
      { source: U, op: '×', unknown: true },     // Cards
    ],
  },
  bar_upgrade_cost_reduction: {
    base: 0,
    contributions: [
      { source: ch.chBarUpgradeCosts,            op: '+' },
      { source: ct.ctBarCostReductionW1,         op: '+' },
      { source: U, op: '+', unknown: true },
    ],
  },
  bar_craft_cost_multi: {
    base: 1,
    contributions: [
      { source: sk.imRunningOutBarCraft,             op: '+' },
      { source: sk.moreOreMoreProblemsBarCraft,      op: '+' },
      { source: pet.petAxolotlBarCraft,              op: '+' },
      { source: st.vpCraftmasterBarCraft,            op: '+' },
      { source: sg.starAquariusBarCraft,         op: '+' },
      { source: ch.chBarCraftCosts,              op: '+' },
      { source: U, op: '+', unknown: true },         // Store + Cards
    ],
  },
} satisfies FormulaMap

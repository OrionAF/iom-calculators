import type { FormulaMap, Source } from '$lib/engine/types'
import { skillTreeSources as sk } from '$lib/sources/skillTree'
import { relicSources as rel } from '$lib/sources/relics'
import { storeSources as st } from '$lib/sources/store'
import { contractSources as ct } from '$lib/sources/contracts'
import { artifactSources as art } from '$lib/sources/artifacts'
import { constructSources as con } from '$lib/sources/construct'
import { petSources as pet } from '$lib/sources/pets'
import { challengeSources as ch } from '$lib/sources/challenges'

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
      { source: U, op: '+', unknown: true },     // Pets + Upgrades
    ],
  },
  triple_craft_chance: {
    base: 0,
    contributions: [
      { source: sk.heftyHammersTripleCraft,      op: '+' },
      { source: art.artTripleCraftT1,            op: '+' },
      { source: ct.ctTripleCraft,                op: '+' },
      { source: U, op: '+', unknown: true },     // Prestige + Upgrades + Contracts
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
      { source: U, op: '+', unknown: true },     // Fishing + Upgrades + Contracts
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
      { source: U, op: '+', unknown: true },     // Construct + Stargazing + Fishing + Upgrades
    ],
  },
  bar_output_multi: {
    base: 1,
    contributions: [
      { source: art.artBarOutputT4,              op: '+' },
      { source: st.perkBarOutput,                op: '×' },
      { source: U, op: '×', unknown: true },     // Cards
    ],
  },
  bar_upgrade_cost_reduction: { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  bar_craft_cost_multi: {
    base: 1,
    contributions: [
      { source: sk.imRunningOutBarCraft,             op: '+' },
      { source: sk.moreOreMoreProblemsBarCraft,      op: '+' },
      { source: pet.petAxolotlBarCraft,              op: '+' },
      { source: st.vpCraftmasterBarCraft,            op: '+' },
      { source: U, op: '+', unknown: true },         // Store + Cards + Pets + Stargazing
    ],
  },
} satisfies FormulaMap

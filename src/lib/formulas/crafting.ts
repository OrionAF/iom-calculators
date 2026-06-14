import type { FormulaMap, Source } from '$lib/engine/types'
import { defineFormulas } from './define'
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
import { cardSources as card } from '$lib/sources/cards'

const U: Source = {
  key: '_unknown',
  name: 'Unknown source',
  system: 'upgrades',
  fn: () => 0,
  inputs: [],
}

export const craftingFormulas: FormulaMap = defineFormulas({
  free_craft_chance: {
    contributions: [
      { source: art.artFreeCraftT1, op: '+' },
      { source: st.storeVpCraftmasterFreeCraft, op: '+' },
      { source: U, op: '+', unknown: true },
    ],
  },
  double_craft_chance: {
    contributions: [
      { source: sk.oreEfficiencyDoubleCraft, op: '+' },
      { source: pet.petAxolotlDoubleCraft, op: '+' },
      { source: ch.chDoubleCraft, op: '+' },
      { source: up.upgrDoubleCraftChance, op: '+' },
    ],
  },
  triple_craft_chance: {
    contributions: [
      { source: sk.heftyHammersTripleCraft, op: '+' },
      { source: art.artTripleCraftT1, op: '+' },
      { source: ct.ctTripleCraft, op: '+' },
      { source: up.upgrTripleCraftChance, op: '+' },
    ],
  },
  craft_5x_chance: {
    contributions: [{ source: rel.legendaryRelicCraft5x, op: '+' }],
  },
  craft_10x_chance: {
    contributions: [
      { source: sk.heftyHammers10xCraft, op: '+' },
      { source: sk.imRunningOut10xCraft, op: '+' },
      { source: ct.ct10xCraft, op: '+' },
      { source: st.storeFounderCraft10x, op: '+' },
      { source: st.storeVpCraftmaster10xCraft, op: '+' },
      { source: f.noticeT1CraftChance10x, op: '+' },
      { source: up.upgrCraft10xChance, op: '+' },
    ],
  },
  craft_20x_chance: {
    contributions: [
      { source: rel.mythicRelicCraft20x, op: '+' },
      { source: U, op: '+', unknown: true }, // Skill-Tree: Super Smither
    ],
  },
  craft_100x_chance: {
    contributions: [
      { source: con.staIgnitionCraft100x, op: '+' },
      { source: st.storeVpCraftmaster100xCraft, op: '+' },
      { source: sg.starOrionCraft100x, op: '+' },
      { source: f.noticeT2CraftChance100x, op: '+' },
      { source: up.upgrCraft100xChance, op: '+' },
    ],
  },
  bar_output_multi: {
    contributions: [
      { source: art.artBarOutputT4, op: '+' },
      { source: st.storePerkBarOutput, op: '×' },
      { source: up.upgrBarOutputMul, op: '+' },
      { source: card.cardLegLaviathan, op: '×1+' },
      { source: card.cardPetAxolotlInf, op: '×1+' },
    ],
  },
  bar_upgrade_cost_reduction: {
    contributions: [
      { source: ch.chBarUpgradeCosts, op: '+' },
      { source: ct.ctBarCostReductionW1, op: '+' },
      { source: sk.ingotIntuitionBarCost, op: '+' },
    ],
  },
  bar_craft_cost_multi: {
    contributions: [
      { source: sk.imRunningOutBarCraft, op: '+' },
      { source: sk.moreOreMoreProblemsBarCraft, op: '+' },
      { source: pet.petAxolotlBarCraft, op: '+' },
      { source: st.storeVpCraftmasterBarCraft, op: '+' },
      { source: sg.starAquariusBarCraft, op: '+' },
      { source: ch.chBarCraftCosts, op: '+' },
      { source: U, op: '+', unknown: true }, // Store + Cards
      { source: card.cardPetAxolotl, op: '+' },
    ],
  },
})

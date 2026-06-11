import type { FormulaMap, Source } from '$lib/engine/types'
import { defineFormulas } from './define'
import { skillTreeSources as sk } from '$lib/sources/skillTree'
import { constructSources as con } from '$lib/sources/construct'
import { petSources as pet } from '$lib/sources/pets'
import { archaeologySources as arch } from '$lib/sources/archaeology'
import { fishingSources as f } from '$lib/sources/fishing'
import { stargazingSources as sg } from '$lib/sources/stargazing'
import { upgradeSources as up } from '$lib/sources/upgrades'

const U: Source = {
  key: '_unknown',
  name: 'Unknown source',
  system: 'upgrades',
  fn: () => 0,
  inputs: [],
}

export const contractsFormulas: FormulaMap = defineFormulas({
  contract_cost_reduction: {
    contributions: [
      { source: U, op: '+', unknown: true }, // Relics: Rare Relic
    ],
  },
  contract_double_points_chance: {
    contributions: [
      { source: sg.starCancerDoubleContract, op: '+' },
      { source: sg.ssDoubleContractPoints, op: '+' },
    ],
  },
  contract_triple_points_chance: {
    contributions: [
      { source: sk.whosAskingTripleContract, op: '+' },
      { source: con.staAffluenceTripleContract, op: '+' },
      { source: f.noticeT1TripleContractChance, op: '+' },
      { source: up.upgrTripleContractChance, op: '+' },
      { source: U, op: '+', unknown: true }, // Skins
    ],
  },
  contract_5x_points_chance: {
    contributions: [
      { source: pet.petRabbitQuest5xContract, op: '+' },
      { source: U, op: '+', unknown: true },
    ],
  },
  contract_10x_points_chance: {
    contributions: [
      { source: sk.pleaseSirContract10x, op: '+' },
      { source: con.staAffluence10xContract, op: '+' },
      { source: arch.idolHermes10xContract, op: '+' },
      { source: f.noticeT2ContractChance10x, op: '+' },
      { source: U, op: '+', unknown: true }, // Cards
    ],
  },
  contract_points_rewarded: {
    contributions: [
      { source: sk.whosAskingContractPoints, op: '+' },
      { source: pet.petRabbitSkinContractPoints, op: '+' },
      { source: U, op: '+', unknown: true }, // Cards
    ],
  },
  contract_cap_increase: {
    contributions: [
      { source: sk.idleObeliskMincerContractCap, op: '+' },
      { source: con.staChildhoodContractCap, op: '+' },
      { source: con.staAffluenceContractCap, op: '+' },
      { source: arch.idolHera, op: '+' },
      { source: arch.idolHermesContractCapUnlock, op: '+' },
      { source: pet.petHappyBotSkinContractCap, op: '+' },
      { source: U, op: '+', unknown: true },
    ],
  },
  contract_upgrade_cost_reduction: {
    contributions: [
      { source: pet.petRabbitContractCost, op: '+' },
      { source: pet.petRabbitQuestContractCost, op: '+' },
      { source: sg.starCancerContractCost, op: '+' },
      { source: U, op: '+', unknown: true },
    ],
  },
})

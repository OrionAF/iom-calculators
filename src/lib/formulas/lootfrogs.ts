import type { FormulaMap, Source } from '$lib/engine/types'
import { defineFormulas } from './define'
import { skillTreeSources as sk } from '$lib/sources/skillTree'
import { storeSources as st } from '$lib/sources/store'
import { workshopSources as ws } from '$lib/sources/workshop'
import { contractSources as ct } from '$lib/sources/contracts'
import { petSources as pet } from '$lib/sources/pets'
import { cardSources as card } from '$lib/sources/cards'
import { challengeSources as ch } from '$lib/sources/challenges'
import { constructSources as con } from '$lib/sources/construct'
import { archaeologySources as arch } from '$lib/sources/archaeology'
import { droneSources as drone } from '$lib/sources/drones'
import { upgradeSources as up } from '$lib/sources/upgrades'
import { tributesSources as tr } from '$lib/sources/tributes'
import { worldquestsSources as wq } from '$lib/sources/worldquests'

const U: Source = {
  key: '_unknown',
  name: 'Unknown source',
  system: 'store',
  fn: () => 0,
  inputs: [],
}

export const lootfrogsFormulas: FormulaMap = defineFormulas({
  lootfrogs_caught: { contributions: [] },
  golden_lootfrogs_caught: { contributions: [] },
  lootfrog_capacity: {
    contributions: [
      { source: sk.frogFrenzyLootfrogCap, op: '+' },
      { source: card.cardLootfrog, op: '+' },
      { source: st.vpFrogFrenzyCapacity, op: '+' },
      { source: U, op: '+', unknown: true },
    ],
  },
  lootfrog_loot_multi: {
    contributions: [
      { source: ws.wsLootfrogLootW4, op: '+' },
      { source: st.vpFrogFrenzyLootfrogMul, op: '×' },
      { source: up.upgrLootfrogLootMul, op: '+' },
      { source: U, op: '+', unknown: true }, // Workshop + Cards
      { source: card.cardPetButterflyInf, op: '×1+' },
      { source: card.cardDroneFroggerInf, op: '×1+' },
    ],
  },
  lootfrog_golden_chance: {
    contributions: [
      { source: ch.chGoldenFrogChance, op: '+' },
      { source: con.staAntagonismGoldenFrogChance, op: '+' },
      { source: U, op: '+', unknown: true }, // Stargazing BH6, Fishing Melting G T2, WQ3
      { source: tr.trMeltingGibbousT2GFC, op: '+' },
      { source: wq.wqGoldenFrogChanceQ3, op: '+' },
      { source: card.cardGoldenLootfrog, op: '+' },
    ],
  },
  lootfrog_golden_multi: {
    contributions: [
      { source: con.staAntagonismGoldenFrogMul, op: '+' },
      { source: U, op: '+', unknown: true },
    ],
  },
  lootfrog_triple_spawn_chance: {
    contributions: [
      { source: sk.frogFrenzyTripleLootfrog, op: '+' },
      { source: pet.petButterflyLootfrogTriple, op: '+' },
      { source: ct.ctLootfrogTriple, op: '+' },
      { source: st.vpFrogFrenzyTriple, op: '+' },
      { source: U, op: '+', unknown: true },
    ],
  },
  lootfrog_10x_spawn_chance: {
    contributions: [
      { source: drone.coalLootfrog10x, op: '+' },
      { source: wq.wqLootfrog10SpawnChanceQ11, op: '+' },
    ],
  },
  lootfrog_big_chance: {
    contributions: [
      { source: ch.chBigLootfrogChance, op: '+' },
      { source: pet.petButterflyQuestBigFrog, op: '+' },
      { source: arch.idolSisyphusUnlock, op: '+' },
      { source: U, op: '+', unknown: true },
    ],
  },
  lootfrog_big_multi: {
    contributions: [
      { source: arch.idolSisyphusBigFrogMul, op: '+' },
      { source: card.cardBigLootfrog, op: '×' },
      { source: wq.wqBigLootfrogMultiQ18, op: '×1+' },
    ],
  },
})

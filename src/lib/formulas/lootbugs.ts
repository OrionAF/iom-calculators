import type { FormulaMap, Source } from '$lib/engine/types'
import { defineFormulas } from './define'
import { skillTreeSources as sk } from '$lib/sources/skillTree'
import { storeSources as st } from '$lib/sources/store'
import { itemSources as it } from '$lib/sources/items'
import { constructSources as con } from '$lib/sources/construct'
import { petSources as pet } from '$lib/sources/pets'
import { cardSources as card } from '$lib/sources/cards'
import { challengeSources as ch } from '$lib/sources/challenges'
import { stargazingSources as sg } from '$lib/sources/stargazing'
import { archaeologySources as arch } from '$lib/sources/archaeology'
import { upgradeSources as up } from '$lib/sources/upgrades'
import { tributesSources as tr } from '$lib/sources/tributes'
import { skinsSources as sn } from '$lib/sources/skins'

const U: Source = {
  key: '_unknown',
  name: 'Unknown source',
  system: 'store',
  fn: () => 0,
  inputs: [],
}

export const lootbugsFormulas: FormulaMap = defineFormulas({
  lootbug_spawn_rate: {
    contributions: [
      { source: it.lootbugLanternSpawn, op: '×' },
      { source: it.goldenLootbugLanternSpawn, op: '×' },
      { source: pet.petDuckLootbugSpawn, op: '+' },
      { source: ch.chLootbugSpawn, op: '+' },
      { source: sg.starSagittariusLootbugSpawn, op: '+' },
      { source: arch.idolEros, op: '+' },
      { source: up.upgrLootbugSpawnRate, op: '+' },
      { source: U, op: '+', unknown: true }, // Drones fueled Bear (temp) + Cards
    ],
  },
  lootbug_triple_chance: {
    contributions: [
      { source: pet.petWhaleLootbugTriple, op: '+' },
      { source: sg.starLibraTripleLootbug, op: '+' },
      { source: U, op: '+', unknown: true }, // Cards + Skins
      { source: sn.snTripleLootbugChance, op: '+' },
    ],
  },
  lootbug_golden_chance: {
    contributions: [
      { source: card.cardGoldenLootbug, op: '+' },
      { source: st.founderGoldenLootbug, op: '+' },
      { source: st.vpGoldenLootbug, op: '+' },
      { source: U, op: '+', unknown: true }, // Stargazing: Aquarius + Cards
    ],
  },
  lootbug_bank_cap: {
    contributions: [
      { source: sk.savingForARainyDayLootbugCap, op: '+' },
      { source: sk.anyoneUpLootinBankCap, op: '+' },
      { source: it.lootbugLanternPermCap, op: '+' },
      { source: it.goldenLootbugLanternPermCap, op: '+' },
      { source: con.staEastwoodLootbugCap, op: '+' },
      { source: pet.petWhaleQuestLootbugBank, op: '+' },
      { source: st.vpBankersLootbugBank, op: '+' },
      { source: st.vpBiggerBankersLootbugBank, op: '+' },
      { source: st.vpLootbugBonanzaBankCap, op: '+' },
      { source: sg.starOphiuchusFreebie, op: '+' },
      { source: sg.ssBankedFreebieLootbugLootbug, op: '+' },
      { source: arch.idolTheseusBankUnlock, op: '+' },
      { source: tr.trStormSerpentT1LBC, op: '+' },
      { source: U, op: '×', unknown: true }, // Stargazing: 8th Black Hole boost (multiplies everything)
      { source: sn.snBankedFreebiesLootbugs, op: '×1+' },
    ],
  },
  lootbug_gem_cost_reduction: {
    contributions: [
      { source: sk.savingForARainyDayLootbugGem, op: '+' },
      { source: U, op: '+', unknown: true }, // Pets + Skins
      { source: sn.snLootbugGemPrice, op: '+' },
    ],
  },
  lootbug_loot_multi: {
    contributions: [
      { source: sk.anyoneUpLootinLootMulti, op: '+' },
      { source: card.cardLootbug, op: '×' },
      { source: st.vpLootbugBonanzaLootMul, op: '×' },
      { source: sg.ssLootbugLootMul, op: '+' },
      { source: arch.idolTheseus, op: '+' },
      { source: U, op: '+', unknown: true }, // Store + Cards + Fishing
      { source: tr.trStormSerpentT2LLM, op: '×' },
    ],
  },
  lootfrog_lanterns_used: { contributions: [] },
})

import type { FormulaMap, Source } from '$lib/engine/types'
import { skillTreeSources as sk } from '$lib/sources/skillTree'
import { storeSources as st } from '$lib/sources/store'
import { itemSources as it } from '$lib/sources/items'
import { constructSources as con } from '$lib/sources/construct'
import { petSources as pet } from '$lib/sources/pets'
import { cardSources as card } from '$lib/sources/cards'
import { challengeSources as ch } from '$lib/sources/challenges'
import { stargazingSources as sg } from '$lib/sources/stargazing'
import { archaeologySources as arch } from '$lib/sources/archaeology'

const U: Source = { key: '_unknown', name: 'Unknown source', system: 'store', fn: () => 0, inputs: [] }

export const lootbugsFormulas = {
  lootbug_spawn_rate: {
    base: 0,
    contributions: [
      { source: it.lootbugLanternSpawn,            op: '×' },
      { source: it.goldenLootbugLanternSpawn,      op: '×' },
      { source: pet.petDuckLootbugSpawn,           op: '+' },
      { source: ch.chLootbugSpawn,             op: '+' },
      { source: sg.starSagittariusLootbugSpawn, op: '+' },
      { source: arch.idolEros,                 op: '+' },
      { source: U, op: '+', unknown: true }, // Drones fueled Bear (temp) + Cards + Upgrades
    ],
  },
  lootbug_triple_chance: {
    base: 0,
    contributions: [
      { source: pet.petWhaleLootbugTriple,     op: '+' },
      { source: sg.starLibraTripleLootbug,     op: '+' },
      { source: U, op: '+', unknown: true },   // Cards + Skins
    ],
  },
  lootbug_golden_chance: {
    base: 0,
    contributions: [
      { source: card.cardGoldenLootbug,           op: '+' },
      { source: st.founderGoldenLootbug,          op: '+' },
      { source: st.vpGoldenLootbug,               op: '+' },
      { source: U, op: '+', unknown: true },      // Stargazing: Aquarius + Cards
    ],
  },
  lootbug_bank_cap: {
    base: 0,
    contributions: [
      { source: sk.savingForARainyDayLootbugCap,  op: '+' },
      { source: sk.anyoneUpLootinBankCap,         op: '+' },
      { source: it.lootbugLanternPermCap,         op: '+' },
      { source: it.goldenLootbugLanternPermCap,   op: '+' },
      { source: con.staEastwoodLootbugCap,        op: '+' },
      { source: pet.petWhaleQuestLootbugBank,     op: '+' },
      { source: st.vpBankersLootbugBank,          op: '+' },
      { source: st.vpBiggerBankersLootbugBank,    op: '+' },
      { source: st.vpLootbugBonanzaBankCap,       op: '+' },
      { source: sg.starOphiuchusFreebie,       op: '+' },
      { source: sg.ssBankedFreebieLootbugLootbug, op: '+' },
      { source: arch.idolTheseusBankUnlock,    op: '+' },
      { source: U, op: '+', unknown: true },      // Fishing + Skins
    ],
  },
  lootbug_gem_cost_reduction: {
    base: 0,
    contributions: [
      { source: sk.savingForARainyDayLootbugGem, op: '+' },
      { source: U, op: '+', unknown: true },     // Pets + Skins
    ],
  },
  lootbug_loot_multi: {
    base: 1,
    contributions: [
      { source: sk.anyoneUpLootinLootMulti,       op: '+' },
      { source: card.cardLootbug,                 op: '×' },
      { source: st.vpLootbugBonanzaLootMul,       op: '×' },
      { source: sg.ssLootbugLootMul,           op: '+' },
      { source: arch.idolTheseus,              op: '+' },
      { source: U, op: '+', unknown: true },      // Store + Cards + Fishing
    ],
  },
  lootfrog_lanterns_used: { base: 0, contributions: [] },
} satisfies FormulaMap

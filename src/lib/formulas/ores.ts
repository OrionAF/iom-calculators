import type { FormulaMap, Source } from '$lib/engine/types'
import { skillTreeSources as sk } from '$lib/sources/skillTree'
import { relicSources as rel } from '$lib/sources/relics'
import { itemSources as it } from '$lib/sources/items'
import { storeSources as st } from '$lib/sources/store'
import { contractSources as ct } from '$lib/sources/contracts'
import { artifactSources as art } from '$lib/sources/artifacts'
import { constructSources as con } from '$lib/sources/construct'
import { petSources as pet } from '$lib/sources/pets'
import { cardSources as card } from '$lib/sources/cards'
import { challengeSources as ch } from '$lib/sources/challenges'

const U: Source = { key: '_unknown', name: 'Unknown source', system: 'upgrades', fn: () => 0, inputs: [] }

export const oresFormulas = {
  multi_rock_chance: {
    base: 0,
    contributions: [
      { source: it.eyeOfNewtTripleRock,        op: '+' },
      { source: it.goldenEyeOfNewtTripleRock,  op: '+' },
      { source: rel.rareRelicTripleRock,        op: '+' },
      { source: U, op: '+', unknown: true },    // Upgrades: Mithril Bar
    ],
  },
  ore_sell_price_multi: {
    base: 1,
    contributions: [
      { source: sk.easyProgressorOreSell,       op: '+' },
      { source: sk.iHaveWaresOreSell,           op: '×' },
      { source: sk.polychromePowerOreSell,      op: '×' },
      { source: art.artOreSellPriceT1,          op: '+' },
      { source: rel.commonRelicOreSell,         op: '+' },
      { source: ct.ctOreSellPriceW2,            op: '+' },
      { source: ch.chOreSellPrice,              op: '+' },
      { source: card.cardJulk,                  op: '×' },
      { source: st.gemOreSellPrice,             op: '×' },
      { source: st.vpBallerOreSell,             op: '×' },
      { source: U, op: '+', unknown: true },    // Pets (Penguin skin) + Contracts + Skins
    ],
  },
  ore_income_multi: {
    base: 1,
    contributions: [
      { source: st.perkOreIncome,              op: '×' },
      { source: U, op: '×', unknown: true },   // Drones Elixir
    ],
  },
  golden_ore_chance: {
    base: 0,
    contributions: [
      { source: sk.iBuriedItHereGoldenOre,     op: '+' },
      { source: it.lasagnaGoldenOreChance,     op: '+' },
      { source: con.staSafetyGoldenOreChance,  op: '+' },
      { source: ct.ctGoldenOreChanceW3,        op: '+' },
      { source: ch.chGoldenOreChance,          op: '+' },
      { source: st.vpGoldenOreChance,          op: '+' },
      { source: U, op: '+', unknown: true },   // Store: Golden Ore Bundle + Challenges + Pets + Construct (Safety W3) + Stargazing + Contracts
    ],
  },
  golden_ore_multi: {
    base: 3,
    contributions: [
      { source: it.lasagnaGoldenOreMul,        op: '×' },
      { source: it.goldFlakeSteakBuff,         op: '×' },
      { source: it.goldFlakeSteakPerm,         op: '+' },
      { source: it.goldenStrawberriesGoldenVein, op: '+' },
      { source: con.staSafetyGoldenOreMul,     op: '+' },
      { source: pet.petNaginiGoldenOreMul,     op: '+' },
      { source: card.cardGoldenOre,            op: '×' },
      { source: st.vpGoldenOreMul,             op: '×' },
      { source: U, op: '+', unknown: true },   // Store + Cards + Pets + Construct + Stargazing + Upgrades
    ],
  },
  golden_floor_chance: {
    base: 0,
    contributions: [
      { source: rel.mythicRelicGoldenFloorChance, op: '+' },
    ],
  },
  golden_floor_multi: {
    base: 5,
    contributions: [
      { source: sk.perfectGoldGoldenFloor,          op: '+' },
      { source: sk.iHaveWaresGoldenFloor,           op: '+' },
      { source: sk.leprechaunsLegacyGoldenFloor,    op: '×' },
      { source: it.yummyPizzaGoldenFloor,           op: '×' },
      { source: it.goldenYummyPizzaGoldenFloor,     op: '×' },
      { source: it.goldenEyeOfNewtGoldenFloor,      op: '×' },
      { source: rel.epicRelicGoldenFloor,           op: '+' },
      { source: pet.petPenguinGoldenFloor,          op: '+' },
      { source: pet.petLeprechaunGoldenFloor,       op: '+' },
      { source: pet.petPenguinQuestGoldenFloor,     op: '+' },
      { source: ct.ctGoldenFloorMulW2,              op: '+' },
      { source: ch.chGoldenFloorMul,                op: '+' },
      { source: card.cardWorld1,                    op: '×' },
      { source: st.vpProgressionGoldenFloor,        op: '×' },
      { source: U, op: '+', unknown: true },        // Drones + Items (Eye of Newt+Iris) + Cards + Stargazing + Fishing + Upgrades + Contracts
    ],
  },
  rainbow_floor_chance: {
    base: 0,
    contributions: [
      { source: sk.opticalPhenomenonRainbowFloor,   op: '+' },
      { source: sk.imRunningOutRainbowFloor,        op: '+' },
      { source: it.rainbowLollipopChance,           op: '+' },
      { source: it.goldenRainbowLollipopChance,     op: '+' },
      { source: rel.divineRelicRainbowFloor,        op: '+' },
      { source: con.staChildhoodRainbowFloor,       op: '+' },
      { source: con.staSafetyRainbowFloorChance,    op: '+' },
      { source: pet.petLeprechaunRainbowFloor,      op: '+' },
      { source: pet.petPenguinQuestRainbowFloor,    op: '+' },
      { source: st.founderRainbowFloor,             op: '+' },
      { source: st.vpPetTrainerRainbowFloor,        op: '+' },
      { source: U, op: '+', unknown: true },        // Items + Store + Pets + Construct + Fishing + Contracts + Floors
    ],
  },
  rainbow_floor_multi: {
    base: 50,
    contributions: [
      { source: it.rainbowLollipopMul,              op: '×' },
      { source: it.goldenRainbowLollipopMul,        op: '×' },
      { source: rel.divineRelicRainbowFloorMul,     op: '+' },
      { source: pet.petDinoRainbowFloor,            op: '+' },
      { source: ct.ctRainbowFloorMul,               op: '+' },
      { source: ch.chRainbowFloorMulExtreme,        op: '+' },
      { source: card.cardWorld2,                    op: '×' },
      { source: st.vpHalfWayRainbowFloorMul,        op: '×' },
      { source: U, op: '+', unknown: true },        // Items + Relics + Store + Cards + Pets + Stargazing + Fishing + Upgrades + Contracts
    ],
  },
  galactic_floor_chance: {
    base: 0,
    contributions: [
      { source: sk.iBuriedItHereGalacticFloor,      op: '+' },
      { source: card.cardNagini,      op: '+' },
      { source: U, op: '+', unknown: true },
    ],
  },
  galactic_floor_multi:  {
    base: 10,
    contributions: [
      { source: U, op: '+', unknown: true }] },



  prismatic_floor_chance:{ base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  prismatic_floor_multi: { base: 1, contributions: [{ source: U, op: '+', unknown: true }] },
  pizzas_eaten:          { base: 0, contributions: [] },
  steak_eaten:           { base: 0, contributions: [] },
  all_floor_multipliers: {
    base: 0,
    contributions: [
      { source: con.staSopranoAllFloors,  op: '+' },
      { source: card.cardWorld4,          op: '×' },
      { source: card.cardYummyPizza,      op: '×' },
      { source: U, op: '+', unknown: true },
    ],
  },
} satisfies FormulaMap

import type { FormulaMap, Source } from '$lib/engine/types'
import { skillTreeSources as sk } from '$lib/sources/skillTree'
import { relicSources as rel } from '$lib/sources/relics'
import { itemSources as it } from '$lib/sources/items'
import { storeSources as st } from '$lib/sources/store'

const U: Source = { key: '_unknown', name: 'Unknown source', system: 'upgrades', fn: () => 0, inputs: [] }

export const bombsFormulas = {
  bomb_damage: {
    base: 0,
    contributions: [
      { source: sk.biggerBlastsDamage,         op: '+' },
      { source: sk.arsenalAdvancementDamage,   op: '+' },
      { source: sk.allRoundBomberDamage,       op: '+' },
      { source: sk.flamboyantBombsDamage,      op: '+' },
      { source: it.chaosTotemBombDamage,        op: '×' },
      { source: it.goldenChaosTotemBombDamage,  op: '×' },
      { source: it.hamburgerBomb,               op: '×' },
      { source: it.goldenHamburgerBomb,         op: '×' },
      { source: rel.rareRelicBombDamage,       op: '+' },
      { source: st.perkBombDamage,             op: '×' },
      { source: st.gemBombDamage,              op: '+' },
      { source: U, op: '+', unknown: true },   // Prestige + Challenges + Workshops + Cards + Pets + Construct + Upgrades
    ],
  },
  bomb_crit_chance: {
    base: 0,
    contributions: [
      { source: sk.allRoundBomberCritChance,   op: '+' },
      { source: rel.commonRelicBombCrit,       op: '+' },
      { source: U, op: '+', unknown: true },
    ],
  },
  bomb_crit_damage: {
    base: 0,
    contributions: [
      { source: rel.commonRelicBombCritDamage, op: '+' },
      { source: U, op: '+', unknown: true },   // Relics + Challenges + Upgrades + Fishing
    ],
  },
  bomb_recharge_speed: {
    base: 1,
    contributions: [
      { source: sk.allRoundBomberRecharge,           op: '+' },
      { source: sk.leprechaunsLegacyBombRecharge,    op: '×' },
      { source: it.chaosTotemBombRecharge,           op: '×' },
      { source: it.goldenChaosTotemBombRecharge,      op: '×' },
      { source: st.vpProgressionBombRecharge,        op: '×' },
      { source: st.vpBomberBombRecharge,             op: '×' },
      { source: rel.epicRelicBombRecharge,           op: '+' },
      { source: U, op: '+', unknown: true },         // Drones + Items + Workshop + Cards + Pets + Stargazing + Fishing + Upgrades + Contracts + Lootbugs
    ],
  },
  bomb_free_chance: {
    base: 0,
    contributions: [
      { source: sk.arsenalAdvancementFreeBomb, op: '+' },
      { source: sk.demolitionExpertFreeBomb,   op: '+' },
      { source: U, op: '+', unknown: true },   // Upgrades: Gold level 36
    ],
  },
  bomb_capacity: {
    base: 0,
    contributions: [
      { source: sk.arsenalAdvancementCapacity, op: '+' },
      { source: sk.flamboyantBombsCapacity,    op: '+' },
      { source: sk.chronokeeperBombCapacity,   op: '+' },
      { source: rel.epicRelicBombCapacity,     op: '+' },
      { source: st.gemBombCapacity,            op: '+' },
      { source: st.vpBomberBombCapacity,       op: '×' },
      { source: U, op: '+', unknown: true },   // Bombs: Battery + Prestige + Store Founder + Challenges
    ],
  },
  bomb_additional_multiplier: {
    base: 0,
    contributions: [
      { source: rel.mythicRelicBombMulti,      op: '+' },
      { source: U, op: '+', unknown: true },   // Workshop
    ],
  },
  bomb_super_crit_chance: {
    base: 0,
    contributions: [
      { source: sk.demolitionExpertSuperCrit,  op: '+' },
      { source: U, op: '+', unknown: true },   // Prestige + Items + Challenges
    ],
  },
  bomb_super_crit_damage:    { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  bomb_ultra_crit_chance: {
    base: 0,
    contributions: [
      { source: sk.flamboyantBombsUltraCrit,   op: '+' },
      { source: U, op: '+', unknown: true },   // Items + Challenges + Construct + Upgrades + Contracts
    ],
  },
  bomb_ultra_crit_damage:    { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  bomb_omega_crit_chance:    { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  bomb_omega_crit_damage:    { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  bomb_cherry3x_chance:      { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  bomb_battery_cap_increases:{ base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  bomb_cap_multiplier:       { base: 1, contributions: [{ source: U, op: '×', unknown: true }] },
  bomb_workshop_cap_increase:{ base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  bomb_of_plenty_make_gold_chance: { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  bomb_of_plenty_multi: {
    base: 1,
    contributions: [
      { source: st.founderBomBofPlenty,        op: '+' },
      { source: st.vpBomberBopMulti,           op: '+' },
      { source: U, op: '+', unknown: true },
    ],
  },
  bomb_trans_apply_bop_chance:{ base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  bomb_transmuter_multi: {
    base: 1,
    contributions: [
      { source: st.vpBomberTransmuterMulti,    op: '+' },
      { source: U, op: '+', unknown: true },
    ],
  },
} satisfies FormulaMap

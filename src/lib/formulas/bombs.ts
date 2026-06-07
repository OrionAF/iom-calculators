import type { FormulaMap, Source } from '$lib/engine/types'
import { skillTreeSources as sk } from '$lib/sources/skillTree'
import { relicSources as rel } from '$lib/sources/relics'
import { itemSources as it } from '$lib/sources/items'
import { storeSources as st } from '$lib/sources/store'
import { workshopSources as ws } from '$lib/sources/workshop'
import { contractSources as ct } from '$lib/sources/contracts'
import { artifactSources as art } from '$lib/sources/artifacts'
import { constructSources as con } from '$lib/sources/construct'
import { petSources as pet } from '$lib/sources/pets'
import { cardSources as card } from '$lib/sources/cards'

const U: Source = { key: '_unknown', name: 'Unknown source', system: 'upgrades', fn: () => 0, inputs: [] }

export const bombsFormulas = {
  bomb_damage: {
    base: 0,
    contributions: [
      // ── Skill-Tree (additive) ──────────────────────────────────────────
      { source: sk.biggerBlastsDamage,         op: '+' },
      { source: sk.arsenalAdvancementDamage,   op: '+' },
      { source: sk.allRoundBomberDamage,       op: '+' },
      { source: sk.flamboyantBombsDamage,      op: '+' },
      // ── Items ────────────────────────────────────────────────────────
      { source: it.chaosTotemBombDamage,       op: '×' },
      { source: it.goldenChaosTotemBombDamage, op: '×' },
      { source: it.hamburgerBomb,              op: '×' },
      { source: it.goldenHamburgerBomb,        op: '×' },
      // ── Relics ───────────────────────────────────────────────────────
      { source: rel.rareRelicBombDamage,       op: '+' },
      // ── Workshop ─────────────────────────────────────────────────────
      { source: ws.wsBombDmgW1,                op: '+' },
      { source: ws.wsBombDmgW2,                op: '+' },
      { source: ws.wsBombDmgW3,                op: '×' },
      { source: ws.wsPickaxeBombDmgW4,         op: '×' },
      // ── Contracts ────────────────────────────────────────────────────
      { source: ct.ctBombDmgPerContract,       op: '+' },
      { source: ct.ctPickaxeBombDmgW3,         op: '×' },
      // ── Prestige Artifacts ────────────────────────────────────────────
      { source: art.artBombDmgT1,              op: '+' },
      { source: art.artBombDmgT2,              op: '+' },
      { source: art.artBombDmgT3,              op: '+' },
      { source: art.artBombDmgT4,              op: '+' },  // fn uses rt.statueCount
      // ── Construct Statues ─────────────────────────────────────────────
      { source: con.staAwarenessBombDmg,       op: '×' },
      { source: con.staPropBombDmg,            op: '×' },
      { source: con.staComfortDmg,             op: '+' },  // fn uses rt.w4StatueCount
      // ── Cards ────────────────────────────────────────────────────────
      { source: card.cardBone,                 op: '×' },
      // ── Store ────────────────────────────────────────────────────────
      { source: st.perkBombDamage,             op: '×' },
      { source: st.gemBombDamage,              op: '+' },
      { source: U, op: '+', unknown: true },   // Pets + Upgrades
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
      { source: art.artBombDmgT1,              op: '+' },  // wiki: also adds to crit dmg
      { source: U, op: '+', unknown: true },   // Challenges + Upgrades + Fishing
    ],
  },
  bomb_recharge_speed: {
    base: 1,
    contributions: [
      { source: sk.allRoundBomberRecharge,           op: '+' },
      { source: sk.leprechaunsLegacyBombRecharge,    op: '×' },
      { source: it.chaosTotemBombRecharge,           op: '×' },
      { source: it.goldenChaosTotemBombRecharge,     op: '×' },
      { source: ws.wsBombRechargeW4,                 op: '+' },
      { source: ct.ctBombRechargeW1,                 op: '+' },
      { source: pet.petCrabBombRecharge,             op: '+' },
      { source: rel.epicRelicBombRecharge,           op: '+' },
      { source: st.vpProgressionBombRecharge,        op: '×' },
      { source: st.vpBomberBombRecharge,             op: '×' },
      { source: U, op: '+', unknown: true },         // Drones + Stargazing + Fishing + Upgrades + Lootbugs
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
      { source: art.artBombCapT3,              op: '+' },
      { source: rel.epicRelicBombCapacity,     op: '+' },
      { source: pet.petCrabBombCap,            op: '+' },
      { source: st.gemBombCapacity,            op: '+' },
      { source: st.vpBomberBombCapacity,       op: '×' },
      { source: U, op: '+', unknown: true },   // Bombs: Battery + Store Founder + Challenges + Challenges (chBombCap)
    ],
  },
  bomb_cap_multiplier: {
    base: 1,
    contributions: [
      { source: con.staAppetiteBombCap,        op: '×' },
      { source: U, op: '+', unknown: true },   // Workshop Bomb Battery Cap
    ],
  },
  bomb_super_crit_chance: {
    base: 0,
    contributions: [
      { source: sk.demolitionExpertSuperCrit,  op: '+' },
      { source: art.artBombSuperCritT3,        op: '+' },
      { source: U, op: '+', unknown: true },   // Items (Cassandra Idol) + Challenges
    ],
  },
  bomb_super_crit_damage:    { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  bomb_ultra_crit_chance: {
    base: 0,
    contributions: [
      { source: sk.flamboyantBombsUltraCrit,       op: '+' },
      { source: con.staAwarenessUltraCrit,         op: '+' },
      { source: ct.ctUltraCritChance,              op: '+' },
      { source: U, op: '+', unknown: true },   // Challenges + Upgrades + Contracts (W3 omega)
    ],
  },
  bomb_ultra_crit_damage:    { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  bomb_omega_crit_chance:    { base: 0, contributions: [{ source: ct.ctOmegaCritChance, op: '+' }, { source: U, op: '+', unknown: true }] },
  bomb_omega_crit_damage:    { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  bomb_cherry3x_chance:      { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  bomb_battery_cap_increases:{ base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  bomb_additional_multiplier: {
    base: 0,
    contributions: [
      { source: rel.mythicRelicBombMulti,      op: '+' },
      { source: U, op: '+', unknown: true },   // Workshop
    ],
  },
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

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

export const pickaxeFormulas = {
  pickaxe_damage: {
    base: 0,
    contributions: [
      // ── Skill-Tree (additive) ─────────────────────────────────────────
      { source: sk.swingHarderDamage,                op: '+' },
      { source: sk.superDamageDamage,                op: '+' },
      { source: sk.relicRampageDamage,               op: '+' },
      // ── Items ──────────────────────────────────────────────────────────
      { source: it.rockCake,                         op: '+' },
      { source: it.primalMeatPickaxe,                op: '+' },
      { source: it.goldenPrimalMeatPickaxe,          op: '+' },
      { source: it.hamburgerPickaxe,                 op: '×' },
      { source: it.goldenHamburgerPickaxe,           op: '×' },
      // ── Workshop ───────────────────────────────────────────────────────
      { source: ws.wsPickaxeDmgW1,                   op: '+' },
      { source: ws.wsPickaxeDmgW3,                   op: '×' },
      { source: ws.wsPickaxeBombDmgW4,               op: '×' },
      // ── Contracts ──────────────────────────────────────────────────────
      { source: ct.ctPickaxeDmgPerContract,          op: '+' },
      { source: ct.ctPickaxeDmgW1,                   op: '+' },
      { source: ct.ctPickaxeBombDmgW3,               op: '×' },
      // ── Prestige Artifacts ─────────────────────────────────────────────
      { source: art.artPickaxeDmgT1,                 op: '+' },
      { source: art.artPickaxeDmgT2,                 op: '+' },
      { source: art.artPickaxeDmgT3,                 op: '+' },
      { source: art.artPickaxeDmgT4,                 op: '+' },  // fn uses rt.statueCount
      // ── Construct Statues ─────────────────────────────────────────────
      { source: con.staRhythmPickaxe,                op: '×' },
      { source: con.staCraftPickaxeDmg,              op: '×' },
      { source: con.staComfortDmg,                   op: '+' },  // fn uses rt.w4StatueCount
      { source: con.staRodentiaPickaxe,              op: '+' },  // fn uses rt.w4StatueCount
      // ── Pets ───────────────────────────────────────────────────────────
      { source: pet.petDwarfPickaxeDmg,              op: '+' },
      { source: pet.petWhalePickaxeDmg,              op: '+' },
      { source: pet.petDinoPickaxeDmg,               op: '×' },
      // ── Cards ──────────────────────────────────────────────────────────
      { source: card.cardAlex,                       op: '×' },
      // ── Relics ─────────────────────────────────────────────────────────
      { source: rel.commonRelicPickaxeDamage,        op: '+' },
      { source: rel.epicRelicPickaxeDamage,          op: '+' },
      // ── Skill-Tree (multiplicative) ────────────────────────────────────
      { source: sk.waitMyUltraCritsCanCritDamage,    op: '×' },
      { source: sk.tonsOfDamageDamage,               op: '×' },
      { source: sk.polychromePowerDamage,             op: '×' },
      { source: sk.idleObeliskMincerDamage,           op: '×' },
      // ── Store ──────────────────────────────────────────────────────────
      { source: st.gemPickaxeDamage,                 op: '×' },
      { source: U, op: '+', unknown: true },  // Stargazing: Taurus + Scorpio
      { source: U, op: '+', unknown: true },  // Fishing: Tier 1 Notice upgrade
      { source: U, op: '+', unknown: true },  // Upgrades: base + many bars
    ],
  },
  pickaxe_attack_speed_per_second: {
    base: 0,
    contributions: [
      { source: it.bananaCoffee,  op: '×' },
      { source: U, op: '+', unknown: true },  // Upgrades: Gold + VR-ERROR
    ],
  },
  pickaxe_radius_percent: {
    base: 0,
    contributions: [
      { source: sk.superDamageRadius,     op: '+' },
      { source: it.bread,                 op: '×' },
      { source: art.artPickaxeRadiusT1,   op: '+' },
      { source: U, op: '+', unknown: true },  // Upgrades
    ],
  },
  pickaxe_crit_chance: {
    base: 0,
    contributions: [
      { source: sk.luckyStrikesCritChance,   op: '+' },
      { source: it.apple,                    op: '+' },
      { source: it.juicyPlumsCritChance,     op: '+' },
      { source: U, op: '+', unknown: true },  // Upgrades: Tin Pickaxe + Crit Chance + Halium
    ],
  },
  pickaxe_crit_damage: {
    base: 0,
    contributions: [
      { source: sk.luckyStrikesCritDamage,   op: '+' },
      { source: sk.superDamageCritDamage,    op: '+' },
      { source: it.pike,                     op: '+' },
      { source: it.juicyPlumsCritDamage,     op: '+' },
      { source: ct.ctPickaxeCritDmg,         op: '+' },
      { source: U, op: '+', unknown: true },  // Relics + Upgrades
    ],
  },
  pickaxe_super_crit_chance: {
    base: 0,
    contributions: [
      { source: sk.waitMyCritsCanCrit,           op: '+' },
      { source: art.artPickaxeSuperCritT2,       op: '+' },
      { source: ct.ctPickaxeSuperCrit,           op: '+' },
      { source: U, op: '+', unknown: true },  // Prestige + Items (Rock Cake + Cassandra)
    ],
  },
  pickaxe_super_crit_damage: {
    base: 0,
    contributions: [
      { source: ct.ctPickaxeDmgPerContract,    op: '+' },  // note: also applies here per wiki
      { source: U, op: '+', unknown: true },
    ],
  },
  pickaxe_ultra_crit_chance: {
    base: 0,
    contributions: [
      { source: sk.waitMySuperCritsCanCrit,    op: '+' },
      { source: sk.tonsOfDamageUltraCrit,      op: '+' },
      { source: pet.petDwarfUltraCrit,         op: '+' },
      { source: ct.ctUltraCritChance,          op: '+' },
      { source: U, op: '+', unknown: true },  // Items + Construct + Upgrades
    ],
  },
  pickaxe_ultra_crit_damage: { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  pickaxe_omega_crit_chance: {
    base: 0,
    contributions: [
      { source: sk.waitMyUltraCritsCanCritOmega, op: '+' },
      { source: art.artOmegaCritT4,              op: '+' },
      { source: ct.ctOmegaCritChance,            op: '+' },
      { source: U, op: '+', unknown: true },  // Upgrades
    ],
  },
  pickaxe_omega_crit_damage: { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
} satisfies FormulaMap

import type { FormulaMap, Source } from '$lib/engine/types'
import { skillTreeSources as sk } from '$lib/sources/skillTree'
import { relicSources as rel } from '$lib/sources/relics'
import { itemSources as it } from '$lib/sources/items'
import { storeSources as st } from '$lib/sources/store'

const U: Source = { key: '_unknown', name: 'Unknown source', system: 'upgrades', fn: () => 0, inputs: [] }

export const pickaxeFormulas = {
  pickaxe_damage: {
    base: 0,
    contributions: [
      // Skill-Tree additive group (then × by multiplicatives below)
      { source: sk.swingHarderDamage,                op: '+' },
      { source: sk.superDamageDamage,                op: '+' },
      { source: sk.relicRampageDamage,               op: '+' },
      { source: sk.waitMyUltraCritsCanCritDamage,    op: '×' },
      { source: sk.tonsOfDamageDamage,               op: '×' },
      { source: sk.polychromePowerDamage,             op: '×' },
      { source: sk.idleObeliskMincerDamage,           op: '×' },
      // Items
      { source: it.rockCake,                         op: '+' },
      { source: it.primalMeatPickaxe,                op: '+' },
      { source: it.goldenPrimalMeatPickaxe,          op: '+' },
      { source: it.hamburgerPickaxe,                 op: '×' },
      { source: it.goldenHamburgerPickaxe,           op: '×' },
      // Relics
      { source: rel.commonRelicPickaxeDamage,        op: '+' },
      { source: rel.epicRelicPickaxeDamage,          op: '+' },
      // Store gem upgrade
      { source: st.gemPickaxeDamage,                 op: '×' },
      { source: U, op: '+', unknown: true },  // Prestige: Tier 1-4 Artifacts
      { source: U, op: '×', unknown: true },  // Workshop: World 1/3/4 upgrades
      { source: U, op: '+', unknown: true },  // Challenges
      { source: U, op: '×', unknown: true },  // Cards (Alex Misc, Infernal Dwarf, Infernal Bear)
      { source: U, op: '+', unknown: true },  // Pets (Dwarf, Whale, Dino)
      { source: U, op: '×', unknown: true },  // Construct: 3 statues
      { source: U, op: '+', unknown: true },  // Stargazing: Taurus + Scorpio
      { source: U, op: '+', unknown: true },  // Fishing: Tier 1 Notice upgrade
      { source: U, op: '+', unknown: true },  // Upgrades: base + many bars
      { source: U, op: '+', unknown: true },  // Contracts
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
      { source: sk.superDamageRadius, op: '+' },
      { source: it.bread,             op: '×' },
      { source: U, op: '+', unknown: true },  // Prestige + Upgrades
    ],
  },
  pickaxe_crit_chance: {
    base: 0,
    contributions: [
      { source: sk.luckyStrikesCritChance,   op: '+' },
      { source: it.apple,                    op: '+' },
      { source: it.juicyPlumsCritChance,     op: '+' },
      { source: rel.commonRelicBombCrit,     op: '+' },  // note: this is bomb crit, not pickaxe
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
      { source: U, op: '+', unknown: true },  // Relics + Challenges + Upgrades
    ],
  },
  pickaxe_super_crit_chance: {
    base: 0,
    contributions: [
      { source: sk.waitMyCritsCanCrit,       op: '+' },
      { source: U, op: '+', unknown: true },  // Prestige + Items (Rock Cake + Cassandra) + Challenges
    ],
  },
  pickaxe_super_crit_damage: { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  pickaxe_ultra_crit_chance: {
    base: 0,
    contributions: [
      { source: sk.waitMySuperCritsCanCrit,  op: '+' },
      { source: sk.tonsOfDamageUltraCrit,    op: '+' },
      { source: U, op: '+', unknown: true },  // Items + Challenges + Construct + Upgrades + Contracts
    ],
  },
  pickaxe_ultra_crit_damage: { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  pickaxe_omega_crit_chance: {
    base: 0,
    contributions: [
      { source: sk.waitMyUltraCritsCanCritOmega, op: '+' },
      { source: U, op: '+', unknown: true },  // Upgrades + Contracts
    ],
  },
  pickaxe_omega_crit_damage: { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
} satisfies FormulaMap

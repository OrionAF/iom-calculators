import { describe, expect, it } from 'vitest'
import { computeStat } from '$lib/engine/compute'
import { pickaxeFormulas }  from './pickaxe'
import { bombsFormulas }    from './bombs'
import { oresFormulas }     from './ores'
import { veinsFormulas }    from './veins'
import { craftingFormulas } from './crafting'
import { contractsFormulas }from './contracts'
import { dronesFormulas }   from './drones'
import { chestsFormulas }   from './chests'
import { lootbugsFormulas } from './lootbugs'
import { lootfrogsFormulas }from './lootfrogs'
import { prestigeFormulas } from './prestige'
import { obeliskFormulas }  from './obelisk'
import { miscFormulas }     from './misc'
import type { FormulaMap }  from '$lib/engine/types'

function allReturnBase(formulas: FormulaMap, label: string) {
  describe(`${label} — all formulas return base with zero inputs`, () => {
    for (const [key, f] of Object.entries(formulas)) {
      it(key, () => {
        expect(computeStat(f, {}, {})).toBeCloseTo(f.base)
      })
    }
  })
}

allReturnBase(pickaxeFormulas,  'pickaxe')
allReturnBase(bombsFormulas,    'bombs')
allReturnBase(oresFormulas,     'ores')
allReturnBase(veinsFormulas,    'veins')
allReturnBase(craftingFormulas, 'crafting')
allReturnBase(contractsFormulas,'contracts')
allReturnBase(dronesFormulas,   'drones')
allReturnBase(chestsFormulas,   'chests')
allReturnBase(lootbugsFormulas, 'lootbugs')
allReturnBase(lootfrogsFormulas,'lootfrogs')
allReturnBase(prestigeFormulas, 'prestige')
allReturnBase(obeliskFormulas,  'obelisk')
allReturnBase(miscFormulas,     'misc')

// ── Known base value assertions ───────────────────────────────────────────────

describe('known base values from wiki', () => {
  it('golden_ore_multi base = 3',              () => expect(oresFormulas.golden_ore_multi.base).toBe(3))
  it('golden_floor_multi base = 5',            () => expect(oresFormulas.golden_floor_multi.base).toBe(5))
  it('rainbow_floor_multi base = 50',          () => expect(oresFormulas.rainbow_floor_multi.base).toBe(50))
  it('golden_vein_multi base = 5',             () => expect(veinsFormulas.golden_vein_multi.base).toBe(5))
  it('rainbow_vein_multi base = 20',           () => expect(veinsFormulas.rainbow_vein_multi.base).toBe(20))
  it('gleaming_vein_multi base = 5',           () => expect(veinsFormulas.gleaming_vein_multi.base).toBe(5))
  it('golden_void_portal_multi base = 5',      () => expect(dronesFormulas.golden_void_portal_multi.base).toBe(5))
  it('rainbow_void_portal_multi base = 5',     () => expect(dronesFormulas.rainbow_void_portal_multi.base).toBe(5))
  it('elixir_crit_multi base = 3',             () => expect(dronesFormulas.elixir_crit_multi.base).toBe(3))
  it('drone_suit_cap base = 5',                () => expect(dronesFormulas.drone_suit_cap.base).toBe(5))
  it('coal_generation_seconds base = 90',      () => expect(dronesFormulas.coal_generation_seconds.base).toBe(90))
  it('freebie_bank_cap base = 2',              () => expect(chestsFormulas.freebie_bank_cap.base).toBe(2))
  it('freebie_cooldown_seconds base = 600',    () => expect(chestsFormulas.freebie_cooldown_seconds.base).toBe(600))
  it('super_stonks_multi base = 2',            () => expect(chestsFormulas.super_stonks_multi.base).toBe(2))
  it('ultra_stonks_multi base = 25',           () => expect(chestsFormulas.ultra_stonks_multi.base).toBe(25))
  it('lootfrog_capacity base = 5',             () => expect(lootfrogsFormulas.lootfrog_capacity.base).toBe(5))
  it('lootfrog_golden_multi base = 2',         () => expect(lootfrogsFormulas.lootfrog_golden_multi.base).toBe(2))
  it('lootfrog_big_multi base = 5',            () => expect(lootfrogsFormulas.lootfrog_big_multi.base).toBe(5))
  it('contract_points_rewarded base = 10',     () => expect(contractsFormulas.contract_points_rewarded.base).toBe(10))
})

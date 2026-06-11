import { describe, expect, it } from 'vitest'
import { ALL_FORMULAS } from './index'
import { flattenContributions } from '$lib/engine/compute'
import { STAT_REGISTRY } from '$lib/stats/registry'

describe('formula ↔ source consistency', () => {
  it('where a source declares an op, formulas combine it with that same op', () => {
    const mismatches: string[] = []
    for (const [statKey, formula] of Object.entries(ALL_FORMULAS)) {
      for (const c of flattenContributions(formula)) {
        if (c.unknown || c.source.op === undefined) continue
        if (c.op !== c.source.op) {
          mismatches.push(
            `${statKey} ← ${c.source.key}: formula '${c.op}' vs source '${c.source.op}'`,
          )
        }
      }
    }
    expect(mismatches, mismatches.join('\n')).toHaveLength(0)
  })

  it('where a source declares a statKey used in a formula, it matches the formula stat', () => {
    // A source may feed several stats only via distinct Source objects;
    // each object's statKey must match the stat whose formula references it.
    const mismatches: string[] = []
    for (const [statKey, formula] of Object.entries(ALL_FORMULAS)) {
      for (const c of flattenContributions(formula)) {
        if (c.unknown || c.source.statKey === undefined) continue
        if (c.source.statKey !== statKey) {
          mismatches.push(`${statKey} ← ${c.source.key} declares statKey '${c.source.statKey}'`)
        }
      }
    }
    expect(mismatches, mismatches.join('\n')).toHaveLength(0)
  })

  it('every formula key resolves to a registry entry', () => {
    const missing = Object.keys(ALL_FORMULAS).filter((k) => !STAT_REGISTRY[k])
    expect(missing, missing.join(', ')).toHaveLength(0)
  })
})

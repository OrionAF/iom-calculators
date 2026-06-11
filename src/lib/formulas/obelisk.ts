import type { FormulaMap, Source } from '$lib/engine/types'
import { defineFormulas } from './define'

import { artifactSources as art } from '$lib/sources/artifacts'
import { challengeSources as ch } from '$lib/sources/challenges'
import { petSources as pet } from '$lib/sources/pets'
import { upgradeSources as up } from '$lib/sources/upgrades'

const U: Source = {
  key: '_unknown',
  name: 'Unknown source',
  system: 'artifacts',
  fn: () => 0,
  inputs: [],
}

export const obeliskFormulas: FormulaMap = defineFormulas({
  obelisk_timer_add: {
    contributions: [
      { source: art.artObeliskCdT1, op: '+' },
      { source: U, op: '+', unknown: true },
    ],
  },
  // Obelisk Cooldown: base = 1 (multiplier on cooldown time)
  obelisk_cooldown_multi: { contributions: [] },
  obelisk_armor_reduction: {
    contributions: [
      { source: art.artObeliskArmorT3, op: '+' },
      { source: ch.chObeliskArmor, op: '+' },
      { source: pet.petDuckSkinObeliskArmor, op: '+' },
      { source: up.upgrObeliskArmor, op: '+' },
    ],
  },
})

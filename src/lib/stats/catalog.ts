import { STAT_REGISTRY } from './registry'

export interface StatEntry {
  key: string
}

export interface StatCategory {
  id: string
  label: string
  stats: StatEntry[]
}

// Category display order + labels. Which stats belong to a category — and
// their order within it — is defined by StatMeta.category in registry.ts
// (registry insertion order is the canonical display order).
const CATEGORIES: ReadonlyArray<{ id: string; label: string }> = [
  { id: 'pickaxe', label: 'Pickaxe' },
  { id: 'bombs', label: 'Bombs' },
  { id: 'drones', label: 'Drones' },
  { id: 'ores', label: 'Ores' },
  { id: 'crafting', label: 'Crafting' },
  { id: 'obelisk', label: 'Obelisk' },
  { id: 'prestige', label: 'Prestige' },
  { id: 'lootbugs', label: 'Lootbugs' },
  { id: 'lootfrogs', label: 'Lootfrogs' },
  { id: 'chests', label: 'Chests' },
  { id: 'contracts', label: 'Contracts' },
  { id: 'veins', label: 'Veins' },
  { id: 'stars', label: 'Stars' },
  { id: 'fishing', label: 'Fishing' },
  { id: 'misc', label: 'Misc' },
  { id: 'world1statues', label: 'World 1 Statues' },
  { id: 'world3statues', label: 'World 3 Statues' },
  { id: 'world4statues', label: 'World 4 Statues' },
]

export const STAT_CATALOG: readonly StatCategory[] = CATEGORIES.map(({ id, label }) => ({
  id,
  label,
  stats: Object.entries(STAT_REGISTRY)
    .filter(([, meta]) => meta.category === id)
    .map(([key]) => ({ key })),
}))

// State labels driven by the raw integer value 0/1/2/3.
// Source: in-game build state for each statue tier.
export const STATUE_STATE_LABELS = ['Unbuilt', 'Normal', 'Gilded', 'Platinized'] as const

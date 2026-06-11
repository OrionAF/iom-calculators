import type { Component } from 'svelte'
import { ChartBar, Fish, Icon, Settings, ShoppingBag, Zap } from 'lucide-svelte'

export type DestinationKind = 'data' | 'calculator' | 'utility'
export type LucideIcon = typeof Icon

export interface Destination {
  hash: string
  label: string
  /** One-line summary shown on the home grid. */
  description: string
  icon: LucideIcon
  kind: DestinationKind
  loader: () => Promise<{ default: Component }>
}

export const destinations: Destination[] = [
  {
    hash: 'loaded-stats',
    label: 'Loaded Stats',
    description: 'Inspect every stat from your export — search, group, and compare values.',
    icon: ChartBar,
    kind: 'data',
    loader: () => import('../utilities/loaded-stats.svelte'),
  },
  {
    hash: 'store',
    label: 'Store',
    description: 'Track the Value Packs, Perks, Gem Shop upgrades and Founder tiers you own.',
    icon: ShoppingBag,
    kind: 'data',
    loader: () => import('../utilities/store.svelte'),
  },
  {
    hash: 'skills',
    label: 'Skills',
    description: 'Plan the skill tree and keep an eye on your SP budget.',
    icon: Zap,
    kind: 'data',
    loader: () => import('../utilities/skills.svelte'),
  },
  {
    hash: 'fishing',
    label: 'Fishing',
    description: 'Estimated gold income per hour from your fishing stats.',
    icon: Fish,
    kind: 'calculator',
    loader: () => import('./fishing.svelte'),
  },
  {
    hash: 'settings',
    label: 'Settings',
    description: 'Notation, layout density, font size and locally stored data.',
    icon: Settings,
    kind: 'utility',
    loader: () => import('../utilities/settings.svelte'),
  },
]

export function findDestination(hash: string): Destination | undefined {
  return destinations.find(d => d.hash === hash)
}

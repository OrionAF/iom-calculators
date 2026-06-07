import type { Component } from 'svelte'
import { ChartBar, Fish, Icon, Settings, ShoppingBag, Zap } from 'lucide-svelte'

export type DestinationKind = 'data' | 'calculator' | 'utility'
export type LucideIcon = typeof Icon

export interface Destination {
  hash: string
  label: string
  icon: LucideIcon
  kind: DestinationKind
  loader: () => Promise<{ default: Component }>
}

export const destinations: Destination[] = [
  {
    hash: 'loaded-stats',
    label: 'Loaded Stats',
    icon: ChartBar,
    kind: 'data',
    loader: () => import('../utilities/loaded-stats.svelte'),
  },
  {
    hash: 'store',
    label: 'Store',
    icon: ShoppingBag,
    kind: 'data',
    loader: () => import('../utilities/store.svelte'),
  },
  {
    hash: 'skills',
    label: 'Skills',
    icon: Zap,
    kind: 'data',
    loader: () => import('../utilities/skills.svelte'),
  },
  {
    hash: 'fishing',
    label: 'Fishing',
    icon: Fish,
    kind: 'calculator',
    loader: () => import('./fishing.svelte'),
  },
  {
    hash: 'settings',
    label: 'Settings',
    icon: Settings,
    kind: 'utility',
    loader: () => import('../utilities/settings.svelte'),
  },
]

export function findDestination(hash: string): Destination | undefined {
  return destinations.find(d => d.hash === hash)
}

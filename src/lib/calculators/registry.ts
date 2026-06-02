import type { Component } from 'svelte'
import { Fish, Icon } from 'lucide-svelte'

export type DestinationKind = 'calculator' | 'utility'
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
    hash: 'fishing',
    label: 'Fishing',
    icon: Fish,
    kind: 'calculator',
    loader: () => import('./fishing.svelte'),
  },
]

export function findDestination(hash: string): Destination | undefined {
  return destinations.find(d => d.hash === hash)
}

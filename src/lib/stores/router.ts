import { readable } from 'svelte/store'
import { findDestination, type Destination } from '../calculators/registry'

export interface ResolvedRoute {
  destination: Destination
  hash: string
}

function resolveHash(rawHash: string): ResolvedRoute | null {
  const hash = rawHash.replace(/^#\/?/, '')
  const destination = findDestination(hash)
  return destination ? { destination, hash } : null
}

export const currentRoute = readable<ResolvedRoute | null>(
  typeof window !== 'undefined' ? resolveHash(window.location.hash) : null,
  (set) => {
    if (typeof window === 'undefined') return
    const handler = () => set(resolveHash(window.location.hash))
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  },
)

export function navigate(hash: string): void {
  window.location.hash = hash
}

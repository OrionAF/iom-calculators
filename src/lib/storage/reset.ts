import { clearStats } from '$lib/stores/stats'
import { resetSettings } from '$lib/stores/settings'

const PREFIX = 'iom-'

function scrubStorage(storage: Storage): void {
  const keysToRemove: string[] = []
  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i)
    if (key && key.startsWith(PREFIX)) keysToRemove.push(key)
  }
  for (const key of keysToRemove) storage.removeItem(key)
}

export function hardReset(): void {
  if (typeof window === 'undefined') return
  clearStats()
  resetSettings()
  scrubStorage(localStorage)
  scrubStorage(sessionStorage)
}

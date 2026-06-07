import { persistedStore } from '$lib/storage/persistedStore'

/** Map of skillId → current level (0 = not owned, 1..maxLevel = owned). */
export const skillProgress = persistedStore<Record<string, number>>(
  'iom-skill-progress',
  {}
)

export function setSkillLevel(id: string, level: number): void {
  skillProgress.update(s => ({ ...s, [id]: level }))
}

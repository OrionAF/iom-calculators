import { persistedStore } from '$lib/storage/persistedStore'
import { ALL_SKILLS } from '$lib/skills/catalog'

/** Map of skillId → current level (0 = not owned, 1..maxLevel = owned). */
export const skillProgress = persistedStore<Record<string, number>>(
  'iom-skill-progress',
  {}
)

export function setSkillLevel(id: string, level: number): void {
  skillProgress.update(s => ({ ...s, [id]: level }))
}

export function maxAllSkills(): void {
  const updates: Record<string, number> = {}
  for (const skill of ALL_SKILLS) {
    updates[skill.id] = skill.costs.length
  }
  skillProgress.update(() => updates)
}

export function resetAllSkills(): void {
  skillProgress.update(() => ({}))
}

export function resetSkillProgress(): void {
  skillProgress.reset()
}

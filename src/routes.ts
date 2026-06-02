export interface RouteDescriptor {
  hash: string
  label: string
  icon: string // Lucide icon name string
}

export const routes: RouteDescriptor[] = [
  { hash: 'fishing', label: 'Fishing', icon: 'fish' },
]

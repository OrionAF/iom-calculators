import { writable } from 'svelte/store'

/**
 * Mobile drawer open/close state. Owned by Sidebar but readable from
 * MobileTopBar and App so that:
 *   - the top bar can render the hamburger and open the drawer
 *   - App.svelte can apply `inert` to <main> while the drawer is open (X4)
 */
export const drawerOpen = writable<boolean>(false)

export function openDrawer(): void {
  drawerOpen.set(true)
}
export function closeDrawer(): void {
  drawerOpen.set(false)
}
export function toggleDrawer(): void {
  drawerOpen.update((v) => !v)
}

<script lang="ts">
  import { Menu } from 'lucide-svelte'
  import { currentRoute } from '$lib/stores/router'
  import { openDrawer, drawerOpen } from '$lib/stores/drawer'

  // Title falls back to "IOM Calc" on the home / unknown route.
  const title = $derived($currentRoute?.destination.label ?? 'IOM Calc')
</script>

<header class="mobile-topbar">
  <button
    class="hamburger"
    type="button"
    onclick={openDrawer}
    aria-label="Open navigation"
    aria-expanded={$drawerOpen}
    aria-controls="sidebar"
  >
    <Menu size={20} aria-hidden="true" />
  </button>
  <h1 class="topbar-title">{title}</h1>
</header>

<style>
  .mobile-topbar {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: var(--z-drawer);
    align-items: center;
    gap: var(--space-2);
    padding-block: var(--space-2);
    padding-left: calc(var(--space-3) + env(safe-area-inset-left));
    padding-right: calc(var(--space-3) + env(safe-area-inset-right));
    padding-top: calc(var(--space-2) + env(safe-area-inset-top));
    background: color-mix(in srgb, var(--bg-base) 88%, transparent);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(8px);
    border-bottom: 1px solid var(--border);
  }

  .hamburger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    background: none;
    border: none;
    border-radius: var(--radius-md);
    color: var(--text-primary);
    cursor: pointer;
    transition: background var(--transition-fast), color var(--transition-fast);
  }
  .hamburger:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 2px;
  }
  @media (hover: hover) {
    .hamburger:hover { background: var(--bg-surface); color: var(--accent); }
  }

  .topbar-title {
    flex: 1;
    min-width: 0;
    font-family: var(--font-display);
    font-size: var(--text-lg);
    font-weight: var(--weight-bold);
    color: var(--text-primary);
    letter-spacing: 0.02em;
    margin: 0;
    text-align: center;
    /* leave room for the hamburger by mirroring its width on the right */
    margin-right: 44px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media (max-width: 1023px) {
    .mobile-topbar { display: flex; }
  }
</style>

<script lang="ts">
  import { X, Pickaxe } from 'lucide-svelte'
  import { destinations } from '$lib/calculators/registry'
  import { currentRoute } from '$lib/stores/router'
  import StatInput from './StatInput.svelte'
  import { focusTrap } from '$lib/actions/focusTrap'

  let drawerOpen = $state(false)
  let hamburgerEl: HTMLButtonElement

  function openDrawer() { drawerOpen = true }
  function closeDrawer() {
    drawerOpen = false
    hamburgerEl?.focus()
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && drawerOpen) closeDrawer()
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- Mobile hamburger (only visible <1024px) -->
<button
  bind:this={hamburgerEl}
  class="hamburger"
  onclick={openDrawer}
  aria-label="Open navigation"
  aria-expanded={drawerOpen}
  aria-controls="sidebar"
>
  <span></span><span></span><span></span>
</button>

<!-- Mobile backdrop -->
{#if drawerOpen}
  <button
    class="backdrop"
    onclick={closeDrawer}
    aria-label="Close navigation"
    tabindex="-1"
  ></button>
{/if}

<!-- Sidebar / Drawer -->
<aside
  id="sidebar"
  class="sidebar"
  class:open={drawerOpen}
  use:focusTrap={drawerOpen}
>
  <div class="sidebar-header">
    <Pickaxe class="sidebar-logo" size={20} aria-hidden="true" />
    <span class="sidebar-title">IOM Calc</span>
    <button class="close-btn" onclick={closeDrawer} aria-label="Close navigation">
    <X size={18} aria-hidden="true" />
  </button>
  </div>

  <StatInput />

  <nav aria-label="Calculators">
    <p class="nav-section-label">Calculators</p>
    <ul class="nav-list" role="list">
      {#each destinations.filter(d => d.kind === 'calculator') as dest}
        {@const isActive = $currentRoute?.hash === dest.hash}
        <li>
          <a
            class="nav-item"
            class:active={isActive}
            href={'#' + dest.hash}
            onclick={closeDrawer}
            aria-current={isActive ? 'page' : undefined}
          >
            {dest.label}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
</aside>

<style>
  .hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: var(--space-2);
    min-width: 44px;
    min-height: 44px;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: var(--space-3);
    left: var(--space-3);
    z-index: var(--z-drawer);
  }
  .hamburger span {
    display: block;
    width: 22px;
    height: 2px;
    background: var(--text-primary);
    border-radius: 1px;
    transition: background var(--transition-fast);
  }
  .hamburger:hover span { background: var(--accent); }

  .backdrop {
    display: none;
    position: fixed;
    inset: 0;
    background: var(--overlay-bg);
    z-index: var(--z-overlay);
    border: none;
    padding: 0;
    cursor: pointer;
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100dvh;
    width: var(--sidebar-width);
    background: var(--bg-sidebar);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    padding: var(--space-4);
    overflow-y: auto;
    z-index: var(--z-drawer);
    transform: none;
    transition: transform var(--transition-base);
  }

  .sidebar-header {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    margin-bottom: var(--space-4);
    padding-bottom: var(--space-4);
    border-bottom: 1px solid var(--border);
  }

  :global(.sidebar-logo) { color: var(--accent); }

  .sidebar-title {
    font-family: var(--font-display);
    font-size: var(--text-base);
    font-weight: var(--weight-bold);
    color: var(--accent);
    letter-spacing: 0.06em;
    flex: 1;
  }

  .close-btn {
    display: none;
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    font-size: var(--text-lg);
    min-width: 44px;
    min-height: 44px;
    align-items: center;
    justify-content: center;
  }
  .close-btn:hover { color: var(--text-primary); }

  .nav-section-label {
    font-size: var(--text-xs);
    font-weight: var(--weight-medium);
    color: var(--text-dim);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: var(--space-2);
  }

  .nav-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .nav-item {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 44px;
    padding: var(--space-2) var(--space-3);
    background: none;
    border: none;
    border-left: 2px solid transparent;
    border-radius: 0 var(--radius-md) var(--radius-md) 0;
    color: var(--text-muted);
    font-size: var(--text-base);
    font-family: var(--font-body);
    cursor: pointer;
    text-align: left;
    text-decoration: none;
    transition: color var(--transition-fast), background var(--transition-fast), border-color var(--transition-fast);
  }

  .nav-item:hover {
    color: var(--text-primary);
    background: var(--bg-surface);
  }

  .nav-item.active {
    color: var(--accent);
    background: var(--bg-surface);
    border-left-color: var(--accent);
    box-shadow: inset var(--shadow-glow);
  }

  /* ── Mobile (<1024px) ────────────────────────────────── */
  @media (max-width: 1023px) {
    .hamburger { display: flex; }
    .close-btn { display: flex; }

    .backdrop { display: block; }

    .sidebar {
      transform: translateX(-100%);
    }
    .sidebar.open {
      transform: translateX(0);
    }
  }
</style>

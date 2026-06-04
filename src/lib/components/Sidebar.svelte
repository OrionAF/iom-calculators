<script lang="ts">
  import { X, Pickaxe } from 'lucide-svelte'
  import { destinations } from '$lib/calculators/registry'
  import { currentRoute } from '$lib/stores/router'
  import { drawerOpen, closeDrawer } from '$lib/stores/drawer'
  import StatInput from './StatInput.svelte'
  import { focusTrap } from '$lib/actions/focusTrap'

  const dataDestinations = $derived(
    destinations.filter(d => d.kind === 'data')
  )

  const utilityDestinations = $derived(
    destinations.filter(d => d.kind === 'utility')
  )

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && $drawerOpen) closeDrawer()
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- Mobile backdrop. role=presentation div instead of a button (L1):
     keyboard users use Escape + the close button inside the drawer. -->
{#if $drawerOpen}
  <div
    class="backdrop"
    role="presentation"
    onclick={closeDrawer}
  ></div>
{/if}

<!-- Sidebar / Drawer -->
<aside
  id="sidebar"
  class="sidebar"
  class:open={$drawerOpen}
  use:focusTrap={$drawerOpen}
>
  <div class="sidebar-header">
    <Pickaxe class="sidebar-logo" size={20} aria-hidden="true" />
    <span class="sidebar-title">IOM Calc</span>
    <button class="close-btn" onclick={closeDrawer} aria-label="Close navigation">
    <X size={18} aria-hidden="true" />
  </button>
  </div>

  <StatInput />

  {#if dataDestinations.length}
    <nav class="data-nav" aria-label="Data">
      <p class="nav-section-label">Data</p>
      <ul class="nav-list" role="list">
        {#each dataDestinations as dest}
          {@const isActive = $currentRoute?.hash === dest.hash}
          {@const Icon = dest.icon}
          <li>
            <a
              class="nav-item"
              class:active={isActive}
              href={'#' + dest.hash}
              onclick={closeDrawer}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon class="nav-icon" size={16} aria-hidden="true" />
              <span>{dest.label}</span>
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  {/if}

  <nav aria-label="Calculators">
    <p class="nav-section-label">Calculators</p>
    <ul class="nav-list" role="list">
      {#each destinations.filter(d => d.kind === 'calculator') as dest}
        {@const isActive = $currentRoute?.hash === dest.hash}
        {@const Icon = dest.icon}
        <li>
          <a
            class="nav-item"
            class:active={isActive}
            href={'#' + dest.hash}
            onclick={closeDrawer}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon class="nav-icon" size={16} aria-hidden="true" />
            <span>{dest.label}</span>
          </a>
        </li>
      {/each}
    </ul>
  </nav>

  {#if utilityDestinations.length}
    <nav class="utility-nav" aria-label="App">
      <p class="nav-section-label">App</p>
      <ul class="nav-list" role="list">
        {#each utilityDestinations as dest}
          {@const isActive = $currentRoute?.hash === dest.hash}
          {@const Icon = dest.icon}
          <li>
            <a
              class="nav-item"
              class:active={isActive}
              href={'#' + dest.hash}
              onclick={closeDrawer}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon class="nav-icon" size={16} aria-hidden="true" />
              <span>{dest.label}</span>
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  {/if}
</aside>

<style>
  .backdrop {
    display: none;
    position: fixed;
    inset: 0;
    background: var(--overlay-bg);
    z-index: var(--z-overlay);
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

  .data-nav {
    margin-bottom: var(--space-6);
  }

  .utility-nav {
    margin-top: var(--space-6);
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: var(--space-2);
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

  .nav-item :global(.nav-icon) {
    flex-shrink: 0;
    color: var(--text-muted);
    transition: color var(--transition-fast);
  }

  .nav-item:hover :global(.nav-icon),
  .nav-item.active :global(.nav-icon) {
    color: var(--accent);
  }

  /* ── Mobile (<1024px) ────────────────────────────────── */
  @media (max-width: 1023px) {
    .close-btn { display: flex; }
    .backdrop { display: block; }

    .sidebar {
      transform: translateX(-100%);
      padding-bottom: calc(var(--space-4) + env(safe-area-inset-bottom));
    }
    .sidebar.open {
      transform: translateX(0);
    }
  }
</style>

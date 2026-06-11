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

  let touchStartX = 0
  let touchStartY = 0

  function onTouchStart(e: TouchEvent) {
    touchStartX = e.touches[0].clientX
    touchStartY = e.touches[0].clientY
  }

  function onTouchEnd(e: TouchEvent) {
    if (!$drawerOpen) return
    const dx = touchStartX - e.changedTouches[0].clientX
    const dy = Math.abs(touchStartY - e.changedTouches[0].clientY)
    // Threshold: 50px leftward, horizontal-dominant (not a vertical scroll).
    if (dx > 50 && dx > dy) closeDrawer()
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
  ontouchstart={onTouchStart}
  ontouchend={onTouchEnd}
>
  <div class="sidebar-header">
    <span class="logo-plate" aria-hidden="true">
      <Pickaxe class="sidebar-logo" size={18} aria-hidden="true" />
    </span>
    <span class="wordmark">
      <span class="wordmark-main">IOM</span>
      <span class="wordmark-sub">Calculators</span>
    </span>
    <button class="close-btn" onclick={closeDrawer} aria-label="Close navigation">
    <X size={18} aria-hidden="true" />
  </button>
  </div>

  <StatInput />

  {#if dataDestinations.length}
    <nav class="data-nav" aria-label="Data">
      <h2 class="nav-section-label">Data</h2>
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
    <h2 class="nav-section-label">Calculators</h2>
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
      <h2 class="nav-section-label">App</h2>
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
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    z-index: var(--z-overlay);
    cursor: pointer;
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100dvh;
    width: var(--sidebar-width);
    background:
      linear-gradient(180deg, color-mix(in srgb, var(--ember) 4%, transparent), transparent 140px),
      var(--bg-sidebar);
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
    gap: var(--space-3);
    margin-bottom: var(--space-4);
    padding-bottom: var(--space-4);
    border-bottom: 1px solid var(--border);
  }

  .logo-plate {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    flex-shrink: 0;
    border-radius: var(--radius-md);
    background:
      linear-gradient(160deg, color-mix(in srgb, var(--accent) 16%, transparent), color-mix(in srgb, var(--ember) 6%, transparent)),
      var(--bg-raised);
    border: 1px solid var(--border-accent);
    box-shadow: var(--shadow-glow);
    transition: rotate var(--transition-bounce), scale var(--transition-bounce);
  }
  .sidebar-header:hover .logo-plate {
    rotate: -10deg;
    scale: 1.06;
  }

  :global(.sidebar-logo) { color: var(--accent); }

  .wordmark {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    line-height: 1;
  }

  .wordmark-main {
    font-family: var(--font-display);
    font-size: var(--text-xl);
    font-weight: 800;
    color: var(--text-primary);
    letter-spacing: 0.02em;
  }

  .wordmark-sub {
    font-family: var(--font-body);
    font-size: 10px;
    font-weight: var(--weight-semibold);
    color: var(--accent);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    margin-top: 2px;
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
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: var(--weight-semibold);
    color: var(--text-dim);
    text-transform: uppercase;
    letter-spacing: 0.16em;
    margin-bottom: var(--space-2);
  }
  /* hairline rule trailing the label */
  .nav-section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(to right, var(--border), transparent);
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
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--space-3);
    width: 100%;
    min-height: 44px;
    padding: var(--space-2) var(--space-3);
    background: none;
    border: none;
    border-radius: var(--radius-pill);
    color: var(--text-muted);
    font-size: var(--text-base);
    font-family: var(--font-body);
    font-weight: var(--weight-semibold);
    cursor: pointer;
    text-align: left;
    text-decoration: none;
    transition:
      color var(--transition-fast),
      background var(--transition-fast),
      translate var(--transition-bounce);
  }

  .nav-item:hover {
    color: var(--text-primary);
    background: var(--bg-surface);
    translate: 3px 0;
  }

  .nav-item.active {
    color: var(--accent);
    background: color-mix(in srgb, var(--accent) 12%, transparent);
  }

  .nav-item :global(.nav-icon) {
    flex-shrink: 0;
    color: var(--text-dim);
    transition: color var(--transition-fast);
  }

  .nav-item:hover :global(.nav-icon),
  .nav-item.active :global(.nav-icon) {
    color: var(--accent);
  }

  /* ── Mobile (<1024px) ────────────────────────────────── */
  @media (max-width: 1023px) {
    .close-btn { display: flex; }
    .backdrop {
      display: block;
      /* sit above the fixed topbar so it dims too */
      z-index: var(--z-drawer);
    }

    .sidebar {
      transform: translateX(-100%);
      padding-bottom: calc(var(--space-4) + env(safe-area-inset-bottom));
      box-shadow: var(--shadow-raised);
      /* above topbar + backdrop: keeps the brand row and close button reachable */
      z-index: calc(var(--z-drawer) + 1);
    }
    .sidebar.open {
      transform: translateX(0);
    }
  }
</style>

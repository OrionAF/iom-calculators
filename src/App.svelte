<script lang="ts">
  import './app.css'
  import type { Component } from 'svelte'
  import { currentRoute } from './lib/stores/router'
  import { drawerOpen } from './lib/stores/drawer'
  import { settings } from './lib/stores/settings'

  // Sync display preferences to <html> so CSS custom properties cascade
  // globally without importing $settings in every page/component.
  $effect(() => {
    const root = document.documentElement
    root.classList.toggle('font-large', $settings.fontScale === 'large')
    root.dataset.density = $settings.density
  })

  // Body scroll lock while the drawer is open. <main> gets inert via a
  // separate path; this completes modal isolation on touch devices.
  $effect(() => {
    if (typeof document === 'undefined') return
    const original = document.body.style.overflow
    document.body.style.overflow = $drawerOpen ? 'hidden' : original || ''
    return () => { document.body.style.overflow = original }
  })
  import Sidebar from './lib/components/Sidebar.svelte'
  import MobileTopBar from './lib/components/MobileTopBar.svelte'
  import HomeGrid from './lib/components/HomeGrid.svelte'

  let activeComponent: Component | null = $state(null)

  $effect(() => {
    const route = $currentRoute
    if (!route) {
      activeComponent = null
      return
    }

    let cancelled = false
    route.destination.loader()
      .then(m => {
        if (!cancelled) activeComponent = m.default
      })
      .catch(() => {
        if (!cancelled) activeComponent = null
      })

    return () => { cancelled = true }
  })
</script>

<a href="#main-content" class="skip-link">Skip to content</a>

<div class="app-layout">
  <Sidebar />
  <MobileTopBar />

  <main
    id="main-content"
    class="main-content"
    inert={$drawerOpen || undefined}
  >
    {#key $currentRoute?.hash ?? 'home'}
      <div class="route-view">
        {#if $currentRoute && activeComponent}
          {@const Cmp = activeComponent}
          <Cmp />
        {:else}
          <HomeGrid />
        {/if}
      </div>
    {/key}
  </main>
</div>

<style>
  .app-layout {
    display: flex;
    min-height: 100dvh;
  }

  .main-content {
    flex: 1;
    padding: var(--space-6);
    max-width: var(--content-max-width);
    margin: 0 auto;
    width: 100%;
  }

  .route-view {
    animation: fade-up 0.3s var(--ease-out) both;
  }

  /* Desktop: offset main content by sidebar width */
  @media (min-width: 1024px) {
    .main-content {
      margin-left: var(--sidebar-width);
      padding: var(--space-8);
    }
  }

  /* Mobile: full width, add top padding for hamburger button */
  @media (max-width: 1023px) {
    .main-content {
      padding-top: calc(var(--space-12) + var(--space-4));
      padding-bottom: calc(var(--space-6) + env(safe-area-inset-bottom));
    }
  }
</style>

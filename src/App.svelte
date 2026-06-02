<script lang="ts">
  import './app.css'
  import type { Component } from 'svelte'
  import { currentRoute } from './lib/stores/router'
  import Sidebar from './lib/components/Sidebar.svelte'
  import HomeGrid from './lib/components/HomeGrid.svelte'

  // Vite glob import — includes all calculator components in the bundle
  // Each calculator file must be lowercase and match its route hash
  const calculators = import.meta.glob<{ default: Component }>('./lib/calculators/*.svelte')

  let activeComponent: Component | null = $state(null)

  $effect(() => {
    const route = $currentRoute
    if (!route) {
      activeComponent = null
      return
    }

    let cancelled = false
    const key = `./lib/calculators/${route.hash}.svelte`
    const loader = calculators[key]

    if (!loader) {
      activeComponent = null
      return
    }

    loader().then(m => {
      if (!cancelled) activeComponent = m.default
    }).catch(() => {
      if (!cancelled) activeComponent = null
    })

    return () => { cancelled = true }
  })
</script>

<a href="#main-content" class="skip-link">Skip to content</a>

<div class="app-layout">
  <Sidebar />

  <main id="main-content" class="main-content">
    {#if $currentRoute && activeComponent}
      {@const Cmp = activeComponent}
      <Cmp />
    {:else}
      <HomeGrid />
    {/if}
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

  /* Desktop: offset main content by sidebar width */
  @media (min-width: 1024px) {
    .main-content {
      margin-left: var(--sidebar-width);
    }
  }

  /* Mobile: full width, add top padding for hamburger button */
  @media (max-width: 1023px) {
    .main-content {
      padding-top: calc(var(--space-12) + var(--space-4));
    }
  }
</style>

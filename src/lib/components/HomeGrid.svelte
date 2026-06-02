<script lang="ts">
  import { ChevronRight } from 'lucide-svelte'
  import { destinations } from '$lib/calculators/registry'
</script>

<div class="home">
  <header class="home-header">
    <h1 class="home-title">IOM Calculators</h1>
    <p class="home-subtitle">Select a calculator to get started</p>
  </header>

  <div class="grid">
    {#each destinations.filter(d => d.kind === 'calculator') as dest}
      <a
        class="calc-card"
        href={'#' + dest.hash}
        aria-label="Open {dest.label} calculator"
      >
        <span class="card-label">{dest.label}</span>
        <ChevronRight size={18} class="card-arrow" aria-hidden="true" />
      </a>
    {/each}
  </div>
</div>

<style>
  .home {
    max-width: var(--content-max-width);
    margin: 0 auto;
    padding: var(--space-8) var(--space-6);
  }

  .home-header {
    margin-bottom: var(--space-8);
  }

  .home-title {
    font-family: var(--font-display);
    font-size: var(--text-3xl);
    font-weight: var(--weight-bold);
    color: var(--accent);
    letter-spacing: 0.06em;
    margin-bottom: var(--space-2);
  }

  .home-subtitle {
    font-size: var(--text-lg);
    color: var(--text-muted);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: var(--space-4);
  }

  .calc-card {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: var(--space-6);
    cursor: pointer;
    text-align: left;
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 80px;
    transition:
      border-color var(--transition-fast),
      box-shadow var(--transition-fast),
      background var(--transition-fast);
    font-family: var(--font-body);
  }

  .calc-card:hover {
    border-color: var(--border-accent);
    box-shadow: var(--shadow-glow);
    background: var(--bg-raised);
  }

  .card-label {
    font-size: var(--text-lg);
    font-weight: var(--weight-medium);
    color: var(--text-primary);
  }

  .card-arrow {
    font-size: var(--text-xl);
    color: var(--accent);
    transition: transform var(--transition-fast);
  }

  .calc-card:hover .card-arrow {
    transform: translateX(4px);
  }
</style>

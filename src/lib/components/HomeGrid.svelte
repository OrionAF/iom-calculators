<script lang="ts">
  import { ChevronRight } from 'lucide-svelte'
  import { destinations } from '$lib/calculators/registry'
  import type { DestinationKind } from '$lib/calculators/registry'

  const groupDefs: { kind: DestinationKind; title: string }[] = [
    { kind: 'data', title: 'Trackers' },
    { kind: 'calculator', title: 'Calculators' },
    { kind: 'utility', title: 'App' },
  ]

  const groups = groupDefs
    .map(g => ({ ...g, items: destinations.filter(d => d.kind === g.kind) }))
    .filter(g => g.items.length > 0)
</script>

<div class="home">
  <header class="home-header">
    <p class="home-eyebrow">Idle Obelisk Miner</p>
    <h1 class="home-title">Calculators</h1>
    <p class="home-subtitle">
      Paste your stat export in the sidebar, then pick a tool below.
    </p>
  </header>

  {#each groups as group}
    <section class="group" aria-label={group.title}>
      <h2 class="group-title">{group.title}</h2>
      <div class="grid">
        {#each group.items as dest, i}
          {@const Icon = dest.icon}
          <a
            class="calc-card"
            href={'#' + dest.hash}
            aria-label="Open {dest.label}"
            style="--d: {i * 60}ms"
          >
            <span class="icon-plate" aria-hidden="true">
              <Icon class="card-icon" size={20} aria-hidden="true" />
            </span>
            <span class="card-body">
              <span class="card-label">{dest.label}</span>
              <span class="card-desc">{dest.description}</span>
            </span>
            <ChevronRight size={18} class="card-arrow" aria-hidden="true" />
          </a>
        {/each}
      </div>
    </section>
  {/each}
</div>

<style>
  /* Page-level vertical breathing room only. Horizontal padding + max-width
     are owned by .main-content in App.svelte (U2). */
  .home {
    padding-block: var(--space-4);
  }

  .home-header {
    margin-bottom: var(--space-8);
  }

  .home-eyebrow {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: var(--weight-semibold);
    color: var(--accent);
    text-transform: uppercase;
    letter-spacing: 0.28em;
    margin-bottom: var(--space-2);
  }

  .home-title {
    font-family: var(--font-display);
    font-size: var(--text-3xl);
    font-weight: 800;
    color: var(--text-primary);
    letter-spacing: 0.01em;
    line-height: var(--leading-tight);
    margin-bottom: var(--space-2);
  }

  .home-subtitle {
    font-size: var(--text-lg);
    color: var(--text-muted);
    max-width: 52ch;
  }

  .group {
    margin-bottom: var(--space-8);
  }

  .group-title {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: var(--weight-semibold);
    color: var(--text-dim);
    text-transform: uppercase;
    letter-spacing: 0.16em;
    margin-bottom: var(--space-3);
  }
  .group-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(to right, var(--border), transparent);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: var(--space-4);
  }

  .calc-card {
    position: relative;
    overflow: hidden;
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: var(--space-4) var(--space-5);
    cursor: pointer;
    text-align: left;
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
    gap: var(--space-4);
    min-height: 84px;
    transition:
      border-color var(--transition-fast),
      box-shadow var(--transition-fast),
      background var(--transition-fast),
      translate var(--transition-bounce),
      scale var(--transition-bounce);
    font-family: var(--font-body);
    animation: fade-up 0.45s var(--ease-out) both;
    animation-delay: var(--d, 0ms);
  }

  /* molten hairline along the top — revealed on hover */
  .calc-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 14px;
    right: 14px;
    height: 3px;
    border-radius: 0 0 4px 4px;
    background: var(--grad-molten);
    opacity: 0;
    transition: opacity var(--transition-fast);
  }

  .calc-card:hover {
    border-color: var(--border-accent);
    box-shadow: var(--shadow-glow), var(--shadow-surface);
    background: var(--bg-raised);
    translate: 0 -3px;
    scale: 1.01;
  }
  .calc-card:hover::before { opacity: 1; }

  .icon-plate {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    flex-shrink: 0;
    border-radius: var(--radius-md);
    background:
      linear-gradient(160deg, color-mix(in srgb, var(--accent) 14%, transparent), color-mix(in srgb, var(--ember) 4%, transparent)),
      var(--bg-inset);
    border: 1px solid var(--border-strong);
    transition:
      border-color var(--transition-fast),
      box-shadow var(--transition-fast),
      rotate var(--transition-bounce),
      scale var(--transition-bounce);
  }
  .calc-card:hover .icon-plate {
    border-color: var(--border-accent);
    box-shadow: var(--shadow-glow);
    rotate: -7deg;
    scale: 1.08;
  }

  .card-body {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .card-label {
    font-size: var(--text-lg);
    font-weight: var(--weight-semibold);
    color: var(--text-primary);
    line-height: var(--leading-tight);
  }

  .card-desc {
    font-size: var(--text-sm);
    color: var(--text-muted);
    line-height: var(--leading-base);
  }

  .calc-card :global(.card-icon) {
    flex-shrink: 0;
    color: var(--accent);
  }

  .calc-card :global(.card-arrow) {
    color: var(--text-dim);
    transition: transform var(--transition-fast), color var(--transition-fast);
  }

  .calc-card:hover :global(.card-arrow) {
    transform: translateX(4px);
    color: var(--accent);
  }
</style>

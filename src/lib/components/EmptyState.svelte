<script lang="ts">
  import { Pickaxe } from 'lucide-svelte'
</script>

<div class="empty-state" role="status">
  <Pickaxe class="icon" size={48} strokeWidth={1.25} aria-hidden="true" />
  <h2 class="title">No stats loaded</h2>
  <p class="description">
    Paste your IOM stat export to use this calculator.
    In-game: <strong>Options → Gift Code → type EXPORT</strong>.
  </p>
  <p class="hint">Your stats are saved locally and shared across all calculators.</p>
</div>

<style>
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: var(--space-12) var(--space-6);
    gap: var(--space-4);
    min-height: 300px;
  }

  :global(.icon) {
    opacity: 0.4;
    color: var(--text-muted);
  }

  .title {
    font-family: var(--font-display);
    font-size: var(--text-xl);
    font-weight: var(--weight-bold);
    color: var(--text-primary);
    letter-spacing: 0.04em;
  }

  .description {
    font-size: var(--text-base);
    color: var(--text-muted);
    max-width: 400px;
    line-height: var(--leading-loose);
  }

  .description strong {
    color: var(--accent);
    font-weight: var(--weight-medium);
  }

  .hint {
    font-size: var(--text-sm);
    color: var(--text-dim);
  }
</style>

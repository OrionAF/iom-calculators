<script lang="ts">
  import { X } from 'lucide-svelte'
  import { focusTrap } from '$lib/actions/focusTrap'
  import type { Snippet } from 'svelte'

  interface Props {
    open: boolean
    title: string
    description?: string
    onclose: () => void
    closeOnBackdrop?: boolean
    closeOnEscape?: boolean
    children: Snippet
    footer?: Snippet
  }

  let {
    open,
    title,
    description,
    onclose,
    closeOnBackdrop = true,
    closeOnEscape = true,
    children,
    footer,
  }: Props = $props()

  function handleKeydown(e: KeyboardEvent) {
    if (open && closeOnEscape && e.key === 'Escape') {
      e.preventDefault()
      onclose()
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
  <button
    class="modal-backdrop"
    onclick={closeOnBackdrop ? onclose : undefined}
    aria-label="Close dialog"
    tabindex="-1"
  ></button>

  <div
    class="modal"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    aria-describedby="modal-body"
    use:focusTrap={open}
  >
    <header class="modal-header">
      <h2 id="modal-title">{title}</h2>
      <button class="modal-close" onclick={onclose} aria-label="Close dialog">
        <X size={18} aria-hidden="true" />
      </button>
    </header>
    <div id="modal-body" class="modal-body">
      {#if description}
        <p class="modal-description">{description}</p>
      {/if}
      {@render children()}
    </div>
    {#if footer}
      <footer class="modal-footer">
        {@render footer()}
      </footer>
    {/if}
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: var(--overlay-bg);
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
    z-index: var(--z-overlay);
    border: 0;
    padding: 0;
    cursor: pointer;
    animation: fade-in 180ms ease-out;
  }

  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100vw - var(--space-4) * 2);
    max-width: 480px;
    max-height: calc(100dvh - var(--space-8) * 2);
    background: var(--bg-raised);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-lg);
    border-top: 2px solid var(--accent);
    box-shadow: var(--shadow-raised);
    z-index: calc(var(--z-overlay) + 1);
    display: flex;
    flex-direction: column;
    animation: pop-in 220ms var(--ease-bounce);
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-4) var(--space-6);
    border-bottom: 1px solid var(--border);
  }

  .modal-header h2 {
    font-family: var(--font-display);
    font-size: var(--text-xl);
    font-weight: var(--weight-bold);
    color: var(--text-primary);
    letter-spacing: 0.01em;
    margin: 0;
  }

  .modal-close {
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    min-width: 44px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-md);
    transition: color var(--transition-fast), background var(--transition-fast);
  }

  .modal-close:hover {
    color: var(--text-primary);
    background: color-mix(in srgb, var(--text-primary) 8%, transparent);
  }

  .modal-body {
    padding: var(--space-6);
    padding-bottom: max(var(--space-6), env(safe-area-inset-bottom));
    overflow-y: auto;
    flex: 1;
    font-size: var(--text-base);
    color: var(--text-primary);
    line-height: var(--leading-loose);
  }

  .modal-description {
    margin-bottom: var(--space-3);
    color: var(--text-muted);
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: var(--space-3);
    padding: var(--space-4) var(--space-6);
    border-top: 1px solid var(--border);
  }

  @keyframes fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
</style>

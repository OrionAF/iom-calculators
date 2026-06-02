<script lang="ts">
  import RadioGroup from '$lib/components/RadioGroup.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import { settings, setNotation } from '$lib/stores/settings'
  import { hardReset } from '$lib/storage/reset'
  import type { Notation } from '$lib/format'

  type Stage = 'idle' | 'confirm-1' | 'confirm-2'
  let stage = $state<Stage>('idle')
  let confirmInput = $state('')

  const notationOptions: { value: Notation; label: string; preview: Record<string, string> }[] = [
    { value: 'standard',    label: 'Standard',    preview: { '1,234': '1.23k',  '1.23e8': '123m'   } },
    { value: 'scientific',  label: 'Scientific',  preview: { '1,234': '1.23e3', '1.23e8': '1.23e8' } },
    { value: 'engineering', label: 'Engineering', preview: { '1,234': '1.23e3', '1.23e8': '123e6'  } },
  ]

  function openConfirm()     { stage = 'confirm-1' }
  function advanceToStage2() { stage = 'confirm-2'; confirmInput = '' }
  function cancel()          { stage = 'idle';      confirmInput = '' }

  function executeReset(e: SubmitEvent) {
    e.preventDefault()
    if (confirmInput !== 'RESET') return
    hardReset()
    stage = 'idle'
    confirmInput = ''
  }
</script>

<div class="page">
  <header class="page-header">
    <h1 class="page-title">Settings</h1>
    <p class="page-description">Configure how IOM Calculators behave.</p>
  </header>

  <section class="settings-section">
    <RadioGroup
      label="Number notation"
      description="How large numbers are displayed across the app."
      options={notationOptions}
      value={$settings.notation}
      onchange={setNotation}
    />
  </section>

  <section class="danger-zone">
    <h2 class="danger-title">Danger Zone</h2>
    <p class="danger-description">Irreversible actions.</p>

    <div class="danger-card">
      <div class="danger-card-text">
        <h3 class="danger-card-title">Hard Reset</h3>
        <p class="danger-card-desc">Delete all stats and settings stored by IOM Calculators.</p>
      </div>
      <button
        class="btn-danger"
        type="button"
        onclick={openConfirm}
        aria-haspopup="dialog"
      >
        Reset…
      </button>
    </div>
  </section>
</div>

<!-- Stage 1: explain what will happen -->
<Modal
  open={stage === 'confirm-1'}
  title="Hard Reset?"
  onclose={cancel}
>
  {#snippet children()}
    <p>This will delete:</p>
    <ul class="modal-list">
      <li>Your imported stat export</li>
      <li>Your notation preference</li>
    </ul>
    <p>Calculator pages and the app itself stay. This cannot be undone.</p>
  {/snippet}
  {#snippet footer()}
    <button class="btn-ghost" type="button" onclick={cancel}>Cancel</button>
    <button class="btn-danger-outline" type="button" onclick={advanceToStage2}>Continue</button>
  {/snippet}
</Modal>

<!-- Stage 2: type RESET to confirm -->
<Modal
  open={stage === 'confirm-2'}
  title="Confirm Reset"
  onclose={cancel}
  closeOnBackdrop={false}
>
  {#snippet children()}
    <form id="confirm-reset-form" onsubmit={executeReset}>
      <p id="stage-2-helper">Type <strong>RESET</strong> below to confirm.</p>
      <input
        type="text"
        bind:value={confirmInput}
        autocomplete="off"
        spellcheck="false"
        autocapitalize="characters"
        inputmode="text"
        aria-describedby="stage-2-helper"
        aria-invalid={confirmInput.length > 0 && confirmInput !== 'RESET'}
        autofocus
      />
      <p class="final-warning">Once you confirm, this happens immediately and cannot be undone.</p>
    </form>
  {/snippet}
  {#snippet footer()}
    <button class="btn-ghost" type="button" onclick={cancel}>Cancel</button>
    <button
      class="btn-danger-solid"
      type="submit"
      form="confirm-reset-form"
      disabled={confirmInput !== 'RESET'}
    >
      Reset everything
    </button>
  {/snippet}
</Modal>

<style>
  .page {
    max-width: var(--content-max-width);
  }

  .page-header {
    margin-bottom: var(--space-8);
  }

  .page-title {
    font-family: var(--font-display);
    font-size: var(--text-2xl);
    font-weight: var(--weight-bold);
    color: var(--accent);
    letter-spacing: 0.04em;
    margin-bottom: var(--space-2);
  }

  .page-description {
    font-size: var(--text-base);
    color: var(--text-muted);
    line-height: var(--leading-loose);
  }

  .settings-section {
    margin-bottom: var(--space-12);
  }

  /* ── Danger zone ─────────────────────────────────────── */
  .danger-zone {
    border: 1px solid color-mix(in srgb, var(--error) 30%, transparent);
    border-radius: var(--radius-lg);
    padding: var(--space-6);
  }

  .danger-title {
    font-family: var(--font-display);
    font-size: var(--text-lg);
    font-weight: var(--weight-bold);
    color: var(--error);
    letter-spacing: 0.04em;
    margin-bottom: var(--space-1);
  }

  .danger-description {
    font-size: var(--text-sm);
    color: var(--text-muted);
    margin-bottom: var(--space-4);
  }

  .danger-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    padding: var(--space-4);
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
  }

  .danger-card-text { flex: 1; min-width: 0; }

  .danger-card-title {
    font-size: var(--text-base);
    font-weight: var(--weight-medium);
    color: var(--text-primary);
    margin-bottom: var(--space-1);
  }

  .danger-card-desc {
    font-size: var(--text-sm);
    color: var(--text-muted);
    line-height: var(--leading-base);
  }

  /* ── Buttons ─────────────────────────────────────────── */
  .btn-danger {
    background: transparent;
    color: var(--error);
    border: 1px solid var(--error);
    border-radius: var(--radius-md);
    padding: var(--space-2) var(--space-4);
    font-size: var(--text-sm);
    font-weight: var(--weight-bold);
    font-family: var(--font-body);
    cursor: pointer;
    min-height: 44px;
    flex-shrink: 0;
    transition: background var(--transition-fast), color var(--transition-fast);
  }

  @media (hover: hover) {
    .btn-danger:hover {
      background: var(--error);
      color: var(--text-primary);
    }
  }

  .btn-ghost {
    background: none;
    color: var(--text-muted);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: var(--space-2) var(--space-4);
    font-size: var(--text-sm);
    cursor: pointer;
    min-height: 44px;
    font-family: var(--font-body);
    transition: color var(--transition-fast), border-color var(--transition-fast);
  }

  @media (hover: hover) {
    .btn-ghost:hover {
      color: var(--text-primary);
      border-color: var(--text-muted);
    }
  }

  .btn-danger-outline {
    background: transparent;
    color: var(--error);
    border: 1px solid var(--error);
    border-radius: var(--radius-md);
    padding: var(--space-2) var(--space-4);
    font-size: var(--text-sm);
    font-weight: var(--weight-bold);
    font-family: var(--font-body);
    cursor: pointer;
    min-height: 44px;
    transition: background var(--transition-fast), color var(--transition-fast);
  }

  @media (hover: hover) {
    .btn-danger-outline:hover {
      background: var(--error);
      color: var(--text-primary);
    }
  }

  .btn-danger-solid {
    background: var(--error);
    color: var(--text-primary);
    border: none;
    border-radius: var(--radius-md);
    padding: var(--space-2) var(--space-4);
    font-size: var(--text-sm);
    font-weight: var(--weight-bold);
    font-family: var(--font-body);
    cursor: pointer;
    min-height: 44px;
    transition: opacity var(--transition-fast);
  }

  .btn-danger-solid:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  /* ── Modal body internals ─────────────────────────────── */
  .modal-list {
    list-style: disc;
    padding-left: var(--space-6);
    margin: var(--space-2) 0;
    color: var(--text-primary);
  }

  .modal-list li {
    margin: var(--space-1) 0;
  }

  #confirm-reset-form input {
    font-family: var(--font-mono);
    font-size: var(--text-base);
    color: var(--text-primary);
    background: var(--bg-base);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: var(--space-2) var(--space-3);
    width: 100%;
    min-height: 44px;
    margin: var(--space-3) 0;
    transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
  }

  #confirm-reset-form input:focus {
    border-color: var(--border-accent);
    box-shadow: var(--shadow-glow);
    outline: none;
  }

  #confirm-reset-form input[aria-invalid='true'] {
    border-color: var(--error);
  }

  #stage-2-helper { color: var(--text-primary); }
  #stage-2-helper strong { color: var(--accent); font-weight: var(--weight-bold); }

  .final-warning {
    font-size: var(--text-sm);
    color: var(--text-muted);
  }
</style>

<script lang="ts">
  import RadioGroup from '$lib/components/RadioGroup.svelte'
  import Toggle from '$lib/components/Toggle.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import PageHeader from '$lib/components/PageHeader.svelte'
  import Button from '$lib/components/Button.svelte'
  import { settings, setNotation, setFontScale, setDensity, setStatTooltips, resetSettings } from '$lib/stores/settings'
  import { clearStats } from '$lib/stores/stats'
  import { resetStoreProgress } from '$lib/stores/storeProgress'
  import { resetSkillProgress } from '$lib/stores/skillProgress'
  import { focusOnMount } from '$lib/actions/focusOnMount'
  import type { Notation, } from '$lib/format'
  import type { FontScale, Density } from '$lib/stores/settings'
  import { previewFor } from './densityPreview'

  let viewportWidth = $state(typeof window !== 'undefined' ? window.innerWidth : 1280)

  $effect(() => {
    if (typeof window === 'undefined') return
    const handler = () => { viewportWidth = window.innerWidth }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  })

  const fontScaleOptions: { value: FontScale; label: string; preview: Record<string, string> }[] = [
    { value: 'normal', label: 'Normal', preview: { 'body': '16px', 'heading': '26px' } },
    { value: 'large',  label: 'Large',  preview: { 'body': '18px', 'heading': '28px' } },
  ]

  const densityOptions = $derived([
    { value: 'compact'        as Density, label: 'Compact',        preview: previewFor(4, 3, viewportWidth) },
    { value: 'normal'         as Density, label: 'Normal',         preview: previewFor(3, 2, viewportWidth) },
    { value: 'spacious'       as Density, label: 'Spacious',       preview: previewFor(2, 1, viewportWidth) },
    { value: 'super-spacious' as Density, label: 'Super Spacious', preview: previewFor(1, 1, viewportWidth) },
  ])

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

  const STORAGE_PREFIX = 'iom-'

  function scrubStorage(storage: Storage): void {
    const keysToRemove: string[] = []
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i)
      if (key && key.startsWith(STORAGE_PREFIX)) keysToRemove.push(key)
    }
    for (const key of keysToRemove) storage.removeItem(key)
  }

  function resetAll(): void {
    if (typeof window === 'undefined') return
    clearStats()
    resetSettings()
    resetStoreProgress()
    resetSkillProgress()
    scrubStorage(localStorage)
    scrubStorage(sessionStorage)
  }

  function executeReset(e: SubmitEvent) {
    e.preventDefault()
    if (confirmInput !== 'RESET') return
    resetAll()
    stage = 'idle'
    confirmInput = ''
  }
</script>

<div class="page">
  <PageHeader
    title="Settings"
    description="Configure how IOM Calculators behave."
  />

  <section class="settings-section">
    <RadioGroup
      label="Number notation"
      description="How large numbers are displayed across the app."
      options={notationOptions}
      value={$settings.notation}
      onchange={setNotation}
    />
  </section>

  <section class="settings-section">
    <RadioGroup
      label="Font size"
      description="Controls text size across all pages."
      options={fontScaleOptions}
      value={$settings.fontScale}
      onchange={setFontScale}
    />
  </section>

  <section class="settings-section">
    <RadioGroup
      label="Layout density"
      description="Controls how many columns are shown in grids across the app."
      options={densityOptions}
      value={$settings.density}
      onchange={setDensity}
    />
  </section>

  <section class="settings-section">
    <Toggle
      label="Stat tooltips"
      description="Show a tooltip when hovering or tapping a stat effect in the Store. Displays the stat's name, description, and the value this pack adds."
      checked={$settings.statTooltips}
      onchange={setStatTooltips}
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
      <Button
        variant="danger-outline"
        onclick={openConfirm}
        aria-haspopup="dialog"
      >
        {#snippet children()}Reset…{/snippet}
      </Button>
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
      <li>All settings (notation, font scale, density)</li>
      <li>Your Store progress</li>
      <li>Your Skill Tree progress</li>
    </ul>
    <p>Calculator pages and the app itself stay. This cannot be undone.</p>
  {/snippet}
  {#snippet footer()}
    <Button variant="ghost" onclick={cancel}>{#snippet children()}Cancel{/snippet}</Button>
    <Button variant="danger-outline" onclick={advanceToStage2}>{#snippet children()}Continue{/snippet}</Button>
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
        aria-describedby="stage-2-helper reset-validation"
        aria-invalid={confirmInput.length > 0 && confirmInput !== 'RESET'}
        use:focusOnMount
      />
      <p id="reset-validation" class="validation-msg" aria-live="polite">
        {#if confirmInput.length > 0 && confirmInput !== 'RESET'}
          Type RESET (uppercase) exactly.
        {/if}
      </p>
      <p class="final-warning">Once you confirm, this happens immediately and cannot be undone.</p>
    </form>
  {/snippet}
  {#snippet footer()}
    <Button variant="ghost" onclick={cancel}>{#snippet children()}Cancel{/snippet}</Button>
    <Button
      variant="danger"
      type="submit"
      form="confirm-reset-form"
      disabled={confirmInput !== 'RESET'}
    >
      {#snippet children()}Reset everything{/snippet}
    </Button>
  {/snippet}
</Modal>

<style>
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

  .validation-msg {
    font-size: var(--text-sm);
    color: var(--error);
    min-height: 1.5em;
    margin-bottom: var(--space-2);
  }
  .final-warning {
    font-size: var(--text-sm);
    color: var(--text-muted);
  }
</style>

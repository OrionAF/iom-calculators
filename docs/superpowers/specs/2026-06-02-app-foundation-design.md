# IOM Calculators — App Foundation Design

**Date:** 2026-06-02  
**Status:** Approved (updated after multi-skill review ×2)

## Overview

A static GitHub Pages web app for Idle Obelisk Miner (IOM) calculators. Players paste their in-game JSON stat export once; all calculators read from it reactively. Built with Svelte 5 + Vite + TypeScript, deployed via GitHub Actions.

## Decisions

| Decision | Choice | Reason |
|---|---|---|
| Framework | Svelte 5 + Vite + TypeScript | Compiles to minimal JS, best for calc-style apps, excellent DX |
| Routing | Hash-based, extracted to `router.ts` store | Zero config on GitHub Pages; router module is independently testable |
| Theme | Dark Gaming | Dark bg (`#0f0f1a`), gold/amber (`#d4a017`) accents |
| Nav | Sidebar (desktop) + slide-out drawer on mobile | Hamburger opens drawer; no redundant bottom tab bar |
| Stat input | Global panel in sidebar, owned by `statsStore` | Parse/validate/migrate in one module, persisted to `localStorage` |
| UI library | None — Lucide SVG icons | Hand-rolled components; SVG icons only, no emoji as icons |
| Calculator logic | Pure `logic/*.ts` modules | Testable without DOM or Svelte runtime |
| Component loading | Dynamic `import()` keyed by route hash | Code splitting; `routes.ts` stays pure data |
| Error typing | Custom discriminated union `ParseError` | No library dependency; pattern-matchable in `StatInput` |

## File Structure

```
src/
  lib/
    stores/
      stats.ts              # deep module: parse, validate, migrate, localStorage
      router.ts             # deep module: currentRoute readable store
    components/
      Sidebar.svelte         # nav + stat import panel (UI adapter only)
      StatInput.svelte       # paste/upload JSON widget — calls statsStore.loadStats()
      ResultCard.svelte      # shared result display card
      StatField.svelte       # labeled input with "from export" vs "manual" badge
      EmptyState.svelte      # "paste your stats" prompt, used by every calculator
      HomeGrid.svelte        # landing card grid of all available calculators
    calculators/
      Fishing.svelte         # UI adapter — calls logic/fishing.ts, renders result
      logic/
        fishing.ts           # pure fn: fishingIncome(stats, inputs) → number
    format.ts                # shared number formatting module
  routes.ts                  # central route registry (pure data — no component refs)
  App.svelte                 # shell: sidebar + router outlet (dynamic import)
  main.ts                    # entry point
  app.css                    # global CSS custom properties (all theme tokens)
public/
  noise.png                  # subtle grain texture (low-opacity overlay on bg-base)
docs/
.github/
  workflows/
    deploy.yml               # build + deploy to GitHub Pages
```

## Architecture

### App Shell (`App.svelte`)

First element: `<a href="#main-content" class="skip-link">Skip to content</a>` (visually hidden, visible on focus — WCAG AA).

Renders `<Sidebar>` always. Reads `$currentRoute` from `router.ts` store. Dynamically imports the matching calculator component:

```ts
// App.svelte — component resolution via dynamic import (enables code splitting)
$: if ($currentRoute) {
  import(`./lib/calculators/${$currentRoute.hash}.svelte`)
    .then(m => { activeComponent = m.default })
}
```

Falls back to `<HomeGrid>` when route is null/unrecognised. No routing logic in this file beyond the dynamic import.

### Routing (`router.ts` + `routes.ts`)

`routes.ts` is pure data — no component references:

```ts
export interface RouteDescriptor {
  hash: string
  label: string
  icon: string  // Lucide icon name
}

export const routes: RouteDescriptor[] = [
  { hash: 'fishing', label: 'Fishing', icon: 'fish' },
]
```

`router.ts` is a deep module. Interface:

```ts
export interface ResolvedRoute {
  descriptor: RouteDescriptor
  hash: string
}

export const currentRoute: Readable<ResolvedRoute | null>
export function navigate(hash: string): void
```

Internally owns `window.location.hash`, `hashchange` event listener, and route resolution against `routes`. Neither `App.svelte` nor `Sidebar.svelte` touches `window.location` directly.

Browser back/forward navigation works naturally — hash changes fire `hashchange`, `currentRoute` updates reactively.

### State (`stats.ts`)

Deep module. Interface:

```ts
export type ParseError =
  | { kind: 'invalid-json'; message: string }
  | { kind: 'missing-stats-key' }
  | { kind: 'unsupported-version'; version: string }

export type Result<T, E> =
  | { ok: true; value: T }
  | { ok: false; error: E }

export function loadStats(json: string): Result<void, ParseError>
export function clearStats(): void
export const stats: Readable<StatsExport | null>
```

`StatInput.svelte` pattern-matches on the returned `Result` to display specific error messages. Internally owns JSON.parse, shape validation, version detection, localStorage read/write, and future migration logic.

`StatsExport` type:
```ts
interface StatsExport {
  version: string
  stats: Record<string, number>
  time: number
}
```

`stats` is `null` until a valid export is loaded. Store hydrates from `localStorage` on module import.

### `StatInput.svelte` behaviour

- Textarea with `min-height: 120px` (comfortable on mobile)
- Validates on `paste` event (after one microtask via `setTimeout(0)`) **and** on submit button press
- On valid input: calls `loadStats(json)`, shows `● Stats loaded (v2.1.6)` indicator
- On invalid input: pattern-matches `ParseError` kind → specific message via `role="alert"` (screen reader announced)
- Does not clear existing valid stats on failed paste attempt

### Calculator pattern

Each calculator follows this two-part pattern:

**`logic/calculator-name.ts`** — pure TypeScript module:
- Accepts `(stats: StatsExport['stats'], inputs: CalcInputs)` and returns results
- No Svelte imports, no DOM, no store reads
- Fully testable with plain `import` and `vitest`

**`calculators/CalculatorName.svelte`** — shallow UI adapter:
1. Reads `$stats` from store
2. Renders `<EmptyState>` if stats is null
3. Accepts manual inputs via `<StatField>` components
4. Calls the logic module reactively (`$derived`)
5. Displays result in `<ResultCard>`

### Shared Components

| Component | Purpose |
|---|---|
| `ResultCard.svelte` | Displays computed result with label, value, unit. Gets `--shadow-glow` on active state. |
| `StatField.svelte` | Labeled input; shows "from export" badge when value comes from statsStore, "manual" badge otherwise |
| `EmptyState.svelte` | "Paste your stats to use this calculator" prompt with paste CTA |
| `HomeGrid.svelte` | Landing page card grid — one card per route, links via `navigate()` |

### Sidebar (`Sidebar.svelte`)

- Desktop (≥1024px): fixed-width `var(--sidebar-width)` panel, always visible
- Mobile (<1024px): hidden by default; hamburger opens slide-in overlay drawer
  - Drawer uses `transform: translateX(-100%)` → `translateX(0)`, `transition: var(--transition-base)`
  - Backdrop: `var(--overlay-bg)` div at `var(--z-overlay)`, click closes drawer
  - Focus trapped inside open drawer (Tab cycles within it; Escape closes and returns focus to hamburger)
- Active route highlighted via `$currentRoute` from router store
- Stats status indicator always visible in header (`● Stats loaded` / `● No stats`)

## UI / Theme Tokens

All defined as CSS custom properties in `app.css`.

### Color
```css
--bg-base:        #0f0f1a;
--bg-surface:     #1e1e2e;
--bg-raised:      #1a1a2e;
--bg-sidebar:     #13131f;
--border:         #2a2a3e;
--border-accent:  #d4a017;
--accent:         #d4a017;
--accent-hover:   #e8b420;
--accent-dim:     #7a5c0a;
--accent-text:    #0f0f1a;
--text-primary:   #e0e0ff;
--text-muted:     #a0a0c0;
--text-dim:       #555555;
--success:        #4ade80;
--error:          #f87171;
--warning:        #fb923c;
--focus-ring:     #d4a017;
--overlay-bg:     rgba(0, 0, 0, 0.6);   /* mobile drawer backdrop */
```

### Typography
```css
--font-display:  'Orbitron', monospace;
--font-mono:     'JetBrains Mono', 'Fira Mono', monospace;
--font-body:     'Inter', system-ui, sans-serif;

/* Type scale */
--text-xs:    11px;
--text-sm:    12px;
--text-base:  14px;
--text-lg:    16px;
--text-xl:    20px;
--text-2xl:   26px;
--text-3xl:   34px;

/* Line heights */
--leading-tight:  1.2;
--leading-base:   1.5;
--leading-loose:  1.75;

/* Weights */
--weight-normal:  400;
--weight-medium:  500;
--weight-bold:    700;
```

Load via Google Fonts: Orbitron (display), JetBrains Mono (mono). Inter via system fallback.

Minimum body font size: `var(--text-base)` (14px) — never smaller in main content (avoids iOS auto-zoom on inputs).

### Shape & Spacing
```css
--radius-sm:   4px;
--radius-md:   6px;
--radius-lg:   10px;

--sidebar-width:      220px;
--content-max-width:  900px;   /* max-width of main content area at xl+ */

/* 4pt base spacing system */
--space-1:  4px;
--space-2:  8px;
--space-3:  12px;
--space-4:  16px;
--space-6:  24px;
--space-8:  32px;
--space-12: 48px;
```

### Motion
```css
--transition-fast:  120ms ease-out;
--transition-base:  200ms ease-out;
--transition-slow:  300ms ease-out;
```

All animated elements must respect:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
```

### Depth / Atmosphere
```css
--shadow-glow:    0 0 12px rgba(212, 160, 23, 0.25);
--shadow-surface: 0 2px 8px rgba(0, 0, 0, 0.4);
```

`--shadow-glow` applied to: `ResultCard` (on non-null result), `StatInput` focus border, active nav item left border.

**Background texture:** `--bg-base` gets a `::before` pseudo-element with `background-image: url('/noise.png')` at `opacity: 0.04`, `pointer-events: none`. `noise.png` is a 200×200px tileable grain texture in `/public`. Gives dark surface tactile depth without a flat-black appearance.

### Z-index scale
```css
--z-base:    0;
--z-raised:  10;
--z-overlay: 20;    /* mobile drawer backdrop */
--z-drawer:  30;    /* mobile drawer */
--z-toast:   100;
```

### Breakpoints
```
sm:  640px
md:  768px
lg:  1024px   ← sidebar switch point (mobile drawer ↔ desktop panel)
xl:  1280px
```

Use `min-height: 100dvh` (not `100vh`) for full-viewport layouts.

## Accessibility

- First element in `App.svelte`: `<a href="#main-content" class="skip-link">Skip to content</a>` — visually hidden, shown on focus
- `<html lang="en">`
- All interactive elements: `outline: 2px solid var(--focus-ring); outline-offset: 2px`
- `<nav>` wraps sidebar nav list with `aria-label="Calculators"`
- Active nav item: `aria-current="page"`
- Hamburger button: `aria-label="Open navigation"` / `aria-expanded={drawerOpen}`
- Mobile drawer open: focus trapped inside; Escape closes and returns focus to hamburger
- `StatInput` error: `role="alert"` with specific `ParseError` message
- All decorative Lucide icons: `aria-hidden="true"`; functional icon buttons: `aria-label`
- Touch targets: minimum `44×44px` — nav items: `min-height: 44px`
- `touch-action: manipulation` on all interactive elements
- Keyboard: Tab through nav, Enter/Space activates, Escape closes drawer

## Number Formatting (`format.ts`)

Shared module at `src/lib/format.ts`. IOM stat values use scientific notation (e.g. `1.016e+37`). All calculators use this module — never format independently.

```ts
export function formatStat(n: number): string
  // Display format TBD per calculator spec.
  // Default: suffix notation (K/M/B/T/Qa/Qi/Sx/Sp/Oc/No/Dc...)
  // Exact breakpoints defined when first calculator is implemented.

export function formatGold(n: number): string
  // Gold income values — suffix notation with 2 decimal places

export function formatPercent(n: number): string
  // e.g. 200.88 → "200.88%"

export function formatMultiplier(n: number): string
  // e.g. 200.88 → "200.88×"
```

## Deployment

GitHub Actions workflow on push to `main`:
1. `npm ci`
2. `npm run build` (Vite outputs to `dist/`)
3. Deploy `dist/` to `gh-pages` branch via `actions/deploy-pages`

`vite.config.ts` sets `base: '/iom-calculators/'` to match the GitHub Pages repo path.

## Expansion Pattern

Adding a new calculator:

1. Create `src/lib/calculators/logic/newcalc.ts` — pure calculation function
2. Create `src/lib/calculators/NewCalc.svelte` — UI adapter (filename must match route hash for dynamic import)
3. Add one entry to `routes.ts`
4. Push to `main`

No changes to `App.svelte`, `Sidebar.svelte`, `router.ts`, `stats.ts`, or any other shared module.

## Out of Scope

- User accounts / cloud sync
- Server-side computation
- Dark/light mode toggle (dark gaming only)
- Calculator-specific formula design (per-calculator specs)
- Toast/notification system (no async operations requiring feedback beyond inline errors)

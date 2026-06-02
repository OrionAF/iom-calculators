# IOM Calculators — App Foundation Design

**Date:** 2026-06-02  
**Status:** Approved (updated after multi-skill review)

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
  routes.ts                  # central route registry (data only, no component refs in registry)
  App.svelte                 # shell: sidebar + router outlet (<svelte:component>)
  main.ts                    # entry point
  app.css                    # global CSS custom properties (all theme tokens)
public/
docs/
.github/
  workflows/
    deploy.yml               # build + deploy to GitHub Pages
```

## Architecture

### App Shell (`App.svelte`)

Renders `<Sidebar>` always. Reads `$currentRoute` from `router.ts` store, renders matching calculator component via `<svelte:component>`. Falls back to `<HomeGrid>` when route is null/unrecognised. No routing logic in this file.

### Routing (`router.ts` + `routes.ts`)

`routes.ts` is pure data — a list of route descriptors with no component references:

```ts
export const routes: RouteDescriptor[] = [
  { hash: 'fishing', label: 'Fishing', icon: 'fish' }, // icon = Lucide icon name
]
```

`router.ts` is a deep module. Its interface:

```ts
export const currentRoute: Readable<ResolvedRoute | null>
export function navigate(hash: string): void
```

Internally owns `window.location.hash`, `hashchange` event listener, and route resolution. Neither `App.svelte` nor `Sidebar.svelte` touches `window.location` directly.

### State (`stats.ts`)

Deep module. Interface:

```ts
export function loadStats(json: string): Result<void, ParseError>
export function clearStats(): void
export const stats: Readable<StatsExport | null>
```

Internally owns JSON.parse, shape validation, version detection, localStorage read/write, and future migration logic. `StatInput.svelte` calls `loadStats()` — it has no parse logic of its own.

`StatsExport` type:
```ts
interface StatsExport {
  version: string
  stats: Record<string, number>
  time: number
}
```

`stats` is `null` until a valid export is loaded. Store hydrates from `localStorage` on module import.

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
| `ResultCard.svelte` | Displays computed result with label, value, unit |
| `StatField.svelte` | Labeled input; shows "from export" badge when value comes from statsStore, "manual" badge otherwise |
| `EmptyState.svelte` | "Paste your stats to use this calculator" prompt with paste CTA |
| `HomeGrid.svelte` | Landing page card grid — one card per route, links via `navigate()` |

### Sidebar (`Sidebar.svelte`)

- Desktop (≥1024px): fixed-width left panel (220px), always visible
- Mobile (<1024px): hidden by default; hamburger button in header opens it as a slide-in overlay drawer (CSS `transform: translateX`, `transition: var(--transition-base)`)
- No bottom tab bar — drawer is the sole mobile nav pattern
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
```

### Typography
```css
--font-display:  'Orbitron', monospace;   /* headings, calculator titles */
--font-mono:     'JetBrains Mono', 'Fira Mono', monospace; /* stat values, result numbers */
--font-body:     'Inter', system-ui, sans-serif; /* labels, descriptions */
```

Load via Google Fonts: Orbitron (display), JetBrains Mono (mono). Inter via system fallback or Google Fonts.

### Shape & Spacing
```css
--radius-sm:   4px;
--radius-md:   6px;
--radius-lg:   10px;

/* 4pt base spacing system */
--space-1:  4px;
--space-2:  8px;
--space-3:  12px;
--space-4:  16px;
--space-6:  24px;
--space-8:  32px;
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
--shadow-glow:    0 0 12px rgba(212, 160, 23, 0.25);   /* gold glow on result cards */
--shadow-surface: 0 2px 8px rgba(0, 0, 0, 0.4);
--noise-overlay:  url("data:image/svg+xml,...");        /* subtle grain on --bg-base */
```

Background personality: `--bg-base` uses a very subtle noise texture overlay (SVG feTurbulence or CSS grain) to give the dark surface tactile depth — distinguishes it from a flat black tool.

### Z-index scale
```css
--z-base:    0;
--z-raised:  10;
--z-overlay: 20;    /* mobile sidebar drawer backdrop */
--z-drawer:  30;    /* mobile sidebar drawer */
--z-toast:   100;
```

### Breakpoints
```
sm:  640px
md:  768px
lg:  1024px   ← sidebar switch point (mobile drawer ↔ desktop panel)
xl:  1280px
```

Use `min-height: 100dvh` (not `100vh`) for full-viewport layouts — `dvh` handles mobile browser chrome correctly.

## Accessibility

Minimum requirements:

- All interactive elements have visible focus ring: `outline: 2px solid var(--focus-ring); outline-offset: 2px`
- `<nav>` wraps sidebar nav list with `aria-label="Calculators"`
- Active nav item has `aria-current="page"`
- Hamburger button has `aria-label="Open navigation"` / `aria-expanded`
- `StatInput` error uses `role="alert"` for screen reader announcement
- All Lucide icons used decoratively have `aria-hidden="true"`; functional icon buttons have `aria-label`
- Touch targets minimum 44×44px — nav items must have `min-height: 44px`
- `touch-action: manipulation` on all interactive elements (removes 300ms tap delay)
- Keyboard navigation: Tab through sidebar nav, Enter/Space activates, Escape closes mobile drawer

## Number Formatting (`format.ts`)

Shared module at `src/lib/format.ts`. IOM stat values use scientific notation (e.g. `1.016e+37`). All calculators use this module — never format independently.

```ts
export function formatStat(n: number): string   // "1.02e+37" → human-readable
export function formatGold(n: number): string   // with unit suffix (K/M/B/T)
export function formatPercent(n: number): string // e.g. "200.88%"
export function formatMultiplier(n: number): string // e.g. "200.88×"
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
2. Create `src/lib/calculators/NewCalc.svelte` — UI adapter
3. Add one entry to `routes.ts`
4. Push to `main`

No changes to `App.svelte`, `Sidebar.svelte`, `router.ts`, `stats.ts`, or any other shared module.

## Out of Scope

- User accounts / cloud sync
- Server-side computation
- Dark/light mode toggle (dark gaming only)
- Calculator-specific formula design (per-calculator specs)

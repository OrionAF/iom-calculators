# IOM Calculators — App Foundation Design

**Date:** 2026-06-02  
**Status:** Approved

## Overview

A static GitHub Pages web app for Idle Obelisk Miner (IOM) calculators. Players paste their in-game JSON stat export once; all calculators read from it reactively. Built with Svelte 5 + Vite + TypeScript, deployed via GitHub Actions.

## Decisions

| Decision | Choice | Reason |
|---|---|---|
| Framework | Svelte 5 + Vite + TypeScript | Compiles to minimal JS, best for calc-style apps, excellent DX |
| Routing | Hash-based (hand-rolled) | Zero config on GitHub Pages, no 404 redirect hack needed |
| Theme | Dark Gaming | Dark bg (`#0f0f1a`), gold/amber (`#d4a017`) accents, monospace feel |
| Nav | Sidebar (desktop) + bottom tab bar (mobile) | Persistent access, scales to many calculators |
| Stat input | Global panel in sidebar, persisted to `localStorage` | Paste once, all calcs share it across sessions |
| UI library | None | Hand-rolled components in theme |

## File Structure

```
src/
  lib/
    stores/
      stats.ts              # writable store: parsed JSON + localStorage persist
    components/
      Sidebar.svelte         # nav + stat import panel
      StatInput.svelte       # paste/upload JSON widget (validates, shows status)
    calculators/
      Fishing.svelte         # first calculator (placeholder)
  routes.ts                  # central route registry
  App.svelte                 # shell: sidebar + hash router outlet
  main.ts                    # entry point
  app.css                    # global CSS variables (theme tokens)
public/
docs/
.github/
  workflows/
    deploy.yml               # build + deploy to GitHub Pages
```

## Architecture

### App Shell (`App.svelte`)

Renders `<Sidebar>` always. Reads `window.location.hash` and renders the matching calculator component. Listens for `hashchange` events to update the active view reactively. Falls back to a home card grid when hash is empty or unrecognised.

### Routing (`routes.ts`)

Central registry — the only file touched when adding a new calculator:

```ts
export const routes = [
  { hash: 'fishing', label: 'Fishing', icon: '🎣', component: Fishing },
  // add new calculators here
]
```

### State (`stats.ts`)

```ts
// Hydrates from localStorage on import
// Persists on every write
export const statsStore = writable<StatsExport | null>(initialValue)
```

`StatsExport` type:
```ts
interface StatsExport {
  version: string
  stats: Record<string, number>
  time: number
}
```

Calculators read stats via `$statsStore.stats.some_stat_key`. Store is `null` when no export has been pasted.

### Stat Input (`StatInput.svelte`)

- Textarea for JSON paste
- On submit: JSON.parse → validate shape (has `stats` object) → write to store
- Invalid JSON: inline error, existing store unchanged
- Valid: green "Stats loaded (vX.X.X)" indicator in sidebar header

### Sidebar (`Sidebar.svelte`)

- Desktop: fixed-width left panel (220px), always visible
- Mobile: hidden by default, slides in from left on hamburger tap (CSS transform + transition, no JS library)
- Bottom tab bar visible on mobile for quick calculator switching (icons only)

### Calculator Components

Each calculator in `src/lib/calculators/` follows this pattern:

1. Read needed stats from `$statsStore`
2. Accept manual inputs for stats not in export (dropdowns, number fields)
3. Compute result reactively (Svelte `$derived` or `$:`)
4. Display result in a result card

Calculators show a "Paste your stats to use this calculator" prompt when `$statsStore` is `null`.

## UI / Theme Tokens

Defined as CSS custom properties in `app.css`:

```css
--bg-base:      #0f0f1a;
--bg-surface:   #1e1e2e;
--bg-raised:    #1a1a2e;
--bg-sidebar:   #13131f;
--border:       #2a2a3e;
--accent:       #d4a017;
--accent-text:  #0f0f1a;
--text-primary: #e0e0ff;
--text-muted:   #a0a0c0;
--text-dim:     #555555;
--success:      #4ade80;
--error:        #f87171;
```

## Deployment

GitHub Actions workflow on push to `main`:
1. `npm ci`
2. `npm run build` (Vite outputs to `dist/`)
3. Deploy `dist/` to `gh-pages` branch via `actions/deploy-pages`

`vite.config.ts` sets `base: '/iom-calculators/'` to match the GitHub Pages repo path.

## Expansion Pattern

Adding a new calculator requires exactly three steps:

1. Create `src/lib/calculators/NewCalc.svelte`
2. Import it and add one entry to `routes.ts`
3. Push to `main` — GitHub Actions deploys automatically

No changes to `App.svelte`, `Sidebar.svelte`, or any shared infrastructure.

## Out of Scope

- User accounts / cloud sync
- Server-side computation
- Calculator-specific design details (those are per-calculator specs)

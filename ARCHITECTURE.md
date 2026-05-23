# BlinkX Terminal — Architecture Guide
> Read this before writing any code. Paste this file into Claude Code at the start of every session.

---

## 1. What This Project Is

**BlinkX Terminal** is a professional dark-mode trading workstation for active traders. Built in React + Vite. This is **not** the BlinkX consumer app — it is a separate power-user product.

The workspace engine is **Dockview** — a zero-dependency, IDE-style panel manager purpose-built for trading terminals (same engine class as Dhan DexT3, Bloomberg web). It replaced an earlier react-grid-layout implementation that caused overflow bugs at non-standard zoom levels and OS scaling.

---

## 2. Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| Framework | React 18 + Vite | JavaScript only — no TypeScript |
| Workspace engine | Dockview (`dockview-react`) | Panels, tabs, splits, drag/drop, resize |
| State management | Zustand | UI + workspace state only |
| Styling | CSS Modules + `--blinkx-*` tokens | No Tailwind, no inline styles |
| Icons | Lucide React | Via `src/components/Icon` wrapper |
| Data | Mock hooks | `hooks/useWidgetName.js` per widget |

---

## 3. Architecture Layers

Six layers. Non-negotiable. Never skip a layer. Never collapse two layers into one.

```
LAYER 1 — Design Tokens
  Location : src/tokens/variables.css
  Owns     : every --blinkx-* CSS custom property
             colors, spacing, radius, shadow, typography, z-index
  Rule     : NEVER hardcode any visual value anywhere in the codebase.
             Every color, spacing, radius, shadow, font comes from here.

LAYER 2 — UI Components
  Location : src/components/
  Owns     : 12 shared base components
             CTAButton, Chip, Badge, Segment, Toggle, Input,
             Tabs, Dropdown, Loading, Toast, Tooltip, Icon
  Rule     : Always import from src/components/index.js
             Widgets never build their own buttons, inputs, tabs,
             dropdowns, badges, or icons.

LAYER 3 — Workspace Engine
  Location : src/workspace/
  Owns     : Dockview initialisation, panel lifecycle, widget routing,
             component registry, widget shell, widget catalog
  Rule     : Dockview owns panel placement, tabs, splits, drag/drop,
             resize, and layout persistence.
             Nothing outside this folder controls layout.

LAYER 4 — Zustand Stores
  Location : src/stores/
  Owns     : all shared application state
             workspaceStore — Dockview API, picker state, layout actions
             linkStore      — widget linking groups and symbol sync
             uiStore        — theme, toasts
  Rule     : These are the only source of shared state.
             Never share workspace-level state via prop drilling
             or React context.

LAYER 5 — Widget Content
  Location : src/widgets/
  Owns     : widget UI and data logic, one folder per widget
  Rule     : Widgets only know about their own content.
             They never control their own panel size or position.
             They never import from other widgets.
             They only import UI from src/components/index.js.
             Mock data lives in hooks/ — that is the only thing
             backend developers will replace.

LAYER 6 — App Shell
  Location : App.jsx
  Owns     : root layout, theme initialisation, HomePage routing
  Rule     : TopBar (56px) and TickerStrip (34px) are flex children
             with flex-shrink: 0 — NOT position: fixed.
             DockviewWorkspace fills all remaining viewport height
             via flex: 1 with min-height: 0.
             HomePage is a conditional sibling to DockviewWorkspace —
             shown when activeTerminalId === 'home'.
```

---

## 4. Folder Structure

```
src/
├── App.jsx                        ← App shell (flex column)
├── App.module.css                 ← Shell layout only
├── main.jsx                       ← Entry point, untouched
├── index.css                      ← Global resets only
│
├── tokens/
│   └── variables.css              ← ALL --blinkx-* tokens. Single source of truth.
│
├── components/                    ← 12 shared UI components
│   ├── CTAButton/
│   ├── Chip/
│   ├── Badge/
│   ├── Segment/
│   ├── Toggle/
│   ├── Input/
│   ├── Tabs/
│   ├── Dropdown/
│   ├── Loading/
│   ├── Toast/
│   ├── Tooltip/
│   ├── Icon/
│   └── index.js                   ← Import from here only
│
├── stores/
│   ├── workspaceStore.js          ← Dockview API, picker, layout actions
│   ├── linkStore.js               ← Widget linking groups (Phase 2)
│   └── uiStore.js                 ← Theme, toasts
│
├── workspace/
│   ├── DockviewWorkspace.jsx      ← Mounts DockviewReact
│   ├── DockviewWorkspace.module.css
│   ├── componentRegistry.js      ← { widget: WidgetShell } — only one entry
│   ├── WidgetShell.jsx            ← Resolves widgetType → component, computes density
│   ├── WidgetShell.module.css
│   └── widgetRegistry.js         ← widgetRegistry (map) + widgetCatalog (array)
│
├── terminal/
│   ├── TopBar/                    ← Keep UI, reads stores (no props)
│   ├── TickerStrip/               ← Untouched
│   ├── HomePage/                  ← Keep UI, reads workspaceStore
│   └── WidgetPicker/              ← Keep UI, reads stores + widgetCatalog
│
├── widgets/                       ← One folder per widget. Self-contained.
│   ├── _template/                 ← Copy this to start a new widget
│   ├── Watchlist/
│   ├── Chart/
│   ├── Positions/
│   └── ...
│
├── data/
│   └── ticker.js                  ← Ticker strip mock data
└── assets/                        ← Logos, images
```

---

## 5. Separation Rules

These are non-negotiable. Each rule prevents a specific class of bug.

| Rule | Why |
|---|---|
| Dockview owns layout. Widgets own content. Never mix. | Widgets that try to control their own size break the workspace engine. |
| Tokens own all visual values. Nothing skips to hardcoded values. | Hardcoded values break theming and make design system changes impossible. |
| Zustand owns shared state. Components own local UI state only. | Prop drilling through Dockview panels is impossible — stores are the only path. |
| Widgets never know about panels. Panels never know about widget internals. | Keeps widgets portable and independently testable. |
| `componentRegistry` is defined outside React components. Never inline. | Defining it inside a component causes every panel to remount on every render. |

---

## 6. Component Library

All 12 components live in `src/components/`. Always import from the index.

```js
import { CTAButton, Chip, Badge, Segment, Toggle, Input,
         Tabs, Dropdown, Loading, Toast, Tooltip, Icon } from '../../components';
```

| Component | Usage | Key Props |
|---|---|---|
| `CTAButton` | All buttons | `variant` (brand/buy/sell), `size` (sm/md/lg/xl/2xl), `type` (primary/secondary/ghost) |
| `Chip` | Filters, toggles | `size` (sm/md/lg), `active`, `count` |
| `Badge` | Exchange labels | `label` (NSE/BSE/NFO/BFO/MCX/EQ/FUT/OPT) |
| `Segment` | Buy/Sell, mode switcher | `options`, `value`, `onChange`, `size` |
| `Toggle` | Settings on/off | `checked`, `onChange`, `size`, `label` |
| `Input` | Text/number fields | `type`, `size`, `label`, `error`, `prefix`, `suffix` |
| `Tabs` | Internal navigation | `tabs`, `active`, `onChange`, `size` |
| `Dropdown` | Select menus | `options`, `value`, `onChange`, `size` |
| `Loading` | Loading states | `size` (sm/md/lg/xl), `style` (spinner/dots) |
| `Toast` | Notifications | `message`, `type` (positive/negative), `theme` |
| `Tooltip` | Hover hints | `content`, `placement` (top/bottom/left/right) |
| `Icon` | All icons (Lucide) | `name`, `size`, `color` |

---

## 7. Widget Props Contract

Every widget in `src/widgets/` receives exactly these props. No exceptions. No additions without updating this file.

```js
/*
  widgetId   string           Unique instance ID for this panel
  config     object           Widget configuration:
                                symbol     string   e.g. "NIFTY"
                                exchange   string   e.g. "NSE"
                                timeframe  string   e.g. "5m"
                                linkGroup  string   e.g. "red" | null
  density    string           Panel width breakpoint (see table below)
  panelApi   DockviewPanelApi Dockview panel API — accept it, use only when needed
*/

function MyWidget({ widgetId, config, density, panelApi }) { ... }
```

### Density breakpoints

Density is computed by `WidgetShell` from the panel's pixel width via `panelApi.onDidDimensionsChange`. Widgets never compute their own density.

| Density | Panel width | What changes |
|---|---|---|
| `'full'` | 480px and above | All columns visible, full toolbar, all controls |
| `'standard'` | 320–479px | Secondary columns hidden, minor actions hidden |
| `'compact'` | 200–319px | Headers collapse to icons, secondary controls become menus |
| `'mini'` | below 200px | Symbol + main value only, read-only, no controls |

---

## 8. Widget Folder Structure

Every widget follows this exactly:

```
src/widgets/WidgetName/
├── index.jsx              ← Default export. Receives contract props.
├── Widget.module.css      ← Layout only. Zero hardcoded values.
├── mock.js                ← Mock data matching future API shape.
├── README.md              ← What it shows, config shape, data contract.
└── hooks/
    └── useWidgetName.js   ← Data layer. Only file backend replaces.
```

Private sub-components (if needed) live in a `components/` subfolder inside the widget folder. They are never imported by other widgets.

---

## 9. Zustand Stores

Three stores. Each has a single clear ownership. Never put server/async data in Zustand — that goes in widget hooks.

### `workspaceStore` — `src/stores/workspaceStore.js`

```
Owns:
  dockviewApi          — the live Dockview API instance (set on onReady)
  activeTerminalId     — which terminal preset is active
  pickerOpen           — is the widget picker modal open
  pickerTargetPanelId  — which panel receives the picked widget (null = new panel)

Actions:
  onReady(event)              — stores event.api, called by DockviewWorkspace
  onLayoutChange()            — serialises and saves layout to localStorage
  openPicker(panelId?)        — opens picker, optionally targeting a panel
  closePicker()               — closes picker, clears target
  addWidget(type, config?)    — calls dockviewApi.addPanel() with correct params
  loadPreset(id, layout)      — calls dockviewApi.fromJSON() with preset layout
  restoreLayout(terminalId)   — loads saved layout from localStorage
```

### `uiStore` — `src/stores/uiStore.js`

```
Owns:
  theme    — 'dark' | 'light'
  toasts   — array of { id, message, type }

Actions:
  setTheme(theme)            — sets data-theme on html element, saves to localStorage
  addToast(message, type)    — adds toast, auto-dismisses after 4300ms
  removeToast(id)            — removes by id
```

### `linkStore` — `src/stores/linkStore.js`

Phase 2 — not yet consumed by any widget. Store is wired and ready.

```
Owns:
  groups   — { red, blue, green, yellow } each with { symbol, timeframe }

Actions:
  setSymbol(groupId, symbol)
  setTimeframe(groupId, timeframe)
  getGroup(groupId)
```

---

## 10. Dockview Workspace

### What Dockview owns

- Panel placement, sizing, and splitting
- Tab groups and tab reordering
- Drag-and-drop between panels
- Sash (splitter) resize between panels
- Panel header chrome (tab bar, close button)
- Layout serialisation (`api.toJSON()`) and restoration (`api.fromJSON()`)

### What Dockview does NOT own

- Widget content — that is entirely the widget's responsibility
- Data fetching — that is widget hooks
- Application state — that is Zustand
- Visual tokens — those come from `--blinkx-*` variables via `DockviewWorkspace.module.css`

### How widget routing works

Dockview only ever knows about **one component**: `WidgetShell`. It never knows about individual widgets. Widget routing happens inside `WidgetShell`:

```
Dockview mounts WidgetShell
  → WidgetShell reads params.widgetType
  → looks up widgetRegistry[widgetType]
  → renders the widget component with standard props
```

This means adding a new widget never requires changing `componentRegistry.js` or `DockviewWorkspace.jsx`.

### How to theme Dockview

Map Dockview's `--dv-*` CSS variables to `--blinkx-*` tokens inside `.workspace {}` in `DockviewWorkspace.module.css`. Never override Dockview internals directly.

```css
.workspace {
  --dv-background-color: var(--blinkx-color-surface-page);
  --dv-tabs-and-actions-container-background-color: var(--blinkx-color-surface-elevated);
  --dv-activegroup-visiblepanel-tab-background-color: var(--blinkx-color-surface-card);
  --dv-tab-divider-color: var(--blinkx-color-border-subtle);
  --dv-separator-border: var(--blinkx-color-border-subtle);
  /* ... etc */
}
```

### Layout persistence

Auto-saved to localStorage on every layout change via `onDidLayoutChange`.

- Key format: `blinkx-layout-{terminalId}`
- Serialised via `dockviewApi.toJSON()` — Dockview's own format
- Restored via `dockviewApi.fromJSON()` — called by `restoreLayout()` or `loadPreset()`

---

## 11. Design System and Token Rules

Every design decision flows through this chain. Never skip a level.

```
BlinkX Design System (Figma)
        ↓
src/tokens/variables.css   ←  --blinkx-* CSS custom properties
        ↓
src/components/*.module.css ← Component variants use tokens
        ↓
src/widgets/*/Widget.module.css ← Layout only, uses tokens
        ↓
Widget JSX ← Imports components, zero inline styles
```

### Key tokens

```css
/* Text */
--blinkx-color-text-primary       /* Main text */
--blinkx-color-text-secondary     /* Muted text */
--blinkx-color-text-tertiary      /* Placeholder */
--blinkx-color-text-brand         /* Blue brand */
--blinkx-color-text-green         /* Buy / positive */
--blinkx-color-text-red           /* Sell / negative */

/* Surfaces */
--blinkx-color-surface-page       /* Page background */
--blinkx-color-surface-card       /* Widget background */
--blinkx-color-surface-elevated   /* TopBar / panel headers */
--blinkx-color-surface-overlay    /* Hover states */

/* Borders */
--blinkx-color-border-subtle      /* Dividers */
--blinkx-color-stroke-default     /* Component borders */
--blinkx-color-stroke-brand       /* Active / focused */

/* Spacing */
--blinkx-spacing-sm   /* 4px  */
--blinkx-spacing-lg   /* 8px  */
--blinkx-spacing-xl   /* 12px */
--blinkx-spacing-2xl  /* 16px */
--blinkx-spacing-3xl  /* 20px */
--blinkx-spacing-4xl  /* 24px */

/* Typography */
--blinkx-text-h5       /* 16px */
--blinkx-text-h6       /* 14px */
--blinkx-text-body     /* 12px — default */
--blinkx-text-label    /* 11px */
--blinkx-text-label-sm /* 10px */

/* Radius */
--blinkx-radius-xs    /* 4px  — chips, tags */
--blinkx-radius-md    /* 8px  — buttons, inputs */
--blinkx-radius-lg    /* 10px — cards */
--blinkx-radius-2xl   /* 16px — modals */
--blinkx-radius-full  /* 9999px — pills */
```

---

## 12. Critical CSS Rules

Each rule exists to prevent a specific class of bug.

```css
/* 1. App root — must be exactly this */
.appRoot {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background: var(--blinkx-color-surface-page);
  font-family: var(--blinkx-font-ui);
}

/* 2. Workspace shell — min-height: 0 is THE overflow fix */
/*    Without min-height: 0, flex children ignore the parent height
      constraint and overflow the viewport. This is the CSS rule
      that makes the layout zoom-proof. Never remove it.          */
.workspaceShell {
  flex: 1;
  min-height: 0;      /* NON-NEGOTIABLE */
  position: relative;
  overflow: hidden;
}

/* 3. Every widget shell */
.shell {
  width: 100%;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* 4. Never use height: 100vh inside any widget or panel */
/* 5. Never use position: fixed inside any widget */
/* 6. Never hardcode pixel values for colors, spacing, or typography */
/* 7. TopBar and TickerStrip must NOT be position: fixed — they are flex children
      with flex-shrink: 0. Fixed positioning removes them from flow and breaks
      the flex height calculation, causing the same overflow bug we started with. */
/* 8. Every flex container that holds variable-height content needs min-height: 0 */
```

### Why `min-height: 0` solves overflow

CSS flexbox spec: by default, flex children have `min-height: auto`, which means "be at least as tall as my content". This overrides the `flex: 1` space distribution. The child grows to fit its content instead of being constrained by the parent. Setting `min-height: 0` tells the child "you may shrink below your content height" — the flex container then correctly constrains it to the available space. Without it, at zoom < 100% the workspace shell grows to its content height instead of filling the remaining viewport.

---

## 13. How to Add a New Widget

### Step 1 — Build the widget

Copy `src/widgets/_template/` to `src/widgets/MyWidget/`. Implement `index.jsx` using the standard props contract. Put mock data in `mock.js`. Data fetching goes in `hooks/useMyWidget.js`.

### Step 2 — Register it

In `src/workspace/widgetRegistry.js`:

```js
// 1. Import the component (at top of file)
import { MyWidget } from '../widgets/MyWidget';

// 2. Add to widgetRegistry (the routing map)
export const widgetRegistry = {
  myWidget: MyWidget,
  // ... other widgets
};

// 3. Set ready: true in widgetCatalog (makes it clickable in WidgetPicker)
{ id: 'myWidget', label: 'My Widget', ..., ready: true },
```

### Step 3 — Test

```
npm run dev
Click "+ Widgets" in TopBar
Find your widget — no "Soon" badge
Click it — a new panel appears with your widget
Resize the panel — density should switch at 480 / 320 / 200px
```

Nothing else needs to change. No changes to `componentRegistry.js`, `DockviewWorkspace.jsx`, `WidgetShell.jsx`, or `App.jsx`.

---

## 14. Anti-Patterns — Never Do These

```
✗ Never use react-grid-layout — it has been removed
✗ Never create a custom panel chrome component
   (Dockview owns panel headers and tab bars)
✗ Never register multiple components in componentRegistry
   (only WidgetShell — widget routing is internal to WidgetShell)
✗ Never define componentRegistry inside a React component
   (causes every panel to remount on every render)
✗ Never use height: 100vh inside panels or widgets
✗ Never hardcode any color, spacing, radius, or font value
✗ Never import from one widget inside another widget
✗ Never put server / async state in Zustand
   (Zustand is for UI and workspace state only — data goes in hooks)
✗ Never add TypeScript — codebase stays in JavaScript
✗ Never add Tailwind — styling uses CSS Modules + tokens only
✗ Never use window.innerHeight for any layout calculation
✗ Never use position: fixed inside any widget or panel
✗ Never build preset layouts before the backbone checklist passes
✗ Never build new widgets before the backbone checklist passes
```

---

## 15. Data Architecture

### Current (mock)

Every widget fetches data from its own `hooks/useWidgetName.js`. Currently these hooks return static mock data from `mock.js`. The mock data shape **must match the real API contract** so backend developers can replace the hook without touching any UI code.

```
Widget component
    ↓ calls
hooks/useWidgetName.js     ← only file backend replaces
    ↓ currently returns
mock.js                    ← static data, API shape
    ↓ will return
Real WebSocket / REST feed
```

### Rules for mock data

- Match the exact field names and types the API will return
- Never massage or transform API data inside the component — do it in the hook
- Never share mock data between widgets — each widget has its own `mock.js`

### Phase transition

When the backend is ready, a backend developer replaces only `hooks/useWidgetName.js`. The component, CSS, and mock file are untouched.

---

## 16. Widget Linking (Phase 2)

Widget linking allows multiple panels to synchronise their symbol/timeframe. For example: dragging a symbol into a Chart panel also updates the linked Watchlist.

**Status**: `linkStore` is wired and ready in `src/stores/linkStore.js`. Not yet consumed by any widget.

**How it works**: Widgets opt into a link group by reading `config.linkGroup` (e.g. `'red'`). When a symbol changes, the widget calls `useLinkStore.getState().setSymbol(linkGroup, symbol)`. All other widgets in the same link group read `useLinkStore(s => s.groups[config.linkGroup].symbol)` reactively.

**Colours follow Bloomberg/Refinitiv convention**: red, blue, green, yellow.

**Activation**: Enable per widget when backend feeds are ready. No changes to the store are needed.

---

## Theme System

```js
// Dark mode (default)
document.documentElement.setAttribute('data-theme', 'dark');

// Light mode
document.documentElement.setAttribute('data-theme', 'light');

// Controlled by uiStore.setTheme() — never set directly
// Saved to localStorage as 'blinkx-theme'
```

All token values switch automatically via CSS `[data-theme="dark"]` selectors in `variables.css`. No component or widget changes are needed when switching themes.

---

## 17. Trading Primitives (`src/primitives/`)

Small, single-responsibility components for rendering market data. Every table cell in every widget uses one of these — do not inline formatting logic in widgets.

```
src/primitives/
  index.js              ← barrel export — always import from here
  primitives.module.css ← shared CSS module for all primitives
  PriceCell.jsx         ← formatted price (en-IN locale)
  ChangeCell.jsx        ← price change with red/green color
  PercentCell.jsx       ← percent change with red/green color
  VolumeCell.jsx        ← compact volume (K/L/Cr)
  OICell.jsx            ← compact open interest
  BidAskSpread.jsx      ← bid / ask pair
  SparkBar.jsx          ← mini horizontal bar (volume profile, depth)
  TickerBadge.jsx       ← colored symbol badge
  PnLDisplay.jsx        ← P&L value + optional percent
  SignalDot.jsx         ← colored dot indicator (positive/negative/neutral/warning)
  SortHeader.jsx        ← table column header with sort arrows
  VirtualTable.jsx      ← virtualized table (TanStack Virtual v3)
  utils/
    formatNumber.js     ← formatNumber, formatPrice, formatPercent, formatChange
```

**Import rule**: always `import { PriceCell, ChangeCell } from '../../primitives'` — never from a specific file.

**Color semantics**: `positive` = green (var(--blinkx-color-text-positive)), `negative` = red (var(--blinkx-color-text-negative)), `neutral` = secondary text.

**Number formatting**: en-IN locale. Compact: 1K = 1,000 | 1L = 1,00,000 | 1Cr = 1,00,00,000.

---

## 18. TradingView Providers (`src/providers/`)

Shared infrastructure for embedding TradingView widgets. Not widget-specific — consumed by any widget that needs a TradingView chart.

```
src/providers/
  useTradingViewScript.js  ← singleton script loader (loads tv.js once)
  tvThemeMap.js            ← theme → hardcoded hex color map
```

**Critical constraint**: TradingView widget does not accept CSS variables. All colors in `tvThemeMap.js` must be hardcoded hex values matching the dark/light tokens from `variables.css`. When updating theme colors, update both files.

**Script loading**: `useTradingViewScript` returns `{ ready: boolean }`. The script is loaded once per session — a module-level promise prevents duplicate `<script>` tags even if multiple Chart widgets mount simultaneously.

**Container ID**: each Chart instance gets a stable unique DOM ID via a module-level counter (`tv-chart-1`, `tv-chart-2`, …). This allows multiple Chart widgets to coexist without ID collisions.

---

## 19. `allowMultiple` Widget Flag

Some widgets are designed to run as multiple simultaneous instances (e.g. Chart for different symbols, Price Ladder for different strikes). Others must be singletons (e.g. Positions, Watchlist).

The `allowMultiple` boolean field on each `widgetCatalog` entry controls this:

```js
// widgetRegistry.js
{ id: 'chart', label: 'Chart', allowMultiple: true, ... }   // multiple allowed
{ id: 'watchlist', label: 'Watchlist', ... }                  // singleton (default)
```

`allowMultiple: true` entries: `chart`, `price-ladder`, `time-and-sales`.

In `addWidget()`: if `allowMultiple` is falsy, check for an existing panel with the same `widgetType`. If found, focus it and show a toast instead of adding a duplicate.

---

## 20. WidgetStates Template (`src/widgets/_template/WidgetStates.jsx`)

Standard empty/loading/error states for all widgets. Use these instead of inline fallback UI.

```jsx
import { WidgetLoading, WidgetError, WidgetEmpty } from '../_template/WidgetStates.jsx';

// In your widget:
if (isLoading) return <WidgetLoading />;
if (error)     return <WidgetError message={error.message} />;
if (!data?.length) return <WidgetEmpty message="No positions open." />;
```

All three components fill 100% of their container (flex center). Styling lives in `WidgetStates.module.css`.

---

## 21. VirtualTable Usage

For any widget with a scrollable list of rows (Watchlist, Option Chain, Time & Sales, etc.), use `VirtualTable` from primitives. It wraps TanStack Table v8 + TanStack Virtual v3.

```jsx
import { VirtualTable, SortHeader } from '../../primitives';
import { useReactTable, getCoreRowModel, getSortedRowModel } from '@tanstack/react-table';

const columns = [
  {
    accessorKey: 'symbol',
    size: 100,
    header: (ctx) => <SortHeader label="Symbol" direction={ctx.column.getIsSorted()} onClick={ctx.column.getToggleSortingHandler()} />,
    cell: (ctx) => <TickerBadge symbol={ctx.getValue()} />,
  },
  // ...
];

const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
});

return <VirtualTable table={table} rowHeight={28} />;
```

**Version constraint**: use `useVirtualizer` from `@tanstack/react-virtual` v3. Never use the old `useVirtual` hook — it was removed in v3.

---

## 22. Dependency Versions (locked)

| Package | Version | Notes |
|---------|---------|-------|
| `@tanstack/react-table` | ^8.x | TanStack Table v8 |
| `@tanstack/react-virtual` | ^3.x | use `useVirtualizer`, not `useVirtual` |
| `dockview` | ^6.5.0 | workspace engine |
| `zustand` | ^5.x | state management |

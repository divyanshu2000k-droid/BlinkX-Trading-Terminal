# BlinkX Terminal — Architecture Guide
> Read this before writing any code. Paste this file into Claude Code at the start of every session.

---

## Project Structure

```
src/
├── tokens/
│   └── variables.css          ← All design tokens. Single source of truth.
├── components/                ← Shared UI components. Used across widgets.
│   ├── CTAButton/
│   ├── Chip/
│   ├── Badge/
│   ├── Segment/
│   ├── Toggle/
│   ├── Loading/
│   ├── Toast/
│   ├── Icon/
│   ├── Input/
│   ├── Tabs/
│   ├── Dropdown/
│   ├── Tooltip/
│   └── index.js               ← Import from here only
├── widgets/                   ← One folder per widget. Self-contained.
│   ├── _template/             ← Copy this to start a new widget
│   ├── Watchlist/
│   ├── Chart/
│   └── ...
├── terminal/                  ← Shell only. Do not add widgets here.
│   ├── TopBar/
│   ├── TickerStrip/
│   ├── HomePage/
│   ├── WidgetPicker/
│   ├── Panel/
│   ├── TerminalLayout/
│   ├── WidgetRegistry.js
│   ├── widgetConstraints.js
│   ├── terminalLayouts.js
│   └── useBreakpoint.js
├── data/                      ← Global mock data (ticker strip etc.)
└── assets/                    ← Logos, images
```

---

## The Token Chain

Every design decision flows through this chain. Never skip a level.

```
BlinkX Design System (Figma)
        ↓
src/tokens/variables.css   ← --blinkx-* CSS custom properties
        ↓
src/components/*.module.css ← Component variants use tokens
        ↓
src/widgets/*/Widget.module.css ← Layout only, uses tokens
        ↓
Widget JSX ← Imports components, zero inline styles
```

---

## Rules — Strictly Enforced

### Always do this

```jsx
// Import components from the shared library
import { CTAButton, Chip, Badge, Segment } from '../../components';

// Use components with variants
<CTAButton variant="buy" size="md">Buy</CTAButton>
<CTAButton variant="sell" size="md">Sell</CTAButton>
<Chip active={true} size="sm">Equity</Chip>
<Badge label="NSE" />

// Use tokens in CSS
.myElement {
  background: var(--blinkx-color-surface-card);
  color: var(--blinkx-color-text-primary);
  padding: var(--blinkx-spacing-xl);
  border-radius: var(--blinkx-radius-md);
  font-size: var(--blinkx-text-body);
}
```

### Never do this

```jsx
// Never hardcode colors
<button style={{ background: '#171EFD' }}>Bad</button>

// Never hardcode spacing
<div style={{ padding: '16px' }}>Bad</div>

// Never import from another widget
import Something from '../OtherWidget'; // FORBIDDEN

// Never write a custom button when CTAButton exists
<button className={styles.myCustomButton}>Bad</button>

// Never use window.innerHeight for layout calculations
const height = window.innerHeight; // WRONG — use getBoundingClientRect()
```

---

## Widget Structure

Every widget must follow this exact structure:

```
WidgetName/
├── index.jsx          ← Entry point. Props: config, onConfig, widgetId, density
├── Widget.module.css  ← Styles. Tokens only.
├── mock.js            ← Static data. Replace with API later.
├── README.md          ← What it shows, API contract
├── components/        ← Private sub-components (optional)
│   └── WidgetRow.jsx
└── hooks/             ← Private hooks (optional)
    └── useWidgetData.js
```

---

## Available Components

| Component | Usage | Key Props |
|-----------|-------|-----------|
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

## Registering a Widget

After building a widget, register it in two places:

### Step 1 — WidgetRegistry.js
```js
{ id: 'watchlist', label: 'Watchlist', sub: 'Multi-segment', group: 'DISCOVERY', icon: 'watchlist', ready: true },
```

### Step 2 — TerminalLayout.jsx — WidgetRenderer function
```jsx
import WatchlistWidget from '../../widgets/Watchlist';

function WidgetRenderer({ widgetId, density, panelId }) {
  switch (widgetId) {
    case 'watchlist': return <WatchlistWidget density={density} />;
    default: return <WidgetPlaceholder widgetId={widgetId} density={density} />;
  }
}
```

### Step 3 — Test
1. `npm run dev`
2. Click `+ Widgets`
3. Find your widget — no "Soon" badge
4. Click it — appears in layout

---

## Available Tokens (Key Ones)

### Colors
```css
/* Text */
--blinkx-color-text-primary       /* Main text */
--blinkx-color-text-secondary     /* Muted text */
--blinkx-color-text-tertiary      /* Placeholder */
--blinkx-color-text-brand         /* Blue brand */
--blinkx-color-text-green         /* Buy/positive */
--blinkx-color-text-red           /* Sell/negative */
--blinkx-color-text-disabled      /* Disabled */

/* Backgrounds */
--blinkx-color-surface-page       /* Page background */
--blinkx-color-surface-card       /* Card/widget background */
--blinkx-color-surface-elevated   /* Header/elevated areas */
--blinkx-color-surface-overlay    /* Hover states */

/* Borders */
--blinkx-color-stroke-subtle      /* Dividers */
--blinkx-color-stroke-default     /* Component borders */
--blinkx-color-stroke-brand       /* Active/focused borders */
```

### Spacing
```css
--blinkx-spacing-sm   /* 4px  */
--blinkx-spacing-lg   /* 8px  */
--blinkx-spacing-xl   /* 12px */
--blinkx-spacing-2xl  /* 16px */
--blinkx-spacing-3xl  /* 20px */
--blinkx-spacing-4xl  /* 24px */
```

### Typography
```css
--blinkx-text-h5       /* 16px */
--blinkx-text-h6       /* 14px */
--blinkx-text-body     /* 12px — default */
--blinkx-text-label    /* 11px */
--blinkx-text-label-sm /* 10px */
```

### Radius
```css
--blinkx-radius-xs    /* 4px  — chips, tags */
--blinkx-radius-md    /* 8px  — buttons, inputs */
--blinkx-radius-lg    /* 10px — cards */
--blinkx-radius-2xl   /* 16px — modals */
--blinkx-radius-full  /* 9999px — pills */
```

---

## Grid System

### Architecture — two separate concerns

The grid has two completely separate responsibilities:

1. **Screen filling** — pure CSS. The container fills the viewport. Browser handles scaling at any zoom level, any OS scale, any screen size.
2. **Drag and resize** — react-grid-layout handles user interactions only.

Never mix these. Never use JavaScript to calculate pixel sizes for screen filling.

### Breakpoints

| Breakpoint | Width | Columns | Rows |
|-----------|-------|---------|------|
| Mobile | <768px | Unsupported | — |
| Tablet | 768–1199px | 6 | 8 |
| Desktop | 1200px+ | 12 | 10 |

### Grid constants
- Gap: 8px horizontal and vertical
- Container padding: 8px all sides
- Row height: calculated dynamically from container height (see DOM Measurement Pattern)

### react-grid-layout configuration
- `autoSize={false}` — **Required**. Prevents RGL from overriding the container height with its own computed pixel value. CSS handles the height constraint via `height: 100%` on the root container.
- `compactType={null}` — No auto-compaction. Items stay where placed.
- `preventCollision={true}` — Items cannot overlap.
- `isBounded={true}` — Items cannot be dragged outside the grid bounds.
- `maxRows={ROWS}` — Hard cap on vertical grid space.

### CSS layer — App.jsx main element
```jsx
// This is the only correct way to define the grid container
<main style={{
  position: 'fixed',
  top: 'calc(var(--blinkx-header-height) + var(--blinkx-ticker-height))',
  left: 0,
  right: 0,
  bottom: 0,
  overflow: 'hidden',
  // NO explicit height — browser fills it
}}>
```

### CSS layer — TerminalLayout root div
```jsx
// Fill the container exactly — no pixel calculations
<div
  ref={containerRef}
  style={{ width: '100%', height: '100%', overflow: 'hidden' }}
>
```

### rowHeight calculation
```js
// CORRECT — measures the actual DOM element after paint
rowHeight = Math.floor(
  (containerHeight - PADDING[1] * 2 - MARGIN[1] * (ROWS - 1)) / ROWS
)

// WRONG — never use these
window.innerHeight          // affected by zoom, OS scale
window.screen.height        // physical pixels, wrong unit
document.documentElement.clientHeight  // can be wrong before layout
```

### Panel state shape
Each panel in the grid:
```js
{
  id: string,           // unique panel ID
  tabs: [{              // up to 5 tabs
    id: string,
    widgetId: string,
    label: string,
  }],
  activeTabId: string,  // currently visible tab
}
```

### Layout persistence
Auto-saves to localStorage per terminal per breakpoint:
- Key format: `blinkx-layout-{terminalId}-{breakpointName}`
- Example: `blinkx-layout-volatility-desktop`
- Schema version: `LAYOUT_SCHEMA_VERSION` — incremented on breaking layout changes, triggers automatic discard of stale saved layouts

### Layout validation
All layouts loaded from localStorage are validated against the current grid bounds:
- Item positions are clamped to `[0, COLS-w]` horizontally and `[0, ROWS-h]` vertically
- A `schemaVersion` field prevents loading stale layouts from before architectural fixes
- Breakpoint-specific keys ensure desktop layouts aren't loaded at tablet breakpoints

---

## DOM Measurement Pattern

**This is the required pattern for any component that measures its own dimensions.**

### The problem with window.innerHeight
`window.innerHeight` is affected by browser zoom level and OS display scaling. At 150% OS scale on a 1920×1080 screen, `window.innerHeight` returns 1280 — not 1080. This causes the grid to calculate wrong row heights.

### The correct pattern
```jsx
import { useLayoutEffect, useCallback, useRef } from 'react';

// 1. Store dynamic values in refs for use inside closures
const rowsRef = useRef(ROWS);
useEffect(() => { rowsRef.current = ROWS; }, [ROWS]);

// 2. Calculate from actual DOM element — not window
const calculateRowHeight = useCallback((containerHeight) => {
  const rows = rowsRef.current;
  if (containerHeight <= 0 || rows <= 0) return;
  const availH = containerHeight
    - PADDING[1] * 2
    - MARGIN[1] * (rows - 1);
  setRowHeight(Math.max(40, Math.floor(availH / rows)));
}, []);

// 3. useLayoutEffect for initial measurement
// Fires after DOM mount, before paint — dimensions are accurate
useLayoutEffect(() => {
  if (!containerRef.current) return;
  const rect = containerRef.current.getBoundingClientRect();
  calculateRowHeight(rect.height);
  setContainerWidth(rect.width);
}, [ROWS, calculateRowHeight]);

// 4. ResizeObserver for subsequent changes
useEffect(() => {
  if (!containerRef.current) return;
  const ro = new ResizeObserver(entries => {
    for (const entry of entries) {
      setContainerWidth(entry.contentRect.width);
      calculateRowHeight(entry.contentRect.height);
    }
  });
  ro.observe(containerRef.current);
  return () => ro.disconnect();
}, [calculateRowHeight]);

// 5. Never render dependent children until measurement ready
{rowHeight > 0 && (
  <ReactGridLayout rowHeight={rowHeight} ... />
)}
```

### Why useLayoutEffect not useEffect
- `useEffect` fires asynchronously after paint — element may not have final dimensions yet
- `useLayoutEffect` fires synchronously after DOM mutations before paint — dimensions are always accurate
- Use `useLayoutEffect` for all DOM measurement. Use `useEffect` for everything else.

---

## How to Build a Widget (for Claude Code)

Start every Claude Code session by pasting this file, then:

```
Build the [Widget Name] widget for the BlinkX Terminal.

Reference: [paste HTML file or describe what should be on screen]

Rules:
- Follow ARCHITECTURE.md exactly
- Import UI from src/components/index.js only
- Use --blinkx-* tokens only in CSS, never hardcode values
- Mock data in mock.js — shape must match what the API returns
- Widget props: config (object), onConfig (function), widgetId (string), density (string: full/standard/compact/mini)
- Handle all 4 density modes
- WebSocket connection goes in hooks/useWidgetName.js
```

---

## Theme System

```js
// Dark mode (default)
document.documentElement.setAttribute('data-theme', 'dark');

// Light mode
document.documentElement.setAttribute('data-theme', 'light');

// Saved to localStorage as 'blinkx-theme'
```

All token values switch automatically. No component changes needed.

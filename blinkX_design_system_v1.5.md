# 🗂️ BlinkX Design System — V1.5

> **Figma Source:** [blinkX Design System (V1.5)](https://www.figma.com/design/MaKWzQDPX8GuP1pN7WxgMs/)
> **Last Updated:** May 2026
> **Maintained by:** BlinkX Design Team

---

## Table of Contents

1. [Pre-Requisites & Standards](#1-pre-requisites--standards)
2. [Foundation](#2-foundation)
   - 2.1 [Colors](#21-colors)
   - 2.2 [Typography](#22-typography)
   - 2.3 [Spacing](#23-spacing)
   - 2.4 [Border Radius](#24-border-radius)
   - 2.5 [Shadows & Elevation](#25-shadows--elevation)
   - 2.6 [Frame Sizes](#26-frame-sizes)
   - 2.7 [Icons](#27-icons)
3. [Components](#3-components)
   - 3.1 [Segment](#31-segment)
   - 3.2 [Tabs](#32-tabs)
   - 3.3 [Checkbox](#33-checkbox)
   - 3.4 [Radio Button](#34-radio-button)
   - 3.5 [Toggle](#35-toggle)
   - 3.6 [Tooltip](#36-tooltip)
   - 3.7 [CTA Buttons](#37-cta-buttons)
   - 3.8 [Chips](#38-chips)
   - 3.9 [Tags](#39-tags)
   - 3.10 [Badges](#310-badges)
   - 3.11 [Dropdown](#311-dropdown)
   - 3.12 [Input Fields](#312-input-fields)
   - 3.13 [Quick Action Bar](#313-quick-action-bar)
   - 3.14 [Toast Message](#314-toast-message)
   - 3.15 [Table](#315-table)
   - 3.16 [Loading Indicators](#316-loading-indicators)
   - 3.17 [Modals](#317-modals-wip)
4. [Application Components](#4-application-components)
5. [Motion & Animation](#5-motion--animation)
6. [CSS Token Naming Convention](#6-css-token-naming-convention)
7. [Z-Index Scale](#7-z-index-scale)
8. [Grid & Layout System](#8-grid--layout-system)
9. [Transition & Duration Tokens](#9-transition--duration-tokens)
10. [Stroke & Border Tokens](#10-stroke--border-tokens)

---

## 1. Pre-Requisites & Standards

| # | Category | Standard | Notes |
|---|----------|----------|-------|
| 1 | Image format | `.webp` | 25–30% smaller than JPEG |
| 2 | Image size | < 60 KB | — |
| 3 | Icon format | `.svg` | Scales without blur; CSS-stylable |
| 4 | Vector illustration / Complex gradients | `.svg` | Infinite scalability |
| 5 | Spacing / Typography units | `rem` | Scales with accessibility settings and responsive layouts |
| 6 | Borders | `px` | Browser rounds fractional values; borders need pixel precision |
| 7 | Complex animations | `.lottie` JSON | 10–50 KB optimised; 50% smaller than GIF |
| 8 | Animated illustrations | Lottie JSON | 15–50 KB; infinite scalability |
| 9 | Simple transitions | CSS | Native performance; preferred |
| 10 | Icon animations | `.svg` | 5–15 KB; best for loading spinners, success checkmarks, state indicators |
| 11 | States checklist | — | Default / Hover / Active / Focus / Disabled / Error / Loading |
| 12 | Accessibility | WCAG | Must meet WCAG accessibility requirements |

---

## 2. Foundation

### 2.1 Colors

Color system has two collections: **`_primitives`** (293 raw values) and **`semantics`** (56 tokens mapped to light/dark modes).

#### Primitive Palette

| Palette | Usage |
|---------|-------|
| Brand | Primary UI color — blue scale |
| Red | Sell actions, errors, negative P&L |
| Green | Buy actions, positive P&L |
| Yellow | Warnings, caution states |
| Neutral | Text, backgrounds, borders |
| Purple | Accent |
| Plum | Accent |
| Rose | Accent |
| Orange | Accent |
| Misc | Additional utility colors |
| JM / Brand | JM Financial brand alignment |
| JM / Buy | JM buy palette |
| JM / Sell | JM sell palette |

#### Semantic Tokens — Background

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `bg-brand-default` | brand-500 | brand-500 | Primary brand background |
| `bg-brand-subtle-1` | brand-50 | brand-100 | Subtle brand tint 1 |
| `bg-brand-subtle-2` | brand-100 | brand-200 | Subtle brand tint 2 |
| `bg-brand-disable` | neutral-100 | neutral-100 | Disabled brand bg |
| `bg-brand-hover-prime` | brand-600 | brand-400 | Primary CTA hover |
| `bg-brand-hover-on-sec` | brand-50 | brand-50 | Secondary CTA hover |
| `bg-brand-hover-on-tab` | brand-25 | brand-50 | Tab hover |
| `bg-brand-focus-ring` | brand-100 | brand-200 | Focus ring |
| `bg-buy-default` | green-500 | green-500 | Buy action default |
| `bg-buy-hover-on-prime` | green-600 | green-300 | Buy primary hover |
| `bg-buy-hover-sec-cta` | green-50 | green-50 | Buy secondary hover |
| `bg-buy-focus-ring` | green-100 | green-200 | Buy focus ring |
| `bg-sell-default` | red-500 | red-500 | Sell action default |

#### Semantic Tokens — Text

| Token | Light (`#`) | Dark (`#`) | Usage |
|-------|------------|-----------|-------|
| `text-primary` | 41414E | CACACE | Primary text |
| `text-secondary` | 666666 | B2B2B3 | Secondary text |
| `text-tertiary` | 989898 | 84848F | Tertiary / placeholder |
| `text-brand` | 171EFD | 4E54FD | Brand-colored text |
| `text-green` | 2BB02B | 48A848 | Buy / positive |
| `text-red` | DD2006 | CD4937 | Sell / negative |
| `text_on-disabled-cta` | 9D9D9D | 808081 | Text on disabled CTA |
| `text-white_on-cta` | FFFFFF | FFFFFF | White text on CTA |
| `text_on-segment-button` | 171EFD | 8F93FE | Segment button label |

#### Semantic Tokens — Icons

| Token | Light (`#`) | Dark (`#`) | Usage |
|-------|------------|-----------|-------|
| `icon-primary` | 414143 | 999999 | Primary icon |
| `icon-secondary` | 69696D | 6B6B6B | Secondary icon |
| `icon-disabled` | CECECE | 4D4F52 | Disabled icon |
| `icon-brand` | 171EFD | 4E54FD | Brand icon |
| `icon-fill-white` | FFFFFF | FFFFFF | White-fill icon |
| `icon-fill_on-disabled-cta` | 9D9D9D | 808081 | Icon on disabled CTA |

#### Gradient System

5 gradient stops (g-1 through g-5), available in combinations of 2–5 stops, bidirectional.

| Stop | Light | Dark |
|------|-------|------|
| g-1 | #3B1757 | #FB1F71 |
| g-2 | #A1006F | #8B0B51 |
| g-3 | #DD3B59 | #8F2F43 |
| g-4 | #FB8043 | #A15936 |
| g-5 | #F8BC67 | #9C620F |

#### Heatmap Colors

Dedicated Red/Green scales for the Heatmap feature — separate light and dark sets.

---

### 2.2 Typography

#### Typeface 1 — Barlow

| Style | px | rem | Line Height px | Line Height rem | Letter Spacing | Weights |
|-------|----|-----|---------------|----------------|----------------|---------|
| H1 | 28 | 1.75 | 36 | 2.25 | 0% | 400, 500, 600, 700 |
| H2 | 24 | 1.5 | 32 | 2 | 0% | 400, 500, 600, 700 |
| H3 | 20 | 1.25 | 28 | 1.75 | 0% | 400, 500, 600, 700 |
| H4 | 18 | 1.125 | 24 | 1.5 | 0% | 400, 500, 600, 700 |
| H5 | 16 | 1 | 24 | 1.5 | 0% | 400, 500, 600, 700 |
| H6 | 14 | 0.875 | 20 | 1.25 | 0% | 400, 500, 600, 700 |
| Body | 12 | 0.75 | 16 | 1 | 0% | 400, 500, 600, 700 |
| Label | 11 | 0.688 | 16 | 1 | 2% | 400, 500, 600, 700 |
| Label sm | 10 | 0.625 | 16 | 1 | 2% | 400, 500, 600, 700 |

Weight reference: 400 = Regular · 500 = Medium · 600 = SemiBold · 700 = Bold

#### Typeface 2 — BlinkXSans New

| Style | px | rem | Line Height px | Line Height rem | Letter Spacing | Weight |
|-------|----|-----|---------------|----------------|----------------|--------|
| Display | 32 | 2 | 40 | 2.5 | 0% | 900 – Black |

---

### 2.3 Spacing

All values in `rem`. 20-step scale.

| Token | px | Token | px |
|-------|-----|-------|-----|
| `spacing-none` | 0 | `spacing-7xl` | 38 |
| `spacing-xxs` | 1 | `spacing-8xl` | 40 |
| `spacing-xs` | 2 | `spacing-9xl` | 48 |
| `spacing-sm` | 4 | `spacing-10xl` | 52 |
| `spacing-md` | 6 | `spacing-11xl` | 56 |
| `spacing-lg` | 8 | `spacing-12xl` | 64 |
| `spacing-xl` | 12 | `spacing-13xl` | 72 |
| `spacing-2xl` | 16 | `spacing-14xl` | 80 |
| `spacing-3xl` | 20 | | |
| `spacing-4xl` | 24 | | |
| `spacing-5xl` | 28 | | |
| `spacing-6xl` | 32 | | |

---

### 2.4 Border Radius

| Token | px | Usage |
|-------|-----|-------|
| `radius-none` | 0 | Sharp corners |
| `radius-xxs` | 2 | — |
| `radius-xs` | 4 | Chips, tags |
| `radius-sm` | 6 | — |
| `radius-md` | 8 | Inputs, buttons |
| `radius-lg` | 10 | Cards |
| `radius-xl` | 12 | — |
| `radius-2xl` | 16 | Modals, panels |
| `radius-3xl` | 20 | — |
| `radius-4xl` | 24 | Large cards |
| `radius-full` | 9999 | Pills, avatars |

---

### 2.5 Shadows & Elevation

Shadow color: `#0A0D10` for both modes.

| Semantic Token | Light Opacity | Dark Opacity |
|---------------|--------------|-------------|
| `shadow-xs` (drop-shadow-1) | 1% | 6% |
| `shadow-sm` (drop-shadow-2) | 2% | 12% |
| `shadow-md` (drop-shadow-4) | 4% | 20% |
| `shadow-lg` (drop-shadow-6) | 6% | 28% |
| `shadow-xl` (drop-shadow-9) | 9% | 42% |
| `shadow-2xl` (drop-shadow-12) | 12% | 56% |
| `shadow-3xl` (drop-shadow-18) | 18% | 82% |

Full primitive scale: `drop-shadow-1` through `drop-shadow-18`.

---

### 2.6 Frame Sizes

| Breakpoint | Width (px) | Height (px) |
|-----------|-----------|------------|
| Mobile | 360 | 800 |
| Tablet | 768 | 650 |
| Web SM | 1366 | 768 |
| Web MD | 1440 | 780 |
| Web LG | 1920 | 960 |

---

### 2.7 Icons

**Format:** `.svg` · **Sizes:** 12px, 16px, 20px, 24px, 28px · **Total:** 450 components (90 icons × 5 sizes)

#### Icon Color Tokens

| Token | Light | Dark |
|-------|-------|------|
| `icon-primary` | #414143 | #999999 |
| `icon-secondary` | #69696D | #6B6B6B |
| `icon-disabled` | #CECECE | #4D4F52 |
| `icon-brand` | #171EFD | #4E54FD |
| `icon-fill-white` | #FFFFFF | #FFFFFF |
| `icon-fill_on-disabled-cta` | #9D9D9D | #808081 |

#### Full Icon List

**Navigation & Directional**
`ArrowLeft` · `ArrowUp` · `ArrowDown` · `ArrowUpRight` · `ArrowSquareOut` · `ArrowCounterClockwise` · `ArrowsLeftRight` · `ArrowsHorizontal` *(28px only)* · `CaretDown` · `CaretUp` · `CaretLeft` · `CaretRight`

**Actions**
`Check` · `CheckCircle` · `X` · `Plus` · `PlusCircle` · `Trash` · `Copy` · `Pencil` · `Brush` · `Refresh` · `refresh-2` · `Download` · `Search` · `Focus` · `NewList`

**Trading & Finance**
`BuyTriangle` · `SellTriangle` · `BoltBrand` · `BoltWhite` · `Heatmap` · `Widgets` · `E` · `N` · `cod` · `bank` · `coins` · `money-bag` · `plant` · `nano-tech` · `policy`

**UI Controls**
`Star` · `Bookmark-Line` · `Bookmark-Fill` · `EyeOpen` · `EyeClosed` · `Pin1` · `Pin2` · `Chain` · `Drag` · `drag-thin` · `drag-thick` · `Hand` · `3dots` · `expand` · `minimize` · `CardsThree`

**Time & Calendar**
`Calendar` · `CalendarDot` · `CalendarCheck` · `Clock` · `clock1`

**Information**
`Info` · `FAQ` · `Help` · `warning` · `FileX` · `Prohibit` · `Plugs-off`

**Profile & Account**
`userprofile-1` · `userprofile-2` · `profile` · `profile1` · `password` · `lock1` · `security-check` · `location-pin` · `user-sharing` · `setting` · `report` · `gift`

**Communication**
`email-1` · `email-2` · `chat` · `phone` · `mobile` · `WhatsappLogo`

**Other**
`ai-browser` · `browswer`

#### Misc Icons

| Category | Items |
|----------|-------|
| Plans | Gold · Silver · Platinum · Titanium (xs/s/m) |
| Social | Platform icons (YouTube, etc.) |
| Status | Live · Pre-market · Post-market · Closed |
| Quick Access Tools | MTF · Pledge · Pre Defined Strategy · Research · Low Cost Option · Basket Order · Chart Based Trading · Option Chain · Strategy Builder · Trading View Charts · Flash Trade |

---

## 3. Components

### 3.1 Segment

**Variants:** 12 · **Themes:** Light, Dark

#### Anatomy

| Size | Width | Height | Padding (all sides) | Gap | Radius | Border |
|------|-------|--------|---------------------|-----|--------|--------|
| sm | auto | 28px | 2px | 4px | 9999px (pill) | 1px |
| md | auto | 32px | 2px | 4px | 9999px (pill) | 1px |

Width scales with number of buttons (2–7). Each button inside is equal-width.

| Buttons | sm width | md width |
|---------|----------|----------|
| 2 | 112px | 120px |
| 3 | 166px | 178px |
| 4 | 220px | 236px |
| 5 | 274px | 294px |
| 6 | 328px | 352px |
| 7 | 382px | 410px |

**Usage:** Buy/Sell toggle, Delivery/Intraday, order type switching. Never use for settings — use Toggle instead.

---

### 3.2 Tabs

**Variants:** 22 Tab Atoms + 9 tab count · **Themes:** Light, Dark

#### Anatomy

| Size | Height | Gap between tabs |
|------|--------|-----------------|
| sm | 35–36px | 12px |
| md | 40px | 12px |

**Types:** `with arrow` (narrower) · `with tag` (wider, includes count badge)

**Tab counts supported:** 2–10, Icon-only

**Usage:** Page-level navigation. Active state uses underline indicator.

---

### 3.3 Checkbox

**Variants:** 21 · **Themes:** Light, Dark

#### Anatomy

| Size | W × H | Corner Radius | Stroke |
|------|-------|--------------|--------|
| sm | 16 × 16px | 4px | 1.25px |
| md | 20 × 20px | 6px | 1.5px |
| lg | 24 × 24px | 6px | 1.5px |

**States:** Default · Default/Hover · Focused · Active · Active/Hover · Indeterminate · Disabled

**Usage:** Multi-select lists. Use Indeterminate when a parent group is partially selected.

---

### 3.4 Radio Button

**Variants:** 12 · **Themes:** Light, Dark

#### Anatomy

| Size | W × H | Corner Radius | Stroke |
|------|-------|--------------|--------|
| sm | 16 × 16px | 9999px | 1.25px |
| md | 20 × 20px | 9999px | 1.5px |
| lg | 24 × 24px | 9999px | 2px |

**States:** Default · Focused · Active · Disabled

**Usage:** Single-select within a group. Never used in isolation.

---

### 3.5 Toggle

**Variants:** 8 · **Themes:** Light, Dark

#### Anatomy

| Size | W × H | Radius | Stroke |
|------|-------|--------|--------|
| sm | 28 × 16px | 20px | 1px |
| md | 36 × 20px | 20px | 1px |

**States:** Default · Focused · Active · Disabled

**Usage:** Binary on/off settings. Not for mode-switching — use Segment for that.

---

### 3.6 Tooltip

**Variants:** 8 (one per placement direction) · **Themes:** Light, Dark

#### Anatomy

| Element | W × H |
|---------|-------|
| Text container | 78 × 16px |
| Arrow/caret | 14 × 8px |

**Placements:** Top-Centre · Top-left · Top-right · Bottom-Centre · Bottom-left · Bottom-right · Left · Right

**Usage:** Triggered on hover/focus. Not for critical info — not accessible on touch.

---

### 3.7 CTA Buttons

**Variants:** 160 · **Themes:** Light, Dark

#### Anatomy — Default style (text only)

| Size | W × H | Padding (T/B) | Padding (L) | Padding (R) | Gap | Radius |
|------|-------|--------------|------------|------------|-----|--------|
| sm | 88 × 24px | 4px | 12px | 8px | 4px | 9999px |
| md | 108 × 32px | 4px | 12px | 8px | 4px | 9999px |

#### Anatomy — With icon style

| Size | W × H | Padding (T/B) | Padding (L/R) | Gap | Radius |
|------|-------|--------------|--------------|-----|--------|
| sm | 88 × 24px | 4px | 10px | 4px | 9999px |
| md | 108 × 32px | 4px | 10px | 4px | 9999px |
| lg | 120 × 36px | 4px | 10px | 4px | 9999px |
| xl | 148 × 40px | 4px | 10px | 4px | 9999px |
| 2xl | 188 × 48px | 4px | 10px | 4px | 9999px |

**Focus ring:** 3px stroke, radius ~31px (offset outward from button)

#### Color Reference

| Action | Light bg | Dark bg | Text |
|--------|----------|---------|------|
| Brand Primary | #171EFD | #4E54FD | #FFFFFF |
| Buy Primary | #2BB02B | #48A848 | #FFFFFF |
| Sell Primary | #DD2006 | #CD4937 | #FFFFFF |
| Disabled | neutral-100 | neutral-100 | #9D9D9D |

---

### 3.8 Chips

**Variants:** 39 · **Themes:** Light, Dark

#### Anatomy — Chip-basic

| Size | W × H | Padding (T/B) | Padding (L/R) | Gap | Radius |
|------|-------|--------------|--------------|-----|--------|
| sm | 66 × 24px | 4px | 12px | 4px | 9999px |
| md | ~94 × 32px | 4px | 10px | 4px | 9999px |
| lg | auto × 40px | — | — | — | 9999px |

#### Anatomy — chip-Number (with badge)

| Size | W × H | Padding T/B | Padding L | Padding R | Gap | Radius |
|------|-------|------------|-----------|-----------|-----|--------|
| sm | 78 × 24px | 4px | 8px | 4px | 4px | 9999px |
| md | 94–100 × 32px | 4px | 10px | 6px | 4px | 9999px |

**States:** Default · Hover · Active · Focused · Disabled

---

### 3.9 Tags

**Variants:** 17 · **Themes:** Light, Dark

#### Anatomy — Dismissible (×) tag

| Size | W × H | Radius | Stroke |
|------|-------|--------|--------|
| xs | 16 × 16px | 26px | 1px |
| sm | 20 × 20px | 26px | 1px |
| md | 24 × 24px | 26px | 1px |
| xl | 28 × 28px | 26px | 1px |

**States:** Default · Hover · Active · Disabled

**Variants:** Standard · Dismissible (×) · Number tag

---

### 3.10 Badges

**Variants:** 5 · **Themes:** Light, Dark

| Badge | Exchange |
|-------|---------|
| NSE | National Stock Exchange |
| BSE | Bombay Stock Exchange |
| NFO | NSE F&O segment |
| BFO | BSE F&O segment |
| MCX | Multi Commodity Exchange |

**Usage:** Instrument cards, search results, watchlist rows. Identifies exchange/segment at a glance.

---

### 3.11 Dropdown

**Variants:** 19 · **Themes:** Light, Dark

#### Anatomy

| Size | W × H (menu open) | Gap | Stroke |
|------|-------------------|-----|--------|
| sm basic | 142 × 204px | 4px | 1px |
| sm with icon | 158 × 204px | 4px | 1px |
| md basic | 161 × 210px | 4px | 1px |
| md with icon | 161 × 230px | 4px | 1px |

**Special types:** Index dropdown · Nav dropdown (pinnable) · Dropdown menu · Number dropdown (+ve/-ve)

**States:** Default · Hover · Focused · Active

---

### 3.12 Input Fields

**Variants:** 35 · **Themes:** Light, Dark

#### Anatomy — Search Input

| Property | Value |
|----------|-------|
| W × H | 339 × 40px |
| Padding T/B | 8px |
| Padding L | 12px |
| Padding R | 54px (space for clear/mic icon) |
| Gap | 4px |
| Radius | 33px |
| Stroke | 1px |

**Search states:** Default · Focused · Focused-clicked · Searching

#### Anatomy — Text Input (with label)

| Property | Value |
|----------|-------|
| W × H | 219 × 66px |
| Gap (label to field) | 8px |

**Styles:** OP1 · OP2 · OP3 (three visual treatments, same structure)

**States:** Default · Hover · Focused · Active · Disabled

#### Trading Order Form Configurations

| Segment | Product | Order Types |
|---------|---------|------------|
| Equity | Delivery (CNC) | Market · Limit · Trigger · GTT |
| Equity | Intraday (MIS) | Market · Limit · Trigger · Cover · Bracket (Trailing on/off) |
| Equity | MTF | Market · Limit · Trigger |
| Options | Delivery | Market · Limit · Trigger · Additional Options |
| Options | Intraday | — |
| Futures | Delivery | Market · Limit · Trigger |
| Futures | Intraday | Market · Limit · Trigger · Bracket |
| Commodity | Delivery | Market · Limit · Trigger |

**Special states:** Caution (market order impact warning) · Intraday not available

---

### 3.13 Quick Action Bar

**Themes:** Light, Dark

**Usage:** Persistent contextual toolbar for frequent trading actions. Supports drag-to-reorder.

---

### 3.14 Toast Message

**Variants:** 12 · **Themes:** Light (white), Dark (black)

#### Anatomy

| Variant | W × H | Padding (all) | Gap | Radius |
|---------|-------|--------------|-----|--------|
| With supporting text | 384 × 92px | 12px | 9px | 12px |
| Without supporting text | 384 × 48px | 12px | 9px | 8px |
| Without text + Undo | 413 × 48px | 12px | 9px | 8px |

**Properties:** color (white/black) · type (positive/negative) · supporting text (on/off) · trailing text/Undo (on/off)

**Usage:** White = informational · Black = confirmations · Undo variant for reversible actions.

---

### 3.15 Table

**Variants:** 10 · **Themes:** Light, Dark

#### Anatomy — Column cell

| Property | Value |
|----------|-------|
| W × H | 210 × 48px |
| Padding T/B | 14px |
| Gap | 4px |
| Stroke | 1px |

**Column types:** name (text-aligned left) · number-digits (text-aligned right)

**Header types:** Standard · For Numbers

**Sort arrow states:** Default · Hover · Active (for both Sort up and Sort down)

---

### 3.16 Loading Indicators

**Variants:** 12 · **Themes:** Light, Dark

#### Anatomy

| Style | sm H | md H | lg H | xl H |
|-------|------|------|------|------|
| Line simple | 68px | 84px | 100px | 112px |
| Line spinner | 68px | 84px | 100px | 112px |
| Dot circle | 68px | 84px | 100px | 112px |

All variants: width 512px (container), height varies by size.

---

### 3.17 Modals (WIP)

Designs in progress. Specs to be added on completion.

---

## 4. Application Components

| Feature | Status |
|---------|--------|
| Watchlist | ✅ Available |
| Home Dashboard | ✅ Available |
| Navigation bar | ✅ Available |
| Portfolio / Equity / Summary | ✅ Available |
| Quick Access Tools panel | ✅ Available |
| Option Chain | ✅ Available |
| Strategy Builder | ✅ Available |
| Trading View Charts integration | ✅ Available |
| Flash Trade | ✅ Available |
| MTF (Margin Trade Funding) | ✅ Available |
| Pledge | ✅ Available |
| Basket Order | ✅ Available |
| Pre-Defined Strategy | ✅ Available |
| Research | ✅ Available |
| Low Cost Option | ✅ Available |
| Funds | ✅ Available |
| Combined Ledger Reports | ✅ Available |
| ITM / OTM Tags | ✅ Available |
| JM Financial theming | ✅ Available (separate page) |
| Commodity Page | ✅ Available |

---

## 5. Motion & Animation

### Format Standards

| Use Case | Format | Size |
|----------|--------|------|
| Complex animations | Lottie JSON | 10–50 KB |
| Animated illustrations | Lottie JSON | 15–50 KB |
| Simple transitions | CSS | — |
| Icon animations | SVG | 5–15 KB |

### Easing

| Easing | Use Case |
|--------|----------|
| `ease-in-out` | State transitions (hover, focus, active) |
| `ease-out` | Elements entering the screen |
| `ease-in` | Elements exiting the screen |

---

*For questions, Figma access, or contribution guidelines — contact the BlinkX Design Team.*

---

## 6. CSS Token Naming Convention

All Figma variables map to CSS custom properties using the `--blinkx-` prefix. The naming pattern is:

```
--blinkx-[category]-[subcategory]-[variant]
```

Tokens are set at the `:root` level and overridden under a `[data-theme="dark"]` selector.

### Color Tokens

#### Background

| Figma Token | CSS Custom Property |
|-------------|-------------------|
| `bg-brand-default` | `--blinkx-color-bg-brand-default` |
| `bg-brand-subtle-1` | `--blinkx-color-bg-brand-subtle-1` |
| `bg-brand-subtle-2` | `--blinkx-color-bg-brand-subtle-2` |
| `bg-brand-disable` | `--blinkx-color-bg-brand-disable` |
| `bg-brand-hover-prime` | `--blinkx-color-bg-brand-hover-prime` |
| `bg-brand-hover-on-sec` | `--blinkx-color-bg-brand-hover-on-sec` |
| `bg-brand-hover-on-tab` | `--blinkx-color-bg-brand-hover-on-tab` |
| `bg-brand-focus-ring` | `--blinkx-color-bg-brand-focus-ring` |
| `bg-buy-default` | `--blinkx-color-bg-buy-default` |
| `bg-buy-hover-on-prime` | `--blinkx-color-bg-buy-hover-on-prime` |
| `bg-buy-hover-sec-cta` | `--blinkx-color-bg-buy-hover-sec-cta` |
| `bg-buy-focus-ring` | `--blinkx-color-bg-buy-focus-ring` |
| `bg-sell-default` | `--blinkx-color-bg-sell-default` |

#### Text

| Figma Token | CSS Custom Property |
|-------------|-------------------|
| `text-primary` | `--blinkx-color-text-primary` |
| `text-secondary` | `--blinkx-color-text-secondary` |
| `text-tertiary` | `--blinkx-color-text-tertiary` |
| `text-brand` | `--blinkx-color-text-brand` |
| `text-green` | `--blinkx-color-text-green` |
| `text-red` | `--blinkx-color-text-red` |
| `text_on-disabled-cta` | `--blinkx-color-text-on-disabled-cta` |
| `text-white_on-cta` | `--blinkx-color-text-white-on-cta` |
| `text_on-segment-button` | `--blinkx-color-text-on-segment-button` |

#### Icons

| Figma Token | CSS Custom Property |
|-------------|-------------------|
| `icon-primary` | `--blinkx-color-icon-primary` |
| `icon-secondary` | `--blinkx-color-icon-secondary` |
| `icon-disabled` | `--blinkx-color-icon-disabled` |
| `icon-brand` | `--blinkx-color-icon-brand` |
| `icon-fill-white` | `--blinkx-color-icon-fill-white` |
| `icon-fill_on-disabled-cta` | `--blinkx-color-icon-fill-on-disabled-cta` |

### Spacing Tokens

| Figma Token | CSS Custom Property |
|-------------|-------------------|
| `spacing-none` | `--blinkx-spacing-none` |
| `spacing-xxs` | `--blinkx-spacing-xxs` |
| `spacing-xs` | `--blinkx-spacing-xs` |
| `spacing-sm` | `--blinkx-spacing-sm` |
| `spacing-md` | `--blinkx-spacing-md` |
| `spacing-lg` | `--blinkx-spacing-lg` |
| `spacing-xl` | `--blinkx-spacing-xl` |
| `spacing-2xl` | `--blinkx-spacing-2xl` |
| `spacing-3xl` | `--blinkx-spacing-3xl` |
| `spacing-4xl` | `--blinkx-spacing-4xl` |
| `spacing-5xl` | `--blinkx-spacing-5xl` |
| `spacing-6xl` | `--blinkx-spacing-6xl` |
| `spacing-7xl` | `--blinkx-spacing-7xl` |
| `spacing-8xl` | `--blinkx-spacing-8xl` |
| `spacing-9xl` | `--blinkx-spacing-9xl` |
| `spacing-10xl` | `--blinkx-spacing-10xl` |
| `spacing-11xl` | `--blinkx-spacing-11xl` |
| `spacing-12xl` | `--blinkx-spacing-12xl` |
| `spacing-13xl` | `--blinkx-spacing-13xl` |
| `spacing-14xl` | `--blinkx-spacing-14xl` |

### Radius Tokens

| Figma Token | CSS Custom Property |
|-------------|-------------------|
| `radius-none` | `--blinkx-radius-none` |
| `radius-xxs` | `--blinkx-radius-xxs` |
| `radius-xs` | `--blinkx-radius-xs` |
| `radius-sm` | `--blinkx-radius-sm` |
| `radius-md` | `--blinkx-radius-md` |
| `radius-lg` | `--blinkx-radius-lg` |
| `radius-xl` | `--blinkx-radius-xl` |
| `radius-2xl` | `--blinkx-radius-2xl` |
| `radius-3xl` | `--blinkx-radius-3xl` |
| `radius-4xl` | `--blinkx-radius-4xl` |
| `radius-full` | `--blinkx-radius-full` |

### Shadow Tokens

| Figma Token | CSS Custom Property |
|-------------|-------------------|
| `shadow-xs` | `--blinkx-shadow-xs` |
| `shadow-sm` | `--blinkx-shadow-sm` |
| `shadow-md` | `--blinkx-shadow-md` |
| `shadow-lg` | `--blinkx-shadow-lg` |
| `shadow-xl` | `--blinkx-shadow-xl` |
| `shadow-2xl` | `--blinkx-shadow-2xl` |
| `shadow-3xl` | `--blinkx-shadow-3xl` |

### Implementation Pattern

```css
:root {
  /* Colors — Light mode */
  --blinkx-color-bg-brand-default: #171EFD;
  --blinkx-color-text-primary: #41414E;
  --blinkx-color-text-green: #2BB02B;
  --blinkx-color-text-red: #DD2006;

  /* Spacing */
  --blinkx-spacing-sm: 0.25rem;   /* 4px */
  --blinkx-spacing-lg: 0.5rem;    /* 8px */
  --blinkx-spacing-2xl: 1rem;     /* 16px */

  /* Radius */
  --blinkx-radius-md: 8px;
  --blinkx-radius-full: 9999px;

  /* Shadows */
  --blinkx-shadow-sm: 0 2px 4px rgba(10, 13, 16, 0.02);
  --blinkx-shadow-md: 0 4px 8px rgba(10, 13, 16, 0.04);
}

[data-theme="dark"] {
  /* Colors — Dark mode overrides only */
  --blinkx-color-bg-brand-default: #4E54FD;
  --blinkx-color-text-primary: #CACACE;
  --blinkx-color-text-green: #48A848;
  --blinkx-color-text-red: #CD4937;
}
```

---

## 7. Z-Index Scale

Z-index layers are defined globally. Engineers must use these tokens — never hardcode z-index values.

| Token | Value | Usage |
|-------|-------|-------|
| `--blinkx-z-base` | 0 | Default document flow |
| `--blinkx-z-raised` | 10 | Cards, elevated surfaces |
| `--blinkx-z-sticky` | 100 | Sticky headers, pinned nav |
| `--blinkx-z-overlay` | 200 | Overlay backgrounds (modal backdrop) |
| `--blinkx-z-dropdown` | 300 | Dropdowns, select menus, nav menus |
| `--blinkx-z-tooltip` | 400 | Tooltips (must appear above dropdowns) |
| `--blinkx-z-toast` | 500 | Toast messages (always on top of content) |
| `--blinkx-z-modal` | 600 | Modals and dialogs |
| `--blinkx-z-modal-tooltip` | 700 | Tooltips inside modals |

### Stacking Rules

- Dropdowns (`300`) sit above sticky nav (`100`) — nav dropdowns expand correctly
- Tooltips (`400`) sit above dropdowns (`300`) — info tooltips on dropdown items visible
- Toasts (`500`) sit above all content layers — never obscured by dropdowns or tooltips
- Modals (`600`) sit above toasts — modal + backdrop covers everything
- Modal tooltips (`700`) — separate level for tooltips rendered inside a modal context

### Implementation

```css
:root {
  --blinkx-z-base: 0;
  --blinkx-z-raised: 10;
  --blinkx-z-sticky: 100;
  --blinkx-z-overlay: 200;
  --blinkx-z-dropdown: 300;
  --blinkx-z-tooltip: 400;
  --blinkx-z-toast: 500;
  --blinkx-z-modal: 600;
  --blinkx-z-modal-tooltip: 700;
}
```

---

## 8. Grid & Layout System

Based on the 5 defined frame sizes. All breakpoints use a 12-column grid.

| Breakpoint | Width | Columns | Gutter | Margin (L/R) | Column width |
|-----------|-------|---------|--------|-------------|-------------|
| Mobile | 360px | 4 | 16px | 16px | 68px |
| Tablet | 768px | 8 | 16px | 24px | 72px |
| Web SM | 1366px | 12 | 24px | 48px | 82px |
| Web MD | 1440px | 12 | 24px | 56px | 86px |
| Web LG | 1920px | 12 | 32px | 80px | 110px |

### Breakpoint Tokens

```css
:root {
  --blinkx-grid-cols-mobile: 4;
  --blinkx-grid-cols-tablet: 8;
  --blinkx-grid-cols-web: 12;

  --blinkx-grid-gutter-mobile: 16px;
  --blinkx-grid-gutter-tablet: 16px;
  --blinkx-grid-gutter-web-sm: 24px;
  --blinkx-grid-gutter-web-md: 24px;
  --blinkx-grid-gutter-web-lg: 32px;

  --blinkx-grid-margin-mobile: 16px;
  --blinkx-grid-margin-tablet: 24px;
  --blinkx-grid-margin-web-sm: 48px;
  --blinkx-grid-margin-web-md: 56px;
  --blinkx-grid-margin-web-lg: 80px;
}
```

### Breakpoint Media Queries

```css
/* Mobile first */
/* Mobile:  default, < 768px */
/* Tablet:  >= 768px */
/* Web SM:  >= 1366px */
/* Web MD:  >= 1440px */
/* Web LG:  >= 1920px */

@media (min-width: 768px)  { /* Tablet */ }
@media (min-width: 1366px) { /* Web SM */ }
@media (min-width: 1440px) { /* Web MD */ }
@media (min-width: 1920px) { /* Web LG */ }
```

---

## 9. Transition & Duration Tokens

All interactive state changes use CSS transitions. Durations and easing are tokenised.

### Duration Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--blinkx-duration-instant` | 0ms | No animation (reduced motion) |
| `--blinkx-duration-fast` | 100ms | Hover state changes (color, bg) |
| `--blinkx-duration-normal` | 150ms | Focus rings, active states |
| `--blinkx-duration-moderate` | 200ms | Tooltips, chips, tags appearing |
| `--blinkx-duration-slow` | 300ms | Dropdowns, modals opening |
| `--blinkx-duration-slower` | 400ms | Page-level transitions, drawers |

### Easing Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--blinkx-ease-default` | `ease-in-out` | State transitions (hover, focus, active) |
| `--blinkx-ease-enter` | `ease-out` | Elements entering the screen |
| `--blinkx-ease-exit` | `ease-in` | Elements exiting the screen |
| `--blinkx-ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Micro-interactions (toggle, checkbox tick) |

### Per-Component Defaults

| Component | Property | Duration | Easing |
|-----------|----------|----------|--------|
| Button | background-color, color | 100ms | ease-in-out |
| Button | focus ring | 150ms | ease-out |
| Checkbox / Radio | background, border | 100ms | ease-in-out |
| Checkbox tick | transform | 150ms | spring |
| Toggle | transform (knob), background | 200ms | ease-in-out |
| Input | border-color, box-shadow | 150ms | ease-in-out |
| Dropdown | opacity, transform | 200ms | ease-out (open), ease-in (close) |
| Tooltip | opacity | 150ms | ease-out (show), ease-in (hide) |
| Toast | opacity, transform | 300ms | ease-out (enter), ease-in (exit) |
| Tab indicator | transform, width | 200ms | ease-in-out |
| Chips / Tags | background-color | 100ms | ease-in-out |
| Modal | opacity, transform | 300ms | ease-out (open), ease-in (close) |
| Modal backdrop | opacity | 300ms | ease-in-out |

### Implementation

```css
:root {
  --blinkx-duration-fast:     100ms;
  --blinkx-duration-normal:   150ms;
  --blinkx-duration-moderate: 200ms;
  --blinkx-duration-slow:     300ms;
  --blinkx-duration-slower:   400ms;

  --blinkx-ease-default: ease-in-out;
  --blinkx-ease-enter:   ease-out;
  --blinkx-ease-exit:    ease-in;
  --blinkx-ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Respect system reduced-motion preference */
@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0ms !important;
    animation-duration: 0ms !important;
  }
}
```

---

## 10. Stroke & Border Tokens

Extracted from component definitions. All borders use `px` (not rem) per the pre-requisites standard.

### Stroke Weights

| Token | Value | Usage |
|-------|-------|-------|
| `--blinkx-stroke-default` | 1px | Standard component borders (inputs, chips, cards) |
| `--blinkx-stroke-md` | 1.25px | Checkbox sm, Radio sm |
| `--blinkx-stroke-lg` | 1.5px | Checkbox md/lg, Radio md, Input active |
| `--blinkx-stroke-focus` | 3px | Focus ring on buttons, inputs, checkboxes |

### Stroke Colors (Semantic)

| Token | Light (`#`) | Dark (`#`) | Usage |
|-------|------------|-----------|-------|
| `--blinkx-stroke-default` | E7E7E7 | — | Default input/card border |
| `--blinkx-stroke-subtle` | DDDDDD | — | Dropdown, dividers |
| `--blinkx-stroke-brand` | 171EFD | — | Active/focused brand border |
| `--blinkx-stroke-dark` | 414143 | — | Strong border (active checkbox) |
| `--blinkx-stroke-disabled` | CECECE | — | Disabled component border |
| `--blinkx-stroke-focus-ring` | DBE1FB | — | Focus ring color (3px, brand-100) |
| `--blinkx-stroke-toggle` | E2E8F0 | — | Toggle track border (default) |

### Usage by Component

| Component | State | Weight | Color token |
|-----------|-------|--------|-------------|
| Input | Default | 1px | `--blinkx-stroke-default` |
| Input | Active / Focused | 1.5px | `--blinkx-stroke-brand` |
| Checkbox sm | All | 1.25px | `--blinkx-stroke-dark` / disabled / brand |
| Checkbox md/lg | All | 1.5px | `--blinkx-stroke-dark` / disabled / brand |
| Radio sm | All | 1.25px | `--blinkx-stroke-dark` / disabled / brand |
| Radio md | All | 1.5px | `--blinkx-stroke-dark` / disabled / brand |
| Radio lg | All | 2px | `--blinkx-stroke-dark` / disabled / brand |
| Button | Default | 1px | `--blinkx-stroke-brand` |
| Button | Focused | 3px | `--blinkx-stroke-focus-ring` |
| Chips / Tags | Default | 1px | `--blinkx-stroke-default` |
| Chips / Tags | Active | 1px | `--blinkx-stroke-brand` |
| Toggle | Default | 1px | `--blinkx-stroke-toggle` |
| Dropdown | Default | 1px | `--blinkx-stroke-subtle` |
| Tabs | Active underline | 1px | `--blinkx-stroke-brand` |


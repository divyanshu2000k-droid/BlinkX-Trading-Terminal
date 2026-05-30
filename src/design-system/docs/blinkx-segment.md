# blinkX Design System V1 - Segment

Generated from `src/components/Segment.stories.tsx`, `src/components/BlinkXSegment.tsx`, and `src/components/BlinkXSegment.css` so the downloadable markdown matches the Storybook Segment page.

## Component

`BlinkXSegment` is the segmented-control component. It supports two sizes, six segment counts, light/dark themes, controlled selected index, custom label text, hover styling for inactive chips, and interactive click selection.

```tsx
import { useState } from 'react'
import { BlinkXSegment } from './BlinkXSegment'
import './BlinkXSegment.css'

export function Example() {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <BlinkXSegment
      labels={['Local', 'Global', 'Watchlist']}
      noOfButtons="Segment-3"
      onValueChange={setSelectedIndex}
      selectedIndex={selectedIndex}
      size="sm"
      theme="light"
    />
  )
}
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `noOfButtons` | `"Segment-2" \| "Segment-3" \| "Segment-4" \| "Segment-5" \| "Segment-6" \| "Segment-7"` | `"Segment-2"` | Controls how many segment buttons render. |
| `size` | `"sm" \| "md"` | `"sm"` | Controls typography, item height, and minimum item width. |
| `theme` | `"light" \| "dark"` | `"light"` | Uses light or dark Figma token values. |
| `selectedIndex` | `number` | `0` | Controlled active index. The component clamps the value between `0` and `buttonCount - 1`. |
| `labels` | `string[]` | `["Local", ...]` | Optional labels. Missing label values fall back to `"Local"`. |
| `onValueChange` | `(selectedIndex: number) => void` | `undefined` | Called when a segment button is clicked. |
| `className` | `string` | `""` | Optional class appended to the root. |

## Figma Component Set

| Item | Value |
| --- | --- |
| Figma node | `6134:46107` |
| Component | `Segmented Set` |
| Storybook title | `Components / Segment` |
| Component properties | `No. of Buttons`, `Text on segment-on`, `Text on segment-off`, `Size`, `Theme` |
| Counts | `Segment-2`, `Segment-3`, `Segment-4`, `Segment-5`, `Segment-6`, `Segment-7` |
| Sizes | `sm`, `md` |
| Themes | `light`, `dark` |

## Count Rules

| `noOfButtons` | Rendered buttons | Visible text controls in Storybook |
| --- | --- | --- |
| `Segment-2` | 2 | `Text on segment-on`, `Text on segment-off` |
| `Segment-3` | 3 | `Text on segment-on`, `Text on segment-off-1`, `Text on segment-off-2` |
| `Segment-4` | 4 | `Text on segment-on`, `Text on segment-off-1`, `Text on segment-off-2`, `Text on segment-off-3` |
| `Segment-5` | 5 | `Text on segment-on`, `Text on segment-off-1` through `Text on segment-off-4` |
| `Segment-6` | 6 | `Text on segment-on`, `Text on segment-off-1` through `Text on segment-off-5` |
| `Segment-7` | 7 | `Text on segment-on`, `Text on segment-off-1` through `Text on segment-off-6` |

## Text Interaction Rule

When a user clicks an inactive chip, that chip becomes selected and its label becomes `Text on segment-on`. The previously active label is moved into the first available `Text on segment-off` slot, preserving the visible order of inactive labels.

Example with `Segment-3`:

| Before click | Active label | Off labels |
| --- | --- | --- |
| `["Local", "Local 2", "Local"]`, active `0` | `Local` | `Local 2`, `Local` |

Clicking chip `1` resolves to:

| After click | Active label | Off labels |
| --- | --- | --- |
| `["Local 2", "Local", "Local"]`, active `1` | `Local 2` | `Local`, `Local` |

## Size Specs

| Size | Font size | Line height | Item height | Min item width | Root padding | Chip padding |
| --- | --- | --- | --- | --- | --- | --- |
| `sm` | `12px` / `0.75rem` | `16px` / `1rem` | `24px` / `1.5rem` | `54px` / `3.375rem` | `2px` / `0.125rem` | `4px 12px` |
| `md` | `14px` / `0.875rem` | `20px` / `1.25rem` | `28px` / `1.75rem` | `58px` / `3.625rem` | `2px` / `0.125rem` | `4px 12px` |

## Shared Layout

| Property | Value |
| --- | --- |
| Root display | `inline-flex` |
| Root alignment | Centered |
| Root radius | `9999px` / `radius-round` |
| Root padding | `2px` |
| Item display | `inline-flex` |
| Item radius | `9999px` / `radius-round` |
| Item border | `1px solid transparent` by default |
| Item text align | Center |
| Item white space | `nowrap` |
| Font family | `Barlow`, fallback UI sans |
| Font weight | `600` / SemiBold |
| Letter spacing | `0` |
| Transition | `background 160ms ease`, `box-shadow 160ms ease`, `color 160ms ease` |

## Light Theme Tokens

| Usage | Value | Figma variable |
| --- | --- | --- |
| Root neutral fill | `#F2F2F2` | `Color/background/segment/bg-segment-neutral -> Colors/neutral/Light/neutral-50` |
| Active chip fill | `#FFFFFF` | `Color/background/segment/bg-segment-chip -> Colors/base/white` |
| Inactive hover fill | `#E7E7E7` | `Color/background/segment/bg-segment-chip-hover -> Colors/neutral/Light/neutral-100` |
| Active chip stroke | `#FFFFFF` | `Color/stroke/stroke_on-segment-pill -> Colors/base/white` |
| Active text | `#171EFD` | `Color/text/text_on-segment-button -> Colors/brand/Light/brand-500` |
| Inactive text | `#666666` | `Color/text/text-secondary -> Colors/font/Light/2` |
| Inactive hover text | `#41414E` | `Color/text/text-primary -> Colors/font/Light/1` |
| Active chip shadow | `#0A0D101A` | `drop Shadow/drop-shadow-10` |

## Dark Theme Tokens

| Usage | Value | Figma variable |
| --- | --- | --- |
| Root neutral fill | `#33373B` | `Color/background/segment/bg-segment-neutral -> Colors/neutral/Dark/neutral-100` |
| Active chip fill | `#202429` | `Color/background/segment/bg-segment-chip -> Colors/neutral/Dark/neutral-25` |
| Inactive hover fill | `#272A2F` | `Color/background/segment/bg-segment-chip-hover -> Colors/neutral/Dark/neutral-50` |
| Active chip stroke | `#202429` | `Color/stroke/stroke_on-segment-pill -> Colors/neutral/Dark/neutral-25` |
| Active text | `#585DFE` | `Color/text/text_on-segment-button -> Colors/brand/Dark/brand-500` |
| Inactive text | `#B2B2B3` | `Color/text/text-secondary -> Colors/font/Dark/2` |
| Inactive hover text | `#CACACE` | `Color/text/text-primary -> Colors/font/Dark/1` |
| Active chip shadow | `#0A0D107A` | `drop Shadow/drop-shadow-10` |

## State Rules

| State | Fill | Border | Text | Shadow |
| --- | --- | --- | --- | --- |
| Inactive | Transparent | `1px solid transparent` | Text-secondary token | None |
| Inactive hover | Chip-hover token | `1px solid transparent` | Text-primary token | None |
| Active | Chip token | `1px solid` stroke-pill token | Text-on-segment-button token | `drop-shadow-10` |

## Core CSS

```css
.blinkx-segment {
  --segment-bg-neutral: #f2f2f2;
  --segment-bg-chip: #ffffff;
  --segment-bg-chip-hover: #e7e7e7;
  --segment-stroke-pill: #ffffff;
  --segment-text-active: #171efd;
  --segment-text-hover: #41414e;
  --segment-text-secondary: #666666;
  --segment-shadow: rgb(10 13 16 / 10%);
  --segment-font-size: 12px;
  --segment-line-height: 16px;
  --segment-item-height: 24px;
  align-items: center;
  background: var(--segment-bg-neutral);
  border-radius: 9999px;
  display: inline-flex;
  justify-content: center;
  padding: 2px;
}
```

## Item CSS

```css
.blinkx-segment__item {
  align-items: center;
  appearance: none;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 9999px;
  box-shadow: none;
  color: var(--segment-text-secondary);
  cursor: pointer;
  display: inline-flex;
  font-family: Barlow, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: var(--segment-font-size);
  font-weight: 600;
  height: var(--segment-item-height);
  justify-content: center;
  letter-spacing: 0;
  line-height: var(--segment-line-height);
  min-width: 54px;
  overflow: hidden;
  padding: 4px 12px;
  position: relative;
  text-align: center;
  transition:
    background 160ms ease,
    box-shadow 160ms ease,
    color 160ms ease;
  white-space: nowrap;
}

.blinkx-segment--size-md .blinkx-segment__item {
  min-width: 58px;
}
```

## Active And Hover CSS

```css
.blinkx-segment__item:hover:not([data-active="true"]) {
  background: var(--segment-bg-chip-hover);
  color: var(--segment-text-hover);
}

.blinkx-segment__item[data-active="true"] {
  background: var(--segment-bg-chip);
  border-color: var(--segment-stroke-pill);
  box-shadow:
    0 1px 2px -1px var(--segment-shadow),
    0 1px 3px 0 var(--segment-shadow);
  color: var(--segment-text-active);
}
```

## Dark Theme CSS

```css
.blinkx-segment--theme-dark {
  --segment-bg-neutral: #33373b;
  --segment-bg-chip: #202429;
  --segment-bg-chip-hover: #272a2f;
  --segment-stroke-pill: #202429;
  --segment-text-active: #585dfe;
  --segment-text-hover: #cacace;
  --segment-text-secondary: #b2b2b3;
  --segment-shadow: rgb(10 13 16 / 48%);
}
```

## Component Markup

```tsx
<div
  aria-label="Segmented Set"
  className="blinkx-segment blinkx-segment--count-3 blinkx-segment--size-sm blinkx-segment--theme-light"
  data-count="Segment-3"
  data-selected-index={0}
  data-size="sm"
  data-theme="light"
  role="group"
>
  {labels.map((label, index) => (
    <button
      aria-pressed={index === selectedIndex}
      className="blinkx-segment__item"
      data-active={index === selectedIndex ? 'true' : 'false'}
      key={`${label}-${index}`}
      onClick={() => onValueChange?.(index)}
      type="button"
    >
      <span className="blinkx-segment__label">{label}</span>
    </button>
  ))}
</div>
```

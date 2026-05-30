# blinkX Design System V1 - Tooltip

Generated from `src/components/Tooltip.stories.tsx`, `src/components/BlinkXTooltip.tsx`, and `src/components/BlinkXTooltip.css` so the downloadable markdown matches the Storybook Tooltip page.

## Component

`BlinkXTooltip` is the tooltip component. It supports eight arrow placements, editable header text, optional supporting text, header-only hug behavior, wrapped/fill text behavior, and Figma token values for light and dark theme text colors.

```tsx
import { BlinkXTooltip } from './BlinkXTooltip'
import './BlinkXTooltip.css'

export function Example() {
  return (
    <BlinkXTooltip
      type="Top-left"
      title="Text goes here"
      showSupportingText
      supportingText="Tooltips are used to describe or identify an element."
    />
  )
}
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `type` | `"Top-left" \| "Top-Centre" \| "Top-right" \| "bottom-left" \| "bottom-Centre" \| "bottom-right" \| "left" \| "right"` | `"Top-left"` | Controls arrow placement. |
| `title` | `string` | `"Text goes here"` | Header text. Always rendered. |
| `showSupportingText` | `boolean` | `true` | Shows or hides the supporting text block. |
| `supportingText` | `string` | Tooltip description copy | Supporting text. Hidden when `showSupportingText={false}`. |
| `className` | `string` | `""` | Optional class appended to the root. |

## Figma Component Set

| Item | Value |
| --- | --- |
| Figma node | `170:411` |
| Component | `tooltip` |
| Storybook title | `Components / Tooltip` |
| Component properties | `Show Supporting Text`, `Header Text`, `Supporting Text`, `Type` |
| Captured visual bounds | `224px` x `100px` |
| Placements | `Top-left`, `Top-Centre`, `Top-right`, `bottom-left`, `bottom-Centre`, `bottom-right`, `left`, `right` |

## Layout Specs

| Property | Value |
| --- | --- |
| Root display | `inline-block` |
| Root padding | `12px` / `0.75rem` |
| Surface width with supporting text | `224px` / `14rem` |
| Surface max width | `224px` / `14rem` |
| Surface width without supporting text | `fit-content` / hug contents |
| Surface padding with supporting text | `12px` / `0.75rem` |
| Surface padding without supporting text | `8px` / `0.5rem` |
| Content gap with supporting text | `8px` / `0.5rem` |
| Content gap without supporting text | `0px` / `0rem` |
| Surface radius | `6px` / `0.375rem` |
| Arrow size | `12px` / `0.75rem` |
| Arrow radius | `2px` / `0.125rem` |
| Text layout | `width: 100%`, `min-width: 0`, `max-width: 100%`, `overflow-wrap: anywhere` |

## Typography

| Text | Font family | Size | Line height | Weight | Color |
| --- | --- | --- | --- | --- | --- |
| Header | `Barlow` | `12px` / `0.75rem` | `16px` / `1rem` | `600` / SemiBold | `#FFFFFF` |
| Supporting text | `Barlow` | `12px` / `0.75rem` | `16px` / `1rem` | `400` / Regular | Theme token |

## Light Theme Tokens

| Usage | Value | Figma variable |
| --- | --- | --- |
| Surface / arrow fill | `#000000` | `Color/background/tooltip/bg-tooltip-black -> Colors/base/black` |
| Header text | `#FFFFFF` | `Colors/base/white` |
| Supporting text | `#E7E7E7` | `Color/Tooltips/tooltip-supporting-text -> Colors/neutral/Light/neutral-100` |
| Surface shadow | `0 24px 40px -8px rgb(10 13 16 / 32%)` | Tooltip shadow from component style |
| Root filter shadow | `drop-shadow(0 22px 28px rgb(10 13 16 / 22%))` | Tooltip presentation shadow |

## Dark Theme Tokens

| Usage | Value | Figma variable |
| --- | --- | --- |
| Surface / arrow fill | `#000000` | `Color/background/tooltip/bg-tooltip-black -> Colors/base/black` |
| Header text | `#FFFFFF` | `Colors/base/white` |
| Supporting text | `#B2B2B3` | `Color/Tooltips/tooltip-supporting-text -> Colors/font/Dark/2` |
| Surface shadow | `0 24px 40px -8px rgb(10 13 16 / 32%)` | Tooltip shadow from component style |
| Root filter shadow | `drop-shadow(0 22px 28px rgb(10 13 16 / 22%))` | Tooltip presentation shadow |

## Theme Note

The current `BlinkXTooltip` component API does not expose a `theme` prop. The Storybook source records both light and dark Figma text tokens. Current CSS applies the light supporting-text value by default:

```css
.blinkx-tooltip {
  --tooltip-supporting-text: #e7e7e7;
}
```

For a dark-themed wrapper, override only the supporting text variable:

```css
[data-theme="dark"] .blinkx-tooltip,
.blinkx-tooltip--theme-dark {
  --tooltip-supporting-text: #b2b2b3;
}
```

## Placement Specs

| Type | Arrow position | Transform |
| --- | --- | --- |
| `Top-left` | `left: 28px; top: 6px;` | `rotate(45deg)` |
| `Top-Centre` | `left: 50%; top: 6px;` | `translateX(-50%) rotate(45deg)` |
| `Top-right` | `right: 28px; top: 6px;` | `rotate(45deg)` |
| `bottom-left` | `bottom: 6px; left: 28px;` | `rotate(45deg)` |
| `bottom-Centre` | `bottom: 6px; left: 50%;` | `translateX(-50%) rotate(45deg)` |
| `bottom-right` | `bottom: 6px; right: 28px;` | `rotate(45deg)` |
| `left` | `left: 6px; top: 50%;` | `translateY(-50%) rotate(45deg)` |
| `right` | `right: 6px; top: 50%;` | `translateY(-50%) rotate(45deg)` |

## Supporting Text Rules

| `showSupportingText` | Surface width | Padding | Gap | Rendered content |
| --- | --- | --- | --- | --- |
| `true` | `224px` | `12px` | `8px` | Header + supporting text |
| `false` | `fit-content` | `8px` | `0px` | Header only |

## Core CSS

```css
.blinkx-tooltip {
  --tooltip-bg: #000000;
  --tooltip-supporting-text: #e7e7e7;
  --tooltip-title: #ffffff;
  --tooltip-arrow-size: 12px;
  --tooltip-radius: 6px;
  --tooltip-shadow: 0 24px 40px -8px rgb(10 13 16 / 32%);
  --tooltip-surface-width: 224px;
  display: inline-block;
  filter: drop-shadow(0 22px 28px rgb(10 13 16 / 22%));
  font-family: Barlow, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  line-height: 1;
  padding: var(--tooltip-arrow-size);
  position: relative;
}
```

## Surface CSS

```css
.blinkx-tooltip__surface {
  background: var(--tooltip-bg);
  border-radius: var(--tooltip-radius);
  box-shadow: var(--tooltip-shadow);
  box-sizing: border-box;
  color: var(--tooltip-title);
  display: grid;
  gap: 8px;
  justify-items: stretch;
  max-width: var(--tooltip-surface-width);
  min-width: 0;
  padding: 12px;
  position: relative;
  width: var(--tooltip-surface-width);
}

.blinkx-tooltip--header-only .blinkx-tooltip__surface {
  gap: 0;
  max-width: var(--tooltip-surface-width);
  padding: 8px;
  width: fit-content;
}
```

## Text CSS

```css
.blinkx-tooltip__title {
  color: var(--tooltip-title);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 16px;
  margin: 0;
  max-width: 100%;
  min-width: 0;
  overflow-wrap: anywhere;
  width: 100%;
  word-break: normal;
}

.blinkx-tooltip__supporting-text {
  color: var(--tooltip-supporting-text);
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  margin: 0;
  max-width: 100%;
  min-width: 0;
  overflow-wrap: anywhere;
  width: 100%;
  word-break: normal;
}
```

## Arrow CSS

```css
.blinkx-tooltip__arrow {
  background: var(--tooltip-bg);
  border-radius: 2px;
  height: var(--tooltip-arrow-size);
  position: absolute;
  transform: rotate(45deg);
  width: var(--tooltip-arrow-size);
  z-index: 1;
}
```

## Component Markup

```tsx
<div className="blinkx-tooltip blinkx-tooltip--type-top-left" data-type="Top-left" role="tooltip">
  <span className="blinkx-tooltip__arrow" aria-hidden="true" />
  <div className="blinkx-tooltip__surface">
    <p className="blinkx-tooltip__title">Text goes here</p>
    <p className="blinkx-tooltip__supporting-text">
      Tooltips are used to describe or identify an element.
    </p>
  </div>
</div>
```

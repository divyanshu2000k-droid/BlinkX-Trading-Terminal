# blinkX Toast Message

## Overview

Toast Message is a compact status notification for transient feedback. It supports positive and negative message types, optional supporting text, optional trailing action text, close action, and light/dark theme variants.

Figma source:

- Light component set: `6205:15920`
- Dark component set: `6205:16061`

## Component Properties

| Property | Type | Values | Default |
| --- | --- | --- | --- |
| `type` | variant | `negative`, `positive` | `negative` |
| `showSupportingText` | boolean | `true`, `false` | `true` |
| `trailingText` | boolean | `true`, `false` | `false` |
| `theme` | variant | `light`, `dark` | `light` |
| `title` | string | Any message text | Type-specific default |
| `supportingText` | string | Any supporting text | Figma supporting text sample |
| `actionText` | string | Any action label | `Undo` |
| `onActionClick` | function | Action handler | `undefined` |
| `onClose` | function | Close handler | `undefined` |

## Figma Variants

| Theme | Figma node | Type | Supporting text | Trailing text |
| --- | --- | --- | --- | --- |
| Light | `6205:15931` | negative | On | Off |
| Light | `6205:15960` | negative | Off | On |
| Light | `6205:15980` | positive | Off | On |
| Light | `6205:15990` | negative | Off | Off |
| Light | `6205:16009` | positive | On | Off |
| Light | `6205:16028` | positive | Off | Off |
| Dark | `6205:16062` | negative | On | Off |
| Dark | `6205:16072` | negative | Off | On |
| Dark | `6205:16082` | positive | Off | On |
| Dark | `6205:16092` | negative | Off | Off |
| Dark | `6205:16101` | positive | On | Off |
| Dark | `6205:16111` | positive | Off | Off |

## Tokens

### Light Theme

| Token role | Figma variable | Value |
| --- | --- | --- |
| Surface | `Color/Surface - Elevation/surface 2` | `#FFFFFF` |
| Stroke | `Color/stroke/stroke-subtle` | `#F2F2F2` |
| Title text | `Color/text/text-primary` | `#41414E` |
| Supporting text | `Color/text/text-secondary` | `#666666` |
| Action text | `Color/text/text-brand` | `#171EFD` |
| Action text hover | `Color/toast/toast-cta-brand-hover` | `#181EA6` |
| Negative icon/accent | `Color/background/sell/bg-sell-default` | `#DD2006` |
| Positive icon/accent | `Color/background/Buy/bg-buy`, `Color/background/buy/bg-buy-default` | `#2BB02B` |
| Close tag background | `Color/background/tag/bg-tag-neutral-1` | `#F2F2F2` |
| Close tag hover background | Toast hover state / x tag hover fill | `#E7E7E7` |
| Close icon | `Color/icons/icon-primary` | `#414143` |

### Dark Theme

| Token role | Figma variable | Value |
| --- | --- | --- |
| Surface | `Color/Surface - Elevation/surface 2` | `#23282E` |
| Stroke | `Color/stroke/stroke-subtle` | `#272A2F` |
| Title text | `Color/text/text-primary` | `#CACACE` |
| Supporting text | `Color/text/text-secondary` | `#B2B2B3` |
| Action text | `Color/text/text-brand` | `#9B9EFE` |
| Action text hover | `Color/toast/toast-cta-brand-hover` | `#BCBEFF` |
| Negative icon/accent | `Color/background/sell/bg-sell-default` | `#CD4937` |
| Positive icon | `Color/background/Buy/bg-buy` | `#2BB02B` |
| Positive accent | `Color/background/buy/bg-buy-default` | `#48A848` |
| Close tag background | `Color/background/tag/bg-tag-neutral-2` | `#272A2F` |
| Close tag hover background | Toast hover state / x tag hover fill | `#33373B` |
| Close icon | `Color/icons/icon-primary` | `#999999` |

## Layout

| Property | Value |
| --- | --- |
| Width without trailing text | `384px` / `24rem` |
| Width with trailing text | `413px` / `25.8125rem` |
| Padding | `12px` / `0.75rem` |
| Outer gap | `9px` / `0.5625rem` |
| Status icon size | `24px` / `1.5rem` |
| Status vector size | `19px` / `1.1875rem` |
| Icon to text gap | `8px` / `0.5rem` |
| Title to supporting text gap | `4px` / `0.25rem` |
| Content to close gap | `28px` / `1.75rem` |
| Default radius | `8px` / `0.5rem` |
| Supporting-text radius | `12px` / `0.75rem` |
| Side accent | `4px x 22px` / `0.25rem x 1.375rem` |
| Side accent radius | top-right `12px`, bottom-right `12px` |
| Close tag size | `20px` / `1.25rem` |
| Close icon size | `10px` / `0.625rem` |

## Hover Interaction

| Target | Light default | Light hover | Dark default | Dark hover |
| --- | --- | --- | --- | --- |
| Close tag fill | `#F2F2F2` | `#E7E7E7` | `#272A2F` | `#33373B` |
| Undo text | `#171EFD` | `#181EA6` | `#9B9EFE` | `#BCBEFF` |

The close tag keeps its `20px x 20px` size on hover. The interaction is a fill-color transition only, matching the Figma hover reference `191:1678`.

## Typography

| Element | Font | Size | Line height | Weight |
| --- | --- | --- | --- | --- |
| Title | Barlow | `12px` / `0.75rem` | `16px` / `1rem` | SemiBold / `600` |
| Supporting text | Barlow | `12px` / `0.75rem` | `16px` / `1rem` | Medium / `500` |
| Trailing action | Barlow | `12px` / `0.75rem` | `16px` / `1rem` | SemiBold / `600` |

## Shadow

The toast uses the same three-layer shadow stack captured from Figma:

```css
box-shadow:
  0 2px 2px -1px rgb(10 13 18 / 4%),
  0 4px 6px -2px rgb(10 13 18 / 3%),
  0 12px 16px -4px rgb(10 13 18 / 8%);
```

## React Implementation

```tsx
import type { HTMLAttributes } from 'react'
import './BlinkXToast.css'

export type BlinkXToastTheme = 'light' | 'dark'
export type BlinkXToastType = 'negative' | 'positive'

export type BlinkXToastProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
  actionText?: string
  onActionClick?: () => void
  onClose?: () => void
  showSupportingText?: boolean
  supportingText?: string
  theme?: BlinkXToastTheme
  title?: string
  trailingText?: boolean
  type?: BlinkXToastType
}

export function Example() {
  return (
    <BlinkXToast
      type="negative"
      theme="light"
      showSupportingText
      trailingText={false}
      title="Order rejected : Market order not allowed in AMO"
      supportingText="Tooltips are used to describe or identify an  element. In most scenarios, tooltips help the user understand meaning, function or alt-text."
    />
  )
}
```

## Component CSS

```css
.blinkx-toast {
  --toast-accent: #dd2006;
  --toast-action-text: #171efd;
  --toast-action-text-hover: #181ea6;
  --toast-close-bg: #f2f2f2;
  --toast-close-bg-hover: #e7e7e7;
  --toast-close-icon: #414143;
  --toast-icon: #dd2006;
  --toast-radius: 8px;
  --toast-stroke: #f2f2f2;
  --toast-supporting-text: #666666;
  --toast-surface: #ffffff;
  --toast-title: #41414e;
  align-items: center;
  background: var(--toast-surface);
  border: 1px solid var(--toast-stroke);
  border-radius: var(--toast-radius);
  box-shadow:
    0 2px 2px -1px rgb(10 13 18 / 4%),
    0 4px 6px -2px rgb(10 13 18 / 3%),
    0 12px 16px -4px rgb(10 13 18 / 8%);
  color: var(--toast-title);
  display: inline-flex;
  font-family: Barlow, sans-serif;
  gap: 9px;
  max-width: 100%;
  padding: 12px;
  position: relative;
  width: 384px;
}

.blinkx-toast--supporting-text {
  --toast-radius: 12px;
}

.blinkx-toast--trailing-text {
  width: 413px;
}

.blinkx-toast--theme-dark {
  --toast-action-text: #9b9efe;
  --toast-action-text-hover: #bcbeff;
  --toast-close-bg: #272a2f;
  --toast-close-bg-hover: #33373b;
  --toast-close-icon: #999999;
  --toast-stroke: #272a2f;
  --toast-supporting-text: #b2b2b3;
  --toast-surface: #23282e;
  --toast-title: #cacace;
}

.blinkx-toast--type-positive {
  --toast-accent: #2bb02b;
  --toast-icon: #2bb02b;
}

.blinkx-toast--theme-dark.blinkx-toast--type-negative {
  --toast-accent: #cd4937;
  --toast-icon: #cd4937;
}

.blinkx-toast--theme-dark.blinkx-toast--type-positive {
  --toast-accent: #48a848;
  --toast-icon: #2bb02b;
}

.blinkx-toast__action:hover {
  color: var(--toast-action-text-hover);
}

.blinkx-toast__close:hover {
  background: var(--toast-close-bg-hover);
}
```

## Accessibility

- Negative toast uses `role="alert"` because it communicates an error condition.
- Positive toast uses `role="status"` because it communicates a non-blocking success state.
- The close control is a semantic `button` with `aria-label="Close toast"`.
- The trailing action is a semantic `button`.
- Decorative status and close SVG paths are marked `aria-hidden`.

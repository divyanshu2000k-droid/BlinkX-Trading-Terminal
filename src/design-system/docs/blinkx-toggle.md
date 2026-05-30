# blinkX Design System V1 - Toggle

Generated from `src/components/Toggle.stories.tsx`, `src/components/BlinkXToggle.tsx`, and `src/components/BlinkXToggle.css` so the downloadable markdown matches the Storybook Toggle page.

## Component

`BlinkXToggle` is the switch/toggle component. It supports two sizes, four visual states, light/dark themes, native checkbox semantics, click-to-active interaction in Storybook Preview, and a reset affordance after interaction.

```tsx
import { BlinkXToggle } from './BlinkXToggle'
import './BlinkXToggle.css'

export function Example() {
  return <BlinkXToggle size="sm" state="default" theme="light" />
}
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `size` | `"sm" \| "md"` | `"sm"` | Controls track size, thumb size, thumb travel, and focus ring bounds. |
| `state` | `"Active" \| "Focused" \| "default" \| "disable"` | `"default"` | Controls visual state. `disable` also disables the native input. |
| `theme` | `"light" \| "dark"` | `"light"` | Uses light or dark Figma token values. |
| `checked` | `boolean` | `state === "Active"` | Optional controlled checked state. |
| `onChange` | `(event) => void` | `undefined` | Enables interaction. When omitted, input is read-only. |
| `aria-label` | `string` | `"Toggle"` | Accessible name for the hidden native checkbox input. |
| `className` | `string` | `""` | Optional class appended to the root. |

## Figma Component Set

| Item | Value |
| --- | --- |
| Figma node | `6145:46579` |
| Component | `Toggle` |
| Storybook title | `Components / Toggle` |
| Component properties | `Size`, `States`, `Theme` |
| Sizes | `sm`, `md` |
| States | `Active`, `Focused`, `default`, `disable` |
| Themes | `light`, `dark` |
| Variant frame | `50px` x `50px` |

## Size Specs

| Size | Frame | Track | Track padding | Thumb | Active thumb travel | Focus ring bounds |
| --- | --- | --- | --- | --- | --- | --- |
| `sm` | `50px` / `3.125rem` | `32px` x `16px` / `2rem` x `1rem` | `2px` / `0.125rem` | `12px` / `0.75rem` | `16px` / `1rem` | `38px` x `22px` / `2.375rem` x `1.375rem` |
| `md` | `50px` / `3.125rem` | `40px` x `20px` / `2.5rem` x `1.25rem` | `2px` / `0.125rem` | `16px` / `1rem` | `20px` / `1.25rem` | `46px` x `26px` / `2.875rem` x `1.625rem` |

## Shared Layout

| Property | Value |
| --- | --- |
| Root display | `inline-flex` |
| Root frame | `50px` x `50px` |
| Root alignment | Centered |
| Root overflow | Visible, for focus ring |
| Track display | `inline-flex` |
| Track radius | `9999px` / `radius-toggle` |
| Track padding | `2px` |
| Thumb radius | `9999px` / `radius-toggle` |
| Focus ring stroke | `3px solid` focus token |
| Track transition | `background 180ms cubic-bezier(0.2, 0, 0, 1)`, `opacity 180ms ease` |
| Thumb transition | `background 180ms ease`, `box-shadow 180ms ease`, `transform 220ms cubic-bezier(0.2, 0, 0, 1)` |
| Hidden input | `1px`, absolute, opacity `0`, pointer events disabled |

## Light Theme Tokens

| Usage | Value | Figma variable |
| --- | --- | --- |
| Default track fill | `#9D9D9D` | `Color/background/toggle/bg-toggle-default -> Colors/neutral/Light/neutral-400` |
| Active track fill | `#171EFD` | `Color/background/toggle/bg-toggle-active -> Colors/brand/Light/brand-500` |
| Disabled track fill | `#E7E7E7` | `Color/background/toggle/bg-toggle-disabled -> Colors/neutral/Light/neutral-100` |
| Thumb fill | `#FFFFFF` | `Colors/base/white` |
| Disabled thumb fill | `#FFFFFF` | `Color/background/toggle/bg-toggle_circle-disabled -> Colors/base/white` |
| Focus ring | `#D1D2FF` | `Color/background/brand/bg-brand-focus_ring -> Colors/brand/Light/brand-100` |
| Surface | `#FFFFFF` | `Color/Surface - Elevation/surface 1 -> Colors/surface/Light/1` |

## Dark Theme Tokens

| Usage | Value | Figma variable |
| --- | --- | --- |
| Default track fill | `#66686A` | `Color/background/toggle/bg-toggle-default -> Colors/neutral/Dark/neutral-300` |
| Active track fill | `#585DFE` | `Color/background/toggle/bg-toggle-active -> Colors/brand/Dark/brand-500` |
| Disabled track fill | `#4D4F52` | `Color/background/toggle/bg-toggle-disabled -> Colors/neutral/Dark/neutral-200` |
| Thumb fill | `#FFFFFF` | `Colors/base/white` |
| Disabled thumb fill | `#ADADAD` | `Color/background/toggle/bg-toggle_circle-disabled -> Colors/neutral/Dark/neutral-600` |
| Focus ring | `#3F44A6` | `Color/background/brand/bg-brand-focus_ring -> Colors/brand/Dark/brand-300` |
| Surface | `#1A1E23` | `Color/Surface - Elevation/surface 1 -> Colors/surface/Dark/1` |

## Effect Tokens

| Usage | Value |
| --- | --- |
| Thumb shadow 1 | `0 2px 4px -2px rgb(10 13 18 / 6%)` |
| Thumb shadow 2 | `0 4px 6px -1px rgb(10 13 18 / 10%)` |
| Disabled thumb shadow | `none` |

## State Rules

| State | Track fill | Thumb fill | Thumb position | Focus ring | Cursor |
| --- | --- | --- | --- | --- | --- |
| `default` | Default track token | Thumb token | `translateX(0)` | Hidden | `pointer` |
| `Active` | Active track token | Thumb token | `translateX(16px)` for `sm`, `translateX(20px)` for `md` | Hidden | `pointer` |
| `Focused` | Default track token | Thumb token | `translateX(0)` | Visible | `pointer` |
| `disable` | Disabled track token | Disabled thumb token | `translateX(0)` | Hidden | `not-allowed` |

## Interaction Rules

| Interaction | Behavior |
| --- | --- |
| Click while enabled | Toggles between `default` and `Active`. |
| Click while `disable` | No state change. |
| Reset button | Appears after interaction and restores `default`. |
| Native input | Uses `type="checkbox"` with `aria-checked` synced to the resolved checked state. |

## Core CSS

```css
.blinkx-toggle {
  --toggle-bg-default: #9d9d9d;
  --toggle-bg-active: #171efd;
  --toggle-bg-disabled: #e7e7e7;
  --toggle-circle: #ffffff;
  --toggle-circle-disabled: #ffffff;
  --toggle-focus-ring: #d1d2ff;
  --toggle-frame-size: 50px;
  --toggle-focus-ring-width: 3px;
  --toggle-offset: 2px;
  --toggle-radius: 9999px;
  --toggle-shadow-1: rgb(10 13 18 / 6%);
  --toggle-shadow-2: rgb(10 13 18 / 10%);
  --toggle-thumb-size: 12px;
  --toggle-thumb-translate: 0;
  --toggle-track-bg: var(--toggle-bg-default);
  --toggle-track-height: 16px;
  --toggle-track-width: 32px;
  align-items: center;
  cursor: pointer;
  display: inline-flex;
  height: var(--toggle-frame-size);
  justify-content: center;
  overflow: visible;
  position: relative;
  width: var(--toggle-frame-size);
}
```

## Size CSS

```css
.blinkx-toggle--size-sm {
  --toggle-thumb-size: 12px;
  --toggle-thumb-translate: 16px;
  --toggle-track-height: 16px;
  --toggle-track-width: 32px;
}

.blinkx-toggle--size-md {
  --toggle-thumb-size: 16px;
  --toggle-thumb-translate: 20px;
  --toggle-track-height: 20px;
  --toggle-track-width: 40px;
}
```

## State CSS

```css
.blinkx-toggle--state-active {
  --toggle-track-bg: var(--toggle-bg-active);
}

.blinkx-toggle--state-focused {
  --toggle-track-bg: var(--toggle-bg-default);
}

.blinkx-toggle--state-disable {
  --toggle-track-bg: var(--toggle-bg-disabled);
  cursor: not-allowed;
}

.blinkx-toggle--state-focused .blinkx-toggle__track::before {
  opacity: 1;
}

.blinkx-toggle--state-active .blinkx-toggle__thumb {
  transform: translateX(var(--toggle-thumb-translate));
}

.blinkx-toggle--state-disable .blinkx-toggle__thumb {
  background: var(--toggle-circle-disabled);
  box-shadow: none;
}
```

## Dark Theme CSS

```css
.blinkx-toggle--theme-dark {
  --toggle-bg-default: #66686a;
  --toggle-bg-active: #585dfe;
  --toggle-bg-disabled: #4d4f52;
  --toggle-circle-disabled: #adadad;
  --toggle-focus-ring: #3f44a6;
}
```

## Component Markup

```tsx
<label className="blinkx-toggle blinkx-toggle--size-sm blinkx-toggle--state-default blinkx-toggle--theme-light">
  <input
    aria-checked={false}
    aria-label="Toggle"
    checked={false}
    className="blinkx-toggle__input"
    readOnly
    type="checkbox"
  />
  <span className="blinkx-toggle__track" aria-hidden="true">
    <span className="blinkx-toggle__thumb" />
  </span>
</label>
```

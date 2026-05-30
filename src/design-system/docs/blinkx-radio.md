# blinkX Design System V1 - Radio

Generated from `src/components/Radio.stories.tsx` and `src/components/BlinkXRadio.css` so the downloadable markdown matches the Storybook Radio page.

## Component

`BlinkXRadio` is the single radio control component. It supports three sizes, four visual states, light/dark themes, click-to-active interaction in Storybook Preview, and a reset affordance after interaction.

```tsx
import { BlinkXRadio } from './BlinkXRadio'
import './BlinkXRadio.css'

export function Example() {
  return <BlinkXRadio size="sm" state="Default" theme="light" />
}
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `size` | `"sm" \| "md" \| "lg"` | `"sm"` | Controls control size, active dot size, focus ring size, and stroke width. |
| `state` | `"Active" \| "Default" \| "Disable" \| "Focused"` | `"Default"` | Controls visual state. `Disable` also disables the native input. |
| `theme` | `"light" \| "dark"` | `"light"` | Uses light or dark Figma token values. |
| `checked` | `boolean` | `state === "Active"` | Optional controlled checked state. |
| `onChange` | `(event) => void` | `undefined` | Enables interaction. When omitted, input is read-only. |
| `aria-label` | `string` | `"Radio"` | Accessible name for the hidden native radio input. |

## Figma Component Set

| Item | Value |
| --- | --- |
| Figma node | `32:387` |
| Component | `Radio` |
| Variants | `Size`, `State`, `Theme` |
| Sizes | `sm`, `md`, `lg` |
| States | `Active`, `Default`, `Disable`, `Focused` |
| Themes | `light`, `dark` |

## Size Specs

| Size | Control size | Active dot | Focus ring outer size | Default stroke | Focused stroke |
| --- | --- | --- | --- | --- | --- |
| `sm` | `16px` / `1rem` | `10px` / `0.625rem` | `22px` / `1.375rem` | `1.25px` | `2px` |
| `md` | `20px` / `1.25rem` | `12px` / `0.75rem` | `26px` / `1.625rem` | `1.5px` | `2px` |
| `lg` | `24px` / `1.5rem` | `16px` / `1rem` | `30px` / `1.875rem` | `1.5px` | `2px` |

## Shared Layout

| Property | Value |
| --- | --- |
| Display | `inline-flex` |
| Radius | `9999px` / `radius-round` |
| Control background | Transparent unless disabled |
| Focus ring | `3px solid` focus token |
| Dot transition | `opacity 160ms ease`, `transform 180ms cubic-bezier(0.2, 0, 0, 1)` |
| Control transition | `background 160ms ease`, `border-color 160ms ease` |
| Hidden input | `1px`, absolute, opacity `0` |

## Light Theme Tokens

| Usage | Value | Figma variable |
| --- | --- | --- |
| Brand stroke / active dot | `#171EFD` | `Color/background/brand/bg-brand-default -> Colors/brand/Light/brand-500` |
| Focus ring | `#D1D2FF` | `Color/background/brand/bg-brand-focus_ring -> Colors/brand/Light/brand-100` |
| Default stroke | `#414143` | `Color/icons/icon-primary -> Colors/misc/Light/Icon-p` |
| Disabled background | `#E7E7E7` | `Color/background/brand/bg-brand-disable -> Colors/neutral/Light/neutral-100` |
| Disabled stroke | `#CECECE` | `Color/icons/icon-disabled -> Colors/neutral/Light/neutral-200` |
| Surface | `#FFFFFF` | `Color/Surface - Elevation/surface 1 -> Colors/surface/Light/1` |

## Dark Theme Tokens

| Usage | Value | Figma variable |
| --- | --- | --- |
| Brand stroke / active dot | `#585DFE` | `Color/background/brand/bg-brand-default -> Colors/brand/Dark/brand-500` |
| Focus ring | `#3F44A6` | `Color/background/brand/bg-brand-focus_ring -> Colors/brand/Dark/brand-300` |
| Default stroke | `#999999` | `Color/icons/icon-primary -> Colors/neutral/Dark/neutral-500` |
| Disabled background | `#33373B` | `Color/background/brand/bg-brand-disable -> Colors/neutral/Dark/neutral-100` |
| Disabled stroke | `#4D4F52` | `Color/icons/icon-disabled -> Colors/neutral/Dark/neutral-200` |
| Surface | `#1A1E23` | `Color/Surface - Elevation/surface 1 -> Colors/surface/Dark/1` |

## State Rules

| State | Control | Dot | Focus ring | Cursor |
| --- | --- | --- | --- | --- |
| `Default` | Transparent fill, icon-primary stroke | Hidden, scale `0.45` | Hidden | `pointer` |
| `Active` | Transparent fill, brand stroke | Brand fill, opacity `1`, scale `1` | Hidden | `pointer` |
| `Focused` | Transparent fill, brand stroke, `2px` stroke | Hidden, scale `0.45` | Visible | `pointer` |
| `Disable` | Disabled fill, disabled stroke | Hidden, scale `0.45` | Hidden | `not-allowed` |

## Core CSS

```css
.blinkx-radio {
  --radio-brand: #171efd;
  --radio-focus-ring: #d1d2ff;
  --radio-icon-primary: #414143;
  --radio-bg-disabled: #e7e7e7;
  --radio-icon-disabled: #cecece;
  --radio-size: 16px;
  --radio-dot-size: 10px;
  --radio-focus-ring-size: 22px;
  --radio-stroke-width: 1.25px;
  --radio-focused-stroke-width: 2px;
  --radio-border: var(--radio-icon-primary);
  --radio-bg: transparent;
  --radio-dot-bg: transparent;
}
```

## State CSS

```css
.blinkx-radio--state-active {
  --radio-border: var(--radio-brand);
  --radio-dot-bg: var(--radio-brand);
}

.blinkx-radio--state-focused {
  --radio-border: var(--radio-brand);
  --radio-stroke-width: var(--radio-focused-stroke-width);
}

.blinkx-radio--state-disable {
  --radio-bg: var(--radio-bg-disabled);
  --radio-border: var(--radio-icon-disabled);
  cursor: not-allowed;
}

.blinkx-radio--state-focused::before {
  opacity: 1;
}

.blinkx-radio--state-active .blinkx-radio__dot {
  opacity: 1;
  transform: scale(1);
}
```

## Dark Theme CSS

```css
.blinkx-radio--theme-dark {
  --radio-brand: #585dfe;
  --radio-focus-ring: #3f44a6;
  --radio-icon-primary: #999999;
  --radio-bg-disabled: #33373b;
  --radio-icon-disabled: #4d4f52;
}
```

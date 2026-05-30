# blinkX Design System V1 - Checkbox

Generated from `src/components/Checkbox.stories.tsx`, `src/components/BlinkXCheckbox.tsx`, and `src/components/BlinkXCheckbox.css` so the downloadable markdown matches the Storybook Checkbox page.

## Component

`BlinkXCheckbox` is the single checkbox control component. It supports three sizes, seven visual states, light/dark themes, checked and indeterminate mark rendering, hover behavior, click-to-active interaction in Storybook Preview, and a reset affordance after interaction.

```tsx
import { BlinkXCheckbox } from './BlinkXCheckbox'
import './BlinkXCheckbox.css'

export function Example() {
  return <BlinkXCheckbox size="sm" state="Default" theme="light" />
}
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `size` | `"sm" \| "md" \| "lg"` | `"sm"` | Controls control size, icon size, stroke width, radius, and focus ring size. |
| `state` | `"Default" \| "Focused" \| "Active" \| "Interminate" \| "Disable" \| "default-hover" \| "Active-Hover"` | `"Default"` | Controls visual state. `Interminate` maps to native `indeterminate`; `Disable` disables the native input. |
| `theme` | `"light" \| "dark"` | `"light"` | Uses light or dark Figma token values. |
| `checked` | `boolean` | Active states resolve checked | Optional controlled checked state. |
| `onChange` | `(event) => void` | `undefined` | Enables interaction. When omitted, input is read-only. |
| `aria-label` | `string` | `"Checkbox"` | Accessible name for the hidden native checkbox input. |

## Figma Component Set

| Item | Value |
| --- | --- |
| Figma node | `6124:46055` |
| Component | `Checkbox` |
| Variants | `Size`, `State`, `Theme` |
| Sizes | `sm`, `md`, `lg` |
| States | `Default`, `Focused`, `Active`, `Interminate`, `Disable`, `default-hover`, `Active-Hover` |
| Themes | `light`, `dark` |

## Size Specs

| Size | Control size | Radius | Default stroke | Icon frame | Mark stroke | Focus ring outer size | Focus ring radius |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `sm` | `16px` / `1rem` | `4px` / `0.25rem` | `1.25px` | `10px` / `0.625rem` | `1.25px` | `22px` / `1.375rem` | `7px` / `0.4375rem` |
| `md` | `20px` / `1.25rem` | `6px` / `0.375rem` | `1.5px` | `12px` / `0.75rem` | `1.5px` | `0px` / `0rem` | `0px` / `0rem` |
| `lg` | `24px` / `1.5rem` | `6px` / `0.375rem` | `1.5px` | `16px` / `1rem` | `2px` | `30px` / `1.875rem` | `9px` / `0.5625rem` |

## SVG Mark Geometry

| Size | Check path | Minus path |
| --- | --- | --- |
| `sm` | `M1.5625 5.3125L4.0625 7.8125L8.75 2.8125` | `M1.5 5H8.5` |
| `md` | `M1.875 6.375L4.875 9.375L10.5 3.375` | `M1.745 6H10.273` |
| `lg` | `M2.5 8.5L6.5 12.5L14 4.5` | `M2.5 8H13.5` |

## Shared Layout

| Property | Value |
| --- | --- |
| Display | `inline-flex` |
| Alignment | Centered horizontally and vertically |
| Base background | Transparent |
| Base border | Icon-primary token |
| Focus ring | `3px solid` focus token |
| Icon color | `#FFFFFF` |
| Icon hidden transform | `translate(-50%, -50%) scale(0.75)` |
| Icon active transform | `translate(-50%, -50%) scale(1)` |
| Control transition | `background 160ms ease`, `border-color 160ms ease` |
| Icon transition | `opacity 160ms ease`, `transform 180ms cubic-bezier(0.2, 0, 0, 1)` |
| Hidden input | `1px`, absolute, opacity `0`, pointer events disabled |

## Light Theme Tokens

| Usage | Value | Figma variable |
| --- | --- | --- |
| Brand active fill | `#171EFD` | `Color/background/brand/bg-brand-default -> Colors/brand/Light/brand-500` |
| Brand active hover fill | `#181ED1` | `Color/background/brand/bg-brand-hover_prime-cta -> Colors/brand/Light/brand-600` |
| Disabled fill | `#E7E7E7` | `Color/background/brand/bg-brand-disable -> Colors/neutral/Light/neutral-100` |
| Focus ring | `#D1D2FF` | `Color/background/brand/bg-brand-focus_ring -> Colors/brand/Light/brand-100` |
| Hover interaction fill | `#F2F2F2` | `Color/Interation/hover/interaction-hover-1 -> Colors/neutral/Light/neutral-50` |
| Disabled icon / border | `#CECECE` | `Color/icons/icon-disabled -> Colors/neutral/Light/neutral-200` |
| Default icon / border | `#414143` | `Color/icons/icon-primary -> Colors/misc/Light/Icon-p` |
| Check / minus icon | `#FFFFFF` | `Color/Icon/icon-White -> Colors/generic/white` |
| Focused stroke brand | `#171EFD` | `Color/Border/stroke-brand -> Colors/primary/primary-500` |
| Surface | `#FFFFFF` | `Color/Surface - Elevation/surface 1 -> Colors/surface/Light/1` |

## Dark Theme Tokens

| Usage | Value | Figma variable |
| --- | --- | --- |
| Brand active fill | `#585DFE` | `Color/background/brand/bg-brand-default -> Colors/brand/Dark/brand-500` |
| Brand active hover fill | `#4C50D2` | `Color/background/brand/bg-brand-hover_prime-cta -> Colors/brand/Dark/brand-400` |
| Disabled fill | `#33373B` | `Color/background/brand/bg-brand-disable -> Colors/neutral/Dark/neutral-100` |
| Focus ring | `#3F44A6` | `Color/background/brand/bg-brand-focus_ring -> Colors/brand/Dark/brand-300` |
| Hover interaction fill | `#33373B` | `Color/Interation/hover/interaction-hover-1 -> Colors/neutral/Dark/neutral-100` |
| Disabled icon / border | `#4D4F52` | `Color/icons/icon-disabled -> Colors/neutral/Dark/neutral-200` |
| Default icon / border | `#999999` | `Color/icons/icon-primary -> Colors/neutral/Dark/neutral-500` |
| Check / minus icon | `#FFFFFF` | `Color/Icon/icon-White -> Colors/generic/white` |
| Focused stroke brand | `#5C60F5` | `Color/Border/stroke-brand -> Colors/primary/primary-450` |
| Surface | `#1A1E23` | `Color/Surface - Elevation/surface 1 -> Colors/surface/Dark/1` |

## State Rules

| State | Fill | Border | Check mark | Minus mark | Focus ring | Cursor |
| --- | --- | --- | --- | --- | --- | --- |
| `Default` | Transparent | Icon-primary token | Hidden | Hidden | Hidden | `pointer` |
| `Focused` | Transparent | Stroke-brand token | Hidden | Hidden | Visible (`sm` and `lg`; `md` ring size resolves `0px`) | `pointer` |
| `default-hover` | Hover interaction token | Icon-primary token | Hidden | Hidden | Hidden | `pointer` |
| `Active` | Brand default token | Transparent, `0px` border | Visible | Hidden | Hidden | `pointer` |
| `Active-Hover` | Brand hover token | Transparent, `0px` border | Visible | Hidden | Hidden | `pointer` |
| `Interminate` | Brand default token | Transparent, `0px` border | Hidden | Visible | Hidden | `pointer` |
| `Disable` | Disabled fill token | Disabled icon token | Hidden | Hidden | Hidden | `not-allowed` |

## Interaction Rules

| Interaction | Behavior |
| --- | --- |
| Hover on `Default` | Changes to `default-hover` in Storybook Preview and CSS hover. |
| Hover on `Active` | Changes to `Active-Hover` in Storybook Preview and CSS hover. |
| Mouse leave from `default-hover` | Returns to `Default`. |
| Mouse leave from `Active-Hover` | Returns to `Active`. |
| Click while enabled | Toggles between inactive and active. |
| Click while `Disable` | No state change. |
| Reset button | Appears after interaction and restores `Default`. |

## Core CSS

```css
.blinkx-checkbox {
  --checkbox-brand-default: #171efd;
  --checkbox-brand-hover: #181ed1;
  --checkbox-focus-ring: #d1d2ff;
  --checkbox-hover-bg: #f2f2f2;
  --checkbox-icon-primary: #414143;
  --checkbox-icon-white: #ffffff;
  --checkbox-stroke-brand: #171efd;
  --checkbox-bg-disabled: #e7e7e7;
  --checkbox-icon-disabled: #cecece;
  --checkbox-size: 16px;
  --checkbox-radius: 4px;
  --checkbox-icon-size: 10px;
  --checkbox-focus-ring-size: 22px;
  --checkbox-focus-ring-radius: 7px;
  --checkbox-stroke-width: 1.25px;
  --checkbox-border-width: var(--checkbox-stroke-width);
  --checkbox-bg: transparent;
  --checkbox-border: var(--checkbox-icon-primary);
  --checkbox-minus-opacity: 0;
  --checkbox-check-opacity: 0;
  align-items: center;
  cursor: pointer;
  display: inline-flex;
  height: var(--checkbox-size);
  justify-content: center;
  overflow: visible;
  position: relative;
  width: var(--checkbox-size);
}
```

## Size CSS

```css
.blinkx-checkbox--size-sm {
  --checkbox-size: 16px;
  --checkbox-radius: 4px;
  --checkbox-icon-size: 10px;
  --checkbox-focus-ring-size: 22px;
  --checkbox-focus-ring-radius: 7px;
  --checkbox-stroke-width: 1.25px;
}

.blinkx-checkbox--size-md {
  --checkbox-size: 20px;
  --checkbox-radius: 6px;
  --checkbox-icon-size: 12px;
  --checkbox-focus-ring-size: 0px;
  --checkbox-focus-ring-radius: 0px;
  --checkbox-stroke-width: 1.5px;
}

.blinkx-checkbox--size-lg {
  --checkbox-size: 24px;
  --checkbox-radius: 6px;
  --checkbox-icon-size: 16px;
  --checkbox-focus-ring-size: 30px;
  --checkbox-focus-ring-radius: 9px;
  --checkbox-stroke-width: 1.5px;
}
```

## State CSS

```css
.blinkx-checkbox--state-focused {
  --checkbox-border: var(--checkbox-stroke-brand);
  --checkbox-focus-ring-opacity: 1;
}

.blinkx-checkbox--state-default-hover {
  --checkbox-bg: var(--checkbox-hover-bg);
}

.blinkx-checkbox--state-active,
.blinkx-checkbox--state-interminate {
  --checkbox-bg: var(--checkbox-brand-default);
  --checkbox-border: transparent;
  --checkbox-border-width: 0px;
}

.blinkx-checkbox--state-active-hover {
  --checkbox-bg: var(--checkbox-brand-hover);
  --checkbox-border: transparent;
  --checkbox-border-width: 0px;
}

.blinkx-checkbox--state-active,
.blinkx-checkbox--state-active-hover {
  --checkbox-check-opacity: 1;
}

.blinkx-checkbox--state-interminate {
  --checkbox-minus-opacity: 1;
}

.blinkx-checkbox--state-disable {
  --checkbox-bg: var(--checkbox-bg-disabled);
  --checkbox-border: var(--checkbox-icon-disabled);
  cursor: not-allowed;
}
```

## Dark Theme CSS

```css
.blinkx-checkbox--theme-dark {
  --checkbox-brand-default: #585dfe;
  --checkbox-brand-hover: #4c50d2;
  --checkbox-focus-ring: #3f44a6;
  --checkbox-hover-bg: #33373b;
  --checkbox-icon-primary: #999999;
  --checkbox-stroke-brand: #5c60f5;
  --checkbox-bg-disabled: #33373b;
  --checkbox-icon-disabled: #4d4f52;
}
```

## Mark SVG

```tsx
<svg className="blinkx-checkbox__icon blinkx-checkbox__icon--check" fill="none" viewBox="0 0 16 16">
  <path
    d="M2.5 8.5L6.5 12.5L14 4.5"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
  />
</svg>

<svg className="blinkx-checkbox__icon blinkx-checkbox__icon--minus" fill="none" viewBox="0 0 16 16">
  <path
    d="M2.5 8H13.5"
    stroke="currentColor"
    strokeLinecap="round"
    strokeWidth={2}
  />
</svg>
```

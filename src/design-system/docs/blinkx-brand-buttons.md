# blinkX Design System V1 - Brand Buttons

Generated from `src/components/Buttons.stories.tsx` and `src/components/BlinkXButton.css` so the downloadable markdown matches the Storybook Brand button page.

## Component

`BlinkXButton` is the brand CTA component used for primary actions, secondary actions, and icon-supported actions.

```tsx
import { BlinkXButton } from './BlinkXButton'
import './BlinkXButton.css'

export function Example() {
  return (
    <BlinkXButton
      label="Button"
      size="lg"
      state="Default"
      theme="light"
      type="Primary"
    />
  )
}
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `label` | `string` | `"Button"` | Visible CTA text. Text hugs content and does not truncate. |
| `type` | `"Primary" \| "Secondary" \| "with-icon"` | `"Primary"` | Controls visual hierarchy and icon behavior. |
| `size` | `"sm" \| "md" \| "lg" \| "xl" \| "2xl"` | `"sm"` | Controls height, type size, padding, and icon size. |
| `state` | `"Default" \| "Hover" \| "Focused" \| "Disabled"` | `"Default"` | Storybook state preview. `Disabled` also disables the native button. |
| `theme` | `"light" \| "dark"` | `"light"` | Uses light or dark Figma token values. |
| `leadingIcon` | `boolean` | `true` | Only applies to `type="with-icon"` unless `leadingIconNode` is passed. |
| `trailingIcon` | `boolean` | `true` | Only applies to `type="with-icon"` unless `trailingIconNode` is passed. |
| `leadingIconNode` | `ReactNode` | `undefined` | Optional custom leading icon slot. |
| `trailingIconNode` | `ReactNode` | `undefined` | Optional custom trailing icon slot. |
| `htmlType` | `"button" \| "submit" \| "reset"` | `"button"` | Native button type. |

## Type Behavior

| Type | Background | Border | Text | Icon |
| --- | --- | --- | --- | --- |
| `Primary` | Brand fill | Transparent | White CTA text | Bolt icon after text |
| `Secondary` | Transparent by default | Brand stroke | Brand text | No default icon |
| `with-icon` | Transparent by default | Brand stroke | Brand text | Plus icon before and/or after text |

## Size Specs

| Size | Height | Padding left | Padding right | Font size | Line height | Bolt icon | Plus icon |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `sm` | `24px` / `1.5rem` | `12px` / `0.75rem` | `8px` / `0.5rem` | `12px` / `0.75rem` | `16px` / `1rem` | `16px` / `1rem` | `12px` / `0.75rem` |
| `md` | `32px` / `2rem` | `12px` / `0.75rem` | `8px` / `0.5rem` | `12px` / `0.75rem` | `16px` / `1rem` | `16px` / `1rem` | `16px` / `1rem` |
| `lg` | `36px` / `2.25rem` | `16px` / `1rem` | `8px` / `0.5rem` | `14px` / `0.875rem` | `20px` / `1.25rem` | `20px` / `1.25rem` | `16px` / `1rem` |
| `xl` | `40px` / `2.5rem` | `16px` / `1rem` | `12px` / `0.75rem` | `16px` / `1rem` | `24px` / `1.5rem` | `24px` / `1.5rem` | `20px` / `1.25rem` |
| `2xl` | `48px` / `3rem` | `20px` / `1.25rem` | `16px` / `1rem` | `18px` / `1.125rem` | `24px` / `1.5rem` | `24px` / `1.5rem` | `20px` / `1.25rem` |

## Shared Layout

| Property | Value |
| --- | --- |
| Width | `auto`, hug content |
| Min width | none |
| Border radius | `9999px` |
| Padding top | `4px` / `0.25rem` |
| Padding bottom | `4px` / `0.25rem` |
| Primary gap | `8px` / `0.5rem` |
| With-icon gap | `4px` / `0.25rem` |
| With-icon base horizontal padding | `10px` / `0.625rem` |
| With-icon one-sided icon optical padding | `12px` / `0.75rem` on the opposite side |
| Font family | `Barlow`, fallback sans-serif |
| Font weight | `600` / SemiBold |
| Letter spacing | `0` |
| Text alignment | center |
| Text overflow | visible, no truncation |

## Light Theme Tokens

| Usage | Value | Figma variable |
| --- | --- | --- |
| Brand CTA background default | `#171EFD` | `Colors/brand/Light/brand-500` |
| Brand CTA background hover | `#181ED1` | `Colors/brand/Light/brand-600` |
| Secondary CTA hover background | `#E7E8FE` | `Colors/brand/Light/brand-50` |
| Disabled background | `#E7E7E7` | `Colors/neutral/Light/neutral-100` |
| Focus ring | `#D1D2FF` | `Colors/brand/Light/brand-100` |
| Brand stroke | `#171EFD` | `Colors/brand/Light/brand-500` |
| Disabled stroke | `#CECECE` | `Colors/neutral/Light/neutral-200` |
| Brand text | `#171EFD` | `Colors/brand/Light/brand-500` |
| White CTA text | `#FFFFFF` | `Colors/base/white` |
| Disabled CTA text | `#9D9D9D` | `Colors/neutral/Light/neutral-400` |
| White CTA icon | `#FFFFFF` | `Colors/base/white` |
| Disabled primary icon | `#9D9D9D` | `Colors/neutral/Light/neutral-400` |
| Disabled secondary icon | `#CECECE` | `Colors/neutral/Light/neutral-200` |

## Dark Theme Tokens

| Usage | Value | Figma variable |
| --- | --- | --- |
| Brand CTA background default | `#585DFE` | `Colors/brand/Dark/brand-500` |
| Brand CTA background hover | `#4C50D2` | `Colors/brand/Dark/brand-400` |
| Secondary CTA hover background | `#202439` | `Colors/brand/Dark/brand-50` |
| Disabled background | `#33373B` | `Colors/neutral/Dark/neutral-100` |
| Focus ring | `#3F44A6` | `Colors/brand/Dark/brand-300` |
| Brand stroke | `#585DFE` | `Colors/brand/Dark/brand-500` |
| Disabled stroke | `#4D4F52` | `Colors/neutral/Dark/neutral-200` |
| Brand text | `#585DFE` | `Colors/brand/Dark/brand-500` |
| White CTA text | `#FFFFFF` | `Colors/base/white` |
| Disabled CTA text | `#808081` | `Colors/neutral/Dark/neutral-400` |
| White CTA icon | `#FFFFFF` | `Colors/base/white` |
| Disabled primary icon | `#808081` | `Colors/neutral/Dark/neutral-400` |
| Disabled secondary icon | `#4D4F52` | `Colors/neutral/Dark/neutral-200` |

## State Rules

| State | Primary | Secondary / with-icon |
| --- | --- | --- |
| `Default` | Uses brand fill, white text, white bolt icon. | Transparent fill, brand stroke, brand text/icon. |
| `Hover` | Background changes to brand hover. | Background changes to secondary hover fill. |
| `Focused` | Adds `3px` focus ring using theme focus token. | Adds `3px` focus ring using theme focus token. |
| `Disabled` | Disabled background, disabled text, disabled bolt color, `not-allowed` cursor. | Disabled stroke, disabled text, disabled icon color, `not-allowed` cursor. |

## Primary CTA CSS

```css
.blinkx-button.blinkx-button--type-primary {
  background: var(--button-bg-brand);
  border: 1px solid transparent;
  color: var(--button-text-on-primary);
  gap: 8px;
}

.blinkx-button.blinkx-button--type-primary:hover:not(:disabled),
.blinkx-button.blinkx-button--type-primary.blinkx-button--state-hover {
  background: var(--button-bg-brand-hover);
}

.blinkx-button.blinkx-button--type-primary:disabled {
  background: var(--button-bg-disabled);
  color: var(--button-text-disabled);
  cursor: not-allowed;
}

.blinkx-button__bolt {
  color: var(--button-icon-color);
  fill: currentColor;
}
```

## Secondary CTA CSS

```css
.blinkx-button.blinkx-button--type-secondary {
  background: transparent;
  border: 1px solid var(--button-stroke-brand);
  color: var(--button-text-brand);
  padding-right: var(--button-padding-left);
}

.blinkx-button.blinkx-button--type-secondary:hover:not(:disabled),
.blinkx-button.blinkx-button--type-secondary.blinkx-button--state-hover {
  background: var(--button-bg-secondary-hover);
}

.blinkx-button.blinkx-button--type-secondary:disabled {
  border-color: var(--button-stroke-disabled);
  color: var(--button-text-disabled);
  cursor: not-allowed;
}
```

## With Icon CTA CSS

```css
.blinkx-button.blinkx-button--type-with-icon {
  background: transparent;
  border: 1px solid var(--button-stroke-brand);
  color: var(--button-text-brand);
  gap: 4px;
  padding-left: 10px;
  padding-right: 10px;
}

.blinkx-button.blinkx-button--type-with-icon[data-leading-icon="on"][data-trailing-icon="off"] {
  padding-right: 12px;
}

.blinkx-button.blinkx-button--type-with-icon[data-leading-icon="off"][data-trailing-icon="on"] {
  padding-left: 12px;
}
```

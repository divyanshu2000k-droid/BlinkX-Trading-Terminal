# blinkX Design System V1 - Chips

Generated from `src/components/Chips.stories.tsx`, `src/components/BlinkXChip.tsx`, and `src/components/BlinkXChip.css` so the downloadable markdown matches the Storybook Chips page.

## Component

`BlinkXChip` is the chip component. It supports basic and number-chip variants, five visual states, three sizes, light/dark themes, editable chip text, editable number tag text, click-to-active interaction in Storybook Preview, and an optional leading logo for large number chips.

```tsx
import { useState } from 'react'
import { BlinkXChip } from './BlinkXChip'
import './BlinkXChip.css'

export function Example() {
  const [state, setState] = useState<'default' | 'active'>('default')

  return (
    <BlinkXChip
      type="chip-Number"
      state={state}
      size="md"
      label="Options"
      numberTagText="12"
      theme="light"
      onClick={() => setState('active')}
    />
  )
}
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `type` | `"Chip-basic" \| "chip-Number"` | `"Chip-basic"` | Controls whether the number tag is rendered. |
| `state` | `"active" \| "default" \| "disabled" \| "focused" \| "hover"` | `"default"` | Controls visual state. `disabled` disables the native button. |
| `size` | `"sm" \| "md" \| "lg"` | `"sm"` | Controls height, font size, padding, number-tag size, and spacing. |
| `theme` | `"light" \| "dark"` | `"light"` | Uses light or dark Figma token values. |
| `label` | `string` | `"Options"` | Main chip text. |
| `numberTagText` | `string` | `"12"` | Text inside the number tag for `chip-Number`. |
| `numberTagState` | `"Active" \| "Default" \| "Disabled"` | Derived from `state` | Optional override for the number tag visual state. |
| `showLeadingLogo` | `boolean` | `true` | Shows the leading logo only when `type="chip-Number"` and `size="lg"`. |
| `onClick` | `(event) => void` | `undefined` | Called when the button is clicked. |
| `disabled` | `boolean` | `false` | Native button disabled flag. Also true when `state="disabled"`. |
| `className` | `string` | `""` | Optional class appended to the root. |

## Figma Component Set

| Item | Value |
| --- | --- |
| Chip Figma node | `100:4519` |
| Number tag Figma node | `6155:51629` |
| Component | `Chips` |
| Storybook title | `Components / Chips` |
| Component properties | `Type`, `State`, `Size`, `Text on Basic chip`, `Text on chip-number`, `Number tag text`, `Show leading Logo`, `Theme` |
| Types | `Chip-basic`, `chip-Number` |
| States | `active`, `default`, `disabled`, `focused`, `hover` |
| Sizes | `sm`, `md`, `lg` |
| Themes | `light`, `dark` |

## Size Specs

| Size | Chip height | Font size | Line height | Basic padding | Number padding | Number gap |
| --- | --- | --- | --- | --- | --- | --- |
| `sm` | `24px` / `1.5rem` | `12px` / `0.75rem` | `16px` / `1rem` | `4px 12px` | `4px 4px 4px 8px` | `4px` / `0.25rem` |
| `md` | `32px` / `2rem` | `14px` / `0.875rem` | `20px` / `1.25rem` | `4px 12px` | `4px 6px 4px 10px` | `4px` / `0.25rem` |
| `lg` | `40px` / `2.5rem` | `14px` / `0.875rem` | `20px` / `1.25rem` | `4px 16px` | `6px 6px 6px 10px` | `8px` / `0.5rem` |

## Number Tag Size Specs

| Chip size | Number tag height | Min width | Font size | Line height | Padding |
| --- | --- | --- | --- | --- | --- |
| `sm` | `16px` / `1rem` | `20px` / `1.25rem` | `11px` / `0.6875rem` | `16px` / `1rem` | `0 4px` |
| `md` | `20px` / `1.25rem` | `24px` / `1.5rem` | `12px` / `0.75rem` | `16px` / `1rem` | `2px 6px` |
| `lg` | `24px` / `1.5rem` | `28px` / `1.75rem` | `12px` / `0.75rem` | `16px` / `1rem` | `4px 8px` |

## Shared Layout

| Property | Value |
| --- | --- |
| Root display | `inline-flex` |
| Root width | `fit-content` |
| Root min width | `0` |
| Root alignment | Centered |
| Border | `1px solid` theme border token |
| Radius | `9999px` |
| Font family | `Barlow`, fallback UI sans |
| Font weight | `600` / SemiBold |
| Letter spacing | `0` |
| Basic content gap | `7px` / `0.4375rem` |
| Number content gap | `4px`, except `lg` uses `8px` |
| Label wrap | `overflow-wrap: anywhere` |
| Leading logo | `28px` x `28px`, radius `22px`; only large number chip |
| Transition | `background`, `border-color`, `box-shadow`, `color`, `transform` at `160ms cubic-bezier(0.2, 0, 0, 1)` |

## Light Theme Tokens

| Usage | Value |
| --- | --- |
| Default border | `#E7E7E7` |
| Active border | `#171EFD` |
| Disabled border | `#CECECE` |
| Hover border | `#CECECE` |
| Focus ring | `#D1D2FF` |
| Default text | `#666666` |
| Active text | `#171EFD` |
| Disabled text | `#9D9D9D` |
| Hover text | `#41414E` |
| Hover fill | `#F2F2F2` |
| Leading logo fill | `#E8E8E8` |
| Number tag default fill | `#F2F2F2` |
| Number tag active fill | `#E7E8FE` |
| Number tag disabled fill | `#F2F2F2` |
| Number tag hover fill | `#E7E7E7` |
| Surface | `#FFFFFF` |

## Dark Theme Tokens

| Usage | Value |
| --- | --- |
| Default border | `#33373B` |
| Active border | `#585DFE` |
| Disabled border | `#4D4F52` |
| Hover border | `#4D4F52` |
| Focus ring | `#3F44A6` |
| Default text | `#B2B2B3` |
| Active text | `#585DFE` |
| Disabled text | `#808081` |
| Hover text | `#CACACE` |
| Hover fill | `#33373B` |
| Leading logo fill | `#33373B` |
| Number tag default fill | `#33373B` |
| Number tag active fill | `#262B4F` |
| Number tag disabled fill | `#33373B` |
| Number tag hover fill | `#272A2F` |
| Surface | `#1A1E23` |

## State Rules

| State | Fill | Border | Text | Number tag |
| --- | --- | --- | --- | --- |
| `default` | Transparent | Default border token | Default text token | Default number fill + default number text |
| `hover` | Hover fill token | Hover border token | Hover text token | Hover number fill + default number text |
| `active` | Transparent | Active border token | Active text token | Active number fill + active number text |
| `focused` | Transparent | Active border token | Hover text token | Default number fill + default number text |
| `disabled` | Transparent | Disabled border token | Disabled text token | Disabled number fill + disabled number text |

## Interaction Rules

| Interaction | Behavior |
| --- | --- |
| Click in Storybook Preview | Changes chip state to `active` unless state is `disabled`. |
| Native disabled | `disabled` is true when `state="disabled"` or the `disabled` prop is true. |
| `aria-pressed` | True when `state="active"`. |
| Focus-visible | Applies active border and `0 0 0 3px` focus ring. |

## Number Tag State Mapping

| Chip state | Default number tag state |
| --- | --- |
| `active` | `Active` |
| `disabled` | `Disabled` |
| `default`, `focused`, `hover` | `Default` |

The `numberTagState` prop can override this mapping.

## Core CSS

```css
.blinkx-chip {
  --chip-bg: transparent;
  --chip-bg-hover: #f2f2f2;
  --chip-border: #e7e7e7;
  --chip-border-active: #171efd;
  --chip-border-disabled: #cecece;
  --chip-border-hover: #cecece;
  --chip-focus-ring: #d1d2ff;
  --chip-label: #666666;
  --chip-label-active: #171efd;
  --chip-label-disabled: #9d9d9d;
  --chip-label-hover: #41414e;
  --chip-logo-bg: #e8e8e8;
  --chip-number-active-bg: #e7e8fe;
  --chip-number-default-bg: #f2f2f2;
  --chip-number-disabled-bg: #f2f2f2;
  --chip-number-hover-bg: #e7e7e7;
  --chip-number-text: #666666;
  --chip-number-text-active: #171efd;
  --chip-number-text-disabled: #9d9d9d;
  align-items: center;
  appearance: none;
  background: var(--chip-bg);
  border: 1px solid var(--chip-border);
  border-radius: 9999px;
  color: var(--chip-label);
  cursor: pointer;
  display: inline-flex;
  font-family: Barlow, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-weight: 600;
  justify-content: center;
  letter-spacing: 0;
  margin: 0;
  min-width: 0;
  position: relative;
  white-space: nowrap;
  width: fit-content;
}
```

## Size CSS

```css
.blinkx-chip--size-sm {
  font-size: 12px;
  height: 24px;
  line-height: 16px;
  padding: 4px 12px;
}

.blinkx-chip--size-md {
  font-size: 14px;
  height: 32px;
  line-height: 20px;
  padding: 4px 12px;
}

.blinkx-chip--size-lg {
  font-size: 14px;
  height: 40px;
  line-height: 20px;
  padding: 4px 16px;
}

.blinkx-chip--type-number.blinkx-chip--size-sm {
  padding: 4px 4px 4px 8px;
}

.blinkx-chip--type-number.blinkx-chip--size-md {
  padding: 4px 6px 4px 10px;
}

.blinkx-chip--type-number.blinkx-chip--size-lg {
  padding: 6px 6px 6px 10px;
}
```

## Number Tag CSS

```css
.blinkx-chip__number-tag {
  align-items: center;
  background: var(--chip-number-default-bg);
  border-radius: 24px;
  color: var(--chip-number-text);
  display: inline-flex;
  font-family: inherit;
  font-weight: 600;
  justify-content: center;
  letter-spacing: 0;
  line-height: 16px;
  min-width: 0;
  transition:
    background 160ms ease,
    color 160ms ease;
}

.blinkx-chip__number-tag[data-size="sm"] {
  font-size: 11px;
  height: 16px;
  letter-spacing: 0.02em;
  min-width: 20px;
  padding: 0 4px;
}

.blinkx-chip__number-tag[data-size="md"] {
  font-size: 12px;
  height: 20px;
  min-width: 24px;
  padding: 2px 6px;
}

.blinkx-chip__number-tag[data-size="lg"] {
  font-size: 12px;
  height: 24px;
  min-width: 28px;
  padding: 4px 8px;
}
```

## State CSS

```css
.blinkx-chip--state-hover,
.blinkx-chip:hover:not(:disabled) {
  background: var(--chip-bg-hover);
  border-color: var(--chip-border-hover);
  color: var(--chip-label-hover);
}

.blinkx-chip--state-active {
  border-color: var(--chip-border-active);
  color: var(--chip-label-active);
}

.blinkx-chip--state-focused {
  border-color: var(--chip-border-active);
  box-shadow: 0 0 0 3px var(--chip-focus-ring);
  color: var(--chip-label-hover);
}

.blinkx-chip--state-disabled,
.blinkx-chip:disabled {
  border-color: var(--chip-border-disabled);
  color: var(--chip-label-disabled);
  cursor: not-allowed;
}
```

## Dark Theme CSS

```css
.blinkx-chip--theme-dark {
  --chip-bg-hover: #33373b;
  --chip-border: #33373b;
  --chip-border-active: #585dfe;
  --chip-border-disabled: #4d4f52;
  --chip-border-hover: #4d4f52;
  --chip-focus-ring: #3f44a6;
  --chip-label: #b2b2b3;
  --chip-label-active: #585dfe;
  --chip-label-disabled: #808081;
  --chip-label-hover: #cacace;
  --chip-logo-bg: #33373b;
  --chip-number-active-bg: #262b4f;
  --chip-number-default-bg: #33373b;
  --chip-number-disabled-bg: #33373b;
  --chip-number-hover-bg: #272a2f;
  --chip-number-text: #b2b2b3;
  --chip-number-text-active: #585dfe;
  --chip-number-text-disabled: #808081;
}
```

## Component Markup

```tsx
<button
  aria-pressed={state === 'active'}
  className="blinkx-chip blinkx-chip--type-number blinkx-chip--state-default blinkx-chip--size-lg blinkx-chip--theme-light"
  data-state={state}
  data-theme="light"
  disabled={state === 'disabled'}
  type="button"
>
  <span className="blinkx-chip__content">
    <span className="blinkx-chip__logo" aria-hidden="true" />
    <span className="blinkx-chip__label">Options</span>
    <span className="blinkx-chip__number-tag" data-number-state="Default" data-size="lg">
      12
    </span>
  </span>
</button>
```

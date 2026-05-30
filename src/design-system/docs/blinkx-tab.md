# blinkX Design System V1 - Tab

Generated from `src/components/Tab.stories.tsx`, `src/components/BlinkXTab.tsx`, and `src/components/BlinkXTab.css` so the downloadable markdown matches the Storybook Tab page.

## Component

`BlinkXTab` is the tab-list component. It supports 2 to 10 tabs, controlled and uncontrolled selected index, editable active/off tab labels, optional tag rendering, tag position, keyboard navigation, and light/dark themes.

```tsx
import { useState } from 'react'
import { BlinkXTab } from './BlinkXTab'
import './BlinkXTab.css'

export function Example() {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <BlinkXTab
      noOfTabs="3"
      selectedIndex={selectedIndex}
      onValueChange={setSelectedIndex}
      labels={['F&O', 'Equity', 'Equity']}
      showTag
      tagPosition={3}
      tagText="NEW"
      theme="light"
    />
  )
}
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `noOfTabs` | `"2"` through `"10"` | `"3"` | Controls the number of rendered tabs. |
| `labels` | `string[]` | `["F&O", "Equity", ...]` | Optional labels. Missing values default to `F&O` for the first tab and `Equity` for the rest. |
| `selectedIndex` | `number` | Internal state | Controlled active tab index. |
| `defaultSelectedIndex` | `number` | `0` | Initial active tab for uncontrolled use. |
| `onValueChange` | `(selectedIndex: number) => void` | `undefined` | Called when a tab is selected. |
| `showTag` | `boolean` | `true` | Shows or hides the tag. |
| `tagPosition` | `number` | Derived from `tagIndex` | One-based tab position for the tag. |
| `tagIndex` | `number` | `2` | Backward-compatible zero-based-ish source prop used by the component when `tagPosition` is not provided. Storybook exposes this as a one-based `Tag Position`. |
| `tagText` | `string` | `"NEW"` | Tag label text. |
| `theme` | `"light" \| "dark"` | `"light"` | Uses light or dark Figma token values. |
| `aria-label` | `string` | `"Tabs"` | Accessible name for the tablist. |
| `className` | `string` | `""` | Optional class appended to the root. |

## Figma Component Set

| Item | Value |
| --- | --- |
| Figma node | `148:3384` |
| Component | `Tab` |
| Storybook title | `Components / Tab` |
| Component properties | `No. of tabs`, `Text on tab-on`, `Text on tab-off`, `Show Tag`, `Tag Position`, `Text on Tag`, `Theme` |
| Counts | `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10` |
| Themes | `light`, `dark` |

## Count Rules

| `noOfTabs` | Rendered tabs | Visible text controls in Storybook |
| --- | --- | --- |
| `2` | 2 | `Text on tab-on`, `Text on tab-off` |
| `3` | 3 | `Text on tab-on`, `Text on tab-off-1`, `Text on tab-off-2` |
| `4` | 4 | `Text on tab-on`, `Text on tab-off-1`, `Text on tab-off-2`, `Text on tab-off-3` |
| `5` | 5 | `Text on tab-on`, `Text on tab-off-1` through `Text on tab-off-4` |
| `6` | 6 | `Text on tab-on`, `Text on tab-off-1` through `Text on tab-off-5` |
| `7` | 7 | `Text on tab-on`, `Text on tab-off-1` through `Text on tab-off-6` |
| `8` | 8 | `Text on tab-on`, `Text on tab-off-1` through `Text on tab-off-7` |
| `9` | 9 | `Text on tab-on`, `Text on tab-off-1` through `Text on tab-off-8` |
| `10` | 10 | `Text on tab-on`, `Text on tab-off-1` through `Text on tab-off-9` |

## Text Interaction Rule

When a user clicks an inactive tab, that tab becomes selected and its label becomes `Text on tab-on`. The previously active label is moved into the first available off-label slot while preserving the visible order of inactive labels.

Example with `3` tabs:

| Before click | Active label | Off labels |
| --- | --- | --- |
| `["F&O", "Equity", "Equity"]`, active `0` | `F&O` | `Equity`, `Equity` |

Clicking tab `1` resolves to:

| After click | Active label | Off labels |
| --- | --- | --- |
| `["Equity", "F&O", "Equity"]`, active `1` | `Equity` | `F&O`, `Equity` |

## Layout Specs

| Property | Value |
| --- | --- |
| Root display | `inline-flex` |
| Root alignment | `flex-start` |
| Root gap | `8px` / `0.5rem` |
| Root minimum height | `40px` / `2.5rem` |
| Root width | `fit-content` |
| Bottom border | `1px solid` theme stroke token |
| Tab item display | `inline-flex`, column |
| Tab item gap | `12px` / `0.75rem` |
| Tab item height | `40px` / `2.5rem` |
| Label wrap height | `24px` / `1.5rem` |
| Label wrap padding | `2px 4px` |
| Label wrap radius | `4px` / `0.25rem` |
| Label/tag gap | `4px` / `0.25rem` |
| Active indicator height | `4px` / `0.25rem` |
| Active indicator radius | `9999px 9999px 0 0` |

## Typography

| Element | Font family | Size | Line height | Weight | Letter spacing |
| --- | --- | --- | --- | --- | --- |
| Tab label | `Barlow` | `14px` / `0.875rem` | `20px` / `1.25rem` | `600` / SemiBold | `0` |
| Tag label | `Barlow` | `12px` / `0.75rem` | `16px` / `1rem` | `600` / SemiBold | `0` |

## Tag Specs

| Property | Value |
| --- | --- |
| Display | `inline-flex` |
| Height | `20px` / `1.25rem` |
| Padding | `2px 7px` |
| Radius | `9999px` |
| Text transform | Uppercase |
| Overflow | Hidden |
| Default text | `NEW` |
| Position control | One-based `Tag Position` in Storybook |

## Light Theme Tokens

| Usage | Value |
| --- | --- |
| Active text / active indicator | `#171EFD` |
| Bottom border | `#E7E7E7` |
| Focus ring | `#D1D2FF` |
| Inactive hover indicator | `#F2F2F2` |
| Inactive hover text | `#41414E` |
| Inactive text | `#666666` |
| Tag background | `linear-gradient(90deg, rgb(68 15 118 / 10%) 0%, rgb(161 0 111 / 10%) 27.4038%, rgb(221 59 89 / 10%) 50%, rgb(251 128 67 / 10%) 70%, rgb(253 197 67 / 10%) 100%), #FFFFFF` |
| Tag text | `linear-gradient(90deg, #A1006F 0%, #440F76 100%)` |

## Dark Theme Tokens

| Usage | Value |
| --- | --- |
| Active text / active indicator | `#585DFE` |
| Bottom border | `#33373B` |
| Focus ring | `#3F44A6` |
| Inactive hover indicator | `#272A2F` |
| Inactive hover text | `#CACACE` |
| Inactive text | `#B2B2B3` |
| Tag background | `linear-gradient(90deg, #B84B96 0%, #9652D6 100%)` |
| Tag text | `#FFFFFF` |

## State Rules

| State | Label color | Indicator | Tag |
| --- | --- | --- | --- |
| Inactive | Text-secondary token | Transparent | Renders if tag position matches tab index |
| Inactive hover | Text-hover token | Hover-surface token | Remains visible if present |
| Active | Active token | Active token | Remains visible if present |
| Focus-visible | No color change | Existing state indicator | `3px solid` focus ring on label wrap |

## Keyboard Behavior

| Key | Behavior |
| --- | --- |
| `ArrowRight` / `ArrowDown` | Selects the next tab, wrapping to the first tab. |
| `ArrowLeft` / `ArrowUp` | Selects the previous tab, wrapping to the last tab. |
| `Home` | Selects the first tab. |
| `End` | Selects the last tab. |

## Core CSS

```css
.blinkx-tab {
  --tab-active: #171efd;
  --tab-hover: #f2f2f2;
  --tab-stroke: #e7e7e7;
  --tab-tag-bg: linear-gradient(
      90deg,
      rgb(68 15 118 / 10%) 0%,
      rgb(161 0 111 / 10%) 27.4038%,
      rgb(221 59 89 / 10%) 50%,
      rgb(251 128 67 / 10%) 70%,
      rgb(253 197 67 / 10%) 100%
    ),
    #ffffff;
  --tab-tag-text: linear-gradient(90deg, #a1006f 0%, #440f76 100%);
  --tab-text-hover: #41414e;
  --tab-text-secondary: #666666;
  --tab-focus-ring: #d1d2ff;
  align-items: flex-start;
  border-bottom: 1px solid var(--tab-stroke);
  display: inline-flex;
  font-family: Barlow, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  gap: 8px;
  min-height: 40px;
  width: fit-content;
}
```

## Item CSS

```css
.blinkx-tab__item {
  align-items: stretch;
  appearance: none;
  background: transparent;
  border: 0;
  color: var(--tab-text-secondary);
  cursor: pointer;
  display: inline-flex;
  flex-direction: column;
  font: inherit;
  gap: 12px;
  height: 40px;
  justify-content: flex-start;
  margin: 0;
  min-width: 0;
  padding: 0;
  text-align: left;
  transition: color 160ms ease;
}

.blinkx-tab__label-wrap {
  align-items: center;
  border-radius: 4px;
  display: inline-flex;
  gap: 4px;
  height: 24px;
  justify-content: center;
  min-width: 0;
  padding: 2px 4px;
  transition: background 160ms ease;
}
```

## Indicator And Tag CSS

```css
.blinkx-tab__indicator {
  background: transparent;
  border-radius: 9999px 9999px 0 0;
  display: block;
  height: 4px;
  transition: background 160ms ease;
  width: 100%;
}

.blinkx-tab__tag {
  align-items: center;
  background: var(--tab-tag-bg);
  border-radius: 9999px;
  color: transparent;
  display: inline-flex;
  font-size: 12px;
  font-weight: 600;
  height: 20px;
  justify-content: center;
  letter-spacing: 0;
  line-height: 16px;
  overflow: hidden;
  padding: 2px 7px;
  text-transform: uppercase;
  white-space: nowrap;
}

.blinkx-tab__tag-label {
  background: var(--tab-tag-text);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

## State CSS

```css
.blinkx-tab__item:hover:not([data-active="true"]) {
  color: var(--tab-text-hover);
}

.blinkx-tab__item:hover:not([data-active="true"]) .blinkx-tab__indicator {
  background: var(--tab-hover);
}

.blinkx-tab__item:focus-visible .blinkx-tab__label-wrap {
  outline: 3px solid var(--tab-focus-ring);
  outline-offset: 2px;
}

.blinkx-tab__item[data-active="true"] {
  color: var(--tab-active);
}

.blinkx-tab__item[data-active="true"] .blinkx-tab__indicator {
  background: var(--tab-active);
}
```

## Dark Theme CSS

```css
.blinkx-tab--theme-dark {
  --tab-active: #585dfe;
  --tab-hover: #272a2f;
  --tab-stroke: #33373b;
  --tab-tag-bg: linear-gradient(90deg, #b84b96 0%, #9652d6 100%);
  --tab-tag-text: #ffffff;
  --tab-text-hover: #cacace;
  --tab-text-secondary: #b2b2b3;
  --tab-focus-ring: #3f44a6;
}
```

## Component Markup

```tsx
<div className="blinkx-tab blinkx-tab--theme-light" data-count="3" data-theme="light" role="tablist">
  {labels.map((label, index) => (
    <button
      aria-selected={index === selectedIndex}
      className="blinkx-tab__item"
      data-active={index === selectedIndex ? 'true' : 'false'}
      onClick={() => onValueChange?.(index)}
      role="tab"
      tabIndex={index === selectedIndex ? 0 : -1}
      type="button"
    >
      <span className="blinkx-tab__label-wrap">
        <span className="blinkx-tab__label">{label}</span>
        {showTag && index === tagPosition - 1 ? (
          <span className="blinkx-tab__tag">
            <span className="blinkx-tab__tag-label">{tagText}</span>
          </span>
        ) : null}
      </span>
      <span className="blinkx-tab__indicator" aria-hidden="true" />
    </button>
  ))}
</div>
```

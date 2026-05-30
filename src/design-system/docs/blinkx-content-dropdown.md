# blinkX Design System V1 - Content Dropdown

Generated for `Components / Dropdown / Content Dropdown` from the Figma section `Contetnt dropdown` (`6230:707`) and implemented in `src/components/BlinkXContentDropdown.tsx` + `src/components/BlinkXContentDropdown.css`.

`BlinkXContentDropdown` is a selectable menu dropdown with five menu rows, an optional leading image icon, a selected tick, hover row state, light and dark themes, and Figma-aligned `sm` / `md` sizing.

## Usage

```tsx
import { BlinkXContentDropdown } from './BlinkXContentDropdown'
import './BlinkXContentDropdown.css'

export function Example() {
  return (
    <BlinkXContentDropdown
      menuLabel="Name of the Menu"
      item1Label="Name of the Menu"
      item2Label="Name of the Menu"
      item3Label="Name of the Menu"
      item4Label="Name of the Menu"
      item5Label="Name of the Menu"
      leadingIcon
      selectedIndex={0}
      size="md"
      state="Active"
      theme="light"
    />
  )
}
```

## Figma Source

| Element | Figma node |
| --- | --- |
| Section | `Contetnt dropdown` (`6230:707`) |
| Trigger component set | `dropdown Menu` (`123:3312`) |
| Content row, small | `sm` (`123:3383`) |
| Content row, medium | `md` (`129:4062`) |
| Small leading-icon default example | `sm/ leading icon / default` (`123:3501`) |
| Small leading-icon hover example | `sm/ leading icon / hover` (`123:3547`) |
| Small basic default example | `sm/ basic / default` (`129:3870`) |
| Small basic hover example | `sm/ basic / hover` (`129:3915`) |
| Medium leading-icon default example | `md/ leading icon / default` (`129:4330`) |
| Medium leading-icon hover example | `md/ leading icon / hover` (`129:4331`) |
| Medium basic default example | `md/ basic / default` (`129:4332`) |
| Medium basic hover example | `md/ basic / hover` (`129:4333`) |

## Component Properties

| Prop | Type | Default | Figma reference |
| --- | --- | --- | --- |
| `state` | `Default \| Hover \| Active \| Focused` | `Default` | `dropdown Menu` variant property `states` |
| `size` | `sm \| md` | `md` | `dropdown Menu` variant property `size` |
| `theme` | `light \| dark` | `light` | Semantic token mode |
| `leadingIcon` | `boolean` | `true` | Content row boolean property `show leading Icon` |
| `selectedIndex` | `0 \| 1 \| 2 \| 3 \| 4` | `0` | Content row boolean property `Show tick` |
| `hoveredItem` | `None \| Item 1 \| Item 2 \| Item 3 \| Item 4 \| Item 5` | `None` | Hover-state examples in Figma |
| `menuLabel` | `string` | `Name of the Menu` | Trigger label text |
| `item1Label` - `item5Label` | `string` | `Name of the Menu` | Row label text property `name` |
| `onStateChange` | `(state) => void` | `undefined` | Trigger click and outside click update open/closed state |
| `onItemSelect` | `(index, label) => void` | `undefined` | Menu item click callback |

## Layout

| Element | Property | Value | Token |
| --- | --- | --- | --- |
| Trigger | Height | `32px` / `2rem` | Figma fixed height |
| Trigger | Padding | `4px 6px 4px 8px` | Figma auto-layout padding |
| Trigger | Radius | `8px` / `0.5rem` | `unit/8` |
| Trigger, sm | Width | Hug content, no fixed minimum | Depends on label length |
| Trigger, sm | Text | `12px` / `0.75rem`, line-height `16px` / `1rem`, `600` | `Body/SemiBold` |
| Trigger, sm | Text/icon gap | `8px` / `0.5rem` | Figma auto-layout gap |
| Trigger, md | Width | Hug content, no fixed minimum | Depends on label length |
| Trigger, md | Text | `14px` / `0.875rem`, line-height `20px` / `1.25rem`, `600` | `H6/SemiBold` |
| Trigger, md | Text/icon gap | `10px` / `0.625rem` | Figma auto-layout gap |
| Caret | Size | `16px` / `1rem` | `Icon/16px/CaretDown` |
| Caret | Stroke | `1.25px` | `stroke/stroke-md` |
| Menu surface | Offset from trigger | `6px` / `0.375rem` | Matches Nav Dropdown window offset |
| Menu surface | Padding | `0px` | Tightened menu window padding |
| Menu surface | Radius | `12px` / `0.75rem` | `unit/12` |
| Menu surface, sm basic | Minimum width | `142px` / `8.875rem` | Figma example width |
| Menu surface, sm leading | Minimum width | `158px` / `9.875rem` | Figma example width |
| Menu surface, md basic | Minimum width | `151px` / `9.4375rem` | Figma example width |
| Menu surface, md leading | Minimum width | `161px` / `10.0625rem` | Figma example width |
| Menu row, sm | Height | `30px` / `1.875rem` | Tightened hover container height |
| Menu row, md | Height | `30px` / `1.875rem` | Matches Nav Dropdown row height |
| Menu row | Outer spacing | First row `3px 4px 1px`, following rows `1px 4px 3px` | Matches tightened Nav Dropdown spacing |
| Menu row | Padding | `3px 6px` | Matches tightened Nav Dropdown item padding |
| Menu row | Radius | `8px` / `0.5rem` | `unit/8` |
| Menu row text | Font | `Barlow SemiBold 600`, `14px` / `0.875rem`, line-height `20px` / `1.25rem` | Matches Nav Dropdown window text |
| Menu row text to selected tick | Gap | `8px` / `0.5rem` | Explicit content-to-check spacing |
| Leading image, sm | Size | `20px` / `1.25rem` | Figma image size increased by `2px` |
| Leading image, md | Size | `20px` / `1.25rem` | Aligned to requested icon size |
| Selected tick | Size | `12px` / `0.75rem` | `Icon/12px/Check` |

## Storybook Gallery

| Area | Property | Value | Reason |
| --- | --- | --- | --- |
| Gallery preview tile | Minimum height | `360px` / `22.5rem` | Keeps the active five-row dropdown fully visible inside the gallery card |

## Theme Tokens

### Light

| Role | Token | Value |
| --- | --- | --- |
| Text | `Color/text/text-primary` | `#41414E` |
| Icon | `Color/icons/icon-primary` | `#414143` |
| Brand tick / focus stroke | `Color/stroke/stroke-brand` and `Color/icons/icon-brand` | `#171EFD` |
| Default trigger fill | No fill | `transparent` |
| Default trigger stroke | `Color/stroke/stroke-primary` | `#E7E7E7` |
| Hover trigger fill | `Color/hover/hover-primary` | `#F2F2F2` |
| Hover row fill | `Color/Interation/hover/interaction-hover-1` | `#F2F2F2` |
| Focused trigger fill | Figma focused trigger fill | `#F3F4FF` |
| Focus ring | `Color/background/brand/bg-brand-focus_ring` | `#D1D2FF` |
| Menu surface | `Color/Surface - Elevation/surface 1` | `#FFFFFF` |
| Menu stroke | `Color/stroke/stroke-primary` | `#E7E7E7` |
| Shadow | `Shadow/Light/shadow-lg` | `0px 2px 2px -1px #0A0D120A, 0px 4px 6px -2px #0A0D1208, 0px 12px 16px -4px #0A0D1214` |

### Dark

| Role | Token | Value |
| --- | --- | --- |
| Text | `Color/text/text-primary` | `#CACACE` |
| Icon | `Color/icons/icon-primary` | `#999999` |
| Brand tick / focus stroke | `Color/stroke/stroke-brand` and `Color/icons/icon-brand` | `#585DFE` |
| Default trigger fill | No fill | `transparent` |
| Default trigger stroke | `Color/stroke/stroke-primary` | `#33373B` |
| Hover trigger fill | Dark interaction surface | `#33373B` |
| Hover row fill | `Color/Interation/hover/interaction-hover-1` | `#33373B` |
| Focused trigger fill | Dark focused interaction surface | `#272A2F` |
| Focus ring | `Color/background/brand/bg-brand-focus_ring` | `#3F44A6` |
| Menu surface | `Color/Surface - Elevation/surface 1` | `#1A1E23` |
| Menu stroke | `Color/stroke/stroke-primary` | `#33373B` |
| Shadow | Dark `Shadow/Shadow-lg` equivalent | `0px 2px 2px -1px #0A0D1033, 0px 4px 6px -2px #0A0D102E, 0px 12px 16px -4px #0A0D105C` |

## Interaction

- Clicking the trigger toggles `Default` and `Active`.
- Clicking outside the component closes the menu and returns the component to `Default`.
- Clicking a menu item updates `selectedIndex`, moves the tick to that row, and closes the menu.
- Hover uses the row-level interaction fill without changing the selected tick.
- Active trigger state opens the menu with the same stroke and subtle hover fill; click focus does not add a blue focus ring.

## React Component

```tsx
import { useEffect, useId, useRef, type HTMLAttributes } from 'react'

import './BlinkXContentDropdown.css'

export type BlinkXContentDropdownSize = 'sm' | 'md'
export type BlinkXContentDropdownState = 'Default' | 'Hover' | 'Active' | 'Focused'
export type BlinkXContentDropdownTheme = 'light' | 'dark'
export type BlinkXContentDropdownHoveredItem =
  | 'None'
  | 'Item 1'
  | 'Item 2'
  | 'Item 3'
  | 'Item 4'
  | 'Item 5'

export type BlinkXContentDropdownProps = Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> & {
  hoveredItem?: BlinkXContentDropdownHoveredItem
  item1Label?: string
  item2Label?: string
  item3Label?: string
  item4Label?: string
  item5Label?: string
  leadingIcon?: boolean
  menuLabel?: string
  onItemSelect?: (index: number, label: string) => void
  onStateChange?: (state: BlinkXContentDropdownState) => void
  selectedIndex?: number
  size?: BlinkXContentDropdownSize
  state?: BlinkXContentDropdownState
  theme?: BlinkXContentDropdownTheme
}
```

## CSS Variables

```css
.blinkx-content-dropdown {
  --content-dropdown-brand: #171efd;
  --content-dropdown-focus-fill: #f3f4ff;
  --content-dropdown-focus-ring: #d1d2ff;
  --content-dropdown-hover-fill: #f2f2f2;
  --content-dropdown-icon: #414143;
  --content-dropdown-shadow:
    0 2px 2px -1px #0a0d120a,
    0 4px 6px -2px #0a0d1208,
    0 12px 16px -4px #0a0d1214;
  --content-dropdown-stroke: #e7e7e7;
  --content-dropdown-surface: #ffffff;
  --content-dropdown-text: #41414e;
  --content-dropdown-trigger-fill: transparent;
}

.blinkx-content-dropdown--theme-dark {
  --content-dropdown-brand: #585dfe;
  --content-dropdown-focus-fill: #272a2f;
  --content-dropdown-focus-ring: #3f44a6;
  --content-dropdown-hover-fill: #33373b;
  --content-dropdown-icon: #999999;
  --content-dropdown-stroke: #33373b;
  --content-dropdown-surface: #1a1e23;
  --content-dropdown-text: #cacace;
  --content-dropdown-trigger-fill: transparent;
}
```

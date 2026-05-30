# blinkX Design System V1 - Nav Dropdown

Generated for `Components / Dropdown / Nav Dropdown` from the Figma section `Dropdown / Nav` (`6211:29559`) and implemented in `src/components/BlinkXNavDropdown.tsx` + `src/components/BlinkXNavDropdown.css`.

`BlinkXNavDropdown` is a compact navigation menu trigger with a three-item dropdown. It supports light/dark themes, the Figma trigger states (`Default`, `Hover`, `Active`, `Focused`), item hover previews, and click interaction for opening or closing the menu.

## Usage

```tsx
import { BlinkXNavDropdown } from './BlinkXNavDropdown'
import './BlinkXNavDropdown.css'

export function Example() {
  return (
    <BlinkXNavDropdown
      menuLabel="Name of the Menu"
      item1Label="Menu Content 1"
      item2Label="Menu Content 2"
      item3Label="Menu Content 3"
      state="Active"
      theme="light"
    />
  )
}
```

## Figma Source

| Element | Figma node |
| --- | --- |
| Section | `Dropdown / Nav` (`6211:29559`) |
| Trigger component set | `Nav Menu` (`123:2100`) |
| Dropdown surface | `Dropdown` (`123:2116`) |
| Hover dropdown example | `Dropdown / hover` (`123:2119`) |

## Component Properties

| Prop | Type | Default | Figma reference |
| --- | --- | --- | --- |
| `state` | `Default \| Hover \| Active \| Focused` | `Default` | `Nav Menu` variant property `states` |
| `theme` | `light \| dark` | `light` | Semantic token mode |
| `menuLabel` | `string` | `Name of the Menu` | Trigger label text |
| `item1Label` | `string` | `Menu Content 1` | Dropdown item 1 text |
| `item2Label` | `string` | `Menu Content 2` | Dropdown item 2 text |
| `item3Label` | `string` | `Menu Content 3` | Dropdown item 3 text |
| `hoveredItem` | `None \| Item 1 \| Item 2 \| Item 3` | `None` | Dropdown item hover state |
| `onStateChange` | `(state) => void` | `undefined` | Trigger click and outside click update open/closed state |
| `onItemSelect` | `(index, label) => void` | `undefined` | Menu item click callback |

## Layout

| Element | Property | Value | Token |
| --- | --- | --- | --- |
| Root | Width | Hug content, no fixed minimum | Keeps caret close to label as text changes |
| Root | Gap | `4px` / `0.25rem` | Figma item spacing |
| Trigger | Width | Hug content, no fixed minimum | Depends on label length |
| Trigger | Height | `32px` / `2rem` | Figma fixed height |
| Trigger | Padding | `4px 6px 4px 8px` | Figma auto-layout padding |
| Trigger | Radius | `8px` / `0.5rem` | `unit/8` |
| Trigger | Text/icon gap | `4px` / `0.25rem` | Adjusted for optical spacing between label and arrow |
| Caret | Size | `16px` / `1rem` | Icon/16px/CaretDown |
| Caret | Stroke | `1.25px` | `stroke/stroke-md` |
| Dropdown surface | Width | Fills trigger width with `151px` / `9.4375rem` minimum | Matches expanded trigger width |
| Dropdown surface | Padding | `0px` | Tightened menu window padding |
| Dropdown surface | Radius | `12px` / `0.75rem` | `unit/12` |
| Dropdown item shell | Height | `34px` / `2.125rem` | Tightened row shell height |
| Dropdown item shell | Padding | First row `3px 4px 1px`, following rows `1px 4px 3px` | Tightened row spacing |
| Dropdown item | Width | Fills dropdown inner width | Matches expanded dropdown width |
| Dropdown item | Height | `30px` / `1.875rem` | Tightened hover container height |
| Dropdown item | Padding | `3px 6px` | Tightened auto-layout padding |
| Dropdown item | Radius | `8px` / `0.5rem` | `unit/8` |
| Text | Font | `Barlow SemiBold 600` | `Family/font-family`, `Font weight/semiBold` |
| Text | Size | `14px` / `0.875rem` | `size/h6/text-md` |
| Text | Line height | `20px` / `1.25rem` | `Line height/h6/text-md` |
| Text | Letter spacing | `0` | Figma text style |

## Theme Tokens

### Light

| Role | Token | Value |
| --- | --- | --- |
| Text | `Color/text/text-primary` | `#414143` |
| Icon | `Color/icons/icon-primary` | `#414143` |
| Trigger hover fill | `Color/Interation/hover/interaction-hover-1` | `#F2F2F2` |
| Trigger active fill | `Color/Interation/hover/interaction-hover-2` | `#E7E7E7` |
| Dropdown surface | `Color/Surface - Elevation/surface 1` | `#FFFFFF` |
| Dropdown stroke | `Color/stroke/stroke-primary` | `#E7E7E7` |
| Focus stroke | `Color/background/brand/bg-brand-default` | `#171EFD` |
| Focus ring | `Color/background/brand/bg-brand-focus_ring` | `#D1D2FF` |
| Shadow | `Shadow/Shadow-lg` | `0px 2px 2px -1px #0A0D100A, 0px 4px 6px -2px #0A0D1008, 0px 12px 16px -4px #0A0D1014` |

### Dark

| Role | Token | Value |
| --- | --- | --- |
| Text | `Color/text/text-primary` | `#CACACE` |
| Icon | `Color/icons/icon-primary` | `#999999` |
| Trigger hover fill | `Color/Interation/hover/interaction-hover-1` | `#33373B` |
| Trigger active fill | `Color/Interation/hover/interaction-hover-2` | `#272A2F` |
| Dropdown surface | `Color/Surface - Elevation/surface 1` | `#1A1E23` |
| Dropdown stroke | `Color/stroke/stroke-primary` | `#33373B` |
| Focus stroke | `Color/background/brand/bg-brand-default` | `#7478FE` |
| Focus ring | `Color/background/brand/bg-brand-focus_ring` | `#3F44A6` |
| Shadow | `Shadow/Shadow-lg` | `0px 2px 2px -1px #0A0D1033, 0px 4px 6px -2px #0A0D102E, 0px 12px 16px -4px #0A0D105C` |

## React Component

```tsx
import { useEffect, useId, useRef, type HTMLAttributes } from 'react'

import './BlinkXNavDropdown.css'

export type BlinkXNavDropdownTheme = 'light' | 'dark'
export type BlinkXNavDropdownState = 'Default' | 'Hover' | 'Active' | 'Focused'
export type BlinkXNavDropdownHoveredItem = 'None' | 'Item 1' | 'Item 2' | 'Item 3'

export type BlinkXNavDropdownProps = Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> & {
  hoveredItem?: BlinkXNavDropdownHoveredItem
  item1Label?: string
  item2Label?: string
  item3Label?: string
  menuLabel?: string
  onItemSelect?: (index: number, label: string) => void
  onStateChange?: (state: BlinkXNavDropdownState) => void
  state?: BlinkXNavDropdownState
  theme?: BlinkXNavDropdownTheme
}

function CaretIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="blinkx-nav-dropdown__caret"
      data-open={open ? 'true' : 'false'}
      fill="none"
      viewBox="0 0 16 16"
    >
      <path d="M3 6.25 8 10.75l5-4.5" />
    </svg>
  )
}

function hoveredItemToIndex(hoveredItem: BlinkXNavDropdownHoveredItem) {
  if (hoveredItem === 'Item 1') return 0
  if (hoveredItem === 'Item 2') return 1
  if (hoveredItem === 'Item 3') return 2
  return -1
}

export function BlinkXNavDropdown({
  className = '',
  hoveredItem = 'None',
  item1Label = 'Menu Content 1',
  item2Label = 'Menu Content 2',
  item3Label = 'Menu Content 3',
  menuLabel = 'Name of the Menu',
  onItemSelect,
  onStateChange,
  state = 'Default',
  theme = 'light',
  ...dropdownProps
}: BlinkXNavDropdownProps) {
  const dropdownId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const isOpen = state === 'Active'
  const hoveredIndex = hoveredItemToIndex(hoveredItem)
  const items = [item1Label, item2Label, item3Label]

  function handleTriggerClick() {
    onStateChange?.(isOpen ? 'Default' : 'Active')
  }

  useEffect(() => {
    if (!isOpen) return

    function handleOutsidePointerDown(event: PointerEvent) {
      if (!(event.target instanceof Node)) return

      if (!rootRef.current?.contains(event.target)) {
        onStateChange?.('Default')
      }
    }

    document.addEventListener('pointerdown', handleOutsidePointerDown)

    return () => {
      document.removeEventListener('pointerdown', handleOutsidePointerDown)
    }
  }, [isOpen, onStateChange])

  return (
    <div
      {...dropdownProps}
      className={`blinkx-nav-dropdown blinkx-nav-dropdown--theme-${theme} blinkx-nav-dropdown--state-${state.toLowerCase()} ${className}`}
      data-state={state}
      data-theme={theme}
      ref={rootRef}
    >
      <button
        aria-controls={dropdownId}
        aria-expanded={isOpen}
        className="blinkx-nav-dropdown__trigger"
        onClick={handleTriggerClick}
        type="button"
      >
        <span className="blinkx-nav-dropdown__label">{menuLabel}</span>
        <CaretIcon open={isOpen} />
      </button>

      <div
        aria-hidden={!isOpen}
        className="blinkx-nav-dropdown__menu"
        data-open={isOpen ? 'true' : 'false'}
        id={dropdownId}
        role="menu"
      >
        {items.map((item, index) => (
          <div className="blinkx-nav-dropdown__item-shell" key={`${item}-${index}`}>
            <button
              className="blinkx-nav-dropdown__item"
              data-hovered={hoveredIndex === index ? 'true' : 'false'}
              onClick={() => onItemSelect?.(index, item)}
              role="menuitem"
              tabIndex={isOpen ? 0 : -1}
              type="button"
            >
              {item}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
```

## CSS

```css
.blinkx-nav-dropdown {
  --nav-dropdown-active-fill: #e7e7e7;
  --nav-dropdown-focus-ring: #d1d2ff;
  --nav-dropdown-focus-stroke: #171efd;
  --nav-dropdown-hover-fill: #f2f2f2;
  --nav-dropdown-icon: #414143;
  --nav-dropdown-menu-stroke: #e7e7e7;
  --nav-dropdown-shadow:
    0 2px 2px -1px #0a0d100a,
    0 4px 6px -2px #0a0d1008,
    0 12px 16px -4px #0a0d1014;
  --nav-dropdown-surface: #ffffff;
  --nav-dropdown-text: #414143;
  color: var(--nav-dropdown-text);
  display: inline-flex;
  flex-direction: column;
  font-family: Barlow, sans-serif;
  gap: 4px;
  min-width: 0;
  position: relative;
  width: max-content;
}

.blinkx-nav-dropdown--theme-dark {
  --nav-dropdown-active-fill: #272a2f;
  --nav-dropdown-focus-ring: #3f44a6;
  --nav-dropdown-focus-stroke: #7478fe;
  --nav-dropdown-hover-fill: #33373b;
  --nav-dropdown-icon: #999999;
  --nav-dropdown-menu-stroke: #33373b;
  --nav-dropdown-shadow:
    0 2px 2px -1px #0a0d1033,
    0 4px 6px -2px #0a0d102e,
    0 12px 16px -4px #0a0d105c;
  --nav-dropdown-surface: #1a1e23;
  --nav-dropdown-text: #cacace;
}

.blinkx-nav-dropdown__trigger {
  align-items: center;
  appearance: none;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 8px;
  color: var(--nav-dropdown-text);
  cursor: pointer;
  display: inline-flex;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  gap: 4px;
  height: 32px;
  justify-content: center;
  line-height: 20px;
  margin: 0;
  min-width: 0;
  padding: 4px 6px 4px 8px;
  width: max-content;
}

.blinkx-nav-dropdown__trigger:hover,
.blinkx-nav-dropdown--state-hover .blinkx-nav-dropdown__trigger {
  background: var(--nav-dropdown-hover-fill);
}

.blinkx-nav-dropdown--state-active .blinkx-nav-dropdown__trigger {
  background: var(--nav-dropdown-active-fill);
}

.blinkx-nav-dropdown--state-focused .blinkx-nav-dropdown__trigger,
.blinkx-nav-dropdown__trigger:focus-visible {
  border-color: var(--nav-dropdown-focus-stroke);
  box-shadow: 0 0 0 3px var(--nav-dropdown-focus-ring);
  outline: none;
}

.blinkx-nav-dropdown__label {
  flex: 0 0 auto;
  min-width: 0;
  overflow: visible;
  text-align: left;
  white-space: nowrap;
}

.blinkx-nav-dropdown__caret {
  display: block;
  flex: 0 0 auto;
  height: 16px;
  stroke: var(--nav-dropdown-icon);
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.25;
  width: 16px;
}

.blinkx-nav-dropdown__caret[data-open="true"] {
  transform: rotate(180deg);
}

.blinkx-nav-dropdown__menu {
  background: var(--nav-dropdown-surface);
  border: 1px solid var(--nav-dropdown-menu-stroke);
  border-radius: 12px;
  box-shadow: var(--nav-dropdown-shadow);
  box-sizing: border-box;
  display: grid;
  left: 0;
  min-width: 151px;
  opacity: 0;
  padding: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: calc(100% + 6px);
  transform: translateY(-8px);
  transition:
    transform 260ms cubic-bezier(0.34, 1.56, 0.64, 1),
    opacity 160ms ease-out;
  width: 100%;
  z-index: 10;
}

.blinkx-nav-dropdown__menu[data-open="true"] {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}

.blinkx-nav-dropdown__item-shell {
  box-sizing: border-box;
  height: 34px;
  padding: 3px 4px 1px;
  width: 100%;
}

.blinkx-nav-dropdown__item-shell + .blinkx-nav-dropdown__item-shell {
  padding: 1px 4px 3px;
}

.blinkx-nav-dropdown__item {
  align-items: center;
  appearance: none;
  background: transparent;
  border: 0;
  border-radius: 8px;
  color: var(--nav-dropdown-text);
  cursor: pointer;
  display: flex;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  height: 30px;
  line-height: 20px;
  margin: 0;
  overflow: visible;
  padding: 3px 6px;
  text-align: left;
  white-space: nowrap;
  width: 100%;
}

.blinkx-nav-dropdown__item:hover,
.blinkx-nav-dropdown__item[data-hovered="true"] {
  background: var(--nav-dropdown-hover-fill);
}
```

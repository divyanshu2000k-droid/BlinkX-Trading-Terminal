# blinkX Design System V1 - Quick Action Bar

Generated from `src/components/QuickActionBar.stories.tsx`, `src/components/BlinkXQuickActionBar.tsx`, and `src/components/BlinkXQuickActionBar.css` so the downloadable markdown matches the Storybook Quick Action Bar page.

## Component

`BlinkXQuickActionBar` is the compact trading action toolbar. It supports light and dark themes, hover-only tooltips, Buy/Sell action buttons, four icon actions, and the More options affordance.

```tsx
import { BlinkXQuickActionBar } from './BlinkXQuickActionBar'
import './BlinkXQuickActionBar.css'

export function Example() {
  return <BlinkXQuickActionBar theme="light" />
}
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `activeAction` | `"buy" \| "sell" \| "trading-view" \| "view-chart" \| "market-depth" \| "option-chain" \| "more-options" \| "none"` | Internal state | Optional controlled action used for gallery/static states. |
| `defaultActiveAction` | Same as `activeAction` | `"none"` | Initial uncontrolled action. |
| `onActionChange` | `(action) => void` | `undefined` | Called when an action is clicked. Clicks do not pin the tooltip in the default preview. |
| `showTooltip` | `boolean` | `true` | Shows the shared `BlinkXTooltip` while an item is hovered or focused. |
| `theme` | `"light" \| "dark"` | `"light"` | Uses light or dark Figma token values. |
| `aria-label` | `string` | `"Quick action bar"` | Accessible name for the toolbar. |
| `className` | `string` | `""` | Optional class appended to the root. |

## Figma Component Set

| Item | Value |
| --- | --- |
| Figma node | `3460:32378` |
| Hover/reference node | `3460:32567` |
| Component | `Quick Action Bar` |
| Storybook title | `Components / Quick Action Bar` |
| Component properties | `Theme` |
| Themes | `light`, `dark` |
| Gallery states | `Default`, `Buy`, `Sell`, `Trading View`, `View Chart`, `Market depth`, `Option chain`, `More options` |

## Actions

| Action id | Visible item | Tooltip text | Tone |
| --- | --- | --- | --- |
| `buy` | `B` | `Buy` | Buy |
| `sell` | `S` | `Sell` | Sell |
| `trading-view` | TradingView SVG | `Trading View` | Icon |
| `view-chart` | Chart SVG | `View Chart` | Icon |
| `market-depth` | Market depth SVG | `Market depth` | Subtle icon |
| `option-chain` | Chain SVG | `Option chain` | Subtle icon |
| `more-options` | Vertical dots SVG | `More options` | More |

## Layout Specs

| Property | Value |
| --- | --- |
| Root display | `inline-flex` |
| Root direction | Column |
| Root width | `fit-content` |
| Root min height | `44px` / `2.75rem` |
| Root padding | `8px` / `0.5rem` |
| Root gap | `4px` / `0.25rem` |
| Root radius | `12px` / `0.75rem` |
| Root outline | `1px solid` theme stroke token, offset `-1px` |
| Root shadow | Foundation `Shadow-lg` |
| Content height | `28px` / `1.75rem` |
| Content gap before More | `6px` / `0.375rem` |
| Action group gap | `8px` / `0.5rem` |
| Action button size | `28px` x `28px` |
| Action button radius | `8px` / `0.5rem` |
| Icon size | `16px` x `16px` |
| More touch target | `16px` x `28px` |
| More hover box | `16px` x `28px`, radius `6px` / `0.375rem` |

## Typography

| Element | Font family | Size | Line height | Weight | Letter spacing |
| --- | --- | --- | --- | --- | --- |
| Buy/Sell letter | `Barlow` | `18px` / `1.125rem` | `22px` / `1.375rem` | `600` / SemiBold | `0` |
| Tooltip title | Shared `BlinkXTooltip` title style | Component token | Component token | Component token | `0` |

## Light Theme Tokens

| Usage | Value |
| --- | --- |
| Buy fill | `#2BB02B` |
| Buy hover fill | `#289329` |
| Sell fill | `#DD2006` |
| Sell hover fill | `#B6200C` |
| Surface | `#FFFFFF` |
| Control fill | `#FFFFFF` |
| Control hover fill | `#F2F2F2` |
| Icon color | `#414143` |
| Stroke | `#E0E0E0` |
| Tooltip background | `#000000` |
| Tooltip text | `#FFFFFF` |
| Tooltip stroke | `transparent` |
| Shadow-lg | `0 2px 2px -1px #0A0D100A, 0 4px 6px -2px #0A0D1008, 0 12px 16px -4px #0A0D1014` |
| Shadow-xl | `0 3px 3px -1.5px #0A0D100A, 0 8px 8px -4px #0A0D1008, 0 20px 24px -4px #0A0D1014` |

## Dark Theme Tokens

| Usage | Value |
| --- | --- |
| Buy fill | `#45B045` |
| Buy hover fill | `#367139` |
| Sell fill | `#DD422C` |
| Sell hover fill | `#85382F` |
| Surface | `#1A1E23` |
| Control fill | `#1A1E23` |
| Control hover fill | `#33373B` |
| Icon color | `#999999` |
| Stroke | `#353C46` |
| Tooltip background | `#000000` |
| Tooltip text | `#FFFFFF` |
| Tooltip stroke | `#24282D` |
| Shadow-lg | `0 2px 2px -1px #0A0D1033, 0 4px 6px -2px #0A0D102E, 0 12px 16px -4px #0A0D105C` |
| Shadow-xl | `0 3px 3px -1.5px #0A0D1033, 0 8px 8px -4px #0A0D102E, 0 20px 24px -4px #0A0D105C` |

## State Rules

| State | Behavior |
| --- | --- |
| Default | No tooltip, no active hover fill. |
| Hover / focus on Buy | Buy button uses buy hover fill and shows `Buy` tooltip. |
| Hover / focus on Sell | Sell button uses sell hover fill and shows `Sell` tooltip. |
| Hover / focus on icon action | Icon action uses control hover fill and shows its tooltip. |
| Hover / focus on More | More item shows a `16px` x `28px` hover box with radius `6px` and shows `More options` tooltip. |
| Click | Calls `onActionChange`; does not pin active state in default preview. |
| Focus visible | Applies `0 0 0 3px` focus ring: light `rgb(209 210 255 / 80%)`, dark `rgb(63 68 166 / 80%)`. |

## Tooltip Rules

| Rule | Value |
| --- | --- |
| Component | Reuses `BlinkXTooltip`; do not recreate tooltip styles locally. |
| Tooltip type | `bottom-Centre` |
| Placement | Absolute above the quick action item. |
| Width | `max-content` |
| Title wrapping | `white-space: nowrap`, `word-break: normal`, `overflow-wrap: normal` |
| Title alignment | Center |
| Tooltip shadow | Foundation `Shadow-xl` |
| Buy/Sell tooltip horizontal padding | `14px` left and right |
| Dark theme stroke | Muted stroke around tooltip: `#24282D` |

## Tooltip Positions

| Action | `left` |
| --- | --- |
| `buy` | `22px` |
| `sell` | `58px` |
| `trading-view` | `94px` |
| `view-chart` | `130px` |
| `market-depth` | `166px` |
| `option-chain` | `202px` |
| `more-options` | `230px` |

## SVG Icon Rules

| Icon | Rule |
| --- | --- |
| TradingView | Uses the supplied 16px SVG path and fills with `currentColor`. |
| View Chart | Uses the supplied 16px SVG path and strokes with `currentColor`. |
| Market depth | Uses the supplied 15px SVG paths and fills/strokes with `currentColor`. |
| Option chain | Uses the supplied 16px SVG paths and strokes with `currentColor`. |
| More options | Uses 16px vertical dots SVG and fills with `currentColor`. |

## Core Component Code

```tsx
import { useState, type HTMLAttributes, type ReactNode } from 'react'
import { BlinkXTooltip } from './BlinkXTooltip'
import './BlinkXQuickActionBar.css'

export type BlinkXQuickActionBarAction =
  | 'buy'
  | 'sell'
  | 'trading-view'
  | 'view-chart'
  | 'market-depth'
  | 'option-chain'
  | 'more-options'

export type BlinkXQuickActionBarTheme = 'light' | 'dark'

export type BlinkXQuickActionBarProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  activeAction?: BlinkXQuickActionBarAction | 'none'
  defaultActiveAction?: BlinkXQuickActionBarAction | 'none'
  onActionChange?: (action: BlinkXQuickActionBarAction) => void
  showTooltip?: boolean
  theme?: BlinkXQuickActionBarTheme
}

type QuickAction = {
  ariaLabel: string
  icon: ReactNode
  id: BlinkXQuickActionBarAction
  label: string
  tone: 'buy' | 'sell' | 'icon' | 'subtle' | 'more'
}

const quickActions: QuickAction[] = [
  { ariaLabel: 'Buy', icon: 'B', id: 'buy', label: 'Buy', tone: 'buy' },
  { ariaLabel: 'Sell', icon: 'S', id: 'sell', label: 'Sell', tone: 'sell' },
  { ariaLabel: 'Trading View', icon: <TradingViewIcon />, id: 'trading-view', label: 'Trading View', tone: 'icon' },
  { ariaLabel: 'View Chart', icon: <ChartLineIcon />, id: 'view-chart', label: 'View Chart', tone: 'icon' },
  { ariaLabel: 'Market depth', icon: <MarketDepthIcon />, id: 'market-depth', label: 'Market depth', tone: 'subtle' },
  { ariaLabel: 'Option chain', icon: <ChainIcon />, id: 'option-chain', label: 'Option chain', tone: 'subtle' },
]

export function BlinkXQuickActionBar({
  activeAction,
  className = '',
  defaultActiveAction = 'none',
  onActionChange,
  showTooltip = true,
  theme = 'light',
  ...toolbarProps
}: BlinkXQuickActionBarProps) {
  const [internalAction, setInternalAction] =
    useState<BlinkXQuickActionBarAction | 'none'>(defaultActiveAction)
  const currentAction = activeAction ?? internalAction
  const tooltipAction =
    quickActions.find((action) => action.id === currentAction) ??
    (currentAction === 'more-options'
      ? {
          ariaLabel: 'More options',
          icon: null,
          id: 'more-options' as const,
          label: 'More options',
          tone: 'more' as const,
        }
      : undefined)

  const classes = [
    'blinkx-quick-action-bar',
    `blinkx-quick-action-bar--theme-${theme}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  function handleAction(action: BlinkXQuickActionBarAction) {
    onActionChange?.(action)
  }

  return (
    <div
      {...toolbarProps}
      className={classes}
      data-theme={theme}
      role="toolbar"
      aria-label={toolbarProps['aria-label'] ?? 'Quick action bar'}
    >
      {showTooltip && tooltipAction ? (
        <BlinkXTooltip
          className="blinkx-quick-action-bar__tooltip"
          data-action={tooltipAction.id}
          showSupportingText={false}
          title={tooltipAction.label}
          type="bottom-Centre"
        />
      ) : null}

      <div className="blinkx-quick-action-bar__content">
        <div className="blinkx-quick-action-bar__group">
          {quickActions.map((action) => (
            <button
              aria-label={action.ariaLabel}
              className="blinkx-quick-action-bar__action"
              data-active={currentAction === action.id ? 'true' : undefined}
              data-tone={action.tone}
              key={action.id}
              onClick={() => handleAction(action.id)}
              onFocus={() => {
                if (activeAction === undefined) setInternalAction(action.id)
              }}
              onMouseEnter={() => {
                if (activeAction === undefined) setInternalAction(action.id)
              }}
              onMouseLeave={() => {
                if (activeAction === undefined) setInternalAction('none')
              }}
              type="button"
            >
              <span className="blinkx-quick-action-bar__action-content">{action.icon}</span>
            </button>
          ))}
        </div>

        <button
          aria-label="More options"
          className="blinkx-quick-action-bar__more"
          data-active={currentAction === 'more-options' ? 'true' : undefined}
          onClick={() => handleAction('more-options')}
          onFocus={() => {
            if (activeAction === undefined) setInternalAction('more-options')
          }}
          onMouseEnter={() => {
            if (activeAction === undefined) setInternalAction('more-options')
          }}
          onMouseLeave={() => {
            if (activeAction === undefined) setInternalAction('none')
          }}
          type="button"
        >
          <DotsIcon />
        </button>
      </div>
    </div>
  )
}
```

## Core CSS

```css
.blinkx-quick-action-bar {
  --qbar-buy: #2bb02b;
  --qbar-buy-hover: #289329;
  --qbar-control-bg: #ffffff;
  --qbar-control-hover: #f2f2f2;
  --qbar-icon: #414143;
  --qbar-sell: #dd2006;
  --qbar-sell-hover: #b6200c;
  --qbar-shadow-lg: 0 2px 2px -1px #0a0d100a, 0 4px 6px -2px #0a0d1008, 0 12px 16px -4px #0a0d1014;
  --qbar-shadow-xl: 0 3px 3px -1.5px #0a0d100a, 0 8px 8px -4px #0a0d1008, 0 20px 24px -4px #0a0d1014;
  --qbar-stroke: #e0e0e0;
  --qbar-surface: #ffffff;
  --qbar-tooltip-bg: #000000;
  --qbar-tooltip-stroke: transparent;
  --qbar-tooltip-text: #ffffff;
  align-items: center;
  background: var(--qbar-surface);
  border: 0;
  border-radius: 12px;
  box-shadow: var(--qbar-shadow-lg);
  box-sizing: border-box;
  display: inline-flex;
  flex-direction: column;
  font-family: Barlow, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  gap: 4px;
  min-height: 44px;
  outline: 1px solid var(--qbar-stroke);
  outline-offset: -1px;
  padding: 8px;
  position: relative;
  width: fit-content;
}

.blinkx-quick-action-bar--theme-dark {
  --qbar-buy: #45b045;
  --qbar-buy-hover: #367139;
  --qbar-control-bg: #1a1e23;
  --qbar-control-hover: #33373b;
  --qbar-icon: #999999;
  --qbar-sell: #dd422c;
  --qbar-sell-hover: #85382f;
  --qbar-shadow-lg: 0 2px 2px -1px #0a0d1033, 0 4px 6px -2px #0a0d102e, 0 12px 16px -4px #0a0d105c;
  --qbar-shadow-xl: 0 3px 3px -1.5px #0a0d1033, 0 8px 8px -4px #0a0d102e, 0 20px 24px -4px #0a0d105c;
  --qbar-stroke: #353c46;
  --qbar-surface: #1a1e23;
  --qbar-tooltip-bg: #000000;
  --qbar-tooltip-stroke: #24282d;
  --qbar-tooltip-text: #ffffff;
}

.blinkx-quick-action-bar__content {
  align-items: center;
  display: inline-flex;
  gap: 6px;
  height: 28px;
}

.blinkx-quick-action-bar__group {
  align-items: center;
  display: inline-flex;
  gap: 8px;
}

.blinkx-quick-action-bar__action,
.blinkx-quick-action-bar__more {
  align-items: center;
  appearance: none;
  color: var(--qbar-icon);
  cursor: pointer;
  display: inline-flex;
  flex: 0 0 auto;
  justify-content: center;
  margin: 0;
  transition:
    background 160ms cubic-bezier(0.2, 0, 0, 1),
    border-color 160ms cubic-bezier(0.2, 0, 0, 1),
    box-shadow 160ms cubic-bezier(0.2, 0, 0, 1),
    color 160ms cubic-bezier(0.2, 0, 0, 1),
    transform 160ms cubic-bezier(0.2, 0, 0, 1);
}

.blinkx-quick-action-bar__action {
  background: var(--qbar-control-bg);
  border: 1px solid var(--qbar-stroke);
  border-radius: 8px;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 18px;
  font-weight: 600;
  height: 28px;
  letter-spacing: 0;
  line-height: 22px;
  padding: 0;
  width: 28px;
}

.blinkx-quick-action-bar__action[data-tone="buy"] {
  background: var(--qbar-buy);
  border-color: transparent;
  color: #ffffff;
}

.blinkx-quick-action-bar__action[data-tone="sell"] {
  background: var(--qbar-sell);
  border-color: transparent;
  color: #ffffff;
}

.blinkx-quick-action-bar__action:hover,
.blinkx-quick-action-bar__action[data-active="true"] {
  background: var(--qbar-control-hover);
  transform: translateY(-1px);
}

.blinkx-quick-action-bar__action[data-tone="buy"]:hover,
.blinkx-quick-action-bar__action[data-tone="buy"][data-active="true"] {
  background: var(--qbar-buy-hover);
}

.blinkx-quick-action-bar__action[data-tone="sell"]:hover,
.blinkx-quick-action-bar__action[data-tone="sell"][data-active="true"] {
  background: var(--qbar-sell-hover);
}

.blinkx-quick-action-bar__icon,
.blinkx-quick-action-bar__dots {
  display: block;
  height: 16px;
  width: 16px;
}

.blinkx-quick-action-bar__icon-fill {
  fill: currentColor;
}

.blinkx-quick-action-bar__icon-stroke {
  stroke: currentColor;
}

.blinkx-quick-action-bar__more {
  background: transparent;
  border: 0;
  border-radius: 6px;
  height: 28px;
  padding: 0;
  position: relative;
  width: 16px;
}

.blinkx-quick-action-bar__more::before {
  background: var(--qbar-control-hover);
  border-radius: 6px;
  content: "";
  height: 28px;
  left: 50%;
  opacity: 0;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: opacity 160ms cubic-bezier(0.2, 0, 0, 1), background 160ms cubic-bezier(0.2, 0, 0, 1);
  width: 16px;
  z-index: 0;
}

.blinkx-quick-action-bar__more:hover::before,
.blinkx-quick-action-bar__more[data-active="true"]::before {
  opacity: 1;
}

.blinkx-quick-action-bar__tooltip {
  --tooltip-bg: var(--qbar-tooltip-bg);
  --tooltip-title: var(--qbar-tooltip-text);
  bottom: calc(100% - 6px);
  left: 22px;
  filter: none;
  pointer-events: none;
  position: absolute;
  transform: translateX(-50%);
  z-index: 2;
}

.blinkx-quick-action-bar__tooltip .blinkx-tooltip__surface {
  box-shadow: var(--qbar-shadow-xl);
  justify-items: center;
  min-width: max-content;
  outline: 1px solid var(--qbar-tooltip-stroke);
  outline-offset: -1px;
  width: max-content;
  z-index: 2;
}

.blinkx-quick-action-bar__tooltip .blinkx-tooltip__title {
  overflow-wrap: normal;
  text-align: center;
  white-space: nowrap;
  word-break: normal;
}
```

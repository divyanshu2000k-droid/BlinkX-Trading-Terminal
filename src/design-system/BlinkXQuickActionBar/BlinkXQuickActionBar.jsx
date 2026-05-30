import { useState } from 'react'

import { BlinkXTooltip } from '../BlinkXTooltip'
import './BlinkXQuickActionBar.css'

function TradingViewIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="blinkx-quick-action-bar__icon"
      fill="none"
      height="16"
      viewBox="0 0 16 16"
      width="16"
    >
      <path
        className="blinkx-quick-action-bar__icon-fill"
        d="M10.5769 5.52034C10.5769 6.42308 9.84507 7.15494 8.94227 7.15494C8.0396 7.15494 7.30767 6.42308 7.30767 5.52028C7.30767 4.61761 8.03953 3.88574 8.94233 3.88574C9.84507 3.88574 10.5769 4.61754 10.5769 5.52034ZM6.5 4.00108H0V7.27028H3.2308V12.1164H6.5V4.00108ZM12.2308 4.00108H16L12.5961 12.1164H8.82693L12.2308 4.00108Z"
      />
    </svg>
  )
}

function ChartLineIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="blinkx-quick-action-bar__icon"
      fill="none"
      height="16"
      viewBox="0 0 16 16"
      width="16"
    >
      <path
        className="blinkx-quick-action-bar__icon-stroke"
        d="M13.9998 12.9999H1.99976V2.99992"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.45833"
      />
      <path
        className="blinkx-quick-action-bar__icon-stroke"
        d="M13.9998 5.99992L9.99976 9.49992L5.99976 6.49992L1.99976 9.99992"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.45833"
      />
    </svg>
  )
}

function MarketDepthIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="blinkx-quick-action-bar__icon"
      fill="none"
      height="15"
      viewBox="0 0 15 15"
      width="15"
    >
      <path
        className="blinkx-quick-action-bar__icon-stroke"
        d="M7.42981 1.14265L7.42981 13.7141"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        className="blinkx-quick-action-bar__icon-fill"
        d="M1.14343 4.96291C0.729219 4.96291 0.393433 5.29869 0.393433 5.71291C0.393432 6.12712 0.729219 6.46291 1.14343 6.46291L1.14343 5.71291L1.14343 4.96291ZM1.14343 5.71291L1.14343 6.46291L5.14343 6.46291L5.14343 5.71291L5.14343 4.96291L1.14343 4.96291L1.14343 5.71291Z"
      />
      <path
        className="blinkx-quick-action-bar__icon-fill"
        d="M13.7144 9.32228C14.1286 9.32228 14.4644 8.98649 14.4644 8.57228C14.4644 8.15807 14.1286 7.82228 13.7144 7.82228L13.7144 8.57228L13.7144 9.32228ZM13.7144 8.57228L13.7144 7.82228L9.71436 7.82228L9.71436 8.57228L9.71436 9.32228L13.7144 9.32228L13.7144 8.57228Z"
      />
      <path
        className="blinkx-quick-action-bar__icon-fill"
        d="M2.28687 8.39273C1.87265 8.39273 1.53687 8.72852 1.53687 9.14273C1.53687 9.55694 1.87265 9.89273 2.28687 9.89273L2.28687 9.14273L2.28687 8.39273ZM2.28687 9.14273L2.28687 9.89273L5.14401 9.89273L5.14401 9.14273L5.14401 8.39273L2.28687 8.39273L2.28687 9.14273Z"
      />
      <path
        className="blinkx-quick-action-bar__icon-fill"
        d="M12.5718 5.89244C12.986 5.89244 13.3218 5.55665 13.3218 5.14244C13.3218 4.72823 12.986 4.39244 12.5718 4.39244L12.5718 5.14244L12.5718 5.89244ZM12.5718 5.14244L12.5718 4.39244L9.71463 5.14244L9.71463 5.89244L12.5718 5.89244L12.5718 5.14244Z"
      />
      <path
        className="blinkx-quick-action-bar__icon-fill"
        d="M1.71436 11.8221C1.30014 11.8221 0.964355 12.1579 0.964355 12.5721C0.964355 12.9863 1.30014 13.3221 1.71436 13.3221L1.71436 12.5721L1.71436 11.8221ZM1.71436 12.5721L1.71436 13.3221L5.14293 13.3221L5.14293 12.5721L5.14293 11.8221L1.71436 11.8221L1.71436 12.5721Z"
      />
      <path
        className="blinkx-quick-action-bar__icon-fill"
        d="M13.1434 2.46304C13.5576 2.46304 13.8934 2.12726 13.8934 1.71304C13.8934 1.29883 13.5576 0.963043 13.1434 0.963043L13.1434 1.71304L13.1434 2.46304ZM13.1434 1.71304L13.1434 0.963043L9.71486 0.963042L9.71486 1.71304L9.71486 2.46304L13.1434 2.46304L13.1434 1.71304Z"
      />
    </svg>
  )
}

function ChainIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="blinkx-quick-action-bar__icon"
      fill="none"
      height="16"
      viewBox="0 0 16 16"
      width="16"
    >
      <path
        className="blinkx-quick-action-bar__icon-stroke"
        d="M6.5 8.9217C6.6062 9.09563 6.73227 9.26025 6.87815 9.41205C7.78377 10.3546 9.16413 10.5019 10.2182 9.8541C10.4135 9.73402 10.5975 9.58672 10.7654 9.41205L13.1949 6.88352C14.2683 5.76635 14.2683 3.95506 13.1949 2.83788C12.1214 1.7207 10.3811 1.72071 9.30761 2.83788L8.77248 3.39483"
        strokeLinecap="round"
        strokeWidth="1.25"
      />
      <path
        className="blinkx-quick-action-bar__icon-stroke"
        d="M7.22769 12.6049L6.69234 13.162C5.61892 14.2792 3.87852 14.2792 2.80508 13.162C1.73164 12.0448 1.73164 10.2336 2.80508 9.11639L5.23463 6.58786C6.30807 5.47068 8.04848 5.47067 9.12188 6.58786C9.26775 6.73958 9.39375 6.90421 9.49995 7.07806"
        strokeLinecap="round"
        strokeWidth="1.25"
      />
    </svg>
  )
}

function DotsIcon() {
  return (
    <svg
      aria-hidden="true"
      className="blinkx-quick-action-bar__dots"
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        className="blinkx-quick-action-bar__icon-fill"
        d="M8 3.67a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM8 15.33a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
      />
    </svg>
  )
}

const quickActions = [
  { ariaLabel: 'Buy', icon: 'B', id: 'buy', label: 'Buy', tone: 'buy' },
  { ariaLabel: 'Sell', icon: 'S', id: 'sell', label: 'Sell', tone: 'sell' },
  {
    ariaLabel: 'Trading View',
    icon: <TradingViewIcon />,
    id: 'trading-view',
    label: 'Trading View',
    tone: 'icon',
  },
  {
    ariaLabel: 'View Chart',
    icon: <ChartLineIcon />,
    id: 'view-chart',
    label: 'View Chart',
    tone: 'icon',
  },
  {
    ariaLabel: 'Market depth',
    icon: <MarketDepthIcon />,
    id: 'market-depth',
    label: 'Market depth',
    tone: 'subtle',
  },
  {
    ariaLabel: 'Option chain',
    icon: <ChainIcon />,
    id: 'option-chain',
    label: 'Option chain',
    tone: 'subtle',
  },
]

export function BlinkXQuickActionBar({
  activeAction,
  className = '',
  defaultActiveAction = 'none',
  onActionChange,
  showTooltip = true,
  theme = 'light',
  ...toolbarProps
}) {
  const [internalAction, setInternalAction] = useState(defaultActiveAction)
  const currentAction = activeAction ?? internalAction
  const tooltipAction =
    quickActions.find((action) => action.id === currentAction) ??
    (currentAction === 'more-options'
      ? {
          ariaLabel: 'More options',
          icon: null,
          id: 'more-options',
          label: 'More options',
          tone: 'more',
        }
      : undefined)
  const classes = [
    'blinkx-quick-action-bar',
    `blinkx-quick-action-bar--theme-${theme}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  function handleAction(action) {
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

export default BlinkXQuickActionBar;

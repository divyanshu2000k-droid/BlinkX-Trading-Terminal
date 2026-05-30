import { useEffect, useId, useRef } from 'react'

import './BlinkXContentDropdown.css'

function CaretIcon({ open }) {
  return (
    <svg
      aria-hidden="true"
      className="blinkx-content-dropdown__caret"
      data-open={open ? 'true' : 'false'}
      fill="none"
      viewBox="0 0 16 16"
    >
      <path d="M3 6.25 8 10.75l5-4.5" />
    </svg>
  )
}

function LeadingCoinIcon() {
  return (
    <svg
      aria-hidden="true"
      className="blinkx-content-dropdown__leading-icon"
      fill="none"
      viewBox="0 0 20 20"
    >
      <defs>
        <linearGradient id="content-dropdown-coin-fill" x1="3" x2="17" y1="3" y2="17">
          <stop stopColor="#F8BC67" />
          <stop offset="0.5" stopColor="#FB8043" />
          <stop offset="1" stopColor="#DD3B59" />
        </linearGradient>
        <linearGradient id="content-dropdown-coin-stroke" x1="4" x2="16" y1="4" y2="16">
          <stop stopColor="#C87618" />
          <stop offset="1" stopColor="#8E5A12" />
        </linearGradient>
      </defs>
      <circle cx="10" cy="10" r="8" fill="url(#content-dropdown-coin-fill)" />
      <path
        d="M6.6 12.2c1.1 1.5 3.9 2 5.9.5 1.7-1.3 2.2-3.6 1-5.1-1.1-1.5-3.9-2-5.9-.5-1.8 1.3-2.2 3.5-1 5.1Z"
        fill="#7A4F11"
        opacity="0.28"
      />
      <path
        d="M5.8 9.4c2.5-.8 5.3-2.8 6.7-4.1M7.1 14.2c1.3-1.4 3.6-3.5 6.9-5"
        stroke="#FFE0A1"
        strokeLinecap="round"
        strokeWidth="1"
        opacity="0.55"
      />
      <circle
        cx="10"
        cy="10"
        r="7.65"
        stroke="url(#content-dropdown-coin-stroke)"
        strokeOpacity="0.28"
        strokeWidth="0.7"
      />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="blinkx-content-dropdown__check"
      fill="none"
      viewBox="0 0 12 12"
    >
      <path d="m2.2 6.2 2.3 2.2 5.3-5.2" />
    </svg>
  )
}

function hoveredItemToIndex(hoveredItem) {
  if (hoveredItem === 'Item 1') return 0
  if (hoveredItem === 'Item 2') return 1
  if (hoveredItem === 'Item 3') return 2
  if (hoveredItem === 'Item 4') return 3
  if (hoveredItem === 'Item 5') return 4
  return -1
}

function clampSelectedIndex(index) {
  if (!Number.isFinite(index)) return 0
  return Math.min(4, Math.max(0, Math.round(index)))
}

export function BlinkXContentDropdown({
  className = '',
  hoveredItem = 'None',
  item1Label = 'Name of the Menu',
  item2Label = 'Name of the Menu',
  item3Label = 'Name of the Menu',
  item4Label = 'Name of the Menu',
  item5Label = 'Name of the Menu',
  leadingIcon = true,
  menuLabel = 'Name of the Menu',
  onItemSelect,
  onStateChange,
  selectedIndex = 0,
  size = 'md',
  state = 'Default',
  theme = 'light',
  ...dropdownProps
}) {
  const dropdownId = useId()
  const rootRef = useRef(null)
  const isOpen = state === 'Active'
  const hoveredIndex = hoveredItemToIndex(hoveredItem)
  const selectedItemIndex = clampSelectedIndex(selectedIndex)
  const items = [item1Label, item2Label, item3Label, item4Label, item5Label]
  const classes = [
    'blinkx-content-dropdown',
    `blinkx-content-dropdown--size-${size}`,
    `blinkx-content-dropdown--state-${state.toLowerCase()}`,
    `blinkx-content-dropdown--theme-${theme}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  function handleTriggerClick() {
    onStateChange?.(isOpen ? 'Default' : 'Active')
  }

  useEffect(() => {
    if (!isOpen) return

    function handleOutsidePointerDown(event) {
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
      className={classes}
      data-leading-icon={leadingIcon ? 'on' : 'off'}
      data-size={size}
      data-state={state}
      data-theme={theme}
      ref={rootRef}
    >
      <button
        aria-controls={dropdownId}
        aria-expanded={isOpen}
        className="blinkx-content-dropdown__trigger"
        onClick={handleTriggerClick}
        type="button"
      >
        <span className="blinkx-content-dropdown__trigger-label">{menuLabel}</span>
        <CaretIcon open={isOpen} />
      </button>

      <div
        aria-hidden={!isOpen}
        className="blinkx-content-dropdown__menu"
        data-open={isOpen ? 'true' : 'false'}
        id={dropdownId}
        role="menu"
      >
        {items.map((item, index) => {
          const isSelected = selectedItemIndex === index

          return (
            <button
              className="blinkx-content-dropdown__item"
              data-hovered={hoveredIndex === index ? 'true' : 'false'}
              data-selected={isSelected ? 'true' : 'false'}
              key={`${item}-${index}`}
              onClick={() => onItemSelect?.(index, item)}
              role="menuitemradio"
              tabIndex={isOpen ? 0 : -1}
              type="button"
            >
              <span className="blinkx-content-dropdown__item-content">
                {leadingIcon ? <LeadingCoinIcon /> : null}
                <span className="blinkx-content-dropdown__item-label">{item}</span>
              </span>
              {isSelected ? <CheckIcon /> : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default BlinkXContentDropdown;

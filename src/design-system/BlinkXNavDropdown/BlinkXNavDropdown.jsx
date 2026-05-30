import { useEffect, useId, useRef } from 'react'

import './BlinkXNavDropdown.css'

function CaretIcon({ open }) {
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

function hoveredItemToIndex(hoveredItem) {
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
}) {
  const dropdownId = useId()
  const rootRef = useRef(null)
  const isOpen = state === 'Active'
  const hoveredIndex = hoveredItemToIndex(hoveredItem)
  const items = [item1Label, item2Label, item3Label]
  const classes = [
    'blinkx-nav-dropdown',
    `blinkx-nav-dropdown--theme-${theme}`,
    `blinkx-nav-dropdown--state-${state.toLowerCase()}`,
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

export default BlinkXNavDropdown;

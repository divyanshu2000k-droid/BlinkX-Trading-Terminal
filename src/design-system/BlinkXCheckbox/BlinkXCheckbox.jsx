import { useEffect, useRef } from 'react'

import './BlinkXCheckbox.css'

const checkboxIconSpecs = {
  sm: {
    checkPath: 'M1.5625 5.3125L4.0625 7.8125L8.75 2.8125',
    minusPath: 'M1.5 5H8.5',
    strokeWidth: 1.25,
  },
  md: {
    checkPath: 'M1.875 6.375L4.875 9.375L10.5 3.375',
    minusPath: 'M1.745 6H10.273',
    strokeWidth: 1.5,
  },
  lg: {
    checkPath: 'M2.5 8.5L6.5 12.5L14 4.5',
    minusPath: 'M2.5 8H13.5',
    strokeWidth: 2,
  },
}

export function BlinkXCheckbox({
  'aria-label': ariaLabel = 'Checkbox',
  checked,
  className = '',
  disabled = false,
  onChange,
  size = 'sm',
  state = 'Default',
  theme = 'light',
  ...inputProps
}) {
  const inputRef = useRef(null)
  const isDisabled = disabled || state === 'Disable'
  const isIndeterminate = state === 'Interminate'
  const isChecked = checked ?? (state === 'Active' || state === 'Active-Hover' || isIndeterminate)
  const icon = checkboxIconSpecs[size]
  const classes = [
    'blinkx-checkbox',
    `blinkx-checkbox--size-${size}`,
    `blinkx-checkbox--state-${state.toLowerCase()}`,
    `blinkx-checkbox--theme-${theme}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = isIndeterminate
    }
  }, [isIndeterminate])

  return (
    <label className={classes} data-state={state} data-theme={theme}>
      <input
        {...inputProps}
        aria-checked={isIndeterminate ? 'mixed' : isChecked}
        aria-label={ariaLabel}
        checked={isChecked}
        className="blinkx-checkbox__input"
        disabled={isDisabled}
        onChange={onChange}
        readOnly={!onChange}
        ref={inputRef}
        type="checkbox"
      />
      <span className="blinkx-checkbox__control" aria-hidden="true">
        <svg
          className="blinkx-checkbox__icon blinkx-checkbox__icon--check"
          fill="none"
          viewBox={`0 0 ${iconSizeFor(size)} ${iconSizeFor(size)}`}
        >
          <path
            d={icon.checkPath}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={icon.strokeWidth}
          />
        </svg>
        <svg
          className="blinkx-checkbox__icon blinkx-checkbox__icon--minus"
          fill="none"
          viewBox={`0 0 ${iconSizeFor(size)} ${iconSizeFor(size)}`}
        >
          <path
            d={icon.minusPath}
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth={icon.strokeWidth}
          />
        </svg>
      </span>
    </label>
  )
}

function iconSizeFor(size) {
  if (size === 'sm') return 10
  if (size === 'md') return 12
  return 16
}

export default BlinkXCheckbox;

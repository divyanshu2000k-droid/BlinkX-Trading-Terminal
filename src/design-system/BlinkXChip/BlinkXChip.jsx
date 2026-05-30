import './BlinkXChip.css'

function getNumberTagState(state, numberTagState) {
  if (numberTagState) return numberTagState
  if (state === 'active') return 'Active'
  if (state === 'disabled') return 'Disabled'

  return 'Default'
}

export function BlinkXChip({
  className = '',
  disabled = false,
  label = 'Options',
  numberTagState,
  numberTagText = '12',
  onClick,
  showLeadingLogo = true,
  size = 'sm',
  state = 'default',
  theme = 'light',
  type = 'Chip-basic',
  ...buttonProps
}) {
  const isDisabled = disabled || state === 'disabled'
  const isNumberChip = type === 'chip-Number'
  const safeNumberTagState = getNumberTagState(state, numberTagState)
  const shouldShowLeadingLogo = isNumberChip && showLeadingLogo && size === 'lg'
  const classes = [
    'blinkx-chip',
    `blinkx-chip--type-${type === 'Chip-basic' ? 'basic' : 'number'}`,
    `blinkx-chip--state-${state}`,
    `blinkx-chip--size-${size}`,
    `blinkx-chip--theme-${theme}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      {...buttonProps}
      aria-pressed={state === 'active'}
      className={classes}
      data-state={state}
      data-theme={theme}
      disabled={isDisabled}
      onClick={onClick}
      type="button"
    >
      <span className="blinkx-chip__content">
        {shouldShowLeadingLogo ? <span className="blinkx-chip__logo" aria-hidden="true" /> : null}
        <span className="blinkx-chip__label">{label}</span>
        {isNumberChip ? (
          <span
            className="blinkx-chip__number-tag"
            data-number-state={safeNumberTagState}
            data-size={size}
          >
            {numberTagText}
          </span>
        ) : null}
      </span>
    </button>
  )
}

export default BlinkXChip;

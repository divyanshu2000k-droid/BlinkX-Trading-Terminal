import './BlinkXRadio.css'

export function BlinkXRadio({
  'aria-label': ariaLabel = 'Radio',
  checked,
  className = '',
  disabled = false,
  onChange,
  size = 'sm',
  state = 'Default',
  theme = 'light',
  ...inputProps
}) {
  const isDisabled = disabled || state === 'Disable'
  const isChecked = checked ?? state === 'Active'
  const classes = [
    'blinkx-radio',
    `blinkx-radio--size-${size}`,
    `blinkx-radio--state-${state.toLowerCase()}`,
    `blinkx-radio--theme-${theme}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <label className={classes} data-state={state} data-theme={theme}>
      <input
        {...inputProps}
        aria-label={ariaLabel}
        checked={isChecked}
        className="blinkx-radio__input"
        disabled={isDisabled}
        onChange={onChange}
        readOnly={!onChange}
        type="radio"
      />
      <span className="blinkx-radio__control" aria-hidden="true">
        <span className="blinkx-radio__dot" />
      </span>
    </label>
  )
}

export default BlinkXRadio;

import './BlinkXButton.css'

function resolveType(type, variant) {
  if (type) return type
  if (variant === 'secondary') return 'Secondary'
  return 'Primary'
}

function BoltIcon() {
  return (
    <svg aria-hidden="true" className="blinkx-button__bolt" fill="currentColor" viewBox="0 0 24 24">
      <path d="M13.1 2.8 5.6 13h5.2l-1.4 8.2L18.6 9h-5.4l-.1-6.2Z" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg aria-hidden="true" className="blinkx-button__plus" viewBox="0 0 16 16">
      <path d="M8 3.5v9M3.5 8h9" />
    </svg>
  )
}

export function BlinkXButton({
  children,
  className = '',
  disabled = false,
  htmlType = 'button',
  label,
  leadingIcon = true,
  leadingIconNode,
  size = 'sm',
  state = 'Default',
  theme = 'light',
  trailingIcon = true,
  trailingIconNode,
  type,
  variant,
  ...buttonProps
}) {
  const componentType = resolveType(type, variant)
  const isDisabled = disabled || state === 'Disabled'
  const buttonLabel = label ?? children ?? 'Button'
  const showLeadingIcon = Boolean(leadingIconNode) || (componentType === 'with-icon' && leadingIcon)
  const showTrailingIcon = Boolean(trailingIconNode) || (componentType === 'with-icon' && trailingIcon)
  const classes = [
    'blinkx-button',
    `blinkx-button--type-${componentType.toLowerCase()}`,
    `blinkx-button--size-${size}`,
    `blinkx-button--state-${state.toLowerCase()}`,
    `blinkx-button--theme-${theme}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      {...buttonProps}
      className={classes}
      data-custom-leading-icon={leadingIconNode ? 'on' : 'off'}
      data-custom-trailing-icon={trailingIconNode ? 'on' : 'off'}
      data-component-type={componentType}
      data-leading-icon={showLeadingIcon ? 'on' : 'off'}
      data-size={size}
      data-state={state}
      data-theme={theme}
      data-trailing-icon={showTrailingIcon ? 'on' : 'off'}
      disabled={isDisabled}
      type={htmlType}
    >
      {leadingIconNode ? (
        <span className="blinkx-button__custom-icon">{leadingIconNode}</span>
      ) : showLeadingIcon ? (
        <PlusIcon />
      ) : null}
      <span className="blinkx-button__label">{buttonLabel}</span>
      {componentType === 'Primary' ? <BoltIcon /> : null}
      {trailingIconNode ? (
        <span className="blinkx-button__custom-icon">{trailingIconNode}</span>
      ) : showTrailingIcon ? (
        <PlusIcon />
      ) : null}
    </button>
  )
}

export default BlinkXButton;

import './BlinkXTooltip.css'

export function BlinkXTooltip({
  className = '',
  showSupportingText = true,
  supportingText = 'Tooltips are used to describe or identify an  element. In most scenarios, tooltips help the user understand meaning, function or alt-text.',
  title = 'Text goes here',
  type = 'Top-left',
  ...containerProps
}) {
  const classes = [
    'blinkx-tooltip',
    `blinkx-tooltip--type-${tooltipTypeClass(type)}`,
    !showSupportingText ? 'blinkx-tooltip--header-only' : null,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div {...containerProps} className={classes} data-type={type} role="tooltip">
      <span className="blinkx-tooltip__arrow" aria-hidden="true" />
      <div className="blinkx-tooltip__surface">
        <p className="blinkx-tooltip__title">{title}</p>
        {showSupportingText ? (
          <p className="blinkx-tooltip__supporting-text">{supportingText}</p>
        ) : null}
      </div>
    </div>
  )
}

function tooltipTypeClass(type) {
  return type.replaceAll('-', '-').toLowerCase()
}

export default BlinkXTooltip;

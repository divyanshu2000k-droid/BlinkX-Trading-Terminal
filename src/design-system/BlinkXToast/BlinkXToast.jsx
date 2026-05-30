import './BlinkXToast.css'

const defaultTitles = {
  negative: 'Order rejected : Market order not allowed in AMO',
  positive: 'After market order placed successfully.',
}

const defaultSupportingText =
  'Tooltips are used to describe or identify an  element. In most scenarios, tooltips help the user understand meaning, function or alt-text.'

function ErrorIcon() {
  return (
    <svg aria-hidden="true" className="blinkx-toast__status-icon" viewBox="0 0 24 24">
      <path d="M11 15h2v2h-2v-2Zm0-8h2v6h-2V7Zm1-5a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z" />
    </svg>
  )
}

function CheckCircleIcon() {
  return (
    <svg aria-hidden="true" className="blinkx-toast__status-icon" viewBox="0 0 24 24">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1.2 14.6-4-4 1.4-1.4 2.6 2.6 5.2-5.2 1.4 1.4-6.6 6.6Z" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" className="blinkx-toast__close-icon" viewBox="0 0 10 10">
      <path d="M2.1 2.1 7.9 7.9M7.9 2.1 2.1 7.9" />
    </svg>
  )
}

export function BlinkXToast({
  actionText = 'Undo',
  className = '',
  onActionClick,
  onClose,
  showSupportingText = true,
  supportingText = defaultSupportingText,
  theme = 'light',
  title,
  trailingText = false,
  type = 'negative',
  ...toastProps
}) {
  const toastTitle = title ?? defaultTitles[type]
  const classes = [
    'blinkx-toast',
    `blinkx-toast--theme-${theme}`,
    `blinkx-toast--type-${type}`,
    showSupportingText ? 'blinkx-toast--supporting-text' : 'blinkx-toast--no-supporting-text',
    trailingText ? 'blinkx-toast--trailing-text' : null,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      {...toastProps}
      className={classes}
      data-supporting-text={showSupportingText ? 'on' : 'off'}
      data-theme={theme}
      data-trailing-text={trailingText ? 'on' : 'off'}
      data-type={type}
      role={type === 'negative' ? 'alert' : 'status'}
    >
      <span className="blinkx-toast__accent" aria-hidden="true" />
      <div className="blinkx-toast__content-frame">
        <div className="blinkx-toast__message-group">
          {type === 'negative' ? <ErrorIcon /> : <CheckCircleIcon />}

          <div className="blinkx-toast__copy">
            <div className="blinkx-toast__headline-row">
              <p className="blinkx-toast__title">{toastTitle}</p>
              {trailingText ? (
                <button className="blinkx-toast__action" onClick={onActionClick} type="button">
                  {actionText}
                </button>
              ) : null}
            </div>

            {showSupportingText ? (
              <p className="blinkx-toast__supporting-text">{supportingText}</p>
            ) : null}
          </div>
        </div>

        <button
          aria-label="Close toast"
          className="blinkx-toast__close"
          onClick={onClose}
          type="button"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  )
}

export default BlinkXToast;

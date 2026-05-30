import './BlinkXBuySellButton.css'

function getButtonText({
  bs,
  buttonStyle,
  children,
  textOnBuyPrimary,
  textOnBuySecondary,
  textOnSellPrimary,
  textOnSellSecondary,
  textOnSymbolBuy,
  textOnSymbolSell,
  type,
}) {
  if (children) return children
  if (buttonStyle === 'Symbol') return bs === 'Sell' ? (textOnSymbolSell ?? 'S') : (textOnSymbolBuy ?? 'B')
  if (bs === 'Sell') return type === 'Secondary' ? (textOnSellSecondary ?? 'Sell') : (textOnSellPrimary ?? 'Sell')

  return type === 'Secondary' ? (textOnBuySecondary ?? 'Buy') : (textOnBuyPrimary ?? 'Buy')
}

export function BlinkXBuySellButton({
  bs = 'Buy',
  type = 'Primary',
  buttonStyle = 'Default',
  children,
  className = '',
  disabled = false,
  htmlType = 'button',
  size = 'sm',
  state = 'Default',
  textOnBuyPrimary = 'Buy',
  textOnBuySecondary = 'Buy',
  textOnSellPrimary = 'Sell',
  textOnSellSecondary = 'Sell',
  textOnSymbolBuy = 'B',
  textOnSymbolSell = 'S',
  theme = 'light',
  ...buttonProps
}) {
  const isDisabled = disabled || state === 'Disabled'
  const classes = [
    'blinkx-buy-sell-button',
    `blinkx-buy-sell-button--type-${type.toLowerCase()}`,
    `blinkx-buy-sell-button--style-${buttonStyle.toLowerCase()}`,
    `blinkx-buy-sell-button--side-${bs.toLowerCase()}`,
    `blinkx-buy-sell-button--size-${size}`,
    `blinkx-buy-sell-button--state-${state.toLowerCase()}`,
    `blinkx-buy-sell-button--theme-${theme}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      {...buttonProps}
      className={classes}
      data-bs={bs}
      data-size={size}
      data-state={state}
      data-style={buttonStyle}
      data-theme={theme}
      data-type={type}
      disabled={isDisabled}
      type={htmlType}
    >
      <span className="blinkx-buy-sell-button__label">
        {getButtonText({
          bs,
          buttonStyle,
          children,
          textOnBuyPrimary,
          textOnBuySecondary,
          textOnSellPrimary,
          textOnSellSecondary,
          textOnSymbolBuy,
          textOnSymbolSell,
          type,
        })}
      </span>
    </button>
  )
}

export default BlinkXBuySellButton;

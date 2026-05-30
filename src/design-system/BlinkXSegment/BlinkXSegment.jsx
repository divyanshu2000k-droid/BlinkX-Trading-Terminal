import './BlinkXSegment.css'

function getSegmentButtonCount(noOfButtons) {
  return Number.parseInt(noOfButtons.replace('Segment-', ''), 10)
}

export function BlinkXSegment({
  className = '',
  labels,
  noOfButtons = 'Segment-2',
  onValueChange,
  selectedIndex = 0,
  size = 'sm',
  theme = 'light',
  ...containerProps
}) {
  const buttonCount = getSegmentButtonCount(noOfButtons)
  const activeIndex = Math.min(Math.max(selectedIndex, 0), buttonCount - 1)
  const segmentLabels = Array.from({ length: buttonCount }, (_, index) => labels?.[index] ?? 'Local')
  const classes = [
    'blinkx-segment',
    `blinkx-segment--count-${buttonCount}`,
    `blinkx-segment--size-${size}`,
    `blinkx-segment--theme-${theme}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      {...containerProps}
      aria-label="Segmented Set"
      className={classes}
      data-count={noOfButtons}
      data-selected-index={activeIndex}
      data-size={size}
      data-theme={theme}
      role="group"
    >
      {segmentLabels.map((label, index) => {
        const isActive = index === activeIndex

        return (
          <button
            aria-pressed={isActive}
            className="blinkx-segment__item"
            data-active={isActive ? 'true' : 'false'}
            key={`${label}-${index}`}
            onClick={() => onValueChange?.(index)}
            type="button"
          >
            <span className="blinkx-segment__label">{label}</span>
          </button>
        )
      })}
    </div>
  )
}

export default BlinkXSegment;

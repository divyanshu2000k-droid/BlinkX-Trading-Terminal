# Chart Widget

TradingView Advanced Chart embedded via the TV widget API.

## Props (via widgetConfig)

| prop | type | default | description |
|------|------|---------|-------------|
| symbol | string | 'NSE:RELIANCE' | TradingView symbol format |
| interval | string | '15' | Chart interval (minutes or 'D','W','M') |

## Files

- **index.jsx** — widget shell; handles loading/error states, mounts the container
- **hooks/useChart.js** — creates/destroys TradingView.widget instance; handles theme changes
- **Widget.module.css** — layout only (width/height/overflow); no colors

## Notes

- TradingView API does not accept CSS variables. Colors come from `getTVTheme()` in providers/tradingview.
- Each widget instance gets a stable unique container ID (`tv-chart-1`, `tv-chart-2`…) to allow multiple Chart panels.
- `allowMultiple: true` in widgetCatalog — multiple Chart panels are supported.
- Theme changes trigger a full TV widget remount (TradingView has no theme-update API).

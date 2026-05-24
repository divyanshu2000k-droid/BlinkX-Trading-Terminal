# ETF Heatmap Widget

Provider: TradingView ETF Heatmap
Script: embed-widget-etf-heatmap.js
Type: iframe embed

## What it shows
Indian ETF heatmap grouped by asset class.
Block size: volume.
Block color: price change %.
Data source: AllINEtf (all Indian ETFs).

## Theme
Tracks data-theme via MutationObserver.
Remounts on theme switch.
colorTheme passed directly in config.

## Config source
Matches TradingView verified working
embed code exactly.

## TradingView copyright
Visible per ToS. Handled by createEmbedWidget.

## To replace TradingView
Replace hooks/useEtfHeatmap.js only.
index.jsx stays unchanged.

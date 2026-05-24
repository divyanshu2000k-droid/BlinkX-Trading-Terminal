# Heatmap Widget

Provider: TradingView Stock Heatmap
Script: embed-widget-stock-heatmap.js
Type: iframe embed

## What it shows
SENSEX stock heatmap grouped by sector.
Block size: market cap.
Block color: price change %.
Exchange filter: BSE only.

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
Replace hooks/useHeatmap.js only.
index.jsx stays unchanged.

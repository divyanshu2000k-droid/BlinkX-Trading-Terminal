# Market Screeners Widget

Provider: TradingView Market Screener
Script: embed-widget-screener.js
Type: iframe embed

## What it shows
India stock screener with filters and sorting.
Default view: overview, sorted by market cap.
Market: india (BSE/NSE listed stocks).

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
Replace hooks/useMarketScreeners.js only.
index.jsx stays unchanged.

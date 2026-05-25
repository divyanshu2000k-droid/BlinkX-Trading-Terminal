# News Stories Widget

Provider: TradingView Timeline
Script: embed-widget-timeline.js
Type: iframe embed

## What it shows
Live market news feed from all symbols.
TradingView curated financial news.

## Theme
Tracks data-theme via MutationObserver.
Remounts on theme switch.
colorTheme passed directly in config.

## TradingView copyright
Visible per ToS. Handled by createEmbedWidget.

## To replace TradingView
Replace hooks/useNewsStories.js only.
index.jsx stays unchanged.

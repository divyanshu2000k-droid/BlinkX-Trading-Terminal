# Indices Widget

Provider: TradingView Symbol Overview (iframe embed)
Script: embed-widget-symbol-overview.js

## What it shows
Indian market indices with mini area charts.
Default: NIFTY 50, BANK NIFTY, SENSEX,
         NIFTY IT, NIFTY FMCG, MIDCAP 100

## To change which indices appear
Edit INDIA_SYMBOLS array in hooks/useIndices.js
Format: ['Display Name', 'EXCHANGE:SYMBOL|TIMEFRAME']

## Theme
Tracks data-theme attribute automatically.
Remounts widget on theme switch.
Colors sourced from getTVTheme() in tvThemeMap.js.

## Lazy loading
Widget mounts TV embed only when Dockview panel
becomes visible — uses panelApi.onDidVisibilityChange.
If panel is already visible on creation, mounts immediately.

## TradingView copyright
Copyright attribution is required by TradingView ToS.
It is styled minimally but must remain visible.
Do not hide it with display: none.

## To replace TradingView
Replace hooks/useIndices.js only.
index.jsx and Widget.module.css stay unchanged.

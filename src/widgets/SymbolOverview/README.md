# Symbol Overview Widget

Provider: TradingView (4 iframe embeds)
Type: Unified research panel

## Sub-widgets
1. Symbol Info (banner)
   embed-widget-symbol-info.js
2. Technical Analysis (left col, 420px)
   embed-widget-technical-analysis.js
3. Company Profile (left col, 420px)
   embed-widget-symbol-profile.js
4. Fundamental Data (right col, 860px)
   embed-widget-financials.js

## Default symbol
BSE:SENSEX — configurable via config.symbol

## Layout
Wide (density full, 480px+):
  Two columns side by side
  Left: Technical Analysis + Company Profile
  Right: Fundamental Data

Narrow (density below full):
  Single column, scrollable

## Copyright
One TradingView copyright at bottom of
Company Profile section only.

## Theme
All four widgets remount on theme switch.

## To replace TradingView
Replace hooks/useSymbolOverview.js only.

# Economic Map Widget

Provider: TradingView Economic Map
Type: Web Component (NOT iframe embed)
Script: tv-economic-map.js (ES module)

## Important
This widget uses the Web Component pattern
NOT the createEmbedWidget iframe pattern.
Do not try to use createEmbedWidget here.

## Theme
key={theme} forces React to remount the
Web Component on theme change.
Web Components read attributes only once
on initialization.

## Attributes
theme: 'dark' | 'light'
Set imperatively via ref.setAttribute()

## No copyright div needed
Web Component manages its own attribution.

## To replace TradingView
Replace hooks/useEconomicMap.js and
update index.jsx accordingly.

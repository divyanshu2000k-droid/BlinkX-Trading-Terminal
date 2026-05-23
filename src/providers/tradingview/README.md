# TradingView Provider

Shared infrastructure for embedding TradingView widgets. Consumed by any widget that needs a chart.

## Files

- **useTradingViewScript.js** — singleton hook. Loads `tv.js` once per session. Returns `{ ready, error }`.
- **tvThemeMap.js** — exports `tvThemeMap` (static map) and `getTVTheme()` (reads `data-theme` attribute).

## Critical constraints

- TradingView widget does not accept CSS variables. All colors in `tvThemeMap.js` are hardcoded hex.
- When updating theme colors in `variables.css`, update `tvThemeMap.js` too.
- Use `useTradingViewScript` — never load `tv.js` from a widget directly.
- `getTVTheme()` reads from `document.documentElement.getAttribute('data-theme')`. Falls back to dark.

## Usage

```jsx
import { useTradingViewScript } from '../../providers/tradingview/useTradingViewScript';
import { getTVTheme } from '../../providers/tradingview/tvThemeMap';

const { ready, error } = useTradingViewScript();
const colors = getTVTheme();
```

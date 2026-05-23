# Market Data Provider (Phase 2)

WebSocket/REST feed hooks. Backend handoff target.

## Status

Placeholder. Hooks will live here once the backend WebSocket feed is available.

## MarketSnapshot — data contract

Every market data hook returns data in this shape. Mock files in each widget must match exactly.

```js
// MarketSnapshot
{
  symbol:     string,    // e.g. 'RELIANCE', 'NIFTY 50'
  exchange:   string,    // 'NSE' | 'BSE' | 'NFO' | 'MCX'
  ltp:        number,    // last traded price
  open:       number,
  high:       number,
  low:        number,
  close:      number,    // previous day close
  change:     number,    // ltp - close
  changePct:  number,    // (change / close) * 100
  volume:     number,    // total traded quantity
  oi:         number,    // open interest (0 for equities)
  timestamp:  number,    // Unix ms
}
```

## Phase transition

Replace the mock return in each widget's `hooks/use*.js` with a real WebSocket subscription. Component and CSS are untouched.

# Orders Provider (Phase 2)

Order placement and management hooks. Backend handoff target.

## Status

Placeholder. Hooks will live here once the broker API integration is available.

## OrderRequest — data contract

```js
// OrderRequest
{
  symbol:    string,    // e.g. 'RELIANCE'
  exchange:  string,    // 'NSE' | 'BSE' | 'NFO' | 'MCX'
  side:      'BUY' | 'SELL',
  quantity:  number,    // lot size × lots
  price:     number,    // 0 for MARKET orders
  orderType: 'MARKET' | 'LIMIT' | 'SL' | 'SL-M',
  product:   'MIS' | 'CNC' | 'NRML',
  validity:  'DAY' | 'IOC' | 'GTT',
}
```

## Phase transition

Widgets call `placeOrder(OrderRequest)` from this provider. Mock behaviour returns a synthetic order ID. Replace with real broker API call without touching any widget.

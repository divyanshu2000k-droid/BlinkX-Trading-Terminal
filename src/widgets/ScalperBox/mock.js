/**
 * SCALPER BOX MOCK DATA
 *
 * This file is the ONLY place with hardcoded data.
 * When connecting to real APIs:
 *   1. Replace instrument list with
 *      GET /api/v1/instruments/fno
 *   2. Replace expiries with
 *      GET /api/v1/expiries?sym={sym}
 *   3. Replace candle generation in
 *      useMarketData.js with WebSocket feed
 *   4. Nothing in any component changes
 */

export const mock = {
  instruments: {
    benchmarks: [
      { sym: 'NIFTY',      name: 'NIFTY 50',
        ltp: 24580.60, chgPct: 0.02,
        strikeStep: 50,  lot: 25  },
      { sym: 'BANKNIFTY',  name: 'BANK NIFTY',
        ltp: 52124.40, chgPct: 0.18,
        strikeStep: 100, lot: 15  },
      { sym: 'FINNIFTY',   name: 'FINNIFTY',
        ltp: 23455.20, chgPct: -0.04,
        strikeStep: 50,  lot: 40  },
      { sym: 'MIDCPNIFTY', name: 'MIDCPNIFTY',
        ltp: 12845.00, chgPct: 0.32,
        strikeStep: 25,  lot: 75  },
      { sym: 'SENSEX',     name: 'SENSEX',
        ltp: 79273.33, chgPct: 0.96,
        strikeStep: 100, lot: 10  },
    ],
    eqFno: [
      { sym: 'RELIANCE',   name: 'RELIANCE',
        ltp: 2948.10,  chgPct: 1.18,
        strikeStep: 20,  lot: 250 },
      { sym: 'HDFCBANK',   name: 'HDFCBANK',
        ltp: 1712.55,  chgPct: -0.72,
        strikeStep: 20,  lot: 550 },
      { sym: 'INFY',       name: 'INFY',
        ltp: 1448.20,  chgPct: -0.08,
        strikeStep: 20,  lot: 400 },
      { sym: 'ICICIBANK',  name: 'ICICIBANK',
        ltp: 1124.20,  chgPct: 0.84,
        strikeStep: 10,  lot: 700 },
      { sym: 'TATAMOTORS', name: 'TATAMOTORS',
        ltp: 870.30,   chgPct: -1.20,
        strikeStep: 10,  lot: 550 },
      { sym: 'SBIN',       name: 'SBIN',
        ltp: 784.20,   chgPct: 3.42,
        strikeStep: 10,  lot: 1500 },
    ],
    commodities: [
      { sym: 'CRUDEOIL', name: 'CRUDE OIL',
        ltp: 6128,    chgPct: 0.45,
        strikeStep: 50,  lot: 100 },
      { sym: 'GOLD',     name: 'GOLD',
        ltp: 71240,   chgPct: -0.22,
        strikeStep: 100, lot: 100 },
    ],
  },

  expiries: [
    { label: '28 May', fullLabel: '28 May 2026',
      dte: 7,  type: 'weekly'  },
    { label: '5 Jun',  fullLabel: '5 Jun 2026',
      dte: 14, type: 'weekly'  },
    { label: '12 Jun', fullLabel: '12 Jun 2026',
      dte: 21, type: 'weekly'  },
    { label: '26 Jun', fullLabel: '26 Jun 2026',
      dte: 36, type: 'monthly' },
    { label: '31 Jul', fullLabel: '31 Jul 2026',
      dte: 71, type: 'monthly' },
  ],

  positions: [],
};

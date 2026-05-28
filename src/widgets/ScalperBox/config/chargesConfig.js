export const CHARGES = {
  brokerage:             20,
  transactionChargeRate: 0.000355,
  gstRate:               0.18,
  sttBuyRate:            0.0001,
  stampDutyRate:         0.00003,
  spanMultiplier:        2.6,
  exposureRate:          0.12,
};

export const TIMEFRAMES =
  ['1m', '3m', '5m', '15m', '1h', '1D'];

export const CHANNEL_COLORS =
  ['blue', 'green', 'yellow', 'red', 'off'];

export const QUICK_STRIKE_KEYS =
  ['OTM2', 'OTM1', 'ATM', 'ITM1', 'ITM2'];

export const ORDER_TYPES = [
  { value: 'MKT', label: 'Market' },
  { value: 'LMT', label: 'Limit'  },
  { value: 'SL',  label: 'SL'     },
  { value: 'SLM', label: 'SL-M'   },
];

export const PRODUCT_TYPES = [
  { value: 'MIS',  label: 'MIS'  },
  { value: 'NRML', label: 'NRML' },
];

// JM Research mock multipliers
// TO REPLACE: fetch from JM Research API
export const JM_TARGET_MULT = 1.12;
export const JM_SL_MULT     = 0.88;

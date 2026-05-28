import { useState, useEffect, useRef, useCallback } from 'react';

function generateCandles(seed, basePrice, volatility, count = 40) {
  if (!basePrice || !volatility) return [];
  const candles = [];
  let last = basePrice;
  for (let i = 0; i < count; i++) {
    const open  = last;
    const move  = Math.sin(seed + i * 0.7) * volatility
      + (Math.random() - 0.5) * volatility * 0.5;
    const close = Math.max(0.01, open + move);
    const high  = Math.max(open, close) + Math.random() * volatility * 0.3;
    const low   = Math.min(open, close) - Math.random() * volatility * 0.3;
    const volume = Math.round(Math.random() * 50000 + 5000);
    candles.push({ open, high, low, close, volume, ts: Date.now() - (count - i) * 60000 });
    last = close;
  }
  return candles;
}

function deriveLtp(side, strike, underlyingLtp) {
  if (!underlyingLtp || !strike) return null;
  const intrinsic = side === 'call'
    ? Math.max(0, underlyingLtp - strike)
    : Math.max(0, strike - underlyingLtp);
  const timePremium =
    Math.abs(underlyingLtp - strike) < 200
      ? 15 + Math.random() * 10
      : 5  + Math.random() * 5;
  return Math.max(0.05, intrinsic + timePremium);
}

function buildStrikeList(underlyingLtp, strikeStep, spread = 10) {
  if (!underlyingLtp || !strikeStep) return [];
  const atm = Math.round(underlyingLtp / strikeStep) * strikeStep;
  return Array.from(
    { length: spread * 2 + 1 },
    (_, i) => atm + (i - spread) * strikeStep
  );
}

// BUG FIX: >= 1 not > 1 for 1-step ITM
function getMoneyness(side, strike, atm, strikeStep) {
  if (!strike || !atm || !strikeStep) return null;
  const diff = (strike - atm) / strikeStep;
  if (diff === 0) return 'ATM';
  if (side === 'call') {
    if (diff < 0) {
      const steps = Math.abs(diff);
      return steps >= 1 ? `ITM${steps}` : 'ITM';
    } else {
      return diff >= 1 ? `OTM${diff}` : 'OTM';
    }
  } else {
    if (diff > 0) {
      return diff >= 1 ? `ITM${diff}` : 'ITM';
    } else {
      const steps = Math.abs(diff);
      return steps >= 1 ? `OTM${steps}` : 'OTM';
    }
  }
}

export function useMarketData({ underlying, callStrike, putStrike, timeframe, spotMode }) {
  const [data, setData] = useState({
    callLtp: null, callBid: null, callAsk: null,
    callChgAbs: null, callChgPct: null,
    putLtp: null, putBid: null, putAsk: null,
    putChgAbs: null, putChgPct: null,
    spotLtp: null, spotChgAbs: null, spotChgPct: null,
    callCandles: [], spotCandles: [], putCandles: [],
    atmStrike: null,
    callMoneyness: null, putMoneyness: null,
    strikeList: [],
    isLoading: true,
    error: null,
  });

  const prevLtpsRef = useRef({ call: null, put: null, spot: null });

  const compute = useCallback(() => {
    if (!underlying?.ltp || !callStrike || !putStrike) return;

    const u = underlying;
    const atm = Math.round(u.ltp / u.strikeStep) * u.strikeStep;

    const callLtp = deriveLtp('call', callStrike, u.ltp);
    const putLtp  = deriveLtp('put',  putStrike,  u.ltp);
    const spotLtp = spotMode === 'fut' ? u.ltp * 1.0012 : u.ltp;

    const prev = prevLtpsRef.current;
    const callChgAbs = prev.call != null ? callLtp - prev.call : 0;
    const putChgAbs  = prev.put  != null ? putLtp  - prev.put  : 0;

    setData({
      callLtp,
      callBid:    +(callLtp - 0.05).toFixed(2),
      callAsk:    callLtp,
      callChgAbs,
      callChgPct: prev.call ? (callChgAbs / prev.call) * 100 : u.chgPct,

      putLtp,
      putBid:     +(putLtp - 0.05).toFixed(2),
      putAsk:     putLtp,
      putChgAbs,
      putChgPct:  prev.put ? (putChgAbs / prev.put) * 100 : -u.chgPct,

      spotLtp,
      spotChgAbs: u.ltp * u.chgPct / 100,
      spotChgPct: u.chgPct,

      callCandles: generateCandles(callStrike * 0.001,  callLtp, callLtp * 0.05),
      spotCandles: generateCandles(u.ltp * 0.001,       spotLtp, spotLtp * 0.002),
      putCandles:  generateCandles(putStrike * 0.0017,  putLtp,  putLtp * 0.05),

      atmStrike:     atm,
      callMoneyness: getMoneyness('call', callStrike, atm, u.strikeStep),
      putMoneyness:  getMoneyness('put',  putStrike,  atm, u.strikeStep),
      strikeList:    buildStrikeList(u.ltp, u.strikeStep),

      isLoading: false,
      error:     null,
    });

    prevLtpsRef.current = { call: callLtp, put: putLtp, spot: spotLtp };
  }, [underlying, callStrike, putStrike, timeframe, spotMode]);

  useEffect(() => {
    compute();
    // Mock ticker — TO REPLACE with WebSocket
    const interval = setInterval(compute, 3500);
    return () => clearInterval(interval);
  }, [compute]);

  return data;
}

import { useMemo } from 'react';
import { CHARGES } from '../config/chargesConfig.js';

export function useMarginCalc({ leg, action, lots, ltp, lotSize, underlyingLtp }) {
  return useMemo(() => {
    if (!ltp || !lotSize || !lots || !underlyingLtp) return { isReady: false };

    const qty      = lots * lotSize;
    const turnover = ltp * qty;

    const tradeValue = action === 'buy'
      ? turnover
      : turnover * CHARGES.spanMultiplier + underlyingLtp * qty * CHARGES.exposureRate;

    const brokerage         = CHARGES.brokerage;
    const transactionCharge = +(turnover * CHARGES.transactionChargeRate).toFixed(2);
    const gst               = +((brokerage + transactionCharge) * CHARGES.gstRate).toFixed(2);
    const stt               = action === 'buy' ? +(turnover * CHARGES.sttBuyRate).toFixed(2) : 0;
    const stampDuty         = action === 'buy' ? +(turnover * CHARGES.stampDutyRate).toFixed(2) : 0;
    const totalCharges      = +(brokerage + transactionCharge + gst + stt + stampDuty).toFixed(2);

    return {
      isReady: true,
      qty,
      tradeValue,
      brokerage,
      transactionCharge,
      clearingCharge:     0,
      sebiTurnover:       0,
      investorProtection: 0,
      gst,
      stt,
      stampDuty,
      totalCharges,
    };
  }, [leg, action, lots, ltp, lotSize, underlyingLtp]);
}

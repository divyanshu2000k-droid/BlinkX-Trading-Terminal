import { useState } from 'react';
import { Info } from 'lucide-react';
import { formatINR } from '../../../../primitives/index.js';
import {
  QUICK_STRIKE_KEYS,
  ORDER_TYPES,
  PRODUCT_TYPES,
} from '../../config/chargesConfig.js';
import styles from './OrderPad.module.css';

export default function OrderPad({
  leg,
  strike,
  strikeList,
  atmStrike,
  lots,
  ltp,
  bid,
  ask,
  moneyness,
  lotSize,
  buyMargin,
  sellMargin,
  settings,
  onTrade,
  onLotsChange,
  onStrikeChange,
  onOpenStrike,
  onOpenMargin,
}) {
  // Local state — per-pad setting, not in global state
  const [orderType, setOrderType] = useState('MKT');
  const [productType, setProductType] = useState('MIS');

  // Hotkey hints per leg
  const buyHk = leg === 'call' ? '↑' : '↓';
  const sellHk = leg === 'call' ? '←' : '→';

  // Detect which quick pill is active based on strike vs ATM
  const getActivePill = () => {
    if (!strike || !atmStrike || !strikeList) return null;
    const step = (strikeList.length >= 2)
      ? strikeList[1] - strikeList[0]
      : 50;
    const diff = (strike - atmStrike) / (step || 50);
    const stepMap = leg === 'call'
      ? { '-2': 'OTM2', '-1': 'OTM1', '0': 'ATM', '1': 'ITM1', '2': 'ITM2' }
      : { '2': 'OTM2', '1': 'OTM1', '0': 'ATM', '-1': 'ITM1', '-2': 'ITM2' };
    return stepMap[String(Math.round(diff))] ?? null;
  };
  const activePill = getActivePill();

  const handleQuickStrike = key => {
    if (!atmStrike || !strikeList) return;
    const step = (strikeList.length >= 2)
      ? strikeList[1] - strikeList[0]
      : 50;
    const offsets = leg === 'call'
      ? { OTM2: -2, OTM1: -1, ATM: 0, ITM1: 1, ITM2: 2 }
      : { OTM2: 2, OTM1: 1, ATM: 0, ITM1: -1, ITM2: -2 };
    onStrikeChange?.(atmStrike + (offsets[key] ?? 0) * (step || 50));
  };

  return (
    <div className={styles.pad}>

      {/* Row 1 — Strike + badge + quick pills */}
      <div className={styles.padHeader}>
        <button
          className={styles.strikeBtn}
          onClick={e => {
            e.stopPropagation();
            onOpenStrike?.(e);
          }}
        >
          {strike ?? '—'}
          <span className={styles.strikeBtnChevron}>▾</span>
        </button>

        <span className={leg === 'call' ? styles.legBadgeCall : styles.legBadgePut}>
          {leg === 'call' ? 'CE' : 'PE'}
        </span>

        <div className={styles.quickPills}>
          {QUICK_STRIKE_KEYS.map(key => (
            <button
              key={key}
              className={`${styles.qPill}${activePill === key ? ` ${styles.qPillActive}` : ''}`}
              onClick={() => handleQuickStrike(key)}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      {/* Row 2 — BID / ASK */}
      <div className={styles.bidAskRow}>
        <div className={styles.bidSide}>
          <span className={styles.baLabel}>BID</span>
          <span className={styles.baValue}>
            {bid != null ? formatINR(bid) : '—'}
          </span>
        </div>
        <div />
        <div className={styles.askSide}>
          <span className={styles.baLabel}>ASK</span>
          <span className={styles.baValue}>
            {ask != null ? formatINR(ask) : '—'}
          </span>
        </div>
      </div>

      {/* Row 3 — BUY | lots | SELL */}
      <div className={styles.tradeRow}>

        <button
          className={styles.buyBtn}
          onClick={() => onTrade?.('buy')}
        >
          <span>Buy</span>
          {settings?.showHotkeyHints && (
            <span className={styles.hkHint}>
              Shift <span className={styles.hkKey}>{buyHk}</span>
            </span>
          )}
        </button>

        <div className={styles.lotsBlock}>
          <div className={styles.qtyDesc}>
            Qty:{' '}
            <span className={styles.qtyDescVal}>
              {lots != null && lotSize ? lots * lotSize : '—'}
            </span>
          </div>
          <div className={styles.lotsRow}>
            <button
              className={styles.lotsBtn}
              onClick={() => onLotsChange?.(Math.max(1, (lots ?? 1) - 1))}
            >
              −
            </button>
            <input
              className={styles.lotsInput}
              type="text"
              value={lots ?? 1}
              onChange={e =>
                onLotsChange?.(Math.max(1, parseInt(e.target.value) || 1))
              }
            />
            <button
              className={styles.lotsBtn}
              onClick={() => onLotsChange?.((lots ?? 1) + 1)}
            >
              +
            </button>
          </div>
        </div>

        <button
          className={styles.sellBtn}
          onClick={() => onTrade?.('sell')}
        >
          <span>Sell</span>
          {settings?.showHotkeyHints && (
            <span className={styles.hkHint}>
              Shift <span className={styles.hkKey}>{sellHk}</span>
            </span>
          )}
        </button>

      </div>

      {/* Row 4 — Buy margin | spacer | Sell margin */}
      <div className={styles.marginRow}>
        <button
          className={styles.marginVal}
          onClick={e => onOpenMargin?.('buy', e)}
        >
          {buyMargin?.isReady ? formatINR(buyMargin.tradeValue) : '—'}
          <Info className={styles.marginInfoIcon} />
        </button>

        <div />

        <button
          className={styles.marginVal}
          onClick={e => onOpenMargin?.('sell', e)}
        >
          {sellMargin?.isReady ? formatINR(sellMargin.tradeValue) : '—'}
          <Info className={styles.marginInfoIcon} />
        </button>
      </div>

      {/* Row 5 — Order type + Product type */}
      {/*
        Using native <select> elements here.
        The shared Dropdown component renders
        too large for the 200px fixed pad height.
        Replace with compact Dropdown variant
        when available in component library.
      */}
      <div className={styles.otRow}>
        <select
          className={styles.padSelect}
          value={orderType}
          onChange={e => setOrderType(e.target.value)}
        >
          {ORDER_TYPES.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
        <select
          className={styles.padSelect}
          value={productType}
          onChange={e => setProductType(e.target.value)}
        >
          {PRODUCT_TYPES.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>

    </div>
  );
}

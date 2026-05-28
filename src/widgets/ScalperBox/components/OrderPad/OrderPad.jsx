import { useMarginCalc } from '../../hooks/useMarginCalc.js';
import { formatINR, FlashValue } from '../../../../primitives';
import { Icon } from '../../../../components';
import styles from './OrderPad.module.css';

export default function OrderPad({ leg, state, actions, marketData, onTrade, onOpenPopover }) {
  const isCall  = leg === 'call';
  const lots    = isCall ? state.callLots    : state.putLots;
  const setLots = isCall ? actions.setCallLots : actions.setPutLots;
  const bid     = isCall ? marketData.callBid  : marketData.putBid;
  const ask     = isCall ? marketData.callAsk  : marketData.putAsk;
  const ltp     = isCall ? marketData.callLtp  : marketData.putLtp;
  const lotSize = state.underlying?.lot ?? 0;
  const marginPopoverId = isCall ? 'callMargin' : 'putMargin';

  const margin = useMarginCalc({
    leg,
    action: 'buy',
    lots,
    ltp,
    lotSize,
    underlyingLtp: marketData.spotLtp,
  });

  const spread = bid != null && ask != null ? +(ask - bid).toFixed(2) : null;

  return (
    <div className={styles.pad}>
      {/* Bid / Ask */}
      <div className={styles.bidAskRow}>
        <div className={styles.baItem}>
          <span className={styles.baLabel}>Bid</span>
          <FlashValue value={bid} className={`${styles.baValue} ${styles.baValueBid}`} />
        </div>
        {spread != null && (
          <span className={styles.spread}>{formatINR(spread)}</span>
        )}
        <div className={styles.baItem}>
          <span className={styles.baLabel}>Ask</span>
          <FlashValue value={ask} className={`${styles.baValue} ${styles.baValueAsk}`} />
        </div>
      </div>

      {/* Lots control */}
      <div className={styles.lotsRow}>
        <span className={styles.lotsLabel}>Lots</span>
        <div className={styles.lotsControl}>
          <button className={styles.lotsBtn} onClick={() => setLots(lots - 1)}>−</button>
          <span className={styles.lotsValue}>{lots}</span>
          <button className={styles.lotsBtn} onClick={() => setLots(lots + 1)}>+</button>
        </div>
        {lotSize > 0 && (
          <span className={styles.qtyHint}>×{lotSize} = {lots * lotSize}</span>
        )}
      </div>

      {/* Buy / Sell buttons */}
      <div className={styles.tradeRow}>
        <button className={styles.buyBtn} onClick={() => onTrade?.('buy')}>
          BUY
        </button>
        <button className={styles.sellBtn} onClick={() => onTrade?.('sell')}>
          SELL
        </button>
      </div>

      {/* Margin */}
      <div className={styles.marginRow}>
        <span className={styles.marginLabel}>Req. Margin</span>
        <div
          className={styles.marginValue}
          onClick={e => onOpenPopover(marginPopoverId, e)}
          role="button"
          tabIndex={0}
        >
          <span className={styles.marginAmount}>
            {margin.isReady ? `₹${formatINR(margin.tradeValue)}` : '—'}
          </span>
          <span className={styles.marginInfo}>
            <Icon name="Info" size={11} />
          </span>
        </div>
      </div>
    </div>
  );
}

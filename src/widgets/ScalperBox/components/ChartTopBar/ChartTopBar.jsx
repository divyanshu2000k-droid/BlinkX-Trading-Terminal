import { FlashValue } from '../../../../primitives';
import { formatPercent, formatChange } from '../../../../primitives';
import { Icon } from '../../../../components';
import styles from './ChartTopBar.module.css';

export default function ChartTopBar({ leg, state, actions, marketData, onOpenPopover, density }) {
  const isSpot = leg === 'spot';

  if (isSpot) {
    const chgClass = (marketData.spotChgPct ?? 0) >= 0 ? styles.chgPos : styles.chgNeg;
    return (
      <div className={styles.bar}>
        <div className={styles.topRow}>
          <span className={styles.symLabel}>{state.underlying?.sym ?? '—'}</span>
          <span className={styles.symLabel}>
            {state.spotMode === 'fut' ? 'FUT' : 'SPOT'}
          </span>
        </div>
        <div className={styles.ltpRow}>
          <FlashValue value={marketData.spotLtp} className={styles.ltpLabel} />
          <span className={`${styles.chgLabel} ${chgClass}`}>
            {formatPercent(marketData.spotChgPct)}
          </span>
        </div>
      </div>
    );
  }

  const isCall = leg === 'call';
  const strike   = isCall ? state.callStrike : state.putStrike;
  const ltp      = isCall ? marketData.callLtp : marketData.putLtp;
  const chgPct   = isCall ? marketData.callChgPct : marketData.putChgPct;
  const chgAbs   = isCall ? marketData.callChgAbs : marketData.putChgAbs;
  const moneyness = isCall ? marketData.callMoneyness : marketData.putMoneyness;
  const popoverId  = isCall ? 'callStrike' : 'putStrike';
  const pillClass  = isCall ? styles.strikePillCall : styles.strikePillPut;
  const chgClass   = (chgPct ?? 0) >= 0 ? styles.chgPos : styles.chgNeg;
  const isAtm      = moneyness === 'ATM';

  return (
    <div className={styles.bar}>
      <div className={styles.topRow}>
        <button
          className={`${styles.strikePill} ${pillClass}`}
          onClick={e => onOpenPopover(popoverId, e)}
        >
          {strike ?? '—'}
          <span className={styles.chevron}><Icon name="ChevronDown" size={10} /></span>
        </button>
        {moneyness && (
          <span className={`${styles.moneynessTag} ${isAtm ? styles.moneynessATM : ''}`}>
            {moneyness}
          </span>
        )}
      </div>
      <div className={styles.ltpRow}>
        <FlashValue value={ltp} className={styles.ltpLabel} />
        {chgAbs != null && (
          <span className={`${styles.chgLabel} ${chgClass}`}>
            {formatChange(chgAbs)} ({formatPercent(chgPct)})
          </span>
        )}
      </div>
    </div>
  );
}

import { FlashValue, formatChange } from '../../../../primitives/index.js';
import styles from './ChartTopBar.module.css';

export default function ChartTopBar({
  leg,
  symbol,
  moneyness,
  ltp,
  chgAbs,
  chgPct,
  spotMode,
  onSpotModeChange,
  flash,
}) {
  const nameClass = leg === 'call'
    ? styles.nameCall
    : leg === 'put'
      ? styles.namePut
      : styles.nameSpot;

  const moneynessClass = !moneyness
    ? ''
    : moneyness === 'ATM'
      ? styles.moneynessAtm
      : moneyness.startsWith('ITM')
        ? styles.moneynessItm
        : styles.moneynessOtm;

  const isPos = (chgAbs ?? 0) >= 0;

  return (
    <div className={styles.topBar}>

      <span className={`${styles.name} ${nameClass}`}>
        {symbol ?? '—'}
      </span>

      {moneyness && (
        <span className={`${styles.moneyness} ${moneynessClass}`}>
          {moneyness}
        </span>
      )}

      {ltp != null && (
        <FlashValue
          value={ltp}
          flash={flash}
          className={styles.ltp}
        />
      )}

      {chgAbs != null && chgPct != null && (
        <span className={`${styles.chg} ${isPos ? styles.chgPos : styles.chgNeg}`}>
          {formatChange(chgAbs, chgPct)}
        </span>
      )}

      {leg === 'spot' && (
        <div className={styles.spotToggle}>
          <button
            className={`${styles.spotToggleBtn}${spotMode === 'spot' ? ` ${styles.spotToggleBtnActive}` : ''}`}
            onClick={() => onSpotModeChange?.('spot')}
          >
            SPOT
          </button>
          <button
            className={`${styles.spotToggleBtn}${spotMode === 'fut' ? ` ${styles.spotToggleBtnActive}` : ''}`}
            onClick={() => onSpotModeChange?.('fut')}
          >
            FUT
          </button>
        </div>
      )}

    </div>
  );
}

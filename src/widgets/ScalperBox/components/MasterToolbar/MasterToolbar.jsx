import { formatPercent } from '../../../../primitives';
import { TIMEFRAMES } from '../../config/chargesConfig.js';
import styles from './MasterToolbar.module.css';

export default function MasterToolbar({ state, actions, marketData, onOpenPopover }) {
  const { underlying, selectedExpiry, timeframe, showCall, showSpot, showPut, spotMode, oiProfileEnabled } = state;
  const chgPct = underlying?.chgPct ?? 0;
  const chgClass = chgPct >= 0 ? styles.pillChgPos : styles.pillChgNeg;

  return (
    <div className={styles.toolbar}>
      {/* Scrip pill */}
      <button className={styles.pill} onClick={e => onOpenPopover('scrip', e)}>
        {underlying?.sym ?? '—'}
        <span className={`${styles.pillChg} ${chgClass}`}>
          {formatPercent(chgPct)}
        </span>
      </button>

      {/* Expiry pill */}
      <button className={styles.pill} onClick={e => onOpenPopover('expiry', e)}>
        {selectedExpiry?.label ?? '—'}
      </button>

      <div className={styles.divider} />

      {/* CE / SPOT / PE independent toggle buttons */}
      <div className={styles.sideGroup}>
        <button
          className={`${styles.sideBtn} ${styles.sideBtnCall} ${showCall ? styles.sideBtnActive : ''}`}
          onClick={actions.toggleCall}
          title="Toggle CE column (key: 1)"
        >
          CE
        </button>
        <button
          className={`${styles.sideBtn} ${styles.sideBtnSpot} ${showSpot ? styles.sideBtnActive : ''}`}
          onClick={actions.toggleSpot}
          title="Toggle SPOT column (key: 2)"
        >
          SPOT
        </button>
        <button
          className={`${styles.sideBtn} ${styles.sideBtnPut} ${showPut ? styles.sideBtnActive : ''}`}
          onClick={actions.togglePut}
          title="Toggle PE column (key: 3)"
        >
          PE
        </button>
        <button
          className={styles.sideBtn}
          onClick={actions.showAll}
          title="Show all columns (key: 0)"
        >
          ALL
        </button>
      </div>

      <div className={styles.divider} />

      {/* Timeframe buttons */}
      <div className={styles.tfGroup}>
        {TIMEFRAMES.map(tf => (
          <button
            key={tf}
            className={`${styles.tfBtn} ${timeframe === tf ? styles.tfBtnActive : ''}`}
            onClick={() => actions.setTimeframe(tf)}
          >
            {tf}
          </button>
        ))}
      </div>

      <div className={styles.divider} />

      {/* Spot / Fut mode */}
      <button
        className={`${styles.modeBtn} ${spotMode === 'fut' ? styles.modeBtnActive : ''}`}
        onClick={() => actions.setSpotMode(spotMode === 'spot' ? 'fut' : 'spot')}
        title="Toggle Spot / Futures"
      >
        {spotMode === 'fut' ? 'FUT' : 'SPT'}
      </button>

      {/* OI Profile toggle */}
      <button
        className={`${styles.oiBtn} ${oiProfileEnabled ? styles.oiBtnActive : ''}`}
        onClick={actions.toggleOIProfile}
        title="Toggle OI Profile overlay"
      >
        OI
      </button>
    </div>
  );
}

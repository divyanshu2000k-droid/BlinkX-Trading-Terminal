import { PnLValue } from '../../../../primitives';
import styles from './CenterPad.module.css';

export default function CenterPad({ state, actions, marketData, scalperPnl, allPnl, onOpenPopover }) {
  const hasPositions = state.positions.length > 0;

  return (
    <div className={styles.pad}>
      {/* Scalper P&L */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Scalper P&L</span>
        <PnLValue value={scalperPnl} prefix="₹" />
      </div>

      <div className={styles.divider} />

      {/* All positions P&L */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>All Positions</span>
        <PnLValue value={allPnl} prefix="₹" />
        {hasPositions && (
          <span className={styles.posCount}>{state.positions.length} open</span>
        )}
      </div>

      {/* Exit all */}
      <button
        className={`${styles.exitBtn} ${!hasPositions ? styles.exitBtnDisabled : ''}`}
        onClick={() => hasPositions && actions.exitAllPositions()}
        disabled={!hasPositions}
      >
        EXIT ALL
      </button>
    </div>
  );
}

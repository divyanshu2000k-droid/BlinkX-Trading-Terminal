import { Search } from 'lucide-react';
import { PnLValue } from '../../../../primitives/index.js';
import styles from './CenterPad.module.css';

export default function CenterPad({
  underlying,
  selectedExpiry,
  scalperPnl,
  allPnl,
  onExitAll,
  onCancelAll,
  onOpenSearch,
  onOpenExpiry,
}) {
  return (
    <div className={styles.pad}>

      {/* Row 1 — Search + expiry */}
      <div className={styles.searchRow}>
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}>
            <Search size={12} />
          </span>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search instruments…"
            value={underlying?.sym ?? ''}
            readOnly
            onClick={e => {
              e.stopPropagation();
              onOpenSearch?.(e);
            }}
          />
        </div>
        <button
          className={styles.expiryBtn}
          onClick={e => {
            e.stopPropagation();
            onOpenExpiry?.(e);
          }}
        >
          {selectedExpiry?.label ?? '—'}
          <span className={styles.expiryChevron}>▾</span>
        </button>
      </div>

      {/* Row 2 — P&L hero */}
      <div className={styles.pnlHero}>
        <div className={styles.pnlLabel}>
          {underlying?.sym ?? '—'} P&L
        </div>
        {/* PnLValue handles color + sign automatically */}
        <PnLValue
          value={scalperPnl ?? 0}
          className={styles.pnlValue}
        />
      </div>

      {/* Row 3 — Stat columns */}
      <div className={styles.statCols}>
        <div className={styles.statCol}>
          <div className={styles.statColLabel}>Scalper Positions</div>
          <PnLValue
            value={scalperPnl ?? 0}
            className={styles.statColValue}
          />
        </div>
        <div className={styles.statCol}>
          <div className={styles.statColLabel}>All Positions</div>
          <PnLValue
            value={allPnl ?? 0}
            className={styles.statColValue}
          />
        </div>
      </div>

      {/* Row 4 — Actions at bottom (margin-top: auto) */}
      <div className={styles.actionsRow}>
        <button
          className={styles.dangerBtn}
          onClick={() => onExitAll?.()}
        >
          Exit All Positions
        </button>
        <button
          className={styles.warnBtn}
          onClick={() => onCancelAll?.()}
        >
          Cancel All Orders
        </button>
      </div>

    </div>
  );
}

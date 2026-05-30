import { Undo2, Redo2, Keyboard } from 'lucide-react';
import { IconButton } from '../../../../components/index.js';
import { TIMEFRAMES } from '../../config/chargesConfig.js';
import styles from './MasterToolbar.module.css';

export default function MasterToolbar({
  state,
  actions,
  marketData,
  onOpenPopover,
}) {
  const {
    underlying,
    selectedExpiry,
    timeframe,
    showCall,
    showSpot,
    showPut,
  } = state;

  return (
    <div className={styles.toolbar}>

      {/* Scrip pill — symbol + expiry, two independent click zones */}
      <div className={styles.scripPill}>
        <span
          className={styles.scripName}
          onClick={e => {
            e.stopPropagation();
            onOpenPopover('scrip', e);
          }}
        >
          {underlying?.sym ?? '—'}
        </span>
        <span
          className={styles.scripExp}
          onClick={e => {
            e.stopPropagation();
            onOpenPopover('expiry', e);
          }}
        >
          {selectedExpiry?.label ?? '—'}
          <span className={styles.scripChevron}>▾</span>
        </span>
      </div>

      <div className={styles.sep} />

      {/* Timeframe buttons */}
      <div className={styles.tfGroup}>
        {TIMEFRAMES.map(tf => (
          <button
            key={tf}
            className={`${styles.tfBtn}${timeframe === tf ? ` ${styles.tfBtnActive}` : ''}`}
            onClick={() => actions.setTimeframe(tf)}
          >
            {tf}
          </button>
        ))}
      </div>

      <div className={styles.sep} />

      {/* CE / SPOT / PE independent toggles */}
      <div className={styles.sideGroup}>
        <button
          className={`${styles.sideBtn} ${styles.sideBtnCall}${showCall ? ` ${styles.sideBtnActive}` : ''}`}
          onClick={() => actions.toggleCall()}
        >
          CE
        </button>
        <button
          className={`${styles.sideBtn} ${styles.sideBtnSpot}${showSpot ? ` ${styles.sideBtnActive}` : ''}`}
          onClick={() => actions.toggleSpot()}
        >
          SPOT
        </button>
        <button
          className={`${styles.sideBtn} ${styles.sideBtnPut}${showPut ? ` ${styles.sideBtnActive}` : ''}`}
          onClick={() => actions.togglePut()}
        >
          PE
        </button>
      </div>

      {/* ALL convenience button */}
      <button
        className={styles.allBtn}
        onClick={() => actions.showAll()}
      >
        ALL
      </button>

      <div className={styles.sep} />

      {/* Undo — fires toast in Phase 2 */}
      <IconButton icon={Undo2} size={14} title="Undo" onClick={() => {}} variant="ghost" />

      {/* Redo */}
      <IconButton icon={Redo2} size={14} title="Redo" onClick={() => {}} variant="ghost" />

      <div className={styles.spacer} />

      {/* Hotkeys popover trigger */}
      <button
        className={styles.hotkeysBtn}
        onClick={e => onOpenPopover('hotkeys', e)}
      >
        <Keyboard size={11} />
        Hotkeys
      </button>

    </div>
  );
}

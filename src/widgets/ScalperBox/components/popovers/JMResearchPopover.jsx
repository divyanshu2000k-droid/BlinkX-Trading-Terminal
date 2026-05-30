import { formatINR } from '../../../../primitives/index.js';
import { JM_TARGET_MULT, JM_SL_MULT } from '../../config/chargesConfig.js';
import { Popover } from './Popover.jsx';
import styles from './Popover.module.css';

// Mock thesis per leg
// TO REPLACE: fetch from JM Research API
// GET /api/jm-research?sym={sym}&leg={leg}
const JM_THESIS = {
  call: 'Q4 results beat. IV expansion expected ahead of expiry. Accumulate CE at current levels.',
  spot: 'NIM expansion supportive. Broader market momentum intact. Hold longs through expiry.',
  put:  'Put premium elevated vs HV. Sell PE; IV compression likely post-event.',
};

const JM_DIR = { call: 'BUY', spot: 'BUY', put: 'SELL' };

export function JMResearchPopover({
  isOpen, anchor, onClose,
  leg, underlying, strike, ltp,
}) {
  const dir   = JM_DIR[leg] ?? 'BUY';
  const isBuy = dir === 'BUY';
  const entry = ltp ?? 0;

  // Multipliers from chargesConfig — never hardcoded
  const target = entry * JM_TARGET_MULT;
  const sl     = entry * JM_SL_MULT;

  const title = leg === 'spot'
    ? `${underlying?.name ?? '—'} — JM Research`
    : `${underlying?.sym ?? '—'} ${strike ?? '—'} ${leg === 'call' ? 'CE' : 'PE'} — JM Research`;

  return (
    <Popover
      id={`jm-${leg}`}
      title={title}
      isOpen={isOpen}
      anchor={anchor}
      onClose={onClose}
      width={280}
    >
      <div className={styles.jmDirRow}>
        <span className={isBuy ? styles.jmDirBadgeBuy : styles.jmDirBadgeSell}>
          {dir}
        </span>
        <span className={styles.jmAnalyst}>By Aditya P. · Equity Desk</span>
      </div>

      <div className={styles.jmThesis}>{JM_THESIS[leg]}</div>

      <div className={styles.jmGrid}>
        <div className={styles.jmCell}>
          <div className={styles.jmCellLabel}>Entry</div>
          <div className={styles.jmCellVal}>{formatINR(entry)}</div>
        </div>
        <div className={styles.jmCell}>
          <div className={styles.jmCellLabel}>Target</div>
          <div className={`${styles.jmCellVal} ${styles.jmCellValTarget}`}>
            {formatINR(target)}
          </div>
        </div>
        <div className={styles.jmCell}>
          <div className={styles.jmCellLabel}>SL</div>
          <div className={`${styles.jmCellVal} ${styles.jmCellValSl}`}>
            {formatINR(sl)}
          </div>
        </div>
      </div>
    </Popover>
  );
}

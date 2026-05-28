import { formatINR } from '../../../../primitives';
import styles from './RangeBar.module.css';

export default function RangeBar({ ltp, high, low }) {
  const range = high - low || 1;
  const pct   = Math.max(0, Math.min(1, (ltp - low) / range));

  return (
    <div className={styles.wrap}>
      <span className={styles.low}>{formatINR(low)}</span>
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${pct * 100}%` }} />
        <div className={styles.thumb} style={{ left: `${pct * 100}%` }} />
      </div>
      <span className={styles.high}>{formatINR(high)}</span>
    </div>
  );
}

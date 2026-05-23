import { formatINR, formatPct } from '../utils/formatNumber.js';
import styles from './index.module.css';

// prefix is '' by default — caller decides whether to show ₹
export function PnLValue({ value, percent, prefix = '', decimals = 2, className = '' }) {
  if (value == null || isNaN(value)) return <span className={`${styles.root} ${className}`}>—</span>;
  const color = value > 0 ? styles.positive : value < 0 ? styles.negative : styles.neutral;
  return (
    <span className={`${styles.root} ${color} ${className}`}>
      {prefix && <span className={styles.prefix}>{prefix}</span>}
      <span className={styles.mono}>{formatINR(value, decimals)}</span>
      {percent != null && !isNaN(percent) && (
        <span className={styles.pct}>&nbsp;({formatPct(percent, 2)})</span>
      )}
    </span>
  );
}

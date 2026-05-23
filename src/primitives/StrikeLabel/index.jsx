import { formatINR } from '../utils/formatNumber.js';
import styles from './index.module.css';

// strike: number, optionType: 'CE' | 'PE' | null
export function StrikeLabel({ strike, optionType, className = '' }) {
  if (strike == null || isNaN(strike)) return <span className={`${styles.root} ${className}`}>—</span>;
  return (
    <span className={`${styles.root} ${className}`}>
      <span className={styles.mono}>{formatINR(strike, 0)}</span>
      {optionType && (
        <span className={`${styles.badge} ${optionType === 'CE' ? styles.ce : styles.pe}`}>
          {optionType}
        </span>
      )}
    </span>
  );
}

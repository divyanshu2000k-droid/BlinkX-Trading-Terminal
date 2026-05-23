import { formatCompact } from '../utils/formatNumber.js';
import styles from './index.module.css';

export function QuantityValue({ value, className = '' }) {
  return (
    <span className={`${styles.root} ${styles.mono} ${className}`}>
      {formatCompact(value)}
    </span>
  );
}

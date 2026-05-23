import { formatINR } from '../utils/formatNumber.js';
import styles from './index.module.css';

export function LTPValue({ value, decimals = 2, className = '' }) {
  if (value == null || isNaN(value)) return <span className={`${styles.root} ${className}`}>—</span>;
  return (
    <span className={`${styles.root} ${styles.mono} ${className}`}>
      {formatINR(value, decimals)}
    </span>
  );
}

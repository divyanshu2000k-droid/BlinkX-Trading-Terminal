import { formatChange } from '../utils/formatNumber.js';
import styles from './index.module.css';

export function PriceChangeValue({ value, decimals = 2, className = '' }) {
  if (value == null || isNaN(value)) return <span className={`${styles.root} ${className}`}>—</span>;
  const color = value > 0 ? styles.positive : value < 0 ? styles.negative : styles.neutral;
  return (
    <span className={`${styles.root} ${styles.mono} ${color} ${className}`}>
      {formatChange(value, decimals)}
    </span>
  );
}

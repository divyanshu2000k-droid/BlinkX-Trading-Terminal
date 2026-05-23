import styles from './index.module.css';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

// date: ISO string or Date or timestamp (ms)
export function ExpiryLabel({ date, className = '' }) {
  if (!date) return <span className={`${styles.root} ${className}`}>—</span>;
  try {
    const d = new Date(date);
    if (isNaN(d)) return <span className={`${styles.root} ${className}`}>—</span>;
    const label = `${d.getDate()} ${MONTHS[d.getMonth()]} ${String(d.getFullYear()).slice(-2)}`;
    return <span className={`${styles.root} ${className}`}>{label}</span>;
  } catch {
    return <span className={`${styles.root} ${className}`}>—</span>;
  }
}

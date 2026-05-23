import styles from './index.module.css';

export function SymbolBadge({ symbol, className = '' }) {
  return (
    <span className={`${styles.root} ${className}`}>
      {symbol ?? '—'}
    </span>
  );
}

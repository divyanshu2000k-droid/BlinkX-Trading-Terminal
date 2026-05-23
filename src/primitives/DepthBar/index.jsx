import styles from './index.module.css';

// Horizontal bar showing value/max ratio — used in order book depth visualization
export function DepthBar({ value = 0, max = 100, side = 'bid', className = '' }) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  return (
    <div className={`${styles.track} ${className}`}>
      <div
        className={`${styles.fill} ${side === 'bid' ? styles.bid : styles.ask}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

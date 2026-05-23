import styles from './index.module.css';

const STATUS_CONFIG = {
  OPEN:         { label: 'Open',       styleKey: 'open' },
  CLOSED:       { label: 'Closed',     styleKey: 'closed' },
  PRE_OPEN:     { label: 'Pre-Open',   styleKey: 'preOpen' },
  POST_CLOSE:   { label: 'Post-Close', styleKey: 'postClose' },
  HOLIDAY:      { label: 'Holiday',    styleKey: 'closed' },
};

export function MarketStatusPill({ status, className = '' }) {
  const config = STATUS_CONFIG[status] ?? { label: status ?? 'Unknown', styleKey: 'closed' };
  return (
    <span className={`${styles.pill} ${styles[config.styleKey] ?? styles.closed} ${className}`}>
      {config.label}
    </span>
  );
}

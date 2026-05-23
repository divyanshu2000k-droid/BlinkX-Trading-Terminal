import styles from './index.module.css';

const STATUS_CONFIG = {
  COMPLETE:                        { label: 'Complete',      styleKey: 'complete' },
  OPEN:                            { label: 'Open',          styleKey: 'open' },
  CANCELLED:                       { label: 'Cancelled',     styleKey: 'cancelled' },
  REJECTED:                        { label: 'Rejected',      styleKey: 'rejected' },
  MODIFIED:                        { label: 'Modified',      styleKey: 'open' },
  TRIGGER_PENDING:                 { label: 'Trigger',       styleKey: 'pending' },
  VALIDATION_PENDING:              { label: 'Validating',    styleKey: 'pending' },
  PUT_ORDER_REQ_RECEIVED:          { label: 'Received',      styleKey: 'pending' },
  AFTER_MARKET_ORDER_REQ_RECEIVED: { label: 'AMO Queued',   styleKey: 'pending' },
};

export function OrderStatusChip({ status, className = '' }) {
  const config = STATUS_CONFIG[status] ?? { label: status ?? '—', styleKey: 'cancelled' };
  return (
    <span className={`${styles.chip} ${styles[config.styleKey] ?? styles.cancelled} ${className}`}>
      {config.label}
    </span>
  );
}

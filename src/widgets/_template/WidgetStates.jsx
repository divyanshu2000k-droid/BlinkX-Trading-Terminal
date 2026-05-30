import { Loading, CTAButton, Icon } from '../../components';
import styles from './WidgetStates.module.css';

export function WidgetLoading() {
  return (
    <div className={styles.stateContainer}>
      <Loading size="md" />
    </div>
  );
}

export function WidgetError({ error, onRetry }) {
  const message = error?.message ?? error ?? 'Something went wrong.';
  return (
    <div className={styles.stateContainer}>
      <span className={styles.errorText}>{message}</span>
      {onRetry && (
        <CTAButton variant="brand" type="ghost" size="sm" onClick={onRetry} className={styles.retryBtn}>
          Try again
        </CTAButton>
      )}
    </div>
  );
}

export function WidgetEmpty({ message = 'No data available.', icon = 'Inbox' }) {
  return (
    <div className={styles.stateContainer}>
      <Icon name={icon} size={20} className={styles.emptyIcon} />
      <span className={styles.emptyText}>{message}</span>
    </div>
  );
}

import styles from '../_placeholder/Placeholder.module.css';

export default function MarketTimingsWidget({ widgetId, config = {}, density = 'full', panelApi }) {
  return (
    <div className={styles.placeholder}>
      <span className={styles.name}>Market Timings</span>
      <span className={styles.density}>{density}</span>
      <span className={styles.widgetId}>{widgetId}</span>
    </div>
  );
}

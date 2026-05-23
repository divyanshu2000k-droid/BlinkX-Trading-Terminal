import styles from '../_placeholder/Placeholder.module.css';

export default function NewsEventsWidget({ widgetId, config = {}, density = 'full', panelApi }) {
  return (
    <div className={styles.placeholder}>
      <span className={styles.name}>News &amp; Events</span>
      <span className={styles.density}>{density}</span>
      <span className={styles.widgetId}>{widgetId}</span>
    </div>
  );
}

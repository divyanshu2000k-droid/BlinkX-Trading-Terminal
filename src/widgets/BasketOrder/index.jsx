import styles from '../_placeholder/Placeholder.module.css';

export default function BasketOrderWidget({ widgetId, config = {}, density = 'full', panelApi }) {
  return (
    <div className={styles.placeholder}>
      <span className={styles.name}>Basket Order</span>
      <span className={styles.density}>{density}</span>
      <span className={styles.widgetId}>{widgetId}</span>
    </div>
  );
}

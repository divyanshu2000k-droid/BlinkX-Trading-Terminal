import styles from '../_placeholder/Placeholder.module.css';

export default function HeatmapWidget({ widgetId, config = {}, density = 'full', panelApi }) {
  return (
    <div className={styles.placeholder}>
      <span className={styles.name}>Heatmap</span>
      <span className={styles.density}>{density}</span>
      <span className={styles.widgetId}>{widgetId}</span>
    </div>
  );
}

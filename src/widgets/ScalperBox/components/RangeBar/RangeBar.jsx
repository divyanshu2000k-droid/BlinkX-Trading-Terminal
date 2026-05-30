import { Calendar } from 'lucide-react';
import { TIMEFRAMES } from '../../config/chargesConfig.js';
import styles from './RangeBar.module.css';

export default function RangeBar({
  activeTimeframe,
  onTimeframeChange,
  onCalendarClick,
}) {
  return (
    <div className={styles.rangeBar}>
      {TIMEFRAMES.map(tf => (
        <button
          key={tf}
          className={`${styles.rbBtn}${activeTimeframe === tf ? ` ${styles.rbBtnActive}` : ''}`}
          onClick={() => onTimeframeChange?.(tf)}
        >
          {tf}
        </button>
      ))}

      <span className={styles.spacer} />

      <button
        className={styles.calBtn}
        onClick={() => onCalendarClick?.()}
        title="Custom date range"
      >
        <Calendar size={11} />
      </button>
    </div>
  );
}

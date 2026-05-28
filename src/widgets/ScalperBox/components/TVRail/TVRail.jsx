import { Icon } from '../../../../components';
import styles from './TVRail.module.css';

export default function TVRail({ state, actions, onOpenPopover }) {
  return (
    <div className={styles.rail}>
      {/* Timeframe label — rotated */}
      <span className={styles.tfLabel}>{state.timeframe}</span>

      {/* OI profile quick toggle */}
      <button
        className={`${styles.railBtn} ${state.oiProfileEnabled ? styles.railBtnActive : ''}`}
        onClick={actions.toggleOIProfile}
        title="OI Profile"
      >
        <Icon name="BarChart2" size={12} />
      </button>

      {/* Spacer pushes channel dot to bottom */}
      <div className={styles.dotWrap}>
        <Icon name="Dot" size={12} color="var(--blinkx-color-text-tertiary)" />
      </div>
    </div>
  );
}

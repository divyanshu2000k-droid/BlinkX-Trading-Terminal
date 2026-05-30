import {
  TrendingUp, Pencil, Star,
  Bell, GitCompare, Camera, Maximize2,
} from 'lucide-react';
import styles from './TVRail.module.css';

export default function TVRail({
  activePopover,
  onOpenPopover,
  onToast,
}) {
  const isActive = (id) => activePopover === id;

  return (
    <div className={styles.rail}>

      {/* Indicators */}
      <button
        className={`${styles.tvIcon}${
          isActive('indicators') ? ` ${styles.tvIconActive}` : ''
        }`}
        title="Indicators"
        onClick={e => {
          e.stopPropagation();
          onOpenPopover('indicators', e);
        }}
      >
        <TrendingUp size={14} />
      </button>

      {/* Drawing tools */}
      <button
        className={`${styles.tvIcon}${
          isActive('drawing') ? ` ${styles.tvIconActive}` : ''
        }`}
        title="Drawing tools"
        onClick={e => {
          e.stopPropagation();
          onOpenPopover('drawing', e);
        }}
      >
        <Pencil size={14} />
      </button>

      {/* Strategies */}
      <button
        className={`${styles.tvIcon}${
          isActive('strategies') ? ` ${styles.tvIconActive}` : ''
        }`}
        title="Strategies"
        onClick={e => {
          e.stopPropagation();
          onOpenPopover('strategies', e);
        }}
      >
        <Star size={14} />
      </button>

      <div className={styles.separator} />

      {/* Alerts — coming soon */}
      <button
        className={styles.tvIcon}
        title="Alerts"
        onClick={() => onToast?.('Alerts — coming soon')}
      >
        <Bell size={14} />
      </button>

      {/* Compare — coming soon */}
      <button
        className={styles.tvIcon}
        title="Compare"
        onClick={() => onToast?.('Compare instruments — coming soon')}
      >
        <GitCompare size={14} />
      </button>

      {/* Snapshot */}
      <button
        className={styles.tvIcon}
        title="Snapshot"
        onClick={() => onToast?.('Chart saved to clipboard')}
      >
        <Camera size={14} />
      </button>

      {/* Fullscreen — coming soon */}
      <button
        className={styles.tvIcon}
        title="Fullscreen"
        onClick={() => onToast?.('Fullscreen — coming soon')}
      >
        <Maximize2 size={14} />
      </button>

    </div>
  );
}

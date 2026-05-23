/**
 * BlinkX Tabs
 * Sizes: sm | md
 * Used for: widget internal navigation (Equity/F&O/Commodity etc.)
 */
import styles from './Tabs.module.css';

export default function Tabs({ tabs = [], active, onChange, size = 'md' }) {
  return (
    <div className={`${styles.tabs} ${styles[`size_${size}`]}`}>
      {tabs.map(tab => (
        <button
          key={tab.value}
          className={`${styles.tab} ${active === tab.value ? styles.active : ''}`}
          onClick={() => onChange(tab.value)}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className={`${styles.count} ${active === tab.value ? styles.countActive : ''}`}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

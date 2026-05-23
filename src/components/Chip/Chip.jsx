import styles from './Chip.module.css';

export default function Chip({
  children,
  size = 'md',
  active = false,
  disabled = false,
  count = null,
  onClick,
  className = '',
}) {
  return (
    <button
      className={[
        styles.chip,
        styles[`size_${size}`],
        active ? styles.active : '',
        disabled ? styles.disabled : '',
        count !== null ? styles.withCount : '',
        className,
      ].filter(Boolean).join(' ')}
      disabled={disabled}
      onClick={onClick}
    >
      <span className={styles.label}>{children}</span>
      {count !== null && <span className={styles.count}>{count}</span>}
    </button>
  );
}

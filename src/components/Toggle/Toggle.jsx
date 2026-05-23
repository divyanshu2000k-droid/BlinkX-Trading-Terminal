import styles from './Toggle.module.css';

export default function Toggle({ checked = false, onChange, size = 'md', disabled = false, label }) {
  return (
    <label className={`${styles.wrapper} ${disabled ? styles.disabled : ''}`}>
      <div
        className={`${styles.track} ${styles[`size_${size}`]} ${checked ? styles.checked : ''}`}
        onClick={() => !disabled && onChange(!checked)}
      >
        <div className={styles.knob} />
      </div>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
}

import styles from './Segment.module.css';

export default function Segment({ options = [], value, onChange, size = 'md' }) {
  return (
    <div className={`${styles.segment} ${styles[`size_${size}`]}`}>
      {options.map(opt => (
        <button
          key={opt.value}
          className={[
            styles.option,
            value === opt.value ? styles.active : '',
            opt.variant ? styles[`variant_${opt.variant}`] : '',
          ].filter(Boolean).join(' ')}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

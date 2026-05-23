/**
 * BlinkX Dropdown
 * Sizes: sm | md
 * Variants: default | with-icon
 */
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './Dropdown.module.css';

export default function Dropdown({
  options = [],
  value,
  onChange,
  size = 'md',
  placeholder = 'Select',
  disabled = false,
  className = '',
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selected = options.find(o => o.value === value);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className={`${styles.wrapper} ${className}`}>
      <button
        className={[
          styles.trigger,
          styles[`size_${size}`],
          open ? styles.open : '',
          disabled ? styles.disabled : '',
        ].filter(Boolean).join(' ')}
        onClick={() => !disabled && setOpen(o => !o)}
        disabled={disabled}
      >
        <span className={styles.value}>
          {selected ? selected.label : <span className={styles.placeholder}>{placeholder}</span>}
        </span>
        <ChevronDown size={12} className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`} />
      </button>

      {open && (
        <div className={`${styles.menu} ${styles[`menu_${size}`]}`}>
          {options.map(opt => (
            <button
              key={opt.value}
              className={`${styles.option} ${value === opt.value ? styles.optionActive : ''}`}
              onClick={() => { onChange(opt.value); setOpen(false); }}
            >
              {opt.icon && <span className={styles.optionIcon}>{opt.icon}</span>}
              <span>{opt.label}</span>
              {value === opt.value && (
                <svg className={styles.check} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

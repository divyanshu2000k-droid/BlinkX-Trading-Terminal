/**
 * BlinkX Input Field
 * Types: text | number | search
 * Sizes: sm | md
 * States: default | focused | disabled | error
 */
import { useState } from 'react';
import styles from './Input.module.css';

export default function Input({
  type = 'text',
  size = 'md',
  placeholder = '',
  value,
  onChange,
  disabled = false,
  error = false,
  errorMessage = '',
  label = '',
  prefix = null,
  suffix = null,
  className = '',
  ...props
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className={`${styles.wrapper} ${className}`}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={[
        styles.inputWrapper,
        styles[`size_${size}`],
        focused ? styles.focused : '',
        disabled ? styles.disabled : '',
        error ? styles.error : '',
      ].filter(Boolean).join(' ')}>
        {prefix && <span className={styles.prefix}>{prefix}</span>}
        <input
          type={type}
          className={styles.input}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </div>
      {error && errorMessage && (
        <span className={styles.errorMsg}>{errorMessage}</span>
      )}
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';
import { formatINR } from '../utils/formatNumber.js';
import styles from './index.module.css';

export function FlashValue({ value, decimals = 2, className = '' }) {
  const [flash, setFlash] = useState(null); // 'up' | 'down' | null
  const prevRef = useRef(null); // null on first render — no flash on mount

  useEffect(() => {
    const current = parseFloat(value);
    if (isNaN(current)) return;

    if (prevRef.current !== null) {
      const prev = parseFloat(prevRef.current);
      if (!isNaN(prev) && current !== prev) {
        setFlash(current > prev ? 'up' : 'down');
        const timer = setTimeout(() => setFlash(null), 300);
        prevRef.current = value;
        return () => clearTimeout(timer);
      }
    }
    prevRef.current = value;
  }, [value]);

  const flashClass = flash === 'up' ? styles.flashUp : flash === 'down' ? styles.flashDown : '';

  if (value == null || isNaN(parseFloat(value))) {
    return <span className={`${styles.root} ${className}`}>—</span>;
  }

  return (
    <span className={`${styles.root} ${styles.mono} ${flashClass} ${className}`}>
      {formatINR(parseFloat(value), decimals)}
    </span>
  );
}

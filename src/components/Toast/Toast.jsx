import { useEffect } from 'react';
import { X } from 'lucide-react';
import styles from './Toast.module.css';

export default function Toast({ message, subtext, type = 'positive', theme = 'dark', undoLabel, onUndo, onClose, duration = 3000 }) {
  useEffect(() => {
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`${styles.toast} ${styles[`theme_${theme}`]} ${styles[`type_${type}`]}`}>
      <div className={styles.content}>
        <div className={styles.icon}>
          {type === 'positive'
            ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
            : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          }
        </div>
        <div className={styles.text}>
          <div className={styles.message}>{message}</div>
          {subtext && <div className={styles.subtext}>{subtext}</div>}
        </div>
      </div>
      <div className={styles.actions}>
        {undoLabel && <button className={styles.undo} onClick={onUndo}>{undoLabel}</button>}
        <button className={styles.close} onClick={onClose}><X size={12} /></button>
      </div>
    </div>
  );
}

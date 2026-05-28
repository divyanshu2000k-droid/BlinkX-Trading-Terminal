import { useEffect } from 'react';
import { Icon } from '../../../../components';
import styles from './Popover.module.css';

// Computes fixed position from anchor DOMRect — positions below the anchor
function getStyle(anchorRect, popoverWidth = 220) {
  if (!anchorRect) return { top: 120, left: 8 };
  const gap  = 4;
  const top  = anchorRect.bottom + gap;
  let left   = anchorRect.left;
  // Keep within viewport horizontally
  const vw   = window.innerWidth;
  if (left + popoverWidth > vw - 8) {
    left = Math.max(8, anchorRect.right - popoverWidth);
  }
  return { top, left, minWidth: popoverWidth };
}

export function Popover({ title, anchorRect, onClose, children, width = 220 }) {
  // Close on Escape
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.popover} style={getStyle(anchorRect, width)}>
        {title && (
          <div className={styles.header}>
            <span className={styles.title}>{title}</span>
            <button className={styles.closeBtn} onClick={onClose}>
              <Icon name="X" size={12} />
            </button>
          </div>
        )}
        <div className={styles.body}>{children}</div>
      </div>
    </>
  );
}

export { styles as popoverStyles };

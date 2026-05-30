import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import styles from './Popover.module.css';

export function Popover({
  id,
  title,
  isOpen,
  anchor,
  onClose,
  children,
  width = 260,
}) {
  const popRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  // Reposition after mount using anchor DOMRect.
  // Must be useEffect — offsetWidth/offsetHeight only readable after paint.
  // Element starts off-screen (top/left -9999) until positioned.
  useEffect(() => {
    if (!isOpen || !anchor || !popRef.current) return;
    const pop = popRef.current;
    const pw = pop.offsetWidth;
    const ph = pop.offsetHeight;

    let left = anchor.left;
    if (left + pw > window.innerWidth - 8) left = anchor.right - pw;
    if (left < 8) left = 8;

    let top = anchor.bottom + 6;
    if (top + ph > window.innerHeight - 8) top = anchor.top - ph - 6;
    if (top < 8) top = 8;

    pop.style.left = `${left}px`;
    pop.style.top  = `${top}px`;
  }, [isOpen, anchor]);

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <div
        ref={popRef}
        className={styles.popover}
        style={{ width, top: -9999, left: -9999 }}
        role="dialog"
        aria-label={title}
        aria-modal="true"
      >
        <div className={styles.header}>
          <span className={styles.title}>{title}</span>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={12} />
          </button>
        </div>
        <div className={styles.body}>
          {children}
        </div>
      </div>
    </>
  );
}

// Re-export styles so individual popovers can use shared CSS classes
export { styles as popoverStyles };

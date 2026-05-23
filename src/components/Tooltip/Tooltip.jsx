/**
 * BlinkX Tooltip
 * Placements: top | bottom | left | right
 * Used for: field hints, icon labels, data explanations
 */
import { useState, useRef } from 'react';
import styles from './Tooltip.module.css';

export default function Tooltip({
  children,
  content,
  placement = 'top',
  disabled = false,
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  if (!content || disabled) return <>{children}</>;

  return (
    <div
      className={styles.wrapper}
      ref={ref}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div className={`${styles.tooltip} ${styles[`placement_${placement}`]}`}>
          <div className={styles.content}>{content}</div>
          <div className={`${styles.arrow} ${styles[`arrow_${placement}`]}`} />
        </div>
      )}
    </div>
  );
}

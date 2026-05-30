import { Popover } from './Popover.jsx';
import styles from './Popover.module.css';

export function ExpiryPopover({
  isOpen, anchor, onClose,
  expiries, selectedExpiry, onSelect,
}) {
  const Section = ({ label, type }) => {
    const items = (expiries ?? []).filter(e => e.type === type);
    if (!items.length) return null;
    return (
      <>
        <div className={styles.secLabel}>{label}</div>
        {items.map(exp => {
          const isSel = exp.label === selectedExpiry?.label;
          return (
            <div
              key={exp.label}
              className={`${styles.row}${isSel ? ` ${styles.rowSelected}` : ''}`}
              onClick={() => { onSelect(exp); onClose(); }}
            >
              <span className={styles.rowLabel}>{exp.fullLabel}</span>
              <span className={styles.rowMeta}>{exp.dte}d</span>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <Popover
      id="expiry"
      title="Select Expiry"
      isOpen={isOpen}
      anchor={anchor}
      onClose={onClose}
      width={220}
    >
      <Section label="Weekly"  type="weekly" />
      <Section label="Monthly" type="monthly" />
    </Popover>
  );
}

import { Popover, popoverStyles as styles } from './Popover.jsx';
import { Icon } from '../../../../components';

export default function ExpiryPopover({ expiries, selected, onSelect, anchorRect, onClose }) {
  return (
    <Popover title="Select Expiry" anchorRect={anchorRect} onClose={onClose} width={200}>
      {expiries.map(exp => {
        const isSelected = selected?.label === exp.label;
        return (
          <div
            key={exp.label}
            className={`${styles.item} ${isSelected ? styles.itemSelected : ''}`}
            onClick={() => onSelect(exp)}
          >
            <div>
              <div className={styles.itemLabel}>{exp.fullLabel}</div>
              <div className={styles.itemSub}>{exp.dte}D · {exp.type}</div>
            </div>
            {isSelected && (
              <span className={styles.checkMark}>
                <Icon name="Check" size={12} />
              </span>
            )}
          </div>
        );
      })}
    </Popover>
  );
}

import { Popover, popoverStyles as styles } from './Popover.jsx';
import { formatINR } from '../../../../primitives';
import { Icon } from '../../../../components';

export default function StrikePopover({ strikeList, atmStrike, selected, onSelect, anchorRect, onClose }) {
  return (
    <Popover title="Select Strike" anchorRect={anchorRect} onClose={onClose} width={180}>
      {strikeList.map(strike => {
        const isSelected = selected === strike;
        const isAtm      = strike === atmStrike;
        return (
          <div
            key={strike}
            className={`${styles.item} ${isSelected ? styles.itemSelected : ''}`}
            onClick={() => onSelect(strike)}
          >
            <span className={styles.itemLabel} style={{ fontFamily: 'var(--blinkx-font-mono)' }}>
              {formatINR(strike, 0)}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {isAtm && (
                <span
                  className={styles.itemSub}
                  style={{
                    background: 'var(--blinkx-color-bg-brand-subtle-1)',
                    color: 'var(--blinkx-color-text-brand)',
                    padding: '1px 4px',
                    borderRadius: 'var(--blinkx-radius-xs)',
                  }}
                >
                  ATM
                </span>
              )}
              {isSelected && (
                <span className={styles.checkMark}>
                  <Icon name="Check" size={12} />
                </span>
              )}
            </div>
          </div>
        );
      })}
    </Popover>
  );
}

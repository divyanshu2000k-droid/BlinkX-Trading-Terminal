import { CHANNEL_COLORS } from '../../config/chargesConfig.js';
import { Popover, popoverStyles as styles } from './Popover.jsx';
import { Icon } from '../../../../components';

const COLOR_TOKENS = {
  blue:   'var(--blinkx-color-text-brand)',
  green:  'var(--blinkx-color-text-positive)',
  yellow: 'var(--blinkx-color-text-warning)',
  red:    'var(--blinkx-color-text-negative)',
  off:    'var(--blinkx-color-text-tertiary)',
};

const LABELS = {
  blue:   'Blue',
  green:  'Green',
  yellow: 'Yellow',
  red:    'Red',
  off:    'Unlinked',
};

export default function ChannelPopover({ selected, onSelect, anchorRect, onClose }) {
  return (
    <Popover title="Link Channel" anchorRect={anchorRect} onClose={onClose} width={180}>
      {CHANNEL_COLORS.map(color => {
        const isSelected = selected === color;
        return (
          <div
            key={color}
            className={`${styles.item} ${isSelected ? styles.itemSelected : ''}`}
            onClick={() => onSelect(color)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 10, height: 10,
                borderRadius: '50%',
                background: COLOR_TOKENS[color],
                flexShrink: 0,
              }} />
              <span className={styles.itemLabel}>{LABELS[color]}</span>
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

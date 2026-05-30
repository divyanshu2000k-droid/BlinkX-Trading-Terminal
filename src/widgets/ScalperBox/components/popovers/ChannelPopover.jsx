import { Popover } from './Popover.jsx';
import styles from './Popover.module.css';

// Exactly 5 channels — no purple. Maps to BlinkX linkStore groups.
const CHANNELS = [
  { key: 'blue',   cls: styles.channelDotBlue   },
  { key: 'green',  cls: styles.channelDotGreen  },
  { key: 'yellow', cls: styles.channelDotYellow },
  { key: 'red',    cls: styles.channelDotRed    },
  { key: 'off',    cls: styles.channelDotOff    },
];

export function ChannelPopover({
  isOpen, anchor, onClose,
  channel, onChannelChange,
}) {
  return (
    <Popover
      id="channel"
      title="Channel Link"
      isOpen={isOpen}
      anchor={anchor}
      onClose={onClose}
      width={180}
    >
      <div className={styles.channelGrid}>
        {CHANNELS.map(ch => (
          <div
            key={ch.key}
            className={`${styles.channelDot} ${ch.cls}${channel === ch.key ? ` ${styles.channelDotSelected}` : ''}`}
            onClick={() => {
              onChannelChange(ch.key === 'off' ? null : ch.key);
              onClose();
            }}
            title={ch.key}
          />
        ))}
      </div>
    </Popover>
  );
}

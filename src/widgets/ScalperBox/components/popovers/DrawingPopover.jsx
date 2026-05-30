import { Popover } from './Popover.jsx';
import styles from './Popover.module.css';

const TOOLS = [
  'Trendline',
  'Horizontal Line',
  'Fibonacci Retracement',
  'Rectangle',
  'Pitchfork',
];

export function DrawingPopover({ isOpen, anchor, onClose, onSelect }) {
  return (
    <Popover
      id="drawing"
      title="Drawing Tools"
      isOpen={isOpen}
      anchor={anchor}
      onClose={onClose}
      width={200}
    >
      {TOOLS.map(tool => (
        <div
          key={tool}
          className={styles.row}
          onClick={() => { onSelect?.(tool); onClose(); }}
        >
          <span className={styles.rowLabel}>{tool}</span>
        </div>
      ))}
    </Popover>
  );
}

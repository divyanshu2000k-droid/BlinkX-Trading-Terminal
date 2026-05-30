import { Popover } from './Popover.jsx';
import styles from './Popover.module.css';

const STRATEGIES = [
  { name: 'Iron Condor',      type: 'Neutral'    },
  { name: 'Long Straddle',    type: 'Volatility' },
  { name: 'Bull Call Spread', type: 'Bullish'    },
  { name: 'Bear Put Spread',  type: 'Bearish'    },
];

export function StrategiesPopover({ isOpen, anchor, onClose, onSelect }) {
  return (
    <Popover
      id="strategies"
      title="Strategies"
      isOpen={isOpen}
      anchor={anchor}
      onClose={onClose}
      width={240}
    >
      {STRATEGIES.map(s => (
        <div
          key={s.name}
          className={styles.row}
          onClick={() => { onSelect?.(s.name); onClose(); }}
        >
          <span className={styles.rowLabel}>{s.name}</span>
          <span className={styles.rowMeta}>{s.type}</span>
        </div>
      ))}
    </Popover>
  );
}

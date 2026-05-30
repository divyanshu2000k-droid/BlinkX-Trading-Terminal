import { Popover } from './Popover.jsx';
import styles from './Popover.module.css';

const INDICATORS = [
  { name: 'RSI (14)',        type: 'Oscillator' },
  { name: 'MACD (12,26,9)', type: 'Oscillator' },
  { name: 'Bollinger Bands', type: 'Volatility' },
  { name: 'EMA (20)',        type: 'Overlay'    },
  { name: 'VWAP',            type: 'Overlay'    },
  { name: 'SuperTrend',      type: 'Overlay'    },
];

export function IndicatorsPopover({ isOpen, anchor, onClose, onSelect }) {
  return (
    <Popover
      id="indicators"
      title="Add Indicator"
      isOpen={isOpen}
      anchor={anchor}
      onClose={onClose}
      width={240}
    >
      {INDICATORS.map(ind => (
        <div
          key={ind.name}
          className={styles.row}
          onClick={() => { onSelect?.(ind.name); onClose(); }}
        >
          <span className={styles.rowLabel}>{ind.name}</span>
          <span className={styles.rowMeta}>{ind.type}</span>
        </div>
      ))}
    </Popover>
  );
}

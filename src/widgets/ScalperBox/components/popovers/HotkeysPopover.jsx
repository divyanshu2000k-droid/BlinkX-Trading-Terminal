import { Fragment } from 'react';
import { Popover } from './Popover.jsx';
import styles from './Popover.module.css';

const HOTKEYS = [
  { label: 'Buy Call',    keys: ['Shift', '↑'] },
  { label: 'Sell Call',   keys: ['Shift', '←'] },
  { label: 'Buy Put',     keys: ['Shift', '↓'] },
  { label: 'Sell Put',    keys: ['Shift', '→'] },
  { label: 'Exit All',    keys: ['Shift', 'E'] },
  { label: 'Cancel All',  keys: ['Shift', 'C'] },
  { label: 'Toggle CE',   keys: ['1'] },
  { label: 'Toggle SPOT', keys: ['2'] },
  { label: 'Toggle PE',   keys: ['3'] },
  { label: 'Show All',    keys: ['0'] },
];

export function HotkeysPopover({ isOpen, anchor, onClose }) {
  return (
    <Popover
      id="hotkeys"
      title="Hotkey Reference"
      isOpen={isOpen}
      anchor={anchor}
      onClose={onClose}
      width={300}
    >
      <div className={styles.hkGrid}>
        {HOTKEYS.map(hk => (
          <Fragment key={hk.label}>
            <span className={styles.hkLabel}>{hk.label}</span>
            <span className={styles.hkKeys}>
              {hk.keys.map((k, i) => (
                <Fragment key={k}>
                  {i > 0 && <span>+</span>}
                  <kbd className={styles.hkKbd}>{k}</kbd>
                </Fragment>
              ))}
            </span>
          </Fragment>
        ))}
      </div>
    </Popover>
  );
}

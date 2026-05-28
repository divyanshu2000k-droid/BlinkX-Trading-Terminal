import { Toggle } from '../../../../components';
import { Popover, popoverStyles as styles } from './Popover.jsx';

const SETTINGS_ITEMS = [
  { key: 'showJMMarkers',        label: 'JM Research markers' },
  { key: 'showPositionMarkers',  label: 'Position markers on chart' },
  { key: 'showHotkeyHints',      label: 'Hotkey hints' },
  { key: 'confirmBeforePlacing', label: 'Confirm before placing order' },
];

export default function SettingsPopover({ settings, onUpdate, anchorRect, onClose }) {
  return (
    <Popover title="Settings" anchorRect={anchorRect} onClose={onClose} width={240}>
      {SETTINGS_ITEMS.map(({ key, label }) => (
        <div
          key={key}
          className={styles.item}
          style={{ cursor: 'default', justifyContent: 'space-between' }}
        >
          <span className={styles.itemLabel}>{label}</span>
          <Toggle
            checked={settings[key] ?? false}
            onChange={val => onUpdate({ [key]: val })}
            size="sm"
          />
        </div>
      ))}
    </Popover>
  );
}

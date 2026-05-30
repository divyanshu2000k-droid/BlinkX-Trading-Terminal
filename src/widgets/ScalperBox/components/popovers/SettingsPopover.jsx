import { Toggle } from '../../../../components/index.js';
import { Popover } from './Popover.jsx';
import styles from './Popover.module.css';

export function SettingsPopover({
  isOpen, anchor, onClose,
  settings, onSettingsChange,
}) {
  const toggle = key =>
    onSettingsChange({ [key]: !settings?.[key] });

  const ToggleRow = ({ label, settingKey }) => (
    <div className={`${styles.row} ${styles.rowNoPointer}`}>
      <span className={styles.rowLabel}>{label}</span>
      <Toggle
        checked={!!settings?.[settingKey]}
        onChange={() => toggle(settingKey)}
      />
    </div>
  );

  return (
    <Popover
      id="settings"
      title="Pro Scalper Settings"
      isOpen={isOpen}
      anchor={anchor}
      onClose={onClose}
      width={260}
    >
      <div className={styles.secLabel}>Display</div>
      <ToggleRow label="Show JM Research markers"          settingKey="showJMMarkers" />
      <ToggleRow label="Show position markers on charts"   settingKey="showPositionMarkers" />
      <ToggleRow label="Show hotkey hints in buttons"      settingKey="showHotkeyHints" />
      <div className={styles.secLabel}>Order Defaults</div>
      <ToggleRow label="Confirm before placing"            settingKey="confirmBeforePlacing" />
    </Popover>
  );
}

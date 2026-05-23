import { useWorkspaceStore } from '../stores/workspaceStore';
import { Icon } from '../components';
import styles from './PanelAddButton.module.css';

export function PanelAddButton({ api, panels }) {
  if (panels.length >= 5) return null;

  return (
    <button
      className={styles.addBtn}
      onClick={() => {
        useWorkspaceStore.getState().openPicker(api.id);
      }}
      title="Add widget to this panel"
    >
      <Icon name="Plus" size={13} />
    </button>
  );
}

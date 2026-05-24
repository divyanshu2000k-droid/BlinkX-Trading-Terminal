import { useState, useEffect } from 'react';
import { Icon } from '../components';
import styles from './PanelActions.module.css';

export default function PanelActions({ api, containerApi, panels }) {
  const [isMaximized, setIsMaximized] = useState(() => api.isMaximized());

  useEffect(() => {
    // onDidMaximizedGroupChange is on the container API, not the group API
    const disposable = containerApi.onDidMaximizedGroupChange(() => {
      setIsMaximized(api.isMaximized());
    });
    return () => disposable.dispose();
  }, [api, containerApi]);

  const handleMaximize = () => {
    if (isMaximized) {
      api.exitMaximized();
      setIsMaximized(false);
    } else {
      api.maximize();
      setIsMaximized(true);
    }
  };

  const handleCloseGroup = () => {
    console.log('panels prop:', panels);
    // Prefer the prop; fall back to live api.panels if prop is empty
    const activePanels = panels?.length > 0
      ? panels
      : api.panels ?? [];
    // Snapshot before iterating — closing mutates the live array
    [...activePanels].forEach((panel) => panel.api.close());
  };

  return (
    <div className={styles.actions}>
      <button
        className={styles.iconBtn}
        onClick={handleMaximize}
        title={isMaximized ? 'Restore panel' : 'Maximize panel'}
      >
        <Icon name={isMaximized ? 'Minimize2' : 'Maximize2'} size={11} />
      </button>
      <button
        className={`${styles.iconBtn} ${styles.closeGroup}`}
        onClick={handleCloseGroup}
        title="Close panel"
      >
        <Icon name="X" size={11} />
      </button>
    </div>
  );
}

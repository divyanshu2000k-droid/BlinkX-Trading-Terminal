import { useState, useEffect } from 'react';
import { Icon } from '../components';
import styles from './PanelTab.module.css';

export default function PanelTab({ api, params }) {
  const [isActive, setIsActive] = useState(api.isActive);

  useEffect(() => {
    const disposable = api.onDidActiveChange(() => {
      setIsActive(api.isActive);
    });
    return () => disposable.dispose();
  }, [api]);

  return (
    <div className={`${styles.tab} ${isActive ? styles.active : ''}`}>
      <span className={styles.dragHandle}>
        <Icon name="GripVertical" size={12} />
      </span>
      <span className={styles.label}>
        {api.title ?? params?.widgetType ?? 'Widget'}
      </span>
      <button
        className={styles.closeBtn}
        onClick={(e) => {
          e.stopPropagation();
          api.close();
        }}
        title="Close"
      >
        <Icon name="X" size={11} />
      </button>
    </div>
  );
}

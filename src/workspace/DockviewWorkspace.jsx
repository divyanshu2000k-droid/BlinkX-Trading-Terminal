import { DockviewReact } from 'dockview';
import 'dockview-core/dist/styles/dockview.css';
import { componentRegistry } from './componentRegistry.js';
import PanelTab from './PanelTab.jsx';
import { PanelAddButton } from './PanelAddButton.jsx';
import PanelActions from './PanelActions.jsx';
import { useWorkspaceStore } from '../stores/workspaceStore.js';
import styles from './DockviewWorkspace.module.css';

// tabComponents is a keyed map — used for per-panel tabComponent resolution.
// Must be defined OUTSIDE the component to prevent panel remounts on render.
const tabComponents = { widget: PanelTab };

export default function DockviewWorkspace() {
  const onReady = useWorkspaceStore((s) => s.onReady);

  return (
    <DockviewReact
      components={componentRegistry}
      tabComponents={tabComponents}
      defaultTabComponent={PanelTab}
      leftHeaderActionsComponent={PanelAddButton}
      rightHeaderActionsComponent={PanelActions}
      onReady={onReady}
      className={`${styles.workspace} dockview-theme-abyss`}
    />
  );
}

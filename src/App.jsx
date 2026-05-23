import { useEffect } from 'react';
import { useTradingViewScript } from './providers/tradingview/useTradingViewScript.js';
import TopBar         from './terminal/TopBar/TopBar.jsx';
import TickerStrip    from './terminal/TickerStrip/TickerStrip.jsx';
import HomePage       from './terminal/HomePage/HomePage.jsx';
import DockviewWorkspace from './workspace/DockviewWorkspace.jsx';
import WidgetPicker   from './terminal/WidgetPicker/WidgetPicker.jsx';
import Toast          from './components/Toast/Toast.jsx';
import { useWorkspaceStore } from './stores/workspaceStore.js';
import { useUiStore } from './stores/uiStore.js';
import styles from './App.module.css';
import './index.css';

export default function App() {
  useTradingViewScript();
  const activeTerminalId = useWorkspaceStore((s) => s.activeTerminalId);
  const theme    = useUiStore((s) => s.theme);
  const toasts   = useUiStore((s) => s.toasts);
  const removeToast = useUiStore((s) => s.removeToast);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className={styles.appRoot}>
      <TopBar />
      <TickerStrip />

      <div className={styles.workspaceShell}>
        {activeTerminalId === 'home' ? (
          <HomePage />
        ) : (
          <DockviewWorkspace />
        )}
      </div>

      <WidgetPicker />

      <div className={styles.toastContainer}>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            theme={theme}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>
  );
}

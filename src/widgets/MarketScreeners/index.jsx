import { useRef, useState, useEffect } from 'react';
import { useMarketScreeners } from './hooks/useMarketScreeners';
import { useUiStore } from '../../stores/uiStore';
import styles from './Widget.module.css';

export default function MarketScreenersWidget({
  widgetId,
  config,
  density,
  panelApi,
}) {
  const theme = useUiStore(s => s.theme ?? 'dark');
  const [currentTheme, setCurrentTheme] = useState(theme);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const newTheme = document.documentElement.getAttribute('data-theme') ?? 'dark';
      setCurrentTheme(newTheme);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
  }, []);

  const containerRef = useRef(null);

  useMarketScreeners(containerRef, {
    theme: currentTheme,
  });

  return (
    <div className={styles.widget}>
      <div
        ref={containerRef}
        className={styles.embedContainer}
      />
    </div>
  );
}

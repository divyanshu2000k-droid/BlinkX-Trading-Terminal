import { useState, useEffect, useRef } from 'react';
import { useEconomicMap }
  from './hooks/useEconomicMap';
import { useUiStore } from '../../stores/uiStore';
import styles from './Widget.module.css';

export default function EconomicMapWidget({
  widgetId,
  config,
  density,
  panelApi,
}) {
  const theme = useUiStore(s => s.theme ?? 'dark');
  const { elementDefined } = useEconomicMap();
  const [currentTheme, setCurrentTheme] =
    useState(theme);
  const containerRef = useRef(null);
  const [resizeKey, setResizeKey] = useState(0);

  // Sync theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const newTheme = document.documentElement
        .getAttribute('data-theme') ?? 'dark';
      setCurrentTheme(newTheme);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
  }, []);

  // Remount Web Component on panel resize
  // 250ms debounce prevents flash during dragging
  useEffect(() => {
    if (!containerRef.current) return;
    let debounceTimer = null;

    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        setResizeKey(k => k + 1);
      }, 250);
    });

    resizeObserver.observe(containerRef.current);
    return () => {
      clearTimeout(debounceTimer);
      resizeObserver.disconnect();
    };
  }, []);

  // Blank container while element loads
  if (!elementDefined) {
    return (
      <div
        ref={containerRef}
        className={styles.widget}
      />
    );
  }

  return (
    <div ref={containerRef} className={styles.widget}>
      <tv-economic-map
        key={`${currentTheme}-${resizeKey}`}
        theme={currentTheme}
        width="100%"
        height="100%"
      />
    </div>
  );
}

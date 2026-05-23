import { useEffect, useRef, useState } from 'react';
import { useTradingViewScript } from '../../providers/tradingview/useTradingViewScript.js';
import { useChart } from './hooks/useChart.js';
import { useUiStore } from '../../stores/uiStore.js';
import { WidgetLoading, WidgetError } from '../_template/WidgetStates.jsx';
import styles from './Widget.module.css';

let instanceCounter = 0;

export default function ChartWidget({ config = {} }) {
  const { ready, error } = useTradingViewScript();
  const theme = useUiStore((s) => s.theme ?? 'dark');
  const containerRef = useRef(null);
  // Stable unique DOM ID — survives symbol/interval changes, allows multiple Chart instances
  const containerId = useRef(null);
  if (!containerId.current) {
    containerId.current = `tv-chart-${++instanceCounter}`;
  }
  const id = containerId.current;

  // Remounts TV widget when theme changes via MutationObserver on data-theme
  const [observedTheme, setObservedTheme] = useState(theme);
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const attr = document.documentElement.getAttribute('data-theme') ?? 'dark';
      setObservedTheme(attr);
    });
    observer.observe(document.documentElement, { attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  useChart(containerRef, {
    symbol:    config?.symbol    ?? 'NIFTY',
    exchange:  config?.exchange  ?? 'NSE',
    timeframe: config?.timeframe ?? '15',
    widgetId:  id,
    theme:     observedTheme,
    ready,
  });

  if (error) return <WidgetError error="TradingView failed to load." />;

  return (
    <div className={styles.root}>
      {!ready && <WidgetLoading />}
      {/* visibility:hidden keeps container in DOM so TV can measure dimensions */}
      <div
        id={id}
        ref={containerRef}
        className={styles.chartContainer}
        style={{ visibility: ready ? 'visible' : 'hidden' }}
      />
    </div>
  );
}

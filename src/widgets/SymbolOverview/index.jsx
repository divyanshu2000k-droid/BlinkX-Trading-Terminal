import { useRef, useState, useEffect } from 'react';
import { useSymbolOverview } from './hooks/useSymbolOverview';
import { useUiStore } from '../../stores/uiStore';
import styles from './Widget.module.css';

export default function SymbolOverviewWidget({
  widgetId,
  config = {},
  density,
  panelApi,
}) {
  const theme = useUiStore(s => s.theme ?? 'dark');
  const containerRef = useRef(null);
  const symbol = config.symbol ?? 'BSE:SENSEX';

  const [currentTheme, setCurrentTheme] = useState(theme);

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

  useSymbolOverview(containerRef, {
    theme: currentTheme,
    symbol,
    widgetId,
  });

  const isWide = density === 'full';

  return (
    <div
      ref={containerRef}
      className={styles.scrollContainer}
    >
      <div className={styles.gridContainer}>

        {/* Symbol Info Banner — always full width */}
        <div className={styles.infoCard}>
          <div
            id={`${widgetId}-info`}
            className={styles.infoEmbed}
          />
        </div>

        {/* Cards — two col or one col */}
        <div className={isWide ? styles.twoColGrid : styles.oneColGrid}>

          {/* LEFT COLUMN */}
          <div className={styles.leftCol}>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                Technical Analysis
              </div>
              <div
                id={`${widgetId}-tech`}
                className={styles.cardEmbed}
              />
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                Company Profile
              </div>
              <div
                id={`${widgetId}-profile`}
                className={styles.cardEmbed}
              />
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className={styles.rightCol}>

            <div className={styles.cardTall}>
              <div className={styles.cardHeader}>
                Fundamental Data
              </div>
              <div
                id={`${widgetId}-fund`}
                className={styles.cardEmbed}
              />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

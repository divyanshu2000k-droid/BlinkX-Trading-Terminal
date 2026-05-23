import { useState, useEffect } from 'react';
import { widgetRegistry, widgetCatalog } from './widgetRegistry.js';
import styles from './WidgetShell.module.css';

function getDensity(width) {
  if (width >= 480) return 'full';
  if (width >= 320) return 'standard';
  if (width >= 200) return 'compact';
  return 'mini';
}

export function WidgetShell(props) {
  const { params, api } = props;
  const { widgetType, widgetConfig = {}, widgetId } = params;

  const [density, setDensity] = useState(() => getDensity(api.width));

  useEffect(() => {
    const disposable = api.onDidDimensionsChange(() => {
      setDensity(getDensity(api.width));
    });
    return () => disposable.dispose();
  }, [api]);

  const WidgetComponent = widgetRegistry[widgetType];

  if (!WidgetComponent) {
    const catalogEntry = widgetCatalog.find((w) => w.id === widgetType);
    const displayLabel = catalogEntry?.label ?? widgetType;

    return (
      <div className={styles.placeholder}>
        <span className={styles.placeholderIcon}>🧩</span>
        <span className={styles.placeholderLabel}>{displayLabel}</span>
        <span className={styles.placeholderHint}>Widget not yet implemented</span>
      </div>
    );
  }

  return (
    <div className={styles.shell}>
      <WidgetComponent
        widgetId={widgetId}
        config={widgetConfig}
        density={density}
        panelApi={api}
      />
    </div>
  );
}

import { useEffect, useRef } from 'react';
import { createEmbedWidget } from '../../../providers/tradingview/createEmbedWidget';

const SCRIPT_SRC = 'https://s3.tradingview.com/external-embedding/embed-widget-etf-heatmap.js';

export function useEtfHeatmap(containerRef, { theme }) {
  const cleanupRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (cleanupRef.current) {
      cleanupRef.current();
    }

    cleanupRef.current = createEmbedWidget(
      containerRef.current,
      {
        scriptSrc: SCRIPT_SRC,
        config: {
          dataSource:       'AllINEtf',
          blockSize:        'volume',
          blockColor:       'change',
          grouping:         'asset_class',
          locale:           'en',
          symbolUrl:        '',
          colorTheme:       theme,
          hasTopBar:        false,
          isDataSetEnabled: false,
          isZoomEnabled:    true,
          hasSymbolTooltip: true,
          isMonoSize:       false,
          width:            '100%',
          height:           '100%',
        },
      }
    );

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, [theme]);
}

import { useEffect, useRef } from 'react';
import { createEmbedWidget } from '../../../providers/tradingview/createEmbedWidget';

const SCRIPT_SRC =
  'https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js';

export function useHeatmap(containerRef, { theme }) {
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
          dataSource:       'SENSEX',
          blockSize:        'market_cap_basic',
          blockColor:       'change',
          grouping:         'sector',
          locale:           'en',
          symbolUrl:        '',
          colorTheme:       theme,
          exchanges:        ['BSE'],
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

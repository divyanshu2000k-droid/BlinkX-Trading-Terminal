import { useEffect, useRef } from 'react';
import { createEmbedWidget } from '../../../providers/tradingview/createEmbedWidget';

const SCRIPT_SRC = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js';

export function useMarketScreeners(containerRef, { theme }) {
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
          market:        'india',
          showToolbar:   true,
          defaultColumn: 'overview',
          defaultScreen: 'most_capitalized',
          isTransparent: false,
          locale:        'en',
          colorTheme:    theme,
          width:         '100%',
          height:        '100%',
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

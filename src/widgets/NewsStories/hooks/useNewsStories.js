import { useEffect, useRef } from 'react';
import { createEmbedWidget }
  from '../../../providers/tradingview/createEmbedWidget';

const SCRIPT_SRC =
  'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js';

export function useNewsStories(containerRef, { theme }) {
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
          displayMode:   'regular',
          feedMode:      'all_symbols',
          colorTheme:    theme,
          isTransparent: false,
          locale:        'en',
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

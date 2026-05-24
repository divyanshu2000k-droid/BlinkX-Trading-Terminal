import { useEffect, useRef } from 'react';
import { createEmbedWidget } from '../../../providers/tradingview/createEmbedWidget';

const SCRIPTS = {
  info:    'https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js',
  tech:    'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js',
  fund:    'https://s3.tradingview.com/external-embedding/embed-widget-financials.js',
  profile: 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js',
};

export function useSymbolOverview(containerRef, {
  theme,
  symbol,
  widgetId,
}) {
  const cleanups = useRef({
    info: null, tech: null,
    fund: null, profile: null,
  });

  useEffect(() => {
    if (!containerRef.current) return;

    // Cleanup all previous instances
    Object.keys(cleanups.current).forEach(key => {
      if (cleanups.current[key]) {
        cleanups.current[key]();
        cleanups.current[key] = null;
      }
    });

    // Find sub-containers by unique ID
    const infoEl    = document.getElementById(`${widgetId}-info`);
    const techEl    = document.getElementById(`${widgetId}-tech`);
    const fundEl    = document.getElementById(`${widgetId}-fund`);
    const profileEl = document.getElementById(`${widgetId}-profile`);

    if (!infoEl || !techEl || !fundEl || !profileEl) return;

    // 1. Symbol Info — no copyright
    cleanups.current.info = createEmbedWidget(
      infoEl, {
        scriptSrc: SCRIPTS.info,
        showCopyright: false,
        config: {
          symbol,
          colorTheme:    theme,
          isTransparent: false,
          locale:        'en',
          width:         '100%',
        },
      }
    );

    // 2. Technical Analysis — no copyright
    cleanups.current.tech = createEmbedWidget(
      techEl, {
        scriptSrc: SCRIPTS.tech,
        showCopyright: false,
        config: {
          symbol,
          colorTheme:       theme,
          displayMode:      'single',
          isTransparent:    false,
          locale:           'en',
          interval:         '1m',
          disableInterval:  false,
          showIntervalTabs: true,
          width:            '100%',
          height:           '100%',
        },
      }
    );

    // 3. Fundamental Data — no copyright
    cleanups.current.fund = createEmbedWidget(
      fundEl, {
        scriptSrc: SCRIPTS.fund,
        showCopyright: false,
        config: {
          symbol,
          colorTheme:    theme,
          displayMode:   'regular',
          isTransparent: false,
          locale:        'en',
          width:         '100%',
          height:        '100%',
        },
      }
    );

    // 4. Company Profile — show copyright here only
    cleanups.current.profile = createEmbedWidget(
      profileEl, {
        scriptSrc: SCRIPTS.profile,
        showCopyright: true,
        config: {
          symbol,
          colorTheme:    theme,
          isTransparent: false,
          locale:        'en',
          width:         '100%',
          height:        '100%',
        },
      }
    );

    return () => {
      Object.keys(cleanups.current).forEach(key => {
        if (cleanups.current[key]) {
          cleanups.current[key]();
          cleanups.current[key] = null;
        }
      });
    };
  }, [theme, symbol]);
}

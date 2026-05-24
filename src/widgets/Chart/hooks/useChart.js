import { useEffect } from 'react';
import { getTVTheme } from '../../../providers/tradingview/tvThemeMap.js';

export function useChart(containerRef, { timeframe, widgetId, theme, ready }) {
  useEffect(() => {
    if (!ready) return;
    if (!document.getElementById(widgetId)) return;
    if (!window.TradingView?.widget) return;

    // Clear previous instance
    if (containerRef.current) {
      try { containerRef.current.innerHTML = ''; } catch (_) {}
    }

    const colors = getTVTheme();

    const widget = new window.TradingView.widget({
      container_id: widgetId,
      interval: timeframe,
      timezone: 'Asia/Kolkata',
      theme: colors.theme,
      style: '1',
      locale: 'en',
      toolbar_bg: colors.backgroundColor,
      enable_publishing: false,
      allow_symbol_change: true,
      save_image: false,
      hide_side_toolbar: false,
      withdateranges: true,
      autosize: true,
      overrides: {
        'paneProperties.background': colors.backgroundColor,
        'paneProperties.vertGridProperties.color': colors.gridColor,
        'paneProperties.horzGridProperties.color': colors.gridColor,
        'scalesProperties.textColor': colors.textColor,
        'mainSeriesProperties.candleStyle.upColor': colors.upColor,
        'mainSeriesProperties.candleStyle.downColor': colors.downColor,
        'mainSeriesProperties.candleStyle.borderUpColor': colors.upColor,
        'mainSeriesProperties.candleStyle.borderDownColor': colors.downColor,
        'mainSeriesProperties.candleStyle.wickUpColor': colors.upColor,
        'mainSeriesProperties.candleStyle.wickDownColor': colors.downColor,
      },
    });

    return () => {
      try {
        widget.remove?.();
        if (containerRef.current) containerRef.current.innerHTML = '';
      } catch (_) {}
    };
  }, [ready, timeframe, widgetId, theme]);
}

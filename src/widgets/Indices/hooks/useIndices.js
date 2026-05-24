import { useEffect, useRef } from 'react';
import { createEmbedWidget } from '../../../providers/tradingview/createEmbedWidget';
import { getTVTheme } from '../../../providers/tradingview/tvThemeMap';

const SCRIPT_SRC =
  'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js';

// Edit this array to change which indices appear
const INDIA_SYMBOLS = [
  ['SENSEX',       'BSE:SENSEX|1D'],
  ['RELIANCE',     'BSE:RELIANCE|1D'],
  ['ASIAN PAINTS', 'BSE:ASIANPAINT|1D'],
  ['HDFC BANK',    'BSE:HDFCBANK|1D'],
  ['INFOSYS',      'BSE:INFY|1D'],
  ['TCS',          'BSE:TCS|1D'],
];

export function useIndices(containerRef, { theme }) {
  const cleanupRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tvTheme = getTVTheme();

    // Cleanup previous instance before mounting new one
    if (cleanupRef.current) {
      cleanupRef.current();
    }

    cleanupRef.current = createEmbedWidget(
      containerRef.current,
      {
        scriptSrc: SCRIPT_SRC,
        config: {
          symbols: INDIA_SYMBOLS,
          chartType: 'area',
          lineWidth: 2,
          lineType: 0,
          fontColor: tvTheme.theme === 'dark'
            ? 'rgb(178, 178, 179)'
            : 'rgb(102, 102, 102)',
          gridLineColor: tvTheme.theme === 'dark'
            ? 'rgba(242, 242, 242, 0.06)'
            : 'rgba(46, 46, 46, 0.06)',
          volumeUpColor:   'rgba(72, 168, 72, 0.5)',
          volumeDownColor: 'rgba(205, 73, 55, 0.5)',
          backgroundColor:  tvTheme.backgroundColor,
          widgetFontColor:  tvTheme.theme === 'dark'
            ? '#CACACE'
            : '#41414E',
          upColor:         '#48A848',
          downColor:       '#CD4937',
          borderUpColor:   '#48A848',
          borderDownColor: '#CD4937',
          wickUpColor:     '#48A848',
          wickDownColor:   '#CD4937',
          isTransparent:   false,
          chartOnly:       false,
          scalePosition:   'right',
          scaleMode:       'Normal',
          fontFamily:      'Barlow, system-ui, sans-serif',
          valuesTracking:  '1',
          changeMode:      'price-and-percent',
          showVolume:      true,
          dateRanges: [
            '1d|1',
            '1m|30',
            '3m|60',
            '12m|1D',
            '60m|1W',
            'all|1M',
          ],
          fontSize:         '10',
          headerFontSize:   'medium',
          noTimeScale:      false,
          hideDateRanges:   false,
          hideMarketStatus: false,
          hideSymbolLogo:   false,
        },
      }
    );

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };

  }, [theme]);
  // Only re-mounts when theme changes.
  // Symbol changes require editing INDIA_SYMBOLS constant.
}

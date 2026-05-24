import { useEffect, useState } from 'react';
import { useUiStore } from '../../stores/uiStore';
import styles from './TVTickerTape.module.css';

const SCRIPT_ID  = 'tv-ticker-tape-script';
const SCRIPT_SRC = 'https://widgets.tradingview-widget.com/w/en/tv-ticker-tape.js';

// BSE:SENSEX added for Indian market context
// Other symbols are globally verified working
const TICKER_SYMBOLS = [
  'BSE:SENSEX',
  'FOREXCOM:SPXUSD',
  'FOREXCOM:NSXUSD',
  'FOREXCOM:DJI',
  'FX:EURUSD',
  'BITSTAMP:BTCUSD',
  'BITSTAMP:ETHUSD',
  'CMCMARKETS:GOLD',
].join(',');

export function TVTickerTape() {
  const theme = useUiStore(s => s.theme ?? 'dark');
  const [elementDefined, setElementDefined] = useState(
    customElements.get('tv-ticker-tape') !== undefined
  );

  useEffect(() => {
    // Load script once
    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement('script');
      script.id   = SCRIPT_ID;
      script.src  = SCRIPT_SRC;
      script.type = 'module';
      document.head.appendChild(script);
    }

    // Wait for custom element registration
    if (!elementDefined) {
      customElements
        .whenDefined('tv-ticker-tape')
        .then(() => setElementDefined(true))
        .catch(() => {});
    }
  }, []);

  // Show blank strip while element loads —
  // prevents empty space gap in ticker area
  // and prevents layout jump
  if (!elementDefined) {
    return <div className={styles.strip} />;
  }

  return (
    <div className={styles.strip}>
      {/*
        key={theme} forces React to unmount and
        remount the Web Component on theme change.
        Web Components only read 'theme' attribute
        once on initialization.

        Using 'theme' attribute NOT 'color-theme' —
        'theme' is the correct attribute for this
        TradingView Web Component.
      */}
      <tv-ticker-tape
        key={theme}
        theme={theme}
        symbols={TICKER_SYMBOLS}
        item-size="compact"
      />
    </div>
  );
}

import { useState, useEffect } from 'react';

const SCRIPT_ID  = 'tv-economic-map-script';
const SCRIPT_SRC =
  'https://widgets.tradingview-widget.com/w/en/tv-economic-map.js';

export function useEconomicMap() {
  const [elementDefined, setElementDefined] =
    useState(
      customElements.get('tv-economic-map')
        !== undefined
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
        .whenDefined('tv-economic-map')
        .then(() => setElementDefined(true))
        .catch(() => {});
    }
  }, []);

  return { elementDefined };
}

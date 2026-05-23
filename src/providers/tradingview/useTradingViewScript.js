import { useEffect, useState } from 'react';

const SCRIPT_ID = 'tradingview-widget-script';

export function useTradingViewScript() {
  const [state, setState] = useState(() => ({
    ready: !!window.TradingView,
    error: false,
  }));

  useEffect(() => {
    if (state.ready || state.error) return;

    // If script tag already exists AND TV is loaded, mark ready immediately —
    // addEventListener('load') would never fire on an already-loaded script.
    const existing = document.getElementById(SCRIPT_ID);
    if (existing && window.TradingView) {
      setState({ ready: true, error: false });
      return;
    }

    let script = existing;
    if (!script) {
      script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.src = 'https://s3.tradingview.com/tv.js';
      script.async = true;
      document.head.appendChild(script);
    }

    const onLoad = () => setState({ ready: true, error: false });
    const onError = () => setState({ ready: false, error: true });

    script.addEventListener('load', onLoad);
    script.addEventListener('error', onError);

    return () => {
      script.removeEventListener('load', onLoad);
      script.removeEventListener('error', onError);
    };
  }, [state.ready, state.error]);

  return state;
}

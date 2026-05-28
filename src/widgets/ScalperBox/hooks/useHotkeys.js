import { useEffect } from 'react';

export function useHotkeys({
  onBuyCall, onSellCall,
  onBuyPut,  onSellPut,
  onExitAll, onCancelAll,
  onFocusCall, onFocusSpot,
  onFocusPut,  onFocusAll,
  onEscape,
}) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.shiftKey) {
        switch (e.key) {
          case 'ArrowUp':    e.preventDefault(); onBuyCall?.();   break;
          case 'ArrowLeft':  e.preventDefault(); onSellCall?.();  break;
          case 'ArrowDown':  e.preventDefault(); onBuyPut?.();    break;
          case 'ArrowRight': e.preventDefault(); onSellPut?.();   break;
          case 'E': case 'e': e.preventDefault(); onExitAll?.();  break;
          case 'C': case 'c': e.preventDefault(); onCancelAll?.(); break;
        }
      } else {
        switch (e.key) {
          case '1': onFocusCall?.(); break;
          case '2': onFocusSpot?.(); break;
          case '3': onFocusPut?.();  break;
          case '0': onFocusAll?.();  break;
          case 'Escape': onEscape?.(); break;
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onBuyCall, onSellCall, onBuyPut, onSellPut, onExitAll, onCancelAll,
      onFocusCall, onFocusSpot, onFocusPut, onFocusAll, onEscape]);
}

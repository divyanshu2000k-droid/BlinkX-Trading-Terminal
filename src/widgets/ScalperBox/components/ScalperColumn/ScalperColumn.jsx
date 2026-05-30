import { useRef, useEffect } from 'react';
import { useMarginCalc } from '../../hooks/useMarginCalc.js';
import ChartTopBar from '../ChartTopBar/ChartTopBar.jsx';
import MiniChart   from '../MiniChart/MiniChart.jsx';
import RangeBar    from '../RangeBar/RangeBar.jsx';
import OrderPad    from '../OrderPad/OrderPad.jsx';
import CenterPad   from '../CenterPad/CenterPad.jsx';
import styles from './ScalperColumn.module.css';

export default function ScalperColumn({
  leg,
  state,
  actions,
  marketData,
  scalperPnl,
  allPnl,
  onTrade,
  density,
  onOpenPopover,
}) {
  const colRef = useRef(null);

  // ResizeObserver — sets data-width-class on column div.
  // Mandatory cleanup (RULE C).
  useEffect(() => {
    if (!colRef.current) return;
    const el = colRef.current;
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        if (w < 180 && w > 0) {
          el.setAttribute('data-width-class', 'very-narrow');
        } else if (w < 240 && w > 0) {
          el.setAttribute('data-width-class', 'narrow');
        } else {
          el.removeAttribute('data-width-class');
        }
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isCall = leg === 'call';
  const isPut  = leg === 'put';
  const isSpot = leg === 'spot';

  const strike = isCall ? state.callStrike : state.putStrike;
  const lots   = isCall ? state.callLots   : state.putLots;

  const ltp = isCall
    ? marketData.callLtp
    : isPut
      ? marketData.putLtp
      : marketData.spotLtp;

  const bid = isCall ? marketData.callBid : marketData.putBid;
  const ask = isCall ? marketData.callAsk : marketData.putAsk;

  const candles = isCall
    ? marketData.callCandles
    : isPut
      ? marketData.putCandles
      : marketData.spotCandles;

  const moneyness = isCall
    ? marketData.callMoneyness
    : isPut
      ? marketData.putMoneyness
      : null;

  const chgAbs = isCall
    ? marketData.callChgAbs
    : isPut
      ? marketData.putChgAbs
      : marketData.spotChgAbs;

  const chgPct = isCall
    ? marketData.callChgPct
    : isPut
      ? marketData.putChgPct
      : marketData.spotChgPct;

  const symbol = isSpot
    ? state.underlying?.name ?? '—'
    : `${state.underlying?.sym ?? '—'} ${strike ?? '—'} ${isCall ? 'CALL' : 'PUT'}`;

  // useMarginCalc — called unconditionally at top level (RULE D).
  // For spot column: ltp is null so isReady will be false — safe.
  const buyMargin = useMarginCalc({
    leg,
    action:        'buy',
    lots:          lots ?? 1,
    ltp:           isSpot ? null : ltp,
    lotSize:       state.underlying?.lot,
    underlyingLtp: state.underlying?.ltp,
  });
  const sellMargin = useMarginCalc({
    leg,
    action:        'sell',
    lots:          lots ?? 1,
    ltp:           isSpot ? null : ltp,
    lotSize:       state.underlying?.lot,
    underlyingLtp: state.underlying?.ltp,
  });

  const openPopover = (id, e) => onOpenPopover?.(id, e);

  return (
    <div ref={colRef} className={styles.column}>

      <ChartTopBar
        leg={leg}
        symbol={symbol}
        moneyness={moneyness}
        ltp={ltp}
        chgAbs={chgAbs}
        chgPct={chgPct}
        spotMode={state.spotMode}
        onSpotModeChange={isSpot ? actions.setSpotMode : undefined}
      />

      <MiniChart
        leg={leg}
        candles={candles}
        ltp={ltp}
        positions={state.positions}
        showJMMarkers={state.settings.showJMMarkers}
        showPositionMarkers={state.settings.showPositionMarkers}
        onTrade={isSpot ? null : onTrade}
        onOpenJM={e => openPopover(`jm-${leg}`, e)}
      />

      <RangeBar
        activeTimeframe={state.timeframe}
        onTimeframeChange={actions.setTimeframe}
        onCalendarClick={() => actions.setActivePopover(null)}
      />

      {isSpot ? (
        <CenterPad
          underlying={state.underlying}
          selectedExpiry={state.selectedExpiry}
          scalperPnl={scalperPnl}
          allPnl={allPnl}
          onExitAll={() => actions.exitAllPositions()}
          onCancelAll={() => {}}
          onOpenSearch={e => openPopover('scrip', e)}
          onOpenExpiry={e => openPopover('expiry', e)}
        />
      ) : (
        <OrderPad
          leg={leg}
          strike={strike}
          strikeList={marketData.strikeList}
          atmStrike={marketData.atmStrike}
          lots={lots}
          ltp={ltp}
          bid={bid}
          ask={ask}
          moneyness={moneyness}
          lotSize={state.underlying?.lot}
          buyMargin={buyMargin}
          sellMargin={sellMargin}
          settings={state.settings}
          onTrade={onTrade}
          onLotsChange={isCall ? actions.setCallLots : actions.setPutLots}
          onStrikeChange={isCall ? actions.setCallStrike : actions.setPutStrike}
          onOpenStrike={e =>
            onOpenPopover?.(isCall ? 'strike-call' : 'strike-put', e)
          }
          onOpenMargin={(action, e) =>
            onOpenPopover?.(`margin-${leg}-${action}`, e)
          }
        />
      )}

    </div>
  );
}

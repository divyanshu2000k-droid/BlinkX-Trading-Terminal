import ChartTopBar  from '../ChartTopBar/ChartTopBar.jsx';
import MiniChart    from '../MiniChart/MiniChart.jsx';
import RangeBar     from '../RangeBar/RangeBar.jsx';
import OrderPad     from '../OrderPad/OrderPad.jsx';
import CenterPad    from '../CenterPad/CenterPad.jsx';
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
  popoverAnchors,
  onOpenPopover,
}) {
  const isSpot = leg === 'spot';

  const candles = leg === 'call'
    ? marketData.callCandles
    : leg === 'put'
      ? marketData.putCandles
      : marketData.spotCandles;

  const ltp = leg === 'call'
    ? marketData.callLtp
    : leg === 'put'
      ? marketData.putLtp
      : marketData.spotLtp;

  const high = candles.length ? Math.max(...candles.map(c => c.high)) : null;
  const low  = candles.length ? Math.min(...candles.map(c => c.low))  : null;

  const labelClass = leg === 'call'
    ? styles.labelCall
    : leg === 'put'
      ? styles.labelPut
      : styles.labelSpot;

  const labelText = leg === 'call' ? 'CE' : leg === 'put' ? 'PE' : 'SPOT';

  return (
    <div className={styles.column}>
      {/* Column type header */}
      <div className={styles.colHeader}>
        <span className={`${styles.colLabel} ${labelClass}`}>{labelText}</span>
      </div>

      {/* Chart top bar with LTP + strike info */}
      <ChartTopBar
        leg={leg}
        state={state}
        actions={actions}
        marketData={marketData}
        onOpenPopover={onOpenPopover}
        density={density}
      />

      {/* Mini candlestick chart */}
      <div className={styles.chartArea}>
        <MiniChart candles={candles} />
      </div>

      {/* Day range bar */}
      {ltp != null && high != null && low != null && (
        <RangeBar ltp={ltp} high={high} low={low} />
      )}

      {/* Order pad or center pad */}
      <div className={styles.padArea}>
        {isSpot ? (
          <CenterPad
            state={state}
            actions={actions}
            marketData={marketData}
            scalperPnl={scalperPnl}
            allPnl={allPnl}
            onOpenPopover={onOpenPopover}
          />
        ) : (
          <OrderPad
            leg={leg}
            state={state}
            actions={actions}
            marketData={marketData}
            onTrade={onTrade}
            onOpenPopover={onOpenPopover}
            density={density}
          />
        )}
      </div>
    </div>
  );
}

import { formatINR } from '../../../../primitives/index.js';
import styles from './MiniChart.module.css';

export default function MiniChart({
  leg,
  candles,
  ltp,
  positions,
  showJMMarkers,
  showPositionMarkers,
  onTrade,
  onOpenJM,
}) {
  if (!candles || candles.length === 0) {
    return (
      <div className={styles.chartWrap}>
        <div className={styles.skeleton} />
      </div>
    );
  }

  const W = 400;
  const H = 220;
  const padTop = 10;
  const padBot = 10;
  const usable = H - padTop - padBot;

  const maxP = Math.max(...candles.map(c => c.high));
  const minP = Math.min(...candles.map(c => c.low));
  const range = maxP - minP || 1;

  const toY = p => padTop + (1 - (p - minP) / range) * usable;

  const cw = W / candles.length;

  const ltpPct = ltp != null
    ? `${((1 - (ltp - minP) / range) * 100).toFixed(2)}%`
    : '50%';

  const legPositions = (positions ?? []).filter(p => p.leg === leg);

  return (
    <div className={styles.chartWrap}>

      <svg
        className={styles.chartSvg}
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
      >
        {/* Grid lines */}
        {[1, 2, 3, 4].map(g => (
          <line
            key={g}
            x1={0}
            y1={padTop + (usable / 5) * g}
            x2={W}
            y2={padTop + (usable / 5) * g}
            stroke="var(--blinkx-color-stroke-subtle)"
            strokeWidth={0.5}
          />
        ))}

        {/* Candles */}
        {candles.map((c, i) => {
          const x = i * cw + cw * 0.5;
          const isUp = c.close >= c.open;
          const color = isUp
            ? 'var(--blinkx-color-text-positive)'
            : 'var(--blinkx-color-text-negative)';
          const y1 = toY(c.open);
          const y2 = toY(c.close);
          return (
            <g key={i}>
              <line
                x1={x}
                y1={toY(c.high)}
                x2={x}
                y2={toY(c.low)}
                stroke={color}
                strokeWidth={1}
              />
              <rect
                x={x - cw * 0.35}
                y={Math.min(y1, y2)}
                width={cw * 0.7}
                height={Math.max(1, Math.abs(y2 - y1))}
                fill={color}
              />
            </g>
          );
        })}
      </svg>

      {/* BUY/SELL buttons — call and put only */}
      {onTrade && (
        <div className={styles.tradeBtns}>
          <button
            className={styles.buyBtn}
            onClick={e => { e.stopPropagation(); onTrade('buy'); }}
          >
            BUY
          </button>
          <button
            className={styles.sellBtn}
            onClick={e => { e.stopPropagation(); onTrade('sell'); }}
          >
            SELL
          </button>
        </div>
      )}

      {/* JM Research badge */}
      {showJMMarkers && (
        <button
          className={styles.jmBadge}
          onClick={e => { e.stopPropagation(); onOpenJM?.(e); }}
        >
          JM
        </button>
      )}

      {/* LTP marker line */}
      {ltp != null && (
        <div className={styles.ltpMarker} style={{ top: ltpPct }}>
          {formatINR(ltp)}
        </div>
      )}

      {/* Position markers */}
      {showPositionMarkers && legPositions.map((p, i) => {
        if (p.entry < minP || p.entry > maxP) return null;
        const pct = `${((1 - (p.entry - minP) / range) * 100).toFixed(2)}%`;
        const isLong = p.side === 'long';
        return (
          <div key={i}>
            <div
              className={isLong ? styles.posMarkerLong : styles.posMarkerShort}
              style={{ top: pct }}
            />
            <div
              className={`${styles.posLabel} ${isLong ? styles.posLabelLong : styles.posLabelShort}`}
              style={{ top: pct }}
            >
              {isLong ? '+' : '-'}{p.qty} @ {formatINR(p.entry)}
            </div>
          </div>
        );
      })}

    </div>
  );
}

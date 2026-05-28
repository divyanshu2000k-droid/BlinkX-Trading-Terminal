import { useRef, useEffect } from 'react';
import { useUiStore } from '../../../../stores/uiStore.js';
import styles from './MiniChart.module.css';

// Hardcoded hex required for canvas (cannot use CSS variables)
const THEME_COLORS = {
  dark:  { bull: '#48A848', bear: '#CD4937', wick: '#6B7280' },
  light: { bull: '#2BB02B', bear: '#DD2006', wick: '#9CA3AF' },
};

export default function MiniChart({ candles }) {
  const canvasRef = useRef(null);
  const wrapRef   = useRef(null);
  const theme     = useUiStore(s => s.theme);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap   = wrapRef.current;
    if (!canvas || !wrap || !candles?.length) return;

    const W = wrap.clientWidth  || 200;
    const H = wrap.clientHeight || 120;
    canvas.width  = W;
    canvas.height = H;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, W, H);

    const prices = candles.flatMap(c => [c.high, c.low]);
    const minP   = Math.min(...prices);
    const maxP   = Math.max(...prices);
    const range  = maxP - minP || 1;
    const pad    = H * 0.04;

    const toY = p => pad + H * 0.92 - ((p - minP) / range) * H * 0.92;

    const colW    = W / candles.length;
    const candleW = Math.max(1, colW * 0.7);
    const colors  = THEME_COLORS[theme] ?? THEME_COLORS.dark;

    candles.forEach((c, i) => {
      const isBull = c.close >= c.open;
      const color  = isBull ? colors.bull : colors.bear;
      const cx     = i * colW + colW / 2;

      // Wick
      ctx.strokeStyle = colors.wick;
      ctx.lineWidth   = 1;
      ctx.beginPath();
      ctx.moveTo(cx, toY(c.high));
      ctx.lineTo(cx, toY(c.low));
      ctx.stroke();

      // Body
      const bodyTop = toY(Math.max(c.open, c.close));
      const bodyBot = toY(Math.min(c.open, c.close));
      const bodyH   = Math.max(1, bodyBot - bodyTop);
      ctx.fillStyle = color;
      ctx.fillRect(cx - candleW / 2, bodyTop, candleW, bodyH);
    });
  }, [candles, theme]);

  if (!candles?.length) {
    return (
      <div className={styles.wrap} ref={wrapRef}>
        <div className={styles.empty}>—</div>
      </div>
    );
  }

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}

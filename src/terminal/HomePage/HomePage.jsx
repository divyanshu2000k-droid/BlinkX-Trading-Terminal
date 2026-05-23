import { useState, useEffect } from 'react';
import { useWorkspaceStore } from '../../stores/workspaceStore.js';
import styles from './HomePage.module.css';

const TERMINALS = [
  {
    id: 'volatility',
    tag: 'F&O · Strategy',
    tagKey: 'volatility',
    title: 'Volatility',
    titleEm: '',
    desc: 'Multi-factor options analysis. Straddle, IV, OI, strategy builder, option chain — every layer of the volatility decision in one surface.',
    meta: '7 widgets · 4 channels',
  },
  {
    id: 'scalper',
    tag: 'F&O · Speed',
    tagKey: 'scalper',
    title: 'Scalper',
    titleEm: '',
    desc: 'Triple-chart CE/PE/Underlying with one-click execution. Hotkeys, fast exits, minimum friction. Built for the 2–5 point trade.',
    meta: '3 widgets · hotkeys on',
  },
  {
    id: 'conviction',
    tag: 'JM Research · Exclusive',
    tagKey: 'conviction',
    title: 'Conviction',
    titleEm: '',
    desc: 'Trade JM Financial\'s institutional research. Research, charts, volume profile, event calendar — research → conviction → execution.',
    meta: '8 widgets · BlinkX exclusive',
  },
  {
    id: 'chart-first',
    tag: 'Chart · Analysis',
    tagKey: 'chart',
    title: 'Chart-First',
    titleEm: '',
    desc: 'Full-screen TradingView chart with price ladder, time & sales, and order form docked alongside. Pure price action workflow.',
    meta: '4 widgets · 2 channels',
  },
  {
    id: 'custom',
    tag: 'Build your own',
    tagKey: 'custom',
    title: 'Customisable',
    titleEm: '',
    desc: 'Empty canvas. Pick from 26 widgets, drag-arrange them, save unlimited named layouts. Or start from any template above.',
    meta: '26 widgets available',
    featured: true,
  },
];

export default function HomePage() {
  const setActiveTerminalId = useWorkspaceStore((s) => s.setActiveTerminalId);
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [marketOpen, setMarketOpen] = useState(true);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-IN', { hour12: false }));
      setDate(now.toLocaleDateString('en-IN', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }));
      const h = now.getHours(), m = now.getMinutes(), d = now.getDay();
      setMarketOpen(d >= 1 && d <= 5 && (h > 9 || (h === 9 && m >= 15)) && (h < 15 || (h === 15 && m <= 30)));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.content}>

        {/* Welcome */}
        <div className={styles.welcome}>
          <div className={styles.welcomeLeft}>
            <div className={styles.eyebrow}>Good afternoon, Aman</div>
            <h1 className={styles.title}>
              Where do you want to <em>start?</em>
            </h1>
            <p className={styles.sub}>
              Choose a pre-defined terminal aligned to your trading style, or build your own
              from the widget library. Your last layout is saved and ready when you return.
            </p>
          </div>
          <div className={styles.marketStatus}>
            <div className={styles.statusRow}>
              <span className={`${styles.statusDot} ${marketOpen ? styles.open : styles.closed}`} />
              <span className={`${styles.statusLabel} ${marketOpen ? styles.open : styles.closed}`}>
                Markets {marketOpen ? 'Open' : 'Closed'}
              </span>
            </div>
            <div className={styles.statusTime}>{time}</div>
            <div className={styles.statusDate}>{date} · IST</div>
          </div>
        </div>

        {/* Section header */}
        <div className={styles.sectionHeader}>
          <span className={styles.sectionEyebrow}>§ 01 — Pre-defined</span>
          <span className={styles.sectionTitle}>
            Five terminals for <em>five workflows</em>
          </span>
        </div>

        {/* Terminal cards */}
        <div className={styles.grid}>
          {TERMINALS.map(t => (
            <div
              key={t.id}
              className={`${styles.card} ${t.featured ? styles.cardFeatured : ''}`}
              onClick={() => setActiveTerminalId(t.id)}
            >
              <div className={`${styles.cardPreview} ${styles[`preview_${t.tagKey}`]}`}>
                <PreviewIllustration id={t.id} />
              </div>
              <div className={styles.cardMeta}>
                <span className={`${styles.cardTag} ${styles[`cardTag_${t.tagKey}`]}`}>
                  {t.tag}
                </span>
                <h3 className={styles.cardTitle}>{t.title}</h3>
                <p className={styles.cardDesc}>{t.desc}</p>
                <div className={styles.cardFooter}>
                  <span className={styles.cardMetaBottom}>{t.meta}</span>
                  <span className={styles.cardArrow}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

// Minimal SVG illustrations per terminal type
function PreviewIllustration({ id }) {
  if (id === 'volatility') return (
    <svg viewBox="0 0 120 60" style={{ width: '100%', height: '100%' }}>
      <path d="M0,40 Q20,35 35,28 T65,18 T90,22 T120,14"
        stroke="#4A8FE7" strokeWidth="1.5" fill="none"/>
      <path d="M0,40 Q20,35 35,28 T65,18 T90,22 T120,14 L120,60 L0,60 Z"
        fill="rgba(74,143,231,0.08)"/>
      <path d="M10,35 L20,25 L35,30 L50,20 L65,28 L80,18 L95,24 L110,16"
        stroke="#2EBD85" strokeWidth="1" fill="none" strokeDasharray="3,2" opacity="0.6"/>
      <text x="8" y="10" fill="#6B7280" fontSize="5" fontFamily="monospace">IV%</text>
      <text x="8" y="18" fill="#9CA3AE" fontSize="4" fontFamily="monospace">22.4</text>
    </svg>
  );
  if (id === 'scalper') return (
    <svg viewBox="0 0 120 60" style={{ width: '100%', height: '100%' }}>
      {[0,1,2,3,4,5,6,7,8,9].map(i => {
        const x = 8 + i * 11, h = [12,8,18,6,14,10,20,7,16,9][i];
        const isUp = [1,0,1,1,0,1,0,1,0,1][i];
        return <rect key={i} x={x} y={42-h} width="6" height={h}
          fill={isUp ? 'rgba(46,189,133,0.7)' : 'rgba(229,72,77,0.7)'} rx="1"/>;
      })}
      <line x1="0" y1="32" x2="120" y2="32" stroke="#4A8FE7" strokeWidth="0.5" strokeDasharray="2,3" opacity="0.5"/>
      <text x="8" y="10" fill="#2EBD85" fontSize="5" fontFamily="monospace">22400 CE</text>
    </svg>
  );
  if (id === 'conviction') return (
    <svg viewBox="0 0 120 60" style={{ width: '100%', height: '100%' }}>
      <path d="M0,45 L15,38 L30,40 L45,32 L60,28 L75,30 L90,22 L105,25 L120,18"
        stroke="#2EBD85" strokeWidth="1.5" fill="none"/>
      <path d="M0,45 L15,38 L30,40 L45,32 L60,28 L75,30 L90,22 L105,25 L120,18 L120,60 L0,60 Z"
        fill="rgba(46,189,133,0.07)"/>
      {[20, 50, 85].map((x, i) => (
        <circle key={i} cx={x} cy={[38, 28, 22][i]} r="3"
          fill={['#F0B22A','#4A8FE7','#2EBD85'][i]} opacity="0.8"/>
      ))}
      <text x="8" y="10" fill="#6B7280" fontSize="5" fontFamily="monospace">JM RESEARCH</text>
    </svg>
  );
  if (id === 'chart-first') return (
    <svg viewBox="0 0 120 60" style={{ width: '100%', height: '100%' }}>
      {[0,1,2,3,4,5,6,7,8].map(i => {
        const x = 5 + i * 13;
        const o = [38,35,40,32,36,28,34,30,26][i];
        const c = [35,40,32,36,28,34,30,26,32][i];
        const h = Math.min(o,c) - 4, l = Math.max(o,c) + 4;
        const up = c < o;
        return (
          <g key={i}>
            <line x1={x+4} y1={h} x2={x+4} y2={l} stroke={up ? '#2EBD85' : '#E5484D'} strokeWidth="0.8"/>
            <rect x={x+1} y={Math.min(o,c)} width="6" height={Math.abs(o-c)||1}
              fill={up ? '#2EBD85' : '#E5484D'} opacity="0.85"/>
          </g>
        );
      })}
    </svg>
  );
  // custom — grid icon
  return (
    <svg viewBox="0 0 120 60" style={{ width: '100%', height: '100%' }}>
      {[[10,10,50,20],[70,10,40,20],[10,38,30,15],[50,38,60,15]].map(([x,y,w,h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h}
          rx="3" fill="none" stroke="#2A3038" strokeWidth="1"
          strokeDasharray={i === 0 ? 'none' : '2,2'}/>
      ))}
      <text x="60" y="28" fill="#4A8FE7" fontSize="16" textAnchor="middle" fontFamily="monospace">+</text>
    </svg>
  );
}

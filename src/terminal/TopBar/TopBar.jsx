import { useState, useEffect } from 'react';
import { Search, Bell, Settings, Sun, Moon, ChevronDown, Plus } from 'lucide-react';
import logoMain  from '../../assets/logo-main.png.png';
import logoWhite from '../../assets/logo-white.png.png';
import { useWorkspaceStore } from '../../stores/workspaceStore.js';
import { useUiStore } from '../../stores/uiStore.js';
import styles from './TopBar.module.css';

const TERMINALS = [
  { id: 'home',        label: 'Home',        tagKey: 'home'        },
  { id: 'volatility',  label: 'Volatility',  tagKey: 'volatility'  },
  { id: 'scalper',     label: 'Scalper',     tagKey: 'scalper'     },
  { id: 'conviction',  label: 'Conviction',  tagKey: 'conviction'  },
  { id: 'chart-first', label: 'Chart-First', tagKey: 'chart'       },
  { id: 'custom',      label: 'Customisable',tagKey: 'custom'      },
];

const ACCOUNT = {
  name: 'Aman T.',
  initials: 'AT',
  marginAvl: '2,15,500',
  dayPnl: '+12,450',
  dayPnlDir: 1,
  positions: 7,
  openOrders: 3,
};

export default function TopBar() {
  const activeTerminalId = useWorkspaceStore((s) => s.activeTerminalId);
  const setActiveTerminalId = useWorkspaceStore((s) => s.setActiveTerminalId);
  const openPicker = useWorkspaceStore((s) => s.openPicker);
  const theme = useUiStore((s) => s.theme);
  const setTheme = useUiStore((s) => s.setTheme);

  const [time, setTime] = useState('');
  const [marketOpen, setMarketOpen] = useState(true);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-IN', { hour12: false }));
      const h = now.getHours(), m = now.getMinutes(), d = now.getDay();
      setMarketOpen(d >= 1 && d <= 5 && (h > 9 || (h === 9 && m >= 15)) && (h < 15 || (h === 15 && m <= 30)));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <header className={styles.header}>

      {/* Brand */}
      <div className={styles.brand} onClick={() => setActiveTerminalId('home')}>
        <img
          src={theme === 'dark' ? logoWhite : logoMain}
          alt="BlinkX"
          className={styles.logo}
        />
      </div>

      {/* Tabs */}
      <nav className={styles.tabs}>
        {TERMINALS.map(t => (
          <button
            key={t.id}
            className={`${styles.tab} ${activeTerminalId === t.id ? styles.tabActive : ''}`}
            onClick={() => setActiveTerminalId(t.id)}
          >
            <span className={`${styles.dot} ${activeTerminalId === t.id ? styles[`dot_${t.tagKey}`] : ''}`} />
            {t.label}
          </button>
        ))}
        <button className={styles.tabNew} title="New layout">
          <Plus size={12} />
        </button>
      </nav>

      {/* Right */}
      <div className={styles.right}>
        <div className={styles.marketStatus}>
          <span className={`${styles.statusDot} ${marketOpen ? styles.statusOpen : styles.statusClosed}`} />
          <span className={styles.statusLabel}>{marketOpen ? 'Open' : 'Closed'}</span>
        </div>

        <div className={styles.summary}>
          <span className={styles.summaryLabel}>Margin Avl</span>
          <span className={styles.summaryValue}>₹{ACCOUNT.marginAvl}</span>
        </div>
        <div className={styles.summary}>
          <span className={styles.summaryLabel}>Day P&amp;L</span>
          <span className={`${styles.summaryValue} ${ACCOUNT.dayPnlDir > 0 ? styles.pos : styles.neg}`}>
            ₹{ACCOUNT.dayPnl}
          </span>
        </div>
        <div className={styles.summary}>
          <span className={styles.summaryLabel}>Positions</span>
          <span className={styles.summaryValue}>{ACCOUNT.positions}</span>
        </div>

        <div className={styles.controls}>
          <button className={styles.widgetsBtn} onClick={() => openPicker(null)}>
            <Plus size={11} /> Widgets
          </button>
          <button className={styles.ctrl} title="Search"><Search size={13} /></button>
          <button className={styles.ctrl} title="Notifications" style={{ position: 'relative' }}>
            <Bell size={13} />
            {ACCOUNT.openOrders > 0 && <span className={styles.badge}>{ACCOUNT.openOrders}</span>}
          </button>
          <button className={styles.ctrl} title={theme === 'dark' ? 'Switch to light' : 'Switch to dark'} onClick={toggleTheme}>
            {theme === 'dark' ? <Sun size={13} /> : <Moon size={13} />}
          </button>
          <button className={styles.ctrl} title="Settings"><Settings size={13} /></button>
        </div>

        <button className={styles.profile}>
          <div className={styles.avatar}>{ACCOUNT.initials}</div>
          <span className={styles.name}>{ACCOUNT.name}</span>
          <ChevronDown size={12} className={styles.chevron} />
        </button>

        <div className={styles.clock}>
          <div className={styles.clockTime}>{time}</div>
          <div className={styles.clockLabel}>IST</div>
        </div>
      </div>
    </header>
  );
}

import { useState, useEffect, useMemo } from 'react';
import { Search, ArrowUpDown, ChevronDown, Plus, TrendingUp, TrendingDown } from 'lucide-react';
import { mock } from './mock.js';
import styles from './Widget.module.css';

export default function WatchlistWidget({ widgetId, config = {}, density = 'full', panelApi }) {
  const [watchlist, setWatchlist] = useState(mock.items);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState(null); // 'symbol', 'ltp', 'changePercent'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [flashStates, setFlashStates] = useState({}); // { symbol: 'up' | 'down' }

  // Fluctuate prices randomly to simulate a live trading terminal
  useEffect(() => {
    const interval = setInterval(() => {
      // Pick a random stock to update
      const randomIndex = Math.floor(Math.random() * watchlist.length);
      const stock = watchlist[randomIndex];
      if (!stock) return;

      const changePercent = (Math.random() * 0.4 - 0.2); // -0.2% to +0.2%
      const priceDiff = parseFloat((stock.ltp * (changePercent / 100)).toFixed(2));
      if (priceDiff === 0) return;

      const newLtp = parseFloat((stock.ltp + priceDiff).toFixed(2));
      const newChange = parseFloat((stock.change + priceDiff).toFixed(2));
      const newChangePercent = parseFloat(((newChange / (newLtp - newChange)) * 100).toFixed(2));

      // Append new LTP to sparkline
      const nextSparkline = [...stock.sparkline.slice(1), newLtp];

      setWatchlist(prev => prev.map((item, idx) => {
        if (idx === randomIndex) {
          return {
            ...item,
            ltp: newLtp,
            change: newChange,
            changePercent: newChangePercent,
            sparkline: nextSparkline
          };
        }
        return item;
      }));

      // Flash effect
      const direction = priceDiff > 0 ? 'up' : 'down';
      setFlashStates(prev => ({ ...prev, [stock.symbol]: direction }));
      setTimeout(() => {
        setFlashStates(prev => {
          const next = { ...prev };
          delete next[stock.symbol];
          return next;
        });
      }, 500);

    }, 2500);

    return () => clearInterval(interval);
  }, [watchlist]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const filteredAndSortedData = useMemo(() => {
    let result = [...watchlist];

    // Search filter
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(item => 
        item.symbol.toLowerCase().includes(term) || 
        item.name.toLowerCase().includes(term)
      );
    }

    // Sorting
    if (sortBy) {
      result.sort((a, b) => {
        let valA = a[sortBy];
        let valB = b[sortBy];

        if (typeof valA === 'string') {
          return sortOrder === 'asc' 
            ? valA.localeCompare(valB) 
            : valB.localeCompare(valA);
        }

        return sortOrder === 'asc' ? valA - valB : valB - valA;
      });
    }

    return result;
  }, [watchlist, searchTerm, sortBy, sortOrder]);

  const getSegmentClass = (seg) => {
    switch (seg) {
      case 'NSE': return styles.nseBadge;
      case 'BSE': return styles.bseBadge;
      case 'NFO': return styles.nfoBadge;
      case 'MCX': return styles.mcxBadge;
      default: return styles.defaultBadge;
    }
  };

  // Helper to render sparkline SVG path
  const renderSparkline = (prices, isPositive) => {
    if (!prices || prices.length < 2) return null;
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const range = max - min || 1;

    const width = 45;
    const height = 14;
    const padding = 2;

    const points = prices.map((price, i) => {
      const x = (i / (prices.length - 1)) * (width - padding * 2) + padding;
      const y = height - padding - ((price - min) / range) * (height - padding * 2);
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg width={width} height={height} className={styles.sparklineSvg}>
        <polyline
          fill="none"
          stroke={isPositive ? 'var(--blinkx-color-text-green)' : 'var(--blinkx-color-text-red)'}
          strokeWidth="1.2"
          points={points}
        />
      </svg>
    );
  };

  return (
    <div className={styles.root} data-density={density}>
      {/* Dense Mini Search & Actions bar */}
      {density !== 'mini' && (
        <div className={styles.toolbar}>
          <div className={styles.searchWrapper}>
            <Search size={11} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search symbol..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <button className={styles.iconButton} title="Add Custom Symbol">
            <Plus size={12} />
          </button>
        </div>
      )}

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th onClick={() => handleSort('symbol')} className={styles.sortableHeader}>
                Sym {sortBy === 'symbol' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('ltp')} className={`${styles.sortableHeader} ${styles.numAlign}`}>
                LTP {sortBy === 'ltp' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('changePercent')} className={`${styles.sortableHeader} ${styles.numAlign}`}>
                Chg% {sortBy === 'changePercent' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              {density === 'full' && (
                <>
                  <th className={styles.centerAlign}>Trend</th>
                  <th className={styles.numAlign}>Volume</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedData.map(item => {
              const isPositive = item.change >= 0;
              const flash = flashStates[item.symbol];
              const flashClass = flash === 'up' ? styles.flashUp : flash === 'down' ? styles.flashDown : '';

              return (
                <tr key={item.symbol} className={`${styles.row} ${flashClass}`}>
                  {/* Symbol & Name Column */}
                  <td className={styles.symbolCol}>
                    <div className={styles.symbolRow}>
                      <span className={styles.badgeWrapper}>
                        <span className={`${styles.badge} ${getSegmentClass(item.segment)}`}>
                          {item.segment}
                        </span>
                      </span>
                      <span className={styles.symbolText}>{item.symbol}</span>
                    </div>
                    {density === 'full' && (
                      <span className={styles.companyName}>{item.name}</span>
                    )}
                  </td>

                  {/* LTP Column */}
                  <td className={`${styles.numAlign} ${styles.ltpCol} ${isPositive ? styles.textGreen : styles.textRed}`}>
                    {item.ltp.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>

                  {/* Change % Column */}
                  <td className={`${styles.numAlign} ${styles.changeCol} ${isPositive ? styles.textGreen : styles.textRed}`}>
                    {isPositive ? '+' : ''}{item.changePercent.toFixed(2)}%
                  </td>

                  {/* Premium Sparkline Column (Full Density only) */}
                  {density === 'full' && (
                    <>
                      <td className={styles.centerAlign}>
                        <div className={styles.sparkWrapper}>
                          {renderSparkline(item.sparkline, isPositive)}
                        </div>
                      </td>
                      <td className={`${styles.numAlign} ${styles.volumeCol}`}>
                        {item.volume}
                      </td>
                    </>
                  )}

                  {/* Quick Action Overlay on Row Hover (only for non-mini) */}
                  {density !== 'mini' && (
                    <div className={styles.actionOverlay}>
                      <button className={styles.buyBtn}>B</button>
                      <button className={styles.sellBtn}>S</button>
                    </div>
                  )}
                </tr>
              );
            })}
            {filteredAndSortedData.length === 0 && (
              <tr>
                <td colSpan={density === 'full' ? 5 : 3} className={styles.noData}>
                  No symbols found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

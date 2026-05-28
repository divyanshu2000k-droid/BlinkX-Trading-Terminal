import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Input, Chip, CTAButton, Badge, Icon } from '../../components';
import { PnLValue, FlashValue, PriceChangeValue, formatINR } from '../../primitives';
import { usePositions } from './hooks/usePositions';
import { DEFAULT_COLUMNS } from './mock';
import styles from './Widget.module.css';

const TAB_DEFS = [
  { key: 'equity',    label: 'Equity' },
  { key: 'fno',       label: 'F&O' },
  { key: 'commodity', label: 'Commodity' },
];

const FILTER_DEFS = [
  { key: 'all',    label: 'All' },
  { key: 'long',   label: 'Long' },
  { key: 'short',  label: 'Short' },
  { key: 'mis',    label: 'MIS' },
  { key: 'cnc',    label: 'CNC' },
  { key: 'nrml',   label: 'NRML' },
  { key: 'profit', label: 'Profitable' },
  { key: 'loss',   label: 'Loss-making' },
];

const NUM_COLS = new Set(['qty', 'avgPrice', 'mktPrice', 'pnl', 'dayChange', 'returns']);

export default function PositionsWidget({ widgetId, config = {}, density = 'full', panelApi }) {
  const {
    positions, summary,
    visiblePositions, tabCounts, flashMap,
    activeTab,    setActiveTab,
    activeFilter, setActiveFilter,
    search,       setSearch,
    sortCol,      sortDir,
    expandedId,
    columns,      setColumns,
    exitModal,      setExitModal,
    exitAllModal,   setExitAllModal,
    pnlChartModal,  setPnlChartModal,
    editColsModal,  setEditColsModal,
    exitPosition, exitAll,
    addMore, reversePosition,
    handleSort, toggleExpand,
  } = usePositions();

  const canvasRef = useRef(null);
  const editColsRef = useRef(null);
  const [pnlChartSeg, setPnlChartSeg] = useState('equity');

  // Outside click handler for Edit Columns dropdown
  useEffect(() => {
    if (!editColsModal) return;
    const handleClick = (e) => {
      if (editColsRef.current &&
          !editColsRef.current.contains(e.target)) {
        setEditColsModal(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [editColsModal]);

  // Draw bezier P&L chart on canvas (Rule D: devicePixelRatio)
  useEffect(() => {
    if (!pnlChartModal || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const container = canvas.parentElement;
    const W = container.clientWidth || 400;
    const H = 180;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, W, H);

    // Generate mock intraday P&L curve
    const pts = 24;
    const base = summary.overallPnl || 1000;
    const raw = Array.from({ length: pts }, (_, i) => {
      const t = i / (pts - 1);
      return Math.sin(t * Math.PI * 1.3) * base * (0.2 + t * 0.8)
        + (Math.random() - 0.45) * Math.abs(base) * 0.15;
    });

    const minV = Math.min(0, ...raw);
    const maxV = Math.max(0, ...raw);
    const range = maxV - minV || 1;

    const pL = 56, pR = 12, pT = 12, pB = 26;
    const cW = W - pL - pR;
    const cH = H - pT - pB;
    const xS = (i) => pL + (i / (pts - 1)) * cW;
    const yS = (v) => pT + cH - ((v - minV) / range) * cH;

    const isPos = summary.overallPnl >= 0;
    const lineColor = isPos ? '#48A848' : '#CD4937';

    // Gradient fill
    const grad = ctx.createLinearGradient(0, pT, 0, pT + cH);
    grad.addColorStop(0, isPos ? 'rgba(72,168,72,0.28)' : 'rgba(205,73,55,0.28)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.beginPath();
    ctx.moveTo(xS(0), yS(raw[0]));
    for (let i = 1; i < pts; i++) {
      const cx = (xS(i - 1) + xS(i)) / 2;
      ctx.bezierCurveTo(cx, yS(raw[i - 1]), cx, yS(raw[i]), xS(i), yS(raw[i]));
    }
    ctx.lineTo(xS(pts - 1), pT + cH);
    ctx.lineTo(xS(0), pT + cH);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Bezier line
    ctx.beginPath();
    ctx.moveTo(xS(0), yS(raw[0]));
    for (let i = 1; i < pts; i++) {
      const cx = (xS(i - 1) + xS(i)) / 2;
      ctx.bezierCurveTo(cx, yS(raw[i - 1]), cx, yS(raw[i]), xS(i), yS(raw[i]));
    }
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Y-axis ₹ labels
    ctx.fillStyle = 'rgba(132,132,143,0.9)';
    ctx.font = `9px 'JetBrains Mono', monospace`;
    ctx.textAlign = 'right';
    [0, 0.5, 1].forEach(t => {
      const v = minV + t * range;
      ctx.fillText(formatINR(v, 0), pL - 4, yS(v) + 3);
    });

    // X-axis time labels 9:15 → now
    const now = new Date();
    const start = new Date();
    start.setHours(9, 15, 0, 0);
    ctx.textAlign = 'center';
    [0, 0.5, 1].forEach(t => {
      const ts = new Date(start.getTime() + t * (now - start));
      const hh = ts.getHours();
      const mm = String(ts.getMinutes()).padStart(2, '0');
      ctx.fillText(`${hh}:${mm}`, xS(Math.round(t * (pts - 1))), H - 6);
    });
  }, [pnlChartModal, pnlChartSeg, summary.overallPnl]);

  const rows = visiblePositions();
  const visibleCols = columns.filter(c => c.visible);

  // Determine summary flash direction from current price ticks
  const flashVals = Object.values(flashMap);
  const summaryFlash = flashVals.length > 0
    ? (flashVals.filter(f => f === 'up').length >= flashVals.filter(f => f === 'down').length
        ? styles.flashUp
        : styles.flashDown)
    : '';

  // Render a table cell based on column id
  const renderCell = (pos, colId) => {
    switch (colId) {
      case 'instrument':
        return (
          <div className={styles.instrumentCell}>
            <div className={styles.symbolName}>{pos.symbol}</div>
            <div className={styles.symbolMeta}>
              <Badge label={pos.exchange} />
              <span>{pos.product}</span>
            </div>
          </div>
        );
      case 'direction':
        return (
          <span className={pos.direction === 'buy' ? styles.dirBuy : styles.dirSell}>
            {pos.direction === 'buy' ? 'BUY' : 'SELL'}
          </span>
        );
      case 'qty':
        return pos.qty;
      case 'avgPrice':
        return formatINR(pos.avgPrice);
      case 'mktPrice':
        return <FlashValue value={pos.mktPrice} />;
      case 'pnl':
        return (
          <div className={styles.pnlCell}>
            <PnLValue value={pos.pnlAbs} percent={pos.pnlPct} />
          </div>
        );
      case 'dayChange':
        return <PnLValue value={pos.dayChange} percent={pos.dayChangePct} />;
      case 'returns':
        return <PriceChangeValue value={pos.pnlPct} />;
      default:
        return null;
    }
  };

  // Exit single position: find symbol from id
  const exitModalPos = exitModal.positionId
    ? (positions[activeTab] || []).find(p => p.id === exitModal.positionId)
    : null;

  return (
    <div className={styles.widget} data-density={density}>

      {/* ── 1. HEADER ── */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.title}>Positions</span>
          <span className={styles.liveDot} />
          <Input
            type="text"
            size="sm"
            placeholder="Search…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            prefix={<Icon name="Search" size={12} />}
          />
        </div>
        <div className={styles.headerActions}>
          <button
            className={styles.iconBtn}
            onClick={() => setPnlChartModal(true)}
            title="P&L Chart"
          >
            <Icon name="TrendingUp" size={13} />
          </button>
          <button
            className={styles.exitAllBtn}
            onClick={() => setExitAllModal(true)}
          >
            Exit All
          </button>
        </div>
      </div>

      {/* ── 2. SUMMARY BAR ── */}
      <div className={styles.summaryBar}>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Overall P&L</span>
          <span className={`${styles.summaryValue} ${summary.overallPnl >= 0 ? styles.positive : styles.negative} ${summaryFlash}`}>
            {formatINR(summary.overallPnl)}
          </span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Unrealised</span>
          <span className={`${styles.summaryValue} ${summary.unrealisedPnl >= 0 ? styles.positive : styles.negative}`}>
            {formatINR(summary.unrealisedPnl)}
          </span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Realised</span>
          <span className={`${styles.summaryValue} ${summary.realisedPnl >= 0 ? styles.positive : styles.negative}`}>
            {formatINR(summary.realisedPnl)}
          </span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Day&apos;s Change</span>
          <span className={`${styles.summaryValue} ${summary.dayChange >= 0 ? styles.positive : styles.negative}`}>
            {formatINR(summary.dayChange)}
          </span>
        </div>
        <div className={styles.marginWrap}>
          <div className={styles.marginMeta}>
            <span className={styles.marginLabel}>Margin Used</span>
            <span className={styles.marginPct}>{summary.marginUsed}%</span>
          </div>
          <div className={styles.marginTrack}>
            <div
              className={styles.marginFill}
              style={{ width: `${summary.marginUsed}%` }}
            />
          </div>
        </div>
      </div>

      {/* ── 3. SEGMENT TABS ── */}
      <div className={styles.tabs}>
        {TAB_DEFS.map(({ key, label }) => (
          <button
            key={key}
            className={`${styles.tab} ${activeTab === key ? styles.active : ''}`}
            onClick={() => setActiveTab(key)}
          >
            {label}
            <span className={styles.tabBadge}>{tabCounts[key]}</span>
          </button>
        ))}
      </div>

      {/* ── 4. FILTER BAR ── */}
      <div className={styles.filterBarWrap}>
        <div className={styles.filterBar}>
          {FILTER_DEFS.map(({ key, label }) => (
            <Chip
              key={key}
              size="sm"
              active={activeFilter === key}
              onClick={() => setActiveFilter(key)}
            >
              {label}
            </Chip>
          ))}
        </div>
        <div className={styles.editColsAnchor} ref={editColsRef}>
          <button
            className={styles.editColsBtn}
            onClick={() => setEditColsModal(prev => !prev)}
          >
            <Icon name="Columns3" size={11} />
            Edit Columns
          </button>

          {editColsModal && (
            <div className={styles.colsDropdown}>
              <div className={styles.colList}>
                {columns.map((col, idx) => (
                  <div
                    key={col.id}
                    className={`${styles.colItem} ${col.pinned ? styles.pinned : ''}`}
                    draggable={!col.pinned}
                    onDragStart={e => {
                      e.dataTransfer.setData('text/plain', idx.toString());
                    }}
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => {
                      e.preventDefault();
                      const from = parseInt(e.dataTransfer.getData('text/plain'));
                      const to = idx;
                      if (from === to) return;
                      const next = [...columns];
                      const [moved] = next.splice(from, 1);
                      next.splice(to, 0, moved);
                      setColumns(next);
                    }}
                  >
                    {!col.pinned && (
                      <div className={styles.dragHandle}>
                        <span /><span /><span />
                      </div>
                    )}
                    {col.pinned && (
                      <div className={styles.dragHandle} style={{ opacity: 0 }}>
                        <span /><span /><span />
                      </div>
                    )}
                    <div
                      className={`${styles.colCheck} ${!col.visible ? styles.off : ''}`}
                      onClick={() => {
                        if (col.pinned) return;
                        setColumns(prev => prev.map(
                          (c, i) => i === idx ? { ...c, visible: !c.visible } : c
                        ));
                      }}
                    >
                      {col.visible && <Icon name="Check" size={10} color="white" />}
                    </div>
                    <span className={styles.colName}>{col.label}</span>
                    {col.pinned && <span className={styles.pinnedTag}>Pinned</span>}
                  </div>
                ))}
              </div>
              <div className={styles.colsDropdownFooter}>
                <button
                  onClick={() => setColumns(DEFAULT_COLUMNS)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 'var(--blinkx-text-label)',
                    color: 'var(--blinkx-color-text-brand)',
                    fontFamily: 'var(--blinkx-font-sans)',
                    fontWeight: 600,
                  }}
                >
                  Reset
                </button>
                <button
                  onClick={() => setEditColsModal(false)}
                  style={{
                    background: 'var(--blinkx-color-bg-brand-default)',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 'var(--blinkx-text-label)',
                    color: 'var(--blinkx-color-text-white-on-cta)',
                    fontFamily: 'var(--blinkx-font-sans)',
                    fontWeight: 600,
                    padding: '0 var(--blinkx-spacing-2xl)',
                    height: '28px',
                    borderRadius: 'var(--blinkx-radius-full)',
                  }}
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── 5. TABLE ── */}
      <div className={styles.tableWrap}>
        {rows.length > 0 ? (
          <table>
            <thead>
              <tr>
                {visibleCols.map(col => (
                  <th
                    key={col.id}
                    className={[
                      NUM_COLS.has(col.id) ? styles.numCol : '',
                      sortCol === col.id ? styles.sorted : '',
                    ].filter(Boolean).join(' ')}
                    onClick={() => handleSort(col.id)}
                  >
                    {col.label}
                    {sortCol === col.id && (sortDir === 1 ? ' ↑' : ' ↓')}
                  </th>
                ))}
                <th />
              </tr>
            </thead>
            <tbody>
              {rows.map(pos => (
                <>
                  <tr
                    key={pos.id}
                    className={expandedId === pos.id ? styles.expanded : ''}
                    onClick={() => toggleExpand(pos.id)}
                  >
                    {visibleCols.map(col => (
                      <td
                        key={col.id}
                        className={NUM_COLS.has(col.id) ? styles.numCol : ''}
                      >
                        {renderCell(pos, col.id)}
                      </td>
                    ))}
                    <td>
                      <div className={styles.rowActions}>
                        <CTAButton
                          variant="ghost"
                          size="sm"
                          onClick={e => { e.stopPropagation(); addMore(pos.id); }}
                        >
                          Add
                        </CTAButton>
                        <CTAButton
                          variant="ghost"
                          size="sm"
                          onClick={e => { e.stopPropagation(); reversePosition(pos.id); }}
                        >
                          Reverse
                        </CTAButton>
                        <CTAButton
                          variant="sell"
                          size="sm"
                          onClick={e => {
                            e.stopPropagation();
                            setExitModal({ open: true, positionId: pos.id });
                          }}
                        >
                          Exit
                        </CTAButton>
                      </div>
                    </td>
                  </tr>
                  {expandedId === pos.id && (
                    <tr key={`${pos.id}-detail`}>
                      <td colSpan={visibleCols.length + 1}>
                        <div className={styles.detailInner}>
                          <div className={styles.detailGroup}>
                            <span className={styles.detailKey}>Breakeven</span>
                            <span className={styles.detailVal}>{formatINR(pos.breakeven)}</span>
                          </div>
                          <div className={styles.detailGroup}>
                            <span className={styles.detailKey}>Margin</span>
                            <span className={styles.detailVal}>{formatINR(pos.marginConsumed, 0)}</span>
                          </div>
                          <div className={styles.detailGroup}>
                            <span className={styles.detailKey}>Qty Bought</span>
                            <span className={styles.detailVal}>{pos.qtyBought}</span>
                          </div>
                          <div className={styles.detailGroup}>
                            <span className={styles.detailKey}>Qty Sold</span>
                            <span className={styles.detailVal}>{pos.qtySold}</span>
                          </div>
                          <div className={styles.detailGroup}>
                            <span className={styles.detailKey}>Day High</span>
                            <span className={styles.detailVal}>{formatINR(pos.dayHigh)}</span>
                          </div>
                          <div className={styles.detailGroup}>
                            <span className={styles.detailKey}>Day Low</span>
                            <span className={styles.detailVal}>{formatINR(pos.dayLow)}</span>
                          </div>
                          <div className={styles.detailGroup}>
                            <span className={styles.detailKey}>MTM P&L</span>
                            <span className={styles.detailVal}>{formatINR(pos.mtmPnl)}</span>
                          </div>
                          {pos.greeks && (
                            <div className={styles.greeksSection}>
                              {[
                                { label: 'Δ Delta', val: pos.greeks.delta },
                                { label: 'Γ Gamma', val: pos.greeks.gamma },
                                { label: 'Θ Theta', val: pos.greeks.theta },
                                { label: 'ν Vega',  val: pos.greeks.vega  },
                              ].map(({ label, val }) => (
                                <div key={label} className={styles.greekItem}>
                                  <span className={styles.greekLabel}>{label}</span>
                                  <span className={styles.greekVal}>{val}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        ) : (
          /* ── 6. EMPTY STATE ── */
          <div className={styles.emptyState}>
            <Icon name="Inbox" size={32} color="var(--blinkx-color-text-tertiary)" />
            <span className={styles.emptyTitle}>No positions</span>
            <span className={styles.emptySub}>
              No open positions in {activeTab === 'fno' ? 'F&O' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}.
              {search && ' Try clearing the search filter.'}
            </span>
          </div>
        )}
      </div>

      {/* ── 7. MODALS (via portal to escape panel bounds) ── */}

      {/* Exit single position */}
      {exitModal.open && createPortal(
        <div className={styles.overlay} onClick={() => setExitModal({ open: false, positionId: null })}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <span className={styles.modalTitle}>Exit Position</span>
              <CTAButton
                variant="ghost"
                type="ghost"
                size="sm"
                icon={<Icon name="X" size={14} />}
                onClick={() => setExitModal({ open: false, positionId: null })}
              />
            </div>
            <div className={styles.modalBody}>
              <p className={styles.confirmText}>
                Exit{' '}
                <span className={styles.confirmHighlight}>
                  {exitModalPos?.symbol ?? ''}
                </span>{' '}
                at market price? This action cannot be undone.
              </p>
            </div>
            <div className={styles.modalFooter}>
              <CTAButton
                variant="ghost"
                size="sm"
                onClick={() => setExitModal({ open: false, positionId: null })}
              >
                Cancel
              </CTAButton>
              <CTAButton
                variant="sell"
                size="sm"
                onClick={() => exitPosition(exitModal.positionId)}
              >
                Confirm Exit
              </CTAButton>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Exit all positions */}
      {exitAllModal && createPortal(
        <div className={styles.overlay} onClick={() => setExitAllModal(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <span className={styles.modalTitle}>Exit All Positions</span>
              <CTAButton
                variant="ghost"
                type="ghost"
                size="sm"
                icon={<Icon name="X" size={14} />}
                onClick={() => setExitAllModal(false)}
              />
            </div>
            <div className={styles.modalBody}>
              <p className={styles.confirmText}>
                Exit all{' '}
                <span className={styles.confirmHighlight}>
                  {tabCounts[activeTab]}
                </span>{' '}
                positions in{' '}
                <span className={styles.confirmHighlight}>
                  {activeTab === 'fno' ? 'F&O' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </span>{' '}
                segment at market price?
              </p>
            </div>
            <div className={styles.modalFooter}>
              <CTAButton variant="ghost" size="sm" onClick={() => setExitAllModal(false)}>
                Cancel
              </CTAButton>
              <CTAButton variant="sell" size="sm" onClick={exitAll}>
                Exit All
              </CTAButton>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* P&L Chart */}
      {pnlChartModal && createPortal(
        <div className={styles.overlay} onClick={() => setPnlChartModal(false)}>
          <div className={`${styles.modal} ${styles.modalLarge}`} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <span className={styles.modalTitle}>P&L Chart</span>
              <div className={styles.pnlSegToggle}>
                {TAB_DEFS.map(({ key, label }) => (
                  <button
                    key={key}
                    className={`${styles.pnlSegBtn} ${pnlChartSeg === key ? styles.active : ''}`}
                    onClick={() => setPnlChartSeg(key)}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <CTAButton
                variant="ghost"
                type="ghost"
                size="sm"
                icon={<Icon name="X" size={14} />}
                onClick={() => setPnlChartModal(false)}
              />
            </div>

            {/* Metrics row */}
            <div className={styles.pnlMetrics}>
              <div className={styles.pnlMetric}>
                <span className={styles.pnlMetricLabel}>Overall P&L</span>
                <span className={`${styles.pnlMetricVal} ${summary.overallPnl >= 0 ? styles.positive : styles.negative}`}>
                  {formatINR(summary.overallPnl)}
                </span>
              </div>
              <div className={styles.pnlMetricSep} />
              <div className={styles.pnlMetric}>
                <span className={styles.pnlMetricLabel}>Unrealised</span>
                <span className={`${styles.pnlMetricVal} ${summary.unrealisedPnl >= 0 ? styles.positive : styles.negative}`}>
                  {formatINR(summary.unrealisedPnl)}
                </span>
              </div>
              <div className={styles.pnlMetricSep} />
              <div className={styles.pnlMetric}>
                <span className={styles.pnlMetricLabel}>Positions</span>
                <span className={styles.pnlMetricVal}>
                  {tabCounts[pnlChartSeg]}
                </span>
              </div>
            </div>

            {/* Canvas area */}
            <div className={styles.pnlChartArea}>
              <canvas ref={canvasRef} />
            </div>

            {/* Breakdown list */}
            <div className={styles.pnlBreakdownTitle}>Breakdown</div>
            <div className={styles.pnlBreakdownList}>
              {(positions[pnlChartSeg] || []).map(pos => (
                <div key={pos.id} className={styles.pnlBreakdownItem}>
                  <Badge label={pos.exchange} />
                  <span className={styles.breakdownSymbol}>{pos.symbol}</span>
                  <PnLValue value={pos.pnlAbs} percent={pos.pnlPct} />
                </div>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}

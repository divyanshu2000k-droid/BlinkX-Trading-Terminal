import { useState, useEffect, useRef, useCallback } from 'react';
import {
  MOCK_POSITIONS,
  MOCK_SUMMARY,
  DEFAULT_COLUMNS,
} from '../mock';

export function usePositions() {
  const [positions, setPositions] = useState(MOCK_POSITIONS);
  const [summary, setSummary] = useState(MOCK_SUMMARY);
  const [activeTab, setActiveTab] = useState('equity');
  const [activeFilter, setActiveFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState(1);
  const [expandedId, setExpandedId] = useState(null);
  const [columns, setColumns] = useState(DEFAULT_COLUMNS);
  const [exitModal, setExitModal] = useState({ open: false, positionId: null });
  const [exitAllModal, setExitAllModal] = useState(false);
  const [pnlChartModal, setPnlChartModal] = useState(false);
  const [editColsModal, setEditColsModal] = useState(false);
  const [flashMap, setFlashMap] = useState({});
  const tickRef = useRef(null);

  // Price simulation — replace with WebSocket later
  // TO REPLACE WITH API:
  // Remove setInterval, subscribe to WebSocket feed
  // ws.onmessage → update positions + trigger flash
  useEffect(() => {
    tickRef.current = setInterval(() => {
      setPositions(prev => {
        const next = { ...prev };
        if (!next[activeTab]) return prev;

        const newFlash = {};
        next[activeTab] = next[activeTab].map(pos => {
          const variance = (Math.random() - 0.48)
            * pos.mktPrice * 0.002;
          const newMkt = parseFloat(
            (pos.mktPrice + variance).toFixed(2));
          newFlash[pos.id] =
            variance >= 0 ? 'up' : 'down';

          const newPnl = pos.direction === 'buy'
            ? (newMkt - pos.avgPrice) * pos.qty
            : (pos.avgPrice - newMkt) * pos.qty;

          return {
            ...pos,
            mktPrice: newMkt,
            pnlAbs: parseFloat(newPnl.toFixed(2)),
            pnlPct: parseFloat(
              ((newPnl / (pos.avgPrice * pos.qty))
                * 100).toFixed(2)),
          };
        });

        setFlashMap(newFlash);
        setTimeout(() => setFlashMap({}), 400);

        const all = [
          ...next.equity,
          ...next.fno,
          ...next.commodity,
        ];
        setSummary(p => ({
          ...p,
          overallPnl: parseFloat(
            all.reduce((s, p) => s + p.pnlAbs, 0)
              .toFixed(2)),
        }));

        return next;
      });
    }, 3000);

    return () => clearInterval(tickRef.current);
  }, [activeTab]);

  const visiblePositions = useCallback(() => {
    let rows = positions[activeTab] ?? [];

    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter(p =>
        p.symbol.toLowerCase().includes(q));
    }

    if (activeFilter === 'long')
      rows = rows.filter(p => p.direction === 'buy');
    else if (activeFilter === 'short')
      rows = rows.filter(p => p.direction === 'sell');
    else if (activeFilter === 'mis')
      rows = rows.filter(p => p.product === 'MIS');
    else if (activeFilter === 'cnc')
      rows = rows.filter(p => p.product === 'CNC');
    else if (activeFilter === 'nrml')
      rows = rows.filter(p => p.product === 'NRML');
    else if (activeFilter === 'profit')
      rows = rows.filter(p => p.pnlAbs > 0);
    else if (activeFilter === 'loss')
      rows = rows.filter(p => p.pnlAbs < 0);

    if (sortCol) {
      rows = [...rows].sort((a, b) => {
        const va = a[sortCol] ?? 0;
        const vb = b[sortCol] ?? 0;
        return (va > vb ? 1 : -1) * sortDir;
      });
    }

    return rows;
  }, [positions, activeTab, search,
      activeFilter, sortCol, sortDir]);

  const tabCounts = {
    equity:    positions.equity?.length    ?? 0,
    fno:       positions.fno?.length       ?? 0,
    commodity: positions.commodity?.length ?? 0,
  };

  // TO REPLACE: call POST /api/positions/exit
  const exitPosition = useCallback((id) => {
    setPositions(prev => ({
      ...prev,
      [activeTab]: prev[activeTab]
        .filter(p => p.id !== id),
    }));
    setExitModal({ open: false, positionId: null });
  }, [activeTab]);

  // TO REPLACE: call POST /api/positions/exit-all
  const exitAll = useCallback(() => {
    setPositions(prev => ({
      ...prev, [activeTab]: [],
    }));
    setExitAllModal(false);
  }, [activeTab]);

  // TO REPLACE: open order pad with symbol
  const addMore = useCallback((id) => {
    // Order pad integration point
    // orderPad.open({ symbol: id, mode: 'add' })
    console.log('addMore → order pad pending:', id);
  }, []);

  // TO REPLACE: open order pad with reverse qty
  const reversePosition = useCallback((id) => {
    // orderPad.open({ symbol: id, mode: 'reverse' })
    console.log('reversePosition → order pad pending:', id);
  }, []);

  const handleSort = useCallback((col) => {
    setSortCol(prev => {
      if (prev === col) {
        setSortDir(d => d * -1);
        return prev;
      }
      setSortDir(1);
      return col;
    });
  }, []);

  const toggleExpand = useCallback((id) => {
    setExpandedId(prev =>
      prev === id ? null : id);
  }, []);

  return {
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
  };
}

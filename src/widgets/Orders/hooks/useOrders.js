/**
 * useOrders — Data layer for the Orders widget.
 *
 * This is the ONLY file backend developers replace when connecting
 * to a real API. The component (index.jsx) is untouched during
 * the mock → real API transition.
 *
 * Real API contract:
 *   GET  /api/orders                     → Order[]
 *   POST /api/orders/:id/cancel          → { ok: true }
 *   POST /api/orders/:id/modify          → { ok: true }
 *   POST /api/orders/:id/repeat          → Order  (new order copy)
 *   POST /api/orders/:id/exit-fo         → { ok: true }
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { MOCK_ORDERS, TAB_FILTER, DEFAULT_COLUMNS } from '../mock.js';

// ── Segment filter predicates ──────────────────────────────────────────────
const SEGMENT_FILTER = {
  all:       () => true,
  equity:    o => o.segment === 'equity',
  fo:        o => o.segment === 'fo',
  commodity: o => o.segment === 'commodity',
};

export function useOrders() {
  // ── Raw order store ────────────────────────────────────────────────────
  const [orders, setOrders] = useState(MOCK_ORDERS);

  // ── Tab / filter / search state ────────────────────────────────────────
  const [activeTab,     setActiveTab]     = useState('open');
  const [activeSegment, setActiveSegment] = useState('all');
  const [search,        setSearch]        = useState('');
  const [sortCol,       setSortCol]       = useState('time');
  const [sortDir,       setSortDir]       = useState(1); // 1 = asc, -1 = desc

  // ── Expanded state for details & baskets ──────────────────────────────
  const [expandedId,      setExpandedId]      = useState(null);
  const [expandedBaskets, setExpandedBaskets] = useState({});

  // ── Column editor ─────────────────────────────────────────────────────
  const [columns, setColumns] = useState(DEFAULT_COLUMNS);

  // ── Modal state ───────────────────────────────────────────────────────
  const [cancelModal,    setCancelModal]   = useState({ open: false, orderId: null });
  const [modifyModal,    setModifyModal]   = useState({ open: false, orderId: null });
  const [editColsModal,  setEditColsModal] = useState(false);

  // ── Live simulator ────────────────────────────────────────────────────
  // Picks a random pending (non-GTT, non-basket-parent) order after a delay
  // and transitions it to 'executed'. Continuously re-arms until no pending
  // orders remain.
  const simTimerRef = useRef(null);

  useEffect(() => {
    const pending = orders.filter(
      o => o.status === 'pending' && !o.gtt && !o.isBasketParent && !o.basketId
    );
    if (!pending.length) return;

    const delay = 8000 + Math.random() * 4000; // 8–12 s
    simTimerRef.current = setTimeout(() => {
      setOrders(prev => {
        const pendingNow = prev.filter(
          o => o.status === 'pending' && !o.gtt && !o.isBasketParent && !o.basketId
        );
        if (!pendingNow.length) return prev;
        const target = pendingNow[Math.floor(Math.random() * pendingNow.length)];
        return prev.map(o =>
          o.id === target.id
            ? { ...o, status: 'executed', filledQty: o.qty, avgPrice: o.price || o.trigger || 0 }
            : o
        );
      });
    }, delay);

    return () => clearTimeout(simTimerRef.current);
  }, [orders]);

  // ── Derived: tab counts ────────────────────────────────────────────────
  const tabCounts = Object.fromEntries(
    Object.keys(TAB_FILTER).map(tab => [tab, orders.filter(TAB_FILTER[tab]).length])
  );

  // ── Derived: visible orders for current tab + segment + search ─────────
  const visibleOrders = useCallback(() => {
    const tabFn     = TAB_FILTER[activeTab]     ?? (() => true);
    const segmentFn = SEGMENT_FILTER[activeSegment] ?? (() => true);

    let rows = orders.filter(tabFn);

    // Basket children must only appear inside the basket tab (where
    // expandedBaskets governs them). In all other tabs strip any child rows
    // so they never show as orphan flat rows.
    if (activeTab !== 'basket') {
      rows = rows.filter(o => !o.basketId || o.isBasketParent);
    }

    // Segment filter
    rows = rows.filter(segmentFn);

    // Search — symbol or id
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      rows = rows.filter(o =>
        o.symbol.toLowerCase().includes(q) ||
        o.id.toLowerCase().includes(q)
      );
    }

    // Sort
    rows = [...rows].sort((a, b) => {
      const valA = a[sortCol] ?? '';
      const valB = b[sortCol] ?? '';
      if (typeof valA === 'string') {
        return sortDir * valA.localeCompare(valB);
      }
      return sortDir * ((valA ?? 0) - (valB ?? 0));
    });

    // Basket tab: inject visible children after each expanded parent
    if (activeTab === 'basket') {
      const result = [];
      for (const row of rows) {
        result.push(row);
        if (row.isBasketParent && expandedBaskets[row.basketId]) {
          const children = orders.filter(
            o => o.basketId === row.basketId && !o.isBasketParent
          );
          result.push(...children);
        }
      }
      return result;
    }

    return rows;
  }, [orders, activeTab, activeSegment, search, sortCol, sortDir, expandedBaskets]);

  // ── Sort handler ───────────────────────────────────────────────────────
  const handleSort = useCallback((col) => {
    setSortCol(prev => {
      if (prev === col) {
        setSortDir(d => d * -1);
        return col;
      }
      setSortDir(1);
      return col;
    });
  }, []);

  // ── Row expand (detail panel) ──────────────────────────────────────────
  const toggleExpand = useCallback((id) => {
    setExpandedId(prev => (prev === id ? null : id));
  }, []);

  // ── Basket expand ──────────────────────────────────────────────────────
  const toggleBasket = useCallback((basketId) => {
    setExpandedBaskets(prev => ({ ...prev, [basketId]: !prev[basketId] }));
  }, []);

  // ── Order actions ──────────────────────────────────────────────────────
  const cancelOrder = useCallback((orderId) => {
    setOrders(prev => prev.map(o =>
      o.id === orderId ? { ...o, status: 'cancelled' } : o
    ));
    setCancelModal({ open: false, orderId: null });
  }, []);

  const modifyOrder = useCallback((orderId, _updates) => {
    // Real API: PATCH /api/orders/:orderId with _updates
    // Mock: no-op, just close the modal
    setModifyModal({ open: false, orderId: null });
  }, []);

  const repeatOrder = useCallback((orderId) => {
    const source = orders.find(o => o.id === orderId);
    if (!source) return;
    const newOrder = {
      ...source,
      id: `${source.id}-R${Date.now()}`,
      time: new Date().toTimeString().slice(0, 8),
      status: 'pending',
      filledQty: 0,
      avgPrice: null,
    };
    setOrders(prev => [newOrder, ...prev]);
  }, [orders]);

  const exitOrder = useCallback((orderId) => {
    // F&O exit: creates a reverse market order in practice.
    // Mock: transition to executed.
    setOrders(prev => prev.map(o =>
      o.id === orderId
        ? { ...o, status: 'executed', filledQty: o.qty, avgPrice: o.price || 0 }
        : o
    ));
  }, []);

  // ── CSV export ─────────────────────────────────────────────────────────
  const exportCSV = useCallback(() => {
    const rows = visibleOrders();
    const headers = ['Time', 'ID', 'Symbol', 'Exchange', 'B/S', 'Qty', 'Price',
                     'Order Type', 'Product', 'Status', 'Filled Qty', 'Avg Price'];
    const lines = [
      headers.join(','),
      ...rows.map(o => [
        o.time, o.id, o.symbol, o.exchange,
        o.side.toUpperCase(), o.qty, o.price ?? '',
        o.orderType, o.product, o.status,
        o.filledQty, o.avgPrice ?? '',
      ].join(',')),
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `blinkx_orders_${activeTab}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [visibleOrders, activeTab]);

  return {
    orders,

    // Derived
    visibleOrders,
    tabCounts,

    // Tab / filter / search
    activeTab,     setActiveTab,
    activeSegment, setActiveSegment,
    search,        setSearch,

    // Sort
    sortCol, sortDir, handleSort,

    // Expand
    expandedId,      toggleExpand,
    expandedBaskets, toggleBasket,

    // Columns
    columns, setColumns,

    // Modals
    cancelModal,   setCancelModal,
    modifyModal,   setModifyModal,
    editColsModal, setEditColsModal,

    // Actions
    cancelOrder, modifyOrder, repeatOrder, exitOrder, exportCSV,
  };
}

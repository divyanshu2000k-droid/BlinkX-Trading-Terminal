import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Input, Chip, CTAButton, Badge, Icon } from '../../components';
import { OrderStatusChip, formatINR } from '../../primitives';
import { useOrders } from './hooks/useOrders';
import { DEFAULT_COLUMNS } from './mock';
import styles from './Widget.module.css';

// ── Tab definitions ────────────────────────────────────────────────────────
const TABS = [
  { key: 'open',      label: 'Open'       },
  { key: 'today',     label: 'Today'      },
  { key: 'executed',  label: 'Executed'   },
  { key: 'cancelled', label: 'Cancelled'  },
  { key: 'rejected',  label: 'Rejected'   },
  { key: 'gtt',       label: 'GTT / OCO'  },
  { key: 'basket',    label: 'Basket'     },
  { key: 'all',       label: 'All Orders' },
];

// ── Segment definitions ────────────────────────────────────────────────────
const SEGMENTS = [
  { key: 'all',       label: 'All'   },
  { key: 'equity',    label: 'Equity'},
  { key: 'fo',        label: 'F&O'   },
  { key: 'commodity', label: 'Comm.' },
];

// Columns where numbers should right-align
const NUM_COLS = new Set(['qty', 'price', 'trigger', 'filledQty', 'avgPrice']);

export default function OrdersWidget({ widgetId, config = {}, density = 'full', panelApi }) {
  const {
    orders,
    visibleOrders, tabCounts,
    activeTab,     setActiveTab,
    activeSegment, setActiveSegment,
    search,        setSearch,
    sortCol,       sortDir, handleSort,
    expandedId,    toggleExpand,
    expandedBaskets, toggleBasket,
    columns,       setColumns,
    cancelModal,   setCancelModal,
    modifyModal,   setModifyModal,
    editColsModal, setEditColsModal,
    cancelOrder, modifyOrder, repeatOrder, exitOrder, exportCSV,
  } = useOrders();

  const editColsRef = useRef(null);

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

  const rows        = visibleOrders();
  const visibleCols = columns.filter(c => c.visible);

  const hideTime    = density === 'standard' || density === 'compact' || density === 'mini';
  const hideTrigger = density === 'standard' || density === 'compact' || density === 'mini';
  const densityVisibleCols = visibleCols.filter(c => {
    if (hideTime    && c.id === 'time')    return false;
    if (hideTrigger && c.id === 'trigger') return false;
    return true;
  });

  // ── Resolve order by id for modals ────────────────────────────────────
  const cancelTargetOrder = cancelModal.orderId
    ? orders.find(o => o.id === cancelModal.orderId)
    : null;
  const modifyTargetOrder = modifyModal.orderId
    ? orders.find(o => o.id === modifyModal.orderId)
    : null;

  // ── Cell renderer ─────────────────────────────────────────────────────
  const renderCell = (order, colId) => {
    switch (colId) {
      case 'time':
        return <span>{order.time}</span>;

      case 'instrument':
        return (
          <div className={styles.instrumentCell}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {order.isBasketParent && (
                <button
                  className={`${styles.expandBtn} ${expandedBaskets[order.basketId] ? styles.open : ''}`}
                  onClick={e => { e.stopPropagation(); toggleBasket(order.basketId); }}
                  title={expandedBaskets[order.basketId] ? 'Collapse basket' : 'Expand basket'}
                >
                  <Icon name="ChevronRight" size={10} />
                </button>
              )}
              <span className={styles.symbolName}>{order.symbol}</span>
            </div>
            <div className={styles.symbolMeta}>
              <Badge label={order.exchange} />
              <span>{order.product}</span>
              {order.gtt && <span className={styles.gttTag}>{order.gttType === 'oco' ? 'OCO' : 'GTT'}</span>}
            </div>
          </div>
        );

      case 'side':
        return order.side === 'buy'
          ? <span className={styles.sideBuy}>B</span>
          : <span className={styles.sideSell}>S</span>;

      case 'qty':
        return order.qty != null ? order.qty : '—';

      case 'price':
        return order.price != null ? formatINR(order.price) : '—';

      case 'trigger':
        return order.trigger != null ? formatINR(order.trigger) : '—';

      case 'orderType':
        return order.orderType;

      case 'product':
        return order.product;

      case 'status':
        return (
          <OrderStatusChip
            status={order.status === 'pending'   ? 'OPEN'
                  : order.status === 'executed'  ? 'COMPLETE'
                  : order.status === 'cancelled' ? 'CANCELLED'
                  : order.status === 'rejected'  ? 'REJECTED'
                  : order.status.toUpperCase()}
          />
        );

      case 'filledQty':
        return order.filledQty != null ? order.filledQty : '—';

      case 'avgPrice':
        return order.avgPrice != null ? formatINR(order.avgPrice) : '—';

      default:
        return null;
    }
  };

  // ── JSX ───────────────────────────────────────────────────────────────
  return (
    <div className={styles.widget} data-density={density}>

      {/* ── 1. HEADER ── */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.title}>Orders</span>
          <span className={styles.liveDot} />
          <div className={styles.searchWrap}>
            <Input
              type="text"
              size="sm"
              placeholder="Search…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              prefix={<Icon name="Search" size={11} />}
            />
          </div>
        </div>
        <div className={styles.headerActions}>
          <button
            className={styles.iconBtn}
            onClick={exportCSV}
            title="Export CSV"
          >
            <Icon name="Download" size={13} />
          </button>
        </div>
      </div>

      {/* ── 2. TAB BAR ── */}
      <div className={styles.tabBar}>
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            className={`${styles.tab} ${activeTab === key ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(key)}
          >
            {label}
            {tabCounts[key] > 0 && (
              <span className={styles.tabCount}>{tabCounts[key]}</span>
            )}
          </button>
        ))}
      </div>

      {/* ── 3. SEGMENT + EDIT COLUMNS BAR ── */}
      <div className={styles.filterBarWrap}>
        <div className={styles.filterBar}>
          {SEGMENTS.map(({ key, label }) => (
            <Chip
              key={key}
              size="sm"
              active={activeSegment === key}
              onClick={() => setActiveSegment(key)}
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

      {/* ── 4. TABLE ── */}
      <div className={styles.tableWrap}>
        {rows.length > 0 ? (
          <table>
            <thead>
              <tr>
                {densityVisibleCols.map(col => (
                  <th
                    key={col.id}
                    className={[
                      NUM_COLS.has(col.id) ? styles.numCol : '',
                      sortCol === col.id ? styles.sortedCol : '',
                    ].filter(Boolean).join(' ')}
                    onClick={() => handleSort(col.id)}
                  >
                    {col.label}
                    {sortCol === col.id && (
                      sortDir === 1
                        ? <Icon name="ArrowUp"   size={9} />
                        : <Icon name="ArrowDown" size={9} />
                    )}
                  </th>
                ))}
                <th className={styles.actionsCol} />
              </tr>
            </thead>
            <tbody>
              {rows.map(order => (
                <tr
                  key={order.id}
                  className={[
                    order.basketId && !order.isBasketParent ? styles.basketChild : '',
                    order.isBasketParent ? styles.basketRow : '',
                  ].filter(Boolean).join(' ')}
                  onClick={() => {
                    if (!order.basketId) toggleExpand(order.id);
                  }}
                >
                  {densityVisibleCols.map(col => (
                    <td
                      key={col.id}
                      className={NUM_COLS.has(col.id) ? styles.numCol : ''}
                    >
                      {renderCell(order, col.id)}
                    </td>
                  ))}

                  {/* Row action cell — actions visible on hover only */}
                  <td>
                    <div className={styles.rowActions}>
                      {/* Pending non-GTT non-basket-child orders */}
                      {order.status === 'pending' && !order.gtt && !order.isBasketParent && !order.basketId && (
                        <>
                          <CTAButton
                            type="ghost"
                            variant="brand"
                            size="sm"
                            onClick={e => {
                              e.stopPropagation();
                              setModifyModal({ open: true, orderId: order.id });
                            }}
                          >
                            Modify
                          </CTAButton>
                          <CTAButton
                            type="ghost"
                            variant="sell"
                            size="sm"
                            onClick={e => {
                              e.stopPropagation();
                              setCancelModal({ open: true, orderId: order.id });
                            }}
                          >
                            Cancel
                          </CTAButton>
                        </>
                      )}
                      {/* F&O pending: also show Exit */}
                      {order.status === 'pending' && order.segment === 'fo' && !order.gtt && !order.isBasketParent && !order.basketId && (
                        <CTAButton
                          type="ghost"
                          variant="sell"
                          size="sm"
                          onClick={e => { e.stopPropagation(); exitOrder(order.id); }}
                        >
                          Exit
                        </CTAButton>
                      )}
                      {/* Executed orders: repeat */}
                      {order.status === 'executed' && !order.isBasketParent && (
                        <CTAButton
                          type="ghost"
                          variant="brand"
                          size="sm"
                          onClick={e => { e.stopPropagation(); repeatOrder(order.id); }}
                        >
                          Repeat
                        </CTAButton>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          /* ── 5. EMPTY STATE ── */
          <div className={styles.emptyState}>
            <Icon name="ClipboardList" size={32} color="var(--blinkx-color-text-tertiary)" />
            <span className={styles.emptyTitle}>No orders</span>
            <span className={styles.emptySub}>
              {search
                ? `No orders match "${search}". Try clearing the search.`
                : `No orders in the ${TABS.find(t => t.key === activeTab)?.label ?? activeTab} tab.`}
            </span>
          </div>
        )}
      </div>

      {/* ── 6. MODALS (portal to escape panel bounds) ── */}

      {/* Cancel confirmation */}
      {cancelModal.open && createPortal(
        <div
          className={styles.overlay}
          onClick={() => setCancelModal({ open: false, orderId: null })}
        >
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <div className={styles.modalTitle}>Cancel Order</div>
                {cancelTargetOrder && (
                  <div className={styles.modalSubtitle}>{cancelTargetOrder.id}</div>
                )}
              </div>
              <CTAButton
                type="ghost"
                variant="brand"
                size="sm"
                icon={<Icon name="X" size={14} />}
                onClick={() => setCancelModal({ open: false, orderId: null })}
              />
            </div>
            <div className={styles.modalBody}>
              <p className={styles.confirmText}>
                Cancel the pending order for{' '}
                <span className={styles.confirmHighlight}>
                  {cancelTargetOrder?.symbol ?? '—'}
                </span>
                ? This cannot be undone.
              </p>
            </div>
            <div className={styles.modalFooter}>
              <CTAButton
                type="secondary"
                variant="brand"
                size="md"
                onClick={() => setCancelModal({ open: false, orderId: null })}
              >
                Go Back
              </CTAButton>
              <CTAButton
                type="primary"
                variant="sell"
                size="md"
                onClick={() => cancelOrder(cancelModal.orderId)}
              >
                Cancel Order
              </CTAButton>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Modify order */}
      {modifyModal.open && createPortal(
        <div
          className={styles.overlay}
          onClick={() => setModifyModal({ open: false, orderId: null })}
        >
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <div className={styles.modalTitle}>Modify Order</div>
                {modifyTargetOrder && (
                  <div className={styles.modalSubtitle}>
                    {modifyTargetOrder.symbol} · {modifyTargetOrder.id}
                  </div>
                )}
              </div>
              <CTAButton
                type="ghost"
                variant="brand"
                size="sm"
                icon={<Icon name="X" size={14} />}
                onClick={() => setModifyModal({ open: false, orderId: null })}
              />
            </div>
            <div className={styles.modalBody}>
              <div className={styles.modifyForm}>
                <p className={styles.formNote}>
                  Modify fields below and click Update Order to submit.
                </p>
                <div className={styles.formRow}>
                  <div className={styles.formField}>
                    <span className={styles.formLabel}>Quantity</span>
                    <Input
                      type="number"
                      size="sm"
                      defaultValue={modifyTargetOrder?.qty ?? ''}
                      placeholder="Qty"
                    />
                  </div>
                  <div className={styles.formField}>
                    <span className={styles.formLabel}>Price</span>
                    <Input
                      type="number"
                      size="sm"
                      defaultValue={modifyTargetOrder?.price ?? ''}
                      placeholder="Price"
                    />
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formField}>
                    <span className={styles.formLabel}>Order Type</span>
                    <Input
                      type="text"
                      size="sm"
                      defaultValue={modifyTargetOrder?.orderType ?? ''}
                      placeholder="LIMIT / MARKET / SL"
                    />
                  </div>
                  <div className={styles.formField}>
                    <span className={styles.formLabel}>Validity</span>
                    <Input
                      type="text"
                      size="sm"
                      defaultValue="DAY"
                      placeholder="DAY / IOC"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <CTAButton
                type="secondary"
                variant="brand"
                size="md"
                onClick={() => setModifyModal({ open: false, orderId: null })}
              >
                Cancel
              </CTAButton>
              <CTAButton
                type="primary"
                variant="brand"
                size="md"
                onClick={() => modifyOrder(modifyModal.orderId, {})}
              >
                Update Order
              </CTAButton>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

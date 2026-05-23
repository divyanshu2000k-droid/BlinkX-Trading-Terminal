import { useState, useEffect, useMemo } from 'react';
import { Play, Square, X, RefreshCw, Layers, ClipboardList } from 'lucide-react';
import { mock } from './mock.js';
import styles from './Widget.module.css';

export default function PositionsWidget({ widgetId, config = {}, density = 'full', panelApi }) {
  const [activeSubTab, setActiveSubTab] = useState('positions'); // 'positions' | 'orders'
  const [positions, setPositions] = useState(mock.positions);
  const [orders, setOrders] = useState(mock.orders);
  const [flashStates, setFlashStates] = useState({});

  // Simulate price changes on positions to sync with the overall system look & feel
  useEffect(() => {
    const interval = setInterval(() => {
      if (positions.length === 0) return;
      const idx = Math.floor(Math.random() * positions.length);
      const pos = positions[idx];

      const changePct = (Math.random() * 0.4 - 0.2); // -0.2% to +0.2%
      const priceDiff = parseFloat((pos.ltp * (changePct / 100)).toFixed(2));
      if (priceDiff === 0) return;

      const newLtp = parseFloat((pos.ltp + priceDiff).toFixed(2));

      setPositions(prev => prev.map((item, index) => {
        if (index === idx) {
          return { ...item, ltp: newLtp };
        }
        return item;
      }));

      // Flash feedback
      const direction = priceDiff > 0 ? 'up' : 'down';
      setFlashStates(prev => ({ ...prev, [pos.symbol]: direction }));
      setTimeout(() => {
        setFlashStates(prev => {
          const next = { ...prev };
          delete next[pos.symbol];
          return next;
        });
      }, 500);

    }, 3000);

    return () => clearInterval(interval);
  }, [positions]);

  // Calculate dynamic P&L
  const getPnl = (pos) => {
    const diff = pos.qty >= 0 
      ? pos.ltp - pos.buyPrice 
      : pos.buyPrice - pos.ltp;
    return parseFloat((diff * Math.abs(pos.qty)).toFixed(2));
  };

  // Total net P&L
  const totalPnl = useMemo(() => {
    return positions.reduce((acc, pos) => acc + getPnl(pos), 0);
  }, [positions]);

  const handleSquareOff = (symbol) => {
    setPositions(prev => prev.map(p => {
      if (p.symbol === symbol) {
        return { ...p, qty: 0 }; // Set qty to 0 (Squared off!)
      }
      return p;
    }));
  };

  const handleCancelOrder = (orderId) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return { ...o, status: 'CANCELLED' };
      }
      return o;
    }));
  };

  const getSegmentClass = (seg) => {
    switch (seg) {
      case 'NSE': return styles.nseBadge;
      case 'BSE': return styles.bseBadge;
      case 'NFO': return styles.nfoBadge;
      case 'MCX': return styles.mcxBadge;
      default: return styles.defaultBadge;
    }
  };

  return (
    <div className={styles.root} data-density={density}>
      {/* Premium mini tab selector & global PNL banner */}
      {density !== 'mini' && (
        <div className={styles.header}>
          <div className={styles.tabs}>
            <button 
              className={`${styles.tabBtn} ${activeSubTab === 'positions' ? styles.activeTabBtn : ''}`}
              onClick={() => setActiveSubTab('positions')}
            >
              <Layers size={10} />
              <span>Positions ({positions.filter(p => p.qty !== 0).length})</span>
            </button>
            <button 
              className={`${styles.tabBtn} ${activeSubTab === 'orders' ? styles.activeTabBtn : ''}`}
              onClick={() => setActiveSubTab('orders')}
            >
              <ClipboardList size={10} />
              <span>Orders ({orders.filter(o => o.status === 'PENDING').length})</span>
            </button>
          </div>

          {/* Glowing dynamic Net PNL indicator */}
          {activeSubTab === 'positions' && (
            <div className={`${styles.totalPnlStrip} ${totalPnl >= 0 ? styles.pnlGreen : styles.pnlRed}`}>
              <span className={styles.pnlLabel}>NET P&L</span>
              <span className={styles.pnlVal}>
                {totalPnl >= 0 ? '+' : ''}
                {totalPnl.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Main content table */}
      <div className={styles.body}>
        {activeSubTab === 'positions' ? (
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Symbol</th>
                  {density === 'full' && <th>Product</th>}
                  <th className={styles.numAlign}>Qty</th>
                  {density !== 'mini' && density !== 'compact' && <th className={styles.numAlign}>Avg. Price</th>}
                  {density !== 'mini' && <th className={styles.numAlign}>LTP</th>}
                  <th className={styles.numAlign}>P&L</th>
                  {density === 'full' && <th className={styles.centerAlign}>Action</th>}
                </tr>
              </thead>
              <tbody>
                {positions.map(pos => {
                  const pnl = getPnl(pos);
                  const isPos = pnl >= 0;
                  const isClosed = pos.qty === 0;
                  const flash = flashStates[pos.symbol];
                  const flashClass = flash === 'up' ? styles.flashUp : flash === 'down' ? styles.flashDown : '';

                  return (
                    <tr key={pos.symbol} className={`${styles.row} ${flashClass} ${isClosed ? styles.closedRow : ''}`}>
                      {/* Symbol */}
                      <td className={styles.symbolCol}>
                        <div className={styles.symbolRow}>
                          <span className={`${styles.badge} ${getSegmentClass(pos.segment)}`}>
                            {pos.segment}
                          </span>
                          <span className={styles.symbolText}>{pos.symbol}</span>
                        </div>
                      </td>

                      {/* Product */}
                      {density === 'full' && (
                        <td>
                          <span className={styles.productBadge}>{pos.product}</span>
                        </td>
                      )}

                      {/* Qty */}
                      <td className={`${styles.numAlign} ${styles.qtyCol}`}>
                        {isClosed ? (
                          <span className={styles.closedText}>CLOSED</span>
                        ) : (
                          <span className={pos.qty > 0 ? styles.longText : styles.shortText}>
                            {pos.qty > 0 ? '+' : ''}{pos.qty}
                          </span>
                        )}
                      </td>

                      {/* Avg Price */}
                      {density !== 'mini' && density !== 'compact' && (
                        <td className={`${styles.numAlign} var-nums`}>
                          {pos.buyPrice.toFixed(2)}
                        </td>
                      )}

                      {/* LTP */}
                      {density !== 'mini' && (
                        <td className={`${styles.numAlign} var-nums ${isClosed ? '' : (pnl >= 0 ? styles.textGreen : styles.textRed)}`}>
                          {isClosed ? '-' : pos.ltp.toFixed(2)}
                        </td>
                      )}

                      {/* P&L */}
                      <td className={`${styles.numAlign} var-nums ${isClosed ? '' : (isPos ? styles.textGreen : styles.textRed)}`}>
                        {isClosed ? '0.00' : `${isPos ? '+' : ''}${pnl.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                      </td>

                      {/* Action */}
                      {density === 'full' && (
                        <td className={styles.centerAlign}>
                          {!isClosed ? (
                            <button 
                              className={styles.squareOffBtn}
                              onClick={() => handleSquareOff(pos.symbol)}
                              title="Square Off Position"
                            >
                              Square Off
                            </button>
                          ) : (
                            <span className={styles.closedLabel}>Settled</span>
                          )}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          /* Orders Sub-tab */
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  {density === 'full' && <th>Time</th>}
                  <th>Symbol</th>
                  <th>Type</th>
                  {density === 'full' && <th>Product</th>}
                  <th className={styles.numAlign}>Qty / Price</th>
                  <th>Status</th>
                  {density === 'full' && <th className={styles.centerAlign}>Action</th>}
                </tr>
              </thead>
              <tbody>
                {orders.map(order => {
                  const isBuy = order.type === 'BUY';
                  const isPending = order.status === 'PENDING';
                  const isExec = order.status === 'EXECUTED';
                  const isRej = order.status === 'REJECTED';
                  const isCanc = order.status === 'CANCELLED';

                  let statusStyle = styles.pendingLabel;
                  if (isExec) statusStyle = styles.executedLabel;
                  if (isRej) statusStyle = styles.rejectedLabel;
                  if (isCanc) statusStyle = styles.cancelledLabel;

                  return (
                    <tr key={order.id} className={styles.row}>
                      {/* Time */}
                      {density === 'full' && (
                        <td className={styles.timeCol}>{order.time}</td>
                      )}

                      {/* Symbol */}
                      <td>
                        <div className={styles.symbolRow}>
                          <span className={`${styles.badge} ${getSegmentClass(order.segment)}`}>
                            {order.segment}
                          </span>
                          <span className={styles.symbolText}>{order.symbol}</span>
                        </div>
                      </td>

                      {/* Type */}
                      <td>
                        <span className={`${styles.typeBadge} ${isBuy ? styles.buyType : styles.sellType}`}>
                          {order.type}
                        </span>
                      </td>

                      {/* Product */}
                      {density === 'full' && (
                        <td>
                          <span className={styles.productBadge}>{order.product}</span>
                        </td>
                      )}

                      {/* Qty / Price */}
                      <td className={`${styles.numAlign} var-nums`}>
                        <div className={styles.qtyPriceWrapper}>
                          <span className={styles.orderQty}>{order.qty}</span>
                          <span className={styles.divider}>@</span>
                          <span className={styles.orderPrice}>{order.price.toFixed(2)}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td>
                        <div className={styles.statusWrapper}>
                          <span className={`${styles.statusBadge} ${statusStyle}`}>
                            {order.status}
                          </span>
                          {isRej && (
                            <span className={styles.rejectReason} title={order.reason}>
                              ({order.reason})
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Action */}
                      {density === 'full' && (
                        <td className={styles.centerAlign}>
                          {isPending ? (
                            <button 
                              className={styles.cancelBtn}
                              onClick={() => handleCancelOrder(order.id)}
                            >
                              Cancel
                            </button>
                          ) : (
                            <span className={styles.doneLabel}>-</span>
                          )}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

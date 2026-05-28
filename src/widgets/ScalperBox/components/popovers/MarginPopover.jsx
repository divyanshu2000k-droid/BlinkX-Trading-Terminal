import { useMarginCalc } from '../../hooks/useMarginCalc.js';
import { formatINR } from '../../../../primitives';
import { Popover, popoverStyles as styles } from './Popover.jsx';

function Row({ label, value }) {
  return (
    <div className={styles.item} style={{ cursor: 'default' }}>
      <span className={styles.itemLabel}>{label}</span>
      <span className={styles.itemSub} style={{ fontFamily: 'var(--blinkx-font-mono)' }}>
        {value != null ? `₹${formatINR(value)}` : '—'}
      </span>
    </div>
  );
}

export default function MarginPopover({ leg, action, lots, ltp, lotSize, underlyingLtp, anchorRect, onClose }) {
  const calc = useMarginCalc({ leg, action, lots, ltp, lotSize, underlyingLtp });

  return (
    <Popover title="Charges Breakdown" anchorRect={anchorRect} onClose={onClose} width={240}>
      {calc.isReady ? (
        <>
          <Row label="Qty" value={null} />
          <div className={styles.item} style={{ cursor: 'default' }}>
            <span className={styles.itemLabel}>Qty</span>
            <span className={styles.itemSub} style={{ fontFamily: 'var(--blinkx-font-mono)' }}>
              {calc.qty}
            </span>
          </div>
          <Row label="Trade Value"       value={calc.tradeValue}         />
          <Row label="Brokerage"         value={calc.brokerage}          />
          <Row label="Transaction Chg"   value={calc.transactionCharge}  />
          <Row label="GST"               value={calc.gst}                />
          <Row label="STT"               value={calc.stt}                />
          <Row label="Stamp Duty"        value={calc.stampDuty}          />
          <div
            className={styles.item}
            style={{
              cursor: 'default',
              borderTop: 'var(--blinkx-stroke-default) solid var(--blinkx-color-stroke-subtle)',
              marginTop: 'var(--blinkx-spacing-xs)',
            }}
          >
            <span className={styles.itemLabel} style={{ fontWeight: 600 }}>Total Charges</span>
            <span
              className={styles.itemSub}
              style={{ fontFamily: 'var(--blinkx-font-mono)', fontWeight: 600, color: 'var(--blinkx-color-text-primary)' }}
            >
              ₹{formatINR(calc.totalCharges)}
            </span>
          </div>
        </>
      ) : (
        <div className={styles.item} style={{ cursor: 'default' }}>
          <span className={styles.itemSub}>Select strike and lots first.</span>
        </div>
      )}
    </Popover>
  );
}

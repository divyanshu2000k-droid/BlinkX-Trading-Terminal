import { formatINR } from '../../../../primitives/index.js';
import { Popover } from './Popover.jsx';
import styles from './Popover.module.css';

function Row({ label, value, bold, indent, muted }) {
  return (
    <div className={`${styles.mbRow}${bold ? ` ${styles.mbRowBold}` : ''}`}>
      <span className={`${styles.mbLabel}${
        indent === 1 ? ` ${styles.mbLabelIndent1}` : ''
      }${
        indent === 2 ? ` ${styles.mbLabelIndent2}` : ''
      }`}>
        {label}
      </span>
      <span className={`${styles.mbVal}${muted ? ` ${styles.mbValMuted}` : ''}`}>
        {value}
      </span>
    </div>
  );
}

export function MarginPopover({
  isOpen, anchor, onClose,
  leg, action, marginData,
}) {
  const title = `Charges Breakup · ${(action ?? '').toUpperCase()} ${(leg ?? '').toUpperCase()}`;

  if (!marginData?.isReady) {
    return (
      <Popover id="margin" title={title} isOpen={isOpen} anchor={anchor} onClose={onClose} width={280}>
        <div className={styles.mbRow}>
          <span className={styles.mbLabel}>Select strike and lots first.</span>
        </div>
      </Popover>
    );
  }

  const m = marginData;

  return (
    <Popover id="margin" title={title} isOpen={isOpen} anchor={anchor} onClose={onClose} width={280}>
      <Row label="Quantity" value={m.qty} />
      <Row
        label={action === 'buy' ? 'Trade value (Required)' : 'Margin blocked (SPAN+Exposure)'}
        value={formatINR(m.tradeValue)}
      />
      <Row label="Estimated Charges" value={formatINR(m.totalCharges)} bold />
      <Row label="Brokerage" value={formatINR(m.brokerage)} indent={1} muted />
      <Row
        label="Charges & Taxes"
        value={formatINR(m.transactionCharge + m.gst + m.stt + m.stampDuty)}
        bold indent={1}
      />
      <Row label="Transaction Charges" value={formatINR(m.transactionCharge)} indent={2} muted />
      <Row label="Clearing Charges"    value={formatINR(m.clearingCharge)}    indent={2} muted />
      <Row label="SEBI Turnover"       value={formatINR(m.sebiTurnover)}      indent={2} muted />
      <Row label="Investor Protection" value={formatINR(m.investorProtection)} indent={2} muted />
      <Row label="GST"                 value={formatINR(m.gst)}               indent={2} muted />
      <Row label="STT / CTT"          value={formatINR(m.stt)}               indent={2} muted />
      <Row label="State Stamp Duty"   value={formatINR(m.stampDuty)}        indent={2} muted />
      <div className={styles.mbDisclaimer}>
        <span className={styles.mbDisclaimerBold}>Disclaimer:</span>
        {' '}Charges calculated above are on approximate basis. Actual charges for the completed order may differ.
      </div>
    </Popover>
  );
}

import { formatINR, formatPercent } from '../../../../primitives/index.js';
import { Popover } from './Popover.jsx';
import styles from './Popover.module.css';

export function StrikePopover({
  isOpen, anchor, onClose,
  leg, strikeList, currentStrike,
  atmStrike, strikeStep,
  getLtp, onSelect,
}) {
  // Derive step from list if not provided
  const step = strikeStep ??
    ((strikeList?.length >= 2)
      ? strikeList[1] - strikeList[0]
      : 50);

  const getMoneyness = strike => {
    if (!atmStrike || !step) return null;
    const diff = (strike - atmStrike) / step;
    if (diff === 0) return 'ATM';
    if (leg === 'call') {
      return diff < 0
        ? `ITM${Math.abs(diff) >= 1 ? Math.abs(Math.round(diff)) : ''}`
        : `OTM${diff >= 1 ? Math.round(diff) : ''}`;
    }
    return diff > 0
      ? `ITM${diff >= 1 ? Math.round(diff) : ''}`
      : `OTM${Math.abs(diff) >= 1 ? Math.abs(Math.round(diff)) : ''}`;
  };

  const getMoneynessClass = m => {
    if (!m) return '';
    if (m === 'ATM') return styles.tagAtm;
    if (m.startsWith('ITM')) return styles.tagItm;
    return styles.tagOtm;
  };

  return (
    <Popover
      id={`strike-${leg}`}
      title={`Select Strike · ${leg === 'call' ? 'CE' : 'PE'}`}
      isOpen={isOpen}
      anchor={anchor}
      onClose={onClose}
      width={340}
    >
      {/* Header row — same grid as data rows */}
      <div className={styles.strikeHeader}>
        <span className={styles.strikeHeaderCell}>Type</span>
        <span className={`${styles.strikeHeaderCell} ${styles.center}`}>Strike</span>
        <span className={`${styles.strikeHeaderCell} ${styles.center}`}>
          {leg === 'call' ? 'CE' : 'PE'}
        </span>
        <span className={`${styles.strikeHeaderCell} ${styles.right}`}>LTP</span>
        <span className={`${styles.strikeHeaderCell} ${styles.right}`}>Chg%</span>
      </div>

      {(strikeList ?? []).map(strike => {
        const m = getMoneyness(strike);
        const mClass = getMoneynessClass(m);
        const ltp = getLtp?.(strike) ?? 0;
        // Mock decoration — replaced by API data in production
        const chgPct = parseFloat(
          ((Math.sin(strike * 0.01) * 6) - 1.5).toFixed(2)
        );
        const isSel = strike === currentStrike;
        const isPos = chgPct >= 0;

        return (
          <div
            key={strike}
            className={`${styles.strikeRow}${isSel ? ` ${styles.strikeRowSelected}` : ''}`}
            onClick={() => { onSelect(strike); onClose(); }}
          >
            <span className={mClass}>{m}</span>
            <span className={styles.strikeVal}>{strike}</span>
            <span className={leg === 'call' ? styles.strikeCeLabel : styles.strikePeLabel}>
              {leg === 'call' ? 'CE' : 'PE'}
            </span>
            <span className={styles.strikeLtp}>{formatINR(ltp)}</span>
            <span className={`${styles.strikeChg} ${isPos ? styles.rowMetaPos : styles.rowMetaNeg}`}>
              {formatPercent(chgPct)}
            </span>
          </div>
        );
      })}
    </Popover>
  );
}

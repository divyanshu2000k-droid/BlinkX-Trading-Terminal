import { useState } from 'react';
import { formatINR, formatPercent } from '../../../../primitives/index.js';
import { Popover } from './Popover.jsx';
import styles from './Popover.module.css';

export function ScripPopover({
  isOpen, anchor, onClose,
  instruments, selectedSym, onSelect,
}) {
  const [query, setQuery] = useState('');

  const filter = items => {
    if (!query.trim()) return items ?? [];
    const q = query.toLowerCase();
    return (items ?? []).filter(i =>
      i.sym.toLowerCase().includes(q) ||
      i.name.toLowerCase().includes(q)
    );
  };

  const Section = ({ label, items }) => {
    const filtered = filter(items);
    if (!filtered.length) return null;
    return (
      <>
        <div className={styles.secLabel}>{label}</div>
        {filtered.map(inst => {
          const isPos = (inst.chgPct ?? 0) >= 0;
          const isSel = inst.sym === selectedSym;
          return (
            <div
              key={inst.sym}
              className={`${styles.row}${isSel ? ` ${styles.rowSelected}` : ''}`}
              onClick={() => { onSelect(inst); onClose(); }}
            >
              <span className={styles.rowLabel}>
                <strong className={styles.rowLabelBold}>{inst.sym}</strong>
              </span>
              <span className={isPos ? styles.rowMetaPos : styles.rowMetaNeg}>
                {formatINR(inst.ltp)} · {formatPercent(inst.chgPct)}
              </span>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <Popover
      id="scrip"
      title="Select Instrument"
      isOpen={isOpen}
      anchor={anchor}
      onClose={onClose}
      width={260}
    >
      <div className={styles.searchRow}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoFocus
        />
      </div>
      <Section label="Benchmarks"  items={instruments?.benchmarks}  />
      <Section label="Equity F&O"  items={instruments?.eqFno}       />
      <Section label="Commodities" items={instruments?.commodities} />
    </Popover>
  );
}

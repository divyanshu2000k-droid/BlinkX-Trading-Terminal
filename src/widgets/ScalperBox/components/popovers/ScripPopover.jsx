import { useState } from 'react';
import { mock } from '../../mock.js';
import { formatPercent } from '../../../../primitives';
import { Popover, popoverStyles as styles } from './Popover.jsx';

export default function ScripPopover({ selected, onSelect, anchorRect, onClose }) {
  const [search, setSearch] = useState('');

  const allInstruments = [
    ...mock.instruments.benchmarks,
    ...mock.instruments.eqFno,
    ...mock.instruments.commodities,
  ];

  const groups = [
    { label: 'Benchmarks',  items: mock.instruments.benchmarks  },
    { label: 'EQ F&O',      items: mock.instruments.eqFno       },
    { label: 'Commodities', items: mock.instruments.commodities },
  ];

  const q = search.trim().toLowerCase();
  const filtered = q
    ? [{ label: 'Results', items: allInstruments.filter(i =>
        i.sym.toLowerCase().includes(q) || i.name.toLowerCase().includes(q))
      }]
    : groups;

  return (
    <Popover title="Select Scrip" anchorRect={anchorRect} onClose={onClose} width={240}>
      <input
        className={styles.searchInput}
        placeholder="Search symbol…"
        value={search}
        onChange={e => setSearch(e.target.value)}
        autoFocus
      />
      {filtered.map(group => (
        <div key={group.label}>
          <div className={styles.groupLabel}>{group.label}</div>
          {group.items.map(inst => {
            const isSelected = selected?.sym === inst.sym;
            const chgClass = inst.chgPct >= 0 ? '' : '';
            return (
              <div
                key={inst.sym}
                className={`${styles.item} ${isSelected ? styles.itemSelected : ''}`}
                onClick={() => onSelect(inst)}
              >
                <div>
                  <div className={styles.itemLabel}>{inst.sym}</div>
                  <div className={styles.itemSub}>{inst.name}</div>
                </div>
                <span className={`${styles.itemSub}`}>
                  {formatPercent(inst.chgPct)}
                </span>
              </div>
            );
          })}
        </div>
      ))}
    </Popover>
  );
}

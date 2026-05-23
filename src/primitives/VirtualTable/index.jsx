import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import styles from './index.module.css';

// Virtualized table — TanStack Virtual v3 (useVirtualizer, not the removed useVirtual)
export function VirtualTable({ table, rowHeight = 28, className = '' }) {
  const parentRef = useRef(null);
  const rows = table.getRowModel().rows;

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => rowHeight,
    overscan: 8,
  });

  const virtualRows = virtualizer.getVirtualItems();
  const totalSize = virtualizer.getTotalSize();

  return (
    <div ref={parentRef} className={`${styles.root} ${className}`}>
      <table className={styles.table}>
        <thead className={styles.head}>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th key={header.id} className={styles.th} style={{ width: header.getSize() }}>
                  {header.isPlaceholder ? null : header.column.columnDef.header(header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody style={{ height: `${totalSize}px`, position: 'relative', display: 'block' }}>
          {virtualRows.map((vr) => {
            const row = rows[vr.index];
            return (
              <tr
                key={row.id}
                className={styles.row}
                style={{
                  position: 'absolute',
                  top: 0,
                  transform: `translateY(${vr.start}px)`,
                  width: '100%',
                  height: `${rowHeight}px`,
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className={styles.td} style={{ width: cell.column.getSize() }}>
                    {cell.column.columnDef.cell(cell.getContext())}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

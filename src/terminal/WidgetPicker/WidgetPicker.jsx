import { useState } from 'react';
import { widgetCatalog, widgetGroups } from '../../workspace/widgetRegistry.js';
import { useWorkspaceStore } from '../../stores/workspaceStore.js';
import styles from './WidgetPicker.module.css';

export default function WidgetPicker() {
  const pickerOpen = useWorkspaceStore((s) => s.pickerOpen);
  const closePicker = useWorkspaceStore((s) => s.closePicker);
  const addWidget = useWorkspaceStore((s) => s.addWidget);
  const [search, setSearch] = useState('');

  if (!pickerOpen) return null;

  const filtered = widgetCatalog.filter(w =>
    w.label.toLowerCase().includes(search.toLowerCase()) ||
    w.description.toLowerCase().includes(search.toLowerCase())
  );

  const grouped = widgetGroups
    .map((groupLabel) => ({
      key: groupLabel,
      label: groupLabel,
      items: filtered.filter(w => w.group === groupLabel),
    }))
    .filter(g => g.items.length > 0);

  return (
    <div className={styles.overlay} onClick={closePicker}>
      <div className={styles.picker} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.eyebrow}>WIDGETS</span>
            <span className={styles.title}>Add a widget</span>
          </div>
          <button className={styles.close} onClick={closePicker}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className={styles.search}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7"/>
            <path d="m21 21-4.3-4.3"/>
          </svg>
          <input
            autoFocus
            placeholder="Search widgets…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button className={styles.clearSearch} onClick={() => setSearch('')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          )}
        </div>

        {/* Widget groups */}
        <div className={styles.body}>
          {grouped.map(group => (
            <div key={group.key} className={styles.group}>
              <div className={styles.groupLabel}>{group.label}</div>
              <div className={styles.grid}>
                {group.items.map(widget => (
                  <button
                    key={widget.id}
                    className={styles.item}
                    onClick={() => addWidget(widget.id, {})}
                    title={widget.label}
                  >
                    <div className={styles.icon}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d={widget.icon || 'M3 3v18h18M7 14l4-4 4 4 5-5'}/>
                      </svg>
                    </div>
                    <div className={styles.itemText}>
                      <div className={styles.itemName}>{widget.label}</div>
                      <div className={styles.itemSub}>{widget.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <span className={styles.footerHint}>
            Drag to reposition · Resize from panel edges · Double-click tab to rename
          </span>
          <span className={styles.footerCount}>{widgetCatalog.length} widgets</span>
        </div>
      </div>
    </div>
  );
}

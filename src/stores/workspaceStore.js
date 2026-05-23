import { create } from 'zustand';
import { widgetCatalog } from '../workspace/widgetRegistry.js';
import { useUiStore } from './uiStore.js';

const LAYOUT_KEY_PREFIX = 'blinkx-layout-';
const TERMINAL_IDS = ['volatility', 'scalper', 'conviction', 'chart-first', 'custom'];

let debounceTimer = null;

function getInitialTerminalId() {
  for (const id of TERMINAL_IDS) {
    if (localStorage.getItem(LAYOUT_KEY_PREFIX + id)) return id;
  }
  return 'custom';
}

export const useWorkspaceStore = create((set, get) => ({
  dockviewApi: null,
  activeTerminalId: getInitialTerminalId(),
  pickerOpen: false,
  pickerTargetGroupId: null,

  onReady: (event) => {
    set({ dockviewApi: event.api });

    // onDidLayoutChange is an API event, not a DockviewReact prop —
    // must be subscribed imperatively here.
    event.api.onDidLayoutChange(() => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const { dockviewApi, activeTerminalId } = get();
        if (!dockviewApi || activeTerminalId === 'home') return;
        try {
          console.log('Layout saving...', activeTerminalId);
          const layout = dockviewApi.toJSON();
          localStorage.setItem(
            LAYOUT_KEY_PREFIX + activeTerminalId,
            JSON.stringify(layout)
          );
        } catch (e) {
          console.warn('Layout save failed:', e);
        }
      }, 300);
    });

    setTimeout(() => {
      get().restoreLastLayout();
    }, 0);
  },

  restoreLastLayout: () => {
    const { dockviewApi } = get();
    if (!dockviewApi) return false;
    for (const id of TERMINAL_IDS) {
      const saved = localStorage.getItem(LAYOUT_KEY_PREFIX + id);
      if (saved) {
        try {
          dockviewApi.fromJSON(JSON.parse(saved));
          set({ activeTerminalId: id });
          return true;
        } catch (e) {
          console.warn('Layout restore failed:', id, e);
        }
      }
    }
    return false;
  },

  openPicker: (targetGroupId = null) => {
    set({ pickerOpen: true, pickerTargetGroupId: targetGroupId });
  },

  closePicker: () => {
    set({ pickerOpen: false, pickerTargetGroupId: null });
  },

  addWidget: (widgetType, widgetConfig = {}) => {
    const { dockviewApi, pickerTargetGroupId } = get();
    if (!dockviewApi) return;

    const entry = widgetCatalog.find((w) => w.id === widgetType);

    // Duplicate check — only for widgets that don't allow multiple instances
    if (!entry?.allowMultiple) {
      const existingPanel = dockviewApi.panels.find(
        (p) => p.params?.widgetType === widgetType
      );
      if (existingPanel) {
        existingPanel.api.setActive();
        useUiStore.getState().addToast(
          `${entry?.label ?? widgetType} is already open`,
          'positive'
        );
        get().closePicker();
        return;
      }
    }

    const widgetId = `${widgetType}-${Date.now()}`;
    const title = entry?.label ?? widgetType;

    const panelConfig = {
      id: widgetId,
      component: 'widget',
      tabComponent: 'widget',
      title,
      params: { widgetType, widgetConfig, widgetId },
    };

    // If a group was targeted via +, add as a tab within that group
    if (pickerTargetGroupId) {
      const group = dockviewApi.groups?.find((g) => g.id === pickerTargetGroupId);
      const referencePanel = group?.panels?.[0];
      if (referencePanel) {
        panelConfig.position = {
          referencePanel: referencePanel.id,
          direction: 'within',
        };
      }
    }

    dockviewApi.addPanel(panelConfig);
    get().closePicker();
  },

  setActiveTerminalId: (id) => {
    set({ activeTerminalId: id });
  },

  loadPreset: (terminalId, presetLayout) => {
    const { dockviewApi } = get();
    set({ activeTerminalId: terminalId });
    if (!dockviewApi || !presetLayout) return;
    try {
      dockviewApi.fromJSON(presetLayout);
    } catch (e) {
      console.warn('Preset load failed:', e);
    }
  },

  restoreLayout: (terminalId) => {
    const { dockviewApi } = get();
    if (!dockviewApi) return;
    try {
      const saved = localStorage.getItem(LAYOUT_KEY_PREFIX + terminalId);
      if (saved) {
        dockviewApi.fromJSON(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Layout restore failed:', e);
    }
  },
}));

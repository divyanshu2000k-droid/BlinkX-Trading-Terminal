import { WidgetShell } from './WidgetShell.jsx';

// Static component map for DockviewReact.
// MUST be defined outside any React component to prevent remounts.
// Only one entry — WidgetShell routes to the correct widget internally.
export const componentRegistry = {
  widget: WidgetShell,
};

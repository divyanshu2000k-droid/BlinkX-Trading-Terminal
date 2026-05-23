/**
 * BLINKX WIDGET TEMPLATE
 * ══════════════════════════════════════════════════════
 * Copy this entire _template folder to create a new widget.
 * Rename folder to your widget name (PascalCase e.g. Watchlist).
 *
 * RULES:
 * - Import UI from src/components/ only — never write custom button/chip/badge CSS
 * - Import data from ./mock.js only — developers replace with API calls later
 * - All styling goes in Widget.module.css using --blinkx-* tokens only
 * - Never hardcode colors, spacing, fonts, or radius values
 * - Sub-components go in ./components/ folder
 * - Custom hooks go in ./hooks/ folder
 *
 * PROPS:
 * - config (object) — saved widget configuration
 * - onConfig (function) — update widget config
 * - widgetId (string) — unique instance ID
 */

import { useState } from 'react';
import { mock } from './mock.js';
import styles from './Widget.module.css';

// Import shared components — use these, never write your own
// import { CTAButton, Chip, Badge, Segment, Toggle, Loading, Icon } from '../../components';

export default function TemplateWidget({ config = {}, onConfig, widgetId }) {
  const [data] = useState(mock);

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <span className={styles.title}>Widget Name</span>
      </div>
      <div className={styles.body}>
        <div className={styles.empty}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <path d="M9 9h6M9 12h6M9 15h4" strokeWidth="1.2"/>
          </svg>
          <span>Widget coming soon</span>
        </div>
      </div>
    </div>
  );
}

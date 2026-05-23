# Widget Name

## What it shows
Describe what data this widget displays and its purpose.

## How to build this widget
1. Copy this folder: `cp -r src/widgets/_template src/widgets/YourWidgetName`
2. Rename folder to PascalCase (e.g. `Watchlist`, `OptionChain`)
3. Open Claude Code in the project root
4. Paste ARCHITECTURE.md content as context first
5. Then describe what the widget should show

## File structure
```
YourWidget/
├── index.jsx          ← Main component (entry point)
├── Widget.module.css  ← All styles using --blinkx-* tokens only
├── mock.js            ← Static mock data
├── README.md          ← This file
├── components/        ← Private sub-components (create if needed)
│   └── WidgetRow.jsx
└── hooks/             ← Private hooks (create if needed)
    └── useWidget.js
```

## Import rules
Allowed:
- `import { CTAButton, Chip, Badge } from '../../components';`
- `import { mock } from './mock.js';`
- `import styles from './Widget.module.css';`
- `import SubComponent from './components/SubComponent';`

NOT allowed:
- `import SomethingFromAnotherWidget from '../OtherWidget';` (never cross-import widgets)
- `import styles from '../OtherWidget/Widget.module.css';` (never use another widget's styles)

## States to implement
- [ ] Default (with data)
- [ ] Loading skeleton
- [ ] Empty state (no data)
- [ ] Error state

## API contract
Replace mock.js data with BlinkX WebSocket/REST calls.
Document the endpoint and data shape here.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| config | object | {} | Saved widget configuration |
| onConfig | function | — | Update widget config |
| widgetId | string | — | Unique instance ID |

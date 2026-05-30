// TradingView widget API does not accept CSS variables — all colors must be hardcoded hex.
// Keep these in sync with variables.css whenever theme tokens change.
//
// Token → hex reference:
//   dark  --blinkx-color-surface-elevated  = #23282E
//   dark  --blinkx-color-surface-card      = #1A1E23
//   dark  --blinkx-color-border-subtle     = #1e2029
//   dark  --blinkx-color-text-secondary    = #a0a0b0
//   light --blinkx-color-surface-card      = #F9F9F9
//   light --blinkx-color-border-subtle     = #e4e4ed
//   light --blinkx-color-text-secondary    = #555566
//   both  --blinkx-color-text-positive     = #26a69a
//   both  --blinkx-color-text-negative     = #ef5350

const themeMap = {
  dark: {
    theme: 'dark',
    toolbar_bg: '#23282E',
    backgroundColor: '#1A1E23',
    gridColor: '#1e2029',
    textColor: '#a0a0b0',
    upColor: '#26a69a',
    downColor: '#ef5350',
  },
  light: {
    theme: 'light',
    toolbar_bg: '#F2F2F2',
    backgroundColor: '#F9F9F9',
    gridColor: '#e4e4ed',
    textColor: '#555566',
    upColor: '#26a69a',
    downColor: '#ef5350',
  },
};

export function getTVTheme() {
  const attr = document.documentElement.getAttribute('data-theme');
  return themeMap[attr] ?? themeMap.dark;
}

export { themeMap as tvThemeMap };

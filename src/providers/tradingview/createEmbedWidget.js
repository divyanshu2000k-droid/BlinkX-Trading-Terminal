/**
 * createEmbedWidget
 *
 * Mounts a TradingView iframe embed widget.
 * Call this when the panel becomes visible.
 * Call the returned cleanup when unmounting.
 *
 * Returns a cleanup function.
 */

import { getTVTheme } from './tvThemeMap';

export function createEmbedWidget(container, {
  scriptSrc,
  config,
  showCopyright = true,
}) {
  if (!container) return () => {};

  const tvTheme = getTVTheme();

  // Clear any existing content
  container.innerHTML = '';

  // Required outer wrapper
  const wrapper = document.createElement('div');
  wrapper.className = 'tradingview-widget-container';
  wrapper.style.height = '100%';
  wrapper.style.width = '100%';

  // Inner widget div — TV injects iframe here.
  // Height accounts for copyright row when shown.
  const widgetDiv = document.createElement('div');
  widgetDiv.className = 'tradingview-widget-container__widget';
  widgetDiv.style.height = showCopyright ? 'calc(100% - 20px)' : '100%';
  widgetDiv.style.width = '100%';

  wrapper.appendChild(widgetDiv);

  // Copyright — required by TradingView ToS.
  // Must stay visible — do not hide.
  // Pass showCopyright: false only when a sibling
  // embed in the same panel already shows it.
  if (showCopyright) {
    const copyright = document.createElement('div');
    copyright.className = 'tradingview-widget-copyright';
    copyright.style.cssText = `
      font-size: 9px;
      line-height: 20px;
      height: 20px;
      color: var(--blinkx-color-text-tertiary);
      opacity: 0.4;
      text-align: center;
      font-family: var(--blinkx-font-sans);
    `;
    copyright.innerHTML = '<span>Powered by TradingView</span>';
    wrapper.appendChild(copyright);
  }

  // Config script — TV reads innerHTML as JSON
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = scriptSrc;
  script.async = true;
  script.innerHTML = JSON.stringify({
    ...config,
    locale: 'en',
    autosize: true,
    width: '100%',
    height: '100%',
  });

  wrapper.appendChild(script);
  container.appendChild(wrapper);

  // Return cleanup function
  return () => {
    try {
      if (container) container.innerHTML = '';
    } catch (e) {}
  };
}

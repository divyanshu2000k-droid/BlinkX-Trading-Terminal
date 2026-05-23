// Indian number formatting: en-IN locale, K/L/Cr compact notation.
// 1,000 → 1K | 100,000 → 1L | 10,000,000 → 1Cr

const enIN = new Intl.NumberFormat('en-IN');
const enINCompact = new Intl.NumberFormat('en-IN', { notation: 'compact', maximumFractionDigits: 2 });

export function formatNumber(value, opts = {}) {
  if (value == null || isNaN(value)) return '—';
  const { compact = false, decimals } = opts;
  if (compact) return compactIN(value);
  if (decimals != null) {
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  }
  return enIN.format(value);
}

function compactIN(value) {
  const abs = Math.abs(value);
  const sign = value < 0 ? '-' : '';
  if (abs >= 1e7) return sign + (abs / 1e7).toFixed(2).replace(/\.?0+$/, '') + 'Cr';
  if (abs >= 1e5) return sign + (abs / 1e5).toFixed(2).replace(/\.?0+$/, '') + 'L';
  if (abs >= 1e3) return sign + (abs / 1e3).toFixed(2).replace(/\.?0+$/, '') + 'K';
  return sign + abs.toString();
}

export function formatPrice(value, decimals = 2) {
  return formatNumber(value, { decimals });
}

// Alias: spec-compliant name used in primitive components
export function formatINR(value, decimals = 2) {
  return formatNumber(value, { decimals });
}

export function formatCompact(value) {
  return formatNumber(value, { compact: true });
}

export function formatPercent(value, decimals = 2) {
  if (value == null || isNaN(value)) return '—';
  const sign = value > 0 ? '+' : '';
  return sign + value.toFixed(decimals) + '%';
}

// Alias: spec-compliant name
export function formatPct(value, decimals = 2) {
  return formatPercent(value, decimals);
}

export function formatChange(value, decimals = 2) {
  if (value == null || isNaN(value)) return '—';
  const sign = value > 0 ? '+' : '';
  return sign + formatNumber(value, { decimals });
}

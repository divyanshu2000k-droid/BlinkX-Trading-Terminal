import styles from './Badge.module.css';

const BADGE_VARIANTS = {
  NSE: 'nse', BSE: 'bse', NFO: 'nfo', BFO: 'bfo', MCX: 'mcx',
  EQ: 'eq', FUT: 'fut', OPT: 'opt', IDX: 'idx', MTF: 'mtf', ETF: 'etf',
};

export default function Badge({ label, variant }) {
  const v = variant || BADGE_VARIANTS[label] || 'default';
  return (
    <span className={`${styles.badge} ${styles[v]}`}>
      {label}
    </span>
  );
}

import styles from './Loading.module.css';

export default function Loading({ size = 'md', style = 'spinner' }) {
  return (
    <div className={`${styles.root} ${styles[`size_${size}`]} ${styles[`style_${style}`]}`}>
      {style === 'spinner' && <div className={styles.spinner} />}
      {style === 'dots' && (
        <div className={styles.dots}>
          <div /><div /><div />
        </div>
      )}
    </div>
  );
}

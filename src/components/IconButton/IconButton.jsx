import styles from './IconButton.module.css';

export default function IconButton({
  icon: IconComponent,
  size = 14,
  title,
  onClick,
  active = false,
  variant = 'default',
}) {
  return (
    <button
      type="button"
      className={[
        styles.btn,
        variant === 'ghost' ? styles.ghost : styles.default,
        active ? styles.active : '',
      ].filter(Boolean).join(' ')}
      onClick={onClick}
      title={title}
    >
      <IconComponent size={size} />
    </button>
  );
}

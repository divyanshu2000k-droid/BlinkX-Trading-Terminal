import styles from './CTAButton.module.css';

export default function CTAButton({
  children,
  size = 'md',
  variant = 'brand',
  type = 'primary',
  disabled = false,
  icon = null,
  iconPosition = 'left',
  onClick,
  className = '',
  ...props
}) {
  return (
    <button
      className={[
        styles.btn,
        styles[`size_${size}`],
        styles[`variant_${variant}`],
        styles[`type_${type}`],
        icon ? styles.withIcon : '',
        disabled ? styles.disabled : '',
        className,
      ].filter(Boolean).join(' ')}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className={styles.icon}>{icon}</span>}
      <span className={styles.label}>{children}</span>
      {icon && iconPosition === 'right' && <span className={styles.icon}>{icon}</span>}
    </button>
  );
}

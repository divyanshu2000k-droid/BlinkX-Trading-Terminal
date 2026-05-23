import * as LucideIcons from 'lucide-react';

export default function Icon({
  name,
  size = 16,
  color = 'currentColor',
  className = '',
  ...props
}) {
  const LucideIcon = LucideIcons[name];
  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found in Lucide`);
    return null;
  }
  return <LucideIcon size={size} color={color} className={className} {...props} />;
}

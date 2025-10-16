import { BaseComponentProps, ChipVariant } from '../lib/schema';

interface TagProps extends BaseComponentProps {
  variant?: ChipVariant;
  children: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
}

/**
 * Reusable Tag Component
 * Used for categories, tech stack, and other metadata display
 */
export default function Tag({ 
  variant = 'neutral', 
  children, 
  className = '', 
  onClick,
  selected = false 
}: TagProps) {
  const baseClasses = 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-smooth cursor-pointer focus-ring';
  
  const variantClasses = {
    primary: `bg-brand-primary/20 text-brand-primary border border-brand-primary/30 ${selected ? 'bg-brand-primary text-white' : 'hover:bg-brand-primary/30'}`,
    accent: `bg-brand-accent/20 text-brand-accent border border-brand-accent/30 ${selected ? 'bg-brand-accent text-white' : 'hover:bg-brand-accent/30'}`,
    neutral: `bg-surface text-brand-muted border border-border ${selected ? 'bg-brand-primary text-white border-brand-primary' : 'hover:bg-hover-bg'}`,
    success: `bg-green-500/20 text-green-400 border border-green-500/30 ${selected ? 'bg-green-500 text-white' : 'hover:bg-green-500/30'}`,
    warning: `bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 ${selected ? 'bg-yellow-500 text-white' : 'hover:bg-yellow-500/30'}`,
    error: `bg-red-500/20 text-red-400 border border-red-500/30 ${selected ? 'bg-red-500 text-white' : 'hover:bg-red-500/30'}`
  };

  const handleClick = () => {
    if (onClick) onClick();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <span
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
      aria-pressed={onClick && selected ? selected : undefined}
    >
      {children}
    </span>
  );
}
import { BaseComponentProps, ChipVariant } from '../lib/schema';

interface TagProps extends BaseComponentProps {
  variant?: ChipVariant;
  children: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
}

/**
 * Reusable Tag Component - MindShore Brand Spec
 */
export default function Tag({ 
  variant = 'neutral', 
  children, 
  className = '', 
  onClick,
  selected = false 
}: TagProps) {
  
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: selected ? 'var(--ms-orange)' : 'rgba(240, 129, 28, 0.1)',
          color: selected ? 'var(--ms-white)' : 'var(--ms-orange)',
          border: `1px solid ${selected ? 'var(--ms-orange)' : 'rgba(240, 129, 28, 0.3)'}`
        };
      case 'accent':
        return {
          backgroundColor: selected ? 'var(--ms-magenta)' : 'rgba(229, 81, 151, 0.1)',
          color: selected ? 'var(--ms-white)' : 'var(--ms-magenta)',
          border: `1px solid ${selected ? 'var(--ms-magenta)' : 'rgba(229, 81, 151, 0.3)'}`
        };
      case 'success':
        return {
          backgroundColor: selected ? 'var(--ms-cyan)' : 'rgba(85, 189, 191, 0.1)',
          color: selected ? 'var(--ms-white)' : 'var(--ms-cyan)',
          border: `1px solid ${selected ? 'var(--ms-cyan)' : 'rgba(85, 189, 191, 0.3)'}`
        };
      case 'warning':
        return {
          backgroundColor: selected ? 'var(--ms-yellow)' : 'rgba(253, 195, 13, 0.1)',
          color: selected ? 'var(--ms-blue)' : 'var(--ms-yellow)',
          border: `1px solid ${selected ? 'var(--ms-yellow)' : 'rgba(253, 195, 13, 0.3)'}`
        };
      case 'error':
        return {
          backgroundColor: selected ? '#ef4444' : 'rgba(239, 68, 68, 0.1)',
          color: selected ? 'var(--ms-white)' : '#ef4444',
          border: `1px solid ${selected ? '#ef4444' : 'rgba(239, 68, 68, 0.3)'}`
        };
      default: // neutral
        return {
          backgroundColor: selected ? 'var(--ms-blue)' : 'var(--ms-overlay-light)',
          color: selected ? 'var(--ms-white)' : 'var(--ms-blue)',
          border: `1px solid ${selected ? 'var(--ms-blue)' : 'var(--ms-border)'}`
        };
    }
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
      className={`inline-flex items-center px-3 py-1 text-sm font-medium cursor-pointer focus:outline-none ${className}`}
      style={{
        ...getVariantStyles(),
        borderRadius: 'var(--ms-radius-sm)',
        fontFamily: 'var(--ms-font-body)',
        fontSize: 'var(--ms-fs-sm)',
        transition: 'all 0.3s var(--ms-ease)',
        outline: 'none'
      }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
      aria-pressed={onClick && selected ? selected : undefined}
      onFocus={(e) => {
        e.currentTarget.style.boxShadow = `0 0 0 2px var(--ms-orange)`;
      }}
      onBlur={(e) => {
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {children}
    </span>
  );
}

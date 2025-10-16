import { BaseComponentProps, ProjectKPI } from '../lib/schema';

interface KpiChipProps extends BaseComponentProps {
  kpi: ProjectKPI;
  variant?: 'default' | 'compact';
}

/**
 * KPI Display Chip Component
 * Shows key performance indicators with visual direction indicators
 */
export default function KpiChip({ 
  kpi, 
  variant = 'default', 
  className = '' 
}: KpiChipProps) {
  // Determine color based on direction indicator
  const getVariantStyle = (value: string) => {
    if (value.includes('↑')) {
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    } else if (value.includes('↓')) {
      // Check if it's a positive decrease (cost reduction, time reduction)
      const isPositiveDecrease = kpi.label.toLowerCase().includes('cost') || 
                                kpi.label.toLowerCase().includes('time') ||
                                kpi.label.toLowerCase().includes('reduction') ||
                                kpi.label.toLowerCase().includes('violation');
      
      return isPositiveDecrease 
        ? 'bg-green-500/20 text-green-400 border-green-500/30'
        : 'bg-red-500/20 text-red-400 border-red-500/30';
    }
    return 'bg-brand-primary/20 text-brand-primary border-brand-primary/30';
  };

  const chipClasses = `
    inline-flex items-center border rounded-lg transition-smooth
    ${variant === 'compact' ? 'px-2 py-1 text-xs' : 'px-3 py-2 text-sm'}
    ${getVariantStyle(kpi.value)}
    ${className}
  `;

  return (
    <div className={chipClasses}>
      <div className="flex flex-col items-center space-y-0.5">
        <span className="font-bold text-lg leading-none">
          {kpi.value}
        </span>
        <span className="font-medium text-xs opacity-90 leading-none">
          {kpi.label}
        </span>
        {kpi.description && variant !== 'compact' && (
          <span className="text-xs opacity-70 text-center max-w-24 leading-tight">
            {kpi.description}
          </span>
        )}
      </div>
    </div>
  );
}
import Tag from './Tag';
import { BaseComponentProps } from '../lib/schema';

interface FilterBarProps extends BaseComponentProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
  onSortChange?: (sort: 'newest' | 'az') => void;
  sortBy?: 'newest' | 'az';
}

/**
 * Filter Bar Component
 * Provides category filtering and sorting controls
 */
export default function FilterBar({
  categories,
  selected,
  onSelect,
  onSortChange,
  sortBy = 'newest',
  className = ''
}: FilterBarProps) {
  return (
    <div className={`bg-surface border border-border rounded-2xl p-6 ${className}`}>
      {/* Categories and Sort */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-brand-muted mr-2 flex items-center">
            Categories:
          </span>
          {categories.map((category) => (
            <Tag
              key={category}
              variant="primary"
              selected={selected === category}
              onClick={() => onSelect(category)}
            >
              {category}
            </Tag>
          ))}
        </div>

        {/* Sort Controls */}
        {onSortChange && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-brand-muted">
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as 'newest' | 'az')}
              className="bg-brand-bg border border-border rounded-lg px-3 py-2 text-sm text-brand-fg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-smooth"
              aria-label="Sort projects"
            >
              <option value="newest">Newest First</option>
              <option value="az">A-Z</option>
            </select>
          </div>
        )}
      </div>

      {/* Active Filters Summary */}
      {selected !== 'All' && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-brand-muted">Active filters:</span>
            <Tag variant="primary" selected>
              {selected}
            </Tag>
            <button
              onClick={() => onSelect('All')}
              className="text-sm text-brand-primary hover:text-brand-primary/80 transition-smooth focus-ring rounded px-2 py-1"
            >
              Clear all
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
import { BaseComponentProps } from '../lib/schema';

/**
 * MindShore Logo Component
 * Placeholder SVG logo - easily replaceable with actual brand assets
 */
export default function Logo({ className = '' }: BaseComponentProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Placeholder SVG Logo */}
      <svg 
        className="w-8 h-8 text-brand-primary" 
        viewBox="0 0 32 32" 
        fill="currentColor"
        aria-label="MindShore Logo"
      >
        <path d="M16 2L30 9v14L16 30 2 23V9L16 2z" />
        <path d="M16 8L24 12v8l-8 4-8-4v-8l8-4z" fill="var(--brand-accent)" />
        <circle cx="16" cy="16" r="3" fill="var(--brand-bg)" />
      </svg>
      <span className="text-xl font-bold text-brand-fg">
        MindShore
      </span>
    </div>
  );
}
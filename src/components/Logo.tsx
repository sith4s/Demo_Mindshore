import { BaseComponentProps } from '../lib/schema';

/**
 * MindShore Logo Component - Official Brand Spec
 */
export default function Logo({ className = '' }: BaseComponentProps) {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* MindShore Logo SVG */}
      <svg 
        className="w-10 h-10" 
        viewBox="0 0 40 40" 
        fill="none"
        aria-label="MindShore Logo"
      >
        <path 
          d="M20 4L36 11v18L20 36 4 29V11L20 4z" 
          fill="var(--ms-orange)"
        />
        <path 
          d="M20 10L30 15v10l-10 5-10-5v-10l10-5z" 
          fill="var(--ms-magenta)" 
        />
        <circle 
          cx="20" 
          cy="20" 
          r="4" 
          fill="var(--ms-white)" 
        />
      </svg>
      
      <div className="flex flex-col">
        <span 
          className="text-2xl font-bold leading-tight"
          style={{
            fontFamily: 'var(--ms-font-logo)',
            color: 'var(--ms-orange)',
            fontSize: 'var(--ms-fs-lg)',
            lineHeight: 'var(--ms-lh-tight)'
          }}
        >
          MindShore
        </span>
        <span 
          className="text-sm font-medium -mt-1"
          style={{
            fontFamily: 'var(--ms-font-body)',
            color: 'var(--ms-blue)',
            fontSize: 'var(--ms-fs-sm)'
          }}
        >
          Project Catalog
        </span>
      </div>
    </div>
  );
}

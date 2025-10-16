import { BaseComponentProps } from '../lib/schema';

/**
 * Footer Component
 * Contains privacy notice and anonymization disclaimer
 */
export default function Footer({ className = '' }: BaseComponentProps) {
  return (
    <footer className={`bg-surface border-t border-border mt-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-sm font-semibold text-brand-fg mb-4">MindShore</h3>
            <p className="text-sm text-brand-muted leading-relaxed">
              Transforming businesses through innovative Data & AI solutions. 
              Delivering measurable impact across industries.
            </p>
          </div>

          {/* Privacy & Anonymization Notice */}
          <div>
            <h3 className="text-sm font-semibold text-brand-fg mb-4">Privacy</h3>
            <div className="text-sm text-brand-muted space-y-2">
              <p>
                All client information has been anonymized to protect confidentiality.
              </p>
              <p>
                No tracking cookies or analytics are used on this site.
              </p>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-brand-fg mb-4">Connect</h3>
            <div className="space-y-2">
              <a 
                href="https://mindshore.io" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-sm text-brand-muted hover:text-brand-primary transition-smooth"
              >
                Visit mindshore.io
              </a>
              <a 
                href="https://mindshore.io/contact" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-sm text-brand-muted hover:text-brand-primary transition-smooth"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-brand-muted">
            © 2025 MindShore. All rights reserved.
          </p>
          <p className="text-xs text-brand-muted mt-2 sm:mt-0">
            Project data anonymized for confidentiality
          </p>
        </div>
      </div>
    </footer>
  );
}
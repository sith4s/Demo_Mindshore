import Logo from './Logo';
import { BaseComponentProps } from '../lib/schema';

interface HeaderProps extends BaseComponentProps {
  onAboutClick?: () => void;
  onContactClick?: () => void;
}

/**
 * Main Header Component
 * Contains logo, navigation, and theme controls
 */
export default function Header({ 
  className = '', 
  onAboutClick,
  onContactClick 
}: HeaderProps) {
  return (
    <header className={`bg-brand-bg border-b border-border ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a 
              href="#catalog" 
              className="text-brand-fg hover:text-brand-primary transition-smooth focus-ring rounded-md px-3 py-2"
            >
              Catalog
            </a>
            <button
              onClick={onAboutClick}
              className="text-brand-fg hover:text-brand-primary transition-smooth focus-ring rounded-md px-3 py-2"
            >
              About
            </button>
            <a
              href="https://mindshore.io/contact"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onContactClick}
              className="text-brand-fg hover:text-brand-primary transition-smooth focus-ring rounded-md px-3 py-2"
            >
              Contact
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-brand-fg hover:text-brand-primary focus-ring p-2 rounded-md"
              aria-label="Open menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
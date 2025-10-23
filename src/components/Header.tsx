import { useState, useEffect } from 'react';
import { BaseComponentProps } from '../lib/schema';

interface HeaderProps extends BaseComponentProps {
  onAboutClick?: () => void;
  onContactClick?: () => void;
}

/**
 * Modern Header with Dynamic Logo - MindShore Brand Spec
 */
export default function Header({ 
  className = '', 
  onAboutClick,
  onContactClick 
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 transition-all duration-300 ${isScrolled ? 'scrolled' : ''} ${className}`}
      style={{
        height: '86px',
        
        /* Maksymalna przezroczystość - bez rozmycia */
        background: isScrolled 
          ? 'rgba(35, 40, 86, 0.3)'  
          : 'rgba(35, 40, 86, 0.25)',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
        
        /* Delikatne cienie */
        boxShadow: isScrolled 
          ? '0 2px 12px rgba(35, 40, 86, 0.15)'
          : '0 1px 8px rgba(35, 40, 86, 0.1)',
        borderBottom: 'none',
      }}
    >
      {/* Dynamic Logo - Na samym lewym marginesie */}
      <div className="flex items-center transition-all duration-300">
        <img 
          src={isScrolled ? "/Demo_Mindshore/LOGO_sygnet.png" : "/Demo_Mindshore/LOGO_vertical.png"}
          alt="MindShore Logo"
          className="transition-all duration-300"
          style={{
            height: isScrolled ? '48px' : '68px',
            width: 'auto'
          }}
        />
      </div>

      {/* Navigation - Na środku */}
      <nav className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
          <a 
            href="#catalog" 
            className="text-white/90 hover:text-white transition-colors duration-300 font-light text-lg"
            style={{
              fontFamily: 'var(--ms-font-body)',
            }}
          >
            Catalog
          </a>
          <a
            href="https://mindshore.io/en/services/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/90 hover:text-white transition-colors duration-300 font-light text-lg"
            style={{
              fontFamily: 'var(--ms-font-body)',
            }}
          >
            About
          </a>
          <a
            href="https://mindshore.io/contact"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onContactClick}
            className="text-white/90 hover:text-white transition-colors duration-300 font-light text-lg"
            style={{
              fontFamily: 'var(--ms-font-body)',
            }}
          >
            Contact
          </a>
        </nav>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <button
          type="button"
          className="p-2 rounded-md text-white/90 hover:text-white"
          aria-label="Open menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}

import { useState } from 'react';

interface HeroSectionProps {
  onSearch?: (query: string) => void;
  searchValue?: string;
  availableCategories?: string[];
  selectedCategory?: string;
  onCategorySelect?: (category: string) => void;
  sortBy?: 'newest' | 'az';
  onSortChange?: (sort: 'newest' | 'az') => void;
}

/**
 * Modern Hero Section with Background Image
 */
export default function HeroSection({ 
  onSearch, 
  searchValue = '', 
  availableCategories = [],
  selectedCategory = 'All',
  onCategorySelect,
  sortBy = 'newest',
  onSortChange
}: HeroSectionProps) {
  const [searchTerm, setSearchTerm] = useState(searchValue);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <section 
      className="relative flex items-center justify-center"
      style={{
        height: '50vh',
        minHeight: '400px',
        backgroundImage: `linear-gradient(rgba(35, 40, 86, 0.4), rgba(35, 40, 86, 0.6)), url('https://cdn.sanity.io/images/s7xbv9bz/production/b9410c23bc3d993ee3df321dcc9815fe62fad85b-6000x4000.jpg?w=1920&h=1280&auto=format&fm=webp&q=100')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom', /* Dolna krawędź zdjęcia wyrównana z dołem Hero */
        backgroundAttachment: 'fixed',
        marginBottom: 0,
      }}
    >
      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center" style={{ paddingTop: '120px' }}>
        {/* Main Heading */}
        <h1 
          className="mb-4 leading-tight"
          style={{
            fontFamily: '"Berthold Akzidenz Grotesk", "Akzidenz-Grotesk", var(--ms-font-body)',
            fontWeight: 500,
            fontSize: 'clamp(1.8rem, 3.6vw, 2.7rem)',
            color: 'white',
            lineHeight: 1.1,
            letterSpacing: '-0.02em'
          }}
        >
          Project Catalog
        </h1>

        {/* Subtitle */}
        <p 
          className="mb-8 max-w-2xl mx-auto leading-relaxed"
          style={{
            fontFamily: '"Berthold Akzidenz Grotesk", "Akzidenz-Grotesk", var(--ms-font-body)',
            fontWeight: 300,
            fontSize: 'clamp(0.675rem, 1.5vw, 0.9rem)',
            color: 'rgba(255, 255, 255, 0.95)',
            lineHeight: 1.6,
            letterSpacing: '0.01em'
          }}
        >
          Discover our solutions delivering transformative business value. Each project showcases measurable outcomes and innovative approaches across industries
        </p>

        {/* Search Box */}
        <div className="max-w-xl mx-auto">
          <form onSubmit={handleSearchSubmit} className="relative mb-8">
            <div 
              className="relative overflow-hidden transition-all duration-300 hover:shadow-xl"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(20px)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search projects by technology, industry, or outcome..."
                className="w-full py-4 px-6 bg-transparent text-white placeholder-white/70 focus:outline-none"
                style={{
                  fontFamily: '"Berthold Akzidenz Grotesk", "Akzidenz-Grotesk", var(--ms-font-body)',
                  fontWeight: 300,
                  fontSize: '0.875rem',
                }}
              />
              
              {/* Search Icon */}
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg 
                  className="w-5 h-5 text-white/70" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                  />
                </svg>
              </div>
            </div>
          </form>

          {/* Categories and Sort - centered, single row with wrapping */}
          <div className="flex flex-col items-center gap-3">
            {/* Categories - centered with wrap */}
            {availableCategories.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2">
                {availableCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => onCategorySelect?.(category)}
                    className="px-4 py-2 rounded-full transition-all duration-300 hover:scale-105"
                    style={{
                      backgroundColor: selectedCategory === category 
                        ? 'rgba(240, 129, 28, 0.9)' 
                        : 'rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(10px)',
                      border: selectedCategory === category 
                        ? '1px solid rgba(240, 129, 28, 0.3)'
                        : '1px solid rgba(255, 255, 255, 0.2)',
                      color: selectedCategory === category ? 'white' : 'rgba(255, 255, 255, 0.9)',
                      fontFamily: '"Berthold Akzidenz Grotesk", "Akzidenz-Grotesk", var(--ms-font-body)',
                      fontWeight: selectedCategory === category ? 500 : 300,
                      fontSize: '0.75rem',
                    }}
                  >
                    {category}
                  </button>
                ))}
                
                {/* Sort Dropdown - inline with categories */}
                {onSortChange && (
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => onSortChange(e.target.value as 'newest' | 'az')}
                      className="px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 appearance-none cursor-pointer pr-8"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontFamily: '"Berthold Akzidenz Grotesk", "Akzidenz-Grotesk", var(--ms-font-body)',
                        fontWeight: 300,
                        fontSize: '0.75rem',
                      }}
                    >
                      <option value="newest" style={{ backgroundColor: 'rgba(35, 40, 86, 0.95)', color: 'white' }}>
                        Newest First
                      </option>
                      <option value="az" style={{ backgroundColor: 'rgba(35, 40, 86, 0.95)', color: 'white' }}>
                        A-Z
                      </option>
                    </select>
                    
                    {/* Custom dropdown arrow */}
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg 
                        className="w-3 h-3 text-white/70" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M19 9l-7 7-7-7" 
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg 
            className="w-6 h-6 text-white/70" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

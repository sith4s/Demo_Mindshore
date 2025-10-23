import { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../lib/schema';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

/**
 * Project Detail Modal Component
 * Full-screen modal with project details, image carousel, and navigation
 */
export default function ProjectModal({
  project,
  onClose,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false
}: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Focus management and accessibility
  useEffect(() => {
    if (project) {
      // Store the previously focused element
      previousFocusRef.current = document.activeElement as HTMLElement;
      
      // Focus the modal
      modalRef.current?.focus();
      
      // Prevent body scrolling
      document.body.style.overflow = 'hidden';
    }

    return () => {
      // Restore body scrolling
      document.body.style.overflow = 'unset';
      
      // Restore focus to the previous element
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [project]);

  // Keyboard event handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!project) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (hasPrevious && onPrevious) {
            onPrevious();
          }
          break;
        case 'ArrowRight':
          if (hasNext && onNext) {
            onNext();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose, onPrevious, onNext, hasPrevious, hasNext]);

  if (!project) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="modal-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 1000,
        overflowY: 'auto',
        padding: '0'
      }}
    >
      <div 
        ref={modalRef}
        className="modal-content"
        tabIndex={-1}
        style={{ 
          position: 'relative',
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          backgroundColor: '#ffffff',
          minHeight: '100vh',
          paddingBottom: '60px'
        }}
      >
        {/* Glass Header Bar - fixed at top */}
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: '1400px',
            height: '86px',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 40px',
            background: 'rgba(35, 40, 86, 0.3)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            boxShadow: '0 2px 12px rgba(35, 40, 86, 0.15)'
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src="/Demo_Mindshore/LOGO_sygnet.png"
              alt="MindShore Logo"
              style={{ height: '48px', width: 'auto' }}
            />
          </div>

          {/* Navigation and Close buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {(hasPrevious || hasNext) && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginRight: '8px' }}>
                <button
                  onClick={onPrevious}
                  disabled={!hasPrevious}
                  className="p-2 text-white hover:text-brand-orange disabled:opacity-50 disabled:cursor-not-allowed focus-ring rounded-lg"
                  aria-label="Previous project"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={onNext}
                  disabled={!hasNext}
                  className="p-2 text-white hover:text-brand-orange disabled:opacity-50 disabled:cursor-not-allowed focus-ring rounded-lg"
                  aria-label="Next project"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
            
            <button
              onClick={onClose}
              className="p-2 text-white hover:text-brand-orange focus-ring rounded-lg"
              aria-label="Close modal"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Hero Section with Gradient - scrollable */}
        <div
          style={{
            background: 'linear-gradient(90deg, #F0811C 0%, #E55197 100%)',
            minHeight: '37.5vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            textAlign: 'center',
            padding: '180px 48px 80px',
            position: 'relative'
          }}
        >
          {/* Category Tag */}
          <div style={{ marginBottom: '20px' }}>
            <span style={{
              fontFamily: 'var(--ms-font-body)',
              fontSize: '13px',
              fontWeight: 600,
              color: '#ffffff',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              padding: '6px 16px',
              borderRadius: '20px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {project.category}
            </span>
          </div>

          {/* Project Title - 45% smaller total (25% + 20%) */}
          <h1 
            id="modal-title"
            style={{
              fontFamily: 'var(--ms-font-heading)',
              fontSize: 'clamp(19px, 3vw, 38px)',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '20px',
              maxWidth: '900px',
              lineHeight: 1.2
            }}
          >
            {project.title}
          </h1>

          {/* Summary/Subtitle - 20% smaller */}
          <p
            style={{
              fontFamily: 'var(--ms-font-body)',
              fontSize: 'clamp(14px, 1.6vw, 19px)',
              fontWeight: 400,
              color: '#ffffff',
              opacity: 0.95,
              marginBottom: '28px',
              maxWidth: '700px',
              lineHeight: 1.5
            }}
          >
            {project.summary}
          </p>

          {/* White divider line */}
          <div
            style={{
              width: '80px',
              height: '2px',
              background: 'rgba(255, 255, 255, 0.5)',
              marginBottom: '24px'
            }}
          />

          {/* Client name */}
          <p
            style={{
              fontFamily: 'var(--ms-font-body)',
              fontSize: 'var(--ms-fs-base)',
              fontWeight: 500,
              color: '#ffffff',
              opacity: 0.9
            }}
          >
            {project.client}
          </p>
        </div>

        {/* Content */}
        <div className="p-6" style={{ maxWidth: '1200px', margin: '0 auto', backgroundColor: '#ffffff' }}>
          {/* Three white boxes: Business, Solution, Impact */}
          <div className="mb-8" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Box 1: Business (Problem) */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: '12px',
                borderTopLeftRadius: '24px',
                padding: '32px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                gap: '24px',
                alignItems: 'flex-start'
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  flexShrink: 0
                }}
              >
                💼
              </div>
              
              {/* Content */}
              <div style={{ flex: 1 }}>
                {project.problem.map((text, index) => (
                  <p 
                    key={index}
                    style={{ 
                      fontFamily: index === 0 ? 'var(--ms-font-heading)' : 'var(--ms-font-body)',
                      fontSize: index === 0 ? '20px' : '15px',
                      fontWeight: index === 0 ? 600 : 400,
                      color: index === 0 ? 'var(--ms-blue)' : '#666',
                      lineHeight: '1.6',
                      marginBottom: index < project.problem.length - 1 ? '12px' : '0'
                    }}
                  >
                    {text}
                  </p>
                ))}
              </div>
            </div>

            {/* Box 2: Solution (Approach) */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: '12px',
                borderTopLeftRadius: '24px',
                padding: '32px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                gap: '24px',
                alignItems: 'flex-start'
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  flexShrink: 0
                }}
              >
                ⚙️
              </div>
              
              {/* Content */}
              <div style={{ flex: 1 }}>
                {project.approach.map((text, index) => (
                  <p 
                    key={index}
                    style={{ 
                      fontFamily: 'var(--ms-font-body)',
                      fontSize: '15px',
                      lineHeight: '1.6',
                      color: '#666',
                      marginBottom: index < project.approach.length - 1 ? '12px' : '16px'
                    }}
                  >
                    {text}
                  </p>
                ))}
                
                {/* Images below approach - responsive grid */}
                {project.images && project.images.length > 0 && (
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: project.images.length === 1 
                      ? '1fr' 
                      : project.images.length === 2 
                        ? 'repeat(2, 1fr)' 
                        : 'repeat(3, 1fr)', 
                    gap: '16px',
                    marginTop: '24px'
                  }}>
                    {project.images.map((image, index) => (
                      <img
                        key={index}
                        src={image.src}
                        alt={image.alt}
                        className="w-full rounded-lg"
                        style={{ 
                          width: '100%',
                          height: 'auto',
                          objectFit: 'contain'
                        }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Box 3: Impact (Outcomes) */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: '12px',
                borderTopLeftRadius: '24px',
                padding: '32px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                gap: '24px',
                alignItems: 'flex-start'
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  flexShrink: 0
                }}
              >
                📈
              </div>
              
              {/* Content */}
              <div style={{ flex: 1 }}>
                {project.outcomes.map((text, index) => (
                  <p 
                    key={index}
                    style={{ 
                      fontFamily: 'var(--ms-font-body)',
                      fontSize: '15px',
                      lineHeight: '1.6',
                      color: '#666',
                      marginBottom: index < project.outcomes.length - 1 ? '12px' : '0'
                    }}
                  >
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-brand-fg mb-4">Technology Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="bg-brand-primary/20 text-brand-primary px-3 py-2 rounded-lg text-sm font-medium border border-brand-primary/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <h2 className="text-xl font-semibold text-brand-fg mb-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <span 
                  key={index}
                  style={{
                    fontFamily: 'var(--ms-font-body)',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'var(--ms-blue)',
                    backgroundColor: 'rgba(35, 40, 86, 0.08)',
                    padding: '6px 12px',
                    borderRadius: '16px'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Date */}
          {project.date && (
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm text-brand-muted">
                Project completed: {new Date(project.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
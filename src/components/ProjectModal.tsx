import { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../lib/schema';
import Tag from './Tag';
import KpiChip from './KpiChip';

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
    >
      <div 
        ref={modalRef}
        className="modal-content w-full max-w-6xl"
        tabIndex={-1}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <Tag variant="primary">
              {project.category}
            </Tag>
            <h1 id="modal-title" className="text-2xl font-bold text-brand-fg">
              {project.title}
            </h1>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Navigation buttons */}
            {(hasPrevious || hasNext) && (
              <div className="flex items-center space-x-1 mr-4">
                <button
                  onClick={onPrevious}
                  disabled={!hasPrevious}
                  className="p-2 text-brand-muted hover:text-brand-fg disabled:opacity-50 disabled:cursor-not-allowed focus-ring rounded-lg"
                  aria-label="Previous project"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={onNext}
                  disabled={!hasNext}
                  className="p-2 text-brand-muted hover:text-brand-fg disabled:opacity-50 disabled:cursor-not-allowed focus-ring rounded-lg"
                  aria-label="Next project"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
            
            <button
              onClick={onClose}
              className="p-2 text-brand-muted hover:text-brand-fg focus-ring rounded-lg"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 custom-scrollbar overflow-y-auto max-h-[80vh]">
          {/* Client and Summary */}
          <div className="mb-8">
            <p className="text-brand-muted mb-2">{project.client}</p>
            <p className="text-lg text-brand-fg leading-relaxed">{project.summary}</p>
          </div>

          {/* KPIs */}
          {project.kpis && project.kpis.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-brand-fg mb-4">Key Results</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.kpis.map((kpi, index) => (
                  <KpiChip key={index} kpi={kpi} />
                ))}
              </div>
            </div>
          )}

          {/* Images */}
          {project.images && project.images.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-brand-fg mb-4">Screenshots</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.images.map((image, index) => (
                  <div key={index} className="rounded-xl overflow-hidden bg-brand-bg">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-64 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    {image.caption && (
                      <p className="p-3 text-sm text-brand-muted">{image.caption}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Main Content Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Problem */}
            <div>
              <h2 className="text-xl font-semibold text-brand-fg mb-4">Problem</h2>
              <ul className="space-y-3">
                {project.problem.map((item, index) => (
                  <li key={index} className="text-brand-fg leading-relaxed">
                    <span className="text-brand-primary mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Approach */}
            <div>
              <h2 className="text-xl font-semibold text-brand-fg mb-4">Approach</h2>
              <ul className="space-y-3">
                {project.approach.map((item, index) => (
                  <li key={index} className="text-brand-fg leading-relaxed">
                    <span className="text-brand-accent mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Outcomes */}
            <div>
              <h2 className="text-xl font-semibold text-brand-fg mb-4">Outcomes</h2>
              <ul className="space-y-3">
                {project.outcomes.map((item, index) => (
                  <li key={index} className="text-brand-fg leading-relaxed">
                    <span className="text-green-400 mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
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
                <Tag key={index} variant="neutral">
                  {tag}
                </Tag>
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
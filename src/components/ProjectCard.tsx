import { Project } from '../lib/schema';
import Tag from './Tag';
import KpiChip from './KpiChip';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

/**
 * Project Card Component
 * Displays project summary in grid layout
 */
export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const handleClick = () => onClick(project);
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(project);
    }
  };

  return (
    <article
      className="bg-surface border border-border rounded-2xl p-6 cursor-pointer card-hover focus-ring"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.title}`}
    >
      {/* Project Image */}
      {project.images && project.images.length > 0 && (
        <div className="mb-4 rounded-xl overflow-hidden bg-brand-bg">
          <img
            src={project.images[0].src}
            alt={project.images[0].alt}
            loading="lazy"
            className="w-full h-48 object-cover"
            onError={(e) => {
              // Fallback to placeholder on error
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Category Tag */}
      <div className="mb-3">
        <Tag variant="primary" className="text-xs">
          {project.category}
        </Tag>
      </div>

      {/* Title and Client */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-brand-fg mb-2 line-clamp-2">
          {project.title}
        </h3>
        <p className="text-sm text-brand-muted">
          {project.client}
        </p>
      </div>

      {/* Summary */}
      <p className="text-brand-fg mb-4 line-clamp-3 leading-relaxed">
        {project.summary}
      </p>

      {/* KPIs */}
      {project.kpis && project.kpis.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {project.kpis.slice(0, 2).map((kpi, index) => (
            <KpiChip key={index} kpi={kpi} variant="compact" />
          ))}
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.slice(0, 3).map((tag, index) => (
          <Tag key={index} variant="neutral" className="text-xs">
            {tag}
          </Tag>
        ))}
        {project.tags.length > 3 && (
          <Tag variant="neutral" className="text-xs">
            +{project.tags.length - 3} more
          </Tag>
        )}
      </div>

      {/* Tech Stack Preview */}
      <div className="border-t border-border pt-4">
        <div className="flex flex-wrap gap-1">
          {project.techStack.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="text-xs bg-brand-primary/10 text-brand-primary px-2 py-1 rounded"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="text-xs text-brand-muted px-2 py-1">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Date */}
      {project.date && (
        <div className="mt-3 text-xs text-brand-muted">
          {new Date(project.date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long' 
          })}
        </div>
      )}
    </article>
  );
}
import { Project } from '../lib/schema';
import Tag from './Tag';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

/**
 * Project Card Component - MindShore Brand Spec
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
      className="cursor-pointer focus:outline-none card"
      style={{
        background: '#ffffff', /* Białe tło */
        border: 'none', /* Bez ramki */
        borderRadius: 'var(--ms-radius-md)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)', /* Delikatny cień */
        padding: '32px',
        transition: 'transform 0.3s var(--ms-ease), box-shadow 0.3s var(--ms-ease)'
      }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.title}`}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)'; /* Silniejszy cień przy hover */
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
      }}
    >
      {/* Project Image - Data/Analytics Theme */}
      <div 
        className="mb-6 rounded-lg overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(35, 40, 86, 0.05), rgba(240, 129, 28, 0.05))',
          borderRadius: 'var(--ms-radius-md)',
          height: '180px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} project visualization`}
            loading="lazy"
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        ) : (
          <div style={{
            fontSize: '48px',
            opacity: 0.3,
            color: 'var(--ms-blue)'
          }}>
            📊
          </div>
        )}
      </div>

      {/* Category Tag */}
      <div className="mb-4">
        <Tag variant="primary" className="text-xs">
          {project.category}
        </Tag>
      </div>

      {/* Title and Client */}
      <div className="mb-3">
        <h3 
          className="font-bold mb-1 line-clamp-2"
          style={{
            fontFamily: 'var(--ms-font-body)',
            fontSize: '16px',
            color: 'var(--ms-orange)',
            lineHeight: '1.3'
          }}
        >
          {project.title}
        </h3>
        <p 
          className="text-xs"
          style={{
            fontFamily: 'var(--ms-font-body)',
            color: 'var(--ms-gray-700)',
            fontSize: '13px'
          }}
        >
          {project.client}
        </p>
      </div>

      {/* Summary */}
      <p 
        className="line-clamp-4"
        style={{
          fontFamily: 'var(--ms-font-body)',
          fontSize: '14px',
          color: 'var(--ms-blue)',
          lineHeight: '1.5'
        }}
      >
        {project.summary}
      </p>
    </article>
  );
}

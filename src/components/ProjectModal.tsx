import { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../lib/schema';

interface ExtendedProject extends Project {
  subtitle?: string;
  heroSubtitle?: string;
  clientOverview?: string;
  businessChallenge?: string;
  solution?: string[];
  solutionIntro?: string;
  solutionOutro?: string;
  benefits?: string[];
  benefitsIntro?: string;
  benefitsOutro?: string;
  screenshots?: { src: string; alt: string }[];
}

interface ProjectModalProps {
  project: ExtendedProject | null;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

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

  useEffect(() => {
    if (project) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      modalRef.current?.focus();
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!project) return;
      switch (e.key) {
        case 'Escape': onClose(); break;
        case 'ArrowLeft': if (hasPrevious && onPrevious) onPrevious(); break;
        case 'ArrowRight': if (hasNext && onNext) onNext(); break;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose, onPrevious, onNext, hasPrevious, hasNext]);

  if (!project) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
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
          minHeight: '100vh'
        }}
      >
        {/* Glass Header Bar */}
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: '1400px',
            height: '72px',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 40px',
            background: 'rgba(35, 40, 86, 0.4)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)'
          }}
        >
          <img 
            src="/Demo_Mindshore/LOGO_sygnet.png"
            alt="MindShore Logo"
            style={{ height: '40px', width: 'auto' }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {(hasPrevious || hasNext) && (
              <>
                <button
                  onClick={onPrevious}
                  disabled={!hasPrevious}
                  style={{ 
                    padding: '8px',
                    background: 'rgba(255,255,255,0.1)',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: hasPrevious ? 'pointer' : 'not-allowed',
                    opacity: hasPrevious ? 1 : 0.5
                  }}
                >
                  <ChevronLeft style={{ width: 20, height: 20, color: '#fff' }} />
                </button>
                <button
                  onClick={onNext}
                  disabled={!hasNext}
                  style={{ 
                    padding: '8px',
                    background: 'rgba(255,255,255,0.1)',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: hasNext ? 'pointer' : 'not-allowed',
                    opacity: hasNext ? 1 : 0.5,
                    marginRight: '8px'
                  }}
                >
                  <ChevronRight style={{ width: 20, height: 20, color: '#fff' }} />
                </button>
              </>
            )}
            <button
              onClick={onClose}
              style={{ 
                padding: '8px',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              <X style={{ width: 24, height: 24, color: '#fff' }} />
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <div
          style={{
            background: 'linear-gradient(135deg, #F0811C 0%, #E55197 100%)',
            minHeight: '340px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '120px 48px 60px'
          }}
        >
          <span style={{
            fontSize: '13px',
            fontWeight: 600,
            color: '#ffffff',
            backgroundColor: 'rgba(255,255,255,0.2)',
            padding: '6px 16px',
            borderRadius: '20px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '24px'
          }}>
            {project.category} | {project.subtitle || 'Core System Modernization'}
          </span>

          <h1 
            id="modal-title"
            style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '16px',
              maxWidth: '800px',
              lineHeight: 1.2
            }}
          >
            {project.title}
          </h1>

          <p style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: 'rgba(255,255,255,0.95)',
            maxWidth: '700px',
            lineHeight: 1.5
          }}>
            {project.heroSubtitle || project.summary}
          </p>
        </div>

        {/* Main Content - Minimalist Design */}
        <div style={{ 
          maxWidth: '900px', 
          margin: '0 auto', 
          padding: '80px 40px 100px',
          backgroundColor: '#ffffff'
        }}>
          
          {/* Client Overview */}
          <section style={{ marginBottom: '64px' }}>
            <h2 style={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#F0811C',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '16px'
            }}>
              Client Overview
            </h2>
            <p style={{
              fontSize: '18px',
              lineHeight: 1.8,
              color: '#232856'
            }}>
              {project.clientOverview || 'Our client is a leading cooperative insurance provider operating nationwide. With a strong legacy and a broad customer base, the organization needed to modernize its core systems to remain competitive and support future digital initiatives.'}
            </p>
          </section>

          {/* Divider */}
          <div style={{ 
            width: '60px', 
            height: '2px', 
            background: 'linear-gradient(90deg, #F0811C, #E55197)',
            marginBottom: '64px'
          }} />

          {/* Business Challenge */}
          <section style={{ marginBottom: '64px' }}>
            <h2 style={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#F0811C',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '16px'
            }}>
              Business Challenge
            </h2>
            <p style={{
              fontSize: '18px',
              lineHeight: 1.8,
              color: '#232856'
            }}>
              {project.businessChallenge || 'The insurer was losing its competitive advantage due to outdated core systems. Legacy technology limited product innovation, extended time-to-market, and made it difficult to meet rising customer expectations.'}
            </p>
          </section>

          {/* Divider */}
          <div style={{ 
            width: '60px', 
            height: '2px', 
            background: 'linear-gradient(90deg, #F0811C, #E55197)',
            marginBottom: '64px'
          }} />

          {/* Our Solution */}
          <section style={{ marginBottom: '64px' }}>
            <h2 style={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#F0811C',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '16px'
            }}>
              Our Solution
            </h2>
            <p style={{
              fontSize: '18px',
              lineHeight: 1.8,
              color: '#232856',
              marginBottom: '32px'
            }}>
              {project.solutionIntro || 'We designed and delivered a next-generation modular insurance core platform built for scalability, flexibility, and future growth:'}
            </p>
            
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: '0 0 32px 0'
            }}>
              {(project.solution || [
                'Event-driven microservices to enable loose coupling, high resilience, and smooth scaling',
                'Apache Kafka as the messaging backbone for asynchronous, real-time communication',
                'Polyglot persistence allowing optimized data storage based on domain needs',
                'Integration with R for advanced statistical and actuarial computations',
                'Full containerization and Kubernetes orchestration for deployment across cloud and on-prem environments',
                'Modern web application layer implemented using Java SpringBoot and Angular',
                'Cloud-ready architecture, optimized for AWS but portable across infrastructures'
              ]).map((item, index) => (
                <li 
                  key={index}
                  style={{
                    fontSize: '16px',
                    lineHeight: 1.8,
                    color: '#485257',
                    paddingLeft: '24px',
                    position: 'relative',
                    marginBottom: '12px'
                  }}
                >
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    top: '10px',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #F0811C, #E55197)'
                  }} />
                  {item}
                </li>
              ))}
            </ul>

            <p style={{
              fontSize: '18px',
              lineHeight: 1.8,
              color: '#232856'
            }}>
              {project.solutionOutro || 'This architecture provides the insurer with a modern, maintainable, and extensible core platform that supports rapid product development and meets strict industry requirements.'}
            </p>
          </section>

          {/* Divider */}
          <div style={{ 
            width: '60px', 
            height: '2px', 
            background: 'linear-gradient(90deg, #F0811C, #E55197)',
            marginBottom: '64px'
          }} />

          {/* Business Benefits */}
          <section style={{ marginBottom: '64px' }}>
            <h2 style={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#F0811C',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '16px'
            }}>
              Business Benefits
            </h2>
            <p style={{
              fontSize: '18px',
              lineHeight: 1.8,
              color: '#232856',
              marginBottom: '32px'
            }}>
              {project.benefitsIntro || 'The delivery of the first stable, production-ready version of the system enabled the insurer to:'}
            </p>
            
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: '0 0 32px 0'
            }}>
              {(project.benefits || [
                'Launch new insurance products faster, accelerating innovation cycles',
                'Improve operational efficiency through modular design and streamlined processes',
                'Ensure scalability and performance, especially during high-volume business periods',
                'Prepare for omnichannel expansion, including web and mobile customer experiences',
                'Reduce technical debt and establish a robust foundation for long-term digital transformation'
              ]).map((item, index) => (
                <li 
                  key={index}
                  style={{
                    fontSize: '16px',
                    lineHeight: 1.8,
                    color: '#485257',
                    paddingLeft: '24px',
                    position: 'relative',
                    marginBottom: '12px'
                  }}
                >
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    top: '10px',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #F0811C, #E55197)'
                  }} />
                  {item}
                </li>
              ))}
            </ul>

            <p style={{
              fontSize: '18px',
              lineHeight: 1.8,
              color: '#232856',
              fontStyle: 'italic'
            }}>
              {project.benefitsOutro || 'The platform is now ready for commercialization, and we are actively in discussions with additional insurance sector clients to deploy it.'}
            </p>
          </section>

          {/* Divider */}
          <div style={{ 
            width: '60px', 
            height: '2px', 
            background: 'linear-gradient(90deg, #F0811C, #E55197)',
            marginBottom: '64px'
          }} />

          {/* App Screenshots - only show for projects with screenshots */}
          {project.id === 'insurance-core-system-1' && (
            <>
              <section style={{ marginBottom: '64px' }}>
                <h2 style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#F0811C',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  marginBottom: '32px'
                }}>
                  Application Screenshots
                </h2>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(3, 1fr)', 
                  gap: '24px',
                  alignItems: 'start'
                }}>
                  <img 
                    src="/Demo_Mindshore/images/projects/insurance1.png" 
                    alt="Insurance App - Main Screen"
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: '16px',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
                    }}
                  />
                  <img 
                    src="/Demo_Mindshore/images/projects/insurance2.png" 
                    alt="Insurance App - Coverage Certificate"
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: '16px',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
                    }}
                  />
                  <img 
                    src="/Demo_Mindshore/images/projects/insurance3.png" 
                    alt="Insurance App - Payment"
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: '16px',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
                    }}
                  />
                </div>
              </section>

              {/* Divider */}
              <div style={{ 
                width: '60px', 
                height: '2px', 
                background: 'linear-gradient(90deg, #F0811C, #E55197)',
                marginBottom: '64px'
              }} />
            </>
          )}

          {/* App Screenshots for Social Community */}
          {project.id === 'social-community-app-3' && (
            <>
              <section style={{ marginBottom: '64px' }}>
                <h2 style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#F0811C',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  marginBottom: '32px'
                }}>
                  Application Screenshots
                </h2>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(4, 1fr)', 
                  gap: '16px',
                  alignItems: 'start'
                }}>
                  <img 
                    src="/Demo_Mindshore/images/projects/socialmedia1.jpeg" 
                    alt="Social Community App - Screen 1"
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: '16px',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
                    }}
                  />
                  <img 
                    src="/Demo_Mindshore/images/projects/socialmedia2.jpeg" 
                    alt="Social Community App - Screen 2"
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: '16px',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
                    }}
                  />
                  <img 
                    src="/Demo_Mindshore/images/projects/socialmedia3.jpeg" 
                    alt="Social Community App - Screen 3"
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: '16px',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
                    }}
                  />
                  <img 
                    src="/Demo_Mindshore/images/projects/socialmedia4.jpeg" 
                    alt="Social Community App - Screen 4"
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: '16px',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
                    }}
                  />
                </div>
              </section>

              {/* Divider */}
              <div style={{ 
                width: '60px', 
                height: '2px', 
                background: 'linear-gradient(90deg, #F0811C, #E55197)',
                marginBottom: '64px'
              }} />
            </>
          )}

          {/* App Screenshot for ASO Optimization */}
          {project.id === 'aso-ai-platform-1' && (
            <>
              <section style={{ marginBottom: '64px' }}>
                <h2 style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#F0811C',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  marginBottom: '32px'
                }}>
                  Platform Overview
                </h2>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center'
                }}>
                  <img 
                    src="/Demo_Mindshore/images/projects/ASO Optimization.jpg" 
                    alt="ASO Optimization Platform Dashboard"
                    style={{
                      width: '100%',
                      maxWidth: '800px',
                      height: 'auto',
                      borderRadius: '16px',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
                    }}
                  />
                </div>
              </section>

              {/* Divider */}
              <div style={{ 
                width: '60px', 
                height: '2px', 
                background: 'linear-gradient(90deg, #F0811C, #E55197)',
                marginBottom: '64px'
              }} />
            </>
          )}

          {/* App Screenshot for ERP Frontend */}
          {project.id === 'erp-frontend-migration-4' && (
            <>
              <section style={{ marginBottom: '64px' }}>
                <h2 style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#F0811C',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  marginBottom: '32px'
                }}>
                  Application Overview
                </h2>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center'
                }}>
                  <img 
                    src="/Demo_Mindshore/images/projects/erpfrontend.jpeg" 
                    alt="ERP Frontend Modernization Dashboard"
                    style={{
                      width: '100%',
                      maxWidth: '800px',
                      height: 'auto',
                      borderRadius: '16px',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
                    }}
                  />
                </div>
              </section>

              {/* Divider */}
              <div style={{ 
                width: '60px', 
                height: '2px', 
                background: 'linear-gradient(90deg, #F0811C, #E55197)',
                marginBottom: '64px'
              }} />
            </>
          )}

          {/* Technologies Used */}
          <section>
            <h2 style={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#F0811C',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '24px'
            }}>
              Technologies Used
            </h2>
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '12px' 
            }}>
              {project.techStack.map((tech, index) => (
                <span
                  key={index}
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#232856',
                    backgroundColor: 'rgba(35, 40, 86, 0.06)',
                    padding: '10px 20px',
                    borderRadius: '24px',
                    border: '1px solid rgba(35, 40, 86, 0.1)'
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

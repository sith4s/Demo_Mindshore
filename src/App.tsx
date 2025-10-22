import { useState, useEffect, useCallback } from 'react';
import { Project, FilterState, DEFAULT_FILTER_STATE } from './lib/schema';
import { filterProjects, getUniqueCategories } from './lib/search';
import Header from './components/Header';
import Footer from './components/Footer';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import HeroSection from './components/HeroSection';

// Get base URL from Vite config
const BASE_URL = '/Demo_Mindshore/';

interface ProjectData {
  metadata: {
    generated_at: string;
    source_file: string;
    total_projects: number;
    categories: string[];
    version: string;
  };
  projects: Project[];
}

/**
 * Main Application Component
 * Manages state, data loading, and routing
 */
export default function App() {
  // State management
  const [data, setData] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTER_STATE);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number>(-1);

  // Load project data
  useEffect(() => {
    loadProjects();
  }, []);

  // Handle URL hash changes for deep linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/p/')) {
        const projectId = hash.substring(4);
        openProjectById(projectId);
      } else if (hash === '#' || hash === '') {
        setSelectedProject(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Load projects from JSON
  const loadProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${BASE_URL}projects.json`);
      if (!response.ok) {
        throw new Error(`Failed to load projects: ${response.status}`);
      }
      
      const projectData: ProjectData = await response.json();
      setData(projectData);
    } catch (err) {
      console.error('Error loading projects:', err);
      setError(err instanceof Error ? err.message : 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  }, []);

  // Filter projects based on current filters
  const filteredProjects = data ? filterProjects(data.projects, filters) : [];

  // Open project modal and update URL
  const openProject = useCallback((project: Project, index: number) => {
    setSelectedProject(project);
    setSelectedProjectIndex(index);
    window.history.pushState(null, '', `#/p/${project.id}`);
  }, []);

  // Open project by ID (for direct links)
  const openProjectById = useCallback((projectId: string) => {
    if (!data) return;
    
    const project = data.projects.find(p => p.id === projectId);
    if (project) {
      const index = filteredProjects.findIndex(p => p.id === projectId);
      setSelectedProject(project);
      setSelectedProjectIndex(index >= 0 ? index : -1);
    }
  }, [data, filteredProjects]);

  // Close project modal and update URL
  const closeProject = useCallback(() => {
    setSelectedProject(null);
    setSelectedProjectIndex(-1);
    window.history.pushState(null, '', '#');
  }, []);

  // Navigation between projects
  const goToNextProject = useCallback(() => {
    if (selectedProjectIndex < filteredProjects.length - 1) {
      const nextProject = filteredProjects[selectedProjectIndex + 1];
      openProject(nextProject, selectedProjectIndex + 1);
    }
  }, [selectedProjectIndex, filteredProjects, openProject]);

  const goToPreviousProject = useCallback(() => {
    if (selectedProjectIndex > 0) {
      const prevProject = filteredProjects[selectedProjectIndex - 1];
      openProject(prevProject, selectedProjectIndex - 1);
    }
  }, [selectedProjectIndex, filteredProjects, openProject]);

  // Navigation state
  const canGoNext = selectedProjectIndex < filteredProjects.length - 1;
  const canGoPrevious = selectedProjectIndex > 0;

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProject) return;
      
      if (e.key === 'Escape') {
        closeProject();
      } else if (e.key === 'ArrowLeft' && canGoPrevious) {
        goToPreviousProject();
      } else if (e.key === 'ArrowRight' && canGoNext) {
        goToNextProject();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, canGoPrevious, canGoNext, closeProject, goToPreviousProject, goToNextProject]);

  // Handle about and contact clicks
  const handleAboutClick = () => {
    console.log('About clicked');
  };

  const handleContactClick = () => {
    console.log('Contact link clicked');
  };

  // Handle search from Hero section
  const handleHeroSearch = useCallback((query: string) => {
    setFilters(prev => ({
      ...prev,
      query: query
    }));
  }, []);

  return (
    <div style={{backgroundColor: "#ffffff", color: "var(--ms-blue)", fontFamily: "var(--ms-font-body)"}} className="min-h-screen">
      {/* Header */}
      <Header 
        onAboutClick={handleAboutClick}
        onContactClick={handleContactClick}
      />

      {/* Hero Section */}
      <HeroSection 
        onSearch={handleHeroSearch}
        searchValue={filters.query}
        availableCategories={data ? getUniqueCategories(data.projects) : []}
        selectedCategory={filters.category}
        onCategorySelect={(category) => setFilters(prev => ({ ...prev, category }))}
        sortBy={filters.sortBy}
        onSortChange={(sortBy) => setFilters(prev => ({ ...prev, sortBy }))}
      />

      {/* Main Content - Szare tło na całą szerokość */}
      <div style={{ backgroundColor: '#f5f5f7' }}>
        <main 
          id="catalog" 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        >
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            <span className="ml-4 text-lg">Loading projects...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-red-400 mb-2">Error Loading Projects</h2>
            <p className="text-red-300">{error}</p>
            <button 
              onClick={loadProjects}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Projects Content */}
        {!loading && !error && data && (
          <>


            {/* Projects Grid */}
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={() => openProject(project, index)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold mb-2">No projects found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria or filters
                </p>
                <button 
                  onClick={() => setFilters(DEFAULT_FILTER_STATE)}
                  className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </>
        )}
      </main>
      </div>

      {/* Footer */}
      <Footer />

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={closeProject}
          onPrevious={canGoPrevious ? goToPreviousProject : undefined}
          onNext={canGoNext ? goToNextProject : undefined}
          hasPrevious={canGoPrevious}
          hasNext={canGoNext}
        />
      )}
    </div>
  );
}
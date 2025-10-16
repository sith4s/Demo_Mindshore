import { useState, useEffect, useCallback } from 'react';
import { Project, FilterState, DEFAULT_FILTER_STATE } from './lib/schema';
import { filterProjects, getUniqueCategories, debounce } from './lib/search';
import Header from './components/Header';
import Footer from './components/Footer';
import FilterBar from './components/FilterBar';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';

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

    // Handle initial hash
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [data]);

  // Update URL when project is selected
  useEffect(() => {
    if (selectedProject) {
      window.history.replaceState(null, '', `#/p/${selectedProject.id}`);
    } else {
      window.history.replaceState(null, '', '#');
    }
  }, [selectedProject]);

  // Load projects data
  const loadProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/projects.json');
      if (!response.ok) {
        throw new Error(`Failed to load projects: ${response.status}`);
      }
      
      const projectData = await response.json() as ProjectData;
      setData(projectData);
      
      // Update page title with project count
      document.title = `MindShore | ${projectData.projects.length} Projects`;
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load projects');
      console.error('Error loading projects:', err);
    } finally {
      setLoading(false);
    }
  };

  // Open project by ID (for deep linking)
  const openProjectById = (projectId: string) => {
    if (!data) return;
    
    const project = data.projects.find(p => p.id === projectId);
    if (project) {
      const index = data.projects.indexOf(project);
      setSelectedProject(project);
      setSelectedProjectIndex(index);
    }
  };

  // Debounced search to improve performance
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setFilters(prev => ({ ...prev, query }));
    }, 300),
    []
  );

  // Filter handlers
  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({ ...prev, category }));
  };

  const handleQueryChange = (query: string) => {
    debouncedSearch(query);
  };

  const handleSortChange = (sortBy: 'newest' | 'az') => {
    setFilters(prev => ({ ...prev, sortBy }));
  };

  // Project modal handlers
  const handleProjectClick = (project: Project) => {
    if (!data) return;
    
    const index = data.projects.indexOf(project);
    setSelectedProject(project);
    setSelectedProjectIndex(index);
  };

  const handleModalClose = () => {
    setSelectedProject(null);
    setSelectedProjectIndex(-1);
  };

  const handlePreviousProject = () => {
    if (!data || selectedProjectIndex <= 0) return;
    
    const newIndex = selectedProjectIndex - 1;
    const project = data.projects[newIndex];
    setSelectedProject(project);
    setSelectedProjectIndex(newIndex);
  };

  const handleNextProject = () => {
    if (!data || selectedProjectIndex >= data.projects.length - 1) return;
    
    const newIndex = selectedProjectIndex + 1;
    const project = data.projects[newIndex];
    setSelectedProject(project);
    setSelectedProjectIndex(newIndex);
  };

  // Computed values
  const projects = data?.projects || [];
  const categories = getUniqueCategories(projects);
  const filteredProjects = filterProjects(projects, filters);
  const hasPrevious = selectedProjectIndex > 0;
  const hasNext = selectedProjectIndex < projects.length - 1;

  // About/Contact handlers
  const handleAboutClick = () => {
    alert('About MindShore: We transform businesses through innovative Data & AI solutions, delivering measurable impact across industries.');
  };

  const handleContactClick = () => {
    // Track contact click (analytics would go here)
    console.log('Contact link clicked');
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-fg">
      {/* Header */}
      <Header 
        onAboutClick={handleAboutClick}
        onContactClick={handleContactClick}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-fg mb-4">
            Project Catalog
          </h1>
          <p className="text-xl text-brand-muted max-w-3xl mx-auto leading-relaxed">
            Discover our Data & AI solutions delivering transformative business value. 
            Each project showcases measurable outcomes and innovative approaches across industries.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
            <span className="ml-4 text-brand-muted">Loading projects...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-6 mb-8">
            <div className="flex items-center">
              <div className="text-red-400 mr-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-red-400 mb-1">Failed to load projects</h3>
                <p className="text-red-300">{error}</p>
                <button
                  onClick={loadProjects}
                  className="mt-3 btn-secondary text-sm"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        {!loading && !error && data && (
          <>
            {/* Filter Bar */}
            <FilterBar
              categories={categories}
              selected={filters.category}
              onSelect={handleCategoryChange}
              query={filters.query}
              onQuery={handleQueryChange}
              sortBy={filters.sortBy}
              onSortChange={handleSortChange}
              className="mb-8"
            />

            {/* Results Summary */}
            <div className="mb-6">
              <p className="text-brand-muted">
                {filteredProjects.length === projects.length 
                  ? `Showing all ${projects.length} projects`
                  : `Showing ${filteredProjects.length} of ${projects.length} projects`
                }
              </p>
            </div>

            {/* Project Grid */}
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={handleProjectClick}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-16">
                <div className="text-brand-muted mb-4">
                  <svg className="w-16 h-16 mx-auto opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-brand-fg mb-2">No projects found</h3>
                <p className="text-brand-muted mb-4">
                  Try adjusting your filters or search terms to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setFilters(DEFAULT_FILTER_STATE);
                    // Reset the search input value as well
                    const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
                    if (searchInput) searchInput.value = '';
                  }}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={handleModalClose}
        onPrevious={handlePreviousProject}
        onNext={handleNextProject}
        hasPrevious={hasPrevious}
        hasNext={hasNext}
      />
    </div>
  );
}
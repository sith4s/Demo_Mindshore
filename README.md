# MindShore Project Catalog

A production-ready project catalog showcasing Data & AI solutions with client anonymization and modern web technologies.

## 🚀 Features

- **Modern Tech Stack**: Vite + React + TypeScript + Tailwind CSS
- **Client Anonymization**: Automatic anonymization of sensitive client information
- **Responsive Design**: Mobile-first responsive design with dark/light mode support
- **Accessibility**: WCAG AA compliant with keyboard navigation and screen reader support
- **Search & Filtering**: Advanced search and category filtering capabilities
- **Performance Optimized**: Code splitting, lazy loading, and optimized assets
- **Type Safety**: Comprehensive TypeScript implementation

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build Tool**: Vite 5
- **Icons**: Lucide React
- **Data Processing**: Mammoth.js for DOCX conversion
- **Testing**: Playwright for E2E testing
- **Code Quality**: ESLint, Prettier

## 📋 Port Policy

This project follows a strict single-port policy:

- **Development Server**: Always runs on port `5173`
- **No New Ports**: Never opens additional ports on conflicts
- **Auto-Cleanup**: Automatically closes previous instances before starting

## 🏗️ Project Structure

```
Demo_Mindshore/
├── public/
│   ├── projects.json          # Generated project data
│   └── projects/              # Project images
├── src/
│   ├── components/            # React components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── FilterBar.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectModal.tsx
│   │   ├── Tag.tsx
│   │   ├── KpiChip.tsx
│   │   └── Logo.tsx
│   ├── lib/                   # Utilities and types
│   │   ├── schema.ts          # TypeScript types
│   │   ├── search.ts          # Search and filtering logic
│   │   └── anonymize.ts       # Client anonymization
│   ├── App.tsx                # Main application
│   ├── main.tsx               # Entry point
│   ├── styles.css             # Global styles
│   └── theme.css              # Theme variables
├── scripts/
│   └── ingest-docx.ts         # DOCX processing script
├── content/
│   └── projects.docx          # Source data (place your DOCX here)
└── config files...
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/sith4s/Demo_Mindshore.git
cd Demo_Mindshore

# Install dependencies
npm install

# Start development server (always on port 5173)
npm run dev
```

The application will be available at `http://localhost:5173`

### Development Commands

```bash
# Development server (port 5173)
npm run dev

# Build for production
npm run build

# Preview production build (port 5173)
npm run preview

# Run tests
npm run test

# Lint code
npm run lint

# Format code
npm run format

# Process DOCX content
npm run ingest
```

## 📊 Content Management

### Adding New Projects

1. **Via DOCX (Recommended)**:
   - Place your DOCX file in the `content/` directory as `projects.docx`
   - Run `npm run ingest` to process and anonymize the content
   - The script will generate `public/projects.json` and extract images

2. **Manual JSON Editing**:
   - Edit `public/projects.json` directly
   - Follow the TypeScript schema in `src/lib/schema.ts`

### DOCX Format Guidelines

Structure your DOCX with these section headers for each project:

```
Project Title (H1)
Client: Your client name (will be anonymized)
Summary: Brief project description
Problem: List of challenges
Approach: List of solution approaches  
Outcomes: List of results and benefits
Tech Stack: Comma-separated technologies
Tags: Comma-separated keywords
Category: Data & AI (or other category)
```

### Anonymization

The system automatically anonymizes:
- Client names → Industry descriptors
- Specific monetary amounts → Ranges
- Proprietary information → Generic terms
- Contact details and URLs

## 🎨 Customization

### Branding

Update theme variables in `src/theme.css`:

```css
:root {
  --brand-bg: #0b0b0c;
  --brand-fg: #f5f6f8;
  --brand-primary: #3ea6ff;
  --brand-accent: #7bd389;
  /* ... */
}
```

### Logo

Replace the SVG in `src/components/Logo.tsx` with your brand assets.

## 🧪 Testing

### E2E Testing with Playwright

```bash
# Install Playwright browsers
npx playwright install

# Run tests
npm run test

# Run tests in headed mode
npx playwright test --headed

# Run specific test
npx playwright test tests/catalog.spec.ts
```

### Test Coverage

Tests cover:
- Project catalog loading and rendering
- Search and filtering functionality
- Project modal interactions
- Keyboard navigation
- Accessibility compliance

## 📈 Performance

### Optimization Features

- Code splitting for optimal loading
- Lazy image loading with fallbacks
- Debounced search for smooth UX
- CSS-in-JS with Tailwind for minimal bundle size
- Optimized build with Vite

### Lighthouse Targets

- Performance: ≥ 90
- Accessibility: ≥ 90  
- Best Practices: ≥ 90
- SEO: ≥ 90

## 🔒 Privacy & Security

- **No Tracking**: Zero analytics or tracking scripts
- **Client Anonymization**: Automatic anonymization of sensitive data
- **No Personal Data**: No collection or storage of user information
- **Secure Headers**: Security headers configured for production

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Static Hosting

This is a static React application that can be deployed to:

- Vercel
- Netlify  
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting provider

### Environment Variables

No environment variables required for basic operation.

## 🔧 Development

### Code Style

- **ESLint**: Enforces code quality rules
- **Prettier**: Automatic code formatting
- **TypeScript**: Strict type checking enabled
- **Conventional Commits**: Recommended commit message format

### Adding New Features

1. Create feature branch
2. Add TypeScript types to `src/lib/schema.ts`
3. Implement components with accessibility in mind
4. Add tests for new functionality
5. Update documentation

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed contribution guidelines.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Ensure all tests pass: `npm run test`
5. Lint your code: `npm run lint`
6. Commit your changes: `git commit -m 'Add amazing feature'`
7. Push to the branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Common Issues

**Port already in use**: The application automatically kills processes on port 5173 before starting.

**DOCX processing fails**: Ensure your DOCX follows the expected format with proper section headers.

**Images not loading**: Check that image files are properly extracted to `public/projects/` directory.

### Getting Help

- Check the [Issues](https://github.com/sith4s/Demo_Mindshore/issues) for known problems
- Create a new issue with detailed description
- Contact: [mindshore.io/contact](https://mindshore.io/contact)

## 🙏 Acknowledgments

- **Inspiration**: Clouds On Mars Catalog for layout concepts
- **Icons**: Lucide React icon library
- **Framework**: React and Vite development teams
- **Design**: Tailwind CSS framework

---

**MindShore Project Catalog** - Transforming businesses through innovative Data & AI solutions.
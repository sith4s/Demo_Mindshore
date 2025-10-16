# Contributing to MindShore Project Catalog

Thank you for your interest in contributing to the MindShore Project Catalog! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Issues

Before creating an issue, please:

1. **Search existing issues** to avoid duplicates
2. **Use the issue template** if available
3. **Provide detailed information** including:
   - Steps to reproduce the problem
   - Expected vs actual behavior
   - Browser and operating system
   - Screenshots or error messages

### Suggesting Features

When suggesting new features:

1. **Check if it aligns** with the project's goals
2. **Describe the use case** and benefits
3. **Consider the implementation complexity**
4. **Provide mockups or examples** if applicable

### Code Contributions

1. **Fork the repository** and create a feature branch
2. **Follow the coding standards** outlined below
3. **Write tests** for new functionality
4. **Update documentation** as needed
5. **Submit a pull request** with a clear description

## 🔧 Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Local Development

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/Demo_Mindshore.git
cd Demo_Mindshore

# Add upstream remote
git remote add upstream https://github.com/sith4s/Demo_Mindshore.git

# Install dependencies
npm install

# Start development server
npm run dev
```

### Port Policy

**IMPORTANT**: This project uses a strict single-port policy:

- Always use port **5173** for development
- Never open new ports if 5173 is busy
- The `predev` script automatically kills existing processes on 5173
- Use `npm run dev` which handles port management automatically

## 📝 Coding Standards

### TypeScript

- **Strict mode enabled**: Fix all TypeScript errors
- **Type everything**: Avoid `any` types
- **Use interfaces**: Define clear contracts for props and data
- **Export types**: Make reusable types available

```typescript
// ✅ Good
interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

// ❌ Avoid
function ProjectCard(props: any) { ... }
```

### React Components

- **Functional components**: Use hooks over class components
- **Props destructuring**: Destructure props for clarity
- **Default exports**: Use default exports for components
- **Accessibility**: Include proper ARIA labels and keyboard support

```tsx
// ✅ Good
export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <article 
      onClick={() => onClick(project)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View ${project.title}`}
    >
      {/* content */}
    </article>
  );
}
```

### Styling

- **Tailwind CSS**: Use Tailwind utility classes
- **CSS variables**: Use theme variables from `src/theme.css`
- **Responsive design**: Mobile-first approach
- **Dark mode**: Support both light and dark themes

```tsx
// ✅ Good
<div className="bg-brand-bg text-brand-fg rounded-xl p-4 hover:bg-hover-bg transition-smooth">

// ❌ Avoid inline styles
<div style={{ backgroundColor: '#123456' }}>
```

### File Organization

- **Components**: One component per file in `src/components/`
- **Utilities**: Helper functions in `src/lib/`
- **Types**: Shared types in `src/lib/schema.ts`
- **Tests**: Co-located with components or in `tests/`

### Naming Conventions

- **Components**: PascalCase (`ProjectCard.tsx`)
- **Files**: PascalCase for components, camelCase for utilities
- **Variables**: camelCase (`selectedProject`)
- **Constants**: UPPER_SNAKE_CASE (`DEFAULT_FILTER_STATE`)
- **CSS classes**: Follow Tailwind conventions

## 🧪 Testing Guidelines

### Writing Tests

- **Test user interactions**: Focus on user-facing functionality
- **Accessibility**: Test keyboard navigation and screen reader support
- **Error states**: Test error conditions and edge cases
- **Performance**: Test with large datasets

### Test Structure

```typescript
// tests/catalog.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Project Catalog', () => {
  test('should load and display projects', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-testid="project-card"]')).toHaveCount(5);
  });
});
```

### Running Tests

```bash
# Run all tests
npm run test

# Run specific test
npx playwright test tests/catalog.spec.ts

# Run in headed mode for debugging
npx playwright test --headed

# Update screenshots
npx playwright test --update-snapshots
```

## 🎨 Design Guidelines

### Accessibility (A11y)

- **Keyboard navigation**: All interactive elements accessible via keyboard
- **Focus management**: Visible focus indicators and logical tab order
- **Color contrast**: Minimum AA compliance (4.5:1 for normal text)
- **Screen readers**: Proper semantic HTML and ARIA labels
- **Reduced motion**: Respect `prefers-reduced-motion` setting

### Brand Consistency

- **Colors**: Use CSS variables from theme
- **Typography**: System font stack for performance
- **Icons**: Lucide React for consistency
- **Spacing**: Tailwind spacing scale
- **Animations**: Subtle, purposeful transitions

### Content Guidelines

- **Anonymization**: Always anonymize client information
- **Tone**: Professional but approachable
- **Clarity**: Clear, concise descriptions
- **Consistency**: Consistent terminology and formatting

## 🔒 Security & Privacy

### Client Data Protection

- **No real client names**: Always use industry descriptors
- **Sanitize content**: Remove sensitive information before display
- **Image safety**: Ensure no sensitive data in screenshots
- **Anonymization validation**: Use provided validation functions

### Code Security

- **Dependencies**: Keep dependencies updated
- **Input validation**: Validate all user inputs
- **XSS prevention**: Escape user-generated content
- **No secrets**: Never commit API keys or secrets

## 📋 Pull Request Process

### Before Submitting

1. **Rebase on latest main**: `git pull upstream main`
2. **Run all checks**: `npm run lint && npm run test`
3. **Test manually**: Verify changes work as expected
4. **Update documentation**: Include relevant documentation updates

### PR Description Template

```markdown
## What this PR does
Brief description of changes

## Type of change
- [ ] Bug fix
- [ ] New feature  
- [ ] Documentation update
- [ ] Refactoring
- [ ] Performance improvement

## Testing
- [ ] Manual testing completed
- [ ] Automated tests added/updated
- [ ] Accessibility tested

## Screenshots (if applicable)
[Add screenshots for UI changes]

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or clearly documented)
```

### Review Process

1. **Automated checks**: All CI checks must pass
2. **Code review**: At least one maintainer review required
3. **Testing**: Manual testing for UI/UX changes
4. **Documentation**: Ensure documentation is up to date

## 🚀 Release Process

### Versioning

- **Semantic versioning**: MAJOR.MINOR.PATCH
- **Breaking changes**: Increment major version
- **New features**: Increment minor version
- **Bug fixes**: Increment patch version

### Deployment

- **Staging**: Test on staging environment first
- **Production**: Deploy to production after approval
- **Rollback plan**: Always have a rollback strategy

## 📞 Getting Help

### Communication Channels

- **GitHub Issues**: Technical discussions and bug reports
- **GitHub Discussions**: Feature requests and general questions
- **Email**: For sensitive or private matters

### Response Times

- **Issues**: Response within 48 hours
- **Pull Requests**: Review within 72 hours
- **Security Issues**: Response within 24 hours

## 🙏 Recognition

Contributors will be recognized in:

- **README**: Added to contributors section
- **Release Notes**: Mentioned in changelog
- **GitHub**: Contributor badge and profile recognition

## 📚 Resources

### Learning Materials

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Playwright Documentation](https://playwright.dev)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

### Tools

- [VSCode Extensions](https://code.visualstudio.com/docs/editor/extension-marketplace)
- [React Developer Tools](https://react.dev/learn/react-developer-tools)
- [Accessibility Inspector](https://developer.mozilla.org/en-US/docs/Tools/Accessibility_inspector)

---

Thank you for contributing to MindShore Project Catalog! Your efforts help create a better experience for everyone.
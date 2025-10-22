/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: 'var(--brand-bg)',
          fg: 'var(--brand-fg)',
          primary: 'var(--brand-primary)',
          accent: 'var(--brand-accent)',
          muted: 'var(--brand-muted)',
        },
        // MindShore Official Colors
        'mindshore-orange': '#F0811C',
        'mindshore-magenta': '#E55197',
        'mindshore-blue': '#232856',
        'mindshore-yellow': '#FDC30D',
        'mindshore-gray-dark': '#485257',
        'mindshore-cyan': '#55BDBF',
        'mindshore-gray-light': '#AFBCC4',
        surface: 'var(--surface)',
        border: 'var(--border)',
      },
      fontFamily: {
        sans: ['Barlow', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Inter', 'Helvetica', 'Arial', 'sans-serif'],
        heading: ['Barlow', 'system-ui', 'sans-serif'],
        body: ['Barlow', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
  darkMode: 'media',
}
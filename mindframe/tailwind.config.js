/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primärfarbe: Navy (für Text und sekundäre Elemente)
        navy: {
          50: '#f7f8f9',
          100: '#ebeef2',
          200: '#d2dae3',
          300: '#a9b9cc',
          400: '#7896b2',
          500: '#5f7d9c',
          600: '#486581',
          700: '#334e68',  // Basis-Navy aus Logo
          800: '#243b53',
          900: '#1e293b',  // Text-Farbe
        },
        
        // Akzentfarbe: Türkis (für interaktive Elemente)
        turquoise: {
          50: '#effffc',
          100: '#c8fff6',
          200: '#9dfeef',
          300: '#63f9e8',
          400: '#2dd4bd',  // Basis-Türkis aus Logo
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        
        // Alternative Akzente für verschiedene Module
        accent: {
          purple: '#9061f9',  // Lila
          pink: '#e74694',    // Pink
          orange: '#f97316',  // Orange
          blue: '#3b82f6',    // Blau
        },
        
        // Semantische Farben
        primary: {
          DEFAULT: '#2dd4bd', // turquoise-400 als Primärfarbe
          hover: '#14b8a6',   // turquoise-500
          light: '#63f9e8',   // turquoise-300
          dark: '#0d9488',    // turquoise-600
        },
        
        // Hintergrundfarben
        background: {
          page: '#ffffff',     // Weiß
          sidebar: '#ffffff',  // Weiß
          card: '#ffffff',     // Weiß
        }
      },
      
      // Typografie
      fontFamily: {
        'sans': ['Inter var', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'display': ['Montserrat', 'Inter var', 'system-ui', 'sans-serif'],
      },
      
      // Schatten für Komponenten
      boxShadow: {
        'card': '0 4px 12px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 6px 16px -3px rgba(0, 0, 0, 0.08), 0 4px 8px -2px rgba(0, 0, 0, 0.05)',
        'sidebar': '0 0 20px rgba(0, 0, 0, 0.05)',
        'button': '0 2px 4px 0 rgba(0, 0, 0, 0.05)',
        'button-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.05)',
      },
      
      // Übergänge
      transitionProperty: {
        'card': 'box-shadow, transform',
        'button': 'color, background-color, border-color, box-shadow, transform',
      },
      transitionDuration: {
        'DEFAULT': '200ms',
      },
      transitionTimingFunction: {
        'DEFAULT': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      
      // Border-Radius
      borderRadius: {
        'card': '0.75rem',    // 12px
        'button': '0.5rem',   // 8px
        'sidebar': '0.75rem', // 12px
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
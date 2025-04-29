/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // FARBTOKENS
      colors: {
        // Navy (Primärfarbe) - ausgewogen in Blau-/Grautönen für professionelles Erscheinungsbild
        navy: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',  // Basis-Navy aus Logo
          800: '#243b53',
          900: '#102a43',
        },
        // Beige (Sekundärfarbe) - warme, erdige Töne für Kontrast zum kühlen Navy
        beige: {
          50: '#faf8f1',
          100: '#f5f0e0',
          200: '#ebe2c6',
          300: '#e1d4ad',  // Basis-Beige aus Logo
          400: '#d3c190',
          500: '#c5ad73',
          600: '#b19355',
          700: '#97784a',
          800: '#7e6043',
          900: '#684f3c',
        },
        // Türkis (Akzentfarbe) - frisch und lebendig für interaktive Elemente
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
        
        // SEMANTISCHE FARBEN
        // Primärfarben (basierend auf Navy)
        primary: {
          DEFAULT: '#334e68', // navy-700
          hover: '#243b53',   // navy-800
          light: '#486581',   // navy-600
          dark: '#102a43',    // navy-900
          50: '#f0f4f8',      // Mapping zu navy-50
          100: '#d9e2ec',     // usw.
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#102a43',
        },
        // Sekundärfarben (basierend auf Beige)
        secondary: {
          DEFAULT: '#e1d4ad', // beige-300
          hover: '#d3c190',   // beige-400
          light: '#f5f0e0',   // beige-100
          dark: '#b19355',    // beige-600
          50: '#faf8f1',      // Mapping zu beige-50
          100: '#f5f0e0',     // usw.
          200: '#ebe2c6',
          300: '#e1d4ad',
          400: '#d3c190',
          500: '#c5ad73',
          600: '#b19355',
          700: '#97784a',
          800: '#7e6043',
          900: '#684f3c',
        },
        // Akzentfarben (basierend auf Türkis)
        accent: {
          DEFAULT: '#2dd4bd', // turquoise-400
          hover: '#14b8a6',   // turquoise-500
          light: '#63f9e8',   // turquoise-300
          dark: '#0d9488',    // turquoise-600
          50: '#effffc',      // Mapping zu turquoise-50
          100: '#c8fff6',     // usw.
          200: '#9dfeef',
          300: '#63f9e8',
          400: '#2dd4bd',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        // Status-Farben für Feedback
        success: {
          DEFAULT: '#10b981', // Grün
          hover: '#059669',
          light: '#34d399',
          dark: '#047857',
        },
        warning: {
          DEFAULT: '#f59e0b', // Orange/Gelb
          hover: '#d97706',
          light: '#fbbf24',
          dark: '#b45309',
        },
        error: {
          DEFAULT: '#ef4444', // Rot
          hover: '#dc2626',
          light: '#f87171',
          dark: '#b91c1c',
        },
        info: {
          DEFAULT: '#3b82f6', // Blau
          hover: '#2563eb',
          light: '#60a5fa',
          dark: '#1d4ed8',
        },
        // Neutrale Farben für Text und Grenzen
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        // Hintergrundfarben
        background: {
          page: '#faf8f1',    // beige-50
          card: '#ffffff',
          navSidebar: '#334e68', // navy-700
          input: '#ffffff',
        }
      },
      
      // TYPOGRAFIE-TOKENS
      fontFamily: {
        // Haupt-Schriftarten
        'sans': ['Inter var', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'serif': ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        'mono': ['JetBrains Mono', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
        // Spezielle Schriften für verschiedene Zwecke
        'display': ['Montserrat', 'Inter var', 'system-ui', 'sans-serif'],
        'inter': ['Inter var', 'Inter', 'system-ui', 'sans-serif'],
        'montserrat': ['Montserrat', 'Inter var', 'system-ui', 'sans-serif'],
      },
      // Schriftgrößen (skalierend)
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.16' }],
        '6xl': ['3.75rem', { lineHeight: '1.16' }],
        '7xl': ['4.5rem', { lineHeight: '1.16' }],
        '8xl': ['6rem', { lineHeight: '1.16' }],
        '9xl': ['8rem', { lineHeight: '1.16' }],
      },
      // Zeilenhöhen
      lineHeight: {
        'tighter': '1.16',
        'tight': '1.25',
        'snug': '1.375',
        'normal': '1.5',
        'relaxed': '1.625',
        'loose': '2',
        'body': '1.5',
        'heading': '1.16',
      },
      // Schriftstärken
      fontWeight: {
        'thin': '100',
        'extralight': '200',
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
        'black': '900',
      },
      // Buchstabenabstände
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.025em',
        'normal': '0em',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
        'headline': '-0.02em', // Speziell für Headlines
        'button': '0.03em',    // Speziell für Buttons
      },
      
      // SPACING-SCALE (für Margins, Paddings, Gaps, etc.)
      spacing: {
        px: '1px',
        0: '0px',
        0.5: '0.125rem',    // 2px
        1: '0.25rem',       // 4px
        1.5: '0.375rem',    // 6px
        2: '0.5rem',        // 8px
        2.5: '0.625rem',    // 10px
        3: '0.75rem',       // 12px
        3.5: '0.875rem',    // 14px
        4: '1rem',          // 16px
        5: '1.25rem',       // 20px
        6: '1.5rem',        // 24px
        7: '1.75rem',       // 28px
        8: '2rem',          // 32px
        9: '2.25rem',       // 36px
        10: '2.5rem',       // 40px
        11: '2.75rem',      // 44px
        12: '3rem',         // 48px
        14: '3.5rem',       // 56px
        16: '4rem',         // 64px
        20: '5rem',         // 80px
        24: '6rem',         // 96px
        28: '7rem',         // 112px
        32: '8rem',         // 128px
        36: '9rem',         // 144px
        40: '10rem',        // 160px
        44: '11rem',        // 176px
        48: '12rem',        // 192px
        52: '13rem',        // 208px
        56: '14rem',        // 224px
        60: '15rem',        // 240px
        64: '16rem',        // 256px
        72: '18rem',        // 288px
        80: '20rem',        // 320px
        96: '24rem',        // 384px
        128: '32rem',       // 512px
      },
      
      // BORDER-RADIUS
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',       // 2px
        'DEFAULT': '0.25rem',   // 4px
        'md': '0.375rem',       // 6px
        'lg': '0.5rem',         // 8px
        'xl': '0.75rem',        // 12px
        '2xl': '1rem',          // 16px
        '3xl': '1.5rem',        // 24px
        'full': '9999px',
        // Spezielle Werte für MindFrame
        'button': '0.375rem',   // 6px - Buttons
        'card': '0.5rem',       // 8px - Cards
        'input': '0.375rem',    // 6px - Inputs
      },
      
      // BOX-SHADOW
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(16, 42, 67, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(16, 42, 67, 0.1), 0 1px 2px 0 rgba(16, 42, 67, 0.06)',
        'md': '0 4px 6px -1px rgba(16, 42, 67, 0.07), 0 2px 4px -1px rgba(16, 42, 67, 0.06)',
        'lg': '0 10px 15px -3px rgba(16, 42, 67, 0.05), 0 4px 6px -2px rgba(16, 42, 67, 0.03)',
        'xl': '0 20px 25px -5px rgba(16, 42, 67, 0.04), 0 10px 10px -5px rgba(16, 42, 67, 0.02)',
        '2xl': '0 25px 50px -12px rgba(16, 42, 67, 0.15)',
        'inner': 'inset 0 2px 4px 0 rgba(16, 42, 67, 0.06)',
        'none': 'none',
        // Spezielle Schatten für MindFrame
        'soft': '0 2px 10px 0 rgba(16, 42, 67, 0.04), 0 2px 5px -2px rgba(16, 42, 67, 0.03)',
        'card': '0 4px 12px -2px rgba(16, 42, 67, 0.03), 0 2px 6px -1px rgba(16, 42, 67, 0.02)',
        'hover': '0 6px 15px -3px rgba(16, 42, 67, 0.06), 0 4px 8px -2px rgba(16, 42, 67, 0.04)',
        'focus': '0 0 0 3px rgba(45, 212, 189, 0.35)', // Türkis-Focus-Ring
        'button': '0 2px 4px 0 rgba(16, 42, 67, 0.08)',
        'button-hover': '0 4px 6px -1px rgba(16, 42, 67, 0.12), 0 2px 4px -1px rgba(16, 42, 67, 0.08)',
      },
      
      // TRANSITION-TOKENS
      transitionProperty: {
        'DEFAULT': 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
        'colors': 'color, background-color, border-color, text-decoration-color, fill, stroke',
        'opacity': 'opacity',
        'shadow': 'box-shadow',
        'transform': 'transform',
        'all': 'all',
        'button': 'color, background-color, border-color, box-shadow, transform', // Speziell für Buttons
        'card': 'box-shadow, transform', // Speziell für Karten
      },
      transitionTimingFunction: {
        'DEFAULT': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'linear': 'linear',
        'in': 'cubic-bezier(0.4, 0, 1, 1)',
        'out': 'cubic-bezier(0, 0, 0.2, 1)',
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)', // Sanfte Übergänge
        'soft': 'cubic-bezier(0.26, 0.54, 0.32, 1)', // Extra sanft
        'bounce': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', // Leicht federnd
      },
      transitionDuration: {
        'DEFAULT': '150ms',
        '75': '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1000ms',
        'fast': '100ms',      // Schnelle Übergänge
        'normal': '200ms',    // Standard-Übergänge
        'slow': '300ms',      // Langsame Übergänge
        'button': '150ms',    // Speziell für Buttons
      },
      transitionDelay: {
        'DEFAULT': '0ms',
        '75': '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1000ms',
      },
      
      // ANIMATION-TOKENS
      animation: {
        'none': 'none',
        'spin': 'spin 1s linear infinite',
        'ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce': 'bounce 1s infinite',
        'fade-in': 'fadeIn 200ms ease-out', // Sanftes Einblenden
        'fade-out': 'fadeOut 200ms ease-in', // Sanftes Ausblenden
        'slide-up': 'slideUp 200ms ease-out', // Von unten einblenden
        'slide-down': 'slideDown 200ms ease-out', // Von oben einblenden
      },
      keyframes: {
        spin: {
          'to': { transform: 'rotate(360deg)' },
        },
        ping: {
          '75%, 100%': { transform: 'scale(2)', opacity: '0' },
        },
        pulse: {
          '50%': { opacity: '.5' },
        },
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      
      // CURSOR-TOKENS für verbesserte Interaktionen
      cursor: {
        'auto': 'auto',
        'default': 'default',
        'pointer': 'pointer',
        'wait': 'wait',
        'text': 'text',
        'move': 'move',
        'help': 'help',
        'not-allowed': 'not-allowed',
        'grabbing': 'grabbing',
        'crosshair': 'crosshair',
        'zoom-in': 'zoom-in',
        'zoom-out': 'zoom-out',
      },
      
      // OPACITY-TOKENS
      opacity: {
        '0': '0',
        '5': '0.05',
        '10': '0.1',
        '15': '0.15', // Zusätzlicher Wert
        '20': '0.2',
        '25': '0.25',
        '30': '0.3',
        '40': '0.4',
        '50': '0.5',
        '60': '0.6',
        '70': '0.7',
        '75': '0.75',
        '80': '0.8',
        '85': '0.85', // Zusätzlicher Wert
        '90': '0.9',
        '95': '0.95',
        '100': '1',
      },
      
      // Z-INDEX-TOKENS
      zIndex: {
        '0': '0',
        '10': '10',
        '20': '20',
        '30': '30',
        '40': '40',
        '50': '50',
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
        'auto': 'auto',
        // Semantische z-index-Werte
        'header': '40',
        'modal': '50',
        'tooltip': '60',
        'dropdown': '30',
      },
    },
  },
  // TAILWIND-PLUGINS
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class', // Nur Styling für Klassen wie 'form-input'
    }),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
};
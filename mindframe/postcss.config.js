/**
 * PostCSS Konfiguration für MindFrame
 * 
 * Diese Konfiguration wird von Vite und anderen Tools verwendet, 
 * um CSS zu transformieren und zu optimieren.
 */
module.exports = {
  plugins: {
    // Unterstützung für verschachtelte CSS-Selektoren
    'postcss-nested': {},
    
    // Tailwind CSS - JIT-Kompilierung
    tailwindcss: {},
    
    // Automatisches Hinzufügen von Vendor-Präfixen
    autoprefixer: {},
    
    // CSS-Minimierung nur in Produktion
    ...(process.env.NODE_ENV === 'production' ? {
      'cssnano': {
        preset: [
          'default', 
          {
            discardComments: {
              removeAll: true,
            },
          }
        ],
      }
    } : {})
  },
};
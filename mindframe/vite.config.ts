import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    // Optimierung für Produktionsbuilds
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendorpakete in eigene Chunks aufteilen
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // State Management in eigenem Chunk
          state: ['@reduxjs/toolkit', 'react-redux'],
        },
      },
    },
  },
  css: {
    // PostCSS Konfiguration (für Tailwind)
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
});
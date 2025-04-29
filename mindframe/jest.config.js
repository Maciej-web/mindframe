/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // Standardmäßig mit ts-jest für TypeScript
  preset: 'ts-jest',
  
  // Wir testen React-Komponenten, daher brauchen wir jsdom
  testEnvironment: 'jsdom',
  
  // Zusätzliche Setup-Dateien, die vor jedem Test ausgeführt werden
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  
  // Transformieren von Dateien
  transform: {
    // TypeScript-Dateien mit ts-jest transformieren
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.jest.json', // Spezielle TypeScript-Konfiguration für Tests
    }],
    // JavaScript-Dateien mit babel-jest transformieren
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  
  // Module-Name-Mapper für Pfadaliasse und Asset-Imports
  moduleNameMapper: {
    // Path-Alias '@/' auf src/ mappen
    '^@/(.*)$': '<rootDir>/src/$1',
    
    // CSS Module-Importe mocken
    '\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    
    // Normale CSS-Importe mocken
    '\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    
    // Bild-Importe mocken
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  
  // Nicht zu transformierende Pfade
  transformIgnorePatterns: [
    '/node_modules/(?!(@?react-router.*|your-es-module-dependency)/)',
  ],
  
  // Zu ignorierende Pfade
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/.storybook/',
  ],
  
  // Dateiendungen, die Jest beachten soll
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  
  // Globale Abdeckungseinstellungen
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/mocks/**/*',
    '!src/**/index.{js,ts}',
    '!src/main.tsx',
    '!src/vite-env.d.ts',
  ],
  
  // Abdeckungsschwellwerte
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  
  // Ordner für Coverage-Bericht
  coverageDirectory: 'coverage',
  
  // Erweitern des Test-Timeouts für langsamere Tests
  testTimeout: 10000,
  
  // Mocking-Einstellungen
  clearMocks: true,
  restoreMocks: true,
  resetMocks: false,
  
  // Test-Match-Muster
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],
  
  // Erweiterte Reporters für CI/CD-Integration
  reporters: [
    'default',
    process.env.CI === 'true' && ['jest-junit', {
      outputDirectory: './test-results/jest',
      outputName: 'results.xml',
    }],
  ].filter(Boolean),
  
  // Wann Jest beenden soll
  testTimeout: 30000,
  bail: 5,
};
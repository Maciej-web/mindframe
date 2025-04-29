// Jest-dom fügt benutzerdefinierte Jest-Matcher für asserting auf DOM-Knoten hinzu.
// Erlaubt Befehle wie:
// expect(element).toHaveTextContent(/react/i)
import '@testing-library/jest-dom';

// Mocking der localStorage-API
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
  writable: true,
});

// Mocking der sessionStorage-API
Object.defineProperty(window, 'sessionStorage', {
  value: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
  writable: true,
});

// Mocking von matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Veraltet
    removeListener: jest.fn(), // Veraltet
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mocking der globalen ResizeObserver-Klasse
global.ResizeObserver = class ResizeObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
};

// Mocking der globalen IntersectionObserver-Klasse
global.IntersectionObserver = class IntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
  trigger = (entries) => this.callback(entries, this);
};

// Mocking der Fetch-API
global.fetch = jest.fn();

// Mocking für Web-Crypto-API (wird von manchen Abhängigkeiten genutzt)
Object.defineProperty(global.self, 'crypto', {
  value: {
    getRandomValues: (arr) => crypto.randomBytes(arr.length),
    subtle: {
      digest: jest.fn().mockResolvedValue(new ArrayBuffer(32)),
    },
  },
});

// Unterdrücken von React-Act-Warnungen
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning: ReactDOM.render is no longer supported in React 18./.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

// Automatisches Löschen von Mocks nach jedem Test
afterEach(() => {
  jest.clearAllMocks();
});
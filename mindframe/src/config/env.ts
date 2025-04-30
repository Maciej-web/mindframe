/**
 * Environment Konfiguration
 * 
 * Importiert Umgebungsvariablen aus .env-Dateien und stellt sie typsicher 
 * für die Anwendung bereit. Zusätzlich gibt es Validierungen und Fallbacks.
 */

// Utility-Funktion zum Überprüfen, ob eine Umgebungsvariable gesetzt ist
const getEnvVar = (key: string, defaultValue?: string): string => {
    const value = import.meta.env[key];
    
    // Wenn keine Umgebungsvariable gefunden wurde
    if (value === undefined) {
      // Falls ein Default-Wert gesetzt ist, verwende diesen
      if (defaultValue !== undefined) {
        return defaultValue;
      }
      
      // Im Development-Modus nur warnen, in anderen Modi einen Fehler werfen
      if (import.meta.env.DEV) {
        console.warn(`Missing environment variable: ${key}`);
        return '';
      } else {
        throw new Error(`Missing required environment variable: ${key}`);
      }
    }
    
    return value;
  };
  
  // App Konfiguration
  export const APP_ENV = getEnvVar('VITE_APP_ENV', 'development');
  export const IS_PRODUCTION = APP_ENV === 'production';
  export const IS_DEVELOPMENT = APP_ENV === 'development';
  export const IS_TEST = APP_ENV === 'test';
  
  // API-Konfiguration
  export const API_BASE_URL = getEnvVar('VITE_API_BASE_URL', 'http://localhost:3000/api');
  
  // Firebase Konfiguration
  export const FIREBASE_CONFIG = {
    apiKey: getEnvVar('VITE_FIREBASE_API_KEY'),
    authDomain: getEnvVar('VITE_FIREBASE_AUTH_DOMAIN'),
    projectId: getEnvVar('VITE_FIREBASE_PROJECT_ID'),
    storageBucket: getEnvVar('VITE_FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: getEnvVar('VITE_FIREBASE_MESSAGING_SENDER_ID'),
    appId: getEnvVar('VITE_FIREBASE_APP_ID'),
  };
  
  // KI-API Konfiguration
  export const OPENAI_API_KEY = getEnvVar('VITE_OPENAI_API_KEY', '');
  export const ANTHROPIC_API_KEY = getEnvVar('VITE_ANTHROPIC_API_KEY', '');
  
  // Payment Konfiguration
  export const STRIPE_PUBLIC_KEY = getEnvVar('VITE_STRIPE_PUBLIC_KEY', '');
  
  // Feature Flags
  export const FEATURE_FLAGS = {
    enableBrainOrganizer: getEnvVar('VITE_FEATURE_BRAIN_ORGANIZER', 'true') === 'true',
    enableDecisionWizard: getEnvVar('VITE_FEATURE_DECISION_WIZARD', 'true') === 'true',
    enableFocusMapper: getEnvVar('VITE_FEATURE_FOCUS_MAPPER', 'true') === 'true',
    enableReflexionslogbuch: getEnvVar('VITE_FEATURE_REFLEXIONSLOGBUCH', 'true') === 'true',
    enableAIFeatures: getEnvVar('VITE_FEATURE_AI_FEATURES', 'true') === 'true',
    enableCollaboration: getEnvVar('VITE_FEATURE_COLLABORATION', 'false') === 'true',
  };
  
  // Export eines einzigen Konfigurationsobjekts für einfacheren Import
  export const config = {
    app: {
      env: APP_ENV,
      isProduction: IS_PRODUCTION,
      isDevelopment: IS_DEVELOPMENT,
      isTest: IS_TEST,
    },
    api: {
      baseUrl: API_BASE_URL,
    },
    firebase: FIREBASE_CONFIG,
    ai: {
      openaiApiKey: OPENAI_API_KEY,
      anthropicApiKey: ANTHROPIC_API_KEY,
    },
    payment: {
      stripePublicKey: STRIPE_PUBLIC_KEY,
    },
    features: FEATURE_FLAGS,
  };
  
  export default config;
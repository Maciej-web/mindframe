# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
# MindFrame

MindFrame ist eine Web-App zur mentalen Klarheit und Entscheidungsunterstützung. Sie bietet KI-gestützte Strukturanalyse und Produktivitätstools.

## Projekt-Überblick

MindFrame hilft Nutzern durch eine Kombination aus eigens entwickelten Modulen:

- **Brain Organizer**: Gedanken strukturieren und clustern
- **Decision Wizard**: Entscheidungsfindung durch systematische Bewertung
- **Focus Mapper**: Ziele definieren und in Meilensteine unterteilen
- **Reflexionslogbuch**: Erfahrungen und Gedanken festhalten

## Tech-Stack

- **Frontend**: React + TypeScript, Tailwind CSS
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **Authentifizierung**: Firebase Auth / Supabase
- **Hosting/CI/CD**: Vercel / Netlify mit GitHub Actions
- **KI-Integration**: OpenAI API (ChatGPT) & Anthropic Claude 3.7
- **Payment**: Stripe
- **Datenbank**: Firebase / Supabase / MongoDB

## Entwicklungsumgebung einrichten

### Voraussetzungen

- Node.js (Version 18 oder höher)
- npm oder yarn
- Git

### Installation

1. Repository klonen:
   ```bash
   git clone https://github.com/your-username/mindframe.git
   cd mindframe
   ```

2. Abhängigkeiten installieren:
   ```bash
   npm install
   ```

3. Entwicklungsserver starten:
   ```bash
   npm run dev
   ```

4. Öffne die App im Browser:
   ```
   http://localhost:5173
   ```

### Weitere Befehle

- **Lint Code**: `npm run lint`
- **Typ-Überprüfung**: `npm run typecheck`
- **Tests ausführen**: `npm run test`
- **Build erstellen**: `npm run build`
- **Storybook starten**: `npm run storybook`
- **Code formatieren**: `npm run format`

## Projekt-Struktur

```
src/
  ├── assets/        # Statische Assets wie Bilder, Schriftarten
  ├── components/    # React-Komponenten
  │     ├── ui/      # Wiederverwendbare UI-Komponenten
  │     ├── layout/  # Layout-Komponenten
  │     └── modules/ # Modulspezifische Komponenten
  ├── context/       # React Context Provider
  ├── hooks/         # Benutzerdefinierte React Hooks
  ├── lib/           # Externe Bibliotheken und Konfigurationen
  ├── pages/         # Seitenkomponenten
  ├── services/      # API-Dienste und externe Integrationen
  ├── store/         # Redux Toolkit Store-Konfiguration
  │     └── slices/  # Redux-Slices für verschiedene Features
  ├── types/         # TypeScript-Typdefinitionen
  └── utils/         # Hilfsfunktionen
```

## Branching-Strategie

- Hauptbranches: `main` (Produktion), `develop` (Entwicklung)
- Feature-Branches: `feature/<modul-name>`
- Bugfix-Branches: `bugfix/<beschreibung>`
- Release-Branches: `release/v<version>`

## Beitragen

1. Forke das Repository
2. Erstelle einen Feature-Branch
3. Committe deine Änderungen mit aussagekräftigen Commit-Nachrichten
4. Öffne einen Pull Request gegen den `develop`-Branch
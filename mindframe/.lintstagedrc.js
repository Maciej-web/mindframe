/**
 * lint-staged Konfiguration für MindFrame
 * 
 * Diese Konfiguration legt fest, welche Befehle für welche Dateitypen 
 * beim Git Pre-Commit-Hook ausgeführt werden sollen.
 */
module.exports = {
    // TypeScript- und JavaScript-Dateien
    "**/*.{ts,tsx,js,jsx}": [
      // ESLint ausführen
      "eslint --fix",
      // Prettier formatieren
      "prettier --write",
      // TypeScript Typenprüfung für geänderte Dateien
      () => "tsc --noEmit",
      // Jest-Tests für geänderte Dateien ausführen
      (filenames) => 
        filenames.map((filename) => 
          filename.includes('src/__tests__') || 
          filename.includes('.test.') || 
          filename.includes('.spec.') 
            ? `jest --findRelatedTests ${filename}` 
            : ''),
    ],
    // Styles und Markup
    "**/*.{css,scss,html}": [
      "prettier --write",
    ],
    // JSON, Markdown, YAML Dateien
    "**/*.{json,md,yml,yaml}": [
      "prettier --write",
    ],
    // Alle Dateien - Prüfen auf ausversehen eingecheckte Konfliktmarkierungen
    "**/*": [
      "bash -c 'if grep -l \"^<<<<<<< \" $0; then echo \"Conflict markers found in $0. Please resolve conflicts before committing.\"; exit 1; fi'",
    ],
  };
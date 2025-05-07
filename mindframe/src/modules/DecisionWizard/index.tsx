// src/modules/DecisionWizard/index.tsx

import React from 'react';
import DecisionWizardRoutes from './routes';

/**
 * Hauptexport-Komponente des Decision Wizard-Moduls
 * Dient als Einstiegspunkt für das Modul
 */
const DecisionWizard: React.FC = () => {
  return <DecisionWizardRoutes />;
};

export default DecisionWizard;
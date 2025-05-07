// src/modules/DecisionWizard/routes.tsx

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DecisionList from './pages/DecisionList';
import DecisionEdit from './pages/DecisionEdit';
import DecisionMatrix from './pages/DecisionMatrix';
import DecisionResult from './pages/DecisionResult';

/**
 * Router-Komponente für das Decision Wizard-Modul
 * Verwaltet die verschachtelten Routen innerhalb des Moduls
 */
const DecisionWizardRoutes: React.FC = () => {
  return (
    <Routes>
      <Route index element={<DecisionList />} />
      <Route path="new" element={<DecisionEdit />} />
      <Route path=":id/edit" element={<DecisionEdit />} />
      <Route path=":id/matrix" element={<DecisionMatrix />} />
      <Route path=":id/result" element={<DecisionResult />} />
    </Routes>
  );
};

export default DecisionWizardRoutes;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import './index.css';


// Placeholder-Komponenten für die anderen Seiten
const BrainOrganizer = () => (
  <div className="h-full flex items-center justify-center">
    <h1 className="text-2xl font-bold">Brain Organizer Modul wird geladen...</h1>
  </div>
);

const DecisionWizard = () => (
  <div className="h-full flex items-center justify-center">
    <h1 className="text-2xl font-bold">Decision Wizard Modul wird geladen...</h1>
  </div>
);

const FocusMapper = () => (
  <div className="h-full flex items-center justify-center">
    <h1 className="text-2xl font-bold">Focus Mapper Modul wird geladen...</h1>
  </div>
);

const Reflexionslogbuch = () => (
  <div className="h-full flex items-center justify-center">
    <h1 className="text-2xl font-bold">Reflexionslogbuch Modul wird geladen...</h1>
  </div>
);

const Settings = () => (
  <div className="h-full flex items-center justify-center">
    <h1 className="text-2xl font-bold">Einstellungen werden geladen...</h1>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/brain-organizer" element={<BrainOrganizer />} />
        <Route path="/decision-wizard" element={<DecisionWizard />} />
        <Route path="/focus-mapper" element={<FocusMapper />} />
        <Route path="/reflexionslogbuch" element={<Reflexionslogbuch />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
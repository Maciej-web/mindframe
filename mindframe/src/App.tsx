// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';

// Layout-Komponenten
import Dashboard from './pages/Dashboard';
import './index.css';

// Auth-Module
import Login from './modules/Auth/Login.tsx';
import Register from './modules/Auth/Register.tsx';
import ForgotPassword from './modules/Auth/ForgotPassword.tsx';
import Profile from './modules/Auth/Profile.tsx';
import Settings from './modules/Auth/Settings.tsx';

// Placeholder für weitere Module
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

function App() {
  return (
    <Router>
      <Routes>
        {/* Öffentliche Routen */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Geschützte Routen */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/brain-organizer" element={<BrainOrganizer />} />
          <Route path="/decision-wizard" element={<DecisionWizard />} />
          <Route path="/focus-mapper" element={<FocusMapper />} />
          <Route path="/reflexionslogbuch" element={<Reflexionslogbuch />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* Standardumleitung */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* 404-Seite */}
        <Route
          path="*"
          element={
            <div className="h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <p className="mb-6">Die angeforderte Seite wurde nicht gefunden.</p>
                <a
                  href="/"
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
                >
                  Zurück zur Startseite
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

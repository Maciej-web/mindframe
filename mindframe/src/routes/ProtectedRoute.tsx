// src/routes/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectIsAuthenticated, selectAuthStatus } from '@/store/authSlice';
import { useAppSelector } from '@/store';

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

/**
 * Geschützte Route-Komponente
 * Leitet zur Login-Seite um, wenn der Benutzer nicht authentifiziert ist
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const status = useAppSelector(selectAuthStatus);
  const isLoading = status === 'loading';

  // Zeige Ladeindikator, während der Auth-Status überprüft wird
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Wenn nicht authentifiziert, zur Login-Seite umleiten und aktuelle Route als Redirect speichern
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname, message: 'Bitte melden Sie sich an, um fortzufahren.' }} replace />;
  }

  // Wenn authentifiziert, entweder die Kind-Komponente oder den Outlet (für verschachtelte Routen) rendern
  return <>{children ? children : <Outlet />}</>;
};

export default ProtectedRoute;
// src/hooks/useAuth.ts
import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  login,
  register,
  logout,
  clearAuthError,
  selectUser,
  selectAuthStatus,
  selectAuthError,
  selectIsAuthenticated,
  type LoginPayload,
  type RegisterPayload
} from '../store/authSlice';
import { useAppDispatch, useAppSelector } from '@/store';
import authService from '@/services/authService';

interface LocationState {
  from?: string;
  message?: string;
}

/**
 * Hook für Auth-Funktionalitäten
 * Bietet eine einfache API für Login, Registrierung, Logout etc.
 */
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const user = useAppSelector(selectUser);
  const status = useAppSelector(selectAuthStatus);
  const error = useAppSelector(selectAuthError);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  
  const isLoading = status === 'loading';
  
  // Login mit E-Mail und Passwort
  const handleLogin = useCallback(async (credentials: LoginPayload) => {
    try {
      await dispatch(login(credentials)).unwrap();
      const state = location.state as LocationState;
      const from = state?.from || '/dashboard';
      navigate(from, { replace: true });
      return true;
    } catch (error) {
      return false;
    }
  }, [dispatch, navigate, location]);

  // Registrierung eines neuen Benutzers
  const handleRegister = useCallback(async (userData: RegisterPayload) => {
    try {
      await dispatch(register(userData)).unwrap();
      navigate('/dashboard');
      return true;
    } catch (error) {
      return false;
    }
  }, [dispatch, navigate]);

  // Passwort-Reset E-Mail senden
  const handleResetPassword = useCallback(async (email: string) => {
    try {
      await authService.resetPassword(email);
      navigate('/login', { state: { message: 'Eine E-Mail zum Zurücksetzen des Passworts wurde gesendet.' } });
      return true;
    } catch (error) {
      return false;
    }
  }, [navigate]);

  // Benutzer ausloggen
  const handleLogout = useCallback(async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate('/login');
      return true;
    } catch (error) {
      return false;
    }
  }, [dispatch, navigate]);

  // Fehler zurücksetzen
  const handleClearError = useCallback(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    status,
    login: handleLogin,
    register: handleRegister,
    resetPassword: handleResetPassword,
    logout: handleLogout,
    clearError: handleClearError
  };
};
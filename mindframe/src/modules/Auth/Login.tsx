import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  login,
  selectAuthError,
  selectAuthStatus,
  clearAuthError,
  selectIsAuthenticated,
} from '../../store/authSlice';

import logo from '../../assets/logo.png'; // ⚠️ Stelle sicher, dass logo.png existiert

interface LocationState {
  from?: string;
  message?: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const error = useAppSelector(selectAuthError);
  const status = useAppSelector(selectAuthStatus);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = status === 'loading';

  const locationState = location.state as LocationState;
  const redirectMessage = locationState?.message;

  useEffect(() => {
    if (isAuthenticated) {
      const from = locationState?.from || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, locationState]);

  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || isLoading) return;
    await dispatch(login({ email, password }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="MindFrame Logo" className="h-16" />
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-card shadow-card p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-navy-900 mb-2">
              Willkommen zurück bei <span className="text-primary">MindFrame</span>
            </h1>
            <p className="text-navy-600 text-sm">
              Melde dich an, um deine mentale Klarheit zu verbessern
            </p>
          </div>

          {redirectMessage && (
            <div className="bg-yellow-50 text-yellow-800 rounded-md p-3 mb-4 text-sm text-center">
              {redirectMessage}
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-700 rounded-md p-3 mb-4 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1">E-Mail-Adresse</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                placeholder="deine@email.de"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1">Passwort</label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 text-navy-700">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-4 w-4 text-primary border-gray-300 rounded"
                />
                <span>Angemeldet bleiben</span>
              </label>

              <Link
                to="/forgot-password"
                className="text-primary hover:text-primary-hover font-medium"
              >
                Passwort vergessen?
              </Link>
            </div>

            <button
              type="submit"
              className={`w-full py-2 px-4 text-white rounded-md font-medium bg-primary hover:bg-primary-hover transition-colors ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Wird geladen...' : 'Anmelden'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-navy-600">
            Noch keinen Account?{' '}
            <Link to="/register" className="text-primary hover:text-primary-hover font-medium">
              Jetzt registrieren
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

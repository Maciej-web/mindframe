// src/modules/Auth/Register.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { 
  register, 
  selectAuthError, 
  selectAuthStatus, 
  clearAuthError, 
  selectIsAuthenticated 
} from '../../store/authSlice';
import logo from '../../assets/logo.png'; // <- Passe den Pfad ggf. an

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const error = useAppSelector(selectAuthError);
  const status = useAppSelector(selectAuthStatus);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = status === 'loading';

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => { dispatch(clearAuthError()); };
  }, [dispatch]);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!email || !/\S+@\S+\.\S+/.test(email)) errors.email = 'Gültige E-Mail erforderlich';
    if (password.length < 6) errors.password = 'Mind. 6 Zeichen';
    if (password !== confirmPassword) errors.confirmPassword = 'Passwörter stimmen nicht überein';
    if (!acceptTerms) errors.acceptTerms = 'Nutzungsbedingungen akzeptieren';
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) return setFormErrors(errors);
    await dispatch(register({ email, password, displayName }));
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="MindFrame Logo" className="h-16" />
        </div>

        <div className="bg-white rounded-card shadow-card p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Konto erstellen bei <span className="text-primary">MindFrame</span>
            </h1>
            <p className="text-gray-600">Starte deine Reise zur mentalen Klarheit</p>
          </div>

          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-100 p-3 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Anzeigename (optional)</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">E-Mail-Adresse</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
              {formErrors.email && <p className="text-red-600 text-sm mt-1">{formErrors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Passwort</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
              {formErrors.password && <p className="text-red-600 text-sm mt-1">{formErrors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Passwort bestätigen</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
              {formErrors.confirmPassword && <p className="text-red-600 text-sm mt-1">{formErrors.confirmPassword}</p>}
            </div>

            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label className="text-sm text-gray-700">
                Ich akzeptiere die{' '}
                <Link to="/terms" className="text-primary hover:text-primary-hover">Nutzungsbedingungen</Link>{' '}
                und{' '}
                <Link to="/privacy" className="text-primary hover:text-primary-hover">Datenschutzrichtlinien</Link>
              </label>
            </div>
            {formErrors.acceptTerms && <p className="text-red-600 text-sm mt-1">{formErrors.acceptTerms}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 rounded-md text-white text-sm font-medium bg-primary hover:bg-primary-hover transition ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Registriere...' : 'Registrieren'}
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Bereits registriert?{' '}
            <Link to="/login" className="text-primary hover:text-primary-hover font-medium">
              Anmelden
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

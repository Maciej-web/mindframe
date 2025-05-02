// src/modules/Auth/ForgotPassword.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import logo from '../../assets/logo.png'; // Pfad anpassen falls nötig

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Bitte gib eine gültige E-Mail-Adresse ein');
      return;
    }

    setError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      await resetPassword(email);
      setSuccessMessage(`Eine E-Mail zum Zurücksetzen deines Passworts wurde an ${email} gesendet.`);
      setTimeout(() => {
        navigate('/login', {
          state: { message: `Eine E-Mail zum Zurücksetzen deines Passworts wurde an ${email} gesendet.` }
        });
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Etwas ist schiefgelaufen. Bitte versuch es später erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="MindFrame Logo" className="h-16" />
        </div>

        <div className="bg-white rounded-card shadow-card p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Passwort vergessen?</h1>
            <p className="text-gray-600 text-sm">
              Gib deine E-Mail-Adresse ein, um einen Link zum Zurücksetzen deines Passworts zu erhalten.
            </p>
          </div>

          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-100 p-3 rounded">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="mb-4 text-sm text-green-700 bg-green-100 p-3 rounded">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">E-Mail-Adresse</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                placeholder="deine.email@beispiel.de"
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center py-2 px-4 rounded-md text-white text-sm font-medium bg-primary hover:bg-primary-hover transition ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Sende E-Mail...' : 'Passwort zurücksetzen'}
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            <Link to="/login" className="text-primary hover:text-primary-hover font-medium">
              Zurück zur Anmeldung
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

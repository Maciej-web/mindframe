import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { selectSettings, setSettings, initialSettings } from '../../store/authSlice';
import type { Settings as SettingsType } from '../../store/authSlice';
import { useAuth } from '../../hooks/useAuth';
import MainLayout from '../../components/layout/MainLayout';

const Settings: React.FC = () => {
  const { user, logout } = useAuth();
  const dispatch = useAppDispatch();
  const settings = useAppSelector(selectSettings);

  // Fallback auf initialSettings, falls selectSettings mal undefined liefert
  const {
    theme: initTheme,
    language: initLang,
    notifyEmail: initEmail,
    notifyPush: initPush,
  } = settings ?? initialSettings;

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [theme, setTheme] = useState<SettingsType['theme']>(initTheme);
  const [language, setLanguage] = useState<SettingsType['language']>(initLang);
  const [notifyEmail, setNotifyEmail] = useState(initEmail);
  const [notifyPush, setNotifyPush] = useState(initPush);
  const [isUpdating, setIsUpdating] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    // Hier könnte man echte API-Aufrufe machen
  }, []);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || newPassword !== confirmPassword || newPassword.length < 6) {
      setPasswordError('Bitte geben Sie gültige Passwörter ein.');
      return;
    }
    setPasswordError(null);
    setIsChangingPassword(true);
    await new Promise(res => setTimeout(res, 1000));
    setPasswordSuccess('Passwort erfolgreich geändert.');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setIsChangingPassword(false);
    setTimeout(() => setPasswordSuccess(null), 5000);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    dispatch(setSettings({ theme, language, notifyEmail, notifyPush }));
    await new Promise(res => setTimeout(res, 500));
    setIsUpdating(false);
    setSuccessMessage('Einstellungen erfolgreich gespeichert.');
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const handleLogout = () => logout();

  return (
    <MainLayout title="Einstellungen" subtitle="Verwalte dein Profil, Passwort und deine Präferenzen">
      <div className="space-y-8">
        {/* Passwort ändern */}
        <div className="bg-white border border-gray-100 rounded-card shadow-card p-6">
          <h2 className="text-lg font-semibold text-navy-900 mb-4">Passwort ändern</h2>
          {passwordError && <p className="text-red-600 mb-2">{passwordError}</p>}
          {passwordSuccess && <p className="text-green-600 mb-2">{passwordSuccess}</p>}

          <form onSubmit={handleChangePassword} className="space-y-4">
            <input
              type="password"
              placeholder="Aktuelles Passwort"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Neues Passwort"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Passwort bestätigen"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
            <button
              type="submit"
              disabled={isChangingPassword}
              className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-md w-full"
            >
              {isChangingPassword ? 'Ändere Passwort...' : 'Passwort ändern'}
            </button>
          </form>
        </div>

        {/* Anzeigeeinstellungen */}
        <div className="bg-white border border-gray-100 rounded-card shadow-card p-6">
          <h2 className="text-lg font-semibold text-navy-900 mb-4">Anzeigeeinstellungen</h2>
          {successMessage && <p className="text-green-600 mb-2">{successMessage}</p>}

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
              <select
                value={theme}
                onChange={e => setTheme(e.target.value as SettingsType['theme'])}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="light">Hell</option>
                <option value="dark">Dunkel</option>
                <option value="system">Systemeinstellung</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sprache</label>
              <select
                value={language}
                onChange={e => setLanguage(e.target.value as SettingsType['language'])}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="de">Deutsch</option>
                <option value="en">Englisch</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Benachrichtigungen</label>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={notifyEmail}
                  onChange={e => setNotifyEmail(e.target.checked)}
                  className="h-4 w-4 text-primary border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">E-Mail</span>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={notifyPush}
                  onChange={e => setNotifyPush(e.target.checked)}
                  className="h-4 w-4 text-primary border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Push</span>
              </div>
            </div>
            <button
              type="submit"
              disabled={isUpdating}
              className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-md w-full"
            >
              {isUpdating ? 'Speichern...' : 'Einstellungen speichern'}
            </button>
          </form>
        </div>

        {/* Abmelden */}
        <div className="bg-white border border-gray-100 rounded-card shadow-card p-6">
          <h2 className="text-lg font-semibold text-red-600 mb-4">Abmelden</h2>
          <p className="text-sm text-gray-600 mb-4">
            Du wirst zur Login-Seite weitergeleitet und musst dich erneut anmelden.
          </p>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md w-full"
          >
            Abmelden
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;

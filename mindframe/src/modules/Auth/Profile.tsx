// src/modules/Auth/Profile.tsx
import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../store';
import { selectUser, setUser, setProfileData } from '../../store/authSlice';
import authService from '../../services/authService';
import MainLayout from '@/components/layout/MainLayout';

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      setPhotoURL(user.photoURL || '');
    }
  }, [user]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoURL(reader.result as string); // base64-Vorschau
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await authService.updateProfile(user.id, {
        displayName,
        photoURL,
      });

      dispatch(setProfileData({ displayName, photoURL }));

      setSuccessMessage('Profil erfolgreich aktualisiert');
      setIsEditing(false);

      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      setError(err.message || 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setDisplayName(user.displayName || '');
      setPhotoURL(user.photoURL || '');
    }
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="flex justify-center p-8">
        <p className="text-lg text-gray-700">Benutzer nicht angemeldet</p>
      </div>
    );
  }

  return (
    <MainLayout title="Profil" subtitle="Verwalte deine Profildaten">
      <div className="space-y-8">
        {(successMessage || error) && (
          <div className={`p-4 rounded-md text-sm ${error ? 'bg-red-50 text-red-800 border border-red-200' : 'bg-green-50 text-green-800 border border-green-200'}`}>
            {error || successMessage}
          </div>
        )}

        <div className="bg-white border border-gray-100 rounded-card shadow-card p-6">
          <h2 className="text-lg font-semibold text-navy-900 mb-4">Benutzerdaten</h2>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Profilbild */}
            <div className="md:w-1/3 flex flex-col items-center">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-200 mb-2">
                {photoURL ? (
                  <img src={photoURL} alt="Profil" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
                    Kein Bild
                  </div>
                )}
              </div>

              {isEditing && (
                <>
                  <label htmlFor="photoUpload" className="text-sm text-gray-600 mb-1">Bild hochladen</label>
                  <input
                    type="file"
                    id="photoUpload"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="block w-full text-sm text-gray-500"
                  />
                </>
              )}
            </div>

            {/* Name & Email */}
            <div className="md:w-2/3 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-Mail</label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                ) : (
                  <div className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-900">
                    {displayName || '(Kein Name angegeben)'}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6 gap-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-sm rounded-md bg-white border border-gray-300 hover:bg-gray-50"
                >
                  Abbrechen
                </button>
                <button
                  onClick={handleSaveProfile}
                  disabled={isLoading}
                  className={`px-4 py-2 text-sm rounded-md text-white ${isLoading ? 'bg-primary/60 cursor-not-allowed' : 'bg-primary hover:bg-primary-hover'}`}
                >
                  {isLoading ? 'Speichern...' : 'Speichern'}
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 text-sm rounded-md text-white bg-primary hover:bg-primary-hover"
              >
                Bearbeiten
              </button>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;

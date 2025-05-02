// src/InitApp.tsx
import { useEffect } from 'react';
import { useAppDispatch } from './store';
import { setUser } from './store/authSlice';
import authService from './services/authService';
import App from './App';

/**
 * Initialisiert App nach Laden des Redux-Stores
 */
const InitApp = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const init = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          dispatch(setUser(currentUser));
        }
      } catch (error) {
        console.error('Error during auth init:', error);
      }
    };

    init();
  }, [dispatch]);

  return <App />;
};

export default InitApp;

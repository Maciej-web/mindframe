import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlice';
import brainOrganizerReducer from '../modules/BrainOrganizer/store/BrainOrganizerSlice';


// Zentrale Persistenz-Konfiguration
const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Nur Auth wird auf Root-Ebene persistiert
};

// Auth-spezifische Persistence-Konfiguration
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user'], // Nur der User wird persistiert
};

// Root Reducer mit allen Modul-Reducern
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  brainOrganizer: brainOrganizerReducer,
});

// Konfiguriere den Store mit Middleware und Persistenz
export const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignoriere Redux-Persist Actions, um Serialisierungsprobleme zu vermeiden
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    devTools: true, // ✅ HIER aktivierst du Redux DevTools
});

export const persistor = persistStore(store);

// Typdefinitionen für State und Dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Vordefinierte Hooks für typsichere Redux-Verwendung
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
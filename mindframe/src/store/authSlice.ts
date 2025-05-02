import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';

// Pseudo-Service für Auth
const authService = {
  login: async ({ email, password }: LoginPayload): Promise<User> => {
    await new Promise(res => setTimeout(res, 500));
    if (!email || !password) throw new Error('Email and password are required');
    if (password.length < 6) throw new Error('Password must be at least 6 characters');
    return {
      id: 'user123',
      email,
      displayName: email.split('@')[0],
      photoURL: null,
    };
  },
  logout: async (): Promise<void> => {
    await new Promise(res => setTimeout(res, 300));
  },
  register: async ({ email, password, displayName }: RegisterPayload): Promise<User> => {
    await new Promise(res => setTimeout(res, 800));
    if (!email || !password) throw new Error('Email and password are required');
    if (password.length < 6) throw new Error('Password must be at least 6 characters');
    return {
      id: `user_${Date.now()}`,
      email,
      displayName: displayName || email.split('@')[0],
      photoURL: null,
    };
  },
};

export interface User {
  id: string;
  email: string;
  displayName?: string | null;
  photoURL?: string | null;
}

export interface Settings {
  theme: 'light' | 'dark' | 'system';
  language: 'de' | 'en';
  notifyEmail: boolean;
  notifyPush: boolean;
}

// **Neues, separat exportiertes Default-Objekt für Settings**
export const initialSettings: Settings = {
  theme: 'system',
  language: 'de',
  notifyEmail: true,
  notifyPush: true,
};

export interface AuthState {
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  settings: Settings;
}

// **Einzige** `initialState`-Deklaration
const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
  settings: initialSettings,
};

// Async Thunks (login, logout, register) bleiben unverändert
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginPayload, { rejectWithValue }) => {
    try {
      return await authService.login(credentials);
    } catch (err: any) {
      return rejectWithValue(err.message || 'Login failed');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await authService.logout();
    return true;
  } catch (err: any) {
    return rejectWithValue(err.message || 'Logout failed');
  }
});

export const register = createAsyncThunk(
  'auth/register',
  async (data: RegisterPayload, { rejectWithValue }) => {
    try {
      return await authService.register(data);
    } catch (err: any) {
      return rejectWithValue(err.message || 'Registration failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    setProfileData(state, action: PayloadAction<{ displayName?: string; photoURL?: string | null }>) {
      if (state.user) {
        state.user.displayName = action.payload.displayName ?? state.user.displayName;
        state.user.photoURL = action.payload.photoURL ?? state.user.photoURL;
      }
    },
    setSettings(state, action: PayloadAction<Settings>) {
      state.settings = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.user = payload;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload as string;
      })
      .addCase(logout.pending, state => {
        state.status = 'loading';
      })
      .addCase(logout.fulfilled, state => {
        state.status = 'idle';
        state.user = null;
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload as string;
      })
      .addCase(register.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.user = payload;
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload as string;
      });
  },
});

// Safe Selector mit Fallback
export const selectSettings = (state: RootState) => state.auth?.settings ?? initialSettings;

export const selectUser = (state: RootState) => state.auth.user;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectIsAuthenticated = (state: RootState) => Boolean(state.auth.user);
export const selectIsLoading = (state: RootState) => state.auth.status === 'loading';

export default authSlice.reducer;
export const { clearAuthError, setUser, setProfileData, setSettings } = authSlice.actions;

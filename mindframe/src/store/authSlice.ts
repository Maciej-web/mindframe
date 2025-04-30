import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';

// Pseudo-Service für Auth (wird später durch Firebase/Supabase ersetzt)
const authService = {
  login: async ({ email, password }: LoginPayload): Promise<User> => {
    // Simuliert einen API-Call mit 500ms Verzögerung
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
    
    // Simuliere erfolgreichen Login
    return {
      id: 'user123',
      email,
      displayName: email.split('@')[0],
      photoURL: null,
    };
  },
  
  logout: async (): Promise<void> => {
    // Simuliert einen API-Call mit 300ms Verzögerung
    await new Promise(resolve => setTimeout(resolve, 300));
    return;
  },
  
  register: async ({ email, password, displayName }: RegisterPayload): Promise<User> => {
    // Simuliert einen API-Call mit 800ms Verzögerung
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
    
    // Simuliere erfolgreiche Registrierung
    return {
      id: `user_${Date.now()}`,
      email,
      displayName: displayName || email.split('@')[0],
      photoURL: null,
    };
  }
};

// Typen für Auth State und Payloads
export interface User {
  id: string;
  email: string;
  displayName?: string | null;
  photoURL?: string | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  displayName?: string;
}

export interface AuthState {
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initialer State
const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
};

// Async Thunks für Auth-Operationen
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginPayload, { rejectWithValue }) => {
    try {
      const user = await authService.login(credentials);
      // In der tatsächlichen Implementierung würden wir hier 
      // Firebase/Supabase Token im localStorage speichern
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      // In der tatsächlichen Implementierung würden wir hier 
      // Firebase/Supabase Token aus localStorage entfernen
      return true;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Logout failed');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData: RegisterPayload, { rejectWithValue }) => {
    try {
      const user = await authService.register(userData);
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

// Auth Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Zusätzliche synchrone Reducer für UI-Zustände
    clearAuthError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      
      // Logout
      .addCase(logout.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'idle';
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      
      // Register
      .addCase(register.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

// Actions exportieren
export const { clearAuthError, setUser } = authSlice.actions;

// Selectors
// Einfache Selektoren, die direkt auf state.auth zugreifen
export const selectUser = (state: RootState) => state.auth.user;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectIsAuthenticated = (state: RootState) => !!state.auth.user;
export const selectIsLoading = (state: RootState) => state.auth.status === 'loading';

export default authSlice.reducer;
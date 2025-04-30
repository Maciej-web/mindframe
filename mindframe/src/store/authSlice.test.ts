import { configureStore } from '@reduxjs/toolkit';
import authReducer, { 
  login, 
  logout,
  register,
  clearAuthError, 
  setUser,
  LoginPayload,
  RegisterPayload,
  User,
  AuthState 
} from './authSlice';

// Mock für authService
jest.mock('../services/authService', () => ({
  login: jest.fn(),
  logout: jest.fn(),
  register: jest.fn()
}));

const authService = require('../services/authService');

describe('Auth Slice', () => {
  let store: ReturnType<typeof configureStore>;
  
  beforeEach(() => {
    store = configureStore({
      reducer: { auth: authReducer },
    });
    
    // Reset mocks
    jest.clearAllMocks();
  });
  
  it('should handle initial state', () => {
    expect(store.getState().auth).toEqual({
      user: null,
      status: 'idle',
      error: null,
    });
  });
  
  describe('synchronous actions', () => {
    it('should clear error when clearAuthError is dispatched', () => {
      // Arrange - set up initial error state
      store.dispatch({ 
        type: 'auth/login/rejected', 
        payload: 'Test error message' 
      });
      
      // Assert - verify error exists
      expect(store.getState().auth.error).toBe('Test error message');
      
      // Act - clear error
      store.dispatch(clearAuthError());
      
      // Assert - verify error was cleared
      expect(store.getState().auth.error).toBeNull();
    });
    
    it('should set user when setUser is dispatched', () => {
      // Arrange - test user
      const testUser: User = { 
        id: 'test123', 
        email: 'test@example.com', 
        displayName: 'Test User' 
      };
      
      // Act - set user
      store.dispatch(setUser(testUser));
      
      // Assert - verify user was set
      expect(store.getState().auth.user).toEqual(testUser);
    });
  });
  
  describe('thunk actions', () => {
    // Login Thunk Tests
    describe('login thunk', () => {
      const credentials: LoginPayload = { 
        email: 'test@example.com', 
        password: 'password123' 
      };
      
      const testUser: User = { 
        id: 'user123', 
        email: 'test@example.com', 
        displayName: 'Test User' 
      };
      
      it('should handle successful login', async () => {
        // Arrange - mock service response
        authService.login.mockResolvedValueOnce(testUser);
        
        // Act - dispatch thunk
        await store.dispatch(login(credentials));
        
        // Assert - verify state changes
        expect(store.getState().auth.user).toEqual(testUser);
        expect(store.getState().auth.status).toBe('succeeded');
        expect(store.getState().auth.error).toBeNull();
        
        // Assert - verify service was called correctly
        expect(authService.login).toHaveBeenCalledWith(credentials);
      });
      
      it('should handle login failure', async () => {
        // Arrange - mock service failure
        const errorMessage = 'Invalid credentials';
        authService.login.mockRejectedValueOnce(new Error(errorMessage));
        
        // Act - dispatch thunk
        await store.dispatch(login(credentials));
        
        // Assert - verify state changes
        expect(store.getState().auth.user).toBeNull();
        expect(store.getState().auth.status).toBe('failed');
        expect(store.getState().auth.error).toBe(errorMessage);
      });
      
      // Snapshot test for login sequence
      it('should match snapshot for login sequence', async () => {
        // Arrange - mock service response
        authService.login.mockResolvedValueOnce(testUser);
        
        // Start capturing state
        const states: AuthState[] = [];
        
        // Initial state
        states.push({...store.getState().auth});
        
        // Act - dispatch thunk
        const action = store.dispatch(login(credentials));
        
        // Pending state
        states.push({...store.getState().auth});
        
        // Wait for action to complete
        await action;
        
        // Final state
        states.push({...store.getState().auth});
        
        // Assert - verify state sequence
        expect(states).toMatchSnapshot();
      });
    });
    
    // Logout Thunk Tests
    describe('logout thunk', () => {
      it('should handle successful logout', async () => {
        // Arrange - set logged in state
        store.dispatch(setUser({ 
          id: 'user123', 
          email: 'test@example.com' 
        }));
        
        // Mock service response
        authService.logout.mockResolvedValueOnce(undefined);
        
        // Act - dispatch thunk
        await store.dispatch(logout());
        
        // Assert - verify state changes
        expect(store.getState().auth.user).toBeNull();
        expect(store.getState().auth.status).toBe('idle');
        expect(store.getState().auth.error).toBeNull();
      });
      
      it('should handle logout failure', async () => {
        // Arrange - set logged in state
        store.dispatch(setUser({ 
          id: 'user123', 
          email: 'test@example.com' 
        }));
        
        // Mock service failure
        const errorMessage = 'Network error';
        authService.logout.mockRejectedValueOnce(new Error(errorMessage));
        
        // Act - dispatch thunk
        await store.dispatch(logout());
        
        // Assert - verify state changes
        expect(store.getState().auth.status).toBe('failed');
        expect(store.getState().auth.error).toBe(errorMessage);
        // User should still be present on logout failure
        expect(store.getState().auth.user).not.toBeNull();
      });
    });
    
    // Register Thunk Tests
    describe('register thunk', () => {
      const userData: RegisterPayload = { 
        email: 'newuser@example.com', 
        password: 'password123',
        displayName: 'New User'
      };
      
      const newUser: User = { 
        id: 'new123', 
        email: 'newuser@example.com', 
        displayName: 'New User' 
      };
      
      it('should handle successful registration', async () => {
        // Arrange - mock service response
        authService.register.mockResolvedValueOnce(newUser);
        
        // Act - dispatch thunk
        await store.dispatch(register(userData));
        
        // Assert - verify state changes
        expect(store.getState().auth.user).toEqual(newUser);
        expect(store.getState().auth.status).toBe('succeeded');
        expect(store.getState().auth.error).toBeNull();
      });
      
      it('should handle registration failure', async () => {
        // Arrange - mock service failure
        const errorMessage = 'Email already in use';
        authService.register.mockRejectedValueOnce(new Error(errorMessage));
        
        // Act - dispatch thunk
        await store.dispatch(register(userData));
        
        // Assert - verify state changes
        expect(store.getState().auth.user).toBeNull();
        expect(store.getState().auth.status).toBe('failed');
        expect(store.getState().auth.error).toBe(errorMessage);
      });
    });
  });
  
  describe('reducer actions', () => {
    it('should set status to loading when login is pending', () => {
      // Act - dispatch pending action
      store.dispatch({ type: 'auth/login/pending' });
      
      // Assert - verify status updated
      expect(store.getState().auth.status).toBe('loading');
      expect(store.getState().auth.error).toBeNull();
    });
    
    it('should set user and status when login succeeds', () => {
      // Arrange - test user
      const testUser = { 
        id: 'test123', 
        email: 'test@example.com', 
        displayName: 'Test User' 
      };
      
      // Act - dispatch fulfilled action
      store.dispatch({ 
        type: 'auth/login/fulfilled', 
        payload: testUser 
      });
      
      // Assert - verify user and status updated
      expect(store.getState().auth.status).toBe('succeeded');
      expect(store.getState().auth.user).toEqual(testUser);
    });
    
    it('should set error and status when login fails', () => {
      // Act - dispatch rejected action
      store.dispatch({ 
        type: 'auth/login/rejected', 
        payload: 'Invalid credentials' 
      });
      
      // Assert - verify error and status updated
      expect(store.getState().auth.status).toBe('failed');
      expect(store.getState().auth.error).toBe('Invalid credentials');
    });
    
    it('should clear user when logout succeeds', () => {
      // Arrange - set up logged in state
      store.dispatch({ 
        type: 'auth/login/fulfilled', 
        payload: { id: 'test123', email: 'test@example.com' } 
      });
      
      // Assert - verify user is set
      expect(store.getState().auth.user).not.toBeNull();
      
      // Act - dispatch logout fulfilled action
      store.dispatch({ type: 'auth/logout/fulfilled' });
      
      // Assert - verify user was cleared
      expect(store.getState().auth.user).toBeNull();
      expect(store.getState().auth.status).toBe('idle');
    });
  });
});
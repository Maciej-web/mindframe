// Base URL for API calls
const API_URL = 'https://api.mindframe.app/v1'; // Change this to your actual API URL

// Generic request function
async function request(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  
  // Set default headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Get token from localStorage if it exists
  const token = localStorage.getItem('token');
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Make the request
  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Parse the JSON response
    const data = await response.json();

    // Check if request was successful
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// API functions
export const api = {
  // Auth endpoints
  auth: {
    login: (credentials) => request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
    register: (userData) => request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
    logout: () => {
      localStorage.removeItem('token');
      return Promise.resolve();
    },
  },
  
  // User endpoints
  user: {
    getProfile: () => request('/user/profile'),
    updateProfile: (data) => request('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  },
  
  // Other endpoints can be added here as needed
};

export default api;
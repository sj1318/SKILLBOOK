
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle authentication errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (credentials) => {
    try {
      console.log('Attempting login with:', credentials.email);
      const response = await api.post('/api/auth/login', credentials);
      console.log('Login response:', response.data);
      return {
        success: true,
        token: response.data.token,
        user: response.data.user
      };
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.error || 'Login failed'
      };
    }
  },

  register: async (userData) => {
    try {
      console.log('Attempting registration with:', userData);
      // Transform userData to match backend schema
      const registrationData = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        skill: userData.skill || 'General', // Default skill if not provided
        bio: userData.bio || ''
      };
      
      const response = await api.post('/api/auth/register', registrationData);
      console.log('Registration response:', response.data);
      return {
        success: true,
        message: response.data.message,
        user: response.data.user
      };
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.error || 'Registration failed'
      };
    }
  }
};

// User API
export const userAPI = {
  getUser: async (userId) => {
    try {
      const response = await api.get(`/api/users/${userId}`);
      return {
        success: true,
        user: response.data
      };
    } catch (error) {
      console.error('Get user error:', error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.error || 'Failed to fetch user'
      };
    }
  },

  updateUser: async (userId, userData) => {
    try {
      const response = await api.put(`/api/users/${userId}`, userData);
      return {
        success: true,
        user: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.error || 'Failed to update user'
      };
    }
  }
};

// Skills API
export const skillAPI = {
  createSkill: async (skillData) => {
    try {
      const response = await api.post('/api/skills', skillData);
      return {
        success: true,
        skill: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.error || 'Failed to create skill'
      };
    }
  }
};

// Stories API
export const storyAPI = {
  getAllStories: async () => {
    try {
      const response = await api.get('/api/stories');
      return {
        success: true,
        stories: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.error || 'Failed to fetch stories'
      };
    }
  },

  createStory: async (storyData) => {
    try {
      const transformedData = {
        skillName: storyData.skillName,
        text: storyData.description
      };
      
      const response = await api.post('/api/stories', transformedData);
      return {
        success: true,
        story: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.error || 'Failed to create story'
      };
    }
  }
};

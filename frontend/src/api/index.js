
const API_BASE_URL = 'http://localhost:5000/api';

// Simulated API responses for development
const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', bio: 'Full-stack developer passionate about teaching' }
];

const mockSkills = [
  { id: '1', userId: '1', name: 'React Development', description: 'Building modern web applications with React', category: 'programming' },
  { id: '2', userId: '1', name: 'UI/UX Design', description: 'Creating beautiful and intuitive user interfaces', category: 'design' }
];

const mockStories = [
  {
    id: '1',
    userId: '1',
    title: 'How I learned React in 30 days',
    description: 'My journey from complete beginner to building my first React application. Here are the resources and strategies that worked for me.',
    tags: ['React', 'JavaScript', 'Learning'],
    author: { name: 'John Doe' },
    createdAt: new Date().toISOString()
  }
];

// Helper function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Auth API
export const authAPI = {
  login: async (credentials) => {
    await delay(1000);
    if (credentials.email === 'demo@skillbook.com' && credentials.password === 'demo123') {
      return {
        success: true,
        token: 'mock-jwt-token',
        user: { id: '1', name: 'Demo User', email: 'demo@skillbook.com' }
      };
    }
    return { success: false, message: 'Invalid credentials' };
  },

  register: async (userData) => {
    await delay(1000);
    return {
      success: true,
      token: 'mock-jwt-token',
      user: { id: '1', ...userData }
    };
  }
};

// User API
export const userAPI = {
  getUser: async (userId) => {
    await delay(500);
    const user = mockUsers.find(u => u.id === userId);
    return {
      success: true,
      user: user || mockUsers[0]
    };
  },

  updateUser: async (userId, userData) => {
    await delay(500);
    return {
      success: true,
      user: { id: userId, ...userData }
    };
  }
};

// Skills API
export const skillAPI = {
  getUserSkills: async (userId) => {
    await delay(500);
    return {
      success: true,
      skills: mockSkills.filter(s => s.userId === userId)
    };
  },

  createSkill: async (skillData) => {
    await delay(500);
    const newSkill = {
      id: Date.now().toString(),
      ...skillData
    };
    return {
      success: true,
      skill: newSkill
    };
  },

  getAllSkills: async () => {
    await delay(500);
    return {
      success: true,
      skills: mockSkills
    };
  }
};

// Stories API
export const storyAPI = {
  getAllStories: async () => {
    await delay(500);
    return {
      success: true,
      stories: mockStories
    };
  },

  createStory: async (storyData) => {
    await delay(500);
    const newStory = {
      id: Date.now().toString(),
      ...storyData,
      author: { name: 'Demo User' },
      createdAt: new Date().toISOString()
    };
    return {
      success: true,
      story: newStory
    };
  }
};

import { create } from 'zustand';
import api from '../lib/axios';

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,

  signup: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/auth/signup', userData);
      const { token, ...user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Signup failed',
        isLoading: false,
      });
      throw error;
    }
  },

  signin: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/auth/signin', credentials);
      const { token, ...user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Signin failed',
        isLoading: false,
      });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, isAuthenticated: false });
  },

  clearError: () => set({ error: null }),
}));

export default useAuthStore;

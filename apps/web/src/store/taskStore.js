import { create } from 'zustand';
import api from '../lib/axios';

const useTaskStore = create((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,
  page: 1,
  pages: 1,

  fetchTasks: async (pageNumber = 1) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get(`/tasks?pageNumber=${pageNumber}`);
      set({
        tasks: response.data.tasks,
        page: response.data.page,
        pages: response.data.pages,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to fetch tasks',
        isLoading: false,
      });
    }
  },

  createTask: async (taskData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/tasks', taskData);
      set((state) => ({
        tasks: [response.data, ...state.tasks],
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to create task',
        isLoading: false,
      });
      throw error;
    }
  },

  updateTask: async (id, taskData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.put(`/tasks/${id}`, taskData);
      set((state) => ({
        tasks: state.tasks.map((task) => (task._id === id ? response.data : task)),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to update task',
        isLoading: false,
      });
      throw error;
    }
  },

  deleteTask: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await api.delete(`/tasks/${id}`);
      set((state) => ({
        tasks: state.tasks.filter((task) => task._id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to delete task',
        isLoading: false,
      });
      throw error;
    }
  },
}));

export default useTaskStore;

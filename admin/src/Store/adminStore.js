import axiosInstance from '../api/axiosConfig';
import { create } from "zustand";

const API_URL = process.env.REACT_APP_API_URL;

export const useAdminStore = create((set) => ({
  user: null,
  users: [],
  checkingAuth: true,
  loading: false,
  error: null,

  login: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.post('/api/admin/login', {
        email,
        password,
      });
      set({ user: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "An error occurred",
        loading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post('/api/admin/logout', {}, { withCredentials: true });
      set({ user: null });
    } catch (error) {
      console.error("Logout error:", error);
    }
  },

  checkAuth: async () => {
    try {
      console.log('API URL:', process.env.REACT_APP_BACKEND_URL);
      const response = await axiosInstance.get('/api/admin/profile', { withCredentials: true });
      console.log('Response:', response.data);
      set({ user: response.data, checkingAuth: false });
    } catch (error) {
      console.error('Auth Error:', error);
      set({ user: null, checkingAuth: false });
    }
  },

  // User management functions
  getUsers: async () => {
    try {
      const response = await axiosInstance.get('/api/admin/users', { withCredentials: true });
      set({ users: response.data.data });
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  createUser: async (userData) => {
    try {
      const response = await axiosInstance.post('/api/admin/users', userData, { withCredentials: true });
      set((state) => ({
        users: [...state.users, response.data.data],
      }));
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  updateUser: async (userId, userData) => {
    try {
      const response = await axiosInstance.put('/api/admin/users/' + userId, userData, { withCredentials: true });
      set((state) => ({
        users: state.users.map((user) =>
          user._id === userId ? { ...user, ...response.data.user } : user
        ),
      }));
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },

  deleteUser: async (userId) => {
    try {
      set({ loading: true });
      await axiosInstance.delete('/api/admin/users/' + userId, { withCredentials: true });
      set((state) => ({
        users: state.users.filter((user) => user._id !== userId),
      }));
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  searchUsers: async ({ name, email }) => {
    try {
      let url = '/api/admin/users/search?';
      const params = [];
      if (name) params.push(`name=${encodeURIComponent(name)}`);
      if (email) params.push(`email=${encodeURIComponent(email)}`);
      
      url += params.join('&');
      
      const response = await axiosInstance.get(url, { withCredentials: true });
      set({ users: response.data.data });
    } catch (error) {
      console.error("Error searching users:", error);
      throw error;
    }
  },

  assignRole: async (userId, role) => {
    try {
      const response = await axiosInstance.post('/api/admin/assign-role', { userId, role }, { withCredentials: true });
      set((state) => ({
        users: state.users.map((user) =>
          user._id === userId ? { ...user, ...response.data.user } : user
        ),
      }));
    } catch (error) {
      console.error("Error assigning role:", error);
      throw error;
    }
  },

  fetchAllUsers: async () => {
    try {
      set({ loading: true });
      const response = await axiosInstance.get('/api/admin/users', { withCredentials: true });
      set({ users: response.data.data });
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      set({ loading: false });
    }
  },
}));

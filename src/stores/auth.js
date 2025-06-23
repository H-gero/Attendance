// src/stores/auth.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null, // { id, name, email, role }
    isAuthenticated: false,
  }),
  actions: {
    async login(email, password) {
      try {
        const response = await axios.post('https://attendance-backend-9nhc.onrender.com/api/login', {
          email,
          password,
        });
        this.user = response.data;
        this.isAuthenticated = true;
        return response.data;
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
      }
    },
    logout() {
      this.user = null;
      this.isAuthenticated = false;
    },
  },
  persist: true,
});
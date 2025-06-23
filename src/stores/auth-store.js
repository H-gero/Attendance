import { defineStore } from 'pinia'

export const useAuthStore2 = defineStore('auth2', {
  state: () => ({
    user: null,
    token: null,
  }),

  actions: {
    async login(username, password) {
      try {
        const response = await fetch(
          'https://attendance-backend-9nhc.onrender.com/api/usuario/login',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
          },
        )
        console.log('Respuesta del servidor:', response);

        if (!response.ok) throw new Error('Credenciales inválidas')
        const data = await response.json()

        this.token = data.token
        this.user = data.usuario
        this.guardarEnLocalStorage()
      } catch (error) {
        throw new Error(error.message || 'Error al iniciar sesión')
      }
    },

    cargarPerfil() {
      const storedData = localStorage.getItem('authData')
      if (storedData) {
        const { token, user } = JSON.parse(storedData)
        this.token = token
        this.user = user
      }
    },

    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('authData')
    },

    guardarEnLocalStorage() {
      const authData = { token: this.token, user: this.user }
      localStorage.setItem('authData', JSON.stringify(authData))
    },

    getRol() {
      return this.user?.rol || null
    },

    esJefeDeAno() {
      return this.user?.rol === 'jefe de ano'
    },

    esProfesor() {
      return this.user?.rol === 'profesor'
    },

    esEstudiante() {
      return this.user?.rol === 'estudiante'
    },
  },
})

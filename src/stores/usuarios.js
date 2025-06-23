import { defineStore } from 'pinia'
import axios from 'axios'

export const useUsuariosStore = defineStore('usuarios', {
  state: () => ({
    usuarios: [],
    usuarioEnEdicion: null,
    total: 0,
    pages: 0,
    currentPage: 1,
  }),

  actions: {
    async fetchUsuarios({ limit = 10, offset = 0 } = {}) {
      try {
        console.log('Obteniendo usuarios...')
        const params = new URLSearchParams()
        if (limit) params.append('limit', limit)
        if (offset) params.append('offset', offset)

        const response = await axios.get(
          `https://attendance-backend-9nhc.onrender.com/api/usuario/all?${params.toString()}`,
        )
        console.warn(response.data)

        if (!response.data || typeof response.data !== 'object') {
          throw new Error('La respuesta del servidor no tiene el formato esperado')
        }

        this.usuarios = response.data.Usuarios || []
        this.total = response.data.total || 0
        this.pages = response.data.pages || 0
        this.currentPage = response.data.currentPage || 1

        return this.usuarios
      } catch (error) {
        console.error('Error al cargar usuarios:', error.message || error)
        throw error
      }
    },

    async createUsuario({ username, password, id_usuario }) {
      try {
        console.log('Creando usuario con datos:', { username, password, id_usuario })
        await axios.post(
          'https://attendance-backend-9nhc.onrender.com/api/usuario',
          // Mapeo de propiedades a los nombres esperados por el backend
          { username: username, password: password, id_usuario: id_usuario },
        )
        await this.fetchUsuarios()
      } catch (error) {
        console.error('Error al crear usuario:', error.message || error)
        throw error
      }
    },

    async updateUsuario(id, { username, password, id_usuario }) {
      try {
        console.log('Actualizando usuario con ID:', id)
        const response = await axios.put(
          `https://attendance-backend-9nhc.onrender.com/api/usuario/${id}`,
          // Mapeo de propiedades a los nombres esperados por el backend
          { username: username, password: password, id_usuario: id_usuario },
        )
        await this.fetchUsuarios()
        console.log('Respuesta del servidor:', response.data)
      } catch (error) {
        console.error('Error al actualizar usuario:', error)
        throw error
      }
    },

    async deleteUsuario(id) {
      try {
        console.log('Eliminando usuario con ID:', id)
        await axios.delete(
          `https://attendance-backend-9nhc.onrender.com/api/usuario/${id}`,
        )
        await this.fetchUsuarios()
      } catch (error) {
        console.error('Error al eliminar usuario:', error.message || error)
        throw error
      }
    },

    setUsuarioEnEdicion(usuario) {
      this.usuarioEnEdicion = usuario
    },
  },
})

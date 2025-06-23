import { defineStore } from 'pinia'
import axios from 'axios'

export const useProfesoresStore = defineStore('profesores', {
  state: () => ({
    profesores: [],
    profesorEnEdicion: null,
    total: 0,
    pages: 0,
    currentPage: 1,
  }),

  actions: {
    async fetchProfesores({ limit = 10, offset = 0 } = {}) {
      try {
        console.log('Obteniendo profesores...')
        const params = new URLSearchParams()
        if (limit) params.append('limit', limit)
        if (offset) params.append('offset', offset)

        const response = await axios.get(
          `https://attendance-backend-9nhc.onrender.com/api/profesor/all`,
        )
        console.warn(response.data.Profesors)

        this.profesores = response.data.Profesors || []
        this.total = response.data.total || 0
        this.pages = response.data.pages || 0
        this.currentPage = response.data.currentPage || 1

        return this.profesores
      } catch (error) {
        console.error('Error al cargar profesores:', error.message || error)
        throw error
      }
    },

    async createProfesor({ nombre, apellido, id_usuario }) {
      try {
        console.log('Creando profesor con datos:', { nombre, apellido, id_usuario })
        await axios.post(
          'https://attendance-backend-9nhc.onrender.com/api/profesor',
          // Mapeo de propiedades a los nombres esperados por el backend
          { name: nombre, apellido: apellido, id_usuario: id_usuario },
        )
        await this.fetchProfesores()
      } catch (error) {
        console.error('Error al crear profesor:', error.message || error)
        throw error
      }
    },

    async updateProfesor(id, { nombre, email, active }) {
      try {
        console.log('Actualizando profesor con ID:', id)
        const response = await axios.put(
          `https://attendance-backend-9nhc.onrender.com/api/profesor/${id}`,
          // Mapeo de propiedades a los nombres esperados por el backend
          { name: nombre, email, active },
        )
        await this.fetchProfesores()
        console.log('Respuesta del servidor:', response.data)
      } catch (error) {
        console.error('Error al actualizar profesor:', error.message || error)
        throw error
      }
    },

    async deleteProfesor(id) {
      try {
        console.log('Eliminando profesor con ID:', id)
        await axios.delete(`https://attendance-backend-9nhc.onrender.com/api/profesor/${id}`)
        await this.fetchProfesores()
      } catch (error) {
        console.error('Error al eliminar profesor:', error.message || error)
        throw error
      }
    },

    setProfesorEnEdicion(profesor) {
      this.profesorEnEdicion = profesor
    },
  },
})

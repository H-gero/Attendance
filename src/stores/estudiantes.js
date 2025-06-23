import { defineStore } from 'pinia'
import axios from 'axios'

export const useEstudiantesStore = defineStore('estudiantes', {
  state: () => ({
    estudiantes: [],
    estudianteEnEdicion: null,
    total: 0,
    pages: 0,
    currentPage: 1,
  }),

  actions: {
    async fetchEstudiantes({ limit = 10, offset = 0 } = {}) {
      try {
        console.log('Obteniendo estudiantes...')
        const params = new URLSearchParams()
        if (limit) params.append('limit', limit)
        if (offset) params.append('offset', offset)

        const response = await axios.get(
          `https://attendance-backend-9nhc.onrender.com/api/estudiante/all?${params.toString()}`,
        )
        console.warn(response.data)

        this.estudiantes = response.data.estudiantes || []
        this.total = response.data.total || 0
        this.pages = response.data.pages || 0
        this.currentPage = response.data.currentPage || 1

        return this.estudiantes
      } catch (error) {
        console.error('Error al cargar estudiantes:', error)
        throw error
      }
    },

    async createEstudiante({ nombre, apellido, id_usuario, grupo }) {
      try {
        console.log('Creando estudiante con datos:', { nombre, apellido, id_usuario, grupo })
        await axios.post(
          'https://attendance-backend-9nhc.onrender.com/api/estudiante',
          { name: nombre, apellido: apellido, id_usuario: id_usuario, id_grupo: grupo },
        )
        await this.fetchEstudiantes()
      } catch (error) {
        console.error('Error al crear estudiante:', error)
        throw error
      }
    },

    async updateEstudiante(id, { nombre, apellido, id_usuario, grupo }) {
      try {
        console.log('Actualizando estudiante con ID:', id)
        const response = await axios.put(
          `https://attendance-backend-9nhc.onrender.com/api/estudiante/${id}`,
          // Mapeo de propiedades a los nombres esperados por el backend
          { name: nombre, lastName: apellido, userId: id_usuario, group: grupo },
        )
        await this.fetchEstudiantes()
        console.log('Respuesta del servidor:', response.data)
      } catch (error) {
        console.error('Error al actualizar estudiante:', error)
        throw error
      }
    },

    async deleteEstudiante(id) {
      try {
        console.log('Eliminando estudiante con ID:', id)
        await axios.delete(
          `https://attendance-backend-9nhc.onrender.com/api/estudiante/${id}`,
        )
        await this.fetchEstudiantes()
      } catch (error) {
        console.error('Error al eliminar estudiante:', error)
        throw error
      }
    },

    setEstudianteEnEdicion(estudiante) {
      this.estudianteEnEdicion = estudiante
    },
  },
})
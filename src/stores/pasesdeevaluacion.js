import { defineStore } from 'pinia'
import axios from 'axios'

export const usePaseEvaluacionStore = defineStore('paseEvaluacion', {
  state: () => ({
    evaluaciones: [],
    evaluacionEnEdicion: null,
    nextId: 1,
    total: 0,
    pages: 0,
    currentPage: 1,
  }),

  actions: {
    async fetchEvaluaciones({ limit = 5, offset = 0 } = {}) {
      try {
        console.error('Evaluaciones enter...')
        const params = new URLSearchParams()
        if (limit) params.append('limit', limit)
        if (offset) params.append('offset', offset)
        const response = await axios.get(`https://attendance-backend-9nhc.onrender.com/api/evaluacion/all?${params.toString()}`)
        console.warn(response.data)
        this.evaluaciones = response.data.evaluaciones || []
        this.total = response.data.total || 0
        this.pages = response.data.pages || 0
        this.currentPage = response.data.currentPage || 1
      } catch (error) {
        console.error('Error al cargar evaluaciones:', error)
        throw error
      }
    },

    async createEvaluacion({ id_estudiante, id_evaluacion, id_P1, fecha }) {
      try {
        console.log('Creando evaluación...' + { id_estudiante, id_evaluacion, id_P1, fecha })
        await axios.post('https://attendance-backend-9nhc.onrender.com/api/evaluacion/', {
          id_estudiante,
          id_evaluacion,
          id_P1,
          fecha,
        })
        this.fetchEvaluaciones()
      } catch (error) {
        console.error('Error al crear evaluación:', error)
        throw error
      }
    },

    async updateEvaluacion(id, { id_estudiante, id_evaluacion, id_P1, fecha }) {
      try {
        console.log('Actualizando evaluación con ID:', id)
        const response = await axios.put(`https://attendance-backend-9nhc.onrender.com/api/evaluacion/${id}`, {
          id_estudiante,
          id_evaluacion,
          id_P1,
          fecha,
        })
        this.fetchEvaluaciones()
        console.log('Respuesta del servidor:', response.data)
      } catch (error) {
        console.error('Error al actualizar evaluación:', error)
        throw error
      }
    },

    async deleteEvaluacion(id) {
      try {
        console.log('Eliminando evaluación con ID:', id)
        await axios.delete(`https://attendance-backend-9nhc.onrender.com/api/evaluacion/${id}`)
        this.fetchEvaluaciones()
      } catch (error) {
        console.error('Error al eliminar evaluación:', error)
        throw error
      }
    },

    setEvaluacionEnEdicion(evaluacion) {
      this.evaluacionEnEdicion = evaluacion
    },
  },
})

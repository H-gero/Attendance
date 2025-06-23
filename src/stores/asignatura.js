// src/stores/asignatura.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAsignaturaStore = defineStore('asignatura', {
  state: () => ({
    asignaturas: [],
    asignaturaEnEdicion: null,
    nextId: 3,
    total: 0,
    pages: 0,
    currentPage: 1,
  }),

  actions: {
    async fetchAsignaturas({ limit = 5, offset = 0 } = {}) {
      try {
        const params = new URLSearchParams()
        if (limit) params.append('limit', limit)
        if (offset) params.append('offset', offset)
        const response = await axios.get(
          `https://attendance-backend-9nhc.onrender.com/api/asignatura/all?${params.toString()}`,
        )
        console.warn(response.data)
        this.asignaturas = response.data.asignaturas
        this.total = response.data.total || 0
        this.pages = response.data.pages || 0
        this.currentPage = response.data.currentPage || 1
      } catch (error) {
        console.error('Error al cargar asistencias:', error)
        throw error
      }
    },

    async createAsignatura({ nombre, active, descripcion }) {
      try {
        // console.log('Creando asignatura...' + {nombre, active, descripcion})
        await axios.post(
          'https://attendance-backend-9nhc.onrender.com/api/asignatura/',
          //Este es el objeto que se envia al backend, las propiedades deben ser en ingles
          { name: nombre, active, description: descripcion },
        )
        this.fetchAsignaturas()
      } catch (error) {
        console.error('Error al crear asignatura:', error)
        throw error
      }
    },

    async updateAsignatura(id, { nombre, active, descripcion }) {
      try {
        console.log('Actualizando asignatura con ID:', id)
        const response = await axios.put(
          `https://attendance-backend-9nhc.onrender.com/api/asignatura/${id}`,
          //Este es el objeto que se envia al backend, las propiedades deben ser e ingles
          { name: nombre, active, description: descripcion },
        )
        this.fetchAsignaturas()
        console.log('Respuesta del servidor:', response.data)

      } catch (error) {
        console.error('Error al actualizar asignatura:', error)
        throw error
      }
    },

    async deleteAsignatura(id) {
      try {
        console.log('Actualizando asignatura con ID:', id)
        await axios.delete(`https://attendance-backend-9nhc.onrender.com/api/asignatura/${id}`)
        this.fetchAsignaturas()
        // console.log('Respuesta del servidor:', response.data)
      } catch (error) {
        console.error('Error al eliminar asignatura:', error)
        throw error
      }
      // this.asignaturas = this.asignaturas.filter((a) => a.id !== id)
    },

    setAsignaturaEnEdicion(asignatura) {
      this.asignaturaEnEdicion = asignatura
    },
  },
})

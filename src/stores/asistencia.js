// src/stores/asistencia.js
import { defineStore } from 'pinia'
import axios from 'axios'
const API_URL = 'https://attendance-backend-9nhc.onrender.com/api'

export const useAsistencia = defineStore('asistencia', {
  state: () => ({
    asistencias: [],
    asistenciaEnEdicion: null, // Para guardar la asistencia que se está editando
    total: 0,
    pages: 0,
    currentPage: 1,
  }),

  actions: {
    async fetchAsistencias({ limit = 5, offset = 0 } = {}) {
      try {
        console.log('Obteniendo asistencias...')
        const params = new URLSearchParams()
        if (limit) params.append('limit', limit)
        if (offset) params.append('offset', offset)
        const response = await axios.get(`${API_URL}/asistencia/all?${params.toString()}`)
        console.warn(response.data)
        this.asistencias = response.data.asistencias || []
        this.total = response.data.total || 0
        this.pages = response.data.pages || 0
        this.currentPage = response.data.currentPage || 1
        return response.data.asistencias
      } catch (error) {
        console.error('Error al cargar asistencias:', error)
        throw error
      }
    },

    // Crea una nueva asistencia enviando los datos al backend y actualiza la lista de asistencias.
    async createAsistencia({ nombre, descripcion }) {
      try {
        console.log('Creando asistencia con datos:', { nombre, descripcion })
        await axios.post(
          `${API_URL}/asistencia`,
          { name: nombre, active: true, description: descripcion },
        )
        await this.fetchAsistencias()
      } catch (error) {
        console.error('Error al crear asistencia:', error)
        throw error
      }
    },

    async editAsistencia(id, { nombre, descripcion }) {
      try {
        console.log('Actualizando asistencia con ID:', id, nombre, descripcion)
        const response = await axios.put(`${API_URL}/asistencia/${id}`, {
          name: nombre,
          active: true,
          description: descripcion,
        })
        await this.fetchAsistencias()
        console.log('Respuesta del servidor:', response.data)
      } catch (error) {
        console.error('Error al actualizar asistencia:', error)
        throw error
      }
    },

    async removeAsistencia(id) {
      try {
        console.log('Eliminando asistencia con ID:', id)
        await axios.delete(`${API_URL}/asistencia/${id}`)
        await this.fetchAsistencias()
      } catch (error) {
        console.error('Error al eliminar asistencia:', error)
        throw error
      }
    },

    setAsistenciaEnEdicion(asistencia) {
      this.asistenciaEnEdicion = asistencia
    },
  },
})

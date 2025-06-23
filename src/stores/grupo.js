import { defineStore } from 'pinia'
import axios from 'axios'

export const useGrupoStore = defineStore('grupo', {
  state: () => ({
    grupos: [],
    grupoEnEdicion: null,
    total: 0,
    pages: 0,
    currentPage: 1,
  }),

  actions: {
    async fetchGrupos({ limit = 5, offset = 0 } = {}) {
      try {
        const params = new URLSearchParams()
        if (limit) params.append('limit', limit)
        if (offset) params.append('offset', offset)
        const response = await axios.get(
          `https://attendance-backend-9nhc.onrender.com/api/grupo/all?${params.toString()}`,
        )
        console.log('Respuesta del servidor:', response.data);

        this.grupos = response.data || []
        this.total = response.data.total || 0
        this.pages = response.data.pages || 0
        this.currentPage = response.data.currentPage || 1
      } catch (error) {
        console.error('Error al cargar los grupos:', error)
        throw error
      }
    },

    async createGrupo({ name, descripcion, id_profesor, active }) {
      try {
        await axios.post('https://attendance-backend-9nhc.onrender.com/api/grupo/all', {
          name: name,
          description: descripcion,
          id_profesor: id_profesor,
          active,
        })
        this.fetchGrupo()
      } catch (error) {
        console.error('Error al crear el grupo:', error)
        throw error
      }
    },

    async updateGrupo(id, { name, descripcion, id_profesor, active }) {
      try {
        await axios.put(`https://attendance-backend-9nhc.onrender.com/api/grupo/${id}`, {
          name: name,
          description: descripcion,
          id_profesor: id_profesor,
          active,
        })
        this.fetchGrupos()
      } catch (error) {
        console.error('Error al actualizar el grupo:', error)
        throw error
      }
    },

    async deleteGrupo(id) {
      try {
        await axios.delete(`https://attendance-backend-9nhc.onrender.com/api/grupo/${id}`)
        this.fetchGrupos()
      } catch (error) {
        console.error('Error al eliminar el grupo:', error)
        throw error
      }
    },

    setGrupoEnEdicion(grupo) {
      this.grupoEnEdicion = grupo
    },
  },
})

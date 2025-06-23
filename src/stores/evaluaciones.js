import { defineStore } from 'pinia'
import axios from 'axios'

export const useEvaluacionStore = defineStore('evaluacion', {
  state: () => ({
    evaluaciones: [],
    evaluacionEnEdicion: null,
  }),

  actions: {
    async fetchEvaluaciones() {
      try {
        const response = await axios.get(
          'https://attendance-backend-9nhc.onrender.com/api/evaluacion/all'
        )
        this.evaluaciones = response.data.data
      } catch (error) {
        console.error('Error al cargar evaluaciones:', error)
        throw error
      }
    },

    async createEvaluacion({ nombre, descripcion, tipo, active }) {
      try {
        await axios.post('https://attendance-backend-9nhc.onrender.com/api/evaluacion', {
          name: nombre,
          description: descripcion,
          tipo,
          active,
        })
        this.fetchEvaluaciones()
      } catch (error) {
        console.error('Error al crear evaluación:', error)
        throw error
      }
    },

    async updateEvaluacion(id, { nombre, descripcion, tipo, active }) {
      try {
        await axios.put(`https://attendance-backend-9nhc.onrender.com/api/evaluacion/${id}`, {
          name: nombre,
          description: descripcion,
          tipo,
          active,
        })
        this.fetchEvaluaciones()
      } catch (error) {
        console.error('Error al actualizar evaluación:', error)
        throw error
      }
    },

    async deleteEvaluacion(id) {
      try {
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


// import { defineStore } from 'pinia'
// import axios from 'axios'

// export const useEvaluaciones = defineStore('evaluaciones', {
//   state: () => ({
//     evaluaciones: [],
//     evaluacionEnEdicion: null,
//     total: 0,
//     pages: 0,
//     currentPage: 1,
//   }),

//   actions: {
//     async fetchEvaluaciones({ limit = 10, offset = 0 } = {}) {
//       try {
//         console.log('Obteniendo evaluaciones con parámetros:', { limit, offset })
//         const params = new URLSearchParams()
//         if (limit) params.append('limit', limit)
//         if (offset) params.append('offset', offset)

//         const response = await axios.get(
//           `https://attendance-backend-9nhc.onrender.com/api/evaluacion/all?${params.toString()}`,
//         )
//         console.log('Respuesta completa del servidor:', response)

//         if (!response.data || typeof response.data !== 'object') {
//           throw new Error('La respuesta del servidor no tiene el formato esperado')
//         }

//         this.evaluaciones = response.data.data || []
//         this.total = response.data.total || 0
//         this.pages = response.data.pages || 0
//         this.currentPage = response.data.currentPage || 1

//         console.warn('Evaluaciones cargadas:', this.evaluaciones)
//         return this.evaluaciones
//       } catch (error) {
//         console.error('Error al cargar evaluaciones:', error.message || error)
//         throw error
//       }
//     },

//     async addEvaluacion({ nombre, descripcion, tipo, valor, color }) {
//       try {
//         console.log('Creando evaluación con datos:', { nombre, descripcion, tipo, valor, color })
//         const response = await axios.post(
//           'https://attendance-backend-9nhc.onrender.com/api/evaluacion',
//           // Mapeo de propiedades a los nombres esperados por el backend
//           { name: nombre, description: descripcion, type: tipo, value: valor, color },
//           {
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           }
//         )
//         console.log('Respuesta del servidor al crear:', response.data)
//         await this.fetchEvaluaciones()
//       } catch (error) {
//         console.error('Error al crear evaluación:', {
//           message: error.message,
//           status: error.response?.status,
//           data: error.response?.data,
//         })
//         throw error
//       }
//     },

//     async deleteEvaluacion(id) {
//       try {
//         console.log('Eliminando evaluación con ID:', id)
//         const response = await axios.delete(
//           `https://attendance-backend-9nhc.onrender.com/api/evaluacion/${id}`,
//         )
//         console.log('Respuesta del servidor al eliminar:', response.data)
//         await this.fetchEvaluaciones()
//       } catch (error) {
//         console.error('Error al eliminar evaluación:', error.message || error)
//         throw error
//       }
//     },

//     setEvaluacionEnEdicion(evaluacion) {
//       this.evaluacionEnEdicion = evaluacion
//     },

//     async updateEvaluacion(evaluacionActualizada) {
//       try {
//         console.log('Actualizando evaluación con ID:', evaluacionActualizada.id)
//         const response = await axios.put(
//           `https://attendance-backend-9nhc.onrender.com/api/evaluacion/${evaluacionActualizada.id}`,
//           // Mapeo de propiedades a los nombres esperados por el backend
//           {
//             name: evaluacionActualizada.nombre,
//             description: evaluacionActualizada.descripcion,
//             type: evaluacionActualizada.tipo,
//             value: evaluacionActualizada.valor,
//             color: evaluacionActualizada.color,
//           },
//         )
//         console.log('Respuesta del servidor al actualizar:', response.data)
//         await this.fetchEvaluaciones()
//         this.evaluacionEnEdicion = null
//       } catch (error) {
//         console.error('Error al actualizar evaluación:', error.message || error)
//         throw error
//       }
//     },
//   },
// })
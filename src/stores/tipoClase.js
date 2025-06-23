// src/stores/tipoClase.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useTipoClaseStore = defineStore('tipoClase', {
  state: () => ({
    tiposClase: [],
    tipoClaseEnEdicion: null,
    nextId: 3,
  }),

  actions: {
    async fetchTiposClase() {
      try {
        console.log('Cargando tipos de clase desde el servidor...')
        const response = await axios.get(
          'https://attendance-backend-9nhc.onrender.com/api/tipodeclase/all',
        )
        console.warn(response.data)
        this.tiposClase = response.data.TipodeClases
        
        return this.tiposClase
      } catch (error) {
        console.error('Error al cargar tipos de clase:', error)
        throw error
      }
    },

    async createTipoClase(nuevoTipoClase) {
      try {
        await axios.post(
          'https://attendance-backend-9nhc.onrender.com/api/tipodeclase/',
          // Supone que el objeto enviado debe estar en inglés
          {
            name: nuevoTipoClase.nombre,
            active: nuevoTipoClase.active,
            description: nuevoTipoClase.descripcion,
          },
        )
        this.fetchTiposClase()
      } catch (error) {
        console.error('Error al crear tipo de clase:', error)
        throw error
      }
    },

    async updateTipoClase(id, actualizacion) {
      try {
        console.log('Actualizando tipo de clase con ID:', id)
        const response = await axios.put(
          `https://attendance-backend-9nhc.onrender.com/api/tipodeclase/${id}`,
          {
            name: actualizacion.nombre,
            active: actualizacion.active,
            description: actualizacion.descripcion,
          },
        )
        this.fetchTiposClase()
        console.log('Respuesta del servidor:', response.data)
      } catch (error) {
        console.error('Error al actualizar tipo de clase:', error)
        throw error
      }
    },

    async deleteTipoClase(id) {
      try {
        console.log('Eliminando tipo de clase con ID:', id)
        await axios.delete(`https://attendance-backend-9nhc.onrender.com/api/tipodeclase/${id}`)
        this.fetchTiposClase()
      } catch (error) {
        console.error('Error al eliminar tipo de clase:', error)
        throw error
      }
    },

    setTipoClaseEnEdicion(tipoClase) {
      this.tipoClaseEnEdicion = tipoClase
    },
  },
})

// // src/stores/tipoClase.js
// import { defineStore } from 'pinia'

// export const useTipoClaseStore = defineStore('tipoClase', {
//   state: () => ({
//     tiposClase: [
//     ],
//     tipoClaseEnEdicion: null,
//     nextId: 3,
//   }),
//   actions: {
//     fetchTiposClase() {
//       return this.tiposClase
//     },
//     createTipoClase(nuevoTipoClase) {
//       const tipoClaseConId = {
//         ...nuevoTipoClase,
//         id: this.nextId,
//       }
//       this.tiposClase.push(tipoClaseConId)
//       this.nextId += 1
//     },
//     updateTipoClase(id, actualizacion) {
//       const index = this.tiposClase.findIndex((tc) => tc.id === id)
//       if (index !== -1) {
//         this.tiposClase[index] = { ...this.tiposClase[index], ...actualizacion }
//       }
//     },
//     deleteTipoClase(id) {
//       this.tiposClase = this.tiposClase.filter((tc) => tc.id !== id)
//     },
//     setTipoClaseEnEdicion(tipoClase) {
//       this.tipoClaseEnEdicion = tipoClase
//     },
//   },
// })

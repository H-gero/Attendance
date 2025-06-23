import { defineStore, storeToRefs } from 'pinia'
import axios from 'axios'
import { useAsignaturaStore } from './asignatura'
import { useTipoClaseStore } from './tipoClase'

// const asignaturaStore = useAsignaturaStore()
// const tipoClaseStore = useTipoClaseStore()

const { asignaturas } = storeToRefs(useAsignaturaStore())
const { tiposClase } = storeToRefs(useTipoClaseStore())

export const useP1Store = defineStore('p1', {
  state: () => ({
    actividades: [],
    actividadEnEdicion: null,
    total: 0,
    pages: 0,
    currentPage: 1,
  }),

  getters: {
    getAllActividades: (state) => state.actividades,
  },

  actions: {
    async fetchActividades({ limit = 5, offset = 0 } = {}) {
      try {
        const params = new URLSearchParams()
        if (limit) params.append('limit', limit)
        if (offset) params.append('offset', offset)
        const response = await axios.get(`https://attendance-backend-9nhc.onrender.com/api/p1/all?${params.toString()}`)
        this.actividades = response.data
        console.warn('Respuesta del servidor', response.data)
        this.total = response.data.total || 0
        this.pages = response.data.pages || 0
        this.currentPage = response.data.currentPage || 1
      } catch (error) {
        console.error('Error al cargar actividades:', error)
        throw error
      }
    },

    getNombreActividad({ id_asignatura, id_tipo_de_clase }) {
      // alert(id_asignatura)
      // alert(id_tipo_de_clase)

      const asignatura = asignaturas.value.find((a) => a.id === id_asignatura)
      const tipoClase = tiposClase.value.find((tc) => tc.id === id_tipo_de_clase)

      // alert(tipoClase)
      // alert(asignatura)

      return `${tipoClase?.name || 'Desconocido'}_${asignatura?.name || 'Desconocido'}`
    },

    async createActividad({ id_asignatura, id_tipo_de_clase, id_profesor, semana }) {
      try {
        const nombre = await this.getNombreActividad({
          id_asignatura,
          id_tipo_de_clase,
        })
        await axios.post('https://attendance-backend-9nhc.onrender.com/api/p1/', {
          nombre,
          id_asignatura,
          id_tipo_de_clase,
          id_profesor,
          semana,
        })

        await this.fetchActividades()
      } catch (error) {
        console.error('Error al crear actividad:', error)
        throw error
      }
    },

    async updateActividad(id, { id_asignatura, id_tipo_de_clase, id_profesor, semana }) {
      try {
        const nombre = this.getNombreActividad({
          id_asignatura,
          id_tipo_de_clase,
        })
        await axios.put(`https://attendance-backend-9nhc.onrender.com/api/p1/${id}`, {
          nombre,
          id_asignatura,
          id_tipo_de_clase,
          id_profesor,
          semana,
        })
        await this.fetchActividades()
      } catch (error) {
        console.error('Error al actualizar actividad:', error)
        throw error
      }
    },

    async deleteActividad(id) {
      try {
        await axios.delete(`https://attendance-backend-9nhc.onrender.com/api/p1/${id}`)
        await this.fetchActividades()
      } catch (error) {
        console.error('Error al eliminar actividad:', error)
        throw error
      }
    },

    setActividadEnEdicion(actividad) {
      this.actividadEnEdicion = actividad
    },
  },
})

// import { defineStore } from 'pinia'
// import { useAsignaturaStore } from './asignatura'
// import { useTipoClaseStore } from './tipoClase'

// export const useP1Store = defineStore('p1', {
//   state: () => ({
//     actividades: [

//     ],
//     actividadEnEdicion: null,
//     nextId: 3,
//   }),
//   getters: {
//     // Getter para obtener todas las actividades
//     getAllActividades: (state) => state.actividades,
//   },
//   actions: {
//     fetchActividades() {
//       return this.actividades
//     },
//     getNextOrden(idAsignatura) {
//       const actividadesAsignatura = this.actividades.filter(a => a.id_asignatura === idAsignatura)
//       return actividadesAsignatura.length > 0 ? Math.max(...actividadesAsignatura.map(a => a.orden)) + 1 : 1
//     },
//     getNombreActividad(actividad) {
//       const asignaturaStore = useAsignaturaStore()
//       const tipoClaseStore = useTipoClaseStore()
//       const asignatura = asignaturaStore.asignaturas.find(a => a.id === actividad.id_asignatura)
//       const tipoClase = tipoClaseStore.tiposClase.find(tc => tc.id === actividad.id_tipo_clase)
//       // Formato ajustado: Clase1_RSI en lugar de Clase_1_RSI
//       return `${tipoClase?.nombre || 'Desconocido'}${actividad.orden}_${asignatura?.nombre || 'Desconocido'}`
//     },
//     createActividad(nuevaActividad) {
//       const orden = this.getNextOrden(nuevaActividad.id_asignatura)
//       const actividadConId = {
//         ...nuevaActividad,
//         id: this.nextId,
//         orden,
//       }
//       this.actividades.push(actividadConId)
//       this.nextId += 1
//     },
//     updateActividad(id, actualizacion) {
//       const index = this.actividades.findIndex((a) => a.id === id)
//       if (index !== -1) {
//         this.actividades[index] = { ...this.actividades[index], ...actualizacion }
//       }
//     },
//     deleteActividad(id) {
//       this.actividades = this.actividades.filter((a) => a.id !== id)
//     },
//     setActividadEnEdicion(actividad) {
//       this.actividadEnEdicion = actividad
//     },
//   },
// })

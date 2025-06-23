import { defineStore } from 'pinia'
// import { useP1Store } from './p1'
import axios from 'axios'

export const usePaseAsistenciaStore = defineStore('pasesdeasistencia', {
  state: () => ({
    asistencias: [],
    asistenciaEnEdicion: null,
    currentQr: null,
  }),
  actions: {
    async fetchPaseAsistencias() {
      const response = await axios.get(
        'https://attendance-backend-9nhc.onrender.com/api/pase_de_asistencia/all',
      )
      this.asistencias = response.data
    },

    async generarPase(idP1) {
      alert(idP1)
      const existe = this.asistencias.some((a) => a.id_P1 === idP1 && a.qrCode)
      if (existe) throw new Error('Ya existe un pase para esta actividad.')

      const sesionId = `ses-${Date.now()}`
      const qrCode = `data:image/png;base64,${btoa(sesionId)}`
      const expiresAt = Date.now() + 5 * 60 * 1000

      await axios.post('https://attendance-backend-9nhc.onrender.com/api/pases', {
        id_P1: idP1, // Usar el parámetro idP1
        sesionId,
        qrCode,
        expiresAt,
      })

      this.currentQr = { id_P1: idP1, sesionId, qrCode, expiresAt }
      return this.currentQr
    },

    async createAsistenciaManual({ fecha, id_p1, id_asistencia, id_estudiante }) {
      // console.warn(asistencia)
      try {
        const nuevaAsistencia = { fecha, id_p1, id_asistencia, id_estudiante }
        await axios.post('https://attendance-backend-9nhc.onrender.com/api/pase_de_asistencia', {
          fecha,
          id_p1,
          id_asistencia,
          id_estudiante,
        })
        this.asistencias.push(nuevaAsistencia)
      } catch (error) {
        console.log('Error creando la asistencia: ', error)
        throw error
      }
    },

    async updateAsistencia(id, actualizacion) {
      await axios.put(
        `https://attendance-backend-9nhc.onrender.com/api/pase_de_asistencia/${id}`,
        actualizacion,
      )
      const index = this.asistencias.findIndex((a) => a.id === id)
      if (index !== -1) this.asistencias[index] = { ...this.asistencias[index], ...actualizacion }
    },

    async deleteAsistencia(id) {
      await axios.delete(
        `https://attendance-backend-9nhc.onrender.com/api/pase_de_asistencia/${id}`,
      )
      this.asistencias = this.asistencias.filter((a) => a.id !== id)
    },

    setAsistenciaEnEdicion(asistencia) {
      this.asistenciaEnEdicion = asistencia
    },
  },
})


///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import { defineStore } from 'pinia'
// import { useP1Store } from './p1'
// import axios from 'axios'

// export const usePaseAsistenciaStore = defineStore('pasesdeasistencia', {
//   state: () => ({
//     asistencias: [],
//     asistenciaEnEdicion: null,
//     estudiantes: [],
//     evaluaciones: [
//       { id: 1, nombre: 'Corte1' },
//       { id: 2, nombre: 'Corte2' },
//     ],
//     nextId: 1,
//     currentQr: null,
//   }),
//   actions: {
//     async fetchPaseAsistencias() {
//       const response = await axios.get('https://attendance-backend-9nhc.onrender.com/api/pase_de_asistencias')
//       this.asistencias = response.data
//     },
//     async fetchAsistencias() {
//       const response = await axios.get('https://attendance-backend-9nhc.onrender.com/api/asistencias')
//       this.asistencias = response.data
//     },
//     async fetchEstudiantes() {
//       const response = await axios.get('https://attendance-backend-9nhc.onrender.com/api/estudiantes')
//       this.estudiantes = response.data
//     },
//     async fetchEvaluaciones() {
//       const response = await axios.get('https://attendance-backend-9nhc.onrender.com/api/evaluaciones')
//       this.evaluaciones = response.data
//       return this.evaluaciones
//     },

//     async generarPase(idP1) { // Corregido: usar idP1 como parámetro
//       alert(idP1)
//       const existe = this.asistencias.some(a => a.id_P1 === idP1 && a.qrCode)
//       if (existe) throw new Error('Ya existe un pase para esta actividad.')

//       const sesionId = `ses-${Date.now()}`
//       const qrCode = `data:image/png;base64,${btoa(sesionId)}` // Simulación (reemplazado por qrcode.vue)
//       const expiresAt = Date.now() + 15 * 60 * 1000

      // await axios.post('https://attendance-backend-9nhc.onrender.com/api/pases', {
      //   id_P1: idP1, // Usar el parámetro idP1
      //   sesionId,
      //   qrCode,
      //   expiresAt,
      // })

//       this.currentQr = { id_P1: idP1, sesionId, qrCode, expiresAt } // Corregido: id_P1 como propiedad
//       return this.currentQr
//     },

//     async createAsistenciaManual(asistencia) {
//       const nuevaAsistencia = { ...asistencia, id: this.nextId }
//       await axios.post('https://attendance-backend-9nhc.onrender.com/api/pase_de_asistencias', nuevaAsistencia)
//       this.asistencias.push(nuevaAsistencia)
//       this.nextId += 1
//     },
//     async updateAsistencia(id, actualizacion) {
//       await axios.put(`https://attendance-backend-9nhc.onrender.com/api/pase_de_asistencias/${id}`, actualizacion)
//       const index = this.asistencias.findIndex(a => a.id === id)
//       if (index !== -1) this.asistencias[index] = { ...this.asistencias[index], ...actualizacion }
//     },
//     async deleteAsistencia(id) {
//       await axios.delete(`https://attendance-backend-9nhc.onrender.com/api/pase_de_asistencias/${id}`)
//       this.asistencias = this.asistencias.filter(a => a.id !== id)
//     },
//     setAsistenciaEnEdicion(asistencia) {
//       this.asistenciaEnEdicion = asistencia
//     },
//     getEstudianteName(idEstudiante) {
//       const estudiante = this.estudiantes.find(e => e.id === idEstudiante)
//       return estudiante?.nombre || 'Desconocido'
//     },
//     getEvaluacionName(idEvaluacion) {
//       const evaluacion = this.evaluaciones.find(e => e.id === idEvaluacion)
//       return evaluacion?.nombre || 'Desconocido'
//     },
//     getP1Name(idP1) {
//       const p1Store = useP1Store()
//       const actividad = p1Store.actividades.find(a => a.id === idP1)
//       return actividad ? p1Store.getNombreActividad(actividad) : 'Desconocido'
//     },
//   },
// })

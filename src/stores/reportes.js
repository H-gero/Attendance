import { defineStore } from 'pinia'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import { usePaseAsistenciaStore } from 'src/stores/pasesdeasistencia'
import { usePaseEvaluacionStore } from 'src/stores/pasesdeevaluacion'

export const useReporteStore = defineStore('reporte', {
  state: () => ({
    asistencias: [],
    evaluaciones: [],
    totalClasesEstimado: 20, // Ajusta según tu contexto
  }),

  actions: {
    async fetchData() {
      const paseAsistenciaStore = usePaseAsistenciaStore()
      const paseEvaluacionStore = usePaseEvaluacionStore()
      await paseAsistenciaStore.fetchPaseAsistencias()
      await paseEvaluacionStore.fetchEvaluaciones() // Asegúrate de que este store exista
      this.asistencias = paseAsistenciaStore.asistencias
      this.evaluaciones = paseEvaluacionStore.evaluaciones
    },

    generarReporteAusencias() {
      const doc = new jsPDF()
      const asistenciasPorEstudiante = {}
      this.asistencias.forEach(a => {
        if (!asistenciasPorEstudiante[a.id_estudiante]) {
          asistenciasPorEstudiante[a.id_estudiante] = { total: 0 }
        }
        asistenciasPorEstudiante[a.id_estudiante].total += 1
      })

      const ausencias = Object.entries(asistenciasPorEstudiante).map(([estudianteId, data]) => ({
        estudiante: estudianteId,
        ausencias: this.totalClasesEstimado - data.total,
        porcentaje: ((this.totalClasesEstimado - data.total) / this.totalClasesEstimado * 100).toFixed(1) + '%',
      })).filter(a => a.ausencias > 0)

      doc.autoTable({
        head: [['Estudiante ID', 'Ausencias', 'Porcentaje']],
        body: ausencias.map(a => [a.estudiante, a.ausencias, a.porcentaje]),
      })
      doc.save('reporte_ausencias.pdf')
    },

    generarReporteSuspensos() {
      const doc = new jsPDF()
      const suspensos = this.evaluaciones.filter(e => e.calificacion < 60).map(e => ({
        estudiante: e.id_estudiante,
        asignatura: e.id_evaluacion,
        calificacion: e.calificacion,
      }))

      doc.autoTable({
        head: [['Estudiante ID', 'Asignatura ID', 'Calificación']],
        body: suspensos.map(s => [s.estudiante, s.asignatura, s.calificacion]),
      })
      doc.save('reporte_suspensos.pdf')
    },

    generarReporteSinDerecho() {
      const doc = new jsPDF()
      const asistenciasPorEstudiante = {}
      this.asistencias.forEach(a => {
        if (!asistenciasPorEstudiante[a.id_estudiante]) {
          asistenciasPorEstudiante[a.id_estudiante] = { total: 0 }
        }
        asistenciasPorEstudiante[a.id_estudiante].total += 1
      })

      const sinDerecho = Object.entries(asistenciasPorEstudiante)
        .map(([estudianteId, data]) => {
          const porcentaje = ((this.totalClasesEstimado - data.total) / this.totalClasesEstimado * 100)
          return { estudiante: estudianteId, porcentaje: porcentaje.toFixed(1) + '%' }
        })
        .filter(a => parseFloat(a.porcentaje) >= 20)

      doc.autoTable({
        head: [['Estudiante ID', 'Porcentaje Ausencias']],
        body: sinDerecho.map(s => [s.estudiante, s.porcentaje]),
      })
      doc.save('reporte_sin_derecho.pdf')
    },

    generarReporte20Porciento() {
      const doc = new jsPDF()
      const asistenciasPorEstudiante = {}
      this.asistencias.forEach(a => {
        if (!asistenciasPorEstudiante[a.id_estudiante]) {
          asistenciasPorEstudiante[a.id_estudiante] = { total: 0 }
        }
        asistenciasPorEstudiante[a.id_estudiante].total += 1
      })

      const exceso20 = Object.entries(asistenciasPorEstudiante)
        .map(([estudianteId, data]) => {
          const porcentaje = ((this.totalClasesEstimado - data.total) / this.totalClasesEstimado * 100)
          return { estudiante: estudianteId, porcentaje: porcentaje.toFixed(1) + '%' }
        })
        .filter(a => parseFloat(a.porcentaje) > 20)

      doc.autoTable({
        head: [['Estudiante ID', 'Porcentaje Ausencias']],
        body: exceso20.map(e => [e.estudiante, e.porcentaje]),
      })
      doc.save('reporte_exceso_20.pdf')
    },
  },
})
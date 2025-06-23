import { defineStore } from 'pinia'
import { usePaseAsistenciaStore } from 'src/stores/pasesdeasistencia'
import { useQuasar } from 'quasar'

export const useNotificacionStore = defineStore('notificacion', {
  state: () => ({ 
    notificaciones: [],
    $q: useQuasar(),
    totalClasesEstimado: 20,
  }),

  actions: {
    async fetchNotificaciones() {
      this.notificaciones = [
        { id: 1, mensaje: 'Notificación de prueba', destinatario: 'estudiante_1', tipo: 'alerta' },
        { id: 2, mensaje: 'Otra notificación', destinatario: 'profesor_1', tipo: 'info' },
      ]
    },

    async createNotificacion({ destinatario, mensaje, tipo }) {
      const newId = this.notificaciones.length + 1
      const newNotificacion = { id: newId, destinatario, mensaje, tipo }
      this.notificaciones.push(newNotificacion)
      this.showNotification(mensaje, tipo)
    },

    async updateNotificacion(id, { mensaje, tipo }) {
      const index = this.notificaciones.findIndex(n => n.id === id)
      if (index !== -1) {
        this.notificaciones[index] = { ...this.notificaciones[index], mensaje, tipo }
        this.showNotification(mensaje, tipo)
      }
    },

    async deleteNotificacion(id) {
      this.notificaciones = this.notificaciones.filter(n => n.id !== id)
    },

    showNotification(mensaje, tipo) {
      this.$q.notify({
        color: tipo === 'alerta' ? 'warning' : 'positive',
        message: mensaje,
        icon: tipo === 'alerta' ? 'warning' : 'check_circle',
        position: 'top',
      })
    },

    checkAusenciasPeriodically() {
      this.checkAusencias()
      setInterval(() => {
        this.checkAusencias()
      }, 5 * 60 * 1000) // Cada 5 minutos
    },

    checkAusencias() {
      const paseAsistenciaStore = usePaseAsistenciaStore()
      let asistencias = paseAsistenciaStore.asistencias

      if (!asistencias.length) {
        asistencias = [
          { id_estudiante: 1, id_P1: 1, fecha: '2025-06-19' }, // 1 asistencia (95% ausencias)
          { id_estudiante: 2, id_P1: 1, fecha: '2025-06-18' }, // 1 asistencia (95% ausencias)
          { id_estudiante: 3, id_P1: 1, fecha: '2025-06-17' }, // 1 asistencia (95% ausencias)
          { id_estudiante: 4, id_P1: 1, fecha: '2025-06-16' }, // 1 asistencia (95% ausencias)
          { id_estudiante: 5, id_P1: 1, fecha: '2025-06-15' }, // 5 asistencias (75% ausencias, cerca del 20%)
        ]
      }

      const asistenciasPorEstudiante = {}
      asistencias.forEach(a => {
        if (!asistenciasPorEstudiante[a.id_estudiante]) {
          asistenciasPorEstudiante[a.id_estudiante] = { total: 0 }
        }
        asistenciasPorEstudiante[a.id_estudiante].total += 1 
      })

      Object.entries(asistenciasPorEstudiante).forEach(([estudianteId, data]) => {
        const ausencias = this.totalClasesEstimado - data.total
        const porcentajeAusencias = (ausencias / this.totalClasesEstimado) * 100

        if (porcentajeAusencias >= 20) {
          this.createNotificacion({
            destinatario: `estudiante_${estudianteId}`,
            mensaje: `Has superado el 20% de ausencias (${porcentajeAusencias.toFixed(1)}%). Contacta a tu profesor.`,
            tipo: 'alerta',
          })
          this.createNotificacion({
            destinatario: `profesor_1`,
            mensaje: `El estudiante ${estudianteId} ha superado el 20% de ausencias.`,
            tipo: 'alerta',
          })
        } else if (porcentajeAusencias >= 15) {
          this.createNotificacion({
            destinatario: `estudiante_${estudianteId}`,
            mensaje: `Estás cerca del 20% de ausencias (${porcentajeAusencias.toFixed(1)}%). ¡Precaución!`,
            tipo: 'alerta',
          })
          this.createNotificacion({
            destinatario: `profesor_1`,
            mensaje: `El estudiante ${estudianteId} está cerca del 20% de ausencias.`,
            tipo: 'alerta',
          })
        }
      })
    },
  },
})
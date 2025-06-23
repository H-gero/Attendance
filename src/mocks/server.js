import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

export const server = setupServer(
  http.get('*/api/actividades', () => {
    return HttpResponse.json([{ id: 1, id_asignatura: 1, id_tipo_clase: 1, orden: 1 }])
  }),
  http.get('*/api/estudiantes', () => {
    return HttpResponse.json([{ id: 'est_001', name: 'Ailenis López León' }])
  }),
  http.get('*/api/asistencias/all', () => {
    return HttpResponse.json([{ id: 1, name: 'Presente' }])
  }),
  http.get('*/api/asignatura/all', () => {
    return HttpResponse.json({ asignaturas: [{ id: 1, nombre: 'RSI' }] })
  }),
  http.get('*/api/tipos-clase/all', () => {
    return HttpResponse.json([{ id: 1, nombre: 'Clase' }])
  }),
  http.post('*/api/pases', () => {
    return HttpResponse.json({ sesionId: 'sesion-12345' })
  })
)

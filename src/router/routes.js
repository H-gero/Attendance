import Login from 'src/components/LoginForm.vue'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/asistencia', component: () => import('pages/AsistenciaView.vue') }, // Cambiado de src/views a pages
      { path: '/evaluaciones', component: () => import('pages/EvaluacionesView.vue') }, // Cambiado de src/views a pages
      { path: '/estudiantes', component: () => import('pages/EstudiantesView.vue') },
      { path: '/grupo', component: () => import('pages/GrupoView.vue') },
      { path: '/profesor', component: () => import('pages/ProfesorView.vue') },
      { path: '/usuario', component: () => import('pages/UsuarioView.vue') },
      { path: '/tipodeclase', component: () => import('pages/TipoClaseView.vue') },
      { path: '/asignaturas', component: () => import('pages/AsignaturaView.vue') },
      { path: '/p1', component: () => import('pages/P1View.vue') },
      { path: '/pasesdeevaluaciones', component: () => import('pages/PaseEvaluacionView.vue') },
      { path: '/login', component: Login }, // Ruta para el componente de inicio de sesión
      { path: '/qr-asistencia', component: () => import('src/components/EscanearPase.vue') }, // Corregido
      {
        path: '/pasesdeasistencia',
        component: () => import('pages/PaseAsistenciaView.vue'),
        meta: { requiresAuth: true, role: 'profesor' },
      },
      { path: '/p1', component: () => import('pages/P1View.vue'), meta: { requiresAuth: true, role: 'profesor' } },
      { path: '/login', component: Login },
      {
        path: '/qr-asistencia',
        component: () => import('src/components/EscanearPase.vue'),
        meta: { requiresAuth: true, role: 'estudiante' },
      },
      {
        path: '/notificaciones',
        component: () => import('pages/NotificacionesView.vue'),
      },
      {
        path: '/reportes',
        component: () => import('pages/ReportesView.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes

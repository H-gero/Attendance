<!-- src/layouts/MainLayout.vue -->
<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import EssentialLink from 'components/EssentialLink.vue'

const $q = useQuasar()
const authStore = useAuthStore()
const router = useRouter()
const leftDrawerOpen = ref(false)
const authData = localStorage.getItem('authData')

const linksList = ref([
  {
    title: 'Estudiantes',
    caption: 'Vista estudiantes',
    icon: 'school',
    link: 'estudiantes',
    roles: ['admin'],
  },
  {
    title: 'Evaluaciones',
    caption: 'Vista evaluaciones',
    icon: 'chat',
    link: 'evaluaciones',
    roles: ['admin'],
  },
  {
    title: 'Grupos',
    caption: 'Vista de grupos',
    icon: 'group',
    link: 'grupo',
    roles: ['admin'],
  },
  {
    title: 'Asistencias',
    caption: 'Vista de asistencias',
    icon: 'code',
    link: 'asistencia',
    roles: ['admin'],
  },
  {
    title: 'Profesores',
    caption: 'Vista de profesores',
    icon: 'record_voice_over',
    link: 'profesor',
    roles: ['admin'],
  },
  {
    title: 'Usuario',
    caption: 'Vista de usuario',
    icon: 'rss_feed',
    link: 'usuario',
    roles: ['admin', 'profesor', 'estudiante'],
  },
  {
    title: 'Tipo de clase',
    caption: 'Vista de tipo de clase',
    icon: 'public',
    link: 'tipodeclase',
    roles: ['admin'],
  },
  {
    title: 'Asignaturas',
    caption: 'Vista de asignaturas',
    icon: 'favorite',
    link: 'asignaturas',
    roles: ['admin'],
  },
  {
    title: 'P1',
    caption: 'Vista del p1',
    icon: 'event',
    link: 'p1',
    roles: ['profesor'],
  },
  {
    title: 'Pases de asistencia',
    caption: 'Vista del pases de asistencia',
    icon: 'qr_code',
    link: 'pasesdeasistencia',
    roles: ['profesor'],
  },
  {
    title: 'Escanear QR',
    caption: 'Vista del escanear QR',
    icon: 'qr_code_scanner',
    link: 'qr-asistencia',
    roles: ['estudiante'],
  },
  {
    title: 'Administración',
    caption: 'Panel de administración',
    icon: 'admin_panel_settings',
    link: 'admin',
    roles: ['admin'],
  },
  {
    title: 'Pase de evaluación',
    caption: 'Vista de evaluación',
    icon: 'admin_panel_settings',
    link: 'pasesdeevaluaciones',
    roles: ['profesor'],
  },
])

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

async function handleLogout() {
  try {
    // authStore.logout()
    if (authData) {
      localStorage.removeItem('authData')
    }
    $q.notify({
      color: 'positive',
      message: 'Sesión cerrada correctamente.',
      icon: 'check',
    })
    router.push('/login')
  } catch (error) {
    console.error(error.message)
    $q.notify({
      color: 'negative',
      message: 'Error al cerrar sesión.',
      icon: 'warning',
    })
  }
}
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <div class="flex items-center q-mr-md">
          <q-icon name="school" size="40px" color="white" />
          <q-toolbar-title>Attendance UCI</q-toolbar-title>
        </div>
        <q-space></q-space>
        <q-btn flat round dense icon="exit_to_app" @click="handleLogout" aria-label="Cerrar sesión" />
        <q-avatar v-if="authStore?.isAuthenticated" color="secondary" text-color="white">
          {{ authStore?.user?.name?.charAt(0) || 'U' }}
        </q-avatar>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" bordered class="bg-grey-1">
      <q-list>
        <q-item-label header class="text-grey-8">Menú</q-item-label>

        <!-- <div
          v-if="
            this.authStore?.isAuthenticated &&
            (!link.roles || link.roles.includes(authStore?.user?.role || ''))
          "
        > -->
        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
        <!-- </div> -->
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.q-toolbar {
  height: 60px;
}

.q-drawer {
  width: 250px;
}
</style>

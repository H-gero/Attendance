<script setup>
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const router = useRouter()

onMounted(() => {
  const authData = localStorage.getItem('authData')
  if (!authData) {
    router.replace('/login')
  }
})
</script>
<template>
  <q-page class="q-pa-md">
    <!-- Sección de bienvenida -->
    <div class="row justify-center q-mb-xl">
      <div class="col-12 col-md-8 text-center">
        <h1 class="text-h3 text-weight-bold text-primary">Bienvenido a ATTENDANCE</h1>
        <p class="text-h6 text-grey-7 q-mt-md">
          Registra tu asistencia de forma rápida y segura con códigos QR
        </p>
        <q-img src="" alt="QR Animation" style="max-width: 300px; margin: 0 auto; box-shadow: 0 4px 8px rgba(0,0,0,0.1)"
          class="q-mt-md" />
        <q-btn color="positive" size="lg" class="q-mt-md" label="Empezar ahora" :to="{ path: '/pasesdeasistencia' }"
          unelevated />
      </div>
    </div>

    <!-- Sección de roles -->
    <div class="row q-gutter-md justify-center q-mb-xl">
      <q-card flat class="col-12 col-md-5 bg-teal-1 text-center q-pa-md">
        <q-icon name="school" size="2rem" color="teal" />
        <h6 class="text-weight-bold q-mt-sm">Para Profesores</h6>
        <p class="text-grey-7">Genera códigos QR y registra asistencias manualmente.</p>
        <q-btn color="teal" class="q-mt-md" label="Gestionar asistencia" :to="{ path: '/pasesdeasistencia' }"
          unelevated />
      </q-card>
      <q-card flat class="col-12 col-md-5 bg-teal-1 text-center q-pa-md">
        <q-icon name="person" size="2rem" color="teal" />
        <h6 class="text-weight-bold q-mt-sm">Para Estudiantes</h6>
        <p class="text-grey-7">Escanea tu código QR para registrar tu asistencia.</p>
        <q-btn color="teal" class="q-mt-md" label="Escanear QR" :to="{ path: '/qr-asistencia' }" unelevated />
      </q-card>
    </div>

    <!-- Estadísticas rápidas -->
    <div class="row q-gutter-md justify-center q-mb-xl">
      <q-card flat class="col-12 col-md-3 bg-grey-2 text-center q-pa-md">
        <q-icon name="check_circle" size="2rem" color="primary" />
        <p class="text-h6">1000 Asistencias totales</p>
      </q-card>
      <q-card flat class="col-12 col-md-3 bg-grey-2 text-center q-pa-md">
        <q-icon name="trending_up" size="2rem" color="primary" />
        <p class="text-h6">98% Precisión</p>
      </q-card>
    </div>

    <!-- Características destacadas -->
    <div class="row q-gutter-md justify-center q-mb-xl">
      <q-card flat class="col-12 col-md-3 bg-grey-2 text-center q-pa-md">
        <q-icon name="qr_code" size="2rem" color="primary" />
        <h6 class="text-weight-bold q-mt-sm">Generación de QR</h6>
        <p class="text-grey-7">Para profesores, crea QR en segundos.</p>
      </q-card>
      <q-card flat class="col-12 col-md-3 bg-grey-2 text-center q-pa-md">
        <q-icon name="scan" size="2rem" color="primary" />
        <h6 class="text-weight-bold q-mt-sm">Escaneo fácil</h6>
        <p class="text-grey-7">Para estudiantes, escanea con tu móvil.</p>
      </q-card>
      <q-card flat class="col-12 col-md-3 bg-grey-2 text-center q-pa-md">
        <q-icon name="notifications" size="2rem" color="primary" />
        <h6 class="text-weight-bold q-mt-sm">Notificaciones</h6>
        <p class="text-grey-7">Alertas instantáneas para todos.</p>
      </q-card>
    </div>

    <!-- Llamado a la acción -->
    <div class="row justify-center bg-primary text-white q-pa-lg text-center">
      <div class="col-12 col-md-8">
        <h5 class="text-h5">¡Optimiza tu asistencia hoy!</h5>
        <q-btn color="white" text-color="primary" class="q-mt-md" label="Acceder al formulario"
          :to="{ path: '/pase-asistencia' }" unelevated />
      </div>
    </div>

    <!-- Pie de página -->
    <q-footer class="bg-grey-10 text-white q-py-md text-center">
      <p>ATTENDANCE © 2025 </p>
      <q-btn flat label="Ayuda" to="/help" color="white" />
      <q-img src="~assets/quasar-logo-vertical.svg" alt="Quasar logo"
        style="width: 100px; height: 100px; margin-top: 10px" />
    </q-footer>
  </q-page>
</template>

<style scoped>
.q-page {
  background: linear-gradient(to bottom, #f0f4f8, #ffffff);
}

.q-card {
  transition: transform 0.3s;
}

.q-card:hover {
  transform: scale(1.05);
}

.bg-primary {
  border-radius: 10px;
}
</style>

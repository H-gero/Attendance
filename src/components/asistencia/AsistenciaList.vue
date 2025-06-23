<template>
  <div class="mt-8">
    <!-- <h3 class="text-2xl font-semibold text-gray-700 mb-4">Registros de Asignaturas</h3> -->
    <div class="text-2xl font-semibold text-gray-700 mb-4">Registros de Asistencias</div>

    <div v-if="store.asistencias.length === 0" class="text-center q-my-lg">
      <q-icon name="info" size="lg" class="q-mr-sm" />
      No hay asistencias registradas
    </div>
    <TransitionGroup v-else tag="ul" name="list" class="space-y-4">
      <AsistenciaListItem
        v-for="asistencia in store.asistencias"
        :key="asistencia.id"
        :id="asistencia.id"
        :nombre="asistencia.name"
        :descripcion="asistencia.description"
        :color="asistencia.color"
        :active="asistencia.active"
      />
    </TransitionGroup>
  </div>
</template>

<script setup>
import { useAsistencia } from 'src/stores/asistencia'
import { useQuasar } from 'quasar'
import { onMounted } from 'vue' // Añadir esta importación
import AsistenciaListItem from './AsistenciaListItem.vue'

const store = useAsistencia()

const { fetchAsistencias } = store

const $q = useQuasar()

// Implementación correcta de onMounted
onMounted(async () => {
  try {
    await fetchAsistencias()
  } catch (error) {
    console.error('Error cargando asistencias:', error)
    // Puedes agregar notificación al usuario aquí si lo deseas
    $q.notify({
      type: 'negative',
      message: `Error al cargar registro de asistencias: ${error.message}`,
    })
  }
})
</script>

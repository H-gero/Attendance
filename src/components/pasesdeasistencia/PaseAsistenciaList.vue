<script setup>
import { onMounted } from 'vue'
import { usePaseAsistenciaStore } from '../../stores/pasesdeasistencia'
import PaseAsistenciaListItem from './PaseAsistenciaListItem.vue'

const store = usePaseAsistenciaStore()

onMounted(() => {
  store.fetchPaseAsistencias()
})
</script>

<template>
  <div class="mt-8">
    <div class="text-2xl font-semibold text-gray-700 mb-4">Registros de Pases de Asistencia</div>
    <div v-if="store.asistencias.length === 0" class="text-gray-500">
      No hay asistencias registradas.
    </div>
    <TransitionGroup v-else tag="ul" name="list" class="space-y-4">
      <PaseAsistenciaListItem
        v-for="asistencia in store.asistencias"
        :key="`asistencia-item-${asistencia.id}`"
        :asistencia="asistencia"
        @delete="store.fetchPaseAsistencias()"
        class="animate__animated animate__fadeIn"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
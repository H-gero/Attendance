<script setup>
import { onMounted } from 'vue'
import { usePaseAsistenciaStore } from '../../stores/pasesdeasistencia'
import PaseAsistenciaListItem from './PaseAsistenciaListItem.vue'
import { ref, watch } from 'vue'

const store = usePaseAsistenciaStore()
const currentPage = ref(store.currentPage)

watch(currentPage, (val) => {
  onPageChange(val)
})

function onPageChange(page) {
  console.log(page);
  store.fetchPaseAsistencias({ limit: 5, offset: (page - 1) * 5 })
}

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
      <PaseAsistenciaListItem v-for="asistencia in store.asistencias" :key="`asistencia-item-${asistencia.id}`"
        :asistencia="asistencia" @delete="store.fetchPaseAsistencias()" class="animate__animated animate__fadeIn" />
    </TransitionGroup>
    <q-pagination v-model="currentPage" :max="store.pages" :max-pages="7" boundary-numbers
      @update:model-value="onPageChange" class="q-mt-md" />
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

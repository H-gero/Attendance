<script setup>
import { onMounted } from 'vue'
import { usePaseEvaluacionStore } from 'src/stores/pasesdeevaluacion'
import { useQuasar } from 'quasar'
import PaseEvaluacionListItem from './PaseEvaluacionListItem.vue'
import { ref, watch } from 'vue'

const store = usePaseEvaluacionStore()
const $q = useQuasar()
const currentPage = ref(store.currentPage)

watch(currentPage, (val) => {
  onPageChange(val)
})

function onPageChange(page) {
  console.log(page);
  store.fetchEvaluaciones({ limit: 5, offset: (page - 1) * 5 })
}

onMounted(async () => {
  try {
    await store.fetchEvaluaciones()
  } catch (error) {
    alert(error)
    $q.notify({
      color: 'negative',
      message: 'Error al cargar evaluaciones.',
      icon: 'warning',
    })
  }
})
</script>

<template>
  <div class="mt-8">
    <div class="text-2xl font-semibold text-gray-700 mb-4">Registros de Evaluaciones</div>
    <div v-if="store.evaluaciones?.length === 0" class="text-gray-500">
      No hay evaluaciones registradas.
    </div>
    <TransitionGroup v-else tag="ul" name="list" class="space-y-4">
      <PaseEvaluacionListItem v-for="evaluacion in store.evaluaciones" :key="`evaluacion-item${evaluacion.id}`"
        :evaluacion="evaluacion" class="animate__animated animate__fadeIn" />
    </TransitionGroup>
    <q-pagination v-model="currentPage" :max="store.pages" :max-pages="7" boundary-numbers
      @update:model-value="onPageChange" class="q-mt-md" />
  </div>
</template>

<style scoped>
h3 {
  font-size: 1.5rem;
  font-weight: 500;
  color: #4a4a4a;
}

ul {
  list-style: none;
  padding: 0;
}

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

<script setup>
import { onMounted } from 'vue'
import { useEvaluacionStore } from 'src/stores/evaluaciones'
import { useQuasar } from 'quasar'

import EvaluacionesListItem from './EvaluacionesListItem.vue'

const store = useEvaluacionStore()
const $q = useQuasar()

onMounted(async () => {
  try {
    await store.fetchEvaluaciones()
  } catch (error) {
    console.error(error)
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
      <EvaluacionesListItem v-for="evaluacion in store.evaluaciones" :key="`evaluacion-${evaluacion.id}`"
        :id="evaluacion.id" :nombre="evaluacion.name" :descripcion="evaluacion.description" :tipo="evaluacion.tipo"
        :active="evaluacion.active" />
    </TransitionGroup>
  </div>
</template>

<!-- <script setup>
import { onMounted } from 'vue'
import { useEvaluaciones } from 'src/stores/evaluaciones'
import { useQuasar } from 'quasar'

import EvaluacionesListItem from './EvaluacionesListItem.vue'

const store = useEvaluaciones()
const $q = useQuasar()

onMounted(async () => {
  try {
    await store.fetchEvaluaciones()
  } catch (error) {
    alert(error)
    $q.notify({
      color: 'negative',
      message: 'Por favor, completa todos los campos requeridos.',
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
      <EvaluacionesListItem
        v-for="evaluacion in store.evaluaciones"
        :key="`evaluacion-item${evaluacion.id}`"
        :id="evaluacion.id"
        :nombre="evaluacion.name"
        :descripcion="evaluacion.description"
        :tipo="evaluacion.tipo"
        :active="evaluacion.active"
        class="animate__animated animate__fadeIn"
      />
    </TransitionGroup>
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
</style> -->

<script setup>
import { onMounted } from 'vue'
import { useAsignaturaStore } from 'src/stores/asignatura'
import { useQuasar } from 'quasar'

import AsignaturaListItem from './AsignaturaListItem.vue'

const store = useAsignaturaStore()
const $q = useQuasar()

onMounted(async () => {
  try {
    await store.fetchAsignaturas()
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
    <div class="text-2xl font-semibold text-gray-700 mb-4">Registros de Asignaturas</div>
    <div v-if="store.asignaturas?.length === 0" class="text-gray-500">
      No hay asignaturas registradas.
    </div>
    <TransitionGroup v-else tag="ul" name="list" class="space-y-4">
      <AsignaturaListItem
        v-for="asignatura in store.asignaturas"
        :key="`asignatura-item${asignatura.id}`"
        :id="asignatura.id"
        :nombre="asignatura.name"
        :descripcion="asignatura.description"
        :active="asignatura.active"
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
</style>

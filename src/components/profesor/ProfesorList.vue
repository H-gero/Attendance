<script setup>
import { onMounted } from 'vue'
import { useProfesoresStore } from 'src/stores/profesores'
import ProfesorListItem from './ProfesorListItem.vue'

const store = useProfesoresStore()

onMounted(() => {
  store.fetchProfesores()
})
</script>

<template>
  <div class="mt-8">
    <div class="text-2xl font-semibold text-gray-700 mb-4">Registros de Profesores</div>
    <div v-if="store.profesores?.length === 0" class="text-gray-500">
      No hay profesores registradas.
    </div>
    <TransitionGroup v-else tag="ul" name="list" class="space-y-4">
      <ProfesorListItem
        v-for="profesor in store.profesores"
        :key="`profesor-item${profesor.id}`"
        :id="profesor.id"
        :nombre="profesor.name"
        :apellido="profesor.apellido"
        :id_usuario="profesor.id_usuario"
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
  transform: translateY(20px);
}
</style>
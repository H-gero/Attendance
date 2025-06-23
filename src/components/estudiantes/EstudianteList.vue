<script setup>
import { onMounted } from 'vue'
import { useEstudiantesStore } from 'src/stores/estudiantes'

const store = useEstudiantesStore()

onMounted(() => {
  store.fetchEstudiantes()
})
</script>

<template>
   <div class="mt-8">
    <div class="text-2xl font-semibold text-gray-700 mb-4">Registros de Estudiantess</div>
    <div v-if="store.estudiantes?.length === 0" class="text-gray-500">
      No hay estudiantes registrados.
    </div>
    <TransitionGroup v-else tag="div" name="list" class="space-y-4">
      <div
        v-for="estudiante in store.estudiantes"
        :key="estudiante.id"
        class="border rounded-lg p-4 flex justify-between items-center animate__animated animate__fadeIn"
      >
        <div>
          <div class="text-lg font-semibold text-gray-800">
            {{ estudiante.nombre }} {{ estudiante.apellido }}
          </div>
          <div class="text-sm text-gray-600">
            ID de Usuario: {{ estudiante.id_usuario }}
          </div>
        </div>
        <div class="flex space-x-2">
          <q-btn
            flat
            color="primary"
            label="Editar"
            @click="store.setEstudianteEnEdicion(estudiante)"
          />
          <q-btn
            flat
            color="negative"
            label="Eliminar"
            @click="store.deleteEstudiante(estudiante.id)"
          />
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
h3 {
  font-size: 1.5rem;
  font-weight: 500;
  color: #4a4a4a;
}

.border {
  border-color: #e5e7eb;
}

.q-btn {
  text-transform: uppercase;
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
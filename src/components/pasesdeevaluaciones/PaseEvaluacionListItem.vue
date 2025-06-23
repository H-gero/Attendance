<script setup>
import { usePaseEvaluacionStore } from 'src/stores/pasesdeevaluacion'

const store = usePaseEvaluacionStore()

const props = defineProps({
  evaluacion: {
    type: Object,
    required: true,
  },
})

function deleteEvaluacion() {
  store.deleteEvaluacion(props.evaluacion.id)
}

function editarEvaluacion() {
  store.setEvaluacionEnEdicion({
    id: props.evaluacion.id,
    id_estudiante: props.evaluacion.id_estudiante,
    id_evaluacion: props.evaluacion.id_evaluacion,
    id_P1: props.evaluacion.id_P1,
    fecha: props.evaluacion.fecha,
  })
}
</script>

<template>
  <li
    class="border rounded-lg p-4 flex justify-between shadow-md hover:shadow-lg transition-all duration-300 items-center"
  >
    <div>
      <div class="text-lg font-semibold text-gray-800">
        Evaluación ID: {{ evaluacion.id_evaluacion }} - Estudiante ID: {{ evaluacion.id_estudiante }}
      </div>
      <div class="text-sm text-slate-600 mb-4">
        P1 ID: {{ evaluacion.id_P1 }} | Fecha: {{ new Date(evaluacion.fecha).toLocaleDateString() }}
      </div>
    </div>
    <div class="flex space-x-2">
      <q-btn flat color="primary" label="Editar" @click="editarEvaluacion" />
      <q-btn flat color="negative" label="Eliminar" @click="deleteEvaluacion" />
    </div>
  </li>
</template>

<style scoped>
.border {
  border-color: #e5e7eb;
}

.q-btn {
  text-transform: uppercase;
}
</style>
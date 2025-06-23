<script setup>
import { useAsignaturaStore } from 'src/stores/asignatura'

const store = useAsignaturaStore()
const props = defineProps({
  id: [Number, String],
  nombre: String,
  descripcion: String,
  active: Boolean,
})

function deleteAsignatura() {
  store.deleteAsignatura(props.id)
}

function editarAsignatura() {
  store.setAsignaturaEnEdicion({
    id: props.id,
    nombre: props.nombre,
    descripcion: props.descripcion,
    active: props.active,
  })
}
</script>

<template>
  <li
    class="border rounded-lg p-4 flex justify-between shadow-md hover:shadow-lg transition-all duration-300 items-center">
    <div>
      <div class="text-lg font-semibold text-gray-800">
        {{ nombre }}
      </div>
      <div class="text-sm text-slate-600 mb-4">
        {{ descripcion }}
      </div>
      <div class="text-sm text-gray-600">Activo: {{ active ? 'Sí' : 'No' }}</div>
    </div>
    <div class="flex space-x-2">
      <q-btn flat color="primary" label="Editar" @click="editarAsignatura" />
      <q-btn flat color="negative" label="Eliminar" @click="deleteAsignatura" />
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

<script setup>
import { useEstudiantesStore } from 'src/stores/estudiantes'

const store = useEstudiantesStore()
const props = defineProps({
  id: Number,
  nombre: String,
  apellido: String,
  id_usuario: String,
})

function deleteEstudiante() {
  store.deleteEstudiante(props.id)
}

function editarEstudiante() {
  store.setEstudianteEnEdicion({
    id: props.id,
    nombre: props.nombre,
    apellido: props.apellido,
    id_usuario: props.id_usuario,
  })
}
</script>

<template>
  <li class="border rounded-lg p-4 flex justify-between items-center">
    <div>
      <div class="text-lg font-semibold text-gray-800">
        {{ nombre }} {{ apellido }}
      </div>
    </div>
    <div class="flex space-x-2">
      <q-btn flat color="primary" label="Editar" @click="editarEstudiante" />
      <q-btn flat color="negative" label="Eliminar" @click="deleteEstudiante" />
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
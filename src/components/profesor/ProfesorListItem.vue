<script setup>
import { useProfesoresStore } from 'src/stores/profesores'

const store = useProfesoresStore()
const props = defineProps({
  id: [String, Number],
  nombre: String,
  apellido: String,
  id_usuario: String,
})

function deleteProfesor() {
  store.deleteProfesor(props.id)
}

function editarProfesor() {
  store.setProfesorEnEdicion({
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
      <q-btn flat color="primary" label="Editar" @click="editarProfesor" />
      <q-btn flat color="negative" label="Eliminar" @click="deleteProfesor" />
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
<script setup>
import { useGrupoStore } from 'src/stores/grupo'

const store = useGrupoStore()
const props = defineProps({
  id: String,
  name: String,
  description: String,
  id_profesor: String,
  active: Boolean,
})

function deleteGrupo() {
  store.deleteGrupo(props.id)
}

function editarGrupo() {
  store.setGrupoEnEdicion({
    id: props.id,
    name: props.name,
    description: props.description,
    id_profesor: props.id_profesor,
    active: props.active,
  })
}
</script>

<template>
  <li
    class="border rounded-lg p-4 flex justify-between shadow-md hover:shadow-lg transition-all duration-300 items-center">
    <div>
      <div class="text-lg font-semibold text-gray-800">
        {{ name }}
      </div>
      <div class="text-sm text-slate-600 mb-1">Descripción: {{ description || '---' }}</div>
      <div class="text-sm text-slate-600 mb-1">Id-Profesor: {{ id_profesor }}</div>
      <div class="text-sm text-gray-600">Activo: {{ active ? 'Sí' : 'No' }}</div>
    </div>
    <div class="flex space-x-2">
      <q-btn flat color="primary" label="Editar" @click="editarGrupo" />
      <q-btn flat color="negative" label="Eliminar" @click="deleteGrupo" />
    </div>
  </li>
</template>



<!-- <script setup>
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
      <div class="text-sm text-gray-600">
        ID de Usuario: {{ id_usuario }}
      </div>
    </div>
    <div class="flex space-x-2">
      <q-btn
        flat
        color="primary"
        label="Editar"
        @click="editarEstudiante"
      />
      <q-btn
        flat
        color="negative"
        label="Eliminar"
        @click="deleteEstudiante"
      />
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
</style> -->

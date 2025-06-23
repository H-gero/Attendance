<script setup>
import { onMounted } from 'vue'
import { useAsistencia } from 'src/stores/asistencia'

const store = useAsistencia()
const props = defineProps({
  id: String,
  nombre: String,
  descripcion: String,
  color: String,
  active: Boolean,
})

onMounted(() => {
  store.fetchAsistencias()
})

function deleteAsistencia() {
  if (confirm('¿Estás seguro de eliminar esta asistencia?')) {
    store.removeAsistencia(props.id) // Llama a la acción para eliminar asistencia
  }
}

function editarAsistencia() {
  store.setAsistenciaEnEdicion({
    id: props.id,
    nombre: props.nombre,
    descripcion: props.descripcion,
    color: props.color,
  })
}
</script>

<template>
  <li
    class="rounded-lg p-4 flex justify-between shadow-md hover:shadow-lg transition-all duration-300 items-center"
  >
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
      <q-btn flat color="primary" label="Editar" @click="editarAsistencia" />
      <q-btn flat color="negative" label="Eliminar" @click="deleteAsistencia" />
    </div>
  </li>
  <!-- <li
    class="border rounded-lg p-4 flex justify-between items-center shadow-md hover:shadow-lg transition-all duration-300"
  >
    <div class="p-4">
      <div class="flex items-center justify-between mb-2">
        <h3 class="text-lg font-semibold text-slate-800">
          {{ nombre }}
        </h3>
        <div
          class="w-6 h-6 rounded-full border-2 border-slate-200"
          :style="{ backgroundColor: color }"
        ></div>
      </div>

      <p class="text-slate-600 mb-4">
        {{ descripcion }} 
      </p>
      <div class="flex justify-end space-x-2">
        <q-btn flat color="primary" icon="edit" label="EDITAR" @click="editarAsistencia" />
        <q-btn flat color="negative" icon="delete" label="ELIMINAR" @click="deleteAsistencia" />
      </div>
    </div>
  </li> -->
</template>

<script setup>
import { ref } from 'vue'
import { usePaseAsistenciaStore } from '../../stores/pasesdeasistencia'
import ConfirmDeleteDialog from '../../components/ConfirmDeleteDialog.vue'

const store = usePaseAsistenciaStore()
const props = defineProps({
  asistencia: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['delete'])

const deleteDialog = ref(null)

const handleDelete = async (id) => {
  await store.deleteAsistencia(id)
  emit('delete', id) // Notifica al padre para recargar o actualizar
}

const editarAsistencia = () => {
  store.setAsistenciaEnEdicion({ ...props.asistencia })
}

const nombreEstudiante = props.asistencia.estudiante?.name || 'Estudiante desconocido'
const nombreActividad = props.asistencia.p1?.nombre || 'Actividad desconocida'
const tipoAsistencia = props.asistencia.asistencia?.name || 'Tipo desconocido'
</script>

<template>
  <li class="border rounded-lg p-4 flex justify-between items-center">
    <div>
      <div class="text-lg font-semibold text-gray-800">
        {{ nombreActividad }} - {{ nombreEstudiante }}
      </div>
      <div class="text-sm text-gray-600">
        Asistencia: {{ tipoAsistencia }} | Fecha: {{ new Date(asistencia.fecha).toLocaleString() }}
      </div>
    </div>
    <div class="flex space-x-2">
      <q-btn flat color="primary" label="Editar" @click="editarAsistencia" />
      <q-btn flat color="negative" label="Eliminar" @click="deleteDialog.showDialog = true; deleteDialog.itemId = asistencia.id; deleteDialog.deleteFunction = handleDelete" />
    </div>
    <ConfirmDeleteDialog ref="deleteDialog" :delete-function="handleDelete" @delete="emit('delete', asistencia.id)" />
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
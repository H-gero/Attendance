<script setup>
import { ref, watch } from 'vue'
import { useAsistencia } from 'src/stores/asistencia'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const store = useAsistencia()

const asistencia = ref({
  id: null,
  nombre: '',
  descripcion: '',
})

// Sincronizar con la asistencia en edición del store
watch(
  () => store.asistenciaEnEdicion,
  (newVal) => {
    if (newVal) {
      asistencia.value = { ...newVal }
    }
  },
  { immediate: true },
)

const submitForm = async () => {
  try {
    if (asistencia.value.id) {
      await store.editAsistencia(asistencia.value.id, asistencia.value)
      $q.notify({
        type: 'positive',
        message: 'Asistencia actualizada correctamente',
        position: 'top',
        timeout: 3000
      })
    } else {
      await store.createAsistencia(asistencia.value)
      $q.notify({
        type: 'positive',
        message: 'Asistencia creada correctamente',
        position: 'top',
        timeout: 3000
      })
    }
    resetForm()
    await store.fetchAsistencias() // Forzar actualización
  } catch (error) {
    console.error('Error al guardar asistencia:', error)
    $q.notify({
      type: 'negative',
      message: 'Error al guardar: ' + (error.response?.data?.message ||
        'Verifique los datos e intente nuevamente'),
      position: 'top',
      multiLine: true,
      actions: [{ label: 'OK', color: 'white' }],
      timeout: 5000
    })
  }
}

const resetForm = () => {
  asistencia.value = { id: null, nombre: '', descripcion: '' }
  store.setAsistenciaEnEdicion(null)
}

const cancelarEdicion = () => {
  resetForm()
}
</script>

<template>
  <div>
    <div class="text-2xl font-semibold text-slate-700 mb-6">
      {{ asistencia.id ? 'Editar Asistencia' : 'Nueva Asistencia' }}
    </div>

    <q-form @submit.prevent="submitForm" class="space-y-6">
      <q-input v-model="asistencia.nombre" label="Nombre" class="bg-slate-50" outlined :rules="[
        (val) => !!val || 'El nombre es requerido',
        (val) => /^[A-ZÁÉÍÓÚÑ][a-zA-ZáéíóúñÁÉÍÓÚÑüÜ\s'-]*$/.test(val) || 'Solo letras y debe empezar con mayúscula'
      ]" type="text" />

      <q-input v-model="asistencia.descripcion" type="textarea" label="Descripción" class="bg-slate-50" outlined
        :rules="[(val) => !!val || 'La descripción es requerida']" />


      <div class="flex justify-end space-x-3">
        <!-- Eliminar la condición de asistencia.id para el botón de cancelar -->
        <q-btn v-if="asistencia.id" flat label="Cancelar" color="grey" @click="cancelarEdicion" />
        <q-btn flat label="Limpiar" color="warning" type="reset" @click="resetForm" />
        <q-btn unelevated :label="asistencia.id ? 'Actualizar' : 'Guardar'" color="primary" type="submit" />
      </div>
    </q-form>
  </div>
</template>

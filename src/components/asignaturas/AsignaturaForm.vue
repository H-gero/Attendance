<script setup>
import { ref, watch } from 'vue'
import { useAsignaturaStore } from 'src/stores/asignatura'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const store = useAsignaturaStore()

const asignatura = ref({
  id: null,
  nombre: '',
  descripcion: '',
  active: false,
})

watch(
  () => store.asignaturaEnEdicion,
  (newValue) => {
    if (newValue) {
      asignatura.value = { ...newValue }
    }
  },
)

async function submitForm() {
  if (!asignatura.value.nombre || !asignatura.value.descripcion) {
    $q.notify({
      color: 'negative',
      message: 'Por favor, completa todos los campos requeridos.',
      icon: 'warning',
    })
    return
  }

  if (asignatura.value.id) {
    try {
      await store.updateAsignatura(asignatura.value.id, asignatura.value)
      $q.notify({
        color: 'positive',
        message: 'Asignatura actualizada correctamente',
        icon: 'check',
      })
    } catch (error) {
      // alert(error)
      $q.notify({
        color: 'negative',
        message: `Error actualizando asignatura: ${error}`,
        icon: 'warn',
      })
    }
  } else {
    try {
      await store.createAsignatura(asignatura.value)

      $q.notify({
        color: 'positive',
        message: 'Asignatura registrada correctamente 22222',
        icon: 'check',
      })
    } catch (error) {
      alert(error)
      $q.notify({
        color: 'negative',
        message: `Error al registrar asignatura:  ${error.message}`,
        icon: 'check',
      })
    }
  }
  resetForm()
}

function cancelarEdicion() {
  store.setAsignaturaEnEdicion(null)
  resetForm()
}

function resetForm() {
  asignatura.value = {
    id: null,
    nombre: '',
    descripcion: '',
    active: false,
  }
}
</script>

<template>
  <div class="animate__animated animate__fadeIn">
    <div class="text-2xl font-semibold text-gray-700 mb-6">
      {{ asignatura.id ? 'Editar Asignatura' : 'Nueva Asignatura' }}
    </div>

    <q-form @submit.prevent="submitForm" class="space-y-6">
      <q-input v-model="asignatura.nombre" label="Nombre" outlined :rules="[
        (val) => !!val || 'El nombre es requerido',
        (val) => /^[A-ZÁÉÍÓÚÑ][a-zA-ZáéíóúñÁÉÍÓÚÑüÜ\s'-]*$/.test(val) || 'Solo letras y debe empezar con mayúscula'
      ]" />

      <q-input v-model="asignatura.descripcion" label="Descripción" outlined :rules="[
        (val) => !!val || 'La descripción es requerida',
        (val) => /^[A-ZÁÉÍÓÚÑ]/.test(val) || 'Debe empezar con mayúscula'
      ]" />

      <q-toggle v-model="asignatura.active" label="Activo" color="teal" />

      <div class="flex justify-end space-x-3">
        <q-btn v-if="asignatura.id" flat label="Cancelar" color="grey" @click="cancelarEdicion" />
        <q-btn flat label="Limpiar" color="warning" type="reset" @click="resetForm" />
        <q-btn unelevated label="Guardar" color="primary" type="submit" />
      </div>
    </q-form>
  </div>
</template>

<style scoped>
h2 {
  font-size: 1.75rem;
  font-weight: 500;
  color: #4a4a4a;
}

.q-input,
.q-toggle {
  max-width: 400px;
}

.q-btn {
  text-transform: uppercase;
}
</style>

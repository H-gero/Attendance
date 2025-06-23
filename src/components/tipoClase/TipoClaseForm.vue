<script setup>
import { ref, watch } from 'vue'
import { useTipoClaseStore } from 'src/stores/tipoClase'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const store = useTipoClaseStore()

const tipoClase = ref({
  id: null,
  nombre: '',
  descripcion: '',
  active: false,
})

watch(
  () => store.tipoClaseEnEdicion,
  (newValue) => {
    if (newValue) {
      tipoClase.value = { ...newValue }
    }
  },
)

function submitForm() {
  if (!tipoClase.value.nombre || !tipoClase.value.descripcion) {
    $q.notify({
      color: 'negative',
      message: 'Por favor, completa todos los campos requeridos.',
      icon: 'warning',
    })
    return
  }

  if (tipoClase.value.id) {
    store.updateTipoClase(tipoClase.value.id, tipoClase.value)
    $q.notify({
      color: 'positive',
      message: 'Tipo de clase actualizado correctamente',
      icon: 'check',
    })
  } else {
    store.createTipoClase(tipoClase.value)
    $q.notify({
      color: 'positive',
      message: 'Tipo de clase registrado correctamente',
      icon: 'check',
    })
  }
  resetForm()
}

function cancelarEdicion() {
  store.setTipoClaseEnEdicion(null)
  resetForm()
}

function resetForm() {
  tipoClase.value = {
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
      {{ tipoClase.id ? 'Editar de Clase' : 'Nuevo Tipo de Clase' }}
    </div>
    <q-form @submit.prevent="submitForm" class="space-y-6">
      <q-input v-model="tipoClase.nombre" label="Nombre" outlined :rules="[
        (val) => !!val || 'El nombre es requerido',
        (val) => /^[A-ZÁÉÍÓÚÑ][a-zA-ZáéíóúñÁÉÍÓÚÑüÜ\s'-]*$/.test(val) || 'Solo letras y debe empezar con mayúscula'
      ]" />

      <q-input v-model="tipoClase.descripcion" label="Descripción" outlined :rules="[
        (val) => !!val || 'La descripción es requerida',
        (val) => /^[A-ZÁÉÍÓÚÑ]/.test(val) || 'Debe empezar con mayúscula'
      ]" />

      <q-toggle v-model="tipoClase.active" label="Activo" color="teal" />

      <div class="flex justify-end space-x-3">
        <q-btn v-if="tipoClase.id" flat label="Cancelar" color="grey" @click="cancelarEdicion" />
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
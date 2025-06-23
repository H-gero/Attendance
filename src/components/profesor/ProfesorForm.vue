<script setup>
import { ref, watch } from 'vue'
import { useProfesoresStore } from 'src/stores/profesores'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const store = useProfesoresStore()

const profesor = ref({
  id: null,
  nombre: '',
  apellido: '',
  id_usuario: '',
})

watch(
  () => store.profesorEnEdicion,
  (newValue) => {
    if (newValue) {
      profesor.value = { ...newValue }
    }
  },
)

function submitForm() {
  if (!profesor.value.nombre || !profesor.value.apellido || !profesor.value.id_usuario) {
    $q.notify({
      color: 'negative',
      message: 'Por favor, completa todos los campos requeridos.',
      icon: 'warning',
    })
    return
  }

  if (profesor.value.id) {
    store.updateProfesor(profesor.value.id, profesor.value)
    $q.notify({
      color: 'positive',
      message: 'Profesor actualizado correctamente',
      icon: 'check',
    })
  } else {
    store.createProfesor(profesor.value)
    $q.notify({
      color: 'positive',
      message: 'Profesor registrado correctamente',
      icon: 'check',
    })
  }
  resetForm()
}

function cancelarEdicion() {
  store.setProfesorEnEdicion(null)
  resetForm()
}

function resetForm() {
  profesor.value = {
    id: null,
    nombre: '',
    apellido: '',
    id_usuario: '',
  }
}
</script>

<template>
  <div class="animate__animated animate__fadeIn">
    <div class="text-2xl font-semibold text-gray-700 mb-6">
      {{ profesor.id ? 'Editar Profesor' : 'Nuevo Profesor' }}
    </div>


    <q-form @submit.prevent="submitForm" class="space-y-6">
      <q-input v-model="profesor.nombre" label="Nombre" outlined :rules="[
        (val) => !!val || 'El nombre es requerido',
        (val) => /^[A-ZÁÉÍÓÚÑ][a-zA-ZáéíóúñÁÉÍÓÚÑüÜ\s'-]*$/.test(val) || 'Solo letras y debe empezar con mayúscula'
      ]" />

      <q-input v-model="profesor.apellido" label="Apellido" outlined :rules="[
        (val) => !!val || 'El apellido es requerido',
        (val) => /^[A-ZÁÉÍÓÚÑ][a-zA-ZáéíóúñÁÉÍÓÚÑüÜ\s'-]*$/.test(val) || 'Solo letras y debe empezar con mayúscula'
      ]" />

      <q-input v-model="profesor.id_usuario" label="ID de Usuario" outlined :rules="[
        (val) => !!val || 'El ID de usuario es requerido',
        (val) => /^\d+$/.test(val) || 'Solo se permiten números',
        (val) => String(val).length === 11 || 'Debe tener exactamente 11 dígitos'
      ]" />

      <div class="flex justify-end space-x-3">
        <q-btn v-if="profesor.id" flat label="Cancelar" color="grey" @click="cancelarEdicion" />
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

.q-input {
  max-width: 400px;
}

.q-btn {
  text-transform: uppercase;
}
</style>
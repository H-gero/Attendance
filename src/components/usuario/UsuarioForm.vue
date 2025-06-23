<script setup>
import { ref, watch } from 'vue'
import { useUsuariosStore } from 'src/stores/usuarios'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const store = useUsuariosStore()

const usuario = ref({
  id: null,
  username: '',
  password: '',
  id_usuario: '',
})

watch(
  () => store.usuarioEnEdicion,
  (newValue) => {
    if (newValue) {
      usuario.value = { ...newValue }
    }
  },
)

function submitForm() {
  if (!usuario.value.username || !usuario.value.password || !usuario.value.id_usuario) {
    $q.notify({
      color: 'negative',
      message: 'Por favor, completa todos los campos requeridos.',
      icon: 'warning',
    })
    return
  }

  if (usuario.value.id) {
    store.updateUsuario(usuario.value.id, usuario.value)
    $q.notify({
      color: 'positive',
      message: 'Usuario actualizado correctamente',
      icon: 'check',
    })
  } else {
    store.createUsuario(usuario.value)
    $q.notify({
      color: 'positive',
      message: 'Usuario registrado correctamente',
      icon: 'check',
    })
  }
  resetForm()
}

function cancelarEdicion() {
  store.setUsuarioEnEdicion(null)
  resetForm()
}

function resetForm() {
  usuario.value = {
    id: null,
    username: '',
    password: '',
    id_usuario: '',
  }
}
</script>

<template>
  <div class="animate__animated animate__fadeIn">
    <div class="text-2xl font-semibold text-gray-700 mb-6">
      {{ usuario.id ? 'Editar Usuario' : 'Nuevo Usuario' }}
    </div>

    <q-form @submit.prevent="submitForm" class="space-y-6">
      <q-input v-model="usuario.username" label="Usuario" outlined :rules="[
        (val) => !!val || 'El usuario es requerido',
      ]" />

      <q-input v-model="usuario.password" label="Password" outlined type="password"
        :rules="[(val) => !!val || 'La contraseña es requerida']" />

      <q-input v-model="usuario.id_usuario" label="ID Estudiante" outlined :rules="[
        (val) => !!val || 'El ID de estudiante es requerido',
        (val) => /^\d+$/.test(val) || 'Solo se permiten números',
        (val) => String(val).length === 11 || 'Debe tener exactamente 11 dígitos'
      ]" />

      <div class="flex justify-end space-x-3">
        <q-btn v-if="usuario.id" flat label="Cancelar" color="grey" @click="cancelarEdicion" />
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
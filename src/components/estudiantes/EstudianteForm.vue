<script setup>
import { ref, watch } from 'vue'
import { useEstudiantesStore } from 'src/stores/estudiantes'
import { useQuasar } from 'quasar'
import { useUsuariosStore } from 'src/stores/usuarios'
import { useGrupoStore } from 'src/stores/grupo'

const $q = useQuasar()
const store = useEstudiantesStore()
const usuarioStore = useUsuariosStore()
const grupoStore = useGrupoStore()

usuarioStore.fetchUsuarios()
grupoStore.fetchGrupos()


const estudiante = ref({
  id: null,
  nombre: '',
  apellido: '',
  id_usuario: '',
  grupo: ''
})

const formRef = ref(null)

watch(
  () => store.estudianteEnEdicion,
  (newValue) => {
    if (newValue) {
      estudiante.value = { ...newValue }
    }
  },
)

function submitForm() {
  if (!estudiante.value.nombre || !estudiante.value.apellido || !estudiante.value.id_usuario || !estudiante.value.grupo) {
    $q.notify({
      color: 'negative',
      message: 'Por favor, completa todos los campos requeridos.',
      icon: 'warning',
    })
    return
  }

  if (estudiante.value.id) {
    store.updateEstudiante(estudiante.value.id, estudiante.value)
    $q.notify({
      color: 'positive',
      message: 'Estudiante actualizado correctamente',
      icon: 'check',
    })
  } else {
    store.createEstudiante(estudiante.value)
    $q.notify({
      color: 'positive',
      message: 'Estudiante registrado correctamente',
      icon: 'check',
    })
  }
  resetForm()
}

function cancelarEdicion() {
  store.setEstudianteEnEdicion(null)
  resetForm()
}

function resetForm() {
  estudiante.value = {
    id: null,
    nombre: '',
    apellido: '',
    id_usuario: '',
    grupo: '',
  }
  if (formRef.value) {
    formRef.value.resetValidation()
  }
}
</script>

<template>
  <div>
    <div class="text-2xl font-semibold text-slate-700 mb-6">
      {{ estudiante.id ? 'Editar Estudiante' : 'Nuevo Estudiante' }}
    </div>


    <q-form ref="formRef" @submit.prevent="submitForm" class="space-y-6">
      <q-input v-model="estudiante.nombre" label="Nombre" outlined :rules="[
        (val) => !!val || 'El nombre es requerido',
        (val) => /^[A-ZÁÉÍÓÚÑ][a-zA-ZáéíóúñÁÉÍÓÚÑüÜ\s'-]*$/.test(val) || 'Solo letras y debe empezar con mayúscula'
      ]" />

      <q-input v-model="estudiante.apellido" label="Apellido" outlined :rules="[
        (val) => !!val || 'El apellido es requerido',
        (val) => /^[A-ZÁÉÍÓÚÑ][a-zA-ZáéíóúñÁÉÍÓÚÑüÜ\s'-]*$/.test(val) || 'Solo letras y debe empezar con mayúscula'
      ]" />
      <q-select v-model="estudiante.id_usuario" label="Id Usuario" :options="usuarioStore.usuarios" option-value="id"
        option-label="username" outlined emit-value map-options
        :rules="[(val) => !!val || 'El id del usuario es requerido']" />
      <q-select v-model="estudiante.grupo" label="Grupo" :options="grupoStore.grupos" option-value="id"
        option-label="name" outlined emit-value map-options :rules="[(val) => !!val || 'El grupo es requerido']" />
      <div class="flex justify-end space-x-3">
        <q-btn v-if="estudiante.id" flat label="Cancelar" color="grey" @click="cancelarEdicion" />
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

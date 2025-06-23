<script setup>
import { ref, watch } from 'vue'
import { useP1Store } from '../../stores/p1'
import { useAsignaturaStore } from '../../stores/asignatura'
import { useTipoClaseStore } from '../../stores/tipoClase'
import { useProfesoresStore } from '../../stores/profesores' // 👈 NUEVO
import { useQuasar } from 'quasar'

const $q = useQuasar()
const store = useP1Store()
const asignaturaStore = useAsignaturaStore()
const tipoClaseStore = useTipoClaseStore()
const profesorStore = useProfesoresStore() // 👈 NUEVO

// Cargar datos iniciales
asignaturaStore.fetchAsignaturas()
tipoClaseStore.fetchTiposClase()
profesorStore.fetchProfesores() // 👈 NUEVO

const actividad = ref({
  id: null,
  id_asignatura: null,
  id_tipo_de_clase: null,
  id_profesor: null, // 👈 NUEVO
  semana: 1,
})

watch(
  () => store.actividadEnEdicion,
  (newValue) => {
    if (newValue) {
      actividad.value = { ...newValue }
    }
  },
)

function submitForm() {
  const { id, id_asignatura, id_tipo_de_clase, id_profesor, semana } = actividad.value

  if (!id_asignatura || !id_tipo_de_clase || !id_profesor || !semana) {
    $q.notify({
      color: 'negative',
      message: 'Por favor, completa todos los campos requeridos.',
      icon: 'warning',
    })
    return
  }

  const payload = { id_asignatura, id_tipo_de_clase, id_profesor, semana }

  if (id) {
    store.updateActividad(id, payload)
    $q.notify({
      color: 'positive',
      message: 'Actividad actualizada correctamente',
      icon: 'check',
    })
  } else {
    store.createActividad(payload)
    $q.notify({
      color: 'positive',
      message: 'Actividad registrada correctamente',
      icon: 'check',
    })
  }

  resetForm()
}

function cancelarEdicion() {
  store.setActividadEnEdicion(null)
  resetForm()
}

function resetForm() {
  actividad.value = {
    id: null,
    id_asignatura: null,
    id_tipo_de_clase: null,
    id_profesor: null,
    semana: 1,
  }
}
</script>

<template>
  <div class="animate__animated animate__fadeIn">
    <div class="text-2xl font-semibold text-gray-700 mb-6">
      {{ actividad.id ? 'Editar Actividad' : 'Nueva Actividad' }}
    </div>

    <q-form @submit.prevent="submitForm" class="space-y-6">
      <q-select
        v-model="actividad.id_asignatura"
        label="Asignatura"
        :options="asignaturaStore.asignaturas"
        option-value="id"
        option-label="name"
        outlined
        emit-value
        map-options
        :rules="[(val) => !!val || 'La asignatura es requerida']"
      />

      <q-select
        v-model="actividad.id_tipo_de_clase"
        label="Tipo de Clase"
        :options="tipoClaseStore.tiposClase"
        option-value="id"
        option-label="name"
        outlined
        emit-value
        map-options
        :rules="[(val) => !!val || 'El tipo de clase es requerido']"
      />

      <q-select
        v-model="actividad.id_profesor"
        label="Profesor"
        :options="profesorStore.profesores"
        option-value="id"
        option-label="name"
        outlined
        emit-value
        map-options
        :rules="[(val) => !!val || 'El profesor es requerido']"
      />

      <q-input
        v-model.number="actividad.semana"
        label="Semana"
        outlined
        type="number"
        :rules="[(val) => !!val || 'La semana es requerida']"
      />

      <div class="flex justify-end space-x-3">
        <q-btn v-if="actividad.id" flat label="Cancelar" color="grey" @click="cancelarEdicion" />
        <q-btn flat label="Limpiar" color="warning" type="reset" @click="resetForm" />
        <q-btn unelevated label="Guardar" color="primary" type="submit" />
      </div>
    </q-form>
  </div>
</template>

<!-- <script setup>
import { ref, watch } from 'vue'
import { useP1Store } from '../../stores/p1'
import { useAsignaturaStore } from '../../stores/asignatura'
import { useTipoClaseStore } from '../../stores/tipoClase'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const store = useP1Store()
const asignaturaStore = useAsignaturaStore()
const tipoClaseStore = useTipoClaseStore()

// Cargar datos iniciales
asignaturaStore.fetchAsignaturas()
tipoClaseStore.fetchTiposClase()

const actividad = ref({
  id: null,
  orden: 0, // Se calculará automáticamente
  id_asignatura: null,
  id_tipo_clase: null,
  semana: 1,
})

watch(
  () => store.actividadEnEdicion,
  (newValue) => {
    if (newValue) {
      actividad.value = { ...newValue }
    }
  },
)

function submitForm() {
  if (!actividad.value.id_asignatura || !actividad.value.id_tipo_clase || !actividad.value.semana) {
    $q.notify({
      color: 'negative',
      message: 'Por favor, completa todos los campos requeridos.',
      icon: 'warning',
    })
    return
  }

  if (actividad.value.id) {
    store.updateActividad(actividad.value.id, actividad.value)
    $q.notify({
      color: 'positive',
      message: 'Actividad actualizada correctamente',
      icon: 'check',
    })
  } else {
    store.createActividad(actividad.value)
    $q.notify({
      color: 'positive',
      message: 'Actividad registrada correctamente',
      icon: 'check',
    })
  }
  resetForm()
}

function cancelarEdicion() {
  store.setActividadEnEdicion(null)
  resetForm()
}

function resetForm() {
  actividad.value = {
    id: null,
    orden: 0,
    id_asignatura: null,
    id_tipo_clase: null,
    semana: 1,
  }
}
</script>

<template>
  <div class="animate__animated animate__fadeIn">
    <div class="text-2xl font-semibold text-gray-700 mb-6">
      {{ actividad.id ? 'Editar Actividad' : 'Nueva Actividad' }}
    </div>

    <q-form @submit.prevent="submitForm" class="space-y-6">
      <q-select
        v-model="actividad.id_asignatura"
        label="Asignatura"
        :options="asignaturaStore.asignaturas"
        option-value="id"
        option-label="name"
        outlined
        emit-value
        map-options
        :rules="[(val) => !!val || 'La asignatura es requerida']"
      />

      <q-select
        v-model="actividad.id_tipo_clase"
        label="Tipo de Clase"
        :options="tipoClaseStore.tiposClase"
        option-value="id"
        option-label="name"
        outlined
        emit-value
        map-options
        :rules="[(val) => !!val || 'El tipo de clase es requerido']"
      />

      <q-input
        v-model.number="actividad.semana"
        label="Semana"
        outlined
        type="number"
        :rules="[(val) => !!val || 'La semana es requerida']"
      />

      <div class="flex justify-end space-x-3">
        <q-btn v-if="actividad.id" flat label="Cancelar" color="grey" @click="cancelarEdicion" />
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
.q-select {
  max-width: 400px;
}

.q-btn {
  text-transform: uppercase;
}
</style> -->

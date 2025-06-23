<script setup>
import { ref, watch } from 'vue'
import { usePaseEvaluacionStore } from 'src/stores/pasesdeevaluacion'
import { useQuasar } from 'quasar'
import { useEstudiantesStore } from 'src/stores/estudiantes'
import { useEvaluacionStore } from 'src/stores/evaluaciones'
import { useP1Store } from 'src/stores/p1'

const $q = useQuasar()
const store = usePaseEvaluacionStore()
const tipoEstudiante = useEstudiantesStore()
const tipoEvaluacion = useEvaluacionStore()
const tipoP1 = useP1Store();

// Cargar datos iniciales
tipoEstudiante.fetchEstudiantes()
tipoEvaluacion.fetchEvaluaciones()
tipoP1.fetchActividades()


const evaluacion = ref({
  id: null,
  id_estudiante: null,
  id_evaluacion: null,
  id_P1: null,
  fecha: '',
})

watch(
  () => store.evaluacionEnEdicion,
  (newValue) => {
    if (newValue) {
      evaluacion.value = { ...newValue }
    }
  },
)

async function submitForm() {
  if (!evaluacion.value.id_estudiante || !evaluacion.value.id_evaluacion || !evaluacion.value.id_P1 || !evaluacion.value.fecha) {
    $q.notify({
      color: 'negative',
      message: 'Por favor, completa todos los campos requeridos.',
      icon: 'warning',
    })
    return
  }

  if (evaluacion.value.id) {
    try {
      await store.updateEvaluacion(evaluacion.value.id, evaluacion.value)
      $q.notify({
        color: 'positive',
        message: 'Evaluación actualizada correctamente',
        icon: 'check',
      })
    } catch (error) {
      $q.notify({
        color: 'negative',
        message: `Error actualizando evaluación: ${error}`,
        icon: 'warn',
      })
    }
  } else {
    try {
      await store.createEvaluacion(evaluacion.value)
      $q.notify({
        color: 'positive',
        message: 'Evaluación registrada correctamente',
        icon: 'check',
      })
    } catch (error) {
      $q.notify({
        color: 'negative',
        message: `Error al registrar evaluación: ${error.message}`,
        icon: 'check',
      })
    }
  }
  resetForm()
}

function cancelarEdicion() {
  store.setEvaluacionEnEdicion(null)
  resetForm()
}

function resetForm() {
  evaluacion.value = {
    id: null,
    id_estudiante: null,
    id_evaluacion: null,
    id_P1: null,
    fecha: '',
  }
}
</script>

<template>
  <div class="animate__animated animate__fadeIn">
    <div class="text-2xl font-semibold text-gray-700 mb-6">
      {{ evaluacion.id ? 'Editar Evaluación' : 'Nueva Evaluación' }}
    </div>

    <q-form @submit.prevent="submitForm" class="space-y-6">
      <q-select v-model="evaluacion.id_estudiante" label="ID Estudiante" :options="tipoEstudiante.estudiantes"
        option-value="id" option-label="name" outlined emit-value map-options
        :rules="[(val) => !!val || 'El estudiante es requerido']" />
      <q-select v-model="evaluacion.id_evaluacion" label="ID Evaluación" :options="tipoEvaluacion.evaluaciones"
        option-value="id" option-label="name" outlined emit-value map-options
        :rules="[(val) => !!val || 'La evaluación es requerida']" />
      <q-select v-model="evaluacion.id_P1" label="ID P1" :options="tipoP1.actividades" option-value="id"
        option-label="nombre" outlined emit-value map-options
        :rules="[(val) => !!val || 'El ID del P1 es requerido']" />
      <q-input v-model="evaluacion.fecha" label="Fecha" outlined type="date"
        :rules="[(val) => !!val || 'La fecha es requerida']" />

      <div class="flex justify-end space-x-3">
        <q-btn v-if="evaluacion.id" flat label="Cancelar" color="grey" @click="cancelarEdicion" />
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
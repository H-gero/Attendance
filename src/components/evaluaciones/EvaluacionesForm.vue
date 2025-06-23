<script setup>
import { ref, watch } from 'vue'
import { useEvaluacionStore } from 'src/stores/evaluaciones'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const store = useEvaluacionStore()

const evaluacion = ref({
  id: null,
  nombre: '',
  descripcion: '',
  tipo: '',
  active: false,
})

watch(
  () => store.evaluacionEnEdicion,
  (newValue) => {
    if (newValue) {
      evaluacion.value = { ...newValue }
    }
  }
)

async function submitForm() {
  if (!evaluacion.value.nombre || !evaluacion.value.tipo) {
    $q.notify({
      color: 'negative',
      message: 'Por favor, completa todos los campos requeridos.',
      icon: 'warning',
    })
    return
  }

  try {
    if (evaluacion.value.id) {
      await store.updateEvaluacion(evaluacion.value.id, evaluacion.value)
      $q.notify({
        color: 'positive',
        message: 'Evaluación actualizada correctamente',
        icon: 'check',
      })
    } else {
      await store.createEvaluacion(evaluacion.value)
      $q.notify({
        color: 'positive',
        message: 'Evaluación creada correctamente',
        icon: 'check',
      })
    }
    resetForm()
  } catch (error) {
    $q.notify({
      color: 'negative',
      message: `Error: ${error.message}`,
      icon: 'error',
    })
  }
}

function cancelarEdicion() {
  store.setEvaluacionEnEdicion(null)
  resetForm()
}

function resetForm() {
  evaluacion.value = {
    id: null,
    nombre: '',
    descripcion: '',
    tipo: '',
    active: false,
  }
}
</script>

<template>
  <div class="animate__animated animate__fadeIn">
    <div class="text-2xl font-semibold text-gray-700 mb-6">
      {{ evaluacion.id ? 'Editar Evaluación' : 'Nueva Evaluación' }}
    </div>

    <q-form @submit.prevent="submitForm" class="space-y-6">
      <q-input v-model="evaluacion.nombre" label="Nombre" outlined :rules="[
        (val) => !!val || 'El nombre es requerido',
        (val) => /^[A-ZÁÉÍÓÚÑ][a-zA-ZáéíóúñÁÉÍÓÚÑüÜ\s'-]*$/.test(val) || 'Solo letras y debe empezar con mayúscula'
      ]" />

      <q-input v-model="evaluacion.descripcion" label="Descripción" outlined :rules="[
        (val) => !!val || 'La descripción es requerida',
      ]" />

      <q-select v-model="evaluacion.tipo" label="Tipo" :options="['cuantitativa', 'cualitativa']" outlined
        :rules="[(val) => !!val || 'El tipo es requerido']" />

      <q-toggle v-model="evaluacion.active" label="Activo" color="teal" />

      <div class="flex justify-end space-x-3">
        <q-btn v-if="evaluacion.id" flat label="Cancelar" color="grey" @click="cancelarEdicion" />
        <q-btn flat label="Limpiar" color="warning" type="reset" @click="resetForm" />
        <q-btn unelevated label="Guardar" color="primary" type="submit" />
      </div>
    </q-form>
  </div>
</template>



<!-- <script setup>
import { ref, watch } from 'vue'
import { useEvaluaciones } from 'src/stores/evaluaciones'
import { useQuasar } from 'quasar'
// import { storeToRefs } from 'pinia'

const $q = useQuasar()
const store = useEvaluaciones()

// const { evaluaciones } = storeToRefs(useEvaluaciones())

const evaluacion = ref({
  id: null,
  nombre: '',
  descripcion: '',
  tipo: 'Cuantitativa',
  valor: 4,
  valorTexto: 'Bien',
})

const opcionesValor = [
  { value: 2, label: '2 - Mal' },
  { value: 3, label: '3 - Regular' },
  { value: 4, label: '4 - Bien' },
  { value: 5, label: '5 - Excelente' },
]

// Observar cambios en evaluacionEnEdicion
watch(
  () => store.evaluacionEnEdicion,
  (newValue) => {
    if (newValue) {
      evaluacion.value = { ...newValue }
    }
  },
)

function submitForm() {
  if (evaluacion.value.id) {
    // Actualizar existente
    store.updateEvaluacion(evaluacion.value)
    $q.notify({
      color: 'positive',
      message: 'Evaluación actualizada correctamente',
      icon: 'check',
    })
  } else {
    // Crear nuevo
    store.addEvaluacion(evaluacion.value)
    $q.notify({
      color: 'positive',
      message: 'Evaluación registrada correctamente',
      icon: 'check',
    })
  }

  // Limpiar formulario
  resetForm()
}

function cancelarEdicion() {
  store.setEvaluacionEnEdicion(null)
  resetForm()
}

function resetForm() {
  evaluacion.value = {
    id: null,
    nombre: '',
    descripcion: '',
    tipo: 'Cuantitativa',
    valor: 4,
    valorTexto: 'Bien',
  }
}

// Actualizar texto del valor cuando cambia el valor numérico
watch(
  () => evaluacion.value.valor,
  (newVal) => {
    const opcion = opcionesValor.find((op) => op.value === newVal)
    evaluacion.value.valorTexto = opcion ? opcion.label.split(' - ')[1] : ''
  },
)
</script>

<template>
  <div>
    <div class="text-2xl font-semibold text-gray-700 mb-6">
      {{ evaluacion.id ? 'Editar Evaluación' : 'Nueva Evaluación' }}
    </div>

    <q-form @submit.prevent="submitForm" class="space-y-6">
      <q-input
        v-model="evaluacion.nombre"
        label="Nombre"
        class="bg-slate-50"
        outlined
        :rules="[(val) => !!val || 'El nombre es requerido']"
      />

      <q-input
        v-model="evaluacion.descripcion"
        type="textarea"
        label="Descripción"
        class="bg-slate-50"
        outlined
        :rules="[(val) => !!val || 'La descripción es requerida']"
      />

      <q-select
        v-model="evaluacion.tipo"
        label="Tipo de Evaluación"
        class="bg-slate-50"
        outlined
        :options="['Cuantitativa', 'Cualitativa']"
      />

      <q-select
        v-model="evaluacion.valor"
        label="Valor Cuantitativo"
        class="bg-slate-50"
        outlined
        :options="opcionesValor"
        option-label="label"
        option-value="value"
        emit-value
        map-options
      />

      <div class="flex justify-end space-x-3">
        <q-btn v-if="evaluacion.id" flat label="Cancelar" color="grey" @click="cancelarEdicion" />
        <q-btn flat label="Limpiar" color="warning" type="reset" @click="resetForm" />
        <q-btn
          unelevated
          :label="evaluacion.id ? 'Actualizar' : 'Guardar'"
          color="primary"
          type="submit"
        />
      </div>
    </q-form>
  </div>
</template> -->

<script setup>
import { ref, watch } from 'vue'
import { useQuasar } from 'quasar'
import { useGrupoStore } from 'src/stores/grupo'
import { useProfesoresStore } from 'src/stores/profesores'

const $q = useQuasar()
const store = useGrupoStore()
const profesoresStore = useProfesoresStore()

profesoresStore.fetchProfesores()

const grupo = ref({
  id: null,
  name: '',
  description: '',
  id_profesor: '',
  active: false,
})

watch(
  () => store.grupoEnEdicion,
  (newValue) => {
    if (newValue) {
      grupo.value = { ...newValue }
    }
  }
)

async function submitForm() {
  if (!grupo.value.name || !grupo.value.description || !grupo.value.id_profesor) {
    $q.notify({
      color: 'negative',
      message: 'Por favor, completa todos los campos requeridos.',
      icon: 'warning',
    })
    return
  }

  try {
    if (grupo.value.id) {
      console.log('Actualizando grupo:', grupo.value);
      await store.updateGrupo(grupo.value.id, grupo.value)
      $q.notify({
        color: 'positive',
        message: 'Evaluación actualizada correctamente',
        icon: 'check',
      })
    } else {
      await store.createGrupo(grupo.value)
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
  store.setGrupoEnEdicion(null)
  resetForm()
}

function resetForm() {
  grupo.value = {
    id: null,
    name: '',
    description: '',
    id_profesor: '',
    active: false,
  }
}
</script>

<template>
  <div class="animate__animated animate__fadeIn">
    <div class="text-2xl font-semibold text-gray-700 mb-6">
      {{ grupo.id ? 'Editar Grupo' : 'Nuevo Grupo' }}
    </div>

    <q-form @submit.prevent="submitForm" class="space-y-6">
      <q-input v-model="grupo.name" label="Nombre" outlined :rules="[
        (val) => !!val || 'El nombre es requerido',
        // (val) => /^\d+$/.test(val) || 'Solo se permiten números',
      ]" />

      <q-input v-model="grupo.description" label="Descripción" outlined :rules="[
        (val) => !!val || 'La descripción es requerida',
      ]" />

      <q-select v-model="grupo.id_profesor" label="Id Profesor" :options="profesoresStore.profesores" option-value="id"
        option-label="name" outlined emit-value map-options :rules="[(val) => !!val || 'El grupo es requerido']" />

      <q-toggle v-model="grupo.active" label="Activo" color="teal" />

      <div class="flex justify-end space-x-3">
        <q-btn v-if="grupo.id" flat label="Cancelar" color="grey" @click="cancelarEdicion" />
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

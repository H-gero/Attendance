<script setup>
import { ref, watch, onMounted } from 'vue'
import { usePaseAsistenciaStore } from '../../stores/pasesdeasistencia'
import { useP1Store } from '../../stores/p1'
import { useEstudiantesStore } from '../../stores/estudiantes'
import { useAsistencia } from '../../stores/asistencia'
import { useAsignaturaStore } from '../../stores/asignatura'
import { useTipoClaseStore } from '../../stores/tipoClase'
import { useQuasar } from 'quasar'
import QRCodeVue from 'qrcode.vue'

const store = usePaseAsistenciaStore()
const p1Store = useP1Store()
const estudianteStore = useEstudiantesStore()
const asistenciaBaseStore = useAsistencia()
const asignaturaStore = useAsignaturaStore()
const tipoClaseStore = useTipoClaseStore()

const $q = useQuasar()

const mode = ref('qr')
const selectedActivity = ref(null)
const qrValue = ref('')

const asistencia = ref({
  id: null,
  id_estudiante: null,
  id_asistencia: null,
  id_p1: null,
  fecha: '',
})

onMounted(async () => {
  try {
    await Promise.all([
      p1Store.fetchActividades(),
      tipoClaseStore.fetchTiposClase(),
      asignaturaStore.fetchAsignaturas(),
      estudianteStore.fetchEstudiantes(),
      asistenciaBaseStore.fetchAsistencias(),
    ])
  } catch (error) {
    console.error('Error al cargar los datos iniciales del formulario:', error)
  }
})

watch(
  () => store.asistenciaEnEdicion,
  (newValue) => {
    if (newValue) {
      asistencia.value = { ...newValue }
      mode.value = 'manual'
    }
  },
)

async function generateQr() {
  if (!selectedActivity.value) {
    $q.notify({
      color: 'negative',
      message: 'Por favor, seleccione una actividad del P1.',
      icon: 'warning',
    })
    return
  }

  try {
    const pase = await store.generarPase(selectedActivity.value)
    qrValue.value = pase.sesionId
    $q.notify({
      color: 'positive',
      message: 'QR generado correctamente.',
      icon: 'check',
    })
  } catch {
    $q.notify({
      color: 'negative',
      message: 'Error al generar el QR.',
      icon: 'warning',
    })
  }
}

async function submitFormManual() {
  if (
    !asistencia.value.id_estudiante ||
    !asistencia.value.id_asistencia ||
    !asistencia.value.id_p1 ||
    !asistencia.value.fecha
  ) {
    $q.notify({
      color: 'negative',
      message: 'Por favor, completa todos los campos requeridos.',
      icon: 'warning',
    })
    return
  }

  try {
    if (asistencia.value.id) {
      await store.updateAsistencia(asistencia.value.id, asistencia.value)
      $q.notify({ color: 'positive', message: 'Asistencia actualizada.', icon: 'check' })
    } else {
      await store.createAsistenciaManual(asistencia.value)
      $q.notify({ color: 'positive', message: 'Asistencia registrada.', icon: 'check' })
    }
    resetForm()
  } catch (error) {
    $q.notify({
      color: 'negative',
      message: `Error al registrar la asistencia: ${error.response.data.error}`,
      icon: 'warning',
    })
  }
}

function resetForm() {
  asistencia.value = {
    id: null,
    id_estudiante: null,
    id_asistencia: null,
    id_p1: null,
    fecha: '',
  }
  selectedActivity.value = null
  qrValue.value = ''
  store.setAsistenciaEnEdicion(null)
}

function cancelarEdicion() {
  resetForm()
  mode.value = 'qr'
}
</script>

<template>
  <div class="animate__animated animate__fadeIn">
    <div class="text-2xl font-semibold text-gray-700 mb-6">
      {{
        mode === 'qr'
          ? 'Generar QR para Pase de Asistencia'
          : asistencia.id
            ? 'Editar Asistencia Manual'
            : 'Registrar Asistencia Manual'
      }}
    </div>

    <div class="mb-4">
      <q-btn-toggle
        v-model="mode"
        toggle-color="primary"
        :options="[
          { label: 'Generar QR', value: 'qr' },
          { label: 'Registro Manual', value: 'manual' },
        ]"
      />
    </div>

    <div v-if="mode === 'qr'">
      <q-form @submit.prevent="generateQr" class="space-y-6">
        <q-select
          v-model="selectedActivity"
          label="Actividad del P1"
          :options="p1Store.actividades"
          option-value="id"
          option-label="nombre"
          outlined
          emit-value
          map-options
          :rules="[(val) => !!val || 'La actividad es requerida']"
        />
        <div v-if="qrValue" class="mt-4">
          <p>Escanee este QR:</p>
          <QRCodeVue :value="qrValue" :size="200" level="H" />
        </div>
        <div class="flex justify-end space-x-3">
          <q-btn flat label="Limpiar" color="warning" @click="resetForm" />
          <q-btn unelevated label="Generar QR" color="primary" type="submit" />
        </div>
      </q-form>
    </div>

    <div v-else>
      <q-form @submit.prevent="submitFormManual" class="space-y-6">
        <q-select
          v-model="asistencia.id_p1"
          label="Actividad del P1"
          :options="p1Store.actividades"
          option-value="id"
          :option-label="p1Store.getNombreActividad"
          outlined
          emit-value
          map-options
        />
        <q-select
          v-model="asistencia.id_estudiante"
          label="Estudiante"
          :options="estudianteStore.estudiantes"
          option-value="id"
          option-label="name"
          outlined
          emit-value
          map-options
        />
        <q-select
          v-model="asistencia.id_asistencia"
          label="Asistencia"
          :options="asistenciaBaseStore.asistencias"
          option-value="id"
          option-label="name"
          outlined
          emit-value
          map-options
        />
        <q-input
          v-model="asistencia.fecha"
          label="Fecha"
          type="date"
          outlined
          :rules="[(val) => !!val || 'La fecha es requerida']"
        />
        <div class="flex justify-end space-x-3">
          <q-btn v-if="asistencia.id" flat label="Cancelar" color="grey" @click="cancelarEdicion" />
          <q-btn flat label="Limpiar" color="warning" @click="resetForm" />
          <q-btn unelevated label="Guardar" color="primary" type="submit" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<style scoped>
.q-input,
.q-select {
  max-width: 400px;
}
</style>

<!-- <script setup>
import { ref, watch, onMounted } from 'vue'
import { usePaseAsistenciaStore } from '../../stores/pasesdeasistencia'
import { useP1Store } from '../../stores/p1'
import { useTipoClaseStore } from '../../stores/tipoClase'
import { useAsignaturaStore } from '../../stores/asignatura'

const asignaturaStore = useAsignaturaStore()
const tipoClaseStore = useTipoClaseStore()

import { useQuasar } from 'quasar'
import QRCodeVue from 'qrcode.vue'

const $q = useQuasar()
const store = usePaseAsistenciaStore()
const p1Store = useP1Store()

const mode = ref('qr')
const selectedActivity = ref(null)
const qrValue = ref('')
const asistencia = ref({
  id: null,
  nombre: '',
  apellido: '',
  grupo: '',
  id_p1: null,
  fecha: '',
  asist: 'Presente',
})

onMounted(async () => {
  try {
    await Promise.all([
      p1Store.fetchActividades(),
      store.fetchEstudiantes(),
      asignaturaStore.fetchAsignaturas(),
      tipoClaseStore.fetchTiposClase(),
      // profesoresStore.fetchProfesores()
    ])
  } catch (error) {
    console.error('Error al cargar los datos iniciales del formulario:', error)
  }
})

watch(
  () => store.asistenciaEnEdicion,
  (newValue) => {
    if (newValue) {
      asistencia.value = { ...newValue }
      mode.value = 'manual'
    }
  },
)

async function generateQr() {
  if (!selectedActivity.value) {
    $q.notify({
      color: 'negative',
      message: 'Por favor, seleccione una actividad del P1.',
      icon: 'warning',
    })
    return
  }

  try {
    const pase = await store.generarPase(selectedActivity.value)
    alert('Pase generado:', pase)
    qrValue.value = pase.sesionId
    $q.notify({
      color: 'positive',
      message: 'QR generado correctamente para la actividad seleccionada.',
      icon: 'check',
    })
  } catch {
    $q.notify({
      color: 'negative',
      message: 'Error al generar el QR.',
      icon: 'warning',
    })
  }
}

async function submitFormManual() {
  if (
    !asistencia.value.id_p1 ||
    !asistencia.value.fecha ||
    !asistencia.value.asist ||
    !asistencia.value.nombre ||
    !asistencia.value.apellido ||
    !asistencia.value.grupo
  ) {
    $q.notify({
      color: 'negative',
      message: 'Por favor, completa todos los campos requeridos.',
      icon: 'warning',
    })
    return
  }

  try {
    if (asistencia.value.id) {
      await store.updateAsistencia(asistencia.value.id, asistencia.value)
      $q.notify({
        color: 'positive',
        message: 'Asistencia actualizada correctamente.',
        icon: 'check',
      })
    } else {
      await store.createAsistenciaManual(asistencia.value)
      $q.notify({
        color: 'positive',
        message: 'Asistencia registrada manualmente.',
        icon: 'check',
      })
    }
    resetForm()
  } catch {
    $q.notify({
      color: 'negative',
      message: 'Error al registrar la asistencia.',
      icon: 'warning',
    })
  }
}

function resetForm() {
  asistencia.value = {
    id: null,
    nombre: '',
    apellido: '',
    grupo: '',
    id_p1: null,
    fecha: '',
    asist: 'Presente',
  }
  selectedActivity.value = null
  qrValue.value = ''
  store.setAsistenciaEnEdicion(null)
}

function cancelarEdicion() {
  resetForm()
  mode.value = 'qr'
}
</script>

<template>
  <div class="animate__animated animate__fadeIn">
    <div class="text-2xl font-semibold text-gray-700 mb-6">
      {{
        mode === 'qr'
          ? 'Generar QR para Pase de Asistencia'
          : asistencia.id
            ? 'Editar Asistencia Manual'
            : 'Registrar Asistencia Manual'
      }}
    </div>

    <div class="mb-4">
      <q-btn-toggle
        v-model="mode"
        toggle-color="primary"
        :options="[
          { label: 'Generar QR', value: 'qr' },
          { label: 'Registro Manual', value: 'manual' },
        ]"
      />
    </div>

    <div v-if="mode === 'qr'">
      <q-form @submit.prevent="generateQr" class="space-y-6">
        <q-select
          v-model="selectedActivity"
          label="Actividad del P1"
          :options="p1Store.actividades"
          option-value="id"
          :option-label="p1Store.getNombreActividad"
          outlined
          emit-value
          map-options
          :rules="[(val) => !!val || 'La actividad es requerida']"
        />
        <div v-if="qrValue" class="mt-4">
          <p>Escanee este QR:</p>
          <QRCodeVue :value="qrValue" :size="200" level="H" />
        </div>
        <div class="flex justify-end space-x-3">
          <q-btn flat label="Limpiar" color="warning" @click="resetForm" />
          <q-btn unelevated label="Generar QR" color="primary" type="submit" />
        </div>
      </q-form>
    </div>

    <div v-else>
      <q-form @submit.prevent="submitFormManual" class="space-y-6">
        <q-select
          v-model="asistencia.id_p1"
          label="Actividad del P1"
          :options="p1Store.actividades"
          option-value="id"
          :option-label="p1Store.getNombreActividad"
          outlined
          emit-value
          map-options
          :rules="[(val) => !!val || 'La actividad es requerida']"
        />
        <q-input
          v-model="asistencia.nombre"
          label="Nombre del Estudiante"
          outlined
          :rules="[(val) => !!val || 'El nombre es requerido']"
        />
        <q-input
          v-model="asistencia.apellido"
          label="Apellido del Estudiante"
          outlined
          :rules="[(val) => !!val || 'El apellido es requerido']"
        />
        <q-input
          v-model="asistencia.grupo"
          label="Grupo del Estudiante"
          outlined
          :rules="[(val) => !!val || 'El grupo es requerido']"
        />
        <q-input
          v-model="asistencia.fecha"
          label="Fecha"
          outlined
          type="date"
          :rules="[(val) => !!val || 'La fecha es requerida']"
        />
        <q-select
          v-model="asistencia.asist"
          label="Estado de Asistencia"
          :options="['Presente', 'Ausente']"
          outlined
          :rules="[(val) => !!val || 'El estado es requerido']"
        />
        <div class="flex justify-end space-x-3">
          <q-btn v-if="asistencia.id" flat label="Cancelar" color="grey" @click="cancelarEdicion" />
          <q-btn flat label="Limpiar" color="warning" @click="resetForm" />
          <q-btn unelevated label="Guardar" color="primary" type="submit" />
        </div>
      </q-form>
    </div>
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

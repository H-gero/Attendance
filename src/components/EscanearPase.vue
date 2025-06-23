<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { BrowserMultiFormatReader } from '@zxing/library'
import { useQuasar } from 'quasar'
import axios from 'axios'

const $q = useQuasar()
const videoRef = ref(null)
const codeReader = ref(null)
const stream = ref(null)
const previewData = ref(null)
const showPreview = ref(false)
const loading = ref(false)
const asistenciaEstadoId = ref(null)
const opcionesAsistencia = ref([])

onMounted(async () => {
  try {
    // Cargar estados de asistencia desde la API
    const { data } = await axios.get(
      'https://attendance-backend-9nhc.onrender.com/api/asistencia/all',
    )
    opcionesAsistencia.value = data.asistencias.map((a) => ({
      label: a.name,
      value: a.id,
    }))

    codeReader.value = new BrowserMultiFormatReader()
    stream.value = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' },
    })
    videoRef.value.srcObject = stream.value

    codeReader.value.decodeFromVideoDevice(null, videoRef.value, async (result) => {
      if (result) {
        const sesionId = result.getText()
        codeReader.value.reset()
        await obtenerDatosDesdeSesion(sesionId)
      }
    })
  } catch (err) {
    $q.notify({
      color: 'negative',
      message: 'Error al inicializar cámara o cargar datos: ' + err.message,
      icon: 'warning',
    })
  }
})

onUnmounted(() => {
  if (codeReader.value) codeReader.value.reset()
  if (stream.value) {
    stream.value.getTracks().forEach((track) => track.stop())
  }
})

async function obtenerDatosDesdeSesion(sesionId) {
  try {
    loading.value = true
    const { data } = await axios.get(
      `https://attendance-backend-9nhc.onrender.com/api/pases/${sesionId}`,
    )

    if (data.expirada) {
      throw new Error('El pase ha expirado.')
    }

    const { p1 } = data

    previewData.value = {
      estudiante: { name: 'Estudiante Fijo' }, // Reemplazar con datos reales
      actividad: p1.nombre,
      fecha: new Date().toISOString().split('T')[0],
      id_estudiante: '198afddf-7b7f-4f9e-a045-15af60d94464', // Temporal
      id_p1: p1.id,
      sesionId: data.sesionId,
    }

    asistenciaEstadoId.value =
      opcionesAsistencia.value.find((o) => o.label.toLowerCase() === 'presente')?.value || null
    showPreview.value = true
  } catch (err) {
    $q.notify({ color: 'negative', message: err.response.data.error, icon: 'error' })
  } finally {
    loading.value = false
  }
}

async function confirmarAsistencia() {
  try {
    await axios.post(`https://attendance-backend-9nhc.onrender.com/api/pase_de_asistencia/`, {
      sesionId: previewData.value.sesionId,
      id_estudiante: previewData.value.id_estudiante,
      id_p1: previewData.value.id_p1,
      fecha: previewData.value.fecha,
      id_asistencia: asistenciaEstadoId.value,
    })

    $q.notify({ color: 'positive', message: 'Asistencia registrada con éxito', icon: 'check' })
    showPreview.value = false
    previewData.value = null
  } catch (err) {
    $q.notify({
      color: 'negative',
      message: 'Fallo al registrar asistencia: ' + err.message,
      icon: 'warning',
    })
  }
}
</script>

<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold text-gray-700 mb-4">Escanear Pase de Asistencia</h2>
    <video ref="videoRef" autoplay class="rounded-xl border shadow-md w-full max-w-md mx-auto" />
    <p class="mt-2 text-center text-gray-600">
      Apunta la cámara al código QR generado por el profesor.
    </p>

    <div v-if="showPreview && previewData" class="mt-6 p-4 border rounded-lg bg-gray-50 shadow">
      <h3 class="text-lg font-semibold mb-2">Resumen de Asistencia</h3>
      <p><strong>Estudiante:</strong> {{ previewData.estudiante.name }}</p>
      <p><strong>Actividad:</strong> {{ previewData.actividad }}</p>
      <p><strong>Fecha:</strong> {{ previewData.fecha }}</p>

      <div class="mt-2">
        <!-- <q-select
          v-model="asistenciaEstadoId"
          :options="opcionesAsistencia"
          label="Estado de asistencia"
          option-label="label"
          option-value="value"
        /> -->
        <q-select
          v-model="asistenciaEstadoId"
          label="Estado de asistencia"
          :options="opcionesAsistencia"
          option-value="value"
          option-label="label"
          outlined
          emit-value
          map-options
        />
      </div>

      <q-btn
        label="Confirmar Asistencia"
        color="primary"
        class="mt-4"
        @click="confirmarAsistencia"
        :loading="loading"
      />
    </div>
  </div>
</template>

<style scoped>
h2 {
  font-size: 1.75rem;
  font-weight: 600;
}
p {
  font-size: 1rem;
}
</style>

<!-- <script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { BrowserMultiFormatReader } from '@zxing/library'
import { useQuasar } from 'quasar'
import axios from 'axios'

const $q = useQuasar()

const videoRef = ref(null)
const codeReader = ref(null)
const stream = ref(null)
const previewData = ref(null)
const showPreview = ref(false)
const loading = ref(false)
const asistenciaEstado = ref('Presente')

onMounted(async () => {
  try {
    codeReader.value = new BrowserMultiFormatReader()
    stream.value = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' },
    })
    videoRef.value.srcObject = stream.value

    codeReader.value.decodeFromVideoDevice(null, videoRef.value, async (result) => {
      if (result) {
        const sesionId = result.getText()
        codeReader.value.reset()
        await obtenerDatosDesdeSesion(sesionId)
      }
    })
  } catch {
    $q.notify({
      color: 'negative',
      message: 'Error al acceder a la cámara. Verifica los permisos.',
      icon: 'warning',
    })
  }
})

onUnmounted(() => {
  if (codeReader.value) codeReader.value.reset()
  if (stream.value) {
    stream.value.getTracks().forEach((track) => track.stop())
  }
})

async function obtenerDatosDesdeSesion(sesionId) {
  try {
    loading.value = true
    const { data: pase } = await axios.get(
      `https://attendance-backend-9nhc.onrender.com/api/pases/${sesionId}`,
    )

    if (pase.expirada) {
      throw new Error('Este pase de asistencia ya ha expirado.')
    }

    previewData.value = {
      estudiante: { name: 'Estudiante Fijo' }, // Futuro: reemplazar con datos de autenticación
      actividad: pase.p1.nombre,
      fecha: new Date().toISOString().split('T')[0],
      asist: asistenciaEstado.value,
      id_P1: pase.p1.id,
      sesionId: pase.sesionId,
    }

    showPreview.value = true
  } catch (err) {
    console.error(err)
    $q.notify({ color: 'negative', message: err.response.data.error, icon: 'error' })
  } finally {
    loading.value = false
  }
}

async function confirmarAsistencia() {
  try {
    await axios.post(`https://attendance-backend-9nhc.onrender.com/api/pase_de_asistencia`, {
      sesionId: previewData.value.sesionId,
      id_estudiante: 1, // Temporalmente fijo
      id_P1: previewData.value.id_P1,
      fecha: previewData.value.fecha,
      asist: asistenciaEstado.value,
    })

    $q.notify({ color: 'positive', message: 'Asistencia registrada con éxito', icon: 'check' })
    showPreview.value = false
    previewData.value = null
  } catch {
    $q.notify({ color: 'negative', message: 'Fallo al registrar asistencia', icon: 'warning' })
  }
}
</script>

<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold text-gray-700 mb-4">Escanear Pase de Asistencia</h2>
    <video ref="videoRef" autoplay class="rounded-xl border shadow-md w-full max-w-md mx-auto" />
    <p class="mt-2 text-center text-gray-600">
      Apunta la cámara al código QR generado por el profesor.
    </p>

    <div v-if="showPreview && previewData" class="mt-6 p-4 border rounded-lg bg-gray-50 shadow">
      <h3 class="text-lg font-semibold mb-2">Resumen de Asistencia</h3>
      <p><strong>Estudiante:</strong> {{ previewData.estudiante.name }}</p>
      <p><strong>Actividad:</strong> {{ previewData.actividad }}</p>
      <p><strong>Fecha:</strong> {{ previewData.fecha }}</p>

      <div class="mt-2">
        <q-select
          v-model="asistenciaEstado"
          :options="['Presente', 'Ausente']"
          label="Estado de asistencia"
        />
      </div>

      <q-btn
        label="Confirmar Asistencia"
        color="primary"
        class="mt-4"
        @click="confirmarAsistencia"
        :loading="loading"
      />
    </div>
  </div>
</template>

<style scoped>
h2 {
  font-size: 1.75rem;
  font-weight: 600;
}
p {
  font-size: 1rem;
}
</style> -->

<!-- /////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

<!-- <script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { BrowserMultiFormatReader } from '@zxing/library'
// import { usePaseAsistenciaStore } from 'src/stores/pasesdeasistencia'
import { useQuasar } from 'quasar'
import axios from 'axios'

const $q = useQuasar()
// const store = usePaseAsistenciaStore()
const videoRef = ref(null)
const codeReader = ref(null)
const stream = ref(null)
const previewData = ref(null)
const showPreview = ref(false)
const loading = ref(false)
const asistenciaEstado = ref('Presente')

onMounted(async () => {
  try {
    codeReader.value = new BrowserMultiFormatReader()
    stream.value = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    videoRef.value.srcObject = stream.value
    codeReader.value.decodeFromVideoDevice(null, videoRef.value, async (result) => {
      if (result) {
        const sesionId = result.getText()
        codeReader.value.reset()
        alert(sesionId)
        await obtenerDatosDesdeSesion(sesionId)
      }
    })
  } catch {
    $q.notify({
      color: 'negative',
      message: 'Error al acceder a la cámara. Verifica los permisos.',
      icon: 'warning',
    })
  }
})

onUnmounted(() => { 
  if (codeReader.value) codeReader.value.reset()
  if (stream.value) {
    stream.value.getTracks().forEach(track => track.stop())
  }
})

async function obtenerDatosDesdeSesion(sesionId) {
  try {
    loading.value = true
    const { data: sesiones } = await axios.get(`https://attendance-backend-9nhc.onrender.com/api/sesiones`)
    const sesion = sesiones.find(s => s.sesionId === sesionId)

    if (!sesion) throw new Error('Sesión no encontrada')

    const { id_P1 } = sesion
    const { data: actividad } = await axios.get(`https://attendance-backend-9nhc.onrender.com/api/p1/${id_P1}`)

    previewData.value = {
      estudiante: { name: 'Estudiante Fijo' }, // Futuro: obtener desde auth
      actividad: actividad.nombre,
      fecha: new Date().toISOString().split('T')[0],
      asist: asistenciaEstado.value,
      id_P1
    }
    showPreview.value = true
  } catch (err) {
    $q.notify({ color: 'negative', message: err.message, icon: 'error' })
  } finally {
    loading.value = false
  }
}

async function confirmarAsistencia() {
  try {
    await axios.post(`https://attendance-backend-9nhc.onrender.com/api/asistencias`, {
      sesionId: `ses-${Date.now()}`,
      id_estudiante: 1, // Fijo temporalmente
      id_P1: previewData.value.id_P1,
      fecha: previewData.value.fecha,
      asist: asistenciaEstado.value
    })

    $q.notify({ color: 'positive', message: 'Asistencia registrada con éxito', icon: 'check' })
    showPreview.value = false
    previewData.value = null
  } catch {
    $q.notify({ color: 'negative', message: 'Fallo al registrar asistencia', icon: 'warning' })
  }
}
</script>

<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold text-gray-700 mb-4">Escanear Pase de Asistencia</h2>
    <video ref="videoRef" autoplay class="rounded-xl border shadow-md w-full max-w-md mx-auto" />
    <p class="mt-2 text-center text-gray-600">Apunta la cámara al código QR generado por el profesor.</p>

    <div v-if="showPreview && previewData" class="mt-6 p-4 border rounded-lg bg-gray-50 shadow">
      <h3 class="text-lg font-semibold mb-2">Resumen de Asistencia</h3>
      <p><strong>Estudiante:</strong> {{ previewData.estudiante.name }}</p>
      <p><strong>Actividad:</strong> {{ previewData.actividad }}</p>
      <p><strong>Fecha:</strong> {{ previewData.fecha }}</p>
      <div class="mt-2">
        <q-select v-model="asistenciaEstado" :options="['Presente', 'Ausente']" label="Estado de asistencia" />
      </div>
      <q-btn label="Confirmar Asistencia" color="primary" class="mt-4" @click="confirmarAsistencia" :loading="loading" />
    </div>
  </div>
</template>

<style scoped>
h2 {
  font-size: 1.75rem;
  font-weight: 600;
}
p {
  font-size: 1rem;
}
</style>
 -->

<!-- <script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { BrowserMultiFormatReader } from '@zxing/library'
import { usePaseAsistenciaStore } from 'src/stores/pasesdeasistencia'
import { useQuasar } from 'quasar'
import axios from 'axios' // Importa axios

const $q = useQuasar()
const store = usePaseAsistenciaStore()
const videoRef = ref(null)
const codeReader = ref(null)
let stream = null

onMounted(async () => {
  try {
    codeReader.value = new BrowserMultiFormatReader()
    stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    videoRef.value.srcObject = stream
    codeReader.value.decodeFromVideoDevice(null, videoRef.value, (result) => {
      if (result) {
        const sesionId = result.getText()
        registrarAsistencia(sesionId)
        codeReader.value.reset()
      }
    })
  } catch {
    $q.notify({
      color: 'negative',
      message: 'Error al acceder a la cámara. Por favor, verifica los permisos.',
      icon: 'warning',
    })
  }
})

onUnmounted(() => {
  if (codeReader.value) codeReader.value.reset()
  if (stream) {
    stream.getTracks().forEach(track => track.stop())
  }
})

async function registrarAsistencia(sesionId) {
  try {
    const asistencia = {
      sesionId,
      id_estudiante: 1, // Deberías obtener el ID del estudiante logueado
      id_P1: store.currentQr?.id_P1 || null,
      fecha: new Date().toISOString().split('T')[0],
      asist: 'Presente',
    }
    await axios.post('https://attendance-backend-9nhc.onrender.com/api/asistencias', asistencia)
    $q.notify({
      color: 'positive',
      message: `Asistencia registrada con sesión: ${sesionId}`,
      icon: 'check',
    })
  } catch {
    $q.notify({
      color: 'negative',
      message: 'Error al registrar la asistencia. Intente de nuevo.',
      icon: 'warning',
    })
  }
}
</script>

<template>
  <div class="animate__animated animate__fadeIn">
    <h2 class="text-2xl font-semibold text-gray-700 mb-6">Escanear Pase de Asistencia</h2>
    <video ref="videoRef" autoplay style="width: 100%; max-width: 400px;" />
    <p class="mt-4 text-gray-600">Apunta la cámara al QR generado por el profesor.</p>
  </div>
</template>

<style scoped>
h2 {
  font-size: 1.75rem;
  font-weight: 500;
  color: #4a4a4a;
}
</style> -->

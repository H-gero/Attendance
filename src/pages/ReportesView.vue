<script setup>
import { onMounted } from 'vue'
import { useReporteStore } from 'src/stores/reportes'
import { useQuasar } from 'quasar'

const reporteStore = useReporteStore()
const $q = useQuasar()

const showSuccess = (message) => {
  $q.notify({ color: 'positive', message, icon: 'check_circle', position: 'top' })
}

onMounted(async () => {
  await reporteStore.fetchData()
})
</script>

<template>
  <q-page class="q-pa-md">
    <h4 class="text-h4 text-weight-bold text-primary q-mb-md">Reportes</h4>
    <q-btn unelevated label="Reporte de Ausencias" color="primary" @click="reporteStore.generarReporteAusencias; showSuccess('Reporte de ausencias generado')" class="q-mr-md q-mb-md" />
    <q-btn unelevated label="Reporte de Suspensos" color="primary" @click="reporteStore.generarReporteSuspensos; showSuccess('Reporte de suspensos generado')" class="q-mr-md q-mb-md" />
    <q-btn unelevated label="Reporte Sin Derecho a Evaluación" color="primary" @click="reporteStore.generarReporteSinDerecho; showSuccess('Reporte sin derecho generado')" class="q-mr-md q-mb-md" />
    <q-btn unelevated label="Reporte >20% Ausencias" color="primary" @click="reporteStore.generarReporte20Porciento; showSuccess('Reporte >20% ausencias generado')" class="q-mb-md" />
  </q-page>
</template>
<script setup>
import { onMounted } from 'vue'
import { useNotificacionStore } from 'src/stores/notificaciones'
import { usePaseAsistenciaStore } from 'src/stores/pasesdeasistencia'

const notificacionStore = useNotificacionStore()
const paseAsistenciaStore = usePaseAsistenciaStore()

onMounted(async () => {
  await paseAsistenciaStore.fetchPaseAsistencias()
  await notificacionStore.fetchNotificaciones()
  notificacionStore.checkAusenciasPeriodically()
})
</script>

<template>
  <q-page class="q-pa-md">
    <h4 class="text-h4 text-weight-bold text-primary q-mb-md">Notificaciones</h4>

    <q-list
      bordered
      class="rounded-borders shadow-1"
      v-if="notificacionStore.notificaciones.length"
    >
      <q-item
      class="mb-0.5"
        v-for="notificacion in notificacionStore.notificaciones"
        :key="notificacion.id"
        :class="getItemClass(notificacion.tipo)"
        dense
      >
        <q-item-section avatar>
          <q-icon :name="getIcon(notificacion.tipo)" color="white" />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-weight-medium">
            {{ notificacion.mensaje }}
          </q-item-label>
          <q-item-label caption> Para: {{ notificacion.destinatario }} </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <div v-else class="text-center q-mt-md text-grey-6">No hay notificaciones disponibles.</div>
  </q-page>
</template>

<script>
function getItemClass(tipo) {
  return tipo === 'alerta' ? 'bg-red-5 text-white' : tipo === 'info' ? 'bg-amber-4 text-black' : ''
}

function getIcon(tipo) {
  return tipo === 'alerta' ? 'warning' : 'info'
}
</script>

<style scoped>
.q-page {
  background: linear-gradient(to bottom, #f0f4f8, #ffffff);
}

.q-item {
  transition: background-color 0.3s ease;
}
</style>

//

<!-- <script setup>
import { onMounted } from 'vue'
import { useNotificacionStore } from 'src/stores/notificacion'
import { usePaseAsistenciaStore } from 'src/stores/pasesdeasistencia'

const notificacionStore = useNotificacionStore()
const paseAsistenciaStore = usePaseAsistenciaStore()

onMounted(async () => {
  console.log('Cargando notificaciones...')
  await paseAsistenciaStore.fetchPaseAsistencias()
  await notificacionStore.fetchNotificaciones()
  notificacionStore.checkAusenciasPeriodically()
  console.log('Notificaciones cargadas:', notificacionStore.notificaciones)
})
</script>

<template>
  <q-page class="q-pa-md">
    <h4 class="text-h4 text-weight-bold text-primary q-mb-md">Notificaciones</h4>
    <q-list bordered class="rounded-borders" v-if="notificacionStore.notificaciones.length > 0">
      <q-item v-for="notificacion in notificacionStore.notificaciones" :key="notificacion.id">
        <q-item-section>
          <q-item-label>{{ notificacion.mensaje }}</q-item-label>
          <q-item-label caption>{{ notificacion.destinatario }} - {{ notificacion.tipo }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn flat color="primary" @click="notificacionStore.updateNotificacion(notificacion.id, { mensaje: 'Actualizado', tipo: 'info' }); notificacionStore.fetchNotificaciones()">Editar</q-btn>
          <q-btn flat color="negative" @click="notificacionStore.deleteNotificacion(notificacion.id); notificacionStore.fetchNotificaciones()">Eliminar</q-btn>
        </q-item-section>
      </q-item>
    </q-list>
    <div v-else class="text-center q-mt-md text-grey-6">
      No hay notificaciones disponibles.
    </div>
  </q-page>
</template>

<style scoped>
.q-page {
  background: linear-gradient(to bottom, #f0f4f8, #ffffff); /* Gradiente consistente */
}
</style> -->

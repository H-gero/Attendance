<script setup>
import { useP1Store } from '../../stores/p1'
import { useProfesoresStore } from '../../stores/profesores'
import { useTipoClaseStore } from '../../stores/tipoClase'
import { useAsignaturaStore } from '../../stores/asignatura'
import { storeToRefs } from 'pinia'

const store = useP1Store()
const profesoresStore = useProfesoresStore()
const tipoClaseStore = useTipoClaseStore()
// const asignaturaStore = useAsignaturaStore()

const { asignaturas } = storeToRefs(useAsignaturaStore())

const props = defineProps({
  id: [Number, String],
  id_asignatura: [Number, String],
  id_tipo_de_clase: [Number, String],
  semana: Number,
  id_profesor: [Number, String],
})

function deleteActividad() {
  store.deleteActividad(props.id)
}

function editarActividad() {
  store.setActividadEnEdicion({
    id: props.id,
    id_asignatura: props.id_asignatura,
    id_tipo_de_clase: props.id_tipo_de_clase,
    semana: props.semana,
    id_profesor: props.id_profesor,
  })
}

// const asignatura = asignaturaStore.asignaturas.find((a) => a.id === props.id_asignatura)
const tipoClase = tipoClaseStore.tiposClase.find((tc) => tc.id === props.id_tipo_de_clase)
const profesor = profesoresStore.profesores.find((p) => p.id === props.id_profesor)

const nombreActividad = `${tipoClase?.name || 'Tipo desconocido'}_${asignaturas.value.find((a) => a.id === props.id_asignatura)?.name || 'Asignatura desconocida'}`
</script>

<template>
  <li class="border rounded-lg p-4 flex flex-col justify-between items-center">
    <div>
      <div class="text-lg font-semibold text-gray-800">
        {{ nombreActividad }}
      </div>
      <div class="text-sm text-gray-600">
        Semana: {{ semana }} | Profesor: {{ profesor?.name || 'Desconocido' }}
      </div>
    </div>
    <div class="flex space-x-2">
      <q-btn flat color="primary" label="Editar" @click="editarActividad" />
      <q-btn flat color="negative" label="Eliminar" @click="deleteActividad" />
    </div>
  </li>
</template>

<style scoped>
.border {
  border-color: #e5e7eb;
}

.q-btn {
  text-transform: uppercase;
}
</style>

<!-- <script setup>
import { useP1Store } from '../../stores/p1'
import { useProfesoresStore } from '../../stores/profesores'

const store = useP1Store()
const profesoresStore = useProfesoresStore()

const props = defineProps({
  id: Number,
  orden: Number,
  id_asignatura: Number,
  id_tipo_clase: Number,
  semana: Number,
  id_profesor: Number,
})

function deleteActividad() {
  store.deleteActividad(props.id)
}

function editarActividad() {
  store.setActividadEnEdicion({
    id: props.id,
    orden: props.orden,
    id_asignatura: props.id_asignatura,
    id_tipo_clase: props.id_tipo_clase,
    semana: props.semana,
    id_profesor: props.id_profesor,
  })
}

const nombreActividad = store.getNombreActividad(props)
const profesor = profesoresStore.profesores.find(p => p.id === props.id_profesor)?.nombre || 'Desconocido'
</script>

<template>
  <li class="border rounded-lg p-4 flex justify-between items-center">
    <div>
      <div class="text-lg font-semibold text-gray-800">
        {{ nombreActividad }}
      </div>
      <div class="text-sm text-gray-600">
        Semana: {{ semana }} | Profesor: {{ profesor }}
      </div>
    </div>
    <div class="flex space-x-2">
      <q-btn
        flat
        color="primary"
        label="Editar"
        @click="editarActividad"
      />
      <q-btn
        flat
        color="negative"
        label="Eliminar"
        @click="deleteActividad"
      />
    </div>
  </li>
</template>

<style scoped>
.border {
  border-color: #e5e7eb;
}

.q-btn {
  text-transform: uppercase;
}
</style> -->

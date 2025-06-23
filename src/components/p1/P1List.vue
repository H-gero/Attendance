<script setup>
import { onMounted } from 'vue'
import { useP1Store } from '../../stores/p1'
import P1ListItem from './P1ListItem.vue'
import { ref, watch } from 'vue'

const store = useP1Store()
const currentPage = ref(store.currentPage)

watch(currentPage, (val) => {
  onPageChange(val)
})

function onPageChange(page) {
  console.log(page);
  store.fetchActividades({ limit: 5, offset: (page - 1) * 5 })
}

onMounted(() => {
  store.fetchActividades()
})
</script>

<template>
  <div class="mt-8">
    <div class="text-2xl font-semibold text-gray-700 mb-4">Registro de P1</div>

    <div v-if="store.actividades?.length === 0" class="text-gray-500">
      No hay P1 registrados.
    </div>

    <TransitionGroup v-else tag="ul" name="list" class="space-y-4">
      <P1ListItem v-for="actividad in store.actividades" :key="`actividad-item-${actividad.id}`" :id="actividad.id"
        :id_asignatura="actividad.id_asignatura" :id_tipo_de_clase="actividad.id_tipo_de_clase"
        :semana="actividad.semana" :id_profesor="actividad.id_profesor" class="animate__animated animate__fadeIn" />
    </TransitionGroup>
    <q-pagination v-model="currentPage" :max="store.pages" :max-pages="7" boundary-numbers
      @update:model-value="onPageChange" class="q-mt-md" />
  </div>
</template>

<style scoped>
h3 {
  font-size: 1.5rem;
  font-weight: 500;
  color: #4a4a4a;
}

ul {
  list-style: none;
  padding: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>




<!-- <script setup>
import { onMounted } from 'vue'
import { useP1Store } from '../../stores/p1'
import P1ListItem from './P1ListItem.vue'

const store = useP1Store()

onMounted(() => {
  store.fetchActividades()
})
</script>

<template>
   <div class="mt-8">
    <div class="text-2xl font-semibold text-gray-700 mb-4">Registro de P1</div>
    <div v-if="store.actividades?.length === 0" class="text-gray-500">
      No hay P1 registrados.
    </div>
    <TransitionGroup v-else tag="ul" name="list" class="space-y-4">
      <P1ListItem
        v-for="actividad in store.actividades"
        :key="`actividad-item${actividad.id}`"
        :id="actividad.id"
        :orden="actividad.orden"
        :id_asignatura="actividad.id_asignatura"
        :id_tipo_clase="actividad.id_tipo_clase"
        :semana="actividad.semana"
        class="animate__animated animate__fadeIn"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped>
h3 {
  font-size: 1.5rem;
  font-weight: 500;
  color: #4a4a4a;
}

ul {
  list-style: none;
  padding: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style> -->

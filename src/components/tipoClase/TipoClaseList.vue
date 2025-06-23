<script setup>
import { onMounted } from 'vue'
import { useTipoClaseStore } from 'src/stores/tipoClase'
import TipoClaseListItem from './TipoClaseListItem.vue'
import { ref, watch } from 'vue'

const store = useTipoClaseStore()
const currentPage = ref(store.currentPage)

watch(currentPage, (val) => {
  onPageChange(val)
})

function onPageChange(page) {
  console.log(page);
  store.fetchTiposClase({ limit: 5, offset: (page - 1) * 5 })
}

onMounted(() => {
  store.fetchTiposClase()
})
</script>

<template>
  <div class="mt-8">
    <div class="text-2xl font-semibold text-gray-700 mb-4">Registros de Tipos de Clase</div>
    <div v-if="store.tiposClase?.length === 0" class="text-gray-500">
      No hay tipos de clases registradas.
    </div>
    <TransitionGroup v-else tag="ul" name="list" class="space-y-4">
      <TipoClaseListItem v-for="tipoClase in store.tiposClase" :key="`tipo-clase-item${tipoClase.id}`"
        :id="tipoClase.id" :nombre="tipoClase.name" :descripcion="tipoClase.description" :active="tipoClase.active"
        class="animate__animated animate__fadeIn" />
      <q-pagination v-model="currentPage" :max="store.pages" :max-pages="7" boundary-numbers
        @update:model-value="onPageChange" class="q-mt-md" />
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
</style>

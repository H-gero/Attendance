<template>
  <div class="min-h-screen bg-slate-50 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Título de la Página -->
      <div class="text-center mb-8 animateanimated animatefadeIn">
        <div class="text-3xl font-bold text-primary">Gestión de Asistencias</div>
        <p class="text-dark">Administra los detalles de las asistencias</p>
      </div>

      <!-- Contenedor principal -->
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Columna del formulario -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <AsistenciaForm />
        </div>

        <!-- Columna de la lista -->
        <div class="space-y-4">
          <!-- <h2 class="text-xl font-semibold text-slate-700 mb-4">Registros de Asistencia</h2> -->
          <AsistenciaList />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { useAsistencia } from 'src/stores/asistencia'
import AsistenciaList from 'src/components/asistencia/AsistenciaList.vue';
import AsistenciaForm from '../components/asistencia/AsistenciaForm.vue'
// import AsistenciaListItem from '../components/asistencia/AsistenciaListItem.vue'

// const store = useAsistencia()
</script>

<style>
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

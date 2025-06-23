<template>
  <div class="min-h-screen bg-slate-50 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Encabezado -->
      <!-- <p class="text-primary text-center mb-8 text-2xl font-semibold " >Gestión de Asignaturas</p> -->

      <!-- Título de la Página -->
      <div class="text-center mb-8 animateanimated animatefadeIn">
        <div class="text-3xl font-bold text-primary">Gestión de Asignaturas</div>
        <p class="text-dark">Administra los detalles de las asignaturas</p>
      </div>

      <!-- Contenedor principal -->
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Columna del formulario -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <AsignaturaForm />
        </div>

        <!-- Columna de la lista -->
        <div class="space-y-4">
          <!-- <h2 class="text-xl font-semibold text-slate-700 mb-4">Registros de Asignaturas</h2> -->
          <AsignaturaList />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AsignaturaForm from 'src/components/asignaturas/AsignaturaForm.vue' // Corrección: 'asignaturas' -> 'asignatura'
import AsignaturaList from 'src/components/asignaturas/AsignaturaList.vue' // Corrección: 'asignaturas' -> 'asignatura'
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
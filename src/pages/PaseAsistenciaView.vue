<template>
  <div class="min-h-screen bg-slate-50 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Encabezado -->
      <!-- <div class="text-3xl font-bold text-slate-800 text-center mb-8">Pase de Asistencia</div> -->
      <!-- Título de la Página -->
    <div class="text-center mb-8 animateanimated animatefadeIn">
      <div class="text-3xl font-bold text-primary">Gestión de pases de asistencia</div>
      <p class="text-dark">Administra los detalles de los pases de asistencia</p>
    </div>
    <q-separator/>
      <!-- Contenedor principal -->
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Columna del formulario -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <PaseAsistenciaForm />
        </div>

        <!-- Columna de la lista -->
        <div class="space-y-4">
          <!-- <h2 class="text-xl font-semibold text-slate-700 mb-4">Registros de Asistencia</h2>      -->
          <transition-group name="list" class="space-y-4">
            <PaseAsistenciaList />
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import PaseAsistenciaForm from 'src/components/pasesdeasistencia/PaseAsistenciaForm.vue'
import PaseAsistenciaList from 'src/components/pasesdeasistencia/PaseAsistenciaList.vue'
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

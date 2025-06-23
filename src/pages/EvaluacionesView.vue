<script setup>
import EvaluacionesList from 'src/components/evaluaciones/EvaluacionesList.vue'
import EvaluacionForm from '../components/evaluaciones/EvaluacionesForm.vue'
// import EvaluacionesList from '../components/evaluaciones/EvaluacionesList.vue'
</script>

<template>
  <div class="min-h-screen bg-slate-50 p-6">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-8 animateanimated animatefadeIn">
        <div class="text-3xl font-bold text-primary">Gestión de Evaluaciones</div>
        <p class="text-dark">Administra los detalles de las evaluaciones</p>
      </div>

      <div class="grid md:grid-cols-2 gap-8">
        <div class="bg-white rounded-lg shadow-lg p-6">
          <EvaluacionForm />
        </div>

        <div class="space-y-4">
          <EvaluacionesList />
        </div>
      </div>
    </div>
  </div>
</template>

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

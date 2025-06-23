<template>
  <div class="min-h-screen bg-slate-50 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Encabezado -->
      <div class="text-center mb-8 animateanimated animatefadeIn">
        <div class="text-3xl font-bold text-primary">Gestión del P1</div>
        <p class="text-dark">Administra los detalles del P1</p>
      </div>


      <!-- Contenedor principal -->
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Columna del formulario -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <P1Form />
        </div>

        <!-- Columna de la lista -->
        <div class="space-y-4">
          <P1List />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import P1Form from 'src/components/p1/P1Form.vue'
import P1List from 'src/components/p1/P1List.vue'
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
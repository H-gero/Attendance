<template>
  <div class="min-h-screen bg-slate-50 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Encabezado -->
      <div class="text-center mb-8 animateanimated animatefadeIn">
        <div class="text-3xl font-bold text-primary">Gestión de Profesores</div>
        <p class="text-dark">Administra los detalles de las profesores</p>
      </div>


      <!-- Contenedor principal -->
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Columna del formulario -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <ProfesorForm />
        </div>

        <!-- Columna de la lista -->
        <div class="space-y-4">
          <ProfesorList />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ProfesorForm from 'src/components/profesor/ProfesorForm.vue'
import ProfesorList from 'src/components/profesor/ProfesorList.vue'
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
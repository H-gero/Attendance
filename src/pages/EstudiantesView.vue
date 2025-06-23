<template>
  <div class="min-h-screen bg-slate-50 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Encabezado -->
      <div class="text-center mb-8 animateanimated animatefadeIn">
        <div class="text-3xl font-bold text-primary">Gestión de Estudiantes</div>
        <p class="text-dark">Administra los detalles de los estudiantes</p>
      </div>


      <!-- Contenedor principal -->
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Columna del formulario -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <EstudianteForm />
        </div>

        <!-- Columna de la lista -->
        <div class="space-y-4">
          <EstudianteList />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { useEstudiante } from 'src/stores/estudiante'
import EstudianteList from 'src/components/estudiantes/EstudianteList.vue';
import EstudianteForm from '../components/estudiantes/EstudianteForm.vue'
// import EstudianteListItem from '../components/estudiante/EstudianteListItem.vue'

// const store = useEstudiante()
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
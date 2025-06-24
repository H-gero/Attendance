<script setup>
import GrupoForm from 'src/components/grupo/GrupoForm.vue';
import GrupoList from 'src/components/grupo/GrupoList.vue';
</script>

<template>
  <div class="min-h-screen bg-slate-50 p-6">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-8 animateanimated animatefadeIn">
        <div class="text-3xl font-bold text-primary">Gestión de Grupos</div>
        <p class="text-dark">Administra los detalles de los grupos</p>
      </div>

      <div class="grid md:grid-cols-2 gap-8">
        <div class="bg-white rounded-lg shadow-lg p-6">
          <GrupoForm />
        </div>

        <div class="space-y-4">
          <GrupoList />
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

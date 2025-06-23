<script setup>
import { onMounted } from 'vue'
import { useUsuariosStore } from 'src/stores/usuarios'
import UsuarioListItem from './UsuarioListItem.vue'

const store = useUsuariosStore()

onMounted(() => {
  store.fetchUsuarios()
})
</script>

<template>
  <div class="mt-8">
    <div class="text-2xl font-semibold text-gray-700 mb-4">Registros de Usuarios</div>
    <div v-if="store.usuarios.length === 0" class="text-gray-500">
      No hay usuarios registrados.
    </div>
    <TransitionGroup v-else tag="ul" name="list" class="space-y-4">
      <UsuarioListItem v-for="usuario in store.usuarios" :key="`usuario-item${usuario.id}`" :id="usuario.id"
        :username="usuario.username" :password="usuario.password" :id_usuario="usuario.id_usuario"
        class="animate__animated animate__fadeIn" />
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
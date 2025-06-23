<script setup>
import { useUsuariosStore } from 'src/stores/usuarios'

const store = useUsuariosStore()
const props = defineProps({
  id: [Number, String],
  username: String,
  password: String,
  id_usuario: String,
})
console.log(props);

function deleteUsuario() {
  store.deleteUsuario(props.id)
}

function editarUsuario() {
  store.setUsuarioEnEdicion({
    id: props.id,
    username: props.username,
    password: props.password,
    id_usuario: props.id_usuario,
  })

}
</script>

<template>
  <li class="border rounded-lg p-4 flex justify-between items-center">
    <div>
      <div class="text-lg font-semibold text-gray-800">
        {{ username }}
      </div>
    </div>
    <div class="flex space-x-2">
      <q-btn flat color="primary" label="Editar" @click="editarUsuario" />
      <q-btn flat color="negative" label="Eliminar" @click="deleteUsuario" />
    </div>
  </li>
</template>

<style scoped>
.border {
  border-color: #e5e7eb;
}

.q-btn {
  text-transform: uppercase;
}
</style>
<!-- src/components/EssentialLink.vue -->
<template>
  <q-item clickable tag="a" @click="goToLink">
    <q-item-section v-if="props.icon" avatar>
      <q-icon :name="props.icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ props.title }}</q-item-label>
      <q-item-label class="text-dark" caption>{{ props.caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    default: '',
  },
  link: {
    type: String,
    default: '#', // Valor por defecto, pero se manejará en goToLink
  },
  icon: {
    type: String,
    default: '',
  },
});

const goToLink = () => {
  if (props.link === '#' || !props.link) return; // Evitar navegación si el enlace es inválido
  try {
    router.push(`/${props.link}`); // Añadir '/' al inicio para rutas absolutas
  } catch (error) {
    console.error('Error al navegar:', error); // Depuración
  }
};
</script>
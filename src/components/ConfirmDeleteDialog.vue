<template>
  <q-dialog v-model="showDialog" persistent>
    <q-card style="width: 400px">
      <q-card-section>
        <div class="text-h6">¿Desea eliminar el pase de asistencia?</div>
      </q-card-section>
      <q-card-section>
        <p>Esta acción no se puede deshacer.</p>
      </q-card-section>
      <q-card-actions aling="right">

        <q-btn flat label="Cancelar" color="primary" v-close-popup />
        <q-btn flat label="Eliminar" color="negative" @click="handleDelete" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-snackbar v-model="showSuccess" :timeout="2000" color="positive" position="bottom">
    <q-icon name="check" />
    <span>Pase de asistencia eliminado correctamente</span>
  </q-snackbar>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const showDialog = ref(false)
const showSuccess = ref(false)
const props = defineProps(['itemId', 'deleteFunction'])
const emit = defineEmits(['delete'])

const handleDelete = async () => {
  try {
    await props.deleteFunction(props.itemId)
    showSuccess.value = true
    emit('delete', props.itemId)
  } catch (error) {
    console.error('Error al eliminar:', error)
  }
}

defineExpose({ showDialog })
</script>

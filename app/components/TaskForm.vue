<script setup>
const emit = defineEmits(['add'])

const title = ref('')
const description = ref('')

function submitTask() {
  if (!title.value.trim()) {
    return
  }

  emit('add', {
    title: title.value,
    description: description.value
  })

  title.value = ''
  description.value = ''
}
</script>

<template>
  <form class="task-form" @submit.prevent="submitTask">
    <h2>Nueva tarea</h2>

    <div>
      <label for="title">Título</label>

      <input
        id="title"
        v-model="title"
        type="text"
        placeholder="Escribe una tarea"
        required
      >
    </div>

    <div>
      <label for="description">Descripción</label>

      <textarea
        id="description"
        v-model="description"
        placeholder="Descripción de la tarea"
      ></textarea>
    </div>

    <button type="submit">
      Agregar tarea
    </button>
  </form>
</template>
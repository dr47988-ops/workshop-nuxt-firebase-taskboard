<script setup>
defineProps({
  tasks: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['complete', 'delete'])
</script>

<template>
  <section class="task-list">
    <h2>Lista de tareas</h2>

    <p v-if="tasks.length === 0">
      No hay tareas registradas.
    </p>

    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @complete="emit('complete', $event)"
      @delete="emit('delete', $event)"
    />
  </section>
</template>
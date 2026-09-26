<script setup>
defineProps({
  task: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['complete', 'delete'])
</script>

<template>
  <article
    class="task-item"
    :class="{ completed: task.status === 'done' }"
  >
    <div class="task-content">
      <div class="task-header">
        <h3>{{ task.title }}</h3>

        <span
          class="status"
          :class="task.status"
        >
          {{ task.status === 'pending' ? '● Pendiente' : '✓ Hecha' }}
        </span>
      </div>

      <p v-if="task.description" class="description">
        {{ task.description }}
      </p>
    </div>

    <div class="task-actions">
      <button
        v-if="task.status === 'pending'"
        class="complete-button"
        type="button"
        @click="emit('complete', task.id)"
      >
        ✓ Completar
      </button>

      <button
        class="delete-button"
        type="button"
        @click="emit('delete', task.id)"
      >
        🗑 Eliminar
      </button>
    </div>
  </article>
</template>
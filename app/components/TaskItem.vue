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
  <article class="task-item">
    <div>
      <h3>{{ task.title }}</h3>

      <p v-if="task.description">
        {{ task.description }}
      </p>

      <p>
        Estado:
        <strong>
          {{ task.status === 'pending' ? 'Pendiente' : 'Hecha' }}
        </strong>
      </p>
    </div>

    <button
      v-if="task.status === 'pending'"
      type="button"
      @click="emit('complete', task.id)"
    >
      Marcar como hecha
    </button>

    <button
      type="button"
      @click="emit('delete', task.id)"
    >
      Eliminar
    </button>
  </article>
</template>
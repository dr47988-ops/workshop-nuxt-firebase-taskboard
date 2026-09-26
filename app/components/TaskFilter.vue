<script setup>
defineProps({
  onlyPending: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:onlyPending'])
</script>

<template>
  <div class="task-filter">
    <label>
      <input
        type="checkbox"
        :checked="onlyPending"
        @change="emit('update:onlyPending', $event.target.checked)"
      >

      Mostrar solo pendientes
    </label>
  </div>
</template>
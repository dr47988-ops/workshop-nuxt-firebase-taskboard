<script setup>
const {
  tasks,
  errorMessage,
  addTask,
  deleteTask,
  completeTask
} = useTasks()

const onlyPending = ref(false)

const filteredTasks = computed(() => {
  if (onlyPending.value) {
    return tasks.value.filter(task => task.status === 'pending')
  }

  return tasks.value
})

const pendingCount = computed(() => {
  return tasks.value.filter(task => task.status === 'pending').length
})

function handleAddTask(task) {
  addTask(task.title, task.description)
}
</script>

<template>
  <main class="task-board">
    <header class="board-header">
      <div>
        <p class="subtitle">ORGANIZA TU DÍA</p>
        <h1>Mi tablero de tareas</h1>
        <p>
          Crea, organiza y completa tus tareas.
        </p>
      </div>

      <div class="task-counter">
        <strong>{{ pendingCount }}</strong>
        <span>Pendientes</span>
      </div>
    </header>

    <TaskForm @add="handleAddTask" />

    <p v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </p>

    <TaskFilter
      v-model:only-pending="onlyPending"
    />

    <section class="list-header">
      <div>
        <h2>Mis tareas</h2>
        <p>{{ tasks.length }} tareas en total</p>
      </div>
    </section>

    <TaskList
      :tasks="filteredTasks"
      @complete="completeTask"
      @delete="deleteTask"
    />
  </main>
</template>
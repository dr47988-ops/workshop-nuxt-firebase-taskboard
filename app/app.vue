<script setup>
const {
  tasks,
  saving,
  errorMessage,
  addTask,
  deleteTask,
  completeTask
} = useTasks()

function handleAddTask(task) {
  addTask(task.title, task.description)
}
</script>

<template>
  <main>
    <h1>Tablero de tareas</h1>

    <TaskForm @add="handleAddTask" />

    <p v-if="saving">
      Guardando tarea...
    </p>

    <p v-if="errorMessage">
      {{ errorMessage }}
    </p>

    <TaskList
      :tasks="tasks"
      @complete="completeTask"
      @delete="deleteTask"
    />
  </main>
</template>
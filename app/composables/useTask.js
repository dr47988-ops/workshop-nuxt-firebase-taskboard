import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore'

export function useTasks() {
  const tasks = ref([])
  const saving = ref(false)
  const errorMessage = ref('')

  let unsubscribe = () => {}

  function readableError(error) {
    if (error.code === 'permission-denied') {
      return 'Firestore bloqueó el acceso. Revisa las reglas de Firestore.'
    }

    return error.message
  }

  onMounted(() => {
    const { $firestore } = useNuxtApp()

    const tasksQuery = query(
      collection($firestore, 'tasks'),
      orderBy('createdAt', 'desc')
    )

    unsubscribe = onSnapshot(
      tasksQuery,
      (snapshot) => {
        tasks.value = snapshot.docs.map((task) => ({
          id: task.id,
          title: task.data().title,
          description: task.data().description,
          status: task.data().status,
          createdAt: task.data().createdAt
        }))
      },
      (error) => {
        errorMessage.value = readableError(error)
      }
    )
  })

  onUnmounted(() => {
    unsubscribe()
  })

  // Agregar una nueva tarea
  async function addTask(title, description, done) {
    const taskTitle = title.trim()
    const taskDescription = description.trim()

    if (!taskTitle || saving.value) {
      done?.(false)
      return
    }

    saving.value = true
    errorMessage.value = ''

    try {
      const { $firestore } = useNuxtApp()

      await addDoc(collection($firestore, 'tasks'), {
        title: taskTitle,
        description: taskDescription,
        status: 'pending',
        createdAt: serverTimestamp()
      })

      done?.(true)
    } catch (error) {
      errorMessage.value = readableError(error)
      done?.(false)
    } finally {
      saving.value = false
    }
  }

  // Eliminar una tarea
  async function deleteTask(id) {
    errorMessage.value = ''

    try {
      const { $firestore } = useNuxtApp()

      await deleteDoc(
        doc($firestore, 'tasks', id)
      )
    } catch (error) {
      errorMessage.value = readableError(error)
    }
  }

  // Marcar una tarea como hecha
  async function completeTask(id) {
    errorMessage.value = ''

    try {
      const { $firestore } = useNuxtApp()

      await updateDoc(
        doc($firestore, 'tasks', id),
        {
          status: 'done'
        }
      )
    } catch (error) {
      errorMessage.value = readableError(error)
    }
  }

  return {
    tasks,
    saving,
    errorMessage,
    addTask,
    deleteTask,
    completeTask
  }
}
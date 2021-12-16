<script setup lang="ts">
import { Ref } from 'vue';
import { useWeb3Store } from '~/stores/web3';

  const store = useWeb3Store()
  const tasksArray: Ref<{text: string, done: boolean}[]> = ref([])
  const props = defineProps<{ listName: string }>()

  onMounted(() => tasksArray.value = store.tasks)

  const handleAddNewTask = (text: string) => {
    tasksArray.value.push({text, done: false})
  }

  const handleToggleDone = (done: boolean, index: number) => {
    tasksArray.value[index] = {...tasksArray.value[index], done}
  }

</script>

<template>
  <div bg="[#303030]" p="y-5">
    <h1 m="5" text="4xl">{{props.listName.charAt(0).toUpperCase() + props.listName.substring(1)}}</h1>
    <ul p="x-60" flex="~ col" align="items-start" gap="4">
      <TaskItem v-for="(task, i) in tasksArray" :key="i" :text="task.text" :done="task.done" @toggle-done="handleToggleDone($event, i)" />
      <NewTaskItem @add-new-task="handleAddNewTask($event)" />
    </ul>
  </div>
</template>
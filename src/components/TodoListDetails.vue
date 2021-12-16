<script setup lang="ts">
import { useWeb3Store } from '~/stores/web3';

  const router = useRouter()
  const store = useWeb3Store()
  const props = defineProps<{ listIndex: string | number ,listName: string, tasks: {text: string, done: boolean}[] }>()
  const emit = defineEmits<{(event: 'toggleDone', done: boolean, i: number):void,
                            (event: 'addNewTask', text: string):void}>()

 const handleDeleteList = async (listName: string, listIndex: string | number) => {
  await store.deleteList(listName, listIndex as number)
  router.push('/')
 }

</script>

<template>
  <div bg="[#303030]" p="y-5">
    <div grid="~ cols-3" p="x-5">
      <h1  grid="col-start-2" m="5" text="4xl">{{props.listName.charAt(0).toUpperCase() + props.listName.substring(1)}}</h1>
      <button justify="self-end" align="self-center" class="icon-btn !outline-none" h="min-content" grid="~" place="items-center" @click="handleDeleteList(props.listName, props.listIndex)">
        <carbon:delete w="10" h="10"/>
      </button>
    </div>
    <ul p="x-60" flex="~ col" align="items-start" gap="4">
      <TaskItem v-for="(task, i) in tasks" :key="i" :text="task.text" :done="task.done" @toggle-done="emit('toggleDone', $event, i)" />
      <NewTaskItem @add-new-task="emit('addNewTask', $event)" />
    </ul>
  </div>
</template>
<script setup lang="ts">
import { Ref } from 'vue';
import { useWeb3Store } from '~/stores/web3';

const props = defineProps<{ listName: string, i: string }>()
const store = useWeb3Store()
const router = useRouter()
const tasksArray: Ref<{text: string, done: boolean}[]> = ref([])

  onMounted(() => tasksArray.value = store.tasks)

const handleAddNewTask = (text: string) => {
    tasksArray.value.push({text, done: false})
  }

  const handleToggleDone = (done: boolean, index: number) => {
    tasksArray.value[index] = {...tasksArray.value[index], done}
  }

  const handleSave = async()=> {
    await store.addUpdateTasks(props.listName, tasksArray.value)
  }

const { t } = useI18n()

</script>

<template>
  <section>
    <TodoListDetails :list-name="props.listName" :tasks="tasksArray" :list-index="props.i"  m="b-5" @add-new-task="handleAddNewTask" @toggle-done="handleToggleDone" />
      <div flex="inline" gap="4">
      <button
        bg="blue-600"
        hover="bg-blue-800"
        p="y-2 x-6"
        rounded="md"
        @click="router.back()"
      >
        {{ t('button.back') }}
      </button>
      <button
        bg="green-600"
        hover="bg-green-800"
        p="y-2 x-6"
        rounded="md"
        @click="handleSave"
      >
        Save
      </button>
    </div>
  </section>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
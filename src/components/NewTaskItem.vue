<script setup lang="ts">
import { InputHTMLAttributes } from 'vue'

const isAddTaskClicked = ref(false)
const taskNameInput: InputHTMLAttributes = ref(null)
const newTaskText = ref('')
const emit = defineEmits<{
  (event: 'addNewTask', text: string): void
}>()

const toggleIsAddTaskClicked = () => {
  isAddTaskClicked.value = !isAddTaskClicked.value
}
onUpdated(() => {
  if(isAddTaskClicked.value) taskNameInput.value.focus()
})

const handleAddNewTask = () => {
  if(newTaskText.value.length > 0) addNewTask()
}

const addNewTask = () => {
  emit('addNewTask', newTaskText.value.trim())
  newTaskText.value = ''
  toggleIsAddTaskClicked()
}
</script>

<template>
      <li>
        <button v-if="!isAddTaskClicked" text="xl" flex="inline" hover="opacity-50" @click="toggleIsAddTaskClicked">
          <carbon-add-alt class="inline-block"/>
        </button>
        <input v-if="isAddTaskClicked"
          type="text"
          name="listName"
          v-model="newTaskText"
          text="xl"
          border="white 1"
          bg="[#303030]"
          w="40"
          autofocus
          @keyup.esc="toggleIsAddTaskClicked"
          @keyup.enter="handleAddNewTask"
          ref="taskNameInput"
        >
      </li>
</template>
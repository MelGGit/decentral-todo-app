<script setup lang="ts">
import { InputHTMLAttributes } from 'vue'
import { useWeb3Store } from '~/stores/web3'

const store = useWeb3Store()

const isAddListClicked = ref(false)
const listNameInput: InputHTMLAttributes = ref(null)
const newListName = ref('')

const toggleIsAddListClicked = () => {
  isAddListClicked.value = !isAddListClicked.value
}
onUpdated(() => {
  if(isAddListClicked.value) listNameInput.value.focus()
})

const handleAddNewList = () => {
  if(newListName.value.length > 0) addNewList()
}

const addNewList = async() => {
  await store.addList(newListName.value.trim())
  toggleIsAddListClicked()
  store.getLists()
}

</script>

<template>
  <section
    w="70"
    h="40"
    p="5"
    rounded="xl"
    grid="~"
    align="items-center"
    justify="items-center"
    border="white 1"
  >
    <button v-if="!isAddListClicked" text="4xl" flex="inline" @click="toggleIsAddListClicked"  hover="opacity-50">
      <carbon-add-alt class="inline-block" />
    </button>
    <input v-if="isAddListClicked"
      type="text"
      name="listName"
      id="listName"
      bg="[#303030]"
      v-model="newListName"
      text="xl"
      w="full"
      autofocus
      @keyup.esc="toggleIsAddListClicked"
      @keyup.enter="handleAddNewList"
      ref="listNameInput"
    >
  </section>
</template>

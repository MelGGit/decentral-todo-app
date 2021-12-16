<script setup lang="ts">

  const props = defineProps<{ text: string, done: boolean }>()
  const emit = defineEmits<{(event: 'toggleDone', done: boolean): void}>()
  const isDone = ref(props.done)

  const handleToggleDone = () => {
    isDone.value = !isDone.value
    emit('toggleDone', isDone.value)
  }

</script>

<template>
      <li p="l-1" text="xl" flex="~" gap="2" align="items-center" cursor="pointer" @click="handleToggleDone">
        <input type="checkbox" v-model="isDone">
        <span m="b-1" :class="isDone? 'line-through decoration-black' : ''">{{props.text}}</span>
      </li>
</template>
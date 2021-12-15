<script setup lang="ts">

  const props = defineProps<{
    list: string
  }>()


</script>

<template>
  <section
    w="70"
    h="40"
    rounded="xl"
    grid="~"
    align="items-center"
    bg="[#303030]"
  >
    <h2 text="xl">
      {{props.list}}
    </h2>
  </section>
</template>

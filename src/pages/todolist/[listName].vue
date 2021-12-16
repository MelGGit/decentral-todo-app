<script setup lang="ts">
const props = defineProps<{ listName: string }>()
const router = useRouter()

const { t } = useI18n()

</script>

<template>
  <section>
    <TodoListDetails :list-name="props.listName" m="b-5" />
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
        @click="router.back()"
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
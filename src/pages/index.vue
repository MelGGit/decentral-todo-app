<script setup lang="ts">
// import { useUserStore } from '~/stores/user'

import { useWeb3Store } from '~/stores/web3';

const store = useWeb3Store()
// const user = useUserStore()
// const name = ref(user.savedName)

const router = useRouter()
// const go = () => {
//   if (name.value)
//     router.push(`/hi/${encodeURIComponent(name.value)}`)
// }
onMounted(() => store.connect(false))

const handleClickTodoList = (list: string, i: number) => {
  router.push(`/todolist/${encodeURIComponent(list)}/${encodeURIComponent(i)}`)
}
// const { t } = useI18n()
</script>

<template>
  <div>
    <h1 text="6xl" m="b-5">
      Todo Lists
    </h1>
    <div w="full" p="x-20" flex="~ wrap" gap="5" animate="animated pulse duration-2500">
      <TodoList v-for="(list, i) in store.lists" :key="i" :list="list" @click="handleClickTodoList(list, i)" cursor="pointer" hover="opacity-50" />
      <AddTodoList />
    </div>
    <!-- <p class="text-4xl">
      <carbon-campsite class="inline-block" />
    </p>
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse" target="_blank">
        Vitesse
      </a>
    </p>
    <p>
      <em class="text-sm opacity-75">{{ t('intro.desc') }}</em>
    </p>

    <div class="py-4" />

    <input
      id="input"
      v-model="name"
      :placeholder="t('intro.whats-your-name')"
      :aria-label="t('intro.whats-your-name')"
      type="text"
      autocomplete="false"
      p="x-4 y-2"
      w="250px"
      text="center"
      bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
      @keydown.enter="go"
    >
    <label class="hidden" for="input">{{ t('intro.whats-your-name') }}</label>

    <div>
      <button
        class="m-3 text-sm btn"
        :disabled="!name"
        @click="go"
      >
        {{ t('button.go') }}
      </button>
    </div> -->
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>

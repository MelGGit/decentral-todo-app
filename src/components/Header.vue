<script setup lang="ts">
import { useWeb3Store } from '~/stores/web3'

const store = useWeb3Store()
const networkName = import.meta.env.VITE_APP_NETWORK_NAME

</script>

<template>
  <header
    flex="~"
    class="gap-4"
    justify="end"
    align="items-center"
    p="x-5 y-2"
    border="b white"
  >
    <button v-if="!store.isCorrectNetwork" bg="red-800" p="x-10 y-2" rounded="md" @click="store.switchNetwork()">
      Wrong Network
    </button>
    <span v-if="store.isCorrectNetwork" bg="green-800" p="x-10 y-2" rounded="md">{{ networkName }}</span>
    <button v-if="!store.account" border="~" p="x-10 y-2" rounded="md" @click="store.connect(true)">
      Connect Wallet
    </button>
    <span v-if="store.account" border="~" p="x-10 y-2" rounded="md">Connected</span>
  </header>
</template>

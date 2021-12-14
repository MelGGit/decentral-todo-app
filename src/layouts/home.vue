<template>
  <main class="text-center text-gray-700 dark:text-gray-200">
    <Header m="b-5" />
    <div p="x-4">
      <router-view />
    </div>
    <Footer />
    <div class="mt-5 mx-auto text-center opacity-25 text-sm">
      [Home Layout]
    </div>
  </main>
</template>

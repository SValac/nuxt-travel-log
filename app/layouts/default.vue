<script setup lang="ts">
const authStore = useAuthStore();

await authStore.init(); // we await for the auth store to initialize. this uses suspense to wait for the auth store to be ready
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <AppNavBar />
    <main class="flex-1 flex">
      <slot />
    </main>
  </div>
</template>

<style scoped>

</style>

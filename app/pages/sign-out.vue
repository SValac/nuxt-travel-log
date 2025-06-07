<script setup lang="ts">
const authStore = useAuthStore();

onMounted(() => {
  authStore.signOut();
});
</script>

<template>
  <div class="card bg-base-300 container mx-auto mt-10 min-h-72, text-center flex flex-col items-center justify-center gap-4">
    <span
      class="loading loading-spinner loading-xl"
    />
  </div>
</template>

<style scoped>

</style>

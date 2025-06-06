<script setup lang="ts">
const authStore = useAuthStore();
</script>

<template>
  <button class="btn btn-accent" :disabled="authStore.isLoading" @click="authStore.signIn">
    Sign in
    <span
      v-if="authStore.isLoading"
      class="loading loading-spinner loading-md"
    />
    <Icon
      v-else
      name="tabler:brand-github"
      size="24"
    />
  </button>
</template>

<style scoped>

</style>

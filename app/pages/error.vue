<script setup lang="ts">
const route = useRoute();

const error = route.query.error || 'An unexpected error occurred';
</script>

<template>
  <div class="card bg-base-300 container mx-auto mt-10 min-h-72, text-center flex flex-col items-center justify-center gap-4">
    <div role="alert" class="alert alert-error min-w-1/2 text-center">
      <span>Oh, No! {{ error }}</span>
    </div>
    <NuxtLink to="/" class="btn btn-primary">
      Home
      <Icon name="tabler:arrow-left" size="32" />
    </NuxtLink>
  </div>
</template>

<style scoped>

</style>

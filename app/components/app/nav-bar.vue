<script setup lang="ts">
import { AppThemeToggle } from '#components';
</script>

<template>
  <nav class="navbar bg-primary text-primary-content">
    <div class="navbar-start">
      <NuxtLink to="/" class="btn btn-ghost text-xl">
        Travel Log
      </NuxtLink>
    </div>
    <div class="navbar-end">
      <AppThemeToggle />
      <AuthButton />
    </div>
  </nav>
</template>

<style scoped>

</style>

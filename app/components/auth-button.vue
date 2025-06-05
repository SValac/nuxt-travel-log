<script setup lang="ts">
import { createAuthClient } from 'better-auth/client';

const authClient = createAuthClient();

async function signIn() {
  await authClient.signIn.social({
    provider: 'github',
    callbackURL: '/dashboard',
  });

  // do not need the return value because it will redirect the user and handle the authentication flow
}
</script>

<template>
  <button class="btn btn-accent" @click="signIn">
    Sign in
    <Icon name="tabler:brand-github" size="24" />
  </button>
</template>

<style scoped>

</style>

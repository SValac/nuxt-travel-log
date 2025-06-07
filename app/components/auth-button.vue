<script setup lang="ts">
const authStore = useAuthStore();
</script>

<template>
  <div>
    <div
      v-if="!authStore.isLoading && authStore.user"
      class="dropdown dropdown-end"
    >
      <div tabindex="0" role="button" class="btn m-1">
        <div
          v-if="authStore.user.image"
          class="avatar"
        >
          <div class="w-6 rounded-full">
            <img :src="authStore.user.image" :alt="authStore.user.name">
          </div>
        </div>
        {{ authStore.user.name }}
      </div>
      <ul tabindex="0" class="dropdown-content menu bg-base-200 rounded-box z-1 w-52 p-2 shadow-sm">
        <li>
          <NuxtLink to="/sign-out">
            <Icon name="tabler:logout-2" size="24" />
            Sign out
          </NuxtLink>
        </li>
        <li><a>Item 2</a></li>
      </ul>
    </div>
    <button
      v-else
      class="btn btn-accent"
      :disabled="authStore.isLoading"
      @click="authStore.signIn"
    >
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
  </div>
</template>

<style scoped>

</style>

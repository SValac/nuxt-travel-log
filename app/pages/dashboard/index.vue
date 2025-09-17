<script setup lang="ts">
/*
  we dont use $fetch because this is used in response to user events/actions (clicking, typing, etc)
  if we want the data to be available when page load and you know that request can happen at the top level
  before user interaction, use useFetch instead.

  useFetch hanldles loading state, errors, and is SSR friendly. its loads data on server side during SSR
  and then hydrates it on client side. and includes all headers and make that request in the context of the user
  session (cookies, auth tokens, etc)

*/

const { data, status } = useFetch('/api/v1/locations', {
  // allow navigating away from the page while the request is in flight
  // without cancelling the request
  lazy: true,
});
</script>

<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">
      Locations
    </h2>
    <div v-if="status === 'pending'">
      <span class="loading loading-spinner loading-xl" />
    </div>
    <div v-else-if="data">
      <pre>{{ JSON.stringify(data, null, 2) }}</pre>
    </div>
    <div
      v-else
      class="flex flex-col gap-2 mt-4"
    >
      <p>Add a location to get started</p>
      <NuxtLink
        to="/dashboard/add"
        class="btn btn-primary mt-4 w-40"
      >
        <Icon name="tabler:tabler:circle-plus-filled" size="24" />
        Add Location
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>

</style>

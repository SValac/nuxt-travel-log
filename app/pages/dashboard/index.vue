<script setup lang="ts">
/*
  we dont use $fetch because this is used in response to user events/actions (clicking, typing, etc)
  if we want the data to be available when page load and you know that request can happen at the top level
  before user interaction, use useFetch instead.

  useFetch hanldles loading state, errors, and is SSR friendly. its loads data on server side during SSR
  and then hydrates it on client side. and includes all headers and make that request in the context of the user
  session (cookies, auth tokens, etc)

*/

/*
  video timestamp 4:29:21
*/

const { data, status } = await useFetch('/api/v1/locations', {
  // allow navigating away from the page while the request is in flight
  // without cancelling the request
  lazy: true,
});

const sidebarStore = useSidebarStore();

// check if data changes and update sidebarStore
watchEffect(() => {
  if (data.value) {
    sidebarStore.sidebarItems = data.value.map(location => ({
      id: `location-${location.id}`,
      label: location.name,
      icon: 'tabler:map-pin-filled',
      href: `#`,
    }));
  }
  sidebarStore.isLoading = status.value === 'pending';
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
    <div v-else-if="data && data.length > 0" class="flex flex-wrap gap-2 mt-2">
      <div
        v-for="location in data"
        :key="location.id"
        class="card card-compact bg-base-300 h-40 w-72"
      >
        <div class="card-body ">
          <h3 class="text-lg font-bold">
            {{ location.name }}
          </h3>
          <p class="overflow-hidden text-ellipsis line-clamp-4">
            {{ location.description }}
          </p>
        </div>
      </div>
    </div>
    <div
      v-else
      class="flex flex-col gap-2 mt-4 justify-center items-center"
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

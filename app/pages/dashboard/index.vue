<script setup lang="ts">
const locationsStore = useLocationStore();
const mapStore = useMapStore();
const { locations, status } = storeToRefs(locationsStore);

/*
  video timestamp 5:29:21
*/

onMounted(() => {
  locationsStore.refresh();
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
    <div v-else-if="locations && locations.length > 0" class="flex flex-nowrap gap-2 mt-2 overflow-auto">
      <div
        v-for="location in locations"
        :key="location.id"
        class="card card-compact bg-base-300 h-40 w-74 mb-2 shrink-0 border-2 hover:cursor-pointer"
        :class="{
          'border-accent': location.id === mapStore.selectedPoint?.id,
          'border-transparent': location.id !== mapStore.selectedPoint?.id,
        }"
        @mouseenter="mapStore.selectedPoint = location"
        @mouseleave="mapStore.selectedPoint = null"
        @click="mapStore.clickedPoint = location ?? null"
      >
        <div class="card-body ">
          <h3 class="text-lg font-bold text-ellipsis line-clamp-1">
            {{ location.name }}
          </h3>
          <p class="text-pretty overflow-hidden text-ellipsis line-clamp-4">
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

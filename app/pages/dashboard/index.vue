<script setup lang="ts">
import { createMapPointFromLocation, isPointSelected } from '~~/server/utils/map-points';

const locationsStore = useLocationStore();
const mapStore = useMapStore();
const { locations, status } = storeToRefs(locationsStore);

/*
  video timestamp 6:50:21
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
      <NuxtLink
        v-for="location in locations"
        :key="location.id"
        :to="{ name: 'dashboard-location-slug', params: { slug: location.slug } }"
        class="card card-compact bg-base-300 h-40 w-74 mb-2 shrink-0 border-2 hover:cursor-pointer"
        :class="{
          'border-accent': isPointSelected(location, mapStore.selectedPoint),
          'border-transparent': !isPointSelected(location, mapStore.selectedPoint),
        }"
        @mouseenter="mapStore.selectedPoint = createMapPointFromLocation(location)"
        @mouseleave="mapStore.selectedPoint = null"
        @click="mapStore.clickedPoint = createMapPointFromLocation(location) ?? null"
      >
        <div class="card-body ">
          <h3 class="text-lg font-bold text-ellipsis line-clamp-1">
            {{ location.name }}
          </h3>
          <p class="text-pretty overflow-hidden text-ellipsis line-clamp-4">
            {{ location.description }}
          </p>
        </div>
      </NuxtLink>
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

<script setup lang="ts">
const route = useRoute();
const mapStore = useMapStore();
const { slug } = route.params;

// we use useFetch becase we want to call our own API endpoint
const { data: location, status, error } = useFetch(`/api/v1/locations/${slug}`, {
  lazy: true,
});

effect(() => {
  if (location.value) {
    mapStore.mapPoints = [location.value];
  }
});
</script>

<template>
  <div class="w-1/2 max-w-1/2 p-4 mx-auto">
    <div v-if="status === 'pending'" class="text-center">
      <div class="loading" />
    </div>
    <div v-if="location && status !== 'pending'">
      <h2
        class="text-xl font-bold mb-4 text-center"
      >
        {{ location?.name }}
      </h2>
      <p class="text-sm text-wrap">
        {{ location?.description }}
      </p>
    </div>
    <div v-if="error && status !== 'pending'" class="alert alert-error">
      <h3>
        {{ error.statusMessage }}
      </h3>
    </div>
  </div>
</template>

<style scoped>

</style>

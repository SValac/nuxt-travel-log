<script setup lang="ts">
import type { LngLat } from 'maplibre-gl';

import { CENTER_MX, MAP_DARK_STYLE, MAP_LIGHT_STYLE, MAP_ZOOM } from '~~/lib/constans';

const mapStore = useMapStore();

const colorMode = useColorMode();
const style = computed(() => colorMode.value === 'dark' ? MAP_DARK_STYLE : MAP_LIGHT_STYLE);

function updateAddedPoint(location: LngLat) {
  if (mapStore.addingPoint) {
    mapStore.addingPoint.lat = location.lat;
    mapStore.addingPoint.long = location.lng;
  }
}

onMounted(() => {
  mapStore.init();
});
</script>

<template>
  <div class="px-4 pb-4">
    <div class="w-full h-full rounded-2xl overflow-hidden">
      <MglMap
        :map-style="style"
        :center="CENTER_MX"
        :zoom="MAP_ZOOM"
      >
        <MglNavigationControl />
        <MglMarker
          v-for="point in mapStore.mapPoints"
          :key="point.id"
          :coordinates="[point.long, point.lat]"
        >
          <template #marker>
            <div
              class="tooltip tooltip-top hover:cursor-pointer"
              :class="{ 'tooltip-open': mapStore.selectedPoint?.id === point.id }"
              :data-tip="point.name"
              @mouseenter="mapStore.selectedPoint = point"
              @mouseleave="mapStore.selectedPoint = null"
              @click="mapStore.clickedPoint = point"
            >
              <Icon
                name="tabler:map-pin-filled"
                size="30"
                :class="mapStore.selectedPoint?.id === point.id ? 'text-accent' : 'text-secondary'"
              />
            </div>
          </template>
          <MglPopup
            @close="mapStore.clickedPoint = null"
          >
            <div class="p-2">
              <h3 class="font-bold text-lg">
                {{ point.name }}
              </h3>
              <p class="text-sm text-balance">
                {{ point.description || 'No description available.' }}
              </p>
            </div>
          </MglPopup>
        </MglMarker>

        <!-- User select marker -->
        <MglMarker
          v-if="mapStore.addingPoint"
          :coordinates="CENTER_MX"
          draggable
          @update:coordinates="updateAddedPoint($event)"
        >
          <template #marker>
            <div
              class="tooltip tooltip-top tooltip-open hover:cursor-pointer"
              data-tip="Drag me to a location"
            >
              <Icon
                name="tabler:map-pin-filled"
                size="35"
                class="text-warning"
              />
            </div>
          </template>
        </MglMarker>
      </MglMap>
    </div>
  </div>
</template>

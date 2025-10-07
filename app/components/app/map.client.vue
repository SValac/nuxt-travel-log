<script setup lang="ts">
import { CENTER_MX, MAP_DARK_STYLE, MAP_LIGHT_STYLE, MAP_ZOOM } from '~~/lib/constans';

const mapStore = useMapStore();

const colorMode = useColorMode();
const style = computed(() => colorMode.value === 'dark' ? MAP_DARK_STYLE : MAP_LIGHT_STYLE);

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
            <div class="tooltip tooltip-top" :data-tip="point.label">
              <Icon
                name="tabler:map-pin-filled"
                size="30"
                class="text-secondary"
              />
            </div>
          </template>
          <MglPopup>
            <div class="p-2">
              <h3 class="font-bold text-lg">
                {{ point.label }}
              </h3>
              <p class="text-sm text-balance">
                {{ point.description || 'No description available.' }}
              </p>
            </div>
          </MglPopup>
        </MglMarker>
      </MglMap>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CENTER_MX, MAP_DARK_STYLE, MAP_LIGHT_STYLE, MAP_ZOOM } from '~~/lib/constans';

const colorMode = useColorMode();
const style = computed(() => colorMode.value === 'dark' ? MAP_DARK_STYLE : MAP_LIGHT_STYLE);
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
      </MglMap>
    </div>
  </div>
</template>

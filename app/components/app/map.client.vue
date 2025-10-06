<script setup lang="ts">
import type { LngLatLike } from 'maplibre-gl';

import { CENTER_MX, MAP_DARK_STYLE, MAP_LIGHT_STYLE, MAP_ZOOM } from '~~/lib/constans';

const colorMode = useColorMode();
const style = computed(() => colorMode.value === 'dark' ? MAP_DARK_STYLE : MAP_LIGHT_STYLE);
</script>

<template>
  <MglMap
    :map-style="style"
    :center="CENTER_MX as LngLatLike"
    :zoom="MAP_ZOOM"
  >
    <MglNavigationControl />
  </MglMap>
</template>

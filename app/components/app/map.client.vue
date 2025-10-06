<script setup lang="ts">
import type { LngLatLike } from 'maplibre-gl';

const style = 'https://demotiles.maplibre.org/style.json';
const center = [-1.559482, 47.21322] as LngLatLike;
const zoom = 8;
</script>

<template>
  <MglMap
    :map-style="style"
    :center="center"
    :zoom="zoom"
  >
    <MglNavigationControl />
  </MglMap>
</template>

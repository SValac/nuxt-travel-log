import type { MapPoint } from '~~/lib/types';
/*
the error "The requested module 'maplibre-gl' does not provide an export named 'LngLat'" is because maplibre-gl are not meant to be imported directly in node environment (like during SSR). ONLY in client side.

to address this we can dynamically import this modules inside a function which will be called only in client side (like inside onMounted or useEffect/effect).
*/
// import { useMap } from '@indoorequal/vue-maplibre-gl';
// import { LngLatBounds } from 'maplibre-gl';

export const useMapStore = defineStore('useMapStore', () => {
  const mapPoints = ref<MapPoint[]>([]);

  async function init() {
    // here we dynamically import the module only when this function is called (which should be only in client side)
    const { LngLatBounds } = await import('maplibre-gl');
    const { useMap } = await import('@indoorequal/vue-maplibre-gl');

    const map = useMap();

    effect(() => {
      const firstPoint = mapPoints.value[0];
      if (!firstPoint)
        return;

      const bounds = mapPoints.value.reduce((bounds, point) => {
        return bounds.extend([point.long, point.lat]);
      }, new LngLatBounds(
        [firstPoint.long, firstPoint.lat],
        [firstPoint.long, firstPoint.lat],
      ));

      map.map?.fitBounds(bounds, {
        padding: 50,

      });
    });
  }

  return {
    mapPoints,
    init,
  };
});

import type { MapPoint } from '~~/lib/types';
import type { LngLatBounds } from 'maplibre-gl';
/*
the error "The requested module 'maplibre-gl' does not provide an export named 'LngLat'" is because maplibre-gl are not meant to be imported directly in node environment (like during SSR). ONLY in client side.

to address this we can dynamically import this modules inside a function which will be called only in client side (like inside onMounted or useEffect/effect).
*/
// import { useMap } from '@indoorequal/vue-maplibre-gl';
// import { LngLatBounds } from 'maplibre-gl';

export const useMapStore = defineStore('useMapStore', () => {
  const mapPoints = ref<MapPoint[]>([]);
  const selectedPoint = ref<MapPoint | null>(null);
  const addingPoint = ref<MapPoint | null>(null);
  // this variable is used to control if the map should fly to the selected point or not
  // this is useful when selecting a point from the list, we don't want the map to fly to the point
  const shouldFlyTo = ref(true);

  function selectPointWithoutFlyTo(point: MapPoint | null) {
    shouldFlyTo.value = false;
    selectedPoint.value = point;
  }

  async function init() {
    // here we dynamically import the module only when this function is called (which should be only in client side)
    const { LngLatBounds } = await import('maplibre-gl');
    const { useMap } = await import('@indoorequal/vue-maplibre-gl');

    const map = useMap();

    let bounds: LngLatBounds | null = null;
    const padding = 50;

    effect(() => {
      const firstPoint = mapPoints.value[0];
      if (!firstPoint)
        return;

      bounds = mapPoints.value.reduce((bounds, point) => {
        return bounds.extend([point.long, point.lat]);
      }, new LngLatBounds(
        [firstPoint.long, firstPoint.lat],
        [firstPoint.long, firstPoint.lat],
      ));

      map.map?.fitBounds(bounds, {
        padding,

      });
    });

    effect(() => {
      if (addingPoint.value)
        return;
      if (selectedPoint.value) {
        if (shouldFlyTo.value) {
          map.map?.flyTo({
            center: [selectedPoint.value.long, selectedPoint.value.lat],

          });
        }
        shouldFlyTo.value = true;
      }
      else if (bounds) {
        map.map?.fitBounds(bounds, {
          padding,
        });
      }
    });
  }

  return {
    mapPoints,
    selectedPoint,
    addingPoint,
    init,
    selectPointWithoutFlyTo,
  };
});

import type { SelectLocation } from '~~/lib/db/schema';
import type { MapPoint } from '~~/lib/types';

export const useLocationStore = defineStore('useLocationStore', () => {
  /*
  we dont use $fetch because this is used in response to user events/actions (clicking, typing, etc)
  if we want the data to be available when page load and you know that request can happen at the top level
  before user interaction, use useFetch instead.

  useFetch hanldles loading state, errors, and is SSR friendly. its loads data on server side during SSR
  and then hydrates it on client side. and includes all headers and make that request in the context of the user
  session (cookies, auth tokens, etc)

*/
  const { data, status, refresh } = useFetch('/api/v1/locations', {
  // allow navigating away from the page while the request is in flight
  // without cancelling the request
    lazy: true,
  });

  const sidebarStore = useSidebarStore();
  const mapStore = useMapStore();

  /*
  helper function to create MapPoint from location
  */
  function createMapPointFromLocation(location: SelectLocation): MapPoint {
    return {
      ...location,
      to: { name: 'dashboard-location-slug', params: { slug: location.slug } },
      toLabel: 'View Location',
    };
  }

  // check if data changes and update sidebarStore
  /*
  we use watchEffect because it runs immediately and whenever any reactive dependency changes BUT it does NOT run on server side, so we get hydration issues.

  Instead we can use effect() which run on server side and client side, so no hydration issues.
  */
  effect(() => {
    if (data.value) {
      const mapPoints: MapPoint[] = [];
      const sidebarItems: SidebarItem[] = [];

      data.value.forEach((location) => {
        const mapPoint = createMapPointFromLocation(location);
        sidebarItems.push({
          id: location.id,
          label: location.name,
          icon: 'mdi-map-marker',
          mapPoint,
        });
        mapPoints.push(mapPoint);
      });

      mapStore.mapPoints = mapPoints;
      sidebarStore.sidebarItems = sidebarItems;
    }
    sidebarStore.isLoading = status.value === 'pending';
  });

  return {
    locations: data,
    status,
    refresh,
  };
});

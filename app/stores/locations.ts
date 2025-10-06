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

  // check if data changes and update sidebarStore
  watchEffect(() => {
    if (data.value) {
      sidebarStore.sidebarItems = data.value.map(location => ({
        id: `location-${location.id}`,
        label: location.name,
        icon: 'tabler:map-pin-filled',
        href: `#`,
      }));
    }
    sidebarStore.isLoading = status.value === 'pending';
  });

  return {
    locations: data,
    status,
    refresh,
  };
});

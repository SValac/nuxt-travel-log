<script setup lang="ts">
const route = useRoute();
const isSidebarOpen = ref(false);
const sidebarStore = useSidebarStore();
const mapStore = useMapStore();
const locationsStore = useLocationStore();

onMounted(() => {
  isSidebarOpen.value = localStorage.getItem('isSidebarOpen') === 'true';
  if (route.path !== '/dashboard') {
    locationsStore.refresh();
  }
});

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
  localStorage.setItem('isSidebarOpen', isSidebarOpen.value.toString());
}
</script>

<template>
  <div class="flex-1 flex">
    <div
      class="bg-base-100 transition-all duration-300 shrink-0"
      :class="{ 'w-64': isSidebarOpen, 'w-16': !isSidebarOpen }"
    >
      <div
        class="flex hover:cursor-pointer hover:bg-base-300 p-2"
        :class="{ 'justify-end': isSidebarOpen, 'justify-center': !isSidebarOpen }"
        @click="toggleSidebar"
      >
        <Icon
          v-if="isSidebarOpen"
          name="tabler:chevron-left"
          size="32"
        />
        <Icon
          v-else
          name="tabler:chevron-right"
          size="32"
        />
      </div>
      <div class="flex flex-col ">
        <SidebarButton
          :show-label="isSidebarOpen"
          to="/dashboard"
          icon="tabler:map"
          label="Locations"
        />
        <SidebarButton
          :show-label="isSidebarOpen"
          to="/dashboard/add"
          icon="tabler:circle-plus-filled"
          label="Add Location"
        />
        <div v-if="sidebarStore.isLoading || sidebarStore.sidebarItems.length > 0" class="divider" />
        <div
          v-if="sidebarStore.isLoading"
          class="px-4"
        >
          <div class="skeleton w-full h-4" />
        </div>
        <template v-else-if="sidebarStore.sidebarItems.length">
          <SidebarButton
            v-for="item in sidebarStore.sidebarItems"
            :key="item.id"
            :show-label="isSidebarOpen"
            :to="item.href"
            :icon="item.icon"
            :label="item.label"
            :icon-color="mapStore.selectedPoint?.id === item.location?.id ? 'text-accent' : undefined"
            @mouseenter="mapStore.selectedPoint = item.location ?? null"
            @mouseleave="mapStore.selectedPoint = null"
            @click="mapStore.clickedPoint = item.location ?? null"
          />
        </template>
        <div class="divider" />
        <SidebarButton
          :show-label="isSidebarOpen"
          to="/sign-out"
          icon="tabler:logout-2"
          label="Sign Out"
        />
      </div>
    </div>
    <div class="flex-1 bg-base-200 overflow-auto">
      <div class="flex size-full" :class="{ 'flex-col': route.path === '/dashboard' }">
        <NuxtPage class="" />
        <AppMap class="flex-1" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

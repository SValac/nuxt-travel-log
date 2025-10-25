import type { MapPoint } from '~~/lib/types';
import type { RouteLocationRaw } from 'vue-router';

export type SidebarItem = {
  id: number;
  label: string;
  icon: string;
  href?: string;
  to?: RouteLocationRaw;
  mapPoint?: MapPoint | null;
};

export const useSidebarStore = defineStore('sidebar', () => {
  const sidebarItems = ref<SidebarItem[]>([]);
  const isLoading = ref(false);

  return {
    isLoading,
    sidebarItems,
  };
});

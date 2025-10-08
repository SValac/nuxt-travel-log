import type { MapPoint } from '~~/lib/types';

export type SidebarItem = {
  id: number;
  label: string;
  icon: string;
  href: string;
  location?: MapPoint | null;
};

export const useSidebarStore = defineStore('sidebar', () => {
  const sidebarItems = ref<SidebarItem[]>([]);
  const isLoading = ref(false);

  return {
    isLoading,
    sidebarItems,
  };
});

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

const props = defineProps<{
  to?: RouteLocationRaw;
  showLabel?: boolean;
  icon: string;
  label: string;
  href?: string;
  iconColor?: 'text-accent' | 'text-primary' | 'text-secondary' | 'text-info' | 'text-success' | 'text-warning' | 'text-error';
}>();
const route = useRoute();
</script>

<template>
  <NuxtLink
    :to="props.to || props.href"
    class="flex gap-2 hover:bg-base-300 hover:cursor-pointer p-2 "
    :class="{
      'bg-base-300': route.path === props.to,
      'justify-center': !props.showLabel,
      'justify-start': props.showLabel,
    }"
  >
    <Icon
      :name="`${props.icon}`"
      size="24"
      :class="props.iconColor"
    />
    <Transition name="grow">
      <span v-if="props.showLabel" class="line-clamp-1">{{ props.label }}</span>
    </Transition>
  </NuxtLink>
</template>

<style scoped>
.grow-enter-active {
  animation: grow 0.2s;
}

.grow-leave-active {
  animation: grow 0.1s reverse;
}

@keyframes grow {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>

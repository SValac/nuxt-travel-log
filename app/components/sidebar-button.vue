<script setup lang="ts">
const props = defineProps<{
  to: string;
  showLabel?: boolean;
  icon: string;
  label: string;
}>();
const route = useRoute();
</script>

<template>
  <NuxtLink
    :to="props.to"
    class="flex gap-2 hover:bg-base-300 hover:cursor-pointer p-2 "
    :class="{
      'bg-base-300': route.path === props.to,
      'justify-center': !props.showLabel,
      'justify-start': props.showLabel,
    }"
  >
    <Icon :name="`tabler:${props.icon}`" size="24" />
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

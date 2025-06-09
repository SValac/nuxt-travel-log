<script setup lang="ts">
const props = defineProps<{
  label: string;
  name: string;
  type?: 'text' | 'textarea' | 'number';
  error?: string;
  disabled?: boolean;
}>();
</script>

<template>
  <fieldset class="fieldset ">
    <legend class="fieldset-legend">
      {{ props.label }}
    </legend>
    <Field
      :as="type === 'textarea' ? 'textarea' : 'input'"
      :name="name"
      :type="type || 'text'"
      :disabled="disabled"
      class="w-full"
      :class="{
        'input': !type || type === 'text' || type === 'number',
        'textarea': type === 'textarea',
        'input-error': error,
      }"
    />
    <p v-if="error" class="label text-error">
      {{ error }}
    </p>
  </fieldset>
</template>

<style scoped>

</style>

<script setup lang="ts">
import type { FetchError } from 'ofetch';

import { toTypedSchema } from '@vee-validate/zod';
import { locationInsertSchema } from '~~/lib/db/schema';

const { $csrfFetch } = useNuxtApp();

const router = useRouter();
const submitError = ref('');
const isLoading = ref(false);
const isSubmitted = ref(false);

const { handleSubmit, errors, meta, setErrors } = useForm({
  validationSchema: toTypedSchema(locationInsertSchema),
});

const onSubmit = handleSubmit(async (values) => {
  try {
    submitError.value = '';
    isLoading.value = true;
    await $csrfFetch('/api/v1/locations', {
      method: 'POST',
      body: values,
    });
    isSubmitted.value = true;
    navigateTo('/dashboard');
  }
  catch (e) {
    const error = e as FetchError;
    if (error.data?.data) {
      setErrors(error.data?.data);
    }
    submitError.value = error.data?.statusMessage || error.statusMessage || 'An error occurred while adding the location.';
  }
  finally {
    isLoading.value = false;
  }
});

onBeforeRouteLeave(() => {
  if (!isSubmitted.value && meta.value.dirty) {
    // eslint-disable-next-line no-alert
    const confirmLeave = window.confirm('You have unsaved changes. Are you sure you want to leave?');
    if (!confirmLeave) {
      return false;
    }
  }
  return true;
});
</script>

<template>
  <div class="container mx-auto max-w-md">
    <div class="my-4">
      <h1 class="text-start text-lg">
        Add Location
      </h1>
      <p>A location is a place you have traveled or will travel to. it can be a city, country, state or point of interest. You can add specific times you visited this location after adding it.</p>
    </div>
    <div
      v-if="submitError"
      role="alert"
      class="alert alert-error"
    >
      <span>{{ submitError }}</span>
    </div>
    <form
      class="flex flex-col gap-2"
      @submit.prevent="onSubmit"
    >
      <AppFormField
        name="name"
        label="Name"
        :error="errors.name"
        :disabled="isLoading"
      />
      <AppFormField
        name="description"
        label="Description"
        type="textarea"
        :error="errors.description"
        :disabled="isLoading"
      />
      <AppFormField
        name="lat"
        label="Latitude"
        type="number"
        :error="errors.lat"
        :disabled="isLoading"
      />
      <AppFormField
        name="long"
        label="Longitude"
        type="number"
        :error="errors.long"
        :disabled="isLoading"
      />
      <div class="flex justify-end gap-2">
        <button
          type="button"
          class="btn btn-outline"
          :disabled="isLoading"
          @click="router.back"
        >
          Cancel
          <Icon
            name="tabler:arrow-left"
            size="24"
          />
        </button>
        <button
          type="submit"
          class="btn btn-primary"
          :disabled="isLoading"
        >
          Add
          <span v-if="isLoading" class="loading loading-spinner loading-sm" />
          <Icon
            v-else
            name="tabler:circle-plus-filled"
            size="24"
          />
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>

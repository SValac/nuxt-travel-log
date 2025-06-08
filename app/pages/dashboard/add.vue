<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { locationInsertSchema } from '~~/lib/db/schema';

const { handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(locationInsertSchema),
});

const onSubmit = handleSubmit((values) => {
  console.log(values);
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
    <form
      class="flex flex-col gap-2"
      @submit.prevent="onSubmit"
    >
      <AppFormField
        name="name"
        label="Name"
        :error="errors.name"
      />
      <AppFormField
        name="description"
        label="Description"
        type="textarea"
        :error="errors.description"
      />
      <AppFormField
        name="lat"
        label="Latitude"
        type="number"
        :error="errors.lat"
      />
      <AppFormField
        name="long"
        label="Longitude"
        type="number"
        :error="errors.long"
      />
      <div class="flex justify-end gap-2">
        <button
          type="button"
          class="btn btn-outline "
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
        >
          Add
          <Icon
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

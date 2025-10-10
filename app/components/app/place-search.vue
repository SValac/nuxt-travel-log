<script setup lang="ts">
import { SearchSchema } from '~~/lib/zod-schemas';

function onSubmit(values: unknown) {
  const { q } = values as SearchSchema;
  console.log(q);
}
</script>

<template>
  <Form
    v-slot="{ errors }"
    class="flex flex-col gap-2 items-center"
    :validation-schema="toTypedSchema(SearchSchema)"
    :initial-values="{ q: '' }"
    @submit="onSubmit"
  >
    <div class="join mt-4">
      <div>
        <label class="input join-item">
          <Icon name="tabler:search" />
          <Field
            type="text"
            name="q"
            placeholder="Search for a location"
            :class="{
              'input-error': errors.q,
            }"
          /></label>
        <div v-if="true" class="validator-hint text-error visible">
          {{ errors.q }}
        </div>
      </div>
      <button class="btn btn-neutral join-item">
        Search
      </button>
    </div>
  </Form>
</template>

<style scoped>

</style>

<script setup lang="ts">
import type { NominatimResult } from '~~/lib/types';

import { SearchSchema } from '~~/lib/zod-schemas';

const emits = defineEmits<{
  resultSelected: [result: NominatimResult];
}>();

const searchResults = ref<NominatimResult[]>([]);

async function onSubmit(query: Record<string, string>) {
  try {
    const results = await $fetch('/api/v1/search', {
      query,
    });
    searchResults.value = results;
  }
  catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <div class="flex flex-col gap-2">
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
    <div class="flex flex-col gap-2 overflow-auto max-h-52">
      <div
        v-for="result in searchResults"
        :key="result.place_id"
        class="card card-xs bg-base-100"
      >
        <div class="card-body">
          <h4 class="card-title">
            {{ result.display_name }}
          </h4>
          <div class="justify-end card-actions">
            <button class="btn btn-primary btn-sm" @click="emits('resultSelected', result)">
              Set Location
              <Icon name="tabler:map-pin-share" size="18" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },
  eslint: {
    config: {
      standalone: false, // <---
    },
  },
  modules: ['@nuxt/eslint'],
});

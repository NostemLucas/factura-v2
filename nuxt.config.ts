// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: false,
  modules: ['@pinia/nuxt', '@nuxtjs/color-mode', '@nuxt/image', '@nuxt/ui'],
  colorMode: {
    classSuffix: ''
  },
  runtimeConfig: {
    public: {
      NUXT_API_URL: process.env.NUXT_API_URL,
      NUXT_API_ENV: process.env.NUXT_API_ENV
    }
  },
  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },
  typescript: {
    strict: true
  },
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    rootAttrs: {
      'vaul-drawer-wrapper': '',
      class: 'bg-(--ui-bg)'
    },
    head: {
      title: 'Login App',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  }
})

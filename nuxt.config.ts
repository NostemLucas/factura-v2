// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: ['@pinia/nuxt', '@nuxtjs/color-mode', '@nuxt/image'],
  colorMode: {
    classSuffix: ''
  },
  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },
  typescript: {
    strict: true
  },
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      title: 'Login App',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  }
})

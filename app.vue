<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Toaster
      rich-colors
      position="top-right"
      :theme="colorMode.value === 'dark' ? 'dark' : 'light'"
    />
    <ResponsiveChip />
  </UApp>
</template>

<script setup lang="ts">
import { Toaster } from 'vue-sonner'
import ResponsiveChip from './components/utils/ResponsiveChip.vue'
const colorMode = useColorMode()
</script>

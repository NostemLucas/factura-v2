<template>
  <div>
    <NuxtPage />
    <Toaster
      rich-colors
      position="top-right"
      :theme="colorMode.value === 'dark' ? 'dark' : 'light'"
    />
  </div>
</template>

<script setup lang="ts">
import { Toaster } from 'vue-sonner'
const colorMode = useColorMode()
</script>

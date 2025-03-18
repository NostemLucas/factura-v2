<script setup lang="ts">
import SideBar from '~/components/layout/SideBar.vue'
import TopBar from '~/components/layout/TopBar.vue'
</script>
<template>
  <div
    class="flex h-screen w-screen overflow-hidden dark:bg-background bg-gradient-to-br from-blue-50 to-indigo-50"
  >
    <SideBar />
    <TopBar />
    <slot />
  </div>
</template>

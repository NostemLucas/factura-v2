<script setup lang="ts">
import SideBar from '~/components/layout/SideBar.vue'
import TopBar from '~/components/layout/TopBar.vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const store = useDashboard()

//breakpoints
const breakpoints = useBreakpoints(breakpointsTailwind)

const xs = breakpoints.smaller('md')
</script>
<template>
  <div
    class="flex flex-col overflow-hidden dark:bg-background bg-gradient-to-br from-blue-50 to-indigo-50"
  >
    <SideBar />
    <TopBar />
    <div
      :class="[
        xs ? 'ml-0' : store.isCollapsed ? 'ml-[70px]' : 'ml-62',
        'h-[calc(100vh-64px)]'
      ]"
    >
      <slot />
    </div>
  </div>
</template>

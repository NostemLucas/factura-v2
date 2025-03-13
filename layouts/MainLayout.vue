<script setup lang="ts">
import Sidebar from './ui/Sidebar.vue'
import Topbar from './ui/Topbar.vue'

const dashboard = useDashboard()
const { openDrawer } = storeToRefs(dashboard)
</script>

<template>
  <div class="relative flex w-full overflow-hidden bg-gray-50">
    <Sidebar />
    <div
      :class="[
        'flex w-full flex-1 flex-col  transition-all duration-300',
        openDrawer ? 'lg:pl-48' : 'lg:pl-16'
      ]"
    >
      <Topbar />

      <main
        class="min-h-[80vh] flex-1 overflow-auto bg-gray-50 p-4 flex justify-center"
      >
        <div class="w-full lg:w-[90%] rounded-lg bg-white shadow">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

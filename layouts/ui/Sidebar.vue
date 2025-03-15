<script setup lang="ts">
import { SidebarItems } from '~/mocks/mainLayout.types'
import { Grid as GridIcon, User as UserIcon } from 'lucide-vue-next'
import { NuxtLink } from '#components'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
const breakpoints = useBreakpoints(breakpointsTailwind)

const router = useRoute()
const lgUp = breakpoints.greaterOrEqual('lg')

const dashboard = useDashboard()
const { openDrawer } = storeToRefs(dashboard)
const { toggleDrawer } = dashboard
</script>

<template>
  <div
    v-show="openDrawer"
    class="fixed inset-0 z-20 bg-black/20 lg:hidden transition-all duration-300"
    @click="toggleDrawer"
  ></div>
  <aside
    :class="[
      'fixed inset-y-0 left-0 z-50 lg:z-0 h-screen flex w-64 lg:w-16 flex-col border-r border-gray-200 bg-white transition-all lg:pt-16 duration-300  overflow-x-hidden',
      lgUp && (openDrawer ? 'lg:w-48' : 'lg:w-16'),
      !lgUp && (openDrawer ? 'translate-x-0' : '-translate-x-full')
    ]"
  >
    <nav class="flex-1 overflow-y-auto overflow-x-hidden py-2">
      <ul class="space-y-1">
        <li
          v-for="(item, index) in SidebarItems"
          :key="index"
          class="relative px-2"
        >
          <NuxtLink :to="item.url">
            <a
              :class="[
                'flex w-full flex-col items-center justify-center rounded-lg gap-2 p-2 text-[10px] text-gray-600 transition-colors hover:bg-gray-100',
                item.url == router.fullPath ? 'bg-gray-100 text-blue-600' : '',
                openDrawer
                  ? 'flex-row lg:flex-row lg:justify-start lg:gap-3 lg:px-3 lg:text-xs'
                  : ''
              ]"
            >
              <component :is="item.icon" class="mb-1 h-5 w-5 lg:mb-0" />
              <span
                :class="[openDrawer ? 'lg:flex-1 text-left' : 'text-center']"
              >
                {{ item.title }}
              </span>
            </a>
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <div class="mt-auto border-t border-gray-200 p-2">
      <div
        class="flex cursor-pointer flex-col gap-2 items-center rounded-lg p-2 text-[10px] text-gray-600 hover:bg-gray-100"
        :class="openDrawer ? 'flex-row lg:flex-row lg:gap-3 lg:text-xs' : ''"
      >
        <user-icon class="mb-1 h-5 w-5 lg:mb-0" />
        <span class="text-center">Perfil</span>
      </div>
    </div>
  </aside>
</template>

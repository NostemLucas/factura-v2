<template>
  <header
    :class="[
      'z-10 sticky top-0',
      'dark:bg-[#101828] dark:border-gray-800',
      'transition-all duration-300 ease-in-out',
      'bg-white/90 backdrop-blur-sm border-b border-gray-100',
      'flex-1 flex flex-col',
      xs ? 'ml-0' : store.isCollapsed ? 'ml-[84px]' : 'ml-72'
    ]"
  >
    <!-- Main Topbar -->
    <div class="h-16 flex items-center justify-between px-4 md:px-6">
      <!-- Left side -->

      <div class="flex items-center">
        <!-- Mobile menu button -->
        <button
          @click="store.toggleDrawer()"
          class="p-1.5 rounded-md md:hidden dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-gray-800 text-gray-500 hover:text-primary-600 hover:bg-gray-100"
          aria-label="Toggle sidebar"
        >
          <MenuIcon v-if="!store.isOpenDrawer" class="h-5 w-5" />
          <XIcon v-else class="h-5 w-5" />
        </button>

        <!-- Breadcrumb -->
        <div class="flex items-center ml-1 md:ml-0">
          <div class="flex items-center">
            <div class="flex items-center space-x-2">
              <div
                class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-primary-50 dark:bg-gray-800"
              >
                <component
                  :is="activeItem?.icon"
                  class="w-5 h-5 text-primary-500 dark:text-primary-400"
                />
              </div>
              <span
                class="text-lg font-medium whitespace-nowrap dark:text-white text-gray-800"
              >
                {{ activeItem?.name }}
              </span>
            </div>

            <ChevronRightIcon
              :class="['h-4 w-4 mx-2', 'dark:text-gray-500', 'text-gray-400']"
            />

            <div class="flex items-center">
              <div
                :class="[
                  'flex items-center rounded-md px-2 py-1 text-sm  duration-200',
                  'bg-primary-400 dark:text-primary-100 text-white hover:bg-primtext-primary-700'
                ]"
              >
                <CircleIcon class="h-3 w-3 mr-1.5" />
                <span>General</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Center - Search -->
      <div class="hidden md:block max-w-md w-full mx-4 lg:mx-8 xl:mx-16">
        <div class="relative group">
          <input
            type="text"
            placeholder="Search"
            :class="[
              'w-full h-9 pl-9 pr-4 rounded-md text-sm ',
              'dark:bg-gray-800/70 dark:text-gray-200 dark:placeholder-gray-500 dark:focus:bg-gray-800 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-blue-500/50',
              'bg-gray-50/70 text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50'
            ]"
          />
          <SearchIcon
            :class="[
              'h-4 w-4 absolute left-3 top-2.5 ',
              'dark:text-gray-500 dark:group-focus-within:text-blue-400',
              'text-gray-400 group-focus-within:text-blue-600'
            ]"
          />
        </div>
      </div>

      <div class="flex items-center space-x-1 sm:space-x-2">
        <button
          :class="[
            'p-1.5 rounded-md md:hidden',
            'dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800',
            'text-gray-500 hover:text-blue-600 hover:bg-gray-100'
          ]"
        >
          <SearchIcon class="h-5 w-5" />
        </button>

        <ToggleButton />
        <button
          :class="[
            'p-1.5 rounded-md relative',
            'dark:text-gray-300 dark:hover:text-blue-400 hover:text-gray-800',
            'text-gray-500 '
          ]"
        >
          <BellIcon class="h-5 w-5" />
          <span
            class="absolute top-0.5 right-0.5 h-2 w-2 rounded-full bg-red-500 animate-pulse"
          />
        </button>
        <button
          class="ml-1 w-8 h-8 rounded-full overflow-hidden border-2"
          :class="[
            'dark:border-blue-500 dark:ring-2 dark:ring-blue-500/30',
            'border-gray-700 hover:border-blue-500'
          ]"
        >
          <NuxtImg
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dvSZhyStgm9DNolueaXK6QwebuDdl4.png"
            alt="User avatar"
            class="w-full h-full object-cover"
          />
        </button>
      </div>
    </div>

    <!-- Secondary Navbar -->
  </header>
</template>

<script setup lang="ts">
import ToggleButton from '../ui/Button/ToggleButton.vue'
import {
  Search as SearchIcon,
  Bell as BellIcon,
  ChevronRight as ChevronRightIcon,
  Menu as MenuIcon,
  X as XIcon,
  Circle as CircleIcon
} from 'lucide-vue-next'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import type { SideBar } from '~/layouts/default.vue'

const props = defineProps<{
  navigation: SideBar[]
}>()

const store = useDashboard()
const breakpoints = useBreakpoints(breakpointsTailwind)

const xs = breakpoints.smaller('md')
const route = useRouter()
// Propiedad de los datos de navegación (por ejemplo, `props.navigation`)
const activeItem = computed(() => {
  // Recorrer todos los SideBars
  for (const sidebar of props.navigation) {
    // Buscar dentro de los `items` de cada `sidebar` la coincidencia con la ruta actual
    const foundItem = sidebar.items.find(
      (item) => item.route === route.currentRoute.value.path
    )

    // Si encontramos el item activo, lo retornamos
    if (foundItem) {
      return foundItem // Retornamos el item activo
    }
  }

  // Si no se encuentra ningún item activo, devolvemos null o un objeto vacío
  return null
})
const groups = ref([
  {
    id: 'apps',
    items: [
      {
        label: 'Calendar',
        icon: 'i-lucide-calendar'
      },
      {
        label: 'Music',
        icon: 'i-lucide-music'
      },
      {
        label: 'Maps',
        icon: 'i-lucide-map'
      }
    ]
  }
])
</script>

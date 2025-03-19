<script setup lang="ts">
import { UTooltip } from '#components'
import {
  MoreHorizontal as MoreHorizontalIcon,
  ChevronLeft as ChevronLeftIcon,
  Database as DatabaseIcon,
  Activity as ActivityIcon,
  Award as AwardIcon,
  Users as UsersIcon,
  BarChart as BarChartIcon,
  Grid as GridIcon,
  Power as PowerIcon,
  LayoutDashboard as LayoutDashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  FileText as FileTextIcon
} from 'lucide-vue-next'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const store = useDashboard()

//breakpoints
const breakpoints = useBreakpoints(breakpointsTailwind)
const isLowerThanMd = ref(breakpoints.isSmaller('md'))

//TODO REMPLAZAR CON LOGICA DE VERDAD
const activeSection = ref(0)
const activeItem = ref(0)
const setActiveItem = (sectionIndex: number, itemIndex: number) => {
  activeSection.value = sectionIndex
  activeItem.value = itemIndex
}

const isActive = (sectionIndex: number, itemIndex: number) => {
  return activeSection.value === sectionIndex && activeItem.value === itemIndex
}

const windowWidth = ref(window.innerWidth)

// Actualizar el valor cuando la ventana cambia de tamaño
window.addEventListener('resize', () => {
  windowWidth.value = window.innerWidth
  console.log(windowWidth)
  console.log('Boolean MD', isLowerThanMd.value)
})

const navigation = reactive([
  {
    title: 'Home',
    items: [
      { name: 'Home', icon: LayoutDashboardIcon, badge: null },
      { name: 'Facturas', icon: FileTextIcon, badge: null },
      { name: 'Ventas', icon: ShoppingCartIcon, badge: null }
    ]
  },
  {
    title: 'Data',
    items: [
      { name: 'Data hub', icon: DatabaseIcon, badge: null },
      { name: 'Monitoring hub', icon: ActivityIcon, badge: null },
      { name: 'Metrics', icon: AwardIcon, badge: null }
    ]
  },
  {
    title: 'Workspaces',
    items: [
      { name: 'Workspaces', icon: GridIcon, badge: null },
      { name: 'My workspace', icon: UsersIcon, badge: null },
      { name: 'ESG Indicators', icon: BarChartIcon, badge: '3' }
    ]
  },
  {
    title: 'More',
    items: [
      { name: 'More...', icon: MoreHorizontalIcon, badge: null },
      { name: 'Power BI', icon: PowerIcon, badge: null }
    ]
  }
])
</script>
<template>
  <!-- Sidebar -->
  <UDrawer
    direction="left"
    portal
    fixed
    :dismissible="false"
    :open="(isLowerThanMd && store.isOpenDrawer) || !isLowerThanMd"
    :handle="false"
    class="overflow-hidden"
    :ui="{
      content: 'ring-0 rounded-none',
      overlay: 'backdrop-blur-3xl bg-amber-600'
    }"
    aria-describedby="drawer-description"
    aria-label="Sidebar de navegación"
  >
    <template #content>
      <aside
        :class="[
          'h-screen md:flex inset-y-0 left-0 z-30  flex-col transition-all duration-300 ease-in-out border-r ',
          'dark:border-gray-800 bg-background border-gray-100',
          store.isCollapsed
            ? 'md:w-[80px] overflow-hidden md:overflow-visible hidden md:fixed'
            : 'w-64'
        ]"
      >
        <!-- Logo -->
        <div class w-full h-full></div>
        <div
          :class="[
            'flex items-center h-16 px-5 shrink-0 border-b dark:border-gray-800 border-gray-100'
          ]"
        >
          <div class="flex items-center space-x-3 overflow-hidden">
            <div
              :class="[
                'w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ',
                store.isCollapsed ? 'scale-110' : 'scale-100',
                'group-hover:rotate-3'
              ]"
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 400 400"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <mask id="barsMask">
                    <rect width="400" height="400" fill="white" />
                    <rect x="80" y="240" width="60" height="100" fill="black" />
                    <rect
                      x="170"
                      y="180"
                      width="60"
                      height="160"
                      fill="black"
                    />
                    <rect
                      x="260"
                      y="120"
                      width="60"
                      height="220"
                      fill="black"
                    />
                  </mask>
                </defs>
                <rect
                  width="400"
                  height="400"
                  rx="40"
                  fill="currentColor"
                  class="text-primary-500"
                  mask="url(#barsMask)"
                />
              </svg>
            </div>
            <span
              :class="[
                'text-lg font-semibold whitespace-nowrap transition-all duration-300 dark:text-white text-gray-800',
                store.isCollapsed
                  ? 'opacity-0 -translate-x-10 w-0'
                  : 'opacity-100 translate-x-0'
              ]"
            >
              CodeX
            </span>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 overflow-y-auto py-2 px-3">
          <div class="space-y-6">
            <div
              v-for="(section, sectionIndex) in navigation"
              :key="`section-${sectionIndex}`"
            >
              <!-- Section Title or Divider -->
              <div v-if="section.title" class="mb-2">
                <h3
                  v-if="!store.isCollapsed"
                  class="px-3 text-xs font-bold uppercase tracking-widest transition-opacity duration-200 dark:text-gray-400 text-gray-500"
                >
                  {{ section.title }}
                </h3>
                <!-- Divider for collapsed mode -->
                <div
                  v-if="store.isCollapsed && sectionIndex > 0"
                  class="h-px w-10 mx-auto my-3 transition-all duration-300 dark:bg-gray-800 bg-gray-200"
                />
              </div>

              <div class="space-y-0">
                <UTooltip
                  v-for="(item, itemIndex) in section.items"
                  :key="`item-${sectionIndex}-${itemIndex}`"
                  :text="item.name"
                  :delay-duration="0"
                  :disabled="!store.isCollapsed"
                  arrow
                  :content="{
                    align: 'center',
                    side: 'right',
                    sideOffset: 2
                  }"
                >
                  <button
                    @click="setActiveItem(sectionIndex, itemIndex)"
                    :class="[
                      'group w-full flex items-center text-base font-normal tracking-wider rounded-md transition-all duration-200 relative cursor-pointer',
                      store.isCollapsed ? 'h-14' : 'py-4',
                      store.isCollapsed ? 'justify-center px-2' : 'px-4',
                      isActive(sectionIndex, itemIndex)
                        ? 'dark:text-primary-400 dark:bg-gray-800/70 dark:before:w-1 dark:before:bg-primary-500 text-primary-600 bg-blue-50/70 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-4/8 before:w-1 before:bg-primary-600 before:rounded-r-md'
                        : 'dark:text-gray-300 dark:hover:bg-gray-800/50 dark:hover:text-gray-100 text-gray-700 hover:bg-gray-100/70 hover:text-gray-900'
                    ]"
                  >
                    <component
                      :is="item.icon"
                      :class="[
                        'flex-shrink-0 h-6 w-6 transition-all duration-200 ',
                        store.isCollapsed ? 'mr-0' : 'mr-3',
                        isActive(sectionIndex, itemIndex)
                          ? 'dark:text-primary-400 text-primary-600'
                          : 'dark:text-gray-500 dark:group-hover:text-gray-900 text-foreground group-hover:text-gray-900'
                      ]"
                    />

                    <span
                      :class="[
                        'whitespace-nowrap transition-all duration-300 tracking-wide',
                        store.isCollapsed
                          ? 'opacity-0 w-0 overflow-hidden -translate-x-5'
                          : 'opacity-100 w-auto translate-x-0',
                        isActive(sectionIndex, itemIndex)
                          ? 'font-semibold'
                          : 'font-light'
                      ]"
                    >
                      {{ item.name }}
                    </span>

                    <span
                      v-if="item.badge && !store.isCollapsed"
                      :class="[
                        'ml-auto inline-flex items-center px-2 py-0.0 rounded-full text-xs font-medium transition-all duration-200',
                        isActive(sectionIndex, itemIndex)
                          ? 'dark:bg-primary-500/80 text-white bg-primary-600/80'
                          : 'dark:bg-gray-800 dark:text-gray-300 bg-gray-100 text-gray-600'
                      ]"
                    >
                      {{ item.badge }}
                    </span>

                    <span
                      v-if="item.badge && store.isCollapsed"
                      class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white transition-all duration-200 bg-primary-400 animate-pulse-once"
                    >
                      {{ item.badge }}
                    </span>
                  </button>
                </UTooltip>
              </div>
            </div>
          </div>
        </nav>

        <!-- User Profile -->
        <div class="shrink-0 p-3 border-t dark:border-gray-800 border-gray-100">
          <div
            :class="[
              'flex items-center transition-all duration-300 rounded-lg group dark:hover:bg-gray-800 hover:bg-gray-100',
              store.isCollapsed ? 'pl-3' : 'justify-start p-2'
            ]"
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dvSZhyStgm9DNolueaXK6QwebuDdl4.png"
              alt="User avatar"
              :class="[
                'h-9 w-9 rounded-full border-2 transition-all duration-300',
                store.isCollapsed
                  ? 'border-primary-500'
                  : 'dark:border-gray-700 border-gray-200 group-hover:border-primary-500'
              ]"
            />
            <div
              :class="[
                'ml-3 transition-all duration-300',
                store.isCollapsed
                  ? 'opacity-0 w-0 overflow-hidden -translate-x-5'
                  : 'opacity-100 w-auto translate-x-0'
              ]"
            >
              <p class="text-sm font-medium dark:text-white text-gray-800">
                Alex Johnson
              </p>
              <p class="text-xs dark:text-gray-400 text-gray-500">
                Data Analyst
              </p>
            </div>
          </div>
        </div>

        <!-- Collapse Toggle Button -->
        <button
          @click="store.toggleCollapse()"
          :class="[
            'hidden md:flex absolute top-16 -right-4 h-8 w-8 items-center justify-center rounded-full shadow-md z-10 transition-all duration-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-gray-700 bg-white text-gray-500 hover:text-primary-600 hover:bg-gray-50',
            store.isCollapsed ? 'rotate-180' : ''
          ]"
          aria-label="Toggle sidebar collapse"
        >
          <ChevronLeftIcon class="h-4 w-4 transition-transform duration-300" />
        </button></aside
    ></template>

    <template> </template>
  </UDrawer>
</template>

<style scoped>
@keyframes pulse-once {
  0% {
    transform: scale(0.95);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-pulse-once {
  animation: pulse-once 0.5s ease-in-out;
}
</style>

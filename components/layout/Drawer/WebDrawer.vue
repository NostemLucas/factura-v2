<script setup lang="ts">
import { UTooltip } from '#components'

export interface SideBar {
  title: string
  items: {
    name: string
    icon: Object
    route: string | null
  }[]
}

defineProps<{
  navigation: SideBar[]
}>()

//store dashboard
const store = useDashboard()

//breakpoints

//TODO: REMPLAZAR CON LOGICA DE VERDAD
const activeSection = ref(0)
const activeItem = ref(0)
const setActiveItem = (sectionIndex: number, itemIndex: number) => {
  activeSection.value = sectionIndex
  activeItem.value = itemIndex
}
const isActive = (sectionIndex: number, itemIndex: number) => {
  return activeSection.value === sectionIndex && activeItem.value === itemIndex
}
</script>
<template>
  <aside
    :class="[
      'flex absolute h-screen inset-y-0 left-0 z-30  flex-col border-r ',
      'dark:border-gray-800 bg-background border-gray-100',
      store.isCollapsed ? 'md:w-[80px] ' : 'w-64'
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
            'w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ',
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
                <rect x="170" y="180" width="60" height="160" fill="black" />
                <rect x="260" y="120" width="60" height="220" fill="black" />
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
            'text-lg font-semibold whitespace-nowrap duration-300 dark:text-white text-gray-800'
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
              class="px-3 text-xs font-bold uppercase tracking-widest duration-200 dark:text-gray-400 text-gray-500"
            >
              {{ section.title }}
            </h3>
            <!-- Divider for collapsed mode -->
            <div
              v-if="store.isCollapsed && sectionIndex > 0"
              class="h-px w-10 mx-auto my-3 dark:bg-gray-800 bg-gray-200"
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
                  'group w-full flex items-center text-base font-normal tracking-wider rounded-md  relative cursor-pointer',
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
                    'flex-shrink-0 h-6 w-6  duration-200 ',
                    store.isCollapsed ? 'mr-0' : 'mr-3',
                    isActive(sectionIndex, itemIndex)
                      ? 'dark:text-primary-400 text-primary-600'
                      : 'dark:text-gray-500 dark:group-hover:text-gray-900 text-foreground group-hover:text-gray-900'
                  ]"
                />

                <span
                  :class="[
                    'whitespace-nowrap duration-300 tracking-wide',
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
                    'ml-auto inline-flex items-center px-2 py-0.0 rounded-full text-xs font-medium  ',
                    isActive(sectionIndex, itemIndex)
                      ? 'dark:bg-primary-500/80 text-white bg-primary-600/80'
                      : 'dark:bg-gray-800 dark:text-gray-300 bg-gray-100 text-gray-600'
                  ]"
                >
                  {{ item.badge }}
                </span>

                <span
                  v-if="item.badge && store.isCollapsed"
                  class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white transition-all duration-200 bg-primary-400 animate-pulse"
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
          'flex items-center rounded-lg group dark:hover:bg-gray-800 hover:bg-gray-100',
          store.isCollapsed ? 'pl-3' : 'justify-start p-2'
        ]"
      >
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dvSZhyStgm9DNolueaXK6QwebuDdl4.png"
          alt="User avatar"
          :class="[
            'h-9 w-9 rounded-full border-2  duration-300',
            store.isCollapsed
              ? 'border-primary-500'
              : 'dark:border-gray-700 border-gray-200 group-hover:border-primary-500'
          ]"
        />
        <div
          :class="[
            'ml-3  duration-300',
            store.isCollapsed
              ? 'opacity-0 w-0 overflow-hidden -translate-x-5'
              : 'opacity-100 w-auto translate-x-0'
          ]"
        >
          <p class="text-sm font-medium dark:text-white text-gray-800">
            Alex Johnson
          </p>
          <p class="text-xs dark:text-gray-400 text-gray-500">Data Analyst</p>
        </div>
      </div>
    </div>

    <!-- Collapse Toggle Button -->
    <button
      @click="store.toggleCollapse()"
      :class="[
        'absolute top-16 -right-4 h-8 w-8 items-center justify-center rounded-full shadow-md z-10  dark:bg-gray-800 dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-gray-700 bg-white text-gray-500 hover:text-primary-600 hover:bg-gray-50',
        store.isCollapsed ? 'rotate-180' : ''
      ]"
      aria-label="Toggle sidebar collapse"
    >
      <ChevronLeftIcon class="h-4 w-4" />
    </button>
  </aside>
</template>

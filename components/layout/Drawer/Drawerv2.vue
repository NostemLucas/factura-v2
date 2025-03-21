<script setup lang="ts">
import { UTooltip } from '#components'
import { ref, computed } from 'vue'
import { ChevronLeftIcon, BellIcon, SettingsIcon } from 'lucide-vue-next'

export interface SideBar {
  title: string
  items: {
    name: string
    icon: Object
    route: string | null
    badge?: string | number
  }[]
}

defineProps<{
  navigation: SideBar[]
}>()

// Store dashboard
const store = useDashboard()

// Route and hover state
const route = useRouter()
const activeRoute = computed(() => route.currentRoute.value.path)
const hoverIndex = ref<string | null>(null)

// Navigation function with transition effect
const navigateTo = (path: string | null) => {
  if (!path) return

  // Add a small delay before closing drawer for better UX
  setTimeout(() => {
    store.isOpenDrawer = false
  }, 300)

  route.push(path)
}

// Set hover index for enhanced hover effects
const setHoverIndex = (index: string | null) => {
  hoverIndex.value = index
}

// Check if item is hovered
const isHovered = (sectionIndex: number, itemIndex: number) => {
  return hoverIndex.value === `${sectionIndex}-${itemIndex}`
}
</script>

<template>
  <aside
    :class="[
      'flex fixed h-screen inset-y-0 left-0 z-30 flex-col border-r transition-all duration-300 ease-in-out',
      'dark:border-gray-800/70 bg-white dark:bg-gray-900 border-gray-100/80',
      store.isCollapsed ? 'md:w-[70px]' : 'w-64',
      'shadow-sm dark:shadow-gray-950/10'
    ]"
  >
    <!-- Logo Section with Enhanced Styling -->
    <div
      :class="[
        'flex items-center h-16 shrink-0 border-b transition-all duration-300',
        'dark:border-gray-800/70 border-gray-100/80',
        'bg-gradient-to-r from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-900/95',
        store.isCollapsed ? 'justify-center px-3' : 'px-5'
      ]"
    >
      <div class="flex items-center space-x-3 overflow-hidden">
        <div
          :class="[
            'rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-500',
            store.isCollapsed ? 'w-10 h-10' : 'w-9 h-9',
            'bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg shadow-primary-500/20',
            'hover:shadow-primary-500/30 hover:scale-105'
          ]"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 400 400"
            xmlns="http://www.w3.org/2000/svg"
            class="text-white transition-transform duration-500 hover:rotate-3"
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
              mask="url(#barsMask)"
            />
          </svg>
        </div>
        <div
          :class="[
            'flex flex-col transition-all duration-300 overflow-hidden',
            store.isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'
          ]"
        >
          <span
            class="text-base font-bold whitespace-nowrap dark:text-white text-gray-800 tracking-tight"
          >
            CodeX
          </span>
          <span
            class="text-xs text-primary-600 dark:text-primary-400 font-medium -mt-0.5"
          >
            Sistema de Facturación
          </span>
        </div>
      </div>
    </div>

    <!-- Navigation with Enhanced Styling -->
    <nav class="flex-1 overflow-y-auto py-3 px-2 sidebar-content">
      <div class="space-y-5">
        <div
          v-for="(section, sectionIndex) in navigation"
          :key="`section-${sectionIndex}`"
          class="relative"
        >
          <!-- Section Title with Enhanced Styling -->
          <div v-if="section.title" class="mb-1.5">
            <h3
              v-if="!store.isCollapsed"
              class="px-3 py-1 text-xs font-semibold uppercase tracking-wider dark:text-gray-400 text-gray-500 flex items-center"
            >
              <div
                class="w-1 h-3 bg-gray-300 dark:bg-gray-600 rounded-full mr-2"
              ></div>
              {{ section.title }}
            </h3>
            <!-- Divider for collapsed mode -->
            <div
              v-if="store.isCollapsed && sectionIndex > 0"
              class="h-px w-8 mx-auto my-3 dark:bg-gray-800/80 bg-gray-200/80"
            />
          </div>

          <!-- Navigation Items with Enhanced Styling -->
          <div class="space-y-0.5">
            <UTooltip
              v-for="(item, itemIndex) in section.items"
              :key="`item-${sectionIndex}-${itemIndex}`"
              :text="item.name"
              :delay-duration="200"
              :disabled="!store.isCollapsed"
              arrow
              :ui="{
                content:
                  'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-lg'
              }"
              :content="{
                align: 'center',
                side: 'right',
                sideOffset: 4
              }"
            >
              <button
                @click="navigateTo(item.route)"
                @mouseenter="setHoverIndex(`${sectionIndex}-${itemIndex}`)"
                @mouseleave="setHoverIndex(null)"
                :class="[
                  'group w-full flex items-center text-sm font-normal rounded-lg relative cursor-pointer transition-all duration-200',
                  store.isCollapsed
                    ? 'h-10 justify-center px-2 my-1'
                    : 'py-2 px-3',
                  activeRoute === item.route
                    ? 'dark:text-primary-400 dark:bg-gray-800/70 text-primary-600 bg-primary-50/80 font-medium'
                    : 'dark:text-gray-300 dark:hover:bg-gray-800/50 dark:hover:text-gray-100 text-gray-700 hover:bg-gray-50/80 hover:text-gray-900'
                ]"
              >
                <!-- Active indicator line -->
                <div
                  v-if="activeRoute === item.route"
                  class="absolute left-0 top-1/4 bottom-1/4 w-1 bg-primary-500 rounded-r-full"
                />

                <!-- Icon with enhanced styling -->
                <div
                  :class="[
                    'flex-shrink-0 flex items-center justify-center transition-all duration-200',
                    store.isCollapsed
                      ? 'w-8 h-8 rounded-lg'
                      : 'w-7 h-7 rounded-lg mr-2.5',
                    activeRoute === item.route
                      ? 'bg-primary-100 dark:bg-primary-900/30'
                      : isHovered(sectionIndex, itemIndex)
                        ? 'bg-gray-200 dark:bg-gray-700'
                        : 'bg-gray-100 dark:bg-gray-800'
                  ]"
                >
                  <component
                    :is="item.icon"
                    :class="[
                      'h-4 w-4 transition-all duration-200',
                      activeRoute === item.route
                        ? 'text-primary-600 dark:text-primary-400'
                        : isHovered(sectionIndex, itemIndex)
                          ? 'text-gray-700 dark:text-gray-300'
                          : 'text-gray-500 dark:text-gray-400'
                    ]"
                  />
                </div>

                <!-- Text label with transition -->
                <span
                  :class="[
                    'whitespace-nowrap transition-all duration-300 tracking-wide',
                    store.isCollapsed
                      ? 'opacity-0 w-0 overflow-hidden'
                      : 'opacity-100 w-auto'
                  ]"
                >
                  {{ item.name }}
                </span>

                <!-- Badge (if present) -->
                <span
                  v-if="item.badge && !store.isCollapsed"
                  :class="[
                    'ml-auto inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium',
                    activeRoute === item.route
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'
                  ]"
                >
                  {{ item.badge }}
                </span>

                <!-- Badge for collapsed view -->
                <span
                  v-if="item.badge && store.isCollapsed"
                  class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white bg-primary-500 shadow-sm"
                >
                  {{ item.badge }}
                </span>
              </button>
            </UTooltip>
          </div>
        </div>
      </div>
    </nav>

    <!-- User Profile with Enhanced Styling -->
    <div
      class="shrink-0 p-3 border-t dark:border-gray-800/70 border-gray-100/80 bg-gray-50/50 dark:bg-gray-800/20"
    >
      <div
        :class="[
          'flex items-center rounded-lg group transition-all duration-200',
          'hover:bg-gray-100/80 dark:hover:bg-gray-800/70',
          store.isCollapsed ? 'justify-center p-2' : 'p-2'
        ]"
      >
        <div class="relative">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dvSZhyStgm9DNolueaXK6QwebuDdl4.png"
            alt="User avatar"
            :class="[
              'rounded-full transition-all duration-300',
              store.isCollapsed
                ? 'h-9 w-9 ring-2 ring-primary-500 ring-offset-1 ring-offset-white dark:ring-offset-gray-900'
                : 'h-8 w-8 ring-1 ring-gray-200 dark:ring-gray-700 group-hover:ring-primary-500 group-hover:ring-offset-1'
            ]"
          />
          <div
            class="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-1 ring-white dark:ring-gray-900"
          ></div>
        </div>

        <div
          :class="[
            'ml-3 transition-all duration-300 overflow-hidden',
            store.isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'
          ]"
        >
          <p class="text-sm font-medium dark:text-white text-gray-800">
            Alex Johnson
          </p>
          <div class="flex items-center">
            <span class="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5"></span>
            <p class="text-xs dark:text-gray-400 text-gray-500">Online</p>
          </div>
        </div>

        <!-- Quick Actions (visible only in expanded mode) -->
        <div
          v-if="!store.isCollapsed"
          class="ml-auto flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <button
            class="rounded-full p-1 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <BellIcon class="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
          </button>
          <button
            class="rounded-full p-1 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <SettingsIcon
              class="h-3.5 w-3.5 text-gray-500 dark:text-gray-400"
            />
          </button>
        </div>
      </div>
    </div>

    <!-- Collapse Toggle Button with Enhanced Styling -->
    <button
      @click="store.toggleCollapse()"
      :class="[
        'absolute top-16 -right-3 flex h-6 w-6 items-center justify-center rounded-full shadow-md z-10 transition-all duration-300',
        'dark:bg-gray-800 dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-gray-700',
        'bg-white text-gray-500 hover:text-primary-600 hover:bg-gray-50',
        'hover:scale-110 hover:shadow-lg',
        store.isCollapsed ? 'rotate-180' : ''
      ]"
      aria-label="Toggle sidebar collapse"
    >
      <ChevronLeftIcon class="h-3.5 w-3.5" />
    </button>
  </aside>
</template>

<style scoped>
/* Enhanced scrollbar */
.sidebar-content::-webkit-scrollbar {
  width: 3px;
}

.sidebar-content::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-content::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 20px;
}

.dark .sidebar-content::-webkit-scrollbar-thumb {
  background-color: rgba(75, 85, 99, 0.5);
}

/* Prevent content from being selectable */
aside {
  -webkit-tap-highlight-color: transparent;
  user-select: none;
}

/* Smooth hover transitions */
button {
  transition: all 0.2s ease;
}

/* Add subtle hover effect for the toggle button */
@keyframes pulse-light {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.1);
  }
  50% {
    box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
  }
}

button[aria-label='Toggle sidebar collapse']:hover {
  animation: pulse-light 2s infinite;
}

/* Add subtle hover effect for the logo */
@keyframes subtle-glow {
  0%,
  100% {
    box-shadow: 0 0 8px 0 rgba(79, 70, 229, 0.2);
  }
  50% {
    box-shadow: 0 0 16px 0 rgba(79, 70, 229, 0.3);
  }
}

aside:hover div:first-child > div > div:first-child {
  animation: subtle-glow 3s infinite;
}

/* Add subtle animation for active items */
@keyframes subtle-pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}

button[class*='bg-primary-50'] div:nth-child(2) {
  animation: subtle-pulse 2s infinite;
}
</style>

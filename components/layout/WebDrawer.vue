<script setup lang="ts">
import { UTooltip } from '#components'
import {
  ChevronLeft as ChevronLeftIcon,
  Settings as SettingsIcon,
  Sun as SunIcon,
  Moon as MoonIcon,
  Monitor as MonitorIcon,
  Search as SearchIcon,
  LogOut as LogOutIcon,
  User as UserIcon,
  HelpCircle as HelpCircleIcon,
  Clock as ClockIcon,
  Zap as ZapIcon,
  FileText as FileTextIcon,
  BarChart2 as BarChartIcon,
  Layers as LayersIcon,
  Check as CheckIcon,
  Trash as TrashIcon,
  X as XIcon
} from 'lucide-vue-next'
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import type { SideBar } from '~/layouts/default.vue'

const props = defineProps<{
  navigation: SideBar[]
}>()

// Store dashboard
const store = useDashboard()

// Router and active route
const route = useRouter()

const activeRoute = computed(() => route.currentRoute.value.path)
const hoverIndex = ref<string | null>(null)
const searchQuery = ref('')
const showSearch = ref(false)
const searchInputRef = ref<HTMLInputElement | null>(null)

const colorMode = useColorMode()

// Theme selector
const showThemeSelector = ref(false)
const themeOptions = [
  {
    name: 'Light',
    value: 'light',
    icon: SunIcon,
    preview: 'bg-white border border-gray-200'
  },
  {
    name: 'Dark',
    value: 'dark',
    icon: MoonIcon,
    preview: 'bg-gray-900 border border-gray-700'
  },
  {
    name: 'System',
    value: 'system',
    icon: MonitorIcon,
    preview: 'bg-gradient-to-br from-white to-gray-900 border border-gray-400'
  }
]

const toggleThemeSelector = () => {
  showThemeSelector.value = !showThemeSelector.value
  if (showThemeSelector.value) {
    nextTick(() => {
      // Close other dropdowns
      showSearch.value = false
      showQuickActions.value = false
      showUserMenu.value = false
      showRecentMenu.value = false
    })
  }
}

const setTheme = (theme) => {
  colorMode.preference = theme
  showThemeSelector.value = false
}

// Recent pages management
const recentPages = ref<{ path: string; timestamp: number }[]>([])
const showRecentMenu = ref(false)
const recentItemToDelete = ref<number | null>(null)

// Toggle recent pages menu
const toggleRecentMenu = () => {
  showRecentMenu.value = !showRecentMenu.value
  if (showRecentMenu.value) {
    nextTick(() => {
      // Close other dropdowns
      showSearch.value = false
      showThemeSelector.value = false
      showQuickActions.value = false
      showUserMenu.value = false
    })
  }
}

// Clear all recent pages
const clearAllRecentPages = () => {
  recentPages.value = []
  localStorage.setItem('recentPages', JSON.stringify(recentPages.value))
  showRecentMenu.value = false
}

// Remove a specific recent page
const removeRecentPage = (index: number) => {
  recentPages.value.splice(index, 1)
  localStorage.setItem('recentPages', JSON.stringify(recentPages.value))
}

// Track recent pages
const addToRecentPages = (path: string | null) => {
  if (!path) return

  // Remove if already exists
  recentPages.value = recentPages.value.filter((page) => page.path !== path)

  // Add to beginning with current timestamp
  recentPages.value.unshift({
    path,
    timestamp: Date.now()
  })

  // Keep only the 5 most recent
  if (recentPages.value.length > 5) {
    recentPages.value = recentPages.value.slice(0, 5)
  }

  // Save to localStorage
  localStorage.setItem('recentPages', JSON.stringify(recentPages.value))
}

// Load recent pages from localStorage
onMounted(() => {
  try {
    const saved = localStorage.getItem('recentPages')
    if (saved) {
      recentPages.value = JSON.parse(saved)
    }
  } catch (e) {
    console.error('Failed to load recent pages', e)
  }
})

// Quick actions (replacing notification bell)
const quickActions = [
  {
    name: 'New Report',
    icon: FileTextIcon,
    action: () => console.log('New report')
  },
  {
    name: 'Analytics',
    icon: BarChartIcon,
    action: () => console.log('Analytics')
  },
  { name: 'Projects', icon: LayersIcon, action: () => console.log('Projects') }
]

const showQuickActions = ref(false)
const toggleQuickActions = () => {
  showQuickActions.value = !showQuickActions.value
  if (showQuickActions.value) {
    nextTick(() => {
      // Close other dropdowns
      showSearch.value = false
      showThemeSelector.value = false
      showUserMenu.value = false
      showRecentMenu.value = false
    })
  }
}

// User menu
const showUserMenu = ref(false)
const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
  if (showUserMenu.value) {
    nextTick(() => {
      // Close other dropdowns
      showSearch.value = false
      showThemeSelector.value = false
      showQuickActions.value = false
      showRecentMenu.value = false
    })
  }
}

// Navigation with transition effect and recent pages tracking
const navigateTo = (path: string | null) => {
  if (!path) return

  // Add to recent pages
  addToRecentPages(path)

  // Add a subtle page transition effect
  document.body.classList.add('page-transition')

  setTimeout(() => {
    store.isOpenDrawer = false
    route.push(path)

    setTimeout(() => {
      document.body.classList.remove('page-transition')
    }, 500)
  }, 100)
}

const setHoverIndex = (index: string | null) => {
  hoverIndex.value = index
}

const toggleSearch = () => {
  showSearch.value = !showSearch.value
  if (showSearch.value) {
    nextTick(() => {
      searchInputRef.value?.focus()
      // Close other dropdowns
      showThemeSelector.value = false
      showQuickActions.value = false
      showUserMenu.value = false
      showRecentMenu.value = false
    })
  } else {
    searchQuery.value = ''
  }
}

// Get all navigation items flattened
const allNavigationItems = computed(() => {
  return props.navigation.flatMap((section) => section.items)
})

// Filtered navigation items based on search
const filteredNavigationItems = computed(() => {
  if (!searchQuery.value) return []

  const query = searchQuery.value.toLowerCase()
  return allNavigationItems.value.filter((item) =>
    item.name.toLowerCase().includes(query)
  )
})

// Saludo Basado en la hora
//Todo: Evluar si es necesario la rehidratacion
const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Buenos Días'
  if (hour < 18) return 'Buenas Tardes'
  return 'Buenas Noches'
})

// Formateo de hora para el saludo
const formatTimeAgo = (timestamp: number) => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000)

  if (seconds < 60) return 'justo ahora'

  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} min. atrás`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} h. atrás`

  const days = Math.floor(hours / 24)
  return `${days} d. atrás`
}

// Badge variant classes
const getBadgeClasses = (variant: string) => {
  switch (variant) {
    case 'primary':
      return 'bg-primary-500 text-white'
    case 'success':
      return 'bg-emerald-500 text-white'
    case 'warning':
      return 'bg-amber-500 text-white'
    case 'danger':
      return 'bg-rose-500 text-white'
    default:
      return 'bg-gray-500 text-white'
  }
}

// Track sidebar width for smooth transitions
const sidebarWidth = ref(store.isCollapsed ? '84px' : '288px')
const isAnimating = ref(false)

// Watch for collapse state changes to update width smoothly
watch(
  () => store.isCollapsed,
  (collapsed) => {
    isAnimating.value = true
    // Let CSS transition handle the animation
    sidebarWidth.value = collapsed ? '84px' : '288px'

    // Reset animation flag after transition completes
    setTimeout(() => {
      isAnimating.value = false
    }, 400) // slightly longer than transition duration
  }
)
</script>

<template>
  <aside
    :style="{ width: sidebarWidth }"
    class="flex fixed h-screen inset-y-0 left-0 z-30 flex-col transition-all duration-300 ease-in-out border-r backdrop-blur-sm bg-white/95 dark:bg-gray-900/95 border-gray-100/40 dark:border-gray-800/40 shadow-[0_0_15px_rgba(0,0,0,0.01)] dark:shadow-[0_0_15px_rgba(0,0,0,0.1)]"
  >
    <!-- Logo Section -->
    <div
      class="flex items-center h-16 px-5 shrink-0 border-b border-gray-100/70 dark:border-gray-800/40 transition-all duration-300"
      :class="[store.isCollapsed ? 'justify-center' : 'justify-between']"
    >
      <div class="flex items-center space-x-3 overflow-hidden">
        <div
          class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-primary-400 to-primary-600 text-white transition-all duration-300 group shadow-md shadow-primary-500/20 dark:shadow-primary-900/30 cursor-pointer hover:shadow-lg hover:scale-105"
          :class="[store.isCollapsed ? 'scale-105' : 'scale-100']"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 400 400"
            xmlns="http://www.w3.org/2000/svg"
            class="transition-transform duration-500 group-hover:rotate-3"
          >
            <defs>
              <linearGradient
                id="logoGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stop-color="#ffffff" stop-opacity="1" />
                <stop offset="100%" stop-color="#f0f0f0" stop-opacity="0.8" />
              </linearGradient>
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
              fill="url(#logoGradient)"
              mask="url(#barsMask)"
            />
          </svg>
        </div>
        <div
          class="flex flex-col transition-all duration-300 overflow-hidden"
          :class="[
            store.isCollapsed
              ? 'opacity-0 w-0 translate-x-5'
              : 'opacity-100 w-auto translate-x-0'
          ]"
        >
          <span
            class="text-lg font-bold whitespace-nowrap dark:text-white text-gray-800"
          >
            Code<span class="text-primary-500">X</span>
          </span>
          <span class="text-xs text-gray-500 dark:text-gray-400 -mt-1"
            >Dashboard</span
          >
        </div>
      </div>

      <div
        class="flex items-center space-x-1 transition-all duration-300"
        :class="[
          store.isCollapsed
            ? 'opacity-0 scale-75 absolute -right-20'
            : 'opacity-100 scale-100 relative right-0'
        ]"
      >
        <button
          @click="toggleSearch"
          class="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors hover:scale-110 hover:shadow-sm"
          :class="{ 'bg-gray-100 dark:bg-gray-800': showSearch }"
        >
          <SearchIcon class="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </button>
        <button
          @click="toggleThemeSelector"
          class="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative hover:scale-110 hover:shadow-sm"
          :class="{ 'bg-gray-100 dark:bg-gray-800': showThemeSelector }"
        >
          <SunIcon
            v-if="colorMode.preference === 'light'"
            class="h-4 w-4 text-amber-500"
          />
          <MoonIcon
            v-else-if="colorMode.preference === 'dark'"
            class="h-4 w-4 text-indigo-400"
          />
          <MonitorIcon
            v-else
            class="h-4 w-4 text-gray-500 dark:text-gray-400"
          />
        </button>
        <button
          @click="toggleQuickActions"
          class="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative hover:scale-110 hover:shadow-sm"
          :class="{ 'bg-gray-100 dark:bg-gray-800': showQuickActions }"
        >
          <ZapIcon class="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </button>
      </div>
    </div>

    <!-- Theme Selector Dropdown -->
    <div
      v-if="showThemeSelector && !store.isCollapsed"
      class="px-4 py-3 border-b border-gray-100/70 dark:border-gray-800/40 animate-fadeIn"
    >
      <h3
        class="text-xs font-bold uppercase tracking-widest mb-3 dark:text-gray-400 text-gray-500"
      >
        Seleccionar Tema
      </h3>
      <div class="grid grid-cols-3 gap-2">
        <button
          v-for="theme in themeOptions"
          :key="theme.value"
          @click="setTheme(theme.value)"
          class="flex flex-col items-center p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800/70 hover:scale-105 hover:shadow-sm"
          :class="[
            colorMode.preference === theme.value
              ? 'bg-gray-100 dark:bg-gray-800/70 ring-2 ring-primary-500/50'
              : ''
          ]"
        >
          <!-- Theme Preview -->
          <div
            class="relative w-full aspect-video rounded-md overflow-hidden mb-2"
          >
            <div :class="['absolute inset-0', theme.preview]"></div>
            <div
              v-if="colorMode.preference === theme.value"
              class="absolute inset-0 flex items-center justify-center bg-primary-500/20"
            >
              <CheckIcon class="h-5 w-5 text-primary-500" />
            </div>
          </div>

          <!-- Theme Name -->
          <div class="flex items-center justify-center space-x-1.5">
            <component
              :is="theme.icon"
              class="h-3.5 w-3.5 text-gray-500 dark:text-gray-400"
            />
            <span
              class="text-xs font-medium text-gray-700 dark:text-gray-300"
              >{{ theme.name }}</span
            >
          </div>
        </button>
      </div>
    </div>

    <!-- Search Bar (Expandable) -->
    <div
      v-if="showSearch && !store.isCollapsed"
      class="px-4 py-3 border-b border-gray-100/70 dark:border-gray-800/40 animate-fadeIn"
    >
      <div class="relative">
        <input
          ref="searchInputRef"
          v-model="searchQuery"
          type="text"
          placeholder="Buscar..."
          class="w-full h-9 pl-9 pr-4 rounded-lg text-sm bg-gray-100/70 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-primary-500/30 dark:focus:ring-primary-500/20 focus:border-transparent transition-all duration-200 text-foreground"
        />
        <SearchIcon
          class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
        />
      </div>

      <!-- Search Results -->
      <div
        v-if="searchQuery && filteredNavigationItems.length > 0"
        class="mt-2 py-1 space-y-1 max-h-48 overflow-y-auto scrollbar-thin"
      >
        <button
          v-for="item in filteredNavigationItems"
          :key="item.name"
          @click="navigateTo(item.route)"
          class="w-full flex items-center px-3 py-1.5 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/70 transition-colors hover:scale-[1.02]"
        >
          <component
            :is="item.icon"
            class="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400"
          />
          <span>{{ item.name }}</span>
        </button>
      </div>
      <div
        v-else-if="searchQuery && filteredNavigationItems.length === 0"
        class="mt-2 py-2 text-center text-sm text-gray-500 dark:text-gray-400"
      >
        Sin Coincidencías
      </div>
    </div>

    <!-- Quick Actions Dropdown -->
    <div
      v-if="showQuickActions && !store.isCollapsed"
      class="px-4 py-3 border-b border-gray-100/70 dark:border-gray-800/40 animate-fadeIn"
    >
      <h3
        class="text-xs font-bold uppercase tracking-widest mb-2 dark:text-gray-400 text-gray-500"
      >
        Quick Actions
      </h3>
      <div class="space-y-1">
        <button
          v-for="action in quickActions"
          :key="action.name"
          @click="action.action"
          class="w-full flex items-center px-3 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/70 transition-colors hover:scale-[1.02] hover:shadow-sm"
        >
          <component
            :is="action.icon"
            class="h-4 w-4 mr-2 text-primary-500 dark:text-primary-400"
          />
          <span>{{ action.name }}</span>
        </button>
      </div>
    </div>

    <!-- User Greeting (when not collapsed) -->
    <div
      v-if="!store.isCollapsed"
      class="px-5 py-4 border-b border-gray-100/70 dark:border-gray-800/40 transition-all duration-300 overflow-hidden"
      :class="[
        store.isCollapsed ? 'max-h-0 opacity-0 py-0' : 'max-h-20 opacity-100'
      ]"
    >
      <p
        class="text-xs text-gray-500 dark:text-gray-400 transition-transform duration-300"
        :class="[store.isCollapsed ? 'translate-y-3' : 'translate-y-0']"
      >
        {{ greeting }},
      </p>
      <p
        class="text-sm font-medium dark:text-white text-gray-800 transition-transform duration-300"
        :class="[store.isCollapsed ? 'translate-y-3' : 'translate-y-0']"
      >
        Alex Johnson
      </p>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-hidden py-4 px-3 scrollbar-thin">
      <div class="space-y-4">
        <!-- Recent Pages Section -->
        <div
          class="relative transition-all duration-300 overflow-hidden"
          :class="[
            store.isCollapsed || recentPages.length === 0
              ? 'max-h-0 opacity-0 my-0'
              : 'max-h-[500px] opacity-100 my-2'
          ]"
        >
          <div class="flex items-center justify-between mb-3 px-3">
            <h3
              class="text-xs font-bold uppercase tracking-widest transition-all duration-200 dark:text-gray-400 text-gray-500 flex items-center"
            >
              <ClockIcon class="h-3 w-3 mr-1.5" />
              Recientes
            </h3>

            <!-- Recent Pages Management Button -->
            <button
              @click="toggleRecentMenu"
              class="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors hover:scale-110 text-gray-500 dark:text-gray-400"
              :class="{ 'bg-gray-100 dark:bg-gray-800': showRecentMenu }"
            >
              <TrashIcon class="h-3 w-3" />
            </button>
          </div>

          <!-- Recent Pages Management Menu -->
          <div
            v-if="showRecentMenu"
            class="mb-3 px-3 py-2 bg-gray-50 dark:bg-gray-800/50 rounded-md animate-fadeIn"
          >
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs text-gray-600 dark:text-gray-300"
                >Gestionar recientes</span
              >
              <button
                @click="showRecentMenu = false"
                class="p-0.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <XIcon class="h-3 w-3 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            <button
              @click="clearAllRecentPages"
              class="w-full text-xs py-1.5 px-2 rounded-md text-rose-600 dark:text-rose-400 hover:bg-gray-200/70 dark:hover:bg-gray-700/50 transition-colors flex items-center"
            >
              <TrashIcon class="h-3 w-3 mr-1.5" />
              Eliminar todos los recientes
            </button>
          </div>

          <div class="space-y-1">
            <div
              v-for="(item, index) in recentPages"
              :key="`recent-${index}`"
              class="group relative"
            >
              <button
                @click="navigateTo(item.path)"
                class="w-full flex items-center text-sm font-normal tracking-wide rounded-md relative cursor-pointer transition-all duration-200 h-9 px-4"
                :class="[
                  activeRoute === item.path
                    ? 'dark:text-primary-400 dark:bg-gray-800/70 text-primary-600 bg-primary-50/70 font-medium'
                    : 'dark:text-gray-300 dark:hover:bg-gray-800/50 dark:hover:text-gray-100 text-gray-700 hover:bg-gray-100/70 hover:text-gray-900'
                ]"
              >
                <!-- Active indicator -->
                <div
                  v-if="activeRoute === item.path"
                  class="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 bg-primary-500 rounded-r-md"
                />

                <!-- Find the icon for this path -->
                <component
                  :is="
                    allNavigationItems.find(
                      (navItem) => navItem.route === item.path
                    )?.icon || ClockIcon
                  "
                  class="flex-shrink-0 h-4 w-4 mr-3 transition-all duration-200"
                  :class="[
                    activeRoute === item.path
                      ? 'dark:text-primary-400 text-primary-600'
                      : 'dark:text-gray-400 dark:group-hover:text-gray-200 text-gray-500 group-hover:text-gray-900'
                  ]"
                />

                <span class="truncate">
                  {{
                    allNavigationItems.find(
                      (navItem) => navItem.route === item.path
                    )?.name || 'Page'
                  }}
                </span>

                <span class="ml-auto text-xs text-gray-400 dark:text-gray-500">
                  {{ formatTimeAgo(item.timestamp) }}
                </span>
                <button
                  @click="removeRecentPage(index)"
                  class="h-6 w-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <XIcon
                    class="h-3.5 w-3.5 text-gray-400 group-hover:text-red-400 group-dark:text-gray-500 group-dark:hover:text-red-500"
                  />
                </button>
              </button>

              <!-- Delete button for individual recent item -->
            </div>
          </div>
        </div>

        <!-- Regular Navigation Sections -->
        <div
          v-for="(section, sectionIndex) in navigation"
          :key="`section-${sectionIndex}`"
          class="relative"
        >
          <!-- Section Title or Divider -->
          <div v-if="section.title" class="mb-2">
            <h3
              class="px-3 text-xs font-bold uppercase tracking-widest transition-all duration-300 dark:text-gray-400 text-gray-500 flex items-center"
              :class="[
                store.isCollapsed ? 'opacity-0 h-0' : 'opacity-100 h-auto'
              ]"
            >
              {{ section.title }}
            </h3>
            <!-- Divider for collapsed mode -->
            <div
              v-if="store.isCollapsed && sectionIndex > 0"
              class="h-px w-10 mx-auto my-2 dark:bg-gray-800 bg-gray-200 rounded-full transition-all duration-300"
              :class="[
                store.isCollapsed
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-0'
              ]"
            />
          </div>

          <div class="space-y-1">
            <UTooltip
              v-for="(item, itemIndex) in section.items"
              :key="`item-${sectionIndex}-${itemIndex}`"
              :text="item.name"
              :delay-duration="0"
              :disabled="!store.isCollapsed"
              arrow
              :ui="{
                content:
                  'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-lg border border-gray-100 dark:border-gray-700 px-2.5 py-1 rounded-md text-sm font-medium z-50'
              }"
              :content="{
                align: 'center',
                side: 'right',
                sideOffset: 8
              }"
            >
              <button
                @click="navigateTo(item.route)"
                @mouseenter="setHoverIndex(`${sectionIndex}-${itemIndex}`)"
                @mouseleave="setHoverIndex(null)"
                :class="[
                  'group w-full flex items-center text-sm font-normal tracking-wide rounded-md relative cursor-pointer transition-all duration-300',
                  store.isCollapsed
                    ? 'h-10 w-10 justify-center mx-auto'
                    : 'h-10 px-4',
                  activeRoute === item.route
                    ? 'dark:text-primary-400 dark:bg-gray-800/70 text-primary-600 bg-primary-50/70 font-medium'
                    : 'dark:text-gray-300 dark:hover:bg-gray-800/50 dark:hover:text-gray-100 text-gray-700 hover:bg-gray-100/70 hover:text-gray-900'
                ]"
              >
                <!-- Active indicator with animation -->
                <div
                  v-if="activeRoute === item.route"
                  class="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 bg-primary-500 rounded-r-md"
                  :class="{
                    'left-0': !store.isCollapsed,
                    'left-0 hidden': store.isCollapsed
                  }"
                >
                  <div
                    class="absolute inset-0 bg-primary-400 rounded-r-md animate-pulse-slow opacity-70"
                  ></div>
                </div>

                <!-- Icon with pulse effect on hover -->
                <div
                  class="relative flex items-center justify-center transition-all duration-300"
                  :class="[
                    store.isCollapsed ? 'w-full scale-110' : 'mr-3 scale-100'
                  ]"
                >
                  <component
                    :is="item.icon"
                    :class="[
                      'flex-shrink-0 transition-all duration-300 z-10',
                      store.isCollapsed ? 'h-5 w-5' : 'h-5 w-5',
                      activeRoute === item.route
                        ? 'dark:text-primary-400 text-primary-600'
                        : 'dark:text-gray-400 dark:group-hover:text-gray-200 text-gray-500 group-hover:text-gray-900'
                    ]"
                  />

                  <!-- Hover effect -->
                  <div
                    v-if="
                      hoverIndex === `${sectionIndex}-${itemIndex}` &&
                      activeRoute !== item.route
                    "
                    class="absolute inset-0 bg-primary-100 dark:bg-primary-900/20 rounded-full scale-0 animate-ping-slow opacity-0"
                  ></div>
                </div>

                <!-- Text label with transition -->
                <span
                  :class="[
                    'whitespace-nowrap transition-all duration-300 tracking-wide truncate',
                    activeRoute === item.route ? 'font-medium' : 'font-normal',
                    store.isCollapsed
                      ? 'opacity-0 w-0 translate-x-5'
                      : 'opacity-100 w-auto translate-x-0'
                  ]"
                >
                  {{ item.name }}
                </span>

                <!-- Badge (if any) -->
                <div
                  v-if="item.badge"
                  :class="[
                    'flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full text-xs font-medium transition-all duration-300',
                    getBadgeClasses(item.badge.variant),
                    store.isCollapsed
                      ? 'absolute -top-1 -right-1 scale-75 opacity-100'
                      : 'relative top-0 right-0 ml-auto scale-100 opacity-100'
                  ]"
                >
                  {{ item.badge.count }}
                </div>
              </button>
            </UTooltip>
          </div>
        </div>
      </div>
    </nav>

    <!-- User Profile -->
    <div
      class="shrink-0 p-3 border-t dark:border-gray-800/40 border-gray-100/70"
    >
      <div
        :class="[
          'flex items-center rounded-lg group transition-all duration-300 dark:hover:bg-gray-800/50 hover:bg-gray-100/70 cursor-pointer relative hover:shadow-sm',
          store.isCollapsed ? 'justify-center py-2' : 'justify-start p-2'
        ]"
        @click="toggleUserMenu"
      >
        <div class="relative">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dvSZhyStgm9DNolueaXK6QwebuDdl4.png"
            alt="User avatar"
            :class="[
              'h-9 w-9 rounded-full object-cover transition-all duration-300',
              'ring-2 ring-offset-2 dark:ring-offset-gray-900 ring-offset-white',
              store.isCollapsed
                ? 'ring-primary-500'
                : 'dark:ring-gray-700 ring-gray-200 group-hover:ring-primary-500'
            ]"
          />
          <div
            class="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white dark:ring-gray-900"
          ></div>
        </div>

        <div
          class="ml-3 transition-all duration-300 overflow-hidden"
          :class="[
            store.isCollapsed
              ? 'w-0 opacity-0 translate-x-5'
              : 'w-auto opacity-100 translate-x-0'
          ]"
        >
          <p
            class="text-sm font-medium dark:text-white text-gray-800 line-clamp-1"
          >
            Alex Johnson
          </p>
          <p class="text-xs dark:text-gray-400 text-gray-500">Data Analyst</p>
        </div>

        <button
          v-if="!store.isCollapsed"
          class="ml-auto p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <ChevronLeftIcon
            class="h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform duration-300"
            :class="{ 'rotate-90': showUserMenu }"
          />
        </button>

        <!-- User Menu Dropdown -->
        <div
          v-if="showUserMenu && !store.isCollapsed"
          class="absolute bottom-full left-0 mb-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 py-1 animate-fadeIn z-50"
        >
          <button
            class="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:scale-[1.02]"
          >
            <UserIcon class="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
            Perfil
          </button>
          <button
            class="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:scale-[1.02]"
          >
            <SettingsIcon
              class="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400"
            />
            Configuración
          </button>
          <button
            class="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:scale-[1.02]"
          >
            <HelpCircleIcon
              class="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400"
            />
            ¿Necesitas Ayuda?
          </button>
          <div class="border-t border-gray-100 dark:border-gray-700 my-1"></div>
          <button
            class="w-full flex items-center px-4 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:scale-[1.02]"
          >
            <LogOutIcon class="h-4 w-4 mr-2" />
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>

    <!-- Collapse Toggle Button -->
    <button
      @click="store.toggleCollapse"
      class="absolute top-16 -right-3 flex items-center justify-center h-6 w-6 rounded-full shadow-md z-10 transition-all duration-300 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:scale-110"
      :class="[store.isCollapsed ? 'rotate-180' : '']"
      aria-label="Toggle sidebar collapse"
    >
      <ChevronLeftIcon class="h-3.5 w-3.5" />
    </button>
  </aside>
</template>

<style scoped>
/* Cursor effects */
button {
  cursor: pointer;
}

.animate-ping-slow {
  animation: ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.animate-pulse-slow {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-fadeIn {
  animation: fadeIn 0.2s ease-in-out forwards;
}

@keyframes ping {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.3;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Custom scrollbar */
.scrollbar-thin {
  scrollbar-width: thin;
}

.scrollbar-thumb-gray-200 {
  scrollbar-color: #e5e7eb transparent;
}

.dark .scrollbar-thumb-gray-700 {
  scrollbar-color: #374151 transparent;
}

::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #e5e7eb;
  border-radius: 20px;
}

.dark ::-webkit-scrollbar-thumb {
  background-color: #374151;
}

:global(.page-transition) {
  transition: opacity 0.3s ease-in-out;
  opacity: 0.7;
}
</style>

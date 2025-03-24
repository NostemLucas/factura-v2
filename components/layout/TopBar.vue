<template>
  <header
    :class="[
      'z-10 sticky top-0',
      'dark:bg-gray-900/95 dark:border-gray-800/40',
      'transition-all duration-300 ease-in-out',
      'bg-white/95 backdrop-blur-sm border-b border-gray-100/40',
      'flex-1 flex flex-col',
      xs ? 'ml-0' : store.isCollapsed ? 'ml-[84px]' : 'ml-72'
    ]"
  >
    <!-- Main Topbar -->
    <div
      class="h-16 flex items-center justify-between px-4 md:px-6 transition-all duration-300"
    >
      <!-- Left side -->
      <div class="flex items-center">
        <!-- Mobile menu button with animation - Mantenido como estaba originalmente -->
        <button
          @click="toggleDrawer"
          class="p-1.5 rounded-md md:hidden dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-gray-800 text-gray-500 hover:text-primary-600 hover:bg-gray-100 transition-all duration-200"
          aria-label="Toggle sidebar"
        >
          <div class="relative w-5 h-5">
            <MenuIcon
              class="h-5 w-5 absolute inset-0 transition-all duration-300"
              :class="[
                store.isOpenDrawer
                  ? 'opacity-0 rotate-90 scale-50'
                  : 'opacity-100 rotate-0 scale-100'
              ]"
            />
            <XIcon
              class="h-5 w-5 absolute inset-0 transition-all duration-300"
              :class="[
                store.isOpenDrawer
                  ? 'opacity-100 rotate-0 scale-100'
                  : 'opacity-0 rotate-90 scale-50'
              ]"
            />
          </div>
        </button>

        <!-- Breadcrumb with animations -->
        <div class="flex items-center ml-1 md:ml-0 transition-all duration-300">
          <div class="flex items-center">
            <div class="flex items-center space-x-2">
              <div
                class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-primary-50 dark:bg-gray-800 transition-all duration-300 group"
              >
                <component
                  :is="activeItem?.icon"
                  class="w-5 h-5 text-primary-500 dark:text-primary-400 transition-transform duration-500 group-hover:rotate-3"
                />
              </div>
              <span
                class="text-lg font-medium whitespace-nowrap dark:text-white text-gray-800 transition-all duration-300"
              >
                {{ activeItem?.name || 'Dashboard' }}
              </span>
            </div>

            <ChevronRightIcon
              :class="[
                'h-4 w-4 mx-2 transition-all duration-300',
                'dark:text-gray-500',
                'text-gray-400'
              ]"
            />

            <div class="flex items-center">
              <div
                :class="[
                  'flex items-center rounded-md px-2 py-1 text-sm transition-all duration-200',
                  'bg-primary-500/90 dark:bg-primary-500/80 dark:text-primary-100 text-white hover:bg-primary-600 shadow-sm'
                ]"
              >
                <CircleIcon class="h-3 w-3 mr-1.5" />
                <span>{{ activeSection }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Center - Search with animations - Improved positioning -->
      <div
        class="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center px-4 md:px-6 z-20 pointer-events-none"
      >
        <!-- Botón de búsqueda para móvil -->
        <button
          @click="toggleSearchModal"
          class="md:hidden pointer-events-auto p-2 rounded-full bg-white dark:bg-gray-800 shadow-md text-gray-500 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-all duration-200"
          aria-label="Search"
        >
          <SearchIcon class="h-5 w-5" />
        </button>

        <!-- Campo de búsqueda para desktop -->
        <div
          class="relative group max-w-md w-full pointer-events-auto hidden md:block"
        >
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            :class="[
              'w-full h-9 pl-9 pr-4 rounded-md text-sm transition-all duration-200 shadow-md',
              'dark:bg-gray-800/90 dark:text-gray-200 dark:placeholder-gray-500 dark:focus:bg-gray-800 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-primary-500/50',
              'bg-white text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50'
            ]"
            @focus="isSearchFocused = true"
            @blur="
              setTimeout(() => {
                isSearchFocused = false
              }, 200)
            "
          />
          <SearchIcon
            :class="[
              'h-4 w-4 absolute left-3 top-2.5 transition-all duration-200',
              'dark:text-gray-500 dark:group-focus-within:text-primary-400',
              'text-gray-400 group-focus-within:text-primary-600'
            ]"
          />

          <!-- Search Results Dropdown - Improved z-index -->
          <div
            v-if="isSearchFocused && searchQuery.length > 0"
            class="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-100 dark:border-gray-700 py-2 z-50 animate-fadeIn"
          >
            <div
              v-if="filteredItems.length > 0"
              class="max-h-64 overflow-y-auto scrollbar-thin"
            >
              <button
                v-for="item in filteredItems"
                :key="item.name"
                @click="navigateTo(item.route)"
                class="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
              >
                <component
                  :is="item.icon"
                  class="h-4 w-4 mr-3 text-gray-500 dark:text-gray-400"
                />
                <span>{{ item.name }}</span>
              </button>
            </div>
            <div
              v-else
              class="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 text-center"
            >
              No results found
            </div>
          </div>
        </div>
      </div>

      <!-- Right side actions with animations - Improved z-index -->
      <div class="flex items-center space-x-1 sm:space-x-2 z-30">
        <!-- Theme toggle -->
        <ToggleButton />

        <!-- Help button - Enhanced -->
        <button
          @click="toggleHelp"
          :class="[
            'p-1.5 rounded-md transition-all duration-200 relative',
            showHelp ? 'bg-gray-100 dark:bg-gray-800' : '',
            'dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-gray-800',
            'text-gray-500 hover:text-primary-600 hover:bg-gray-100'
          ]"
          aria-label="Help and resources"
          class="help-container"
        >
          <HelpCircleIcon class="h-5 w-5" />
        </button>

        <!-- System Alerts button with badge - Renamed from notifications -->
        <button
          @click="toggleSystemAlerts"
          :class="[
            'p-1.5 rounded-md relative transition-all duration-200',
            showSystemAlerts ? 'bg-gray-100 dark:bg-gray-800' : '',
            'dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-gray-800',
            'text-gray-500 hover:text-primary-600 hover:bg-gray-100'
          ]"
          aria-label="System alerts"
          class="system-alerts-container"
        >
          <AlertTriangleIcon class="h-5 w-5" />
          <span
            v-if="hasUnreadAlerts"
            class="absolute top-0.5 right-0.5 h-2.5 w-2.5 rounded-full bg-rose-500 animate-pulse"
          />
        </button>

        <!-- User profile button with dropdown - Enhanced visibility -->
        <div class="relative ml-2 user-menu-container">
          <button
            @click="toggleUserMenu"
            class="w-9 h-9 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 shadow-md"
            :class="[
              showUserMenu
                ? 'ring-2 ring-primary-500 ring-offset-2 dark:ring-offset-gray-900'
                : '',
              'border-2 dark:border-gray-700 border-primary-300 hover:border-primary-500'
            ]"
            aria-label="User profile"
          >
            <NuxtImg
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dvSZhyStgm9DNolueaXK6QwebuDdl4.png"
              alt="User avatar"
              class="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>
    </div>

    <!-- Modales Container - Absolute positioning to avoid pushing content -->
    <div class="relative">
      <!-- System Alerts Dropdown - Absolute positioning -->
      <div
        v-if="showSystemAlerts"
        class="absolute right-0 top-0 w-full sm:w-96 bg-white dark:bg-gray-900 shadow-xl border border-gray-100 dark:border-gray-800 rounded-b-lg z-50 animate-fadeIn"
      >
        <div class="px-4 py-3">
          <div class="flex items-center justify-between mb-3">
            <h3
              class="text-xs font-bold uppercase tracking-widest dark:text-gray-400 text-gray-500"
            >
              System Status
            </h3>
            <div class="flex items-center space-x-2">
              <button
                class="text-xs text-primary-500 dark:text-primary-400 hover:underline"
                @click="markAllAlertsAsRead"
              >
                Mark all as read
              </button>
              <button
                @click="toggleSystemAlerts"
                class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <XIcon class="h-4 w-4" />
              </button>
            </div>
          </div>

          <div class="space-y-2 max-h-[60vh] overflow-y-auto scrollbar-thin">
            <div
              v-for="(alert, index) in systemAlerts"
              :key="index"
              class="flex items-start p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              :class="alert.unread ? 'bg-amber-50/50 dark:bg-amber-900/10' : ''"
            >
              <div class="flex-shrink-0 mr-3">
                <div
                  class="w-8 h-8 rounded-full flex items-center justify-center"
                  :class="getAlertIconClass(alert.type)"
                >
                  <component
                    :is="getAlertIcon(alert.type)"
                    class="h-4 w-4 text-white"
                  />
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {{ alert.title }}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {{ alert.message }}
                </p>
                <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {{ formatTimeAgo(alert.time) }}
                </p>
              </div>
              <button
                class="ml-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                @click="dismissAlert(index)"
              >
                <XIcon class="h-4 w-4" />
              </button>
            </div>
          </div>

          <button
            class="w-full mt-3 py-2 text-sm text-center text-primary-500 dark:text-primary-400 hover:underline"
            @click="viewAllSystemAlerts"
          >
            View system status dashboard
          </button>
        </div>
      </div>

      <!-- Help Dropdown - Absolute positioning -->
      <div
        v-if="showHelp"
        class="absolute right-0 top-0 w-full sm:w-96 bg-white dark:bg-gray-900 shadow-xl border border-gray-100 dark:border-gray-800 rounded-b-lg z-50 animate-fadeIn"
      >
        <div class="px-4 py-3">
          <div class="flex items-center justify-between mb-3">
            <h3
              class="text-xs font-bold uppercase tracking-widest dark:text-gray-400 text-gray-500"
            >
              Help & Resources
            </h3>
            <button
              @click="toggleHelp"
              class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <XIcon class="h-4 w-4" />
            </button>
          </div>

          <div class="space-y-2 max-h-[60vh] overflow-y-auto scrollbar-thin">
            <button
              v-for="(item, index) in helpItems"
              :key="index"
              @click="item.action"
              class="w-full flex items-start p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <div class="flex-shrink-0 mr-3">
                <div
                  class="w-8 h-8 rounded-full flex items-center justify-center bg-primary-100 dark:bg-primary-900/30"
                >
                  <component
                    :is="item.icon"
                    class="h-4 w-4 text-primary-500 dark:text-primary-400"
                  />
                </div>
              </div>
              <div class="flex-1 min-w-0 text-left">
                <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {{ item.title }}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {{ item.description }}
                </p>
              </div>
            </button>
          </div>

          <div class="mt-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <p class="text-xs text-gray-500 dark:text-gray-400">
              <strong>Keyboard shortcuts:</strong>
            </p>
            <div class="mt-2 grid grid-cols-2 gap-2 text-xs">
              <div class="flex items-center">
                <kbd
                  class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 mr-1.5"
                  >⌘K</kbd
                >
                <span class="text-gray-600 dark:text-gray-300">Search</span>
              </div>
              <div class="flex items-center">
                <kbd
                  class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 mr-1.5"
                  >⌘/</kbd
                >
                <span class="text-gray-600 dark:text-gray-300">Help</span>
              </div>
              <div class="flex items-center">
                <kbd
                  class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 mr-1.5"
                  >⌘D</kbd
                >
                <span class="text-gray-600 dark:text-gray-300">Dark mode</span>
              </div>
              <div class="flex items-center">
                <kbd
                  class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 mr-1.5"
                  >Esc</kbd
                >
                <span class="text-gray-600 dark:text-gray-300">Close menu</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- User Menu Dropdown - Absolute positioning -->
      <div
        v-if="showUserMenu"
        class="absolute right-0 top-0 w-64 bg-white dark:bg-gray-900 shadow-xl border border-gray-100 dark:border-gray-800 rounded-b-lg z-50 animate-fadeIn"
      >
        <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium dark:text-white text-gray-800">
                Alex Johnson
              </p>
              <p class="text-xs dark:text-gray-400 text-gray-500">
                alex.johnson@example.com
              </p>
            </div>
            <button
              @click="toggleUserMenu"
              class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <XIcon class="h-4 w-4" />
            </button>
          </div>
        </div>
        <div class="py-1">
          <button
            v-for="(item, index) in userMenuItems"
            :key="index"
            @click="item.action"
            class="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
          >
            <component
              :is="item.icon"
              class="h-4 w-4 mr-3"
              :class="
                item.danger
                  ? 'text-rose-500 dark:text-rose-400'
                  : 'text-gray-500 dark:text-gray-400'
              "
            />
            <span
              :class="item.danger ? 'text-rose-600 dark:text-rose-400' : ''"
              >{{ item.label }}</span
            >
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de búsqueda para móvil -->
    <div
      v-if="showSearchModal"
      class="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center p-4 animate-fadeIn"
      @click="closeSearchModal"
    >
      <div
        class="bg-white dark:bg-gray-900 w-full max-w-md rounded-lg shadow-xl p-4"
        @click.stop
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
            Search
          </h3>
          <button
            @click="closeSearchModal"
            class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <XIcon class="h-5 w-5" />
          </button>
        </div>

        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            class="w-full h-10 pl-10 pr-4 rounded-md text-sm transition-all duration-200 shadow-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-500 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-primary-500/50 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            ref="searchModalInput"
            @keydown.esc="closeSearchModal"
          />
          <SearchIcon
            class="h-5 w-5 absolute left-3 top-2.5 text-gray-400 dark:text-gray-500"
          />
        </div>

        <!-- Resultados de búsqueda -->
        <div
          v-if="searchQuery.length > 0"
          class="mt-3 bg-white dark:bg-gray-800 rounded-md shadow-inner border border-gray-100 dark:border-gray-700 py-2"
        >
          <div
            v-if="filteredItems.length > 0"
            class="max-h-64 overflow-y-auto scrollbar-thin"
          >
            <button
              v-for="item in filteredItems"
              :key="item.name"
              @click="navigateToAndCloseModal(item.route)"
              class="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
            >
              <component
                :is="item.icon"
                class="h-4 w-4 mr-3 text-gray-500 dark:text-gray-400"
              />
              <span>{{ item.name }}</span>
            </button>
          </div>
          <div
            v-else
            class="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 text-center"
          >
            No results found
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import ToggleButton from '../ui/Button/ToggleButton.vue'
import {
  Search as SearchIcon,
  AlertTriangle as AlertTriangleIcon,
  ChevronRight as ChevronRightIcon,
  Menu as MenuIcon,
  X as XIcon,
  Circle as CircleIcon,
  User as UserIcon,
  Settings as SettingsIcon,
  HelpCircle as HelpCircleIcon,
  LogOut as LogOutIcon,
  FileText as FileTextIcon,
  AlertCircle as AlertCircleIcon,
  CheckCircle as CheckCircleIcon,
  MoreVertical as MoreVerticalIcon,
  BookOpen as BookOpenIcon,
  MessageSquare as MessageSquareIcon,
  Video as VideoIcon,
  Server as ServerIcon,
  Wifi as WifiIcon,
  WifiOff as WifiOffIcon,
  Database as DatabaseIcon,
  Shield as ShieldIcon
} from 'lucide-vue-next'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import type { SideBar } from '~/layouts/default.vue'
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'

// TypeScript interfaces
interface UserMenuItem {
  label: string
  icon: any // Component type
  action: () => void
  danger?: boolean
}

interface HelpItem {
  title: string
  description: string
  icon: any // Component type
  action: () => void
}

interface SystemAlert {
  type:
    | 'warning'
    | 'alert'
    | 'info'
    | 'success'
    | 'security'
    | 'database'
    | 'network'
  title: string
  message: string
  time: number
  unread: boolean
}

const props = defineProps<{
  navigation: SideBar[]
}>()

const store = useDashboard()
const breakpoints = useBreakpoints(breakpointsTailwind)
const route = useRouter()
const xs = breakpoints.smaller('md')

// Search functionality
const searchQuery = ref<string>('')
const isSearchFocused = ref<boolean>(false)

// User menu
const showUserMenu = ref<boolean>(false)
const userMenuItems: UserMenuItem[] = [
  {
    label: 'Profile',
    icon: UserIcon,
    action: () => console.log('Profile clicked')
  },
  {
    label: 'Settings',
    icon: SettingsIcon,
    action: () => console.log('Settings clicked')
  },
  {
    label: 'Help',
    icon: HelpCircleIcon,
    action: () => console.log('Help clicked')
  },
  {
    label: 'Logout',
    icon: LogOutIcon,
    action: () => console.log('Logout clicked'),
    danger: true
  }
]

// System Alerts - Updated with system-focused alerts
const showSystemAlerts = ref<boolean>(false)
const systemAlerts = ref<SystemAlert[]>([
  {
    type: 'warning',
    title: 'Scheduled Maintenance',
    message: 'System will be in maintenance mode on March 25, 2:00-4:00 AM UTC',
    time: Date.now() - 1000 * 60 * 5, // 5 minutes ago
    unread: true
  },
  {
    type: 'alert',
    title: 'Service Degradation',
    message: 'API response times are currently slower than normal',
    time: Date.now() - 1000 * 60 * 30, // 30 minutes ago
    unread: true
  },
  {
    type: 'info',
    title: 'Offline Mode Active',
    message: 'Invoices will be stored locally until connection is restored',
    time: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
    unread: false
  },
  {
    type: 'success',
    title: 'System Update Completed',
    message: 'All services are now running on the latest version',
    time: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    unread: false
  }
])

// Help items - Enhanced with more useful information
const showHelp = ref<boolean>(false)
const helpItems: HelpItem[] = [
  {
    title: 'Documentation',
    description: 'Read our comprehensive guides and API references',
    icon: BookOpenIcon,
    action: () => console.log('Documentation clicked')
  },
  {
    title: 'Video Tutorials',
    description: 'Watch step-by-step tutorials for common tasks',
    icon: VideoIcon,
    action: () => console.log('Video Tutorials clicked')
  },
  {
    title: 'System Status',
    description: 'Check the current status of all system components',
    icon: ServerIcon,
    action: () => console.log('System Status clicked')
  },
  {
    title: 'Offline Mode Guide',
    description: 'Learn how to use the system when connection is limited',
    icon: WifiOffIcon,
    action: () => console.log('Offline Mode Guide clicked')
  },
  {
    title: 'Live Chat Support',
    description: 'Chat with our support team for immediate assistance',
    icon: MessageSquareIcon,
    action: () => console.log('Live Chat clicked')
  }
]

// Computed property to check if there are unread alerts
const hasUnreadAlerts = computed((): boolean => {
  return systemAlerts.value.some((alert) => alert.unread)
})

// Toggle functions with animation prevention
const toggleDrawer = (): void => {
  // Add animation class to body
  document.body.classList.add('sidebar-animating')

  // Toggle drawer state
  store.toggleDrawer()

  // Remove animation class after transition
  setTimeout(() => {
    document.body.classList.remove('sidebar-animating')
  }, 400)
}

const toggleUserMenu = (): void => {
  showUserMenu.value = !showUserMenu.value
  if (showUserMenu.value) {
    // Close other dropdowns
    showSystemAlerts.value = false
    showHelp.value = false
    showSearchModal.value = false
  }
}

const toggleSystemAlerts = (): void => {
  showSystemAlerts.value = !showSystemAlerts.value
  if (showSystemAlerts.value) {
    // Close other dropdowns
    showUserMenu.value = false
    showHelp.value = false
    showSearchModal.value = false
  }
}

const toggleHelp = (): void => {
  showHelp.value = !showHelp.value
  if (showHelp.value) {
    // Close other dropdowns
    showUserMenu.value = false
    showSystemAlerts.value = false
    showSearchModal.value = false
  }
}

// System alerts functions
const markAllAlertsAsRead = (): void => {
  systemAlerts.value.forEach((alert) => {
    alert.unread = false
  })
}

const dismissAlert = (index: number): void => {
  systemAlerts.value.splice(index, 1)
}

const viewAllSystemAlerts = (): void => {
  console.log('Navigating to system status dashboard')
  showSystemAlerts.value = false
  // Here you would navigate to a system status page
}

// Click outside handler to close dropdowns - Improved to work better
const handleClickOutside = (event: MouseEvent): void => {
  const target = event.target as HTMLElement

  // Check if the click was outside the user menu
  if (
    showUserMenu.value &&
    !target.closest('.user-menu-container') &&
    !target.closest('button[aria-label="User profile"]')
  ) {
    showUserMenu.value = false
  }

  // Check if the click was outside the system alerts
  if (
    showSystemAlerts.value &&
    !target.closest('.system-alerts-container') &&
    !target.closest('button[aria-label="System alerts"]')
  ) {
    showSystemAlerts.value = false
  }

  // Check if the click was outside the help menu
  if (
    showHelp.value &&
    !target.closest('.help-container') &&
    !target.closest('button[aria-label="Help and resources"]')
  ) {
    showHelp.value = false
  }

  // No necesitamos verificar clics fuera del modal de búsqueda aquí
  // ya que el modal tiene su propio manejador de clics con @click="closeSearchModal"
}

// Add click outside event listener
onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)

  // Add keyboard shortcuts
  document.addEventListener('keydown', handleKeyboardShortcuts)
})

// Remove event listener on component unmount
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
  document.removeEventListener('keydown', handleKeyboardShortcuts)
})

// Añadir esta variable para el modal de búsqueda
const showSearchModal = ref<boolean>(false)
const searchModalInput = ref<HTMLInputElement | null>(null)

// Añadir estas funciones para manejar el modal de búsqueda
const toggleSearchModal = (): void => {
  showSearchModal.value = !showSearchModal.value
  if (showSearchModal.value) {
    // Cerrar otros modales
    showUserMenu.value = false
    showSystemAlerts.value = false
    showHelp.value = false

    // Enfocar el campo de búsqueda después de que el modal se muestre
    nextTick(() => {
      searchModalInput.value?.focus()
    })
  }
}

const closeSearchModal = (): void => {
  showSearchModal.value = false
  searchQuery.value = ''
}

const navigateToAndCloseModal = (path: string): void => {
  closeSearchModal()
  navigateTo(path)
}

// Modificar el manejador de atajos de teclado para incluir el modal de búsqueda
const handleKeyboardShortcuts = (event: KeyboardEvent): void => {
  // ⌘+K or Ctrl+K for search
  if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
    event.preventDefault()
    if (xs.value) {
      toggleSearchModal()
    } else {
      document.querySelector('input[placeholder="Search..."]')?.focus()
    }
  }

  // ⌘+/ or Ctrl+/ for help
  if ((event.metaKey || event.ctrlKey) && event.key === '/') {
    event.preventDefault()
    toggleHelp()
  }

  // Escape to close all dropdowns
  if (event.key === 'Escape') {
    showUserMenu.value = false
    showSystemAlerts.value = false
    showHelp.value = false
    showSearchModal.value = false
  }
}

// Get all navigation items flattened
const allNavigationItems = computed(() => {
  return props.navigation.flatMap((section) => section.items)
})

// Active item and section
const activeItem = computed(() => {
  for (const sidebar of props.navigation) {
    const foundItem = sidebar.items.find(
      (item) => item.route === route.currentRoute.value.path
    )
    if (foundItem) {
      return foundItem
    }
  }
  return null
})

const activeSection = computed(() => {
  for (const sidebar of props.navigation) {
    const foundItem = sidebar.items.find(
      (item) => item.route === route.currentRoute.value.path
    )
    if (foundItem) {
      return sidebar.title || 'General'
    }
  }
  return 'General'
})

// Filtered items for search - Improved search functionality
const filteredItems = computed(() => {
  if (!searchQuery.value) return []

  const query = searchQuery.value.toLowerCase()
  return allNavigationItems.value
    .filter((item) => item.name.toLowerCase().includes(query))
    .sort((a, b) => {
      // Sort exact matches first
      const aStartsWith = a.name.toLowerCase().startsWith(query)
      const bStartsWith = b.name.toLowerCase().startsWith(query)

      if (aStartsWith && !bStartsWith) return -1
      if (!aStartsWith && bStartsWith) return 1
      return 0
    })
    .slice(0, 8) // Limit results to 8 items for better UX
})

// Navigation with transition effect
const navigateTo = (path: string): void => {
  if (!path) return

  // Add a subtle page transition effect
  document.body.classList.add('page-transition')

  // Close all dropdowns
  showUserMenu.value = false
  showSystemAlerts.value = false
  showHelp.value = false
  showSearchModal.value = false

  setTimeout(() => {
    store.isOpenDrawer = false
    route.push(path)

    setTimeout(() => {
      document.body.classList.remove('page-transition')
    }, 500)
  }, 100)
}

// Format timestamp for alerts
const formatTimeAgo = (timestamp: number): string => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000)

  if (seconds < 60) return 'just now'

  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`

  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

// Get alert icon and class based on type - Updated with more appropriate icons
const getAlertIcon = (type: SystemAlert['type']) => {
  switch (type) {
    case 'warning':
      return AlertTriangleIcon
    case 'alert':
      return AlertCircleIcon
    case 'info':
      return WifiOffIcon // Changed to WifiOff for offline mode
    case 'success':
      return CheckCircleIcon
    case 'security':
      return ShieldIcon
    case 'database':
      return DatabaseIcon
    case 'network':
      return WifiIcon
    default:
      return ServerIcon
  }
}

const getAlertIconClass = (type: SystemAlert['type']): string => {
  switch (type) {
    case 'warning':
      return 'bg-amber-500'
    case 'alert':
      return 'bg-rose-500'
    case 'info':
      return 'bg-blue-500'
    case 'success':
      return 'bg-emerald-500'
    case 'security':
      return 'bg-purple-500'
    case 'database':
      return 'bg-cyan-500'
    case 'network':
      return 'bg-indigo-500'
    default:
      return 'bg-gray-500'
  }
}
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.2s ease-in-out forwards;
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

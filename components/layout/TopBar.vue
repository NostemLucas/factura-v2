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
        <!-- Mobile menu button with animation -->
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

      <!-- Center - Search with animations -->
      <div
        class="hidden md:block max-w-md w-full mx-4 lg:mx-8 xl:mx-16 transition-all duration-300"
      >
        <div class="relative group">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            :class="[
              'w-full h-9 pl-9 pr-4 rounded-md text-sm transition-all duration-200',
              'dark:bg-gray-800/70 dark:text-gray-200 dark:placeholder-gray-500 dark:focus:bg-gray-800 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-primary-500/50',
              'bg-gray-50/70 text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50'
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

          <!-- Search Results Dropdown -->
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

      <!-- Right side actions with animations -->
      <div class="flex items-center space-x-1 sm:space-x-2">
        <!-- Mobile search button -->
        <button
          @click="toggleMobileSearch"
          :class="[
            'p-1.5 rounded-md md:hidden transition-all duration-200',
            'dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-gray-800',
            'text-gray-500 hover:text-primary-600 hover:bg-gray-100'
          ]"
        >
          <SearchIcon class="h-5 w-5" />
        </button>

        <!-- Theme toggle -->
        <ToggleButton />

        <!-- Notifications button with badge -->
        <button
          @click="toggleNotifications"
          :class="[
            'p-1.5 rounded-md relative transition-all duration-200',
            showNotifications ? 'bg-gray-100 dark:bg-gray-800' : '',
            'dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-gray-800',
            'text-gray-500 hover:text-primary-600 hover:bg-gray-100'
          ]"
        >
          <BellIcon class="h-5 w-5" />
          <span
            class="absolute top-0.5 right-0.5 h-2 w-2 rounded-full bg-rose-500 animate-pulse"
          />
        </button>

        <!-- User profile button with dropdown -->
        <div class="relative">
          <button
            @click="toggleUserMenu"
            class="ml-1 w-8 h-8 rounded-full overflow-hidden transition-all duration-300 hover:scale-105"
            :class="[
              showUserMenu
                ? 'ring-2 ring-primary-500 ring-offset-2 dark:ring-offset-gray-900'
                : '',
              'border-2 dark:border-gray-700 border-gray-200 hover:border-primary-500'
            ]"
          >
            <NuxtImg
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dvSZhyStgm9DNolueaXK6QwebuDdl4.png"
              alt="User avatar"
              class="w-full h-full object-cover"
            />
          </button>

          <!-- User Menu Dropdown -->
          <div
            v-if="showUserMenu"
            class="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 py-1 z-50 animate-fadeIn"
          >
            <div
              class="px-4 py-2 border-b border-gray-100 dark:border-gray-700"
            >
              <p class="text-sm font-medium dark:text-white text-gray-800">
                Alex Johnson
              </p>
              <p class="text-xs dark:text-gray-400 text-gray-500">
                alex.johnson@example.com
              </p>
            </div>
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
    </div>

    <!-- Mobile Search Bar (expandable) -->
    <div
      v-if="showMobileSearch"
      class="px-4 py-3 border-t border-gray-100/70 dark:border-gray-800/40 md:hidden animate-fadeIn"
    >
      <div class="relative">
        <input
          v-model="mobileSearchQuery"
          type="text"
          placeholder="Search..."
          class="w-full h-9 pl-9 pr-4 rounded-lg text-sm bg-gray-100/70 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-primary-500/30 dark:focus:ring-primary-500/20 focus:border-transparent transition-all duration-200"
          ref="mobileSearchInput"
        />
        <SearchIcon
          class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
        />
      </div>

      <!-- Mobile Search Results -->
      <div
        v-if="mobileSearchQuery && filteredMobileItems.length > 0"
        class="mt-2 py-1 space-y-1 max-h-48 overflow-y-auto scrollbar-thin"
      >
        <button
          v-for="item in filteredMobileItems"
          :key="item.name"
          @click="navigateTo(item.route)"
          class="w-full flex items-center px-3 py-1.5 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/70 transition-colors"
        >
          <component
            :is="item.icon"
            class="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400"
          />
          <span>{{ item.name }}</span>
        </button>
      </div>
      <div
        v-else-if="mobileSearchQuery && filteredMobileItems.length === 0"
        class="mt-2 py-2 text-center text-sm text-gray-500 dark:text-gray-400"
      >
        No results found
      </div>
    </div>

    <!-- Notifications Dropdown -->
    <div
      v-if="showNotifications"
      class="px-4 py-3 border-t border-gray-100/70 dark:border-gray-800/40 animate-fadeIn"
    >
      <div class="flex items-center justify-between mb-3">
        <h3
          class="text-xs font-bold uppercase tracking-widest dark:text-gray-400 text-gray-500"
        >
          Notifications
        </h3>
        <button
          class="text-xs text-primary-500 dark:text-primary-400 hover:underline"
        >
          Mark all as read
        </button>
      </div>

      <div class="space-y-2 max-h-64 overflow-y-auto scrollbar-thin">
        <div
          v-for="(notification, index) in notifications"
          :key="index"
          class="flex items-start p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          :class="
            notification.unread ? 'bg-primary-50/50 dark:bg-primary-900/10' : ''
          "
        >
          <div class="flex-shrink-0 mr-3">
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center"
              :class="getNotificationIconClass(notification.type)"
            >
              <component
                :is="getNotificationIcon(notification.type)"
                class="h-4 w-4 text-white"
              />
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
              {{ notification.title }}
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {{ notification.message }}
            </p>
            <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">
              {{ formatTimeAgo(notification.time) }}
            </p>
          </div>
          <button
            class="ml-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <MoreVerticalIcon class="h-4 w-4" />
          </button>
        </div>
      </div>

      <button
        class="w-full mt-3 py-2 text-sm text-center text-primary-500 dark:text-primary-400 hover:underline"
      >
        View all notifications
      </button>
    </div>
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
  Circle as CircleIcon,
  User as UserIcon,
  Settings as SettingsIcon,
  HelpCircle as HelpCircleIcon,
  LogOut as LogOutIcon,
  MessageSquare as MessageSquareIcon,
  FileText as FileTextIcon,
  AlertCircle as AlertCircleIcon,
  CheckCircle as CheckCircleIcon,
  MoreVertical as MoreVerticalIcon
} from 'lucide-vue-next'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import type { SideBar } from '~/layouts/default.vue'
import { ref, computed, nextTick, onMounted } from 'vue'

const props = defineProps<{
  navigation: SideBar[]
}>()

const store = useDashboard()
const breakpoints = useBreakpoints(breakpointsTailwind)
const route = useRouter()
const xs = breakpoints.smaller('md')

// Search functionality
const searchQuery = ref('')
const mobileSearchQuery = ref('')
const isSearchFocused = ref(false)
const showMobileSearch = ref(false)
const mobileSearchInput = ref(null)

// User menu
const showUserMenu = ref(false)
const userMenuItems = [
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

// Notifications
const showNotifications = ref(false)
const notifications = [
  {
    type: 'message',
    title: 'New Message',
    message: 'You received a new message from Sarah',
    time: Date.now() - 1000 * 60 * 5, // 5 minutes ago
    unread: true
  },
  {
    type: 'alert',
    title: 'System Alert',
    message: 'Your storage is almost full (85%)',
    time: Date.now() - 1000 * 60 * 30, // 30 minutes ago
    unread: true
  },
  {
    type: 'success',
    title: 'Task Completed',
    message: 'Your report has been generated successfully',
    time: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
    unread: false
  },
  {
    type: 'document',
    title: 'Document Shared',
    message: 'Michael shared a document with you',
    time: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    unread: false
  }
]

// Toggle functions with animation prevention
const toggleDrawer = () => {
  // Add animation class to body
  document.body.classList.add('sidebar-animating')

  // Toggle drawer state
  store.toggleDrawer()

  // Remove animation class after transition
  setTimeout(() => {
    document.body.classList.remove('sidebar-animating')
  }, 400)
}

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
  if (showUserMenu.value) {
    // Close other dropdowns
    showNotifications.value = false
    showMobileSearch.value = false
  }
}

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
  if (showNotifications.value) {
    // Close other dropdowns
    showUserMenu.value = false
    showMobileSearch.value = false
  }
}

const toggleMobileSearch = () => {
  showMobileSearch.value = !showMobileSearch.value
  if (showMobileSearch.value) {
    // Close other dropdowns
    showUserMenu.value = false
    showNotifications.value = false

    // Focus the search input after it's rendered
    nextTick(() => {
      if (mobileSearchInput.value) {
        mobileSearchInput.value.focus()
      }
    })
  } else {
    mobileSearchQuery.value = ''
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

// Filtered items for search
const filteredItems = computed(() => {
  if (!searchQuery.value) return []

  const query = searchQuery.value.toLowerCase()
  return allNavigationItems.value.filter((item) =>
    item.name.toLowerCase().includes(query)
  )
})

const filteredMobileItems = computed(() => {
  if (!mobileSearchQuery.value) return []

  const query = mobileSearchQuery.value.toLowerCase()
  return allNavigationItems.value.filter((item) =>
    item.name.toLowerCase().includes(query)
  )
})

// Navigation with transition effect
const navigateTo = (path) => {
  if (!path) return

  // Add a subtle page transition effect
  document.body.classList.add('page-transition')

  // Close all dropdowns
  showUserMenu.value = false
  showNotifications.value = false
  showMobileSearch.value = false

  setTimeout(() => {
    store.isOpenDrawer = false
    route.push(path)

    setTimeout(() => {
      document.body.classList.remove('page-transition')
    }, 500)
  }, 100)
}

// Format timestamp for notifications
const formatTimeAgo = (timestamp) => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000)

  if (seconds < 60) return 'just now'

  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`

  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

// Get notification icon and class based on type
const getNotificationIcon = (type) => {
  switch (type) {
    case 'message':
      return MessageSquareIcon
    case 'alert':
      return AlertCircleIcon
    case 'success':
      return CheckCircleIcon
    case 'document':
      return FileTextIcon
    default:
      return BellIcon
  }
}

const getNotificationIconClass = (type) => {
  switch (type) {
    case 'message':
      return 'bg-blue-500'
    case 'alert':
      return 'bg-amber-500'
    case 'success':
      return 'bg-emerald-500'
    case 'document':
      return 'bg-purple-500'
    default:
      return 'bg-gray-500'
  }
}
</script>

<style scoped>
/* Smooth transitions for all elements */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Enhanced animations for specific elements */
button,
div,
span,
p {
  transition-property:
    transform, opacity, width, height, color, background-color, border-color,
    right, left, top, bottom;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Special animation for sidebar toggling */
:global(.sidebar-animating) * {
  transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1) !important;
}

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

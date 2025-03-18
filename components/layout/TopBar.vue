<template>
  <header
    :class="[
      'z-10 transition-all duration-300 sticky top-0',
      'dark:bg-gray-950/90 dark:border-gray-800',
      'bg-white/90 backdrop-blur-sm border-b border-gray-100',
      'flex-1 flex flex-col transition-all duration-300 ease-in-out',
      store.isCollapsed ? 'md:ml-[70px] isMobile ml-0 ' : 'ml-64'
    ]"
  >
    <!-- Main Topbar -->
    <div class="h-16 flex items-center justify-between px-4 md:px-6">
      <!-- Left side -->
      <div class="flex items-center">
        <!-- Mobile menu button -->
        <button
          @click="store.toggleDrawer()"
          class="p-1.5 rounded-md transition-colors duration-200 md:hidden dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-gray-800 text-gray-500 hover:text-primary-600 hover:bg-gray-100"
          aria-label="Toggle sidebar"
        >
          <MenuIcon v-if="!store.isOpenDrawer" class="h-5 w-5" />
          <XIcon v-else class="h-5 w-5" />
        </button>

        <!-- Breadcrumb -->
        <div class="flex items-center ml-1 md:ml-0">
          <div class="flex items-center">
            <button
              :class="[
                'flex items-center font-medium transition-colors duration-200 rounded-md px-2 py-1',
                'dark:text-primary-400 dark:hover:text-primary-300 dark:hover:bg-gray-800/70',
                'text-primary-600 hover:text-primary-700 hover:bg-primary-500 '
              ]"
            >
              <span class="hidden md:inline">ESG Indicators</span>
              <span class="md:hidden">ESG</span>
            </button>

            <ChevronRightIcon
              :class="['h-4 w-4 mx-2', 'dark:text-gray-500', 'text-gray-400']"
            />

            <div class="flex items-center">
              <div
                :class="[
                  'flex items-center rounded-md px-2 py-1 text-sm transition-colors duration-200',
                  'bg-primary-400 dark:text-primary-600/90 text-white hover:bg-primtext-primary-700',
                  'bg-primtext-primary-600/90 text-white hover:bg-primtext-primary-700'
                ]"
              >
                <CircleIcon class="h-3 w-3 mr-1.5" />
                <span>General</span>
                <ChevronDownIcon class="h-4 w-4 ml-1" />
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
              'w-full h-9 pl-9 pr-4 rounded-md text-sm transition-all duration-200',
              'dark:bg-gray-800/70 dark:text-gray-200 dark:placeholder-gray-500 dark:focus:bg-gray-800 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-blue-500/50',
              'bg-gray-50/70 text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50'
            ]"
          />
          <SearchIcon
            :class="[
              'h-4 w-4 absolute left-3 top-2.5 transition-colors duration-200',
              'dark:text-gray-500 dark:group-focus-within:text-blue-400',
              'text-gray-400 group-focus-within:text-blue-600'
            ]"
          />
        </div>
      </div>

      <div class="flex items-center space-x-1 sm:space-x-2">
        <button
          :class="[
            'p-1.5 rounded-md transition-colors duration-200 md:hidden',
            'dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800',
            'text-gray-500 hover:text-blue-600 hover:bg-gray-100'
          ]"
        >
          <SearchIcon class="h-5 w-5" />
        </button>

        <ToggleButton />
        <button
          :class="[
            'p-1.5 rounded-md transition-colors duration-200 ',
            'dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800',
            'text-gray-500 hover:text-blue-600 hover:bg-gray-100'
          ]"
        >
          <BellIcon class="h-5 w-5" />
          <span
            class="absolute top-0.5 right-0.5 h-2 w-2 rounded-full bg-red-500 animate-pulse"
          ></span>
        </button>
        <button
          class="ml-1 w-8 h-8 rounded-full overflow-hidden border-2 transition-all duration-200"
          :class="[
            'dark:border-blue-500 dark:ring-2 dark:ring-blue-500/30',
            'border-gray-700 hover:border-blue-500'
          ]"
        >
          <img
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
const options = [{ name: 'Workspaces', icon: GridIcon, badge: null }]
import {
  BarChart2 as BarChart2Icon,
  Home as HomeIcon,
  Search as SearchIcon,
  Bell as BellIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  MoreHorizontal as MoreHorizontalIcon,
  MoreVertical as MoreVerticalIcon,
  ChevronRight as ChevronRightIcon,
  ChevronDown as ChevronDownIcon,
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
  X as XIcon,
  Settings as SettingsIcon,
  HelpCircle as HelpCircleIcon,
  File as FileIcon,
  ExternalLink as ExternalLinkIcon,
  MessageSquare as MessageSquareIcon,
  TrendingUp as TrendingUpIcon,
  Edit as EditIcon,
  Circle as CircleIcon,
  PlusCircle as PlusCircleIcon,
  Folder as FolderIcon,
  Database as DatabaseIcon,
  Activity as ActivityIcon,
  Award as AwardIcon,
  Users as UsersIcon,
  User as UserIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  Layers as LayersIcon,
  FileText as FileTextIcon,
  Grid as GridIcon,
  Power as PowerIcon,
  LogOut as LogOutIcon,
  Sun as SunIcon,
  Moon as MoonIcon
} from 'lucide-vue-next'
const store = useDashboard()
// Responsive state
</script>

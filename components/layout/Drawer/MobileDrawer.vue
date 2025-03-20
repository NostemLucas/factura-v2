<script setup lang="ts">
import { computed } from 'vue'
import {
  MoreHorizontal,
  Database,
  Activity,
  Award,
  Users,
  BarChart,
  Grid,
  Power,
  LayoutDashboard,
  ShoppingCart,
  FileText,
  Menu,
  X,
  ChevronRight
} from 'lucide-vue-next'

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

const store = useDashboard()

const route = useRouter()

const activeRoute = computed(() => route.currentRoute.value.path)
</script>

<template>
  <UDrawer
    direction="left"
    :open="store.isOpenDrawer"
    :handle="true"
    :dismissible="true"
    @update:open="store.isOpenDrawer = $event"
    :ui="{
      content: 'ring-0 ',
      overlay: 'backdrop-blur-xs bg-black/10',
      handle: 'bg-gray-400'
    }"
    aria-describedby="drawer-description"
    aria-label="Sidebar de navegación"
  >
    <template #content>
      <aside class="relative bg-white ml-6 dark:bg-gray-900 flex-col w-64">
        <!-- Drawer Header -->
        <div
          class="flex items-center justify-between h-16 px-4 border-b dark:border-gray-800 border-gray-100"
        >
          <div class="flex items-center space-x-3">
            <div
              class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-primary-500"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 400 400"
                xmlns="http://www.w3.org/2000/svg"
                class="text-white"
              >
                <defs>
                  <mask id="barsMaskMobile">
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
                  mask="url(#barsMaskMobile)"
                />
              </svg>
            </div>
            <span
              class="text-lg font-semibold whitespace-nowrap dark:text-white text-gray-800"
            >
              CodeX
            </span>
          </div>
          <button
            @click="store.toggleDrawer"
            class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close menu"
          >
            <X class="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <!-- User Profile (Mobile) -->
        <div
          class="px-4 py-3 border-b dark:border-gray-800 border-gray-100 grow-0"
        >
          <div class="flex items-center space-x-3">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dvSZhyStgm9DNolueaXK6QwebuDdl4.png"
              alt="User avatar"
              class="h-12 w-12 rounded-full border-2 border-primary-500"
            />
            <div>
              <p class="text-sm font-medium dark:text-white text-gray-800">
                Alex Johnson
              </p>
              <p class="text-xs dark:text-gray-400 text-gray-500">
                Data Analyst
              </p>
            </div>
          </div>
        </div>

        <!-- Navigation Menu -->
        <div class="h-[calc(90%-144px)] overflow-y-auto grow-3">
          <nav class="p-2">
            <div class="space-y-4">
              <div
                v-for="(section, sectionIndex) in navigation"
                :key="`mobile-section-${sectionIndex}`"
                class="mb-4"
              >
                <!-- Section Title -->
                <h3
                  class="px-3 py-2 text-xs font-bold uppercase tracking-wider dark:text-gray-400 text-gray-500 bg-gray-50 dark:bg-gray-800/50 rounded-md mb-2"
                >
                  {{ section.title }}
                </h3>

                <div class="space-y-1">
                  <UButton
                    v-for="(item, itemIndex) in section.items"
                    variant="ghost"
                    :key="`mobile-item-${sectionIndex}-${itemIndex}`"
                    @click="navigateTo(item.route)"
                    class="group w-full flex items-center justify-between text-base font-normal rounded-lg py-3 px-4 relative cursor-pointer transition-colors"
                    :active="activeRoute === item.route"
                    active-class="bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300"
                    :class="
                      activeRoute === item.route
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                        : 'dark:text-gray-300 dark:hover:bg-gray-800/50 text-gray-700 hover:bg-gray-50'
                    "
                  >
                    <div class="flex items-center">
                      <div
                        class="w-9 h-9 rounded-full flex items-center justify-center mr-3"
                        :class="
                          activeRoute === item.route
                            ? 'bg-primary-100 dark:bg-primary-900/30'
                            : 'bg-gray-100 dark:bg-gray-800'
                        "
                      >
                        <component
                          :is="item.icon"
                          class="flex-shrink-0 h-5 w-5"
                          :class="
                            activeRoute === item.route
                              ? 'text-primary-600 dark:text-primary-400'
                              : 'text-gray-500 dark:text-gray-400'
                          "
                        />
                      </div>

                      <span
                        class="whitespace-nowrap tracking-wide"
                        :class="
                          activeRoute === item.route
                            ? 'font-medium'
                            : 'font-normal'
                        "
                      >
                        {{ item.name }}
                      </span>
                    </div>
                  </UButton>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <!-- Bottom Actions -->
        <div
          class="right-0 border-t dark:border-gray-800 border-gray-100 p-4 grow-0"
        >
          <button
            class="w-full py-3 px-4 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            <Power class="w-5 h-5 mr-2" />
            Sign Out
          </button>
        </div>
      </aside>
    </template>
  </UDrawer>
</template>

<style scoped>
/* Custom scrollbar for better mobile experience */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 20px;
}

.dark ::-webkit-scrollbar-thumb {
  background-color: rgba(75, 85, 99, 0.5);
}

/* Prevent content from being selectable in the drawer */
aside {
  -webkit-tap-highlight-color: transparent;
  user-select: none;
}

/* Smooth transitions */
.transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.transition-colors {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>

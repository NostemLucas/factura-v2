<script setup lang="ts">
import { computed, ref } from 'vue'
import { Power, X, ChevronRight, Bell, Settings } from 'lucide-vue-next'
import type { SideBar } from '~/layouts/default.vue'

defineProps<{
  navigation: SideBar[]
}>()

const store = useDashboard()
const route = useRouter()
const activeRoute = computed(() => route.currentRoute.value.path)
const hoverIndex = ref<string | null>(null)

// Add smooth navigation function with transition effect
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
</script>

<template>
  <UDrawer
    direction="left"
    :open="store.isOpenDrawer"
    :handle="true"
    :dismissible="true"
    @update:open="store.isOpenDrawer = $event"
    :ui="{
      content: 'ring-0 bg-white dark:bg-[#101828] shadow-xl',
      overlay: 'backdrop-blur-md bg-black/30',
      handle: 'bg-gray-400 dark:bg-gray-700'
    }"
    aria-describedby="drawer-description"
    aria-label="Sidebar de navegación"
  >
    <template #content>
      <aside
        class="relative bg-white dark:bg-gray-900 flex flex-col w-72 h-full"
      >
        <!-- Drawer Header with Gradient -->
        <div
          class="flex items-center justify-between h-20 pl-5 pr-4 border-b dark:border-gray-800/70 border-gray-100 bg-gradient-to-r from-primary-500/10 to-transparent dark:from-primary-900/20 dark:to-transparent"
        >
          <div class="flex items-center space-x-3">
            <div
              class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg shadow-primary-500/20 transform transition-transform duration-300 hover:scale-105"
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
            <div>
              <span
                class="text-xl font-bold whitespace-nowrap dark:text-white text-gray-800 tracking-tight"
              >
                CodeX
              </span>
              <div
                class="text-xs text-primary-600 dark:text-primary-400 font-medium"
              >
                Sistema de Facturación
              </div>
            </div>
          </div>
          <UButton
            @click="store.toggleDrawer"
            variant="ghost"
            class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:rotate-90"
            aria-label="Close menu"
          >
            <X class="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </UButton>
        </div>

        <!-- User Profile with Enhanced Design -->
        <div
          class="px-5 py-5 border-b dark:border-gray-800/70 border-gray-100 grow-0 bg-gray-50/50 dark:bg-gray-800/20"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <UAvatar
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dvSZhyStgm9DNolueaXK6QwebuDdl4.png"
                alt="User avatar"
                size="lg"
                class="ring-2 ring-primary-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 transition-all duration-300 hover:ring-primary-400 hover:scale-105"
              />
              <div>
                <p class="text-sm font-semibold dark:text-white text-gray-800">
                  Alex Johnson
                </p>
                <UBadge color="primary" variant="subtle" size="sm" class="mt-1">
                  Data Analyst
                </UBadge>
              </div>
            </div>

            <!-- Quick action buttons -->
            <div class="flex space-x-1">
              <UButton
                variant="ghost"
                size="xs"
                class="rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                aria-label="Notifications"
              >
                <Bell class="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </UButton>
              <UButton
                variant="ghost"
                size="xs"
                class="rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                aria-label="Settings"
              >
                <Settings class="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </UButton>
            </div>
          </div>
        </div>

        <!-- Navigation Menu with Enhanced Hover Effects -->
        <div class="flex-1 overflow-y-auto py-3">
          <nav class="px-4">
            <div class="space-y-6">
              <div
                v-for="(section, sectionIndex) in navigation"
                :key="`mobile-section-${sectionIndex}`"
                class="mb-5"
              >
                <!-- Section Title with Improved Design -->
                <h3
                  class="px-3 py-2 text-xs font-bold uppercase tracking-wider dark:text-gray-400 text-gray-500 bg-gray-50 dark:bg-gray-800/50 rounded-md mb-3 flex items-center"
                >
                  <div class="w-1 h-4 bg-primary-500 rounded-full mr-2"></div>
                  {{ section.title }}
                </h3>

                <div class="space-y-0.5">
                  <UButton
                    v-for="(item, itemIndex) in section.items"
                    :key="`mobile-item-${sectionIndex}-${itemIndex}`"
                    @click="navigateTo(item.route)"
                    @mouseenter="setHoverIndex(`${sectionIndex}-${itemIndex}`)"
                    @mouseleave="setHoverIndex(null)"
                    block
                    variant="ghost"
                    class="group w-full flex items-center justify-between text-sm rounded-lg py-2 px-3 relative transition-all duration-300"
                    :class="[
                      activeRoute === item.route
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 font-medium'
                        : 'dark:text-gray-300 text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/70'
                    ]"
                  >
                    <!-- Left side with icon and text -->
                    <div class="flex items-center">
                      <div
                        class="w-8 h-8 rounded-lg flex items-center justify-center mr-2.5 transition-all duration-300"
                        :class="[
                          activeRoute === item.route
                            ? 'bg-primary-100 dark:bg-primary-900/30'
                            : hoverIndex === `${sectionIndex}-${itemIndex}`
                              ? 'bg-gray-200 dark:bg-gray-700'
                              : 'bg-gray-100 dark:bg-gray-800'
                        ]"
                      >
                        <component
                          :is="item.icon"
                          class="flex-shrink-0 h-4 w-4 transition-all duration-300"
                          :class="[
                            activeRoute === item.route
                              ? 'text-primary-600 dark:text-primary-400'
                              : hoverIndex === `${sectionIndex}-${itemIndex}`
                                ? 'text-gray-700 dark:text-gray-300'
                                : 'text-gray-500 dark:text-gray-400'
                          ]"
                        />
                      </div>

                      <span
                        class="whitespace-nowrap tracking-wide transition-all duration-300"
                      >
                        {{ item.name }}
                      </span>
                    </div>

                    <!-- Active indicator line -->
                  </UButton>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <!-- Bottom Actions with Enhanced Design -->
        <div
          class="border-t dark:border-gray-800/70 border-gray-100 p-5 grow-0 bg-gray-50/50 dark:bg-gray-800/20"
        >
          <UButton
            color="primary"
            block
            class="py-3 px-4 font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/20 transform hover:-translate-y-1 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700"
          >
            <Power class="w-5 h-5 mr-2" />
            Cerrar Sesión
          </UButton>

          <!-- Version info with better styling -->
          <div
            class="text-xs text-center mt-4 text-gray-400 dark:text-gray-600 flex items-center justify-center space-x-2"
          >
            <span class="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-full"
              >v1.2.0</span
            >
            <span>•</span>
            <span>CodeX Enterprise</span>
          </div>
        </div>
      </aside>
    </template>
  </UDrawer>
</template>

<style scoped>
aside {
  -webkit-tap-highlight-color: transparent;
  user-select: none;
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Add subtle pulse animation to active item icon */
@keyframes subtle-pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.active-icon {
  animation: subtle-pulse 2s infinite;
}

/* Add hover effect for buttons */
@keyframes button-glow {
  0% {
    box-shadow: 0 0 0 rgba(79, 70, 229, 0);
  }
  50% {
    box-shadow: 0 0 10px rgba(79, 70, 229, 0.3);
  }
  100% {
    box-shadow: 0 0 0 rgba(79, 70, 229, 0);
  }
}

.glow-on-hover:hover {
  animation: button-glow 2s infinite;
}
</style>

<template>
  <div>
    <!-- Theme Toggle Button -->
    <button
      @click="toggleThemeSelector"
      class="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative hover:scale-110 hover:shadow-sm"
      :class="{
        'bg-gray-100 dark:bg-gray-800': showThemeSelector,
        'opacity-50 cursor-not-allowed': isChangingTheme
      }"
      :disabled="isChangingTheme"
    >
      <SunIcon
        v-if="colorMode.preference === 'light'"
        class="h-5 w-5 text-amber-500"
      />
      <MoonIcon
        v-else-if="colorMode.preference === 'dark'"
        class="h-5 w-5 text-indigo-400"
      />
      <MonitorIcon v-else class="h-5 w-5 text-gray-500 dark:text-gray-400" />
    </button>

    <!-- Modal Backdrop -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="showThemeSelector"
          class="fixed inset-0 bg-black/20 dark:bg-black/50 z-40"
          @click="closeThemeSelector"
        />
      </Transition>

      <!-- Theme Selector Modal -->
      <Transition name="slide-up">
        <div
          v-if="showThemeSelector"
          class="fixed z-50 bottom-0 left-0 right-0 sm:left-auto sm:bottom-auto sm:top-16 sm:right-4 sm:w-72"
          @click.stop
        >
          <div
            class="bg-white dark:bg-gray-900 rounded-t-xl sm:rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden"
          >
            <div
              class="px-4 py-3 border-b border-gray-100/70 dark:border-gray-800/40"
            >
              <div class="flex items-center justify-between">
                <h3
                  class="text-xs font-bold uppercase tracking-widest dark:text-gray-400 text-gray-500"
                >
                  Seleccionar Tema
                </h3>
                <button
                  @click="closeThemeSelector"
                  class="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <XIcon class="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>

            <div class="p-4">
              <div class="grid grid-cols-3 gap-2">
                <button
                  v-for="theme in themeOptions"
                  :key="theme.value"
                  @click="toggleTheme(theme.value, $event)"
                  class="flex flex-col items-center p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800/70 hover:scale-105 hover:shadow-sm"
                  :class="[
                    colorMode.preference === theme.value
                      ? 'bg-gray-100 dark:bg-gray-800/70 ring-2 ring-primary-500/50'
                      : '',
                    isChangingTheme && colorMode.preference !== theme.value
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  ]"
                  :disabled="
                    isChangingTheme && colorMode.preference !== theme.value
                  "
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
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useHead } from '#app'
import {
  MonitorIcon,
  MoonIcon,
  SunIcon,
  CheckIcon,
  XIcon
} from 'lucide-vue-next'

const mounted = ref(false)
const clickPosition = ref({ x: 0, y: 0 })
const viewportSize = ref({ width: 0, height: 0 })
const supportsViewTransitions = ref(false)
const colorMode = useColorMode()
const showThemeSelector = ref(false)
const isChangingTheme = ref(false)

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

useHead({
  meta: [{ name: 'view-transition', content: 'same-origin' }]
})

const toggleThemeSelector = () => {
  if (!isChangingTheme.value) {
    showThemeSelector.value = !showThemeSelector.value
  }
}

const closeThemeSelector = () => {
  showThemeSelector.value = false
}

// Close modal when ESC key is pressed
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && showThemeSelector.value) {
    closeThemeSelector()
  }
}

const getMaxRadius = () => {
  const corners = [
    { x: 0, y: 0 },
    { x: viewportSize.value.width, y: 0 },
    { x: 0, y: viewportSize.value.height },
    { x: viewportSize.value.width, y: viewportSize.value.height }
  ]

  let maxDistance = 0
  corners.forEach((corner) => {
    const distance = Math.sqrt(
      Math.pow(clickPosition.value.x - corner.x, 2) +
        Math.pow(clickPosition.value.y - corner.y, 2)
    )
    maxDistance = Math.max(maxDistance, distance)
  })

  return maxDistance * 1.1
}

const toggleTheme = async (theme: string, e: MouseEvent) => {
  // Prevent changing theme if already changing
  if (isChangingTheme.value || theme === colorMode.preference) {
    return
  }

  isChangingTheme.value = true
  clickPosition.value = {
    x: e.clientX,
    y: e.clientY
  }

  // Create custom transition styles
  const maxRadius = getMaxRadius()
  const transitionStyles = document.createElement('style')
  transitionStyles.textContent = `
    ::view-transition-old(root),
    ::view-transition-new(root) {
      animation: none;
      mix-blend-mode: normal;
    }

    ::view-transition-old(root) {
      z-index: 1;
    }

    ::view-transition-new(root) {
      z-index: 2;
      animation-name: circle-reveal;
      animation-duration: 1.5s;
      animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
    }

    @keyframes circle-reveal {
      from {
        clip-path: circle(0% at ${clickPosition.value.x}px ${clickPosition.value.y}px);
      }
      to {
        clip-path: circle(${maxRadius}px at ${clickPosition.value.x}px ${clickPosition.value.y}px);
      }
    }
  `

  document.head.appendChild(transitionStyles)

  if (document.startViewTransition) {
    try {
      // Start the view transition
      const transition = document.startViewTransition(() => {
        if (theme === 'system') {
          colorMode.preference = 'system'
        } else if (theme === 'dark') {
          colorMode.preference = 'dark'
        } else {
          colorMode.preference = 'light'
        }
      })

      // Close the modal after theme change starts
      setTimeout(() => {
        closeThemeSelector()
      }, 300)

      // Clean up after transition
      await transition.finished
      document.head.removeChild(transitionStyles)

      // Add a small delay before allowing new theme changes
      setTimeout(() => {
        isChangingTheme.value = false
      }, 200)
    } catch (error) {
      console.error('Error during view transition:', error)
      document.head.removeChild(transitionStyles)
      isChangingTheme.value = false
    }
  } else {
    // Fallback if View Transitions API is not supported
    if (theme === 'system') {
      colorMode.preference = 'system'
    } else if (theme === 'dark') {
      colorMode.preference = 'dark'
    } else {
      colorMode.preference = 'light'
    }

    // Close the modal
    closeThemeSelector()

    // Remove styles
    document.head.removeChild(transitionStyles)

    // Add delay before allowing new theme changes
    setTimeout(() => {
      isChangingTheme.value = false
    }, 1500)
  }
}

// Initialize on component mount
onMounted(() => {
  mounted.value = true
  supportsViewTransitions.value = !!document.startViewTransition

  // Get viewport dimensions
  viewportSize.value = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  // Add resize listener
  window.addEventListener('resize', () => {
    viewportSize.value = {
      width: window.innerWidth,
      height: window.innerHeight
    }
  })

  // Add keyboard listener
  window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', () => {})
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

@media (min-width: 640px) {
  .slide-up-enter-from,
  .slide-up-leave-to {
    transform: translateY(-20px);
  }
}
</style>

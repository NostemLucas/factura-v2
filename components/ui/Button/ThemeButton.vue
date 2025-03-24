<template>
  <div class="relative">
    <UButton
      variant="ghost"
      type="button"
      @click="toggleMenu"
      :icon="colorMode.value === 'dark' ? 'i-lucide-moon' : 'i-lucide-sun'"
      ref="toggleButton"
      class="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
      aria-label="Cambiar tema"
    >
    </UButton>

    <!-- Menú desplegable -->
    <transition
      enter-active-class="transition duration-200 ease-out animate-fadeIn"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="isMenuOpen"
        class="absolute right-0 mt-2 w-72 origin-top-right rounded-xl bg-white dark:bg-gray-800 shadow-xl ring-1 ring-black/5 focus:outline-none z-50 overflow-hidden"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabindex="-1"
      >
        <div
          class="px-4 py-3 border-b border-gray-100/70 dark:border-gray-800/40"
          role="none"
        >
          <h3
            class="text-xs font-bold uppercase tracking-widest mb-3 dark:text-gray-400 text-gray-500"
          >
            Seleccionar Tema
          </h3>

          <div class="grid grid-cols-3 gap-2">
            <!-- Tema Claro -->
            <button
              @click="setTheme('light')"
              class="flex flex-col items-center p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800/70 hover:scale-105 hover:shadow-sm"
              :class="[
                colorMode.preference === 'light'
                  ? 'bg-gray-100 dark:bg-gray-800/70 ring-2 ring-primary-500/50'
                  : ''
              ]"
              role="menuitem"
            >
              <!-- Theme Preview -->
              <div
                class="relative w-full aspect-video rounded-md overflow-hidden mb-2"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-yellow-50"
                ></div>
                <div
                  v-if="colorMode.preference === 'light'"
                  class="absolute inset-0 flex items-center justify-center bg-primary-500/20"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-5 w-5 text-primary-500"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              </div>

              <!-- Theme Name -->
              <div class="flex items-center justify-center space-x-1.5">
                <Sun class="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                <span
                  class="text-xs font-medium text-gray-700 dark:text-gray-300"
                  >Claro</span
                >
              </div>
            </button>

            <!-- Tema Oscuro -->
            <button
              @click="setTheme('dark')"
              class="flex flex-col items-center p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800/70 hover:scale-105 hover:shadow-sm"
              :class="[
                colorMode.preference === 'dark'
                  ? 'bg-gray-100 dark:bg-gray-800/70 ring-2 ring-primary-500/50'
                  : ''
              ]"
              role="menuitem"
            >
              <!-- Theme Preview -->
              <div
                class="relative w-full aspect-video rounded-md overflow-hidden mb-2"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-800"
                ></div>
                <div
                  v-if="colorMode.preference === 'dark'"
                  class="absolute inset-0 flex items-center justify-center bg-primary-500/20"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-5 w-5 text-primary-500"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              </div>

              <!-- Theme Name -->
              <div class="flex items-center justify-center space-x-1.5">
                <Moon class="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                <span
                  class="text-xs font-medium text-gray-700 dark:text-gray-300"
                  >Oscuro</span
                >
              </div>
            </button>

            <!-- Tema Sistema -->
            <button
              @click="setTheme('system')"
              class="flex flex-col items-center p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800/70 hover:scale-105 hover:shadow-sm"
              :class="[
                colorMode.preference === 'system'
                  ? 'bg-gray-100 dark:bg-gray-800/70 ring-2 ring-primary-500/50'
                  : ''
              ]"
              role="menuitem"
            >
              <!-- Theme Preview -->
              <div
                class="relative w-full aspect-video rounded-md overflow-hidden mb-2"
              >
                <div class="absolute inset-0 flex">
                  <div
                    class="w-1/2 h-full bg-gradient-to-b from-blue-50 via-white to-yellow-50"
                  ></div>
                  <div
                    class="w-1/2 h-full bg-gradient-to-b from-gray-900 via-indigo-950 to-gray-800"
                  ></div>
                </div>
                <div
                  v-if="colorMode.preference === 'system'"
                  class="absolute inset-0 flex items-center justify-center bg-primary-500/20"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-5 w-5 text-primary-500"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              </div>

              <!-- Theme Name -->
              <div class="flex items-center justify-center space-x-1.5">
                <div
                  class="relative h-3.5 w-3.5 text-gray-500 dark:text-gray-400"
                >
                  <Moon class="absolute h-3.5 w-3.5 opacity-50 -left-0.5" />
                  <Sun class="absolute h-3.5 w-3.5 opacity-50 -right-0.5" />
                </div>
                <span
                  class="text-xs font-medium text-gray-700 dark:text-gray-300"
                  >Sistema</span
                >
              </div>
            </button>
          </div>
        </div>

        <!-- Atajo de teclado -->
        <div
          class="px-4 py-2 text-xs text-gray-500 dark:text-gray-400 flex items-center justify-between"
        >
          <span>Atajo de teclado</span>
          <kbd
            class="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-md dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
          >
            Ctrl + J
          </kbd>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '#app'
import { Moon, Sun } from 'lucide-vue-next'

// Interfaces
interface ClickPosition {
  x: number
  y: number
}

interface ViewportSize {
  width: number
  height: number
}

// State
const mounted = ref<boolean>(false)
const clickPosition = ref<ClickPosition>({ x: 0, y: 0 })
const viewportSize = ref<ViewportSize>({ width: 0, height: 0 })
const supportsViewTransitions = ref<boolean>(false)
const colorMode = useColorMode()
const isMenuOpen = ref<boolean>(false)
const toggleButton = ref<HTMLElement | null>(null)

// Meta tags for view transitions
useHead({
  meta: [{ name: 'view-transition', content: 'same-origin' }]
})

// Calculate maximum radius for the circular reveal animation
const getMaxRadius = (): number => {
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

// Toggle menu open/closed
const toggleMenu = (e: MouseEvent): void => {
  isMenuOpen.value = !isMenuOpen.value
  e.stopPropagation() // Prevent event from bubbling up
}

// Set theme with transition effect
const setTheme = async (theme: 'light' | 'dark' | 'system'): Promise<void> => {
  // Get button position for animation origin
  if (toggleButton.value) {
    const rect = toggleButton.value.getBoundingClientRect()
    clickPosition.value = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    }
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
      animation-duration: 0.8s;
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

  // Close menu
  isMenuOpen.value = false

  // Apply theme change with transition
  if (document.startViewTransition) {
    try {
      // Start the view transition
      const transition = document.startViewTransition(() => {
        colorMode.preference = theme
      })

      // Clean up after transition
      await transition.finished
      document.head.removeChild(transitionStyles)
    } catch (error) {
      console.error('Error during view transition:', error)
      document.head.removeChild(transitionStyles)
    }
  } else {
    // Fallback if View Transitions API is not supported
    colorMode.preference = theme
    document.head.removeChild(transitionStyles)
  }
}

// Keyboard shortcut for toggling theme menu
const handleKeyDown = (event: KeyboardEvent): void => {
  // Ctrl + J to toggle theme menu
  if (event.ctrlKey && event.key === 'j') {
    event.preventDefault()
    isMenuOpen.value = !isMenuOpen.value
  }
}

// Close menu when clicking outside
const handleClickOutside = (event: MouseEvent): void => {
  const target = event.target as HTMLElement
  if (
    isMenuOpen.value &&
    toggleButton.value &&
    !toggleButton.value.contains(target)
  ) {
    isMenuOpen.value = false
  }
}

// Initialize on component mount
onMounted(() => {
  mounted.value = true
  supportsViewTransitions.value =
    typeof document !== 'undefined' && !!document.startViewTransition

  // Get viewport dimensions
  viewportSize.value = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  // Add event listeners
  window.addEventListener('resize', () => {
    viewportSize.value = {
      width: window.innerWidth,
      height: window.innerHeight
    }
  })
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeyDown)
})

// Clean up event listeners
onBeforeUnmount(() => {
  window.removeEventListener('resize', () => {})
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeyDown)
})

// Watch for escape key to close menu
watch(
  () => isMenuOpen.value,
  (isOpen) => {
    if (isOpen) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          isMenuOpen.value = false
        }
      }
      document.addEventListener('keydown', handleEscape)
      return () => {
        document.removeEventListener('keydown', handleEscape)
      }
    }
  }
)
</script>

<style scoped>
/* Estilos adicionales para mejorar la apariencia */
.rotate-90 {
  transform: rotate(90deg);
}

/* Animación de fadeIn */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

/* Asegurarse de que el aspect-video funcione correctamente */
.aspect-video {
  aspect-ratio: 16 / 9;
}
</style>

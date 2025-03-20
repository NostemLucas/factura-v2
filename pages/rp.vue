<template>
  <div
    class="min-h-screen bg-white transition-colors duration-300 dark:bg-gray-900"
  >
    <!-- Browser compatibility notice -->
    <div
      v-if="mounted && !supportsViewTransitions"
      class="fixed bottom-4 right-4 z-50 w-72 rounded-md bg-yellow-100 p-3 text-sm text-yellow-800 shadow-lg"
    >
      Tu navegador no soporta la View Transitions API. La animación no
      funcionará.
    </div>

    <!-- Header -->
    <header class="border-b border-gray-200 dark:border-gray-700">
      <div
        class="container mx-auto flex items-center justify-between px-4 py-4"
      >
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white">
          Water Drop Theme
        </h1>

        <button
          @click="toggleTheme"
          class="relative z-10 rounded-full bg-gray-200 p-3 text-gray-800 shadow-lg transition-all hover:shadow-xl dark:bg-gray-800 dark:text-gray-200"
          aria-label="Toggle theme"
        >
          <component :is="isDark ? Moon : Sun" class="h-6 w-6" />
        </button>
      </div>
    </header>

    <!-- Main content area -->
    <div class="container mx-auto flex flex-col gap-8 px-4 py-8 md:flex-row">
      <!-- Sidebar -->
      <aside
        class="w-full rounded-lg bg-gray-100 p-4 shadow-md dark:bg-gray-800 md:w-64"
      >
        <nav>
          <ul class="space-y-2">
            <li v-for="(item, index) in menuItems" :key="index">
              <a
                href="#"
                class="flex items-center gap-3 rounded-md px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                <component :is="item.icon" class="h-5 w-5" />
                <span>{{ item.label }}</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <!-- Main content -->
      <main class="flex-1">
        <div class="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
          <h2 class="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
            Water Drop Theme Transition
          </h2>
          <p class="mb-6 text-gray-600 dark:text-gray-300">
            Esta demostración muestra un efecto de gota de agua al cambiar entre
            temas claro y oscuro, utilizando la API nativa de View Transitions.
          </p>

          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div
              class="rounded-lg bg-gray-50 p-4 shadow-inner dark:bg-gray-700"
            >
              <h3 class="mb-2 font-medium text-gray-800 dark:text-white">
                Efecto de gota
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                Observa cómo el color se expande como una gota de agua.
              </p>
            </div>

            <div
              class="rounded-lg bg-gray-50 p-4 shadow-inner dark:bg-gray-700"
            >
              <h3 class="mb-2 font-medium text-gray-800 dark:text-white">
                Transición fluida
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                La animación tiene un efecto de rebote sutil al final.
              </p>
            </div>
          </div>

          <div class="mt-8 space-y-4">
            <button
              class="w-full rounded-md bg-primary-500 px-4 py-2 text-white transition-colors hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700"
            >
              Botón primario
            </button>

            <button
              class="w-full rounded-md bg-gray-200 px-4 py-2 text-gray-800 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            >
              Botón secundario
            </button>
          </div>
        </div>

        <div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div
            v-for="item in 3"
            :key="item"
            class="rounded-lg bg-white p-4 shadow-sm transition-colors dark:bg-gray-800"
          >
            <div
              class="mb-3 h-32 rounded-md bg-gray-100 dark:bg-gray-700"
            ></div>
            <h3 class="font-medium text-gray-800 dark:text-white">
              Elemento {{ item }}
            </h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Descripción breve del elemento
            </p>
          </div>
        </div>
      </main>
    </div>

    <footer class="mt-12 border-t border-gray-200 dark:border-gray-700">
      <div class="container mx-auto px-4 py-6">
        <p class="text-center text-sm text-gray-500 dark:text-gray-400">
          Water Drop Theme Transition - Vue 3 + TypeScript
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Moon, Sun, Home, Settings, User, Mail, Bell } from 'lucide-vue-next'

// Types
type Icon =
  | typeof Moon
  | typeof Sun
  | typeof Home
  | typeof Settings
  | typeof User
  | typeof Mail
  | typeof Bell
interface MenuItem {
  icon: Icon
  label: string
}

// State
const isDark = ref(false)
const mounted = ref(false)
const supportsViewTransitions = ref(false)

// Menu items
const menuItems: MenuItem[] = [
  { icon: Home, label: 'Inicio' },
  { icon: User, label: 'Perfil' },
  { icon: Mail, label: 'Mensajes' },
  { icon: Bell, label: 'Notificaciones' },
  { icon: Settings, label: 'Configuración' }
]

// Toggle theme with water drop effect
const toggleTheme = async (e: MouseEvent): Promise<void> => {
  // Get click coordinates for the water drop origin
  const x = e.clientX
  const y = e.clientY

  // Calculate max radius (diagonal of the viewport)
  const maxRadius =
    Math.sqrt(
      Math.pow(Math.max(x, window.innerWidth - x), 2) +
        Math.pow(Math.max(y, window.innerHeight - y), 2)
    ) * 1.1

  // Create water drop animation styles
  const styles = document.createElement('style')
  styles.textContent = `
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
      animation: water-drop 1.2s cubic-bezier(0.2, 0.9, 0.4, 1.1);
    }
    
    @keyframes water-drop {
      0% {
        clip-path: circle(0% at ${x}px ${y}px);
        transform: scale(0.95);
      }
      60% {
        transform: scale(1.02);
      }
      100% {
        clip-path: circle(${maxRadius}px at ${x}px ${y}px);
        transform: scale(1);
      }
    }
  `
  document.head.appendChild(styles)

  try {
    if (document.startViewTransition) {
      // Start the view transition
      const transition = document.startViewTransition(() => {
        // Toggle theme
        isDark.value = !isDark.value
        updateTheme()
      })

      // Wait for animation to complete
      await transition.finished
    } else {
      // Fallback for browsers without View Transitions API
      isDark.value = !isDark.value
      updateTheme()
    }
  } catch (error) {
    console.error('Theme transition failed:', error)
    isDark.value = !isDark.value
    updateTheme()
  } finally {
    // Clean up
    document.head.removeChild(styles)
  }
}

// Apply theme to document
const updateTheme = (): void => {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

// Initialize
onMounted(() => {
  mounted.value = true

  // Check for View Transitions API support
  supportsViewTransitions.value =
    typeof document.startViewTransition === 'function'

  // Set initial theme based on localStorage or system preference
  const savedTheme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }

  // Add meta tag for View Transitions API
  const meta = document.createElement('meta')
  meta.name = 'view-transition'
  meta.content = 'same-origin'
  document.head.appendChild(meta)
})
</script>

<style>
:root {
  --primary-500: #6366f1;
  --primary-600: #4f46e5;
  --primary-700: #4338ca;
}

/* Smooth transitions for non-View Transitions API browsers */
* {
  transition-property: color, background-color, border-color, box-shadow;
  transition-duration: 300ms;
}

/* Disable transitions during View Transitions API animation */
.view-transition-active * {
  transition-property: none !important;
}

/* Add subtle water ripple effect to cards on hover */
.rounded-lg:hover {
  box-shadow: 0 0 15px rgba(99, 102, 241, 0.15);
  transform: translateY(-2px);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

/* Dark mode adjustments */
.dark .rounded-lg:hover {
  box-shadow: 0 0 15px rgba(99, 102, 241, 0.3);
}
</style>

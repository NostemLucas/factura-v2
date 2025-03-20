<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <div
      v-if="mounted && !supportsViewTransitions"
      class="fixed bottom-4 left-4 right-4 bg-yellow-100 text-yellow-800 p-2 text-sm rounded-md z-50 md:left-auto md:right-4 md:w-72"
    >
      Tu navegador no soporta la View Transitions API. La animación no
      funcionará, pero el cambio de tema sí.
    </div>

    <header class="border-b border-gray-200 dark:border-gray-700">
      <div
        class="container mx-auto px-4 py-4 flex justify-between items-center"
      >
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white">
          Demo Telegram en Nuxt 3
        </h1>

        <button
          @click="toggleTheme"
          class="relative z-10 rounded-full bg-gray-200 p-3 text-gray-800 shadow-md dark:bg-gray-800 dark:text-gray-200"
        >
          <Moon v-if="isDark" class="h-6 w-6" />
          <Sun v-else class="h-6 w-6" />
        </button>
      </div>
    </header>

    <div class="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      <!-- Sidebar -->
      <aside class="w-full md:w-64 bg-gray-100 rounded-lg p-4 dark:bg-gray-800">
        <nav>
          <ul class="space-y-2">
            <li v-for="(item, index) in menuItems" :key="index">
              <a
                href="#"
                class="flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700"
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
        <div class="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800">
          <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Cambio de tema estilo Telegram con View Transitions API en Nuxt 3
          </h2>
          <p class="text-gray-600 mb-6 dark:text-gray-300">
            Esta demostración muestra cómo el cambio de tema se propaga desde el
            botón hacia todos los elementos de la interfaz, similar a cómo
            funciona en Telegram, pero usando la API nativa de View Transitions
            en Nuxt 3.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-gray-50 rounded-lg p-4 dark:bg-gray-700">
              <h3 class="font-medium mb-2 text-gray-800 dark:text-white">
                Tarjeta de información
              </h3>
              <p class="text-gray-600 text-sm dark:text-gray-300">
                Observa cómo el color se expande y cambia todos los elementos.
              </p>
            </div>

            <div class="bg-gray-50 rounded-lg p-4 dark:bg-gray-700">
              <h3 class="font-medium mb-2 text-gray-800 dark:text-white">
                Otra tarjeta
              </h3>
              <p class="text-gray-600 text-sm dark:text-gray-300">
                El efecto de expansión circular afecta a todos los componentes.
              </p>
            </div>
          </div>

          <div class="mt-8 space-y-4">
            <button
              class="w-full bg-primary-500 text-white py-2 px-4 rounded-md hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700"
            >
              Botón primario
            </button>

            <button
              class="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            >
              Botón secundario
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div
            v-for="item in 3"
            :key="item"
            class="bg-white p-4 rounded-lg shadow-sm dark:bg-gray-800"
          >
            <div
              class="h-32 bg-gray-100 rounded-md mb-3 dark:bg-gray-700"
            ></div>
            <h3 class="font-medium text-gray-800 dark:text-white">
              Elemento {{ item }}
            </h3>
            <p class="text-gray-500 text-sm mt-1 dark:text-gray-400">
              Descripción breve del elemento
            </p>
          </div>
        </div>
      </main>
    </div>

    <footer class="mt-12 border-t border-gray-200 dark:border-gray-700">
      <div class="container mx-auto px-4 py-6">
        <p class="text-center text-gray-500 text-sm dark:text-gray-400">
          Demostración de cambio de tema estilo Telegram con View Transitions
          API en Nuxt 3
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useHead } from '#app'
import { Moon, Sun, Home, Settings, User, Mail, Bell } from 'lucide-vue-next'

// State
const isDark = ref(false)
const mounted = ref(false)
const clickPosition = ref({ x: 0, y: 0 })
const viewportSize = ref({ width: 0, height: 0 })
const supportsViewTransitions = ref(false)

// Menu items
const menuItems = [
  { icon: Home, label: 'Inicio' },
  { icon: User, label: 'Perfil' },
  { icon: Mail, label: 'Mensajes' },
  { icon: Bell, label: 'Notificaciones' },
  { icon: Settings, label: 'Configuración' }
]

// Add meta tag for View Transitions API
useHead({
  meta: [{ name: 'view-transition', content: 'same-origin' }]
})

// Calculate the maximum radius needed to cover the screen from click position
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

  return maxDistance * 1.1 // Add a little extra to ensure full coverage
}

// Toggle theme function
const toggleTheme = async (e) => {
  // Store click position for the transition
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
        // Toggle dark mode
        isDark.value = !isDark.value

        if (isDark.value) {
          document.documentElement.classList.add('dark')
          localStorage.setItem('theme', 'dark')
        } else {
          document.documentElement.classList.remove('dark')
          localStorage.setItem('theme', 'light')
        }
      })

      // Clean up after transition
      await transition.finished
      document.head.removeChild(transitionStyles)
    } catch (error) {
      console.error('Error during view transition:', error)
      document.head.removeChild(transitionStyles)

      // Fallback if transition fails
      isDark.value = !isDark.value

      if (isDark.value) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }
    }
  } else {
    // Fallback for browsers that don't support View Transitions API
    isDark.value = !isDark.value

    if (isDark.value) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }

    document.head.removeChild(transitionStyles)
  }
}

// Initialize on component mount
onMounted(() => {
  mounted.value = true

  // Check for View Transitions API support
  supportsViewTransitions.value = !!document.startViewTransition

  // Set initial theme based on localStorage or system preference
  const savedTheme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }

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
})
</script>

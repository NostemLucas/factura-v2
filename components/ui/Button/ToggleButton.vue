<template>
  <button
    type="button"
    @click="toggleTheme"
    class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300 hover:rotate-45"
    :aria-label="
      isDark === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
    "
  >
    <div class="relative w-5 h-5">
      <Moon v-if="isDark === 'ligth'" class="h-6 w-6" />
      <Sun v-else class="h-6 w-6" />
    </div>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useHead } from '#app'
import { Moon, Sun } from 'lucide-vue-next'

// State
const isDark = ref(false)
const mounted = ref(false)
const clickPosition = ref({ x: 0, y: 0 })
const viewportSize = ref({ width: 0, height: 0 })
const supportsViewTransitions = ref(false)

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

  return maxDistance * 1.1
}

// Toggle theme function
const toggleTheme = async (e: any) => {
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

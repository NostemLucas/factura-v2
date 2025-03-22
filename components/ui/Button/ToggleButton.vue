<template>
  <button
    type="button"
    @click="toggleTheme"
    class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300 hover:rotate-y-180"
  >
    <div class="relative w-5 h-5">
      <component :is="colorMode.value === 'dark' ? Sun : Moon" />
    </div>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useHead } from '#app'
import { Moon, Sun } from 'lucide-vue-next'

// State
const mounted = ref(false)
const clickPosition = ref({ x: 0, y: 0 })
const viewportSize = ref({ width: 0, height: 0 })
const supportsViewTransitions = ref(false)
const colorMode = useColorMode()

useHead({
  meta: [{ name: 'view-transition', content: 'same-origin' }]
})

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
        // Check if preference is system, then toggle theme accordingly
        if (colorMode.preference === 'system') {
          // If the system mode is dark, change to light; if light, change to dark
          if (colorMode.value === 'dark') {
            colorMode.preference = 'light'
          } else {
            colorMode.preference = 'dark'
          }
        } else {
          // Toggle preference between light/dark
          colorMode.preference =
            colorMode.preference === 'dark' ? 'light' : 'dark'
        }
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
    if (colorMode.preference === 'system') {
      // Invert the system preference if it's system
      colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    } else {
      // Toggle between light and dark modes manually
      colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
    }

    console.log('color-pref:', colorMode.preference)
    document.head.removeChild(transitionStyles)
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
})
</script>

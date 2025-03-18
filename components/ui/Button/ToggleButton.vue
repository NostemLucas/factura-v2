<template>
  <button
    type="button"
    @click="toggleTheme"
    class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300 hover:rotate-45"
    :aria-label="
      colorMode.value === 'dark'
        ? 'Cambiar a modo claro'
        : 'Cambiar a modo oscuro'
    "
  >
    <div class="relative w-5 h-5">
      <SunIcon
        v-if="colorMode.value === 'dark'"
        class="h-5 w-5 text-yellow-400 absolute top-0 left-0 transform rotate-0 transition-all duration-300 opacity-100 scale-100"
      />
      <MoonIcon
        v-else
        class="h-5 w-5 text-indigo-600 absolute top-0 left-0 transform rotate-0 transition-all duration-300 opacity-100 scale-100"
      />
    </div>
  </button>
</template>

<script lang="ts" setup>
import { Sun as SunIcon, Moon as MoonIcon } from 'lucide-vue-next'
const colorMode = useColorMode()
const toggleTheme = () => {
  document.body.classList.add('theme-transition')
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  setTimeout(() => {
    document.body.classList.remove('theme-transition')
  }, 500)
}
</script>

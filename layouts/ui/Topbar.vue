<script setup lang="ts">
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Bell as BellIcon,
  Settings as SettingsIcon,
  HelpCircle as HelpCircleIcon,
  Moon as MoonIcon,
  Sun as SunIcon
} from 'lucide-vue-next'

const colorMode = useColorMode()
const { toggleDrawer } = useDashboard()

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <header
    class="z-40 sticky top-0 flex flex-col border-b border-gray-200 bg-white"
  >
    <div class="flex h-14 items-center justify-between px-4">
      <!-- Logo -->
      <div class="flex items-center gap-2">
        <button class="p-1" @click="toggleDrawer">
          <menu-icon class="h-5 w-5 text-gray-600" />
        </button>

        <div class="flex items-center gap-1">
          <span class="text-sm font-semibold text-gray-700">Codex</span>
        </div>
      </div>

      <!-- Buscador -->
      <div class="relative hidden md:block">
        <search-icon
          class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400"
        />
        <input
          type="text"
          placeholder="Buscar"
          class="w-64 rounded-md border border-gray-200 py-1.5 pr-3 pl-9 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <!-- Iconos -->
      <div class="flex items-center gap-3">
        <button class="text-gray-600 hover:text-gray-800">
          <bell-icon class="h-5 w-5" />
        </button>
        <button class="text-gray-600 hover:text-gray-800">
          <settings-icon class="h-5 w-5" />
        </button>
        <button class="text-gray-600 hover:text-gray-800" @click="toggleTheme">
          <moon-icon v-show="colorMode.value === 'light'" class="h-5 w-5" />
          <sun-icon v-show="colorMode.value === 'dark'" class="h-5 w-5" />
        </button>
        <button class="text-gray-600 hover:text-gray-800">
          <help-circle-icon class="h-5 w-5" />
        </button>

        <!-- Profile -->
        <div
          class="h-8 w-8 cursor-pointer overflow-hidden rounded-full bg-orange-100"
        >
          <img
            src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?t=st=1741835586~exp=1741839186~hmac=8db5fa939f4300f9c92703847b463609c0c986557bae4d9295dbe79ce0fc9a83&w=740"
            alt="User avatar"
            class="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  </header>
</template>

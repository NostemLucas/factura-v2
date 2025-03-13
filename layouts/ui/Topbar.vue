<script setup lang="ts">
const { toggleDrawer } = useDashboard();
</script>

<template>
  <header class="flex flex-col border-b border-gray-200 bg-white">
    <div class="flex h-14 items-center justify-between px-4">
      <div class="flex items-center gap-2">
        <button class="p-1 lg:hidden" @click="toggleDrawer">
          <menu-icon class="h-5 w-5 text-gray-600" />
        </button>

        <div class="flex items-center gap-1">
          <span class="text-sm font-semibold text-gray-700">Codex</span>
        </div>
      </div>

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

      <div class="flex items-center gap-3">
        <button
          class="text-gray-600 hover:text-gray-800"
          @click="toggleNotifications"
        >
          <bell-icon class="h-5 w-5" />
        </button>
        <button class="text-gray-600 hover:text-gray-800" @click="openSettings">
          <settings-icon class="h-5 w-5" />
        </button>
        <button class="text-gray-600 hover:text-gray-800" @click="downloadData">
          <download-icon class="h-5 w-5" />
        </button>
        <button class="text-gray-600 hover:text-gray-800" @click="openHelp">
          <help-circle-icon class="h-5 w-5" />
        </button>
        <button class="text-gray-600 hover:text-gray-800" @click="toggleTheme">
          <circle-icon class="h-5 w-5" />
        </button>
        <div
          class="h-8 w-8 cursor-pointer overflow-hidden rounded-full bg-orange-100"
          @click="openProfile"
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WgQHB6tjxKdjwGHMcrAjRPUpwo8kbP.png"
            alt="User avatar"
            class="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>

    <div
      class="flex h-10 items-center border-t border-b border-gray-200 px-4 text-xs"
    >
      <div class="mr-2 flex items-center gap-1">
        <chevron-left-icon class="h-4 w-4 text-gray-500" />
      </div>

      <div class="flex items-center gap-1 text-gray-600">
        <file-icon class="h-4 w-4" />
        <span>File</span>
      </div>

      <chevron-right-icon class="mx-1 h-3 w-3 text-gray-400" />

      <div class="flex items-center gap-1 text-gray-600">
        <span>Export</span>
      </div>

      <div class="mx-2 h-4 border-r border-gray-300"></div>

      <div class="flex items-center gap-3">
        <button
          class="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-gray-600 hover:bg-gray-100"
          @click="shareDocument"
        >
          <share-icon class="h-3 w-3" />
          <span>Share</span>
        </button>

        <button
          class="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-gray-600 hover:bg-gray-100"
          @click="openChat"
        >
          <message-circle-icon class="h-3 w-3" />
          <span>Chat in Teams</span>
        </button>

        <button
          class="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-gray-600 hover:bg-gray-100"
          @click="getInsights"
        >
          <lightbulb-icon class="h-3 w-3" />
          <span>Get Insights</span>
        </button>

        <button
          class="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-gray-600 hover:bg-gray-100"
          @click="editDocument"
        >
          <edit-icon class="h-3 w-3" />
          <span>Edit</span>
        </button>

        <button
          class="flex items-center gap-1 rounded-md px-1 py-1 text-xs text-gray-600 hover:bg-gray-100"
          @click="openMoreMenu"
        >
          <more-horizontal-icon class="h-4 w-4" />
        </button>
      </div>

      <div class="ml-auto flex items-center gap-2">
        <button
          class="flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-xs text-white"
          @click="openCollaboration"
        >
          C
        </button>
        <div class="flex items-center rounded border border-gray-200">
          <button
            class="border-r border-gray-200 px-2 py-0.5 hover:bg-gray-100"
            @click="toggleView('list')"
          >
            <list-icon class="h-3 w-3 text-gray-600" />
          </button>
          <button
            class="border-r border-gray-200 px-2 py-0.5 hover:bg-gray-100"
            @click="toggleView('grid')"
          >
            <layout-grid-icon class="h-3 w-3 text-gray-600" />
          </button>
          <button
            class="px-2 py-0.5 hover:bg-gray-100"
            @click="toggleView('columns')"
          >
            <columns-icon class="h-3 w-3 text-gray-600" />
          </button>
        </div>
        <div class="flex items-center rounded border border-gray-200">
          <button
            class="border-r border-gray-200 px-2 py-0.5 hover:bg-gray-100"
            @click="zoomOut"
          >
            <minus-icon class="h-3 w-3 text-gray-600" />
          </button>
          <button class="px-2 py-0.5 hover:bg-gray-100" @click="zoomIn">
            <plus-icon class="h-3 w-3 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

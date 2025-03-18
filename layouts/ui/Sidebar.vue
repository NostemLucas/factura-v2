<script lang="ts"></script>

<template>
  <aside
    :class="[
      'fixed inset-y-0 left-0 z-30 flex flex-col transition-all duration-300 ease-in-out dark:bg-background border-r border-gray-800 bg-background border-r border-gray-100',
      isCollapsed ? 'w-[70px]' : 'w-64',
      isMobile
        ? isSidebarOpen
          ? 'translate-x-0 shadow-xl'
          : '-translate-x-full'
        : 'translate-x-0'
    ]"
  >
    <!-- Logo -->
    <div
      :class="[
        'flex items-center h-16 px-4 shrink-0 border-b dark:border-gray-800 border-gray-100'
      ]"
    >
      <div class="flex items-center space-x-3 overflow-hidden">
        <div
          :class="[
            'w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 bg-primary-500',
            isCollapsed ? 'scale-110' : '',
            'group-hover:rotate-3'
          ]"
        >
          <BarChart2Icon class="h-5 w-5 text-white" />
        </div>
        <span
          :class="[
            'text-lg font-semibold whitespace-nowrap transition-all duration-300 dark:text-white text-gray-800',
            isCollapsed
              ? 'opacity-0 -translate-x-10'
              : 'opacity-100 translate-x-0'
          ]"
        >
          CodeX
        </span>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto py-4 px-3">
      <div class="space-y-6">
        <div
          v-for="(section, sectionIndex) in navigation"
          :key="`section-${sectionIndex}`"
        >
          <!-- Section Title or Divider -->
          <div v-if="section.title" class="mb-2">
            <h3
              v-if="!isCollapsed"
              class="px-3 text-xs font-medium uppercase tracking-wider transition-opacity duration-200 dark:text-gray-400 text-gray-500"
            >
              {{ section.title }}
            </h3>
            <!-- Divider for collapsed mode -->
            <div
              v-if="isCollapsed && sectionIndex > 0"
              class="h-px w-10 mx-auto my-3 transition-all duration-300 dark:bg-gray-800 bg-gray-200"
            />
          </div>

          <div class="space-y-1">
            <button
              v-for="(item, itemIndex) in section.items"
              :key="`item-${sectionIndex}-${itemIndex}`"
              @click="setActiveItem(sectionIndex, itemIndex)"
              :class="[
                'group w-full flex items-center py-2 text-sm font-medium rounded-md transition-all duration-200 relative',
                isCollapsed ? 'justify-center px-2' : 'px-3',
                isActive(sectionIndex, itemIndex)
                  ? isDarkMode
                    ? 'text-blue-400 bg-gray-800/70 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-4/5 before:w-1 before:bg-blue-500 before:rounded-r-md'
                    : 'text-blue-600 bg-blue-50/70 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-4/5 before:w-1 before:bg-blue-600 before:rounded-r-md'
                  : isDarkMode
                    ? 'text-gray-300 hover:bg-gray-800/50 hover:text-gray-100'
                    : 'text-gray-700 hover:bg-gray-100/70 hover:text-gray-900'
              ]"
            >
              <component
                :is="item.icon"
                :class="[
                  'flex-shrink-0 h-5 w-5 transition-all duration-200',
                  isCollapsed ? 'mr-0' : 'mr-3',
                  isActive(sectionIndex, itemIndex)
                    ? isDarkMode
                      ? 'text-blue-400'
                      : 'text-blue-600'
                    : isDarkMode
                      ? 'text-gray-500 group-hover:text-gray-300'
                      : 'text-gray-400 group-hover:text-gray-500'
                ]"
              />

              <span
                :class="[
                  'whitespace-nowrap transition-all duration-300',
                  isCollapsed
                    ? 'opacity-0 w-0 overflow-hidden -translate-x-5'
                    : 'opacity-100 w-auto translate-x-0'
                ]"
              >
                {{ item.name }}
              </span>

              <span
                v-if="item.badge && !isCollapsed"
                :class="[
                  'ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium transition-all duration-200',
                  isActive(sectionIndex, itemIndex)
                    ? isDarkMode
                      ? 'bg-blue-500/80 text-white'
                      : 'bg-blue-600/80 text-white'
                    : isDarkMode
                      ? 'bg-gray-800 text-gray-300'
                      : 'bg-gray-100 text-gray-600'
                ]"
              >
                {{ item.badge }}
              </span>

              <span
                v-if="item.badge && isCollapsed"
                class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white transition-all duration-200 bg-primary-400 animate-pulse-once"
              >
                {{ item.badge }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- User Profile -->
    <div class="shrink-0 p-3 border-t dark:border-gray-800 border-gray-100">
      <div
        :class="[
          'flex items-center transition-all duration-300 rounded-lg group dark:hover:bg-gray-800 hover:bg-gray-100',
          isCollapsed ? ' ml-1' : 'justify-start p-2'
        ]"
      >
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dvSZhyStgm9DNolueaXK6QwebuDdl4.png"
          alt="User avatar"
          :class="[
            'h-9 w-9 rounded-full border-2 transition-all duration-300',
            isCollapsed
              ? 'border-blue-500'
              : 'dark:border-gray-700 border-gray-200 group-hover:border-blue-500'
          ]"
        />
        <div
          :class="[
            'ml-3 transition-all duration-300',
            isCollapsed
              ? 'opacity-0 w-0 overflow-hidden -translate-x-5'
              : 'opacity-100 w-auto translate-x-0'
          ]"
        >
          <p class="text-sm font-medium dark:text-white text-gray-800">
            Alex Johnson
          </p>
          <p class="text-xs dark:text-gray-400 text-gray-500">Data Analyst</p>
        </div>
      </div>
    </div>

    <!-- Collapse Toggle Button -->
    <button
      @click="toggleCollapse"
      :class="[
        'hidden md:flex absolute top-16 -right-4 h-8 w-8 items-center justify-center rounded-full shadow-md z-10 transition-all duration-300',
        isDarkMode
          ? 'bg-gray-800 text-gray-300 hover:text-blue-400 hover:bg-gray-700'
          : 'bg-white text-gray-500 hover:text-blue-600 hover:bg-gray-50',
        isCollapsed ? 'rotate-180' : ''
      ]"
      aria-label="Toggle sidebar collapse"
    >
      <ChevronLeftIcon class="h-4 w-4 transition-transform duration-300" />
    </button>
  </aside>
</template>

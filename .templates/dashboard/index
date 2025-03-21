<template>
  <div
    :class="'flex h-screen overflow-hidde dark:bg-background bg-gradient-to-br from-blue-50 to-indigo-50'"
  >
    <!-- Sidebar -->
    <aside
      :class="[
        'fixed inset-y-0 left-0 z-30 flex flex-col transition-all duration-300 ease-in-out border-r dark:border-gray-800 bg-background  border-gray-100',
        store.isCollapsed ? 'w-[70px]' : 'w-64',
        isMobile
          ? store.isOpenDrawer
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
              store.isCollapsed ? 'scale-110' : '',
              'group-hover:rotate-3'
            ]"
          >
            <BarChart2Icon class="h-5 w-5 text-white" />
          </div>
          <span
            :class="[
              'text-lg font-semibold whitespace-nowrap transition-all duration-300 dark:text-white text-gray-800',
              store.isCollapsed
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
                v-if="!store.isCollapsed"
                class="px-3 text-xs font-medium uppercase tracking-wider transition-opacity duration-200 dark:text-gray-400 text-gray-500"
              >
                {{ section.title }}
              </h3>
              <!-- Divider for collapsed mode -->
              <div
                v-if="store.isCollapsed && sectionIndex > 0"
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
                  store.isCollapsed ? 'justify-center px-2' : 'px-3',
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
                    store.isCollapsed ? 'mr-0' : 'mr-3',
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
                    store.isCollapsed
                      ? 'opacity-0 w-0 overflow-hidden -translate-x-5'
                      : 'opacity-100 w-auto translate-x-0'
                  ]"
                >
                  {{ item.name }}
                </span>

                <span
                  v-if="item.badge && !store.isCollapsed"
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
                  v-if="item.badge && store.isCollapsed"
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
            store.isCollapsed ? ' ml-1' : 'justify-start p-2'
          ]"
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dvSZhyStgm9DNolueaXK6QwebuDdl4.png"
            alt="User avatar"
            :class="[
              'h-9 w-9 rounded-full border-2 transition-all duration-300',
              store.isCollapsed
                ? 'border-blue-500'
                : 'dark:border-gray-700 border-gray-200 group-hover:border-blue-500'
            ]"
          />
          <div
            :class="[
              'ml-3 transition-all duration-300',
              store.isCollapsed
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
        @click="store.toggleCollapse(false)"
        :class="[
          'hidden md:flex absolute top-16 -right-4 h-8 w-8 items-center justify-center rounded-full shadow-md z-10 transition-all duration-300',
          isDarkMode
            ? 'bg-gray-800 text-gray-300 hover:text-blue-400 hover:bg-gray-700'
            : 'bg-white text-gray-500 hover:text-blue-600 hover:bg-gray-50',
          store.isCollapsed ? 'rotate-180' : ''
        ]"
        aria-label="Toggle sidebar collapse"
      >
        <ChevronLeftIcon class="h-4 w-4 transition-transform duration-300" />
      </button>
    </aside>

    <!-- Main Content Area -->
    <div
      :class="[
        'flex-1 flex flex-col transition-all duration-300 ease-in-out',
        isMobile ? 'ml-0' : store.isCollapsed ? 'ml-[70px]' : 'ml-64'
      ]"
    >
      <!-- Overlay for mobile -->
      <div
        v-if="store.isOpenDrawer && isMobile"
        @click="store.toggleDrawer()"
        class="fixed inset-0 bg-black/30 backdrop-blur-sm z-20 transition-opacity duration-300 ease-in-out"
      />

      <!-- Topbar -->
      <header
        :class="[
          'z-10 transition-all duration-300 sticky top-0',
          isDarkMode
            ? 'bg-gray-950/90 backdrop-blur-sm border-b border-gray-800'
            : 'bg-white/90 backdrop-blur-sm border-b border-gray-100'
        ]"
      >
        <!-- Main Topbar -->
        <div class="h-16 flex items-center justify-between px-4 md:px-6">
          <!-- Left side -->
          <div class="flex items-center">
            <!-- Mobile menu button -->
            <button
              @click="store.toggleDrawer()"
              :class="[
                'p-1.5 rounded-md transition-colors duration-200 md:hidden',
                isDarkMode
                  ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                  : 'text-gray-500 hover:text-blue-600 hover:bg-gray-100'
              ]"
              aria-label="Toggle sidebar"
            >
              <MenuIcon v-if="!store.isOpenDrawer" class="h-5 w-5" />
              <XIcon v-else class="h-5 w-5" />
            </button>

            <!-- Breadcrumb -->
            <div class="flex items-center ml-1 md:ml-0">
              <div class="flex items-center">
                <button
                  :class="[
                    'flex items-center font-medium transition-colors duration-200 rounded-md px-2 py-1',
                    isDarkMode
                      ? 'text-blue-400 hover:text-blue-300 hover:bg-gray-800/70'
                      : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50/70'
                  ]"
                >
                  <span class="hidden md:inline">ESG Indicators</span>
                  <span class="md:hidden">ESG</span>
                </button>

                <ChevronRightIcon
                  :class="[
                    'h-4 w-4 mx-2',
                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  ]"
                />

                <div class="flex items-center">
                  <div
                    :class="[
                      'flex items-center rounded-md px-2 py-1 text-sm transition-colors duration-200',
                      isDarkMode
                        ? 'bg-blue-600/90 text-white hover:bg-blue-700'
                        : 'bg-blue-600/90 text-white hover:bg-blue-700'
                    ]"
                  >
                    <CircleIcon class="h-3 w-3 mr-1.5" />
                    <span>General</span>
                    <ChevronDownIcon class="h-4 w-4 ml-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Center - Search -->
          <div class="hidden md:block max-w-md w-full mx-4 lg:mx-8 xl:mx-16">
            <div class="relative group">
              <input
                type="text"
                placeholder="Search"
                :class="[
                  'w-full h-9 pl-9 pr-4 rounded-md text-sm transition-all duration-200',
                  isDarkMode
                    ? 'bg-gray-800/70 text-gray-200 placeholder-gray-500 focus:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50'
                    : 'bg-gray-50/70 text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50'
                ]"
              />
              <SearchIcon
                :class="[
                  'h-4 w-4 absolute left-3 top-2.5 transition-colors duration-200',
                  isDarkMode
                    ? 'text-gray-500 group-focus-within:text-blue-400'
                    : 'text-gray-400 group-focus-within:text-blue-600'
                ]"
              />
            </div>
          </div>

          <!-- Right side -->
          <div class="flex items-center space-x-1 sm:space-x-2">
            <!-- Mobile search button -->
            <button
              :class="[
                'p-1.5 rounded-md transition-colors duration-200 md:hidden',
                isDarkMode
                  ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                  : 'text-gray-500 hover:text-blue-600 hover:bg-gray-100'
              ]"
            >
              <SearchIcon class="h-5 w-5" />
            </button>

            <!-- Theme toggle button -->
            <button
              @click="toggleDarkMode"
              :class="[
                'p-1.5 rounded-md transition-all duration-300',
                isDarkMode
                  ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-800 rotate-0'
                  : 'text-gray-500 hover:text-blue-600 hover:bg-gray-100 rotate-0'
              ]"
              aria-label="Toggle dark mode"
            >
              <SunIcon v-if="isDarkMode" class="h-5 w-5" />
              <MoonIcon v-else class="h-5 w-5" />
            </button>

            <!-- Notification button - always visible -->
            <button
              :class="[
                'p-1.5 rounded-md transition-colors duration-200 relative',
                isDarkMode
                  ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                  : 'text-gray-500 hover:text-blue-600 hover:bg-gray-100'
              ]"
            >
              <BellIcon class="h-5 w-5" />
              <span
                class="absolute top-0.5 right-0.5 h-2 w-2 rounded-full bg-red-500 animate-pulse"
              ></span>
            </button>

            <!-- Buttons visible based on screen size with responsive breakpoints -->
            <div class="hidden sm:block lg:hidden relative">
              <button
                @click="isMoreMenuOpen = !isMoreMenuOpen"
                :class="[
                  'p-1.5 rounded-md transition-colors duration-200 relative',
                  isDarkMode
                    ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                    : 'text-gray-500 hover:text-blue-600 hover:bg-gray-100'
                ]"
              >
                <MoreVerticalIcon class="h-5 w-5" />
              </button>

              <!-- More menu dropdown -->
              <div
                v-if="isMoreMenuOpen"
                :class="[
                  'absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-50',
                  isDarkMode
                    ? 'bg-gray-800 border border-gray-700'
                    : 'bg-white border border-gray-100'
                ]"
              >
                <button
                  @click="isMoreMenuOpen = false"
                  :class="[
                    'flex w-full items-center px-4 py-2 text-sm',
                    isDarkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  ]"
                >
                  <SettingsIcon class="h-4 w-4 mr-3" />
                  <span>Settings</span>
                </button>
                <button
                  @click="isMoreMenuOpen = false"
                  :class="[
                    'flex w-full items-center px-4 py-2 text-sm',
                    isDarkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  ]"
                >
                  <DownloadIcon class="h-4 w-4 mr-3" />
                  <span>Download</span>
                </button>
                <button
                  @click="isMoreMenuOpen = false"
                  :class="[
                    'flex w-full items-center px-4 py-2 text-sm',
                    isDarkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  ]"
                >
                  <HelpCircleIcon class="h-4 w-4 mr-3" />
                  <span>Help</span>
                </button>
              </div>
            </div>

            <!-- Buttons visible only on large screens -->
            <button
              :class="[
                'hidden lg:flex p-1.5 rounded-md transition-colors duration-200',
                isDarkMode
                  ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                  : 'text-gray-500 hover:text-blue-600 hover:bg-gray-100'
              ]"
            >
              <SettingsIcon class="h-5 w-5" />
            </button>

            <button
              :class="[
                'hidden lg:flex p-1.5 rounded-md transition-colors duration-200',
                isDarkMode
                  ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                  : 'text-gray-500 hover:text-blue-600 hover:bg-gray-100'
              ]"
            >
              <DownloadIcon class="h-5 w-5" />
            </button>

            <button
              :class="[
                'hidden lg:flex p-1.5 rounded-md transition-colors duration-200',
                isDarkMode
                  ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                  : 'text-gray-500 hover:text-blue-600 hover:bg-gray-100'
              ]"
            >
              <HelpCircleIcon class="h-5 w-5" />
            </button>

            <!-- User avatar with dropdown - always visible -->
            <div class="relative">
              <button
                @click="isUserMenuOpen = !isUserMenuOpen"
                class="ml-1 w-8 h-8 rounded-full overflow-hidden border-2 transition-all duration-200"
                :class="[
                  isDarkMode
                    ? isUserMenuOpen
                      ? 'border-blue-500 ring-2 ring-blue-500/30'
                      : 'border-gray-700 hover:border-blue-500'
                    : isUserMenuOpen
                      ? 'border-blue-500 ring-2 ring-blue-500/30'
                      : 'border-gray-200 hover:border-blue-500'
                ]"
              >
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dvSZhyStgm9DNolueaXK6QwebuDdl4.png"
                  alt="User avatar"
                  class="w-full h-full object-cover"
                />
              </button>

              <!-- User Dropdown Menu -->
              <div
                v-if="isUserMenuOpen"
                :class="[
                  'absolute right-0 mt-2 w-56 rounded-md shadow-lg py-1 z-50 transition-all duration-200 transform origin-top-right',
                  isDarkMode
                    ? 'bg-gray-800 border border-gray-700'
                    : 'bg-white border border-gray-100'
                ]"
              >
                <!-- User info -->
                <div
                  :class="[
                    'px-4 py-3',
                    isDarkMode
                      ? 'border-b border-gray-700'
                      : 'border-b border-gray-100'
                  ]"
                >
                  <p
                    :class="[
                      'text-sm font-medium',
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    ]"
                  >
                    Alex Johnson
                  </p>
                  <p
                    :class="[
                      'text-xs truncate',
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    ]"
                  >
                    alex.johnson@example.com
                  </p>
                </div>

                <!-- Menu items -->
                <button
                  @click="isUserMenuOpen = false"
                  :class="[
                    'flex w-full items-center px-4 py-2 text-sm transition-colors duration-200',
                    isDarkMode
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  ]"
                >
                  <UserIcon
                    :class="[
                      'h-4 w-4 mr-3',
                      isDarkMode ? 'text-gray-500' : 'text-gray-400'
                    ]"
                  />
                  <span>Your Profile</span>
                </button>

                <button
                  @click="isUserMenuOpen = false"
                  :class="[
                    'flex w-full items-center px-4 py-2 text-sm transition-colors duration-200',
                    isDarkMode
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  ]"
                >
                  <SettingsIcon
                    :class="[
                      'h-4 w-4 mr-3',
                      isDarkMode ? 'text-gray-500' : 'text-gray-400'
                    ]"
                  />
                  <span>Settings</span>
                </button>

                <button
                  @click="isUserMenuOpen = false"
                  :class="[
                    'flex w-full items-center px-4 py-2 text-sm transition-colors duration-200',
                    isDarkMode
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  ]"
                >
                  <DownloadIcon
                    :class="[
                      'h-4 w-4 mr-3',
                      isDarkMode ? 'text-gray-500' : 'text-gray-400'
                    ]"
                  />
                  <span>Downloads</span>
                </button>

                <button
                  @click="isUserMenuOpen = false"
                  :class="[
                    'flex w-full items-center px-4 py-2 text-sm transition-colors duration-200',
                    isDarkMode
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  ]"
                >
                  <HelpCircleIcon
                    :class="[
                      'h-4 w-4 mr-3',
                      isDarkMode ? 'text-gray-500' : 'text-gray-400'
                    ]"
                  />
                  <span>Help Center</span>
                </button>

                <div
                  :class="[
                    'border-t my-1',
                    isDarkMode ? 'border-gray-700' : 'border-gray-100'
                  ]"
                ></div>

                <button
                  @click="isUserMenuOpen = false"
                  :class="[
                    'flex w-full items-center px-4 py-2 text-sm transition-colors duration-200',
                    isDarkMode
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  ]"
                >
                  <LogOutIcon
                    :class="[
                      'h-4 w-4 mr-3',
                      isDarkMode ? 'text-gray-500' : 'text-gray-400'
                    ]"
                  />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Secondary Navbar -->
        <div
          :class="[
            'px-4 md:px-6 flex items-center h-12 overflow-x-auto hide-scrollbar border-t',
            isDarkMode
              ? 'bg-gray-900/50 border-gray-800'
              : 'bg-gray-50/50 border-gray-100'
          ]"
        >
          <div class="flex items-center space-x-1 min-w-max">
            <button
              :class="[
                'flex items-center px-3 py-1.5 text-sm rounded-md transition-colors duration-200',
                isDarkMode
                  ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              ]"
            >
              <FileIcon class="h-4 w-4 mr-2" />
              <span>File</span>
              <ChevronDownIcon class="h-4 w-4 ml-1" />
            </button>

            <button
              :class="[
                'flex items-center px-3 py-1.5 text-sm rounded-md transition-colors duration-200',
                isDarkMode
                  ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              ]"
            >
              <ExternalLinkIcon class="h-4 w-4 mr-2" />
              <span>Export</span>
              <ChevronDownIcon class="h-4 w-4 ml-1" />
            </button>

            <button
              :class="[
                'flex items-center px-3 py-1.5 text-sm rounded-md transition-colors duration-200',
                isDarkMode
                  ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              ]"
            >
              <ShareIcon class="h-4 w-4 mr-2" />
              <span>Share</span>
            </button>

            <button
              :class="[
                'hidden sm:flex items-center px-3 py-1.5 text-sm rounded-md transition-colors duration-200',
                isDarkMode
                  ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              ]"
            >
              <MessageSquareIcon class="h-4 w-4 mr-2" />
              <span>Chat in Teams</span>
            </button>

            <button
              :class="[
                'hidden md:flex items-center px-3 py-1.5 text-sm rounded-md transition-colors duration-200',
                isDarkMode
                  ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              ]"
            >
              <TrendingUpIcon class="h-4 w-4 mr-2" />
              <span>Get insights</span>
            </button>

            <button
              :class="[
                'flex items-center px-3 py-1.5 text-sm rounded-md transition-colors duration-200',
                isDarkMode
                  ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              ]"
            >
              <EditIcon class="h-4 w-4 mr-2" />
              <span>Edit</span>
            </button>

            <button
              :class="[
                'flex items-center px-2 py-1.5 text-sm rounded-md transition-colors duration-200',
                isDarkMode
                  ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              ]"
            >
              <MoreHorizontalIcon class="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <!-- Page content would go here -->
      <main
        :class="[
          'flex-1 overflow-auto transition-colors duration-300 p-4 md:p-6',
          isDarkMode ? 'bg-gray-950' : 'bg-white'
        ]"
      >
        <!-- Content placeholder -->
        <div class="max-w-7xl mx-auto">sample</div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, onBeforeUnmount } from 'vue'
import {
  BarChart2 as BarChart2Icon,
  Home as HomeIcon,
  Search as SearchIcon,
  Bell as BellIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  MoreHorizontal as MoreHorizontalIcon,
  MoreVertical as MoreVerticalIcon,
  ChevronRight as ChevronRightIcon,
  ChevronDown as ChevronDownIcon,
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
  X as XIcon,
  Settings as SettingsIcon,
  HelpCircle as HelpCircleIcon,
  File as FileIcon,
  ExternalLink as ExternalLinkIcon,
  MessageSquare as MessageSquareIcon,
  TrendingUp as TrendingUpIcon,
  Edit as EditIcon,
  Circle as CircleIcon,
  PlusCircle as PlusCircleIcon,
  Folder as FolderIcon,
  Database as DatabaseIcon,
  Activity as ActivityIcon,
  Award as AwardIcon,
  Users as UsersIcon,
  User as UserIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  Layers as LayersIcon,
  FileText as FileTextIcon,
  Grid as GridIcon,
  Power as PowerIcon,
  LogOut as LogOutIcon,
  Sun as SunIcon,
  Moon as MoonIcon
} from 'lucide-vue-next'
const store = useDashboard()
// Responsive state
const isMobile = ref(false)
const isUserMenuOpen = ref(false)
const isMoreMenuOpen = ref(false)
const isDarkMode = ref(false)

// Check if mobile on mount and on resize
onMounted(() => {
  checkIfMobile()
  window.addEventListener('resize', checkIfMobile)

  // Load saved states from localStorage if available
  const savedCollapsed = localStorage.getItem('sidebar-collapsed')
  if (savedCollapsed !== null) {
    store.toggleCollapse(savedCollapsed === 'true')
  }

  const savedDarkMode = localStorage.getItem('dark-mode')
  if (savedDarkMode !== null) {
    isDarkMode.value = savedDarkMode === 'true'
  } else {
    // Check system preference
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      isDarkMode.value = true
    }
  }

  // Close user menu when clicking outside
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkIfMobile)
  document.removeEventListener('click', handleClickOutside)
})

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const userMenu = document.querySelector('.relative')
  const moreMenu = document.querySelector('.hidden.sm\\:block.lg\\:hidden')

  if (
    userMenu &&
    !userMenu.contains(event.target as Node) &&
    isUserMenuOpen.value
  ) {
    isUserMenuOpen.value = false
  }

  if (
    moreMenu &&
    !moreMenu.contains(event.target as Node) &&
    isMoreMenuOpen.value
  ) {
    isMoreMenuOpen.value = false
  }
}

// Watch for changes to store.isCollapsed and save to localStorage
watch(
  () => store.isOpenDrawer,
  (newValue) => {
    localStorage.setItem('sidebar-collapsed', newValue.toString())
  }
)

// Watch for changes to isDarkMode and save to localStorage
watch(isDarkMode, (newValue) => {
  localStorage.setItem('dark-mode', newValue.toString())

  // Apply dark class to document for potential global styling
  if (newValue) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})

const checkIfMobile = () => {
  isMobile.value = window.innerWidth < 768
  if (isMobile.value) {
    store.toggleCollapse(false)
  }
}

// Toggle dark mode
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
}

// Active navigation state
const activeSection = ref(0)
const activeItem = ref(0)

// Set active item
const setActiveItem = (sectionIndex: number, itemIndex: number) => {
  activeSection.value = sectionIndex
  activeItem.value = itemIndex

  // On mobile, close sidebar after selection
  if (isMobile.value) {
    store.toggleDrawer(false)
  }
}

// Check if item is active
const isActive = (sectionIndex: number, itemIndex: number) => {
  return activeSection.value === sectionIndex && activeItem.value === itemIndex
}

// Navigation data
const navigation = reactive([
  {
    title: 'Home',
    items: [
      { name: 'Home', icon: HomeIcon, badge: null },
      { name: 'Create', icon: PlusCircleIcon, badge: null },
      { name: 'Browse', icon: FolderIcon, badge: null }
    ]
  },
  {
    title: 'Data',
    items: [
      { name: 'Data hub', icon: DatabaseIcon, badge: null },
      { name: 'Monitoring hub', icon: ActivityIcon, badge: null },
      { name: 'Metrics', icon: AwardIcon, badge: null }
    ]
  },
  {
    title: 'Workspaces',
    items: [
      { name: 'Workspaces', icon: GridIcon, badge: null },
      { name: 'My workspace', icon: UsersIcon, badge: null },
      { name: 'ESG Indicators', icon: BarChartIcon, badge: '3' }
    ]
  },
  {
    title: 'More',
    items: [
      { name: 'More...', icon: MoreHorizontalIcon, badge: null },
      { name: 'Power BI', icon: PowerIcon, badge: null }
    ]
  }
])
</script>

<style>
/* Hide scrollbar but keep functionality */
.hide-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}

/* Dark mode */
.dark {
  color-scheme: dark;
}

/* Animations */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* One-time pulse animation */
@keyframes pulse-once {
  0% {
    transform: scale(0.95);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-pulse-once {
  animation: pulse-once 0.5s ease-in-out;
}
</style>

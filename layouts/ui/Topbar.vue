<template>
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
          @click="toggleSidebar"
          :class="[
            'p-1.5 rounded-md transition-colors duration-200 md:hidden',
            isDarkMode
              ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
              : 'text-gray-500 hover:text-blue-600 hover:bg-gray-100'
          ]"
          aria-label="Toggle sidebar"
        >
          <MenuIcon v-if="!isSidebarOpen" class="h-5 w-5" />
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
</template>

<script lang="ts"></script>

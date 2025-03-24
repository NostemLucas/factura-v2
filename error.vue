<template>
  <div
    class="min-h-screen w-full bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center overflow-hidden relative"
  >
    <!-- Patrones decorativos-->
    <div
      class="absolute inset-0 overflow-hidden opacity-5 dark:opacity-10 pointer-events-none"
    >
      <div class="absolute top-0 left-0 w-full h-full bg-grid-pattern" />
    </div>

    <!-- Formas decorativas -->
    <div
      class="absolute -top-24 -right-24 w-96 h-96 bg-primary-500 opacity-10 rounded-full blur-3xl"
    />

    <div
      class="absolute -bottom-32 -left-32 w-96 h-96 bg-primary-600 opacity-10 rounded-full blur-3xl"
    />

    <div class="container max-w-6xl mx-auto px-6 py-12 relative z-10">
      <div
        class="flex flex-col md:flex-row items-center justify-between gap-12"
      >
        <!-- Contenido textual -->
        <div class="w-full lg:w-1/2 space-y-8">
          <div class="relative group">
            <div
              class="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600 dark:from-primary-300 dark:to-primary-500 animate-pulse-slow"
            >
              404
            </div>
            <div
              class="absolute -bottom-4 left-1 w-0 group-hover:w-full h-1 bg-gradient-to-r from-primary-400 to-transparent rounded-full transition-all duration-700 ease-in-out"
            />
            <div
              class="absolute -top-2 -left-4 text-[10rem] font-black text-primary-500/5 dark:text-primary-500/10 -z-10 select-none"
            >
              404
            </div>
          </div>

          <h1
            class="text-2xl md:text-3xl font-light leading-tight text-gray-800 dark:text-gray-200 transition-all duration-300"
          >
            <span class="font-medium border-b-2 border-primary-500 pb-1"
              >Lo sentimos</span
            >, no pudimos encontrar la página que estás buscando
          </h1>

          <p
            class="text-gray-600 dark:text-gray-400 max-w-lg backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            La página que intentas visitar puede haber sido movida, eliminada o
            temporalmente no disponible. Por favor, verifica la URL o regresa a
            la página principal.
          </p>

          <div class="flex flex-wrap gap-4 pt-4">
            <NuxtLink
              to="/"
              class="group px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 rounded-lg shadow-lg hover:shadow-primary-500/30 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
            >
              <span class="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 transition-transform duration-300 group-hover:rotate-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7m-14 0l2 2m0 0l7 7 7-7m-14 0l2-2"
                  />
                </svg>
                <span>Volver a Principal</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-0 w-0 group-hover:h-5 group-hover:w-5 transition-all duration-300 opacity-0 group-hover:opacity-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </NuxtLink>

            <button
              @click="goBack"
              class="group px-6 py-3 text-base font-medium text-primary-600 dark:text-primary-400 bg-white dark:bg-gray-800 border border-primary-200 dark:border-primary-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg shadow-sm transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
            >
              <span class="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Regresar
              </span>
            </button>
          </div>

          <!-- Contador de redirección -->
          <div
            v-if="showCountdown"
            class="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300"
          >
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Redirección a la página principal en
              <span class="font-bold text-primary-600 dark:text-primary-400">{{
                countdown
              }}</span>
              segundos...
              <button
                @click="cancelRedirect"
                class="ml-2 text-xs underline text-gray-500 hover:text-primary-500 transition-colors"
              >
                Cancelar
              </button>
            </p>
            <div
              class="w-full h-1 mt-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
            >
              <div
                class="h-full bg-primary-500 rounded-full transition-all duration-1000 ease-linear"
                :style="{ width: `${(10 - countdown) * 10}%` }"
              />
            </div>
          </div>
        </div>

        <!-- Ilustración con efectos -->
        <div class="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div class="relative group perspective-1000">
            <div
              class="transition-all duration-500 transform group-hover:rotate-y-6 group-hover:scale-105"
            >
              <NuxtImg
                src="/404-ligth.svg"
                class="dark:hidden max-w-full h-auto drop-shadow-xl"
                alt="Página no encontrada"
                loading="eager"
              />
              <NuxtImg
                src="/404-dark.svg"
                class="hidden dark:block max-w-full h-auto drop-shadow-xl"
                alt="Página no encontrada"
                loading="eager"
              />

              <!-- Efecto de brillo en hover -->
              <div
                class="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-primary-500/0 via-primary-500/20 to-primary-500/0 transition-opacity duration-700 pointer-events-none"
              />

              <!-- Efecto de sombra -->
              <div
                class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-4/5 h-8 bg-black/20 dark:bg-black/40 blur-xl rounded-full scale-x-110 transition-all duration-500 group-hover:scale-x-125"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Pie de página con información adicional -->
      <div class="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div
          class="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-400"
        >
          <p>
            © {{ new Date().getFullYear() }} Codex. Todos los derechos
            reservados.
          </p>
          <div class="flex gap-6">
            <a href="#" class="hover:text-primary-500 transition-colors"
              >Ayuda</a
            >
            <a href="#" class="hover:text-primary-500 transition-colors"
              >Contacto</a
            >
            <a href="#" class="hover:text-primary-500 transition-colors"
              >Mapa del sitio</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

// Tipos
type CountdownTimer = ReturnType<typeof setInterval> | null

// Estado reactivo
const countdown = ref<number>(10)
const showCountdown = ref<boolean>(true)
let countdownTimer: CountdownTimer = null

// Métodos
const startCountdown = (): void => {
  countdownTimer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      if (countdownTimer) clearInterval(countdownTimer)
      window.location.href = '/'
    }
  }, 1000)
}

const cancelRedirect = (): void => {
  if (countdownTimer) clearInterval(countdownTimer)
  showCountdown.value = false
}

const goBack = (): void => {
  window.history.length > 1
    ? window.history.go(-1)
    : (window.location.href = '/')
}

// Hooks de ciclo de vida
onMounted(() => {
  startCountdown()
})

onBeforeUnmount(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer)
  }
})
</script>
<style scoped>
.animate-pulse-slow {
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.perspective-1000 {
  perspective: 1000px;
}

.rotate-y-6 {
  transform: rotateY(6deg);
}

.bg-grid-pattern {
  background-image:
    linear-gradient(to right, rgba(128, 128, 128, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(128, 128, 128, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
}
</style>

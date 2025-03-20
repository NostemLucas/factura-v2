<template>
  <div
    class="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500 relative"
  >
    <!-- Patrones de fondo mejorados - diferentes para modo claro y oscuro -->
    <div
      class="absolute inset-0 overflow-hidden pointer-events-none h-full w-full"
    >
      <!-- Gradient base layer -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-900 dark:via-blue-950 dark:to-slate-950 transition-colors duration-500"
      ></div>

      <!-- Light mode pattern - Geometric shapes -->
      <div
        class="absolute inset-0 opacity-20 dark:opacity-0 transition-opacity duration-500"
      >
        <!-- Hexagon grid pattern -->
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          class="absolute inset-0"
        >
          <defs>
            <pattern
              id="hexagons"
              width="50"
              height="43.4"
              patternUnits="userSpaceOnUse"
              patternTransform="scale(2)"
            >
              <path
                d="M25,0 L50,14.4 L50,38.4 L25,51.7 L0,38.4 L0,14.4 Z"
                fill="none"
                stroke="currentColor"
                stroke-width="0.5"
                class="text-blue-500"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>

        <!-- Decorative elements -->
        <div class="absolute top-0 right-0 w-1/3 h-1/3 opacity-30">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#4B91F1"
              d="M40.8,-69.7C51.9,-61.3,59.5,-47.7,65.6,-33.8C71.7,-19.9,76.3,-5.7,74.8,7.9C73.3,21.5,65.8,34.5,56.1,45.3C46.4,56.1,34.5,64.7,20.7,70.1C6.9,75.5,-8.8,77.7,-22.9,73.5C-37,69.3,-49.5,58.7,-59.3,46.1C-69.1,33.5,-76.2,18.8,-77.4,3.5C-78.6,-11.9,-73.9,-28,-64.7,-40.5C-55.5,-53,-41.8,-61.9,-28.3,-68.9C-14.8,-75.9,-1.5,-81.1,12.2,-79.8C25.8,-78.5,29.7,-78.1,40.8,-69.7Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>

        <div class="absolute bottom-0 left-0 w-1/2 h-1/2 opacity-20">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#4B91F1"
              d="M47.7,-79.9C62.4,-72.2,75.2,-60.3,83.1,-45.7C91,-31.1,94,-13.8,92.1,2.8C90.3,19.3,83.6,35.1,73.4,48.1C63.2,61.1,49.5,71.3,34.4,77.7C19.3,84.1,2.8,86.7,-13.8,84.9C-30.4,83.1,-47.1,76.9,-60.3,65.9C-73.5,54.9,-83.2,39.1,-87.8,21.9C-92.4,4.7,-91.9,-13.8,-85.2,-29.4C-78.5,-45,-65.6,-57.6,-50.9,-65.3C-36.2,-73,-18.1,-75.8,-0.6,-74.9C16.9,-74,33.1,-87.5,47.7,-79.9Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
      </div>

      <!-- Dark mode pattern - Professional abstract elements -->
      <div
        class="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-500"
      >
        <!-- Subtle grid -->
        <div
          class="absolute inset-0"
          style="
            background-image:
              linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px),
              linear-gradient(
                to right,
                rgba(59, 130, 246, 0.05) 1px,
                transparent 1px
              );
            background-size: 40px 40px;
          "
        ></div>

        <!-- Glowing orbs -->
        <div class="absolute inset-0">
          <div
            v-for="i in 15"
            :key="i + '-orbs'"
            class="absolute rounded-full bg-blue-500/10 blur-xl"
            :style="{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: `${Math.random() * 0.15 + 0.05}`,
              transform: `scale(${Math.random() * 1 + 0.5})`
            }"
          ></div>
        </div>

        <!-- Professional accent lines -->
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          class="absolute inset-0 opacity-10"
        >
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                style="stop-color: rgb(59, 130, 246); stop-opacity: 0.3"
              />
              <stop
                offset="100%"
                style="stop-color: rgb(59, 130, 246); stop-opacity: 0"
              />
            </linearGradient>
          </defs>
          <line
            x1="0"
            y1="0"
            x2="100%"
            y2="100%"
            stroke="url(#grad1)"
            stroke-width="1"
          />
          <line
            x1="20%"
            y1="0"
            x2="100%"
            y2="80%"
            stroke="url(#grad1)"
            stroke-width="0.8"
          />
          <line
            x1="40%"
            y1="0"
            x2="100%"
            y2="60%"
            stroke="url(#grad1)"
            stroke-width="0.6"
          />
          <line
            x1="60%"
            y1="0"
            x2="100%"
            y2="40%"
            stroke="url(#grad1)"
            stroke-width="0.4"
          />
          <line
            x1="80%"
            y1="0"
            x2="100%"
            y2="20%"
            stroke="url(#grad1)"
            stroke-width="0.2"
          />

          <line
            x1="100%"
            y1="0"
            x2="0"
            y2="100%"
            stroke="url(#grad1)"
            stroke-width="1"
          />
          <line
            x1="80%"
            y1="0"
            x2="0"
            y2="80%"
            stroke="url(#grad1)"
            stroke-width="0.8"
          />
          <line
            x1="60%"
            y1="0"
            x2="0"
            y2="60%"
            stroke="url(#grad1)"
            stroke-width="0.6"
          />
          <line
            x1="40%"
            y1="0"
            x2="0"
            y2="40%"
            stroke="url(#grad1)"
            stroke-width="0.4"
          />
          <line
            x1="20%"
            y1="0"
            x2="0"
            y2="20%"
            stroke="url(#grad1)"
            stroke-width="0.2"
          />
        </svg>

        <!-- Subtle particles -->

        <div class="particles-container">
          <div
            v-for="n in 30"
            :key="`particle-${n}`"
            class="particle"
            :style="{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              opacity: Math.random() * 0.3 + 0.1,
              animationDuration: `${Math.random() * 20 + 10}s`,
              animationDelay: `${Math.random() * 5}s`
            }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Dark mode glow effect -->
    <div
      class="absolute inset-0 overflow-hidden pointer-events-none dark:block hidden"
    >
      <div
        class="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-primary-500/10 blur-[100px]"
      ></div>
      <div
        class="absolute bottom-1/3 right-1/3 w-1/3 h-1/3 rounded-full bg-primary-600/10 blur-[80px]"
      ></div>
    </div>
    <!-- Contenido principal -->
    <div class="flex-grow flex items-center justify-center p-4 relative z-10">
      <div class="w-full max-w-md flex flex-col items-center">
        <!-- Logo SVG with animation -->
        <div class="mb-8 flex items-center justify-center gap-3">
          <!-- SVG Logo con efecto de brillo -->
          <div class="h-full -w-full flex items-center justify-center">
            <!-- SVG Logo with transparent cutouts -->
            <svg
              width="80"
              height="80"
              viewBox="0 0 400 400"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <mask id="barsMask">
                  <rect width="400" height="400" fill="white" />
                  <rect x="80" y="240" width="60" height="100" fill="black" />
                  <rect x="170" y="180" width="60" height="160" fill="black" />
                  <rect x="260" y="120" width="60" height="220" fill="black" />
                </mask>
              </defs>
              <rect
                width="400"
                height="400"
                rx="40"
                fill="currentColor"
                class="text-primary-500"
                mask="url(#barsMask)"
              />
            </svg>
          </div>
          <div class="flex items-center">
            <div class="flex flex-col">
              <span class="text-6xl font-bold text-foreground tracking-wider"
                >Code</span
              >
              <span
                class="text-lg font-extralight tracking-wider text-transparent bg-clip-text gradient-text"
                >Software</span
              >
            </div>
            <span
              class="text-foreground text-8xl l font-bold ml-1 h-full flex items-center"
              >X</span
            >
          </div>
        </div>

        <!-- Card de login -->
        <div
          class="w-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden transition-all duration-500 border border-gray-100 dark:border-gray-700 dark:shadow-glow"
        >
          <!-- Barra superior con animación de gradiente -->
          <div class="h-2 gradient-bar" />

          <div class="p-8">
            <!-- Header con toggle de tema -->
            <div class="flex justify-end items-center mb-6">
              <!-- Toggle Dark/Light Mode con animación mejorada -->
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
                  <sun-icon
                    v-if="colorMode.value === 'dark'"
                    class="h-5 w-5 text-yellow-400 absolute top-0 left-0 transform rotate-0 transition-all duration-300 opacity-100 scale-100"
                  />
                  <moon-icon
                    v-else
                    class="h-5 w-5 text-indigo-600 absolute top-0 left-0 transform rotate-0 transition-all duration-300 opacity-100 scale-100"
                  />
                </div>
              </button>
            </div>

            <!-- Título -->
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Iniciar Sesión
            </h1>
            <p class="text-gray-500 dark:text-gray-400 mb-6">
              Ingresa tus credenciales para continuar
            </p>

            <!-- Formulario -->
            <Form
              @submit="onSubmit"
              :validation-schema="schema"
              v-slot="{ errors, isSubmitting }"
              :initial-values="{ username: '', password: '' }"
            >
              <div class="space-y-5">
                <!-- Campo de usuario -->
                <div>
                  <label
                    for="username"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Nombre de usuario
                  </label>
                  <div
                    class="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500 transition-all duration-300"
                    :class="{
                      'ring-2 ring-red-500 border-red-500': errors.username
                    }"
                  >
                    <div
                      class="bg-gray-50 dark:bg-gray-700 px-3 py-2.5 flex items-center"
                    >
                      <user-icon
                        class="h-5 w-5 text-gray-500 dark:text-gray-400"
                      />
                    </div>
                    <Field
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Nombre de Usuario"
                      class="flex-grow px-3 py-2.5 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300"
                    />
                  </div>
                  <span
                    v-if="errors.username"
                    class="text-xs text-red-500 dark:text-red-400 mt-1 block"
                    >{{ errors.username }}</span
                  >
                </div>

                <!-- Campo de contraseña -->
                <div>
                  <label
                    for="password"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Contraseña
                  </label>
                  <div
                    class="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500 transition-all duration-300"
                    :class="{
                      'ring-2 ring-red-500 border-red-500': errors.password
                    }"
                  >
                    <div
                      class="bg-gray-50 dark:bg-gray-700 px-3 py-2.5 flex items-center"
                    >
                      <lock-icon
                        class="h-5 w-5 text-gray-500 dark:text-gray-400"
                      />
                    </div>
                    <Field
                      id="password"
                      name="password"
                      :type="showPassword ? 'text' : 'password'"
                      placeholder="Contraseña"
                      class="flex-grow px-3 py-2.5 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300"
                    />
                    <button
                      type="button"
                      @click="showPassword = !showPassword"
                      class="px-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
                      :aria-label="
                        showPassword
                          ? 'Ocultar contraseña'
                          : 'Mostrar contraseña'
                      "
                    >
                      <eye-icon
                        v-if="showPassword"
                        class="h-5 w-5 text-gray-500 dark:text-gray-400"
                      />
                      <eye-off-icon
                        v-else
                        class="h-5 w-5 text-gray-500 dark:text-gray-400"
                      />
                    </button>
                  </div>
                  <span
                    v-if="errors.password"
                    class="text-xs text-red-500 dark:text-red-400 mt-1 block"
                    >{{ errors.password }}</span
                  >
                </div>

                <!-- Recordar sesión y enlace de ayuda -->
                <div class="flex justify-between items-center">
                  <label class="flex items-center space-x-3 custom-checkbox">
                    <div class="relative">
                      <input
                        type="checkbox"
                        v-model="rememberMe"
                        class="sr-only"
                      />
                      <div
                        class="checkbox-bg w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded transition-colors duration-200 flex items-center justify-center"
                        :class="{
                          'bg-primary-500 border-primary-500 dark:bg-primary-600 dark:border-primary-600 checkbox-active':
                            rememberMe
                        }"
                      >
                        <svg
                          class="w-3 h-3 text-white"
                          :class="{
                            'opacity-100 check-animation': rememberMe,
                            'opacity-0': !rememberMe
                          }"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="3"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <span
                      class="text-sm text-gray-600 dark:text-gray-300 select-none"
                    >
                      Recordarme
                    </span>
                  </label>
                  <a
                    href="#"
                    class="text-sm text-primary-600 dark:text-primary-400 hover:underline transition-colors duration-300"
                    >¿Necesitas ayuda?</a
                  >
                </div>

                <!-- Botón de login con animación -->
                <button
                  type="submit"
                  class="w-full py-2.5 px-4 bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 transition-all duration-300 flex items-center justify-center login-button"
                  :disabled="isSubmitting"
                >
                  <loader-icon
                    v-if="isSubmitting"
                    class="animate-spin h-5 w-5 mr-2"
                  />
                  Iniciar Sesión
                </button>

                <!-- Separador -->
                <div class="relative my-6">
                  <div class="absolute inset-0 flex items-center">
                    <div
                      class="w-full border-t border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  <div class="relative flex justify-center text-sm">
                    <span
                      class="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                    >
                      o contáctanos vía
                    </span>
                  </div>
                </div>

                <!-- Botones de contacto con colores de marca -->
                <div class="grid grid-cols-2 gap-3">
                  <a
                    href="mailto:contact@synergy.com"
                    class="py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-300 flex items-center justify-center hover:-translate-y-1 hover:shadow-md group"
                  >
                    <mail-icon
                      class="h-5 w-5 mr-2 text-red-600 group-hover:text-red-700"
                    />
                    <span class="text-sm text-red-600 group-hover:text-red-700"
                      >Gmail</span
                    >
                  </a>
                  <a
                    href="https://wa.me/1234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 hover:bg-green-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-300 flex items-center justify-center hover:-translate-y-1 hover:shadow-md group"
                  >
                    <message-circle-icon
                      class="h-5 w-5 mr-2 text-green-600 group-hover:text-green-700"
                    />
                    <span
                      class="text-sm text-green-600 group-hover:text-green-700"
                      >WhatsApp</span
                    >
                  </a>
                </div>

                <!-- Enlace para crear cuenta -->
                <div
                  class="text-center text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300 mt-4"
                >
                  ¿No tienes una cuenta?
                  <a
                    href="#"
                    class="text-primary-600 dark:text-primary-400 hover:underline transition-colors duration-300 font-medium"
                    >Prueba la versión gratuita</a
                  >
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer
      class="py-4 px-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300 relative z-10"
    >
      <div class="container mx-auto">
        <div
          class="flex flex-col md:flex-row flex-wrap justify-center md:justify-between items-center text-sm text-gray-600 dark:text-gray-300 gap-y-4 transition-colors duration-300"
        >
          <div class="flex items-center space-x-2">
            <a
              href="#"
              class="hover:text-primary-600 dark:hover:text-primary-400 flex items-center transition-colors duration-300"
            >
              SynergySoft.com
              <external-link-icon class="h-4 w-4 ml-1" />
            </a>
          </div>

          <div class="flex flex-wrap justify-center gap-x-4 gap-y-2">
            <a
              href="#"
              class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
              >Galileo</a
            >
            <a
              href="#"
              class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
              >Gestión de almacenes</a
            >
            <a
              href="#"
              class="hover:text-primary-600 dark:hover:text-primary-400 flex items-center transition-colors duration-300"
            >
              Codex Mobile
              <span class="ml-1 flex">
                <apple-icon class="h-4 w-4 text-gray-600 dark:text-gray-400" />
                <smartphone-icon
                  class="h-4 w-4 ml-1 text-gray-600 dark:text-gray-400"
                />
              </span>
            </a>
            <a
              href="#"
              class="hover:text-primary-600 dark:hover:text-primary-400 flex items-center transition-colors duration-300"
            >
              Galileo Mobile
              <span class="ml-1 flex">
                <apple-icon class="h-4 w-4 text-gray-600 dark:text-gray-400" />
                <smartphone-icon
                  class="h-4 w-4 ml-1 text-gray-600 dark:text-gray-400"
                />
              </span>
            </a>
            <a
              href="#"
              class="hover:text-primary-600 dark:hover:text-primary-400 flex items-center transition-colors duration-300"
            >
              Codex
              <span
                class="ml-1 text-xs bg-primary-600 dark:bg-primary-700 text-white px-1.5 py-0.5 rounded-full"
                >NUEVO</span
              >
            </a>
          </div>

          <div class="flex flex-wrap justify-center gap-x-2">
            <a
              href="#"
              class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
              >Contáctanos</a
            >
            <span class="text-gray-400 dark:text-gray-500">|</span>
            <a
              href="#"
              class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
              >Sobre nuestra Plataforma</a
            >
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Form, Field } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useAuthStore } from '~/stores/auth'
import {
  User as UserIcon,
  Lock as LockIcon,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
  Sun as SunIcon,
  Moon as MoonIcon,
  ExternalLink as ExternalLinkIcon,
  Smartphone as SmartphoneIcon,
  Loader as LoaderIcon,
  Mail as MailIcon,
  MessageCircle as MessageCircleIcon,
  Apple as AppleIcon
} from 'lucide-vue-next'

// Estado y configuración
const authStore = useAuthStore()
const colorMode = useColorMode()
const showPassword = ref(false)
const rememberMe = ref(false)

const toggleTheme = () => {
  // Añadir clase para la animación
  document.body.classList.add('theme-transition')

  // Cambiar el tema
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'

  // Eliminar la clase después de la transición
  setTimeout(() => {
    document.body.classList.remove('theme-transition')
  }, 500)
}

// Esquema de validación en español
const schema = computed(() => {
  return toTypedSchema(
    z.object({
      username: z.string().min(1, 'El nombre de usuario es requerido'),
      password: z
        .string()
        .min(1, 'La contraseña es requerida')
        .min(5, 'La contraseña debe tener al menos 6 caracteres')
    })
  )
})

// Función para manejar el envío del formulario
const onSubmit = async (values: any) => {
  try {
    // Simulamos un tiempo de carga
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Añadimos el estado de "recordarme"
    const loginData = {
      ...values,
      rememberMe: rememberMe.value
    }

    await authStore.login(loginData)
  } catch (error) {
    console.error('Error al iniciar sesión:', error)
  }
}

definePageMeta({
  layout: 'loading'
})
</script>

<style>
/* Enhanced checkbox styles */
.custom-checkbox .checkbox-bg {
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background-color 0.2s,
    border-color 0.2s,
    transform 0.2s;
}

.checkbox-active {
  transform: scale(1.05);
}

.check-animation {
  animation: checkmark 0.3s ease-in-out forwards;
}

@keyframes checkmark {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
.particle {
  position: absolute;
  background-color: rgba(59, 130, 246, 0.5);
  border-radius: 50%;
  animation: float 15s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) translateX(0);
  }
  25% {
    transform: translateY(-20px) translateX(10px);
  }
  50% {
    transform: translateY(-10px) translateX(20px);
  }
  75% {
    transform: translateY(10px) translateX(-10px);
  }
}

.particles-container {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

input[type='password']::-ms-reveal,
input[type='password']::-ms-clear {
  display: none;
}
</style>

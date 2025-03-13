<template>
  <div
    class="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500 relative"
  >
    <!-- Patrones de fondo con -->
    <div
      class="absolute inset-0 overflow-hidden pointer-events-none opacity-10 dark:opacity-5 h-full w-full"
    >
      <div
        v-for="i in 10"
        :key="i"
        class="absolute rounded-full bg-pattern"
        :style="{
          width: `${Math.random() * 300 + 50}px`,
          height: `${Math.random() * 300 + 50}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,

          opacity: Math.random() * 0.5 + 0.1,
          transform: `scale(${Math.random() * 1 + 0.5})`,
          filter: 'blur(40px)',
          '--index': i,
          animationDelay: `${i * 0.5}s`
        }"
      >
        asas
      </div>
    </div>

    <!-- Contenido principal -->
    <div class="flex-grow flex items-center justify-center p-4 relative z-10">
      <div class="w-full max-w-md flex flex-col items-center">
        <!-- Logo con animación de pulso -->
        <div class="mb-4 flex justify-center">
          <div
            class="h-20 w-170 bg-white dark:bg-gray-700 rounded-full shadow-lg p-4 flex items-center justify-center logo-pulse"
          >
            <img src="/logo.png" alt="Logo" class="h-16" />
          </div>
        </div>

        <!-- Card de login -->
        <div
          class="w-full bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden transition-all duration-500 transform hover:scale-[1.01]"
        >
          <!-- Barra superior con animación de gradiente -->
          <div class="h-1.5 gradient-bar"></div>

          <div class="p-8">
            <!-- Header con toggles -->
            <div class="flex justify-between items-center mb-6">
              <!-- Selector de idioma -->
              <div
                class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400"
              >
                <span>ES</span>
                <button
                  class="w-8 h-4 bg-gray-200 dark:bg-gray-700 rounded-full relative transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  @click="toggleLanguage"
                >
                  <span
                    class="absolute top-0.5 left-0.5 w-3 h-3 bg-primary-500 rounded-full transition-transform duration-300"
                    :class="{ 'translate-x-4': language === 'en' }"
                  ></span>
                </button>
                <span>EN</span>
              </div>

              <!-- Toggle Dark/Light Mode con animación mejorada -->
              <button
                type="button"
                @click="toggleTheme"
                class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300 theme-toggle"
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
              {{ language === 'es' ? 'Iniciar Sesión' : 'Login' }}
            </h1>
            <p class="text-gray-500 dark:text-gray-400 mb-6">
              {{
                language === 'es'
                  ? 'Ingresa tus credenciales para continuar'
                  : 'Enter your credentials to continue'
              }}
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
                    {{ language === 'es' ? 'Nombre de usuario' : 'Username' }}
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
                      :placeholder="
                        language === 'es' ? 'Nombre de Usuario' : 'Username'
                      "
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
                    {{ language === 'es' ? 'Contraseña' : 'Password' }}
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
                      :placeholder="
                        language === 'es' ? 'Contraseña' : 'Password'
                      "
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
                  <label class="flex items-center">
                    <input
                      type="checkbox"
                      v-model="rememberMe"
                      class="rounded- border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                    />
                    <span class="ml-2 text-sm text-gray-600 dark:text-gray-300">
                      {{ language === 'es' ? 'Recordarme' : 'Remember me' }}
                    </span>
                  </label>
                  <a
                    href="#"
                    class="text-sm text-primary-600 dark:text-primary-400 hover:underline transition-colors duration-300"
                    >{{
                      language === 'es' ? '¿Necesitas ayuda?' : 'Need help?'
                    }}</a
                  >
                </div>

                <!-- Botón de login con animación -->
                <button
                  type="submit"
                  class="w-full py-2.5 px-4 bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 transition-all duration-300 flex items-center justify-center login-button"
                  :disabled="isSubmitting"
                >
                  <loader-icon
                    v-if="isSubmitting"
                    class="animate-spin h-5 w-5 mr-2"
                  />
                  {{ language === 'es' ? 'Iniciar Sesión' : 'Login' }}
                </button>

                <!-- Separador -->
                <div class="relative my-6">
                  <div class="absolute inset-0 flex items-center">
                    <div
                      class="w-full border-t border-gray-300 dark:border-gray-600"
                    ></div>
                  </div>
                  <div class="relative flex justify-center text-sm">
                    <span
                      class="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                    >
                      {{
                        language === 'es'
                          ? 'o contáctanos vía'
                          : 'or contact us via'
                      }}
                    </span>
                  </div>
                </div>

                <!-- Botones de contacto -->
                <div class="grid grid-cols-2 gap-3">
                  <a
                    href="mailto:contact@synergy.com"
                    class="py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 transition-all duration-300 flex items-center justify-center contact-button"
                  >
                    <mail-icon class="h-5 w-5 mr-2 text-red-500" />
                    <span class="text-sm">Gmail</span>
                  </a>
                  <a
                    href="https://wa.me/1234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 transition-all duration-300 flex items-center justify-center contact-button"
                  >
                    <message-circle-icon class="h-5 w-5 mr-2 text-green-500" />
                    <span class="text-sm">WhatsApp</span>
                  </a>
                </div>

                <!-- Enlace para crear cuenta -->
                <div
                  class="text-center text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300 mt-4"
                >
                  {{
                    language === 'es'
                      ? '¿No tienes una cuenta?'
                      : "Don't have an account?"
                  }}
                  <a
                    href="#"
                    class="text-primary-600 dark:text-primary-400 hover:underline transition-colors duration-300 font-medium"
                    >{{
                      language === 'es'
                        ? 'Prueba la versión gratuita'
                        : 'Try the free trial'
                    }}</a
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
              >{{ language === 'es' ? 'Galileo' : 'Galileo' }}</a
            >
            <a
              href="#"
              class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
              >{{
                language === 'es'
                  ? 'Gestión de almacenes'
                  : 'Warehouse Management'
              }}</a
            >
            <a
              href="#"
              class="hover:text-primary-600 dark:hover:text-primary-400 flex items-center transition-colors duration-300"
            >
              {{ language === 'es' ? 'Codex Mobile' : 'Codex Mobile' }}
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
              {{ language === 'es' ? 'Galileo Mobile' : 'Galileo Mobile' }}
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
                >{{ language === 'es' ? 'NUEVO' : 'NEW' }}</span
              >
            </a>
          </div>

          <div class="flex flex-wrap justify-center gap-x-2">
            <a
              href="#"
              class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
              >{{ language === 'es' ? 'Contáctanos' : 'Contact Us' }}</a
            >
            <span class="text-gray-400 dark:text-gray-500">|</span>
            <a
              href="#"
              class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
              >{{
                language === 'es'
                  ? 'Sobre nuestra Plataforma'
                  : 'About our Platform'
              }}</a
            >
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineComponent, h } from 'vue'
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
  MessageCircle as MessageCircleIcon
} from 'lucide-vue-next'
import { Apple as AppleIcon } from 'lucide-vue-next'

// Componentes personalizados para iconos de redes sociales
const GoogleIcon = defineComponent({
  setup() {
    return () =>
      h(
        'svg',
        {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 24 24',
          fill: 'currentColor',
          class: 'w-5 h-5 text-gray-700 dark:text-gray-300'
        },
        [
          h('path', {
            d: 'M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z',
            fill: '#4285F4'
          }),
          h('path', {
            d: 'M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z',
            fill: '#34A853'
          }),
          h('path', {
            d: 'M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z',
            fill: '#FBBC05'
          }),
          h('path', {
            d: 'M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z',
            fill: '#EA4335'
          })
        ]
      )
  }
})

const MicrosoftIcon = defineComponent({
  setup() {
    return () =>
      h(
        'svg',
        {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 23 23',
          fill: 'none',
          class: 'w-5 h-5'
        },
        [
          h('path', { d: 'M1 1h10v10H1V1z', fill: '#F25022' }),
          h('path', { d: 'M12 1h10v10H12V1z', fill: '#7FBA00' }),
          h('path', { d: 'M1 12h10v10H1V12z', fill: '#00A4EF' }),
          h('path', { d: 'M12 12h10v10H12V12z', fill: '#FFB900' })
        ]
      )
  }
})

// Estado y configuración
const authStore = useAuthStore()
//
const colorMode = useColorMode()
const showPassword = ref(false)
const rememberMe = ref(false)
const language = ref('es') // 'es' para español, 'en' para inglés

// Función para cambiar el tema con animación
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

// Función para cambiar el idioma
const toggleLanguage = () => {
  language.value = language.value === 'es' ? 'en' : 'es'
}

// Esquema de validación dinámico basado en el idioma
const schema = computed(() => {
  return toTypedSchema(
    z.object({
      username: z
        .string()
        .min(
          1,
          language.value === 'es'
            ? 'El nombre de usuario es requerido'
            : 'Username is required'
        ),
      password: z
        .string()
        .min(
          1,
          language.value === 'es'
            ? 'La contraseña es requerida'
            : 'Password is required'
        )
        .min(
          5,
          language.value === 'es'
            ? 'La contraseña debe tener al menos 6 caracteres'
            : 'Password must be at least 6 characters'
        )
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

    // Mostrar notificación de éxito (si tienes un sistema de notificaciones)
    // toast.success(language.value === 'es' ? 'Inicio de sesión exitoso' : 'Login successful');
  } catch (error) {
    console.error(
      language.value === 'es' ? 'Error al iniciar sesión:' : 'Login error:',
      error
    )

    // Mostrar notificación de error (si tienes un sistema de notificaciones)
    // toast.error(language.value === 'es' ? 'Error al iniciar sesión' : 'Login failed');
  }
}
</script>

<style>
/* Animaciones para los elementos de fondo */
@keyframes float {
  0% {
    transform: translateY(0px) scale(1);
  }
  50% {
    transform: translateY(-20px) scale(1.05);
  }
  100% {
    transform: translateY(0px) scale(1);
  }
}

/* Animación para el cambio de color de los patrones de fondo */
@keyframes colorChange {
  0% {
    background-color: rgba(var(--color-primary-500), 0.8);
  }
  33% {
    background-color: rgba(var(--color-primary-600), 0.8);
  }
  66% {
    background-color: rgba(var(--color-primary-700), 0.8);
  }
  100% {
    background-color: rgba(var(--color-primary-500), 0.8);
  }
}

.bg-pattern {
  animation:
    float 15s ease-in-out infinite,
    colorChange 8s infinite;
  animation-delay: calc(var(--index, 0) * 2s);
}

/* Animación para la barra de gradiente */
@keyframes gradientMove {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.gradient-bar {
  background: linear-gradient(
    90deg,
    var(--primary-400),
    var(--primary-600),
    var(--primary-800),
    var(--primary-600),
    var(--primary-400)
  );
  background-size: 200% 200%;
  animation: gradientMove 5s ease infinite;
  height: 1.5px;
  width: 100%;
}

/* Animación para el logo */
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(var(--color-primary-500), 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(var(--color-primary-500), 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(var(--color-primary-500), 0);
  }
}

.logo-pulse {
  animation: pulse 2s infinite;
}

/* Animación para el botón de login */
@keyframes buttonGlow {
  0% {
    box-shadow: 0 0 5px rgba(var(--color-primary-500), 0.5);
  }
  50% {
    box-shadow: 0 0 15px rgba(var(--color-primary-500), 0.8);
  }
  100% {
    box-shadow: 0 0 5px rgba(var(--color-primary-500), 0.5);
  }
}

.login-button:hover {
  animation: buttonGlow 1.5s infinite;
}

/* Animación para los botones de contacto */
.contact-button {
  transition: all 0.3s ease;
}

.contact-button:hover {
  transform: translateY(-3px);
  box-shadow:
    0 7px 14px rgba(50, 50, 93, 0.1),
    0 3px 6px rgba(0, 0, 0, 0.08);
}

/* Animación para el cambio de tema */
.theme-toggle {
  overflow:
    (50, 93, 0.1),
    0 3px 6px rgba(0, 0, 0, 0.08);
}

/* Animación para el cambio de tema */
.theme-toggle {
  overflow: hidden;
}

.theme-toggle:hover {
  transform: rotate(15deg);
}

/* Animación para la transición de tema */
.theme-transition * {
  transition:
    background-color 0.5s ease,
    color 0.5s ease,
    border-color 0.5s ease,
    box-shadow 0.5s ease !important;
}

button:focus,
a:focus,
input:focus {
  outline: 2px solid rgb(var(--color-primary-500));
  outline-offset: 2px;
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

input::-ms-reveal,
input::-ms-clear {
  display: none;
}
</style>

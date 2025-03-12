<template>
  <div
    class="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors duration-200"
    :class="{ dark: colorMode.value === 'dark' }"
  >
    <!-- Logo y contenido principal -->
    <div class="flex-grow flex items-center justify-center p-4">
      <div class="w-full max-w-md flex flex-col items-center">
        <!-- Logo -->
        <div class="mb-2 flex justify-center">
          <NuxtImg src="/logo.png" alt="Logo" class="h-16" format="webp" />
        </div>

        <!-- Card de login -->
        <div
          class="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors duration-200"
        >
          <!-- Barra azul superior -->
          <div class="h-1 bg-blue-600 w-full"></div>

          <div class="p-6">
            <!-- Header con toggles -->
            <div class="flex justify-between items-center mb-6">
              <!-- Toggle Live/Paper -->

              <!-- Toggle Dark/Light Mode -->
              <button
                type="button"
                @click="toggleTheme"
                class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                aria-label="Toggle dark mode"
              >
                <sun-icon
                  v-if="colorMode.value === 'dark'"
                  class="h-5 w-5 text-yellow-400"
                />
                <moon-icon v-else class="h-5 w-5 text-gray-600" />
              </button>
            </div>

            <!-- Título -->
            <h1 class="text-2xl font-semibold text-neutral-900 dark:text-white">
              Iniciar Sesión
            </h1>

            <!-- Formulario -->
            <Form
              @submit="onSubmit"
              :validation-schema="schema"
              v-slot="{ errors }"
              :initial-values="{ email: '', password: '' }"
            >
              <div class="space-y-4">
                <!-- Campo de usuario -->
                <div>
                  <div
                    class="flex border border-gray-300 dark:border-gray-600 rounded overflow-hidden focus-within:ring-1 focus-within:ring-blue-600 focus-within:border-blue-600 transition-colors duration-200"
                  >
                    <div
                      class="bg-gray-50 dark:bg-gray-700 px-3 py-2 flex items-center"
                    >
                      <user-icon
                        class="h-5 w-5 text-gray-500 dark:text-gray-400"
                      />
                    </div>
                    <Field
                      name="email"
                      type="text"
                      placeholder="Username"
                      class="flex-grow px-3 py-2 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200"
                      :class="{ 'border-red-500': errors.email }"
                    />
                  </div>
                  <span
                    v-if="errors.email"
                    class="text-xs text-red-500 dark:text-red-400 mt-1 block"
                    >{{ errors.email }}</span
                  >
                </div>

                <!-- Campo de contraseña -->
                <div>
                  <div
                    class="flex border border-gray-300 dark:border-gray-600 rounded overflow-hidden focus-within:ring-1 focus-within:ring-blue-600 focus-within:border-blue-600 transition-colors duration-200"
                  >
                    <div
                      class="bg-gray-50 dark:bg-gray-700 px-3 py-2 flex items-center"
                    >
                      <lock-icon
                        class="h-5 w-5 text-gray-500 dark:text-gray-400"
                      />
                    </div>
                    <Field
                      name="password"
                      :type="showPassword ? 'text' : 'password'"
                      placeholder="Password"
                      class="flex-grow px-3 py-2 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200"
                      :class="{ 'border-red-500': errors.password }"
                    />
                    <button
                      type="button"
                      @click="showPassword = !showPassword"
                      class="px-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
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

                <!-- Enlace de ayuda -->
                <div class="flex justify-end">
                  <a
                    href="#"
                    class="text-xs text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-200"
                    >Need help?</a
                  >
                </div>

                <!-- Botón de login -->
                <button
                  type="submit"
                  class="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-normal rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
                >
                  Login
                </button>

                <!-- Enlace para crear cuenta -->
                <div
                  class="text-center text-sm text-gray-600 dark:text-gray-300 transition-colors duration-200"
                >
                  Don't have an account?
                  <a
                    href="#"
                    class="text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-200"
                    >Try the free trial</a
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
      class="py-4 px-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200"
    >
      <div class="container mx-auto">
        <div
          class="flex flex-col md:flex-row flex-wrap justify-center md:justify-between items-center text-sm text-gray-600 dark:text-gray-300 gap-y-4 transition-colors duration-200"
        >
          <div class="flex items-center space-x-2">
            <a
              href="#"
              class="hover:underline flex items-center transition-colors duration-200"
            >
              SynergySoft.com
              <external-link-icon class="h-4 w-4 ml-1" />
            </a>
          </div>

          <div class="flex flex-wrap justify-center gap-x-4 gap-y-2">
            <a href="#" class="hover:underline transition-colors duration-200"
              >Galileo</a
            >
            <a href="#" class="hover:underline transition-colors duration-200"
              >Gestion de almacenes</a
            >
            <a
              href="#"
              class="hover:underline flex items-center transition-colors duration-200"
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
              class="hover:underline flex items-center transition-colors duration-200"
            >
              Galielo Mobile
              <span class="ml-1 flex">
                <apple-icon class="h-4 w-4 text-gray-600 dark:text-gray-400" />
                <smartphone-icon
                  class="h-4 w-4 ml-1 text-gray-600 dark:text-gray-400"
                />
              </span>
            </a>
            <a
              href="#"
              class="hover:underline flex items-center transition-colors duration-200"
            >
              Codex
              <span
                class="ml-1 text-xs bg-blue-600 dark:bg-blue-700 text-white px-1 rounded"
                >NEW</span
              >
            </a>
          </div>

          <div class="flex flex-wrap justify-center gap-x-2">
            <a href="#" class="hover:underline transition-colors duration-200"
              >Contactanos</a
            >
            <span class="text-gray-400 dark:text-gray-500">|</span>
            <a href="#" class="hover:underline transition-colors duration-200"
              >Sobre nuestra Plataforma</a
            >
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Form, Field } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { useAuthStore } from "~/stores/auth";
import {
  User as UserIcon,
  Lock as LockIcon,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
  Sun as SunIcon,
  Moon as MoonIcon,
  ExternalLink as ExternalLinkIcon,
  Smartphone as SmartphoneIcon,
} from "lucide-vue-next";
import { Apple as AppleIcon } from "lucide-vue-next";

const authStore = useAuthStore();
const colorMode = useColorMode();

const toggleTheme = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};

const showPassword = ref(false);

const schema = toTypedSchema(
  z.object({
    email: z
      .string()
      .min(1, "El correo electrónico es requerido")
      .email("Ingrese un correo electrónico válido"),
    password: z

      //.string({ required_error: "La contraseña es obligatoria" })
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .min(1, "La contraseña es requerida"),
  })
);

const onSubmit = async (values: any) => {
  try {
    console.log(values);
    await authStore.login(values);
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
  }
};
</script>

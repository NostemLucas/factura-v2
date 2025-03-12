<template>
  <div
    class="min-h-screen flex items-center justify-center bg-white dark:bg-dark"
  >
    <div
      class="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl"
    >
      <div class="text-center">
        <h2 class="text-3xl font-bold text-primary dark:text-white">
          Iniciar Sesión
        </h2>
        <p class="mt-2 text-gray dark:text-gray-300">Bienvenido de nuevo</p>
      </div>

      <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
        <div class="space-y-4">
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-dark dark:text-white"
            >
              Correo Electrónico
            </label>
            <Field
              name="email"
              type="email"
              class="mt-1 block w-full px-3 py-2 border border-gray rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
              :class="{ 'border-red-500': errors.email }"
            />
            <span class="text-xs text-red-500">{{ errors.email }}</span>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-dark dark:text-white"
            >
              Contraseña
            </label>
            <Field
              name="password"
              type="password"
              class="mt-1 block w-full px-3 py-2 border border-gray rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
              :class="{ 'border-red-500': errors.password }"
            />
            <span class="text-xs text-red-500">{{ errors.password }}</span>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                class="h-4 w-4 text-primary focus:ring-primary border-gray rounded"
              />
              <label
                for="remember-me"
                class="ml-2 block text-sm text-gray dark:text-gray-300"
              >
                Recordarme
              </label>
            </div>
            <div class="text-sm">
              <a
                href="#"
                class="font-medium text-primary hover:text-primary/80"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>

          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Iniciar Sesión
          </button>

          <button
            type="button"
            @click="toggleTheme"
            class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-white bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {{
              colorMode.value === "dark" ? "🌞 Modo Claro" : "🌙 Modo Oscuro"
            }}
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Form, Field } from "vee-validate";
import { toFormValidator } from "@vee-validate/zod";
import { z } from "zod";
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();
const colorMode = useColorMode();

const toggleTheme = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};

const schema = toFormValidator(
  z.object({
    email: z
      .string()
      .min(1, "El correo electrónico es requerido")
      .email("Ingrese un correo electrónico válido"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .min(1, "La contraseña es requerida"),
  })
);

const onSubmit = async (values: any) => {
  try {
    await authStore.login(values);
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
  }
};
</script>

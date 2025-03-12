import { defineStore } from "pinia";

interface User {
  id: string;
  email: string;
  name: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    isAuthenticated: false,
    token: null as string | null,
  }),

  actions: {
    async login(payload: LoginPayload) {
      try {
        // Aquí iría la llamada a tu API de autenticación
        // Por ahora simulamos una respuesta exitosa
        const response = {
          user: {
            id: "1",
            email: payload.email,
            name: "Usuario Demo",
          },
          token: "token-demo",
        };

        this.user = response.user;
        this.token = response.token;
        this.isAuthenticated = true;

        // Guardar en localStorage
        localStorage.setItem("token", response.token);

        // Redirigir al dashboard o página principal
        navigateTo("/dashboard");
      } catch (error) {
        console.error("Error en login:", error);
        throw error;
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      localStorage.removeItem("token");
      navigateTo("/login");
    },

    async checkAuth() {
      const token = localStorage.getItem("token");
      if (token) {
        // Aquí podrías validar el token con tu backend
        this.token = token;
        this.isAuthenticated = true;
        // Cargar información del usuario si es necesario
      }
    },
  },
});

import { defineStore } from 'pinia'
import { toast } from 'vue-sonner'
import { useAPI } from '~/services/request.service'

interface User {
  id: string
  username: string
  name: string
}

interface LoginPayload {
  username: string
  password: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    isAuthenticated: false,
    token: null as string | null
  }),

  actions: {
    async login(payload: LoginPayload) {
      try {
        // Aquí iría la llamada a tu API de autenticación
        /*         const responses = await $fetch(
          'http://165.227.92.147:9079/api/v1/usuario/login',
          {
            method: 'POST',
            body: payload
          }
        ) */

        const responses = useAPI('usuario/login', {
          method: 'POST',
          body: payload
        })
        console.log(responses)

        // Por ahora simulamos una respuesta exitosa
        if (payload.username !== 'admin' || payload.password !== 'admin') {
          console.log(payload.username, payload.password)
          toast.error('Credenciales Invalidas')
          throw new Error('Credenciales inválidas')
        }
        const response = {
          user: {
            id: '1',
            username: payload.username,
            name: 'Usuario Demo'
          },
          token: 'token-demo'
        }

        this.user = response.user
        this.token = response.token
        this.isAuthenticated = true

        // Guardar en localStorage
        localStorage.setItem('token', response.token)

        // Redirigir al dashboard o página principal
        navigateTo('/dashboard')
      } catch (error) {
        console.error('Error en login:', error)
        throw error
      }
    },

    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
      navigateTo('/login')
    },

    async checkAuth() {
      const token = localStorage.getItem('token')
      if (token) {
        // Aquí podrías validar el token con tu backend
        this.token = token
        this.isAuthenticated = true
        // Cargar información del usuario si es necesario
      }
    }
  }
})

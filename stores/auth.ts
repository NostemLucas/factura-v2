import { defineStore } from 'pinia'
import { toast } from 'vue-sonner'
import * as usuarioServices from '~/services/user.service'

interface User {
  access_token: string
  token_type: string
  refresh_token: string
  expires_in: number
  scope: string
  jti: string
  usuario: {
    fidUsuarioSistema: number
    estado: string
    fidPersona: string
    fidUsuario: string
    fidEntidad: string
    fidIdentificacionTributaria: string
    username: string
  }
}

interface PayloadUser {
  estado: String
  transaccion: boolean
  usuario: {
    ci: string
    fechaNacimiento: string
    imagen: string
    logo: string
    nombreCompleto: string
    nombreEntidad: string
  }
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
        const { data }: { data: User } =
          await usuarioServices.loginUsuario(payload)
        if (!data) {
          toast.error('Credenciales Invalidas')
          throw Error
        }
        this.user = data
        sessionStorage.setItem('token', this.user.access_token)
        sessionStorage.setItem('usuario', JSON.stringify(this.user.usuario))

        const response = await usuarioServices.findUsuarioByIdSistema(
          data.usuario.username,
          1
        )
        const user: PayloadUser = response.data
        console.log(response.data)
        sessionStorage.setItem('infoUsuario', JSON.stringify(user.usuario))
        toast.success('Bienvenido')
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

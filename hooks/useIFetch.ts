import type { UseFetchOptions } from '#app'
import { defu } from 'defu'
import { useConstants } from '~/config/constants'
import { toast } from 'vue-sonner'

const useIFetch = async <T>(url: string, options: UseFetchOptions<T> = {}) => {
  const constants = useConstants()
  const token = useCookie('token')

  const defaults: UseFetchOptions<T> = {
    baseURL: constants.api,
    key: url,
    server: false,
    timeout: 3000,
    headers:
      token && token.value
        ? {
            Authorization: `Bearer ${token}`
          }
        : {},
    onResponse: async ({ response, options, error }) => {
      console.log('***********')
      console.log(response)
      console.log(error)
      if (response.status === 401) {
        try {
          const newToken = await refreshToken()
          token.value = newToken
          // options.headers = { Authorization: `Bearer ${refreshToken}` }
          useFetch(url, options as UseFetchOptions<T>)
        } catch (error) {
          console.error('Token refresh failed')
          await logoutSession()
        }
      }
    },
    onResponseError: ({ error }) => {
      console.log('***********')
      console.log(error)
      if (error && error.message.includes('ERR_CONNECTION_TIMED_OUT')) {
        console.log('***********')
        console.log(error)

        toast.error(`🌎 Error de conexión: el servidor no responde`)
      }
    }
  }
  const params = defu(options, defaults)
  return useFetch(url, params)
}

const refreshToken = async (): Promise<string> => {
  return ''
}

const logoutSession = async (): Promise<void> => {
  return
}
export default useIFetch

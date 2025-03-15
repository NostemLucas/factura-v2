export const useConstants = () => {
  const config = useRuntimeConfig()
  console.log('CONFIG RUNTIME:', config)
  return {
    env: config.public.NUXT_API_ENV || 'development',
    api: config.public.NUXT_API_URL || 'http://localhost:3000'
  }
}

export const getHeader = function () {
  const token = sessionStorage.getItem('token')
  const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`
  }
  return headers
}

export const getHeaderLogin = function () {
  const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: 'application/json'
  }
  return headers
}

export const getHeaderFile = function () {
  const token = sessionStorage.getItem('token')
  const headers = {
    'Content-Type':
      'multipart/form-data; boundary=<calculated when request is sent>',
    Accept: '*/*',
    Authorization: `Bearer ${token}`
  }
  return headers
}

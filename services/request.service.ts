import axios from 'axios'
import {
  getHeaderFile,
  getHeader,
  getHeaderLogin,
  useConstants
} from '~/config/constants'

export function http() {
  return axios.create({
    baseURL: useConstants().api.toString(),
    headers: getHeader()
  })
}
export function httpLogin() {
  return axios.create({
    baseURL: useConstants().api.toString(),
    headers: getHeaderLogin()
  })
}

export function httpFile() {
  return axios.create({
    baseURL: useConstants().api.toString(),
    headers: getHeaderFile()
  })
}

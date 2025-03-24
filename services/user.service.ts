import { http, httpLogin } from './request.service'

export async function loginUsuario(login: any) {
  return await httpLogin().post(`usuario/login`, login)
}

export async function findUsuarioByIdSistema(usuario: any, idSistema: any) {
  return await http().get(
    `usuario/findUsuarioByIdSistema/${usuario}/${idSistema}`
  )
}

import type { UseFetchOptions } from 'nuxt/app'

const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD']
export async function useAPI<T>(
  url: string | (() => string),
  options?: UseFetchOptions<T>
) {
  return await useFetch('http://165.227.92.147:9079/api/v1/' + url, {
    ...options,
    $fetch: useNuxtApp().$api as typeof $fetch
  })
}

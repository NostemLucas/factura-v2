<script setup lang="ts">
import { h, resolveComponent, computed, ref } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import { numberLiteral } from '~/utils/cadena'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { LimitItems } from '~/types/datatable.type'

const props = defineProps<{
  data: any[]
  columns: TableColumn<any>[]
  title?: string
  secondaryTitle?: string
  loading: boolean
  limite: number
  total: number
  page: number
}>()

const emits = defineEmits<{
  'update:limit': [elem: number]
  'update:page': [page: number]
}>()

const pagination = ref({
  pageIndex: 0,
  pageSize: 7
})

const currentPage = computed(() => props.page)

const totalPages = computed(() => Math.ceil(props.total / props.limite))

const handlePageChange = (page: number) => {
  pagination.value.pageIndex = page - 1
  emits('update:page', page)
}

const limiteModel = computed({
  get: () => props.limite,
  set: (val) => {
    emits('update:page', 1)
    emits('update:limit', val)
  }
})

defineExpose({
  pagination
})
</script>

<template>
  <div class="font-sans rounded-lg shadow-sm bg-white overflow-hidden m-2">
    <div class="overflow-x-auto">
      <UTable
        :data="props.data"
        :columns="props.columns"
        :loading="props.loading"
        class="w-full"
        :class="[
          'w-full [&_th]:text-left [&_th]:py-3 [&_th]:px-4 [&_th]:font-medium [&_th]:text-gray-600 [&_th]:border-b [&_th]:border-gray-200 [&_th]:bg-gray-50',
          '[&_td]:py-4 [&_td]:px-4 [&_td]:border-b [&_td]:border-gray-200 [&_td]:text-gray-800',
          '[&_tr:hover]:bg-gray-50 [&_tr:last-child_td]:border-b-0'
        ]"
      >
        <template #loading>
          <tr v-for="i in 5" :key="i" class="animate-pulse">
            <td class="p-3">
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
            </td>
            <td class="p-3">
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
            </td>
            <td class="p-3">
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
            </td>
            <td class="p-3">
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
            </td>
            <td class="p-3">
              <div class="flex space-x-2">
                <div class="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div class="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </td>
          </tr>
        </template>
      </UTable>
    </div>

    <div v-if="!loading" class="flex justify-between items-center p-3 text-sm">
      <p>
        Mostrando:
        <span class="font-semibold">{{ data.length }}</span
        >&nbsp;de&nbsp;<span class="font-semibold">{{
          numberLiteral(total)
        }}</span>
      </p>
      <div class="flex gap-12">
        <!-- Paginación -->
        <div class="flex items-center gap-2">
          <UButton
            color="neutral"
            variant="soft"
            class="cursor-pointer border-slate-400"
            :disabled="currentPage === 1"
            @click="handlePageChange(currentPage - 1)"
          >
            <ChevronLeft :size="18" />
          </UButton>
          <div class="flex items-center gap-1">
            <UButton
              v-for="page in Math.min(5, totalPages)"
              :key="page"
              :color="page === currentPage ? 'info' : 'neutral'"
              variant="soft"
              class="cursor-pointer"
            >
              {{ page }}
            </UButton>
            <span v-if="totalPages > 5" class="mx-1">...</span>
            <UButton
              v-if="totalPages > 5"
              :color="currentPage === totalPages ? 'info' : 'neutral'"
              variant="soft"
              class="cursor-pointer"
              @click="handlePageChange(totalPages)"
            >
              {{ totalPages }}
            </UButton>
          </div>
          <UButton
            color="neutral"
            variant="soft"
            :disabled="currentPage === totalPages"
            class="cursor-pointer border-slate-400"
            @click="handlePageChange(currentPage + 1)"
          >
            <ChevronRight :size="18" />
          </UButton>
        </div>
        <!-- Limite -->
        <div class="flex items-center gap-2">
          <span>Limite</span>
          <USelect
            v-model="limiteModel"
            class="w-20 shadow-md"
            :items="LimitItems"
          />
        </div>
      </div>
    </div>
  </div>
</template>

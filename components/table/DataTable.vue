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
  totalItems?: number
  isLoading?: boolean
  itemsPerPageOptions?: number[]
}>()

const emits = defineEmits<{
  'update:page': [page: number]
  'update:pageSize': [pageSize: number]
  'row:select': [rows: any[]]
  'row:click': [row: any]
}>()

const table = useTemplateRef('table')

const defaultTitle = props.title || 'Product Analytics'
const defaultTotalItems = props.totalItems || props.data.length

const pagination = ref({
  pageIndex: 0,
  pageSize: 7
})

const selectLimit = ref('10')
const selectedTab = ref(defaultTitle)

const currentPage = computed(() => pagination.value.pageIndex + 1)
const totalPages = computed(() =>
  Math.ceil(defaultTotalItems / pagination.value.pageSize)
)
const showingStart = computed(
  () => pagination.value.pageIndex * pagination.value.pageSize + 1
)
const showingEnd = computed(() =>
  Math.min(
    (pagination.value.pageIndex + 1) * pagination.value.pageSize,
    defaultTotalItems
  )
)
const selectedItemsPerPage = ref(pagination.value.pageSize)

const handlePageChange = (page: number) => {
  pagination.value.pageIndex = page - 1
  emits('update:page', page)
}

const handlePageSizeChange = (size: number) => {
  pagination.value.pageSize = size
  pagination.value.pageIndex = 0
  emits('update:pageSize', size)
}

const handleRowClick = (row: any) => {
  emits('row:click', row)
}

const selectedRows = computed(() => {
  return table.value?.tableApi?.getFilteredSelectedRowModel().rows || []
})

defineExpose({
  pagination,
  selectedRows
})
</script>

<template>
  <div class="font-sans rounded-lg shadow-sm bg-white overflow-hidden m-2">
    <div class="overflow-x-auto">
      <UTable
        ref="table"
        :data="isLoading ? Array(10).fill({}) : data"
        :columns="columns"
        class="w-full"
        :class="[
          'w-full [&_th]:text-left [&_th]:py-3 [&_th]:px-4 [&_th]:font-medium [&_th]:text-gray-600 [&_th]:border-b [&_th]:border-gray-200 [&_th]:bg-gray-50',
          '[&_td]:py-4 [&_td]:px-4 [&_td]:border-b [&_td]:border-gray-200 [&_td]:text-gray-800',
          '[&_tr:hover]:bg-gray-50 [&_tr:last-child_td]:border-b-0'
        ]"
        @row:click="handleRowClick"
      >
        <template #loading>
          <tr
            v-for="(_, rowIndex) in 10"
            :key="`skeleton-row-${rowIndex}`"
            class="border-b border-gray-200"
          >
            <td
              v-for="(_, colIndex) in columns"
              :key="`skeleton-cell-${rowIndex}-${colIndex}`"
              class="py-4 px-4"
            >
              <USkeleton class="h-4 w-full" />
            </td>
          </tr>
        </template>
      </UTable>
    </div>

    <div
      class="flex justify-between items-center p-3 border-t border-gray-200 text-sm text-gray-600"
    >
      <p>
        Mostrando:
        <span class="font-semibold">{{ showingEnd - showingStart }}</span
        >&nbsp;de&nbsp;<span class="font-semibold">{{
          numberLiteral(defaultTotalItems)
        }}</span>
      </p>

      <div class="flex gap-12">
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
            <button
              v-for="page in Math.min(5, totalPages)"
              :key="page"
              :class="[
                'flex items-center justify-center w-8 h-8 rounded',
                page === currentPage
                  ? 'bg-gray-100 font-medium'
                  : 'hover:bg-gray-50'
              ]"
              @click="handlePageChange(page)"
            >
              {{ page }}
            </button>
            <span v-if="totalPages > 5" class="mx-1">...</span>
            <button
              v-if="totalPages > 5"
              :class="[
                'flex items-center justify-center w-8 h-8 rounded',
                totalPages === currentPage
                  ? 'bg-gray-100 font-medium'
                  : 'hover:bg-gray-50'
              ]"
              @click="handlePageChange(totalPages)"
            >
              {{ totalPages }}
            </button>
          </div>
          <UButton
            color="neutral"
            variant="soft"
            class="cursor-pointer border-slate-400"
            :disabled="currentPage === totalPages"
            @click="handlePageChange(currentPage + 1)"
          >
            <ChevronRight :size="18" />
          </UButton>
        </div>

        <div class="flex items-center gap-2">
          <span>Limite</span>
          <USelect
            v-model="selectLimit"
            :items="LimitItems"
            class="w-18 shadow-md"
          />
          <!-- <select
            v-model="selectedItemsPerPage"
            @change="handlePageSizeChange(selectedItemsPerPage)"
            class="px-2 py-1 rounded border border-gray-200 bg-white text-sm"
          >
            <option
              v-for="option in defaultItemsPerPageOptions"
              :key="option"
              :value="option"
            >
              {{ option }}
            </option>
          </select> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'

const props = withDefaults(
  defineProps<{
    dataSize?: number
    columns: TableColumn<any>[]
  }>(),
  {
    dataSize: 10
  }
)

const { columns, dataSize } = props

const columnsSkeleton: TableColumn<any>[] = columns.map((elem, index) => ({
  accessorKey: `skeleton-${index}`,
  header: elem.header ?? '-',
  cell: () => {
    return h('div', {
      class: 'w-full h-6 bg-gray-200 rounded-sm animate-pulse'
    })
  }
}))
</script>
<template>
  <UTable
    :data="Array(dataSize).fill({})"
    :columns="columnsSkeleton"
    class="w-full"
    :class="[
      'w-full [&_th]:text-left [&_th]:py-3 [&_th]:px-4 [&_th]:font-medium [&_th]:text-gray-600 [&_th]:border-b [&_th]:border-gray-200 [&_th]:bg-gray-50',
      '[&_td]:py-4 [&_td]:px-4 [&_td]:border-b [&_td]:border-gray-200 [&_td]:text-gray-800',
      '[&_tr:hover]:bg-gray-50 [&_tr:last-child_td]:border-b-0'
    ]"
  />
</template>

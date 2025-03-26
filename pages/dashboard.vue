<script setup lang="ts">
import { h, ref } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import DataTable from '~/components/table/DataTable.vue'

const loading = ref(false)
const total = ref(100)
const limit = ref(10)
const page = ref(1)

const setLimit = (value: number) => {
  limit.value = value
}

const setPage = (value: number) => {
  page.value = value
}

const toggleLoading = () => {
  loading.value = !loading.value
}

type Product = {
  id: string
  image: string
  name: string
  price: number
  category: string
  visibilityScore: number
  revenue: number
}

const imageExample =
  'https://imgs.search.brave.com/vZMOoUV2MSJpUuAGfP_Vu6Zzdrz4TUxemzEJ7h5CVGQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8xMzE0Ni8xMzE0/NjA2MC5wbmc_c2Vt/dD1haXNfaHlicmlk'

// Sample product data
const products = ref<Product[]>([
  {
    id: '1',
    image: imageExample,
    name: "New Balance Men's 608 V5 Casual",
    price: 45,
    category: 'Footwear',
    visibilityScore: 95,
    revenue: 27450
  },
  {
    id: '2',
    image: imageExample,
    name: "Sperry Top-Sider Men's Billfish Ultralite",
    price: 72,
    category: 'Footwear',
    visibilityScore: 80,
    revenue: 15340
  },
  {
    id: '3',
    image: imageExample,
    name: "Men's Minimalist Stainless Steel Slim",
    price: 124,
    category: 'Accessories',
    visibilityScore: 55,
    revenue: 12380
  },
  {
    id: '4',
    image: imageExample,
    name: "Timberland Men's Classic Leather",
    price: 32,
    category: 'Footwear',
    visibilityScore: 95,
    revenue: 8750
  },
  {
    id: '5',
    image: imageExample,
    name: 'KBETHOS Original Classic Low Profile',
    price: 24,
    category: 'Headwear',
    visibilityScore: 80,
    revenue: 6450
  }
])

const columns: TableColumn<Product>[] = [
  {
    accessorKey: 'product',
    header: 'Product',
    cell: ({ row }) => {
      return h('div', { class: 'flex items-center gap-3' }, [
        h('img', {
          src: row.original.image,
          alt: row.original.name,
          class: 'w-10 h-10 object-cover rounded-md border border-gray-200'
        }),
        h('div', { class: 'flex flex-col' }, [
          h(
            'span',
            { class: 'text-sm font-medium text-gray-900' },
            row.original.name
          ),
          h('span', { class: 'text-xs text-gray-500' }, row.original.category)
        ])
      ])
    }
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => {
      return h('div', { class: 'font-medium' }, `$${row.original.price}`)
    }
  },
  {
    accessorKey: 'visibilityScore',
    header: 'Visibility Score',
    cell: ({ row }) => {
      const score = row.original.visibilityScore
      let color = 'bg-blue-500'

      if (score < 60) color = 'bg-red-500'
      else if (score < 80) color = 'bg-amber-500'

      return h('div', { class: 'flex items-center gap-3' }, [
        h(
          'div',
          { class: 'w-24 h-2 bg-gray-100 rounded-full overflow-hidden' },
          [
            h('div', {
              class: `h-full ${color} rounded-full`,
              style: `width: ${score}%`
            })
          ]
        ),
        h('span', { class: 'font-medium' }, score)
      ])
    }
  },
  {
    accessorKey: 'revenue',
    header: 'Monthly Revenue',
    cell: ({ row }) => {
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(row.original.revenue)

      return h('div', { class: 'text-right font-medium' }, formatted)
    }
  }
]

const handlePageSizeChange = (size: number) => {
  console.log('Page size changed to:', size)
}
</script>

<template>
  <div class="p-4">
    <div class="flex justify-between mb-4">
      <h2 class="text-lg font-medium">Ejemplo tabla</h2>
      <UButton size="sm" color="info" @click="toggleLoading">
        {{ loading ? 'Stop Loading' : 'Test Loading' }}
      </UButton>
    </div>

    <DataTable
      :data="products"
      :columns="columns"
      :total="total"
      :limite="limit"
      :page="page"
      :loading="loading"
      @update:limit="setLimit"
      @update:page="setPage"
    />
  </div>
</template>

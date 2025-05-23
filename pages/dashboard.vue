<script setup lang="ts">
import { h, ref, type Slots } from 'vue'
import type { DropdownMenuItem, TableColumn } from '@nuxt/ui'
import DataTable from '~/components/table/DataTable.vue'
import { UBadge, UButton } from '#components'
import Modal from '~/components/ui/modals/Modal.vue'
import useIFetch from '~/hooks/useIFetch'

interface Product {
  id?: string
  name: string
  price: number
  category: string
  visibilityScore: number
  revenue: number
  status: 'success' | 'failed' | 'process'
}

const data = ref<Product[]>([])
const loading = ref(false)
const total = ref(0)
const limit = ref(10)
const page = ref(1)

const filtro = ref('')

const modalAddProduct = ref(false)

const setLimit = (value: number) => {
  limit.value = value
}

const setPage = (value: number) => {
  page.value = value
}

const columns: TableColumn<Product>[] = [
  {
    accessorKey: 'name',
    header: 'Product'
  },
  {
    accessorKey: 'name',
    header: 'Product'
  },
  {
    accessorKey: 'price',
    header: 'Precio',
    cell: ({ row }) => h('p', { class: 'text-end' }, row.original.price)
  },
  {
    accessorKey: 'visibilityScore',
    header: 'Visibility Score',
    cell: ({ row }) =>
      h('p', { class: 'text-end' }, row.original.visibilityScore)
  },
  {
    accessorKey: 'revenue',
    header: 'Monthly Revenue',
    cell: ({ row }) => h('p', { class: 'text-end' }, row.original.revenue)
  },
  {
    accessorKey: 'status',
    header: 'Estado',
    cell: ({ row }) => {
      const color = {
        success: 'success' as const,
        failed: 'error' as const,
        process: 'neutral' as const
      }[row.getValue('status') as string]

      return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () =>
        row.getValue('status')
      )
    }
  },
  {
    accessorKey: 'actions',
    header: 'Acciones',
    cell: ({ row }) =>
      h(
        'div',
        {
          class: 'flex items-center gap-2'
        },
        [
          h(UButton, {
            icon: 'i-lucide-pencil',
            color: 'info',
            variant: 'subtle'
          }),
          h(UButton, {
            icon: 'i-lucide-trash',
            color: 'error',
            variant: 'subtle'
          })
        ]
      )
  }
]

const getDataProducts = async () => {
  loading.value = true
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const { data } = await useIFetch('/productos', {
    params: {
      _per_page: limit.value,
      _page: page.value
    }
  })

  console.log(data)

  // data.value = res.data
  // total.value = res.items
  loading.value = false
}

const updateData = async () => {
  limit.value = 10
  page.value = 1
  await getDataProducts()
}

const openModalAddProduct = () => {
  modalAddProduct.value = true
}
const closeModalAddProduct = () => {
  modalAddProduct.value = false
}

watch([limit, page], async () => await getDataProducts())

onMounted(() => {
  getDataProducts().finally()
})

// Dropdown structure
const items = ref<DropdownMenuItem[]>([
  {
    label: 'Profile',
    icon: 'i-lucide-user'
  },
  {
    type: 'separator'
  },
  {
    label: 'Billing',
    icon: 'i-lucide-credit-card'
  },
  {
    label: 'Settings',
    icon: 'i-lucide-cog'
  }
])
</script>

<template>
  <UModal
    v-model:open="modalAddProduct"
    :overlay="true"
    title="Agregar nuevo producto"
  >
    <template #content> </template>

    <template #footer>
      <div class="w-full flex items-center justify-between">
        <UButton icon="i-lucide-x" variant="outline">Cancelar</UButton>
        <UButton icon="i-lucide-check">Guardar</UButton>
      </div>
    </template>
  </UModal>

  <div class="p-4">
    <div>{{ filtro }}</div>
    <DataTable
      title="Ejemplo tabla"
      subtitle="Aquí se muestra la lista de datos que la tabla tendrá"
      v-model:filtro="filtro"
      :data="data"
      :columns="columns"
      :total="total"
      :limit="limit"
      :page="page"
      :loading="loading"
      @update:limit="setLimit"
      @update:page="setPage"
    >
      <template v-slot:actions>
        <div class="flex items-center gap-2">
          <UButton
            icon="i-lucide-rotate-cw"
            color="info"
            variant="subtle"
            @click="updateData"
            >Actualizar</UButton
          >
          <UButton
            icon="i-lucide-plus"
            color="primary"
            variant="solid"
            @click="openModalAddProduct"
            >Agregar</UButton
          >
        </div>
      </template>
      <template v-slot:filters>
        <UDropdownMenu :items="items" :ui="{ content: 'w-48' }">
          <UButton
            label="Open"
            icon="i-lucide-settings"
            variant="outline"
            color="neutral"
            >Estado</UButton
          >
        </UDropdownMenu>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { formatCurrency, type Invoice } from '~/types/sales.type'

const props = defineProps<{
  invoice: Invoice
  selected: Invoice
}>()

const { selected, invoice } = props
</script>

<template>
  <div
    class="border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors duration-200 relative p-4 group"
    :class="{
      'bg-blue-50 hover:bg-blue-50': selected?.id === invoice.id
    }"
  >
    <div class="absolute right-4 top-4 flex items-center">
      <UButton
        variant="ghost"
        color="info"
        icon="i-lucide-chevron-left"
        class="transition-transform duration-400 ease-in-out group-hover:-translate-x-18 group-hover:opacity-0"
      />
      <div
        class="absolute right-0 flex space-x-1 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400 ease-in-out"
      >
        <UTooltip text="Descargar">
          <UButton variant="ghost" color="info" icon="i-lucide-download" />
        </UTooltip>
        <UTooltip text="Eliminar">
          <UButton variant="ghost" color="info" icon="i-lucide-trash" />
        </UTooltip>
      </div>
    </div>

    <div class="flex items-start">
      <UCheckbox :model-value="selected?.id === invoice.id" />

      <div class="ml-4 flex-1">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <p class="text-sm font-medium text-gray-900">
              {{ invoice.company }}
            </p>
          </div>
        </div>

        <div class="mt-2">
          <p class="text-sm text-gray-800 font-medium">
            Factura #{{ invoice.number }}
          </p>
          <p class="text-xs text-gray-500 mt-1">
            {{ invoice.date }}
          </p>
        </div>

        <div class="mt-3 flex justify-between items-center">
          <p class="text-sm font-bold text-gray-900">
            {{ formatCurrency(invoice.amount) }}
          </p>
          <div>
            <UBadge
              v-if="invoice.isPaid"
              color="success"
              variant="soft"
              class="font-medium"
            >
              Pagada
            </UBadge>
            <UBadge v-else color="warning" variant="soft" class="font-medium">
              Pendiente
            </UBadge>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

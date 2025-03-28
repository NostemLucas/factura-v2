<script setup>
import InvoicePreview from '~/modules/ventas/InvoicePreview.vue'
import NoInvoice from '~/modules/ventas/NoInvoice.vue'
import InvoiceSelect from '~/modules/ventas/InvoiceSelect.vue'
import { MockSidebar, MockInvoices } from '~/types/sales.type'
import {
  RefreshCw as RefreshCwIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Filter as FilterIcon
} from 'lucide-vue-next'
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone
} from '@internationalized/date'

const documentType = ref('all')
const dateFilter = ref('')

const InvoiceFilter = ref([
  'Todos los documentos',
  'Facturas',
  'Notas de venta'
])
const selectInvoiceFilter = ref('Todos los documentos')

const df = new DateFormatter('en-US', {
  dateStyle: 'medium'
})

const modelValue = shallowRef(new CalendarDate(2022, 1, 10))

const selectedInvoice = ref(null)

const selectInvoice = (invoice) => {
  selectedInvoice.value = invoice
}

const filteredDocuments = computed(() => {
  let filtered = [...MockInvoices]

  // Filter by document type
  if (documentType.value !== 'all') {
    filtered = filtered.filter((doc) => doc.type === documentType.value)
  }

  // Filter by date
  if (dateFilter.value) {
    const filterDate = new Date(dateFilter.value)
    filtered = filtered.filter((doc) => {
      const docDate = new Date(doc.date)
      return docDate.toDateString() === filterDate.toDateString()
    })
  }

  return filtered
})
</script>

<template>
  <div class="bg-background w-full h-full overflow-hidden flex flex-col">
    <header
      class="bg-background border-b border-gray-200 px-6 py-3 flex items-center justify-between"
    >
      <h1 class="text-lg font-medium text-foreground">
        Sistema de Facturas Médicas
      </h1>

      <div class="flex items-center gap-3">
        <UInput icon="i-lucide-search" placeholder="Buscar facturas..." />
        <USelect
          v-model="selectInvoiceFilter"
          :items="InvoiceFilter"
          class="w-48"
        />
        <UPopover>
          <UButton color="neutral" variant="subtle" icon="i-lucide-calendar">
            {{
              modelValue
                ? df.format(modelValue.toDate(getLocalTimeZone()))
                : 'Select a date'
            }}
          </UButton>

          <template #content>
            <UCalendar v-model="modelValue" class="p-2" />
          </template>
        </UPopover>
      </div>
    </header>

    <div class="flex flex-1 overflow-hidden">
      <div class="flex overflow-hidden">
        <div
          class="w-56 border-r border-gray-200 bg-background hidden md:flex flex-col"
        >
          <UButton
            icon="i-lucide-plus"
            variant="solid"
            color="primary"
            size="lg"
            class="m-3"
          >
            Nueva Factura
          </UButton>

          <nav class="mt-2 flex-1 overflow-y-auto">
            <div
              class="px-3 mb-3"
              v-for="(sidebar, index) in MockSidebar"
              :key="`left-sales-sidebar-${index}`"
            >
              <h2
                class="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2"
              >
                {{ sidebar.title }}
              </h2>
              <ul>
                <li
                  class="mb-1"
                  v-for="(item, indexItem) in sidebar.items"
                  :key="`item-sidebar-left-${item.id}`"
                >
                  <UButton
                    class="w-full justify-start py-3"
                    color="secondary"
                    variant="ghost"
                  >
                    <div class="flex justify-between items-center w-full">
                      <div class="flex gap-2 items-center">
                        <UIcon
                          :name="`${item.icon}`"
                          :class="`size-5 ${item.color}`"
                        />
                        <p class="text-foreground">{{ item.title }}</p>
                      </div>
                      <UBadge
                        v-if="item.chip"
                        color="primary"
                        variant="soft"
                        size="md"
                        class="ml-auto"
                      >
                        {{ item.chip }}
                      </UBadge>
                    </div>
                  </UButton>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>

      <div
        class="w-full md:w-96 border-r border-gray-200 bg-background overflow-hidden flex flex-col"
      >
        <div
          class="sticky top-0 bg-background border-b border-gray-200 px-4 py-3 flex justify-between items-center z-10"
        >
          <div class="flex items-center">
            <UCheckbox default-value />
            <button
              class="ml-2 p-1.5 rounded-md hover:bg-gray-100 transition-colors duration-200"
            >
              <RefreshCwIcon class="h-4 w-4 text-gray-500" />
            </button>
            <button
              class="ml-1 p-1.5 rounded-md hover:bg-gray-100 transition-colors duration-200"
            >
              <FilterIcon class="h-4 w-4 text-gray-500" />
            </button>
          </div>
          <div class="flex items-center text-sm text-gray-500">
            <span>1-10 de 253</span>
            <button
              class="ml-2 p-1.5 rounded-md hover:bg-gray-100 transition-colors duration-200"
            >
              <ChevronLeftIcon class="h-4 w-4" />
            </button>
            <button
              class="p-1.5 rounded-md hover:bg-gray-100 transition-colors duration-200"
            >
              <ChevronRightIcon class="h-4 w-4" />
            </button>
          </div>
        </div>

        <div class="overflow-y-auto flex-1">
          <ul>
            <li
              v-for="(invoice, index) in filteredDocuments"
              :key="index"
              @click="selectInvoice(invoice)"
            >
              <InvoiceSelect :invoice="invoice" :selected="selectedInvoice" />
            </li>
          </ul>
        </div>
      </div>

      <!-- Invoice Detail PDF -->
      <div class="flex-1 bg-background overflow-hidden flex flex-col">
        <InvoicePreview v-if="selectedInvoice" :invoice="selectedInvoice" />
        <NoInvoice v-else />
      </div>
    </div>
  </div>
</template>

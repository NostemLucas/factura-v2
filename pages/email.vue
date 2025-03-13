<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-6 lg:p-8 flex items-center justify-center"
  >
    <!-- Tarjeta principal que contiene toda la aplicación -->
    <div
      class="bg-white rounded-xl shadow-xl w-full max-w-7xl overflow-hidden flex flex-col h-[90vh]"
    >
      <!-- Header -->
      <header
        class="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between"
      >
        <div class="flex items-center space-x-4">
          <div class="bg-blue-600 text-white p-2 rounded-lg">
            <FileTextIcon class="h-6 w-6" />
          </div>
          <h1 class="text-xl font-semibold text-gray-800">
            Sistema de Facturas Médicas
          </h1>
        </div>
        <div class="flex items-center space-x-3">
          <div class="relative">
            <input
              type="text"
              placeholder="Buscar facturas..."
              class="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
            />
            <SearchIcon class="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          </div>

          <div class="flex items-center space-x-3">
            <select
              v-model="documentType"
              class="pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Todos los documentos</option>
              <option value="invoice">Facturas</option>
              <option value="sale">Notas de venta</option>
            </select>

            <div class="relative">
              <input
                type="date"
                v-model="dateFilter"
                class="pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                v-if="dateFilter"
                @click="dateFilter = ''"
                class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <XIcon class="h-4 w-4" />
              </button>
            </div>
          </div>

          <button
            class="text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200"
          >
            <BellIcon class="h-5 w-5" />
          </button>
          <button
            class="text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200"
          >
            <SettingsIcon class="h-5 w-5" />
          </button>
          <div
            class="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center"
          >
            <span class="text-sm font-medium">MS</span>
          </div>
        </div>
      </header>

      <div class="flex flex-1 overflow-hidden">
        <!-- Sidebar -->
        <div
          class="w-64 border-r border-gray-200 bg-white hidden md:flex flex-col"
        >
          <div class="p-4">
            <button
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg w-full flex items-center justify-center transition-colors duration-200 shadow-sm"
            >
              <PlusIcon class="h-4 w-4 mr-2" />
              <span>Nueva Factura</span>
            </button>
          </div>

          <nav class="mt-2 flex-1 overflow-y-auto">
            <div class="px-3 mb-3">
              <h2
                class="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2"
              >
                Principal
              </h2>
              <ul>
                <li class="mb-1">
                  <button
                    class="flex items-center w-full px-3 py-2.5 text-left rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors duration-200"
                  >
                    <InboxIcon class="h-5 w-5 mr-3" />
                    <span>Recibidas</span>
                    <span
                      class="ml-auto bg-blue-200 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full"
                      >12</span
                    >
                  </button>
                </li>
                <li class="mb-1">
                  <button
                    class="flex items-center w-full px-3 py-2.5 text-left rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <StarIcon class="h-5 w-5 mr-3 text-yellow-500" />
                    <span>Destacadas</span>
                  </button>
                </li>
                <li class="mb-1">
                  <button
                    class="flex items-center w-full px-3 py-2.5 text-left rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <ClockIcon class="h-5 w-5 mr-3 text-orange-500" />
                    <span>Recientes</span>
                  </button>
                </li>
                <li class="mb-1">
                  <button
                    class="flex items-center w-full px-3 py-2.5 text-left rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <ArchiveIcon class="h-5 w-5 mr-3 text-gray-500" />
                    <span>Archivadas</span>
                  </button>
                </li>
              </ul>
            </div>

            <div class="px-3 mb-3">
              <h2
                class="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2"
              >
                Categorías
              </h2>
              <ul>
                <li
                  v-for="(category, index) in categories"
                  :key="index"
                  class="mb-1"
                >
                  <button
                    class="flex items-center w-full px-3 py-2.5 text-left rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <component
                      :is="category.icon"
                      class="h-5 w-5 mr-3"
                      :class="category.iconColor"
                    />
                    <span>{{ category.name }}</span>
                  </button>
                </li>
              </ul>
            </div>
          </nav>

          <div class="p-4 border-t border-gray-200">
            <div class="bg-blue-50 rounded-lg p-3">
              <h3 class="text-sm font-medium text-blue-800">Plan Premium</h3>
              <p class="text-xs text-blue-600 mt-1">
                Accede a todas las funciones avanzadas
              </p>
              <button
                class="mt-2 text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md transition-colors duration-200 w-full"
              >
                Actualizar
              </button>
            </div>
          </div>
        </div>

        <!-- Invoice List -->
        <div
          class="w-full md:w-80 border-r border-gray-200 bg-white overflow-hidden flex flex-col"
        >
          <div
            class="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center z-10"
          >
            <div class="flex items-center">
              <input
                type="checkbox"
                class="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
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
                class="border-b border-gray-200 hover:bg-blue-50 cursor-pointer transition-colors duration-200 group relative"
                :class="{
                  'bg-blue-50':
                    selectedInvoice && selectedInvoice.id === invoice.id
                }"
              >
                <div class="px-4 py-4">
                  <!-- Hover Actions - Ahora posicionados de manera más accesible -->
                  <div
                    class="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2"
                  >
                    <button
                      class="p-2 hover:bg-gray-100 text-gray-600 rounded-md transition-colors duration-200"
                    >
                      <EyeIcon class="h-4 w-4" />
                    </button>
                    <button
                      class="p-2 hover:bg-gray-100 text-gray-600 rounded-md transition-colors duration-200"
                    >
                      <DownloadIcon class="h-4 w-4" />
                    </button>
                    <button
                      class="p-2 hover:bg-red-100 text-red-600 rounded-md transition-colors duration-200"
                    >
                      <TrashIcon class="h-4 w-4" />
                    </button>
                  </div>

                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      class="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <div class="ml-3 flex-1 pr-8">
                      <div class="flex items-center justify-between">
                        <div class="flex items-center">
                          <input
                            type="checkbox"
                            class="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          />
                          <div class="ml-3">
                            <div class="flex items-center space-x-2">
                              <p class="text-sm font-medium text-gray-900">
                                {{ invoice.company }}
                              </p>
                              <span
                                v-if="invoice.type === 'sale'"
                                class="px-2 py-0.5 text-xs rounded-full bg-purple-100 text-purple-800"
                              >
                                Nota de venta
                              </span>
                            </div>
                          </div>
                        </div>
                        <p class="text-xs text-gray-500">{{ invoice.date }}</p>
                      </div>
                      <div class="mt-1">
                        <p class="text-sm text-gray-900 font-medium">
                          Factura #{{ invoice.number }}
                        </p>
                        <p class="text-sm text-gray-500 truncate">
                          {{ invoice.description }}
                        </p>
                      </div>
                      <div class="mt-1 flex justify-between items-center">
                        <p class="text-sm font-bold text-gray-900">
                          {{ formatCurrency(invoice.amount) }}
                        </p>
                        <div>
                          <span
                            v-if="invoice.isPaid"
                            class="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800"
                            >Pagada</span
                          >
                          <span
                            v-else
                            class="px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-800"
                            >Pendiente</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Invoice Detail / PDF Viewer -->
        <div class="flex-1 bg-gray-50 overflow-hidden flex flex-col">
          <div v-if="selectedInvoice" class="h-full flex flex-col">
            <!-- Invoice Header -->
            <div
              class="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm"
            >
              <div>
                <h2 class="text-xl font-semibold text-gray-900">
                  Factura #{{ selectedInvoice.number }}
                </h2>
                <p class="text-sm text-gray-500">
                  {{ selectedInvoice.company }} - {{ selectedInvoice.date }}
                </p>
              </div>
              <div class="flex space-x-2">
                <button
                  class="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex items-center"
                >
                  <PrinterIcon class="h-5 w-5 mr-1" />
                  <span class="hidden lg:inline">Imprimir</span>
                </button>
                <button
                  class="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex items-center"
                >
                  <DownloadIcon class="h-5 w-5 mr-1" />
                  <span class="hidden lg:inline">Descargar</span>
                </button>
                <button
                  class="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex items-center"
                >
                  <ShareIcon class="h-5 w-5 mr-1" />
                  <span class="hidden lg:inline">Compartir</span>
                </button>
                <div class="relative">
                  <button
                    class="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <MoreVerticalIcon class="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            <!-- PDF Viewer (Simulated) -->
            <div class="flex-1 p-6 overflow-auto">
              <div
                class="bg-white shadow-lg rounded-xl w-full max-w-3xl mx-auto p-8 min-h-[842px]"
              >
                <!-- Invoice PDF Content -->
                <div class="flex justify-between items-start">
                  <div>
                    <div class="flex items-center">
                      <div
                        class="h-12 w-12 bg-blue-600 text-white rounded-lg flex items-center justify-center mr-3"
                      >
                        <HeartPulseIcon class="h-6 w-6" />
                      </div>
                      <div>
                        <h3 class="text-lg font-bold text-gray-900">
                          {{ selectedInvoice.company }}
                        </h3>
                        <p class="text-sm text-gray-600">
                          {{ selectedInvoice.address }}
                        </p>
                      </div>
                    </div>
                    <p class="text-sm text-gray-600 mt-2">
                      {{ selectedInvoice.email }}
                    </p>
                    <p class="text-sm text-gray-600">
                      CIF: {{ selectedInvoice.taxId }}
                    </p>
                  </div>
                  <div class="text-right">
                    <h1 class="text-2xl font-bold text-gray-900">FACTURA</h1>
                    <p class="text-sm text-gray-600">
                      # {{ selectedInvoice.number }}
                    </p>
                    <p class="text-sm text-gray-600">
                      Fecha: {{ selectedInvoice.date }}
                    </p>
                    <p class="text-sm text-gray-600">
                      Ref: {{ selectedInvoice.reference }}
                    </p>
                  </div>
                </div>

                <div class="mt-8 border-t border-gray-200 pt-6">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-gray-50 p-4 rounded-lg">
                      <h4 class="text-sm font-semibold text-gray-700 mb-2">
                        Facturado a:
                      </h4>
                      <p class="text-sm font-medium text-gray-900">
                        {{ selectedInvoice.client.name }}
                      </p>
                      <p class="text-sm text-gray-600 mt-1">
                        {{ selectedInvoice.client.address }}
                      </p>
                      <p class="text-sm text-gray-600">
                        {{ selectedInvoice.client.email }}
                      </p>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                      <h4 class="text-sm font-semibold text-gray-700 mb-2">
                        Información del seguro:
                      </h4>
                      <p class="text-sm text-gray-600">
                        {{ selectedInvoice.client.insuranceInfo }}
                      </p>
                      <div
                        v-if="selectedInvoice.insuranceCoverage"
                        class="mt-2 flex items-center"
                      >
                        <ShieldCheckIcon class="h-4 w-4 text-green-600 mr-1" />
                        <span class="text-sm text-green-600 font-medium"
                          >Cobertura:
                          {{
                            formatCurrency(selectedInvoice.insuranceCoverage)
                          }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mt-8">
                  <div class="bg-gray-50 rounded-lg overflow-hidden">
                    <table class="w-full text-sm">
                      <thead>
                        <tr class="bg-gray-100">
                          <th
                            class="py-3 px-4 text-left font-semibold text-gray-700"
                          >
                            Descripción
                          </th>
                          <th
                            class="py-3 px-4 text-right font-semibold text-gray-700"
                          >
                            Cantidad
                          </th>
                          <th
                            class="py-3 px-4 text-right font-semibold text-gray-700"
                          >
                            Precio
                          </th>
                          <th
                            class="py-3 px-4 text-right font-semibold text-gray-700"
                          >
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(item, idx) in selectedInvoice.items"
                          :key="idx"
                          class="border-t border-gray-200 hover:bg-blue-50 transition-colors duration-200"
                        >
                          <td class="py-3 px-4 text-gray-600">
                            <div>
                              <p class="font-medium text-gray-900">
                                {{ item.description }}
                              </p>
                              <p
                                class="text-xs text-gray-500 mt-1"
                                v-if="item.details"
                              >
                                {{ item.details }}
                              </p>
                            </div>
                          </td>
                          <td class="py-3 px-4 text-right text-gray-600">
                            {{ item.quantity }}
                          </td>
                          <td class="py-3 px-4 text-right text-gray-600">
                            {{ formatCurrency(item.price) }}
                          </td>
                          <td
                            class="py-3 px-4 text-right font-medium text-gray-900"
                          >
                            {{ formatCurrency(item.quantity * item.price) }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div class="mt-6 flex justify-end">
                  <div class="w-72 bg-gray-50 p-4 rounded-lg">
                    <div class="flex justify-between py-1">
                      <span class="text-sm text-gray-600">Subtotal:</span>
                      <span class="text-sm text-gray-900">{{
                        formatCurrency(calculateSubtotal())
                      }}</span>
                    </div>
                    <div class="flex justify-between py-1">
                      <span class="text-sm text-gray-600">IVA (4%):</span>
                      <span class="text-sm text-gray-900">{{
                        formatCurrency(calculateTax())
                      }}</span>
                    </div>
                    <div
                      class="flex justify-between py-1"
                      v-if="selectedInvoice.insuranceCoverage"
                    >
                      <span class="text-sm text-gray-600"
                        >Cobertura seguro:</span
                      >
                      <span class="text-sm text-green-600"
                        >-{{
                          formatCurrency(selectedInvoice.insuranceCoverage)
                        }}</span
                      >
                    </div>
                    <div
                      class="flex justify-between py-2 border-t border-gray-200 mt-1 pt-2"
                    >
                      <span class="text-sm font-semibold text-gray-700"
                        >Total a pagar:</span
                      >
                      <span class="text-sm font-bold text-gray-900">{{
                        formatCurrency(calculateTotal())
                      }}</span>
                    </div>
                  </div>
                </div>

                <div class="mt-8 pt-6 border-t border-gray-200">
                  <div class="flex flex-wrap gap-4">
                    <div class="flex-1 min-w-[200px]">
                      <h4 class="text-sm font-semibold text-gray-700 mb-2">
                        Método de pago:
                      </h4>
                      <div class="flex items-center">
                        <CreditCardIcon class="h-4 w-4 text-gray-500 mr-2" />
                        <p class="text-sm text-gray-600">
                          {{ selectedInvoice.paymentMethod }}
                        </p>
                      </div>
                      <div class="flex items-center mt-2">
                        <CircleCheckIcon
                          class="h-4 w-4 mr-2"
                          :class="
                            selectedInvoice.isPaid
                              ? 'text-green-600'
                              : 'text-yellow-600'
                          "
                        />
                        <p
                          class="text-sm"
                          :class="
                            selectedInvoice.isPaid
                              ? 'text-green-600 font-semibold'
                              : 'text-yellow-600 font-semibold'
                          "
                        >
                          {{ selectedInvoice.isPaid ? 'Pagada' : 'Pendiente' }}
                        </p>
                      </div>
                    </div>

                    <div
                      class="flex-1 min-w-[200px]"
                      v-if="selectedInvoice.prescriptionInfo"
                    >
                      <div
                        class="p-3 bg-blue-50 rounded-lg border border-blue-100"
                      >
                        <div class="flex items-start">
                          <StethoscopeIcon
                            class="h-5 w-5 text-blue-600 mr-2 mt-0.5"
                          />
                          <div>
                            <h4 class="text-sm font-semibold text-blue-800">
                              Información de prescripción:
                            </h4>
                            <p class="text-xs text-blue-700 mt-1">
                              {{ selectedInvoice.prescriptionInfo }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="mt-6 text-center">
                    <p class="text-xs text-gray-500">
                      Gracias por confiar en nuestros servicios médicos. Para
                      cualquier consulta sobre su factura o tratamiento, no dude
                      en contactarnos.
                    </p>
                    <div class="mt-2 flex justify-center space-x-4">
                      <a
                        href="#"
                        class="text-xs text-blue-600 hover:text-blue-800"
                        >Términos y condiciones</a
                      >
                      <a
                        href="#"
                        class="text-xs text-blue-600 hover:text-blue-800"
                        >Política de privacidad</a
                      >
                      <a
                        href="#"
                        class="text-xs text-blue-600 hover:text-blue-800"
                        >Contacto</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            v-else
            class="h-full flex items-center justify-center bg-gray-50"
          >
            <div class="text-center max-w-md p-6 bg-white rounded-xl shadow-sm">
              <div
                class="bg-blue-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <DocumentIcon class="h-8 w-8 text-blue-600" />
              </div>
              <h3 class="text-lg font-medium text-gray-900">
                Ninguna factura seleccionada
              </h3>
              <p class="mt-2 text-sm text-gray-500">
                Seleccione una factura de la lista para visualizar todos los
                detalles y opciones disponibles.
              </p>
              <button
                class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Crear nueva factura
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  Search as SearchIcon,
  Settings as SettingsIcon,
  Plus as PlusIcon,
  Inbox as InboxIcon,
  Star as StarIcon,
  Clock as ClockIcon,
  Archive as ArchiveIcon,
  RefreshCw as RefreshCwIcon,
  MoreVertical as MoreVerticalIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Printer as PrinterIcon,
  Download as DownloadIcon,
  Trash as TrashIcon,
  FileText as DocumentIcon,
  Eye as EyeIcon,
  Filter as FilterIcon,
  Share as ShareIcon,
  CreditCard as CreditCardIcon,
  CheckCircle as CircleCheckIcon,
  Pill as PillIcon,
  Stethoscope as StethoscopeIcon,
  HeartPulse as HeartPulseIcon,
  Activity as ActivityIcon,
  Microscope as MicroscopeIcon,
  Bed as BedIcon,
  Bell as BellIcon,
  ShieldCheck as ShieldCheckIcon,
  X as XIcon
} from 'lucide-vue-next'

// Datos de ejemplo
const categories = [
  { name: 'Medicamentos', icon: PillIcon, iconColor: 'text-blue-600' },
  { name: 'Consultas', icon: StethoscopeIcon, iconColor: 'text-green-600' },
  { name: 'Tratamientos', icon: ActivityIcon, iconColor: 'text-yellow-600' },
  { name: 'Análisis', icon: MicroscopeIcon, iconColor: 'text-purple-600' },
  { name: 'Hospitalización', icon: BedIcon, iconColor: 'text-red-600' }
]

const documentType = ref('all')
const dateFilter = ref('')

const invoices = [
  {
    id: 1,
    type: 'invoice', // Add type field
    company: 'Farmacia MediSalud',
    number: 'F-2023-001',
    date: '12/03/2023',
    description: 'Medicamentos recetados para tratamiento crónico',
    amount: 87.5,
    isPaid: true,
    address: 'Av. de la Salud 123, Madrid',
    email: 'facturacion@medisalud.com',
    taxId: 'B-12345678',
    reference: 'RX-2023-4567',
    paymentMethod: 'Tarjeta sanitaria',
    insuranceCoverage: 65.63,
    prescriptionInfo:
      'Receta médica #RX-2023-4567 emitida por Dr. García, Colegiado nº 28001234',
    client: {
      name: 'María Rodríguez López',
      address: 'C/ Principal 45, 2ºB, Madrid',
      email: 'maria.rodriguez@email.com',
      insuranceInfo: 'Aseguradora: MediSalud Plus - Póliza: MS-987654'
    },
    items: [
      {
        description: 'Atorvastatina 20mg',
        details:
          'Medicamento para reducir el colesterol. Posología: 1 comprimido diario',
        quantity: 1,
        price: 24.95
      },
      {
        description: 'Metformina 850mg',
        details:
          'Control de glucemia. Posología: 1 comprimido con las comidas principales',
        quantity: 2,
        price: 18.75
      },
      {
        description: 'Losartán 50mg',
        details:
          'Tratamiento hipertensión. Posología: 1 comprimido cada 24 horas',
        quantity: 1,
        price: 15.3
      },
      {
        description: 'Servicio de seguimiento farmacoterapéutico',
        details: 'Revisión de interacciones y adherencia al tratamiento',
        quantity: 1,
        price: 9.75
      }
    ]
  },
  {
    id: 2,
    type: 'sale', // Example of a sales note
    company: 'Centro Médico Especialidades',
    number: 'F-2023-002',
    date: '15/03/2023',
    description: 'Consulta especialista y pruebas diagnósticas',
    amount: 175.2,
    isPaid: false,
    address: 'Plaza de la Medicina 45, Madrid',
    email: 'admin@centromedico.com',
    taxId: 'A-87654321',
    reference: 'CM-2023-7890',
    paymentMethod: 'Transferencia bancaria',
    insuranceCoverage: 140.16,
    prescriptionInfo: null,
    client: {
      name: 'Carlos Sánchez Martín',
      address: 'Av. del Parque 78, 3ºA, Madrid',
      email: 'carlos.sanchez@email.com',
      insuranceInfo: 'Aseguradora: SaludTotal - Póliza: ST-123456'
    },
    items: [
      {
        description: 'Consulta Cardiología',
        details: 'Dr. Martínez - Primera visita con evaluación completa',
        quantity: 1,
        price: 95.0
      },
      {
        description: 'Electrocardiograma',
        details: 'Prueba diagnóstica básica',
        quantity: 1,
        price: 45.0
      },
      {
        description: 'Análisis sanguíneo perfil lipídico',
        details: 'Incluye colesterol total, HDL, LDL y triglicéridos',
        quantity: 1,
        price: 35.2
      }
    ]
  },
  {
    id: 3,
    type: 'invoice',
    company: 'Clínica Dental Sonrisa',
    number: 'F-2023-003',
    date: '18/03/2023',
    description: 'Tratamiento odontológico y limpieza dental',
    amount: 230.0,
    isPaid: true,
    address: 'C/ Odontología 56, Madrid',
    email: 'citas@clinicasonrisa.com',
    taxId: 'B-56789012',
    reference: 'CD-2023-3456',
    paymentMethod: 'Tarjeta de crédito',
    insuranceCoverage: 115.0,
    prescriptionInfo: null,
    client: {
      name: 'Ana Gómez Torres',
      address: 'C/ del Roble 23, 1ºC, Madrid',
      email: 'ana.gomez@email.com',
      insuranceInfo: 'Aseguradora: DentalPlus - Póliza: DP-567890'
    },
    items: [
      {
        description: 'Limpieza dental profesional',
        details: 'Eliminación de placa y sarro con ultrasonidos',
        quantity: 1,
        price: 65.0
      },
      {
        description: 'Empaste composite',
        details: 'Pieza 26, cara oclusal, material composite fotopolimerizable',
        quantity: 2,
        price: 55.0
      },
      {
        description: 'Radiografía periapical',
        details: 'Diagnóstico complementario',
        quantity: 1,
        price: 25.0
      },
      {
        description: 'Aplicación de flúor',
        details: 'Tratamiento preventivo',
        quantity: 1,
        price: 30.0
      }
    ]
  },
  {
    id: 4,
    type: 'invoice',
    company: 'Fisioterapia y Rehabilitación Activa',
    number: 'F-2023-004',
    date: '20/03/2023',
    description: 'Sesiones de fisioterapia para lesión deportiva',
    amount: 195.0,
    isPaid: true,
    address: 'Av. del Deporte 89, Madrid',
    email: 'info@fisioactiva.com',
    taxId: 'B-90123456',
    reference: 'FR-2023-5678',
    paymentMethod: 'Efectivo',
    insuranceCoverage: 0,
    prescriptionInfo:
      'Tratamiento recomendado por Dr. Ortega, Traumatólogo, Colegiado nº 28005678',
    client: {
      name: 'Javier Martín Ruiz',
      address: 'C/ Atleta 12, 4ºD, Madrid',
      email: 'javier.martin@email.com',
      insuranceInfo: 'Sin cobertura de seguro para este tratamiento'
    },
    items: [
      {
        description: 'Valoración inicial fisioterapéutica',
        details: 'Evaluación completa de la lesión y plan de tratamiento',
        quantity: 1,
        price: 45.0
      },
      {
        description: 'Sesión de fisioterapia manual',
        details: 'Tratamiento de esguince de tobillo grado II',
        quantity: 5,
        price: 30.0
      }
    ]
  },
  {
    id: 5,
    type: 'invoice',
    company: 'Laboratorio Análisis Clínicos',
    number: 'F-2023-005',
    date: '22/03/2023',
    description: 'Análisis clínicos completos',
    amount: 145.75,
    isPaid: false,
    address: 'C/ Ciencia 34, Madrid',
    email: 'resultados@labanalisis.com',
    taxId: 'A-12309876',
    reference: 'LA-2023-6789',
    paymentMethod: 'Tarjeta sanitaria',
    insuranceCoverage: 116.6,
    prescriptionInfo:
      'Análisis solicitados por Dra. Fernández, Medicina Interna, Colegiada nº 28007890',
    client: {
      name: 'Laura Pérez García',
      address: 'Av. Central 67, 5ºB, Madrid',
      email: 'laura.perez@email.com',
      insuranceInfo: 'Aseguradora: CompletaSalud - Póliza: CS-345678'
    },
    items: [
      {
        description: 'Hemograma completo',
        details: 'Análisis de células sanguíneas',
        quantity: 1,
        price: 35.25
      },
      {
        description: 'Bioquímica sanguínea',
        details: 'Perfil hepático, renal y metabólico',
        quantity: 1,
        price: 55.5
      },
      {
        description: 'Perfil tiroideo',
        details: 'TSH, T3 y T4',
        quantity: 1,
        price: 40.0
      },
      {
        description: 'Servicio de extracción a domicilio',
        details: 'Desplazamiento de personal sanitario',
        quantity: 1,
        price: 15.0
      }
    ]
  }
]

const selectedInvoice = ref(null)

const selectInvoice = (invoice) => {
  selectedInvoice.value = invoice
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount)
}

const calculateSubtotal = () => {
  if (!selectedInvoice.value) return 0
  return selectedInvoice.value.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  )
}

const calculateTax = () => {
  return calculateSubtotal() * 0.04 // IVA reducido para productos sanitarios (4%)
}

const calculateTotal = () => {
  if (!selectedInvoice.value) return 0
  const subtotal = calculateSubtotal()
  const tax = calculateTax()
  const insuranceCoverage = selectedInvoice.value.insuranceCoverage || 0
  return subtotal + tax - insuranceCoverage
}

const filteredDocuments = computed(() => {
  let filtered = [...invoices]

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

<script setup lang="ts">
import {
  CreditCard as CreditCardIcon,
  CheckCircle as CircleCheckIcon,
  Stethoscope as StethoscopeIcon,
  HeartPulse as HeartPulseIcon,
  ShieldCheck as ShieldCheckIcon
} from 'lucide-vue-next'
import { formatCurrency, type Invoice } from '~/types/sales.type'

const props = defineProps<{
  invoice: Invoice
}>()
const { invoice } = props

const calculateSubtotal = () => {
  if (!invoice) return 0
  return invoice.items.reduce(
    (total: number, item: any) => total + item.quantity * item.price,
    0
  )
}

const calculateTax = () => {
  return calculateSubtotal() * 0.04 // IVA reducido para productos sanitarios (4%)
}

const calculateTotal = () => {
  if (!invoice) return 0
  const subtotal = calculateSubtotal()
  const tax = calculateTax()
  const insuranceCoverage = invoice.insuranceCoverage || 0
  return subtotal + tax - insuranceCoverage
}
</script>
<template>
  <div class="h-full flex flex-col">
    <div
      class="bg-background border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm"
    >
      <div>
        <h2 class="text-lg font-semibold text-foreground">
          Factura #{{ invoice.number }}
        </h2>
        <p class="text-gray-500">{{ invoice.company }} - {{ invoice.date }}</p>
      </div>
      <div class="flex space-x-2">
        <UButton
          icon="i-lucide-printer"
          size="sm"
          variant="soft"
          color="secondary"
          >Imprimir</UButton
        >
        <UButton
          icon="i-lucide-download"
          size="sm"
          variant="soft"
          color="secondary"
          >Descargar</UButton
        >
        <UButton
          icon="i-lucide-share"
          size="sm"
          variant="soft"
          color="secondary"
          >Compartir</UButton
        >
      </div>
    </div>

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
                  {{ invoice.company }}
                </h3>
                <p class="text-sm text-gray-600">
                  {{ invoice.address }}
                </p>
              </div>
            </div>
            <p class="text-sm text-gray-600 mt-2">
              {{ invoice.email }}
            </p>
            <p class="text-sm text-gray-600">CIF: {{ invoice.taxId }}</p>
          </div>
          <div class="text-right">
            <h1 class="text-2xl font-bold text-gray-900">FACTURA</h1>
            <p class="text-sm text-gray-600"># {{ invoice.number }}</p>
            <p class="text-sm text-gray-600">Fecha: {{ invoice.date }}</p>
            <p class="text-sm text-gray-600">Ref: {{ invoice.reference }}</p>
          </div>
        </div>

        <div class="mt-8 border-t border-gray-200 pt-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="text-sm font-semibold text-gray-700 mb-2">
                Facturado a:
              </h4>
              <p class="text-sm font-medium text-gray-900">
                {{ invoice.client.name }}
              </p>
              <p class="text-sm text-gray-600 mt-1">
                {{ invoice.client.address }}
              </p>
              <p class="text-sm text-gray-600">
                {{ invoice.client.email }}
              </p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="text-sm font-semibold text-gray-700 mb-2">
                Información del seguro:
              </h4>
              <p class="text-sm text-gray-600">
                {{ invoice.client.insuranceInfo }}
              </p>
              <div
                v-if="invoice.insuranceCoverage"
                class="mt-2 flex items-center"
              >
                <ShieldCheckIcon class="h-4 w-4 text-green-600 mr-1" />
                <span class="text-sm text-green-600 font-medium"
                  >Cobertura:
                  {{ formatCurrency(invoice.insuranceCoverage) }}</span
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
                  <th class="py-3 px-4 text-left font-semibold text-gray-700">
                    Descripción
                  </th>
                  <th class="py-3 px-4 text-right font-semibold text-gray-700">
                    Cantidad
                  </th>
                  <th class="py-3 px-4 text-right font-semibold text-gray-700">
                    Precio
                  </th>
                  <th class="py-3 px-4 text-right font-semibold text-gray-700">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, idx) in invoice.items"
                  :key="idx"
                  class="border-t border-gray-200 hover:bg-blue-50 transition-colors duration-200"
                >
                  <td class="py-3 px-4 text-gray-600">
                    <div>
                      <p class="font-medium text-gray-900">
                        {{ item.description }}
                      </p>
                      <p class="text-xs text-gray-500 mt-1" v-if="item.details">
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
                  <td class="py-3 px-4 text-right font-medium text-gray-900">
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
              v-if="invoice.insuranceCoverage"
            >
              <span class="text-sm text-gray-600">Cobertura seguro:</span>
              <span class="text-sm text-green-600"
                >-{{ formatCurrency(invoice.insuranceCoverage) }}</span
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
                  {{ invoice.paymentMethod }}
                </p>
              </div>
              <div class="flex items-center mt-2">
                <CircleCheckIcon
                  class="h-4 w-4 mr-2"
                  :class="invoice.isPaid ? 'text-green-600' : 'text-yellow-600'"
                />
                <p
                  class="text-sm"
                  :class="
                    invoice.isPaid
                      ? 'text-green-600 font-semibold'
                      : 'text-yellow-600 font-semibold'
                  "
                >
                  {{ invoice.isPaid ? 'Pagada' : 'Pendiente' }}
                </p>
              </div>
            </div>

            <div class="flex-1 min-w-[200px]" v-if="invoice.prescriptionInfo">
              <div class="p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div class="flex items-start">
                  <StethoscopeIcon class="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <div>
                    <h4 class="text-sm font-semibold text-blue-800">
                      Información de prescripción:
                    </h4>
                    <p class="text-xs text-blue-700 mt-1">
                      {{ invoice.prescriptionInfo }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 text-center">
            <p class="text-xs text-gray-500">
              Gracias por confiar en nuestros servicios médicos. Para cualquier
              consulta sobre su factura o tratamiento, no dude en contactarnos.
            </p>
            <div class="mt-2 flex justify-center space-x-4">
              <a href="#" class="text-xs text-blue-600 hover:text-blue-800"
                >Términos y condiciones</a
              >
              <a href="#" class="text-xs text-blue-600 hover:text-blue-800"
                >Política de privacidad</a
              >
              <a href="#" class="text-xs text-blue-600 hover:text-blue-800"
                >Contacto</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

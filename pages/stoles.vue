<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div class="bg-white rounded-xl shadow-lg w-full max-w-6xl overflow-hidden">
      <!-- Header -->
      <div class="flex justify-between items-center p-4 border-b">
        <div class="flex items-center">
          <h1 class="text-purple-600 text-xl font-bold">Arto<sup>+</sup></h1>
          <span class="ml-4 text-gray-700">Create Invoice</span>
        </div>
        <div class="flex items-center gap-4">
          <button class="flex items-center text-sm text-gray-600">
            <circle-info-icon class="w-4 h-4 mr-1" />
            Do you need help?
          </button>
          <button class="text-gray-500">
            <x-icon class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Main Content -->
      <div class="flex flex-col lg:flex-row">
        <!-- Left Side - Invoice Details -->
        <div
          class="p-6 lg:w-1/2 border-r overflow-y-auto"
          style="max-height: 85vh"
        >
          <h2 class="text-xl font-bold mb-6">Invoice Details</h2>

          <!-- People -->
          <div class="mb-6">
            <div class="flex justify-between items-center mb-2">
              <label class="text-sm font-medium"
                >People <span class="text-red-500">*</span></label
              >
              <button
                @click="openClientSearch"
                class="text-blue-600 text-sm flex items-center"
              >
                <user-plus-icon class="w-4 h-4 mr-1" />
                Change Client
              </button>
            </div>

            <!-- Selected Client -->
            <div
              v-if="selectedClient"
              class="flex items-center p-2 border rounded-lg"
            >
              <div
                class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3"
              >
                <user-icon class="w-6 h-6 text-gray-500" />
              </div>
              <div class="flex-1">
                <div class="font-medium">{{ selectedClient.name }}</div>
                <div class="text-sm text-gray-500">
                  {{ selectedClient.email }}
                </div>
              </div>
              <div class="flex items-center">
                <span class="text-xs text-blue-500 mr-2">On Arto+</span>
                <button @click="openClientSearch" class="text-gray-400">
                  <edit-icon class="w-4 h-4" />
                </button>
              </div>
            </div>

            <!-- No Client Selected -->
            <div v-else class="p-3 border rounded-lg text-center">
              <button
                @click="openClientSearch"
                class="text-blue-600 flex items-center justify-center mx-auto"
              >
                <user-plus-icon class="w-4 h-4 mr-1" />
                Select a client
              </button>
            </div>
          </div>

          <!-- Subject -->
          <div class="mb-6">
            <label class="block text-sm font-medium mb-2">Subject</label>
            <input
              type="text"
              v-model="subject"
              class="w-full p-2 border rounded-lg"
              placeholder="Enter subject"
            />
          </div>

          <!-- Due Date -->
          <div class="mb-6">
            <label class="block text-sm font-medium mb-2">Due date</label>
            <div class="relative">
              <input
                type="text"
                v-model="dueDate"
                class="w-full p-2 border rounded-lg"
                placeholder="Select date"
              />
              <calendar-icon
                class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              />
            </div>
          </div>

          <!-- Currency -->
          <div class="mb-6">
            <label class="block text-sm font-medium mb-2">Currency</label>
            <div class="relative">
              <select
                v-model="currency"
                class="w-full p-2 border rounded-lg appearance-none"
              >
                <option value="Bs">Bs (Bolívares)</option>
                <option value="USD">USD (US Dollar)</option>
              </select>
              <chevron-down-icon
                class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              />
            </div>
          </div>

          <!-- Services/Medications -->
          <div class="mb-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-bold">
                {{ serviceType === "medical" ? "Medications" : "Services" }}
              </h3>
              <div class="flex items-center">
                <label class="text-sm mr-2">Type:</label>
                <select
                  v-model="serviceType"
                  class="p-1 border rounded-lg text-sm"
                >
                  <option value="medical">Medical</option>
                  <option value="service">Service</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-12 gap-2 text-sm font-medium mb-2">
              <div class="col-span-6">Item</div>
              <div class="col-span-3 text-center">Qty</div>
              <div class="col-span-3 text-center">Tax</div>
            </div>

            <!-- Service/Medication Items -->
            <div v-if="selectedServices.length > 0">
              <div
                v-for="(service, index) in selectedServices"
                :key="index"
                class="border rounded-lg p-3 mb-3"
              >
                <div class="grid grid-cols-12 gap-2 items-center">
                  <div class="col-span-6 flex items-center">
                    <div
                      class="w-10 h-10 rounded flex items-center justify-center mr-2"
                      :class="service.iconBg"
                    >
                      <component
                        :is="service.icon"
                        class="w-5 h-5"
                        :class="service.iconColor"
                      />
                    </div>
                    <div>
                      <div class="font-medium">{{ service.name }}</div>
                      <div class="text-sm text-gray-500">
                        {{ formatCurrency(service.price) }} {{ currency }}
                      </div>
                    </div>
                  </div>
                  <div class="col-span-3">
                    <input
                      type="number"
                      v-model="service.quantity"
                      class="w-full p-1 border rounded text-center"
                    />
                  </div>
                  <div class="col-span-2">
                    <select
                      v-model="service.tax"
                      class="w-full p-1 border rounded text-center"
                    >
                      <option value="0">0%</option>
                      <option value="10">10%</option>
                      <option value="15">15%</option>
                      <option value="20">20%</option>
                    </select>
                  </div>
                  <div class="col-span-1 flex justify-center">
                    <button @click="removeService(index)" class="text-gray-400">
                      <trash-icon class="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Add Service Button -->
            <button
              @click="openServiceSearch"
              class="flex items-center text-blue-600 text-sm font-medium"
            >
              <plus-circle-icon class="w-4 h-4 mr-1" />
              Add {{ serviceType === "medical" ? "Medication" : "Service" }}
            </button>
          </div>

          <!-- Discounts -->
          <div class="border-t pt-4 mb-6">
            <div class="flex justify-between items-center mb-3">
              <div class="flex items-center">
                <input
                  type="checkbox"
                  id="discount"
                  v-model="hasDiscount"
                  class="mr-2"
                />
                <label for="discount" class="text-sm">Add Discount</label>
              </div>
              <button
                v-if="hasDiscount"
                @click="openDiscountModal"
                class="text-blue-600 text-sm"
              >
                Customize
              </button>
            </div>
            <div v-if="hasDiscount" class="mt-3 mb-3">
              <div
                class="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
              >
                <div>
                  <span class="font-medium">{{ discountType }}</span>
                  <span class="text-sm text-gray-500 ml-2"
                    >{{ discountValue }}%</span
                  >
                </div>
                <div class="text-right">
                  <div class="font-medium">
                    -{{ formatCurrency(discountAmount) }} {{ currency }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Payment Methods -->
          <div class="border-t pt-4 mb-6">
            <div class="flex justify-between items-center mb-3">
              <h3 class="font-medium">Payment Methods</h3>
              <button
                @click="openPaymentModal"
                class="text-blue-600 text-sm flex items-center"
              >
                <plus-circle-icon class="w-4 h-4 mr-1" />
                Add Payment
              </button>
            </div>

            <div v-if="payments.length > 0" class="space-y-2 mb-3">
              <div
                v-for="(payment, index) in payments"
                :key="index"
                class="flex justify-between items-center p-2 bg-gray-50 rounded-lg"
              >
                <div class="flex items-center">
                  <component
                    :is="getPaymentIcon(payment.method)"
                    class="w-5 h-5 mr-2 text-gray-600"
                  />
                  <span>{{ payment.method }}</span>
                </div>
                <div class="flex items-center">
                  <span class="font-medium"
                    >{{ formatCurrency(payment.amount) }} {{ currency }}</span
                  >
                  <button
                    @click="removePayment(index)"
                    class="ml-2 text-gray-400"
                  >
                    <x-icon class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div
              v-if="payments.length > 0"
              class="flex justify-between items-center p-2 bg-blue-50 rounded-lg text-blue-800"
            >
              <span class="font-medium">Total Paid</span>
              <span class="font-medium"
                >{{ formatCurrency(totalPaid) }} {{ currency }}</span
              >
            </div>

            <div
              v-if="totalPaid > 0 && totalPaid < totalAmount"
              class="flex justify-between items-center p-2 mt-2 bg-amber-50 rounded-lg text-amber-800"
            >
              <span class="font-medium">Remaining</span>
              <span class="font-medium"
                >{{ formatCurrency(totalAmount - totalPaid) }}
                {{ currency }}</span
              >
            </div>

            <div
              v-if="totalPaid > totalAmount"
              class="flex justify-between items-center p-2 mt-2 bg-red-50 rounded-lg text-red-800"
            >
              <span class="font-medium">Overpaid</span>
              <span class="font-medium"
                >{{ formatCurrency(totalPaid - totalAmount) }}
                {{ currency }}</span
              >
            </div>
          </div>

          <div
            class="border-t pt-4 flex justify-between items-center text-sm text-gray-500"
          >
            <div>Last saved: Today at 4:30 PM</div>
            <div class="flex gap-3">
              <button class="px-4 py-2 border rounded-lg">Cancel</button>
              <button
                class="px-4 py-2 bg-gray-900 text-white rounded-lg flex items-center"
              >
                <loader-icon class="w-4 h-4 mr-2" />
                Processing Invoice
              </button>
            </div>
          </div>
        </div>

        <!-- Right Side - Preview -->
        <div
          class="p-6 lg:w-1/2 bg-gray-50 overflow-y-auto"
          style="max-height: 85vh"
        >
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold flex items-center">
              Preview
              <circle-info-icon class="w-4 h-4 ml-1 text-gray-400" />
            </h2>
            <div class="flex gap-2">
              <button
                class="flex items-center px-3 py-1 border rounded-lg text-sm"
              >
                <file-icon class="w-4 h-4 mr-1" />
                PDF
              </button>
              <button
                class="flex items-center px-3 py-1 border rounded-lg text-sm"
              >
                <mail-icon class="w-4 h-4 mr-1" />
                Email
              </button>
              <button
                class="flex items-center px-3 py-1 border rounded-lg text-sm"
              >
                <credit-card-icon class="w-4 h-4 mr-1" />
                Payment page
              </button>
            </div>
          </div>

          <!-- Invoice Preview -->
          <div class="bg-white rounded-lg shadow p-6">
            <div class="text-lg font-bold mb-6">INV2398-08-087</div>

            <div class="grid grid-cols-2 gap-6 mb-6">
              <div>
                <div class="text-sm text-gray-500 mb-1">Due date</div>
                <div>{{ dueDate }}</div>
              </div>
              <div>
                <div class="text-sm text-gray-500 mb-1">Subject</div>
                <div>{{ subject }}</div>
              </div>
              <div>
                <div class="text-sm text-gray-500 mb-1">Billed to</div>
                <div>
                  {{ selectedClient ? selectedClient.name : "Select a client" }}
                </div>
                <div class="text-sm text-gray-500">
                  {{ selectedClient ? selectedClient.email : "" }}
                </div>
              </div>
              <div>
                <div class="text-sm text-gray-500 mb-1">Currency</div>
                <div>{{ currency }}</div>
              </div>
            </div>

            <table class="w-full mb-6">
              <thead>
                <tr class="text-left text-sm text-gray-500 border-b">
                  <th class="pb-2">DESCRIPTION</th>
                  <th class="pb-2 text-center">QTY</th>
                  <th class="pb-2 text-right">UNIT PRICE</th>
                  <th class="pb-2 text-right">AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(service, index) in selectedServices" :key="index">
                  <td class="py-3 flex items-center">
                    <div
                      class="w-8 h-8 rounded flex items-center justify-center mr-2"
                      :class="service.iconBg"
                    >
                      <component
                        :is="service.icon"
                        class="w-4 h-4"
                        :class="service.iconColor"
                      />
                    </div>
                    {{ service.name }}
                  </td>
                  <td class="py-3 text-center">{{ service.quantity }}</td>
                  <td class="py-3 text-right">
                    {{ formatCurrency(service.price) }} {{ currency }}
                  </td>
                  <td class="py-3 text-right">
                    {{ formatCurrency(service.price * service.quantity) }}
                    {{ currency }}
                  </td>
                </tr>
                <tr v-if="selectedServices.length === 0">
                  <td colspan="4" class="py-3 text-center text-gray-500">
                    No items added
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="border-t pt-3">
              <div class="flex justify-between mb-1">
                <div>Subtotal</div>
                <div>{{ formatCurrency(subtotal) }} {{ currency }}</div>
              </div>
              <div v-if="hasDiscount" class="flex justify-between mb-1">
                <div>Discount -{{ discountValue }}%</div>
                <div>{{ formatCurrency(discountAmount) }} {{ currency }}</div>
              </div>
              <div class="flex justify-between font-bold mb-1">
                <div>Total</div>
                <div>{{ formatCurrency(totalAmount) }} {{ currency }}</div>
              </div>
              <div class="flex justify-between">
                <div>Amount due</div>
                <div>
                  {{ formatCurrency(totalAmount - totalPaid) }} {{ currency }}
                </div>
              </div>
            </div>

            <!-- Payment Summary -->
            <div v-if="payments.length > 0" class="border-t mt-6 pt-4">
              <div class="text-sm font-medium mb-2">Payment Methods</div>
              <div
                v-for="(payment, index) in payments"
                :key="index"
                class="flex justify-between items-center mb-1 text-sm"
              >
                <div class="flex items-center">
                  <component
                    :is="getPaymentIcon(payment.method)"
                    class="w-4 h-4 mr-1 text-gray-600"
                  />
                  {{ payment.method }}
                </div>
                <div>{{ formatCurrency(payment.amount) }} {{ currency }}</div>
              </div>
              <div class="flex justify-between font-medium mt-2 pt-2 border-t">
                <div>Total Paid</div>
                <div>{{ formatCurrency(totalPaid) }} {{ currency }}</div>
              </div>
            </div>

            <div class="border-t mt-6 pt-4">
              <div class="text-sm mb-2">Attachment</div>
              <div
                class="flex items-center justify-between border rounded-lg p-3"
              >
                <div class="flex items-center">
                  <file-icon class="w-5 h-5 mr-2" />
                  <div>
                    <div>
                      {{
                        serviceType === "medical"
                          ? "Prescription.PDF"
                          : "Service_details.PDF"
                      }}
                    </div>
                    <div class="text-xs text-gray-500">21 KB</div>
                  </div>
                </div>
                <button class="text-blue-500 flex items-center text-sm">
                  Download
                  <download-icon class="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Client Search Modal -->
    <div
      v-if="showClientSearch"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg w-full max-w-md">
        <div class="flex justify-between items-center p-4 border-b">
          <h3 class="text-lg font-bold">Select Client</h3>
          <button @click="showClientSearch = false" class="text-gray-500">
            <x-icon class="w-5 h-5" />
          </button>
        </div>
        <div class="p-4">
          <div class="mb-4 relative">
            <input
              type="text"
              v-model="clientSearch"
              class="w-full p-3 border rounded-lg"
              placeholder="Search clients..."
            />
            <search-icon
              class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            />
          </div>

          <div class="max-h-60 overflow-y-auto mb-4">
            <div v-if="filteredClients.length > 0">
              <div
                v-for="client in filteredClients"
                :key="client.id"
                @click="selectClient(client)"
                class="flex items-center p-3 hover:bg-gray-100 cursor-pointer border-b"
              >
                <div
                  class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3"
                >
                  <user-icon class="w-6 h-6 text-gray-500" />
                </div>
                <div>
                  <div class="font-medium">{{ client.name }}</div>
                  <div class="text-sm text-gray-500">{{ client.email }}</div>
                </div>
              </div>
            </div>
            <div v-else class="p-3 text-center text-gray-500">
              No clients found
            </div>
          </div>

          <button
            @click="openClientModal"
            class="w-full flex items-center justify-center text-blue-600 p-2 border border-blue-600 rounded-lg"
          >
            <user-plus-icon class="w-4 h-4 mr-1" />
            Add New Client
          </button>
        </div>
      </div>
    </div>

    <!-- Client Modal -->
    <div
      v-if="showClientModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg w-full max-w-md">
        <div class="flex justify-between items-center p-4 border-b">
          <h3 class="text-lg font-bold">Add New Client</h3>
          <button @click="showClientModal = false" class="text-gray-500">
            <x-icon class="w-5 h-5" />
          </button>
        </div>
        <div class="p-4">
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Name</label>
            <input
              v-model="newClient.name"
              type="text"
              class="w-full p-2 border rounded-lg"
              placeholder="Client name"
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Email</label>
            <input
              v-model="newClient.email"
              type="email"
              class="w-full p-2 border rounded-lg"
              placeholder="client@example.com"
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Phone</label>
            <input
              v-model="newClient.phone"
              type="text"
              class="w-full p-2 border rounded-lg"
              placeholder="+1 234 567 890"
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Address</label>
            <textarea
              v-model="newClient.address"
              class="w-full p-2 border rounded-lg"
              rows="3"
              placeholder="Client address"
            ></textarea>
          </div>
          <div class="flex justify-end gap-2">
            <button
              @click="showClientModal = false"
              class="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button
              @click="addNewClient"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Add Client
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Service Search Modal -->
    <div
      v-if="showServiceSearch"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg w-full max-w-md">
        <div class="flex justify-between items-center p-4 border-b">
          <h3 class="text-lg font-bold">
            Add {{ serviceType === "medical" ? "Medication" : "Service" }}
          </h3>
          <button @click="showServiceSearch = false" class="text-gray-500">
            <x-icon class="w-5 h-5" />
          </button>
        </div>
        <div class="p-4">
          <div class="mb-4 relative">
            <input
              type="text"
              v-model="serviceSearch"
              class="w-full p-3 border rounded-lg"
              placeholder="Search..."
            />
            <search-icon
              class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            />
          </div>

          <div class="max-h-60 overflow-y-auto mb-4">
            <div v-if="filteredServices.length > 0">
              <div
                v-for="service in filteredServices"
                :key="service.id"
                @click="addService(service)"
                class="flex items-center p-3 hover:bg-gray-100 cursor-pointer border-b"
              >
                <div
                  class="w-10 h-10 rounded flex items-center justify-center mr-3"
                  :class="service.iconBg"
                >
                  <component
                    :is="service.icon"
                    class="w-5 h-5"
                    :class="service.iconColor"
                  />
                </div>
                <div class="flex-1">
                  <div class="font-medium">{{ service.name }}</div>
                  <div class="text-sm text-gray-500">
                    {{ formatCurrency(service.price) }} {{ currency }}
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="p-3 text-center text-gray-500">
              No items found
            </div>
          </div>

          <button
            @click="openServiceModal"
            class="w-full flex items-center justify-center text-blue-600 p-2 border border-blue-600 rounded-lg"
          >
            <plus-circle-icon class="w-4 h-4 mr-1" />
            Add New {{ serviceType === "medical" ? "Medication" : "Service" }}
          </button>
        </div>
      </div>
    </div>

    <!-- New Service Modal -->
    <div
      v-if="showServiceModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg w-full max-w-md">
        <div class="flex justify-between items-center p-4 border-b">
          <h3 class="text-lg font-bold">
            Add New {{ serviceType === "medical" ? "Medication" : "Service" }}
          </h3>
          <button @click="showServiceModal = false" class="text-gray-500">
            <x-icon class="w-5 h-5" />
          </button>
        </div>
        <div class="p-4">
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Name</label>
            <input
              v-model="newService.name"
              type="text"
              class="w-full p-2 border rounded-lg"
              placeholder="Name"
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Price</label>
            <input
              v-model="newService.price"
              type="number"
              class="w-full p-2 border rounded-lg"
              placeholder="0.00"
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Description</label>
            <textarea
              v-model="newService.description"
              class="w-full p-2 border rounded-lg"
              rows="3"
              placeholder="Description"
            ></textarea>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Category</label>
            <select
              v-model="newService.category"
              class="w-full p-2 border rounded-lg"
            >
              <option v-if="serviceType === 'medical'" value="prescription">
                Prescription
              </option>
              <option v-if="serviceType === 'medical'" value="otc">
                Over the Counter
              </option>
              <option v-if="serviceType === 'medical'" value="supplies">
                Medical Supplies
              </option>
              <option v-if="serviceType === 'service'" value="consultation">
                Consultation
              </option>
              <option v-if="serviceType === 'service'" value="procedure">
                Procedure
              </option>
              <option v-if="serviceType === 'service'" value="therapy">
                Therapy
              </option>
              <option value="other">Other</option>
            </select>
          </div>
          <div class="flex justify-end gap-2">
            <button
              @click="showServiceModal = false"
              class="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button
              @click="addNewService"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Discount Modal -->
    <div
      v-if="showDiscountModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg w-full max-w-md">
        <div class="flex justify-between items-center p-4 border-b">
          <h3 class="text-lg font-bold">Customize Discount</h3>
          <button @click="showDiscountModal = false" class="text-gray-500">
            <x-icon class="w-5 h-5" />
          </button>
        </div>
        <div class="p-4">
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Discount Type</label>
            <input
              v-model="discountType"
              type="text"
              class="w-full p-2 border rounded-lg"
              placeholder="e.g. Senior Discount"
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2"
              >Discount Percentage</label
            >
            <div class="flex items-center">
              <input
                v-model="discountValue"
                type="number"
                class="w-full p-2 border rounded-lg"
                placeholder="0"
                min="0"
                max="100"
              />
              <span class="ml-2">%</span>
            </div>
          </div>
          <div class="flex justify-end gap-2">
            <button
              @click="showDiscountModal = false"
              class="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button
              @click="applyDiscount"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Payment Modal -->
    <div
      v-if="showPaymentModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg w-full max-w-md">
        <div class="flex justify-between items-center p-4 border-b">
          <h3 class="text-lg font-bold">Add Payment</h3>
          <button @click="showPaymentModal = false" class="text-gray-500">
            <x-icon class="w-5 h-5" />
          </button>
        </div>
        <div class="p-4">
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Payment Method</label>
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="method in paymentMethods"
                :key="method"
                @click="newPayment.method = method"
                class="p-3 border rounded-lg flex items-center justify-center"
                :class="{
                  'border-blue-600 bg-blue-50': newPayment.method === method,
                }"
              >
                <component
                  :is="getPaymentIcon(method)"
                  class="w-5 h-5 mr-2"
                  :class="
                    newPayment.method === method
                      ? 'text-blue-600'
                      : 'text-gray-600'
                  "
                />
                {{ method }}
              </button>
            </div>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Amount</label>
            <div class="flex items-center">
              <input
                v-model="newPayment.amount"
                type="number"
                class="w-full p-2 border rounded-lg"
                placeholder="0.00"
                min="0"
              />
              <span class="ml-2">{{ currency }}</span>
            </div>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2"
              >Reference (Optional)</label
            >
            <input
              v-model="newPayment.reference"
              type="text"
              class="w-full p-2 border rounded-lg"
              placeholder="e.g. Transaction ID, Check Number"
            />
          </div>
          <div class="flex justify-between items-center mb-4">
            <button @click="setRemainingAmount" class="text-blue-600 text-sm">
              Set remaining amount
            </button>
            <div class="text-sm text-gray-500">
              Remaining: {{ formatCurrency(totalAmount - totalPaid) }}
              {{ currency }}
            </div>
          </div>
          <div class="flex justify-end gap-2">
            <button
              @click="showPaymentModal = false"
              class="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button
              @click="addPayment"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Add Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import {
  CircleIcon as CircleInfoIcon,
  X as XIcon,
  ChevronRight as ChevronRightIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Edit as EditIcon,
  Calendar as CalendarIcon,
  ChevronDown as ChevronDownIcon,
  Shirt as ShirtIcon,
  Trash as TrashIcon,
  PlusCircle as PlusCircleIcon,
  Loader as LoaderIcon,
  File as FileIcon,
  Mail as MailIcon,
  CreditCard as CreditCardIcon,
  Download as DownloadIcon,
  Search as SearchIcon,
  Smartphone as SmartphoneIcon,
  Coffee as CoffeeIcon,
  Headphones as HeadphonesIcon,
  Laptop as LaptopIcon,
  Camera as CameraIcon,
  Scissors as ScissorsIcon,
  Pill as PillIcon,
  Stethoscope as StethoscopeIcon,
  Syringe as SyringeIcon,
  Thermometer as ThermometerIcon,
  QrCode as QrCodeIcon,
  DollarSign as DollarSignIcon,
  CreditCard as CreditCardIcon2,
  BanknoteIcon,
} from "lucide-vue-next";

// Form data
const subject = ref("Medical Consultation - June 2023");
const dueDate = ref("10 November 2023");
const currency = ref("Bs");
const serviceType = ref("medical");

// Discount data
const hasDiscount = ref(true);
const discountType = ref("Patient Discount");
const discountValue = ref(10);
const showDiscountModal = ref(false);

// Payment data
const showPaymentModal = ref(false);
const payments = ref([]);
const paymentMethods = ["QR", "Cash", "Check", "Transfer"];
const newPayment = ref({
  method: "Cash",
  amount: 0,
  reference: "",
});

// Client data
const clientSearch = ref("");
const showClientSearch = ref(false);
const selectedClient = ref(null);
const showClientModal = ref(false);
const newClient = ref({
  name: "",
  email: "",
  phone: "",
  address: "",
});

// Sample clients
const clients = ref([
  {
    id: 1,
    name: "Juan Pérez",
    email: "juan.perez@gmail.com",
    phone: "+58 412 123 4567",
    address: "Av. Principal, Caracas",
  },
  {
    id: 2,
    name: "María González",
    email: "maria.g@company.com",
    phone: "+58 414 765 4321",
    address: "Calle 5, Maracaibo",
  },
  {
    id: 3,
    name: "Carlos Rodríguez",
    email: "carlos.r@business.net",
    phone: "+58 416 555 1234",
    address: "Urb. El Bosque, Valencia",
  },
  {
    id: 4,
    name: "Ana Martínez",
    email: "ana.m@example.org",
    phone: "+58 424 333 2222",
    address: "Av. Las Américas, Mérida",
  },
  {
    id: 5,
    name: "Luis Hernández",
    email: "luis.h@mail.com",
    phone: "+58 426 777 8888",
    address: "Sector La Candelaria, Barquisimeto",
  },
]);

// Service data
const serviceSearch = ref("");
const showServiceSearch = ref(false);
const showServiceModal = ref(false);
const selectedServices = ref([]);
const newService = ref({
  name: "",
  price: 0,
  description: "",
  category: "other",
});

// Sample medical services and medications
const medicalServices = ref([
  {
    id: 1,
    name: "Consulta General",
    price: 150,
    description: "Consulta médica general",
    category: "consultation",
    icon: StethoscopeIcon,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    type: "service",
  },
  {
    id: 2,
    name: "Ecografía Abdominal",
    price: 300,
    description: "Examen de ultrasonido abdominal",
    category: "procedure",
    icon: CameraIcon,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    type: "service",
  },
  {
    id: 3,
    name: "Terapia Física",
    price: 200,
    description: "Sesión de terapia física",
    category: "therapy",
    icon: StethoscopeIcon,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    type: "service",
  },
  {
    id: 4,
    name: "Amoxicilina 500mg",
    price: 45,
    description: "Antibiótico - caja de 20 tabletas",
    category: "prescription",
    icon: PillIcon,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    type: "medical",
  },
  {
    id: 5,
    name: "Paracetamol 500mg",
    price: 25,
    description: "Analgésico - caja de 20 tabletas",
    category: "otc",
    icon: PillIcon,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    type: "medical",
  },
  {
    id: 6,
    name: "Jeringa Desechable",
    price: 5,
    description: "Jeringa estéril de 5ml",
    category: "supplies",
    icon: SyringeIcon,
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
    type: "medical",
  },
  {
    id: 7,
    name: "Termómetro Digital",
    price: 60,
    description: "Termómetro digital de uso médico",
    category: "supplies",
    icon: ThermometerIcon,
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
    type: "medical",
  },
]);

// Computed properties
const filteredClients = computed(() => {
  if (!clientSearch.value) return clients.value;
  const search = clientSearch.value.toLowerCase();
  return clients.value.filter(
    (client) =>
      client.name.toLowerCase().includes(search) ||
      client.email.toLowerCase().includes(search)
  );
});

const filteredServices = computed(() => {
  const services = medicalServices.value.filter(
    (service) => service.type === serviceType.value
  );

  if (!serviceSearch.value) return services;
  const search = serviceSearch.value.toLowerCase();
  return services.filter(
    (service) =>
      service.name.toLowerCase().includes(search) ||
      service.description.toLowerCase().includes(search) ||
      service.category.toLowerCase().includes(search)
  );
});

const subtotal = computed(() => {
  return selectedServices.value.reduce((total, service) => {
    return total + service.price * service.quantity;
  }, 0);
});

const discountAmount = computed(() => {
  return hasDiscount.value ? subtotal.value * (discountValue.value / 100) : 0;
});

const totalAmount = computed(() => {
  return subtotal.value - discountAmount.value;
});

const totalPaid = computed(() => {
  return payments.value.reduce((total, payment) => {
    return total + payment.amount;
  }, 0);
});

// Methods
const formatCurrency = (value) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const selectClient = (client) => {
  selectedClient.value = client;
  showClientSearch.value = false;
};

const openClientSearch = () => {
  showClientSearch.value = true;
  clientSearch.value = "";
};

const openClientModal = () => {
  showClientModal.value = true;
  showClientSearch.value = false;
};

const addNewClient = () => {
  if (newClient.value.name && newClient.value.email) {
    const client = {
      id: clients.value.length + 1,
      name: newClient.value.name,
      email: newClient.value.email,
      phone: newClient.value.phone,
      address: newClient.value.address,
    };
    clients.value.push(client);
    selectedClient.value = client;
    showClientModal.value = false;

    // Reset form
    newClient.value = {
      name: "",
      email: "",
      phone: "",
      address: "",
    };
  }
};

const openServiceSearch = () => {
  showServiceSearch.value = true;
  serviceSearch.value = "";
};

const openServiceModal = () => {
  showServiceModal.value = true;
  showServiceSearch.value = false;

  // Set default category based on service type
  if (serviceType.value === "medical") {
    newService.value.category = "prescription";
  } else {
    newService.value.category = "consultation";
  }
};

const addService = (service) => {
  // Check if service already exists in selected services
  const existingService = selectedServices.value.find(
    (s) => s.id === service.id
  );

  if (existingService) {
    existingService.quantity++;
  } else {
    selectedServices.value.push({
      ...service,
      quantity: 1,
      tax: "0",
    });
  }

  showServiceSearch.value = false;
};

const removeService = (index) => {
  selectedServices.value.splice(index, 1);
};

const addNewService = () => {
  if (newService.value.name && newService.value.price > 0) {
    // Determine icon based on category
    let icon = serviceType.value === "medical" ? PillIcon : StethoscopeIcon;
    let iconBg = "bg-blue-100";
    let iconColor = "text-blue-600";

    if (serviceType.value === "medical") {
      switch (newService.value.category) {
        case "prescription":
          icon = PillIcon;
          iconBg = "bg-red-100";
          iconColor = "text-red-600";
          break;
        case "otc":
          icon = PillIcon;
          iconBg = "bg-amber-100";
          iconColor = "text-amber-600";
          break;
        case "supplies":
          icon = SyringeIcon;
          iconBg = "bg-teal-100";
          iconColor = "text-teal-600";
          break;
      }
    } else {
      switch (newService.value.category) {
        case "consultation":
          icon = StethoscopeIcon;
          iconBg = "bg-blue-100";
          iconColor = "text-blue-600";
          break;
        case "procedure":
          icon = CameraIcon;
          iconBg = "bg-purple-100";
          iconColor = "text-purple-600";
          break;
        case "therapy":
          icon = StethoscopeIcon;
          iconBg = "bg-green-100";
          iconColor = "text-green-600";
          break;
      }
    }

    const service = {
      id: medicalServices.value.length + 1,
      name: newService.value.name,
      price: parseFloat(newService.value.price),
      description: newService.value.description,
      category: newService.value.category,
      icon,
      iconBg,
      iconColor,
      type: serviceType.value,
    };

    medicalServices.value.push(service);
    selectedServices.value.push({
      ...service,
      quantity: 1,
      tax: "0",
    });

    showServiceModal.value = false;

    // Reset form
    newService.value = {
      name: "",
      price: 0,
      description: "",
      category:
        serviceType.value === "medical" ? "prescription" : "consultation",
    };
  }
};

const openDiscountModal = () => {
  showDiscountModal.value = true;
};

const applyDiscount = () => {
  // Ensure discount value is between 0 and 100
  discountValue.value = Math.min(100, Math.max(0, discountValue.value));
  showDiscountModal.value = false;
};

const openPaymentModal = () => {
  showPaymentModal.value = true;
  newPayment.value = {
    method: "Cash",
    amount: 0,
    reference: "",
  };
};

const getPaymentIcon = (method) => {
  switch (method) {
    case "QR":
      return QrCodeIcon;
    case "Cash":
      return BanknoteIcon;
    case "Check":
      return FileIcon;
    case "Transfer":
      return CreditCardIcon2;
    default:
      return DollarSignIcon;
  }
};

const setRemainingAmount = () => {
  const remaining = totalAmount.value - totalPaid.value;
  if (remaining > 0) {
    newPayment.value.amount = remaining;
  }
};

const addPayment = () => {
  if (newPayment.value.amount > 0) {
    payments.value.push({
      method: newPayment.value.method,
      amount: parseFloat(newPayment.value.amount),
      reference: newPayment.value.reference,
      date: new Date().toISOString(),
    });
    showPaymentModal.value = false;
  }
};

const removePayment = (index) => {
  payments.value.splice(index, 1);
};
</script>

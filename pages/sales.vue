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
        <div class="p-6 lg:w-1/2 border-r">
          <h2 class="text-xl font-bold mb-6">Invoice Details</h2>

          <!-- People -->
          <div class="mb-6">
            <div class="flex justify-between items-center mb-2">
              <label class="text-sm font-medium"
                >People <span class="text-red-500">*</span></label
              >
              <chevron-right-icon class="w-5 h-5 text-gray-400" />
            </div>

            <!-- Client Search/Autocomplete -->
            <div v-if="!selectedClient" class="relative">
              <input
                type="text"
                v-model="clientSearch"
                @focus="showClientDropdown = true"
                @blur="setTimeout(() => (showClientDropdown = false), 200)"
                class="w-full p-3 border rounded-lg"
                placeholder="Buscar cliente..."
              />
              <search-icon
                class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              />

              <!-- Client Dropdown -->
              <div
                v-if="showClientDropdown"
                class="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto"
              >
                <div v-if="filteredClients.length > 0">
                  <div
                    v-for="client in filteredClients"
                    :key="client.id"
                    @click="selectClient(client)"
                    class="flex items-center p-3 hover:bg-gray-100 cursor-pointer"
                  >
                    <div
                      class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3"
                    >
                      <user-icon class="w-6 h-6 text-gray-500" />
                    </div>
                    <div>
                      <div class="font-medium">{{ client.name }}</div>
                      <div class="text-sm text-gray-500">
                        {{ client.email }}
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else class="p-3">
                  <p class="text-gray-500 mb-2">No se encontraron clientes</p>
                  <button
                    @click="openClientModal"
                    class="text-blue-600 flex items-center text-sm"
                  >
                    <plus-circle-icon class="w-4 h-4 mr-1" />
                    Añadir nuevo cliente
                  </button>
                </div>
              </div>
            </div>

            <!-- Selected Client -->
            <div v-else class="flex items-center p-2 border rounded-lg">
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
                <button @click="selectedClient = null" class="text-gray-400">
                  <edit-icon class="w-4 h-4" />
                </button>
              </div>
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
                <option value="IDR">IDR (Indonesian Rupiah)</option>
                <option value="USD">USD (US Dollar)</option>
                <option value="EUR">EUR (Euro)</option>
              </select>
              <chevron-down-icon
                class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              />
            </div>
          </div>

          <!-- Product -->
          <div class="mb-6">
            <h3 class="text-lg font-bold mb-4">Product</h3>
            <div class="grid grid-cols-12 gap-2 text-sm font-medium mb-2">
              <div class="col-span-6">Item</div>
              <div class="col-span-3 text-center">Qty</div>
              <div class="col-span-3 text-center">Tax</div>
            </div>

            <!-- Product Items -->
            <div v-if="selectedProducts.length > 0">
              <div
                v-for="(product, index) in selectedProducts"
                :key="index"
                class="border rounded-lg p-3 mb-3"
              >
                <div class="grid grid-cols-12 gap-2 items-center">
                  <div class="col-span-6 flex items-center">
                    <div
                      class="w-10 h-10 rounded flex items-center justify-center mr-2"
                      :class="product.iconBg"
                    >
                      <component
                        :is="product.icon"
                        class="w-5 h-5"
                        :class="product.iconColor"
                      />
                    </div>
                    <div>
                      <div class="font-medium">{{ product.name }}</div>
                      <div class="text-sm text-gray-500">
                        {{ formatCurrency(product.price) }} {{ currency }}
                      </div>
                    </div>
                  </div>
                  <div class="col-span-3">
                    <input
                      type="number"
                      v-model="product.quantity"
                      class="w-full p-1 border rounded text-center"
                    />
                  </div>
                  <div class="col-span-2">
                    <select
                      v-model="product.tax"
                      class="w-full p-1 border rounded text-center"
                    >
                      <option value="0">0%</option>
                      <option value="10">10%</option>
                      <option value="15">15%</option>
                      <option value="20">20%</option>
                    </select>
                  </div>
                  <div class="col-span-1 flex justify-center">
                    <button @click="removeProduct(index)" class="text-gray-400">
                      <trash-icon class="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Add Product Button -->
            <button
              @click="openProductSearch"
              class="flex items-center text-blue-600 text-sm font-medium"
            >
              <plus-circle-icon class="w-4 h-4 mr-1" />
              Add New Line
            </button>
          </div>

          <div class="border-t pt-4 mb-6">
            <div class="flex items-center mb-3">
              <input
                type="checkbox"
                id="coupon"
                v-model="hasCoupon"
                class="mr-2"
              />
              <label for="coupon" class="text-sm">Add Coupon</label>
            </div>
            <div v-if="hasCoupon" class="mt-3 mb-3 flex">
              <select
                v-model="selectedCoupon"
                class="border rounded-lg p-2 w-full"
              >
                <option value="WELCOME10">WELCOME10 - 10% off</option>
                <option value="SUMMER20">SUMMER20 - 20% off</option>
                <option value="FREESHIP">FREESHIP - Free shipping</option>
              </select>
              <chevron-down-icon class="w-5 h-5 text-gray-400 -ml-6 mt-2" />
            </div>
            <div class="flex items-center">
              <input
                type="checkbox"
                id="discount"
                v-model="hasDiscount"
                class="mr-2"
              />
              <label for="discount" class="text-sm">Add Discount</label>
            </div>
            <div v-if="hasDiscount" class="mt-3 flex">
              <select
                v-model="discountType"
                class="border rounded-lg p-2 w-full"
              >
                <option value="Summer Sale 10%">Summer Sale 10%</option>
                <option value="Loyalty Discount 15%">
                  Loyalty Discount 15%
                </option>
                <option value="Bulk Order 20%">Bulk Order 20%</option>
              </select>
              <chevron-down-icon class="w-5 h-5 text-gray-400 -ml-6 mt-2" />
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
        <div class="p-6 lg:w-1/2 bg-gray-50">
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
                  {{ selectedClient ? selectedClient.name : 'Select a client' }}
                </div>
                <div class="text-sm text-gray-500">
                  {{ selectedClient ? selectedClient.email : '' }}
                </div>
              </div>
              <div>
                <div class="text-sm text-gray-500 mb-1">Currency</div>
                <div>{{ currency }} - {{ currencyName }}</div>
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
                <tr v-for="(product, index) in selectedProducts" :key="index">
                  <td class="py-3 flex items-center">
                    <div
                      class="w-8 h-8 rounded flex items-center justify-center mr-2"
                      :class="product.iconBg"
                    >
                      <component
                        :is="product.icon"
                        class="w-4 h-4"
                        :class="product.iconColor"
                      />
                    </div>
                    {{ product.name }}
                  </td>
                  <td class="py-3 text-center">{{ product.quantity }}</td>
                  <td class="py-3 text-right">
                    {{ formatCurrency(product.price) }} {{ currency }}
                  </td>
                  <td class="py-3 text-right">
                    {{ formatCurrency(product.price * product.quantity) }}
                    {{ currency }}
                  </td>
                </tr>
                <tr v-if="selectedProducts.length === 0">
                  <td colspan="4" class="py-3 text-center text-gray-500">
                    No products added
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
                <div>Discount -10%</div>
                <div>{{ formatCurrency(discountAmount) }} {{ currency }}</div>
              </div>
              <div v-if="hasCoupon" class="flex justify-between mb-1">
                <div>Coupon ({{ selectedCoupon }})</div>
                <div>{{ formatCurrency(couponAmount) }} {{ currency }}</div>
              </div>
              <div class="flex justify-between font-bold mb-1">
                <div>Total</div>
                <div>{{ formatCurrency(totalAmount) }} {{ currency }}</div>
              </div>
              <div class="flex justify-between">
                <div>Amount due</div>
                <div>{{ formatCurrency(totalAmount) }} {{ currency }}</div>
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
                    <div>Product list.PDF</div>
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

    <!-- Product Search Modal -->
    <div
      v-if="showProductSearch"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg w-full max-w-md">
        <div class="flex justify-between items-center p-4 border-b">
          <h3 class="text-lg font-bold">Add Product</h3>
          <button @click="showProductSearch = false" class="text-gray-500">
            <x-icon class="w-5 h-5" />
          </button>
        </div>
        <div class="p-4">
          <div class="mb-4 relative">
            <input
              type="text"
              v-model="productSearch"
              class="w-full p-3 border rounded-lg"
              placeholder="Search products..."
            />
            <search-icon
              class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            />
          </div>

          <div class="max-h-60 overflow-y-auto mb-4">
            <div v-if="filteredProducts.length > 0">
              <div
                v-for="product in filteredProducts"
                :key="product.id"
                @click="addProduct(product)"
                class="flex items-center p-3 hover:bg-gray-100 cursor-pointer border-b"
              >
                <div
                  class="w-10 h-10 rounded flex items-center justify-center mr-3"
                  :class="product.iconBg"
                >
                  <component
                    :is="product.icon"
                    class="w-5 h-5"
                    :class="product.iconColor"
                  />
                </div>
                <div class="flex-1">
                  <div class="font-medium">{{ product.name }}</div>
                  <div class="text-sm text-gray-500">
                    {{ formatCurrency(product.price) }} {{ currency }}
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="p-3 text-center text-gray-500">
              No products found
            </div>
          </div>

          <button
            @click="openProductModal"
            class="w-full flex items-center justify-center text-blue-600 p-2 border border-blue-600 rounded-lg"
          >
            <plus-circle-icon class="w-4 h-4 mr-1" />
            Add New Product
          </button>
        </div>
      </div>
    </div>

    <!-- New Product Modal -->
    <div
      v-if="showProductModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg w-full max-w-md">
        <div class="flex justify-between items-center p-4 border-b">
          <h3 class="text-lg font-bold">Add New Product</h3>
          <button @click="showProductModal = false" class="text-gray-500">
            <x-icon class="w-5 h-5" />
          </button>
        </div>
        <div class="p-4">
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Product Name</label>
            <input
              v-model="newProduct.name"
              type="text"
              class="w-full p-2 border rounded-lg"
              placeholder="Product name"
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Price</label>
            <input
              v-model="newProduct.price"
              type="number"
              class="w-full p-2 border rounded-lg"
              placeholder="0.00"
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Description</label>
            <textarea
              v-model="newProduct.description"
              class="w-full p-2 border rounded-lg"
              rows="3"
              placeholder="Product description"
            ></textarea>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Category</label>
            <select
              v-model="newProduct.category"
              class="w-full p-2 border rounded-lg"
            >
              <option value="clothing">Clothing</option>
              <option value="electronics">Electronics</option>
              <option value="services">Services</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div class="flex justify-end gap-2">
            <button
              @click="showProductModal = false"
              class="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button
              @click="addNewProduct"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  CircleIcon as CircleInfoIcon,
  X as XIcon,
  ChevronRight as ChevronRightIcon,
  User as UserIcon,
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
  Scissors as ScissorsIcon
} from 'lucide-vue-next'

// Form data
const subject = ref('Service per June 2023')
const dueDate = ref('10 November 2023')
const currency = ref('IDR')
const hasDiscount = ref(true)
const discountType = ref('Summer Sale 10%')
const hasCoupon = ref(false)
const selectedCoupon = ref('WELCOME10')

// Client data
const clientSearch = ref('')
const showClientDropdown = ref(false)
const selectedClient = ref(null)
const showClientModal = ref(false)
const newClient = ref({
  name: '',
  email: '',
  phone: '',
  address: ''
})

// Sample clients
const clients = ref([
  {
    id: 1,
    name: 'John Smith',
    email: 'john_s@gmail.com',
    phone: '+1 234 567 890',
    address: '123 Main St, City'
  },
  {
    id: 2,
    name: 'Maria Garcia',
    email: 'maria.g@company.com',
    phone: '+1 987 654 321',
    address: '456 Oak Ave, Town'
  },
  {
    id: 3,
    name: 'Ahmed Khan',
    email: 'ahmed.k@business.net',
    phone: '+1 555 123 456',
    address: '789 Pine Rd, Village'
  },
  {
    id: 4,
    name: 'Sarah Johnson',
    email: 'sarah.j@example.org',
    phone: '+1 444 333 222',
    address: '101 Elm St, County'
  },
  {
    id: 5,
    name: 'Carlos Rodriguez',
    email: 'carlos.r@mail.com',
    phone: '+1 777 888 999',
    address: '202 Maple Dr, State'
  }
])

// Product data
const productSearch = ref('')
const showProductSearch = ref(false)
const showProductModal = ref(false)
const selectedProducts = ref([])
const newProduct = ref({
  name: '',
  price: 0,
  description: '',
  category: 'clothing'
})

// Sample products with icons
const products = ref([
  {
    id: 1,
    name: 'Summer 2K23 T-shirt',
    price: 125000,
    description: 'Comfortable cotton t-shirt',
    category: 'clothing',
    icon: ShirtIcon,
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-600'
  },
  {
    id: 2,
    name: 'Premium Headphones',
    price: 250000,
    description: 'Noise cancelling headphones',
    category: 'electronics',
    icon: HeadphonesIcon,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600'
  },
  {
    id: 3,
    name: 'Smartphone Case',
    price: 75000,
    description: 'Protective case for smartphones',
    category: 'electronics',
    icon: SmartphoneIcon,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    id: 4,
    name: 'Web Design Service',
    price: 1500000,
    description: 'Professional web design service',
    category: 'services',
    icon: LaptopIcon,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    id: 5,
    name: 'Coffee Subscription',
    price: 180000,
    description: 'Monthly coffee delivery',
    category: 'other',
    icon: CoffeeIcon,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600'
  },
  {
    id: 6,
    name: 'Digital Camera',
    price: 3500000,
    description: 'High resolution digital camera',
    category: 'electronics',
    icon: CameraIcon,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600'
  },
  {
    id: 7,
    name: 'Haircut Service',
    price: 150000,
    description: 'Professional haircut service',
    category: 'services',
    icon: ScissorsIcon,
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600'
  }
])

// Computed properties
const currencyName = computed(() => {
  const currencies = {
    IDR: 'Indonesian Rupiah',
    USD: 'US Dollar',
    EUR: 'Euro'
  }
  return currencies[currency.value]
})

const filteredClients = computed(() => {
  if (!clientSearch.value) return clients.value
  const search = clientSearch.value.toLowerCase()
  return clients.value.filter(
    (client) =>
      client.name.toLowerCase().includes(search) ||
      client.email.toLowerCase().includes(search)
  )
})

const filteredProducts = computed(() => {
  if (!productSearch.value) return products.value
  const search = productSearch.value.toLowerCase()
  return products.value.filter(
    (product) =>
      product.name.toLowerCase().includes(search) ||
      product.description.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search)
  )
})

const subtotal = computed(() => {
  return selectedProducts.value.reduce((total, product) => {
    return total + product.price * product.quantity
  }, 0)
})

const discountAmount = computed(() => {
  return hasDiscount.value ? subtotal.value * 0.1 : 0
})

const couponAmount = computed(() => {
  if (!hasCoupon.value) return 0

  switch (selectedCoupon.value) {
    case 'WELCOME10':
      return subtotal.value * 0.1
    case 'SUMMER20':
      return subtotal.value * 0.2
    case 'FREESHIP':
      return 15000 // Assuming shipping cost
    default:
      return 0
  }
})

const totalAmount = computed(() => {
  return subtotal.value - discountAmount.value - couponAmount.value
})

// Methods
const formatCurrency = (value) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const selectClient = (client) => {
  selectedClient.value = client
  showClientDropdown.value = false
}

const openClientModal = () => {
  showClientModal.value = true
  showClientDropdown.value = false
}

const addNewClient = () => {
  if (newClient.value.name && newClient.value.email) {
    const client = {
      id: clients.value.length + 1,
      name: newClient.value.name,
      email: newClient.value.email,
      phone: newClient.value.phone,
      address: newClient.value.address
    }
    clients.value.push(client)
    selectedClient.value = client
    showClientModal.value = false

    // Reset form
    newClient.value = {
      name: '',
      email: '',
      phone: '',
      address: ''
    }
  }
}

const openProductSearch = () => {
  showProductSearch.value = true
  productSearch.value = ''
}

const openProductModal = () => {
  showProductModal.value = true
  showProductSearch.value = false
}

const addProduct = (product) => {
  // Check if product already exists in selected products
  const existingProduct = selectedProducts.value.find(
    (p) => p.id === product.id
  )

  if (existingProduct) {
    existingProduct.quantity++
  } else {
    selectedProducts.value.push({
      ...product,
      quantity: 1,
      tax: '10'
    })
  }

  showProductSearch.value = false
}

const removeProduct = (index) => {
  selectedProducts.value.splice(index, 1)
}

const addNewProduct = () => {
  if (newProduct.value.name && newProduct.value.price > 0) {
    // Determine icon based on category
    let icon = ShirtIcon
    let iconBg = 'bg-teal-100'
    let iconColor = 'text-teal-600'

    switch (newProduct.value.category) {
      case 'electronics':
        icon = LaptopIcon
        iconBg = 'bg-blue-100'
        iconColor = 'text-blue-600'
        break
      case 'services':
        icon = CoffeeIcon
        iconBg = 'bg-green-100'
        iconColor = 'text-green-600'
        break
      case 'other':
        icon = FileIcon
        iconBg = 'bg-gray-100'
        iconColor = 'text-gray-600'
        break
    }

    const product = {
      id: products.value.length + 1,
      name: newProduct.value.name,
      price: parseFloat(newProduct.value.price),
      description: newProduct.value.description,
      category: newProduct.value.category,
      icon,
      iconBg,
      iconColor
    }

    products.value.push(product)
    selectedProducts.value.push({
      ...product,
      quantity: 1,
      tax: '10'
    })

    showProductModal.value = false

    // Reset form
    newProduct.value = {
      name: '',
      price: 0,
      description: '',
      category: 'clothing'
    }
  }
}
</script>

<style>
/* Additional styles can be added here if needed */
</style>

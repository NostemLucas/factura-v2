<template>
  <div :class="[containerClasses]">
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-medium text-gray-700 mb-1"
    >
      {{ label }}
    </label>
    <div class="relative">
      <input
        :id="id"
        type="text"
        :value="displayValue"
        @input="handleInput"
        @focus="isOpen = true"
        @blur="handleBlur"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :class="inputClasses"
        autocomplete="off"
      />
      <div
        class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
        @click="toggleDropdown"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          :class="{ 'transform rotate-180': isOpen }"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </div>

      <div
        v-if="isOpen && filteredOptions.length > 0"
        class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm"
      >
        <div
          v-for="option in filteredOptions"
          :key="getOptionValue(option)"
          @mousedown.prevent="selectOption(option)"
          :class="[
            'cursor-pointer select-none relative py-2 pl-3 pr-9',
            getOptionValue(option) === modelValue
              ? 'bg-primary text-white'
              : 'text-gray-900 hover:bg-gray-100'
          ]"
        >
          <span class="block truncate">{{ getOptionLabel(option) }}</span>
          <span
            v-if="getOptionValue(option) === modelValue"
            class="absolute inset-y-0 right-0 flex items-center pr-4"
            :class="{ 'text-white': getOptionValue(option) === modelValue }"
          >
            <svg
              class="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </div>
      </div>

      <div
        v-else-if="isOpen && searchQuery && filteredOptions.length === 0"
        class="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm"
      >
        <div
          class="cursor-default select-none relative py-2 px-3 text-gray-500"
        >
          No results found
        </div>
      </div>
    </div>
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
    <p v-else-if="hint" class="mt-1 text-sm text-gray-500">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { tv, type VariantProps } from 'tailwind-variants'
import { twMerge } from 'tailwind-merge'

// Define option type
type OptionType = string | number | Record<string, any>

// Define the container variants
const container = tv({
  variants: {
    responsive: {
      none: '',
      sm: 'sm:max-w-sm',
      md: 'md:max-w-md',
      lg: 'lg:max-w-lg',
      xl: 'xl:max-w-xl',
      full: 'w-full'
    }
  },
  defaultVariants: {
    responsive: 'full'
  }
})

// Define the input variants
const input = tv({
  base: 'w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/30 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-50 pr-10',
  variants: {
    variant: {
      default: 'border border-gray-300',
      filled:
        'bg-gray-100 border border-transparent focus:bg-white focus:border-primary',
      outline: 'bg-transparent border border-gray-300 focus:border-primary'
    },
    size: {
      sm: 'text-sm px-3 py-1.5 h-8',
      md: 'text-base px-4 py-2 h-10',
      lg: 'text-lg px-5 py-2.5 h-12'
    },
    error: {
      true: 'border-red-500 focus:border-red-500 focus:ring-red-500/30'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
    error: false
  }
})

// Extract variant types
type InputVariants = VariantProps<typeof input>
type ContainerVariants = VariantProps<typeof container>

// Define props with TypeScript interface
interface AutocompleteSelectProps extends InputVariants, ContainerVariants {
  modelValue: string | number
  options: OptionType[]
  id?: string
  label?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  error?: string
  hint?: string
  class?: string
  optionLabel?: string | ((option: OptionType) => string)
  optionValue?: string | ((option: OptionType) => string | number)
}

const props = withDefaults(defineProps<AutocompleteSelectProps>(), {
  modelValue: '',
  options: () => [],
  id: () => `select-${Math.random().toString(36).substring(2, 9)}`,
  label: '',
  placeholder: 'Select an option',
  disabled: false,
  readonly: false,
  error: '',
  hint: '',
  variant: 'default',
  size: 'md',
  responsive: 'full',
  class: '',
  optionLabel: 'label',
  optionValue: 'value'
})

// Define emits with TypeScript
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const isOpen = ref(false)
const searchQuery = ref('')

const inputClasses = computed(() => {
  return twMerge(
    input({
      variant: props.variant,
      size: props.size,
      error: !!props.error
    }),
    props.class
  )
})

const containerClasses = computed(() => {
  return container({
    responsive: props.responsive
  })
})

const getOptionLabel = (option: OptionType): string => {
  if (typeof props.optionLabel === 'function') {
    return props.optionLabel(option)
  }
  return typeof option === 'object' && option !== null
    ? String(option[props.optionLabel as string] || '')
    : String(option)
}

const getOptionValue = (option: OptionType): string | number => {
  if (typeof props.optionValue === 'function') {
    return props.optionValue(option)
  }
  return typeof option === 'object' && option !== null
    ? option[props.optionValue as string]
    : option
}

const filteredOptions = computed(() => {
  if (!searchQuery.value) {
    return props.options
  }

  return props.options.filter((option) => {
    const label = getOptionLabel(option).toLowerCase()
    return label.includes(searchQuery.value.toLowerCase())
  })
})

const displayValue = computed(() => {
  if (!props.modelValue) {
    return searchQuery.value
  }

  const selectedOption = props.options.find(
    (option) => getOptionValue(option) === props.modelValue
  )

  return selectedOption ? getOptionLabel(selectedOption) : searchQuery.value
})

const handleInput = (event: Event) => {
  searchQuery.value = (event.target as HTMLInputElement).value
}

const selectOption = (option: OptionType) => {
  emit('update:modelValue', getOptionValue(option))
  searchQuery.value = ''
  isOpen.value = false
}

const toggleDropdown = () => {
  if (!props.disabled && !props.readonly) {
    isOpen.value = !isOpen.value
  }
}

const handleBlur = () => {
  // Delay closing to allow for option selection
  setTimeout(() => {
    isOpen.value = false

    // Reset search query if no option is selected
    if (!props.modelValue) {
      searchQuery.value = ''
    }
  }, 150)
}

// Reset search query when modelValue changes
watch(
  () => props.modelValue,
  () => {
    searchQuery.value = ''
  }
)
</script>

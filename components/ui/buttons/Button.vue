<template>
  <div class="p-8 space-y-8">
    <!-- Demo section for inputs -->
    <section class="space-y-4">
      <h2 class="text-2xl font-bold">Inputs</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BaseInput
          v-model="inputValue"
          label="Default Input"
          placeholder="Type something..."
        />
        <BaseInput
          v-model="inputValue2"
          label="Input with Icon"
          placeholder="Search..."
          :leading-icon="SearchIcon"
        />
        <BaseInput
          v-model="inputValue3"
          label="Disabled Input"
          placeholder="Can't type here"
          disabled
        />
        <BaseInput
          v-model="inputValue4"
          label="Input with Error"
          placeholder="Error state"
          error="This field is required"
        />
      </div>
    </section>

    <!-- Demo section for buttons -->
    <section class="space-y-4">
      <h2 class="text-2xl font-bold">Buttons</h2>
      <div class="flex flex-wrap gap-4">
        <BaseButton>Default</BaseButton>
        <BaseButton variant="primary">Primary</BaseButton>
        <BaseButton variant="secondary">Secondary</BaseButton>
        <BaseButton variant="outline">Outline</BaseButton>
        <BaseButton variant="ghost">Ghost</BaseButton>
        <BaseButton variant="danger">Danger</BaseButton>
        <BaseButton :leading-icon="PlusIcon">With Icon</BaseButton>
        <BaseButton loading>Loading</BaseButton>
        <BaseButton disabled>Disabled</BaseButton>
      </div>
    </section>

    <!-- Demo section for select -->
    <section class="space-y-4">
      <h2 class="text-2xl font-bold">Select</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BaseSelect
          v-model="selectedOption"
          :options="selectOptions"
          label="Basic Select"
          placeholder="Choose an option"
        />
        <BaseSelect
          v-model="selectedMultipleOptions"
          :options="selectOptions"
          label="Multiple Select"
          placeholder="Choose options"
          multiple
        />
      </div>
    </section>

    <!-- Demo section for autocomplete -->
    <section class="space-y-4">
      <h2 class="text-2xl font-bold">Autocomplete</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BaseAutocomplete
          v-model="autocompleteValue"
          :options="autocompleteOptions"
          label="Autocomplete"
          placeholder="Type to search..."
        />
      </div>
    </section>

    <!-- Demo section for dialog/modal -->
    <section class="space-y-4">
      <h2 class="text-2xl font-bold">Dialogs & Modals</h2>
      <div class="flex flex-wrap gap-4">
        <BaseButton @click="showModal = true">Open Modal</BaseButton>
        <BaseButton @click="showFullscreenModal = true"
          >Open Fullscreen Modal</BaseButton
        >
      </div>
    </section>

    <!-- Modal component -->
    <BaseModal v-model="showModal" title="Regular Modal">
      <p class="mb-4">
        This is a regular modal dialog that can be used for confirmations,
        forms, or any content.
      </p>
      <div class="flex justify-end gap-2">
        <BaseButton variant="outline" @click="showModal = false"
          >Cancel</BaseButton
        >
        <BaseButton variant="primary" @click="showModal = false"
          >Confirm</BaseButton
        >
      </div>
    </BaseModal>

    <!-- Fullscreen Modal component -->
    <BaseModal
      v-model="showFullscreenModal"
      title="Fullscreen Modal"
      fullscreen
    >
      <div class="h-full flex flex-col">
        <p class="mb-4">
          This is a fullscreen modal that takes up the entire viewport.
        </p>
        <p class="mb-4">
          It's perfect for mobile interfaces or when you need to display a lot
          of content.
        </p>
        <div class="mt-auto flex justify-end gap-2">
          <BaseButton variant="outline" @click="showFullscreenModal = false"
            >Cancel</BaseButton
          >
          <BaseButton variant="primary" @click="showFullscreenModal = false"
            >Confirm</BaseButton
          >
        </div>
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, computed, defineComponent, h } from 'vue'

// Mock icons (using functions that return h() for simplicity)
const SearchIcon = () =>
  h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      class: 'h-5 w-5',
      fill: 'none',
      viewBox: '0 0 24 24',
      stroke: 'currentColor'
    },
    [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
      })
    ]
  )

const PlusIcon = () =>
  h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      class: 'h-5 w-5',
      fill: 'none',
      viewBox: '0 0 24 24',
      stroke: 'currentColor'
    },
    [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M12 4v16m8-8H4'
      })
    ]
  )

const CloseIcon = () =>
  h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      class: 'h-5 w-5',
      fill: 'none',
      viewBox: '0 0 24 24',
      stroke: 'currentColor'
    },
    [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M6 18L18 6M6 6l12 12'
      })
    ]
  )

// Utility function similar to clsx/tailwind-merge
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

// State for demo
const inputValue = ref('')
const inputValue2 = ref('')
const inputValue3 = ref('')
const inputValue4 = ref('')
const selectedOption = ref('')
const selectedMultipleOptions = ref([])
const autocompleteValue = ref('')
const showModal = ref(false)
const showFullscreenModal = ref(false)

// Options for select and autocomplete
const selectOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' }
]

const autocompleteOptions = ref([
  { value: 'vue', label: 'Vue.js' },
  { value: 'react', label: 'React' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'ember', label: 'Ember' }
])

// Base Input Component
const BaseInput = defineComponent({
  name: 'BaseInput',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    },
    leadingIcon: {
      type: Function,
      default: null
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const updateValue = (event) => {
      emit('update:modelValue', event.target.value)
    }

    const inputClasses = computed(() => {
      return cn(
        'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors',
        props.disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white',
        props.error
          ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
          : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500',
        props.leadingIcon ? 'pl-10' : ''
      )
    })

    return () =>
      h('div', { class: 'flex flex-col space-y-1' }, [
        props.label &&
          h(
            'label',
            { class: 'text-sm font-medium text-gray-700' },
            props.label
          ),
        h('div', { class: 'relative' }, [
          props.leadingIcon &&
            h(
              'div',
              {
                class:
                  'absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400'
              },
              [h(props.leadingIcon)]
            ),
          h('input', {
            value: props.modelValue,
            onInput: updateValue,
            type: props.type,
            placeholder: props.placeholder,
            disabled: props.disabled,
            class: inputClasses.value
          })
        ]),
        props.error && h('p', { class: 'text-sm text-red-600' }, props.error)
      ])
  }
})

// Base Button Component
const BaseButton = defineComponent({
  name: 'BaseButton',
  props: {
    variant: {
      type: String,
      default: 'default',
      validator: (value) =>
        [
          'default',
          'primary',
          'secondary',
          'outline',
          'ghost',
          'danger'
        ].includes(value)
    },
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['sm', 'md', 'lg'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    leadingIcon: {
      type: Function,
      default: null
    },
    trailingIcon: {
      type: Function,
      default: null
    }
  },
  setup(props, { slots }) {
    const buttonClasses = computed(() => {
      // Base classes
      const baseClasses =
        'inline-flex items-center justify-center font-medium rounded-md focus:outline-none transition-colors'

      // Size classes
      const sizeClasses = {
        sm: 'px-2.5 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base'
      }

      // Variant classes
      const variantClasses = {
        default:
          'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50',
        primary:
          'bg-primary-600 text-white hover:bg-primary-700 focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
        secondary:
          'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500',
        outline:
          'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50',
        ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
        danger:
          'bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
      }

      // State classes
      const stateClasses = props.disabled
        ? 'opacity-50 cursor-not-allowed'
        : 'cursor-pointer'

      return cn(
        baseClasses,
        sizeClasses[props.size],
        variantClasses[props.variant],
        stateClasses
      )
    })

    return () =>
      h(
        'button',
        {
          class: buttonClasses.value,
          disabled: props.disabled || props.loading
        },
        [
          props.loading &&
            h(
              'svg',
              {
                class: 'animate-spin -ml-1 mr-2 h-4 w-4',
                xmlns: 'http://www.w3.org/2000/svg',
                fill: 'none',
                viewBox: '0 0 24 24'
              },
              [
                h('circle', {
                  class: 'opacity-25',
                  cx: '12',
                  cy: '12',
                  r: '10',
                  stroke: 'currentColor',
                  'stroke-width': '4'
                }),
                h('path', {
                  class: 'opacity-75',
                  fill: 'currentColor',
                  d: 'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                })
              ]
            ),
          props.leadingIcon &&
            !props.loading &&
            h('span', { class: 'mr-2' }, [h(props.leadingIcon)]),
          slots.default && slots.default(),
          props.trailingIcon &&
            h('span', { class: 'ml-2' }, [h(props.trailingIcon)])
        ]
      )
  }
})

// Base Select Component
const BaseSelect = defineComponent({
  name: 'BaseSelect',
  props: {
    modelValue: {
      type: [String, Number, Array],
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Select an option'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const isOpen = ref(false)
    const selectRef = ref(null)

    const selectedLabels = computed(() => {
      if (props.multiple) {
        return props.options
          .filter((option) => props.modelValue.includes(option.value))
          .map((option) => option.label)
          .join(', ')
      } else {
        const selected = props.options.find(
          (option) => option.value === props.modelValue
        )
        return selected ? selected.label : ''
      }
    })

    const toggleOption = (value) => {
      if (props.multiple) {
        const newValue = [...(props.modelValue || [])]
        const index = newValue.indexOf(value)

        if (index === -1) {
          newValue.push(value)
        } else {
          newValue.splice(index, 1)
        }

        emit('update:modelValue', newValue)
      } else {
        emit('update:modelValue', value)
        isOpen.value = false
      }
    }

    const isSelected = (value) => {
      if (props.multiple) {
        return (props.modelValue || []).includes(value)
      } else {
        return props.modelValue === value
      }
    }

    const toggleDropdown = () => {
      if (!props.disabled) {
        isOpen.value = !isOpen.value
      }
    }

    const closeDropdown = (e) => {
      if (selectRef.value && !selectRef.value.contains(e.target)) {
        isOpen.value = false
      }
    }

    // Close dropdown when clicking outside
    if (typeof window !== 'undefined') {
      window.addEventListener('click', closeDropdown)
      // Clean up event listener
      onUnmounted(() => {
        window.removeEventListener('click', closeDropdown)
      })
    }

    const selectClasses = computed(() => {
      return cn(
        'relative w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors cursor-pointer',
        props.disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white',
        props.error
          ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
          : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
      )
    })

    return () =>
      h('div', { class: 'flex flex-col space-y-1', ref: selectRef }, [
        props.label &&
          h(
            'label',
            { class: 'text-sm font-medium text-gray-700' },
            props.label
          ),
        h(
          'div',
          {
            class: selectClasses.value,
            onClick: toggleDropdown
          },
          [
            h('div', { class: 'flex justify-between items-center' }, [
              h(
                'span',
                {
                  class: cn(
                    'block truncate',
                    !selectedLabels.value && 'text-gray-400'
                  )
                },
                selectedLabels.value || props.placeholder
              ),
              h('span', { class: 'pointer-events-none' }, [
                h(
                  'svg',
                  {
                    class: 'h-5 w-5 text-gray-400',
                    xmlns: 'http://www.w3.org/2000/svg',
                    viewBox: '0 0 20 20',
                    fill: 'currentColor',
                    'aria-hidden': 'true'
                  },
                  [
                    h('path', {
                      'fill-rule': 'evenodd',
                      d: 'M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z',
                      'clip-rule': 'evenodd'
                    })
                  ]
                )
              ])
            ])
          ]
        ),
        isOpen.value &&
          h(
            'div',
            {
              class:
                'absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm'
            },
            [
              props.options.map((option) =>
                h(
                  'div',
                  {
                    key: option.value,
                    class: cn(
                      'cursor-pointer select-none relative py-2 pl-3 pr-9',
                      isSelected(option.value)
                        ? 'bg-primary-100 text-primary-900'
                        : 'text-gray-900 hover:bg-gray-100'
                    ),
                    onClick: () => toggleOption(option.value)
                  },
                  [
                    h(
                      'span',
                      {
                        class: cn(
                          'block truncate',
                          isSelected(option.value)
                            ? 'font-medium'
                            : 'font-normal'
                        )
                      },
                      option.label
                    ),
                    isSelected(option.value) &&
                      h(
                        'span',
                        {
                          class:
                            'absolute inset-y-0 right-0 flex items-center pr-4 text-primary-600'
                        },
                        [
                          h(
                            'svg',
                            {
                              class: 'h-5 w-5',
                              xmlns: 'http://www.w3.org/2000/svg',
                              viewBox: '0 0 20 20',
                              fill: 'currentColor'
                            },
                            [
                              h('path', {
                                'fill-rule': 'evenodd',
                                d: 'M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z',
                                'clip-rule': 'evenodd'
                              })
                            ]
                          )
                        ]
                      )
                  ]
                )
              )
            ]
          ),
        props.error && h('p', { class: 'text-sm text-red-600' }, props.error)
      ])
  }
})

// Base Autocomplete Component
const BaseAutocomplete = defineComponent({
  name: 'BaseAutocomplete',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Type to search'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const inputValue = ref('')
    const isOpen = ref(false)
    const autocompleteRef = ref(null)

    // Initialize input value from modelValue
    const selectedOption = computed(() => {
      return props.options.find((option) => option.value === props.modelValue)
    })

    // Update input value when modelValue changes
    watch(
      () => props.modelValue,
      () => {
        if (selectedOption.value) {
          inputValue.value = selectedOption.value.label
        }
      },
      { immediate: true }
    )

    const filteredOptions = computed(() => {
      if (!inputValue.value) return props.options
      const searchTerm = inputValue.value.toLowerCase()
      return props.options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm)
      )
    })

    const updateInputValue = (event) => {
      inputValue.value = event.target.value
      isOpen.value = true
    }

    const selectOption = (option) => {
      inputValue.value = option.label
      emit('update:modelValue', option.value)
      isOpen.value = false
    }

    const closeDropdown = (e) => {
      if (autocompleteRef.value && !autocompleteRef.value.contains(e.target)) {
        isOpen.value = false
      }
    }

    // Close dropdown when clicking outside
    if (typeof window !== 'undefined') {
      window.addEventListener('click', closeDropdown)
      // Clean up event listener
      onUnmounted(() => {
        window.removeEventListener('click', closeDropdown)
      })
    }

    const inputClasses = computed(() => {
      return cn(
        'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors',
        props.disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white',
        props.error
          ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
          : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
      )
    })

    return () =>
      h(
        'div',
        { class: 'flex flex-col space-y-1 relative', ref: autocompleteRef },
        [
          props.label &&
            h(
              'label',
              { class: 'text-sm font-medium text-gray-700' },
              props.label
            ),
          h('input', {
            value: inputValue.value,
            onInput: updateInputValue,
            onFocus: () => {
              isOpen.value = true
            },
            placeholder: props.placeholder,
            disabled: props.disabled,
            class: inputClasses.value
          }),
          isOpen.value &&
            filteredOptions.value.length > 0 &&
            h(
              'div',
              {
                class:
                  'absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm'
              },
              [
                filteredOptions.value.map((option) =>
                  h(
                    'div',
                    {
                      key: option.value,
                      class: cn(
                        'cursor-pointer select-none relative py-2 pl-3 pr-9',
                        option.value === props.modelValue
                          ? 'bg-primary-100 text-primary-900'
                          : 'text-gray-900 hover:bg-gray-100'
                      ),
                      onClick: () => selectOption(option)
                    },
                    [
                      h(
                        'span',
                        {
                          class: cn(
                            'block truncate',
                            option.value === props.modelValue
                              ? 'font-medium'
                              : 'font-normal'
                          )
                        },
                        option.label
                      )
                    ]
                  )
                )
              ]
            ),
          props.error && h('p', { class: 'text-sm text-red-600' }, props.error)
        ]
      )
  }
})

// Base Modal Component
const BaseModal = defineComponent({
  name: 'BaseModal',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    fullscreen: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit, slots }) {
    // Use Teleport to move the modal to the body
    const closeModal = () => {
      emit('update:modelValue', false)
    }

    const modalClasses = computed(() => {
      if (props.fullscreen) {
        return 'fixed inset-0 z-50 flex flex-col bg-white'
      } else {
        return cn(
          'relative bg-white rounded-lg shadow-xl max-w-lg w-full mx-auto',
          'flex flex-col max-h-[90vh]'
        )
      }
    })

    const backdropClasses = computed(() => {
      return cn(
        'fixed inset-0 z-40 flex items-center justify-center p-4',
        'bg-black bg-opacity-50 transition-opacity'
      )
    })

    return () =>
      props.modelValue &&
      h('div', null, [
        // Using a simple implementation instead of Teleport since we're in a single file
        h(
          'div',
          {
            class: backdropClasses.value,
            onClick: (e) => {
              // Close when clicking backdrop
              if (e.target === e.currentTarget) {
                closeModal()
              }
            }
          },
          [
            h('div', { class: modalClasses.value }, [
              // Modal header
              h(
                'div',
                {
                  class: cn(
                    'flex items-center justify-between p-4 border-b',
                    props.fullscreen ? 'border-b' : 'rounded-t-lg'
                  )
                },
                [
                  h('h3', { class: 'text-lg font-medium' }, props.title),
                  h(
                    'button',
                    {
                      class:
                        'text-gray-400 hover:text-gray-500 focus:outline-none',
                      onClick: closeModal
                    },
                    [h(CloseIcon)]
                  )
                ]
              ),
              // Modal body
              h(
                'div',
                {
                  class: cn(
                    'p-4 overflow-y-auto',
                    props.fullscreen ? 'flex-1' : ''
                  )
                },
                slots.default && slots.default()
              )
            ])
          ]
        )
      ])
  }
})
</script>

<style>
:root {
  --color-secondary-50: #f5f3ff;
  --color-secondary-100: #ede9fe;
  --color-secondary-200: #ddd6fe;
  --color-secondary-300: #c4b5fd;
  --color-secondary-400: #a78bfa;
  --color-secondary-500: #8b5cf6;
  --color-secondary-600: #7c3aed;
  --color-secondary-700: #6d28d9;
  --color-secondary-800: #5b21b6;
  --color-secondary-900: #4c1d95;
}
</style>

<template>
  <div class="p-8 space-y-12">
    <!-- Enhanced Select and Autocomplete -->
    <section class="space-y-6">
      <h2 class="text-2xl font-bold">Enhanced Select & Autocomplete</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 class="text-lg font-medium mb-4">Enhanced Select</h3>
          <EnhancedSelect
            v-model="enhancedSelectValue"
            :options="enhancedSelectOptions"
            label="Enhanced Select with Search"
            placeholder="Search and select..."
            searchable
          />
        </div>

        <div>
          <h3 class="text-lg font-medium mb-4">Debounced Autocomplete</h3>
          <EnhancedAutocomplete
            v-model="debouncedAutocompleteValue"
            :options="countriesOptions"
            label="Country Search (with debounce)"
            placeholder="Type to search countries..."
            :debounce="300"
          />
        </div>

        <div>
          <h3 class="text-lg font-medium mb-4">Select with Tags</h3>
          <EnhancedSelect
            v-model="multiSelectWithTags"
            :options="skillsOptions"
            label="Skills"
            placeholder="Select skills..."
            multiple
            tags
          />
        </div>

        <div>
          <h3 class="text-lg font-medium mb-4">Autocomplete with Error</h3>
          <EnhancedAutocomplete
            v-model="errorAutocompleteValue"
            :options="countriesOptions"
            label="Required Country"
            placeholder="This field is required"
            error="Please select a country"
          />
        </div>
      </div>
    </section>

    <!-- Rich Text Editor -->
    <section class="space-y-6">
      <h2 class="text-2xl font-bold">Rich Text Editor</h2>

      <div>
        <RichTextEditor
          v-model="richTextContent"
          label="Content Editor"
          placeholder="Start typing your content here..."
        />
      </div>
    </section>

    <!-- Skeleton Loaders -->
    <section class="space-y-6">
      <h2 class="text-2xl font-bold">Skeleton Loaders</h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 class="text-lg font-medium mb-4">Card Skeleton</h3>
          <SkeletonLoader type="card" />
        </div>

        <div>
          <h3 class="text-lg font-medium mb-4">Text Skeleton</h3>
          <SkeletonLoader type="text" :lines="3" />
        </div>

        <div>
          <h3 class="text-lg font-medium mb-4">Avatar Skeleton</h3>
          <SkeletonLoader type="avatar" />
        </div>
      </div>
    </section>

    <!-- Radio Buttons -->
    <section class="space-y-6">
      <h2 class="text-2xl font-bold">Radio Buttons</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 class="text-lg font-medium mb-4">Basic Radio Group</h3>
          <RadioGroup
            v-model="radioValue"
            :options="radioOptions"
            label="Select an option"
          />
        </div>

        <div>
          <h3 class="text-lg font-medium mb-4">Card Radio Group</h3>
          <RadioGroup
            v-model="cardRadioValue"
            :options="planOptions"
            label="Select a plan"
            variant="card"
          />
        </div>
      </div>
    </section>

    <!-- Table with Pagination -->
    <section class="space-y-6">
      <h2 class="text-2xl font-bold">Table with Pagination</h2>

      <DataTable
        :data="tableData"
        :columns="tableColumns"
        :page-size="5"
        :sortable="true"
      />
    </section>

    <!-- Button Groups / Toggle Buttons -->
    <section class="space-y-6">
      <h2 class="text-2xl font-bold">Button Groups & Toggle Buttons</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 class="text-lg font-medium mb-4">Button Group</h3>
          <ButtonGroup v-model="buttonGroupValue" :options="alignmentOptions" />
        </div>

        <div>
          <h3 class="text-lg font-medium mb-4">Toggle Buttons</h3>
          <ToggleGroup
            v-model="toggleValues"
            :options="formattingOptions"
            multiple
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import {
  ref,
  computed,
  defineComponent,
  h,
  watch,
  nextTick,
  onMounted,
  onUnmounted
} from 'vue'

// State for demo
const enhancedSelectValue = ref('')
const debouncedAutocompleteValue = ref('')
const multiSelectWithTags = ref([])
const errorAutocompleteValue = ref('')
const richTextContent = ref(
  '<p>This is a <strong>rich text</strong> editor with <em>basic formatting</em>.</p>'
)
const radioValue = ref('option1')
const cardRadioValue = ref('basic')
const buttonGroupValue = ref('left')
const toggleValues = ref(['bold'])
const tableData = ref([
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    status: 'Active',
    role: 'Admin'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'Active',
    role: 'User'
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    status: 'Inactive',
    role: 'User'
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice@example.com',
    status: 'Active',
    role: 'Editor'
  },
  {
    id: 5,
    name: 'Charlie Wilson',
    email: 'charlie@example.com',
    status: 'Active',
    role: 'User'
  },
  {
    id: 6,
    name: 'Diana Miller',
    email: 'diana@example.com',
    status: 'Inactive',
    role: 'User'
  },
  {
    id: 7,
    name: 'Edward Davis',
    email: 'edward@example.com',
    status: 'Active',
    role: 'Admin'
  },
  {
    id: 8,
    name: 'Fiona Clark',
    email: 'fiona@example.com',
    status: 'Active',
    role: 'Editor'
  },
  {
    id: 9,
    name: 'George White',
    email: 'george@example.com',
    status: 'Inactive',
    role: 'User'
  },
  {
    id: 10,
    name: 'Hannah Green',
    email: 'hannah@example.com',
    status: 'Active',
    role: 'User'
  }
])

// Options for components
const enhancedSelectOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
  { value: 'option5', label: 'Option 5' },
  { value: 'option6', label: 'Option 6' }
]

const countriesOptions = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'mx', label: 'Mexico' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'fr', label: 'France' },
  { value: 'de', label: 'Germany' },
  { value: 'jp', label: 'Japan' },
  { value: 'cn', label: 'China' },
  { value: 'in', label: 'India' },
  { value: 'br', label: 'Brazil' },
  { value: 'au', label: 'Australia' }
]

const skillsOptions = [
  { value: 'js', label: 'JavaScript' },
  { value: 'ts', label: 'TypeScript' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'react', label: 'React' },
  { value: 'angular', label: 'Angular' },
  { value: 'node', label: 'Node.js' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'php', label: 'PHP' }
]

const radioOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' }
]

const planOptions = [
  {
    value: 'basic',
    label: 'Basic Plan',
    description: '$10/month - Basic features'
  },
  {
    value: 'pro',
    label: 'Pro Plan',
    description: '$20/month - Advanced features'
  },
  {
    value: 'enterprise',
    label: 'Enterprise',
    description: '$50/month - All features'
  }
]

const alignmentOptions = [
  {
    value: 'left',
    label: 'Left',
    icon: () =>
      h(
        'svg',
        {
          xmlns: 'http://www.w3.org/2000/svg',
          class: 'h-5 w-5',
          viewBox: '0 0 20 20',
          fill: 'currentColor'
        },
        [
          h('path', {
            'fill-rule': 'evenodd',
            d: 'M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z',
            'clip-rule': 'evenodd'
          })
        ]
      )
  },
  {
    value: 'center',
    label: 'Center',
    icon: () =>
      h(
        'svg',
        {
          xmlns: 'http://www.w3.org/2000/svg',
          class: 'h-5 w-5',
          viewBox: '0 0 20 20',
          fill: 'currentColor'
        },
        [
          h('path', {
            'fill-rule': 'evenodd',
            d: 'M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z',
            'clip-rule': 'evenodd'
          })
        ]
      )
  },
  {
    value: 'right',
    label: 'Right',
    icon: () =>
      h(
        'svg',
        {
          xmlns: 'http://www.w3.org/2000/svg',
          class: 'h-5 w-5',
          viewBox: '0 0 20 20',
          fill: 'currentColor'
        },
        [
          h('path', {
            'fill-rule': 'evenodd',
            d: 'M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 10a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z',
            'clip-rule': 'evenodd'
          })
        ]
      )
  }
]

const formattingOptions = [
  {
    value: 'bold',
    label: 'Bold',
    icon: () =>
      h(
        'svg',
        {
          xmlns: 'http://www.w3.org/2000/svg',
          class: 'h-5 w-5',
          viewBox: '0 0 20 20',
          fill: 'currentColor'
        },
        [
          h('path', {
            d: 'M13.5 10a2.5 2.5 0 01-2.5 2.5H7V7h4a2.5 2.5 0 012.5 2.5v.5zm-2.5-5H7v10h4a5 5 0 005-5v-.5a5 5 0 00-5-5z'
          })
        ]
      )
  },
  {
    value: 'italic',
    label: 'Italic',
    icon: () =>
      h(
        'svg',
        {
          xmlns: 'http://www.w3.org/2000/svg',
          class: 'h-5 w-5',
          viewBox: '0 0 20 20',
          fill: 'currentColor'
        },
        [h('path', { d: 'M6 5v1h2.5l-2.5 8H4v1h6v-1H7.5l2.5-8H12V5z' })]
      )
  },
  {
    value: 'underline',
    label: 'Underline',
    icon: () =>
      h(
        'svg',
        {
          xmlns: 'http://www.w3.org/2000/svg',
          class: 'h-5 w-5',
          viewBox: '0 0 20 20',
          fill: 'currentColor'
        },
        [
          h('path', {
            d: 'M7 3C7 2.44772 6.55228 2 6 2 5.44772 2 5 2.44772 5 3V10C5 12.7614 7.23858 15 10 15 12.7614 15 15 12.7614 15 10V3C15 2.44772 14.5523 2 14 2 13.4477 2 13 2.44772 13 3V10C13 11.6569 11.6569 13 10 13 8.34315 13 7 11.6569 7 10V3zM5 17C4.44772 17 4 17.4477 4 18 4 18.5523 4.44772 19 5 19H15C15.5523 19 16 18.5523 16 18 16 17.4477 15.5523 17 15 17H5z'
          })
        ]
      )
  }
]

const tableColumns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'status', label: 'Status' },
  { key: 'role', label: 'Role' }
]

// Utility function similar to clsx/tailwind-merge
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

// Debounce function
const debounce = (fn, delay) => {
  let timeoutId
  return function (...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), delay)
  }
}

// Enhanced Select Component
const EnhancedSelect = defineComponent({
  name: 'EnhancedSelect',
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
    },
    searchable: {
      type: Boolean,
      default: false
    },
    tags: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const isOpen = ref(false)
    const selectRef = ref(null)
    const searchInput = ref('')
    const searchInputRef = ref(null)

    const filteredOptions = computed(() => {
      if (!searchInput.value || !props.searchable) return props.options
      const searchTerm = searchInput.value.toLowerCase()
      return props.options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm)
      )
    })

    const selectedLabels = computed(() => {
      if (props.multiple) {
        return props.options
          .filter((option) => props.modelValue.includes(option.value))
          .map((option) => option.label)
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

        if (props.searchable) {
          searchInput.value = ''
          nextTick(() => {
            if (searchInputRef.value) {
              searchInputRef.value.focus()
            }
          })
        }
      } else {
        emit('update:modelValue', value)
        isOpen.value = false
        searchInput.value = ''
      }
    }

    const removeTag = (value) => {
      if (props.multiple) {
        const newValue = [...(props.modelValue || [])]
        const index = newValue.indexOf(value)

        if (index !== -1) {
          newValue.splice(index, 1)
          emit('update:modelValue', newValue)
        }
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

        if (isOpen.value && props.searchable) {
          nextTick(() => {
            if (searchInputRef.value) {
              searchInputRef.value.focus()
            }
          })
        }
      }
    }

    const closeDropdown = (e) => {
      if (selectRef.value && !selectRef.value.contains(e.target)) {
        isOpen.value = false
        searchInput.value = ''
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
        'relative w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors',
        props.disabled
          ? 'bg-gray-100 cursor-not-allowed'
          : 'bg-white cursor-pointer',
        props.error
          ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
          : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500',
        props.tags && props.multiple && props.modelValue?.length > 0
          ? 'p-1'
          : 'px-3 py-2'
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
            props.tags && props.multiple && props.modelValue?.length > 0
              ? h('div', { class: 'flex flex-wrap gap-1' }, [
                  ...selectedLabels.value.map((label, index) =>
                    h(
                      'div',
                      {
                        key: props.modelValue[index],
                        class:
                          'inline-flex items-center px-2 py-1 rounded-md text-sm bg-primary-100 text-primary-800'
                      },
                      [
                        h('span', {}, label),
                        h(
                          'button',
                          {
                            class:
                              'ml-1 text-primary-500 hover:text-primary-700 focus:outline-none',
                            onClick: (e) => {
                              e.stopPropagation()
                              removeTag(props.modelValue[index])
                            }
                          },
                          [
                            h(
                              'svg',
                              {
                                class: 'h-4 w-4',
                                xmlns: 'http://www.w3.org/2000/svg',
                                viewBox: '0 0 20 20',
                                fill: 'currentColor'
                              },
                              [
                                h('path', {
                                  'fill-rule': 'evenodd',
                                  d: 'M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z',
                                  'clip-rule': 'evenodd'
                                })
                              ]
                            )
                          ]
                        )
                      ]
                    )
                  ),
                  h('div', { class: 'flex-1 min-w-[80px]' }, [
                    isOpen.value &&
                      props.searchable &&
                      h('input', {
                        ref: searchInputRef,
                        value: searchInput.value,
                        onInput: (e) => {
                          searchInput.value = e.target.value
                        },
                        class: 'w-full border-none focus:ring-0 p-1 text-sm',
                        placeholder: 'Search...',
                        onClick: (e) => e.stopPropagation()
                      })
                  ])
                ])
              : h('div', { class: 'flex justify-between items-center' }, [
                  !props.searchable || !isOpen.value
                    ? h(
                        'span',
                        {
                          class: cn(
                            'block truncate',
                            !selectedLabels.value && 'text-gray-400'
                          )
                        },
                        selectedLabels.value || props.placeholder
                      )
                    : h('input', {
                        ref: searchInputRef,
                        value: searchInput.value,
                        onInput: (e) => {
                          searchInput.value = e.target.value
                        },
                        class: 'w-full border-none focus:ring-0 p-0',
                        placeholder: props.placeholder,
                        onClick: (e) => e.stopPropagation()
                      }),
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
              filteredOptions.value.length > 0
                ? filteredOptions.value.map((option) =>
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
                : h(
                    'div',
                    { class: 'py-2 px-3 text-gray-500 text-sm' },
                    'No options found'
                  )
            ]
          ),
        props.error &&
          h('p', { class: 'text-sm text-red-600 mt-1' }, props.error)
      ])
  }
})

// Enhanced Autocomplete Component with Debounce
const EnhancedAutocomplete = defineComponent({
  name: 'EnhancedAutocomplete',
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
    },
    debounce: {
      type: Number,
      default: 0
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const inputValue = ref('')
    const isOpen = ref(false)
    const autocompleteRef = ref(null)
    const debouncedSearch = ref('')

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

    // Debounced search
    const updateDebouncedSearch = debounce((value) => {
      debouncedSearch.value = value
    }, props.debounce)

    // Update search term
    watch(
      () => inputValue.value,
      (newValue) => {
        if (props.debounce > 0) {
          updateDebouncedSearch(newValue)
        } else {
          debouncedSearch.value = newValue
        }
      }
    )

    const filteredOptions = computed(() => {
      if (!debouncedSearch.value) return props.options
      const searchTerm = debouncedSearch.value.toLowerCase()
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
          props.error &&
            h('p', { class: 'text-sm text-red-600 mt-1' }, props.error)
        ]
      )
  }
})

// Rich Text Editor Component
const RichTextEditor = defineComponent({
  name: 'RichTextEditor',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Start typing...'
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
    const editorRef = ref(null)
    const editorContent = ref(props.modelValue)

    // Update content when modelValue changes
    watch(
      () => props.modelValue,
      (newValue) => {
        if (editorContent.value !== newValue) {
          editorContent.value = newValue
        }
      }
    )

    // Update modelValue when content changes
    watch(
      () => editorContent.value,
      (newValue) => {
        emit('update:modelValue', newValue)
      }
    )

    const execCommand = (command, value = null) => {
      document.execCommand(command, false, value)

      // Focus back on the editor
      if (editorRef.value) {
        editorRef.value.focus()

        // Get updated content
        editorContent.value = editorRef.value.innerHTML
      }
    }

    const handleInput = (e) => {
      editorContent.value = e.target.innerHTML
    }

    onMounted(() => {
      if (editorRef.value) {
        editorRef.value.innerHTML = editorContent.value
      }
    })

    return () =>
      h('div', { class: 'flex flex-col space-y-1' }, [
        props.label &&
          h(
            'label',
            { class: 'text-sm font-medium text-gray-700' },
            props.label
          ),
        h(
          'div',
          { class: 'border border-gray-300 rounded-md overflow-hidden' },
          [
            h(
              'div',
              { class: 'flex flex-wrap gap-1 p-2 border-b bg-gray-50' },
              [
                h(
                  'button',
                  {
                    class: 'p-1 rounded hover:bg-gray-200',
                    onClick: () => execCommand('bold')
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
                          d: 'M13.5 10a2.5 2.5 0 01-2.5 2.5H7V7h4a2.5 2.5 0 012.5 2.5v.5zm-2.5-5H7v10h4a5 5 0 005-5v-.5a5 5 0 00-5-5z'
                        })
                      ]
                    )
                  ]
                ),
                h(
                  'button',
                  {
                    class: 'p-1 rounded hover:bg-gray-200',
                    onClick: () => execCommand('italic')
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
                          d: 'M6 5v1h2.5l-2.5 8H4v1h6v-1H7.5l2.5-8H12V5z'
                        })
                      ]
                    )
                  ]
                ),
                h(
                  'button',
                  {
                    class: 'p-1 rounded hover:bg-gray-200',
                    onClick: () => execCommand('underline')
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
                          d: 'M7 3C7 2.44772 6.55228 2 6 2 5.44772 2 5 2.44772 5 3V10C5 12.7614 7.23858 15 10 15 12.7614 15 15 12.7614 15 10V3C15 2.44772 14.5523 2 14 2 13.4477 2 13 2.44772 13 3V10C13 11.6569 11.6569 13 10 13 8.34315 13 7 11.6569 7 10V3zM5 17C4.44772 17 4 17.4477 4 18 4 18.5523 4.44772 19 5 19H15C15.5523 19 16 18.5523 16 18 16 17.4477 15.5523 17 15 17H5z'
                        })
                      ]
                    )
                  ]
                ),
                h('div', { class: 'w-px h-6 bg-gray-300 mx-1' }),
                h(
                  'button',
                  {
                    class: 'p-1 rounded hover:bg-gray-200',
                    onClick: () => execCommand('insertUnorderedList')
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
                          d: 'M5 4a1 1 0 011-1h10a1 1 0 110 2H6a1 1 0 01-1-1zm0 6a1 1 0 011-1h10a1 1 0 110 2H6a1 1 0 01-1-1zm0 6a1 1 0 011-1h10a1 1 0 110 2H6a1 1 0 01-1-1zm-3-9a1 1 0 00-1 1v1a1 1 0 102 0V8a1 1 0 00-1-1zm0 6a1 1 0 100 2 1 1 0 000-2zm0-10a1 1 0 100 2 1 1 0 000-2z',
                          'clip-rule': 'evenodd'
                        })
                      ]
                    )
                  ]
                ),
                h(
                  'button',
                  {
                    class: 'p-1 rounded hover:bg-gray-200',
                    onClick: () => execCommand('insertOrderedList')
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
                          d: 'M5 4a1 1 0 011-1h10a1 1 0 110 2H6a1 1 0 01-1-1zm0 6a1 1 0 011-1h10a1 1 0 110 2H6a1 1 0 01-1-1zm0 6a1 1 0 011-1h10a1 1 0 110 2H6a1 1 0 01-1-1zm-4-3a1 1 0 011-1h1a1 1 0 110 2H2a1 1 0 01-1-1zm0-6a1 1 0 011-1h1a1 1 0 110 2H2a1 1 0 01-1-1zm0-6a1 1 0 011-1h1a1 1 0 110 2H2a1 1 0 01-1-1z',
                          'clip-rule': 'evenodd'
                        })
                      ]
                    )
                  ]
                ),
                h('div', { class: 'w-px h-6 bg-gray-300 mx-1' }),
                h(
                  'button',
                  {
                    class: 'p-1 rounded hover:bg-gray-200',
                    onClick: () =>
                      execCommand(
                        'createLink',
                        prompt('Enter link URL', 'https://')
                      )
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
                          d: 'M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z',
                          'clip-rule': 'evenodd'
                        })
                      ]
                    )
                  ]
                )
              ]
            ),
            h('div', {
              ref: editorRef,
              class: cn(
                'p-3 min-h-[150px] focus:outline-none',
                props.disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
              ),
              contentEditable: !props.disabled,
              onInput: handleInput,
              placeholder: props.placeholder
            })
          ]
        ),
        props.error &&
          h('p', { class: 'text-sm text-red-600 mt-1' }, props.error)
      ])
  }
})

// Skeleton Loader Component
const SkeletonLoader = defineComponent({
  name: 'SkeletonLoader',
  props: {
    type: {
      type: String,
      default: 'text',
      validator: (value) =>
        ['text', 'card', 'avatar', 'button', 'input'].includes(value)
    },
    lines: {
      type: Number,
      default: 1
    },
    width: {
      type: String,
      default: 'full'
    },
    height: {
      type: String,
      default: 'auto'
    }
  },
  setup(props) {
    const baseClasses = 'animate-pulse bg-gray-200 rounded'

    const renderText = () => {
      return h(
        'div',
        { class: 'space-y-2' },
        Array.from({ length: props.lines }).map((_, i) =>
          h('div', {
            key: i,
            class: cn(
              baseClasses,
              'h-4',
              i === props.lines - 1 && props.lines > 1 ? 'w-4/5' : 'w-full'
            )
          })
        )
      )
    }

    const renderCard = () => {
      return h('div', { class: 'border rounded-lg overflow-hidden' }, [
        h('div', { class: `${baseClasses} h-48 w-full` }),
        h('div', { class: 'p-4 space-y-3' }, [
          h('div', { class: `${baseClasses} h-6 w-2/3` }),
          h('div', { class: `${baseClasses} h-4 w-full` }),
          h('div', { class: `${baseClasses} h-4 w-full` }),
          h('div', { class: `${baseClasses} h-4 w-4/5` })
        ])
      ])
    }

    const renderAvatar = () => {
      return h('div', { class: 'flex items-center space-x-4' }, [
        h('div', { class: `${baseClasses} h-12 w-12 rounded-full` }),
        h('div', { class: 'space-y-2' }, [
          h('div', { class: `${baseClasses} h-4 w-32` }),
          h('div', { class: `${baseClasses} h-3 w-24` })
        ])
      ])
    }

    const renderButton = () => {
      return h('div', { class: `${baseClasses} h-10 w-24 rounded-md` })
    }

    const renderInput = () => {
      return h('div', { class: 'space-y-2' }, [
        h('div', { class: `${baseClasses} h-4 w-16` }),
        h('div', { class: `${baseClasses} h-10 w-full rounded-md` })
      ])
    }

    return () => {
      switch (props.type) {
        case 'text':
          return renderText()
        case 'card':
          return renderCard()
        case 'avatar':
          return renderAvatar()
        case 'button':
          return renderButton()
        case 'input':
          return renderInput()
        default:
          return renderText()
      }
    }
  }
})

// Radio Group Component
const RadioGroup = defineComponent({
  name: 'RadioGroup',
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
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'card'].includes(value)
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const updateValue = (value) => {
      if (!props.disabled) {
        emit('update:modelValue', value)
      }
    }

    const renderDefaultRadio = () => {
      return h(
        'div',
        { class: 'space-y-2' },
        props.options.map((option) =>
          h(
            'label',
            {
              key: option.value,
              class: cn(
                'flex items-center space-x-3 cursor-pointer',
                props.disabled && 'opacity-60 cursor-not-allowed'
              )
            },
            [
              h('input', {
                type: 'radio',
                checked: props.modelValue === option.value,
                value: option.value,
                disabled: props.disabled,
                onChange: () => updateValue(option.value),
                class:
                  'h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300'
              }),
              h(
                'span',
                { class: 'text-sm font-medium text-gray-700' },
                option.label
              ),
              option.description &&
                h(
                  'span',
                  { class: 'text-xs text-gray-500' },
                  option.description
                )
            ]
          )
        )
      )
    }

    const renderCardRadio = () => {
      return h(
        'div',
        { class: 'space-y-2' },
        props.options.map((option) =>
          h(
            'label',
            {
              key: option.value,
              class: cn(
                'block border rounded-lg p-4 cursor-pointer transition-colors',
                props.modelValue === option.value
                  ? 'bg-primary-50 border-primary-500 ring-2 ring-primary-500'
                  : 'border-gray-300 hover:border-gray-400',
                props.disabled && 'opacity-60 cursor-not-allowed'
              )
            },
            [
              h('div', { class: 'flex items-center justify-between' }, [
                h('div', { class: 'flex items-center' }, [
                  h('input', {
                    type: 'radio',
                    checked: props.modelValue === option.value,
                    value: option.value,
                    disabled: props.disabled,
                    onChange: () => updateValue(option.value),
                    class:
                      'h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300'
                  }),
                  h(
                    'span',
                    { class: 'ml-3 font-medium text-gray-900' },
                    option.label
                  )
                ])
              ]),
              option.description &&
                h(
                  'p',
                  { class: 'mt-2 text-sm text-gray-500' },
                  option.description
                )
            ]
          )
        )
      )
    }

    return () =>
      h('div', { class: 'space-y-1' }, [
        props.label &&
          h(
            'label',
            { class: 'text-sm font-medium text-gray-700' },
            props.label
          ),
        props.variant === 'default' ? renderDefaultRadio() : renderCardRadio(),
        props.error &&
          h('p', { class: 'text-sm text-red-600 mt-1' }, props.error)
      ])
  }
})

// Data Table Component with Pagination
const DataTable = defineComponent({
  name: 'DataTable',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    pageSize: {
      type: Number,
      default: 10
    },
    sortable: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const currentPage = ref(1)
    const sortKey = ref('')
    const sortDirection = ref('asc')

    const totalPages = computed(() => {
      return Math.ceil(props.data.length / props.pageSize)
    })

    const sortedData = computed(() => {
      if (!sortKey.value) return props.data

      return [...props.data].sort((a, b) => {
        const aValue = a[sortKey.value]
        const bValue = b[sortKey.value]

        if (aValue < bValue) return sortDirection.value === 'asc' ? -1 : 1
        if (aValue > bValue) return sortDirection.value === 'asc' ? 1 : -1
        return 0
      })
    })

    const paginatedData = computed(() => {
      const start = (currentPage.value - 1) * props.pageSize
      const end = start + props.pageSize
      return sortedData.value.slice(start, end)
    })

    const toggleSort = (key) => {
      if (!props.sortable) return

      if (sortKey.value === key) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
      } else {
        sortKey.value = key
        sortDirection.value = 'asc'
      }
    }

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++
      }
    }

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--
      }
    }

    const goToPage = (page) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
      }
    }

    return () =>
      h('div', { class: 'space-y-4' }, [
        h(
          'div',
          { class: 'overflow-x-auto rounded-lg border border-gray-200' },
          [
            h('table', { class: 'min-w-full divide-y divide-gray-200' }, [
              h('thead', { class: 'bg-gray-50' }, [
                h(
                  'tr',
                  {},
                  props.columns.map((column) =>
                    h(
                      'th',
                      {
                        key: column.key,
                        class: cn(
                          'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                          props.sortable && 'cursor-pointer hover:bg-gray-100'
                        ),
                        onClick: () => toggleSort(column.key)
                      },
                      [
                        h('div', { class: 'flex items-center space-x-1' }, [
                          h('span', {}, column.label),
                          props.sortable &&
                            sortKey.value === column.key &&
                            h(
                              'span',
                              {},
                              sortDirection.value === 'asc'
                                ? h(
                                    'svg',
                                    {
                                      class: 'h-4 w-4',
                                      xmlns: 'http://www.w3.org/2000/svg',
                                      viewBox: '0 0 20 20',
                                      fill: 'currentColor'
                                    },
                                    [
                                      h('path', {
                                        'fill-rule': 'evenodd',
                                        d: 'M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z',
                                        'clip-rule': 'evenodd'
                                      })
                                    ]
                                  )
                                : h(
                                    'svg',
                                    {
                                      class: 'h-4 w-4',
                                      xmlns: 'http://www.w3.org/2000/svg',
                                      viewBox: '0 0 20 20',
                                      fill: 'currentColor'
                                    },
                                    [
                                      h('path', {
                                        'fill-rule': 'evenodd',
                                        d: 'M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z',
                                        'clip-rule': 'evenodd'
                                      })
                                    ]
                                  )
                            )
                        ])
                      ]
                    )
                  )
                )
              ]),
              h(
                'tbody',
                { class: 'bg-white divide-y divide-gray-200' },
                paginatedData.value.length > 0
                  ? paginatedData.value.map((row, rowIndex) =>
                      h(
                        'tr',
                        { key: row.id || rowIndex, class: 'hover:bg-gray-50' },
                        props.columns.map((column) =>
                          h(
                            'td',
                            {
                              key: `${rowIndex}-${column.key}`,
                              class:
                                'px-6 py-4 whitespace-nowrap text-sm text-gray-500'
                            },
                            row[column.key]
                          )
                        )
                      )
                    )
                  : h('tr', {}, [
                      h(
                        'td',
                        {
                          colSpan: props.columns.length,
                          class: 'px-6 py-4 text-center text-sm text-gray-500'
                        },
                        'No data available'
                      )
                    ])
              )
            ])
          ]
        ),
        totalPages.value > 1 &&
          h('div', { class: 'flex items-center justify-between' }, [
            h('div', { class: 'flex items-center space-x-2' }, [
              h(
                'span',
                { class: 'text-sm text-gray-700' },
                `Showing ${(currentPage.value - 1) * props.pageSize + 1} to ${Math.min(currentPage.value * props.pageSize, props.data.length)} of ${props.data.length} entries`
              )
            ]),
            h('div', { class: 'flex items-center space-x-2' }, [
              h(
                'button',
                {
                  class: cn(
                    'px-3 py-1 border rounded-md text-sm',
                    currentPage.value === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  ),
                  disabled: currentPage.value === 1,
                  onClick: prevPage
                },
                'Previous'
              ),

              // Page numbers
              ...Array.from({ length: Math.min(5, totalPages.value) }).map(
                (_, i) => {
                  let pageNum

                  if (totalPages.value <= 5) {
                    pageNum = i + 1
                  } else if (currentPage.value <= 3) {
                    pageNum = i + 1
                  } else if (currentPage.value >= totalPages.value - 2) {
                    pageNum = totalPages.value - 4 + i
                  } else {
                    pageNum = currentPage.value - 2 + i
                  }

                  return h(
                    'button',
                    {
                      key: pageNum,
                      class: cn(
                        'px-3 py-1 border rounded-md text-sm',
                        currentPage.value === pageNum
                          ? 'bg-primary-600 text-white border-primary-600'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      ),
                      onClick: () => goToPage(pageNum)
                    },
                    pageNum
                  )
                }
              ),

              h(
                'button',
                {
                  class: cn(
                    'px-3 py-1 border rounded-md text-sm',
                    currentPage.value === totalPages.value
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  ),
                  disabled: currentPage.value === totalPages.value,
                  onClick: nextPage
                },
                'Next'
              )
            ])
          ])
      ])
  }
})

// Button Group Component
const ButtonGroup = defineComponent({
  name: 'ButtonGroup',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['sm', 'md', 'lg'].includes(value)
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const updateValue = (value) => {
      if (!props.disabled) {
        emit('update:modelValue', value)
      }
    }

    const sizeClasses = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-2 text-sm',
      lg: 'px-4 py-2 text-base'
    }

    return () =>
      h(
        'div',
        {
          class: cn(
            'inline-flex rounded-md shadow-sm',
            props.disabled && 'opacity-60'
          )
        },
        props.options.map((option, index) =>
          h(
            'button',
            {
              key: option.value,
              type: 'button',
              disabled: props.disabled,
              class: cn(
                'relative inline-flex items-center font-medium focus:z-10 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                sizeClasses[props.size],
                props.modelValue === option.value
                  ? 'bg-primary-600 text-white hover:bg-primary-700'
                  : 'bg-white text-gray-700 hover:bg-gray-50',
                index === 0 ? 'rounded-l-md' : '',
                index === props.options.length - 1 ? 'rounded-r-md' : '',
                index !== 0 ? '-ml-px' : '',
                'border border-gray-300'
              ),
              onClick: () => updateValue(option.value)
            },
            [
              option.icon && h('span', { class: 'mr-2' }, [h(option.icon)]),
              option.label
            ]
          )
        )
      )
  }
})

// Toggle Group Component
const ToggleGroup = defineComponent({
  name: 'ToggleGroup',
  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['sm', 'md', 'lg'].includes(value)
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const toggleValue = (value) => {
      if (props.disabled) return

      if (props.multiple) {
        const newValue = [...props.modelValue]
        const index = newValue.indexOf(value)

        if (index === -1) {
          newValue.push(value)
        } else {
          newValue.splice(index, 1)
        }

        emit('update:modelValue', newValue)
      } else {
        // If not multiple, act like a radio button
        if (props.modelValue.includes(value)) {
          emit('update:modelValue', [])
        } else {
          emit('update:modelValue', [value])
        }
      }
    }

    const isSelected = (value) => {
      return props.modelValue.includes(value)
    }

    const sizeClasses = {
      sm: 'p-1.5 text-xs',
      md: 'p-2 text-sm',
      lg: 'p-2.5 text-base'
    }

    return () =>
      h(
        'div',
        {
          class: cn(
            'inline-flex p-1 space-x-1 bg-gray-100 rounded-md',
            props.disabled && 'opacity-60'
          )
        },
        props.options.map((option) =>
          h(
            'button',
            {
              key: option.value,
              type: 'button',
              disabled: props.disabled,
              class: cn(
                'flex items-center justify-center rounded focus:outline-none transition-colors',
                sizeClasses[props.size],
                isSelected(option.value)
                  ? 'bg-white shadow text-gray-900'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-200'
              ),
              onClick: () => toggleValue(option.value)
            },
            [
              option.icon && h(option.icon),
              option.label &&
                h('span', { class: option.icon ? 'ml-2' : '' }, option.label)
            ]
          )
        )
      )
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

/* Rich text editor content styles */
[contenteditable='true']:empty:before {
  content: attr(placeholder);
  color: #9ca3af;
  pointer-events: none;
}

/* Animation for skeleton loaders */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>

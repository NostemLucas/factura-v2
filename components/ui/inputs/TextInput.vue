<template>
  <div :class="[containerClasses]">
    <!-- Standard label (when not using floating label) -->
    <label
      v-if="label && !floatingLabel"
      :for="id"
      class="block text-sm font-medium text-gray-700 mb-1"
    >
      {{ label }}
    </label>

    <div class="relative">
      <!-- Icon positions -->
      <div
        v-if="$slots.prefix"
        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
      >
        <slot name="prefix" />
      </div>

      <div
        v-if="$slots.suffix"
        class="absolute inset-y-0 right-0 flex items-center pr-3"
        :class="{ 'cursor-pointer': $slots.suffixAction }"
        @click="$slots.suffixAction ? $emit('suffix-click') : null"
      >
        <slot name="suffix" />
      </div>

      <div
        v-if="$slots.leadingIcon"
        class="absolute inset-y-0 left-0 flex items-center pl-3"
        :class="{
          'pointer-events-none': !$slots.leadingIconAction,
          'cursor-pointer': $slots.leadingIconAction
        }"
        @click="$slots.leadingIconAction ? $emit('leading-icon-click') : null"
      >
        <slot name="leadingIcon" />
      </div>

      <div
        v-if="$slots.trailingIcon"
        class="absolute inset-y-0 right-0 flex items-center pr-3"
        :class="{
          'pointer-events-none': !$slots.trailingIconAction,
          'cursor-pointer': $slots.trailingIconAction
        }"
        @click="$slots.trailingIconAction ? $emit('trailing-icon-click') : null"
      >
        <slot name="trailingIcon" />
      </div>

      <!-- Top left icon -->
      <div
        v-if="$slots.topLeft"
        class="absolute top-0 left-0 flex items-start pt-2 pl-2"
        :class="{ 'cursor-pointer': $slots.topLeftAction }"
        @click="$slots.topLeftAction ? $emit('top-left-click') : null"
      >
        <slot name="topLeft" />
      </div>

      <!-- Top right icon -->
      <div
        v-if="$slots.topRight"
        class="absolute top-0 right-0 flex items-start pt-2 pr-2"
        :class="{ 'cursor-pointer': $slots.topRightAction }"
        @click="$slots.topRightAction ? $emit('top-right-click') : null"
      >
        <slot name="topRight" />
      </div>

      <!-- Bottom left icon -->
      <div
        v-if="$slots.bottomLeft"
        class="absolute bottom-0 left-0 flex items-end pb-2 pl-2"
        :class="{ 'cursor-pointer': $slots.bottomLeftAction }"
        @click="$slots.bottomLeftAction ? $emit('bottom-left-click') : null"
      >
        <slot name="bottomLeft" />
      </div>

      <!-- Bottom right icon -->
      <div
        v-if="$slots.bottomRight"
        class="absolute bottom-0 right-0 flex items-end pb-2 pr-2"
        :class="{ 'cursor-pointer': $slots.bottomRightAction }"
        @click="$slots.bottomRightAction ? $emit('bottom-right-click') : null"
      >
        <slot name="bottomRight" />
      </div>

      <!-- Floating label container -->
      <div v-if="floatingLabel" class="relative">
        <input
          :id="id"
          :type="type"
          :value="modelValue"
          @input="
            $emit(
              'update:modelValue',
              ($event.target as HTMLInputElement).value
            )
          "
          :placeholder="floatingLabel ? ' ' : placeholder"
          :disabled="disabled"
          :readonly="readonly"
          :class="[
            inputClasses,
            'peer', // Required for peer-based styling
            'placeholder-transparent' // Hide the placeholder when using floating label
          ]"
          v-bind="$attrs"
        />
        <label
          :for="id"
          :class="[
            'absolute text-sm duration-150 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4',
            error
              ? 'text-red-500 peer-focus:text-red-500'
              : 'text-gray-500 peer-focus:text-primary',
            'rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
          ]"
        >
          {{ label }}
        </label>
      </div>

      <!-- Standard input (when not using floating label) -->
      <input
        v-if="!floatingLabel"
        :id="id"
        :type="type"
        :value="modelValue"
        @input="
          $emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :class="inputClasses"
        v-bind="$attrs"
      />
    </div>

    <!-- Error and hint messages -->
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ errorMessage }}</p>
    <p v-else-if="hint" class="mt-1 text-sm text-gray-500">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
import { tv, type VariantProps } from 'tailwind-variants'
import { twMerge } from 'tailwind-merge'

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
  base: 'w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/30 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-50',
  variants: {
    variant: {
      default: 'border border-gray-300',
      filled:
        'bg-gray-100 border border-transparent focus:bg-white focus:border-primary',
      outline: 'bg-transparent border border-gray-300 focus:border-primary',
      floating: 'border border-gray-300 pt-4' // Additional padding for floating label
    },
    size: {
      sm: 'text-sm px-3 py-1.5 h-8',
      md: 'text-base px-4 py-2 h-10',
      lg: 'text-lg px-5 py-2.5 h-12',
      xl: 'text-xl px-6 py-3 h-14'
    },
    error: {
      true: 'border-red-500 focus:border-red-500 focus:ring-red-500/30'
    },
    withPrefix: {
      true: 'pl-10'
    },
    withSuffix: {
      true: 'pr-10'
    },
    withLeadingIcon: {
      true: 'pl-10'
    },
    withTrailingIcon: {
      true: 'pr-10'
    },
    withTopLeft: {
      true: 'pt-6 pl-6'
    },
    withTopRight: {
      true: 'pt-6 pr-6'
    },
    withBottomLeft: {
      true: 'pb-6 pl-6'
    },
    withBottomRight: {
      true: 'pb-6 pr-6'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
    error: false,
    withPrefix: false,
    withSuffix: false,
    withLeadingIcon: false,
    withTrailingIcon: false,
    withTopLeft: false,
    withTopRight: false,
    withBottomLeft: false,
    withBottomRight: false
  },
  // Handle compound variants for special cases
  compoundVariants: [
    {
      variant: 'floating',
      size: 'sm',
      class: 'pt-3 pb-1 px-3 h-10' // Adjust for floating label in small size
    },
    {
      variant: 'floating',
      size: 'md',
      class: 'pt-4 pb-2 px-4 h-14' // Adjust for floating label in medium size
    },
    {
      variant: 'floating',
      size: 'lg',
      class: 'pt-5 pb-2 px-5 h-16' // Adjust for floating label in large size
    },
    {
      variant: 'floating',
      size: 'xl',
      class: 'pt-6 pb-3 px-6 h-18' // Adjust for floating label in extra large size
    }
  ]
})

// Extract variant types
type InputVariants = VariantProps<typeof input>
type ContainerVariants = VariantProps<typeof container>

// Define props with TypeScript interface
/* @vue-ignore */
interface InputProps extends InputVariants, ContainerVariants {
  modelValue: string | number
  id?: string
  label?: string
  type?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  error?: boolean
  errorMessage?: string
  hint?: string
  class?: string
  floatingLabel?: boolean
  iconPosition?:
    | 'prefix'
    | 'suffix'
    | 'leading'
    | 'trailing'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'
}

const props = withDefaults(defineProps<InputProps>(), {
  modelValue: '',
  id: () => `input-${Math.random().toString(36).substring(2, 9)}`,
  label: '',
  type: 'text',
  placeholder: '',
  disabled: false,
  readonly: false,
  error: false,
  errorMessage: '',
  hint: '',
  variant: 'default',
  size: 'md',
  responsive: 'full',
  class: '',
  floatingLabel: false,
  iconPosition: undefined
})

// Define emits with TypeScript
defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'suffix-click'): void
  (e: 'leading-icon-click'): void
  (e: 'trailing-icon-click'): void
  (e: 'top-left-click'): void
  (e: 'top-right-click'): void
  (e: 'bottom-left-click'): void
  (e: 'bottom-right-click'): void
}>()

const slots = useSlots()

// Compute the correct variant based on floatingLabel prop
const computedVariant = computed(() => {
  if (props.floatingLabel) {
    return 'floating'
  }
  return props.variant
})

const inputClasses = computed(() => {
  return twMerge(
    input({
      variant: computedVariant.value,
      size: props.size,
      error: props.error,
      withPrefix: !!slots.prefix,
      withSuffix: !!slots.suffix,
      withLeadingIcon: !!slots.leadingIcon,
      withTrailingIcon: !!slots.trailingIcon,
      withTopLeft: !!slots.topLeft,
      withTopRight: !!slots.topRight,
      withBottomLeft: !!slots.bottomLeft,
      withBottomRight: !!slots.bottomRight
    }),
    props.class
  )
})

const containerClasses = computed(() => {
  return container({
    responsive: props.responsive
  })
})
</script>

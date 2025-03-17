<template>
  <UButton
    :variant="variant"
    :size="size"
    :class="customClasses"
    :disabled="loading"
    @click="$emit('click')"
  >
    <template v-if="loading">
      <span class="animate-spin">🔄</span>
    </template>
    <template v-else>
      <UIcon v-if="icon" :name="icon" class="mr-2" />
      <slot>Button</slot>
      <UIcon v-if="iconRight" :name="iconRight" class="ml-2" />
    </template>
  </UButton>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { UButton } from '#components'

defineEmits(['click'])

const props = withDefaults(
  defineProps<{
    variant?: 'solid' | 'ghost' | 'outline' | 'link' | 'soft' | 'subtle'
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    block?: boolean
    rounded?: boolean
    loading?: boolean
    icon?: string
    iconRight?: string
  }>(),
  {
    variant: 'solid',
    size: 'md',
    block: false,
    rounded: false,
    loading: false,
    icon: '',
    iconRight: ''
  }
)

// Clases dinámicas para mejor personalización
const customClasses = computed(() => ({
  'w-full': props.block,
  'rounded-full': props.rounded
}))
</script>

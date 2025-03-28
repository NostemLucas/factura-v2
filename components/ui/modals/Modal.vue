<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    open: boolean
    title: string
    description?: string
    footer?: boolean
    close: () => void
    accept?: () => void
  }>(),
  {
    footer: true,
    description: '',
    accept: () => {}
  }
)
const { accept, close, description, footer, open, title } = props
</script>

<template>
  <UModal v-model:open="open" :title="title">
    <template #content>
      <!-- Aquí iría el contenido del modal, si se necesita -->
      <p>{{ description }}</p>
    </template>

    <template #footer>
      <div v-if="footer" class="flex py-1 items-center justify-between">
        <UButton icon="i-lucide-x" @click="close">Cancelar</UButton>
        <UButton icon="i-lucide-check" @click="accept">Guardar</UButton>
      </div>
    </template>
  </UModal>
</template>

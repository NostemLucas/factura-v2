<script setup lang="ts">
const open = ref(false)

defineProps<{
  title?: string
  description?: string
}>()

defineShortcuts({
  o: () => (open.value = !open.value)
})
</script>

<template>
  <UModal v-model:open="open" title="Modal with title">
    <UButton label="Open" color="neutral" variant="subtle" />

    <template #content>
      <Placeholder class="h-48 m-4" />
    </template>
  </UModal>
</template>

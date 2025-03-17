<script setup>
import MainLayout from '@/layouts/MainLayout.vue'
import SaleView from '@/components/views/SaleView.vue'
import ResponsiveChip from '~/components/utils/ResponsiveChip.vue'
import CustomButton from '~/components/ui/Button/CustomButton.vue'
const handleClick = () => {
  alert('¡Hola desde el botón!') // Muestra una alerta
  console.log('El botón fue clickeado') // Imprime en la consola
}
</script>

<template>
  <CustomButton @click="handleClick" variant="solid" loading />
  <ResponsiveChip />
</template>

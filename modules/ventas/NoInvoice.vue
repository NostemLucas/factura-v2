<script setup lang="ts"></script>
<template>
  <div class="h-full flex items-center justify-center bg-background">
    <div
      class="text-center max-w-md p-6 bg-gray-100 dark:bg-[#1d2332] rounded-xl shadow-sm"
    >
      <div
        class="bg-blue-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4"
      >
        <DocumentIcon class="h-8 w-8 text-blue-600" />
      </div>
      <h3 class="text-lg font-medium text-foreground">
        Ninguna factura seleccionada
      </h3>
      <p class="mt-2 text-sm text-foreground">
        Seleccione una factura de la lista para visualizar todos los detalles y
        opciones disponibles.
      </p>
      <UButton class="mt-2" color="primary">Crear nueva factura</UButton>
    </div>
  </div>
</template>

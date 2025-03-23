<template>
  <!-- TODO: Añadir validación de variable de entorno -->
  <!-- <div v-show="constants.env == 'development'"> -->
  <div
    class="fixed z-50 flex items-center justify-center w-12 h-12 p-3 font-mono text-sm text-white bg-gray-800 rounded-full bottom-1 right-1"
  >
    <div class="block sm:hidden">xs</div>
    <div class="hidden sm:block md:hidden">sm</div>
    <div class="hidden md:block lg:hidden">md</div>
    <div class="hidden lg:block xl:hidden">lg</div>
    <div class="hidden xl:block 2xl:hidden">xl</div>
    <div class="hidden 2xl:block">2xl</div>
  </div>
</template>

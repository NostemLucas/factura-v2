<script setup lang="ts">
  import { useConstants } from '~/config/constants';

  const constants = useConstants();
</script>
<template>
  <div v-show="constants.env == 'development'">
    <div
      class="fixed z-50 flex items-center justify-center w-20 h-20 p-3 font-mono text-4xl text-white bg-gray-800 rounded-full bottom-1 left-1"
    >
      <div class="block sm:hidden">xs</div>
      <div class="hidden sm:block md:hidden">sm</div>
      <div class="hidden md:block lg:hidden">md</div>
      <div class="hidden lg:block xl:hidden">lg</div>
      <div class="hidden xl:block 2xl:hidden">xl</div>
      <div class="hidden 2xl:block">2xl</div>
    </div>
  </div>
</template>

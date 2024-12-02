<template>
  <div class="loadingScreen h-full flexCenter font-semibold text-2xl">
    <div class="loadingMessageContainer flex  gap-4">
      <span>Loading</span>
      <Spinner />
    </div>
  </div>
</template>

<script setup lang="ts">
import Spinner from '@/components/loading/Spinner.vue'
</script>
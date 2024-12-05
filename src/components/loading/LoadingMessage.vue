<template>
  <div class="loadingMessageContainer flex font-semibold flexCenter text-2xl gap-4">
    <span>
      <slot />
    </span>
    <Spinner />
  </div>
</template>

<script setup lang="ts">
import Spinner from '@/components/loading/Spinner.vue'
</script>
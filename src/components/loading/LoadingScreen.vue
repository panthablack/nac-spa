<template>
  <div class="loadingScreen h-full flexCenter">
    <LoadingMessage>{{ message || 'Loading' }}</LoadingMessage>
  </div>
</template>

<script setup lang="ts">
import LoadingMessage from '@/components/loading/LoadingMessage.vue'

defineProps<{
  message: string
}>()
</script>
<template>
  <div class="appContainer">
    <component :is="layout" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const layout = computed(() => DefaultLayout)

const title = import.meta.env.VITE_APP_NAME
document.title = title
</script>
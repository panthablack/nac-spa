<template>
  <div class="appContainer">
    <LoadingScreen v-if="booting" />
    <component
      v-else
      :is="layout"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useBootStore } from '@/stores/boot'
import LoadingScreen from '@/components/loading/LoadingScreen.vue'
import { useTitle } from '@/composables/useTitle'

const bootStore = useBootStore()
const booting = computed(() => bootStore.booting)
bootStore.boot()

const layout = computed(() => DefaultLayout)

useTitle()
</script>
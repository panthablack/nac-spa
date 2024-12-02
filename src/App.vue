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
import { computed, watch } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useRoute } from 'vue-router'
import { useBootStore } from '@/stores/boot'
import LoadingScreen from '@/components/loading/LoadingScreen.vue'

const bootStore = useBootStore()
const route = useRoute()

const booting = computed(() => bootStore.booting)

const layout = computed(() => DefaultLayout)

const title = computed(() => route.meta.title || import.meta.env.VITE_APP_NAME)
watch(title, (t: string) => document.title = t)

bootStore.boot()
</script>
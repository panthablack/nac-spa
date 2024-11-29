<template>
  <div class="dashboardViewContainer">
    <h1 v-if="user">Welcome {{ user.name }}</h1>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const user = authStore.user
</script>
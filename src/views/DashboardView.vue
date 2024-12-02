<template>
  <div class="dashboardViewContainer p-4">
    <h1
      v-if="authStore.user"
      class="mb-4"
    >Welcome {{ authStore.user.name }}</h1>
    <PrimaryButton @click="startNewGame">Start New Game</PrimaryButton>
  </div>
</template>

<script setup lang="ts">
import PrimaryButton from '@/components/buttons/PrimaryButton.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const startNewGame = () => {
  alert('startNewGame')
}
</script>
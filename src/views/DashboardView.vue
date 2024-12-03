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
import { useGamesStore } from '@/stores/games'
import { api } from '@/utilities/api'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const gameStore = useGamesStore()
const router = useRouter()

const startNewGame = async () => {
  const game = (await api('/games/store'))
  if (!game) return
  gameStore.setActiveGame(game)
  router.push(`/games/${game.id}`)
}
</script>
<template>
  <PageContainer class="dashboardViewContainer">
    <PageHeading>Dashboard</PageHeading>
    <h2
      v-if="authStore.user"
      class="mb-4"
    >Welcome {{ authStore.user.name }}</h2>
    <div class="my-4 rounded-lg bg-slate-50 p-8">
      <div class="existingGamesTableContainer px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">
          <div class="sm:flex-auto">
            <h1 class="text-base font-semibold text-gray-900">Active Games</h1>
            <p class="mt-2 text-sm text-gray-700">Join an existing game:</p>
          </div>
          <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <PrimaryButton @click="startNewGame">Start New Game</PrimaryButton>
          </div>
        </div>
      </div>
      <ExistingGamesTable
        v-if="gameStore.existingGames && !gameStore.fetchingExistingGames"
        :games="gameStore.existingGames"
        :loading="gameStore.fetchingExistingGames"
        @join="onJoinGame"
      />
    </div>
  </PageContainer>
</template>

<script setup lang="ts">
import PrimaryButton from '@/components/buttons/PrimaryButton.vue'
import { useAuthStore } from '@/stores/auth'
import { useGamesStore } from '@/stores/games'
import { useRouter } from 'vue-router'
import PageContainer from '@/components/pages/PageContainer.vue'
import PageHeading from '@/components/pages/PageHeading.vue'
import ExistingGamesTable from '@/components/games/ExistingGamesTable.vue'
import type { Game } from '@/types/game'
import { useReverb } from '@/composables/useReverb'

const authStore = useAuthStore()
const gameStore = useGamesStore()
const router = useRouter()
const { close, listen } = useReverb()

const closeDashboardListeners = () => close('nac-lobby')

const onJoinGame = async (game: Game) => setGameAndStartPlaying(await gameStore.join(game))

const setGameAndStartPlaying = (game: Game) => {
  if (!game) return
  gameStore.setActiveGame(game)
  closeDashboardListeners()
  router.push(`/games/${game.id}`)
}

const startNewGame = async () => setGameAndStartPlaying(await gameStore.startNewGame())

// on created actions
listen('nac-lobby', 'GameJoined', () => gameStore.fetchExistingGames())
listen('nac-lobby', 'GameCreated', () => gameStore.fetchExistingGames())
gameStore.fetchExistingGames()
</script>
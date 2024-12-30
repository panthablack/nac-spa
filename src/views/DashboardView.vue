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
        v-if="gamesStore.existingGames && !gamesStore.fetchingExistingGames"
        :games="gamesStore.existingGames"
        :loading="gamesStore.fetchingExistingGames"
        @join="onJoinGame"
      />
    </div>
  </PageContainer>
</template>

<script setup lang="ts">
import PrimaryButton from '@/components/buttons/PrimaryButton.vue'
import { useAuthStore } from '@/stores/auth'
import { useGamesStore } from '@/stores/games'
import { api } from '@/utilities/api'
import { useRouter } from 'vue-router'
import PageContainer from '@/components/pages/PageContainer.vue'
import PageHeading from '@/components/pages/PageHeading.vue'
import ExistingGamesTable from '@/components/games/ExistingGamesTable.vue'
import type { Game } from '@/types/game'
import { useReverb } from '@/composables/useReverb'

const authStore = useAuthStore()
const gamesStore = useGamesStore()
const router = useRouter()
const { listen } = useReverb()
listen('nac-lobby', 'GameJoined', (e: Event) => {
  console.log('GameJoined', e)
  alert('Joined Game')
  gamesStore.fetchExistingGames()
})

gamesStore.fetchExistingGames()

const setGameAndStartPlaying = (game: Game) => {
  if (!game) return
  gamesStore.setActiveGame(game)
  router.push(`/games/${game.id}`)
}

const onJoinGame = async (game: Game) =>
  setGameAndStartPlaying((await api(`/games/${game.id}/join`)))

const startNewGame = async () =>
  setGameAndStartPlaying((await api('/games/store')))
</script>
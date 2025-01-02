<template>
  <PageContainer class="playViewContainer h-full flex flex-col justify-between max-w-6xl m-auto">
    <div class="playerHeaderContainer pt-4">
      <PlayerCards
        v-if="activeGame"
        :game="activeGame"
      />
    </div>
    <div class="h-full flexCenter">
      <Board v-if="activeGame" />
      <LoadingMessage v-else>Loading Game</LoadingMessage>
    </div>
  </PageContainer>
</template>

<script setup lang="ts">
import Board from '@/components/games/Board.vue'
import LoadingMessage from '@/components/loading/LoadingMessage.vue'
import PageContainer from '@/components/pages/PageContainer.vue'
import PlayerCards from '@/components/players/PlayerCards.vue'
import { useReverb } from '@/composables/useReverb'
import { useGamesStore } from '@/stores/games'
import type { Game } from '@/types/game'
import { api } from '@/utilities/api'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const gameStore = useGamesStore()
const gameID = parseInt(String(route.params.id))
const loading = ref(true)

const activeGame = computed(() => gameStore.activeGame)

const { listen } = useReverb()

const onGameFetchFailed = () => router.push({ name: 'dashboard' })

const loadGame = async () => {
  // if correct game loaded, return as no further setup necessary
  if (gameID === gameStore.activeGame?.id) return
  // try to load correct game
  const game: Game = (await api(`/games/${gameID}`))
  // if game fetch failed, handle cannot start game
  if (!game || gameID !== game.id) onGameFetchFailed()
  else gameStore.setActiveGame(game)
}

const onCreated = async () => await loadGame()

onCreated()
  .then(() => {
    listen(`games.${activeGame.value?.id}`, 'GameJoined', (e: Event) => {
      console.log('GameJoined', e)
      alert('Joined Game')
    }, true)
  })
  .catch(() => router.push('/dashboard'))
  .finally(() => {
    loading.value = false
  })
</script>
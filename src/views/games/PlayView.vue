<template>
  <PageContainer class="playViewContainer h-full flex flex-col justify-between max-w-6xl m-auto">
    <div class="playerHeaderContainer pt-4">
      <PlayerCards
        v-if="activeGame && playerStore.atleast1PlayerIsOnline"
        :game="activeGame"
      />
      <div
        class="playAgainContainer max-w-6xl m-auto flexCenter"
        v-if="gameStore.currentGameState !== GAME_STATES.IN_PLAY"
      >
        <PrimaryButton
          @click="router.push('/dashboard')"
          class="text-xl font-bold bg-blue-500 text-slate-50 px-8 flexCenter hover:text-blue-600"
        >Back to Dashboard</PrimaryButton>
      </div>
    </div>
    <div class="h-full flexCenter">
      <Board
        v-if="activeGame && playerStore.atleast1PlayerIsOnline"
        :boardState="activeBoardState"
      />
      <LoadingMessage v-else>Loading Game</LoadingMessage>
    </div>
  </PageContainer>
</template>

<script setup lang="ts">
import PrimaryButton from '@/components/buttons/PrimaryButton.vue'
import Board from '@/components/games/Board.vue'
import LoadingMessage from '@/components/loading/LoadingMessage.vue'
import PageContainer from '@/components/pages/PageContainer.vue'
import PlayerCards from '@/components/players/PlayerCards.vue'
import { useReverb } from '@/composables/useReverb'
import { GAME_STATES } from '@/enums/games'
import { useAuthStore } from '@/stores/auth'
import { useGamesStore } from '@/stores/games'
import { usePlayerStore } from '@/stores/players'
import type { User } from '@/types/auth'
import type { Game } from '@/types/game'
import { api } from '@/utilities/api'
import { camelise } from '@/utilities/casify'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const gameStore = useGamesStore()
const playerStore = usePlayerStore()
const gameId = parseInt(String(route.params.id))

const activeGame = computed(() => gameStore.activeGame)
const activeBoardState = computed(() => activeGame.value?.boardState || [])

const reverb = useReverb()

const onGameFetchFailed = () => router.push({ name: 'dashboard' })

const onGameFetchSuccess = async (game: Game) => {
  gameStore.setActiveGame(game)
  await playerStore.loadPlayers()
}

const loadGame = async () => {
  // try to load correct game
  const game: Game = (await api(`/games/${gameId}`))
  // if game fetch failed, handle cannot start game
  if (!game || gameId !== game.id) onGameFetchFailed()
  else return await onGameFetchSuccess(game)
}

const onCreated = async () => await loadGame()

const onGameJoined = async (e: Game) => {
  console.debug('onGameJoined: ', e)
  await loadGame()
}

const onHere = async (e: User[]) => authStore.updateUserOnlineStatuses(e)

const onPlayerEnter = async (e: User) => authStore.updateUserOnlineStatus(e, true)

const onPlayerExit = async (e: User) => authStore.updateUserOnlineStatus(e, false)


const onGameLeft = async (e: User) => {
  console.debug('onGameLeft: ', e)
  alert(`${e.name} has left the game`)
}

const onGameUpdated = async (e: { game: Game }) => {
  // TODO: Events come in without being camelised at the moment - see if this can be overridden
  const game: Game = camelise(e.game) as Game
  gameStore.activeGame = game
}

const setGameListeners = () => {
  reverb
    .join(`games.${gameId}`)
    .listen('GameJoined', (e: Game) => onGameJoined(e))
    .listen('GameLeft', (e: User) => onGameLeft(e))
    .listen('BoardUpdated', (e: { game: Game }) => onGameUpdated(e))
    .listenForWhisper('GameUpdated', (e: { game: Game }) => onGameUpdated(e))
    .here((e: User[]) => onHere(e))
    .joining((e: User) => onPlayerEnter(e))
    .leaving((e: User) => onPlayerExit(e))
    .error((e: Error) => console.error(e))
}

onCreated()
  .then(() => setGameListeners())
  .catch(() => router.push('/dashboard'))
</script>
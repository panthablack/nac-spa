<template>
  <PageContainer class="playViewContainer h-full flex flex-col justify-between max-w-6xl m-auto">
    <div class="playerHeaderContainer pt-4">
      <PlayerCards
        v-if="activeGame && playerStore.atleast1PlayerIsOnline"
        :game="activeGame"
      />
    </div>
    <div class="h-full flexCenter">
      <Board v-if="activeGame && playerStore.atleast1PlayerIsOnline" />
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
import { useBoardStore } from '@/stores/board'
import { useGamesStore } from '@/stores/games'
import { usePlayerStore } from '@/stores/players'
import type { User } from '@/types/auth'
import type { Game } from '@/types/game'
import type { Player } from '@/types/player'
import { api } from '@/utilities/api'
import { camelise } from '@/utilities/casify'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const gameStore = useGamesStore()
const boardStore = useBoardStore()
const playerStore = usePlayerStore()
const gameID = parseInt(String(route.params.id))

const activeGame = computed(() => gameStore.activeGame)

const { join } = useReverb()

const onGameFetchFailed = () => router.push({ name: 'dashboard' })

const onGameFetchSuccess = async (game: Game) => {
  gameStore.setActiveGame(game)
  await boardStore.loadBoard()
  await playerStore.loadPlayers()
}

const loadGame = async () => {
  // try to load correct game
  const game: Game = (await api(`/games/${gameID}`))
  // if game fetch failed, handle cannot start game
  if (!game || gameID !== game.id) onGameFetchFailed()
  else return await onGameFetchSuccess(game)
}

const onCreated = async () => await loadGame()

const onGameJoined = async (e: User) => {
  console.debug('onGameJoined: ', e)
  await loadGame()
  // TODO: fix bug with possible race condition here by checking who is in the channel and updating the online statuses if possible
}

const updateUserOnlineStatus = (user: User, status: boolean) => {
  const player = playerStore.getPlayerFromUser(user)
  if (player) playerStore.setPlayerOnline(player, status)
}

const updateUserOnlineStatuses = (users: User[]) => {
  console.debug('Setting user online statuses: ', users)
  const players: Player[] = Object.values(playerStore.players).filter(v => !!v)
  const isOnline = (p: Player) => !!users.find((u) => u.id === p.id)
  players.forEach((p: Player) => playerStore.setPlayerOnline(p, isOnline(p)))
}

const onHere = async (e: User[]) => updateUserOnlineStatuses(e)

const onPlayerEnter = async (e: User) => updateUserOnlineStatus(e, true)

const onPlayerExit = async (e: User) => updateUserOnlineStatus(e, false)

const onGameLeft = async (e: User) => {
  console.debug('onGameLeft: ', e)
  alert(`${e.name} has left the game`)
}

const onGameUpdated = async (e: { game: Game }) => {
  // TODO: Events come in without being camelised at the moment - see if this can be overridden
  const game: Game = camelise(e.game) as Game
  gameStore.activeGame = game
}

onCreated()
  .then(() => {
    join(`games.${activeGame.value?.id}`)
      .listen('GameJoined', (e: User) => onGameJoined(e))
      .listen('GameLeft', (e: User) => onGameLeft(e))
      .listen('BoardUpdated', (e: { game: Game }) => onGameUpdated(e))
      .here((e: User[]) => onHere(e))
      .joining((e: User) => onPlayerEnter(e))
      .leaving((e: User) => onPlayerExit(e))
      .error((e: Error) => console.error(e))
  }
  )
  .catch(() => router.push('/dashboard'))
</script>
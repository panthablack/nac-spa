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
import { useGamesStore } from '@/stores/games'
import { usePlayerStore } from '@/stores/players'
import type { User } from '@/types/auth'
import type { Game } from '@/types/game'
import type { Player } from '@/types/player'
import { api } from '@/utilities/api'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const gameStore = useGamesStore()
const playerStore = usePlayerStore()
const gameID = parseInt(String(route.params.id))

const activeGame = computed(() => gameStore.activeGame)

const { listen, join } = useReverb()

const onGameFetchFailed = () => router.push({ name: 'dashboard' })

const onGameFetchSuccess = async (game: Game) => {
  gameStore.setActiveGame(game)
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

onCreated()
  .then(() => {
    listen(`games.${activeGame.value?.id}`, 'GameJoined', (e: User) => onGameJoined(e), true)
    listen(`games.${activeGame.value?.id}`, 'GameLeft', (e: User) => onGameLeft(e), true)
    join(`games.${activeGame.value?.id}`)
      .here((e: User[]) => onHere(e))
      .joining((e: User) => onPlayerEnter(e))
      .leaving((e: User) => onPlayerExit(e))
      .error((e: Error) => console.error(e))
  }
  )
  .catch(() => router.push('/dashboard'))
</script>
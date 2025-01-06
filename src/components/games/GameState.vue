<template>
  <div
    class="gameStateContainer rounded-lg p-8 flexCenter"
    :class="getBGClass"
  >
    <h2
      class="text-2xl font-semibold"
      :class="getTextClass"
    >{{ state }}</h2>
  </div>
</template>

<script setup lang="ts">
import { GAME_STATES } from '@/enums/games'
import { useGamesStore } from '@/stores/games'
import { usePlayerStore } from '@/stores/players'
import { computed } from 'vue'

const gameStore = useGamesStore()
const playerStore = usePlayerStore()

const getBGClass = computed(() => {
  if (gameStore.currentGameState === GAME_STATES.IN_PLAY) return 'bg-blue-800'
  else if (gameStore.currentGameState === GAME_STATES.DRAW) return 'bg-amber-700'
  else if (gameStore.currentGameState === GAME_STATES.PLAYER_1_WIN) return 'bg-green-600'
  else if (gameStore.currentGameState === GAME_STATES.PLAYER_2_WIN) return 'bg-green-600'
  else return 'bg-white'
})

const getTextClass = computed(() => {
  if (gameStore.currentGameState === GAME_STATES.IN_PLAY) return 'text-slate-50'
  else if (gameStore.currentGameState === GAME_STATES.DRAW) return 'text-slate-50'
  else if (gameStore.currentGameState === GAME_STATES.PLAYER_1_WIN) return 'text-slate-50'
  else if (gameStore.currentGameState === GAME_STATES.PLAYER_2_WIN) return 'text-slate-50'
  else return 'text-black'
})

const state = computed(() => {
  if (gameStore.currentGameState === GAME_STATES.IN_PLAY)
    return `${playerStore.activePlayer?.name}'s turn`
  else if (gameStore.currentGameState === GAME_STATES.DRAW) return 'Draw!'
  else if (gameStore.currentGameState === GAME_STATES.PLAYER_1_WIN)
    return `${playerStore.player1?.name} wins!`
  else if (gameStore.currentGameState === GAME_STATES.PLAYER_2_WIN)
    return `${playerStore.player2?.name} wins!`
  else return '???'
})
</script>

<style scoped lang="css">
/* ... */
</style>
<template>
  <div
    class="playerPieceIconContainer w-12 h-12 rounded-full flexCenter"
    :class="activeClass"
  >
    <span class="font-bold text-2xl text-white">{{ icon }}</span>
  </div>
</template>

<script setup lang="ts">
import { PLAYER_NUMBERS } from '@/enums/players'
import { usePlayerStore } from '@/stores/players'
import type { PlayerNumber } from '@/types/player'
import { computed } from 'vue'

const props = defineProps<{
  playerNumber: PlayerNumber
}>()

const playerStore = usePlayerStore()

const icon = computed(() => {
  if (!props.playerNumber) return '?'
  else if (props.playerNumber === PLAYER_NUMBERS.PLAYER_1) return 'X'
  else if (props.playerNumber === PLAYER_NUMBERS.PLAYER_2) return 'O'
  else return '?'
})

const playerActive = computed(() => playerStore.activePlayerNumber === props.playerNumber)

const activeClass = computed(() => playerActive.value ? 'bg-green-500' : 'bg-slate-800')
</script>

<style scoped lang="css">
/* ... */
</style>
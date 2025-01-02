<template>
  <div class="playerPieceIconContainer">
    <span class="font-bold text-xl rounded-full p-2 bg-slate-800 text-white">{{ icon
      }}</span>
  </div>
</template>

<script setup lang="ts">
import { PLAYER_NUMBERS } from '@/enums/players'
import type { PlayerNumber } from '@/types/player'
import { computed } from 'vue'

const props = defineProps<{
  playerNumber: PlayerNumber
}>()

const icon = computed(() => {
  if (!props.playerNumber) return '?'
  else if (props.playerNumber === PLAYER_NUMBERS.PLAYER_1) return 'X'
  else if (props.playerNumber === PLAYER_NUMBERS.PLAYER_2) return 'O'
  else return '?'
})
</script>

<style scoped lang="css">
/* ... */
</style>
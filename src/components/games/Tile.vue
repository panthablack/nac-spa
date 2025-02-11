<template>
  <div
    class="tileContainer w-32 h-32 flexCenter font-bold text-4xl transition-colors"
    :class="`${stateClass} ${boardInativeClass} ${notUsersTurnClass}`"
  >
    {{ renderTile(tile) }}
  </div>
</template>

<script setup lang="ts">
import { TILE_STATES } from '@/enums/tiles'
import { useBoardStore } from '@/stores/board'
import { usePlayerStore } from '@/stores/players'
import type { TileState } from '@/types/board'
import { computed, type ComputedRef } from 'vue'

const boardStore = useBoardStore()
const playerStore = usePlayerStore()

const props = defineProps<{
  tile: TileState
}>()

const { EMPTY, NOUGHT, CROSS } = TILE_STATES
const filledStates: number[] = [NOUGHT, CROSS]

const renderTile = (tile: number): string => {
  if (tile === EMPTY) return ' '
  else if (tile === NOUGHT) return 'O'
  else if (tile === CROSS) return 'X'
  else return ''
}

const boardInativeClass: ComputedRef<string> = computed((): string => {
  if (!boardStore.boardActive) return 'boardInactive'
  else return ''
})
const notUsersTurnClass: ComputedRef<string> = computed((): string => {
  if (!playerStore.activePlayerIsAuthUser) return 'notUsersTurn'
  else return ''
})

const stateClass: ComputedRef<string> = computed((): string => {
  if (props.tile === EMPTY) return 'empty'
  else if (filledStates.includes(props.tile)) return 'filled'
  else return ''
})
</script>

<style scoped lang="css">
.empty {
  @apply bg-slate-400 text-slate-900 hover:cursor-pointer hover:bg-slate-500;
}

.empty.boardInactive {
  @apply hover:cursor-auto bg-slate-200 hover:bg-slate-200;
}

.notUsersTurn {
  @apply hover:cursor-auto;
}

.filled {
  @apply bg-slate-800 text-white;
}
</style>
<template>
  <div
    class="tileContainer w-32 h-32 flexCenter font-bold text-4xl transition-colors"
    :class="`${stateClass} ${boardInativeClass}`"
  >
    {{ renderTile(tile) }}
  </div>
</template>

<script setup lang="ts">
import { TILE_STATES } from '@/enums/tiles'
import { useBoardStore } from '@/stores/board'
import { computed, type ComputedRef } from 'vue'

const boardStore = useBoardStore()

const props = defineProps<{
  tile: number
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
  @apply hover:cursor-auto hover:bg-slate-400;
}

.filled {
  @apply bg-slate-800 text-white;
}
</style>
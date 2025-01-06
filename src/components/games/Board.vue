<template>
  <div class="boardContainer">
    <div
      class="gap-2"
      :class="gridClass"
    >
      <Tile
        v-for="(tile, index) in boardState"
        :key="index"
        :tile="tile"
        @click="onClick(tile, index)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Tile from '@/components/games/Tile.vue'
import { TILE_STATES } from '@/enums/tiles'
import { useBoardStore } from '@/stores/board'
import { useGamesStore } from '@/stores/games'
import { usePlayerStore } from '@/stores/players'
import type { BoardState } from '@/types/board'
import { computed } from 'vue'

const boardStore = useBoardStore()
const gameStore = useGamesStore()
const playerStore = usePlayerStore()

defineProps<{
  boardState: BoardState
}>()

const onClick = (tile: number, index: number) => {
  // if board inactive, do nothing
  if (!boardStore.boardActive) return
  // if not players turn, do nothing
  if (!playerStore.activePlayerIsAuthUser) return
  // if tile empty, update board state, else return
  else if (tile === TILE_STATES.EMPTY) return boardStore.updateboard(index)
  else return
}

const activeGame = computed(() => gameStore.activeGame)

const cols = computed(() => activeGame.value?.cols || 1)

const gridClass = computed(() => `grid gridCols${String(cols.value)}`)
</script>

<style scoped lang="css"></style>
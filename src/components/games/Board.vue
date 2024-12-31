<template>
  <div class="boardContainer">
    <div
      class="gap-2"
      :class="gridClass"
    >
      <Tile
        v-for="(tile, index) in boardStore.board"
        :key="index"
        :tile="tile"
        @click="onClick(tile, index)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Tile from '@/components/games/Tile.vue'
import { NUMBER_OF_COLUMNS } from '@/config/board'
import { TILE_STATES } from '@/enums/tiles'
import { useBoardStore } from '@/stores/board'
import { computed } from 'vue'

const boardStore = useBoardStore()

const onClick = (tile: number, index: number) => {
  // if board inactive, do nothing
  if (!boardStore.boardActive) return
  // if tile empty, update board state, else return
  else if (tile === TILE_STATES.EMPTY) return boardStore.updateboard(index)
  else return
}

const gridClass = computed(() => `grid gridCols${String(NUMBER_OF_COLUMNS)}`)

boardStore.resetBoard()
</script>

<style scoped lang="css"></style>
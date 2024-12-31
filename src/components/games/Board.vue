<template>
  <div class="boardContainer">
    <div class="grid grid-cols-3 gap-2">
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
import { PLAYER_NUMBERS } from '@/enums/players'
import { TILE_STATES } from '@/enums/tiles'
import { usePlayerStore } from '@/stores/players'
import { ref, type Ref } from 'vue'

const playerStore = usePlayerStore()

const numTiles = 9

const boardState: Ref<number[]> = ref(new Array(numTiles))

const resetBoard = () => {
  boardState.value.fill(TILE_STATES.EMPTY)
  playerStore.setActivePlayer(PLAYER_NUMBERS.PLAYER_1)
}

const onClick = (tile: number, index: number) => {
  // if tile empty, update board state, else return
  if (tile === TILE_STATES.EMPTY) return updateBoardState(index)
  else return
}

const updateBoardState = (index: number) => {
  boardState.value[index] = playerStore.currentPlayerTile
  playerStore.changePlayer()
}

resetBoard()
</script>

<style scoped lang="css">
/* ... */
</style>
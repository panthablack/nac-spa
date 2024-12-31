<template>
  <div class="simpleBoardContainer">
    <div class="grid grid-cols-3 gap-2">
      <SimpleTile
        v-for="(tile, index) in boardState"
        :key="index"
        :tile="tile"
        @click="onClick(tile, index)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import SimpleTile from '@/components/games/SimpleTile.vue'
import { TILE_STATES } from '@/enums/tiles'
import { computed, ref, type ComputedRef, type Ref } from 'vue'

const numTiles = 9

const boardState: Ref<number[]> = ref(new Array(numTiles))

const currentPlayerTile: ComputedRef<number> = computed(() => TILE_STATES.NOUGHT)

const resetBoard = () => boardState.value.fill(TILE_STATES.EMPTY)

const onClick = (tile: number, index: number) => {
  // if tile empty, update board state, else return
  if (tile === TILE_STATES.EMPTY) return updateBoardState(index)
  else return
}

const updateBoardState = (index: number) =>
  boardState.value[index] = currentPlayerTile.value


resetBoard()
</script>

<style scoped lang="css">
/* ... */
</style>